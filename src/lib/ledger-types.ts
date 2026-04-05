/**
 * LEDGER Finance Report Metadata Types
 *
 * Defines structured data stored in AgentReport.metadata JSON for LEDGER finance reports.
 */

export const LEDGER_REPORT_TYPES = [
  'finance_snapshot', 'kpi_summary', 'pnl_summary', 'cashflow_analysis',
  'roi_analysis', 'forecast_report', 'financial_alert', 'contract_risk_report',
] as const

export type LedgerReportType = (typeof LEDGER_REPORT_TYPES)[number]

export interface LedgerMetrics {
  totalMRR?: number
  totalOneTimeRevenue?: number
  totalCostsMonthly?: number
  netProfitMonthly?: number
  activeClients?: number
  liveSites?: number
  grossMarginPct?: number
  cashIn?: number
  cashOut?: number
  forecast30d?: number
  forecast90d?: number
}

export interface LedgerComparisons {
  wow?: { mrrDelta?: number; costDelta?: number; profitDelta?: number }
  mom?: { mrrDelta?: number; costDelta?: number; profitDelta?: number }
  yoy?: { mrrDelta?: number; costDelta?: number; profitDelta?: number } | null
}

export interface LedgerBreakdownItem {
  clientName?: string
  type?: string
  contractType?: string
  monthlyRevenue?: number
  oneTimeRevenue?: number
  amount?: number
  billingCycle?: string
  monthlyEquivalent?: number
  isRecurring?: boolean
}

export interface LedgerAlert {
  type: string  // concentration_risk | late_payment | contract_expiry | cost_increase | revenue_decline
  severity: 'low' | 'medium' | 'high' | 'critical'
  title: string
  body?: string
  linkedSiteId?: string
  linkedTaskId?: string
  dueDate?: string
}

export interface LedgerRecommendation {
  title: string
  body?: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  estimatedImpact?: Record<string, unknown>
  needsApproval?: boolean
}

export interface LedgerFinanceMetadata {
  metrics?: LedgerMetrics
  comparisons?: LedgerComparisons
  breakdown?: {
    byClient?: LedgerBreakdownItem[]
    bySite?: LedgerBreakdownItem[]
    byRevenueType?: LedgerBreakdownItem[]
    byCostType?: LedgerBreakdownItem[]
  }
  alerts?: LedgerAlert[]
  assumptions?: string[]
  recommendations?: LedgerRecommendation[]
  source?: Record<string, unknown>
}

export function parseLedgerMetadata(raw: unknown): LedgerFinanceMetadata | null {
  if (!raw || typeof raw !== 'object') return null
  const obj = raw as Record<string, unknown>
  const hasFields = LEDGER_METADATA_FIELDS.some(f => obj[f] !== undefined)
  if (!hasFields) return null
  return obj as unknown as LedgerFinanceMetadata
}

export const LEDGER_METADATA_FIELDS = [
  'metrics', 'comparisons', 'breakdown', 'alerts',
  'assumptions', 'recommendations', 'source',
] as const
