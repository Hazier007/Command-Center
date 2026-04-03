import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/agent-logs?source=radar&action=task&since=2026-04-01&limit=50
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const limit = parseInt(searchParams.get('limit') || '50')
  const source = searchParams.get('source')
  const action = searchParams.get('action')
  const since = searchParams.get('since')

  const where: Record<string, unknown> = {}
  if (source) where.source = source
  if (action) where.action = action
  if (since) where.createdAt = { gte: new Date(since) }

  const logs = await prisma.agentLog.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: Math.min(limit, 100),
  })

  return NextResponse.json(logs)
}
