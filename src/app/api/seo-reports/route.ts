import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/seo-reports — List SEO reports with filters
export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams

  const where: Record<string, unknown> = {}

  if (sp.get('subtype')) where.subtype = sp.get('subtype')
  if (sp.get('agent')) where.agent = sp.get('agent')
  if (sp.get('status')) where.status = sp.get('status')
  if (sp.get('linkedSiteId')) where.linkedSiteId = sp.get('linkedSiteId')
  if (sp.get('linkedDomainId')) where.linkedDomainId = sp.get('linkedDomainId')
  if (sp.get('linkedTaskId')) where.linkedTaskId = sp.get('linkedTaskId')
  if (sp.get('runId')) where.runId = sp.get('runId')
  if (sp.get('dataSource')) where.dataSource = sp.get('dataSource')
  if (sp.get('needsApproval') === 'true') where.needsApproval = true

  // Score range filters
  if (sp.get('seoScoreMin') || sp.get('seoScoreMax')) {
    where.seoScore = {}
    if (sp.get('seoScoreMin')) (where.seoScore as Record<string, unknown>).gte = parseInt(sp.get('seoScoreMin')!)
    if (sp.get('seoScoreMax')) (where.seoScore as Record<string, unknown>).lte = parseInt(sp.get('seoScoreMax')!)
  }

  if (sp.get('quickWinMin')) {
    where.quickWinCount = { gte: parseInt(sp.get('quickWinMin')!) }
  }

  // Search
  if (sp.get('search')) {
    const s = sp.get('search')!
    where.OR = [
      { title: { contains: s, mode: 'insensitive' } },
      { summary: { contains: s, mode: 'insensitive' } },
      { topKeyword: { contains: s, mode: 'insensitive' } },
    ]
  }

  // Sort
  const sortBy = sp.get('sortBy') || 'createdAt'
  const order = sp.get('order') || 'desc'
  const orderBy = { [sortBy]: order }

  // Pagination
  const limit = Math.min(parseInt(sp.get('limit') || '25'), 100)
  const page = parseInt(sp.get('page') || '1')
  const offset = (page - 1) * limit

  const [data, total] = await Promise.all([
    prisma.seoReport.findMany({
      where,
      orderBy,
      take: limit,
      skip: offset,
    }),
    prisma.seoReport.count({ where }),
  ])

  return NextResponse.json({
    data,
    pagination: { total, page, pages: Math.ceil(total / limit), limit },
  })
}

// POST /api/seo-reports — Create a new SEO report
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.subtype || !body.title) {
      return NextResponse.json({ error: 'Missing required fields: subtype, title' }, { status: 400 })
    }

    const report = await prisma.seoReport.create({
      data: {
        subtype: body.subtype,
        agent: body.agent || 'radar',
        title: body.title,
        summary: body.summary || undefined,
        status: body.status || 'final',
        needsApproval: body.needsApproval || false,
        linkedSiteId: body.linkedSiteId || undefined,
        linkedDomainId: body.linkedDomainId || undefined,
        linkedTaskId: body.linkedTaskId || undefined,
        linkedContentId: body.linkedContentId || undefined,
        linkedIdeaId: body.linkedIdeaId || undefined,
        runId: body.runId || undefined,
        seoScore: body.seoScore ?? undefined,
        topKeyword: body.topKeyword || undefined,
        topPosition: body.topPosition ?? undefined,
        monthlyClicks: body.monthlyClicks ?? undefined,
        monthlyImpressions: body.monthlyImpressions ?? undefined,
        avgCtr: body.avgCtr ?? undefined,
        quickWinCount: body.quickWinCount ?? undefined,
        dataSource: body.dataSource || undefined,
        periodDays: body.periodDays ?? undefined,
        metadata: body.metadata || undefined,
      },
    })

    return NextResponse.json({ success: true, data: report }, { status: 201 })
  } catch (error) {
    console.error('SEO Reports POST error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
