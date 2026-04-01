import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const [tasks, content] = await Promise.all([
      prisma.task.findMany({
        where: { needsApproval: true, status: { not: 'done' } },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.content.findMany({
        where: { status: 'review' },
        orderBy: { createdAt: 'desc' },
      }),
    ])

    const items = [
      ...tasks.map(t => ({ ...t, itemType: 'task' as const })),
      ...content.map(c => ({ ...c, itemType: 'content' as const })),
    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json(items)
  } catch (error) {
    console.error('Inbox fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch inbox items' }, { status: 500 })
  }
}
