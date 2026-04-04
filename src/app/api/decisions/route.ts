import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/decisions - list decisions (supports filtering)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get('projectId')
    const ideaId = searchParams.get('ideaId')
    const taskId = searchParams.get('taskId')
    const siteId = searchParams.get('siteId')
    const category = searchParams.get('category')
    const outcome = searchParams.get('outcome')
    const decidedBy = searchParams.get('decidedBy')
    const resultStatus = searchParams.get('resultStatus')

    const where: Record<string, unknown> = {}
    if (projectId) where.projectId = projectId
    if (ideaId) where.ideaId = ideaId
    if (taskId) where.taskId = taskId
    if (siteId) where.siteId = siteId
    if (category) where.category = category
    if (outcome) where.outcome = outcome
    if (decidedBy) where.decidedBy = decidedBy
    if (resultStatus) where.resultStatus = resultStatus

    const decisions = await prisma.decision.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(decisions)
  } catch (error) {
    console.error('Error fetching decisions:', error)
    return NextResponse.json({ error: 'Failed to fetch decisions' }, { status: 500 })
  }
}

// POST /api/decisions - create new decision
export async function POST(request: Request) {
  try {
    const data = await request.json()

    if (!data.title || !data.context || !data.outcome || !data.rationale || !data.decidedBy) {
      return NextResponse.json(
        { error: 'Missing required fields: title, context, outcome, rationale, decidedBy' },
        { status: 400 }
      )
    }

    const decision = await prisma.decision.create({
      data: {
        title: data.title,
        context: data.context,
        outcome: data.outcome,
        rationale: data.rationale,
        decidedBy: data.decidedBy,
        category: data.category || 'general',
        projectId: data.projectId,
        ideaId: data.ideaId,
        taskId: data.taskId,
        siteId: data.siteId,
        resultStatus: data.resultStatus || 'pending',
        reviewDate: data.reviewDate ? new Date(data.reviewDate) : undefined,
        tags: data.tags || [],
      },
    })

    return NextResponse.json(decision)
  } catch (error) {
    console.error('Error creating decision:', error)
    return NextResponse.json({ error: 'Failed to create decision' }, { status: 500 })
  }
}
