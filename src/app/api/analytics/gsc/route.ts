import { NextResponse } from 'next/server';
import { google } from 'googleapis';

function getAuth() {
  try {
    // Try to get credentials from environment variable first
    if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
      const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
      return new google.auth.JWT(
        credentials.client_email,
        null,
        credentials.private_key,
        ['https://www.googleapis.com/auth/webmasters.readonly']
      );
    }
    
    // Fallback to file (though this won't work in production)
    throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON environment variable not set');
  } catch (error) {
    console.error('Error setting up GSC auth:', error);
    throw error;
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const siteUrl = searchParams.get('site');
    const days = parseInt(searchParams.get('days') || '28');

    const auth = getAuth();
    const webmasters = google.searchconsole({ version: 'v1', auth });

    // If no site specified, return list of sites
    if (!siteUrl) {
      const sitesResponse = await webmasters.sites.list();
      return NextResponse.json({
        siteUrls: sitesResponse.data.siteEntry || []
      });
    }

    // Get data for specific site
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);

    const formatDate = (date: Date) => {
      return date.toISOString().split('T')[0];
    };

    const startDateStr = formatDate(startDate);
    const endDateStr = formatDate(endDate);

    // Get total metrics
    const totalResponse = await webmasters.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: startDateStr,
        endDate: endDateStr,
        dimensions: [],
        aggregationType: 'sum'
      }
    });

    // Get top queries
    const queriesResponse = await webmasters.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: startDateStr,
        endDate: endDateStr,
        dimensions: ['query'],
        rowLimit: 20,
        aggregationType: 'sum'
      }
    });

    // Get top pages
    const pagesResponse = await webmasters.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: startDateStr,
        endDate: endDateStr,
        dimensions: ['page'],
        rowLimit: 20,
        aggregationType: 'sum'
      }
    });

    const totals = totalResponse.data.rows?.[0] || {
      clicks: 0,
      impressions: 0,
      ctr: 0,
      position: 0
    };

    return NextResponse.json({
      site: siteUrl,
      period: {
        start: startDateStr,
        end: endDateStr
      },
      totals: {
        clicks: totals.clicks || 0,
        impressions: totals.impressions || 0,
        ctr: totals.ctr || 0,
        position: totals.position || 0
      },
      topQueries: (queriesResponse.data.rows || []).map(row => ({
        keys: row.keys || [],
        clicks: row.clicks || 0,
        impressions: row.impressions || 0,
        ctr: row.ctr || 0,
        position: row.position || 0
      })),
      topPages: (pagesResponse.data.rows || []).map(row => ({
        keys: row.keys || [],
        clicks: row.clicks || 0,
        impressions: row.impressions || 0,
        ctr: row.ctr || 0,
        position: row.position || 0
      }))
    });

  } catch (error) {
    console.error('GSC API Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch GSC data', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}