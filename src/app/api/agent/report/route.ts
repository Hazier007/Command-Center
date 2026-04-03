import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateAgentToken, unauthorizedResponse } from '@/lib/agent-auth'

// POST /api/agent/report — Agent reports task progress or completion
// Body: { agent, taskId, status, result?, note? }
export async function POST(request: NextRequest) {
  const auth = validateAgentToken(request)
  if (!auth.valid) return unauthorizedResponse(auth.error!)

  try {
    const body = await request.json()
    const { agent, taskId, status, result, note } = body

    if (!agent || !taskId) {
      return NextResponse.json(
        { error: 'Missing required fields: agent, taskId' },
        { status: 400 }
      )
    }

    // Update the task status
    const updateData: Record<string, unknown> = {}
    if (status) updateData.status = status // 'in-progress', 'done', 'blocked'
    if (result) updateData.description = undefined // don't overwrite, append via note

    const task = await prisma.task.update({
      where: { id: taskId },
      data: {
        ...(status && { status }),
        ...(status === 'done' && { completedAt: new Date() }),
      },
      include: {
        project: { select: { id: true, name: true } },
        site: { select: { id: true, domain: true } },
      },
    })

    // Create a note with the result if provided
    if (note || result) {
      await prisma.note.create({
        data: {
          title: `[${agent.toUpperCase()}] ${status === 'done' ? 'Taak afgerond' : 'Voortgang'}: ${task.title}`,
          body: note || result || '',
          agentId: agent,
          noteType: 'progress',
          linkedTaskId: taskId,
          linkedSiteId: task.siteId || undefined,
        },
      })
    }

    // Log the action
    await prisma.agentLog.create({
      data: {
        source: agent,
        action: `report-${status || 'update'}`,
        payload: JSON.stringify({ taskId, status, hasResult: !!result, hasNote: !!note }),
      },
    })

    // Mark related messages as read
    await prisma.agentMessage.updateMany({
      where: { toAgent: agent, taskId, read: false },
      data: { read: true },
    })

    return NextResponse.json({
      success: true,
      task,
      message: status === 'done'
        ? `Taak "${task.title}" afgerond.`
        : `Taak "${task.title}" bijgewerkt naar ${status || 'updated'}.`,
    })
  } catch (error) {
    console.error('Error processing agent report:', error)
    return NextResponse.json({ error: 'Failed to process report' }, { status: 500 })
  }
}
