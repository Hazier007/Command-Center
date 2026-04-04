"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Plus, Edit, Trash2, ExternalLink, Globe, TrendingUp, TrendingDown,
  AlertTriangle, FileText, Server, Search, ArrowUpRight, DollarSign,
  Activity, Eye, Zap,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"

interface Site {
  id: string; domain: string; projectId?: string; status: string; category?: string
  techStack: string[]; revenue?: number; listings?: number; pages?: number; notes?: string
  monthlyRevenue?: number; seoStatus?: string; nextAction?: string; hosting?: string
  lastContentDate?: string; topKeyword?: string; topPosition?: number; monthlyTraffic?: number
  seoScore?: number; deployStatus?: string; lastDeployAt?: string
  ownerType?: string; clientName?: string; monthlyFee?: number
  createdAt: string; updatedAt: string
}

const STATUS_CONFIG: Record<string, { label: string; color: string; dot: string }> = {
  live:     { label: "Live",    color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25", dot: "bg-emerald-400" },
  dev:      { label: "Dev",     color: "bg-amber-500/15 text-amber-400 border-amber-500/25",     dot: "bg-amber-400" },
  staging:  { label: "Staging", color: "bg-blue-500/15 text-blue-400 border-blue-500/25",        dot: "bg-blue-400" },
  planned:  { label: "Planned", color: "bg-zinc-500/15 text-zinc-400 border-zinc-500/25",        dot: "bg-zinc-500" },
  paused:   { label: "Paused",  color: "bg-zinc-500/15 text-zinc-500 border-zinc-500/25",        dot: "bg-zinc-600" },
  archived: { label: "Archief", color: "bg-zinc-800/50 text-zinc-600 border-zinc-700/50",        dot: "bg-zinc-700" },
}

const CATEGORY_CONFIG: Record<string, { label: string; color: string }> = {
  klant:       { label: "Klant",       color: "bg-blue-500/15 text-blue-400 border-blue-500/25" },
  leadgen:     { label: "LeadGen",     color: "bg-orange-500/15 text-orange-400 border-orange-500/25" },
  adsense:     { label: "AdSense",     color: "bg-green-500/15 text-green-400 border-green-500/25" },
  affiliate:   { label: "Affiliate",   color: "bg-purple-500/15 text-purple-400 border-purple-500/25" },
  "rank-rent": { label: "Rank & Rent", color: "bg-cyan-500/15 text-cyan-400 border-cyan-500/25" },
  tool:        { label: "Tool",        color: "bg-violet-500/15 text-violet-400 border-violet-500/25" },
  directory:   { label: "Directory",   color: "bg-teal-500/15 text-teal-400 border-teal-500/25" },
  business:    { label: "Business",    color: "bg-pink-500/15 text-pink-400 border-pink-500/25" },
  event:       { label: "Event",       color: "bg-rose-500/15 text-rose-400 border-rose-500/25" },
}

const SEO_CONFIG: Record<string, { label: string; icon: typeof TrendingUp; color: string }> = {
  growing:   { label: "Growing",   icon: TrendingUp,   color: "text-emerald-400" },
  stable:    { label: "Stable",    icon: Activity,     color: "text-blue-400" },
  declining: { label: "Declining", icon: TrendingDown,  color: "text-red-400" },
  unknown:   { label: "Unknown",   icon: Eye,          color: "text-zinc-500" },
}

function formatEuro(n: number): string {
  if (n >= 1000) return `€${(n / 1000).toFixed(1)}k`
  return `€${Math.round(n)}`
}

function isContentOutdated(d?: string): boolean {
  if (!d) return false
  return Date.now() - new Date(d).getTime() > 21 * 86400000
}

export default function WebsitesPage() {
  const [sites, setSites] = useState<Site[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSite, setEditingSite] = useState<Site | null>(null)

  const [formData, setFormData] = useState({
    domain: "", status: "planned", category: "", techStack: "", revenue: "",
    listings: "", pages: "", notes: "", seoStatus: "", nextAction: "", hosting: "",
  })

  useEffect(() => {
    loadSites()
  }, [])

  const loadSites = async () => {
    const res = await fetch("/api/sites")
    if (res.ok) setSites(await res.json())
  }

  const filtered = sites.filter(s => {
    const search = s.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   s.notes?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   s.clientName?.toLowerCase().includes(searchTerm.toLowerCase())
    const status = filterStatus === "all" || s.status === filterStatus
    const cat = filterCategory === "all" || (s.category || "") === filterCategory
    return search && status && cat
  })

  const totalMRR = sites.reduce((s, site) => s + (site.monthlyRevenue || site.revenue || site.monthlyFee || 0), 0)
  const liveSites = sites.filter(s => s.status === "live")
  const growingCount = sites.filter(s => s.seoStatus === "growing").length
  const decliningCount = sites.filter(s => s.seoStatus === "declining").length
  const outdatedCount = sites.filter(s => isContentOutdated(s.lastContentDate)).length

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = {
      domain: formData.domain, status: formData.status,
      category: formData.category || undefined, hosting: formData.hosting || undefined,
      techStack: formData.techStack.split(",").map(t => t.trim()).filter(Boolean),
      revenue: formData.revenue ? parseFloat(formData.revenue) : undefined,
      listings: formData.listings ? parseInt(formData.listings) : undefined,
      pages: formData.pages ? parseInt(formData.pages) : undefined,
      notes: formData.notes || undefined, seoStatus: formData.seoStatus || undefined,
      nextAction: formData.nextAction || undefined,
    }
    const url = editingSite ? `/api/sites/${editingSite.id}` : "/api/sites"
    const method = editingSite ? "PATCH" : "POST"
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
    await loadSites()
    setIsDialogOpen(false); setEditingSite(null); resetForm()
  }

  const resetForm = () => setFormData({ domain: "", status: "planned", category: "", techStack: "", revenue: "", listings: "", pages: "", notes: "", seoStatus: "", nextAction: "", hosting: "" })

  const handleEdit = (site: Site) => {
    setEditingSite(site)
    setFormData({
      domain: site.domain, status: site.status, category: site.category || "",
      techStack: site.techStack?.join(", ") || "", revenue: (site.monthlyRevenue || site.revenue || "").toString(),
      listings: site.listings?.toString() || "", pages: site.pages?.toString() || "",
      notes: site.notes || "", seoStatus: site.seoStatus || "", nextAction: site.nextAction || "",
      hosting: site.hosting || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Website verwijderen?")) {
      await fetch(`/api/sites/${id}`, { method: "DELETE" })
      await loadSites()
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 cc-noise">
      <div className="mx-auto max-w-[1400px] px-4 py-5 md:px-6 lg:px-8 space-y-5">

        {/* Header */}
        <header className="cc-animate-in flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Globe className="h-5 w-5 text-[#F5911E]" />
              Websites
            </h1>
            <p className="text-[13px] text-zinc-500 mt-0.5">
              {formatEuro(totalMRR)}/mo &middot; {liveSites.length} live &middot; {sites.length} totaal
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { setEditingSite(null); resetForm() }} className="bg-[#F5911E] hover:bg-[#e5820f] text-white border-0">
                <Plus className="mr-1.5 h-4 w-4" /> Website
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg bg-zinc-900 border-white/[0.08]">
              <DialogHeader>
                <DialogTitle>{editingSite ? "Website bewerken" : "Nieuwe website"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-3">
                <Input placeholder="domein.be" value={formData.domain} onChange={e => setFormData({ ...formData, domain: e.target.value })} required className="bg-white/[0.03] border-white/[0.08]" />
                <div className="grid grid-cols-3 gap-3">
                  <Select value={formData.status} onValueChange={v => setFormData({ ...formData, status: v })}>
                    <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planned">Planned</SelectItem>
                      <SelectItem value="dev">Dev</SelectItem>
                      <SelectItem value="staging">Staging</SelectItem>
                      <SelectItem value="live">Live</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={formData.category} onValueChange={v => setFormData({ ...formData, category: v })}>
                    <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Geen</SelectItem>
                      {Object.entries(CATEGORY_CONFIG).map(([k, v]) => (
                        <SelectItem key={k} value={k}>{v.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={formData.hosting} onValueChange={v => setFormData({ ...formData, hosting: v })}>
                    <SelectTrigger><SelectValue placeholder="Hosting" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Geen</SelectItem>
                      <SelectItem value="vercel">Vercel</SelectItem>
                      <SelectItem value="cloudflare">Cloudflare</SelectItem>
                      <SelectItem value="hostinger">Hostinger</SelectItem>
                      <SelectItem value="vps">VPS</SelectItem>
                      <SelectItem value="other">Anders</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Input placeholder="Tech stack (komma's)" value={formData.techStack} onChange={e => setFormData({ ...formData, techStack: e.target.value })} className="bg-white/[0.03] border-white/[0.08]" />
                <div className="grid grid-cols-3 gap-3">
                  <Input placeholder="Revenue €/mo" type="number" value={formData.revenue} onChange={e => setFormData({ ...formData, revenue: e.target.value })} className="bg-white/[0.03] border-white/[0.08]" />
                  <Input placeholder="Listings" type="number" value={formData.listings} onChange={e => setFormData({ ...formData, listings: e.target.value })} className="bg-white/[0.03] border-white/[0.08]" />
                  <Input placeholder="Pages" type="number" value={formData.pages} onChange={e => setFormData({ ...formData, pages: e.target.value })} className="bg-white/[0.03] border-white/[0.08]" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Select value={formData.seoStatus} onValueChange={v => setFormData({ ...formData, seoStatus: v })}>
                    <SelectTrigger><SelectValue placeholder="SEO Status" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Geen</SelectItem>
                      <SelectItem value="growing">Growing</SelectItem>
                      <SelectItem value="stable">Stable</SelectItem>
                      <SelectItem value="declining">Declining</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Volgende actie" value={formData.nextAction} onChange={e => setFormData({ ...formData, nextAction: e.target.value })} className="bg-white/[0.03] border-white/[0.08]" />
                </div>
                <Textarea placeholder="Notities" value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} rows={2} className="bg-white/[0.03] border-white/[0.08]" />
                <Button type="submit" className="w-full bg-[#F5911E] hover:bg-[#e5820f] text-white border-0">
                  {editingSite ? "Bijwerken" : "Toevoegen"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </header>

        {/* Stats */}
        <div className="cc-animate-in cc-stagger-1 grid grid-cols-2 gap-3 md:grid-cols-5">
          {[
            { label: "MRR", value: formatEuro(totalMRR), icon: DollarSign, accent: true },
            { label: "Live", value: liveSites.length, icon: Zap },
            { label: "Growing", value: growingCount, icon: TrendingUp },
            { label: "Declining", value: decliningCount, icon: TrendingDown },
            { label: "Needs Content", value: outdatedCount, icon: FileText },
          ].map((s, i) => (
            <div key={s.label} className={`cc-animate-in cc-stagger-${i + 1} rounded-xl border p-3 ${
              s.accent ? "border-[#F5911E]/20 bg-[#F5911E]/[0.05]" : "border-white/[0.06] bg-white/[0.02]"
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-zinc-600">{s.label}</span>
                <s.icon className={`h-3.5 w-3.5 ${s.accent ? "text-[#F5911E]" : "text-zinc-600"}`} />
              </div>
              <div className="mt-1 text-xl font-bold tabular-nums text-white">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="cc-animate-in cc-stagger-2 flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-600" />
            <Input
              placeholder="Zoek websites..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/[0.03] border-white/[0.08]"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle statussen</SelectItem>
              <SelectItem value="live">Live</SelectItem>
              <SelectItem value="dev">Dev</SelectItem>
              <SelectItem value="staging">Staging</SelectItem>
              <SelectItem value="planned">Planned</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle types</SelectItem>
              {Object.entries(CATEGORY_CONFIG).map(([k, v]) => (
                <SelectItem key={k} value={k}>{v.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-[11px] text-zinc-600 tabular-nums">{filtered.length} websites</span>
        </div>

        {/* Sites Table */}
        <div className="cc-animate-in cc-stagger-3 rounded-xl border border-white/[0.06] bg-white/[0.015] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-[10px] font-medium uppercase tracking-[0.15em] text-zinc-600 border-b border-white/[0.06]">
                  <th className="px-4 py-3 text-left">Website</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Type</th>
                  <th className="px-4 py-3 text-left hidden md:table-cell">SEO</th>
                  <th className="px-4 py-3 text-left hidden md:table-cell">Revenue</th>
                  <th className="px-4 py-3 text-left hidden lg:table-cell">Hosting</th>
                  <th className="px-4 py-3 text-left hidden lg:table-cell">Volgende Actie</th>
                  <th className="px-4 py-3 text-right w-24"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center">
                      <Globe className="mx-auto h-10 w-10 text-zinc-800 mb-3" />
                      <p className="text-sm text-zinc-600">Geen websites gevonden</p>
                    </td>
                  </tr>
                ) : (
                  filtered.map((site) => {
                    const st = STATUS_CONFIG[site.status] || STATUS_CONFIG.planned
                    const cat = site.category ? CATEGORY_CONFIG[site.category] : null
                    const seo = site.seoStatus ? SEO_CONFIG[site.seoStatus] : null
                    const SeoIcon = seo?.icon
                    const rev = site.monthlyRevenue || site.revenue || site.monthlyFee || 0
                    const outdated = isContentOutdated(site.lastContentDate)

                    return (
                      <tr key={site.id} className="group hover:bg-white/[0.02] transition-colors">
                        {/* Domain */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <span className={`relative flex h-2 w-2 shrink-0`}>
                              {site.status === "live" && <span className="cc-live-dot absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: st.dot.replace("bg-", "") }} />}
                              <span className={`relative inline-flex h-2 w-2 rounded-full ${st.dot}`} />
                            </span>
                            <div className="min-w-0">
                              <Link href={`/sites/${site.id}`} className="text-sm font-medium text-white hover:text-[#F5911E] transition-colors flex items-center gap-1">
                                {site.domain}
                                <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-40 transition-opacity" />
                              </Link>
                              {site.clientName && (
                                <div className="text-[11px] text-zinc-600 truncate">{site.clientName}</div>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-3">
                          <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium ${st.color}`}>
                            {st.label}
                          </span>
                        </td>

                        {/* Category */}
                        <td className="px-4 py-3">
                          {cat ? (
                            <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium ${cat.color}`}>
                              {cat.label}
                            </span>
                          ) : (
                            <span className="text-[11px] text-zinc-700">—</span>
                          )}
                        </td>

                        {/* SEO */}
                        <td className="px-4 py-3 hidden md:table-cell">
                          <div className="flex items-center gap-1.5">
                            {SeoIcon && <SeoIcon className={`h-3 w-3 ${seo.color}`} />}
                            <span className={`text-[11px] ${seo?.color || "text-zinc-700"}`}>
                              {seo?.label || "—"}
                            </span>
                            {outdated && <AlertTriangle className="h-3 w-3 text-amber-400 ml-1" />}
                          </div>
                        </td>

                        {/* Revenue */}
                        <td className="px-4 py-3 hidden md:table-cell">
                          <span className="text-[12px] tabular-nums text-zinc-400">
                            {rev > 0 ? `${formatEuro(rev)}/mo` : "—"}
                          </span>
                        </td>

                        {/* Hosting */}
                        <td className="px-4 py-3 hidden lg:table-cell">
                          {site.hosting ? (
                            <span className="inline-flex items-center gap-1 text-[11px] text-zinc-500">
                              <Server className="h-3 w-3" />
                              {site.hosting}
                            </span>
                          ) : (
                            <span className="text-[11px] text-zinc-700">—</span>
                          )}
                        </td>

                        {/* Next Action */}
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <span className="text-[11px] text-zinc-500 truncate block max-w-[180px]">
                            {site.nextAction || "—"}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {site.status === "live" && (
                              <a href={`https://${site.domain}`} target="_blank" rel="noopener noreferrer" className="rounded-md p-1.5 text-zinc-600 hover:text-white hover:bg-white/[0.05] transition-colors">
                                <ExternalLink className="h-3.5 w-3.5" />
                              </a>
                            )}
                            <button onClick={() => handleEdit(site)} className="rounded-md p-1.5 text-zinc-600 hover:text-white hover:bg-white/[0.05] transition-colors">
                              <Edit className="h-3.5 w-3.5" />
                            </button>
                            <button onClick={() => handleDelete(site.id)} className="rounded-md p-1.5 text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
