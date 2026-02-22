import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { prisma } from '@/lib/prisma';

function getAuth() {
  try {
    if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
      const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
      return new google.auth.JWT({
        email: credentials.client_email,
        key: credentials.private_key,
        scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
      });
    }
    
    throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON environment variable not set');
  } catch (error) {
    console.error('Error setting up GSC auth:', error);
    throw error;
  }
}

export interface SEOOpportunity {
  id: string;
  keyword: string;
  currentPosition: number;
  impressions: number;
  currentCTR: number;
  targetPage: string;
  siteDomain: string;
  potentialClicks: number;
  status: 'nieuw' | 'research' | 'optimalisatie' | 'review' | 'live';
  createdAt: string;
  lastUpdated: string;
  hasResearchTask?: boolean;
  hasOptimizationTask?: boolean;
}

async function getGSCData(siteUrl: string, auth: any, days: number = 28) {
  const webmasters = google.searchconsole({ version: 'v1', auth });
  
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - days);

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const startDateStr = formatDate(startDate);
  const endDateStr = formatDate(endDate);

  // Get query data with page information
  const response = await webmasters.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate: startDateStr,
      endDate: endDateStr,
      dimensions: ['query', 'page'],
      rowLimit: 1000
    }
  });

  return response.data.rows || [];
}

function calculatePotentialClicks(impressions: number, currentCTR: number, position: number): number {
  // Estimated CTR improvement based on position
  let targetCTR = currentCTR;
  
  if (position >= 11) {
    targetCTR = Math.max(currentCTR, 2.0); // Target at least 2% CTR for page 2+
  } else if (position >= 6) {
    targetCTR = Math.max(currentCTR, 5.0); // Target at least 5% CTR for positions 6-10
  } else if (position >= 4) {
    targetCTR = Math.max(currentCTR, 8.0); // Target at least 8% CTR for positions 4-5
  }
  
  return Math.round(impressions * (targetCTR - currentCTR) / 100);
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const forceRefresh = searchParams.get('refresh') === 'true';
    
    // Get all live sites
    const sites = await prisma.site.findMany({
      where: { status: 'live' },
      select: { domain: true }
    });

    if (sites.length === 0) {
      return NextResponse.json({
        opportunities: [],
        stats: {
          totalOpportunities: 0,
          estimatedClicks: 0,
          sitesAnalyzed: 0
        }
      });
    }

    const auth = getAuth();
    const allOpportunities: SEOOpportunity[] = [];

    // Check existing tasks to mark opportunities that already have tasks
    const researchTasks = await prisma.task.findMany({
      where: {
        title: { contains: '🔭 Keyword research:' },
        status: { not: 'done' }
      },
      select: { title: true, status: true }
    });

    const optimizationTasks = await prisma.task.findMany({
      where: {
        title: { contains: '📋 Optimaliseer:' },
        status: { not: 'done' }
      },
      select: { title: true, status: true }
    });

    for (const site of sites) {
      try {
        console.log(`Analyzing site: ${site.domain}`);
        
        const gscData = await getGSCData(`https://${site.domain}`, auth);
        
        // Process each query-page combination
        for (const row of gscData) {
          const [keyword, page] = row.keys || [];
          const position = row.position || 0;
          const impressions = row.impressions || 0;
          const ctr = (row.ctr || 0) * 100; // Convert to percentage
          
          // Identify low hanging fruit: position 4-20, impressions > 50, CTR < 5%
          if (
            position >= 4 && 
            position <= 20 && 
            impressions > 50 && 
            ctr < 5
          ) {
            const potentialClicks = calculatePotentialClicks(impressions, ctr, position);
            
            if (potentialClicks > 5) { // Only include if potential is worth it
              const opportunityId = `${site.domain}-${keyword.replace(/\s+/g, '-').toLowerCase()}`;
              
              // Check if tasks exist for this keyword
              const hasResearchTask = researchTasks.some(task => 
                task.title.includes(keyword) && task.title.includes(site.domain)
              );
              const hasOptimizationTask = optimizationTasks.some(task => 
                task.title.includes(keyword) || task.title.includes(page)
              );
              
              let status: SEOOpportunity['status'] = 'nieuw';
              if (hasResearchTask) {
                const researchTask = researchTasks.find(task => 
                  task.title.includes(keyword) && task.title.includes(site.domain)
                );
                if (researchTask?.status === 'done') {
                  status = hasOptimizationTask ? 'optimalisatie' : 'review';
                } else {
                  status = 'research';
                }
              }
              
              allOpportunities.push({
                id: opportunityId,
                keyword,
                currentPosition: Math.round(position),
                impressions: Math.round(impressions),
                currentCTR: Math.round(ctr * 10) / 10, // Round to 1 decimal
                targetPage: page,
                siteDomain: site.domain,
                potentialClicks,
                status,
                createdAt: new Date().toISOString(),
                lastUpdated: new Date().toISOString(),
                hasResearchTask,
                hasOptimizationTask
              });
            }
          }
        }
      } catch (error) {
        console.error(`Error analyzing ${site.domain}:`, error);
        // Continue with other sites even if one fails
      }
    }

    // Sort by potential impact (highest first)
    allOpportunities.sort((a, b) => b.potentialClicks - a.potentialClicks);

    const stats = {
      totalOpportunities: allOpportunities.length,
      estimatedClicks: allOpportunities.reduce((sum, opp) => sum + opp.potentialClicks, 0),
      sitesAnalyzed: sites.length
    };

    return NextResponse.json({
      opportunities: allOpportunities,
      stats,
      lastUpdated: new Date().toISOString()
    });

  } catch (error) {
    console.error('SEO Opportunities API Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch SEO opportunities', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}