import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const positions = await prisma.botPosition.findMany({ orderBy: { currentValue: "desc" } })
  return NextResponse.json(positions)
}
