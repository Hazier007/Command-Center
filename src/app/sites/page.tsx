"use client"

import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, ExternalLink, Globe, TrendingUp } from "lucide-react"
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

export default function SitesPage() {
  const [sites, setSites] = useState<Site[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSite, setEditingSite] = useState<Site | null>(null)

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
  })

  useEffect(() => {
    setSites(sitesStorage.getAll())
    setProjects(projectsStorage.getAll())
  }, [])

  const filteredSites = sites.filter(site => {
    const matchesSearch = site.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         site.notes?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || site.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingSite) {
      sitesStorage.update(editingSite.id, {
        domain: formData.domain,
        status: formData.status,
        projectId: formData.projectId || undefined,
        techStack: formData.techStack.split(',').map(t => t.trim()).filter(Boolean),
        revenue: formData.revenue ? parseFloat(formData.revenue) : undefined,
        listings: formData.listings ? parseInt(formData.listings) : undefined,
        pages: formData.pages ? parseInt(formData.pages) : undefined,
        notes: formData.notes || undefined,
      })
    } else {
      sitesStorage.create({
        domain: formData.domain,
        status: formData.status,
        projectId: formData.projectId || undefined,
        techStack: formData.techStack.split(',').map(t => t.trim()).filter(Boolean),
        revenue: formData.revenue ? parseFloat(formData.revenue) : undefined,
        listings: formData.listings ? parseInt(formData.listings) : undefined,
        pages: formData.pages ? parseInt(formData.pages) : undefined,
        notes: formData.notes || undefined,
      })
    }

    setSites(sitesStorage.getAll())
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
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (siteId: string) => {
    if (confirm("Are you sure you want to delete this site?")) {
      sitesStorage.delete(siteId)
      setSites(sitesStorage.getAll())
    }
  }

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

  const totalRevenue = sites.reduce((sum, s) => sum + (s.revenue || 0), 0)
  const liveSites = sites.filter(s => s.status === 'live')

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-background to-background dark:from-orange-950/25 dark:via-background dark:to-background">
      <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Sites</h1>
            <p className="text-muted-foreground">
              €{totalRevenue.toLocaleString()}/month · {liveSites.length} live · {sites.length} total
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingSite(null)
                resetForm()
              }}>
                <Plus className="mr-2 h-4 w-4" />
                Add Site
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editingSite ? 'Edit Site' : 'Create New Site'}</DialogTitle>
                <DialogDescription>
                  {editingSite ? 'Update site details' : 'Add a new site to track'}
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
                  <p className="text-xs text-muted-foreground mt-1">Separate with commas</p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label htmlFor="revenue" className="text-sm font-medium">Revenue €</label>
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

                <div>
                  <label htmlFor="notes" className="text-sm font-medium">Notes</label>
                  <Input
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Additional notes"
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
                    {editingSite ? 'Update' : 'Create'} Site
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </header>

        <div className="mt-6 space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <Input
              placeholder="Search sites..."
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
            {filteredSites.map((site) => (
              <Card key={site.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <Globe className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <CardTitle className="text-base truncate">{site.domain}</CardTitle>
                        {getProjectName(site.projectId) && (
                          <CardDescription className="truncate">
                            {getProjectName(site.projectId)}
                          </CardDescription>
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
                    <Badge className={getStatusColor(site.status)}>
                      {site.status}
                    </Badge>
                    
                    {site.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1">
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
                    )}
                    
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {site.revenue && (
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3 text-green-600" />
                          <span>€{site.revenue}/mo</span>
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
                    
                    {site.notes && (
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {site.notes}
                      </p>
                    )}
                    
                    <div className="text-xs text-muted-foreground">
                      Added {new Date(site.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredSites.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-muted-foreground">No sites found</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {searchTerm || selectedStatus !== "all" 
                  ? "Try adjusting your search or filter"
                  : "Add your first site to get started"
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}