"use client"

import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, Search, User, Calendar, Eye, EyeOff, FileText, BarChart3, Brain, Database, Users, Wrench } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { researchStorage, projectsStorage, type ResearchItem, type Project } from "@/lib/storage"

export default function ResearchPage() {
  const [research, setResearch] = useState<ResearchItem[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState("alles")
  const [selectedAuthor, setSelectedAuthor] = useState<string>("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingResearch, setEditingResearch] = useState<ResearchItem | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [expandedResearch, setExpandedResearch] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    type: "keyword-research" as ResearchItem['type'],
    author: "wout" as ResearchItem['author'],
    projectId: "",
    tags: "",
    status: "draft" as ResearchItem['status'],
  })

  // Load research and projects on mount
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [researchData, projectsData] = await Promise.all([
        researchStorage.getAll(),
        projectsStorage.getAll(),
      ])
      setResearch(researchData)
      setProjects(projectsData)
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredResearch = research.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesTab = selectedTab === "alles" || 
                      (selectedTab === "keyword-research" && item.type === "keyword-research") ||
                      (selectedTab === "market-analysis" && item.type === "market-analysis") ||
                      (selectedTab === "oracle" && item.type === "oracle") ||
                      (selectedTab === "technical" && (item.type === "technical" || item.type === "api-research"))
    
    const matchesAuthor = selectedAuthor === "all" || item.author === selectedAuthor
    
    return matchesSearch && matchesTab && matchesAuthor
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setSubmitting(true)
      
      if (editingResearch) {
        await researchStorage.update(editingResearch.id, {
          title: formData.title,
          body: formData.body,
          type: formData.type,
          author: formData.author,
          projectId: formData.projectId || undefined,
          tags: formData.tags || undefined,
          status: formData.status,
        })
      } else {
        await researchStorage.create({
          title: formData.title,
          body: formData.body,
          type: formData.type,
          author: formData.author,
          projectId: formData.projectId || undefined,
          tags: formData.tags || undefined,
          status: formData.status,
        })
      }

      // Reload research
      await loadData()
      
      // Reset form
      setIsDialogOpen(false)
      setEditingResearch(null)
      setFormData({ title: "", body: "", type: "keyword-research", author: "wout", projectId: "", tags: "", status: "draft" })
    } catch (error) {
      console.error('Failed to save research:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (researchItem: ResearchItem) => {
    setEditingResearch(researchItem)
    setFormData({
      title: researchItem.title,
      body: researchItem.body,
      type: researchItem.type,
      author: researchItem.author,
      projectId: researchItem.projectId || "",
      tags: researchItem.tags || "",
      status: researchItem.status,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (researchId: string) => {
    if (confirm("Weet je zeker dat je dit onderzoek wilt verwijderen?")) {
      try {
        await researchStorage.delete(researchId)
        await loadData()
      } catch (error) {
        console.error('Failed to delete research:', error)
      }
    }
  }

  const getTypeColor = (type: ResearchItem['type']) => {
    switch (type) {
      case 'keyword-research': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200'
      case 'market-analysis': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
      case 'oracle': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-200'
      case 'api-research': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200'
      case 'technical': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200'
      case 'competitor': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200'
      case 'other': return 'bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200'
    }
  }

  const getTypeIcon = (type: ResearchItem['type']) => {
    switch (type) {
      case 'keyword-research': return Search
      case 'market-analysis': return BarChart3
      case 'oracle': return Brain
      case 'api-research': return Database
      case 'technical': return Wrench
      case 'competitor': return Users
      default: return FileText
    }
  }

  const getStatusColor = (status: ResearchItem['status']) => {
    switch (status) {
      case 'draft': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200'
      case 'final': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
      case 'outdated': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200'
    }
  }

  const getAuthorColor = (author: string) => {
    switch (author) {
      case 'wout': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-200'
      case 'copycat': return 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-200'
      case 'lisa': return 'bg-rose-100 text-rose-800 dark:bg-rose-900/20 dark:text-rose-200'
      case 'jc': return 'bg-violet-100 text-violet-800 dark:bg-violet-900/20 dark:text-violet-200'
      case 'bart': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200'
    }
  }

  const getAuthorEmoji = (author: string) => {
    switch (author) {
      case 'wout': return '🔭'
      case 'copycat': return '✍️'
      case 'lisa': return '📊'
      case 'jc': return '🥊'
      case 'bart': return '⚡'
      default: return '👤'
    }
  }

  // Stats
  const stats = {
    alles: research.length,
    'keyword-research': research.filter(r => r.type === 'keyword-research').length,
    'market-analysis': research.filter(r => r.type === 'market-analysis').length,
    oracle: research.filter(r => r.type === 'oracle').length,
    technical: research.filter(r => r.type === 'technical' || r.type === 'api-research').length,
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-background to-background dark:from-orange-950/25 dark:via-background dark:to-background">
        <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Onderzoeken laden...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-background to-background dark:from-orange-950/25 dark:via-background dark:to-background">
      <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Onderzoeken</h1>
            <p className="text-muted-foreground">
              {stats['keyword-research']} keyword · {stats['market-analysis']} markt · {stats.oracle} oracle · {stats.technical} technisch · {stats.alles} totaal
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#F5911E] hover:bg-[#e07d0a] text-white" onClick={() => {
                setEditingResearch(null)
                setFormData({ title: "", body: "", type: "keyword-research", author: "wout", projectId: "", tags: "", status: "draft" })
              }}>
                <Plus className="mr-2 h-4 w-4" />
                Onderzoek toevoegen
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>{editingResearch ? 'Onderzoek bewerken' : 'Nieuw onderzoek'}</DialogTitle>
                <DialogDescription>
                  {editingResearch ? 'Pas het onderzoek aan' : 'Voeg nieuw onderzoek toe aan de kennisbank'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="title" className="text-sm font-medium">Titel</label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Onderzoek titel"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="type" className="text-sm font-medium">Type</label>
                    <select
                      id="type"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as ResearchItem['type'] })}
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="keyword-research">Keyword Research</option>
                      <option value="market-analysis">Market Analysis</option>
                      <option value="api-research">API Research</option>
                      <option value="oracle">Oracle</option>
                      <option value="competitor">Competitor</option>
                      <option value="technical">Technical</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="author" className="text-sm font-medium">Auteur</label>
                    <select
                      id="author"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value as ResearchItem['author'] })}
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="wout">Wout 🔭</option>
                      <option value="copycat">Copycat ✍️</option>
                      <option value="lisa">Lisa 📊</option>
                      <option value="jc">JC 🥊</option>
                      <option value="bart">Bart ⚡</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="status" className="text-sm font-medium">Status</label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as ResearchItem['status'] })}
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="draft">Draft</option>
                      <option value="final">Final</option>
                      <option value="outdated">Outdated</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="projectId" className="text-sm font-medium">Project (optioneel)</label>
                    <select
                      id="projectId"
                      value={formData.projectId}
                      onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="">Geen project</option>
                      {projects.map(project => (
                        <option key={project.id} value={project.id}>{project.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="tags" className="text-sm font-medium">Tags (comma-separated)</label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="bijv. seo, tools, competition"
                  />
                </div>
                <div>
                  <label htmlFor="body" className="text-sm font-medium">Onderzoek (Markdown)</label>
                  <Textarea
                    id="body"
                    value={formData.body}
                    onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                    placeholder="Schrijf je onderzoek hier in markdown formaat..."
                    className="min-h-[300px]"
                    required
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1 bg-[#F5911E] hover:bg-[#e07d0a] text-white" disabled={submitting}>
                    {submitting ? 'Opslaan...' : (editingResearch ? 'Bijwerken' : 'Toevoegen')}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuleren
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </header>

        <div className="mt-6 space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <Input
              placeholder="Zoeken..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="md:max-w-sm"
            />
            <div className="flex gap-2">
              <select
                value={selectedAuthor}
                onChange={(e) => setSelectedAuthor(e.target.value)}
                className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="all">Alle auteurs</option>
                <option value="wout">Wout 🔭</option>
                <option value="copycat">Copycat ✍️</option>
                <option value="lisa">Lisa 📊</option>
                <option value="jc">JC 🥊</option>
                <option value="bart">Bart ⚡</option>
              </select>
            </div>
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="alles">Alles ({stats.alles})</TabsTrigger>
              <TabsTrigger value="keyword-research">Keyword Research ({stats['keyword-research']})</TabsTrigger>
              <TabsTrigger value="market-analysis">Market Analysis ({stats['market-analysis']})</TabsTrigger>
              <TabsTrigger value="oracle">Oracle ({stats.oracle})</TabsTrigger>
              <TabsTrigger value="technical">Technisch ({stats.technical})</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedTab} className="mt-4">
              <div className="grid gap-4 md:grid-cols-2">
                {filteredResearch.map((item) => {
                  const TypeIcon = getTypeIcon(item.type)
                  return (
                    <Card key={item.id}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-base flex items-center gap-2">
                              <TypeIcon className="h-4 w-4" />
                              {item.title}
                            </CardTitle>
                            <CardDescription className="flex items-center gap-2 mt-2">
                              <Badge className={getTypeColor(item.type)}>
                                {item.type === 'keyword-research' ? 'Keyword Research' : 
                                 item.type === 'market-analysis' ? 'Market Analysis' :
                                 item.type === 'api-research' ? 'API Research' :
                                 item.type === 'oracle' ? 'Oracle' :
                                 item.type === 'competitor' ? 'Competitor' :
                                 item.type === 'technical' ? 'Technical' : 'Other'
                                }
                              </Badge>
                              <Badge className={getAuthorColor(item.author)}>
                                {getAuthorEmoji(item.author)} {item.author}
                              </Badge>
                            </CardDescription>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          <Badge className={getStatusColor(item.status)}>
                            {item.status === 'draft' ? 'Draft' : 
                             item.status === 'final' ? 'Final' : 'Outdated'
                            }
                          </Badge>

                          {item.tags && (
                            <div className="flex flex-wrap gap-1">
                              {item.tags.split(',').map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {tag.trim()}
                                </Badge>
                              ))}
                            </div>
                          )}

                          <p className="text-sm text-muted-foreground line-clamp-3">
                            {item.body.slice(0, 200)}...
                          </p>

                          <div className="flex items-center justify-between">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setExpandedResearch(
                                expandedResearch === item.id ? null : item.id
                              )}
                              className="h-6 px-2"
                            >
                              {expandedResearch === item.id ? (
                                <>
                                  <EyeOff className="h-3 w-3 mr-1" />
                                  <span className="text-xs">Verberg</span>
                                </>
                              ) : (
                                <>
                                  <Eye className="h-3 w-3 mr-1" />
                                  <span className="text-xs">Lees meer</span>
                                </>
                              )}
                            </Button>
                          </div>

                          {expandedResearch === item.id && (
                            <div className="pt-2 border-t">
                              <div className="max-h-64 overflow-y-auto bg-gray-50 dark:bg-gray-800/50 p-3 rounded text-sm">
                                <pre className="whitespace-pre-wrap text-xs">{item.body}</pre>
                              </div>
                            </div>
                          )}

                          <div className="text-xs text-muted-foreground flex items-center gap-2">
                            <Calendar className="h-3 w-3" />
                            {new Date(item.createdAt).toLocaleDateString('nl-BE')}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {filteredResearch.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-muted-foreground">Geen onderzoeken gevonden</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {searchTerm || selectedAuthor !== "all"
                      ? "Pas je zoekopdracht of filters aan"
                      : "Voeg je eerste onderzoek toe om te beginnen"
                    }
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}