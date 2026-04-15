"use client"

import { useEffect, useState, useCallback } from "react"
import { useBusinessContext } from "@/components/nerve"
import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// ─── Types ─────────────────────────────────────────────────────
interface Site {
  id: string
  domain: string
  status: string
  category?: string
  monthlyRevenue?: number
  monthlyTraffic?: number
  seoStatus?: string
  seoScore?: number
  notes?: string
  nextAction?: string
  businessId?: string
  topKeyword?: string
  topPosition?: number
  indexedPages?: number
  hosting?: string
  revenueType?: string
  techStack?: string[]
  productionUrl?: string
  githubRepo?: string
  deployUrl?: string
  deployStatus?: string
  vercelProjectId?: string
  lastDeployAt?: string
  revenue?: number
  clientName?: string
  clientEmail?: string
  ownerType?: string
  contractType?: string
  monthlyFee?: number
}

interface DomainOpportunity {
  id: string
  domain: string
  status: string
  estimatedValue?: number
  niche?: string
  priority?: string
  notes?: string
  radarNotes?: string
  hasIdea?: boolean
  category?: string
  renewalDate?: string
  provider?: string
  businessUnit?: string
  updatedAt?: string
  // Sold tracking (voor domeinflips)
  soldPrice?: number
  soldCurrency?: string
  soldAt?: string
  soldTo?: string
}

interface Task {
  id: string
  title: string
  status: string
  priority?: string
  assignee?: string
  dueDate?: string
  category?: string
  siteId?: string
  linkedDomainId?: string
  createdAt?: string
}

type TabView = "domains" | "sites"
type SelectedItem =
  | { type: "site"; data: Site }
  | { type: "domain"; data: DomainOpportunity }
  | null

// ─── Config ────────────────────────────────────────────────────
const AGENTS = ["bart", "claude", "radar"] as const

const SITE_CATEGORIES = [
  { value: "adsense", label: "AdSense" },
  { value: "leadgen", label: "Lead Generation" },
  { value: "affiliate", label: "Affiliate" },
  { value: "rank-rent", label: "Rank & Rent" },
  { value: "klant", label: "Klantsite" },
  { value: "tool", label: "Tool / Calculator" },
  { value: "directory", label: "Directory" },
  { value: "business", label: "Business" },
  { value: "event", label: "Event" },
] as const

const REVENUE_TYPES = [
  { value: "adsense", label: "AdSense" },
  { value: "recurring", label: "Recurring (abonnement)" },
  { value: "leadgen", label: "Lead Generation" },
  { value: "affiliate", label: "Affiliate" },
  { value: "rank_rent", label: "Rank & Rent" },
  { value: "one_time", label: "Eenmalig" },
] as const

const HOSTING_OPTIONS = [
  { value: "vercel", label: "Vercel" },
  { value: "cloudflare", label: "Cloudflare" },
  { value: "hostinger", label: "Hostinger" },
  { value: "vps", label: "VPS" },
  { value: "other", label: "Andere" },
] as const

const SITE_STATUSES = [
  { value: "planned", label: "Gepland" },
  { value: "dev", label: "In ontwikkeling" },
  { value: "staging", label: "Staging" },
  { value: "live", label: "Live" },
  { value: "paused", label: "Gepauzeerd" },
  { value: "archived", label: "Gearchiveerd" },
] as const

const DOMAIN_STATUSES = [
  { value: "parking", label: "Geparkeerd" },
  { value: "prospect", label: "Prospect" },
  { value: "developing", label: "In ontwikkeling" },
  { value: "acquired", label: "Aangekocht" },
  { value: "forsale", label: "Te koop" },
  { value: "sold", label: "Verkocht" },
  { value: "expired-watching", label: "Verlopen (watch)" },
] as const

const domainStatusConfig: Record<string, { label: string; dot: string; text: string }> = {
  parking: { label: "Geparkeerd", dot: "bg-zinc-500", text: "text-zinc-400" },
  prospect: { label: "Prospect", dot: "bg-blue-400", text: "text-blue-400" },
  developing: { label: "In ontwikkeling", dot: "bg-[#F5911E]", text: "text-[#F5911E]" },
  acquired: { label: "Aangekocht", dot: "bg-emerald-400", text: "text-emerald-400" },
  forsale: { label: "Te koop", dot: "bg-yellow-400", text: "text-yellow-400" },
  sold: { label: "Verkocht", dot: "bg-violet-400", text: "text-violet-400" },
  "expired-watching": { label: "Verlopen (watch)", dot: "bg-red-400", text: "text-red-400" },
}

const siteStatusConfig: Record<string, { label: string; dot: string; text: string }> = {
  live: { label: "Live", dot: "bg-emerald-400", text: "text-emerald-400" },
  dev: { label: "Dev", dot: "bg-yellow-400", text: "text-yellow-400" },
  development: { label: "Dev", dot: "bg-yellow-400", text: "text-yellow-400" },
  staging: { label: "Staging", dot: "bg-blue-400", text: "text-blue-400" },
  planned: { label: "Gepland", dot: "bg-zinc-500", text: "text-zinc-400" },
  paused: { label: "Gepauzeerd", dot: "bg-red-400", text: "text-red-400" },
  archived: { label: "Archief", dot: "bg-zinc-600", text: "text-zinc-500" },
}

const priorityColors: Record<string, string> = {
  high: "text-red-400 bg-red-500/10 border-red-500/20",
  medium: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  low: "text-zinc-400 bg-zinc-500/10 border-zinc-500/20",
}

const taskStatusColors: Record<string, string> = {
  todo: "text-zinc-400",
  "in-progress": "text-[#F5911E]",
  review: "text-blue-400",
  blocked: "text-red-400",
  done: "text-emerald-400",
}

// ─── Component ────────────────────────────────────────────────
export default function PortfolioPage() {
  const { activeBusiness } = useBusinessContext()

  const [sites, setSites] = useState<Site[]>([])
  const [domains, setDomains] = useState<DomainOpportunity[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<TabView>("domains")

  const [selected, setSelected] = useState<SelectedItem>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [saving, setSaving] = useState(false)

  // Edit state for sites
  const [editSite, setEditSite] = useState<Partial<Site>>({})
  // Edit state for domains
  const [editDomain, setEditDomain] = useState<Partial<DomainOpportunity>>({})

  const [taskModalOpen, setTaskModalOpen] = useState(false)
  const [taskModalContext, setTaskModalContext] = useState<{
    scope: "site" | "domain"
    id: string
    label: string
  } | null>(null)

  // Create new site/domain
  const [createOpen, setCreateOpen] = useState(false)
  const [createType, setCreateType] = useState<"site" | "domain">("site")
  const [createSubmitting, setCreateSubmitting] = useState(false)
  const [newSite, setNewSite] = useState({ domain: "", status: "dev", category: "tools", revenueType: "adsense", hosting: "vercel" })
  const [newDomain, setNewDomain] = useState({ domain: "", status: "prospect", priority: "medium", niche: "", notes: "" })

  // ─── Data loading ─────────────────────────────────────────
  const fetchAll = useCallback(async () => {
    setLoading(true)
    try {
      const [sitesRes, domainsRes, tasksRes] = await Promise.all([
        fetch("/api/sites").then((r) => r.json()).catch(() => []),
        fetch("/api/domain-opportunities").then((r) => r.json()).catch(() => []),
        fetch("/api/tasks").then((r) => r.json()).catch(() => []),
      ])
      setSites(Array.isArray(sitesRes) ? sitesRes : [])
      setDomains(Array.isArray(domainsRes) ? domainsRes : [])
      setTasks(Array.isArray(tasksRes) ? tasksRes : [])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  // ─── Filtering ───────────────────────────────────────────
  const filteredSites =
    activeBusiness.id === "all"
      ? sites
      : sites.filter((s) => !s.businessId || s.businessId === activeBusiness.id)

  // Structureel: zodra een domein een site is geworden, hoort het niet meer in de Domeinen-lijst.
  // Uitzondering: status 'sold' blijft zichtbaar als historiek. Matching is case-insensitive.
  const siteDomains = new Set(sites.map((s) => s.domain?.toLowerCase()).filter(Boolean) as string[])
  const filteredDomains = (
    activeBusiness.id === "all"
      ? domains
      : domains.filter((d) => !d.businessUnit || d.businessUnit === activeBusiness.id)
  ).filter((d) => d.status === "sold" || !siteDomains.has(d.domain.toLowerCase()))

  // Tasks helpers
  const openTasksForSite = (siteId: string) =>
    tasks.filter((t) => t.siteId === siteId && t.status !== "done")
  const openTasksForDomain = (domainId: string) =>
    tasks.filter((t) => t.linkedDomainId === domainId && t.status !== "done")

  // ─── Stats ───────────────────────────────────────────────
  const liveSites = filteredSites.filter((s) => s.status === "live")
  const totalMrr = filteredSites.reduce((sum, s) => sum + (s.monthlyRevenue || 0), 0)
  const pipelineDomains = filteredDomains.filter(
    (d) => d.status === "developing" || d.status === "prospect" || d.status === "acquired"
  )
  const openTasksTotal = tasks.filter((t) => t.status !== "done").length

  // ─── Handlers ────────────────────────────────────────────
  const openDetail = (item: SelectedItem) => {
    setSelected(item)
    setEditMode(false)
    if (item?.type === "site") {
      setEditSite({ ...item.data })
    } else if (item?.type === "domain") {
      setEditDomain({ ...item.data })
    }
    setDetailOpen(true)
  }

  const openTaskModalForSite = (site: Site) => {
    setTaskModalContext({ scope: "site", id: site.id, label: site.domain })
    setTaskModalOpen(true)
  }

  const openTaskModalForDomain = (domain: DomainOpportunity) => {
    setTaskModalContext({ scope: "domain", id: domain.id, label: domain.domain })
    setTaskModalOpen(true)
  }

  const handleTaskCreated = async () => {
    setTaskModalOpen(false)
    const fresh = await fetch("/api/tasks").then((r) => r.json()).catch(() => [])
    setTasks(Array.isArray(fresh) ? fresh : [])
  }

  // ─── Save site edits ────────────────────────────────────
  const handleSaveSite = async () => {
    if (!selected || selected.type !== "site") return
    setSaving(true)
    try {
      const res = await fetch(`/api/sites/${selected.data.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: editSite.category,
          status: editSite.status,
          hosting: editSite.hosting,
          revenueType: editSite.revenueType,
          monthlyRevenue: editSite.monthlyRevenue ? Number(editSite.monthlyRevenue) : null,
          notes: editSite.notes,
          nextAction: editSite.nextAction,
          productionUrl: editSite.productionUrl,
          githubRepo: editSite.githubRepo,
          techStack: editSite.techStack,
          ownerType: editSite.ownerType,
          clientName: editSite.ownerType === "client" ? editSite.clientName : null,
          clientEmail: editSite.ownerType === "client" ? editSite.clientEmail : null,
          contractType: editSite.ownerType === "client" ? editSite.contractType : null,
          monthlyFee: editSite.ownerType === "client" && editSite.monthlyFee ? Number(editSite.monthlyFee) : null,
        }),
      })
      if (!res.ok) throw new Error("Opslaan mislukt")
      setEditMode(false)
      fetchAll()
    } catch (e) {
      alert("Fout: " + (e instanceof Error ? e.message : "onbekend"))
    } finally {
      setSaving(false)
    }
  }

  // ─── Save domain edits ──────────────────────────────────
  const handleSaveDomain = async () => {
    if (!selected || selected.type !== "domain") return
    setSaving(true)
    try {
      const res = await fetch(`/api/domain-opportunities/${selected.data.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: editDomain.status,
          priority: editDomain.priority,
          niche: editDomain.niche,
          category: editDomain.category,
          estimatedValue: editDomain.estimatedValue ? Number(editDomain.estimatedValue) : null,
          provider: editDomain.provider,
          notes: editDomain.notes,
          soldPrice: editDomain.soldPrice ?? null,
          soldCurrency: editDomain.soldCurrency || null,
          soldAt: editDomain.soldAt || null,
          soldTo: editDomain.soldTo || null,
        }),
      })
      if (!res.ok) throw new Error("Opslaan mislukt")
      setEditMode(false)
      fetchAll()
    } catch (e) {
      alert("Fout: " + (e instanceof Error ? e.message : "onbekend"))
    } finally {
      setSaving(false)
    }
  }

  // ─── Delete site ─────────────────────────────────────────
  const handleDeleteSite = async (site: Site) => {
    if (!confirm(`Site "${site.domain}" definitief verwijderen? Dit kan niet ongedaan worden.`)) return
    try {
      const res = await fetch(`/api/sites/${site.id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Verwijderen mislukt")
      setDetailOpen(false)
      fetchAll()
    } catch (e) {
      alert("Fout: " + (e instanceof Error ? e.message : "onbekend"))
    }
  }

  // ─── Delete domain ──────────────────────────────────────
  const handleDeleteDomain = async (domain: DomainOpportunity) => {
    if (!confirm(`Domein "${domain.domain}" definitief verwijderen? Dit kan niet ongedaan worden.`)) return
    try {
      const res = await fetch(`/api/domain-opportunities/${domain.id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Verwijderen mislukt")
      setDetailOpen(false)
      fetchAll()
    } catch (e) {
      alert("Fout: " + (e instanceof Error ? e.message : "onbekend"))
    }
  }

  // ─── Promote domain → site ──────────────────────────────
  // Mapping van domain.category (vrij veld) naar de vaste site-categorieën + bijpassend revenue type.
  const inferSiteDefaults = (d: DomainOpportunity): { category: string; revenueType: string } => {
    const raw = (d.category || d.niche || "").toLowerCase()
    if (raw.includes("lead") || raw.includes("rank") || raw.includes("rent"))
      return { category: "leadgen", revenueType: "leadgen" }
    if (raw.includes("affil")) return { category: "affiliate", revenueType: "affiliate" }
    if (raw.includes("klant") || raw.includes("client") || raw.includes("agency"))
      return { category: "klant", revenueType: "recurring" }
    if (raw.includes("tool") || raw.includes("calc")) return { category: "tool", revenueType: "adsense" }
    if (raw.includes("direct")) return { category: "directory", revenueType: "adsense" }
    return { category: "tool", revenueType: "adsense" }
  }

  const handlePromoteDomain = async (domain: DomainOpportunity) => {
    if (domain.status === "sold") {
      alert("Dit domein is verkocht — kan niet meer omgezet worden naar een site.")
      return
    }
    if (!confirm(`${domain.domain} converteren naar een site? Het domein verdwijnt uit de Domeinen-lijst.`)) return
    try {
      const { category, revenueType } = inferSiteDefaults(domain)
      const res = await fetch("/api/sites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          domain: domain.domain,
          status: "dev",
          category,
          revenueType,
          hosting: "vercel",
          notes: domain.notes || undefined,
          techStack: [],
        }),
      })
      if (!res.ok) throw new Error("Kon site niet aanmaken")
      // De server verwijdert automatisch de matching domain_opportunity (zie POST /api/sites).
      // Geen extra PATCH/DELETE nodig.
      setDetailOpen(false)
      fetchAll()
    } catch (e) {
      alert("Fout bij converteren: " + (e instanceof Error ? e.message : "onbekend"))
    }
  }

  // ─── Create site/domain ─────────────────────────────────
  const handleCreateSite = async () => {
    if (!newSite.domain.trim()) return
    setCreateSubmitting(true)
    try {
      const res = await fetch("/api/sites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSite),
      })
      if (!res.ok) throw new Error("Failed")
      setCreateOpen(false)
      setNewSite({ domain: "", status: "dev", category: "tools", revenueType: "adsense", hosting: "vercel" })
      fetchAll()
    } catch (e) {
      alert("Fout: " + (e instanceof Error ? e.message : "onbekend"))
    } finally {
      setCreateSubmitting(false)
    }
  }

  const handleCreateDomain = async () => {
    if (!newDomain.domain.trim()) return
    setCreateSubmitting(true)
    try {
      const res = await fetch("/api/domain-opportunities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDomain),
      })
      if (!res.ok) throw new Error("Failed")
      setCreateOpen(false)
      setNewDomain({ domain: "", status: "prospect", priority: "medium", niche: "", notes: "" })
      fetchAll()
    } catch (e) {
      alert("Fout: " + (e instanceof Error ? e.message : "onbekend"))
    } finally {
      setCreateSubmitting(false)
    }
  }

  // ─── Render ──────────────────────────────────────────────
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[26px] font-extrabold tracking-tight text-white">Portfolio</h1>
          <p className="text-[13px] text-zinc-500">
            Domeinen (idee → build) &amp; live sites
            {activeBusiness.id !== "all" && (
              <span className="ml-2 text-[#F5911E]">· {activeBusiness.name}</span>
            )}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 border-white/10 text-zinc-300 hover:bg-zinc-800 hover:text-white"
            onClick={() => { setCreateType("domain"); setCreateOpen(true) }}
          >
            + Domein
          </Button>
          <Button
            size="sm"
            className="gap-1.5 bg-[#F5911E] hover:bg-[#e07d0a] text-white"
            onClick={() => { setCreateType("site"); setCreateOpen(true) }}
          >
            + Site
          </Button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-3">
        {[
          {
            label: "Domeinen pipeline",
            value: String(pipelineDomains.length),
            sub: `${filteredDomains.length} totaal`,
          },
          {
            label: "Live sites",
            value: String(liveSites.length),
            sub: `${filteredSites.length} totaal`,
          },
          {
            label: "MRR portfolio",
            value: `€${totalMrr.toLocaleString("nl-BE")}`,
            sub: "Alle sites",
          },
          {
            label: "Open tasks",
            value: String(openTasksTotal),
            sub: "Alle scopes",
          },
        ].map((m) => (
          <div
            key={m.label}
            className="rounded-xl border border-white/[0.06] bg-zinc-800/30 p-4"
          >
            <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
              {m.label}
            </p>
            <p className="text-[24px] font-extrabold tracking-tight text-white mt-1 tabular-nums">
              {loading ? "…" : m.value}
            </p>
            <p className="text-[10px] text-zinc-600 mt-0.5">{m.sub}</p>
          </div>
        ))}
      </div>

      {/* View toggle */}
      <div className="flex gap-0.5 rounded-lg border border-white/[0.06] bg-zinc-800/30 p-1 w-fit">
        {(
          [
            { id: "domains" as const, label: "🌱 Domeinen", sub: "idee → build" },
            { id: "sites" as const, label: "🌐 Sites", sub: "live" },
          ]
        ).map((v) => (
          <button
            key={v.id}
            onClick={() => setView(v.id)}
            className={cn(
              "rounded-md px-5 py-2 text-[11px] font-semibold transition-colors",
              view === v.id
                ? "bg-zinc-700 text-white"
                : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            {v.label} <span className="text-zinc-500 ml-1 font-normal">({v.sub})</span>
          </button>
        ))}
      </div>

      {/* ── Domeinen table ────────────────────────────────── */}
      {view === "domains" && (
        <div className="rounded-xl border border-white/[0.06] bg-zinc-800/20 overflow-hidden">
          <div className="grid grid-cols-[1fr_140px_100px_120px_90px_60px] gap-3 px-4 py-2.5 border-b border-white/[0.06] text-[9px] font-bold uppercase tracking-wider text-zinc-500">
            <span>Domein</span>
            <span>Status</span>
            <span>Prio</span>
            <span>Niche / Categorie</span>
            <span className="text-right">Tasks</span>
            <span className="text-right">+</span>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="grid grid-cols-[1fr_140px_100px_120px_90px_60px] gap-3 px-4 py-3">
                  <div className="h-4 w-2/3 rounded bg-zinc-800/60 animate-pulse" />
                  <div className="h-4 w-20 rounded bg-zinc-800/60 animate-pulse" />
                  <div className="h-4 w-14 rounded bg-zinc-800/60 animate-pulse" />
                  <div className="h-4 w-24 rounded bg-zinc-800/60 animate-pulse" />
                  <div className="h-4 w-10 rounded bg-zinc-800/60 animate-pulse ml-auto" />
                  <div className="h-4 w-6 rounded bg-zinc-800/60 animate-pulse ml-auto" />
                </div>
              ))
            ) : filteredDomains.length > 0 ? (
              filteredDomains.map((d) => {
                const st = domainStatusConfig[d.status] || domainStatusConfig.parking
                const openCount = openTasksForDomain(d.id).length
                return (
                  <div
                    key={d.id}
                    onClick={() => openDetail({ type: "domain", data: d })}
                    className="grid grid-cols-[1fr_140px_100px_120px_90px_60px] gap-3 px-4 py-3 items-center transition-colors hover:bg-zinc-800/40 cursor-pointer"
                  >
                    <div className="min-w-0">
                      <p className="text-[12px] font-semibold text-white truncate">{d.domain}</p>
                      {d.hasIdea && (
                        <span className="text-[8px] font-bold uppercase rounded px-1.5 py-0.5 bg-[#F5911E]/15 text-[#F5911E]">
                          Idee gelinkt
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={cn("h-1.5 w-1.5 rounded-full", st.dot)} />
                      <span className={cn("text-[10px]", st.text)}>{st.label}</span>
                    </div>
                    <span
                      className={cn(
                        "text-[9px] font-bold uppercase rounded-full px-2 py-0.5 border w-fit",
                        priorityColors[d.priority || "low"] || priorityColors.low
                      )}
                    >
                      {d.priority || "low"}
                    </span>
                    <p className="text-[10px] text-zinc-400 truncate">
                      {d.niche || d.category || "—"}
                    </p>
                    <p className="text-[11px] font-bold text-white tabular-nums text-right">
                      {openCount > 0 ? openCount : "—"}
                    </p>
                    <button
                      onClick={(e) => { e.stopPropagation(); openTaskModalForDomain(d) }}
                      className="justify-self-end rounded-md bg-[#F5911E]/15 hover:bg-[#F5911E]/25 text-[#F5911E] text-[14px] font-bold w-7 h-7 flex items-center justify-center transition-colors"
                      aria-label="Taak toevoegen"
                    >
                      +
                    </button>
                  </div>
                )
              })
            ) : (
              <p className="text-center text-[11px] text-zinc-600 py-10">
                Nog geen domeinen in pipeline — voeg er een toe via SPARK
              </p>
            )}
          </div>
        </div>
      )}

      {/* ── Sites table ───────────────────────────────────── */}
      {view === "sites" && (
        <div className="rounded-xl border border-white/[0.06] bg-zinc-800/20 overflow-hidden">
          <div className="grid grid-cols-[1fr_90px_90px_100px_100px_80px_70px_60px] gap-3 px-4 py-2.5 border-b border-white/[0.06] text-[9px] font-bold uppercase tracking-wider text-zinc-500">
            <span>Site</span>
            <span>Status</span>
            <span>Type</span>
            <span className="text-right">MRR</span>
            <span className="text-right">Verkeer</span>
            <span className="text-right">SEO</span>
            <span className="text-right">Tasks</span>
            <span className="text-right">+</span>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="grid grid-cols-[1fr_90px_90px_100px_100px_80px_70px_60px] gap-3 px-4 py-3">
                  <div className="h-4 w-2/3 rounded bg-zinc-800/60 animate-pulse" />
                  <div className="h-4 w-14 rounded bg-zinc-800/60 animate-pulse" />
                  <div className="h-4 w-14 rounded bg-zinc-800/60 animate-pulse" />
                  <div className="h-4 w-14 rounded bg-zinc-800/60 animate-pulse ml-auto" />
                  <div className="h-4 w-14 rounded bg-zinc-800/60 animate-pulse ml-auto" />
                  <div className="h-4 w-12 rounded bg-zinc-800/60 animate-pulse ml-auto" />
                  <div className="h-4 w-8 rounded bg-zinc-800/60 animate-pulse ml-auto" />
                  <div className="h-4 w-6 rounded bg-zinc-800/60 animate-pulse ml-auto" />
                </div>
              ))
            ) : filteredSites.length > 0 ? (
              filteredSites.map((s) => {
                const st = siteStatusConfig[s.status] || siteStatusConfig.planned
                const openCount = openTasksForSite(s.id).length
                const catLabel = SITE_CATEGORIES.find(c => c.value === s.category)?.label || s.category || "—"
                return (
                  <div
                    key={s.id}
                    onClick={() => openDetail({ type: "site", data: s })}
                    className="grid grid-cols-[1fr_90px_90px_100px_100px_80px_70px_60px] gap-3 px-4 py-3 items-center transition-colors hover:bg-zinc-800/40 cursor-pointer"
                  >
                    <div className="min-w-0">
                      <p className="text-[12px] font-semibold text-white truncate">{s.domain}</p>
                      <div className="flex gap-1 mt-0.5">
                        {s.ownerType === "client" && (
                          <span className="text-[8px] font-bold uppercase rounded px-1.5 py-0.5 bg-[#F5911E]/15 text-[#F5911E]">
                            Klant{s.clientName ? ` · ${s.clientName}` : ""}
                          </span>
                        )}
                        {s.hosting && (
                          <span className="text-[8px] font-bold uppercase rounded px-1.5 py-0.5 bg-zinc-700/60 text-zinc-400">
                            {s.hosting}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={cn("h-1.5 w-1.5 rounded-full", st.dot)} />
                      <span className={cn("text-[10px]", st.text)}>{st.label}</span>
                    </div>
                    <span className="text-[9px] font-semibold text-zinc-400 uppercase truncate">
                      {catLabel}
                    </span>
                    <p className="text-[11px] font-bold text-white tabular-nums text-right">
                      €{(s.monthlyRevenue || 0).toLocaleString("nl-BE")}
                    </p>
                    <p className="text-[11px] text-zinc-400 tabular-nums text-right">
                      {(s.monthlyTraffic || 0).toLocaleString("nl-BE")}
                    </p>
                    <p
                      className={cn(
                        "text-[10px] font-semibold text-right uppercase",
                        s.seoStatus === "good" || s.seoStatus === "growing"
                          ? "text-emerald-400"
                          : s.seoStatus === "warning" || s.seoStatus === "stable"
                            ? "text-yellow-400"
                            : s.seoStatus === "bad" || s.seoStatus === "declining"
                              ? "text-red-400"
                              : "text-zinc-500"
                      )}
                    >
                      {s.seoScore ? `${s.seoScore}` : s.seoStatus || "—"}
                    </p>
                    <p className="text-[11px] font-bold text-white tabular-nums text-right">
                      {openCount > 0 ? openCount : "—"}
                    </p>
                    <button
                      onClick={(e) => { e.stopPropagation(); openTaskModalForSite(s) }}
                      className="justify-self-end rounded-md bg-[#F5911E]/15 hover:bg-[#F5911E]/25 text-[#F5911E] text-[14px] font-bold w-7 h-7 flex items-center justify-center transition-colors"
                      aria-label="Taak toevoegen"
                    >
                      +
                    </button>
                  </div>
                )
              })
            ) : (
              <p className="text-center text-[11px] text-zinc-600 py-10">
                Nog geen sites — promote een domein of voeg er een toe
              </p>
            )}
          </div>
        </div>
      )}

      {/* Help hints */}
      <div className="text-[10px] text-zinc-600 flex gap-6">
        <span>Klik een rij voor details + taken</span>
        <span>+ knop = direct taak aanmaken</span>
        <span>Domein → Site zodra status live</span>
      </div>

      {/* ─── Detail panel (slide-in) ──────────────────── */}
      <Sheet open={detailOpen} onOpenChange={(open) => { setDetailOpen(open); if (!open) setEditMode(false) }}>
        <SheetContent className="bg-zinc-900 border-l border-white/[0.06] text-white w-full sm:max-w-lg overflow-y-auto">
          {selected?.type === "site" && (
            <SiteDetailPanel
              site={selected.data}
              editSite={editSite}
              setEditSite={setEditSite}
              editMode={editMode}
              setEditMode={setEditMode}
              saving={saving}
              onSave={handleSaveSite}
              onDelete={() => handleDeleteSite(selected.data)}
              tasks={openTasksForSite(selected.data.id)}
              onAddTask={() => openTaskModalForSite(selected.data)}
              onClose={() => setDetailOpen(false)}
            />
          )}
          {selected?.type === "domain" && (
            <DomainDetailPanel
              domain={selected.data}
              editDomain={editDomain}
              setEditDomain={setEditDomain}
              editMode={editMode}
              setEditMode={setEditMode}
              saving={saving}
              onSave={handleSaveDomain}
              onDelete={() => handleDeleteDomain(selected.data)}
              onPromote={() => handlePromoteDomain(selected.data)}
              tasks={openTasksForDomain(selected.data.id)}
              onAddTask={() => openTaskModalForDomain(selected.data)}
              onClose={() => setDetailOpen(false)}
            />
          )}
        </SheetContent>
      </Sheet>

      {/* ─── Quick-add task modal ─────────────────────── */}
      <QuickAddTaskModal
        open={taskModalOpen}
        onOpenChange={setTaskModalOpen}
        context={taskModalContext}
        existingTasks={tasks}
        onCreated={handleTaskCreated}
      />

      {/* ─── Create site/domain dialog ──────────────────── */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="bg-zinc-900 border-white/[0.08] text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {createType === "site" ? "Nieuwe site toevoegen" : "Nieuw domein toevoegen"}
            </DialogTitle>
            <DialogDescription className="text-zinc-500">
              {createType === "site"
                ? "Voeg een live of in-development site toe aan je portfolio."
                : "Voeg een domein toe aan je pipeline."}
            </DialogDescription>
          </DialogHeader>

          {createType === "site" ? (
            <div className="space-y-3 pt-2">
              <div>
                <label className="text-[11px] font-medium text-zinc-400 block mb-1">Domein *</label>
                <Input
                  placeholder="bijv. loonberekening.be"
                  value={newSite.domain}
                  onChange={(e) => setNewSite({ ...newSite, domain: e.target.value })}
                  className="bg-zinc-800 border-white/10"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-medium text-zinc-400 block mb-1">Status</label>
                  <Select value={newSite.status} onValueChange={(v) => setNewSite({ ...newSite, status: v })}>
                    <SelectTrigger className="bg-zinc-800 border-white/10"><SelectValue /></SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-white/10">
                      {SITE_STATUSES.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-[11px] font-medium text-zinc-400 block mb-1">Categorie</label>
                  <Select value={newSite.category} onValueChange={(v) => setNewSite({ ...newSite, category: v })}>
                    <SelectTrigger className="bg-zinc-800 border-white/10"><SelectValue /></SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-white/10">
                      {SITE_CATEGORIES.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-medium text-zinc-400 block mb-1">Inkomsten</label>
                  <Select value={newSite.revenueType} onValueChange={(v) => setNewSite({ ...newSite, revenueType: v })}>
                    <SelectTrigger className="bg-zinc-800 border-white/10"><SelectValue /></SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-white/10">
                      {REVENUE_TYPES.map((r) => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-[11px] font-medium text-zinc-400 block mb-1">Hosting</label>
                  <Select value={newSite.hosting} onValueChange={(v) => setNewSite({ ...newSite, hosting: v })}>
                    <SelectTrigger className="bg-zinc-800 border-white/10"><SelectValue /></SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-white/10">
                      {HOSTING_OPTIONS.map((h) => <SelectItem key={h.value} value={h.value}>{h.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3 pt-2">
              <div>
                <label className="text-[11px] font-medium text-zinc-400 block mb-1">Domein *</label>
                <Input
                  placeholder="bijv. schoorsteenveger.be"
                  value={newDomain.domain}
                  onChange={(e) => setNewDomain({ ...newDomain, domain: e.target.value })}
                  className="bg-zinc-800 border-white/10"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-medium text-zinc-400 block mb-1">Status</label>
                  <Select value={newDomain.status} onValueChange={(v) => setNewDomain({ ...newDomain, status: v })}>
                    <SelectTrigger className="bg-zinc-800 border-white/10"><SelectValue /></SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-white/10">
                      {DOMAIN_STATUSES.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-[11px] font-medium text-zinc-400 block mb-1">Prioriteit</label>
                  <Select value={newDomain.priority} onValueChange={(v) => setNewDomain({ ...newDomain, priority: v })}>
                    <SelectTrigger className="bg-zinc-800 border-white/10"><SelectValue /></SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-white/10">
                      <SelectItem value="high">Hoog</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Laag</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-[11px] font-medium text-zinc-400 block mb-1">Niche</label>
                <Input
                  placeholder="bijv. home-services, finance, tools"
                  value={newDomain.niche}
                  onChange={(e) => setNewDomain({ ...newDomain, niche: e.target.value })}
                  className="bg-zinc-800 border-white/10"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-zinc-400 block mb-1">Notities</label>
                <Textarea
                  placeholder="Optioneel..."
                  value={newDomain.notes}
                  onChange={(e) => setNewDomain({ ...newDomain, notes: e.target.value })}
                  className="bg-zinc-800 border-white/10"
                  rows={2}
                />
              </div>
            </div>
          )}

          <DialogFooter className="pt-3">
            <Button variant="outline" onClick={() => setCreateOpen(false)} className="border-white/10 text-zinc-400">
              Annuleren
            </Button>
            <Button
              onClick={createType === "site" ? handleCreateSite : handleCreateDomain}
              disabled={createSubmitting || (createType === "site" ? !newSite.domain.trim() : !newDomain.domain.trim())}
              className="bg-[#F5911E] hover:bg-[#e07d0a] text-white"
            >
              {createSubmitting ? "Bezig..." : "Toevoegen"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// Site Detail Panel
// ═══════════════════════════════════════════════════════════════
function SiteDetailPanel({
  site,
  editSite,
  setEditSite,
  editMode,
  setEditMode,
  saving,
  onSave,
  onDelete,
  tasks,
  onAddTask,
  onClose,
}: {
  site: Site
  editSite: Partial<Site>
  setEditSite: (v: Partial<Site>) => void
  editMode: boolean
  setEditMode: (v: boolean) => void
  saving: boolean
  onSave: () => void
  onDelete: () => void
  tasks: Task[]
  onAddTask: () => void
  onClose: () => void
}) {
  const st = siteStatusConfig[site.status] || siteStatusConfig.planned
  const catLabel = SITE_CATEGORIES.find(c => c.value === site.category)?.label || site.category || "—"
  const revLabel = REVENUE_TYPES.find(r => r.value === site.revenueType)?.label || site.revenueType || "—"

  return (
    <>
      <SheetHeader>
        <div className="flex items-start justify-between">
          <div>
            <SheetTitle className="text-white text-[18px]">{site.domain}</SheetTitle>
            <SheetDescription className="text-zinc-500 text-[12px] flex items-center gap-2 mt-1">
              <span className={cn("h-1.5 w-1.5 rounded-full", st.dot)} />
              {st.label} · {catLabel}
            </SheetDescription>
          </div>
          <button
            onClick={() => {
              if (editMode) { setEditMode(false) }
              else { setEditSite({ ...site }); setEditMode(true) }
            }}
            className={cn(
              "text-[10px] font-bold uppercase px-3 py-1.5 rounded-md transition-colors",
              editMode
                ? "bg-zinc-700 text-zinc-300"
                : "bg-[#F5911E]/15 text-[#F5911E] hover:bg-[#F5911E]/25"
            )}
          >
            {editMode ? "Annuleren" : "Bewerken"}
          </button>
        </div>
      </SheetHeader>

      {/* ── KPI summary ─────────────────────────────── */}
      <div className="grid grid-cols-3 gap-2 mt-5">
        <MiniStat label="MRR" value={`€${(site.monthlyRevenue || 0).toLocaleString("nl-BE")}`} />
        <MiniStat label="Verkeer" value={(site.monthlyTraffic || 0).toLocaleString("nl-BE")} />
        <MiniStat
          label="SEO"
          value={site.seoScore ? String(site.seoScore) : site.seoStatus || "—"}
          className={
            site.seoStatus === "good" || site.seoStatus === "growing" ? "text-emerald-400" :
            site.seoStatus === "warning" || site.seoStatus === "stable" ? "text-yellow-400" :
            site.seoStatus === "bad" || site.seoStatus === "declining" ? "text-red-400" : ""
          }
        />
      </div>

      {/* ── Edit / View fields ──────────────────────── */}
      <div className="mt-5 space-y-3 border-y border-white/[0.06] py-4">
        {editMode ? (
          <>
            <FieldSelect
              label="Status"
              value={editSite.status || ""}
              options={SITE_STATUSES.map(s => ({ value: s.value, label: s.label }))}
              onChange={(v) => setEditSite({ ...editSite, status: v })}
            />
            <FieldSelect
              label="Type site"
              value={editSite.category || ""}
              options={SITE_CATEGORIES.map(c => ({ value: c.value, label: c.label }))}
              onChange={(v) => setEditSite({ ...editSite, category: v })}
            />
            <FieldSelect
              label="Hosting"
              value={editSite.hosting || ""}
              options={HOSTING_OPTIONS.map(h => ({ value: h.value, label: h.label }))}
              onChange={(v) => setEditSite({ ...editSite, hosting: v })}
            />
            <FieldSelect
              label="Inkomsten type"
              value={editSite.revenueType || ""}
              options={REVENUE_TYPES.map(r => ({ value: r.value, label: r.label }))}
              onChange={(v) => setEditSite({ ...editSite, revenueType: v })}
            />
            <FieldInput
              label="MRR (€/maand)"
              type="number"
              value={String(editSite.monthlyRevenue || "")}
              onChange={(v) => setEditSite({ ...editSite, monthlyRevenue: v ? Number(v) : undefined })}
              placeholder="0"
            />
            <FieldInput
              label="Productie URL"
              value={editSite.productionUrl || ""}
              onChange={(v) => setEditSite({ ...editSite, productionUrl: v })}
              placeholder="https://..."
            />
            <FieldInput
              label="GitHub repo"
              value={editSite.githubRepo || ""}
              onChange={(v) => setEditSite({ ...editSite, githubRepo: v })}
              placeholder="Hazier007/..."
            />
            <FieldInput
              label="Tech stack"
              value={(editSite.techStack || []).join(", ")}
              onChange={(v) => setEditSite({ ...editSite, techStack: v.split(",").map(s => s.trim()).filter(Boolean) })}
              placeholder="Next.js, Tailwind, ..."
            />
            {/* Klant sectie */}
            <div className="pt-2 mt-2 border-t border-white/[0.06]">
              <p className="text-[9px] uppercase text-zinc-500 font-bold tracking-wider mb-2">Klant-info</p>
            </div>
            <FieldSelect
              label="Eigenaar"
              value={editSite.ownerType || "own"}
              options={[
                { value: "own", label: "Eigen site" },
                { value: "client", label: "Klantsite" },
              ]}
              onChange={(v) => setEditSite({ ...editSite, ownerType: v })}
            />
            {editSite.ownerType === "client" && (
              <>
                <FieldInput
                  label="Klantnaam"
                  value={editSite.clientName || ""}
                  onChange={(v) => setEditSite({ ...editSite, clientName: v })}
                  placeholder="Naam van de klant"
                />
                <FieldInput
                  label="Klant email"
                  value={editSite.clientEmail || ""}
                  onChange={(v) => setEditSite({ ...editSite, clientEmail: v })}
                  placeholder="email@klant.be"
                />
                <FieldSelect
                  label="Contract type"
                  value={editSite.contractType || ""}
                  options={[
                    { value: "retainer", label: "Retainer (maandelijks)" },
                    { value: "eenmalig", label: "Eenmalig project" },
                    { value: "mixed", label: "Mix" },
                  ]}
                  onChange={(v) => setEditSite({ ...editSite, contractType: v })}
                />
                <FieldInput
                  label="Maandelijkse fee (€)"
                  type="number"
                  value={String(editSite.monthlyFee || "")}
                  onChange={(v) => setEditSite({ ...editSite, monthlyFee: v ? Number(v) : undefined })}
                  placeholder="0"
                />
              </>
            )}
            <div>
              <label className="text-[9px] uppercase text-zinc-500 font-semibold tracking-wider">Notities</label>
              <Textarea
                value={editSite.notes || ""}
                onChange={(e) => setEditSite({ ...editSite, notes: e.target.value })}
                className="mt-1 bg-zinc-800/50 border-white/[0.08] text-white text-[12px] placeholder:text-zinc-600 min-h-[60px]"
                placeholder="Notities over deze site..."
              />
            </div>
            <div>
              <label className="text-[9px] uppercase text-zinc-500 font-semibold tracking-wider">Volgende actie</label>
              <Input
                value={editSite.nextAction || ""}
                onChange={(e) => setEditSite({ ...editSite, nextAction: e.target.value })}
                className="mt-1 bg-zinc-800/50 border-white/[0.08] text-white text-[12px] placeholder:text-zinc-600"
                placeholder="Wat moet er volgende gebeuren?"
              />
            </div>
          </>
        ) : (
          <>
            <DetailRow label="Type site" value={catLabel} />
            <DetailRow label="Inkomsten type" value={revLabel} />
            <DetailRow label="Hosting" value={HOSTING_OPTIONS.find(h => h.value === site.hosting)?.label || site.hosting || "—"} />
            <DetailRow label="Productie URL" value={site.productionUrl || "—"} link={site.productionUrl} />
            <DetailRow label="GitHub" value={site.githubRepo || "—"} />
            <DetailRow label="Tech stack" value={(site.techStack || []).join(", ") || "—"} />
            {/* Klant-info view */}
            {site.ownerType === "client" && (
              <>
                <div className="pt-2 mt-2 border-t border-white/[0.06]">
                  <p className="text-[9px] uppercase text-[#F5911E] font-bold tracking-wider mb-2">Klant</p>
                </div>
                <DetailRow label="Klantnaam" value={site.clientName || "—"} />
                {site.clientEmail && <DetailRow label="Email" value={site.clientEmail} />}
                {site.contractType && <DetailRow label="Contract" value={site.contractType} />}
                {site.monthlyFee != null && site.monthlyFee > 0 && (
                  <DetailRow label="Maandelijkse fee" value={`€${site.monthlyFee.toLocaleString("nl-BE")}`} />
                )}
              </>
            )}
            {site.topKeyword && (
              <DetailRow
                label="Top keyword"
                value={`${site.topKeyword}${site.topPosition ? ` (#${site.topPosition})` : ""}`}
              />
            )}
            {site.nextAction && (
              <div>
                <p className="text-[9px] uppercase text-zinc-500 font-semibold tracking-wider mb-1">Volgende actie</p>
                <p className="text-[12px] text-zinc-300 whitespace-pre-wrap">{site.nextAction}</p>
              </div>
            )}
            {site.notes && (
              <div>
                <p className="text-[9px] uppercase text-zinc-500 font-semibold tracking-wider mb-1">Notities</p>
                <p className="text-[12px] text-zinc-300 whitespace-pre-wrap">{site.notes}</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Save button (edit mode) ─────────────────── */}
      {editMode && (
        <div className="mt-3">
          <Button
            onClick={onSave}
            disabled={saving}
            className="w-full bg-[#F5911E] hover:bg-[#F5911E]/90 text-black font-semibold"
          >
            {saving ? "Opslaan…" : "Wijzigingen opslaan"}
          </Button>
        </div>
      )}

      {/* ── Linked tasks ────────────────────────────── */}
      <TaskList tasks={tasks} onAddTask={onAddTask} entityLabel="site" />

      {/* ── Footer actions ──────────────────────────── */}
      <div className="mt-6 pt-4 border-t border-white/[0.06] space-y-2">
        <Button
          variant="outline"
          onClick={onClose}
          className="w-full border-white/[0.08] bg-transparent text-zinc-400 hover:bg-white/[0.04] hover:text-white"
        >
          Sluiten
        </Button>
        <button
          onClick={onDelete}
          className="w-full text-[10px] text-red-400/60 hover:text-red-400 transition-colors py-2"
        >
          Site verwijderen
        </button>
      </div>
    </>
  )
}

// ═══════════════════════════════════════════════════════════════
// Domain Detail Panel
// ═══════════════════════════════════════════════════════════════
function DomainDetailPanel({
  domain,
  editDomain,
  setEditDomain,
  editMode,
  setEditMode,
  saving,
  onSave,
  onDelete,
  onPromote,
  tasks,
  onAddTask,
  onClose,
}: {
  domain: DomainOpportunity
  editDomain: Partial<DomainOpportunity>
  setEditDomain: (v: Partial<DomainOpportunity>) => void
  editMode: boolean
  setEditMode: (v: boolean) => void
  saving: boolean
  onSave: () => void
  onDelete: () => void
  onPromote: () => void
  tasks: Task[]
  onAddTask: () => void
  onClose: () => void
}) {
  const st = domainStatusConfig[domain.status] || domainStatusConfig.parking

  return (
    <>
      <SheetHeader>
        <div className="flex items-start justify-between">
          <div>
            <SheetTitle className="text-white text-[18px]">{domain.domain}</SheetTitle>
            <SheetDescription className="text-zinc-500 text-[12px] flex items-center gap-2 mt-1">
              <span className={cn("h-1.5 w-1.5 rounded-full", st.dot)} />
              {st.label}
              {domain.priority && (
                <span className={cn(
                  "text-[8px] font-bold uppercase rounded-full px-2 py-0.5 border ml-2",
                  priorityColors[domain.priority] || priorityColors.low
                )}>
                  {domain.priority}
                </span>
              )}
            </SheetDescription>
          </div>
          <button
            onClick={() => {
              if (editMode) { setEditMode(false) }
              else { setEditDomain({ ...domain }); setEditMode(true) }
            }}
            className={cn(
              "text-[10px] font-bold uppercase px-3 py-1.5 rounded-md transition-colors",
              editMode
                ? "bg-zinc-700 text-zinc-300"
                : "bg-[#F5911E]/15 text-[#F5911E] hover:bg-[#F5911E]/25"
            )}
          >
            {editMode ? "Annuleren" : "Bewerken"}
          </button>
        </div>
      </SheetHeader>

      {/* ── Edit / View fields ──────────────────────── */}
      <div className="mt-5 space-y-3 border-y border-white/[0.06] py-4">
        {editMode ? (
          <>
            <FieldSelect
              label="Status"
              value={editDomain.status || ""}
              options={DOMAIN_STATUSES.map(s => ({ value: s.value, label: s.label }))}
              onChange={(v) => setEditDomain({ ...editDomain, status: v })}
            />
            <FieldSelect
              label="Prioriteit"
              value={editDomain.priority || ""}
              options={[
                { value: "high", label: "High" },
                { value: "medium", label: "Medium" },
                { value: "low", label: "Low" },
              ]}
              onChange={(v) => setEditDomain({ ...editDomain, priority: v })}
            />
            <FieldInput
              label="Niche"
              value={editDomain.niche || ""}
              onChange={(v) => setEditDomain({ ...editDomain, niche: v })}
              placeholder="bv. slotenmaker, daklekkages..."
            />
            <FieldInput
              label="Categorie"
              value={editDomain.category || ""}
              onChange={(v) => setEditDomain({ ...editDomain, category: v })}
              placeholder="bv. leadgen, tool, rank-rent..."
            />
            <FieldInput
              label="Geschatte waarde (€)"
              type="number"
              value={String(editDomain.estimatedValue || "")}
              onChange={(v) => setEditDomain({ ...editDomain, estimatedValue: v ? Number(v) : undefined })}
              placeholder="0"
            />
            <FieldInput
              label="Provider"
              value={editDomain.provider || ""}
              onChange={(v) => setEditDomain({ ...editDomain, provider: v })}
              placeholder="bv. transip, combell, cloudflare..."
            />
            <div>
              <label className="text-[9px] uppercase text-zinc-500 font-semibold tracking-wider">Notities</label>
              <Textarea
                value={editDomain.notes || ""}
                onChange={(e) => setEditDomain({ ...editDomain, notes: e.target.value })}
                className="mt-1 bg-zinc-800/50 border-white/[0.08] text-white text-[12px] placeholder:text-zinc-600 min-h-[60px]"
                placeholder="Notities, ideeën, plannen..."
              />
            </div>
            {editDomain.status === "sold" && (
              <div className="rounded-lg border border-violet-500/20 bg-violet-500/5 p-3 space-y-3">
                <p className="text-[10px] uppercase tracking-wider text-violet-400 font-semibold">Verkoopgegevens</p>
                <div className="grid grid-cols-2 gap-3">
                  <FieldInput
                    label="Verkoopprijs"
                    type="number"
                    value={String(editDomain.soldPrice ?? "")}
                    onChange={(v) => setEditDomain({ ...editDomain, soldPrice: v ? Number(v) : undefined })}
                    placeholder="50"
                  />
                  <div>
                    <label className="text-[9px] uppercase text-zinc-500 font-semibold tracking-wider">Munt</label>
                    <Select
                      value={editDomain.soldCurrency || "USD"}
                      onValueChange={(v) => setEditDomain({ ...editDomain, soldCurrency: v })}
                    >
                      <SelectTrigger className="mt-1 h-8 bg-zinc-800/50 border-white/[0.08] text-white text-[12px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <FieldInput
                  label="Verkoopdatum"
                  type="date"
                  value={editDomain.soldAt ? editDomain.soldAt.slice(0, 10) : ""}
                  onChange={(v) => setEditDomain({ ...editDomain, soldAt: v || undefined })}
                  placeholder=""
                />
                <FieldInput
                  label="Verkocht aan"
                  value={editDomain.soldTo || ""}
                  onChange={(v) => setEditDomain({ ...editDomain, soldTo: v })}
                  placeholder="bv. Sedo, Dan.com, privékoper..."
                />
              </div>
            )}
          </>
        ) : (
          <>
            <DetailRow label="Prioriteit" value={domain.priority || "—"} />
            <DetailRow label="Niche" value={domain.niche || "—"} />
            <DetailRow label="Categorie" value={domain.category || "—"} />
            <DetailRow
              label="Geschatte waarde"
              value={domain.estimatedValue ? `€${domain.estimatedValue.toLocaleString("nl-BE")}` : "—"}
            />
            <DetailRow label="Provider" value={domain.provider || "—"} />
            {domain.renewalDate && (
              <DetailRow label="Verlenging" value={new Date(domain.renewalDate).toLocaleDateString("nl-BE")} />
            )}
            {domain.status === "sold" && (
              <div className="rounded-lg border border-violet-500/20 bg-violet-500/5 p-3 space-y-1.5">
                <p className="text-[10px] uppercase tracking-wider text-violet-400 font-semibold mb-2">Verkocht</p>
                <DetailRow
                  label="Verkoopprijs"
                  value={
                    domain.soldPrice != null
                      ? `${domain.soldCurrency === "EUR" ? "€" : "$"}${domain.soldPrice.toLocaleString("nl-BE")}`
                      : "—"
                  }
                />
                <DetailRow
                  label="Verkoopdatum"
                  value={domain.soldAt ? new Date(domain.soldAt).toLocaleDateString("nl-BE") : "—"}
                />
                <DetailRow label="Aan" value={domain.soldTo || "—"} />
              </div>
            )}
            {domain.radarNotes && (
              <div>
                <p className="text-[9px] uppercase text-zinc-500 font-semibold tracking-wider mb-1">RADAR notities</p>
                <p className="text-[12px] text-zinc-300 whitespace-pre-wrap">{domain.radarNotes}</p>
              </div>
            )}
            {domain.notes && (
              <div>
                <p className="text-[9px] uppercase text-zinc-500 font-semibold tracking-wider mb-1">Notities</p>
                <p className="text-[12px] text-zinc-300 whitespace-pre-wrap">{domain.notes}</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Save button (edit mode) ─────────────────── */}
      {editMode && (
        <div className="mt-3">
          <Button
            onClick={onSave}
            disabled={saving}
            className="w-full bg-[#F5911E] hover:bg-[#F5911E]/90 text-black font-semibold"
          >
            {saving ? "Opslaan…" : "Wijzigingen opslaan"}
          </Button>
        </div>
      )}

      {/* ── Linked tasks ────────────────────────────── */}
      <TaskList tasks={tasks} onAddTask={onAddTask} entityLabel="domein" />

      {/* ── Footer actions ──────────────────────────── */}
      <div className="mt-6 pt-4 border-t border-white/[0.06] space-y-2">
        {domain.status === "sold" ? (
          <div className="w-full rounded-md border border-violet-500/20 bg-violet-500/5 px-3 py-2 text-[11px] text-violet-300 text-center">
            Verkocht domein — converteren niet mogelijk
          </div>
        ) : (
          <Button
            onClick={onPromote}
            className="w-full bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 font-semibold border border-emerald-500/20"
          >
            ⤴ Converteer naar site
          </Button>
        )}
        <Button
          variant="outline"
          onClick={onClose}
          className="w-full border-white/[0.08] bg-transparent text-zinc-400 hover:bg-white/[0.04] hover:text-white"
        >
          Sluiten
        </Button>
        <button
          onClick={onDelete}
          className="w-full text-[10px] text-red-400/60 hover:text-red-400 transition-colors py-2"
        >
          Domein verwijderen
        </button>
      </div>
    </>
  )
}

// ═══════════════════════════════════════════════════════════════
// Shared sub-components
// ═══════════════════════════════════════════════════════════════

function MiniStat({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className="rounded-lg bg-zinc-800/40 p-3">
      <p className="text-[9px] uppercase text-zinc-500 font-semibold">{label}</p>
      <p className={cn("text-lg font-bold text-white tabular-nums", className)}>{value}</p>
    </div>
  )
}

function DetailRow({ label, value, link }: { label: string; value: string; link?: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <p className="text-[10px] uppercase text-zinc-500 font-semibold tracking-wider shrink-0">{label}</p>
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] text-[#F5911E] hover:underline text-right truncate"
        >
          {value}
        </a>
      ) : (
        <p className="text-[12px] text-zinc-300 text-right truncate">{value}</p>
      )}
    </div>
  )
}

function FieldInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <div>
      <label className="text-[9px] uppercase text-zinc-500 font-semibold tracking-wider">{label}</label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 bg-zinc-800/50 border-white/[0.08] text-white text-[12px] placeholder:text-zinc-600"
      />
    </div>
  )
}

function FieldSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: { value: string; label: string }[]
  onChange: (v: string) => void
}) {
  return (
    <div>
      <label className="text-[9px] uppercase text-zinc-500 font-semibold tracking-wider">{label}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="mt-1 bg-zinc-800/50 border-white/[0.08] text-white text-[12px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-zinc-900 border-white/[0.08] text-white">
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

function TaskList({
  tasks,
  onAddTask,
  entityLabel,
}: {
  tasks: Task[]
  onAddTask: () => void
  entityLabel: string
}) {
  return (
    <div className="mt-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">
          Open tasks ({tasks.length})
        </p>
        <button
          onClick={onAddTask}
          className="rounded-md bg-[#F5911E]/15 hover:bg-[#F5911E]/25 text-[#F5911E] text-[11px] font-semibold px-2.5 py-1 transition-colors"
        >
          + Taak
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="text-[11px] text-zinc-600 italic">
          Nog geen open tasks voor deze {entityLabel}
        </p>
      ) : (
        <div className="space-y-2">
          {tasks.slice(0, 10).map((t) => (
            <div key={t.id} className="rounded-lg border border-white/[0.06] bg-zinc-800/30 p-3">
              <div className="flex items-start justify-between gap-2">
                <p className="text-[12px] font-medium text-white flex-1">{t.title}</p>
                {t.priority && (
                  <span
                    className={cn(
                      "text-[8px] font-bold uppercase rounded-full px-2 py-0.5 border shrink-0",
                      priorityColors[t.priority] || priorityColors.low
                    )}
                  >
                    {t.priority}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 mt-1.5 text-[10px] text-zinc-500">
                <span className={cn("font-semibold", taskStatusColors[t.status] || "text-zinc-500")}>
                  {t.status}
                </span>
                {t.assignee && <span className="uppercase">{t.assignee}</span>}
                {t.category && <span>· {t.category}</span>}
              </div>
            </div>
          ))}
          {tasks.length > 10 && (
            <p className="text-[10px] text-zinc-600 text-center">
              +{tasks.length - 10} meer — zie /werk
            </p>
          )}
        </div>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// QuickAddTaskModal
// ═══════════════════════════════════════════════════════════════
interface QuickAddTaskModalProps {
  open: boolean
  onOpenChange: (v: boolean) => void
  context: { scope: "site" | "domain"; id: string; label: string } | null
  existingTasks: Task[]
  onCreated: () => void
}

function QuickAddTaskModal({
  open,
  onOpenChange,
  context,
  existingTasks,
  onCreated,
}: QuickAddTaskModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [assignee, setAssignee] = useState<string>("atlas")
  const [priority, setPriority] = useState<string>("medium")
  const [category, setCategory] = useState<string>("general")
  const [submitting, setSubmitting] = useState(false)
  const [duplicateWarning, setDuplicateWarning] = useState<Task | null>(null)

  useEffect(() => {
    if (open) {
      setTitle("")
      setDescription("")
      setAssignee("claude")
      setPriority("medium")
      setCategory("general")
      setDuplicateWarning(null)
    }
  }, [open])

  // Dedup check
  useEffect(() => {
    if (!context || !title.trim() || title.length < 4) {
      setDuplicateWarning(null)
      return
    }
    const needle = title.trim().toLowerCase()
    const match = existingTasks.find((t) => {
      if (t.status === "done") return false
      if (context.scope === "site" && t.siteId !== context.id) return false
      if (context.scope === "domain" && t.linkedDomainId !== context.id) return false
      return t.title.toLowerCase().includes(needle) || needle.includes(t.title.toLowerCase())
    })
    setDuplicateWarning(match || null)
  }, [title, context, existingTasks])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!context || !title.trim()) return
    setSubmitting(true)
    try {
      const payload: Record<string, unknown> = {
        title: title.trim(),
        description: description.trim() || undefined,
        status: "todo",
        priority,
        assignee,
        category,
        source: "manual",
      }
      if (context.scope === "site") payload.siteId = context.id
      if (context.scope === "domain") payload.linkedDomainId = context.id

      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error("Kon taak niet aanmaken")
      onCreated()
    } catch (err) {
      alert("Fout: " + (err instanceof Error ? err.message : "onbekend"))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 border border-white/[0.08] text-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-white">Nieuwe taak</DialogTitle>
          <DialogDescription className="text-zinc-500">
            {context
              ? `Gekoppeld aan ${context.scope === "site" ? "site" : "domein"}: ${context.label}`
              : "—"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <label className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">Titel</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Wat moet er gebeuren?"
              className="mt-1 bg-zinc-800/50 border-white/[0.08] text-white placeholder:text-zinc-600"
              required
              autoFocus
            />
            {duplicateWarning && (
              <p className="mt-2 text-[11px] text-yellow-400 bg-yellow-500/5 border border-yellow-500/20 rounded-md px-2.5 py-1.5">
                Lijkt op bestaande open taak: <strong>{duplicateWarning.title}</strong> ({duplicateWarning.assignee || "—"} · {duplicateWarning.status})
              </p>
            )}
          </div>

          <div>
            <label className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">Omschrijving (optioneel)</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Extra context voor de agent…"
              className="mt-1 bg-zinc-800/50 border-white/[0.08] text-white placeholder:text-zinc-600 min-h-[70px]"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">Agent</label>
              <Select value={assignee} onValueChange={setAssignee}>
                <SelectTrigger className="mt-1 bg-zinc-800/50 border-white/[0.08] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-white/[0.08] text-white">
                  {AGENTS.map((a) => (
                    <SelectItem key={a} value={a} className="capitalize">{a}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">Prioriteit</label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="mt-1 bg-zinc-800/50 border-white/[0.08] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-white/[0.08] text-white">
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">Categorie</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="mt-1 bg-zinc-800/50 border-white/[0.08] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-white/[0.08] text-white">
                  <SelectItem value="general">Algemeen</SelectItem>
                  <SelectItem value="seo">SEO</SelectItem>
                  <SelectItem value="content">Content</SelectItem>
                  <SelectItem value="dev">Dev</SelectItem>
                  <SelectItem value="research">Research</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-white/[0.08] bg-transparent text-zinc-400 hover:bg-white/[0.04] hover:text-white"
            >
              Annuleren
            </Button>
            <Button
              type="submit"
              disabled={submitting || !title.trim()}
              className="bg-[#F5911E] hover:bg-[#F5911E]/90 text-black font-semibold"
            >
              {submitting ? "Bezig…" : duplicateWarning ? "Toch aanmaken" : "Aanmaken"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
