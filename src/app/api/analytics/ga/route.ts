import { NextResponse } from 'next/server';
import { google } from 'googleapis';

function getAuth() {
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON || '{}');
  return new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
  });
}

export async function GET() {
  try {
    const auth = getAuth();
    const analyticsadmin = google.analyticsadmin({ version: 'v1beta', auth });

    const accountsRes = await analyticsadmin.accounts.list();
    const accounts = accountsRes.data.accounts || [];

    const allProperties: unknown[] = [];

    for (const account of accounts) {
      if (account.name) {
        try {
          const propertiesRes = await analyticsadmin.properties.list({
            filter: `parent:${account.name}`,
          });
          if (propertiesRes.data.properties) {
            allProperties.push(...propertiesRes.data.properties);
          }
        } catch {
          // Skip accounts where we can't list properties
        }
      }
    }

    return NextResponse.json({ accounts, properties: allProperties });
  } catch (error) {
    console.error('GA4 API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GA4 data', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
