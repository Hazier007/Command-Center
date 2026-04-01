import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/revenue - list all revenue entries
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const source = searchParams.get('source')
    const month = searchParams.get('month')

    const where: Record<string, string> = {}
    if (source) where.source = source
    if (month) where.month = month

    const entries = await prisma.revenueEntry.findMany({
      where,
      orderBy: { month: 'desc' },
    })

    return NextResponse.json(entries)
  } catch (error) {
    console.error('Error fetching revenue entries:', error)
    return NextResponse.json(
      { error: 'Failed to fetch revenue entries' },
      { status: 500 }
    )
  }
}

// POST /api/revenue - create new revenue entry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const entry = await prisma.revenueEntry.create({
      data: {
        source: body.source,
        description: body.description,
        amount: body.amount,
        month: body.month,
        projectId: body.projectId,
        siteDomain: body.siteDomain,
        recurring: body.recurring || false,
      },
    })

    return NextResponse.json(entry, { status: 201 })
  } catch (error) {
    console.error('Error creating revenue entry:', error)
    return NextResponse.json(
      { error: 'Failed to create revenue entry' },
      { status: 500 }
    )
  }
}
