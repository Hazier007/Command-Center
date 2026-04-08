import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const coin = url.searchParams.get("coin")
  const limit = parseInt(url.searchParams.get("limit") || "50")

  const trades = await prisma.botTrade.findMany({
    where: coin ? { coin } : undefined,
    orderBy: { createdAt: "desc" },
    take: limit,
  })
  return NextResponse.json(trades)
}
