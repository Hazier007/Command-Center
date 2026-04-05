/**
 * INK Content Metadata Types
 *
 * Defines the structured data stored in the Content.metadata JSON column
 * for INK's rich content assets.
 */

export const INK_CONTENT_TYPES = [
  'meta', 'blogpost', 'landingpage', 'review', 'faq', 'social',
  'article', 'product-review', 'buyers-guide', 'page',
  'brief', 'outline', 'seo-rewrite', 'brand-messaging', 'other',
] as const

export type InkContentType = (typeof INK_CONTENT_TYPES)[number]

export const HANDOFF_STATUSES = [
  'not-ready',
  'ready-for-review',
  'ready-for-publishing',
  'handed-off',
  'published',
] as const

export type HandoffStatus = (typeof HANDOFF_STATUSES)[number]

export interface InkContentBlock {
  type: string       // 'intro' | 'section' | 'cta' | 'faq' | 'comparison' | 'pros-cons'
  heading?: string
  body: string
  order: number
}

export interface InkVariant {
  label: string      // 'Control' | 'Variant A' | 'Variant B'
  body: string
  isControl?: boolean
}

export interface InkPerformanceSnapshot {
  ctr?: number
  bounceRate?: number
  avgPosition?: number
  impressions?: number
  clicks?: number
  conversions?: number
  measuredAt?: string
}

export interface InkContentMetadata {
  // SEO
  metaTitle?: string
  metaDescription?: string
  searchIntent?: 'informational' | 'commercial' | 'transactional' | 'navigational'
  keywordDifficulty?: number
  secondaryKeywords?: string[]

  // Brief
  targetAudience?: string
  tone?: string
  guidelines?: string
  wordCountTarget?: number

  // Content structure
  contentBlocks?: InkContentBlock[]

  // Variants
  variants?: InkVariant[]

  // Performance
  performanceSnapshot?: InkPerformanceSnapshot

  // Schema markup
  structuredData?: Record<string, unknown>
}

/**
 * Safely parse metadata from unknown JSON into InkContentMetadata.
 * Returns null if parsing fails or input is null/empty.
 */
export function parseInkMetadata(raw: unknown): InkContentMetadata | null {
  if (!raw || typeof raw !== 'object') return null
  const obj = raw as Record<string, unknown>
  // Check if there's any INK-relevant field present
  const hasInkFields = INK_METADATA_FIELDS.some(f => obj[f] !== undefined)
  if (!hasInkFields) return null
  return obj as unknown as InkContentMetadata
}

/**
 * Fields that should be extracted from a flat agent payload and packed into metadata.
 */
export const INK_METADATA_FIELDS = [
  'metaTitle', 'metaDescription', 'searchIntent', 'keywordDifficulty', 'secondaryKeywords',
  'targetAudience', 'tone', 'guidelines', 'wordCountTarget',
  'contentBlocks', 'variants', 'performanceSnapshot', 'structuredData',
] as const
