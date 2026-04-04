"use client"

import Link from "next/link"
import { useState, useEffect, useCallback } from "react"
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Inbox,
  Activity,
  TrendingUp,
  X,
  Zap,
  Globe,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataInitializer } from "@/components/data-initializer"
import { LoadingState } from "@/components/ui/loading-spinner"
import { ErrorState } from "@/components/ui/error-state"
import {
  tasksStorage,
  sitesStorage,
  contentStorage,
  alertsStorage,
  revenueStorage,
  type Task,
  type Site,
  type ContentItem,
  type Alert,
  type RevenueEntry,
} from "@/lib/storage"

// --- Helpers ---

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60_000)
  if (m < 1) return "zonet"
  if (m < 60) return `${m}m geleden`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}u geleden`
  const d = Math.floor(h / 24)
  return `${d}d geleden`
}

const AGENTS: Record<string, { label: string; emoji: string }> = {
  atlas: { label: "Atlas", emoji: "🗺️" },
  forge: { label: "Forge", emoji: "🔨" },
  radar: { label: "Radar", emoji: "📡" },
  ink: { label: "Ink", emoji: "✍️" },
  ledger: { label: "Ledger", emoji: "📊" },
  spark: { label: "Spark", emoji: "⚡" },
  cowork: { label: "Cowork", emoji: "🤝" },
}

const PRIORITY_ONE_ASSETS = [
  { name: "Hazier", type: "business" },
  { name: "CollectPro", type: "business" },
  { name: "poxy.be", type: "leadgen" },
  { name: "kinderopvangvlaanderen.be", type: "directory" },
  { name: "kluisverhuur.be", type: "leadgen" },
  { name: "huizenopkoper.be", type: "leadgen" },
  { name: "zwangerschapscalculator.be", type: "tool" },
  { name: "btw-calculator.be", type: "tool" },
  { name: "loonberekening.be", type: "tool" },
]

interface AgentLog {
  id: string
  source: string
  action: string
  payload: string
  createdAt: string
}

type InboxItem =
  | { kind: "task"; id: string; title: string; agent: string; createdAt: string }
  | { kind: "content"; id: string; title: string; agent: string; createdAt: string }

// --- Tiny components ---

function TypeBadge({ type }: { type: string }) {
  const cls: Record<string, string> = {
    business: "bg-purple-500/15 text-purple-400 border-purple-500/30",
    leadgen: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    directory: "bg-teal-500/15 text-teal-400 border-teal-500/30",
    tool: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    task: "bg-zinc-700 text-zinc-300 border-zinc-600",
    content: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
  }
  return (
    <span className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wider ${cls[type] ?? cls.task}`}>
      {type}
    </span>
  )
}

function AgentBadge({ agent }: { agent: string }) {
  const a = AGENTS[agent]
  if (!a) return <span className="text-[10px] text-zinc-500">{agent}</span>
  return (
    <span className="inline-flex items-center gap-1 text-[11px] text-zinc-400">
      <span>{a.emoji}</span>{a.label}
    </span>
  )
}

// --- Main ---

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [sites, setSites] = useState<Site[]>([])
  const [content, setContent] = useState<ContentItem[]>([])
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [revenue, setRevenue] = useState<RevenueEntry[]>([])
  const [agentLogs, setAgentLogs] = useState<AgentLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const [t, si, c, al, rev] = await Promise.all([
        tasksStorage.getAll(),
        sitesStorage.getAll(),
        contentStorage.getAll(),
        alertsStorage.getAll(),
        revenueStorage.getAll(),
      ])
      setTasks(t)
      setSites(si)
      setContent(c)
      setAlerts(al)
      setRevenue(rev)
      // agent logs non-blocking
      fetch("/api/agent-logs?limit=5").then((r) => r.json()).then(setAgentLogs).catch(() => {})
    } catch (err) {
      console.error("Dashboard load failed:", err)
      setError("Kon dashboard niet laden. Controleer de database.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadData()
  }, [loadData])

  // Poll agent logs every 30s
  useEffect(() => {
    const iv = setInterval(() => {
      fetch("/api/agent-logs?limit=5").then((r) => r.json()).then(setAgentLogs).catch(() => {})
    }, 30_000)
    return () => clearInterval(iv)
  }, [])

  // --- Derived data ---
  const openTasks = tasks.filter((t) => t.status === "todo" || t.status === "in-progress")
  const liveSites = sites.filter((s) => s.status === "live")
  const contentInReview = content.filter((c) => c.status === "review")
  const unresolvedAlerts = alerts.filter((a) => !a.resolved)

  // MRR: sum recurring revenue entries
  const currentMRR = revenue
    .filter((r) => r.recurring)
    .reduce((sum, r) => sum + r.amount, 0)
  const mrrGoal = 10_000
  const mrrPct = Math.min(100, Math.round((currentMRR / mrrGoal) * 100))

  // Approval inbox: tasks needing approval + content in review
  const approvalTasks: InboxItem[] = tasks
    .filter((t) => t.status === "review" && t.assignee !== "bart")
    .map((t) => ({ kind: "task", id: t.id, title: t.title, agent: t.assignee ?? "system", createdAt: t.updatedAt }))
  const approvalContent: InboxItem[] = contentInReview
    .map((c) => ({ kind: "content", id: c.id, title: c.title, agent: c.author, createdAt: c.updatedAt }))
  const inboxItems = [...approvalTasks, ...approvalContent]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  // Priority assets status from live sites
  const liveDomains = new Set(liveSites.map((s) => s.domain))

  // --- Handlers ---
  const handleApprove = async (item: InboxItem) => {
    if (item.kind === "task") await tasksStorage.update(item.id, { status: "done" })
    if (item.kind === "content") await contentStorage.update(item.id, { status: "approved" })
    void loadData()
  }
  const handleReject = async (item: InboxItem) => {
    if (item.kind === "task") await tasksStorage.update(item.id, { status: "todo" })
    if (item.kind === "content") await contentStorage.update(item.id, { status: "rejected" })
    void loadData()
  }

  if (loading) return <LoadingState message="Command Center laden..." fullScreen />
  if (error) return <ErrorState message={error} onRetry={loadData} fullScreen />

  return (
    <>
      <DataInitializer />
      <div className="min-h-screen bg-zinc-950 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 md:px-6 md:py-8">

          {/* ===== 1. REVENUE GAP PROGRESS BAR ===== */}
          <section className="rounded-2xl border border-[#F5911E]/20 bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 p-5 shadow-lg">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-[#F5911E]" />
                <span className="text-sm font-semibold text-white">Revenue Gap</span>
              </div>
              <span className="text-sm tabular-nums text-zinc-300">
                &euro;{currentMRR.toLocaleString("nl-BE")} / &euro;{mrrGoal.toLocaleString("nl-BE")} MRR
              </span>
            </div>
            <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full rounded-full bg-[#F5911E] transition-all duration-700"
                style={{ width: `${mrrPct}%` }}
              />
            </div>
            <div className="mt-1 text-right text-xs tabular-nums text-zinc-500">{mrrPct}%</div>
          </section>

          {/* ===== 2. APPROVAL INBOX ===== */}
          <Card className="border-zinc-800/80 bg-gradient-to-br from-zinc-900/95 via-zinc-900/80 to-zinc-950/95 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-4">
              <CardTitle className="flex items-center gap-2 text-base font-semibold text-white">
                <Inbox className="h-4 w-4 text-[#F5911E]" />
                Approval Inbox
                {inboxItems.length > 0 && (
                  <Badge className="ml-1 bg-[#F5911E]/15 text-[#F5911E] border border-[#F5911E]/30 text-xs">
                    {inboxItems.length}
                  </Badge>
                )}
              </CardTitle>
              {inboxItems.length > 3 && (
                <Link href="/inbox" className="text-xs text-[#F5911E] hover:underline inline-flex items-center gap-1">
                  Bekijk alle <ArrowRight className="h-3 w-3" />
                </Link>
              )}
            </CardHeader>
            <CardContent className="pt-4">
              {inboxItems.length === 0 ? (
                <p className="py-4 text-center text-sm text-zinc-500">Geen items die op goedkeuring wachten.</p>
              ) : (
                <div className="grid gap-3 md:grid-cols-3">
                  {inboxItems.slice(0, 3).map((item) => (
                    <div key={item.id} className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-3 space-y-2">
                      <div className="text-sm font-medium text-white leading-5 line-clamp-2">{item.title}</div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <AgentBadge agent={item.agent} />
                        <TypeBadge type={item.kind} />
                      </div>
                      <div className="flex gap-2 pt-1">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-500 text-white border-0 h-7 text-xs"
                          onClick={() => handleApprove(item)}
                        >
                          <CheckCircle2 className="mr-1 h-3 w-3" /> Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 h-7 text-xs"
                          onClick={() => handleReject(item)}
                        >
                          <X className="mr-1 h-3 w-3" /> Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* ===== 3. QUICK STATS ROW ===== */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { label: "Live Sites", count: liveSites.length, href: "/sites", icon: Globe },
              { label: "Open Taken", count: openTasks.length, href: "/tasks", icon: Clock3 },
              { label: "Content in Review", count: contentInReview.length, href: "/content?status=review", icon: Inbox },
              { label: "Ongelezen Alerts", count: unresolvedAlerts.length, href: "/alerts", icon: Activity },
            ].map((s) => (
              <Link key={s.label} href={s.href} className="block">
                <Card className="group border-zinc-800/80 bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-950 hover:border-zinc-700 transition-all hover:-translate-y-0.5 cursor-pointer">
                  <CardContent className="p-5">
                    <div className="text-3xl font-bold tabular-nums text-white">{s.count}</div>
                    <div className="mt-1 text-sm text-zinc-400">{s.label}</div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* ===== 5 + 6: AGENT PULSE + PRIORITY ASSETS (side by side) ===== */}
          <div className="grid gap-6 lg:grid-cols-2">

            {/* 5. AGENT PULSE */}
            <Card className="border-zinc-800/80 bg-gradient-to-br from-zinc-900/95 via-zinc-900/80 to-zinc-950/95 shadow-lg">
              <CardHeader className="border-b border-white/5 pb-4">
                <CardTitle className="flex items-center gap-2 text-base font-semibold text-white">
                  <Activity className="h-4 w-4 text-[#F5911E]" />
                  Laatste agent activiteit
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                {agentLogs.length === 0 ? (
                  <p className="py-4 text-center text-sm text-zinc-500">Geen recente agent activiteit.</p>
                ) : (
                  <div className="space-y-3">
                    {agentLogs.map((log) => {
                      const a = AGENTS[log.source]
                      let desc = log.action
                      try {
                        const p = JSON.parse(log.payload)
                        if (p.title) desc = p.title
                        else if (p.description) desc = p.description
                      } catch { /* use action */ }
                      return (
                        <div key={log.id} className="flex items-start gap-3 rounded-lg border border-zinc-800/60 bg-zinc-950/50 px-3 py-2.5">
                          <span className="mt-0.5 text-lg leading-none">{a?.emoji ?? "🤖"}</span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-zinc-300">{a?.label ?? log.source}</span>
                              <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-500">{log.action}</span>
                            </div>
                            <div className="mt-0.5 text-xs text-zinc-400 truncate">{desc}</div>
                          </div>
                          <span className="shrink-0 text-[11px] tabular-nums text-zinc-600">{relativeTime(log.createdAt)}</span>
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 6. PRIORITY ASSETS */}
            <Card className="border-zinc-800/80 bg-gradient-to-br from-zinc-900/95 via-zinc-900/80 to-zinc-950/95 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-4">
                <CardTitle className="flex items-center gap-2 text-base font-semibold text-white">
                  <Zap className="h-4 w-4 text-[#F5911E]" />
                  Priority One Assets
                </CardTitle>
                <Link href="/sites" className="text-xs text-[#F5911E] hover:underline inline-flex items-center gap-1">
                  Alle sites <ArrowRight className="h-3 w-3" />
                </Link>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-zinc-800 text-xs text-zinc-500">
                        <th className="pb-2 text-left font-medium">Asset</th>
                        <th className="pb-2 text-left font-medium">Type</th>
                        <th className="pb-2 text-left font-medium">Status</th>
                        <th className="pb-2 text-left font-medium">Next Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60">
                      {PRIORITY_ONE_ASSETS.map((asset) => {
                        const isLive = liveDomains.has(asset.name)
                        const relatedTasks = tasks.filter(
                          (t) =>
                            (t.status === "todo" || t.status === "in-progress") &&
                            (t.title.toLowerCase().includes(asset.name.toLowerCase()) ||
                              t.description?.toLowerCase().includes(asset.name.toLowerCase()))
                        )
                        const next = relatedTasks[0]
                        return (
                          <tr key={asset.name} className="group">
                            <td className="py-2 pr-3 font-medium text-white">{asset.name}</td>
                            <td className="py-2 pr-3"><TypeBadge type={asset.type} /></td>
                            <td className="py-2 pr-3">
                              <span className={`inline-flex items-center gap-1 text-xs ${isLive ? "text-emerald-400" : "text-zinc-500"}`}>
                                <span className={`h-1.5 w-1.5 rounded-full ${isLive ? "bg-emerald-400" : "bg-zinc-600"}`} />
                                {isLive ? "live" : "pending"}
                              </span>
                            </td>
                            <td className="py-2 text-xs text-zinc-400 max-w-[200px] truncate">
                              {next ? next.title : <span className="text-zinc-600">-</span>}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ===== FOOTER ===== */}
          <footer className="border-t border-zinc-800 pt-4 text-xs text-zinc-600">
            Command Center &middot; {tasks.length} taken &middot; {sites.length} sites &middot; {liveSites.length} live
          </footer>
        </div>
      </div>
    </>
  )
}
