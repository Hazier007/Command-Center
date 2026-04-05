"use client"

import { Badge } from "@/components/ui/badge"
import type { LedgerFinanceMetadata, LedgerMetrics, LedgerComparisons, LedgerBreakdownItem, LedgerAlert, LedgerRecommendation } from "@/lib/ledger-types"

interface LedgerReportCardProps {
  metadata: Record<string, unknown>
  reportType?: string
  currency?: string
}

function fmt(n: number | undefined, currency = 'EUR'): string {
  if (n === undefined || n === null) return '-'
  return new Intl.NumberFormat('nl-BE', { style: 'currency', currency, maximumFractionDigits: 0 }).format(n)
}

function pct(n: number | undefined): string {
  if (n === undefined || n === null) return '-'
  return `${n >= 0 ? '+' : ''}${n.toFixed(1)}%`
}

function MetricsPanel({ metrics, currency }: { metrics: LedgerMetrics; currency: string }) {
  const items = [
    { label: 'MRR', value: fmt(metrics.totalMRR, currency), accent: true },
    { label: 'One-time', value: fmt(metrics.totalOneTimeRevenue, currency) },
    { label: 'Kosten/mo', value: fmt(metrics.totalCostsMonthly, currency) },
    { label: 'Netto winst', value: fmt(metrics.netProfitMonthly, currency), accent: true },
    { label: 'Marge', value: metrics.grossMarginPct !== undefined ? `${metrics.grossMarginPct.toFixed(1)}%` : undefined },
    { label: 'Actieve klanten', value: metrics.activeClients?.toString() },
    { label: 'Live sites', value: metrics.liveSites?.toString() },
    { label: 'Cash in', value: fmt(metrics.cashIn, currency) },
    { label: 'Cash out', value: fmt(metrics.cashOut, currency) },
    { label: 'Forecast 30d', value: fmt(metrics.forecast30d, currency) },
    { label: 'Forecast 90d', value: fmt(metrics.forecast90d, currency) },
  ].filter(i => i.value !== undefined)

  if (items.length === 0) return null

  return (
    <div className="mb-4">
      <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">Financiele Metrics</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {items.map(item => (
          <div key={item.label} className={`rounded-lg p-2 text-center ${item.accent ? 'bg-emerald-50 dark:bg-emerald-900/10 ring-1 ring-emerald-200 dark:ring-emerald-800' : 'bg-gray-50 dark:bg-gray-800/50'}`}>
            <div className="text-lg font-bold">{item.value}</div>
            <div className="text-[10px] text-muted-foreground">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ComparisonsPanel({ comparisons }: { comparisons: LedgerComparisons }) {
  const periods = [
    { label: 'WoW', data: comparisons.wow },
    { label: 'MoM', data: comparisons.mom },
    { label: 'YoY', data: comparisons.yoy },
  ].filter(p => p.data)

  if (periods.length === 0) return null

  return (
    <div className="mb-4">
      <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">Vergelijkingen</h4>
      <div className="grid grid-cols-3 gap-2">
        {periods.map(period => (
          <div key={period.label} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2">
            <div className="text-xs font-semibold mb-1">{period.label}</div>
            {period.data && (
              <div className="space-y-0.5 text-xs">
                {period.data.mrrDelta !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">MRR</span>
                    <span className={period.data.mrrDelta >= 0 ? 'text-emerald-600' : 'text-red-600'}>{pct(period.data.mrrDelta)}</span>
                  </div>
                )}
                {period.data.costDelta !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Kosten</span>
                    <span className={period.data.costDelta <= 0 ? 'text-emerald-600' : 'text-red-600'}>{pct(period.data.costDelta)}</span>
                  </div>
                )}
                {period.data.profitDelta !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Winst</span>
                    <span className={period.data.profitDelta >= 0 ? 'text-emerald-600' : 'text-red-600'}>{pct(period.data.profitDelta)}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function BreakdownPanel({ breakdown }: { breakdown: NonNullable<LedgerFinanceMetadata['breakdown']> }) {
  const sections = [
    { label: 'Per Klant', items: breakdown.byClient },
    { label: 'Per Site', items: breakdown.bySite },
    { label: 'Per Revenue Type', items: breakdown.byRevenueType },
    { label: 'Per Kostentype', items: breakdown.byCostType },
  ].filter(s => s.items && s.items.length > 0)

  if (sections.length === 0) return null

  return (
    <div className="mb-4">
      {sections.map(section => (
        <div key={section.label} className="mb-3">
          <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1">{section.label}</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-1 pr-3">Naam</th>
                  <th className="pb-1 pr-3">Type</th>
                  <th className="pb-1 pr-3 text-right">Bedrag</th>
                  <th className="pb-1 text-right">Maand eq.</th>
                </tr>
              </thead>
              <tbody>
                {(section.items as LedgerBreakdownItem[]).map((item, i) => (
                  <tr key={i} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-1 pr-3 font-medium">{item.clientName || item.type || '-'}</td>
                    <td className="py-1 pr-3">{item.contractType || item.billingCycle || '-'}</td>
                    <td className="py-1 pr-3 text-right font-mono">
                      {item.monthlyRevenue !== undefined ? fmt(item.monthlyRevenue) : item.amount !== undefined ? fmt(item.amount) : '-'}
                    </td>
                    <td className="py-1 text-right font-mono">{item.monthlyEquivalent !== undefined ? fmt(item.monthlyEquivalent) : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  )
}

function AlertsPanel({ alerts }: { alerts: LedgerAlert[] }) {
  if (alerts.length === 0) return null

  const severityColor: Record<string, string> = {
    critical: 'border-red-400 bg-red-50 dark:bg-red-900/10',
    high: 'border-orange-400 bg-orange-50 dark:bg-orange-900/10',
    medium: 'border-amber-400 bg-amber-50 dark:bg-amber-900/10',
    low: 'border-blue-400 bg-blue-50 dark:bg-blue-900/10',
  }

  return (
    <div className="mb-4">
      <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">Alerts ({alerts.length})</h4>
      <div className="space-y-2">
        {alerts.map((alert, i) => (
          <div key={i} className={`border-l-2 rounded-r-lg p-2 ${severityColor[alert.severity] || severityColor.medium}`}>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px]">{alert.type}</Badge>
              <Badge variant="outline" className="text-[10px]">{alert.severity}</Badge>
              {alert.dueDate && <span className="text-[10px] text-muted-foreground">Deadline: {alert.dueDate}</span>}
            </div>
            <p className="text-sm font-medium mt-0.5">{alert.title}</p>
            {alert.body && <p className="text-xs text-muted-foreground mt-0.5">{alert.body}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

function RecommendationsPanel({ recommendations }: { recommendations: LedgerRecommendation[] }) {
  if (recommendations.length === 0) return null

  const priorityColor: Record<string, string> = {
    critical: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200',
    high: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-200',
    medium: 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-200',
    low: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200',
  }

  return (
    <div className="mb-4">
      <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">Aanbevelingen ({recommendations.length})</h4>
      <div className="space-y-2">
        {recommendations.map((rec, i) => (
          <div key={i} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <Badge className={priorityColor[rec.priority] || priorityColor.medium}>{rec.priority}</Badge>
              {rec.needsApproval && <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-200">approval</Badge>}
            </div>
            <p className="text-sm font-medium mt-1">{rec.title}</p>
            {rec.body && <p className="text-xs text-muted-foreground mt-0.5">{rec.body}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

export function LedgerReportCard({ metadata, currency = 'EUR' }: LedgerReportCardProps) {
  const data = metadata as unknown as LedgerFinanceMetadata
  if (!data) return null

  return (
    <div className="mb-4">
      {data.metrics && <MetricsPanel metrics={data.metrics} currency={currency} />}
      {data.comparisons && <ComparisonsPanel comparisons={data.comparisons} />}
      {data.breakdown && <BreakdownPanel breakdown={data.breakdown} />}
      {data.alerts && data.alerts.length > 0 && <AlertsPanel alerts={data.alerts} />}
      {data.recommendations && data.recommendations.length > 0 && <RecommendationsPanel recommendations={data.recommendations} />}
      {data.assumptions && data.assumptions.length > 0 && (
        <div className="mb-4">
          <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1">Aannames</h4>
          <ul className="list-disc list-inside text-xs text-muted-foreground space-y-0.5">
            {data.assumptions.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        </div>
      )}
    </div>
  )
}
