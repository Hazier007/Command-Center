import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/keywords?domain=datumberekenen.be&keyword=datum+berekenen&days=90
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const domain = searchParams.get('domain')
    const keyword = searchParams.get('keyword')
    const siteId = searchParams.get('siteId')
    const days = parseInt(searchParams.get('days') || '28')
    const limit = parseInt(searchParams.get('limit') || '500')

    const since = new Date()
    since.setDate(since.getDate() - days)

    const where: Record<string, unknown> = {
      date: { gte: since },
    }
    if (domain) where.domain = domain
    if (keyword) where.keyword = { contains: keyword }
    if (siteId) where.siteId = siteId

    const entries = await prisma.keywordHistory.findMany({
      where,
      orderBy: { date: 'desc' },
      take: limit,
    })

    // If querying a specific keyword, also compute trend
    if (domain && keyword && entries.length > 1) {
      const latest = entries[0]
      const oldest = entries[entries.length - 1]
      const positionDelta = (oldest.position || 0) - (latest.position || 0) // positive = improvement

      return NextResponse.json({
        domain,
        keyword,
        trend: {
          currentPosition: latest.position,
          previousPosition: oldest.position,
          positionDelta: Math.round(positionDelta * 10) / 10,
          direction: positionDelta > 0 ? 'improving' : positionDelta < 0 ? 'declining' : 'stable',
          dataPoints: entries.length,
        },
        history: entries,
      })
    }

    return NextResponse.json(entries)
  } catch (error) {
    console.error('Error fetching keyword history:', error)
    return NextResponse.json({ error: 'Failed to fetch keyword history' }, { status: 500 })
  }
}

// POST /api/keywords — log keyword position(s)
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Support both single entry and batch
    const entries = Array.isArray(data) ? data : [data]

    const created = await prisma.keywordHistory.createMany({
      data: entries.map((e: Record<string, unknown>) => ({
        siteId: e.siteId as string | undefined,
        domain: e.domain as string,
        keyword: e.keyword as string,
        page: e.page as string | undefined,
        position: e.position as number,
        impressions: (e.impressions as number) || 0,
        clicks: (e.clicks as number) || 0,
        ctr: (e.ctr as number) || 0,
        date: e.date ? new Date(e.date as string) : new Date(),
        source: (e.source as string) || 'radar',
      })),
    })

    return NextResponse.json({
      success: true,
      created: created.count,
      message: `${created.count} keyword entries logged`,
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating keyword history:', error)
    return NextResponse.json({ error: 'Failed to create keyword history' }, { status: 500 })
  }
}
