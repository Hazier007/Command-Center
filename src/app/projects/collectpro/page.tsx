"use client"

import { useState, useEffect } from "react"
import { Plus, Landmark, Globe, FileText, Users, TrendingUp, CheckSquare, DollarSign, ExternalLink } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { tasksStorage, sitesStorage, notesStorage, type Task, type Site, type Note } from "@/lib/storage"

export default function CollectProPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [sites, setSites] = useState<Site[]>([])
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overzicht")
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [taskForm, setTaskForm] = useState({ title: "", description: "", priority: "medium" })
  const [noteForm, setNoteForm] = useState({ title: "", content: "" })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [allTasks, allSites, allNotes] = await Promise.all([
        tasksStorage.getAll(),
        sitesStorage.getAll(),
        notesStorage.getAll(),
      ])
      // Filter for CollectPro related items
      setTasks(allTasks.filter(t =>
        t.title?.toLowerCase().includes('collectpro') ||
        t.title?.toLowerCase().includes('collect pro') ||
        t.title?.toLowerCase().includes('incasso') ||
        t.projectId === 'collectpro'
      ))
      setSites(allSites.filter(s =>
        s.domain?.toLowerCase().includes('collectpro') ||
        s.notes?.toLowerCase().includes('collectpro')
      ))
      setNotes(allNotes.filter(n =>
        n.title?.toLowerCase().includes('collectpro') ||
        n.title?.toLowerCase().includes('collect pro') ||
        n.title?.toLowerCase().includes('incasso') ||
        n.tags?.some(t => t.toLowerCase().includes('collectpro'))
      ))
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setSubmitting(true)
      await tasksStorage.create({
        title: `[CollectPro] ${taskForm.title}`,
        description: taskForm.description || undefined,
        status: 'todo',
        priority: taskForm.priority as Task['priority'],
        assignee: 'bart',
      })
      await loadData()
      setIsTaskDialogOpen(false)
      setTaskForm({ title: "", description: "", priority: "medium" })
    } catch (error) {
      console.error('Failed to create task:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setSubmitting(true)
      await notesStorage.create({
        title: `[CollectPro] ${noteForm.title}`,
        content: noteForm.content,
        tags: ['collectpro', 'incasso'],
      })
      await loadData()
      setIsNoteDialogOpen(false)
      setNoteForm({ title: "", content: "" })
    } catch (error) {
      console.error('Failed to create note:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const openTasks = tasks.filter(t => t.status !== 'done')
  const doneTasks = tasks.filter(t => t.status === 'done')

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-background to-background dark:from-blue-950/25 dark:via-background dark:to-background">
        <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Loading CollectPro...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-background to-background dark:from-blue-950/25 dark:via-background dark:to-background">
      <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/20">
              <Landmark className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">CollectPro</h1>
              <p className="text-muted-foreground">Incasso Business van Bart</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Taak
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Nieuwe CollectPro taak</DialogTitle>
                  <DialogDescription>Voeg een taak toe voor CollectPro</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateTask} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Titel</label>
                    <Input value={taskForm.title} onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })} placeholder="Taak omschrijving" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Beschrijving</label>
                    <textarea
                      value={taskForm.description}
                      onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                      placeholder="Optionele details..."
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Prioriteit</label>
                    <select
                      value={taskForm.priority}
                      onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="low">Laag</option>
                      <option value="medium">Gemiddeld</option>
                      <option value="high">Hoog</option>
                    </select>
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={submitting}>
                    {submitting ? 'Opslaan...' : 'Taak aanmaken'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
            <Dialog open={isNoteDialogOpen} onOpenChange={setIsNoteDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Notitie
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Nieuwe CollectPro notitie</DialogTitle>
                  <DialogDescription>Notities, ideeën, of plannen voor CollectPro</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateNote} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Titel</label>
                    <Input value={noteForm.title} onChange={(e) => setNoteForm({ ...noteForm, title: e.target.value })} placeholder="Onderwerp" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Inhoud</label>
                    <textarea
                      value={noteForm.content}
                      onChange={(e) => setNoteForm({ ...noteForm, content: e.target.value })}
                      placeholder="Schrijf je notitie..."
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={submitting}>
                    {submitting ? 'Opslaan...' : 'Notitie opslaan'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <CheckSquare className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Open taken</span>
              </div>
              <p className="text-2xl font-bold mt-1">{openTasks.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Websites</span>
              </div>
              <p className="text-2xl font-bold mt-1">{sites.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Notities</span>
              </div>
              <p className="text-2xl font-bold mt-1">{notes.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-muted-foreground">Afgerond</span>
              </div>
              <p className="text-2xl font-bold mt-1 text-blue-500">{doneTasks.length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mt-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overzicht">Overzicht</TabsTrigger>
              <TabsTrigger value="taken">Taken ({openTasks.length})</TabsTrigger>
              <TabsTrigger value="notities">Notities ({notes.length})</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Content */}
        <div className="mt-4 space-y-4">
          {activeTab === "overzicht" && (
            <>
              {/* About */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Landmark className="h-5 w-5 text-blue-500" />
                    Over CollectPro
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <p className="text-muted-foreground">
                      CollectPro is Bart&apos;s incasso business. Beheer hier alle taken, websites, notities en plannen voor deze business unit.
                    </p>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="rounded-lg border p-4">
                        <h4 className="font-medium mb-2">Business Details</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>Type: Incasso / Debt Collection</li>
                          <li>Status: Actief</li>
                          <li>Eigenaar: Bart Deblock</li>
                        </ul>
                      </div>
                      {sites.length > 0 && (
                        <div className="rounded-lg border p-4">
                          <h4 className="font-medium mb-2">Websites</h4>
                          <ul className="space-y-1 text-sm">
                            {sites.map(site => (
                              <li key={site.id} className="flex items-center gap-2">
                                <Globe className="h-3 w-3 text-muted-foreground" />
                                <a href={`https://${site.domain}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center gap-1">
                                  {site.domain}
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                                <Badge variant="outline" className="text-xs">{site.status}</Badge>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Tasks */}
              {openTasks.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Open Taken</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {openTasks.slice(0, 5).map(task => (
                        <div key={task.id} className="flex items-center justify-between rounded-lg border p-3">
                          <div>
                            <p className="text-sm font-medium">{task.title.replace('[CollectPro] ', '')}</p>
                            {task.description && <p className="text-xs text-muted-foreground mt-1">{task.description}</p>}
                          </div>
                          <Badge className={
                            task.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200' :
                            task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200' :
                            'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200'
                          }>
                            {task.priority || 'medium'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          {activeTab === "taken" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Alle CollectPro Taken</CardTitle>
              </CardHeader>
              <CardContent>
                {tasks.length === 0 ? (
                  <p className="text-center py-8 text-muted-foreground">Nog geen taken. Maak je eerste CollectPro taak aan!</p>
                ) : (
                  <div className="space-y-2">
                    {tasks.map(task => (
                      <div key={task.id} className={`flex items-center justify-between rounded-lg border p-3 ${task.status === 'done' ? 'opacity-50' : ''}`}>
                        <div className="flex items-center gap-3">
                          <div className={`h-2 w-2 rounded-full ${
                            task.status === 'done' ? 'bg-green-500' :
                            task.status === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-400'
                          }`} />
                          <div>
                            <p className={`text-sm font-medium ${task.status === 'done' ? 'line-through' : ''}`}>
                              {task.title.replace('[CollectPro] ', '')}
                            </p>
                            {task.description && <p className="text-xs text-muted-foreground mt-1">{task.description}</p>}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">{task.status}</Badge>
                          <Badge className={
                            task.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200' :
                            task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200' :
                            'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200'
                          }>
                            {task.priority || 'medium'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeTab === "notities" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">CollectPro Notities</CardTitle>
              </CardHeader>
              <CardContent>
                {notes.length === 0 ? (
                  <p className="text-center py-8 text-muted-foreground">Nog geen notities. Schrijf je eerste CollectPro notitie!</p>
                ) : (
                  <div className="space-y-3">
                    {notes.map(note => (
                      <div key={note.id} className="rounded-lg border p-4">
                        <h4 className="font-medium text-sm">{note.title.replace('[CollectPro] ', '')}</h4>
                        <p className="text-sm text-muted-foreground mt-2 whitespace-pre-wrap">{note.content}</p>
                        <p className="text-xs text-muted-foreground mt-3">{new Date(note.createdAt).toLocaleDateString('nl-BE')}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
