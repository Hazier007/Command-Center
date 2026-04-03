import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { SEOOpportunity } from '../opportunities/route';

interface GenerateTasksRequest {
  opportunities: SEOOpportunity[];
}

export async function POST(request: Request) {
  try {
    const { opportunities } = await request.json() as GenerateTasksRequest;
    
    if (!opportunities || opportunities.length === 0) {
      return NextResponse.json(
        { error: 'No opportunities provided' },
        { status: 400 }
      );
    }

    const createdTasks = [];

    for (const opportunity of opportunities) {
      // Check if tasks already exist for this keyword
      const existingResearchTask = await prisma.task.findFirst({
        where: {
          title: { contains: `🔭 Keyword research: ${opportunity.keyword}` },
          description: { contains: opportunity.siteDomain }
        }
      });

      const existingOptimizationTask = await prisma.task.findFirst({
        where: {
          OR: [
            { title: { contains: `📋 Optimaliseer: ${opportunity.targetPage}` } },
            { 
              title: { contains: `📋 Optimaliseer` },
              description: { contains: opportunity.keyword }
            }
          ]
        }
      });

      // Look up siteId by domain
      const site = await prisma.site.findFirst({
        where: { domain: opportunity.siteDomain },
        select: { id: true }
      });
      const siteId = site?.id || undefined;

      // Determine task type and agent based on position and opportunity
      const isPageOne = opportunity.currentPosition <= 10;
      const isCloseToPageOne = opportunity.currentPosition <= 20;

      // Create Research Task (assigned to Radar) for keywords needing investigation
      if (!existingResearchTask) {
        const researchTask = await prisma.task.create({
          data: {
            title: `📡 Keyword research: ${opportunity.keyword} [${opportunity.siteDomain}]`,
            description: `Site: ${opportunity.siteDomain}\nHuidige positie: ${opportunity.currentPosition}\nVertoningen: ${opportunity.impressions}\nHuidige CTR: ${opportunity.currentCTR}%\n\nOnderzoek:\n- Top 5 concurrenten voor dit keyword\n- Related keywords en long-tail varianten\n- Content gaps vs concurrentie\n- Aanbevolen optimalisaties`,
            status: 'todo',
            priority: isPageOne ? 'high' : 'medium',
            assignee: 'radar',
            siteId,
            source: 'agent',
            needsApproval: true,
            approvalSource: 'system',
          },
        });

        createdTasks.push(researchTask);
      }

      // Create Content/Optimization Task based on position
      if (!existingOptimizationTask) {
        const pagePath = opportunity.targetPage.replace(`https://${opportunity.siteDomain}`, '') || '/';

        // Page 1 keywords get INK for CTR optimization, page 2 get INK for content
        const assignee = isPageOne ? 'ink' : (isCloseToPageOne ? 'ink' : 'forge');
        const taskTitle = isPageOne
          ? `✒️ CTR optimalisatie: ${pagePath} voor "${opportunity.keyword}" [${opportunity.siteDomain}]`
          : `✒️ Content optimalisatie: ${pagePath} voor "${opportunity.keyword}" [${opportunity.siteDomain}]`;
        const taskDescription = isPageOne
          ? `Keyword staat op pagina 1 (pos ${opportunity.currentPosition}) maar CTR is ${opportunity.currentCTR}%.\n\nActie:\n1. Verbeter meta title (max 60 chars, sterke CTA)\n2. Verbeter meta description (max 155 chars, USP)\n3. Voeg structured data toe (FAQ/HowTo)\n4. Check interne links\n\nPotentieel: +${opportunity.potentialClicks} clicks/maand`
          : `Keyword: ${opportunity.keyword}\nHuidige positie: ${opportunity.currentPosition}\nPotentieel: +${opportunity.potentialClicks} clicks/maand\n\nActie:\n1. Verrijk content op ${pagePath}\n2. Optimaliseer meta tags\n3. Bouw interne links\n4. Check concurrentie voor content gaps`;

        const optimizationTask = await prisma.task.create({
          data: {
            title: taskTitle,
            description: taskDescription,
            status: 'todo',
            priority: isPageOne ? 'high' : 'medium',
            assignee,
            siteId,
            source: 'agent',
            needsApproval: true,
            approvalSource: 'system',
          },
        });

        createdTasks.push(optimizationTask);
      }
    }

    // Create activity log entry
    await prisma.activity.create({
      data: {
        type: 'system',
        actor: 'system',
        title: `SEO taken gegenereerd`,
        description: `${createdTasks.length} taken aangemaakt voor ${opportunities.length} SEO kansen`,
        metadata: JSON.stringify({
          opportunitiesCount: opportunities.length,
          tasksCreated: createdTasks.length,
          keywords: opportunities.map(o => o.keyword).slice(0, 5) // First 5 keywords
        })
      }
    });

    return NextResponse.json({
      success: true,
      tasksCreated: createdTasks.length,
      tasks: createdTasks,
      message: `${createdTasks.length} taken succesvol aangemaakt voor ${opportunities.length} SEO kansen`
    });

  } catch (error) {
    console.error('Generate Tasks API Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate tasks', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}