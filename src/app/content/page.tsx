"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Plus, Edit, Trash2, FileText, User, Globe, Calendar, CheckCircle, XCircle, Rocket, MessageSquare, Eye, EyeOff, ChevronDown, ChevronRight } from "lucide-react"
// import ReactMarkdown from "react-markdown" // TODO: install react-markdown

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
import { contentStorage, projectsStorage, type ContentItem, type Project } from "@/lib/storage"

export default function ContentPage() {
  const [content, setContent] = useState<ContentItem[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState("alles")
  const [selectedAuthor, setSelectedAuthor] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false)
  const [editingContent, setEditingContent] = useState<ContentItem | null>(null)
  const [currentContent, setCurrentContent] = useState<ContentItem | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [expandedContent, setExpandedContent] = useState<string | null>(null)
  const [feedback, setFeedback] = useState("")

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    type: "article" as ContentItem['type'],
    status: "draft" as ContentItem['status'],
    author: "wout" as ContentItem['author'],
    targetSite: "",
    targetPath: "",
    projectId: "",
  })

  // Load content and projects on mount
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [contentData, projectsData] = await Promise.all([
        contentStorage.getAll(),
        projectsStorage.getAll(),
      ])
      setContent(contentData)
      setProjects(projectsData)
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredContent = content.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.targetSite?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesTab = selectedTab === "alles" || 
                      (selectedTab === "te-reviewen" && item.status === "review") ||
                      (selectedTab === "goedgekeurd" && item.status === "approved") ||
                      (selectedTab === "afgewezen" && item.status === "rejected") ||
                      (selectedTab === "live" && item.status === "live")
    
    const matchesAuthor = selectedAuthor === "all" || item.author === selectedAuthor
    const matchesType = selectedType === "all" || item.type === selectedType
    
    return matchesSearch && matchesTab && matchesAuthor && matchesType
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setSubmitting(true)
      
      if (editingContent) {
        await contentStorage.update(editingContent.id, {
          title: formData.title,
          body: formData.body,
          type: formData.type,
          status: formData.status,
          author: formData.author,
          targetSite: formData.targetSite || undefined,
          targetPath: formData.targetPath || undefined,
          projectId: formData.projectId || undefined,
        })
      } else {
        await contentStorage.create({
          title: formData.title,
          body: formData.body,
          type: formData.type,
          status: formData.status,
          author: formData.author,
          targetSite: formData.targetSite || undefined,
          targetPath: formData.targetPath || undefined,
          projectId: formData.projectId || undefined,
        })
      }

      // Reload content
      await loadData()
      
      // Reset form
      setIsDialogOpen(false)
      setEditingContent(null)
      setFormData({ title: "", body: "", type: "article", status: "draft", author: "wout", targetSite: "", targetPath: "", projectId: "" })
    } catch (error) {
      console.error('Failed to save content:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (content: ContentItem) => {
    setEditingContent(content)
    setFormData({
      title: content.title,
      body: content.body,
      type: content.type,
      status: content.status,
      author: content.author,
      targetSite: content.targetSite || "",
      targetPath: content.targetPath || "",
      projectId: content.projectId || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (contentId: string) => {
    if (confirm("Weet je zeker dat je dit content item wilt verwijderen?")) {
      try {
        await contentStorage.delete(contentId)
        await loadData()
      } catch (error) {
        console.error('Failed to delete content:', error)
      }
    }
  }

  const handleStatusUpdate = async (contentId: string, status: ContentItem['status'], feedbackText?: string) => {
    try {
      await contentStorage.update(contentId, { 
        status,
        feedback: feedbackText 
      })
      await loadData()
      setIsFeedbackDialogOpen(false)
      setFeedback("")
      setCurrentContent(null)
    } catch (error) {
      console.error('Failed to update status:', error)
    }
  }

  const openFeedbackDialog = (content: ContentItem, action: 'reject') => {
    setCurrentContent(content)
    setFeedback(content.feedback || "")
    setIsFeedbackDialogOpen(true)
  }

  const getStatusColor = (status: ContentItem['status']) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200'
      case 'review': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200'
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200'
      case 'live': return 'bg-[#F5911E]/20 text-[#F5911E] dark:bg-[#F5911E]/20 dark:text-[#F5911E]'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200'
    }
  }

  const getTypeColor = (type: ContentItem['type']) => {
    switch (type) {
      case 'article': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-200'
      case 'product-review': return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-200'
      case 'buyers-guide': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-200'
      case 'page': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-200'
      case 'other': return 'bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-200'
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

  // Stats
  const stats = {
    alles: content.length,
    'te-reviewen': content.filter(c => c.status === 'review').length,
    goedgekeurd: content.filter(c => c.status === 'approved').length,
    afgewezen: content.filter(c => c.status === 'rejected').length,
    live: content.filter(c => c.status === 'live').length,
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-background to-background dark:from-orange-950/25 dark:via-background dark:to-background">
        <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Loading content...</div>
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
            <h1 className="text-3xl font-bold tracking-tight">Content Review</h1>
            <p className="text-muted-foreground">
              {stats['te-reviewen']} te reviewen · {stats.goedgekeurd} goedgekeurd · {stats.live} live · {stats.alles} totaal
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#F5911E] hover:bg-[#e07d0a] text-white" onClick={() => {
                setEditingContent(null)
                setFormData({ title: "", body: "", type: "article", status: "draft", author: "wout", targetSite: "", targetPath: "", projectId: "" })
              }}>
                <Plus className="mr-2 h-4 w-4" />
                Content toevoegen
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>{editingContent ? 'Content bewerken' : 'Nieuw content'}</DialogTitle>
                <DialogDescription>
                  {editingContent ? 'Pas de content gegevens aan' : 'Voeg nieuw content toe'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="title" className="text-sm font-medium">Titel</label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Content titel"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="type" className="text-sm font-medium">Type</label>
                    <select
                      id="type"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as ContentItem['type'] })}
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="article">Article</option>
                      <option value="product-review">Product Review</option>
                      <option value="buyers-guide">Buyers Guide</option>
                      <option value="page">Page</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="status" className="text-sm font-medium">Status</label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as ContentItem['status'] })}
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="draft">Draft</option>
                      <option value="review">Te reviewen</option>
                      <option value="approved">Goedgekeurd</option>
                      <option value="rejected">Afgewezen</option>
                      <option value="live">Live</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="author" className="text-sm font-medium">Auteur</label>
                    <select
                      id="author"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="wout">Wout</option>
                      <option value="copycat">Copycat</option>
                      <option value="lisa">Lisa</option>
                      <option value="jc">JC</option>
                      <option value="bart">Bart</option>
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
                      <option value="">Geen project</option>
                      {projects.map(project => (
                        <option key={project.id} value={project.id}>{project.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="targetSite" className="text-sm font-medium">Doelsite</label>
                    <Input
                      id="targetSite"
                      value={formData.targetSite}
                      onChange={(e) => setFormData({ ...formData, targetSite: e.target.value })}
                      placeholder="bijv. preppedia.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="targetPath" className="text-sm font-medium">Doelpad</label>
                    <Input
                      id="targetPath"
                      value={formData.targetPath}
                      onChange={(e) => setFormData({ ...formData, targetPath: e.target.value })}
                      placeholder="bijv. /guide/best-water-filters"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="body" className="text-sm font-medium">Content (Markdown)</label>
                  <Textarea
                    id="body"
                    value={formData.body}
                    onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                    placeholder="Schrijf je content hier in markdown formaat..."
                    className="min-h-[300px]"
                    required
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1 bg-[#F5911E] hover:bg-[#e07d0a] text-white" disabled={submitting}>
                    {submitting ? 'Opslaan...' : (editingContent ? 'Bijwerken' : 'Toevoegen')}
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
              placeholder="Zoek content..."
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
                <option value="wout">Wout</option>
                <option value="copycat">Copycat</option>
                <option value="lisa">Lisa</option>
                <option value="jc">JC</option>
                <option value="bart">Bart</option>
              </select>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="all">Alle types</option>
                <option value="article">Article</option>
                <option value="product-review">Product Review</option>
                <option value="buyers-guide">Buyers Guide</option>
                <option value="page">Page</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="alles">Alles ({stats.alles})</TabsTrigger>
              <TabsTrigger value="te-reviewen">Te reviewen ({stats['te-reviewen']})</TabsTrigger>
              <TabsTrigger value="goedgekeurd">Goedgekeurd ({stats.goedgekeurd})</TabsTrigger>
              <TabsTrigger value="afgewezen">Afgewezen ({stats.afgewezen})</TabsTrigger>
              <TabsTrigger value="live">Live ({stats.live})</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedTab} className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredContent.map((item) => (
                  <Card key={item.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-base truncate">{item.title}</CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-1">
                            <Badge className={getTypeColor(item.type)}>{item.type}</Badge>
                            <Badge className={getAuthorColor(item.author)}>{item.author}</Badge>
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
                          {item.status === 'review' && 'Te reviewen'}
                          {item.status === 'approved' && 'Goedgekeurd'}
                          {item.status === 'rejected' && 'Afgewezen'}
                          {item.status === 'live' && 'Live'}
                          {item.status === 'draft' && 'Draft'}
                        </Badge>
                        
                        {item.targetSite && (
                          <div className="flex items-center gap-1 text-sm">
                            <Globe className="h-4 w-4 text-blue-600" />
                            <span className="font-medium">{item.targetSite}</span>
                            {item.targetPath && <span className="text-muted-foreground">{item.targetPath}</span>}
                          </div>
                        )}

                        {/* Review Actions */}
                        {item.status === 'review' && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                              onClick={() => handleStatusUpdate(item.id, 'approved')}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Goedkeuren
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="flex-1"
                              onClick={() => openFeedbackDialog(item, 'reject')}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Afwijzen
                            </Button>
                          </div>
                        )}

                        {/* Live Button for Approved */}
                        {item.status === 'approved' && (
                          <Button
                            size="sm"
                            className="w-full bg-[#F5911E] hover:bg-[#e07d0a] text-white"
                            onClick={() => handleStatusUpdate(item.id, 'live')}
                          >
                            <Rocket className="h-4 w-4 mr-1" />
                            Live zetten
                          </Button>
                        )}

                        {/* Feedback Display */}
                        {item.feedback && (
                          <div className="p-2 rounded bg-red-50 dark:bg-red-900/20">
                            <div className="flex items-center gap-1 text-xs font-medium text-red-800 dark:text-red-200 mb-1">
                              <MessageSquare className="h-3 w-3" />
                              Feedback:
                            </div>
                            <p className="text-xs text-red-700 dark:text-red-300">{item.feedback}</p>
                          </div>
                        )}

                        {/* Expand/Collapse Content */}
                        <div className="flex items-center justify-between">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setExpandedContent(
                              expandedContent === item.id ? null : item.id
                            )}
                            className="h-6 px-2"
                          >
                            {expandedContent === item.id ? (
                              <>
                                <EyeOff className="h-3 w-3 mr-1" />
                                <span className="text-xs">Verberg content</span>
                              </>
                            ) : (
                              <>
                                <Eye className="h-3 w-3 mr-1" />
                                <span className="text-xs">Toon content</span>
                              </>
                            )}
                          </Button>
                        </div>

                        {/* Expandable content section */}
                        {expandedContent === item.id && (
                          <div className="pt-2 border-t">
                            <div className="max-h-64 overflow-y-auto bg-gray-50 dark:bg-gray-800/50 p-3 rounded text-sm">
                              <pre className="whitespace-pre-wrap text-xs">{item.body}</pre>
                            </div>
                          </div>
                        )}
                        
                        <div className="text-xs text-muted-foreground">
                          Aangemaakt {new Date(item.createdAt).toLocaleDateString('nl-BE')}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredContent.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-muted-foreground">Geen content gevonden</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {searchTerm || selectedAuthor !== "all" || selectedType !== "all"
                      ? "Pas je zoekopdracht of filters aan"
                      : "Voeg je eerste content toe om te beginnen"
                    }
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Feedback Dialog */}
        <Dialog open={isFeedbackDialogOpen} onOpenChange={setIsFeedbackDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Content afwijzen</DialogTitle>
              <DialogDescription>
                Geef feedback over waarom dit content wordt afgewezen.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label htmlFor="feedback" className="text-sm font-medium">Feedback</label>
                <Textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Leg uit wat er moet worden aangepast..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => currentContent && handleStatusUpdate(currentContent.id, 'rejected', feedback)}
                >
                  Content afwijzen
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsFeedbackDialogOpen(false)}>
                  Annuleren
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}