import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/revenue/[id] - get single revenue entry
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const entry = await prisma.revenueEntry.findUnique({
      where: { id },
    })

    if (!entry) {
      return NextResponse.json(
        { error: 'Revenue entry not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(entry)
  } catch (error) {
    console.error('Error fetching revenue entry:', error)
    return NextResponse.json(
      { error: 'Failed to fetch revenue entry' },
      { status: 500 }
    )
  }
}

// PATCH /api/revenue/[id] - update revenue entry
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await request.json()

    const entry = await prisma.revenueEntry.update({
      where: { id },
      data: {
        source: data.source,
        description: data.description,
        amount: data.amount,
        month: data.month,
        projectId: data.projectId,
        siteDomain: data.siteDomain,
        recurring: data.recurring,
      },
    })

    return NextResponse.json(entry)
  } catch (error) {
    console.error('Error updating revenue entry:', error)
    return NextResponse.json(
      { error: 'Failed to update revenue entry' },
      { status: 500 }
    )
  }
}

// DELETE /api/revenue/[id] - delete revenue entry
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.revenueEntry.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting revenue entry:', error)
    return NextResponse.json(
      { error: 'Failed to delete revenue entry' },
      { status: 500 }
    )
  }
}
