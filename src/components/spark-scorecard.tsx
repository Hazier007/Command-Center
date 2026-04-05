import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { parseSparkMetadata, type SparkReportMetadata } from "@/lib/spark-types"
import { AlertTriangle, CheckCircle2, Zap, ExternalLink, BarChart3 } from "lucide-react"

interface SparkScorecardProps {
  metadata: unknown
}

function ScoreBar({ label, value, max = 10 }: { label: string; value: number; max?: number }) {
  const pct = Math.round((value / max) * 100)
  const color = value >= 7 ? 'bg-emerald-500' : value >= 5 ? 'bg-amber-500' : 'bg-red-500'
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="w-28 shrink-0 text-muted-foreground">{label}</span>
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="w-8 text-right font-mono text-xs">{value.toFixed(1)}</span>
    </div>
  )
}

function RecommendationBadge({ rec }: { rec: string }) {
  const config: Record<string, { color: string; label: string }> = {
    build: { color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200', label: 'BUILD' },
    investigate: { color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200', label: 'INVESTIGATE' },
    skip: { color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200', label: 'SKIP' },
    acquire: { color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200', label: 'ACQUIRE' },
    pass: { color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200', label: 'PASS' },
  }
  const c = config[rec] || config.pass!
  return <Badge className={`${c.color} text-xs font-bold`}>{c.label}</Badge>
}

export function SparkScorecard({ metadata: raw }: SparkScorecardProps) {
  const m = parseSparkMetadata(raw)
  if (!m) return null

  const hasScores = m.scoreOverall !== undefined
  const hasFindings = m.findings && m.findings.length > 0
  const hasQuickWins = m.quickWins && m.quickWins.length > 0
  const hasRisks = m.risks && m.risks.length > 0
  const hasNextSteps = m.nextSteps && m.nextSteps.length > 0
  const hasEvidence = m.evidence && m.evidence.length > 0
  const hasSources = m.sources && m.sources.length > 0
  const hasMetrics = m.metrics && Object.keys(m.metrics).length > 0

  if (!hasScores && !hasFindings && !hasQuickWins && !hasRisks) return null

  return (
    <div className="mb-4 space-y-4">
      {/* Header with recommendation + business info */}
      <div className="flex flex-wrap items-center gap-3">
        {m.recommendation && <RecommendationBadge rec={m.recommendation} />}
        {m.companyName && <span className="text-sm font-medium">{m.companyName}</span>}
        {m.market && <Badge variant="outline" className="text-xs">{m.market}</Badge>}
        {m.auditType && <Badge variant="secondary" className="text-xs">{m.auditType}</Badge>}
        {m.paybackPeriod && (
          <span className="text-xs text-muted-foreground">Payback: {m.paybackPeriod}</span>
        )}
      </div>

      {/* Financial estimates */}
      {(m.estimatedInvestment || m.estimatedRevenue) && (
        <div className="flex gap-4 text-sm">
          {m.estimatedInvestment && (
            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground">Investment:</span>
              <span className="font-medium">{m.estimatedInvestment.startsWith('€') ? m.estimatedInvestment : `€${m.estimatedInvestment}`}</span>
            </div>
          )}
          {m.estimatedRevenue && (
            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground">Revenue:</span>
              <span className="font-medium text-emerald-600 dark:text-emerald-400">{m.estimatedRevenue.startsWith('€') ? m.estimatedRevenue : `€${m.estimatedRevenue}`}</span>
            </div>
          )}
        </div>
      )}

      {/* Score bars */}
      {hasScores && (
        <Card>
          <CardHeader className="pb-2 pt-3 px-4">
            <CardTitle className="text-sm flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Scores
              {m.scoreOverall !== undefined && (
                <Badge className={`ml-auto ${m.scoreOverall >= 7 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200' : m.scoreOverall >= 5 ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'}`}>
                  Overall: {m.scoreOverall.toFixed(1)}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-3 space-y-1.5">
            {m.scoreFeasibility !== undefined && <ScoreBar label="Feasibility" value={m.scoreFeasibility} />}
            {m.scoreRevenuePotential !== undefined && <ScoreBar label="Revenue" value={m.scoreRevenuePotential} />}
            {m.scoreTimeToRevenue !== undefined && <ScoreBar label="Time-to-Rev" value={m.scoreTimeToRevenue} />}
            {m.scoreCompetition !== undefined && <ScoreBar label="Competition" value={m.scoreCompetition} />}
            {m.scoreStrategicFit !== undefined && <ScoreBar label="Strategic Fit" value={m.scoreStrategicFit} />}
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Findings */}
        {hasFindings && (
          <Card>
            <CardHeader className="pb-2 pt-3 px-4">
              <CardTitle className="text-sm">Findings</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-3">
              <ul className="space-y-1.5 text-sm">
                {m.findings!.map((f, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="shrink-0 mt-0.5 text-muted-foreground">&bull;</span>
                    <div>
                      <span className="font-medium">{typeof f === 'string' ? f : f.title}</span>
                      {typeof f !== 'string' && f.detail && <p className="text-muted-foreground text-xs mt-0.5">{f.detail}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Quick Wins */}
        {hasQuickWins && (
          <Card>
            <CardHeader className="pb-2 pt-3 px-4">
              <CardTitle className="text-sm flex items-center gap-2">
                <Zap className="h-3.5 w-3.5 text-amber-500" />
                Quick Wins
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-3">
              <ul className="space-y-1.5 text-sm">
                {m.quickWins!.map((qw, i) => (
                  <li key={i} className="flex gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5 text-emerald-500" />
                    <span>{typeof qw === 'string' ? qw : qw.action}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Risks */}
        {hasRisks && (
          <Card>
            <CardHeader className="pb-2 pt-3 px-4">
              <CardTitle className="text-sm flex items-center gap-2">
                <AlertTriangle className="h-3.5 w-3.5 text-red-500" />
                Risks
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-3">
              <ul className="space-y-1.5 text-sm">
                {m.risks!.map((r, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="shrink-0 mt-0.5 text-red-400">&bull;</span>
                    <span>{typeof r === 'string' ? r : r.risk}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Next Steps */}
        {hasNextSteps && (
          <Card>
            <CardHeader className="pb-2 pt-3 px-4">
              <CardTitle className="text-sm">Next Steps</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-3">
              <ol className="space-y-1.5 text-sm list-decimal list-inside">
                {m.nextSteps!.map((ns, i) => (
                  <li key={i}>{typeof ns === 'string' ? ns : ns.step}</li>
                ))}
              </ol>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Evidence table */}
      {hasEvidence && (
        <Card>
          <CardHeader className="pb-2 pt-3 px-4">
            <CardTitle className="text-sm">Evidence</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-3 overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-1.5 pr-3 font-medium text-muted-foreground">Claim / Prompt</th>
                  <th className="text-left py-1.5 pr-3 font-medium text-muted-foreground">Source</th>
                  <th className="text-left py-1.5 font-medium text-muted-foreground">Confidence</th>
                </tr>
              </thead>
              <tbody>
                {m.evidence!.map((ev, i) => (
                  <tr key={i} className="border-b border-dashed last:border-0">
                    <td className="py-1.5 pr-3">{ev.prompt || ev.claim}</td>
                    <td className="py-1.5 pr-3">{ev.source}{ev.observedLeader ? ` (leader: ${ev.observedLeader})` : ''}</td>
                    <td className="py-1.5">{ev.confidence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* Metrics */}
      {hasMetrics && (
        <div className="flex flex-wrap gap-3">
          {Object.entries(m.metrics!).map(([key, val]) => (
            <div key={key} className="bg-muted rounded-lg px-3 py-2 text-center">
              <div className="text-xs text-muted-foreground">{key}</div>
              <div className="text-sm font-mono font-medium">{typeof val === 'number' ? val.toLocaleString() : val}</div>
            </div>
          ))}
        </div>
      )}

      {/* Sources */}
      {hasSources && (
        <div className="text-xs text-muted-foreground">
          <span className="font-medium">Sources: </span>
          {m.sources!.map((s, i) => (
            <span key={i}>
              {s.url ? (
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 hover:underline">
                  {s.title}<ExternalLink className="h-2.5 w-2.5" />
                </a>
              ) : (
                s.title
              )}
              {i < m.sources!.length - 1 && ', '}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
