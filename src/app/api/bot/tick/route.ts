import { NextResponse } from "next/server"
import { processTick } from "@/lib/bot-engine"
import { prisma } from "@/lib/prisma"

// Vercel Cron calls this every 15 min
// Also callable manually from CC dashboard
export async function GET(req: Request) {
  // Simple auth: cron secret or admin
  const authHeader = req.headers.get("authorization")
  const cronSecret = process.env.CRON_SECRET
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const results = await processTick()

    // Log significant actions
    for (const r of results) {
      if (r.action !== "hold") {
        await prisma.agentLog.create({
          data: {
            source: "crypto-bot",
            action: r.action,
            payload: JSON.stringify({ coin: r.coin, price: r.price, detail: r.detail }),
          },
        })
      }
    }

    return NextResponse.json({ ok: true, results, timestamp: new Date().toISOString() })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

// Manual trigger from dashboard
export async function POST() {
  try {
    const results = await processTick()
    return NextResponse.json({ ok: true, results, timestamp: new Date().toISOString() })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
