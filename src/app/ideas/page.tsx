"use client"

import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, Lightbulb, Star } from "lucide-react"

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
import { ideasStorage, type Idea } from "@/lib/storage"

export default function IdeasPage() {
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedPriority, setSelectedPriority] = useState<string>("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingIdea, setEditingIdea] = useState<Idea | null>(null)
  const [submitting, setSubmitting] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "tool" as Idea['category'],
    priority: "medium" as Idea['priority'],
  })

  useEffect(() => {
    loadIdeas()
  }, [])

  const loadIdeas = async () => {
    try {
      setLoading(true)
      const data = await ideasStorage.getAll()
      setIdeas(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
    } catch (error) {
      console.error('Failed to load ideas:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredIdeas = ideas.filter(idea => {
    const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         idea.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || idea.category === selectedCategory
    const matchesPriority = selectedPriority === "all" || idea.priority === selectedPriority
    return matchesSearch && matchesCategory && matchesPriority
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setSubmitting(true)
      
      if (editingIdea) {
        await ideasStorage.update(editingIdea.id, {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          priority: formData.priority,
        })
      } else {
        await ideasStorage.create({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          priority: formData.priority,
        })
      }

      await loadIdeas()
      setIsDialogOpen(false)
      setEditingIdea(null)
      resetForm()
    } catch (error) {
      console.error('Failed to save idea:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "tool",
      priority: "medium",
    })
  }

  const handleEdit = (idea: Idea) => {
    setEditingIdea(idea)
    setFormData({
      title: idea.title,
      description: idea.description,
      category: idea.category,
      priority: idea.priority,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (ideaId: string) => {
    if (confirm("Weet je zeker dat je dit idee wilt verwijderen?")) {
      try {
        await ideasStorage.delete(ideaId)
        await loadIdeas()
      } catch (error) {
        console.error('Failed to delete idea:', error)
      }
    }
  }

  const getPriorityColor = (priority: Idea['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200'
      case 'medium': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-200'
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200'
    }
  }

  const getCategoryIcon = (category: Idea['category']) => {
    switch (category) {
      case 'directory': return '📁'
      case 'leadgen': return '🎯'
      case 'tool': return '🔧'
      case 'client': return '👥'
      case 'business': return '🏢'
      case 'feature': return '✨'
      default: return '💡'
    }
  }

  const getPriorityStars = (priority: Idea['priority']) => {
    const count = priority === 'high' ? 3 : priority === 'medium' ? 2 : 1
    return Array(count).fill(0).map((_, i) => (
      <Star key={i} className="h-3 w-3 fill-current text-yellow-500" />
    ))
  }

  const highPriorityIdeas = ideas.filter(i => i.priority === 'high')
  const recentIdeas = ideas.slice(0, 5)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-background to-background dark:from-orange-950/25 dark:via-background dark:to-background">
        <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Loading ideas...</div>
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
            <h1 className="text-3xl font-bold tracking-tight">Ideeën</h1>
            <p className="text-muted-foreground">
              {ideas.length} totaal · {highPriorityIdeas.length} hoge prioriteit
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#F5911E] hover:bg-[#e07d0a] text-white" onClick={() => {
                setEditingIdea(null)
                resetForm()
              }}>
                <Plus className="mr-2 h-4 w-4" />
                Idee toevoegen
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingIdea ? 'Idee bewerken' : 'Nieuw idee'}</DialogTitle>
                <DialogDescription>
                  {editingIdea ? 'Pas de details aan' : 'Leg snel je idee vast voor later'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="title" className="text-sm font-medium">Titel</label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Titel van je idee"
                    required
                    autoFocus
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="text-sm font-medium">Beschrijving</label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Beschrijf je idee in meer detail..."
                    className="min-h-[100px]"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="category" className="text-sm font-medium">Categorie</label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as Idea['category'] })}
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="directory">Directory</option>
                      <option value="leadgen">Lead Generation</option>
                      <option value="tool">Tool</option>
                      <option value="client">Client</option>
                      <option value="business">Business</option>
                      <option value="feature">Feature</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="priority" className="text-sm font-medium">Prioriteit</label>
                    <select
                      id="priority"
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value as Idea['priority'] })}
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="low">Laag</option>
                      <option value="medium">Medium</option>
                      <option value="high">Hoog</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1 bg-[#F5911E] hover:bg-[#e07d0a] text-white" disabled={submitting}>
                    {submitting ? 'Opslaan...' : (editingIdea ? 'Bijwerken' : 'Toevoegen')}
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
              placeholder="Zoek ideeën..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="md:max-w-sm"
            />
            <div className="flex gap-2">
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                <TabsList className="grid w-full grid-cols-3 md:w-auto md:grid-cols-7">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="directory">Directory</TabsTrigger>
                  <TabsTrigger value="leadgen">Leadgen</TabsTrigger>
                  <TabsTrigger value="tool">Tool</TabsTrigger>
                  <TabsTrigger value="client">Client</TabsTrigger>
                  <TabsTrigger value="business">Business</TabsTrigger>
                  <TabsTrigger value="feature">Feature</TabsTrigger>
                </TabsList>
              </Tabs>
              <Tabs value={selectedPriority} onValueChange={setSelectedPriority}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="high">High</TabsTrigger>
                  <TabsTrigger value="medium">Medium</TabsTrigger>
                  <TabsTrigger value="low">Low</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Star className="h-5 w-5 text-red-600" />
                  Hoge Prioriteit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{highPriorityIdeas.length}</div>
                <p className="text-sm text-muted-foreground">Ideeën die aandacht nodig hebben</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-orange-600" />
                  Recente Ideeën
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{recentIdeas.length}</div>
                <p className="text-sm text-muted-foreground">Deze week toegevoegd</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Plus className="h-5 w-5 text-blue-600" />
                  Snel vastleggen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setEditingIdea(null)
                    resetForm()
                    setIsDialogOpen(true)
                  }}
                >
                  Nieuw idee
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredIdeas.map((idea) => (
              <Card key={idea.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <span className="text-xl flex-shrink-0 mt-1">{getCategoryIcon(idea.category)}</span>
                      <div className="min-w-0 flex-1">
                        <CardTitle className="text-base leading-tight">{idea.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <CardDescription className="capitalize">
                            {idea.category}
                          </CardDescription>
                          <div className="flex items-center gap-1">
                            {getPriorityStars(idea.priority)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(idea)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(idea.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <Badge className={getPriorityColor(idea.priority)}>
                      {idea.priority === 'high' ? 'Hoog' : idea.priority === 'medium' ? 'Medium' : 'Laag'}
                    </Badge>
                    
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {idea.description}
                    </p>
                    
                    <div className="text-xs text-muted-foreground">
                      {new Date(idea.createdAt).toLocaleDateString()} · {new Date(idea.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredIdeas.length === 0 && (
            <div className="text-center py-12">
              <Lightbulb className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground">Geen ideeën gevonden</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {searchTerm || selectedCategory !== "all" || selectedPriority !== "all"
                  ? "Pas je zoekopdracht of filters aan"
                  : "Voeg je eerste idee toe om te beginnen"
                }
              </p>
              {!searchTerm && selectedCategory === "all" && selectedPriority === "all" && (
                <Button 
                  className="mt-4" 
                  onClick={() => {
                    setEditingIdea(null)
                    resetForm()
                    setIsDialogOpen(true)
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Voeg je eerste idee toe
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}