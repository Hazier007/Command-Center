import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const limit = parseInt(url.searchParams.get("limit") || "100")

  const snapshots = await prisma.botSnapshot.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
  })
  return NextResponse.json(snapshots)
}
