"use client"

import { Badge } from "@/components/ui/badge"
import type {
  AtlasStrategyMetadata, AtlasReportItem, AtlasBlockerItem,
  AtlasLiveItem, AtlasPriorityItem, AtlasQuestionItem, AtlasRecommendationItem
} from "@/lib/atlas-types"

interface AtlasReportCardProps {
  metadata: Record<string, unknown>
  reportType?: string
}

function StateIndicator({ state, confidence }: { state?: string; confidence?: number }) {
  if (!state && confidence === undefined) return null

  const stateColor: Record<string, string> = {
    'on-track': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-200',
    'at-risk': 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-200',
    'blocked': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200',
    'pending-review': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200',
    'done': 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200',
  }

  return (
    <div className="flex items-center gap-3 mb-4">
      {state && <Badge className={stateColor[state] || stateColor['pending-review']}>{state}</Badge>}
      {confidence !== undefined && (
        <div className="flex items-center gap-1.5">
          <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${confidence >= 0.7 ? 'bg-emerald-500' : confidence >= 0.4 ? 'bg-amber-500' : 'bg-red-500'}`}
              style={{ width: `${confidence * 100}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground">{(confidence * 100).toFixed(0)}%</span>
        </div>
      )}
    </div>
  )
}

function DoneItemsList({ items }: { items: AtlasReportItem[] }) {
  if (items.length === 0) return null
  return (
    <div className="mb-4">
      <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">Afgerond ({items.length})</h4>
      <div className="space-y-1.5">
        {items.map((item, i) => (
          <div key={i} className="bg-emerald-50 dark:bg-emerald-900/10 rounded-lg p-2">
            <div className="flex items-center gap-2">
              <span className="text-emerald-600 font-medium text-sm">{item.label}</span>
              {item.agent && <Badge variant="outline" className="text-[10px]">{item.agent}</Badge>}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
            {item.impact && <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">Impact: {item.impact}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

function BlockersList({ blockers }: { blockers: AtlasBlockerItem[] }) {
  if (blockers.length === 0) return null

  const severityColor: Record<string, string> = {
    critical: 'border-red-400 bg-red-50 dark:bg-red-900/10',
    high: 'border-orange-400 bg-orange-50 dark:bg-orange-900/10',
    medium: 'border-amber-400 bg-amber-50 dark:bg-amber-900/10',
    low: 'border-blue-400 bg-blue-50 dark:bg-blue-900/10',
  }

  return (
    <div className="mb-4">
      <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">Blockers ({blockers.length})</h4>
      <div className="space-y-2">
        {blockers.map((b, i) => (
          <div key={i} className={`border-l-2 rounded-r-lg p-2 ${severityColor[b.severity] || severityColor.medium}`}>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{b.label}</span>
              <Badge variant="outline" className="text-[10px]">{b.severity}</Badge>
              {b.owner && <Badge variant="outline" className="text-[10px]">{b.owner}</Badge>}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{b.description}</p>
            <p className="text-xs mt-0.5">Impact: {b.impact}</p>
            {b.suggestedNextStep && (
              <p className="text-xs text-blue-700 dark:text-blue-400 mt-0.5">Volgende stap: {b.suggestedNextStep}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function LiveItemsList({ items }: { items: AtlasLiveItem[] }) {
  if (items.length === 0) return null
  return (
    <div className="mb-4">
      <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">Live ({items.length})</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {items.map((item, i) => (
          <div key={i} className="bg-green-50 dark:bg-green-900/10 rounded-lg p-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px]">{item.type}</Badge>
              <span className="text-sm font-medium">{item.label}</span>
            </div>
            {item.description && <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>}
            {item.url && (
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline mt-0.5 block truncate">
                {item.url}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function PrioritiesList({ priorities }: { priorities: AtlasPriorityItem[] }) {
  if (priorities.length === 0) return null
  const sorted = [...priorities].sort((a, b) => a.rank - b.rank)

  return (
    <div className="mb-4">
      <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">Prioriteiten ({priorities.length})</h4>
      <div className="space-y-1.5">
        {sorted.map((p, i) => (
          <div key={i} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2 flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#F5911E]/15 text-[#F5911E] flex items-center justify-center text-xs font-bold">
              {p.rank}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{p.label}</span>
                <Badge variant="outline" className="text-[10px]">{p.owner}</Badge>
                {p.needsApproval && <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-200 text-[10px]">approval</Badge>}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{p.reason}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function QuestionsList({ questions }: { questions: AtlasQuestionItem[] }) {
  if (questions.length === 0) return null
  return (
    <div className="mb-4">
      <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">Vragen voor Bart ({questions.length})</h4>
      <div className="space-y-2">
        {questions.map((q, i) => (
          <div key={i} className="bg-blue-50 dark:bg-blue-900/10 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
            <p className="text-sm font-medium">{q.question}</p>
            {q.reason && <p className="text-xs text-muted-foreground mt-0.5">Reden: {q.reason}</p>}
            {q.options && q.options.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1.5">
                {q.options.map((opt, j) => (
                  <Badge key={j} variant="outline" className="text-[10px]">{opt}</Badge>
                ))}
              </div>
            )}
            {q.requiredBy && <p className="text-[10px] text-muted-foreground mt-1">Nodig voor: {q.requiredBy}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

function RecommendationsList({ recommendations }: { recommendations: AtlasRecommendationItem[] }) {
  if (recommendations.length === 0) return null

  const typeColor: Record<string, string> = {
    strategy: 'bg-violet-100 text-violet-800 dark:bg-violet-900/20 dark:text-violet-200',
    execution: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200',
    resource: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-200',
    priority: 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-200',
    risk: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200',
  }

  return (
    <div className="mb-4">
      <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">Aanbevelingen ({recommendations.length})</h4>
      <div className="space-y-2">
        {recommendations.map((rec, i) => (
          <div key={i} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <Badge className={typeColor[rec.type] || 'bg-gray-100 text-gray-800'}>{rec.type}</Badge>
              {rec.needsApproval && <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-200 text-[10px]">approval</Badge>}
            </div>
            <p className="text-sm font-medium mt-1">{rec.title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{rec.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function MetricsPanel({ metrics }: { metrics: Record<string, number | string> }) {
  const entries = Object.entries(metrics)
  if (entries.length === 0) return null

  return (
    <div className="mb-4">
      <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">Metrics</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {entries.map(([key, value]) => (
          <div key={key} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2 text-center">
            <div className="text-lg font-bold">{typeof value === 'number' ? value.toLocaleString() : value}</div>
            <div className="text-[10px] text-muted-foreground">{key}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function AtlasReportCard({ metadata, reportType }: AtlasReportCardProps) {
  const data = metadata as unknown as AtlasStrategyMetadata
  if (!data) return null

  return (
    <div className="mb-4">
      <StateIndicator state={data.currentState} confidence={data.confidence} />
      {data.audience && data.audience.length > 0 && (
        <div className="flex gap-1 mb-3">
          <span className="text-[10px] text-muted-foreground">Publiek:</span>
          {data.audience.map((a, i) => <Badge key={i} variant="outline" className="text-[10px]">{a}</Badge>)}
        </div>
      )}
      {data.questions && data.questions.length > 0 && <QuestionsList questions={data.questions} />}
      {data.priorities && data.priorities.length > 0 && <PrioritiesList priorities={data.priorities} />}
      {data.blockers && data.blockers.length > 0 && <BlockersList blockers={data.blockers} />}
      {data.doneItems && data.doneItems.length > 0 && <DoneItemsList items={data.doneItems} />}
      {data.liveItems && data.liveItems.length > 0 && <LiveItemsList items={data.liveItems} />}
      {data.recommendations && data.recommendations.length > 0 && <RecommendationsList recommendations={data.recommendations} />}
      {data.metrics && <MetricsPanel metrics={data.metrics} />}
    </div>
  )
}
