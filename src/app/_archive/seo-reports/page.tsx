"use client"

import { useState, useEffect } from "react"
import { Eye, EyeOff, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RadarReportCard } from "@/components/radar-report-card"

interface SeoReportItem {
  id: string
  subtype: string
  agent: string
  title: string
  summary?: string
  status: string
  needsApproval: boolean
  linkedSiteId?: string
  linkedDomainId?: string
  runId?: string
  seoScore?: number
  topKeyword?: string
  topPosition?: number
  monthlyClicks?: number
  monthlyImpressions?: number
  avgCtr?: number
  quickWinCount?: number
  dataSource?: string
  periodDays?: number
  metadata?: Record<string, unknown>
  createdAt: string
}

const SUBTYPES = [
  { value: 'site_audit', label: 'Site Audit', color: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-200' },
  { value: 'keyword_snapshot', label: 'Keyword Snapshot', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200' },
  { value: 'traffic_analysis', label: 'Traffic Analysis', color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-200' },
  { value: 'domain_evaluation', label: 'Domain Evaluation', color: 'bg-violet-100 text-violet-800 dark:bg-violet-900/20 dark:text-violet-200' },
  { value: 'opportunity_scan', label: 'Opportunity Scan', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-200' },
  { value: 'signal', label: 'Signal', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-200' },
]

function getScoreColor(score: number): string {
  if (score >= 80) return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/10 ring-emerald-200 dark:ring-emerald-800'
  if (score >= 60) return 'text-amber-600 bg-amber-50 dark:bg-amber-900/10 ring-amber-200 dark:ring-amber-800'
  return 'text-red-600 bg-red-50 dark:bg-red-900/10 ring-red-200 dark:ring-red-800'
}

export default function SeoReportsPage() {
  const [reports, setReports] = useState<SeoReportItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubtype, setSelectedSubtype] = useState("all")
  const [selectedSource, setSelectedSource] = useState("all")
  const [expandedReport, setExpandedReport] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    loadReports()
  }, [page])

  const loadReports = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/seo-reports?page=${page}&limit=25&sortBy=createdAt&order=desc`)
      const result = await res.json()
      setReports(result.data || [])
      setTotalPages(result.pagination?.pages || 1)
    } catch (error) {
      console.error('Failed to load SEO reports:', error)
    } finally {
      setLoading(false)
    }
  }

  const filtered = reports.filter(item => {
    const matchesSearch = !searchTerm ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.topKeyword?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubtype = selectedSubtype === "all" || item.subtype === selectedSubtype
    const matchesSource = selectedSource === "all" || item.dataSource === selectedSource
    return matchesSearch && matchesSubtype && matchesSource
  })

  const getSubtypeInfo = (subtype: string) => SUBTYPES.find(s => s.value === subtype) || { label: subtype, color: 'bg-gray-100 text-gray-800' }

  // Aggregate stats
  const avgScore = reports.filter(r => r.seoScore).reduce((sum, r) => sum + (r.seoScore || 0), 0) / Math.max(reports.filter(r => r.seoScore).length, 1)
  const totalQuickWins = reports.reduce((sum, r) => sum + (r.quickWinCount || 0), 0)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-background to-background dark:from-cyan-950/25 dark:via-background dark:to-background">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Loading SEO reports...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-background to-background dark:from-cyan-950/25 dark:via-background dark:to-background">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">SEO Reports</h1>
          <p className="text-muted-foreground">
            {reports.length} reports · Gem. score {avgScore.toFixed(0)} · {totalQuickWins} quick wins
          </p>
        </header>

        <div className="mt-6 space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <Input
              placeholder="Zoek reports, keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="md:max-w-sm"
            />
            <div className="flex gap-2">
              <select
                value={selectedSubtype}
                onChange={(e) => setSelectedSubtype(e.target.value)}
                className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
              >
                <option value="all">Alle types</option>
                {SUBTYPES.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
              >
                <option value="all">Alle bronnen</option>
                <option value="gsc">GSC</option>
                <option value="bing">Bing</option>
                <option value="dataforseo">DataForSEO</option>
                <option value="manual">Manual</option>
                <option value="combined">Combined</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {filtered.map((item) => {
              const subtypeInfo = getSubtypeInfo(item.subtype)
              return (
                <Card key={item.id}>
                  <div className="flex items-center gap-3 px-4 py-3 flex-wrap md:flex-nowrap">
                    {/* SEO Score badge */}
                    {item.seoScore !== null && item.seoScore !== undefined && (
                      <div className={`flex-shrink-0 w-10 h-10 rounded-lg ring-1 flex items-center justify-center font-bold text-sm ${getScoreColor(item.seoScore)}`}>
                        {item.seoScore}
                      </div>
                    )}

                    <div className="flex-1 min-w-0 flex items-center gap-2 flex-wrap">
                      <CardTitle className="text-base truncate">{item.title}</CardTitle>
                      <Badge className={subtypeInfo.color}>{subtypeInfo.label}</Badge>
                      {item.needsApproval && (
                        <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-200">
                          <AlertCircle className="h-3 w-3 mr-0.5" />approval
                        </Badge>
                      )}
                      {item.dataSource && (
                        <Badge variant="outline" className="text-[10px]">{item.dataSource}</Badge>
                      )}
                      {item.periodDays && (
                        <Badge variant="outline" className="text-[10px]">{item.periodDays}d</Badge>
                      )}
                    </div>

                    {/* Key metrics inline */}
                    <div className="hidden md:flex items-center gap-4 text-xs text-muted-foreground shrink-0">
                      {item.topKeyword && (
                        <span className="font-mono truncate max-w-[150px]" title={item.topKeyword}>
                          {item.topKeyword}
                          {item.topPosition && <span className="ml-1 text-blue-600">#{item.topPosition.toFixed(1)}</span>}
                        </span>
                      )}
                      {item.monthlyClicks !== null && item.monthlyClicks !== undefined && (
                        <span>{item.monthlyClicks.toLocaleString()} clicks</span>
                      )}
                      {item.quickWinCount !== null && item.quickWinCount !== undefined && item.quickWinCount > 0 && (
                        <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-200 text-[10px]">
                          {item.quickWinCount} QW
                        </Badge>
                      )}
                    </div>

                    <Button variant="ghost" size="sm" className="h-8 shrink-0" onClick={() => setExpandedReport(expandedReport === item.id ? null : item.id)}>
                      {expandedReport === item.id ? <><EyeOff className="h-4 w-4 mr-1" /><span className="text-xs">Verberg</span></> : <><Eye className="h-4 w-4 mr-1" /><span className="text-xs">Toon</span></>}
                    </Button>
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

                      {/* Mobile metrics */}
                      <div className="md:hidden flex flex-wrap gap-2 mb-3 text-xs">
                        {item.topKeyword && <Badge variant="outline">{item.topKeyword} #{item.topPosition?.toFixed(1)}</Badge>}
                        {item.monthlyClicks !== null && item.monthlyClicks !== undefined && <Badge variant="outline">{item.monthlyClicks} clicks</Badge>}
                        {item.monthlyImpressions !== null && item.monthlyImpressions !== undefined && <Badge variant="outline">{item.monthlyImpressions} impr</Badge>}
                        {item.avgCtr !== null && item.avgCtr !== undefined && <Badge variant="outline">CTR {(item.avgCtr * 100).toFixed(1)}%</Badge>}
                      </div>

                      {item.metadata && <RadarReportCard metadata={item.metadata} subtype={item.subtype} />}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="px-4 pb-2 text-xs text-muted-foreground flex gap-3">
                    <span>{new Date(item.createdAt).toLocaleDateString('nl-BE')}</span>
                    {item.runId && <span className="font-mono text-[10px]">run: {item.runId.slice(0, 8)}</span>}
                  </div>
                </Card>
              )
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-muted-foreground">Geen SEO reports gevonden</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {searchTerm || selectedSubtype !== "all" ? "Pas je filters aan" : "RADAR heeft nog geen SEO reports aangemaakt"}
              </p>
            </div>
          )}

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
        </div>
      </div>
    </div>
  )
}
