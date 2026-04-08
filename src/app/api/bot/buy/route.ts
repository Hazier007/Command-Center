import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import * as bitvavo from "@/lib/bitvavo"

// POST /api/bot/buy — Initial buy voor een coin
// Body: { coin: "BTC", amountEur: 100 }
export async function POST(req: NextRequest) {
  try {
    const { coin, amountEur } = await req.json()

    if (!coin || !amountEur || amountEur < 5) {
      return NextResponse.json({ error: "coin en amountEur (min €5) zijn verplicht" }, { status: 400 })
    }

    if (!bitvavo.isConfigured()) {
      return NextResponse.json({ error: "Bitvavo API niet geconfigureerd" }, { status: 400 })
    }

    // Haal config op voor deze coin
    const config = await prisma.botConfig.findUnique({ where: { coin } })
    if (!config) {
      return NextResponse.json({ error: `Geen config gevonden voor ${coin}` }, { status: 404 })
    }

    // Koop via Bitvavo market order
    const order = await bitvavo.buyMarket(config.market, amountEur)
    const filledAmount = parseFloat(order.filledAmount || "0")
    const filledQuote = parseFloat(order.filledAmountQuote || "0")
    const filledPrice = filledAmount > 0 ? filledQuote / filledAmount : 0

    if (filledAmount <= 0) {
      return NextResponse.json({ error: "Order niet gevuld — check je EUR saldo op Bitvavo" }, { status: 400 })
    }

    // Log trade
    await prisma.botTrade.create({
      data: {
        configId: config.id,
        coin: config.coin,
        market: config.market,
        side: "buy",
        type: "manual",
        amount: filledAmount,
        price: filledPrice,
        totalEur: filledQuote,
        reason: `Initial buy: €${amountEur} → ${filledAmount.toFixed(6)} ${coin} @ €${filledPrice.toFixed(2)}`,
        orderId: order.orderId,
        status: "filled",
      },
    })

    // Update of maak positie
    const existing = await prisma.botPosition.findUnique({ where: { coin } })

    if (existing) {
      const newTotal = existing.totalAmount + filledAmount
      const newAvg = ((existing.avgBuyPrice * existing.totalAmount) + (filledPrice * filledAmount)) / newTotal

      await prisma.botPosition.update({
        where: { coin },
        data: {
          totalAmount: newTotal,
          avgBuyPrice: newAvg,
          currentPrice: filledPrice,
          highestPrice: Math.max(existing.highestPrice, filledPrice),
          currentValue: newTotal * filledPrice,
          pnlEur: 0,
          pnlPct: 0,
          status: "holding",
          lastTickAt: new Date(),
        },
      })
    } else {
      await prisma.botPosition.create({
        data: {
          coin: config.coin,
          market: config.market,
          totalAmount: filledAmount,
          avgBuyPrice: filledPrice,
          highestPrice: filledPrice,
          currentPrice: filledPrice,
          currentValue: filledQuote,
          pnlEur: 0,
          pnlPct: 0,
          status: "holding",
        },
      })
    }

    return NextResponse.json({
      success: true,
      coin,
      filled: filledAmount,
      price: filledPrice,
      totalEur: filledQuote,
      orderId: order.orderId,
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error"
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
