import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateAgentToken, unauthorizedResponse } from '@/lib/agent-auth'

// POST /api/agent/finance/snapshot — LEDGER saves a monthly finance snapshot
export async function POST(request: NextRequest) {
  const auth = validateAgentToken(request)
  if (!auth.valid) return unauthorizedResponse(auth.error!)

  try {
    const body = await request.json()

    const { period, totalMRR, totalCosts, netProfit, activeClients, liveSites, domainCount, notes, source } = body

    if (!period || totalMRR === undefined || totalCosts === undefined || netProfit === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: period, totalMRR, totalCosts, netProfit' },
        { status: 400 }
      )
    }

    // Upsert — update if period already exists, create otherwise
    const snapshot = await prisma.financeSnapshot.upsert({
      where: { period },
      update: {
        totalMRR,
        totalCosts,
        netProfit,
        activeClients: activeClients || 0,
        liveSites: liveSites || 0,
        domainCount,
        notes,
        createdBy: source || 'ledger',
      },
      create: {
        period,
        totalMRR,
        totalCosts,
        netProfit,
        activeClients: activeClients || 0,
        liveSites: liveSites || 0,
        domainCount,
        notes,
        createdBy: source || 'ledger',
      },
    })

    // Log the action
    await prisma.agentLog.create({
      data: {
        source: source || 'ledger',
        action: 'finance_snapshot',
        payload: JSON.stringify({ period, totalMRR, totalCosts, netProfit }),
      },
    })

    return NextResponse.json({ success: true, data: snapshot })
  } catch (error) {
    console.error('Finance Snapshot API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// GET /api/agent/finance/snapshot — Get all snapshots (for trend analysis)
export async function GET(request: NextRequest) {
  const auth = validateAgentToken(request)
  if (!auth.valid) return unauthorizedResponse(auth.error!)

  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '12')

    const snapshots = await prisma.financeSnapshot.findMany({
      orderBy: { period: 'desc' },
      take: limit,
    })

    return NextResponse.json({ success: true, data: snapshots })
  } catch (error) {
    console.error('Finance Snapshot API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
