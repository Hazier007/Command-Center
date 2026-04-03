import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PATCH /api/sprints/[id] — update sprint
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await request.json()

    const sprint = await prisma.sprint.update({
      where: { id },
      data: {
        ...(data.status !== undefined && { status: data.status }),
        ...(data.goals !== undefined && { goals: JSON.stringify(data.goals) }),
        ...(data.summary !== undefined && { summary: data.summary }),
      },
    })

    return NextResponse.json(sprint)
  } catch (error) {
    console.error('Error updating sprint:', error)
    return NextResponse.json({ error: 'Failed to update sprint' }, { status: 500 })
  }
}

// DELETE /api/sprints/[id]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.sprint.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting sprint:', error)
    return NextResponse.json({ error: 'Failed to delete sprint' }, { status: 500 })
  }
}
