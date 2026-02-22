"use client"

import { useState, useEffect } from "react"
import { Activity, Hammer, Rocket, CheckSquare, FileText, Telescope, AlertTriangle, Settings, ExternalLink } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { activityStorage, type ActivityItem } from "@/lib/storage"

const actorOptions = [
  { value: 'all', label: 'Iedereen' },
  { value: 'bart', label: 'Bart 👑', emoji: '👑' },
  { value: 'lisa', label: 'Lisa 📋', emoji: '📋' },
  { value: 'jc', label: 'JC 🥊', emoji: '🥊' },
  { value: 'wout', label: 'Wout 🔭', emoji: '🔭' },
  { value: 'copycat', label: 'Copycat ✍️', emoji: '✍️' },
  { value: 'system', label: 'Systeem', emoji: '⚙️' },
]

const typeOptions = [
  { value: 'all', label: 'Alles' },
  { value: 'commit', label: 'Commits', icon: Hammer },
  { value: 'deploy', label: 'Deploys', icon: Rocket },
  { value: 'task', label: 'Taken', icon: CheckSquare },
  { value: 'content', label: 'Content', icon: FileText },
  { value: 'research', label: 'Research', icon: Telescope },
  { value: 'alert', label: 'Alerts', icon: AlertTriangle },
  { value: 'system', label: 'Systeem', icon: Settings },
]

const activityIcons = {
  commit: Hammer,
  deploy: Rocket,
  task: CheckSquare,
  content: FileText,
  research: Telescope,
  alert: AlertTriangle,
  system: Settings,
}

const actorEmojis = {
  bart: '👑',
  lisa: '📋',
  jc: '🥊',
  wout: '🔭',
  copycat: '✍️',
  system: '⚙️',
}

function getRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMins < 1) return 'net nu'
  if (diffMins < 60) return `${diffMins} minuten geleden`
  if (diffHours < 24) return `${diffHours} uur geleden`
  if (diffDays === 1) return 'gisteren'
  if (diffDays < 7) return `${diffDays} dagen geleden`
  
  return date.toLocaleDateString('nl-NL', { 
    day: 'numeric', 
    month: 'short',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined 
  })
}

function isToday(dateString: string): boolean {
  const date = new Date(dateString)
  const today = new Date()
  return date.toDateString() === today.toDateString()
}

function isThisWeek(dateString: string): boolean {
  const date = new Date(dateString)
  const today = new Date()
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
  return date > weekAgo
}

function getActivityColor(type: ActivityItem['type']): string {
  switch (type) {
    case 'commit': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200'
    case 'deploy': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
    case 'task': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-200'
    case 'content': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-200'
    case 'research': return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-200'
    case 'alert': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200'
    case 'system': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200'
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200'
  }
}

export default function ActivityPage() {
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedActor, setSelectedActor] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const params: { limit?: number; actor?: string } = { limit: 100 }
        if (selectedActor !== 'all') {
          params.actor = selectedActor
        }
        
        const data = await activityStorage.getAll(params)
        setActivities(data)
      } catch (error) {
        console.error('Error loading activities:', error)
      } finally {
        setLoading(false)
      }
    }

    loadActivities()
  }, [selectedActor])

  const filteredActivities = activities.filter(activity => {
    return selectedType === 'all' || activity.type === selectedType
  })

  const todayActivities = filteredActivities.filter(activity => isToday(activity.createdAt))
  const thisWeekActivities = filteredActivities.filter(activity => 
    isThisWeek(activity.createdAt) && !isToday(activity.createdAt)
  )
  const olderActivities = filteredActivities.filter(activity => !isThisWeek(activity.createdAt))

  const ActivityCard = ({ activity }: { activity: ActivityItem }) => {
    const IconComponent = activityIcons[activity.type] || Activity
    const actorEmoji = actorEmojis[activity.actor as keyof typeof actorEmojis] || '👤'

    return (
      <Card className="mb-3 hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
              <IconComponent className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{actorEmoji}</span>
                <span className="font-medium capitalize">{activity.actor}</span>
                <span className="text-muted-foreground text-sm">
                  {getRelativeTime(activity.createdAt)}
                </span>
              </div>
              <CardTitle className="text-sm leading-tight mb-2">
                {activity.title}
              </CardTitle>
            </div>
            {activity.url && (
              <Button variant="ghost" size="sm" asChild>
                <a href={activity.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            )}
          </div>
        </CardHeader>
        {activity.description && (
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground">
              {activity.description}
            </p>
          </CardContent>
        )}
      </Card>
    )
  }

  const ActivitySection = ({ 
    title, 
    activities, 
    emptyMessage 
  }: { 
    title: string
    activities: ActivityItem[]
    emptyMessage: string
  }) => (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-muted-foreground">{title}</h2>
      {activities.length > 0 ? (
        activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))
      ) : (
        <div className="text-center py-8 text-sm text-muted-foreground">
          {emptyMessage}
        </div>
      )}
    </div>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-background to-background dark:from-orange-950/25 dark:via-background dark:to-background">
        <div className="mx-auto max-w-4xl px-4 py-6 md:px-6">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F5911E] mx-auto"></div>
            <p className="text-muted-foreground mt-4">Activiteiten laden...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-background to-background dark:from-orange-950/25 dark:via-background dark:to-background">
      <div className="mx-auto max-w-4xl px-4 py-6 md:px-6">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Activiteit</h1>
            <p className="text-muted-foreground">
              Volg wat het team in real-time doet
            </p>
          </div>
        </header>

        <div className="mt-6 space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex gap-2">
              <Select value={selectedActor} onValueChange={setSelectedActor}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter op persoon" />
                </SelectTrigger>
                <SelectContent>
                  {actorOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter op type" />
                </SelectTrigger>
                <SelectContent>
                  {typeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Badge variant="secondary" className="ml-auto">
              {filteredActivities.length} activiteiten
            </Badge>
          </div>

          {/* Activity Timeline */}
          <div className="space-y-8">
            {todayActivities.length > 0 && (
              <ActivitySection
                title="Vandaag"
                activities={todayActivities}
                emptyMessage="Geen activiteiten vandaag"
              />
            )}

            {thisWeekActivities.length > 0 && (
              <ActivitySection
                title="Deze week"
                activities={thisWeekActivities}
                emptyMessage="Geen activiteiten deze week"
              />
            )}

            {olderActivities.length > 0 && (
              <ActivitySection
                title="Eerder"
                activities={olderActivities}
                emptyMessage="Geen oudere activiteiten"
              />
            )}
          </div>

          {filteredActivities.length === 0 && (
            <div className="text-center py-12">
              <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground">Geen activiteiten gevonden</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {selectedActor !== 'all' || selectedType !== 'all' 
                  ? 'Probeer je filters aan te passen'
                  : 'Er zijn nog geen activiteiten geregistreerd'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}