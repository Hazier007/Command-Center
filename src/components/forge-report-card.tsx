import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { parseForgeMetadata, type ForgeReportMetadata } from "@/lib/forge-types"
import { CheckCircle, XCircle, AlertTriangle, Package, FileCode, BarChart3, ArrowRight, Link2, Minus } from "lucide-react"

interface ForgeReportCardProps {
  metadata: unknown
  reportType?: string
}

function ChecksSection({ checks }: { checks: ForgeReportMetadata['checks'] }) {
  if (!checks || checks.length === 0) return null
  const icons = {
    passed: <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />,
    failed: <XCircle className="h-3.5 w-3.5 text-red-500" />,
    skipped: <Minus className="h-3.5 w-3.5 text-gray-400" />,
  }
  return (
    <Card>
      <CardHeader className="pb-2 pt-3 px-4">
        <CardTitle className="text-sm flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          Checks ({checks.filter(c => c.status === 'passed').length}/{checks.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-3">
        <div className="space-y-1.5">
          {checks.map((check, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              {icons[check.status]}
              <span className="font-medium">{check.name}</span>
              {check.details && <span className="text-xs text-muted-foreground truncate">{check.details}</span>}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function MetricsSection({ metrics }: { metrics: ForgeReportMetadata['metrics'] }) {
  if (!metrics || Object.keys(metrics).length === 0) return null

  const renderValue = (key: string, val: unknown): string => {
    if (typeof val === 'object' && val !== null) {
      // Handle nested objects like lighthouse
      return Object.entries(val as Record<string, unknown>)
        .map(([k, v]) => `${k}: ${v}`)
        .join(', ')
    }
    if (typeof val === 'number') {
      if (key.toLowerCase().includes('time') || key.toLowerCase().includes('ms')) return `${(val / 1000).toFixed(1)}s`
      if (key.toLowerCase().includes('kb')) return `${val}KB`
      return val.toLocaleString()
    }
    return String(val)
  }

  // Separate lighthouse from other metrics
  const lighthouse = metrics.lighthouse as Record<string, number> | undefined
  const otherMetrics = Object.entries(metrics).filter(([k]) => k !== 'lighthouse')

  return (
    <Card>
      <CardHeader className="pb-2 pt-3 px-4">
        <CardTitle className="text-sm flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          Metrics
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-3">
        {lighthouse && (
          <div className="flex flex-wrap gap-2 mb-2">
            {Object.entries(lighthouse).map(([key, val]) => (
              <div key={key} className="bg-muted rounded-lg px-3 py-1.5 text-center">
                <div className="text-[10px] text-muted-foreground capitalize">{key}</div>
                <div className={`text-sm font-mono font-bold ${val >= 90 ? 'text-emerald-600' : val >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
                  {val}
                </div>
              </div>
            ))}
          </div>
        )}
        {otherMetrics.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {otherMetrics.map(([key, val]) => (
              <div key={key} className="bg-muted rounded-lg px-3 py-1.5 text-center">
                <div className="text-[10px] text-muted-foreground">{key}</div>
                <div className="text-xs font-mono">{renderValue(key, val)}</div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function ImplementedItemsSection({ items }: { items: ForgeReportMetadata['implementedItems'] }) {
  if (!items || items.length === 0) return null
  return (
    <Card>
      <CardHeader className="pb-2 pt-3 px-4">
        <CardTitle className="text-sm flex items-center gap-2">
          <Package className="h-4 w-4" />
          Implemented ({items.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-3">
        <div className="space-y-1.5">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{item.type}</Badge>
              <span className="font-mono text-xs">{item.label}</span>
              <Badge className={`text-[10px] ${item.status === 'implemented' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-200' : 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-200'}`}>
                {item.status}
              </Badge>
              {item.notes && <span className="text-xs text-muted-foreground truncate">{item.notes}</span>}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function AffectedFilesSection({ files }: { files: ForgeReportMetadata['affectedFiles'] }) {
  if (!files || files.length === 0) return null
  const changeColors = {
    created: 'text-emerald-600',
    updated: 'text-amber-600',
    deleted: 'text-red-600',
  }
  return (
    <Card>
      <CardHeader className="pb-2 pt-3 px-4">
        <CardTitle className="text-sm flex items-center gap-2">
          <FileCode className="h-4 w-4" />
          Files ({files.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-3">
        <div className="space-y-0.5 text-xs font-mono">
          {files.map((f, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className={changeColors[f.changeType] || 'text-gray-500'}>{f.changeType[0].toUpperCase()}</span>
              <span className="truncate">{f.path}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function BlockersSection({ blockers }: { blockers: ForgeReportMetadata['blockers'] }) {
  if (!blockers || blockers.length === 0) return null
  return (
    <Card className="border-red-200 dark:border-red-800/30">
      <CardHeader className="pb-2 pt-3 px-4">
        <CardTitle className="text-sm flex items-center gap-2 text-red-700 dark:text-red-400">
          <AlertTriangle className="h-4 w-4" />
          Blockers ({blockers.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-3">
        <div className="space-y-1.5">
          {blockers.map((b, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <Badge variant="destructive" className="text-[10px]">{b.severity}</Badge>
              <span>{b.label}</span>
              {b.actionNeeded && <Badge className="text-[10px] bg-red-100 text-red-800">actie nodig</Badge>}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function HandoffSection({ handoff }: { handoff: ForgeReportMetadata['handoff'] }) {
  if (!handoff) return null
  return (
    <Card className="border-violet-200 dark:border-violet-800/30">
      <CardHeader className="pb-2 pt-3 px-4">
        <CardTitle className="text-sm flex items-center gap-2 text-violet-700 dark:text-violet-400">
          <ArrowRight className="h-4 w-4" />
          Handoff
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-3 text-sm space-y-1">
        {handoff.nextOwner && (
          <div><span className="text-muted-foreground">Volgende:</span> <span className="font-medium">{handoff.nextOwner}</span></div>
        )}
        {handoff.nextAction && (
          <div><span className="text-muted-foreground">Actie:</span> {handoff.nextAction}</div>
        )}
        {handoff.risks && handoff.risks.length > 0 && (
          <div>
            <span className="text-muted-foreground">Risico&apos;s:</span>
            <ul className="list-disc list-inside text-xs mt-0.5">
              {handoff.risks.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function ArtifactsSection({ artifacts }: { artifacts: ForgeReportMetadata['artifacts'] }) {
  if (!artifacts) return null
  const links = Object.entries(artifacts).filter(([, v]) => v)
  if (links.length === 0) return null

  const labels: Record<string, string> = {
    previewUrl: 'Preview',
    deployUrl: 'Production',
    logUrl: 'Logs',
    pullRequestUrl: 'Pull Request',
  }

  return (
    <div className="flex flex-wrap gap-2">
      {links.map(([key, url]) => (
        <a key={key} href={url as string} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline">
          <Link2 className="h-3 w-3" />
          {labels[key] || key}
        </a>
      ))}
    </div>
  )
}

export function ForgeReportCard({ metadata: raw, reportType }: ForgeReportCardProps) {
  const m = parseForgeMetadata(raw)
  if (!m) return null

  // Order sections based on report type
  const isBuildDeploy = reportType === 'build-report' || reportType === 'deploy-report'
  const isBug = reportType === 'bug-analysis'
  const isHandoff = reportType === 'handoff-note'

  return (
    <div className="mb-4 space-y-4">
      {/* Tags */}
      {m.tags && m.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {m.tags.map((tag, i) => (
            <Badge key={i} variant="outline" className="text-xs">{tag}</Badge>
          ))}
        </div>
      )}

      {/* Artifacts always on top */}
      {m.artifacts && <ArtifactsSection artifacts={m.artifacts} />}

      {/* Impact badges */}
      <div className="flex flex-wrap gap-2">
        {m.changeScope && <Badge variant="outline" className="text-xs">scope: {m.changeScope}</Badge>}
        {m.deployTarget && <Badge variant="outline" className="text-xs">deploy: {m.deployTarget}</Badge>}
        {m.deployStatus && (
          <Badge className={`text-xs ${m.deployStatus === 'success' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-200' : m.deployStatus === 'failed' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200'}`}>
            deploy: {m.deployStatus}
          </Badge>
        )}
        {m.productionImpact && <Badge variant="destructive" className="text-xs">production impact</Badge>}
        {m.backwardCompatible === false && <Badge variant="destructive" className="text-xs">breaking change</Badge>}
        {m.durationMs && <Badge variant="outline" className="text-xs">{(m.durationMs / 1000 / 60).toFixed(0)}min</Badge>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Prioritize sections based on type */}
        {isBug && <BlockersSection blockers={m.blockers} />}
        {isHandoff && <HandoffSection handoff={m.handoff} />}

        {isBuildDeploy && <ChecksSection checks={m.checks} />}
        {isBuildDeploy && <MetricsSection metrics={m.metrics} />}

        <ImplementedItemsSection items={m.implementedItems} />
        <AffectedFilesSection files={m.affectedFiles} />

        {!isBuildDeploy && <ChecksSection checks={m.checks} />}
        {!isBuildDeploy && <MetricsSection metrics={m.metrics} />}

        {!isBug && <BlockersSection blockers={m.blockers} />}
        {!isHandoff && <HandoffSection handoff={m.handoff} />}
      </div>
    </div>
  )
}
