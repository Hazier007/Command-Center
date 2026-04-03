import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { scanAllDomains } from '@/lib/windsor';

export async function GET(request: Request) {
  // Verify cron secret
  const { searchParams } = new URL(request.url);
  const cronSecret = searchParams.get('secret');
  if (process.env.CRON_SECRET && cronSecret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!process.env.WINDSOR_API_KEY) {
    return NextResponse.json({ error: 'WINDSOR_API_KEY not configured' }, { status: 500 });
  }

  try {
    const opportunities = await scanAllDomains('last_28d');

    // Only create tasks for high-value opportunities
    const topOpportunities = opportunities.filter(o => o.impressions >= 50);
    let tasksCreated = 0;

    for (const opp of topOpportunities) {
      // Check if a task already exists for this keyword+domain
      const existing = await prisma.task.findFirst({
        where: {
          title: { contains: opp.keyword },
          description: { contains: opp.siteDomain },
          status: { not: 'done' },
        },
      });

      if (existing) continue;

      // Look up siteId
      const site = await prisma.site.findFirst({
        where: { domain: opp.siteDomain },
        select: { id: true },
      });

      const isPageOne = opp.position <= 10;
      const assignee = isPageOne ? 'ink' : 'radar';
      const taskTitle = isPageOne
        ? `✒️ [${opp.siteDomain}] CTR optimalisatie: "${opp.keyword}" — pos ${opp.position}, ${opp.impressions} imp`
        : `📡 [${opp.siteDomain}] SEO kans: "${opp.keyword}" — pos ${opp.position}, ${opp.impressions} imp`;

      await prisma.task.create({
        data: {
          title: taskTitle,
          description: `Automatisch gedetecteerd door wekelijkse Windsor.ai SEO scan.\n\nKeyword: ${opp.keyword}\nPositie: ${opp.position}\nImpressions: ${opp.impressions}\nCTR: ${opp.ctr}%\nPagina: ${opp.page}\n\nActie: ${isPageOne ? 'CTR verbeteren via meta tags en structured data' : 'Keyword research en content optimalisatie'}`,
          status: 'todo',
          priority: opp.impressions >= 200 ? 'high' : 'medium',
          assignee,
          siteId: site?.id || undefined,
          source: 'cron',
          needsApproval: true,
          approvalSource: 'system',
        },
      });
      tasksCreated++;
    }

    // Create alert if new tasks were created
    if (tasksCreated > 0) {
      await prisma.alert.create({
        data: {
          title: `SEO Scan: ${tasksCreated} nieuwe kansen gevonden`,
          body: `De wekelijkse Windsor.ai SEO scan heeft ${topOpportunities.length} kansen geanalyseerd en ${tasksCreated} nieuwe taken aangemaakt. Check je inbox voor goedkeuring.`,
          priority: 'medium',
        },
      });
    }

    // Log activity
    await prisma.activity.create({
      data: {
        type: 'system',
        actor: 'system',
        title: `Wekelijkse SEO scan voltooid`,
        description: `${opportunities.length} kansen gevonden, ${tasksCreated} taken aangemaakt`,
      },
    });

    return NextResponse.json({
      success: true,
      opportunitiesFound: opportunities.length,
      tasksCreated,
    });
  } catch (error) {
    console.error('SEO Scan Cron Error:', error);
    return NextResponse.json(
      { error: 'SEO scan failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
