import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/domain-opportunities
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const priority = searchParams.get('priority')

    const where: Record<string, string> = {}
    if (status) where.status = status
    if (priority) where.priority = priority

    const domains = await prisma.domainOpportunity.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
    })

    return NextResponse.json(domains)
  } catch (error) {
    console.error('Error fetching domain opportunities:', error)
    return NextResponse.json({ error: 'Failed to fetch domain opportunities' }, { status: 500 })
  }
}

// POST /api/domain-opportunities
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const domain = await prisma.domainOpportunity.create({
      data: {
        domain: data.domain,
        status: data.status || 'parking',
        estimatedValue: data.estimatedValue,
        niche: data.niche,
        priority: data.priority || 'medium',
        notes: data.notes,
        radarNotes: data.radarNotes,
      },
    })

    return NextResponse.json(domain, { status: 201 })
  } catch (error) {
    console.error('Error creating domain opportunity:', error)
    return NextResponse.json({ error: 'Failed to create domain opportunity' }, { status: 500 })
  }
}
