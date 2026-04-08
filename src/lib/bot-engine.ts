import { prisma } from "@/lib/prisma"
import * as bitvavo from "@/lib/bitvavo"

// ─── Bot Engine v2: Trailing Stop + DCA + F&G + Volume + Profit Taking + Rebalancing ───

interface TickResult {
  coin: string
  action: "hold" | "trailing_sell" | "dca_rebuy" | "profit_take" | "rebalance_sell" | "rebalance_buy" | "error"
  price: number
  detail?: string
  layers?: string[]  // welke lagen actief waren
}

interface MarketContext {
  fearGreed: number
  fearGreedClass: string
}

// ─── LAAG 1: Fear & Greed invloed ───────────────────────────────
// Extreme Greed (>80) → trailing strakker, winst pakken
// Extreme Fear (<20) → DCA versnellen, niet verkopen
function fearGreedModifier(fg: number) {
  return {
    trailingMultiplier: fg > 80 ? 0.6 : fg > 60 ? 0.8 : 1.0,  // strakker bij greed
    dcaSpeedMultiplier: fg < 20 ? 0.7 : fg < 35 ? 0.85 : 1.0,  // snellere DCA bij fear
    blockSell: fg < 15,  // extreme fear → blokkeer verkoop
    profitTakeEarlier: fg > 75,  // greed → eerder winst pakken
  }
}

// ─── LAAG 2: Volume confirmatie ─────────────────────────────────
// Verkoop alleen als volume > 150% van gemiddelde
// Voorkomt valse signalen op lage volume moves
const VOLUME_THRESHOLD = 1.5  // 150% van gemiddelde

// ─── LAAG 3: Gestaffelde winstverkoop (profit taking) ───────────
// +50% → verkoop 25% van trade positie
// +100% → verkoop nog 25% van trade positie
// Trailing vangt de rest
const PROFIT_TIERS = [
  { pctGain: 0.50, sellPct: 0.25, label: "+50% profit take" },
  { pctGain: 1.00, sellPct: 0.25, label: "+100% profit take" },
]

// Dynamische trailing % op basis van RSI + Fear & Greed
function dynamicTrailing(basePct: number, rsi: number, fgMod: ReturnType<typeof fearGreedModifier>): number | null {
  if (rsi < 40 || fgMod.blockSell) return null  // oversold of extreme fear → niet verkopen
  let trailing = basePct
  if (rsi > 80) trailing *= 0.5  // overbought → strakker
  trailing *= fgMod.trailingMultiplier  // F&G modifier
  return trailing
}

// ─── MAIN TICK ──────────────────────────────────────────────────
export async function processTick(): Promise<TickResult[]> {
  const results: TickResult[] = []

  const configs = await prisma.botConfig.findMany({ where: { active: true } })
  if (!configs.length) return results

  // Haal Fear & Greed op (1x per tick, niet per coin)
  const fg = await bitvavo.getFearGreed()
  const ctx: MarketContext = { fearGreed: fg.value, fearGreedClass: fg.classification }

  for (const config of configs) {
    try {
      const result = await processPosition(config, ctx)
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

  // Snapshot opslaan met F&G data
  await saveSnapshot(ctx)

  return results
}

async function processPosition(config: {
  id: string; coin: string; market: string; trailingPct: number
  dcaSteps: number; dcaStepPct: number; dcaStepWeight: number
  coreHoldPct: number; tradePct: number; targetAlloc?: number | null
}, ctx: MarketContext): Promise<TickResult> {
  const layers: string[] = []

  // ─── Huidige prijs ophalen ─────────────────────────────
  const ticker = await bitvavo.getPrice(config.market)
  const currentPrice = parseFloat(ticker.price)

  // ─── RSI ophalen ───────────────────────────────────────
  let rsi = 50
  try {
    const candles = await bitvavo.getCandles(config.market, "1h", 100)
    const closes = candles.map((c) => parseFloat(c.close)).reverse()
    rsi = bitvavo.calculateRSI(closes)
  } catch { /* fallback neutral RSI */ }

  // ─── LAAG 1: Fear & Greed context ─────────────────────
  const fgMod = fearGreedModifier(ctx.fearGreed)
  layers.push(`F&G: ${ctx.fearGreed} (${ctx.fearGreedClass})`)

  // ─── LAAG 2: Volume ratio ─────────────────────────────
  let volumeRatio = 1
  try {
    volumeRatio = await bitvavo.getVolumeRatio(config.market)
  } catch { /* fallback neutral */ }
  layers.push(`Vol: ${(volumeRatio * 100).toFixed(0)}%`)

  // ─── Positie ophalen of aanmaken ──────────────────────
  let position = await prisma.botPosition.findUnique({ where: { coin: config.coin } })
  if (!position) {
    let amount = 0
    let avgPrice = currentPrice
    if (bitvavo.isConfigured()) {
      const balances = await bitvavo.getBalance()
      const bal = balances.find((b) => b.symbol === config.coin)
      amount = bal ? parseFloat(bal.available) + parseFloat(bal.inOrder) : 0
    }
    position = await prisma.botPosition.create({
      data: {
        coin: config.coin, market: config.market,
        totalAmount: amount, avgBuyPrice: avgPrice,
        highestPrice: currentPrice, currentPrice,
        currentValue: amount * currentPrice,
        pnlEur: 0, pnlPct: 0, status: "holding",
      },
    })
  }

  // ─── Update hoogste prijs + P&L ───────────────────────
  const newHigh = Math.max(position.highestPrice, currentPrice)
  const pnlEur = (currentPrice - position.avgBuyPrice) * position.totalAmount
  const pnlPct = position.avgBuyPrice > 0 ? ((currentPrice - position.avgBuyPrice) / position.avgBuyPrice) * 100 : 0

  await prisma.botPosition.update({
    where: { coin: config.coin },
    data: {
      currentPrice, highestPrice: newHigh,
      currentValue: position.totalAmount * currentPrice,
      pnlEur, pnlPct, lastTickAt: new Date(),
    },
  })

  // ─── STATUS: DCA HERINKOOP ─────────────────────────────
  if (position.status === "dca_rebuy" && position.soldAt) {
    const dcaStep = position.dcaStep
    // LAAG 1: Fear modifier versnelt DCA bij extreme fear
    const adjustedStepPct = config.dcaStepPct * fgMod.dcaSpeedMultiplier
    const targetDrop = (dcaStep + 1) * adjustedStepPct
    const dcaTargetPrice = position.soldAt * (1 - targetDrop)

    layers.push(`DCA target: €${dcaTargetPrice.toFixed(2)} (stap ${dcaStep + 1}/${config.dcaSteps})`)

    if (currentPrice <= dcaTargetPrice && dcaStep < config.dcaSteps) {
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
              reason: `DCA stap ${dcaStep + 1}/${config.dcaSteps} bij €${currentPrice.toFixed(2)} (-${(targetDrop * 100).toFixed(0)}%). F&G: ${ctx.fearGreed}`,
              orderId: order.orderId, status: "filled",
            },
          })

          const newTotal = position.totalAmount + filledAmount
          const newAvg = ((position.avgBuyPrice * position.totalAmount) + (filledPrice * filledAmount)) / newTotal
          const newStep = dcaStep + 1

          await prisma.botPosition.update({
            where: { coin: config.coin },
            data: {
              totalAmount: newTotal, avgBuyPrice: newAvg, dcaStep: newStep,
              status: newStep >= config.dcaSteps ? "holding" : "dca_rebuy",
              highestPrice: newStep >= config.dcaSteps ? currentPrice : position.highestPrice,
            },
          })

          return { coin: config.coin, action: "dca_rebuy", price: currentPrice, layers, detail: `DCA stap ${newStep}/${config.dcaSteps}. F&G: ${ctx.fearGreed}` }
        } catch (err) {
          return { coin: config.coin, action: "error", price: currentPrice, layers, detail: `DCA buy failed: ${err}` }
        }
      }
    }

    return { coin: config.coin, action: "hold", price: currentPrice, layers, detail: `Wacht op DCA stap ${dcaStep + 1} bij €${dcaTargetPrice.toFixed(2)}` }
  }

  // ─── LAAG 3: GESTAFFELDE WINSTVERKOOP ──────────────────
  if (position.totalAmount > 0 && position.avgBuyPrice > 0) {
    const currentGain = (currentPrice - position.avgBuyPrice) / position.avgBuyPrice
    // Bepaal profit tier (check van hoog naar laag)
    // profitTakeStep trackt hoeveel tiers al genomen zijn (stored in dcaStep als status=holding)
    const profitStepsTaken = position.status === "holding" ? (position.profitStepsTaken || 0) : 0

    for (let i = profitStepsTaken; i < PROFIT_TIERS.length; i++) {
      const tier = PROFIT_TIERS[i]
      // Bij greed (F&G > 75) → eerder profit taken (drempel -10%)
      const adjustedGain = fgMod.profitTakeEarlier ? tier.pctGain * 0.9 : tier.pctGain

      if (currentGain >= adjustedGain) {
        const tradePortion = position.totalAmount * config.tradePct
        const sellAmount = tradePortion * tier.sellPct

        if (bitvavo.isConfigured() && sellAmount * currentPrice > 5) {
          try {
            const order = await bitvavo.sellMarket(config.market, sellAmount)
            const filledAmount = parseFloat(order.filledAmount || "0")
            const filledQuote = parseFloat(order.filledAmountQuote || "0")
            const filledPrice = filledQuote / (filledAmount || 1)

            await prisma.botTrade.create({
              data: {
                configId: config.id, coin: config.coin, market: config.market,
                side: "sell", type: "profit_take",
                amount: filledAmount, price: filledPrice, totalEur: filledQuote,
                reason: `${tier.label}: +${(currentGain * 100).toFixed(0)}% gain. F&G: ${ctx.fearGreed}. Vol: ${(volumeRatio * 100).toFixed(0)}%`,
                orderId: order.orderId, status: "filled",
              },
            })

            await prisma.botPosition.update({
              where: { coin: config.coin },
              data: {
                totalAmount: position.totalAmount - filledAmount,
                profitStepsTaken: i + 1,
              },
            })

            return {
              coin: config.coin, action: "profit_take", price: currentPrice, layers,
              detail: `${tier.label}: verkocht ${filledAmount.toFixed(6)} @ €${filledPrice.toFixed(2)} (+${(currentGain * 100).toFixed(0)}%)`,
            }
          } catch (err) {
            return { coin: config.coin, action: "error", price: currentPrice, layers, detail: `Profit take failed: ${err}` }
          }
        }
      }
    }
  }

  // ─── TRAILING STOP CHECK ───────────────────────────────
  const trailing = dynamicTrailing(config.trailingPct, rsi, fgMod)

  if (trailing === null) {
    const reason = fgMod.blockSell ? `F&G ${ctx.fearGreed} extreme fear` : `RSI ${rsi.toFixed(0)} oversold`
    layers.push(`Trailing UIT: ${reason}`)
    return { coin: config.coin, action: "hold", price: currentPrice, layers, detail: `${reason} — trailing uitgeschakeld` }
  }

  const stopPrice = newHigh * (1 - trailing)
  layers.push(`Trailing: ${(trailing * 100).toFixed(1)}% | Stop: €${stopPrice.toFixed(2)}`)

  if (currentPrice <= stopPrice && position.totalAmount > 0) {
    // ─── LAAG 2: Volume confirmatie ────────────────────────
    if (volumeRatio < VOLUME_THRESHOLD) {
      layers.push(`Vol te laag: ${(volumeRatio * 100).toFixed(0)}% < ${VOLUME_THRESHOLD * 100}%`)
      return {
        coin: config.coin, action: "hold", price: currentPrice, layers,
        detail: `Stop geraakt maar volume te laag (${(volumeRatio * 100).toFixed(0)}% < 150%). Wacht op bevestiging.`,
      }
    }

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
            reason: `Trailing ${(trailing * 100).toFixed(0)}% hit. High €${newHigh.toFixed(2)} → stop €${stopPrice.toFixed(2)}. RSI: ${rsi.toFixed(0)}. F&G: ${ctx.fearGreed}. Vol: ${(volumeRatio * 100).toFixed(0)}%`,
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
            profitStepsTaken: 0,
          },
        })

        return {
          coin: config.coin, action: "trailing_sell", price: currentPrice, layers,
          detail: `Verkocht ${filledAmount.toFixed(6)} @ €${filledPrice.toFixed(2)}. Vol: ${(volumeRatio * 100).toFixed(0)}%. Start DCA.`,
        }
      } catch (err) {
        return { coin: config.coin, action: "error", price: currentPrice, layers, detail: `Sell failed: ${err}` }
      }
    }
  }

  return {
    coin: config.coin, action: "hold", price: currentPrice, layers,
    detail: `High €${newHigh.toFixed(2)} | Stop €${stopPrice.toFixed(2)} | RSI ${rsi.toFixed(0)} | F&G ${ctx.fearGreed} | Vol ${(volumeRatio * 100).toFixed(0)}%`,
  }
}

// ─── LAAG 4: MAANDELIJKSE REBALANCING ───────────────────────────
// Als een coin > target + 5% → excess verkopen
// Als een coin < target - 5% → bijkopen
export async function rebalance(): Promise<TickResult[]> {
  const results: TickResult[] = []
  const configs = await prisma.botConfig.findMany({ where: { active: true } })
  const positions = await prisma.botPosition.findMany()

  const totalValue = positions.reduce((s, p) => s + p.currentValue, 0)
  if (totalValue < 50) return results // niets om te rebalancen

  for (const config of configs) {
    if (!config.targetAlloc) continue

    const position = positions.find((p) => p.coin === config.coin)
    const currentValue = position?.currentValue || 0
    const currentAlloc = (currentValue / totalValue) * 100
    const targetAlloc = config.targetAlloc
    const diff = currentAlloc - targetAlloc

    // Alleen rebalancen als >5% verschil
    if (Math.abs(diff) < 5) {
      results.push({ coin: config.coin, action: "hold", price: position?.currentPrice || 0, detail: `Alloc ${currentAlloc.toFixed(1)}% ≈ target ${targetAlloc}%` })
      continue
    }

    const adjustEur = Math.abs(diff / 100) * totalValue

    if (diff > 5 && position && position.totalAmount > 0) {
      // Te veel van deze coin → verkoop excess
      const sellAmount = adjustEur / position.currentPrice

      if (bitvavo.isConfigured() && adjustEur > 5) {
        try {
          const order = await bitvavo.sellMarket(config.market, Math.min(sellAmount, position.totalAmount * 0.25))
          const filledAmount = parseFloat(order.filledAmount || "0")
          const filledQuote = parseFloat(order.filledAmountQuote || "0")
          const filledPrice = filledQuote / (filledAmount || 1)

          await prisma.botTrade.create({
            data: {
              configId: config.id, coin: config.coin, market: config.market,
              side: "sell", type: "rebalance",
              amount: filledAmount, price: filledPrice, totalEur: filledQuote,
              reason: `Rebalance: ${currentAlloc.toFixed(1)}% → target ${targetAlloc}%. Excess €${adjustEur.toFixed(2)} verkocht.`,
              orderId: order.orderId, status: "filled",
            },
          })

          await prisma.botPosition.update({
            where: { coin: config.coin },
            data: { totalAmount: position.totalAmount - filledAmount },
          })

          results.push({ coin: config.coin, action: "rebalance_sell", price: position.currentPrice, detail: `Verkocht €${filledQuote.toFixed(2)} (${currentAlloc.toFixed(1)}% → ${targetAlloc}%)` })
        } catch (err) {
          results.push({ coin: config.coin, action: "error", price: position.currentPrice, detail: `Rebalance sell failed: ${err}` })
        }
      }
    } else if (diff < -5) {
      // Te weinig van deze coin → koop bij
      if (bitvavo.isConfigured() && adjustEur > 5) {
        try {
          const order = await bitvavo.buyMarket(config.market, Math.min(adjustEur, totalValue * 0.05))
          const filledAmount = parseFloat(order.filledAmount || "0")
          const filledQuote = parseFloat(order.filledAmountQuote || "0")
          const filledPrice = filledQuote / (filledAmount || 1)

          await prisma.botTrade.create({
            data: {
              configId: config.id, coin: config.coin, market: config.market,
              side: "buy", type: "rebalance",
              amount: filledAmount, price: filledPrice, totalEur: filledQuote,
              reason: `Rebalance: ${currentAlloc.toFixed(1)}% → target ${targetAlloc}%. Bijgekocht €${filledQuote.toFixed(2)}.`,
              orderId: order.orderId, status: "filled",
            },
          })

          const existingPos = position || await prisma.botPosition.findUnique({ where: { coin: config.coin } })
          if (existingPos) {
            const newTotal = existingPos.totalAmount + filledAmount
            const newAvg = ((existingPos.avgBuyPrice * existingPos.totalAmount) + (filledPrice * filledAmount)) / newTotal
            await prisma.botPosition.update({
              where: { coin: config.coin },
              data: { totalAmount: newTotal, avgBuyPrice: newAvg },
            })
          }

          results.push({ coin: config.coin, action: "rebalance_buy", price: filledPrice, detail: `Bijgekocht €${filledQuote.toFixed(2)} (${currentAlloc.toFixed(1)}% → ${targetAlloc}%)` })
        } catch (err) {
          results.push({ coin: config.coin, action: "error", price: 0, detail: `Rebalance buy failed: ${err}` })
        }
      }
    }
  }

  return results
}

// ─── SNAPSHOT ───────────────────────────────────────────────────
async function saveSnapshot(ctx: MarketContext) {
  const positions = await prisma.botPosition.findMany()
  const totalValue = positions.reduce((s, p) => s + p.currentValue, 0)
  const totalCost = positions.reduce((s, p) => s + p.avgBuyPrice * p.totalAmount, 0)
  const totalPnlEur = totalValue - totalCost
  const totalPnlPct = totalCost > 0 ? (totalPnlEur / totalCost) * 100 : 0

  await prisma.botSnapshot.create({
    data: {
      totalValue, totalPnlEur, totalPnlPct,
      fearGreed: ctx.fearGreed,
      positions: positions.map((p) => ({
        coin: p.coin, amount: p.totalAmount, price: p.currentPrice,
        value: p.currentValue, pnl: p.pnlPct,
      })),
    },
  })
}
