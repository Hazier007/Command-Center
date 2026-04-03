"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Mail, Calendar, DollarSign, Globe, Clock, FileText, CheckCircle2, StickyNote, Plus, Link2, X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { projectsStorage, sitesStorage, tasksStorage, contentStorage, type Project, type Site, type Task, type ContentItem } from "@/lib/storage"

export default function ClientDetailPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string

  const [project, setProject] = useState<Project | null>(null)
  const [linkedSites, setLinkedSites] = useState<Site[]>([])
  const [linkedTasks, setLinkedTasks] = useState<Task[]>([])
  const [contentItems, setContentItems] = useState<ContentItem[]>([])
  const [allSites, setAllSites] = useState<Site[]>([])
  const [loading, setLoading] = useState(true)
  const [scratchPad, setScratchPad] = useState("")
  const [savingNotes, setSavingNotes] = useState(false)
  const [showLinkDialog, setShowLinkDialog] = useState(false)
  const [showNewSiteDialog, setShowNewSiteDialog] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [newSiteForm, setNewSiteForm] = useState({ domain: "", status: "planned", hosting: "" })

  useEffect(() => {
    loadData()
  }, [projectId])

  const loadData = async () => {
    try {
      setLoading(true)
      const [projectsData, sitesData, tasksData, contentData] = await Promise.all([
        projectsStorage.getAll(),
        sitesStorage.getAll(),
        tasksStorage.getAll(),
        contentStorage.getAll(),
      ])

      const currentProject = projectsData.find(p => p.id === projectId)
      if (!currentProject) {
        router.push('/clients')
        return
      }

      setProject(currentProject)
      setScratchPad(currentProject.scratchPad || "")
      setAllSites(sitesData)
      setLinkedSites(sitesData.filter(s => s.projectId === projectId))
      setLinkedTasks(tasksData.filter(t => t.projectId === projectId))
      setContentItems(contentData.filter(c => c.projectId === projectId))
    } catch (error) {
      console.error('Failed to load client data:', error)
      router.push('/clients')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveScratchPad = async () => {
    if (!project) return
    try {
      setSavingNotes(true)
      await projectsStorage.update(project.id, { scratchPad })
    } catch (error) {
      console.error('Failed to save scratch pad:', error)
    } finally {
      setSavingNotes(false)
    }
  }

  const handleLinkSite = async (siteId: string) => {
    try {
      await sitesStorage.update(siteId, { projectId })
      await loadData()
    } catch (error) {
      console.error('Failed to link site:', error)
    }
  }

  const handleUnlinkSite = async (siteId: string) => {
    try {
      await sitesStorage.update(siteId, { projectId: null })
      await loadData()
    } catch (error) {
      console.error('Failed to unlink site:', error)
    }
  }

  const handleCreateSite = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setSubmitting(true)
      await sitesStorage.create({
        domain: newSiteForm.domain,
        status: newSiteForm.status,
        projectId,
        hosting: newSiteForm.hosting || undefined,
      })
      await loadData()
      setShowNewSiteDialog(false)
      setNewSiteForm({ domain: "", status: "planned", hosting: "" })
    } catch (error) {
      console.error('Failed to create site:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const unlinkedSites = allSites.filter(s => !s.projectId || s.projectId !== projectId)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'live': case 'done': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
      case 'planned': case 'todo': case 'draft': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200'
      case 'in-progress': case 'dev': case 'review': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-200'
      case 'paused': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200'
    }
  }

  const getContractColor = (type?: string) => {
    switch (type) {
      case 'retainer': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
      case 'eenmalig': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200'
      case 'mixed': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-background to-background dark:from-orange-950/25 dark:via-background dark:to-background">
        <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Loading klantgegevens...</div>
          </div>
        </div>
      </div>
    )
  }

  if (!project) return null

  const activeTasks = linkedTasks.filter(t => t.status !== 'done')
  const doneTasks = linkedTasks.filter(t => t.status === 'done')

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-background to-background dark:from-orange-950/25 dark:via-background dark:to-background">
      <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
        {/* Back button */}
        <Link href="/clients">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Terug naar klanten
          </Button>
        </Link>

        {/* Client Header */}
        <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">{project.clientName || project.name}</h1>
              <Badge className={getContractColor(project.contractType)}>
                {project.contractType || 'n/a'}
              </Badge>
              <Badge className={getStatusColor(project.status)}>
                {project.status}
              </Badge>
            </div>
            {project.clientEmail && (
              <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{project.clientEmail}</span>
              </div>
            )}
            {project.description && (
              <p className="text-muted-foreground mt-1">{project.description}</p>
            )}
          </div>
        </header>

        {/* Overview Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="text-sm text-muted-foreground">MRR</span>
              </div>
              <p className="text-2xl font-bold mt-1 text-green-600">
                {(project.monthlyFee || project.revenue || 0).toLocaleString('nl-BE', { style: 'currency', currency: 'EUR' })}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Contract</span>
              </div>
              <p className="text-sm font-medium mt-1">
                {project.contractStart
                  ? `${new Date(project.contractStart).toLocaleDateString('nl-BE')} - ${project.contractEnd ? new Date(project.contractEnd).toLocaleDateString('nl-BE') : 'lopend'}`
                  : 'Niet ingesteld'}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Uren/maand</span>
              </div>
              <p className="text-2xl font-bold mt-1">
                {project.hoursPerMonth || '-'}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Sites</span>
              </div>
              <p className="text-2xl font-bold mt-1">{linkedSites.length}</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {/* Linked Sites */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Gekoppelde sites
                  </CardTitle>
                  <CardDescription>{linkedSites.length} sites</CardDescription>
                </div>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" onClick={() => setShowLinkDialog(true)}>
                    <Link2 className="mr-1 h-3 w-3" />
                    Koppel
                  </Button>
                  <Button size="sm" className="bg-[#F5911E] hover:bg-[#e07d0a] text-white" onClick={() => setShowNewSiteDialog(true)}>
                    <Plus className="mr-1 h-3 w-3" />
                    Nieuw
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {linkedSites.length === 0 ? (
                <p className="text-sm text-muted-foreground">Geen sites gekoppeld. Koppel een bestaande site of maak een nieuwe aan.</p>
              ) : (
                <div className="space-y-3">
                  {linkedSites.map(site => (
                    <div key={site.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                      <div>
                        <p className="text-sm font-medium">{site.domain}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getStatusColor(site.status)} style={{ fontSize: '10px' }}>{site.status}</Badge>
                          {(site.monthlyRevenue || site.revenue) ? (
                            <span className="text-xs text-muted-foreground">{(site.monthlyRevenue || site.revenue || 0).toLocaleString('nl-BE', { style: 'currency', currency: 'EUR' })}/mo</span>
                          ) : null}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {site.status === 'live' && (
                          <a href={`https://${site.domain}`} target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" size="sm">
                              <Globe className="h-4 w-4" />
                            </Button>
                          </a>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => handleUnlinkSite(site.id)} title="Ontkoppel site">
                          <X className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Active Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Actieve taken
              </CardTitle>
              <CardDescription>{activeTasks.length} open, {doneTasks.length} afgerond</CardDescription>
            </CardHeader>
            <CardContent>
              {activeTasks.length === 0 ? (
                <p className="text-sm text-muted-foreground">Geen actieve taken</p>
              ) : (
                <div className="space-y-2">
                  {activeTasks.slice(0, 8).map(task => (
                    <div key={task.id} className="flex items-center justify-between p-2 rounded bg-gray-50 dark:bg-gray-800/50">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">{task.title}</p>
                        {task.dueDate && (
                          <p className="text-xs text-muted-foreground">
                            Due: {new Date(task.dueDate).toLocaleDateString('nl-BE')}
                          </p>
                        )}
                      </div>
                      <Badge className={getStatusColor(task.status)} style={{ fontSize: '10px' }}>
                        {task.status}
                      </Badge>
                    </div>
                  ))}
                  {activeTasks.length > 8 && (
                    <p className="text-xs text-muted-foreground text-center">
                      + {activeTasks.length - 8} meer taken
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Content items
              </CardTitle>
              <CardDescription>{contentItems.length} items</CardDescription>
            </CardHeader>
            <CardContent>
              {contentItems.length === 0 ? (
                <p className="text-sm text-muted-foreground">Geen content items</p>
              ) : (
                <div className="space-y-2">
                  {contentItems.slice(0, 5).map(item => (
                    <div key={item.id} className="flex items-center justify-between p-2 rounded bg-gray-50 dark:bg-gray-800/50">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">{item.title}</p>
                        <p className="text-xs text-muted-foreground capitalize">{item.type}</p>
                      </div>
                      <Badge className={getStatusColor(item.status)} style={{ fontSize: '10px' }}>
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Scratch Pad */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <StickyNote className="h-5 w-5" />
                Notities
              </CardTitle>
              <CardDescription>Klant scratch pad</CardDescription>
            </CardHeader>
            <CardContent>
              <textarea
                value={scratchPad}
                onChange={(e) => setScratchPad(e.target.value)}
                placeholder="Notities over deze klant..."
                className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-y"
              />
              <Button
                onClick={handleSaveScratchPad}
                className="mt-2 bg-[#F5911E] hover:bg-[#e07d0a] text-white"
                size="sm"
                disabled={savingNotes}
              >
                {savingNotes ? 'Opslaan...' : 'Opslaan'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Link Existing Site Dialog */}
        <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Site koppelen aan {project.clientName || project.name}</DialogTitle>
              <DialogDescription>Selecteer een bestaande site om te koppelen aan deze klant</DialogDescription>
            </DialogHeader>
            {unlinkedSites.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4">Alle sites zijn al gekoppeld aan een project.</p>
            ) : (
              <div className="max-h-[300px] overflow-y-auto space-y-2">
                {unlinkedSites.map(site => (
                  <button
                    key={site.id}
                    onClick={() => { handleLinkSite(site.id); setShowLinkDialog(false) }}
                    className="w-full flex items-center justify-between p-3 rounded-lg border border-input hover:border-[#F5911E]/50 hover:bg-accent transition-colors text-left"
                  >
                    <div>
                      <p className="text-sm font-medium">{site.domain}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getStatusColor(site.status)} style={{ fontSize: '10px' }}>{site.status}</Badge>
                        {site.hosting && <span className="text-xs text-muted-foreground">{site.hosting}</span>}
                      </div>
                    </div>
                    <Link2 className="h-4 w-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Create New Site Dialog */}
        <Dialog open={showNewSiteDialog} onOpenChange={setShowNewSiteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nieuwe site voor {project.clientName || project.name}</DialogTitle>
              <DialogDescription>Maak een nieuwe site aan en koppel direct aan deze klant</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateSite} className="space-y-4">
              <div>
                <label htmlFor="new-site-domain" className="text-sm font-medium">Domein</label>
                <Input
                  id="new-site-domain"
                  value={newSiteForm.domain}
                  onChange={(e) => setNewSiteForm({ ...newSiteForm, domain: e.target.value })}
                  placeholder="voorbeeld.be"
                  required
                  autoFocus
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="new-site-status" className="text-sm font-medium">Status</label>
                  <select
                    id="new-site-status"
                    value={newSiteForm.status}
                    onChange={(e) => setNewSiteForm({ ...newSiteForm, status: e.target.value })}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="planned">Planned</option>
                    <option value="dev">In ontwikkeling</option>
                    <option value="staging">Staging</option>
                    <option value="live">Live</option>
                    <option value="paused">Gepauzeerd</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="new-site-hosting" className="text-sm font-medium">Hosting</label>
                  <Input
                    id="new-site-hosting"
                    value={newSiteForm.hosting}
                    onChange={(e) => setNewSiteForm({ ...newSiteForm, hosting: e.target.value })}
                    placeholder="Vercel, Combell, ..."
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1 bg-[#F5911E] hover:bg-[#e07d0a] text-white" disabled={submitting}>
                  {submitting ? 'Aanmaken...' : 'Site aanmaken'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowNewSiteDialog(false)}>
                  Annuleren
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
