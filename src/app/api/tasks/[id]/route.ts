import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PATCH /api/tasks/[id] - update task (only updates provided fields)
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await request.json()

    // Auto-assign to Bart when status changes to review
    const resolvedAssignee = data.status === 'review' ? 'bart' : data.assignee

    const task = await prisma.task.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.status !== undefined && { status: data.status }),
        ...(data.projectId !== undefined && { projectId: data.projectId }),
        ...(data.siteId !== undefined && { siteId: data.siteId }),
        ...(data.priority !== undefined && { priority: data.priority }),
        ...(resolvedAssignee !== undefined && { assignee: resolvedAssignee }),
        ...(data.dueDate !== undefined && { dueDate: data.dueDate ? new Date(data.dueDate) : null }),
        ...(data.notified !== undefined && { notified: data.notified }),
        ...(data.notifiedAt !== undefined && { notifiedAt: new Date(data.notifiedAt) }),
        ...(data.needsApproval !== undefined && { needsApproval: data.needsApproval }),
        ...(data.source !== undefined && { source: data.source }),
        ...(data.parentTaskId !== undefined && { parentTaskId: data.parentTaskId }),
      },
      include: {
        project: true,
        site: true,
        subtasks: { select: { id: true, title: true, status: true, assignee: true } },
      },
    })

    // ── Auto-publish trigger ─────────────────────────────
    // When a task that was dispatched by "Stuur naar FORGE voor publicatie"
    // transitions to `done`, auto-bump any linked content that's in
    // `publish_requested` state to `published`. This closes the loop so
    // Bart doesn't have to manually remember to flip the content status.
    if (data.status === 'done') {
      try {
        await prisma.content.updateMany({
          where: {
            linkedTaskId: id,
            status: 'publish_requested',
          },
          data: { status: 'published' },
        })
      } catch (triggerErr) {
        console.error('Auto-publish trigger failed:', triggerErr)
        // Intentionally don't fail the whole request — task update succeeded.
      }
    }

    return NextResponse.json(task)
  } catch (error) {
    console.error('Error updating task:', error)
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    )
  }
}

// DELETE /api/tasks/[id] - delete task
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    await prisma.task.delete({
      where: { id },
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting task:', error)
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    )
  }
}