"use client"

import { useState, useEffect, useCallback } from "react"
import { Plus, Edit, Trash2, Search, Calendar, Eye, EyeOff, FileText, BarChart3, Brain, Database, Users, Wrench, Globe, Map, Target, CheckCircle2, Route, BookOpen, Shield, ChevronLeft, ChevronRight, Filter, X } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { researchStorage, type ResearchItem } from "@/lib/storage"

interface SiteOption { id: string; domain: string }
interface DomainOption { id: string; domain: string }

const RESEARCH_TYPES = [
  { value: 'keyword-research', label: 'Keyword Research', icon: Search, color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200' },
  { value: 'market-analysis', label: 'Market Analysis', icon: BarChart3, color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200' },
  { value: 'seo-strategy', label: 'SEO Strategy', icon: Target, color: 'bg-teal-100 text-teal-800 dark:bg-teal-900/20 dark:text-teal-200' },
  { value: 'roadmap', label: 'Roadmap', icon: Route, color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-200' },
  { value: 'completion-report', label: 'Completion Report', icon: CheckCircle2, color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-200' },
  { value: 'business-case', label: 'Business Case', icon: BookOpen, color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-200' },
  { value: 'data-dataset', label: 'Dataset', icon: Database, color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200' },
  { value: 'governance', label: 'Governance', icon: Shield, color: 'bg-violet-100 text-violet-800 dark:bg-violet-900/20 dark:text-violet-200' },
  { value: 'oracle', label: 'Oracle', icon: Brain, color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-200' },
  { value: 'api-research', label: 'API Research', icon: Database, color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200' },
  { value: 'technical', label: 'Technical', icon: Wrench, color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200' },
  { value: 'competitor', label: 'Competitor', icon: Users, color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200' },
  { value: 'other', label: 'Other', icon: FileText, color: 'bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-200' },
] as const

const ITEMS_PER_PAGE = 25

const getTypeConfig = (type: string) => RESEARCH_TYPES.find(t => t.value === type) || RESEARCH_TYPES[RESEARCH_TYPES.length - 1]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'draft': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200'
    case 'final': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
    case 'outdated': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200'
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200'
  }
}

const getAuthorColor = (author: string) => {
  switch (author) {
    case 'bart': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-200'
    case 'atlas': return 'bg-violet-100 text-violet-800 dark:bg-violet-900/20 dark:text-violet-200'
    case 'forge': return 'bg-rose-100 text-rose-800 dark:bg-rose-900/20 dark:text-rose-200'
    case 'radar': return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-200'
    case 'ink': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-200'
    case 'ledger': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-200'
    case 'spark': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-200'
    case 'cowork': return 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-200'
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200'
  }
}

const getAuthorEmoji = (author: string) => {
  const map: Record<string, string> = { bart: '👑', atlas: '🗺️', forge: '🔨', radar: '📡', ink: '✍️', ledger: '📊', spark: '⚡', cowork: '🤝' }
  return map[author] || '👤'
}

export default function ResearchPage() {
  const [research, setResearch] = useState<ResearchItem[]>([])
  const [sites, setSites] = useState<SiteOption[]>([])
  const [domains, setDomains] = useState<DomainOption[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedAuthor, setSelectedAuthor] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedSite, setSelectedSite] = useState<string>("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingResearch, setEditingResearch] = useState<ResearchItem | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [expandedResearch, setExpandedResearch] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    type: "keyword-research" as string,
    author: "radar" as string,
    tags: "",
    status: "draft" as string,
    linkedSiteId: "",
    linkedDomainId: "",
  })

  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      const [researchData, sitesRes, domainsRes] = await Promise.all([
        researchStorage.getAll(),
        fetch('/api/sites').then(r => r.ok ? r.json() : []),
        fetch('/api/domain-opportunities').then(r => r.ok ? r.json() : []),
      ])
      setResearch(researchData)
      setSites(Array.isArray(sitesRes) ? sitesRes.map((s: { id: string; domain: string }) => ({ id: s.id, domain: s.domain })) : [])
      setDomains(Array.isArray(domainsRes) ? domainsRes.map((d: { id: string; domain: string }) => ({ id: d.id, domain: d.domain })) : [])
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadData() }, [loadData])

  // Filter logic
  const filteredResearch = research.filter(item => {
    const matchesSearch = !searchTerm ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.author.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = selectedType === "all" || item.type === selectedType
    const matchesAuthor = selectedAuthor === "all" || item.author === selectedAuthor
    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus
    const matchesSite = selectedSite === "all" ||
      (item as Record<string, unknown>).linkedSiteId === selectedSite

    return matchesSearch && matchesType && matchesAuthor && matchesStatus && matchesSite
  })

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredResearch.length / ITEMS_PER_PAGE))
  const paginatedResearch = filteredResearch.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  // Reset page when filters change
  useEffect(() => { setPage(1) }, [searchTerm, selectedType, selectedAuthor, selectedStatus, selectedSite])

  // Stats
  const typeCounts = RESEARCH_TYPES.reduce((acc, t) => {
    acc[t.value] = research.filter(r => r.type === t.value).length
    return acc
  }, {} as Record<string, number>)

  const activeFilters = [selectedType, selectedAuthor, selectedStatus, selectedSite].filter(f => f !== "all").length

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setSubmitting(true)
      const payload = {
        title: formData.title,
        body: formData.body,
        type: formData.type,
        author: formData.author,
        tags: formData.tags || undefined,
        status: formData.status,
        linkedSiteId: formData.linkedSiteId || undefined,
        linkedDomainId: formData.linkedDomainId || undefined,
      }

      if (editingResearch) {
        await researchStorage.update(editingResearch.id, payload)
      } else {
        await researchStorage.create(payload as Omit<ResearchItem, 'id' | 'createdAt' | 'updatedAt'>)
      }

      await loadData()
      setIsDialogOpen(false)
      setEditingResearch(null)
      resetForm()
    } catch (error) {
      console.error('Failed to save research:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({ title: "", body: "", type: "keyword-research", author: "radar", tags: "", status: "draft", linkedSiteId: "", linkedDomainId: "" })
  }

  const handleEdit = (item: ResearchItem) => {
    setEditingResearch(item)
    setFormData({
      title: item.title,
      body: item.body,
      type: item.type,
      author: item.author,
      tags: item.tags || "",
      status: item.status,
      linkedSiteId: (item as Record<string, unknown>).linkedSiteId as string || "",
      linkedDomainId: (item as Record<string, unknown>).linkedDomainId as string || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Weet je zeker dat je dit onderzoek wilt verwijderen?")) {
      try {
        await researchStorage.delete(id)
        await loadData()
      } catch (error) {
        console.error('Failed to delete research:', error)
      }
    }
  }

  const clearFilters = () => {
    setSelectedType("all")
    setSelectedAuthor("all")
    setSelectedStatus("all")
    setSelectedSite("all")
    setSearchTerm("")
  }

  const getSiteLabel = (siteId: string) => {
    const site = sites.find(s => s.id === siteId)
    return site?.domain || null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-background to-background dark:from-orange-950/25 dark:via-background dark:to-background">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Onderzoeken laden...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-background to-background dark:from-orange-950/25 dark:via-background dark:to-background">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        {/* Header */}
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Onderzoeken</h1>
            <p className="text-muted-foreground">
              {research.length} totaal &middot; {research.filter(r => r.status === 'final').length} final &middot; {research.filter(r => r.status === 'draft').length} draft
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#F5911E] hover:bg-[#e07d0a] text-white" onClick={() => { setEditingResearch(null); resetForm() }}>
                <Plus className="mr-2 h-4 w-4" />
                Onderzoek toevoegen
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingResearch ? 'Onderzoek bewerken' : 'Nieuw onderzoek'}</DialogTitle>
                <DialogDescription>
                  {editingResearch ? 'Pas het onderzoek aan' : 'Voeg nieuw onderzoek toe aan de kennisbank'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="title" className="text-sm font-medium">Titel</label>
                  <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Onderzoek titel" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="type" className="text-sm font-medium">Type</label>
                    <select id="type" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                      {RESEARCH_TYPES.map(t => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="author" className="text-sm font-medium">Auteur</label>
                    <select id="author" value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                      <option value="bart">Bart</option>
                      <option value="atlas">Atlas</option>
                      <option value="forge">Forge</option>
                      <option value="radar">Radar</option>
                      <option value="ink">Ink</option>
                      <option value="ledger">Ledger</option>
                      <option value="spark">Spark</option>
                      <option value="cowork">Cowork</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="status" className="text-sm font-medium">Status</label>
                    <select id="status" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                      <option value="draft">Draft</option>
                      <option value="final">Final</option>
                      <option value="outdated">Outdated</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="tags" className="text-sm font-medium">Tags (comma-separated)</label>
                    <Input id="tags" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} placeholder="seo, tools, competition" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="linkedSiteId" className="text-sm font-medium">Gekoppelde Website</label>
                    <select id="linkedSiteId" value={formData.linkedSiteId} onChange={(e) => setFormData({ ...formData, linkedSiteId: e.target.value })}
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                      <option value="">Geen website</option>
                      {sites.map(s => (
                        <option key={s.id} value={s.id}>{s.domain}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="linkedDomainId" className="text-sm font-medium">Gekoppeld Domein</label>
                    <select id="linkedDomainId" value={formData.linkedDomainId} onChange={(e) => setFormData({ ...formData, linkedDomainId: e.target.value })}
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                      <option value="">Geen domein</option>
                      {domains.map(d => (
                        <option key={d.id} value={d.id}>{d.domain}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="body" className="text-sm font-medium">Onderzoek (Markdown)</label>
                  <Textarea id="body" value={formData.body} onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                    placeholder="Schrijf je onderzoek hier in markdown formaat..." className="min-h-[300px]" required />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1 bg-[#F5911E] hover:bg-[#e07d0a] text-white" disabled={submitting}>
                    {submitting ? 'Opslaan...' : (editingResearch ? 'Bijwerken' : 'Toevoegen')}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Annuleren</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </header>

        {/* Type chips strip */}
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedType("all")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${selectedType === "all" ? 'bg-[#F5911E] text-white' : 'bg-muted hover:bg-muted/80 text-muted-foreground'}`}
          >
            Alles ({research.length})
          </button>
          {RESEARCH_TYPES.filter(t => typeCounts[t.value] > 0).map(t => {
            const Icon = t.icon
            return (
              <button
                key={t.value}
                onClick={() => setSelectedType(selectedType === t.value ? "all" : t.value)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${selectedType === t.value ? 'bg-[#F5911E] text-white' : 'bg-muted hover:bg-muted/80 text-muted-foreground'}`}
              >
                <Icon className="h-3 w-3" />
                {t.label} ({typeCounts[t.value]})
              </button>
            )
          })}
        </div>

        {/* Filters bar */}
        <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Zoeken in titel, inhoud, tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <select value={selectedAuthor} onChange={(e) => setSelectedAuthor(e.target.value)}
              className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
              <option value="all">Alle auteurs</option>
              <option value="bart">Bart</option>
              <option value="atlas">Atlas</option>
              <option value="forge">Forge</option>
              <option value="radar">Radar</option>
              <option value="ink">Ink</option>
              <option value="ledger">Ledger</option>
              <option value="spark">Spark</option>
              <option value="cowork">Cowork</option>
            </select>
            <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}
              className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
              <option value="all">Alle statussen</option>
              <option value="draft">Draft</option>
              <option value="final">Final</option>
              <option value="outdated">Outdated</option>
            </select>
            {sites.length > 0 && (
              <select value={selectedSite} onChange={(e) => setSelectedSite(e.target.value)}
                className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                <option value="all">Alle websites</option>
                {sites.map(s => (
                  <option key={s.id} value={s.id}>{s.domain}</option>
                ))}
              </select>
            )}
            {activeFilters > 0 && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="h-9 text-xs gap-1">
                <X className="h-3 w-3" />
                Reset ({activeFilters})
              </Button>
            )}
          </div>
        </div>

        {/* Results info */}
        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {filteredResearch.length === research.length
              ? `${research.length} onderzoeken`
              : `${filteredResearch.length} van ${research.length} onderzoeken`
            }
          </span>
          {totalPages > 1 && (
            <span>Pagina {page} van {totalPages}</span>
          )}
        </div>

        {/* Research list */}
        <div className="mt-3 flex flex-col gap-3">
          {paginatedResearch.map((item) => {
            const typeConfig = getTypeConfig(item.type)
            const TypeIcon = typeConfig.icon
            const linkedSiteId = (item as Record<string, unknown>).linkedSiteId as string | undefined
            const siteLabel = linkedSiteId ? getSiteLabel(linkedSiteId) : null

            return (
              <Card key={item.id} className="overflow-hidden">
                {/* Row header */}
                <div className="flex items-center gap-3 px-4 py-3 flex-wrap md:flex-nowrap">
                  <div className="flex-1 min-w-0 flex items-center gap-2 flex-wrap">
                    <TypeIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <CardTitle className="text-base truncate">{item.title}</CardTitle>
                    <Badge className={typeConfig.color}>{typeConfig.label}</Badge>
                    <Badge className={getAuthorColor(item.author)}>
                      {getAuthorEmoji(item.author)} {item.author}
                    </Badge>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                    {siteLabel && (
                      <Badge variant="outline" className="gap-1 text-xs">
                        <Globe className="h-3 w-3" />
                        {siteLabel}
                      </Badge>
                    )}
                    {item.tags && (
                      <div className="hidden md:flex flex-wrap gap-1">
                        {item.tags.split(',').slice(0, 4).map((tag, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">{tag.trim()}</Badge>
                        ))}
                        {item.tags.split(',').length > 4 && (
                          <Badge variant="secondary" className="text-xs">+{item.tags.split(',').length - 4}</Badge>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <Button variant="ghost" size="sm" className="h-8" onClick={() => setExpandedResearch(expandedResearch === item.id ? null : item.id)}>
                      {expandedResearch === item.id
                        ? <><EyeOff className="h-4 w-4 mr-1" /><span className="text-xs">Verberg</span></>
                        : <><Eye className="h-4 w-4 mr-1" /><span className="text-xs">Lees</span></>
                      }
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8" onClick={() => handleEdit(item)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Mobile: tags */}
                {item.tags && (
                  <div className="flex md:hidden flex-wrap gap-1 px-4 pb-2">
                    {item.tags.split(',').map((tag, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">{tag.trim()}</Badge>
                    ))}
                  </div>
                )}

                {/* Expanded content */}
                {expandedResearch === item.id && (
                  <div className="border-t px-4 py-4">
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg overflow-y-auto max-h-[70vh] prose prose-sm dark:prose-invert max-w-none prose-headings:text-base prose-headings:font-semibold prose-p:text-sm prose-table:text-xs prose-th:p-2 prose-td:p-2 prose-table:border prose-th:border prose-td:border">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{item.body}</ReactMarkdown>
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="px-4 pb-2 text-xs text-muted-foreground flex items-center gap-2">
                  <Calendar className="h-3 w-3" />
                  {new Date(item.createdAt).toLocaleDateString('nl-BE')}
                </div>
              </Card>
            )
          })}
        </div>

        {/* Empty state */}
        {filteredResearch.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground">Geen onderzoeken gevonden</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {activeFilters > 0 || searchTerm
                ? "Pas je zoekopdracht of filters aan"
                : "Voeg je eerste onderzoek toe om te beginnen"
              }
            </p>
            {activeFilters > 0 && (
              <Button variant="outline" size="sm" onClick={clearFilters} className="mt-4">
                <Filter className="h-4 w-4 mr-2" />
                Reset filters
              </Button>
            )}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              let pageNum: number
              if (totalPages <= 7) {
                pageNum = i + 1
              } else if (page <= 4) {
                pageNum = i + 1
              } else if (page >= totalPages - 3) {
                pageNum = totalPages - 6 + i
              } else {
                pageNum = page - 3 + i
              }
              return (
                <Button key={pageNum} variant={page === pageNum ? "default" : "outline"} size="sm"
                  className={page === pageNum ? "bg-[#F5911E] hover:bg-[#e07d0a] text-white" : ""}
                  onClick={() => setPage(pageNum)}>
                  {pageNum}
                </Button>
              )
            })}
            <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
