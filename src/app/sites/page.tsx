"use client"

import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, ExternalLink, Globe, TrendingUp, TrendingDown, AlertTriangle, FileText, Activity, Server, CheckSquare, Square, FolderInput } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { sitesStorage, projectsStorage, type Site, type Project } from "@/lib/storage"

const seoStatusConfig: Record<string, { label: string; cls: string }> = {
  growing: { label: "Growing", cls: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  stable: { label: "Stable", cls: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  declining: { label: "Declining", cls: "bg-red-500/20 text-red-400 border-red-500/30" },
  unknown: { label: "Unknown", cls: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30" },
}

function isContentOutdated(lastContentDate?: string): boolean {
  if (!lastContentDate) return false
  const diff = Date.now() - new Date(lastContentDate).getTime()
  return diff > 21 * 24 * 60 * 60 * 1000 // 21 days
}

function daysSince(dateStr?: string): number | null {
  if (!dateStr) return null
  const diff = Date.now() - new Date(dateStr).getTime()
  return Math.floor(diff / (24 * 60 * 60 * 1000))
}

export default function SitesPage() {
  const [sites, setSites] = useState<Site[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSite, setEditingSite] = useState<Site | null>(null)
  const [bulkMode, setBulkMode] = useState(false)
  const [selectedSites, setSelectedSites] = useState<Set<string>>(new Set())
  const [bulkProjectId, setBulkProjectId] = useState("")
  const [bulkAssigning, setBulkAssigning] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    domain: "",
    status: "planned" as Site['status'],
    projectId: "",
    techStack: "",
    revenue: "",
    listings: "",
    pages: "",
    notes: "",
    seoStatus: "" as string,
    nextAction: "",
    hosting: "",
  })

  useEffect(() => {
    const load = async () => {
      const [sitesData, projectsData] = await Promise.all([
        sitesStorage.getAll(),
        projectsStorage.getAll(),
      ])
      setSites(sitesData)
      setProjects(projectsData)
    }
    load()
  }, [])

  const filteredSites = sites.filter(site => {
    const matchesSearch = site.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         site.notes?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || site.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      domain: formData.domain,
      status: formData.status,
      projectId: formData.projectId || undefined,
      techStack: formData.techStack.split(',').map(t => t.trim()).filter(Boolean),
      revenue: formData.revenue ? parseFloat(formData.revenue) : undefined,
      listings: formData.listings ? parseInt(formData.listings) : undefined,
      pages: formData.pages ? parseInt(formData.pages) : undefined,
      notes: formData.notes || undefined,
      seoStatus: formData.seoStatus || undefined,
      nextAction: formData.nextAction || undefined,
      hosting: formData.hosting || undefined,
    }

    if (editingSite) {
      await sitesStorage.update(editingSite.id, payload)
    } else {
      await sitesStorage.create(payload as Omit<Site, 'id' | 'createdAt' | 'updatedAt'>)
    }

    const allSites = await sitesStorage.getAll()
    setSites(allSites)
    setIsDialogOpen(false)
    setEditingSite(null)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      domain: "",
      status: "planned",
      projectId: "",
      techStack: "",
      revenue: "",
      listings: "",
      pages: "",
      notes: "",
      seoStatus: "",
      nextAction: "",
      hosting: "",
    })
  }

  const handleEdit = (site: Site) => {
    setEditingSite(site)
    setFormData({
      domain: site.domain,
      status: site.status,
      projectId: site.projectId || "",
      techStack: site.techStack.join(', '),
      revenue: site.revenue?.toString() || "",
      listings: site.listings?.toString() || "",
      pages: site.pages?.toString() || "",
      notes: site.notes || "",
      seoStatus: site.seoStatus || "",
      nextAction: site.nextAction || "",
      hosting: site.hosting || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (siteId: string) => {
    if (confirm("Weet je zeker dat je deze site wilt verwijderen?")) {
      await sitesStorage.delete(siteId)
      const allSites = await sitesStorage.getAll()
      setSites(allSites)
    }
  }

  const toggleSiteSelection = (siteId: string) => {
    setSelectedSites(prev => {
      const next = new Set(prev)
      if (next.has(siteId)) next.delete(siteId)
      else next.add(siteId)
      return next
    })
  }

  const selectAllFiltered = () => {
    const allIds = new Set(filteredSites.map(s => s.id))
    setSelectedSites(allIds)
  }

  const handleBulkAssign = async () => {
    if (!bulkProjectId || selectedSites.size === 0) return
    try {
      setBulkAssigning(true)
      await Promise.all(
        Array.from(selectedSites).map(siteId =>
          sitesStorage.update(siteId, { projectId: bulkProjectId })
        )
      )
      const allSites = await sitesStorage.getAll()
      setSites(allSites)
      setSelectedSites(new Set())
      setBulkProjectId("")
      setBulkMode(false)
    } catch (error) {
      console.error('Bulk assign failed:', error)
    } finally {
      setBulkAssigning(false)
    }
  }

  const handleBulkUnlink = async () => {
    if (selectedSites.size === 0) return
    try {
      setBulkAssigning(true)
      await Promise.all(
        Array.from(selectedSites).map(siteId =>
          sitesStorage.update(siteId, { projectId: null })
        )
      )
      const allSites = await sitesStorage.getAll()
      setSites(allSites)
      setSelectedSites(new Set())
    } catch (error) {
      console.error('Bulk unlink failed:', error)
    } finally {
      setBulkAssigning(false)
    }
  }

  const unlinkedCount = sites.filter(s => !s.projectId).length

  const getStatusColor = (status: Site['status']) => {
    switch (status) {
      case 'live': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
      case 'dev': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-200'
      case 'planned': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200'
    }
  }

  const getProjectName = (projectId?: string) => {
    if (!projectId) return null
    const project = projects.find(p => p.id === projectId)
    return project?.name
  }

  const totalRevenue = sites.reduce((sum, s) => sum + (s.monthlyRevenue || s.revenue || 0), 0)
  const liveSites = sites.filter(s => s.status === 'live')

  // SEO Pulse metrics
  const growingCount = sites.filter(s => s.seoStatus === 'growing').length
  const decliningCount = sites.filter(s => s.seoStatus === 'declining').length
  const needsContentCount = sites.filter(s => isContentOutdated(s.lastContentDate)).length

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-background to-background dark:from-orange-950/25 dark:via-background dark:to-background">
      <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Sites</h1>
            <p className="text-muted-foreground">
              &euro;{totalRevenue.toLocaleString()}/maand &middot; {liveSites.length} live &middot; {sites.length} totaal
            </p>
          </div>

          <div className="flex gap-2">
            {unlinkedCount > 0 && (
              <Button
                variant={bulkMode ? "default" : "outline"}
                onClick={() => { setBulkMode(!bulkMode); setSelectedSites(new Set()); setBulkProjectId("") }}
              >
                <FolderInput className="mr-2 h-4 w-4" />
                Bulk toewijzen {!bulkMode && `(${unlinkedCount})`}
              </Button>
            )}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#F5911E] hover:bg-[#e07d0a] text-white" onClick={() => {
                  setEditingSite(null)
                  resetForm()
                }}>
                  <Plus className="mr-2 h-4 w-4" />
                  Site toevoegen
                </Button>
              </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editingSite ? 'Site bewerken' : 'Nieuwe site'}</DialogTitle>
                <DialogDescription>
                  {editingSite ? 'Pas de sitegegevens aan' : 'Voeg een nieuwe site toe'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="domain" className="text-sm font-medium">Domain</label>
                  <Input
                    id="domain"
                    value={formData.domain}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    placeholder="example.com"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="status" className="text-sm font-medium">Status</label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as Site['status'] })}
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="planned">Planned</option>
                      <option value="dev">Development</option>
                      <option value="live">Live</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="projectId" className="text-sm font-medium">Project</label>
                    <select
                      id="projectId"
                      value={formData.projectId}
                      onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="">No project</option>
                      {projects.map((project) => (
                        <option key={project.id} value={project.id}>{project.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="techStack" className="text-sm font-medium">Tech Stack</label>
                  <Input
                    id="techStack"
                    value={formData.techStack}
                    onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                    placeholder="Next.js, TypeScript, etc."
                  />
                  <p className="text-xs text-muted-foreground mt-1">Scheid met komma&apos;s</p>
                </div>

                <div>
                  <label htmlFor="hosting" className="text-sm font-medium">Hosting</label>
                  <select
                    id="hosting"
                    value={formData.hosting}
                    onChange={(e) => setFormData({ ...formData, hosting: e.target.value })}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="">Niet ingesteld</option>
                    <option value="vercel">Vercel</option>
                    <option value="cloudflare">Cloudflare Pages</option>
                    <option value="hostinger">Hostinger</option>
                    <option value="siteground">SiteGround</option>
                    <option value="hazier">Hazier</option>
                    <option value="combell">Combell</option>
                    <option value="digitalocean">DigitalOcean</option>
                    <option value="vps">VPS</option>
                    <option value="netlify">Netlify</option>
                    <option value="aws">AWS</option>
                    <option value="other">Anders</option>
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label htmlFor="revenue" className="text-sm font-medium">Revenue (EUR/mnd)</label>
                    <Input
                      id="revenue"
                      type="number"
                      value={formData.revenue}
                      onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                      placeholder="0"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label htmlFor="listings" className="text-sm font-medium">Listings</label>
                    <Input
                      id="listings"
                      type="number"
                      value={formData.listings}
                      onChange={(e) => setFormData({ ...formData, listings: e.target.value })}
                      placeholder="0"
                      min="0"
                    />
                  </div>
                  <div>
                    <label htmlFor="pages" className="text-sm font-medium">Pages</label>
                    <Input
                      id="pages"
                      type="number"
                      value={formData.pages}
                      onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="seoStatus" className="text-sm font-medium">SEO Status</label>
                    <select
                      id="seoStatus"
                      value={formData.seoStatus}
                      onChange={(e) => setFormData({ ...formData, seoStatus: e.target.value })}
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                    >
                      <option value="">Niet ingesteld</option>
                      <option value="growing">Growing</option>
                      <option value="stable">Stable</option>
                      <option value="declining">Declining</option>
                      <option value="unknown">Unknown</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="nextAction" className="text-sm font-medium">Volgende actie</label>
                    <Input
                      id="nextAction"
                      value={formData.nextAction}
                      onChange={(e) => setFormData({ ...formData, nextAction: e.target.value })}
                      placeholder="bv. Content schrijven, links bouwen"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className="text-sm font-medium">Notities</label>
                  <Input
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Extra notities"
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1 bg-[#F5911E] hover:bg-[#e07d0a] text-white">
                    {editingSite ? 'Bijwerken' : 'Toevoegen'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuleren
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
          </div>
        </header>

        {/* Bulk Assign Bar */}
        {bulkMode && (
          <div className="mt-4 p-4 rounded-lg border border-[#F5911E]/30 bg-[#F5911E]/5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">{selectedSites.size} sites geselecteerd</span>
                <Button variant="outline" size="sm" onClick={selectAllFiltered}>
                  Alles selecteren ({filteredSites.length})
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSelectedSites(new Set())}>
                  Deselecteer
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={bulkProjectId}
                  onChange={(e) => setBulkProjectId(e.target.value)}
                  className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="">Kies project...</option>
                  {Object.entries(
                    projects.reduce((groups, project) => {
                      const cat = project.category || project.ownerType || 'overig'
                      if (!groups[cat]) groups[cat] = []
                      groups[cat].push(project)
                      return groups
                    }, {} as Record<string, Project[]>)
                  ).map(([category, categoryProjects]) => (
                    <optgroup key={category} label={category.charAt(0).toUpperCase() + category.slice(1)}>
                      {categoryProjects.map((project) => (
                        <option key={project.id} value={project.id}>{project.name}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                <Button
                  className="bg-[#F5911E] hover:bg-[#e07d0a] text-white"
                  disabled={!bulkProjectId || selectedSites.size === 0 || bulkAssigning}
                  onClick={handleBulkAssign}
                >
                  {bulkAssigning ? 'Toewijzen...' : `Toewijzen (${selectedSites.size})`}
                </Button>
                <Button
                  variant="outline"
                  disabled={selectedSites.size === 0 || bulkAssigning}
                  onClick={handleBulkUnlink}
                >
                  Ontkoppel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* SEO Pulse Summary */}
        {sites.length > 0 && (
          <div className="mt-6">
            <Card className="border-[#F5911E]/20 bg-[#F5911E]/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Activity className="h-4 w-4 text-[#F5911E]" />
                  SEO Pulse
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-emerald-500" />
                    <div>
                      <div className="text-xl font-bold text-emerald-500">{growingCount}</div>
                      <div className="text-xs text-muted-foreground">Growing</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingDown className="h-5 w-5 text-red-400" />
                    <div>
                      <div className="text-xl font-bold text-red-400">{decliningCount}</div>
                      <div className="text-xs text-muted-foreground">Declining</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-yellow-400" />
                    <div>
                      <div className="text-xl font-bold text-yellow-400">{needsContentCount}</div>
                      <div className="text-xs text-muted-foreground">Needs content</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="mt-6 space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <Input
              placeholder="Zoek sites..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="md:max-w-sm"
            />
            <Tabs value={selectedStatus} onValueChange={setSelectedStatus}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="live">Live</TabsTrigger>
                <TabsTrigger value="dev">Development</TabsTrigger>
                <TabsTrigger value="planned">Planned</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredSites.map((site) => {
              const outdated = isContentOutdated(site.lastContentDate)
              const days = daysSince(site.lastContentDate)
              const rev = site.monthlyRevenue || site.revenue || 0

              return (
                <Card key={site.id} className={bulkMode && selectedSites.has(site.id) ? 'border-[#F5911E]/50 bg-[#F5911E]/5' : ''}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        {bulkMode ? (
                          <button onClick={() => toggleSiteSelection(site.id)} className="flex-shrink-0">
                            {selectedSites.has(site.id) ? (
                              <CheckSquare className="h-5 w-5 text-[#F5911E]" />
                            ) : (
                              <Square className="h-5 w-5 text-muted-foreground hover:text-[#F5911E]" />
                            )}
                          </button>
                        ) : (
                          <Globe className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        )}
                        <div className="min-w-0 flex-1">
                          <CardTitle className="text-base truncate">
                            <Link href={`/sites/${site.id}`} className="hover:text-[#F5911E] transition-colors">
                              {site.domain}
                            </Link>
                          </CardTitle>
                          {getProjectName(site.projectId) && (
                            <CardDescription className="truncate">
                              <Link href={`/projects/${site.projectId}`} className="hover:text-[#F5911E] transition-colors">
                                {getProjectName(site.projectId)}
                              </Link>
                            </CardDescription>
                          )}
                          {site.nextAction && (
                            <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                              &rarr; {site.nextAction}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        {site.status === 'live' && (
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`https://${site.domain}`} target="_blank">
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(site)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(site.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-1.5">
                        <Badge className={getStatusColor(site.status)}>
                          {site.status}
                        </Badge>
                        {site.seoStatus && (
                          <Badge variant="outline" className={seoStatusConfig[site.seoStatus]?.cls || ""}>
                            {seoStatusConfig[site.seoStatus]?.label || site.seoStatus}
                          </Badge>
                        )}
                        {outdated && (
                          <Badge variant="outline" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Content verouderd
                          </Badge>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {site.hosting && (
                          <Badge variant="outline" className="text-xs bg-violet-500/10 text-violet-400 border-violet-500/30">
                            <Server className="h-3 w-3 mr-1" />
                            {site.hosting.charAt(0).toUpperCase() + site.hosting.slice(1)}
                          </Badge>
                        )}
                        {site.techStack.slice(0, 3).map((tech, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {site.techStack.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{site.techStack.length - 3}
                          </Badge>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-xs">
                        {rev > 0 && (
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3 text-green-600" />
                            <span>&euro;{rev}/mo</span>
                          </div>
                        )}
                        {site.listings && (
                          <div className="text-center">
                            <div className="font-medium">{site.listings.toLocaleString()}</div>
                            <div className="text-muted-foreground">listings</div>
                          </div>
                        )}
                        {site.pages && (
                          <div className="text-center">
                            <div className="font-medium">{site.pages.toLocaleString()}</div>
                            <div className="text-muted-foreground">pages</div>
                          </div>
                        )}
                      </div>

                      {days !== null && (
                        <div className="text-xs text-muted-foreground">
                          Laatste content: {days === 0 ? "vandaag" : `${days} dagen geleden`}
                        </div>
                      )}

                      {site.notes && (
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {site.notes}
                        </p>
                      )}

                      <div className="text-xs text-muted-foreground">
                        Toegevoegd {new Date(site.createdAt).toLocaleDateString('nl-BE')}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {filteredSites.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-muted-foreground">Geen sites gevonden</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {searchTerm || selectedStatus !== "all"
                  ? "Pas je zoekopdracht of filter aan"
                  : "Voeg je eerste site toe om te beginnen"
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
