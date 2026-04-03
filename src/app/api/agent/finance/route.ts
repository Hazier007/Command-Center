import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateAgentToken, unauthorizedResponse } from '@/lib/agent-auth'

// GET /api/agent/finance — Dedicated finance endpoint for LEDGER
export async function GET(request: NextRequest) {
  const auth = validateAgentToken(request)
  if (!auth.valid) return unauthorizedResponse(auth.error!)

  try {
    const [costs, revenue, clients, sites, kpis, latestSnapshot] = await Promise.all([
      // All costs
      prisma.cost.findMany({ orderBy: { category: 'asc' } }),

      // Revenue entries (last 6 months)
      prisma.revenueEntry.findMany({
        orderBy: { month: 'desc' },
        take: 200,
      }),

      // Client projects with contract data
      prisma.project.findMany({
        where: { ownerType: 'client', status: 'active' },
        select: {
          id: true,
          name: true,
          clientName: true,
          clientEmail: true,
          contractType: true,
          monthlyFee: true,
          contractStart: true,
          contractEnd: true,
          autoRenew: true,
          paymentStatus: true,
          lastInvoiceDate: true,
          nextInvoiceDate: true,
          hoursPerMonth: true,
          status: true,
        },
        orderBy: { name: 'asc' },
      }),

      // Sites with revenue data
      prisma.site.findMany({
        where: { status: 'live' },
        select: {
          id: true,
          domain: true,
          monthlyRevenue: true,
          revenueType: true,
          lastRevenueUpdate: true,
          hosting: true,
          ownerType: true,
          monthlyFee: true,
          contractStart: true,
          contractEnd: true,
        },
        orderBy: { domain: 'asc' },
      }),

      // Latest KPIs
      prisma.kPI.findMany({
        orderBy: { measuredAt: 'desc' },
        take: 20,
      }),

      // Latest finance snapshot
      prisma.financeSnapshot.findFirst({
        orderBy: { createdAt: 'desc' },
      }),
    ])

    // Calculate summary
    const monthlyCosts = costs
      .filter(c => c.recurring)
      .reduce((sum, c) => {
        if (c.billingCycle === 'yearly') return sum + c.amount / 12
        return sum + c.amount
      }, 0)

    const clientMRR = clients.reduce((sum, c) => sum + (c.monthlyFee || 0), 0)
    const siteMRR = sites.reduce((sum, s) => sum + (s.monthlyRevenue || 0), 0)
    const totalMRR = clientMRR + siteMRR

    // Contract alerts
    const now = new Date()
    const sixtyDaysFromNow = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000)
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    const expiringContracts = clients.filter(c =>
      c.contractEnd && new Date(c.contractEnd) <= sixtyDaysFromNow && !c.autoRenew
    )

    const overduePayments = clients.filter(c =>
      c.paymentStatus === 'overdue' ||
      (c.paymentStatus === 'late') ||
      (c.lastInvoiceDate && new Date(c.lastInvoiceDate) < thirtyDaysAgo && c.paymentStatus !== 'current')
    )

    const staleRevenue = sites.filter(s =>
      s.monthlyRevenue && s.lastRevenueUpdate && new Date(s.lastRevenueUpdate) < thirtyDaysAgo
    )

    return NextResponse.json({
      success: true,
      data: {
        summary: {
          totalMRR: Math.round(totalMRR * 100) / 100,
          clientMRR: Math.round(clientMRR * 100) / 100,
          siteMRR: Math.round(siteMRR * 100) / 100,
          monthlyCosts: Math.round(monthlyCosts * 100) / 100,
          netProfit: Math.round((totalMRR - monthlyCosts) * 100) / 100,
          activeClients: clients.length,
          liveSitesWithRevenue: sites.filter(s => s.monthlyRevenue && s.monthlyRevenue > 0).length,
        },
        alerts: {
          expiringContracts,
          overduePayments,
          staleRevenue,
        },
        costs,
        revenue,
        clients,
        sites,
        kpis,
        latestSnapshot,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Agent Finance API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
