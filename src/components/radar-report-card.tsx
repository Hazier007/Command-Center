"use client"

import { Badge } from "@/components/ui/badge"
import type { RadarSeoMetadata, RadarKeyword, RadarRecommendation, RadarSignal, RadarMetrics } from "@/lib/radar-types"

interface RadarReportCardProps {
  metadata: Record<string, unknown>
  subtype?: string
}

function MetricsOverview({ metrics }: { metrics: RadarMetrics }) {
  const items = [
    { label: 'Clicks', value: metrics.clicks?.toLocaleString() },
    { label: 'Impressies', value: metrics.impressions?.toLocaleString() },
    { label: 'CTR', value: metrics.ctr ? `${(metrics.ctr * 100).toFixed(1)}%` : undefined },
    { label: 'Gem. Positie', value: metrics.avgPosition?.toFixed(1) },
    { label: 'Indexed', value: metrics.indexedPages?.toLocaleString() },
    { label: 'DA', value: metrics.domainAuthority?.toString() },
    { label: 'Mobile', value: metrics.mobileScore?.toString() },
    { label: 'PageSpeed', value: metrics.pageSpeedScore?.toString() },
    { label: 'SEO Score', value: metrics.seoScore?.toString() },
    { label: 'Crawl Errors', value: metrics.crawlErrors?.toString() },
  ].filter(i => i.value !== undefined)

  if (items.length === 0) return null

  return (
    <div className="mb-4">
      <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">Metrics</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {items.map(item => (
          <div key={item.label} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2 text-center">
            <div className="text-lg font-bold">{item.value}</div>
            <div className="text-[10px] text-muted-foreground">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function KeywordTable({ keywords }: { keywords: RadarKeyword[] }) {
  if (keywords.length === 0) return null

  const sorted = [...keywords].sort((a, b) => a.position - b.position)

  return (
    <div className="mb-4">
      <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">Keywords ({keywords.length})</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b text-left text-muted-foreground">
              <th className="pb-1 pr-3">Keyword</th>
              <th className="pb-1 pr-3 text-right">Pos</th>
              <th className="pb-1 pr-3 text-right">Clicks</th>
              <th className="pb-1 pr-3 text-right">Impr</th>
              <th className="pb-1 pr-3 text-right">CTR</th>
              <th className="pb-1">Trend</th>
            </tr>
          </thead>
          <tbody>
            {sorted.slice(0, 20).map((kw, i) => (
              <tr key={i} className={`border-b border-gray-100 dark:border-gray-800 ${kw.isQuickWin ? 'bg-amber-50 dark:bg-amber-900/10' : ''}`}>
                <td className="py-1 pr-3 font-medium">
                  {kw.keyword}
                  {kw.isQuickWin && <Badge className="ml-1 text-[8px] bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-200">QW</Badge>}
                </td>
                <td className="py-1 pr-3 text-right font-mono">{kw.position.toFixed(1)}</td>
                <td className="py-1 pr-3 text-right">{kw.clicks.toLocaleString()}</td>
                <td className="py-1 pr-3 text-right">{kw.impressions.toLocaleString()}</td>
                <td className="py-1 pr-3 text-right">{(kw.ctr * 100).toFixed(1)}%</td>
                <td className="py-1">
                  {kw.trend && (
                    <span className={
                      kw.trend === 'improving' ? 'text-emerald-600' :
                      kw.trend === 'declining' ? 'text-red-600' :
                      'text-muted-foreground'
                    }>
                      {kw.trend === 'improving' ? '^ up' : kw.trend === 'declining' ? 'v down' : '- stable'}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {keywords.length > 20 && (
          <p className="text-[10px] text-muted-foreground mt-1">+{keywords.length - 20} meer keywords</p>
        )}
      </div>
    </div>
  )
}

function RecommendationsList({ recommendations }: { recommendations: RadarRecommendation[] }) {
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
            <div className="flex items-start gap-2">
              <Badge className={priorityColor[rec.priority] || priorityColor.medium}>{rec.priority}</Badge>
              <Badge variant="outline" className="text-[10px]">{rec.type}</Badge>
              {rec.assignTo && <Badge variant="outline" className="text-[10px]">{rec.assignTo}</Badge>}
            </div>
            <p className="text-sm mt-1">{rec.action}</p>
            {rec.keyword && (
              <p className="text-xs text-muted-foreground mt-0.5">
                Keyword: {rec.keyword}
                {rec.currentPosition && ` (pos ${rec.currentPosition}`}
                {rec.targetPosition && ` -> ${rec.targetPosition})`}
              </p>
            )}
            {(rec.effort || rec.estimatedImpact) && (
              <div className="flex gap-2 mt-1">
                {rec.effort && <span className="text-[10px] text-muted-foreground">Effort: {rec.effort}</span>}
                {rec.estimatedImpact && <span className="text-[10px] text-muted-foreground">Impact: {rec.estimatedImpact}</span>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function SignalsList({ signals }: { signals: RadarSignal[] }) {
  if (signals.length === 0) return null

  const severityColor: Record<string, string> = {
    critical: 'border-red-400 bg-red-50 dark:bg-red-900/10',
    warning: 'border-orange-400 bg-orange-50 dark:bg-orange-900/10',
    opportunity: 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/10',
    info: 'border-blue-400 bg-blue-50 dark:bg-blue-900/10',
  }

  return (
    <div className="mb-4">
      <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">Signalen ({signals.length})</h4>
      <div className="space-y-2">
        {signals.map((signal, i) => (
          <div key={i} className={`border-l-2 rounded-r-lg p-2 ${severityColor[signal.severity] || severityColor.info}`}>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px]">{signal.type}</Badge>
              <Badge variant="outline" className="text-[10px]">{signal.severity}</Badge>
            </div>
            <div className="text-sm mt-0.5">
              {signal.keyword && <span className="font-medium">{signal.keyword}</span>}
              {signal.domain && <span className="font-medium">{signal.domain}</span>}
              {signal.delta !== undefined && (
                <span className={signal.delta > 0 ? 'text-emerald-600 ml-1' : 'text-red-600 ml-1'}>
                  {signal.delta > 0 ? '+' : ''}{signal.delta}
                </span>
              )}
              {signal.previousPosition !== undefined && signal.currentPosition !== undefined && (
                <span className="text-muted-foreground ml-1">
                  (pos {signal.previousPosition} {'>'} {signal.currentPosition})
                </span>
              )}
            </div>
            {signal.daysRemaining !== undefined && (
              <p className="text-xs text-muted-foreground mt-0.5">
                Vervalt over {signal.daysRemaining} dagen
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export function RadarReportCard({ metadata, subtype }: RadarReportCardProps) {
  const data = metadata as unknown as RadarSeoMetadata
  if (!data) return null

  // Determine render order based on subtype
  const sections: React.ReactNode[] = []

  if (data.metrics) sections.push(<MetricsOverview key="metrics" metrics={data.metrics} />)
  if (data.signals && data.signals.length > 0) sections.push(<SignalsList key="signals" signals={data.signals} />)
  if (data.keywords && data.keywords.length > 0) sections.push(<KeywordTable key="keywords" keywords={data.keywords} />)
  if (data.recommendations && data.recommendations.length > 0) sections.push(<RecommendationsList key="recs" recommendations={data.recommendations} />)

  // Reorder based on subtype
  if (subtype === 'signal') {
    // Signals first
    sections.sort((a, b) => {
      const order = ['signals', 'metrics', 'keywords', 'recs']
      const aKey = (a as React.ReactElement).key as string
      const bKey = (b as React.ReactElement).key as string
      return order.indexOf(aKey) - order.indexOf(bKey)
    })
  } else if (subtype === 'keyword_snapshot') {
    sections.sort((a, b) => {
      const order = ['keywords', 'metrics', 'recs', 'signals']
      const aKey = (a as React.ReactElement).key as string
      const bKey = (b as React.ReactElement).key as string
      return order.indexOf(aKey) - order.indexOf(bKey)
    })
  }

  if (sections.length === 0) return null

  return <div className="mb-4">{sections}</div>
}
