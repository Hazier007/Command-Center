/**
 * SPARK Report Metadata Types
 *
 * Defines the structured data stored in the Research.metadata JSON column
 * when type is one of the SPARK report types.
 */

export const SPARK_REPORT_TYPES = [
  'visibility-audit',
  'domain-analysis',
  'market-research',
  'acquisition-memo',
  'growth-evaluation',
] as const

export type SparkReportType = (typeof SPARK_REPORT_TYPES)[number]

export function isSparkReport(type: string): type is SparkReportType {
  return (SPARK_REPORT_TYPES as readonly string[]).includes(type)
}

export interface SparkFinding {
  title: string
  detail: string
  severity?: 'low' | 'medium' | 'high' | 'critical'
}

export interface SparkQuickWin {
  action: string
  impact: string
  effort: string
}

export interface SparkRisk {
  risk: string
  likelihood: string
  mitigation: string
}

export interface SparkNextStep {
  step: string
  owner?: string
  deadline?: string
}

export interface SparkEvidence {
  claim: string
  source: string
  confidence: string
  prompt?: string
  observedLeader?: string
  mentionedTarget?: boolean
}

export interface SparkSource {
  url?: string
  title: string
  accessed?: string
}

export interface SparkReportMetadata {
  // Scores (1-10)
  scoreOverall?: number
  scoreFeasibility?: number
  scoreRevenuePotential?: number
  scoreTimeToRevenue?: number
  scoreCompetition?: number
  scoreStrategicFit?: number

  // Structured sections
  findings?: SparkFinding[]
  quickWins?: SparkQuickWin[]
  risks?: SparkRisk[]
  nextSteps?: SparkNextStep[]
  evidence?: SparkEvidence[]
  sources?: SparkSource[]
  metrics?: Record<string, number | string>

  // Business fields
  companyName?: string
  market?: string
  recommendation?: 'build' | 'investigate' | 'skip' | 'acquire' | 'pass'
  estimatedInvestment?: string
  estimatedRevenue?: string
  paybackPeriod?: string
  auditType?: string
}

/**
 * Safely parse metadata from unknown JSON into SparkReportMetadata.
 * Returns an empty object if parsing fails or input is null.
 */
export function parseSparkMetadata(raw: unknown): SparkReportMetadata {
  if (!raw || typeof raw !== 'object') return {}
  return raw as SparkReportMetadata
}

/**
 * Fields that should be extracted from a flat agent payload and packed into metadata.
 */
export const SPARK_METADATA_FIELDS = [
  'scoreOverall', 'scoreFeasibility', 'scoreRevenuePotential',
  'scoreTimeToRevenue', 'scoreCompetition', 'scoreStrategicFit',
  'findings', 'quickWins', 'risks', 'nextSteps', 'evidence',
  'sources', 'metrics', 'companyName', 'market', 'recommendation',
  'estimatedInvestment', 'estimatedRevenue', 'paybackPeriod', 'auditType',
] as const
