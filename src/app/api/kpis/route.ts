import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/kpis
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const name = searchParams.get('name')
    const limit = parseInt(searchParams.get('limit') || '50')

    const where = name ? { name } : {}

    const kpis = await prisma.kPI.findMany({
      where,
      orderBy: { measuredAt: 'desc' },
      take: limit,
    })

    return NextResponse.json(kpis)
  } catch (error) {
    console.error('Error fetching KPIs:', error)
    return NextResponse.json({ error: 'Failed to fetch KPIs' }, { status: 500 })
  }
}

// POST /api/kpis
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const kpi = await prisma.kPI.create({
      data: {
        name: data.name,
        value: data.value,
        unit: data.unit,
        target: data.target,
        measuredAt: data.measuredAt ? new Date(data.measuredAt) : new Date(),
        measuredBy: data.measuredBy || 'system',
      },
    })

    return NextResponse.json(kpi, { status: 201 })
  } catch (error) {
    console.error('Error creating KPI:', error)
    return NextResponse.json({ error: 'Failed to create KPI' }, { status: 500 })
  }
}
