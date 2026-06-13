import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

type ResetResult = Record<string, number>

const CONFIRMATION = 'locallead-clean-sheet'

async function deleteMany(label: string, action: () => Promise<{ count: number }>, results: ResetResult) {
  const deleted = await action()
  results[label] = deleted.count
}

// POST /api/reset?scope=all — bulk delete operation for a clean operational slate.
// Keeps auth users/sessions/accounts intact; removes business/operational data.
// Requires confirmation header to prevent accidental use.
// This deliberately avoids one huge interactive transaction because Vercel/Prisma
// can close those after 5s; deleteMany calls are idempotent and safe to repeat.
export async function POST(request: NextRequest) {
  const confirm = request.headers.get('x-confirm-reset')
  if (confirm !== CONFIRMATION) {
    return NextResponse.json(
      { error: `Missing confirmation header: x-confirm-reset: ${CONFIRMATION}` },
      { status: 400 }
    )
  }

  const { searchParams } = new URL(request.url)
  const scope = searchParams.get('scope')?.split(',').map((s) => s.trim()).filter(Boolean) || []
  const resetAll = scope.includes('all')
  const wants = (name: string) => resetAll || scope.includes(name)
  const results: ResetResult = {}

  try {
    // Child/detail records first.
    if (wants('bot')) {
      await deleteMany('botTrades', () => prisma.botTrade.deleteMany({}), results)
      await deleteMany('botSnapshots', () => prisma.botSnapshot.deleteMany({}), results)
      await deleteMany('botPositions', () => prisma.botPosition.deleteMany({}), results)
      await deleteMany('botConfigs', () => prisma.botConfig.deleteMany({}), results)
    }

    if (wants('agent')) {
      await deleteMany('agentMessages', () => prisma.agentMessage.deleteMany({}), results)
      await deleteMany('agentLogs', () => prisma.agentLog.deleteMany({}), results)
      await deleteMany('agentReports', () => prisma.agentReport.deleteMany({}), results)
    }

    if (wants('tasks')) await deleteMany('tasks', () => prisma.task.deleteMany({}), results)
    if (wants('content')) await deleteMany('content', () => prisma.content.deleteMany({}), results)
    if (wants('research')) {
      await deleteMany('seoReports', () => prisma.seoReport.deleteMany({}), results)
      await deleteMany('research', () => prisma.research.deleteMany({}), results)
    }
    if (wants('notes')) await deleteMany('notes', () => prisma.note.deleteMany({}), results)
    if (wants('alerts')) await deleteMany('alerts', () => prisma.alert.deleteMany({}), results)
    if (wants('activity')) await deleteMany('activity', () => prisma.activity.deleteMany({}), results)
    if (wants('decisions')) await deleteMany('decisions', () => prisma.decision.deleteMany({}), results)
    if (wants('sprints')) await deleteMany('sprints', () => prisma.sprint.deleteMany({}), results)
    if (wants('leads')) await deleteMany('leads', () => prisma.lead.deleteMany({}), results)
    if (wants('finance')) {
      await deleteMany('financeSnapshots', () => prisma.financeSnapshot.deleteMany({}), results)
      await deleteMany('revenueEntries', () => prisma.revenueEntry.deleteMany({}), results)
      await deleteMany('costs', () => prisma.cost.deleteMany({}), results)
      await deleteMany('kpis', () => prisma.kPI.deleteMany({}), results)
    }
    if (wants('products')) await deleteMany('products', () => prisma.product.deleteMany({}), results)
    if (wants('ideas')) await deleteMany('ideas', () => prisma.idea.deleteMany({}), results)
    if (wants('keywords')) await deleteMany('keywordHistory', () => prisma.keywordHistory.deleteMany({}), results)
    if (wants('domains')) await deleteMany('domainOpportunities', () => prisma.domainOpportunity.deleteMany({}), results)

    // Parent records last.
    if (wants('sites')) await deleteMany('sites', () => prisma.site.deleteMany({}), results)
    if (wants('clients')) await deleteMany('clients', () => prisma.client.deleteMany({}), results)
    if (wants('projects')) await deleteMany('projects', () => prisma.project.deleteMany({}), results)

    return NextResponse.json({
      success: true,
      message: resetAll ? 'LocalLead clean sheet complete' : 'Selected reset complete',
      kept: ['users', 'accounts', 'sessions', 'verification_tokens'],
      deleted: results,
    })
  } catch (error) {
    console.error('Reset error:', error)
    return NextResponse.json(
      { error: 'Reset failed', details: error instanceof Error ? error.message : 'unknown', deletedBeforeFailure: results },
      { status: 500 }
    )
  }
}
