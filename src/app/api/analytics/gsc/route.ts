import { NextResponse } from 'next/server';
import { google } from 'googleapis';

function getAuth() {
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON || '{}');
  return new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const siteUrl = searchParams.get('site');
    const days = parseInt(searchParams.get('days') || '28');
    
    const auth = getAuth();
    const searchconsole = google.searchconsole({ version: 'v1', auth });
    
    // If no specific site, list all sites
    if (!siteUrl) {
      const res = await searchconsole.sites.list();
      return NextResponse.json(res.data);
    }
    
    // Get search analytics for specific site
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    const formatDate = (d: Date) => d.toISOString().split('T')[0];
    
    const res = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        dimensions: ['query'],
        rowLimit: 20,
      },
    });
    
    // Also get page-level data
    const pageRes = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        dimensions: ['page'],
        rowLimit: 20,
      },
    });
    
    // Get totals
    const totalRes = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
      },
    });
    
    return NextResponse.json({
      site: siteUrl,
      period: { start: formatDate(startDate), end: formatDate(endDate) },
      totals: totalRes.data.rows?.[0] || { clicks: 0, impressions: 0, ctr: 0, position: 0 },
      topQueries: res.data.rows || [],
      topPages: pageRes.data.rows || [],
    });
  } catch (error) {
    console.error('GSC API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GSC data', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}