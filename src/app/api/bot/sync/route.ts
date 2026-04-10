import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import * as bitvavo from "@/lib/bitvavo"

// POST /api/bot/sync — Sync posities met werkelijk Bitvavo saldo
export async function POST() {
  try {
    if (!bitvavo.isConfigured()) {
      return NextResponse.json({ error: "Bitvavo API niet geconfigureerd" }, { status: 400 })
    }

    // Haal alle balances op van Bitvavo
    const balances = await bitvavo.getBalance()
    const configs = await prisma.botConfig.findMany({ where: { active: true } })

    const results: Array<{ coin: string; amount: number; value: number; synced: boolean; detail: string }> = []

    for (const config of configs) {
      try {
        // Zoek balance voor deze coin
        const bal = balances.find((b) => b.symbol === config.coin)
        const amount = bal ? parseFloat(bal.available) + parseFloat(bal.inOrder) : 0

        // Huidige prijs ophalen
        const ticker = await bitvavo.getPrice(config.market)
        const currentPrice = parseFloat(ticker.price)
        const currentValue = amount * currentPrice

        // ─── Haal trade history op en bereken gewogen gemiddelde ──
        // Op basis van echte Bitvavo fills → meest accurate avgBuyPrice
        let calculatedAvgPrice = currentPrice
        let totalBought = 0
        let totalSpent = 0
        try {
          const trades = await bitvavo.getTrades(config.market, 500)
          // Werk van oud naar nieuw — FIFO methode voor gewogen gemiddelde
          const sorted = [...trades].sort((a, b) => a.timestamp - b.timestamp)
          for (const t of sorted) {
            const amt = parseFloat(t.amount)
            const px = parseFloat(t.price)
            if (t.side === "buy") {
              totalBought += amt
              totalSpent += amt * px
            } else if (t.side === "sell") {
              // Bij verkoop: reduceer de basis proportioneel
              if (totalBought > 0) {
                const ratio = Math.min(amt / totalBought, 1)
                totalSpent -= totalSpent * ratio
                totalBought -= amt
                if (totalBought < 0) totalBought = 0
              }
            }
          }
          if (totalBought > 0.000001) {
            calculatedAvgPrice = totalSpent / totalBought
          }
        } catch {
          // Trades niet ophaalbaar (oude trades > 24u zijn beperkt) → fallback
          calculatedAvgPrice = currentPrice
        }

        // Bestaande positie ophalen
        const existing = await prisma.botPosition.findUnique({ where: { coin: config.coin } })

        if (existing) {
          // Gebruik berekende avgPrice uit trade history, tenzij die 0 is
          const avgPrice = calculatedAvgPrice > 0 ? calculatedAvgPrice : (existing.avgBuyPrice || currentPrice)
          const pnlEur = (currentPrice - avgPrice) * amount
          const pnlPct = avgPrice > 0 ? ((currentPrice - avgPrice) / avgPrice) * 100 : 0

          await prisma.botPosition.update({
            where: { coin: config.coin },
            data: {
              totalAmount: amount,
              currentPrice,
              highestPrice: Math.max(existing.highestPrice, currentPrice),
              currentValue,
              avgBuyPrice: avgPrice,
              pnlEur,
              pnlPct,
              status: amount > 0 ? "holding" : existing.status,
              lastTickAt: new Date(),
            },
          })

          results.push({
            coin: config.coin,
            amount,
            value: currentValue,
            synced: true,
            detail: `Updated: ${amount.toFixed(6)} ${config.coin} · gem. €${avgPrice.toFixed(2)} · waarde €${currentValue.toFixed(2)}`,
          })
        } else if (amount > 0) {
          // Maak nieuwe positie aan met berekende avgPrice
          await prisma.botPosition.create({
            data: {
              coin: config.coin,
              market: config.market,
              totalAmount: amount,
              avgBuyPrice: calculatedAvgPrice,
              highestPrice: Math.max(currentPrice, calculatedAvgPrice),
              currentPrice,
              currentValue,
              pnlEur: (currentPrice - calculatedAvgPrice) * amount,
              pnlPct: calculatedAvgPrice > 0 ? ((currentPrice - calculatedAvgPrice) / calculatedAvgPrice) * 100 : 0,
              status: "holding",
            },
          })

          results.push({
            coin: config.coin,
            amount,
            value: currentValue,
            synced: true,
            detail: `Created: ${amount.toFixed(6)} ${config.coin} · gem. €${calculatedAvgPrice.toFixed(2)} · waarde €${currentValue.toFixed(2)}`,
          })
        } else {
          results.push({
            coin: config.coin,
            amount: 0,
            value: 0,
            synced: false,
            detail: `Geen ${config.coin} saldo op Bitvavo`,
          })
        }
      } catch (err) {
        results.push({
          coin: config.coin,
          amount: 0,
          value: 0,
          synced: false,
          detail: `Error: ${err instanceof Error ? err.message : "Unknown"}`,
        })
      }
    }

    const totalSynced = results.filter((r) => r.synced).length
    const totalValue = results.reduce((s, r) => s + r.value, 0)

    return NextResponse.json({
      success: true,
      synced: totalSynced,
      totalValue,
      results,
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error"
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
