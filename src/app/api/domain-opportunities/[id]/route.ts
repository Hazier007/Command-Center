import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PATCH /api/domain-opportunities/[id]
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await request.json()

    const domain = await prisma.domainOpportunity.update({
      where: { id },
      data: {
        ...(data.domain !== undefined && { domain: data.domain }),
        ...(data.status !== undefined && { status: data.status }),
        ...(data.estimatedValue !== undefined && { estimatedValue: data.estimatedValue }),
        ...(data.niche !== undefined && { niche: data.niche }),
        ...(data.priority !== undefined && { priority: data.priority }),
        ...(data.notes !== undefined && { notes: data.notes }),
        ...(data.radarNotes !== undefined && { radarNotes: data.radarNotes }),
      },
    })

    return NextResponse.json(domain)
  } catch (error) {
    console.error('Error updating domain opportunity:', error)
    return NextResponse.json({ error: 'Failed to update domain opportunity' }, { status: 500 })
  }
}

// DELETE /api/domain-opportunities/[id]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.domainOpportunity.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting domain opportunity:', error)
    return NextResponse.json({ error: 'Failed to delete domain opportunity' }, { status: 500 })
  }
}
