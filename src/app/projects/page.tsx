"use client"

import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, DollarSign, Users } from "lucide-react"

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
import { projectsStorage, type Project } from "@/lib/storage"

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [submitting, setSubmitting] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    status: "planned" as Project['status'],
    category: "tool" as Project['category'],
    description: "",
    revenue: "",
  })

  // Load projects on mount
  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      setLoading(true)
      const data = await projectsStorage.getAll()
      setProjects(data)
    } catch (error) {
      console.error('Failed to load projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setSubmitting(true)
      
      if (editingProject) {
        await projectsStorage.update(editingProject.id, {
          name: formData.name,
          status: formData.status,
          category: formData.category,
          description: formData.description || undefined,
          revenue: formData.revenue ? parseFloat(formData.revenue) : undefined,
        })
      } else {
        await projectsStorage.create({
          name: formData.name,
          status: formData.status,
          category: formData.category,
          description: formData.description || undefined,
          revenue: formData.revenue ? parseFloat(formData.revenue) : undefined,
        })
      }

      // Reload projects
      await loadProjects()
      
      // Reset form
      setIsDialogOpen(false)
      setEditingProject(null)
      setFormData({ name: "", status: "planned", category: "tool", description: "", revenue: "" })
    } catch (error) {
      console.error('Failed to save project:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setFormData({
      name: project.name,
      status: project.status,
      category: project.category,
      description: project.description || "",
      revenue: project.revenue?.toString() || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (projectId: string) => {
    if (confirm("Weet je zeker dat je dit project wilt verwijderen?")) {
      try {
        await projectsStorage.delete(projectId)
        await loadProjects()
      } catch (error) {
        console.error('Failed to delete project:', error)
      }
    }
  }

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
      case 'planned': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200'
      case 'paused': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200'
    }
  }

  const getCategoryIcon = (category: Project['category']) => {
    switch (category) {
      case 'business': return '🏢'
      case 'directory': return '📁'
      case 'leadgen': return '🎯'
      case 'tool': return '🔧'
      case 'client': return '👥'
      case 'event': return '🎪'
      default: return '📋'
    }
  }

  const totalRevenue = projects.reduce((sum, p) => sum + (p.revenue || 0), 0)
  const activeProjects = projects.filter(p => p.status === 'active')

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-background to-background dark:from-orange-950/25 dark:via-background dark:to-background">
        <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Loading projects...</div>
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
            <h1 className="text-3xl font-bold tracking-tight">Projecten</h1>
            <p className="text-muted-foreground">
              €{totalRevenue.toLocaleString()}/maand · {activeProjects.length} actief · {projects.length} totaal
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#F5911E] hover:bg-[#e07d0a] text-white" onClick={() => {
                setEditingProject(null)
                setFormData({ name: "", status: "planned", category: "tool", description: "", revenue: "" })
              }}>
                <Plus className="mr-2 h-4 w-4" />
                Project toevoegen
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingProject ? 'Project bewerken' : 'Nieuw project'}</DialogTitle>
                <DialogDescription>
                  {editingProject ? 'Pas de projectgegevens aan' : 'Voeg een nieuw project toe'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="text-sm font-medium">Naam</label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Projectnaam"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="status" className="text-sm font-medium">Status</label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as Project['status'] })}
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="planned">Planned</option>
                      <option value="active">Active</option>
                      <option value="paused">Paused</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="category" className="text-sm font-medium">Category</label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as Project['category'] })}
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="business">Business</option>
                      <option value="directory">Directory</option>
                      <option value="leadgen">Lead Generation</option>
                      <option value="tool">Tool</option>
                      <option value="client">Client</option>
                      <option value="event">Event</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="revenue" className="text-sm font-medium">Maandelijkse omzet (€)</label>
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
                  <label htmlFor="description" className="text-sm font-medium">Beschrijving</label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Korte beschrijving"
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1 bg-[#F5911E] hover:bg-[#e07d0a] text-white" disabled={submitting}>
                    {submitting ? 'Opslaan...' : (editingProject ? 'Bijwerken' : 'Toevoegen')}
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
              placeholder="Zoek projecten..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="md:max-w-sm"
            />
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="grid w-full grid-cols-3 md:w-auto md:grid-cols-7">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="business">Business</TabsTrigger>
                <TabsTrigger value="directory">Directory</TabsTrigger>
                <TabsTrigger value="leadgen">Leadgen</TabsTrigger>
                <TabsTrigger value="tool">Tool</TabsTrigger>
                <TabsTrigger value="client">Client</TabsTrigger>
                <TabsTrigger value="event">Event</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <Card key={project.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getCategoryIcon(project.category)}</span>
                      <div>
                        <CardTitle className="text-base">{project.name}</CardTitle>
                        <CardDescription className="capitalize">
                          {project.category}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(project)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(project.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                    
                    {project.description && (
                      <p className="text-sm text-muted-foreground">
                        {project.description}
                      </p>
                    )}
                    
                    {project.revenue && (
                      <div className="flex items-center gap-1 text-sm">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="font-medium">€{project.revenue.toLocaleString()}/maand</span>
                      </div>
                    )}
                    
                    <div className="text-xs text-muted-foreground">
                      Aangemaakt {new Date(project.createdAt).toLocaleDateString('nl-BE')}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && !loading && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-muted-foreground">Geen projecten gevonden</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {searchTerm || selectedCategory !== "all" 
                  ? "Pas je zoekopdracht of filter aan"
                  : "Voeg je eerste project toe om te beginnen"
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}