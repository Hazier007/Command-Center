import { NextResponse } from 'next/server';
import { google } from 'googleapis';

function getAuth() {
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON || '{}');
  return new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
  });
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const propertyId = searchParams.get('property');
    const days = parseInt(searchParams.get('days') || '28');
    
    const auth = getAuth();
    
    // If no specific property, list all properties
    if (!propertyId) {
      const analyticsadmin = google.analyticsadmin({ version: 'v1beta', auth });
      
      try {
        const accountsRes = await analyticsadmin.accounts.list();
        const accounts = accountsRes.data.accounts || [];
        
        const allProperties = [];
        
        for (const account of accounts) {
          if (account.name) {
            const propertiesRes = await analyticsadmin.accounts.properties.list({
              parent: account.name,
            });
            
            if (propertiesRes.data.properties) {
              allProperties.push(...propertiesRes.data.properties);
            }
          }
        }
        
        return NextResponse.json({ accounts, properties: allProperties });
      } catch (error) {
        console.error('Failed to list GA4 properties:', error);
        return NextResponse.json({ accounts: [], properties: [] });
      }
    }
    
    // Get analytics data for specific property
    const analyticsdata = google.analyticsdata({ version: 'v1beta', auth });
    
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    const formatDate = (d: Date) => d.toISOString().split('T')[0];
    
    // Get basic pageviews and sessions data
    const res = await analyticsdata.properties.runReport({
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [
          {
            startDate: formatDate(startDate),
            endDate: formatDate(endDate),
          },
        ],
        metrics: [
          { name: 'screenPageViews' },
          { name: 'sessions' },
          { name: 'activeUsers' },
          { name: 'bounceRate' },
        ],
        dimensions: [
          { name: 'pagePath' },
        ],
        orderBys: [
          {
            metric: { metricName: 'screenPageViews' },
            desc: true,
          },
        ],
        limit: 20,
      },
    });
    
    // Get totals
    const totalRes = await analyticsdata.properties.runReport({
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [
          {
            startDate: formatDate(startDate),
            endDate: formatDate(endDate),
          },
        ],
        metrics: [
          { name: 'screenPageViews' },
          { name: 'sessions' },
          { name: 'activeUsers' },
          { name: 'bounceRate' },
        ],
      },
    });
    
    return NextResponse.json({
      property: propertyId,
      period: { start: formatDate(startDate), end: formatDate(endDate) },
      totals: totalRes.data.rows?.[0] || null,
      topPages: res.data.rows || [],
      headers: res.data.dimensionHeaders || [],
      metricHeaders: res.data.metricHeaders || [],
    });
  } catch (error) {
    console.error('GA4 API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GA4 data', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}