/**
 * ATLAS Report Metadata Types
 *
 * Defines structured data stored in AgentReport.metadata JSON for ATLAS strategy/ops reports.
 */

export const ATLAS_REPORT_TYPES = [
  'daily-brief', 'operational-summary', 'sprint-plan', 'sprint-review',
  'priority-update', 'blocker-report', 'decision-support',
  'executive-summary', 'project-status', 'agent-coordination',
] as const

export type AtlasReportType = (typeof ATLAS_REPORT_TYPES)[number]

export interface AtlasReportItem {
  label: string
  agent?: string
  description: string
  impact?: string
  linkedTaskId?: string
  linkedSiteId?: string
  linkedDomainId?: string
}

export interface AtlasBlockerItem {
  label: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  description: string
  impact: string
  owner?: string
  suggestedNextStep?: string
  linkedTaskId?: string
}

export interface AtlasLiveItem {
  label: string
  url?: string
  type: 'page' | 'deploy' | 'content' | 'feature'
  description?: string
  linkedSiteId?: string
  linkedContentId?: string
}

export interface AtlasPriorityItem {
  rank: number
  label: string
  owner: string
  reason: string
  linkedTaskId?: string
  needsApproval?: boolean
}

export interface AtlasQuestionItem {
  question: string
  answerFormat?: string
  options?: string[]
  reason?: string
  linkedTaskId?: string
  requiredBy?: string
}

export interface AtlasRecommendationItem {
  title: string
  description: string
  type: 'strategy' | 'execution' | 'resource' | 'priority' | 'risk'
  needsApproval?: boolean
}

export interface AtlasStrategyMetadata {
  // Operational state
  audience?: string[]
  currentState?: 'on-track' | 'at-risk' | 'blocked' | 'pending-review' | 'done'
  confidence?: number  // 0-1
  approvalType?: 'budget' | 'priority-shift' | 'roadmap-change' | 'launch' | 'strategy' | 'other'

  // Related IDs (arrays, beyond single linking)
  relatedTaskIds?: string[]
  relatedDecisionIds?: string[]

  // Structured sections
  doneItems?: AtlasReportItem[]
  blockers?: AtlasBlockerItem[]
  liveItems?: AtlasLiveItem[]
  priorities?: AtlasPriorityItem[]
  questions?: AtlasQuestionItem[]
  recommendations?: AtlasRecommendationItem[]
  metrics?: Record<string, number | string>

  // Markdown fallback
  rawMarkdown?: string
}

export function parseAtlasMetadata(raw: unknown): AtlasStrategyMetadata | null {
  if (!raw || typeof raw !== 'object') return null
  const obj = raw as Record<string, unknown>
  const hasFields = ATLAS_METADATA_FIELDS.some(f => obj[f] !== undefined)
  if (!hasFields) return null
  return obj as unknown as AtlasStrategyMetadata
}

export const ATLAS_METADATA_FIELDS = [
  'audience', 'currentState', 'confidence', 'approvalType',
  'relatedTaskIds', 'relatedDecisionIds',
  'doneItems', 'blockers', 'liveItems', 'priorities',
  'questions', 'recommendations', 'metrics', 'rawMarkdown',
] as const
