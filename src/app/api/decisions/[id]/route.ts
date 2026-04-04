import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/decisions/[id]
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const decision = await prisma.decision.findUnique({ where: { id } })

    if (!decision) {
      return NextResponse.json({ error: 'Decision not found' }, { status: 404 })
    }

    return NextResponse.json(decision)
  } catch (error) {
    console.error('Error fetching decision:', error)
    return NextResponse.json({ error: 'Failed to fetch decision' }, { status: 500 })
  }
}

// PATCH /api/decisions/[id]
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await request.json()

    const decision = await prisma.decision.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.context !== undefined && { context: data.context }),
        ...(data.outcome !== undefined && { outcome: data.outcome }),
        ...(data.rationale !== undefined && { rationale: data.rationale }),
        ...(data.decidedBy !== undefined && { decidedBy: data.decidedBy }),
        ...(data.category !== undefined && { category: data.category }),
        ...(data.projectId !== undefined && { projectId: data.projectId }),
        ...(data.ideaId !== undefined && { ideaId: data.ideaId }),
        ...(data.taskId !== undefined && { taskId: data.taskId }),
        ...(data.siteId !== undefined && { siteId: data.siteId }),
        ...(data.resultStatus !== undefined && { resultStatus: data.resultStatus }),
        ...(data.reviewDate !== undefined && { reviewDate: data.reviewDate ? new Date(data.reviewDate) : null }),
        ...(data.tags !== undefined && { tags: data.tags }),
      },
    })

    return NextResponse.json(decision)
  } catch (error) {
    console.error('Error updating decision:', error)
    return NextResponse.json({ error: 'Failed to update decision' }, { status: 500 })
  }
}

// DELETE /api/decisions/[id]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.decision.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting decision:', error)
    return NextResponse.json({ error: 'Failed to delete decision' }, { status: 500 })
  }
}
