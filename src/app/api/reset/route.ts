import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST /api/reset?scope=tasks,content — bulk delete for clean slate
// Requires confirmation header to prevent accidental use
export async function POST(request: NextRequest) {
  const confirm = request.headers.get('x-confirm-reset')
  if (confirm !== 'team-bc-clean-slate') {
    return NextResponse.json(
      { error: 'Missing confirmation header: x-confirm-reset: team-bc-clean-slate' },
      { status: 400 }
    )
  }

  const { searchParams } = new URL(request.url)
  const scope = searchParams.get('scope')?.split(',') || []

  const results: Record<string, number> = {}

  try {
    if (scope.includes('tasks') || scope.includes('all')) {
      const deleted = await prisma.task.deleteMany({})
      results.tasks = deleted.count
    }

    if (scope.includes('content') || scope.includes('all')) {
      const deleted = await prisma.content.deleteMany({})
      results.content = deleted.count
    }

    if (scope.includes('research') || scope.includes('all')) {
      const deleted = await prisma.research.deleteMany({})
      results.research = deleted.count
    }

    if (scope.includes('notes') || scope.includes('all')) {
      const deleted = await prisma.note.deleteMany({})
      results.notes = deleted.count
    }

    if (scope.includes('agent-reports') || scope.includes('all')) {
      const deleted = await prisma.agentReport.deleteMany({})
      results.agentReports = deleted.count
    }

    if (scope.includes('agent-logs') || scope.includes('all')) {
      const deleted = await prisma.agentLog.deleteMany({})
      results.agentLogs = deleted.count
    }

    if (scope.includes('agent-messages') || scope.includes('all')) {
      const deleted = await prisma.agentMessage.deleteMany({})
      results.agentMessages = deleted.count
    }

    if (scope.includes('alerts') || scope.includes('all')) {
      const deleted = await prisma.alert.deleteMany({})
      results.alerts = deleted.count
    }

    if (scope.includes('activity') || scope.includes('all')) {
      const deleted = await prisma.activity.deleteMany({})
      results.activity = deleted.count
    }

    return NextResponse.json({
      success: true,
      message: 'Clean slate complete',
      deleted: results,
    })
  } catch (error) {
    console.error('Reset error:', error)
    return NextResponse.json(
      { error: 'Reset failed', details: error instanceof Error ? error.message : 'unknown' },
      { status: 500 }
    )
  }
}
