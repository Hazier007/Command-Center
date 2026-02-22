"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Users, FileText, DollarSign } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { projectsStorage, tasksStorage, sitesStorage, type Project, type Task, type Site } from "@/lib/storage"

interface PipelineStats {
  idea: number
  research: number
  build: number
  testing: number
  live: number
  optimizing: number
  totalRevenue: number
}

const phases = [
  { id: 'idea', label: 'Idee', emoji: '💡', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-200' },
  { id: 'research', label: 'Onderzoek', emoji: '🔭', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200' },
  { id: 'build', label: 'Bouwen', emoji: '🔨', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-200' },
  { id: 'testing', label: 'Testen', emoji: '🧪', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-200' },
  { id: 'live', label: 'Live', emoji: '🚀', color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200' },
  { id: 'optimizing', label: 'Optimaliseren', emoji: '📈', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-200' }
] as const

export default function PipelinePage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [sites, setSites] = useState<Site[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<PipelineStats>({
    idea: 0,
    research: 0,
    build: 0,
    testing: 0,
    live: 0,
    optimizing: 0,
    totalRevenue: 0
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [projectsData, tasksData, sitesData] = await Promise.all([
        projectsStorage.getAll(),
        tasksStorage.getAll(),
        sitesStorage.getAll(),
      ])
      setProjects(projectsData)
      setTasks(tasksData)
      setSites(sitesData)

      // Calculate stats
      const newStats = phases.reduce((acc, phase) => {
        const phaseProjects = projectsData.filter(p => p.phase === phase.id)
        acc[phase.id as keyof PipelineStats] = phaseProjects.length
        return acc
      }, {} as any)

      // Calculate total revenue from live and optimizing projects
      const liveAndOptimizingProjects = projectsData.filter(p => p.phase === 'live' || p.phase === 'optimizing')
      newStats.totalRevenue = liveAndOptimizingProjects.reduce((sum, p) => sum + (p.revenue || 0), 0)

      setStats(newStats)
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }

  const moveProject = async (projectId: string, newPhase: Project['phase']) => {
    try {
      await projectsStorage.update(projectId, { phase: newPhase })
      await loadData()
    } catch (error) {
      console.error('Failed to move project:', error)
    }
  }

  const getProjectsByPhase = (phase: string) => {
    return projects.filter(p => (p.phase || 'idea') === phase)
  }

  const getProjectTasks = (projectId: string) => {
    return tasks.filter(task => task.projectId === projectId)
  }

  const getProjectSites = (projectId: string) => {
    return sites.filter(site => site.projectId === projectId)
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

  const getPhaseIndex = (phase?: string) => {
    return phases.findIndex(p => p.id === (phase || 'idea'))
  }

  const canMovePrevious = (phase?: string) => {
    return getPhaseIndex(phase) > 0
  }

  const canMoveNext = (phase?: string) => {
    return getPhaseIndex(phase) < phases.length - 1
  }

  const getNextPhase = (phase?: string) => {
    const currentIndex = getPhaseIndex(phase)
    return currentIndex < phases.length - 1 ? phases[currentIndex + 1].id : null
  }

  const getPreviousPhase = (phase?: string) => {
    const currentIndex = getPhaseIndex(phase)
    return currentIndex > 0 ? phases[currentIndex - 1].id : null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-background to-background dark:from-orange-950/25 dark:via-background dark:to-background">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Pipeline laden...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-background to-background dark:from-orange-950/25 dark:via-background dark:to-background">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Pipeline</h1>
          <p className="text-muted-foreground">
            Visualiseer project fases · €{stats.totalRevenue.toLocaleString()}/maand van live projecten
          </p>
        </header>

        {/* Stats Bar */}
        <div className="mb-6 grid grid-cols-3 md:grid-cols-6 gap-4">
          {phases.map((phase) => (
            <div key={phase.id} className="text-center">
              <div className="text-2xl mb-1">{phase.emoji}</div>
              <div className="text-2xl font-bold">{stats[phase.id as keyof PipelineStats] || 0}</div>
              <div className="text-xs text-muted-foreground">{phase.label}</div>
            </div>
          ))}
        </div>

        {/* Pipeline Columns */}
        <div className="flex gap-4 overflow-x-auto pb-4">
          {phases.map((phase) => {
            const phaseProjects = getProjectsByPhase(phase.id)
            
            return (
              <div key={phase.id} className="min-w-[300px] flex-shrink-0">
                {/* Column Header */}
                <div className={`rounded-t-lg p-4 ${phase.color}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{phase.emoji}</span>
                    <h2 className="font-semibold">{phase.label}</h2>
                    <Badge variant="secondary" className="ml-auto">
                      {phaseProjects.length}
                    </Badge>
                  </div>
                </div>

                {/* Project Cards */}
                <div className="bg-muted/50 min-h-[400px] p-4 space-y-3 rounded-b-lg">
                  {phaseProjects.map((project) => {
                    const projectTasks = getProjectTasks(project.id)
                    const projectSites = getProjectSites(project.id)
                    const doneTasks = projectTasks.filter(t => t.status === 'done').length
                    
                    return (
                      <Card key={project.id} className="bg-background">
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                              <span className="text-sm">{getCategoryIcon(project.category)}</span>
                              <div className="min-w-0 flex-1">
                                <CardTitle className="text-sm truncate">{project.name}</CardTitle>
                                <CardDescription className="text-xs capitalize">
                                  {project.category}
                                </CardDescription>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="pt-0 space-y-2">
                          {/* Revenue */}
                          {project.revenue && (
                            <div className="flex items-center gap-1 text-xs">
                              <DollarSign className="h-3 w-3 text-green-600" />
                              <span className="font-medium">€{project.revenue.toLocaleString()}/mnd</span>
                            </div>
                          )}

                          {/* Sites count */}
                          {projectSites.length > 0 && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <span>🌐</span>
                              <span>{projectSites.length} site{projectSites.length !== 1 ? 's' : ''}</span>
                            </div>
                          )}

                          {/* Tasks count */}
                          {projectTasks.length > 0 && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Users className="h-3 w-3" />
                              <span>{doneTasks}/{projectTasks.length} taken</span>
                            </div>
                          )}

                          {/* Move buttons */}
                          <div className="flex justify-between pt-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2"
                              onClick={() => moveProject(project.id, getPreviousPhase(project.phase) as Project['phase'])}
                              disabled={!canMovePrevious(project.phase)}
                            >
                              <ChevronLeft className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2"
                              onClick={() => moveProject(project.id, getNextPhase(project.phase) as Project['phase'])}
                              disabled={!canMoveNext(project.phase)}
                            >
                              <ChevronRight className="h-3 w-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}

                  {phaseProjects.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <div className="text-4xl mb-2">{phase.emoji}</div>
                      <div className="text-sm">Geen projecten in {phase.label.toLowerCase()}</div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}