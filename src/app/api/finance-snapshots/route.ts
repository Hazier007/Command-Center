import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/finance-snapshots
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '12')

    const snapshots = await prisma.financeSnapshot.findMany({
      orderBy: { period: 'desc' },
      take: limit,
    })

    return NextResponse.json(snapshots)
  } catch (error) {
    console.error('Error fetching finance snapshots:', error)
    return NextResponse.json({ error: 'Failed to fetch finance snapshots' }, { status: 500 })
  }
}

// POST /api/finance-snapshots
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const snapshot = await prisma.financeSnapshot.upsert({
      where: { period: data.period },
      update: {
        totalMRR: data.totalMRR,
        totalCosts: data.totalCosts,
        netProfit: data.netProfit,
        activeClients: data.activeClients || 0,
        liveSites: data.liveSites || 0,
        domainCount: data.domainCount,
        notes: data.notes,
        createdBy: data.createdBy || 'system',
      },
      create: {
        period: data.period,
        totalMRR: data.totalMRR,
        totalCosts: data.totalCosts,
        netProfit: data.netProfit,
        activeClients: data.activeClients || 0,
        liveSites: data.liveSites || 0,
        domainCount: data.domainCount,
        notes: data.notes,
        createdBy: data.createdBy || 'system',
      },
    })

    return NextResponse.json(snapshot, { status: 201 })
  } catch (error) {
    console.error('Error creating finance snapshot:', error)
    return NextResponse.json({ error: 'Failed to create finance snapshot' }, { status: 500 })
  }
}
