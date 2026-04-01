import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/domains/[id] - get single domain
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const domain = await prisma.domainOpportunity.findUnique({
      where: { id },
    })

    if (!domain) {
      return NextResponse.json(
        { error: 'Domain not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(domain)
  } catch (error) {
    console.error('Error fetching domain:', error)
    return NextResponse.json(
      { error: 'Failed to fetch domain' },
      { status: 500 }
    )
  }
}

// PATCH /api/domains/[id] - update domain
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await request.json()

    const domain = await prisma.domainOpportunity.update({
      where: { id },
      data: {
        domain: data.domain,
        status: data.status,
        estimatedValue: data.estimatedValue,
        niche: data.niche,
        priority: data.priority,
        notes: data.notes,
        radarNotes: data.radarNotes,
      },
    })

    return NextResponse.json(domain)
  } catch (error) {
    console.error('Error updating domain:', error)
    return NextResponse.json(
      { error: 'Failed to update domain' },
      { status: 500 }
    )
  }
}

// DELETE /api/domains/[id] - delete domain
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.domainOpportunity.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting domain:', error)
    return NextResponse.json(
      { error: 'Failed to delete domain' },
      { status: 500 }
    )
  }
}
