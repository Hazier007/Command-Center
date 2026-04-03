import { NextRequest, NextResponse } from 'next/server'
import { fetchWindsorGA4, getGA4Domains } from '@/lib/windsor'

// GET /api/windsor/ga4?domain=budprofiles.com&days=28
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const domain = searchParams.get('domain')
    const datePreset = searchParams.get('days')
      ? `last_${searchParams.get('days')}d`
      : searchParams.get('date_preset') || 'last_28d'

    if (!process.env.WINDSOR_API_KEY) {
      return NextResponse.json({ error: 'WINDSOR_API_KEY not configured' }, { status: 503 })
    }

    // If no domain specified, return available domains
    if (!domain) {
      return NextResponse.json({
        availableDomains: getGA4Domains(),
        message: 'Specify ?domain=example.com to fetch GA4 data',
      })
    }

    const rows = await fetchWindsorGA4(domain, datePreset)

    // Aggregate stats
    const totalSessions = rows.reduce((sum, r) => sum + (r.sessions || 0), 0)
    const totalPageviews = rows.reduce((sum, r) => sum + (r.pageviews || 0), 0)
    const totalUsers = rows.reduce((sum, r) => sum + (r.users || 0), 0)

    return NextResponse.json({
      domain,
      datePreset,
      stats: {
        totalSessions,
        totalPageviews,
        totalUsers,
        totalRows: rows.length,
      },
      data: rows.slice(0, 200),
    })
  } catch (error) {
    console.error('Windsor GA4 API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch GA4 data', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    )
  }
}
