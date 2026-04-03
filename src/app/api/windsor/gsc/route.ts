import { NextRequest, NextResponse } from 'next/server'
import { fetchWindsorGSC, getGSCDomains } from '@/lib/windsor'

// GET /api/windsor/gsc?domain=datumberekenen.be&days=28
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
        availableDomains: getGSCDomains(),
        message: 'Specify ?domain=example.com to fetch GSC data',
      })
    }

    const rows = await fetchWindsorGSC(domain, datePreset)

    // Aggregate stats
    const totalClicks = rows.reduce((sum, r) => sum + (r.clicks || 0), 0)
    const totalImpressions = rows.reduce((sum, r) => sum + (r.impressions || 0), 0)
    const avgPosition = rows.length > 0
      ? rows.reduce((sum, r) => sum + (r.position || 0), 0) / rows.length
      : 0

    return NextResponse.json({
      domain,
      datePreset,
      stats: {
        totalClicks,
        totalImpressions,
        avgPosition: Math.round(avgPosition * 10) / 10,
        totalKeywords: rows.length,
      },
      keywords: rows
        .sort((a, b) => (b.impressions || 0) - (a.impressions || 0))
        .slice(0, 200), // Top 200 keywords
    })
  } catch (error) {
    console.error('Windsor GSC API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch GSC data', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    )
  }
}
