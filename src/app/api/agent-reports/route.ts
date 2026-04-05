import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/agent-reports — list reports with filters
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const agent = searchParams.get('agent')
    const reportType = searchParams.get('reportType')
    const status = searchParams.get('status')
    const outcome = searchParams.get('outcome')
    const priority = searchParams.get('priority')
    const category = searchParams.get('category')
    const linkedSiteId = searchParams.get('linkedSiteId')
    const linkedTaskId = searchParams.get('linkedTaskId')
    const linkedSprintId = searchParams.get('linkedSprintId')
    const environment = searchParams.get('environment')
    const repo = searchParams.get('repo')
    const needsApproval = searchParams.get('needsApproval')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '25')

    const where: Record<string, unknown> = {}
    if (agent) where.agent = agent
    if (reportType) where.reportType = reportType
    if (status) where.status = status
    if (outcome) where.outcome = outcome
    if (priority) where.priority = priority
    if (category) where.category = category
    if (linkedSiteId) where.linkedSiteId = linkedSiteId
    if (linkedTaskId) where.linkedTaskId = linkedTaskId
    if (linkedSprintId) where.linkedSprintId = linkedSprintId
    if (environment) where.environment = environment
    if (repo) where.repo = repo
    if (needsApproval === 'true') where.needsApproval = true
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { summary: { contains: search, mode: 'insensitive' } },
        { body: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [reports, total] = await Promise.all([
      prisma.agentReport.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.agentReport.count({ where }),
    ])

    return NextResponse.json({
      data: reports,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    })
  } catch (error) {
    console.error('Error fetching agent reports:', error)
    return NextResponse.json({ error: 'Failed to fetch reports' }, { status: 500 })
  }
}

// POST /api/agent-reports — create a report
export async function POST(request: Request) {
  try {
    const data = await request.json()

    const report = await prisma.agentReport.create({
      data: {
        agent: data.agent,
        reportType: data.reportType,
        title: data.title,
        summary: data.summary,
        body: data.body,
        status: data.status || 'done',
        outcome: data.outcome,
        priority: data.priority || 'medium',
        category: data.category || 'dev',
        needsApproval: data.needsApproval ?? false,
        approvalReason: data.approvalReason,
        linkedTaskId: data.linkedTaskId,
        linkedSiteId: data.linkedSiteId,
        linkedSprintId: data.linkedSprintId,
        linkedContentId: data.linkedContentId,
        linkedIdeaId: data.linkedIdeaId,
        linkedDomainId: data.linkedDomainId,
        parentReportId: data.parentReportId,
        environment: data.environment,
        repo: data.repo,
        branch: data.branch,
        metadata: data.metadata,
        startedAt: data.startedAt ? new Date(data.startedAt) : undefined,
        completedAt: data.completedAt ? new Date(data.completedAt) : undefined,
      },
    })

    return NextResponse.json(report)
  } catch (error) {
    console.error('Error creating agent report:', error)
    return NextResponse.json({ error: 'Failed to create report' }, { status: 500 })
  }
}
