import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateAgentToken, unauthorizedResponse } from '@/lib/agent-auth'

// GET /api/agent/my-tasks?agent=forge
// Returns an agent's pending work: open tasks, unread messages, and relevant context
export async function GET(request: NextRequest) {
  const auth = validateAgentToken(request)
  if (!auth.valid) return unauthorizedResponse(auth.error!)

  const { searchParams } = new URL(request.url)
  const agent = searchParams.get('agent')

  if (!agent) {
    return NextResponse.json({ error: 'Missing ?agent= parameter' }, { status: 400 })
  }

  try {
    const [tasks, messages, recentLogs] = await Promise.all([
      // Open tasks assigned to this agent
      prisma.task.findMany({
        where: {
          assignee: agent,
          status: { in: ['todo', 'in-progress'] },
        },
        orderBy: [
          { priority: 'desc' },
          { createdAt: 'asc' },
        ],
        include: {
          project: { select: { id: true, name: true, clientName: true } },
          site: { select: { id: true, domain: true, status: true } },
        },
      }),

      // Unread messages for this agent
      prisma.agentMessage.findMany({
        where: { toAgent: agent, read: false },
        orderBy: { createdAt: 'desc' },
        take: 10,
      }),

      // This agent's recent activity (last 24h)
      prisma.agentLog.findMany({
        where: {
          source: agent,
          createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
        },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: { action: true, createdAt: true },
      }),
    ])

    const highPriority = tasks.filter(t => t.priority === 'high')
    const inProgress = tasks.filter(t => t.status === 'in-progress')
    const todo = tasks.filter(t => t.status === 'todo')

    return NextResponse.json({
      agent,
      timestamp: new Date().toISOString(),
      summary: {
        totalOpen: tasks.length,
        highPriority: highPriority.length,
        inProgress: inProgress.length,
        todo: todo.length,
        unreadMessages: messages.length,
        lastActive: recentLogs[0]?.createdAt || null,
      },
      tasks,
      messages,
      // Instruction for the agent
      instruction: tasks.length > 0
        ? `Je hebt ${tasks.length} openstaande taken. ${highPriority.length > 0 ? `${highPriority.length} daarvan zijn HIGH priority — begin daar.` : 'Werk ze af op volgorde van prioriteit.'} ${inProgress.length > 0 ? `${inProgress.length} taken zijn al in-progress.` : ''} Rapporteer voortgang via POST /api/agent/report.`
        : 'Geen openstaande taken. Standby.',
    })
  } catch (error) {
    console.error('Error fetching agent tasks:', error)
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 })
  }
}
