import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { parseInkMetadata, type InkContentMetadata } from "@/lib/ink-types"
import { Search, Users, FileText, BarChart3, Layers, Beaker } from "lucide-react"

interface InkContentCardProps {
  metadata: unknown
  wordCount?: number
}

function SeoPreview({ m }: { m: InkContentMetadata }) {
  if (!m.metaTitle && !m.metaDescription) return null
  return (
    <Card>
      <CardHeader className="pb-2 pt-3 px-4">
        <CardTitle className="text-sm flex items-center gap-2">
          <Search className="h-4 w-4" />
          SEO Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-3">
        <div className="bg-white dark:bg-gray-900 border rounded-lg p-3 space-y-1">
          {m.metaTitle && (
            <div className="text-blue-600 dark:text-blue-400 text-sm font-medium truncate">
              {m.metaTitle}
              {m.metaTitle.length > 60 && (
                <span className="text-xs text-red-500 ml-1">({m.metaTitle.length}/60)</span>
              )}
            </div>
          )}
          {m.metaDescription && (
            <div className="text-xs text-muted-foreground line-clamp-2">
              {m.metaDescription}
              {m.metaDescription.length > 155 && (
                <span className="text-red-500 ml-1">({m.metaDescription.length}/155)</span>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {m.searchIntent && (
            <Badge variant="outline" className="text-xs">{m.searchIntent}</Badge>
          )}
          {m.keywordDifficulty !== undefined && (
            <Badge variant="outline" className="text-xs">
              KD: {m.keywordDifficulty}
            </Badge>
          )}
          {m.secondaryKeywords && m.secondaryKeywords.length > 0 && (
            <span className="text-xs text-muted-foreground">
              +{m.secondaryKeywords.length} secondary keywords
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function BriefDetails({ m, wordCount }: { m: InkContentMetadata; wordCount?: number }) {
  if (!m.targetAudience && !m.tone && !m.guidelines && !m.wordCountTarget) return null
  return (
    <Card>
      <CardHeader className="pb-2 pt-3 px-4">
        <CardTitle className="text-sm flex items-center gap-2">
          <Users className="h-4 w-4" />
          Brief
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-3 space-y-1.5 text-sm">
        {m.targetAudience && (
          <div className="flex gap-2">
            <span className="text-muted-foreground shrink-0">Doelgroep:</span>
            <span>{m.targetAudience}</span>
          </div>
        )}
        {m.tone && (
          <div className="flex gap-2">
            <span className="text-muted-foreground shrink-0">Tone:</span>
            <span>{m.tone}</span>
          </div>
        )}
        {m.wordCountTarget && (
          <div className="flex gap-2">
            <span className="text-muted-foreground shrink-0">Woorden:</span>
            <span>
              {wordCount !== undefined ? (
                <span className={wordCount >= m.wordCountTarget ? 'text-emerald-600' : 'text-amber-600'}>
                  {wordCount.toLocaleString()} / {m.wordCountTarget.toLocaleString()}
                </span>
              ) : (
                `Target: ${m.wordCountTarget.toLocaleString()}`
              )}
            </span>
          </div>
        )}
        {m.guidelines && (
          <div>
            <span className="text-muted-foreground text-xs">Richtlijnen:</span>
            <p className="text-xs mt-0.5 text-muted-foreground">{m.guidelines}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function ContentBlocks({ blocks }: { blocks: InkContentMetadata['contentBlocks'] }) {
  if (!blocks || blocks.length === 0) return null
  return (
    <Card>
      <CardHeader className="pb-2 pt-3 px-4">
        <CardTitle className="text-sm flex items-center gap-2">
          <Layers className="h-4 w-4" />
          Content Blocks ({blocks.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-3">
        <ol className="space-y-1 text-sm list-decimal list-inside">
          {blocks.sort((a, b) => a.order - b.order).map((block, i) => (
            <li key={i} className="flex items-center gap-2">
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{block.type}</Badge>
              <span className="truncate">{block.heading || `Block ${block.order}`}</span>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  )
}

function Variants({ variants }: { variants: InkContentMetadata['variants'] }) {
  if (!variants || variants.length === 0) return null
  return (
    <Card>
      <CardHeader className="pb-2 pt-3 px-4">
        <CardTitle className="text-sm flex items-center gap-2">
          <Beaker className="h-4 w-4" />
          Varianten ({variants.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-3">
        <div className="space-y-1.5 text-sm">
          {variants.map((v, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="font-medium">{v.label}</span>
              {v.isControl && <Badge className="text-[10px] bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">Control</Badge>}
              <span className="text-xs text-muted-foreground truncate">{v.body.substring(0, 80)}...</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function PerformanceSnapshot({ perf }: { perf: InkContentMetadata['performanceSnapshot'] }) {
  if (!perf) return null
  const metrics = Object.entries(perf).filter(([k, v]) => v !== undefined && k !== 'measuredAt')
  if (metrics.length === 0) return null

  const labels: Record<string, string> = {
    ctr: 'CTR',
    bounceRate: 'Bounce Rate',
    avgPosition: 'Avg Position',
    impressions: 'Impressions',
    clicks: 'Clicks',
    conversions: 'Conversions',
  }

  return (
    <Card>
      <CardHeader className="pb-2 pt-3 px-4">
        <CardTitle className="text-sm flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          Performance
          {perf.measuredAt && <span className="text-xs text-muted-foreground font-normal ml-auto">{perf.measuredAt}</span>}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-3">
        <div className="flex flex-wrap gap-3">
          {metrics.map(([key, val]) => (
            <div key={key} className="bg-muted rounded-lg px-3 py-2 text-center">
              <div className="text-xs text-muted-foreground">{labels[key] || key}</div>
              <div className="text-sm font-mono font-medium">
                {typeof val === 'number'
                  ? key === 'ctr' || key === 'bounceRate'
                    ? `${(val * 100).toFixed(1)}%`
                    : val.toLocaleString()
                  : val}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function InkContentCard({ metadata: raw, wordCount }: InkContentCardProps) {
  const m = parseInkMetadata(raw)
  if (!m) return null

  const hasSeo = m.metaTitle || m.metaDescription || m.searchIntent
  const hasBrief = m.targetAudience || m.tone || m.guidelines || m.wordCountTarget
  const hasBlocks = m.contentBlocks && m.contentBlocks.length > 0
  const hasVariants = m.variants && m.variants.length > 0
  const hasPerformance = m.performanceSnapshot

  if (!hasSeo && !hasBrief && !hasBlocks && !hasVariants && !hasPerformance) return null

  return (
    <div className="mb-4 space-y-4">
      {/* Secondary keywords display */}
      {m.secondaryKeywords && m.secondaryKeywords.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {m.secondaryKeywords.map((kw, i) => (
            <Badge key={i} variant="outline" className="text-xs">{kw}</Badge>
          ))}
        </div>
      )}

      {hasSeo && <SeoPreview m={m} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hasBrief && <BriefDetails m={m} wordCount={wordCount} />}
        {hasBlocks && <ContentBlocks blocks={m.contentBlocks} />}
        {hasVariants && <Variants variants={m.variants} />}
        {hasPerformance && <PerformanceSnapshot perf={m.performanceSnapshot} />}
      </div>
    </div>
  )
}
