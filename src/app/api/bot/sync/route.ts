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

        // Bestaande positie ophalen
        const existing = await prisma.botPosition.findUnique({ where: { coin: config.coin } })

        if (existing) {
          // Update bestaande positie met werkelijk saldo
          // Behoud avgBuyPrice als er al een positie was met amount > 0
          const avgPrice = existing.totalAmount > 0 ? existing.avgBuyPrice : currentPrice
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
            detail: `Updated: ${amount.toFixed(6)} ${config.coin} @ €${currentPrice.toFixed(2)} = €${currentValue.toFixed(2)}`,
          })
        } else if (amount > 0) {
          // Maak nieuwe positie aan
          await prisma.botPosition.create({
            data: {
              coin: config.coin,
              market: config.market,
              totalAmount: amount,
              avgBuyPrice: currentPrice,
              highestPrice: currentPrice,
              currentPrice,
              currentValue,
              pnlEur: 0,
              pnlPct: 0,
              status: "holding",
            },
          })

          results.push({
            coin: config.coin,
            amount,
            value: currentValue,
            synced: true,
            detail: `Created: ${amount.toFixed(6)} ${config.coin} @ €${currentPrice.toFixed(2)} = €${currentValue.toFixed(2)}`,
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
