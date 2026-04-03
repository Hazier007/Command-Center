import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { validateAgentToken, unauthorizedResponse } from '@/lib/agent-auth'

const prisma = new PrismaClient()

type AgentAction = 'task' | 'idea' | 'alert' | 'note' | 'context' | 'domain-eval'

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

// POST /api/agent/idea — Dump an idea (with optional SPARK scoring)
async function handleIdea(body: Record<string, unknown>) {
  const { source, title, description, category, priority } = body

  const idea = await prisma.idea.create({
    data: {
      title: title as string,
      description: (description as string) || '',
      category: (category as string) || 'feature',
      priority: (priority as string) || 'medium',
      status: body.status as string || 'raw',
      assignedTo: source as string | undefined,
      businessUnit: body.businessUnit as string | undefined,
      revenueEstimate: body.revenueEstimate as number | undefined,
      // SPARK scoring fields
      scoreOverall: body.scoreOverall as number | undefined,
      scoreFeasibility: body.scoreFeasibility as number | undefined,
      scoreRevenuePotential: body.scoreRevenuePotential as number | undefined,
      scoreTimeToRevenue: body.scoreTimeToRevenue as number | undefined,
      scoreCompetition: body.scoreCompetition as number | undefined,
      scoreStrategicFit: body.scoreStrategicFit as number | undefined,
      recommendation: body.recommendation as string | undefined,
      estimatedInvestment: body.estimatedInvestment as string | undefined,
      estimatedRevenue: body.estimatedRevenue as string | undefined,
      evaluatedAt: body.scoreOverall ? new Date() : undefined,
      evaluatedBy: body.scoreOverall ? (source as string) : undefined,
      linkedProjectId: body.linkedProjectId as string | undefined,
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

// POST /api/agent/domain-eval — SPARK evaluates a domain acquisition
async function handleDomainEval(body: Record<string, unknown>) {
  const { source, domain, niche, estimatedValue, priority, notes } = body

  // Create or update DomainOpportunity
  const existing = await prisma.domainOpportunity.findFirst({
    where: { domain: domain as string },
  })

  const domainOpp = existing
    ? await prisma.domainOpportunity.update({
        where: { id: existing.id },
        data: {
          niche: (niche as string) || existing.niche,
          estimatedValue: (estimatedValue as number) ?? existing.estimatedValue,
          priority: (priority as string) || existing.priority,
          notes: (notes as string) || existing.notes,
          radarNotes: body.radarNotes as string | undefined,
          status: (body.status as string) || existing.status,
        },
      })
    : await prisma.domainOpportunity.create({
        data: {
          domain: domain as string,
          status: (body.status as string) || 'parking',
          niche: niche as string | undefined,
          estimatedValue: estimatedValue as number | undefined,
          priority: (priority as string) || 'medium',
          notes: notes as string | undefined,
          radarNotes: body.radarNotes as string | undefined,
        },
      })

  // Optionally create a scored idea linked to this domain
  if (body.scoreOverall) {
    await prisma.idea.create({
      data: {
        title: `Domeinacquisitie: ${domain}`,
        description: (body.analysis as string) || `Evaluatie van ${domain} in niche: ${niche}`,
        category: 'domain_acquisition',
        priority: (priority as string) || 'medium',
        status: 'evaluating',
        assignedTo: source as string,
        scoreOverall: body.scoreOverall as number,
        scoreFeasibility: body.scoreFeasibility as number | undefined,
        scoreRevenuePotential: body.scoreRevenuePotential as number | undefined,
        scoreTimeToRevenue: body.scoreTimeToRevenue as number | undefined,
        scoreCompetition: body.scoreCompetition as number | undefined,
        scoreStrategicFit: body.scoreStrategicFit as number | undefined,
        recommendation: body.recommendation as string | undefined,
        estimatedInvestment: body.estimatedInvestment as string | undefined,
        estimatedRevenue: body.estimatedRevenue as string | undefined,
        evaluatedAt: new Date(),
        evaluatedBy: source as string,
        revenueEstimate: estimatedValue as number | undefined,
      },
    })
  }

  await logAgentAction(source as string, 'domain-eval', { domainId: domainOpp.id, domain })
  return domainOpp
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
      case 'domain-eval':
        if (!body.domain) return NextResponse.json({ error: 'Missing required field: domain' }, { status: 400 })
        result = await handleDomainEval(body)
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
