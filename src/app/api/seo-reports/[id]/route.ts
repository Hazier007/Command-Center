import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/seo-reports/[id]
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const report = await prisma.seoReport.findUnique({ where: { id } })
  if (!report) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ data: report })
}

// PATCH /api/seo-reports/[id]
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()

  try {
    const report = await prisma.seoReport.update({
      where: { id },
      data: {
        ...(body.subtype !== undefined && { subtype: body.subtype }),
        ...(body.title !== undefined && { title: body.title }),
        ...(body.summary !== undefined && { summary: body.summary }),
        ...(body.status !== undefined && { status: body.status }),
        ...(body.needsApproval !== undefined && { needsApproval: body.needsApproval }),
        ...(body.linkedSiteId !== undefined && { linkedSiteId: body.linkedSiteId }),
        ...(body.linkedDomainId !== undefined && { linkedDomainId: body.linkedDomainId }),
        ...(body.linkedTaskId !== undefined && { linkedTaskId: body.linkedTaskId }),
        ...(body.linkedContentId !== undefined && { linkedContentId: body.linkedContentId }),
        ...(body.linkedIdeaId !== undefined && { linkedIdeaId: body.linkedIdeaId }),
        ...(body.runId !== undefined && { runId: body.runId }),
        ...(body.seoScore !== undefined && { seoScore: body.seoScore }),
        ...(body.topKeyword !== undefined && { topKeyword: body.topKeyword }),
        ...(body.topPosition !== undefined && { topPosition: body.topPosition }),
        ...(body.monthlyClicks !== undefined && { monthlyClicks: body.monthlyClicks }),
        ...(body.monthlyImpressions !== undefined && { monthlyImpressions: body.monthlyImpressions }),
        ...(body.avgCtr !== undefined && { avgCtr: body.avgCtr }),
        ...(body.quickWinCount !== undefined && { quickWinCount: body.quickWinCount }),
        ...(body.dataSource !== undefined && { dataSource: body.dataSource }),
        ...(body.periodDays !== undefined && { periodDays: body.periodDays }),
        ...(body.metadata !== undefined && { metadata: body.metadata }),
      },
    })

    return NextResponse.json({ data: report })
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}

// DELETE /api/seo-reports/[id]
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    await prisma.seoReport.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}
