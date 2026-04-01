import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { notifyWeeklyDigest } from '@/lib/notify'

export async function GET(request: NextRequest) {
  // Verify cron secret (Vercel cron protection)
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  const currentMonth = new Date().toISOString().slice(0, 7) // '2026-04'

  const [tasksCompleted, tasksOpen, revenue, newIdeas, alertsOpen] = await Promise.all([
    prisma.task.count({ where: { status: 'done', updatedAt: { gte: oneWeekAgo } } }),
    prisma.task.count({ where: { status: { not: 'done' } } }),
    prisma.revenueEntry.aggregate({ where: { month: currentMonth }, _sum: { amount: true } }),
    prisma.idea.count({ where: { createdAt: { gte: oneWeekAgo } } }),
    prisma.alert.count({ where: { resolved: false } }),
  ])

  await notifyWeeklyDigest({
    tasksCompleted,
    tasksOpen,
    revenue: revenue._sum.amount || 0,
    newIdeas,
    alertsOpen,
  })

  return NextResponse.json({ success: true })
}
