/**
 * RADAR SEO Report Metadata Types
 *
 * Defines the structured data stored in the SeoReport.metadata JSON column.
 */

export const SEO_REPORT_SUBTYPES = [
  'site_audit', 'keyword_snapshot', 'traffic_analysis',
  'domain_evaluation', 'opportunity_scan', 'signal',
] as const

export type SeoReportSubtype = (typeof SEO_REPORT_SUBTYPES)[number]

export interface RadarKeyword {
  keyword: string
  position: number
  clicks: number
  impressions: number
  ctr: number
  trend?: 'improving' | 'stable' | 'declining'
  source?: 'gsc' | 'bing' | 'dataforseo' | 'manual'
  isQuickWin?: boolean
}

export interface RadarRecommendation {
  priority: 'low' | 'medium' | 'high' | 'critical'
  type: string  // title_meta | content_gap | internal_link | technical | backlink
  keyword?: string
  currentPosition?: number
  targetPosition?: number
  action: string
  assignTo?: string  // ink | forge | radar
  effort?: 'low' | 'medium' | 'high'
  estimatedImpact?: 'low' | 'medium' | 'high'
}

export interface RadarSignal {
  type: string  // position_drop | position_gain | traffic_spike | traffic_drop | expiration_alert | quick_win_cluster | new_competitor | index_issue
  keyword?: string
  domain?: string
  previousPosition?: number
  currentPosition?: number
  delta?: number
  count?: number
  severity: 'info' | 'opportunity' | 'warning' | 'critical'
  detectedAt?: string
  expirationDate?: string
  daysRemaining?: number
}

export interface RadarMetrics {
  clicks?: number
  impressions?: number
  ctr?: number
  avgPosition?: number
  indexedPages?: number
  domainAuthority?: number
  crawlErrors?: number
  mobileScore?: number
  pageSpeedScore?: number
  seoScore?: number
}

export interface RadarSeoMetadata {
  metrics?: RadarMetrics
  keywords?: RadarKeyword[]
  recommendations?: RadarRecommendation[]
  signals?: RadarSignal[]
  rawData?: Record<string, unknown>
  approvedBy?: string
  approvedAt?: string
}

export function parseRadarMetadata(raw: unknown): RadarSeoMetadata | null {
  if (!raw || typeof raw !== 'object') return null
  return raw as RadarSeoMetadata
}

export const RADAR_METADATA_FIELDS = [
  'metrics', 'keywords', 'recommendations', 'signals', 'rawData',
] as const
