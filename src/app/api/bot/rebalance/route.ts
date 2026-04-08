import { NextResponse } from "next/server"
import { rebalance } from "@/lib/bot-engine"

// POST /api/bot/rebalance — Maandelijkse portfolio rebalancing
export async function POST() {
  try {
    const results = await rebalance()
    return NextResponse.json({ success: true, results })
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error"
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
