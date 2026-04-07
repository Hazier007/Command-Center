"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, Bell, CheckCircle, Circle, Filter } from "lucide-react"

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
  DialogTrigger,
} from "@/components/ui/dialog"
import { alertsStorage, type Alert } from "@/lib/storage"

type StatusFilter = "all" | "active" | "resolved"
type PriorityFilter = "all" | "low" | "medium" | "high"

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all")

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    priority: "medium" as Alert["priority"],
  })

  useEffect(() => {
    alertsStorage.getAll().then(setAlerts)
  }, [])

  const reload = async () => setAlerts(await alertsStorage.getAll())

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await alertsStorage.create({
      title: formData.title,
      body: formData.body,
      priority: formData.priority,
      resolved: false,
    })
    await reload()
    setIsDialogOpen(false)
    setFormData({ title: "", body: "", priority: "medium" })
  }

  const toggleResolved = async (alert: Alert) => {
    await alertsStorage.update(alert.id, { resolved: !alert.resolved })
    await reload()
  }

  const handleDelete = async (id: string) => {
    if (confirm("Delete this alert?")) {
      await alertsStorage.delete(id)
      await reload()
    }
  }

  const filtered = alerts
    .filter((a) => {
      if (statusFilter === "active") return !a.resolved
      if (statusFilter === "resolved") return a.resolved
      return true
    })
    .filter((a) => {
      if (priorityFilter === "all") return true
      return a.priority === priorityFilter
    })
    .sort((a, b) => {
      // Active first, then by priority (high > medium > low), then newest first
      if (a.resolved !== b.resolved) return a.resolved ? 1 : -1
      const prio = { high: 3, medium: 2, low: 1 }
      if (prio[a.priority] !== prio[b.priority]) return prio[b.priority] - prio[a.priority]
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

  const priorityBadge = (priority: Alert["priority"]) => {
    const styles = {
      high: "bg-red-500/20 text-red-400 border-red-500/30",
      medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      low: "bg-green-500/20 text-green-400 border-green-500/30",
    }
    return (
      <Badge variant="outline" className={styles[priority]}>
        {priority}
      </Badge>
    )
  }

  const activeCount = alerts.filter((a) => !a.resolved).length
  const resolvedCount = alerts.filter((a) => a.resolved).length

  const filterBtn = (
    label: string,
    active: boolean,
    onClick: () => void
  ) => (
    <Button
      key={label}
      variant={active ? "default" : "outline"}
      size="sm"
      onClick={onClick}
      className={active ? "bg-[#F5911E] text-white hover:bg-[#e07f0e]" : ""}
    >
      {label}
    </Button>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-background to-background dark:from-orange-950/25 dark:via-background dark:to-background">
      <div className="mx-auto max-w-4xl px-4 py-6 md:px-6">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Bell className="h-7 w-7 text-[#F5911E]" />
              Alerts
            </h1>
            <p className="text-muted-foreground">
              {activeCount} active · {resolvedCount} resolved
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#F5911E] text-white hover:bg-[#e07f0e]">
                <Plus className="mr-2 h-4 w-4" />
                New Alert
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Alert</DialogTitle>
                <DialogDescription>Add a new alert to track.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="title" className="text-sm font-medium">Title</label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Alert title"
                    required
                    autoFocus
                  />
                </div>
                <div>
                  <label htmlFor="body" className="text-sm font-medium">Body</label>
                  <Textarea
                    id="body"
                    value={formData.body}
                    onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                    placeholder="Details..."
                    className="min-h-[80px]"
                  />
                </div>
                <div>
                  <label htmlFor="priority" className="text-sm font-medium">Priority</label>
                  <select
                    id="priority"
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as Alert["priority"] })}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button type="submit" className="flex-1 bg-[#F5911E] text-white hover:bg-[#e07f0e]">
                    Create Alert
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </header>

        {/* Filters */}
        <div className="mt-6 flex flex-wrap gap-2 items-center">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground mr-1">Status:</span>
          {filterBtn("All", statusFilter === "all", () => setStatusFilter("all"))}
          {filterBtn("Active", statusFilter === "active", () => setStatusFilter("active"))}
          {filterBtn("Resolved", statusFilter === "resolved", () => setStatusFilter("resolved"))}

          <span className="text-sm text-muted-foreground ml-4 mr-1">Priority:</span>
          {filterBtn("All", priorityFilter === "all", () => setPriorityFilter("all"))}
          {filterBtn("High", priorityFilter === "high", () => setPriorityFilter("high"))}
          {filterBtn("Medium", priorityFilter === "medium", () => setPriorityFilter("medium"))}
          {filterBtn("Low", priorityFilter === "low", () => setPriorityFilter("low"))}
        </div>

        {/* Alert List */}
        <div className="mt-6 space-y-3">
          {filtered.map((alert) => (
            <Card
              key={alert.id}
              className={cn(
                "transition-all hover:shadow-md",
                alert.resolved && "opacity-60"
              )}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <button
                      onClick={() => toggleResolved(alert)}
                      className="mt-0.5 shrink-0"
                      title={alert.resolved ? "Mark active" : "Resolve"}
                    >
                      {alert.resolved ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground hover:text-[#F5911E]" />
                      )}
                    </button>
                    <div className="min-w-0">
                      <CardTitle className={cn("text-base", alert.resolved && "line-through")}>
                        {alert.title}
                      </CardTitle>
                      {alert.body && (
                        <p className="text-sm text-muted-foreground mt-1">{alert.body}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {priorityBadge(alert.priority)}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(alert.id)}
                      className="text-muted-foreground hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0 pl-11">
                <span className="text-xs text-muted-foreground">
                  {new Date(alert.createdAt).toLocaleDateString()}
                </span>
              </CardContent>
            </Card>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <Bell className="h-12 w-12 mx-auto text-muted-foreground/30" />
              <h3 className="text-lg font-medium text-muted-foreground mt-4">No alerts</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {alerts.length === 0 ? "Create your first alert" : "No alerts match the current filters"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
