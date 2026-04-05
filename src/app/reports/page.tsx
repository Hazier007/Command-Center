"use client"

import { useState, useEffect } from "react"
import { Eye, EyeOff, AlertCircle, GitBranch, Server, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ForgeReportCard } from "@/components/forge-report-card"
import { LedgerReportCard } from "@/components/ledger-report-card"
import { AtlasReportCard } from "@/components/atlas-report-card"

interface AgentReportItem {
  id: string
  agent: string
  reportType: string
  title: string
  summary?: string
  body?: string
  status: string
  outcome?: string
  priority: string
  category: string
  needsApproval: boolean
  approvalReason?: string
  linkedTaskId?: string
  linkedSiteId?: string
  linkedSprintId?: string
  environment?: string
  repo?: string
  branch?: string
  periodType?: string
  periodLabel?: string
  currency?: string
  metadata?: Record<string, unknown>
  startedAt?: string
  completedAt?: string
  createdAt: string
  updatedAt: string
}

const REPORT_TYPES = [
  { value: 'implementation-update', label: 'Implementation', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200' },
  { value: 'technical-plan', label: 'Technical Plan', color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-200' },
  { value: 'build-report', label: 'Build', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-200' },
  { value: 'deploy-report', label: 'Deploy', color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200' },
  { value: 'bug-analysis', label: 'Bug Analysis', color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200' },
  { value: 'architecture-note', label: 'Architecture', color: 'bg-violet-100 text-violet-800 dark:bg-violet-900/20 dark:text-violet-200' },
  { value: 'handoff-note', label: 'Handoff', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-200' },
  { value: 'release-note', label: 'Release', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-200' },
  { value: 'blocker-report', label: 'Blocker', color: 'bg-rose-100 text-rose-800 dark:bg-rose-900/20 dark:text-rose-200' },
  { value: 'qa-summary', label: 'QA', color: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-200' },
  { value: 'performance-report', label: 'Performance', color: 'bg-teal-100 text-teal-800 dark:bg-teal-900/20 dark:text-teal-200' },
  // LEDGER report types
  { value: 'finance_snapshot', label: 'Finance Snapshot', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-200' },
  { value: 'kpi_summary', label: 'KPI Summary', color: 'bg-lime-100 text-lime-800 dark:bg-lime-900/20 dark:text-lime-200' },
  { value: 'pnl_summary', label: 'P&L', color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200' },
  { value: 'cashflow_analysis', label: 'Cashflow', color: 'bg-teal-100 text-teal-800 dark:bg-teal-900/20 dark:text-teal-200' },
  { value: 'roi_analysis', label: 'ROI Analysis', color: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-200' },
  { value: 'forecast_report', label: 'Forecast', color: 'bg-sky-100 text-sky-800 dark:bg-sky-900/20 dark:text-sky-200' },
  { value: 'financial_alert', label: 'Financial Alert', color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200' },
  { value: 'contract_risk_report', label: 'Contract Risk', color: 'bg-rose-100 text-rose-800 dark:bg-rose-900/20 dark:text-rose-200' },
  // ATLAS report types
  { value: 'daily-brief', label: 'Daily Brief', color: 'bg-violet-100 text-violet-800 dark:bg-violet-900/20 dark:text-violet-200' },
  { value: 'operational-summary', label: 'Ops Summary', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-200' },
  { value: 'sprint-plan', label: 'Sprint Plan', color: 'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/20 dark:text-fuchsia-200' },
  { value: 'sprint-review', label: 'Sprint Review', color: 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-200' },
  { value: 'priority-update', label: 'Priority Update', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-200' },
  { value: 'decision-support', label: 'Decision Support', color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-200' },
  { value: 'executive-summary', label: 'Executive Summary', color: 'bg-violet-100 text-violet-800 dark:bg-violet-900/20 dark:text-violet-200' },
  { value: 'project-status', label: 'Project Status', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200' },
  { value: 'agent-coordination', label: 'Agent Coordination', color: 'bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-200' },
]

const OUTCOME_COLORS: Record<string, string> = {
  success: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-200',
  partial: 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-200',
  blocked: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-200',
  failed: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200',
  'review-needed': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200',
}

const STATUS_COLORS: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200',
  'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200',
  blocked: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-200',
  done: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-200',
  shipped: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200',
  failed: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200',
}

const AGENT_COLORS: Record<string, string> = {
  forge: 'bg-rose-100 text-rose-800 dark:bg-rose-900/20 dark:text-rose-200',
  atlas: 'bg-violet-100 text-violet-800 dark:bg-violet-900/20 dark:text-violet-200',
  radar: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-200',
  ink: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-200',
  ledger: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-200',
  spark: 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-200',
}

export default function ReportsPage() {
  const [reports, setReports] = useState<AgentReportItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState("alles")
  const [selectedAgent, setSelectedAgent] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [expandedReport, setExpandedReport] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    loadReports()
  }, [page])

  const loadReports = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/agent-reports?page=${page}&limit=25`)
      const result = await res.json()
      setReports(result.data || [])
      setTotalPages(result.pagination?.pages || 1)
    } catch (error) {
      console.error('Failed to load reports:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredReports = reports.filter(item => {
    const matchesSearch = !searchTerm ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.repo?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTab = selectedTab === "alles" ||
      (selectedTab === "needs-review" && item.needsApproval) ||
      (selectedTab === "blocked" && (item.status === 'blocked' || item.outcome === 'blocked')) ||
      (selectedTab === "deploys" && (item.reportType === 'deploy-report' || item.reportType === 'build-report'))

    const matchesAgent = selectedAgent === "all" || item.agent === selectedAgent
    const matchesType = selectedType === "all" || item.reportType === selectedType

    return matchesSearch && matchesTab && matchesAgent && matchesType
  })

  const stats = {
    alles: reports.length,
    'needs-review': reports.filter(r => r.needsApproval).length,
    blocked: reports.filter(r => r.status === 'blocked' || r.outcome === 'blocked').length,
    deploys: reports.filter(r => r.reportType === 'deploy-report' || r.reportType === 'build-report').length,
  }

  const getTypeInfo = (type: string) => REPORT_TYPES.find(t => t.value === type) || { label: type, color: 'bg-gray-100 text-gray-800' }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-background to-background dark:from-orange-950/25 dark:via-background dark:to-background">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Loading reports...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-background to-background dark:from-orange-950/25 dark:via-background dark:to-background">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">Agent Reports</h1>
          <p className="text-muted-foreground">
            {stats.alles} reports · {stats['needs-review']} needs review · {stats.blocked} blocked · {stats.deploys} deploys
          </p>
        </header>

        <div className="mt-6 space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <Input
              placeholder="Zoek reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="md:max-w-sm"
            />
            <div className="flex gap-2">
              <select
                value={selectedAgent}
                onChange={(e) => setSelectedAgent(e.target.value)}
                className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
              >
                <option value="all">Alle agents</option>
                <option value="forge">Forge</option>
                <option value="atlas">Atlas</option>
                <option value="radar">Radar</option>
                <option value="ink">Ink</option>
                <option value="ledger">Ledger</option>
                <option value="spark">Spark</option>
              </select>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
              >
                <option value="all">Alle types</option>
                {REPORT_TYPES.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="alles">Alles ({stats.alles})</TabsTrigger>
              <TabsTrigger value="needs-review">Needs Review ({stats['needs-review']})</TabsTrigger>
              <TabsTrigger value="blocked">Blocked ({stats.blocked})</TabsTrigger>
              <TabsTrigger value="deploys">Deploys ({stats.deploys})</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedTab} className="mt-4">
              <div className="flex flex-col gap-3">
                {filteredReports.map((item) => {
                  const typeInfo = getTypeInfo(item.reportType)
                  return (
                    <Card key={item.id}>
                      <div className="flex items-center gap-3 px-4 py-3 flex-wrap md:flex-nowrap">
                        <div className="flex-1 min-w-0 flex items-center gap-2 flex-wrap">
                          <CardTitle className="text-base truncate">{item.title}</CardTitle>
                          <Badge className={typeInfo.color}>{typeInfo.label}</Badge>
                          <Badge className={AGENT_COLORS[item.agent] || 'bg-gray-100 text-gray-800'}>{item.agent}</Badge>
                          <Badge className={STATUS_COLORS[item.status] || 'bg-gray-100 text-gray-800'}>{item.status}</Badge>
                          {item.outcome && (
                            <Badge className={OUTCOME_COLORS[item.outcome] || 'bg-gray-100 text-gray-800'}>{item.outcome}</Badge>
                          )}
                          {item.needsApproval && (
                            <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-200">
                              <AlertCircle className="h-3 w-3 mr-0.5" />approval
                            </Badge>
                          )}
                          {item.environment && (
                            <Badge variant="outline" className="text-[10px]">
                              <Server className="h-2.5 w-2.5 mr-0.5" />{item.environment}
                            </Badge>
                          )}
                          {item.repo && (
                            <span className="hidden md:inline text-xs text-muted-foreground font-mono">{item.repo}</span>
                          )}
                          {item.branch && (
                            <span className="hidden md:inline text-xs text-muted-foreground">
                              <GitBranch className="h-3 w-3 inline mr-0.5" />{item.branch}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <Button variant="ghost" size="sm" className="h-8" onClick={() => setExpandedReport(expandedReport === item.id ? null : item.id)}>
                            {expandedReport === item.id ? <><EyeOff className="h-4 w-4 mr-1" /><span className="text-xs">Verberg</span></> : <><Eye className="h-4 w-4 mr-1" /><span className="text-xs">Toon</span></>}
                          </Button>
                        </div>
                      </div>

                      {/* Summary excerpt */}
                      {item.summary && expandedReport !== item.id && (
                        <div className="px-4 pb-1">
                          <p className="text-xs text-muted-foreground line-clamp-1">{item.summary}</p>
                        </div>
                      )}

                      {/* Expanded view */}
                      {expandedReport === item.id && (
                        <div className="border-t px-4 py-4">
                          {item.summary && (
                            <p className="text-sm text-muted-foreground mb-3">{item.summary}</p>
                          )}
                          {item.metadata && item.agent === 'ledger' && <LedgerReportCard metadata={item.metadata} reportType={item.reportType} currency={item.currency || 'EUR'} />}
                          {item.metadata && item.agent === 'atlas' && <AtlasReportCard metadata={item.metadata} reportType={item.reportType} />}
                          {item.metadata && !['ledger', 'atlas'].includes(item.agent) && <ForgeReportCard metadata={item.metadata} reportType={item.reportType} />}
                          {item.body && (
                            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg overflow-y-auto max-h-[50vh] prose prose-sm dark:prose-invert max-w-none">
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>{item.body}</ReactMarkdown>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Footer */}
                      <div className="px-4 pb-2 text-xs text-muted-foreground flex gap-3">
                        <span>{new Date(item.createdAt).toLocaleDateString('nl-BE')}</span>
                        {item.startedAt && item.completedAt && (
                          <span className="flex items-center gap-0.5">
                            <Clock className="h-3 w-3" />
                            {Math.round((new Date(item.completedAt).getTime() - new Date(item.startedAt).getTime()) / 60000)}min
                          </span>
                        )}
                        {item.periodLabel && (
                          <span className="font-mono text-[10px]">{item.periodLabel}</span>
                        )}
                        {item.priority !== 'medium' && (
                          <Badge variant="outline" className="text-[10px] py-0">{item.priority}</Badge>
                        )}
                      </div>
                    </Card>
                  )
                })}
              </div>

              {filteredReports.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-muted-foreground">Geen reports gevonden</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {searchTerm || selectedAgent !== "all" || selectedType !== "all"
                      ? "Pas je filters aan"
                      : "Nog geen agent reports ontvangen"
                    }
                  </p>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6">
                  <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground">Pagina {page} van {totalPages}</span>
                  <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
