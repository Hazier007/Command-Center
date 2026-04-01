"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Send, ExternalLink, Clock } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AGENTS, BART, getAssigneeDisplay, type AgentProfile } from "@/lib/agents"
import { tasksStorage, projectsStorage, type Task } from "@/lib/storage"

export default function AgentsPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [projects, setProjects] = useState<{ id: string; name: string }[]>([])
  const [loading, setLoading] = useState(true)
  const [dispatchAgent, setDispatchAgent] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [dispatchForm, setDispatchForm] = useState({
    title: "",
    description: "",
    priority: "medium" as "low" | "medium" | "high",
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [tasksData, projectsData] = await Promise.all([
        tasksStorage.getAll(),
        projectsStorage.getAll(),
      ])
      setTasks(tasksData)
      setProjects(projectsData)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const getTaskCountForAssignee = (assignee: string) => {
    return tasks.filter(
      (t) => t.assignee === assignee && t.status !== "done"
    ).length
  }

  const getTotalTasksForAssignee = (assignee: string) => {
    return tasks.filter((t) => t.assignee === assignee).length
  }

  const getLastActivity = (assignee: string) => {
    const agentTasks = tasks
      .filter((t) => t.assignee === assignee)
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )
    if (agentTasks.length > 0) {
      return new Date(agentTasks[0].updatedAt)
    }
    return null
  }

  const formatTimeAgo = (date: Date | null) => {
    if (!date) return "Geen activiteit"
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 1) return "Zojuist"
    if (diffMins < 60) return `${diffMins}m geleden`
    if (diffHours < 24) return `${diffHours}u geleden`
    return `${diffDays}d geleden`
  }

  const handleDispatch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!dispatchAgent) return

    try {
      setSubmitting(true)
      await tasksStorage.create({
        title: dispatchForm.title,
        description: dispatchForm.description || undefined,
        status: "todo",
        priority: dispatchForm.priority,
        assignee: dispatchAgent,
        source: "manual",
      })
      await fetchData()
      setDispatchAgent(null)
      setDispatchForm({ title: "", description: "", priority: "medium" })
    } catch (error) {
      console.error("Failed to dispatch task:", error)
    } finally {
      setSubmitting(false)
    }
  }

  const agentEntries = Object.values(AGENTS)

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1">Agents</h1>
          <p className="text-muted-foreground">Het Hazier AI team</p>
        </div>

        {/* Bart Card - Highlighted */}
        <Card className="mb-8 border-2" style={{ borderColor: BART.color }}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{BART.emoji}</span>
                <div>
                  <CardTitle className="text-xl">{BART.displayName}</CardTitle>
                  <p className="text-sm text-muted-foreground">{BART.role}</p>
                </div>
              </div>
              <Badge
                className="text-white text-xs"
                style={{ backgroundColor: BART.color }}
              >
                Eigenaar
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {BART.description}
            </p>
            <div className="flex items-center gap-6 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{projects.length}</div>
                <div className="text-xs text-muted-foreground">Projecten</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {getTotalTasksForAssignee("bart")}
                </div>
                <div className="text-xs text-muted-foreground">
                  Taken totaal
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {getTaskCountForAssignee("bart")}
                </div>
                <div className="text-xs text-muted-foreground">Actief</div>
              </div>
            </div>
            <Link href="/tasks?assignee=bart">
              <Button variant="outline" size="sm">
                Alle taken <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Agent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {agentEntries.map((agent) => {
            const activeTasks = getTaskCountForAssignee(agent.name)
            const lastActivity = getLastActivity(agent.name)

            return (
              <Card
                key={agent.name}
                className="relative overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Color-coded left border */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-1"
                  style={{ backgroundColor: agent.color }}
                />

                <CardHeader className="pb-2 pl-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{agent.emoji}</span>
                      <div>
                        <CardTitle className="text-base">
                          {agent.displayName}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground">
                          {agent.role}
                        </p>
                      </div>
                    </div>
                    {activeTasks > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {activeTasks} actief
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="pl-5">
                  <p className="text-xs text-muted-foreground mb-3">
                    {agent.description}
                  </p>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {agent.specialties.map((specialty) => (
                      <Badge
                        key={specialty}
                        variant="outline"
                        className="text-[10px] px-1.5 py-0"
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  {/* Last Activity */}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                    <Clock className="h-3 w-3" />
                    <span>{formatTimeAgo(lastActivity)}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 text-xs bg-[#F5911E] hover:bg-[#e07d0a] text-white"
                      onClick={() => setDispatchAgent(agent.name)}
                    >
                      <Send className="mr-1 h-3 w-3" />
                      Give task
                    </Button>
                    <Link href={`/tasks?assignee=${agent.name}`}>
                      <Button variant="outline" size="sm" className="text-xs">
                        Taken <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Cowork Section */}
        <Card className="relative overflow-hidden">
          <div
            className="absolute left-0 top-0 bottom-0 w-1"
            style={{ backgroundColor: "#6B7280" }}
          />
          <CardHeader className="pb-2 pl-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">
                  {getAssigneeDisplay("cowork").emoji}
                </span>
                <div>
                  <CardTitle className="text-base">Cowork</CardTitle>
                  <p className="text-xs text-muted-foreground">
                    Claude Desktop - Externe Connector
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-xs">
                  <ExternalLink className="mr-1 h-3 w-3" />
                  Inject via API
                </Badge>
                {getTaskCountForAssignee("cowork") > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {getTaskCountForAssignee("cowork")} actief
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pl-5">
            <p className="text-xs text-muted-foreground mb-3">
              Externe AI-assistent via Claude Desktop. Werkt via API-injectie en
              kan taken uitvoeren buiten het Command Center.
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="text-xs"
                onClick={() => setDispatchAgent("cowork")}
              >
                <Send className="mr-1 h-3 w-3" />
                Give task
              </Button>
              <Link href="/tasks?assignee=cowork">
                <Button variant="outline" size="sm" className="text-xs">
                  Taken <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agent Dispatch Modal */}
      <Dialog
        open={dispatchAgent !== null}
        onOpenChange={(open) => {
          if (!open) {
            setDispatchAgent(null)
            setDispatchForm({
              title: "",
              description: "",
              priority: "medium",
            })
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Taak toewijzen aan{" "}
              {dispatchAgent
                ? getAssigneeDisplay(dispatchAgent).emoji +
                  " " +
                  getAssigneeDisplay(dispatchAgent).displayName
                : ""}
            </DialogTitle>
            <DialogDescription>
              Maak een nieuwe taak en wijs deze direct toe aan de agent.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleDispatch} className="space-y-4">
            <div>
              <label htmlFor="dispatch-title" className="text-sm font-medium">
                Titel
              </label>
              <Input
                id="dispatch-title"
                value={dispatchForm.title}
                onChange={(e) =>
                  setDispatchForm({ ...dispatchForm, title: e.target.value })
                }
                placeholder="Titel van de taak"
                required
                autoFocus
              />
            </div>

            <div>
              <label htmlFor="dispatch-desc" className="text-sm font-medium">
                Beschrijving
              </label>
              <Textarea
                id="dispatch-desc"
                value={dispatchForm.description}
                onChange={(e) =>
                  setDispatchForm({
                    ...dispatchForm,
                    description: e.target.value,
                  })
                }
                placeholder="Beschrijf de taak in detail..."
                className="min-h-[100px]"
              />
            </div>

            <div>
              <label
                htmlFor="dispatch-priority"
                className="text-sm font-medium"
              >
                Prioriteit
              </label>
              <select
                id="dispatch-priority"
                value={dispatchForm.priority}
                onChange={(e) =>
                  setDispatchForm({
                    ...dispatchForm,
                    priority: e.target.value as "low" | "medium" | "high",
                  })
                }
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="low">Laag</option>
                <option value="medium">Medium</option>
                <option value="high">Hoog</option>
              </select>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-[#F5911E] hover:bg-[#e07d0a] text-white"
                disabled={submitting}
              >
                {submitting ? "Dispatching..." : "Dispatch"}
                <Send className="ml-2 h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDispatchAgent(null)}
              >
                Annuleren
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
