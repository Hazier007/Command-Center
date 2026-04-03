import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/sprints — list sprints, ?status=active or ?current=true for current week
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const current = searchParams.get('current')

    if (current === 'true') {
      // Calculate current ISO week
      const now = new Date()
      const yearStart = new Date(now.getFullYear(), 0, 1)
      const weekNum = Math.ceil(((now.getTime() - yearStart.getTime()) / 86400000 + yearStart.getDay() + 1) / 7)
      const currentWeek = `${now.getFullYear()}-W${String(weekNum).padStart(2, '0')}`

      const sprint = await prisma.sprint.findUnique({ where: { week: currentWeek } })
      return NextResponse.json(sprint || { week: currentWeek, status: 'no_sprint', message: 'Geen sprint voor deze week' })
    }

    const where = status ? { status } : {}
    const sprints = await prisma.sprint.findMany({
      where,
      orderBy: { week: 'desc' },
      take: 12,
    })

    return NextResponse.json(sprints)
  } catch (error) {
    console.error('Error fetching sprints:', error)
    return NextResponse.json({ error: 'Failed to fetch sprints' }, { status: 500 })
  }
}

// POST /api/sprints — create or update sprint (upsert on week)
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    if (!data.week) {
      return NextResponse.json({ error: 'Missing required field: week' }, { status: 400 })
    }

    const sprint = await prisma.sprint.upsert({
      where: { week: data.week },
      update: {
        status: data.status || undefined,
        goals: data.goals ? JSON.stringify(data.goals) : undefined,
        summary: data.summary || undefined,
        createdBy: data.createdBy || undefined,
      },
      create: {
        week: data.week,
        status: data.status || 'active',
        goals: data.goals ? JSON.stringify(data.goals) : undefined,
        summary: data.summary,
        createdBy: data.createdBy || 'atlas',
      },
    })

    return NextResponse.json(sprint, { status: 201 })
  } catch (error) {
    console.error('Error creating sprint:', error)
    return NextResponse.json({ error: 'Failed to create sprint' }, { status: 500 })
  }
}
