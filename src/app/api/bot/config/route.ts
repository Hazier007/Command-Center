import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const configs = await prisma.botConfig.findMany({ orderBy: { coin: "asc" } })
  return NextResponse.json(configs)
}

export async function POST(req: Request) {
  const data = await req.json()
  const config = await prisma.botConfig.upsert({
    where: { coin: data.coin },
    create: {
      coin: data.coin,
      market: data.market || `${data.coin}-EUR`,
      active: data.active ?? true,
      trailingPct: data.trailingPct ?? 0.15,
      dcaSteps: data.dcaSteps ?? 4,
      dcaStepPct: data.dcaStepPct ?? 0.05,
      dcaStepWeight: data.dcaStepWeight ?? 0.25,
      coreHoldPct: data.coreHoldPct ?? 0.60,
      tradePct: data.tradePct ?? 0.30,
      cashPct: data.cashPct ?? 0.10,
      targetAlloc: data.targetAlloc,
    },
    update: {
      active: data.active,
      trailingPct: data.trailingPct,
      dcaSteps: data.dcaSteps,
      dcaStepPct: data.dcaStepPct,
      dcaStepWeight: data.dcaStepWeight,
      coreHoldPct: data.coreHoldPct,
      tradePct: data.tradePct,
      cashPct: data.cashPct,
      targetAlloc: data.targetAlloc,
    },
  })
  return NextResponse.json(config)
}
