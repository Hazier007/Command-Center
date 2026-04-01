"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Users, DollarSign } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { projectsStorage, type Project } from "@/lib/storage"

type PipelineStage = 'lead' | 'offerte' | 'actief' | 'afgerond'

const PIPELINE_STAGES: { key: PipelineStage; label: string; color: string }[] = [
  { key: 'lead', label: 'Lead', color: 'border-blue-500' },
  { key: 'offerte', label: 'Offerte', color: 'border-yellow-500' },
  { key: 'actief', label: 'Actief', color: 'border-green-500' },
  { key: 'afgerond', label: 'Afgerond', color: 'border-gray-500' },
]

function mapProjectToStage(project: Project): PipelineStage {
  switch (project.status) {
    case 'planned': return project.contractType ? 'offerte' : 'lead'
    case 'active': return 'actief'
    case 'paused': return 'afgerond'
    default: return 'lead'
  }
}

export default function PipelinePage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await projectsStorage.getAll()
        setProjects(data.filter(p => p.ownerType === 'client' || p.category === 'client'))
      } catch (error) {
        console.error('Failed to load pipeline:', error)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const getStageProjects = (stage: PipelineStage) => {
    return projects.filter(p => mapProjectToStage(p) === stage)
  }

  const getStageValue = (stage: PipelineStage) => {
    return getStageProjects(stage).reduce((sum, p) => sum + (p.monthlyFee || p.revenue || 0), 0)
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
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Loading pipeline...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-background to-background dark:from-orange-950/25 dark:via-background dark:to-background">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <Link href="/clients">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Terug naar klanten
          </Button>
        </Link>

        <header>
          <h1 className="text-3xl font-bold tracking-tight">Client Pipeline</h1>
          <p className="text-muted-foreground">
            {projects.length} projecten in de pipeline
          </p>
        </header>

        {/* Pipeline Board */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
          {PIPELINE_STAGES.map(stage => {
            const stageProjects = getStageProjects(stage.key)
            const stageValue = getStageValue(stage.key)
            return (
              <div key={stage.key} className="space-y-3">
                {/* Column Header */}
                <div className={`p-3 rounded-lg border-t-4 ${stage.color} bg-gray-50 dark:bg-gray-800/50`}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{stage.label}</h3>
                    <Badge variant="outline">{stageProjects.length}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stageValue.toLocaleString('nl-BE', { style: 'currency', currency: 'EUR' })}/mo
                  </p>
                </div>

                {/* Cards */}
                <div className="space-y-2">
                  {stageProjects.map(project => (
                    <Link key={project.id} href={`/clients/${project.id}`}>
                      <Card className="hover:border-[#F5911E]/50 transition-colors cursor-pointer mb-2">
                        <CardContent className="p-3">
                          <div className="space-y-2">
                            <div className="flex items-start justify-between">
                              <p className="text-sm font-medium">{project.clientName || project.name}</p>
                            </div>
                            {project.description && (
                              <p className="text-xs text-muted-foreground line-clamp-2">{project.description}</p>
                            )}
                            <div className="flex items-center justify-between">
                              <Badge className={getContractColor(project.contractType)} style={{ fontSize: '10px' }}>
                                {project.contractType || 'n/a'}
                              </Badge>
                              {(project.monthlyFee || project.revenue) && (
                                <span className="text-xs font-medium text-green-600">
                                  {(project.monthlyFee || project.revenue || 0).toLocaleString('nl-BE', { style: 'currency', currency: 'EUR' })}
                                </span>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                  {stageProjects.length === 0 && (
                    <div className="text-center py-8 text-xs text-muted-foreground border border-dashed rounded-lg">
                      Geen projecten
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
