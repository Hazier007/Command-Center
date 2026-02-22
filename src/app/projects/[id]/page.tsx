"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Edit, Plus, ExternalLink, Calendar, DollarSign, Flag, Users, Globe } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { projectsStorage, sitesStorage, tasksStorage, ideasStorage, type Project, type Site, type Task, type Idea } from "@/lib/storage"

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string

  const [project, setProject] = useState<Project | null>(null)
  const [linkedSites, setLinkedSites] = useState<Site[]>([])
  const [linkedTasks, setLinkedTasks] = useState<Task[]>([])
  const [linkedIdeas, setLinkedIdeas] = useState<Idea[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProjectData()
  }, [projectId])

  const loadProjectData = async () => {
    try {
      setLoading(true)
      
      const [projectsData, sitesData, tasksData, ideasData] = await Promise.all([
        projectsStorage.getAll(),
        sitesStorage.getAll(),
        tasksStorage.getAll(),
        ideasStorage.getAll(),
      ])

      const currentProject = projectsData.find(p => p.id === projectId)
      if (!currentProject) {
        router.push('/projects')
        return
      }

      setProject(currentProject)
      setLinkedSites(sitesData.filter(site => site.projectId === projectId))
      setLinkedTasks(tasksData.filter(task => task.projectId === projectId))
      
      // Find linked ideas (ideas that were converted to this project)
      // We check if the idea title contains the project name (case insensitive)
      const relatedIdeas = ideasData.filter(idea => 
        idea.title.toLowerCase().includes(currentProject.name.toLowerCase()) ||
        idea.description.toLowerCase().includes(currentProject.name.toLowerCase())
      )
      setLinkedIdeas(relatedIdeas)

    } catch (error) {
      console.error('Failed to load project data:', error)
      router.push('/projects')
    } finally {
      setLoading(false)
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

  const getSiteStatusColor = (status: Site['status']) => {
    switch (status) {
      case 'live': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
      case 'dev': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-200'
      case 'planned': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200'
    }
  }

  const getTaskStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'todo': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200'
      case 'in-progress': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-200'
      case 'review': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-200'
      case 'done': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200'
    }
  }

  const getPriorityColor = (priority?: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200'
      case 'medium': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-200'
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
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

  const getIdeaCategoryIcon = (category: Idea['category']) => {
    switch (category) {
      case 'business': return '🏢'
      case 'directory': return '📁'
      case 'leadgen': return '🎯'
      case 'tool': return '🔧'
      case 'client': return '👥'
      case 'feature': return '⭐'
      default: return '💡'
    }
  }

  const isOverdue = (dueDate?: string) => {
    if (!dueDate) return false
    return new Date(dueDate) < new Date()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-background to-background dark:from-orange-950/25 dark:via-background dark:to-background">
        <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Project laden...</div>
          </div>
        </div>
      </div>
    )
  }

  if (!project) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-background to-background dark:from-orange-950/25 dark:via-background dark:to-background">
      <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
        <header className="space-y-4">
          {/* Back button and actions */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Button variant="ghost" onClick={() => router.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Terug naar projecten
            </Button>
            
            <div className="flex gap-2">
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Bewerken
              </Button>
            </div>
          </div>

          {/* Project header */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{getCategoryIcon(project.category)}</span>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
                <p className="text-muted-foreground capitalize">{project.category}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge className={getStatusColor(project.status)}>
                {project.status}
              </Badge>
              {project.revenue && (
                <div className="flex items-center gap-1 text-sm">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="font-medium">€{project.revenue.toLocaleString()}/maand</span>
                </div>
              )}
            </div>

            {project.description && (
              <p className="text-muted-foreground text-lg">{project.description}</p>
            )}
          </div>
        </header>

        <div className="mt-8 space-y-8">
          {/* Quick actions */}
          <div className="flex flex-wrap gap-2">
            <Button 
              className="bg-[#F5911E] hover:bg-[#e07d0a] text-white"
              onClick={() => router.push('/sites')}
            >
              <Plus className="mr-2 h-4 w-4" />
              Site toevoegen
            </Button>
            <Button 
              className="bg-[#F5911E] hover:bg-[#e07d0a] text-white"
              onClick={() => router.push(`/tasks?project=${projectId}`)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Taak toevoegen
            </Button>
          </div>

          {/* Linked Sites */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">
              Sites ({linkedSites.length})
            </h2>
            {linkedSites.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {linkedSites.map((site) => (
                  <Card key={site.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <Globe className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <CardTitle className="text-base truncate">{site.domain}</CardTitle>
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
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <Badge className={getSiteStatusColor(site.status)}>
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
                              <DollarSign className="h-3 w-3 text-green-600" />
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
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground mb-4">Geen sites gekoppeld aan dit project</p>
                  <Button 
                    className="bg-[#F5911E] hover:bg-[#e07d0a] text-white"
                    onClick={() => router.push('/sites')}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Site toevoegen
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Linked Tasks */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">
              Taken ({linkedTasks.length})
            </h2>
            {linkedTasks.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {linkedTasks.map((task) => (
                  <Card key={task.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-base leading-tight">{task.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        {task.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {task.description}
                          </p>
                        )}
                        
                        <div className="flex flex-wrap gap-1">
                          <Badge className={getTaskStatusColor(task.status)}>
                            {task.status}
                          </Badge>
                          {task.priority && (
                            <Badge className={getPriorityColor(task.priority)}>
                              <Flag className="h-2 w-2 mr-1" />
                              {task.priority}
                            </Badge>
                          )}
                          {task.assignee && (
                            <Badge variant="outline" className="text-xs">
                              <Users className="h-2 w-2 mr-1" />
                              {task.assignee}
                            </Badge>
                          )}
                          {task.dueDate && (
                            <Badge 
                              variant={isOverdue(task.dueDate) ? "destructive" : "outline"} 
                              className="text-xs"
                            >
                              <Calendar className="h-2 w-2 mr-1" />
                              {new Date(task.dueDate).toLocaleDateString('nl-BE')}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground mb-4">Geen taken gekoppeld aan dit project</p>
                  <Button 
                    className="bg-[#F5911E] hover:bg-[#e07d0a] text-white"
                    onClick={() => router.push(`/tasks?project=${projectId}`)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Taak toevoegen
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Linked Ideas */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">
              Gerelateerde Ideeën ({linkedIdeas.length})
            </h2>
            {linkedIdeas.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {linkedIdeas.map((idea) => (
                  <Card key={idea.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getIdeaCategoryIcon(idea.category)}</span>
                          <div>
                            <CardTitle className="text-base">{idea.title}</CardTitle>
                            <CardDescription className="capitalize">
                              {idea.category}
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {idea.description}
                        </p>
                        
                        <Badge className={getPriorityColor(idea.priority)}>
                          <Flag className="h-2 w-2 mr-1" />
                          {idea.priority}
                        </Badge>
                        
                        <div className="text-xs text-muted-foreground">
                          Toegevoegd {new Date(idea.createdAt).toLocaleDateString('nl-BE')}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">Geen gerelateerde ideeën gevonden</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Project metadata */}
          <div className="pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              Project aangemaakt op {new Date(project.createdAt).toLocaleDateString('nl-BE')} · 
              Laatst bijgewerkt {new Date(project.updatedAt).toLocaleDateString('nl-BE')}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}