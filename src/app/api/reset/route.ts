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
    await prisma.$transaction(async (tx) => {
      // Child/detail records first.
      if (wants('bot')) {
        await deleteMany('botTrades', () => tx.botTrade.deleteMany({}), results)
        await deleteMany('botSnapshots', () => tx.botSnapshot.deleteMany({}), results)
        await deleteMany('botPositions', () => tx.botPosition.deleteMany({}), results)
        await deleteMany('botConfigs', () => tx.botConfig.deleteMany({}), results)
      }

      if (wants('agent')) {
        await deleteMany('agentMessages', () => tx.agentMessage.deleteMany({}), results)
        await deleteMany('agentLogs', () => tx.agentLog.deleteMany({}), results)
        await deleteMany('agentReports', () => tx.agentReport.deleteMany({}), results)
      }

      if (wants('tasks')) await deleteMany('tasks', () => tx.task.deleteMany({}), results)
      if (wants('content')) await deleteMany('content', () => tx.content.deleteMany({}), results)
      if (wants('research')) {
        await deleteMany('seoReports', () => tx.seoReport.deleteMany({}), results)
        await deleteMany('research', () => tx.research.deleteMany({}), results)
      }
      if (wants('notes')) await deleteMany('notes', () => tx.note.deleteMany({}), results)
      if (wants('alerts')) await deleteMany('alerts', () => tx.alert.deleteMany({}), results)
      if (wants('activity')) await deleteMany('activity', () => tx.activity.deleteMany({}), results)
      if (wants('decisions')) await deleteMany('decisions', () => tx.decision.deleteMany({}), results)
      if (wants('sprints')) await deleteMany('sprints', () => tx.sprint.deleteMany({}), results)
      if (wants('leads')) await deleteMany('leads', () => tx.lead.deleteMany({}), results)
      if (wants('finance')) {
        await deleteMany('financeSnapshots', () => tx.financeSnapshot.deleteMany({}), results)
        await deleteMany('revenueEntries', () => tx.revenueEntry.deleteMany({}), results)
        await deleteMany('costs', () => tx.cost.deleteMany({}), results)
        await deleteMany('kpis', () => tx.kPI.deleteMany({}), results)
      }
      if (wants('products')) await deleteMany('products', () => tx.product.deleteMany({}), results)
      if (wants('ideas')) await deleteMany('ideas', () => tx.idea.deleteMany({}), results)
      if (wants('keywords')) await deleteMany('keywordHistory', () => tx.keywordHistory.deleteMany({}), results)
      if (wants('domains')) await deleteMany('domainOpportunities', () => tx.domainOpportunity.deleteMany({}), results)

      // Parent records last.
      if (wants('sites')) await deleteMany('sites', () => tx.site.deleteMany({}), results)
      if (wants('clients')) await deleteMany('clients', () => tx.client.deleteMany({}), results)
      if (wants('projects')) await deleteMany('projects', () => tx.project.deleteMany({}), results)
    }, { timeout: 60000 })

    return NextResponse.json({
      success: true,
      message: resetAll ? 'LocalLead clean sheet complete' : 'Selected reset complete',
      kept: ['users', 'accounts', 'sessions', 'verification_tokens'],
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
