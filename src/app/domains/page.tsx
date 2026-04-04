"use client"

import { useState, useEffect, useCallback } from "react"
import {
  Plus,
  Search,
  Globe,
  Zap,
  ListTodo,
  StickyNote,
  Sparkles,
  ParkingCircle,
  Target,
  ShoppingCart,
  Tag,
  DollarSign,
  Filter,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// ─── Types ─────────────────────────────────────────────────

interface DomainRecord {
  id: string
  domain: string
  status: string
  estimatedValue?: number
  niche?: string
  priority?: string
  notes?: string
  radarNotes?: string
  linkedIdeaId?: string
  businessUnit?: string
  hasIdea?: boolean
  category?: string
  createdAt: string
  updatedAt: string
}

interface IdeaRecord {
  id: string
  title: string
  description: string
  category: string
  priority: string
  status: string
  scoreOverall?: number
  scoreFeasibility?: number
  scoreRevenuePotential?: number
  scoreTimeToRevenue?: number
  scoreCompetition?: number
  scoreStrategicFit?: number
  recommendation?: string
}

// ─── Helpers ───────────────────────────────────────────────

const STATUS_CONFIG: Record<string, { label: string; cls: string }> = {
  parking:            { label: "Parking",          cls: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30" },
  prospect:           { label: "Prospect",         cls: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  acquired:           { label: "Acquired",         cls: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  forsale:            { label: "Te koop",          cls: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  "expired-watching": { label: "Watching",         cls: "bg-red-500/20 text-red-400 border-red-500/30" },
  developing:         { label: "In ontwikkeling",  cls: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
}

const PRIORITY_CONFIG: Record<string, { label: string; cls: string }> = {
  high:   { label: "Hoog",   cls: "bg-red-500/20 text-red-400 border-red-500/30" },
  medium: { label: "Medium", cls: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  low:    { label: "Laag",   cls: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30" },
}

function formatEuro(n?: number): string {
  if (n == null) return "-"
  return n.toLocaleString("nl-BE", { style: "currency", currency: "EUR", minimumFractionDigits: 0 })
}

function sparkColor(score: number): string {
  if (score >= 7.5) return "text-emerald-400"
  if (score >= 5) return "text-yellow-400"
  return "text-red-400"
}

function sparkBarColor(score: number): string {
  if (score >= 7.5) return "bg-emerald-500"
  if (score >= 5) return "bg-yellow-500"
  return "bg-red-500"
}

// ─── Component ─────────────────────────────────────────────

export default function DomainsPage() {
  const [domains, setDomains] = useState<DomainRecord[]>([])
  const [ideas, setIdeas] = useState<IdeaRecord[]>([])
  const [loading, setLoading] = useState(true)

  // Filters
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [hasIdeaFilter, setHasIdeaFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [nicheFilter, setNicheFilter] = useState("")

  // Dialog
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [sparkLoading, setSparkLoading] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    domain: "",
    status: "parking",
    priority: "medium",
    niche: "",
    estimatedValue: "",
    businessUnit: "",
    notes: "",
  })

  // ─── Data Loading ──────────────────────────────────────────

  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      const [domainsRes, ideasRes] = await Promise.all([
        fetch("/api/domain-opportunities"),
        fetch("/api/ideas"),
      ])
      const [domainsData, ideasData] = await Promise.all([
        domainsRes.json(),
        ideasRes.json(),
      ])
      setDomains(Array.isArray(domainsData) ? domainsData : [])
      setIdeas(Array.isArray(ideasData) ? ideasData : [])
    } catch (error) {
      console.error("Failed to load data:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  // ─── Filtering ─────────────────────────────────────────────

  const filtered = domains.filter((d) => {
    if (searchTerm && !d.domain.toLowerCase().includes(searchTerm.toLowerCase())) return false
    if (statusFilter !== "all" && d.status !== statusFilter) return false
    if (hasIdeaFilter === "yes" && !d.hasIdea) return false
    if (hasIdeaFilter === "no" && d.hasIdea) return false
    if (priorityFilter !== "all" && d.priority !== priorityFilter) return false
    if (nicheFilter && !d.niche?.toLowerCase().includes(nicheFilter.toLowerCase())) return false
    return true
  })

  // ─── Stats ─────────────────────────────────────────────────

  const totalCount = domains.length
  const parkingCount = domains.filter((d) => d.status === "parking").length
  const prospectCount = domains.filter((d) => d.status === "prospect").length
  const acquiredCount = domains.filter((d) => d.status === "acquired").length
  const withIdeaCount = domains.filter((d) => d.hasIdea).length

  // ─── Idea lookup ───────────────────────────────────────────

  const ideasMap = new Map(ideas.map((i) => [i.id, i]))

  function getLinkedIdea(d: DomainRecord): IdeaRecord | undefined {
    if (!d.linkedIdeaId) return undefined
    return ideasMap.get(d.linkedIdeaId)
  }

  // ─── Actions ───────────────────────────────────────────────

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setSubmitting(true)
      await fetch("/api/domain-opportunities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          domain: formData.domain,
          status: formData.status,
          priority: formData.priority,
          niche: formData.niche || undefined,
          estimatedValue: formData.estimatedValue ? parseFloat(formData.estimatedValue) : undefined,
          businessUnit: formData.businessUnit || undefined,
          notes: formData.notes || undefined,
        }),
      })
      setIsCreateOpen(false)
      setFormData({ domain: "", status: "parking", priority: "medium", niche: "", estimatedValue: "", businessUnit: "", notes: "" })
      await loadData()
    } catch (error) {
      console.error("Failed to create domain:", error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleSparkEvaluate = async (domain: DomainRecord) => {
    try {
      setSparkLoading(domain.id)

      // 1. Create idea for SPARK
      const ideaRes = await fetch("/api/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: `Domein evaluatie: ${domain.domain}`,
          description: `Evalueer potentieel van ${domain.domain}`,
          category: "domain_acquisition",
          priority: "medium",
          status: "raw",
          assignedTo: "spark",
        }),
      })
      const newIdea = await ideaRes.json()

      // 2. Link idea to domain
      await fetch(`/api/domain-opportunities/${domain.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          linkedIdeaId: newIdea.id,
          hasIdea: true,
        }),
      })

      await loadData()
    } catch (error) {
      console.error("Failed to create SPARK evaluation:", error)
    } finally {
      setSparkLoading(null)
    }
  }

  // ─── Render ────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
        <div className="flex justify-center items-center h-64">
          <div className="flex items-center gap-3 text-zinc-400">
            <Globe className="h-5 w-5 animate-pulse" />
            <span>Domeinen laden...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
      {/* ─── Header ─────────────────────────────────────────── */}
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between cc-animate-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Domeinen</h1>
          <p className="text-sm text-zinc-500 mt-1">
            {totalCount} domeinen &middot; {withIdeaCount} met SPARK evaluatie
          </p>
        </div>

        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#F5911E] hover:bg-[#e07d0a] text-white">
              <Plus className="mr-2 h-4 w-4" />
              Nieuw domein
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-zinc-950 border-white/[0.06]">
            <DialogHeader>
              <DialogTitle>Nieuw domein toevoegen</DialogTitle>
              <DialogDescription>
                Voeg een domein toe aan je portfolio
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label htmlFor="create-domain" className="text-sm font-medium text-zinc-300">Domein *</label>
                <Input
                  id="create-domain"
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  placeholder="voorbeeld.be"
                  required
                  className="mt-1 bg-white/[0.02] border-white/[0.06]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="create-status" className="text-sm font-medium text-zinc-300">Status</label>
                  <select
                    id="create-status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="mt-1 flex h-9 w-full rounded-md border border-white/[0.06] bg-white/[0.02] px-3 py-1 text-sm text-zinc-200 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F5911E]"
                  >
                    <option value="parking">Parking</option>
                    <option value="prospect">Prospect</option>
                    <option value="acquired">Acquired</option>
                    <option value="forsale">Te koop</option>
                    <option value="expired-watching">Expired - watching</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="create-priority" className="text-sm font-medium text-zinc-300">Prioriteit</label>
                  <select
                    id="create-priority"
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="mt-1 flex h-9 w-full rounded-md border border-white/[0.06] bg-white/[0.02] px-3 py-1 text-sm text-zinc-200 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F5911E]"
                  >
                    <option value="low">Laag</option>
                    <option value="medium">Medium</option>
                    <option value="high">Hoog</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="create-value" className="text-sm font-medium text-zinc-300">Geschatte waarde (EUR)</label>
                  <Input
                    id="create-value"
                    type="number"
                    value={formData.estimatedValue}
                    onChange={(e) => setFormData({ ...formData, estimatedValue: e.target.value })}
                    placeholder="0"
                    min="0"
                    step="1"
                    className="mt-1 bg-white/[0.02] border-white/[0.06]"
                  />
                </div>
                <div>
                  <label htmlFor="create-niche" className="text-sm font-medium text-zinc-300">Niche</label>
                  <Input
                    id="create-niche"
                    value={formData.niche}
                    onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                    placeholder="bijv. vastgoed"
                    className="mt-1 bg-white/[0.02] border-white/[0.06]"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="create-bu" className="text-sm font-medium text-zinc-300">Business Unit</label>
                <select
                  id="create-bu"
                  value={formData.businessUnit}
                  onChange={(e) => setFormData({ ...formData, businessUnit: e.target.value })}
                  className="mt-1 flex h-9 w-full rounded-md border border-white/[0.06] bg-white/[0.02] px-3 py-1 text-sm text-zinc-200 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F5911E]"
                >
                  <option value="">-- Geen --</option>
                  <option value="agency">Agency</option>
                  <option value="rankrent">Rank & Rent</option>
                  <option value="affiliate">Affiliate</option>
                  <option value="tools">Tools</option>
                  <option value="leadgen">Leadgen</option>
                </select>
              </div>
              <div>
                <label htmlFor="create-notes" className="text-sm font-medium text-zinc-300">Notities</label>
                <Input
                  id="create-notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Extra informatie"
                  className="mt-1 bg-white/[0.02] border-white/[0.06]"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <Button type="submit" className="flex-1 bg-[#F5911E] hover:bg-[#e07d0a] text-white" disabled={submitting}>
                  {submitting ? "Opslaan..." : "Toevoegen"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)} className="border-white/[0.06]">
                  Annuleren
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </header>

      {/* ─── Stats Row ──────────────────────────────────────── */}
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { label: "Totaal domeinen", value: totalCount, icon: <Globe className="h-4 w-4 text-zinc-500" /> },
          { label: "Parking", value: parkingCount, icon: <ParkingCircle className="h-4 w-4 text-zinc-500" /> },
          { label: "Prospect", value: prospectCount, icon: <Target className="h-4 w-4 text-blue-400" /> },
          { label: "Acquired", value: acquiredCount, icon: <ShoppingCart className="h-4 w-4 text-emerald-400" /> },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className={`cc-animate-in cc-stagger-${i + 1} rounded-xl border border-white/[0.06] bg-white/[0.02] p-4`}
          >
            <div className="flex items-center justify-between">
              <p className="text-xs text-zinc-500 uppercase tracking-wider">{stat.label}</p>
              {stat.icon}
            </div>
            <p className="mt-2 text-2xl font-bold text-zinc-100">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* ─── Filters ────────────────────────────────────────── */}
      <div className="mt-6 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 cc-animate-in cc-stagger-5">
        <div className="flex items-center gap-2 text-xs text-zinc-500 uppercase tracking-wider mb-3">
          <Filter className="h-3.5 w-3.5" />
          Filters
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <Input
              placeholder="Zoek domein..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-white/[0.02] border-white/[0.06]"
            />
          </div>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="flex h-9 w-full rounded-md border border-white/[0.06] bg-white/[0.02] px-3 py-1 text-sm text-zinc-200 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F5911E]"
          >
            <option value="all">Alle statussen</option>
            <option value="parking">Parking</option>
            <option value="prospect">Prospect</option>
            <option value="acquired">Acquired</option>
            <option value="forsale">Te koop</option>
            <option value="expired-watching">Expired watching</option>
          </select>

          {/* Has Idea */}
          <select
            value={hasIdeaFilter}
            onChange={(e) => setHasIdeaFilter(e.target.value)}
            className="flex h-9 w-full rounded-md border border-white/[0.06] bg-white/[0.02] px-3 py-1 text-sm text-zinc-200 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F5911E]"
          >
            <option value="all">SPARK: Alle</option>
            <option value="yes">Met evaluatie</option>
            <option value="no">Zonder evaluatie</option>
          </select>

          {/* Priority */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="flex h-9 w-full rounded-md border border-white/[0.06] bg-white/[0.02] px-3 py-1 text-sm text-zinc-200 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F5911E]"
          >
            <option value="all">Alle prioriteiten</option>
            <option value="high">Hoog</option>
            <option value="medium">Medium</option>
            <option value="low">Laag</option>
          </select>

          {/* Niche */}
          <Input
            placeholder="Niche filter..."
            value={nicheFilter}
            onChange={(e) => setNicheFilter(e.target.value)}
            className="bg-white/[0.02] border-white/[0.06]"
          />
        </div>
      </div>

      {/* ─── Results count ──────────────────────────────────── */}
      <div className="mt-4 text-xs text-zinc-500 cc-animate-in">
        {filtered.length} van {totalCount} domeinen
      </div>

      {/* ─── Domain List ────────────────────────────────────── */}
      <div className="mt-3 space-y-2">
        {filtered.map((domain, i) => {
          const sc = STATUS_CONFIG[domain.status] || STATUS_CONFIG.parking
          const pc = PRIORITY_CONFIG[domain.priority || "medium"] || PRIORITY_CONFIG.medium
          const linkedIdea = getLinkedIdea(domain)

          return (
            <div
              key={domain.id}
              className={`cc-animate-in cc-stagger-${Math.min(i + 1, 10)} rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 hover:border-white/[0.12] transition-colors`}
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                {/* Left: domain info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-base font-semibold text-zinc-100 font-mono tracking-tight truncate">
                      {domain.domain}
                    </span>
                    <Badge variant="outline" className={`text-[11px] ${sc.cls}`}>
                      {sc.label}
                    </Badge>
                    <Badge variant="outline" className={`text-[11px] ${pc.cls}`}>
                      {pc.label}
                    </Badge>
                    {domain.niche && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-zinc-500">
                        <Tag className="h-3 w-3" />
                        {domain.niche}
                      </span>
                    )}
                    {domain.businessUnit && (
                      <span className="text-[11px] text-zinc-600 bg-zinc-800/50 px-1.5 py-0.5 rounded">
                        {domain.businessUnit}
                      </span>
                    )}
                  </div>

                  {/* Second row: value + SPARK score + notes */}
                  <div className="mt-2 flex items-center gap-4 flex-wrap">
                    {domain.estimatedValue != null && domain.estimatedValue > 0 && (
                      <span className="inline-flex items-center gap-1 text-sm text-zinc-300">
                        <DollarSign className="h-3.5 w-3.5 text-emerald-500" />
                        {formatEuro(domain.estimatedValue)}
                      </span>
                    )}

                    {/* SPARK score */}
                    {linkedIdea?.scoreOverall != null && (
                      <span className="inline-flex items-center gap-2 text-sm">
                        <Sparkles className="h-3.5 w-3.5 text-[#F5911E]" />
                        <span className={`font-semibold tabular-nums ${sparkColor(linkedIdea.scoreOverall)}`}>
                          {linkedIdea.scoreOverall.toFixed(1)}
                        </span>
                        <div className="w-16 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${sparkBarColor(linkedIdea.scoreOverall)}`}
                            style={{ width: `${(linkedIdea.scoreOverall / 10) * 100}%` }}
                          />
                        </div>
                        {linkedIdea.recommendation && (
                          <span className={`text-[10px] uppercase font-medium ${
                            linkedIdea.recommendation === "build"
                              ? "text-emerald-400"
                              : linkedIdea.recommendation === "investigate"
                                ? "text-yellow-400"
                                : "text-zinc-500"
                          }`}>
                            {linkedIdea.recommendation}
                          </span>
                        )}
                      </span>
                    )}

                    {domain.hasIdea && !linkedIdea?.scoreOverall && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-zinc-500">
                        <Sparkles className="h-3 w-3 text-[#F5911E]/50" />
                        SPARK: wacht op evaluatie
                      </span>
                    )}

                    {domain.notes && (
                      <span className="text-xs text-zinc-500 truncate max-w-[300px]" title={domain.notes}>
                        {domain.notes}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right: actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {!domain.hasIdea && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-[11px] gap-1.5 border-[#F5911E]/30 text-[#F5911E] hover:bg-[#F5911E]/10 hover:text-[#F5911E]"
                      onClick={() => handleSparkEvaluate(domain)}
                      disabled={sparkLoading === domain.id}
                    >
                      <Zap className="h-3.5 w-3.5" />
                      {sparkLoading === domain.id ? "Bezig..." : "SPARK Evalueren"}
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-[11px] gap-1.5 border-white/[0.06] text-zinc-400 hover:text-zinc-200"
                    onClick={() => {
                      // Placeholder for task creation
                      console.log("Create task for domain:", domain.domain)
                    }}
                  >
                    <ListTodo className="h-3.5 w-3.5" />
                    Taak
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-[11px] gap-1.5 border-white/[0.06] text-zinc-400 hover:text-zinc-200"
                    onClick={() => {
                      // Placeholder for note adding
                      console.log("Add note for domain:", domain.domain)
                    }}
                  >
                    <StickyNote className="h-3.5 w-3.5" />
                    Note
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ─── Empty state ────────────────────────────────────── */}
      {filtered.length === 0 && (
        <div className="text-center py-16 cc-animate-in">
          <Globe className="mx-auto h-10 w-10 text-zinc-700" />
          <h3 className="mt-4 text-lg font-medium text-zinc-400">Geen domeinen gevonden</h3>
          <p className="text-sm text-zinc-600 mt-1">
            {searchTerm || statusFilter !== "all" || hasIdeaFilter !== "all" || priorityFilter !== "all" || nicheFilter
              ? "Pas je filters aan om meer resultaten te zien"
              : "Voeg je eerste domein toe om te beginnen"}
          </p>
        </div>
      )}
    </div>
  )
}
