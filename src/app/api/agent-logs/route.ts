import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const limit = parseInt(searchParams.get('limit') || '50')
  const source = searchParams.get('source')

  const where = source ? { source } : {}

  const logs = await prisma.agentLog.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: Math.min(limit, 100),
  })

  return NextResponse.json(logs)
}
