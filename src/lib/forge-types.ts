/**
 * FORGE Report Metadata Types
 *
 * Defines the structured data stored in the AgentReport.metadata JSON column.
 * Used primarily by FORGE but available for all agents.
 */

export const FORGE_REPORT_TYPES = [
  'implementation-update',
  'technical-plan',
  'build-report',
  'deploy-report',
  'bug-analysis',
  'architecture-note',
  'handoff-note',
  'release-note',
  'blocker-report',
  'qa-summary',
  'performance-report',
] as const

export type ForgeReportType = (typeof FORGE_REPORT_TYPES)[number]

export function isForgeReport(type: string): type is ForgeReportType {
  return (FORGE_REPORT_TYPES as readonly string[]).includes(type)
}

export const REPORT_STATUSES = ['draft', 'in-progress', 'blocked', 'done', 'shipped', 'failed'] as const
export const REPORT_OUTCOMES = ['success', 'partial', 'blocked', 'failed', 'review-needed'] as const

export interface ForgeImplementedItem {
  type: string       // 'page' | 'component' | 'api' | 'schema' | 'fix' | 'config'
  label: string      // e.g. '/opzegtermijn-berekenen'
  status: string     // 'implemented' | 'wip' | 'reverted'
  notes?: string
}

export interface ForgeAffectedFile {
  path: string
  changeType: 'created' | 'updated' | 'deleted'
}

export interface ForgeCheck {
  name: string       // 'lint' | 'build' | 'test' | 'manual-review' | 'lighthouse'
  status: 'passed' | 'failed' | 'skipped'
  details?: string
}

export interface ForgeBlocker {
  type: string
  label: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  actionNeeded?: boolean
}

export interface ForgeHandoff {
  nextOwner?: string
  nextAction?: string
  risks?: string[]
}

export interface ForgeArtifacts {
  previewUrl?: string
  deployUrl?: string
  logUrl?: string
  pullRequestUrl?: string
}

export interface ForgeReportMetadata {
  // Execution details
  commitSha?: string
  vercelProjectId?: string
  deployTarget?: 'none' | 'preview' | 'staging' | 'production'
  deployStatus?: 'not-started' | 'building' | 'success' | 'failed'
  durationMs?: number
  changeScope?: 'small' | 'medium' | 'large' | 'architectural'
  userImpact?: 'none' | 'internal' | 'low' | 'medium' | 'high'
  productionImpact?: boolean
  backwardCompatible?: boolean
  createdBy?: string
  reviewedBy?: string
  tags?: string[]

  // Structured blocks
  implementedItems?: ForgeImplementedItem[]
  affectedFiles?: ForgeAffectedFile[]
  checks?: ForgeCheck[]
  metrics?: Record<string, unknown>
  blockers?: ForgeBlocker[]
  handoff?: ForgeHandoff
  artifacts?: ForgeArtifacts
}

/**
 * Safely parse metadata from unknown JSON into ForgeReportMetadata.
 * Returns null if parsing fails or input is null/empty.
 */
export function parseForgeMetadata(raw: unknown): ForgeReportMetadata | null {
  if (!raw || typeof raw !== 'object') return null
  const obj = raw as Record<string, unknown>
  const hasFields = FORGE_METADATA_FIELDS.some(f => obj[f] !== undefined)
  if (!hasFields) return null
  return obj as unknown as ForgeReportMetadata
}

/**
 * Fields that should be extracted from a flat agent payload and packed into metadata.
 */
export const FORGE_METADATA_FIELDS = [
  'commitSha', 'vercelProjectId', 'deployTarget', 'deployStatus', 'durationMs',
  'changeScope', 'userImpact', 'productionImpact', 'backwardCompatible',
  'createdBy', 'reviewedBy', 'tags',
  'implementedItems', 'affectedFiles', 'checks', 'metrics',
  'blockers', 'handoff', 'artifacts',
] as const
