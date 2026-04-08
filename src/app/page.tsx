"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useBusinessContext } from "@/components/nerve"
import { cn } from "@/lib/utils"
import {
  TrendingUp,
  Globe,
  ClipboardList,
  FileText,
  CheckCircle2,
  X,
  ArrowRight,
} from "lucide-react"

// ─── Types ─────────────────────────────────────────────────────
interface Task {
  id: string; title: string; status: string; assignee?: string; priority?: string
  needsApproval?: boolean; approvalSource?: string; createdAt: string
  description?: string; category?: string; siteDomain?: string
}
interface ContentItem {
  id: string; title: string; status: string; author?: string; targetSite?: string
  wordCount?: number; createdAt: string; body?: string
}
interface Site {
  id: string; domain: string; status: string; category?: string
  monthlyRevenue?: number; seoStatus?: string; monthlyTraffic?: number
}
interface Project {
  id: string; name: string; status: string; category: string; revenue?: number
  ownerType?: string; clientName?: string
}

// ─── Agent badge helper ────────────────────────────────────────
function AgentBadge({ name }: { name: string }) {
  const colors: Record<string, string> = {
    radar: "bg-blue-500/15 text-blue-400",
    forge: "bg-green-500/15 text-green-400",
    ink: "bg-purple-500/15 text-purple-400",
    spark: "bg-[#F5911E]/15 text-[#F5911E]",
    ledger: "bg-yellow-500/15 text-yellow-400",
    atlas: "bg-blue-500/15 text-blue-300",
    bart: "bg-[#F5911E]/15 text-[#F5911E]",
    cowork: "bg-cyan-500/15 text-cyan-400",
  }
  return (
    <span className={cn("rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase", colors[name?.toLowerCase()] || "bg-zinc-700 text-zinc-400")}>
      {name}
    </span>
  )
}

// ─── Cockpit ───────────────────────────────────────────────────
export default function CockpitPage() {
  const { activeBusiness } = useBusinessContext()
  const [tasks, setTasks] = useState<Task[]>([])
  const [content, setContent] = useState<ContentItem[]>([])
  const [sites, setSites] = useState<Site[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set())
  const [selectedItem, setSelectedItem] = useState<{ id: string; type: "content" | "task" } | null>(null)

  useEffect(() => {
    Promise.all([
      fetch("/api/tasks").then((r) => r.json()),
      fetch("/api/content").then((r) => r.json()),
      fetch("/api/sites").then((r) => r.json()),
      fetch("/api/projects").then((r) => r.json()),
    ])
      .then(([t, c, s, p]) => {
        setTasks(Array.isArray(t) ? t : [])
        setContent(Array.isArray(c) ? c : [])
        setSites(Array.isArray(s) ? s : [])
        setProjects(Array.isArray(p) ? p : [])
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  // Metrics
  const openTasks = tasks.filter((t) => ["todo", "in-progress"].includes(t.status))
  const liveSites = sites.filter((s) => s.status === "live")
  const contentInReview = content.filter((c) => c.status === "review")
  const totalRevenue = sites.reduce((sum, s) => sum + (s.monthlyRevenue || 0), 0)

  // Approval items — full list, no slice
  const approvalTasks = tasks.filter((t) => t.status === "review" || t.needsApproval)
  const approvalContent = content.filter((c) => c.status === "review")
  const allApprovalItems = [
    ...approvalContent.map((c) => ({
      id: c.id, type: "content" as const, title: c.title,
      meta: `${c.author || "INK"} · ${c.targetSite || ""} · ${c.wordCount || 0}w`,
      icon: "✒️", color: "bg-purple-500/15",
    })),
    ...approvalTasks.map((t) => ({
      id: t.id, type: "task" as const, title: t.title,
      meta: `${t.assignee || "?"} · ${t.approvalSource || "agent"}`,
      icon: "📋", color: "bg-blue-500/15",
    })),
  ]
  const approvalCount = allApprovalItems.length
  const [showAllApprovals, setShowAllApprovals] = useState(false)
  const approvalItems = showAllApprovals ? allApprovalItems : allApprovalItems.slice(0, 8)

  // Selected detail data
  const selectedTask = selectedItem?.type === "task" ? tasks.find((t) => t.id === selectedItem.id) : null
  const selectedContent = selectedItem?.type === "content" ? content.find((c) => c.id === selectedItem.id) : null

  // Approve / Reject handlers
  async function handleApprove(item: { id: string; type: "content" | "task" }) {
    setProcessingIds((s) => new Set(s).add(item.id))
    try {
      const endpoint = item.type === "content" ? `/api/content/${item.id}` : `/api/tasks/${item.id}`
      const body = item.type === "content" ? { status: "approved" } : { status: "done", needsApproval: false }
      const res = await fetch(endpoint, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      if (!res.ok) throw new Error("PATCH failed")
      // Remove from state so it disappears immediately
      if (item.type === "content") setContent((prev) => prev.filter((c) => c.id !== item.id))
      else setTasks((prev) => prev.filter((t) => t.id !== item.id))
      if (selectedItem?.id === item.id) setSelectedItem(null)
    } catch { /* silent */ }
    setProcessingIds((s) => { const n = new Set(s); n.delete(item.id); return n })
  }

  async function handleReject(item: { id: string; type: "content" | "task" }) {
    setProcessingIds((s) => new Set(s).add(item.id))
    try {
      const endpoint = item.type === "content" ? `/api/content/${item.id}` : `/api/tasks/${item.id}`
      const body = item.type === "content" ? { status: "draft" } : { status: "todo", needsApproval: false }
      const res = await fetch(endpoint, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      if (!res.ok) throw new Error("PATCH failed")
      // Remove from approval view (status changed + needsApproval cleared)
      if (item.type === "content") setContent((prev) => prev.map((c) => c.id === item.id ? { ...c, status: "draft" } : c))
      else setTasks((prev) => prev.map((t) => t.id === item.id ? { ...t, status: "todo", needsApproval: false } : t))
      if (selectedItem?.id === item.id) setSelectedItem(null)
    } catch { /* silent */ }
    setProcessingIds((s) => { const n = new Set(s); n.delete(item.id); return n })
  }

  // Top projects
  const topProjects = projects
    .filter((p) => p.status === "active")
    .sort((a, b) => (b.revenue || 0) - (a.revenue || 0))
    .slice(0, 6)

  // Greeting
  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Goedemorgen" : hour < 18 ? "Goedemiddag" : "Goedenavond"

  const metrics = [
    { label: "MRR", value: `€${(totalRevenue / 1000).toFixed(1)}K`, delta: null, icon: TrendingUp },
    { label: "Actieve sites", value: String(liveSites.length), delta: null, icon: Globe },
    { label: "Open taken", value: String(openTasks.length), delta: null, icon: ClipboardList },
    { label: "Content klaar", value: String(contentInReview.length), delta: null, icon: FileText },
  ]

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Greeting */}
      <div>
        <h1 className="text-[26px] font-extrabold tracking-tight text-white">
          {greeting}, Bart{" "}
          <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-[#F5911E]/10 px-2.5 py-0.5 text-[12px] font-semibold text-[#F5911E]">
            {activeBusiness.emoji} {activeBusiness.name}
          </span>
        </h1>
        <p className="text-[13px] text-zinc-500 mt-1">
          {new Date().toLocaleDateString("nl-BE", { weekday: "long", day: "numeric", month: "long" })}
          {approvalCount > 0 && ` — ${approvalCount} items wachten op jouw beslissing`}
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-3">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-xl border border-white/[0.06] bg-zinc-800/30 p-4 transition-all hover:border-[#F5911E]/20 hover:-translate-y-0.5 cursor-pointer"
          >
            <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
              {m.label}
            </p>
            <p className="text-[26px] font-extrabold tracking-tight text-white mt-1 tabular-nums">
              {loading ? "..." : m.value}
            </p>
          </div>
        ))}
      </div>

      {/* Approval Inbox */}
      {approvalCount > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="flex items-center gap-2 text-[15px] font-bold text-white">
              📥 Jouw beslissingen
              <span className="flex h-[20px] min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
                {approvalCount}
              </span>
            </h2>
            {approvalCount > 8 && (
              <button onClick={() => setShowAllApprovals(!showAllApprovals)} className="text-[11px] text-zinc-500 hover:text-[#F5911E] transition-colors">
                {showAllApprovals ? "Minder tonen" : `Alles tonen (${approvalCount})`}
              </button>
            )}
          </div>
          <div className="space-y-1.5">
            {approvalItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem({ id: item.id, type: item.type })}
                className={cn(
                  "flex items-center gap-3 rounded-xl border bg-zinc-800/30 p-3.5 transition-all cursor-pointer",
                  selectedItem?.id === item.id ? "border-[#F5911E]/40 bg-[#F5911E]/5" : "border-white/[0.06] hover:border-[#F5911E]/20"
                )}
              >
                <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[15px]", item.color)}>
                  {item.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-white truncate">{item.title}</p>
                  <p className="text-[10px] text-zinc-500">{item.meta}</p>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <button
                    disabled={processingIds.has(item.id)}
                    onClick={(e) => { e.stopPropagation(); handleApprove(item) }}
                    className="rounded-md bg-green-500/15 px-2.5 py-1 text-[10px] font-semibold text-green-400 transition-colors hover:bg-green-500 hover:text-white disabled:opacity-40"
                  >
                    <CheckCircle2 className="h-3 w-3" />
                  </button>
                  <button
                    disabled={processingIds.has(item.id)}
                    onClick={(e) => { e.stopPropagation(); handleReject(item) }}
                    className="rounded-md bg-red-500/15 px-2.5 py-1 text-[10px] font-semibold text-red-400 transition-colors hover:bg-red-500 hover:text-white disabled:opacity-40"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedItem && (selectedTask || selectedContent) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setSelectedItem(null)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-lg rounded-2xl border border-white/[0.08] bg-zinc-900 p-6 shadow-2xl">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 min-w-0">
                <span className={cn("inline-block rounded px-2 py-0.5 text-[9px] font-semibold uppercase mb-2", selectedTask ? "bg-blue-500/15 text-blue-400" : "bg-purple-500/15 text-purple-400")}>
                  {selectedTask ? "Taak" : "Content"}
                </span>
                <h3 className="text-[18px] font-bold text-white leading-snug">
                  {selectedTask?.title || selectedContent?.title}
                </h3>
              </div>
              <button onClick={() => setSelectedItem(null)} className="ml-3 rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-800 hover:text-white transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Details */}
            <div className="space-y-3 mb-5">
              {selectedTask && (
                <>
                  {selectedTask.description && (
                    <div>
                      <p className="text-[10px] uppercase text-zinc-500 mb-1">Beschrijving</p>
                      <p className="text-[12px] text-zinc-300 leading-relaxed whitespace-pre-wrap">{selectedTask.description}</p>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-[10px] uppercase text-zinc-500 mb-1">Agent</p>
                      <p className="text-[12px] text-white">{selectedTask.assignee || "—"}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-zinc-500 mb-1">Prioriteit</p>
                      <p className="text-[12px] text-white">{selectedTask.priority || "normaal"}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-zinc-500 mb-1">Categorie</p>
                      <p className="text-[12px] text-white">{selectedTask.category || "—"}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-zinc-500 mb-1">Aangemaakt</p>
                      <p className="text-[12px] text-white">{new Date(selectedTask.createdAt).toLocaleDateString("nl-BE")}</p>
                    </div>
                  </div>
                </>
              )}
              {selectedContent && (
                <>
                  {selectedContent.body && (
                    <div>
                      <p className="text-[10px] uppercase text-zinc-500 mb-1">Inhoud</p>
                      <div className="max-h-[300px] overflow-y-auto rounded-lg bg-zinc-800/50 p-3">
                        <p className="text-[12px] text-zinc-300 leading-relaxed whitespace-pre-wrap">{selectedContent.body.slice(0, 2000)}{selectedContent.body.length > 2000 ? "..." : ""}</p>
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-[10px] uppercase text-zinc-500 mb-1">Auteur</p>
                      <p className="text-[12px] text-white">{selectedContent.author || "—"}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-zinc-500 mb-1">Site</p>
                      <p className="text-[12px] text-white">{selectedContent.targetSite || "—"}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-zinc-500 mb-1">Woorden</p>
                      <p className="text-[12px] text-white">{selectedContent.wordCount || 0}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-zinc-500 mb-1">Aangemaakt</p>
                      <p className="text-[12px] text-white">{new Date(selectedContent.createdAt).toLocaleDateString("nl-BE")}</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                disabled={processingIds.has(selectedItem.id)}
                onClick={() => handleApprove(selectedItem)}
                className="flex-1 rounded-lg bg-green-500/15 py-2.5 text-[12px] font-semibold text-green-400 transition-colors hover:bg-green-500 hover:text-white disabled:opacity-40"
              >
                Goedkeuren
              </button>
              <button
                disabled={processingIds.has(selectedItem.id)}
                onClick={() => handleReject(selectedItem)}
                className="flex-1 rounded-lg bg-red-500/15 py-2.5 text-[12px] font-semibold text-red-400 transition-colors hover:bg-red-500 hover:text-white disabled:opacity-40"
              >
                Afwijzen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Projects */}
      {topProjects.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[15px] font-bold text-white">🔥 Hoogste hefboom</h2>
            <Link href="/portfolio" className="flex items-center gap-1 text-[11px] text-zinc-500 hover:text-[#F5911E] transition-colors">
              Alle projecten <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {topProjects.map((p) => {
              const typeColors: Record<string, { bar: string; badge: string; text: string }> = {
                client: { bar: "bg-blue-400", badge: "bg-blue-500/15 text-blue-400", text: "Klant" },
                leadgen: { bar: "bg-purple-400", badge: "bg-purple-500/15 text-purple-400", text: "Lead Gen" },
                tool: { bar: "bg-green-400", badge: "bg-green-500/15 text-green-400", text: "Eigen" },
                directory: { bar: "bg-green-400", badge: "bg-green-500/15 text-green-400", text: "Eigen" },
                business: { bar: "bg-[#F5911E]", badge: "bg-[#F5911E]/15 text-[#F5911E]", text: "Business" },
                event: { bar: "bg-pink-400", badge: "bg-pink-500/15 text-pink-400", text: "Event" },
              }
              const t = typeColors[p.ownerType === "client" ? "client" : p.category] || typeColors.tool

              return (
                <div
                  key={p.id}
                  className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-800/30 p-4 transition-all hover:border-[#F5911E]/20 hover:-translate-y-0.5 cursor-pointer"
                >
                  <div className={cn("absolute top-0 left-0 right-0 h-[3px]", t.bar)} />
                  <span className={cn("inline-block rounded px-2 py-0.5 text-[9px] font-semibold uppercase", t.badge)}>
                    {t.text}
                  </span>
                  <h3 className="mt-2 text-[13px] font-bold text-white">{p.name}</h3>
                  <p className="text-[11px] text-zinc-500 mb-3">{p.clientName || p.category}</p>
                  <div className="flex gap-4">
                    <div>
                      <p className="text-[9px] uppercase text-zinc-500">Revenue</p>
                      <p className="text-[13px] font-bold text-white tabular-nums">
                        €{(p.revenue || 0).toLocaleString("nl-BE")}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
