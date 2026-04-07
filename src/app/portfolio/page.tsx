"use client"

import { useEffect, useState } from "react"
import { useBusinessContext } from "@/components/nerve"
import { cn } from "@/lib/utils"

// ─── Types ─────────────────────────────────────────────────────
interface Site {
  id: string; domain: string; status: string; category?: string
  monthlyRevenue?: number; monthlyTraffic?: number; seoStatus?: string
  businessId?: string
}
interface Project {
  id: string; name: string; status: string; category: string
  revenue?: number; ownerType?: string; clientName?: string
  businessId?: string
}

// ─── Category config ──────────────────────────────────────────
const categoryConfig: Record<string, { icon: string; color: string; badge: string }> = {
  adsense:   { icon: "📊", color: "bg-green-400",  badge: "bg-green-500/15 text-green-400" },
  affiliate: { icon: "🔗", color: "bg-pink-400",   badge: "bg-pink-500/15 text-pink-400" },
  leadgen:   { icon: "🏠", color: "bg-purple-400", badge: "bg-purple-500/15 text-purple-400" },
  tool:      { icon: "🛠️", color: "bg-cyan-400",   badge: "bg-cyan-500/15 text-cyan-400" },
  directory: { icon: "📁", color: "bg-blue-400",   badge: "bg-blue-500/15 text-blue-400" },
  client:    { icon: "🏢", color: "bg-blue-400",   badge: "bg-blue-500/15 text-blue-400" },
  event:     { icon: "🎪", color: "bg-pink-400",   badge: "bg-pink-500/15 text-pink-400" },
  business:  { icon: "🔶", color: "bg-[#F5911E]",  badge: "bg-[#F5911E]/15 text-[#F5911E]" },
}

const seoColors: Record<string, string> = {
  good: "text-green-400",
  warning: "text-yellow-400",
  bad: "text-red-400",
}

const statusColors: Record<string, { dot: string; text: string }> = {
  live:        { dot: "bg-green-400", text: "text-green-400" },
  development: { dot: "bg-yellow-400", text: "text-yellow-400" },
  planned:     { dot: "bg-zinc-500", text: "text-zinc-500" },
  paused:      { dot: "bg-red-400", text: "text-red-400" },
}

// ─── Component ────────────────────────────────────────────────
export default function PortfolioPage() {
  const { activeBusiness } = useBusinessContext()
  const [sites, setSites] = useState<Site[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<"sites" | "projects">("sites")

  useEffect(() => {
    Promise.all([
      fetch("/api/sites").then((r) => r.json()).catch(() => []),
      fetch("/api/projects").then((r) => r.json()).catch(() => []),
    ])
      .then(([s, p]) => {
        setSites(Array.isArray(s) ? s : [])
        setProjects(Array.isArray(p) ? p : [])
      })
      .finally(() => setLoading(false))
  }, [])

  // Filter by business
  const filteredSites = activeBusiness.id === "all"
    ? sites : sites.filter((s) => s.businessId === activeBusiness.id || !s.businessId)
  const filteredProjects = activeBusiness.id === "all"
    ? projects : projects.filter((p) => p.businessId === activeBusiness.id || !p.businessId)

  // Stats
  const liveSites = filteredSites.filter((s) => s.status === "live")
  const totalRevenue = filteredSites.reduce((sum, s) => sum + (s.monthlyRevenue || 0), 0)
  const totalTraffic = filteredSites.reduce((sum, s) => sum + (s.monthlyTraffic || 0), 0)
  const activeProjects = filteredProjects.filter((p) => p.status === "active")

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Header */}
      <div>
        <h1 className="text-[26px] font-extrabold tracking-tight text-white">
          🌐 Portfolio
        </h1>
        <p className="text-[13px] text-zinc-500">
          Sites, projecten &amp; assets
          {activeBusiness.id !== "all" && (
            <span className="ml-2 text-[#F5911E]">· {activeBusiness.name}</span>
          )}
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Live sites", value: String(liveSites.length), sub: `${filteredSites.length} totaal` },
          { label: "MRR portfolio", value: `€${totalRevenue.toLocaleString("nl-BE")}`, sub: "Alle sites" },
          { label: "Maandelijks verkeer", value: totalTraffic > 1000 ? `${(totalTraffic / 1000).toFixed(1)}K` : String(totalTraffic), sub: "Sessies/maand" },
          { label: "Actieve projecten", value: String(activeProjects.length), sub: `${filteredProjects.length} totaal` },
        ].map((m) => (
          <div key={m.label} className="rounded-xl border border-white/[0.06] bg-zinc-800/30 p-4">
            <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">{m.label}</p>
            <p className="text-[24px] font-extrabold tracking-tight text-white mt-1 tabular-nums">
              {loading ? "..." : m.value}
            </p>
            <p className="text-[10px] text-zinc-600 mt-0.5">{m.sub}</p>
          </div>
        ))}
      </div>

      {/* View toggle */}
      <div className="flex gap-0.5 rounded-lg border border-white/[0.06] bg-zinc-800/30 p-1 w-fit">
        {(["sites", "projects"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={cn(
              "rounded-md px-4 py-1.5 text-[11px] font-medium capitalize transition-colors",
              view === v ? "bg-zinc-700 text-white" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            {v === "sites" ? "🌐 Sites" : "📂 Projecten"}
          </button>
        ))}
      </div>

      {/* Sites list */}
      {view === "sites" && (
        <div className="rounded-xl border border-white/[0.06] bg-zinc-800/20 overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[1fr_100px_90px_90px_80px] gap-3 px-4 py-2.5 border-b border-white/[0.06] text-[9px] font-bold uppercase tracking-wider text-zinc-500">
            <span>Domein</span>
            <span>Status</span>
            <span className="text-right">Revenue</span>
            <span className="text-right">Traffic</span>
            <span className="text-right">SEO</span>
          </div>
          {/* Rows */}
          <div className="divide-y divide-white/[0.04]">
            {filteredSites.length > 0 ? (
              filteredSites.map((site) => {
                const cat = categoryConfig[site.category || "tool"] || categoryConfig.tool
                const st = statusColors[site.status] || statusColors.planned
                return (
                  <div
                    key={site.id}
                    className="grid grid-cols-[1fr_100px_90px_90px_80px] gap-3 px-4 py-3 items-center transition-colors hover:bg-zinc-800/40 cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-[13px]">{cat.icon}</span>
                      <div className="min-w-0">
                        <p className="text-[12px] font-semibold text-white truncate">
                          {site.domain}
                        </p>
                        <span className={cn("text-[8px] font-bold uppercase rounded px-1.5 py-0.5", cat.badge)}>
                          {site.category || "tool"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={cn("h-1.5 w-1.5 rounded-full", st.dot)} />
                      <span className={cn("text-[10px] capitalize", st.text)}>{site.status}</span>
                    </div>
                    <p className="text-[11px] font-bold text-white tabular-nums text-right">
                      €{(site.monthlyRevenue || 0).toLocaleString("nl-BE")}
                    </p>
                    <p className="text-[11px] text-zinc-400 tabular-nums text-right">
                      {(site.monthlyTraffic || 0).toLocaleString("nl-BE")}
                    </p>
                    <p className={cn("text-[10px] font-semibold text-right uppercase", seoColors[site.seoStatus || ""] || "text-zinc-500")}>
                      {site.seoStatus || "—"}
                    </p>
                  </div>
                )
              })
            ) : (
              <p className="text-center text-[11px] text-zinc-600 py-8">
                {loading ? "Laden..." : "Geen sites gevonden"}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Projects grid */}
      {view === "projects" && (
        <div className="grid grid-cols-3 gap-3">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((p) => {
              const cat = categoryConfig[p.ownerType === "client" ? "client" : p.category] || categoryConfig.tool
              const isActive = p.status === "active"
              return (
                <div
                  key={p.id}
                  className={cn(
                    "relative overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-800/30 p-4 transition-all hover:border-[#F5911E]/20 hover:-translate-y-0.5 cursor-pointer",
                    !isActive && "opacity-60"
                  )}
                >
                  <div className={cn("absolute top-0 left-0 right-0 h-[3px]", cat.color)} />
                  <div className="flex items-center justify-between mb-2">
                    <span className={cn("rounded px-2 py-0.5 text-[9px] font-semibold uppercase", cat.badge)}>
                      {p.ownerType === "client" ? "Klant" : p.category}
                    </span>
                    <span className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      isActive ? "bg-green-400" : "bg-zinc-500"
                    )} />
                  </div>
                  <h3 className="text-[13px] font-bold text-white">{p.name}</h3>
                  <p className="text-[11px] text-zinc-500 mb-3">
                    {p.clientName || p.category}
                  </p>
                  <div className="flex gap-4">
                    <div>
                      <p className="text-[9px] uppercase text-zinc-500">Revenue</p>
                      <p className="text-[13px] font-bold text-white tabular-nums">
                        €{(p.revenue || 0).toLocaleString("nl-BE")}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase text-zinc-500">Status</p>
                      <p className={cn("text-[13px] font-bold capitalize", isActive ? "text-green-400" : "text-zinc-500")}>
                        {p.status}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <p className="col-span-3 text-center text-[11px] text-zinc-600 py-8">
              {loading ? "Laden..." : "Geen projecten gevonden"}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
