import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const [tasks, content, ideas, domainEvals] = await Promise.all([
      prisma.task.findMany({
        where: { needsApproval: true, status: { not: 'done' } },
        orderBy: { createdAt: 'desc' },
        include: { project: true, site: true },
      }),
      prisma.content.findMany({
        where: { status: 'review' },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.idea.findMany({
        where: { status: { in: ['evaluating', 'promising'] } },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.domainOpportunity.findMany({
        where: { status: 'evaluating' },
        orderBy: { createdAt: 'desc' },
      }),
    ])

    const items = [
      ...tasks.map(t => ({ ...t, itemType: 'task' as const })),
      ...content.map(c => ({ ...c, itemType: 'content' as const })),
      ...ideas.map(i => ({ ...i, itemType: 'idea' as const })),
      ...domainEvals.map(d => ({ ...d, itemType: 'domain-eval' as const })),
    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json(items)
  } catch (error) {
    console.error('Inbox fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch inbox items' }, { status: 500 })
  }
}
