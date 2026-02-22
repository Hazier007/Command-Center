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

      // Create Research Task (assigned to Wout)
      if (!existingResearchTask) {
        const researchTask = await prisma.task.create({
          data: {
            title: `🔭 Keyword research: ${opportunity.keyword}`,
            description: `Site: ${opportunity.siteDomain}\nHuidige positie: ${opportunity.currentPosition}\nVertoningen: ${opportunity.impressions}\nHuidige CTR: ${opportunity.currentCTR}%\n\nOnderzoek:\n- Top 5 concurrenten voor dit keyword\n- Related keywords en long-tail varianten\n- Content gaps vs concurrentie\n- Aanbevolen optimalisaties`,
            status: 'todo',
            priority: 'high',
            assignee: 'wout'
          },
          include: {
            project: true,
          },
        });
        
        createdTasks.push(researchTask);
      }

      // Create Optimization Task (assigned to Lisa)
      if (!existingOptimizationTask) {
        const pagePath = opportunity.targetPage.replace(`https://${opportunity.siteDomain}`, '') || '/';
        
        const optimizationTask = await prisma.task.create({
          data: {
            title: `📋 Optimaliseer: ${pagePath} voor ${opportunity.keyword}`,
            description: `Wacht op Wout's keyword research.\nDan: optimaliseer content, meta tags, interne links.\nResultaat → Content Review voor Bart's goedkeuring.\n\nKeyword: ${opportunity.keyword}\nHuidige positie: ${opportunity.currentPosition}\nPotentieel: +${opportunity.potentialClicks} clicks/maand`,
            status: 'todo',
            priority: 'medium',
            assignee: 'lisa'
          },
          include: {
            project: true,
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