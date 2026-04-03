import { NextResponse } from 'next/server';
import { getGSCDomains, getGA4Domains } from '@/lib/windsor';

export async function GET() {
  const hasApiKey = !!process.env.WINDSOR_API_KEY;

  return NextResponse.json({
    connected: hasApiKey,
    gscDomains: getGSCDomains(),
    ga4Domains: getGA4Domains(),
    message: hasApiKey
      ? 'Windsor.ai API connected'
      : 'WINDSOR_API_KEY not configured',
  });
}
