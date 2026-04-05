"use client"

import Link from "next/link"
import { useState, useEffect, useCallback } from "react"
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Inbox,
  Activity,
  TrendingUp,
  X,
  Zap,
  Globe,
  Gavel,
  Target,
  AlertTriangle,
  ChevronRight,
  Flame,
  CircleDot,
  Timer,
  DollarSign,
  BarChart3,
  MessageSquare,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DataInitializer } from "@/components/data-initializer"
import { LoadingState } from "@/components/ui/loading-spinner"
import { ErrorState } from "@/components/ui/error-state"
import {
  tasksStorage,
  sitesStorage,
  contentStorage,
  alertsStorage,
  revenueStorage,
  costsStorage,
  type Task,
  type Site,
  type ContentItem,
  type Alert,
  type RevenueEntry,
  type Cost,
  type Decision,
} from "@/lib/storage"

// ─── Helpers ────────────────────────────────────────────────

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60_000)
  if (m < 1) return "nu"
  if (m < 60) return `${m}m`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}u`
  const d = Math.floor(h / 24)
  return `${d}d`
}

function formatEuro(n: number): string {
  if (n >= 1000) return `€${(n / 1000).toFixed(1)}k`
  return `€${Math.round(n)}`
}

const AGENTS: Record<string, { label: string; emoji: string; color: string }> = {
  atlas: { label: "ATLAS", emoji: "🗺️", color: "#3B82F6" },
  forge: { label: "FORGE", emoji: "🔨", color: "#EF4444" },
  radar: { label: "RADAR", emoji: "📡", color: "#10B981" },
  ink:   { label: "INK",   emoji: "✒️", color: "#8B5CF6" },
  ledger:{ label: "LEDGER",emoji: "📊", color: "#F59E0B" },
  spark: { label: "SPARK", emoji: "⚡", color: "#EC4899" },
  cowork:{ label: "COWORK",emoji: "🤝", color: "#6B7280" },
  bart:  { label: "BART",  emoji: "👤", color: "#F5911E" },
  system:{ label: "SYSTEM",emoji: "🤖", color: "#6B7280" },
}

const OUTCOME_MAP: Record<string, { label: string; cls: string }> = {
  approved: { label: "GO", cls: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  rejected: { label: "NO", cls: "bg-red-500/20 text-red-400 border-red-500/30" },
  deferred: { label: "WAIT", cls: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  adjusted: { label: "ADJ", cls: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
}

interface AgentLog {
  id: string; source: string; action: string; payload: string; createdAt: string
}
interface SprintData {
  id: string; week: string; status: string; goals?: string; summary?: string; retrospective?: string
}
interface FeedbackNote {
  id: string; title: string; content: string; noteType?: string; sentiment?: string; actionNeeded: boolean; agentId?: string; createdAt: string
}

// ─── Micro Components ───────────────────────────────────────

function KpiCard({ label, value, sub, icon: Icon, href, accent, delay }: {
  label: string; value: string | number; sub?: string; icon: typeof Globe; href: string; accent?: boolean; delay: number
}) {
  return (
    <Link href={href} className={`cc-animate-in cc-stagger-${delay} group block`}>
      <div className={`relative overflow-hidden rounded-xl border p-4 transition-all duration-300 hover:-translate-y-0.5 ${
        accent
          ? "border-[#F5911E]/30 bg-gradient-to-br from-[#F5911E]/10 via-zinc-900/80 to-zinc-950 hover:border-[#F5911E]/50"
          : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12]"
      }`}>
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.15em] text-zinc-500">{label}</div>
            <div className="mt-1.5 text-2xl font-bold tabular-nums tracking-tight text-white">{value}</div>
            {sub && <div className="mt-0.5 text-[11px] tabular-nums text-zinc-500">{sub}</div>}
          </div>
          <div className={`rounded-lg p-2 ${accent ? "bg-[#F5911E]/15" : "bg-white/[0.04]"}`}>
            <Icon className={`h-4 w-4 ${accent ? "text-[#F5911E]" : "text-zinc-500"}`} />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#F5911E] to-[#F5911E]/0 transition-all duration-500 group-hover:w-full" />
      </div>
    </Link>
  )
}

function AgentDot({ agent, size = "sm" }: { agent: string; size?: "sm" | "md" }) {
  const a = AGENTS[agent]
  const s = size === "md" ? "h-6 w-6 text-xs" : "h-5 w-5 text-[10px]"
  return (
    <div
      className={`${s} rounded-full flex items-center justify-center shrink-0 ring-1 ring-white/10`}
      style={{ backgroundColor: `${a?.color ?? "#6B7280"}20` }}
      title={a?.label ?? agent}
    >
      <span className="leading-none">{a?.emoji ?? "🤖"}</span>
    </div>
  )
}

function StatusDot({ live }: { live: boolean }) {
  return (
    <span className="relative flex h-2 w-2">
      {live && <span className="cc-live-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />}
      <span className={`relative inline-flex h-2 w-2 rounded-full ${live ? "bg-emerald-400" : "bg-zinc-600"}`} />
    </span>
  )
}

// ─── Main ───────────────────────────────────────────────────

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [sites, setSites] = useState<Site[]>([])
  const [content, setContent] = useState<ContentItem[]>([])
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [revenue, setRevenue] = useState<RevenueEntry[]>([])
  const [costs, setCosts] = useState<Cost[]>([])
  const [agentLogs, setAgentLogs] = useState<AgentLog[]>([])
  const [decisions, setDecisions] = useState<Decision[]>([])
  const [sprint, setSprint] = useState<SprintData | null>(null)
  const [feedbackNotes, setFeedbackNotes] = useState<FeedbackNote[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // Fault-tolerant: each fetch independently, never blocks others
      const safeFetch = async <T,>(fn: () => Promise<T>, fallback: T): Promise<T> => {
        try { return await fn() } catch { return fallback }
      }

      const [t, si, c, al, rev, co] = await Promise.all([
        safeFetch(() => tasksStorage.getAll(), []),
        safeFetch(() => sitesStorage.getAll(), []),
        safeFetch(() => contentStorage.getAll(), []),
        safeFetch(() => alertsStorage.getAll(), []),
        safeFetch(() => revenueStorage.getAll(), []),
        safeFetch(() => costsStorage.getAll(), []),
      ])
      setTasks(t); setSites(si); setContent(c); setAlerts(al); setRevenue(rev); setCosts(co)

      // Non-blocking fetches
      fetch("/api/agent-logs?limit=8").then(r => r.ok ? r.json() : []).then(d => setAgentLogs(Array.isArray(d) ? d : [])).catch(() => {})
      fetch("/api/decisions").then(r => r.ok ? r.json() : []).then((d: Decision[]) => setDecisions(Array.isArray(d) ? d.slice(0, 5) : [])).catch(() => {})
      fetch("/api/sprints").then(r => r.ok ? r.json() : []).then((s: SprintData[]) => setSprint(Array.isArray(s) ? s[0] ?? null : null)).catch(() => {})
      fetch("/api/notes?noteType=feedback&actionNeeded=true").then(r => r.ok ? r.json() : []).then(d => setFeedbackNotes(Array.isArray(d) ? d : [])).catch(() => {})
    } catch (err) {
      console.error("Dashboard load failed:", err)
      setError("Kon dashboard niet laden.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { void loadData() }, [loadData])
  useEffect(() => {
    const iv = setInterval(() => {
      fetch("/api/agent-logs?limit=8").then(r => r.json()).then(setAgentLogs).catch(() => {})
    }, 30_000)
    return () => clearInterval(iv)
  }, [])

  // ─── Derived data ───
  const openTasks = tasks.filter(t => t.status === "todo" || t.status === "in-progress")
  const liveSites = sites.filter(s => s.status === "live")
  const contentInReview = content.filter(c => c.status === "review")
  const unresolvedAlerts = alerts.filter(a => !a.resolved)
  const currentMRR = revenue.filter(r => r.recurring).reduce((s, r) => s + r.amount, 0)
  const monthlyCosts = costs.filter(c => c.recurring).reduce((s, c) => {
    if (c.billingCycle === "yearly") return s + c.amount / 12
    return s + c.amount
  }, 0)
  const netProfit = currentMRR - monthlyCosts
  const mrrGoal = 10_000
  const mrrPct = Math.min(100, Math.round((currentMRR / mrrGoal) * 100))

  // Approval inbox
  const approvalItems = [
    ...tasks.filter(t => t.status === "review" && t.assignee !== "bart")
      .map(t => ({ kind: "task" as const, id: t.id, title: t.title, agent: t.assignee ?? "system", createdAt: t.updatedAt })),
    ...contentInReview
      .map(c => ({ kind: "content" as const, id: c.id, title: c.title, agent: c.author, createdAt: c.updatedAt })),
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  // Sprint goals
  const sprintGoals: string[] = sprint?.goals ? (() => {
    try { return JSON.parse(sprint.goals!) } catch { return [] }
  })() : []

  // Handlers
  const handleApprove = async (item: typeof approvalItems[0]) => {
    if (item.kind === "task") await tasksStorage.update(item.id, { status: "done" })
    if (item.kind === "content") await contentStorage.update(item.id, { status: "approved" })
    void loadData()
  }
  const handleReject = async (item: typeof approvalItems[0]) => {
    if (item.kind === "task") await tasksStorage.update(item.id, { status: "todo" })
    if (item.kind === "content") await contentStorage.update(item.id, { status: "rejected" })
    void loadData()
  }

  if (loading) return <LoadingState message="Command Center laden..." fullScreen />
  if (error) return <ErrorState message={error} onRetry={loadData} fullScreen />

  return (
    <>
      <DataInitializer />
      <div className="min-h-screen bg-zinc-950 cc-noise">
        <div className="mx-auto max-w-[1400px] px-4 py-5 md:px-6 lg:px-8 space-y-5">

          {/* ═══════════════════════════════════════════════════
              HEADER BAR — Revenue progress + status line
              ═══════════════════════════════════════════════════ */}
          <header className="cc-animate-in relative overflow-hidden rounded-2xl border border-[#F5911E]/20 bg-gradient-to-r from-[#F5911E]/[0.07] via-zinc-900/90 to-zinc-950 p-4 cc-scanline">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F5911E]/15 ring-1 ring-[#F5911E]/25">
                  <Zap className="h-4 w-4 text-[#F5911E]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white tracking-tight">Command Center</div>
                  <div className="text-[11px] text-zinc-500 tabular-nums">
                    {new Date().toLocaleDateString("nl-BE", { weekday: "long", day: "numeric", month: "long" })}
                    {sprint && <span className="ml-2 text-[#F5911E]/70">{sprint.week}</span>}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-[11px] uppercase tracking-[0.15em] text-zinc-500">MRR Target</div>
                  <div className="text-sm font-bold tabular-nums text-white">
                    {formatEuro(currentMRR)} <span className="text-zinc-600">/</span> {formatEuro(mrrGoal)}
                  </div>
                </div>
                <div className="w-32 sm:w-48">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#F5911E] to-[#F5911E]/70 transition-all duration-1000"
                      style={{ width: `${mrrPct}%` }}
                    />
                  </div>
                  <div className="mt-0.5 text-right text-[10px] tabular-nums text-zinc-600">{mrrPct}%</div>
                </div>
              </div>
            </div>
          </header>

          {/* ═══════════════════════════════════════════════════
              KPI STRIP — 6 cards
              ═══════════════════════════════════════════════════ */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            <KpiCard label="MRR" value={formatEuro(currentMRR)} sub={`${netProfit >= 0 ? "+" : ""}${formatEuro(netProfit)} netto`} icon={DollarSign} href="/finance" accent delay={1} />
            <KpiCard label="Live Sites" value={liveSites.length} sub={`${sites.length} totaal`} icon={Globe} href="/sites" delay={2} />
            <KpiCard label="Open Taken" value={openTasks.length} sub={`${tasks.filter(t => t.status === "in-progress").length} bezig`} icon={Target} href="/tasks" delay={3} />
            <KpiCard label="Review" value={contentInReview.length + approvalItems.length} sub="wacht op actie" icon={Inbox} href="/inbox" delay={4} />
            <KpiCard label="Decisions" value={decisions.length} icon={Gavel} href="/decisions" delay={5} />
            <KpiCard label="Alerts" value={unresolvedAlerts.length} sub={unresolvedAlerts.length > 0 ? "onopgelost" : "all clear"} icon={AlertTriangle} href="/alerts" delay={6} />
          </div>

          {/* ═══════════════════════════════════════════════════
              MAIN GRID — 3 columns on desktop
              ═══════════════════════════════════════════════════ */}
          <div className="grid gap-5 lg:grid-cols-[1fr_1fr_340px]">

            {/* ── COL 1: Approval Inbox ── */}
            <section className="cc-animate-in cc-stagger-3 rounded-xl border border-white/[0.06] bg-white/[0.015] p-0 overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
                <div className="flex items-center gap-2">
                  <Inbox className="h-4 w-4 text-[#F5911E]" />
                  <span className="text-sm font-semibold text-white">Inbox</span>
                  {approvalItems.length > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#F5911E]/15 px-1.5 text-[10px] font-bold text-[#F5911E]">
                      {approvalItems.length}
                    </span>
                  )}
                </div>
                <Link href="/inbox" className="text-[11px] text-zinc-500 hover:text-[#F5911E] transition-colors flex items-center gap-1">
                  Alles <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              <div className="divide-y divide-white/[0.04]">
                {approvalItems.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-zinc-600">
                    <CheckCircle2 className="mx-auto mb-2 h-8 w-8 text-zinc-800" />
                    Inbox leeg
                  </div>
                ) : (
                  approvalItems.slice(0, 5).map(item => (
                    <div key={item.id} className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.02] transition-colors">
                      <AgentDot agent={item.agent} />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-white truncate">{item.title}</div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                            item.kind === "task" ? "bg-blue-500/15 text-blue-400" : "bg-purple-500/15 text-purple-400"
                          }`}>{item.kind}</span>
                          <span className="text-[10px] text-zinc-600 tabular-nums">{relativeTime(item.createdAt)}</span>
                        </div>
                      </div>
                      <div className="flex gap-1.5 shrink-0">
                        <button onClick={() => handleApprove(item)} className="rounded-lg bg-emerald-500/15 px-2.5 py-1.5 text-[10px] font-bold text-emerald-400 hover:bg-emerald-500/25 transition-colors">
                          GO
                        </button>
                        <button onClick={() => handleReject(item)} className="rounded-lg bg-white/[0.04] px-2.5 py-1.5 text-[10px] font-bold text-zinc-500 hover:bg-red-500/15 hover:text-red-400 transition-colors">
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* ── COL 2: Agent Timeline + Decisions ── */}
            <div className="space-y-5">
              {/* Agent Timeline */}
              <section className="cc-animate-in cc-stagger-4 rounded-xl border border-white/[0.06] bg-white/[0.015] overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-[#F5911E]" />
                    <span className="text-sm font-semibold text-white">Agent Pulse</span>
                    <span className="relative flex h-2 w-2">
                      <span className="cc-live-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                  </div>
                </div>
                <div className="px-4 py-2 divide-y divide-white/[0.03]">
                  {agentLogs.length === 0 ? (
                    <div className="py-6 text-center text-sm text-zinc-600">Geen activiteit</div>
                  ) : (
                    agentLogs.slice(0, 6).map(log => {
                      let desc = log.action
                      try { const p = JSON.parse(log.payload); desc = p.title || p.description || log.action } catch {}
                      return (
                        <div key={log.id} className="flex items-start gap-3 py-2.5">
                          <div className="mt-0.5 flex flex-col items-center">
                            <AgentDot agent={log.source} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-semibold text-zinc-300">{AGENTS[log.source]?.label ?? log.source}</span>
                              <span className="rounded bg-white/[0.05] px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-zinc-600">{log.action}</span>
                            </div>
                            <div className="text-[12px] text-zinc-500 truncate mt-0.5">{desc}</div>
                          </div>
                          <span className="shrink-0 text-[10px] tabular-nums text-zinc-700 mt-0.5">{relativeTime(log.createdAt)}</span>
                        </div>
                      )
                    })
                  )}
                </div>
              </section>

              {/* Recent Decisions */}
              {decisions.length > 0 && (
                <section className="cc-animate-in cc-stagger-5 rounded-xl border border-white/[0.06] bg-white/[0.015] overflow-hidden">
                  <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Gavel className="h-4 w-4 text-[#F5911E]" />
                      <span className="text-sm font-semibold text-white">Decisions</span>
                    </div>
                    <Link href="/decisions" className="text-[11px] text-zinc-500 hover:text-[#F5911E] transition-colors flex items-center gap-1">
                      Alle <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                  <div className="divide-y divide-white/[0.04]">
                    {decisions.slice(0, 4).map(d => {
                      const oc = OUTCOME_MAP[d.outcome] ?? OUTCOME_MAP.approved
                      return (
                        <div key={d.id} className="px-4 py-3 hover:bg-white/[0.02] transition-colors">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0 flex-1">
                              <div className="text-sm text-white truncate">{d.title}</div>
                              <div className="text-[11px] text-zinc-600 mt-0.5 line-clamp-1">{d.rationale}</div>
                            </div>
                            <span className={`shrink-0 rounded border px-1.5 py-0.5 text-[9px] font-bold tracking-wider ${oc.cls}`}>
                              {oc.label}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </section>
              )}
            </div>

            {/* ── COL 3: Sidebar — Sprint + Feedback + Alerts ── */}
            <div className="space-y-5">
              {/* Sprint Progress */}
              {sprint && (
                <section className="cc-animate-in cc-stagger-5 rounded-xl border border-white/[0.06] bg-white/[0.015] p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Timer className="h-4 w-4 text-[#F5911E]" />
                      <span className="text-sm font-semibold text-white">Sprint</span>
                    </div>
                    <span className="rounded-full bg-white/[0.05] px-2 py-0.5 text-[10px] font-mono text-zinc-500">{sprint.week}</span>
                  </div>
                  {sprintGoals.length > 0 && (
                    <div className="space-y-1.5">
                      {sprintGoals.map((goal, i) => (
                        <div key={i} className="flex items-start gap-2 text-[12px]">
                          <CircleDot className="h-3 w-3 mt-0.5 text-zinc-600 shrink-0" />
                          <span className="text-zinc-400">{goal}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {sprint.status === "active" && (
                    <div className="rounded-lg bg-emerald-500/10 px-2.5 py-1.5 text-center text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                      Active
                    </div>
                  )}
                </section>
              )}

              {/* Action Required Feedback */}
              {feedbackNotes.length > 0 && (
                <section className="cc-animate-in cc-stagger-6 rounded-xl border border-amber-500/20 bg-amber-500/[0.03] p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-amber-400" />
                    <span className="text-sm font-semibold text-white">Actie Vereist</span>
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500/20 px-1.5 text-[10px] font-bold text-amber-400">
                      {feedbackNotes.length}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {feedbackNotes.slice(0, 3).map(note => (
                      <div key={note.id} className="rounded-lg bg-white/[0.03] p-2.5">
                        <div className="text-[12px] text-white truncate">{note.title}</div>
                        <div className="text-[11px] text-zinc-500 mt-0.5">
                          {note.agentId && <span>{AGENTS[note.agentId]?.label ?? note.agentId}</span>}
                          {note.sentiment && (
                            <span className={`ml-2 ${
                              note.sentiment === "negative" ? "text-red-400" :
                              note.sentiment === "positive" ? "text-emerald-400" : "text-zinc-500"
                            }`}>
                              {note.sentiment === "negative" ? "▼" : note.sentiment === "positive" ? "▲" : "●"} {note.sentiment}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Quick alerts */}
              {unresolvedAlerts.length > 0 && (
                <section className="cc-animate-in cc-stagger-7 rounded-xl border border-red-500/20 bg-red-500/[0.03] p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                    <span className="text-sm font-semibold text-white">Alerts</span>
                  </div>
                  {unresolvedAlerts.slice(0, 3).map(alert => (
                    <div key={alert.id} className="flex items-center gap-2 text-[12px]">
                      <Flame className={`h-3 w-3 shrink-0 ${alert.priority === "high" ? "text-red-400" : "text-amber-400"}`} />
                      <span className="text-zinc-400 truncate">{alert.title}</span>
                    </div>
                  ))}
                  {unresolvedAlerts.length > 3 && (
                    <Link href="/alerts" className="block text-[11px] text-red-400/60 hover:text-red-400 transition-colors">
                      +{unresolvedAlerts.length - 3} meer
                    </Link>
                  )}
                </section>
              )}
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════
              BOTTOM: Priority Assets
              ═══════════════════════════════════════════════════ */}
          <section className="cc-animate-in cc-stagger-6 rounded-xl border border-white/[0.06] bg-white/[0.015] overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-[#F5911E]" />
                <span className="text-sm font-semibold text-white">Priority Assets</span>
              </div>
              <Link href="/sites" className="text-[11px] text-zinc-500 hover:text-[#F5911E] transition-colors flex items-center gap-1">
                Alle sites <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[10px] font-medium uppercase tracking-[0.15em] text-zinc-600">
                    <th className="px-4 py-2.5 text-left">Asset</th>
                    <th className="px-4 py-2.5 text-left">Status</th>
                    <th className="px-4 py-2.5 text-left">Categorie</th>
                    <th className="px-4 py-2.5 text-left hidden md:table-cell">Revenue</th>
                    <th className="px-4 py-2.5 text-left hidden lg:table-cell">Volgende actie</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {sites
                    .filter(s => s.status === "live" || (s.revenue && s.revenue > 0))
                    .sort((a, b) => (b.revenue ?? 0) - (a.revenue ?? 0))
                    .slice(0, 10)
                    .map(site => {
                      const isLive = site.status === "live"
                      const relTask = tasks.find(t =>
                        (t.status === "todo" || t.status === "in-progress") &&
                        (t.siteId === site.id || t.title.toLowerCase().includes(site.domain.toLowerCase()))
                      )
                      return (
                        <tr key={site.id} className="group hover:bg-white/[0.02] transition-colors">
                          <td className="px-4 py-2.5">
                            <Link href={`/sites/${site.id}`} className="font-medium text-white hover:text-[#F5911E] transition-colors flex items-center gap-2">
                              {site.domain}
                              <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                            </Link>
                          </td>
                          <td className="px-4 py-2.5">
                            <div className="flex items-center gap-2">
                              <StatusDot live={isLive} />
                              <span className="text-[11px] text-zinc-500">{site.status}</span>
                            </div>
                          </td>
                          <td className="px-4 py-2.5">
                            <span className="rounded bg-white/[0.05] px-1.5 py-0.5 text-[10px] text-zinc-500 uppercase tracking-wider">
                              {site.category ?? "—"}
                            </span>
                          </td>
                          <td className="px-4 py-2.5 hidden md:table-cell">
                            <span className="text-[12px] tabular-nums text-zinc-400">
                              {site.revenue ? formatEuro(site.revenue) + "/mo" : "—"}
                            </span>
                          </td>
                          <td className="px-4 py-2.5 hidden lg:table-cell">
                            <span className="text-[12px] text-zinc-600 truncate block max-w-[200px]">
                              {relTask?.title ?? "—"}
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════
              FOOTER
              ═══════════════════════════════════════════════════ */}
          <footer className="flex items-center justify-between border-t border-white/[0.05] pt-4 pb-2 text-[11px] text-zinc-700">
            <span>CC &middot; {sites.length} sites &middot; {tasks.length} taken &middot; {decisions.length} decisions</span>
            <span className="tabular-nums">{new Date().toLocaleTimeString("nl-BE", { hour: "2-digit", minute: "2-digit" })}</span>
          </footer>
        </div>
      </div>
    </>
  )
}
