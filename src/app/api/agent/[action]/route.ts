import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { validateAgentToken, unauthorizedResponse } from '@/lib/agent-auth'

const prisma = new PrismaClient()

type AgentAction = 'task' | 'idea' | 'alert' | 'note' | 'context'

async function logAgentAction(source: string, action: string, payload: unknown) {
  await prisma.agentLog.create({
    data: {
      source,
      action,
      payload: JSON.stringify(payload),
    },
  })
}

// POST /api/agent/task — Create a task
async function handleTask(body: Record<string, unknown>) {
  const { source, title, description, projectId, priority, assignee, needsApproval } = body

  const task = await prisma.task.create({
    data: {
      title: title as string,
      description: description as string | undefined,
      status: 'todo',
      projectId: projectId as string | undefined,
      priority: (priority as string) || 'medium',
      assignee: assignee as string | undefined,
      agentAssignee: assignee as string | undefined,
      source: 'agent',
      needsApproval: (needsApproval as boolean) || false,
      approvalSource: source as string | undefined,
    },
  })

  await logAgentAction(source as string, 'task', { taskId: task.id, title })
  return task
}

// POST /api/agent/idea — Dump an idea
async function handleIdea(body: Record<string, unknown>) {
  const { source, title, description, category, priority } = body

  const idea = await prisma.idea.create({
    data: {
      title: title as string,
      description: (description as string) || '',
      category: (category as string) || 'feature',
      priority: (priority as string) || 'medium',
      status: 'raw',
      assignedTo: source as string | undefined,
    },
  })

  await logAgentAction(source as string, 'idea', { ideaId: idea.id, title })
  return idea
}

// POST /api/agent/alert — Trigger an alert
async function handleAlert(body: Record<string, unknown>) {
  const { source, title, body: alertBody, priority } = body

  const alert = await prisma.alert.create({
    data: {
      title: title as string,
      body: (alertBody as string) || '',
      priority: (priority as string) || 'medium',
    },
  })

  await logAgentAction(source as string, 'alert', { alertId: alert.id, title, priority })
  return alert
}

// POST /api/agent/note — Add a note
async function handleNote(body: Record<string, unknown>) {
  const { source, title, content, tags } = body

  const note = await prisma.note.create({
    data: {
      title: title as string,
      content: (content as string) || '',
      tags: (tags as string[]) || [],
    },
  })

  await logAgentAction(source as string, 'note', { noteId: note.id, title })
  return note
}

// GET /api/agent/context — Get full CC context
async function handleContext() {
  const [projects, tasks, sites, alerts, nowItems, ideas, recentActivity, costs, kpis] = await Promise.all([
    prisma.project.findMany({ where: { status: 'active' }, orderBy: { updatedAt: 'desc' } }),
    prisma.task.findMany({ where: { status: { not: 'done' } }, orderBy: { createdAt: 'desc' }, take: 50 }),
    prisma.site.findMany({ orderBy: { domain: 'asc' } }),
    prisma.alert.findMany({ where: { resolved: false }, orderBy: { createdAt: 'desc' } }),
    prisma.nowItem.findMany({ orderBy: { createdAt: 'desc' }, take: 3 }),
    prisma.idea.findMany({ where: { status: { in: ['raw', 'evaluating', 'promising'] } }, orderBy: { createdAt: 'desc' }, take: 20 }),
    prisma.activity.findMany({ orderBy: { createdAt: 'desc' }, take: 20 }),
    prisma.cost.findMany({ where: { recurring: true }, orderBy: { category: 'asc' } }),
    prisma.kPI.findMany({ orderBy: { measuredAt: 'desc' }, take: 10 }),
  ])

  // Finance summary for context
  const monthlyCosts = costs.reduce((sum, c) => {
    if (c.billingCycle === 'yearly') return sum + c.amount / 12
    return sum + c.amount
  }, 0)
  const clientMRR = projects
    .filter(p => p.ownerType === 'client')
    .reduce((sum, p) => sum + (p.monthlyFee || 0), 0)
  const siteMRR = sites.reduce((sum, s) => sum + (s.monthlyRevenue || 0), 0)

  return {
    projects,
    openTasks: tasks,
    sites,
    unresolvedAlerts: alerts,
    nowItems,
    activeIdeas: ideas,
    recentActivity,
    finance: {
      totalMRR: Math.round((clientMRR + siteMRR) * 100) / 100,
      clientMRR: Math.round(clientMRR * 100) / 100,
      siteMRR: Math.round(siteMRR * 100) / 100,
      monthlyCosts: Math.round(monthlyCosts * 100) / 100,
      netProfit: Math.round((clientMRR + siteMRR - monthlyCosts) * 100) / 100,
      kpis,
    },
    timestamp: new Date().toISOString(),
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ action: string }> }
) {
  const auth = validateAgentToken(request)
  if (!auth.valid) return unauthorizedResponse(auth.error!)

  const { action } = await params

  try {
    const body = await request.json()

    if (!body.source) {
      return NextResponse.json({ error: 'Missing required field: source' }, { status: 400 })
    }

    let result

    switch (action as AgentAction) {
      case 'task':
        if (!body.title) return NextResponse.json({ error: 'Missing required field: title' }, { status: 400 })
        result = await handleTask(body)
        break
      case 'idea':
        if (!body.title) return NextResponse.json({ error: 'Missing required field: title' }, { status: 400 })
        result = await handleIdea(body)
        break
      case 'alert':
        if (!body.title) return NextResponse.json({ error: 'Missing required field: title' }, { status: 400 })
        result = await handleAlert(body)
        break
      case 'note':
        if (!body.title) return NextResponse.json({ error: 'Missing required field: title' }, { status: 400 })
        result = await handleNote(body)
        break
      default:
        return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 })
    }

    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error(`Agent API error (${action}):`, error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ action: string }> }
) {
  const auth = validateAgentToken(request)
  if (!auth.valid) return unauthorizedResponse(auth.error!)

  const { action } = await params

  if (action !== 'context') {
    return NextResponse.json({ error: `GET not supported for action: ${action}` }, { status: 400 })
  }

  try {
    const context = await handleContext()
    await logAgentAction('system', 'context', { requestedAt: new Date().toISOString() })
    return NextResponse.json({ success: true, data: context })
  } catch (error) {
    console.error('Agent API error (context):', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
