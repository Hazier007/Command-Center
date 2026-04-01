import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/domains - list all domain opportunities
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    const where = status ? { status } : {}

    const domains = await prisma.domainOpportunity.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
    })

    return NextResponse.json(domains)
  } catch (error) {
    console.error('Error fetching domains:', error)
    return NextResponse.json(
      { error: 'Failed to fetch domains' },
      { status: 500 }
    )
  }
}

// POST /api/domains - create new domain opportunity
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const domain = await prisma.domainOpportunity.create({
      data: {
        domain: body.domain,
        status: body.status || 'parking',
        estimatedValue: body.estimatedValue,
        niche: body.niche,
        priority: body.priority || 'medium',
        notes: body.notes,
        radarNotes: body.radarNotes,
      },
    })

    return NextResponse.json(domain, { status: 201 })
  } catch (error) {
    console.error('Error creating domain:', error)
    return NextResponse.json(
      { error: 'Failed to create domain' },
      { status: 500 }
    )
  }
}
