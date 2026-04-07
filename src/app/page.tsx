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
}
interface ContentItem {
  id: string; title: string; status: string; author?: string; targetSite?: string
  wordCount?: number; createdAt: string
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

  // Approval items
  const approvalTasks = tasks.filter((t) => t.status === "review" || t.needsApproval)
  const approvalContent = content.filter((c) => c.status === "review")
  const approvalItems = [
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
  ].slice(0, 5)

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
          {approvalItems.length > 0 && ` — ${approvalItems.length} items wachten op jouw beslissing`}
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
      {approvalItems.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="flex items-center gap-2 text-[15px] font-bold text-white">
              📥 Jouw beslissingen
              <span className="flex h-[20px] min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
                {approvalItems.length}
              </span>
            </h2>
          </div>
          <div className="space-y-1.5">
            {approvalItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-zinc-800/30 p-3.5 transition-all hover:border-[#F5911E]/20 cursor-pointer"
              >
                <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[15px]", item.color)}>
                  {item.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-white truncate">{item.title}</p>
                  <p className="text-[10px] text-zinc-500">{item.meta}</p>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <button className="rounded-md bg-green-500/15 px-2.5 py-1 text-[10px] font-semibold text-green-400 transition-colors hover:bg-green-500 hover:text-white">
                    <CheckCircle2 className="h-3 w-3" />
                  </button>
                  <button className="rounded-md bg-red-500/15 px-2.5 py-1 text-[10px] font-semibold text-red-400 transition-colors hover:bg-red-500 hover:text-white">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
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
