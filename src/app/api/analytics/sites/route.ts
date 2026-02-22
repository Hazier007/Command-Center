import { NextResponse } from 'next/server';
import { google } from 'googleapis';

function getAuth() {
  try {
    // Try to get credentials from environment variable first
    if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
      const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
      return new google.auth.JWT({
        email: credentials.client_email,
        key: credentials.private_key,
        scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
      });
    }
    
    // Fallback to file (though this won't work in production)
    throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON environment variable not set');
  } catch (error) {
    console.error('Error setting up GSC auth:', error);
    throw error;
  }
}

export async function GET() {
  try {
    const auth = getAuth();
    const webmasters = google.searchconsole({ version: 'v1', auth });

    // Get list of all sites the service account has access to
    const sitesResponse = await webmasters.sites.list();
    
    return NextResponse.json({
      sites: sitesResponse.data.siteEntry || []
    });

  } catch (error) {
    console.error('GSC Sites API Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch GSC sites', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}