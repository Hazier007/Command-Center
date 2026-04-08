import { prisma } from "@/lib/prisma"
import * as bitvavo from "@/lib/bitvavo"

// ─── Bot Engine: Trailing Stop + DCA Herinkoop ───────────────────

interface TickResult {
  coin: string
  action: "hold" | "trailing_sell" | "dca_rebuy" | "error"
  price: number
  detail?: string
}

// Dynamische trailing % op basis van RSI
function dynamicTrailing(basePct: number, rsi: number): number | null {
  if (rsi > 80) return basePct * 0.5   // overbought → strakker
  if (rsi < 40) return null             // oversold → niet verkopen
  return basePct
}

export async function processTick(): Promise<TickResult[]> {
  const results: TickResult[] = []

  // Haal alle actieve configs op
  const configs = await prisma.botConfig.findMany({ where: { active: true } })
  if (!configs.length) return results

  for (const config of configs) {
    try {
      const result = await processPosition(config)
      results.push(result)
    } catch (err) {
      results.push({
        coin: config.coin,
        action: "error",
        price: 0,
        detail: err instanceof Error ? err.message : "Unknown error",
      })
    }
  }

  // Snapshot opslaan (elke tick)
  await saveSnapshot()

  return results
}

async function processPosition(config: {
  id: string; coin: string; market: string; trailingPct: number
  dcaSteps: number; dcaStepPct: number; dcaStepWeight: number
  coreHoldPct: number; tradePct: number
}): Promise<TickResult> {
  // Huidige prijs ophalen
  const ticker = await bitvavo.getPrice(config.market)
  const currentPrice = parseFloat(ticker.price)

  // RSI ophalen voor dynamische trailing
  let rsi = 50
  try {
    const candles = await bitvavo.getCandles(config.market, "1h", 100)
    const closes = candles.map((c) => parseFloat(c.close)).reverse()
    rsi = bitvavo.calculateRSI(closes)
  } catch { /* fallback to neutral RSI */ }

  // Positie ophalen of aanmaken
  let position = await prisma.botPosition.findUnique({ where: { coin: config.coin } })
  if (!position) {
    // Haal balance op van Bitvavo
    let amount = 0
    let avgPrice = currentPrice
    if (bitvavo.isConfigured()) {
      const balances = await bitvavo.getBalance()
      const bal = balances.find((b) => b.symbol === config.coin)
      amount = bal ? parseFloat(bal.available) + parseFloat(bal.inOrder) : 0
    }
    position = await prisma.botPosition.create({
      data: {
        coin: config.coin,
        market: config.market,
        totalAmount: amount,
        avgBuyPrice: avgPrice,
        highestPrice: currentPrice,
        currentPrice,
        currentValue: amount * currentPrice,
        pnlEur: 0,
        pnlPct: 0,
        status: "holding",
      },
    })
  }

  // Update hoogste prijs
  const newHigh = Math.max(position.highestPrice, currentPrice)

  // Update positie met huidige prijs
  const pnlEur = (currentPrice - position.avgBuyPrice) * position.totalAmount
  const pnlPct = position.avgBuyPrice > 0 ? ((currentPrice - position.avgBuyPrice) / position.avgBuyPrice) * 100 : 0

  await prisma.botPosition.update({
    where: { coin: config.coin },
    data: {
      currentPrice,
      highestPrice: newHigh,
      currentValue: position.totalAmount * currentPrice,
      pnlEur,
      pnlPct,
      lastTickAt: new Date(),
    },
  })

  // ─── STATUS: DCA HERINKOOP ──────────────────────────────
  if (position.status === "dca_rebuy" && position.soldAt) {
    const dcaStep = position.dcaStep
    const targetDrop = (dcaStep + 1) * config.dcaStepPct // bv. stap 1 = -5%, stap 2 = -10%
    const dcaTargetPrice = position.soldAt * (1 - targetDrop)

    if (currentPrice <= dcaTargetPrice && dcaStep < config.dcaSteps) {
      // DCA herinkoop uitvoeren
      const buyAmount = (position.soldAmount || 0) * config.dcaStepWeight
      const buyEur = buyAmount * currentPrice

      if (bitvavo.isConfigured() && buyEur > 5) {
        try {
          const order = await bitvavo.buyMarket(config.market, buyEur)
          const filledAmount = parseFloat(order.filledAmount || "0")
          const filledPrice = parseFloat(order.filledAmountQuote || "0") / (filledAmount || 1)

          await prisma.botTrade.create({
            data: {
              configId: config.id, coin: config.coin, market: config.market,
              side: "buy", type: "dca_rebuy",
              amount: filledAmount, price: filledPrice, totalEur: buyEur,
              reason: `DCA stap ${dcaStep + 1}/${config.dcaSteps} bij €${currentPrice.toFixed(2)} (-${(targetDrop * 100).toFixed(0)}% van verkoop)`,
              orderId: order.orderId, status: "filled",
            },
          })

          const newTotal = position.totalAmount + filledAmount
          const newAvg = ((position.avgBuyPrice * position.totalAmount) + (filledPrice * filledAmount)) / newTotal
          const newStep = dcaStep + 1

          await prisma.botPosition.update({
            where: { coin: config.coin },
            data: {
              totalAmount: newTotal,
              avgBuyPrice: newAvg,
              dcaStep: newStep,
              status: newStep >= config.dcaSteps ? "holding" : "dca_rebuy",
              highestPrice: newStep >= config.dcaSteps ? currentPrice : position.highestPrice,
            },
          })

          return { coin: config.coin, action: "dca_rebuy", price: currentPrice, detail: `DCA stap ${newStep}/${config.dcaSteps}` }
        } catch (err) {
          return { coin: config.coin, action: "error", price: currentPrice, detail: `DCA buy failed: ${err}` }
        }
      }
    }

    return { coin: config.coin, action: "hold", price: currentPrice, detail: `Wacht op DCA stap ${dcaStep + 1} bij €${dcaTargetPrice.toFixed(2)}` }
  }

  // ─── STATUS: HOLDING — CHECK TRAILING STOP ──────────────
  const trailing = dynamicTrailing(config.trailingPct, rsi)

  // RSI < 40 → niet verkopen (oversold)
  if (trailing === null) {
    return { coin: config.coin, action: "hold", price: currentPrice, detail: `RSI ${rsi.toFixed(0)} oversold — trailing uitgeschakeld` }
  }

  const stopPrice = newHigh * (1 - trailing)

  if (currentPrice <= stopPrice && position.totalAmount > 0) {
    // TRAILING STOP HIT — verkoop trade-gedeelte
    const sellAmount = position.totalAmount * config.tradePct

    if (bitvavo.isConfigured() && sellAmount > 0) {
      try {
        const order = await bitvavo.sellMarket(config.market, sellAmount)
        const filledAmount = parseFloat(order.filledAmount || "0")
        const filledQuote = parseFloat(order.filledAmountQuote || "0")
        const filledPrice = filledQuote / (filledAmount || 1)

        await prisma.botTrade.create({
          data: {
            configId: config.id, coin: config.coin, market: config.market,
            side: "sell", type: "trailing_stop",
            amount: filledAmount, price: filledPrice, totalEur: filledQuote,
            reason: `Trailing stop ${(trailing * 100).toFixed(0)}% hit. High €${newHigh.toFixed(2)} → stop €${stopPrice.toFixed(2)}. RSI: ${rsi.toFixed(0)}`,
            orderId: order.orderId, status: "filled",
          },
        })

        await prisma.botPosition.update({
          where: { coin: config.coin },
          data: {
            totalAmount: position.totalAmount - filledAmount,
            status: "dca_rebuy",
            soldAt: filledPrice,
            soldAmount: filledAmount,
            dcaStep: 0,
          },
        })

        return { coin: config.coin, action: "trailing_sell", price: currentPrice, detail: `Verkocht ${filledAmount.toFixed(6)} @ €${filledPrice.toFixed(2)}. Start DCA herinkoop.` }
      } catch (err) {
        return { coin: config.coin, action: "error", price: currentPrice, detail: `Sell failed: ${err}` }
      }
    }
  }

  return {
    coin: config.coin,
    action: "hold",
    price: currentPrice,
    detail: `High €${newHigh.toFixed(2)} | Stop €${stopPrice.toFixed(2)} | RSI ${rsi.toFixed(0)}`,
  }
}

async function saveSnapshot() {
  const positions = await prisma.botPosition.findMany()
  const totalValue = positions.reduce((s, p) => s + p.currentValue, 0)
  const totalCost = positions.reduce((s, p) => s + p.avgBuyPrice * p.totalAmount, 0)
  const totalPnlEur = totalValue - totalCost
  const totalPnlPct = totalCost > 0 ? (totalPnlEur / totalCost) * 100 : 0

  await prisma.botSnapshot.create({
    data: {
      totalValue,
      totalPnlEur,
      totalPnlPct,
      positions: positions.map((p) => ({
        coin: p.coin, amount: p.totalAmount, price: p.currentPrice,
        value: p.currentValue, pnl: p.pnlPct,
      })),
    },
  })
}
