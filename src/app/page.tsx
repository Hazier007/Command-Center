"use client"

import { useEffect, useState, useCallback, useMemo } from "react"
import Link from "next/link"
import { useBusinessContext } from "@/components/nerve"
import { cn } from "@/lib/utils"
import {
  TrendingUp,
  TrendingDown,
  Users,
  Inbox,
  CheckCircle2,
  X,
  ArrowRight,
  Sparkles,
  ClipboardList,
  Zap,
  Eye,
  AlertTriangle,
  Clock,
} from "lucide-react"

// ─── Types ─────────────────────────────────────────────────────
interface Task {
  id: string
  title: string
  status: string
  assignee?: string
  priority?: string
  needsApproval?: boolean
  approvalSource?: string
  createdAt: string
  dueDate?: string | null
  description?: string
  category?: string
  siteDomain?: string
  source?: string
}
interface ContentItem {
  id: string
  title: string
  status: string
  author?: string
  targetSite?: string
  wordCount?: number
  createdAt: string
  body?: string
}
interface Research {
  id: string
  title: string
  status: string
  createdAt: string
}
interface Site {
  id: string
  domain: string
  status: string
  category?: string
  monthlyRevenue?: number
  seoStatus?: string
  monthlyTraffic?: number
  topKeyword?: string
  topPosition?: number
}
interface Lead {
  id: string
  name: string
  company?: string
  status: string
  service?: string
  estimatedValue?: number
  createdAt: string
  nextFollowUp?: string | null
}

// ─── Agent list for dump box ───────────────────────────────────
const AGENT_OPTIONS = [
  { value: "bart", label: "Bart (zelf)" },
  { value: "atlas", label: "ATLAS" },
  { value: "forge", label: "FORGE" },
  { value: "radar", label: "RADAR" },
  { value: "ink", label: "INK" },
  { value: "ledger", label: "LEDGER" },
  { value: "spark", label: "SPARK" },
]

// ─── Dump Box ──────────────────────────────────────────────────
function DumpBox({ onCreated }: { onCreated: () => void }) {
  const [text, setText] = useState("")
  const [mode, setMode] = useState<"task" | "idea">("task")
  const [assignee, setAssignee] = useState("bart")
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)

  const submit = useCallback(async () => {
    const trimmed = text.trim()
    if (!trimmed || submitting) return
    setSubmitting(true)
    setFeedback(null)
    try {
      if (mode === "task") {
        const res = await fetch("/api/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: trimmed,
            status: "todo",
            priority: "medium",
            assignee,
            source: "bart",
            category: "general",
          }),
        })
        if (!res.ok) throw new Error("task create failed")
        setFeedback(`✓ Taak aangemaakt voor ${assignee.toUpperCase()}`)
      } else {
        const res = await fetch("/api/ideas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: trimmed,
            description: trimmed,
            category: "new_project",
            priority: "medium",
            status: "raw",
          }),
        })
        if (!res.ok) throw new Error("idea create failed")
        setFeedback("✓ Idee opgeslagen")
      }
      setText("")
      onCreated()
      // auto-clear feedback
      setTimeout(() => setFeedback(null), 2500)
    } catch {
      setFeedback("✗ Fout bij opslaan")
      setTimeout(() => setFeedback(null), 2500)
    }
    setSubmitting(false)
  }, [text, mode, assignee, submitting, onCreated])

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#F5911E]/[0.06] to-transparent p-4">
      <div className="flex items-center gap-2 mb-2.5">
        <Sparkles className="h-4 w-4 text-[#F5911E]" />
        <h3 className="text-[13px] font-bold text-white uppercase tracking-wider">
          Dump box
        </h3>
        <span className="text-[11px] text-zinc-500">
          Snel idee of taak toevoegen — enter om op te slaan
        </span>
        {feedback && (
          <span
            className={cn(
              "ml-auto text-[11px] font-semibold",
              feedback.startsWith("✓") ? "text-green-400" : "text-red-400"
            )}
          >
            {feedback}
          </span>
        )}
      </div>
      <div className="flex gap-2">
        <div className="flex rounded-lg border border-white/[0.08] bg-white/[0.03] p-0.5">
          <button
            type="button"
            onClick={() => setMode("task")}
            className={cn(
              "rounded px-2.5 py-1 text-[11px] font-semibold transition-colors",
              mode === "task"
                ? "bg-[#F5911E] text-black"
                : "text-zinc-400 hover:text-white"
            )}
          >
            Taak
          </button>
          <button
            type="button"
            onClick={() => setMode("idea")}
            className={cn(
              "rounded px-2.5 py-1 text-[11px] font-semibold transition-colors",
              mode === "idea"
                ? "bg-[#F5911E] text-black"
                : "text-zinc-400 hover:text-white"
            )}
          >
            Idee
          </button>
        </div>

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit()
          }}
          placeholder={
            mode === "task"
              ? "Wat moet er gebeuren? (bv. 'Review GSC dip airfryertijden')"
              : "Idee dat je niet wil vergeten..."
          }
          className="flex-1 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-[13px] text-white placeholder-zinc-600 outline-none focus:border-[#F5911E]/40"
        />

        {mode === "task" && (
          <select
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2 py-2 text-[12px] text-white outline-none focus:border-[#F5911E]/40"
          >
            {AGENT_OPTIONS.map((a) => (
              <option key={a.value} value={a.value} className="bg-zinc-900">
                {a.label}
              </option>
            ))}
          </select>
        )}

        <button
          type="button"
          onClick={submit}
          disabled={submitting || !text.trim()}
          className="rounded-lg bg-[#F5911E] px-4 py-2 text-[12px] font-bold text-black transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-40"
        >
          {submitting ? "..." : "Opslaan"}
        </button>
      </div>
    </div>
  )
}

// ─── KPI Card ──────────────────────────────────────────────────
function KpiCard({
  label,
  value,
  delta,
  icon: Icon,
  href,
  tone = "neutral",
  loading,
}: {
  label: string
  value: string
  delta?: { label: string; positive: boolean } | null
  icon: React.ComponentType<{ className?: string }>
  href?: string
  tone?: "neutral" | "accent" | "warn" | "good"
  loading?: boolean
}) {
  const toneRing =
    tone === "accent"
      ? "hover:border-[#F5911E]/30"
      : tone === "warn"
      ? "hover:border-yellow-500/30"
      : tone === "good"
      ? "hover:border-green-500/30"
      : "hover:border-white/[0.15]"

  const content = (
    <div
      className={cn(
        "rounded-2xl border border-white/[0.06] bg-zinc-800/30 p-4 transition-all",
        toneRing,
        href && "cursor-pointer hover:-translate-y-0.5"
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg",
            tone === "accent" && "bg-[#F5911E]/15 text-[#F5911E]",
            tone === "warn" && "bg-yellow-500/15 text-yellow-400",
            tone === "good" && "bg-green-500/15 text-green-400",
            tone === "neutral" && "bg-white/[0.05] text-zinc-400"
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
        {delta && (
          <span
            className={cn(
              "flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold",
              delta.positive
                ? "bg-green-500/15 text-green-400"
                : "bg-red-500/15 text-red-400"
            )}
          >
            {delta.positive ? (
              <TrendingUp className="h-2.5 w-2.5" />
            ) : (
              <TrendingDown className="h-2.5 w-2.5" />
            )}
            {delta.label}
          </span>
        )}
      </div>
      <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
        {label}
      </p>
      <p className="text-[26px] font-extrabold tracking-tight text-white mt-0.5 tabular-nums">
        {loading ? "…" : value}
      </p>
    </div>
  )

  return href ? <Link href={href}>{content}</Link> : content
}

// ─── Section header ────────────────────────────────────────────
function SectionHeader({
  title,
  count,
  href,
  hrefLabel,
}: {
  title: string
  count?: number
  href?: string
  hrefLabel?: string
}) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="flex items-center gap-2 text-[15px] font-bold text-white">
        {title}
        {count !== undefined && count > 0 && (
          <span className="flex h-[20px] min-w-[20px] items-center justify-center rounded-full bg-[#F5911E]/15 px-1.5 text-[10px] font-bold text-[#F5911E]">
            {count}
          </span>
        )}
      </h2>
      {href && (
        <Link
          href={href}
          className="flex items-center gap-1 text-[11px] text-zinc-500 hover:text-[#F5911E] transition-colors"
        >
          {hrefLabel || "Alles"} <ArrowRight className="h-3 w-3" />
        </Link>
      )}
    </div>
  )
}

// ─── Cockpit ───────────────────────────────────────────────────
export default function CockpitPage() {
  const { activeBusiness } = useBusinessContext()
  const [tasks, setTasks] = useState<Task[]>([])
  const [content, setContent] = useState<ContentItem[]>([])
  const [research, setResearch] = useState<Research[]>([])
  const [sites, setSites] = useState<Site[]>([])
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set())
  const [showAllApprovals, setShowAllApprovals] = useState(false)
  const [refreshToken, setRefreshToken] = useState(0)

  const refresh = useCallback(() => setRefreshToken((t) => t + 1), [])

  useEffect(() => {
    setLoading(true)
    Promise.all([
      fetch("/api/tasks").then((r) => r.json()),
      fetch("/api/content").then((r) => r.json()),
      fetch("/api/research").then((r) => r.json()),
      fetch("/api/sites").then((r) => r.json()),
      fetch("/api/leads").then((r) => r.json()),
    ])
      .then(([t, c, r, s, l]) => {
        setTasks(Array.isArray(t) ? t : [])
        setContent(Array.isArray(c) ? c : [])
        setResearch(Array.isArray(r) ? r : Array.isArray(r?.items) ? r.items : [])
        setSites(Array.isArray(s) ? s : [])
        setLeads(Array.isArray(l) ? l : [])
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [refreshToken])

  // ─── KPI calcs ────────────────────────────────────────────────
  const openTasksForBart = useMemo(
    () =>
      tasks.filter(
        (t) =>
          t.assignee === "bart" &&
          (t.status === "todo" || t.status === "in-progress")
      ),
    [tasks]
  )

  const reviewQueue = useMemo(() => {
    const contentInReview = content
      .filter((c) => c.status === "review")
      .map((c) => ({
        id: c.id,
        type: "content" as const,
        title: c.title,
        meta: `${c.author || "INK"} · ${c.targetSite || "—"} · ${c.wordCount || 0}w`,
        icon: "✒️",
        color: "bg-purple-500/15",
        link: "/werk?tab=content",
      }))
    const tasksNeedingApproval = tasks
      .filter((t) => t.needsApproval || t.status === "review")
      .map((t) => ({
        id: t.id,
        type: "task" as const,
        title: t.title,
        meta: `${t.assignee || "?"} · ${t.approvalSource || "agent"}`,
        icon: "📋",
        color: "bg-blue-500/15",
        link: "/werk",
      }))
    const researchPending = research
      .filter((r) => r.status === "pending" || r.status === "needs_review")
      .slice(0, 20)
      .map((r) => ({
        id: r.id,
        type: "research" as const,
        title: r.title,
        meta: "RADAR · research",
        icon: "🔍",
        color: "bg-cyan-500/15",
        link: "/werk?tab=research",
      }))
    return [...contentInReview, ...tasksNeedingApproval, ...researchPending]
  }, [content, tasks, research])

  const liveSites = useMemo(
    () => sites.filter((s) => s.status === "live"),
    [sites]
  )
  const totalMRR = useMemo(
    () => sites.reduce((sum, s) => sum + (s.monthlyRevenue || 0), 0),
    [sites]
  )
  const newLeadsCount = useMemo(() => {
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
    return leads.filter(
      (l) => new Date(l.createdAt).getTime() > weekAgo && l.status === "nieuw"
    ).length
  }, [leads])

  const openLeads = useMemo(
    () =>
      leads
        .filter((l) =>
          ["nieuw", "contact", "proposal", "onderhandeling"].includes(l.status)
        )
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ),
    [leads]
  )

  // Traffic pulse: top 5 sites met monthlyTraffic, gesorteerd, met seoStatus tinting
  const trafficPulse = useMemo(
    () =>
      sites
        .filter((s) => s.monthlyTraffic && s.monthlyTraffic > 0)
        .sort((a, b) => (b.monthlyTraffic || 0) - (a.monthlyTraffic || 0))
        .slice(0, 5),
    [sites]
  )

  // ─── Approve / reject handlers ────────────────────────────────
  async function handleApprove(item: {
    id: string
    type: "content" | "task" | "research"
  }) {
    setProcessingIds((s) => new Set(s).add(item.id))
    try {
      const endpoint =
        item.type === "content"
          ? `/api/content/${item.id}`
          : item.type === "task"
          ? `/api/tasks/${item.id}`
          : `/api/research/${item.id}`
      const body =
        item.type === "content"
          ? { status: "approved" }
          : item.type === "task"
          ? { status: "done", needsApproval: false }
          : { status: "approved" }
      const res = await fetch(endpoint, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error("PATCH failed")
      if (item.type === "content")
        setContent((prev) => prev.filter((c) => c.id !== item.id))
      else if (item.type === "task")
        setTasks((prev) => prev.filter((t) => t.id !== item.id))
      else setResearch((prev) => prev.filter((r) => r.id !== item.id))
    } catch {
      /* silent */
    }
    setProcessingIds((s) => {
      const n = new Set(s)
      n.delete(item.id)
      return n
    })
  }

  async function handleReject(item: {
    id: string
    type: "content" | "task" | "research"
  }) {
    setProcessingIds((s) => new Set(s).add(item.id))
    try {
      const endpoint =
        item.type === "content"
          ? `/api/content/${item.id}`
          : item.type === "task"
          ? `/api/tasks/${item.id}`
          : `/api/research/${item.id}`
      const body =
        item.type === "content"
          ? { status: "draft" }
          : item.type === "task"
          ? { status: "todo", needsApproval: false }
          : { status: "rejected" }
      const res = await fetch(endpoint, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error("PATCH failed")
      if (item.type === "content")
        setContent((prev) =>
          prev.map((c) => (c.id === item.id ? { ...c, status: "draft" } : c))
        )
      else if (item.type === "task")
        setTasks((prev) =>
          prev.map((t) =>
            t.id === item.id
              ? { ...t, status: "todo", needsApproval: false }
              : t
          )
        )
      else
        setResearch((prev) =>
          prev.map((r) => (r.id === item.id ? { ...r, status: "rejected" } : r))
        )
    } catch {
      /* silent */
    }
    setProcessingIds((s) => {
      const n = new Set(s)
      n.delete(item.id)
      return n
    })
  }

  async function handleCompleteTask(taskId: string) {
    setProcessingIds((s) => new Set(s).add(taskId))
    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "done" }),
      })
      if (!res.ok) throw new Error("PATCH failed")
      setTasks((prev) => prev.filter((t) => t.id !== taskId))
    } catch {
      /* silent */
    }
    setProcessingIds((s) => {
      const n = new Set(s)
      n.delete(taskId)
      return n
    })
  }

  // ─── Greeting ─────────────────────────────────────────────────
  const hour = new Date().getHours()
  const greeting =
    hour < 12 ? "Goedemorgen" : hour < 18 ? "Goedemiddag" : "Goedenavond"

  // ─── UI helpers ───────────────────────────────────────────────
  const approvalCount = reviewQueue.length
  const visibleApprovals = showAllApprovals
    ? reviewQueue
    : reviewQueue.slice(0, 6)

  const maxTraffic = trafficPulse[0]?.monthlyTraffic || 1
  const seoStatusColor = (status?: string) => {
    if (status === "growing") return "bg-green-500"
    if (status === "declining") return "bg-red-500"
    if (status === "stable") return "bg-[#F5911E]"
    return "bg-zinc-600"
  }

  const priorityColor = (p?: string) =>
    p === "high"
      ? "text-red-400"
      : p === "low"
      ? "text-zinc-500"
      : "text-yellow-400"

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* ─── Greeting ──────────────────────────────────────────── */}
      <div>
        <h1 className="text-[26px] font-extrabold tracking-tight text-white">
          {greeting}, Bart{" "}
          <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-[#F5911E]/10 px-2.5 py-0.5 text-[12px] font-semibold text-[#F5911E]">
            {activeBusiness.emoji} {activeBusiness.name}
          </span>
        </h1>
        <p className="text-[13px] text-zinc-500 mt-1">
          {new Date().toLocaleDateString("nl-BE", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
          {approvalCount > 0 &&
            ` — ${approvalCount} items wachten op jouw beslissing`}
        </p>
      </div>

      {/* ─── Dump box ────────────────────────────────────────── */}
      <DumpBox onCreated={refresh} />

      {/* ─── KPI rij ─────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard
          label="MRR (live sites)"
          value={`€${(totalMRR / 1000).toFixed(1)}K`}
          icon={TrendingUp}
          tone="accent"
          loading={loading}
          href="/geld"
        />
        <KpiCard
          label="Voor Bart"
          value={String(openTasksForBart.length)}
          icon={ClipboardList}
          tone={openTasksForBart.length > 5 ? "warn" : "neutral"}
          loading={loading}
          href="/werk"
        />
        <KpiCard
          label="Review queue"
          value={String(approvalCount)}
          icon={Inbox}
          tone={approvalCount > 0 ? "accent" : "neutral"}
          loading={loading}
        />
        <KpiCard
          label="Nieuwe leads (7d)"
          value={String(newLeadsCount)}
          icon={Users}
          tone={newLeadsCount > 0 ? "good" : "neutral"}
          loading={loading}
        />
      </div>

      {/* ─── Main grid ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Vandaag voor Bart */}
        <div className="lg:col-span-2">
          <SectionHeader
            title="⚡ Vandaag voor Bart"
            count={openTasksForBart.length}
            href="/werk"
          />
          {loading ? (
            <div className="space-y-1.5">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-14 rounded-xl border border-white/[0.06] bg-zinc-800/30 animate-pulse"
                />
              ))}
            </div>
          ) : openTasksForBart.length === 0 ? (
            <div className="rounded-xl border border-white/[0.06] bg-zinc-800/20 p-8 text-center">
              <CheckCircle2 className="h-8 w-8 mx-auto text-green-400 mb-2" />
              <p className="text-[13px] font-semibold text-white">
                Geen taken voor jou
              </p>
              <p className="text-[11px] text-zinc-500 mt-1">
                Goed werk — of dump iets in de box hierboven.
              </p>
            </div>
          ) : (
            <div className="space-y-1.5">
              {openTasksForBart.slice(0, 6).map((t) => {
                const dueMs = t.dueDate
                  ? new Date(t.dueDate).getTime()
                  : null
                const overdue = dueMs !== null && dueMs < Date.now()
                return (
                  <div
                    key={t.id}
                    className={cn(
                      "group flex items-center gap-3 rounded-xl border bg-zinc-800/30 p-3 transition-all",
                      overdue
                        ? "border-red-500/30"
                        : "border-white/[0.06] hover:border-[#F5911E]/20"
                    )}
                  >
                    <button
                      onClick={() => handleCompleteTask(t.id)}
                      disabled={processingIds.has(t.id)}
                      title="Markeer als gedaan"
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-zinc-600 text-zinc-600 transition-all hover:border-green-400 hover:text-green-400 disabled:opacity-40"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-white truncate">
                        {t.title}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        {t.category && (
                          <span className="text-[10px] text-zinc-500 uppercase">
                            {t.category}
                          </span>
                        )}
                        {t.priority && (
                          <span
                            className={cn(
                              "text-[10px] font-bold uppercase",
                              priorityColor(t.priority)
                            )}
                          >
                            {t.priority}
                          </span>
                        )}
                        {t.dueDate && (
                          <span
                            className={cn(
                              "flex items-center gap-0.5 text-[10px]",
                              overdue ? "text-red-400" : "text-zinc-500"
                            )}
                          >
                            <Clock className="h-2.5 w-2.5" />
                            {new Date(t.dueDate).toLocaleDateString("nl-BE", {
                              day: "numeric",
                              month: "short",
                            })}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
              {openTasksForBart.length > 6 && (
                <Link
                  href="/werk"
                  className="block rounded-xl border border-dashed border-white/[0.08] py-2 text-center text-[11px] text-zinc-500 hover:border-[#F5911E]/30 hover:text-[#F5911E] transition-colors"
                >
                  +{openTasksForBart.length - 6} meer taken →
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Review queue */}
        <div>
          <SectionHeader
            title="📥 Review queue"
            count={approvalCount}
            href={approvalCount > 6 ? "/werk" : undefined}
            hrefLabel="Alle"
          />
          {loading ? (
            <div className="space-y-1.5">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-14 rounded-xl border border-white/[0.06] bg-zinc-800/30 animate-pulse"
                />
              ))}
            </div>
          ) : approvalCount === 0 ? (
            <div className="rounded-xl border border-white/[0.06] bg-zinc-800/20 p-6 text-center">
              <CheckCircle2 className="h-7 w-7 mx-auto text-green-400 mb-2" />
              <p className="text-[12px] font-semibold text-white">
                Niks te reviewen
              </p>
              <p className="text-[10px] text-zinc-500 mt-1">Inbox zero 🎉</p>
            </div>
          ) : (
            <>
              <div className="space-y-1.5">
                {visibleApprovals.map((item) => (
                  <div
                    key={`${item.type}-${item.id}`}
                    className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-zinc-800/30 p-2.5 transition-all hover:border-[#F5911E]/20"
                  >
                    <span
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[13px]",
                        item.color
                      )}
                    >
                      {item.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-semibold text-white truncate">
                        {item.title}
                      </p>
                      <p className="text-[10px] text-zinc-500 truncate">
                        {item.meta}
                      </p>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <button
                        disabled={processingIds.has(item.id)}
                        onClick={() => handleApprove(item)}
                        title="Goedkeuren"
                        className="rounded bg-green-500/15 p-1 text-green-400 transition-colors hover:bg-green-500 hover:text-white disabled:opacity-40"
                      >
                        <CheckCircle2 className="h-3 w-3" />
                      </button>
                      <button
                        disabled={processingIds.has(item.id)}
                        onClick={() => handleReject(item)}
                        title="Afwijzen"
                        className="rounded bg-red-500/15 p-1 text-red-400 transition-colors hover:bg-red-500 hover:text-white disabled:opacity-40"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {approvalCount > 6 && (
                <button
                  onClick={() => setShowAllApprovals(!showAllApprovals)}
                  className="mt-2 w-full rounded-xl border border-dashed border-white/[0.08] py-2 text-center text-[11px] text-zinc-500 hover:border-[#F5911E]/30 hover:text-[#F5911E] transition-colors"
                >
                  {showAllApprovals
                    ? "Minder tonen"
                    : `+${approvalCount - 6} meer tonen`}
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* ─── Traffic Pulse + Leads ──────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Traffic Pulse */}
        <div>
          <SectionHeader
            title="📈 Traffic pulse — top 5"
            href="/portfolio"
            hrefLabel="Portfolio"
          />
          {loading ? (
            <div className="h-44 rounded-xl border border-white/[0.06] bg-zinc-800/30 animate-pulse" />
          ) : trafficPulse.length === 0 ? (
            <div className="rounded-xl border border-white/[0.06] bg-zinc-800/20 p-6 text-center">
              <Eye className="h-7 w-7 mx-auto text-zinc-600 mb-2" />
              <p className="text-[12px] font-semibold text-white">
                Nog geen traffic data
              </p>
              <p className="text-[10px] text-zinc-500 mt-1">
                Wacht op RADAR/Windsor sync. Sites krijgen `monthlyTraffic`
                wanneer de analytics-koppeling gevuld wordt.
              </p>
            </div>
          ) : (
            <div className="space-y-2 rounded-xl border border-white/[0.06] bg-zinc-800/30 p-4">
              {trafficPulse.map((s) => {
                const pct = ((s.monthlyTraffic || 0) / maxTraffic) * 100
                return (
                  <div key={s.id}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            seoStatusColor(s.seoStatus)
                          )}
                        />
                        <span className="text-[12px] font-semibold text-white truncate">
                          {s.domain}
                        </span>
                        {s.topKeyword && (
                          <span className="text-[10px] text-zinc-500 truncate">
                            · {s.topKeyword}
                            {s.topPosition ? ` #${s.topPosition.toFixed(0)}` : ""}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-bold text-white tabular-nums shrink-0 ml-2">
                        {(s.monthlyTraffic || 0).toLocaleString("nl-BE")}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-white/[0.04] overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all",
                          s.seoStatus === "declining"
                            ? "bg-gradient-to-r from-red-500/60 to-red-500"
                            : s.seoStatus === "growing"
                            ? "bg-gradient-to-r from-green-500/60 to-green-500"
                            : "bg-gradient-to-r from-[#F5911E]/60 to-[#F5911E]"
                        )}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                )
              })}
              <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] mt-2 text-[10px] text-zinc-500">
                <span className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    Groeit
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#F5911E]" />
                    Stabiel
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                    Daalt
                  </span>
                </span>
                <span>{liveSites.length} live sites totaal</span>
              </div>
            </div>
          )}
        </div>

        {/* Leads */}
        <div>
          <SectionHeader
            title="🎯 Leads in pipeline"
            count={openLeads.length}
          />
          {loading ? (
            <div className="h-44 rounded-xl border border-white/[0.06] bg-zinc-800/30 animate-pulse" />
          ) : openLeads.length === 0 ? (
            <div className="rounded-xl border border-white/[0.06] bg-zinc-800/20 p-6 text-center">
              <Users className="h-7 w-7 mx-auto text-zinc-600 mb-2" />
              <p className="text-[12px] font-semibold text-white">
                Geen open leads
              </p>
              <p className="text-[10px] text-zinc-500 mt-1">
                Nieuwe leads verschijnen hier automatisch.
              </p>
            </div>
          ) : (
            <div className="space-y-1.5">
              {openLeads.slice(0, 5).map((l) => {
                const statusColor =
                  l.status === "nieuw"
                    ? "bg-blue-500/15 text-blue-400"
                    : l.status === "contact"
                    ? "bg-cyan-500/15 text-cyan-400"
                    : l.status === "proposal"
                    ? "bg-[#F5911E]/15 text-[#F5911E]"
                    : l.status === "onderhandeling"
                    ? "bg-purple-500/15 text-purple-400"
                    : "bg-zinc-700 text-zinc-400"
                const followupOverdue =
                  l.nextFollowUp &&
                  new Date(l.nextFollowUp).getTime() < Date.now()
                return (
                  <div
                    key={l.id}
                    className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-zinc-800/30 p-3 transition-all hover:border-[#F5911E]/20"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] text-[11px] font-bold text-zinc-300">
                      {l.name
                        .split(" ")
                        .map((s) => s[0])
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-semibold text-white truncate">
                        {l.name}
                        {l.company && (
                          <span className="text-zinc-500 font-normal">
                            {" "}
                            · {l.company}
                          </span>
                        )}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span
                          className={cn(
                            "rounded px-1.5 py-0.5 text-[9px] font-bold uppercase",
                            statusColor
                          )}
                        >
                          {l.status}
                        </span>
                        {l.service && (
                          <span className="text-[10px] text-zinc-500">
                            {l.service}
                          </span>
                        )}
                        {followupOverdue && (
                          <span className="flex items-center gap-0.5 text-[10px] text-red-400">
                            <AlertTriangle className="h-2.5 w-2.5" />
                            follow-up
                          </span>
                        )}
                      </div>
                    </div>
                    {l.estimatedValue != null && (
                      <span className="text-[12px] font-bold text-[#F5911E] tabular-nums shrink-0">
                        €{l.estimatedValue.toLocaleString("nl-BE")}
                      </span>
                    )}
                  </div>
                )
              })}
              {openLeads.length > 5 && (
                <div className="rounded-xl border border-dashed border-white/[0.08] py-2 text-center text-[11px] text-zinc-500">
                  +{openLeads.length - 5} meer leads in pipeline
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ─── Footer stats band ──────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-zinc-800/20 px-4 py-3 text-[11px] text-zinc-500">
        <span className="flex items-center gap-1.5">
          <Zap className="h-3 w-3 text-[#F5911E]" />
          Cockpit v2 — sturings-platform
        </span>
        <span>
          {tasks.length} tasks · {content.length} content · {research.length}{" "}
          research · {sites.length} sites · {leads.length} leads
        </span>
      </div>
    </div>
  )
}
