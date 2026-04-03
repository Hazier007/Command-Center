"use client"

import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, Calendar, Flag, Users, ChevronDown, ChevronRight, X, Archive, EyeOff } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { tasksStorage, sitesStorage, type Task, type Site } from "@/lib/storage"

const assigneeOptions = [
  { value: 'bart', label: 'Bart 👑' },
  { value: 'atlas', label: 'Atlas 🗺️' },
  { value: 'forge', label: 'Forge 🔨' },
  { value: 'radar', label: 'Radar 📡' },
  { value: 'ink', label: 'Ink ✍️' },
  { value: 'ledger', label: 'Ledger 📊' },
  { value: 'spark', label: 'Spark ⚡' },
  { value: 'cowork', label: 'Cowork 🤝' },
]

const assigneeEmojis: Record<string, string> = {
  bart: '👑',
  atlas: '🗺️',
  forge: '🔨',
  radar: '📡',
  ink: '✍️',
  ledger: '📊',
  spark: '⚡',
  cowork: '🤝',
}

const assigneeNames: Record<string, string> = {
  bart: 'Bart',
  atlas: 'Atlas',
  forge: 'Forge',
  radar: 'Radar',
  ink: 'Ink',
  ledger: 'Ledger',
  spark: 'Spark',
  cowork: 'Cowork',
}

const selectClass = "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"

function getPriorityColor(priority?: Task['priority']) {
  switch (priority) {
    case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200'
    case 'medium': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-200'
    case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200'
  }
}

function isOverdue(dueDate?: string) {
  if (!dueDate) return false
  return new Date(dueDate) < new Date()
}

function TaskCard({
  task,
  status,
  siteDomain,
  onEdit,
  onDelete,
  onStatusChange,
  onDone,
}: {
  task: Task
  status: Task['status']
  siteDomain: string | null
  onEdit: (task: Task) => void
  onDelete: (taskId: string) => void
  onStatusChange: (taskId: string, status: Task['status']) => void
  onDone: (task: Task) => void
}) {
  return (
    <Card className="mb-3 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-sm leading-tight">{task.title}</CardTitle>
            {siteDomain && (
              <CardDescription className="text-xs truncate">
                🌐 {siteDomain}
              </CardDescription>
            )}
          </div>
          <div className="flex gap-1 flex-shrink-0">
            <Button variant="ghost" size="sm" onClick={() => onEdit(task)}>
              <Edit className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onDelete(task.id)}>
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {task.description && (
            <p className="text-xs text-muted-foreground line-clamp-2">
              {task.description}
            </p>
          )}

          <div className="flex flex-wrap gap-1">
            {task.priority && (
              <Badge className={getPriorityColor(task.priority)}>
                <Flag className="h-2 w-2 mr-1" />
                {task.priority}
              </Badge>
            )}
            {task.assignee && (
              <Badge variant="outline" className="text-xs">
                <Users className="h-2 w-2 mr-1" />
                {assigneeEmojis[task.assignee]} {assigneeNames[task.assignee] ?? task.assignee}
              </Badge>
            )}
            {task.dueDate && (
              <Badge
                variant={isOverdue(task.dueDate) ? "destructive" : "outline"}
                className="text-xs"
              >
                <Calendar className="h-2 w-2 mr-1" />
                {new Date(task.dueDate).toLocaleDateString()}
              </Badge>
            )}
          </div>

          <div className="flex gap-1">
            {status !== 'todo' && (
              <Button variant="outline" size="sm" className="text-xs h-6" onClick={() => onStatusChange(task.id, 'todo')}>
                To Do
              </Button>
            )}
            {status !== 'in-progress' && (
              <Button variant="outline" size="sm" className="text-xs h-6" onClick={() => onStatusChange(task.id, 'in-progress')}>
                In Progress
              </Button>
            )}
            {status !== 'review' && (
              <Button variant="outline" size="sm" className="text-xs h-6" onClick={() => onStatusChange(task.id, 'review')}>
                Review
              </Button>
            )}
            {status !== 'done' && (
              <Button variant="outline" size="sm" className="text-xs h-6" onClick={() => onDone(task)}>
                Done
              </Button>
            )}
          </div>

          <div className="text-xs text-muted-foreground">
            {new Date(task.createdAt).toLocaleDateString()}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function KanbanColumn({
  id,
  label,
  tasks,
  colorClass,
  textClass,
  emptyText,
  status,
  isCollapsed,
  onToggleCollapse,
  getSiteDomain,
  onEdit,
  onDelete,
  onStatusChange,
  onDone,
}: {
  id: string
  label: string
  tasks: Task[]
  colorClass: string
  textClass: string
  emptyText: string
  status: Task['status']
  isCollapsed: boolean
  onToggleCollapse: (id: string) => void
  getSiteDomain: (siteId?: string) => string | null
  onEdit: (task: Task) => void
  onDelete: (taskId: string) => void
  onStatusChange: (taskId: string, status: Task['status']) => void
  onDone: (task: Task) => void
}) {
  return (
    <div className="space-y-3">
      <button
        onClick={() => onToggleCollapse(id)}
        className={`w-full flex items-center justify-between p-4 rounded-lg ${colorClass} hover:opacity-90 transition-opacity`}
      >
        <h2 className={`text-lg font-semibold ${textClass} flex items-center gap-2`}>
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          {label}
        </h2>
        <Badge variant="secondary">{tasks.length}</Badge>
      </button>
      {!isCollapsed && (
        <div className="min-h-[400px]">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              status={status}
              siteDomain={getSiteDomain(task.siteId)}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
              onDone={onDone}
            />
          ))}
          {tasks.length === 0 && (
            <div className="text-center py-8 text-sm text-muted-foreground">
              {emptyText}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [sites, setSites] = useState<Site[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [filterSite, setFilterSite] = useState("")
  const [filterAssignee, setFilterAssignee] = useState("")
  const [filterPriority, setFilterPriority] = useState("")
  const [followUpDialogOpen, setFollowUpDialogOpen] = useState(false)
  const [followUpSourceTask, setFollowUpSourceTask] = useState<Task | null>(null)
  const [followUpForm, setFollowUpForm] = useState({
    title: "",
    description: "",
    assignee: "",
    priority: "medium" as Task['priority'],
    siteId: "",
  })
  const [showDone, setShowDone] = useState(false)
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({
    todo: false,
    'in-progress': false,
    review: false,
    done: false,
  })
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo" as Task['status'],
    siteId: "",
    priority: "medium" as Task['priority'],
    assignee: "",
    dueDate: "",
  })

  useEffect(() => {
    const load = async () => {
      const [tasksData, sitesData] = await Promise.all([
        tasksStorage.getAll(),
        sitesStorage.getAll(),
      ])
      setTasks(tasksData)
      setSites(sitesData)
    }
    void load()
  }, [])

  const filteredTasks = tasks.filter(task => {
    if (searchTerm && !task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !task.description?.toLowerCase().includes(searchTerm.toLowerCase())) return false
    if (filterSite && task.siteId !== filterSite) return false
    if (filterAssignee && task.assignee !== filterAssignee) return false
    if (filterPriority && task.priority !== filterPriority) return false
    return true
  })

  const todoTasks = filteredTasks.filter(t => t.status === 'todo')
  const inProgressTasks = filteredTasks.filter(t => t.status === 'in-progress')
  const reviewTasks = filteredTasks.filter(t => t.status === 'review')
  const doneTasks = filteredTasks.filter(t => t.status === 'done')

  const hasActiveFilters = filterSite || filterAssignee || filterPriority

  const clearFilters = () => {
    setFilterSite("")
    setFilterAssignee("")
    setFilterPriority("")
  }

  const toggleCollapse = (col: string) => {
    setCollapsed(prev => ({ ...prev, [col]: !prev[col] }))
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      status: "todo",
      siteId: "",
      priority: "medium",
      assignee: "",
      dueDate: "",
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (editingTask) {
      await tasksStorage.update(editingTask.id, {
        title: formData.title,
        description: formData.description || undefined,
        status: formData.status,
        siteId: formData.siteId || undefined,
        priority: formData.priority || undefined,
        assignee: formData.assignee || undefined,
        dueDate: formData.dueDate || undefined,
      })
    } else {
      await tasksStorage.create({
        title: formData.title,
        description: formData.description || undefined,
        status: formData.status,
        siteId: formData.siteId || undefined,
        priority: formData.priority || undefined,
        assignee: formData.assignee || undefined,
        dueDate: formData.dueDate || undefined,
      })
    }

    const allTasks = await tasksStorage.getAll()
    setTasks(allTasks)
    setIsDialogOpen(false)
    setEditingTask(null)
    resetForm()
  }

  const handleEdit = (task: Task) => {
    setEditingTask(task)
    setFormData({
      title: task.title,
      description: task.description || "",
      status: task.status,
      siteId: task.siteId || "",
      priority: task.priority || "medium",
      assignee: task.assignee || "",
      dueDate: task.dueDate || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (taskId: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      await tasksStorage.delete(taskId)
      const allTasks = await tasksStorage.getAll()
      setTasks(allTasks)
    }
  }

  const handleStatusChange = async (taskId: string, newStatus: Task['status']) => {
    const updateData: Record<string, string> = { status: newStatus }
    if (newStatus === 'review') {
      updateData.assignee = 'bart'
    }
    await tasksStorage.update(taskId, updateData)
    const allTasks = await tasksStorage.getAll()
    setTasks(allTasks)
  }

  const getFollowUpSuggestion = (task: Task): { suggestedTitle: string; suggestedAssignee: string } => {
    const titleLower = task.title.toLowerCase()
    if (task.assignee === 'radar') {
      return { suggestedTitle: `Content schrijven: ${task.title}`, suggestedAssignee: 'ink' }
    }
    if (task.assignee === 'ink') {
      return { suggestedTitle: `Implementeren: ${task.title}`, suggestedAssignee: 'forge' }
    }
    if (task.assignee === 'forge') {
      return { suggestedTitle: `QA Review: ${task.title}`, suggestedAssignee: 'atlas' }
    }
    if (task.assignee === 'atlas') {
      return { suggestedTitle: `Deploy: ${task.title}`, suggestedAssignee: 'forge' }
    }
    if (titleLower.includes('keyword') || titleLower.includes('research')) {
      return { suggestedTitle: `Content schrijven: ${task.title}`, suggestedAssignee: 'ink' }
    }
    if (titleLower.includes('content') || titleLower.includes('blog') || titleLower.includes('tekst')) {
      return { suggestedTitle: `Implementeren: ${task.title}`, suggestedAssignee: 'forge' }
    }
    return { suggestedTitle: '', suggestedAssignee: '' }
  }

  const handleDoneClick = (task: Task) => {
    const { suggestedTitle, suggestedAssignee } = getFollowUpSuggestion(task)
    setFollowUpSourceTask(task)
    setFollowUpForm({
      title: suggestedTitle,
      description: "",
      assignee: suggestedAssignee,
      priority: task.priority || "medium",
      siteId: task.siteId || "",
    })
    setFollowUpDialogOpen(true)
  }

  const handleConfirmWithFollowUp = async () => {
    if (!followUpSourceTask) return
    await tasksStorage.update(followUpSourceTask.id, { status: 'done' })
    if (followUpForm.title.trim()) {
      await tasksStorage.create({
        title: followUpForm.title,
        description: followUpForm.description || undefined,
        status: 'todo',
        assignee: followUpForm.assignee || undefined,
        priority: followUpForm.priority || undefined,
        siteId: followUpForm.siteId || undefined,
      })
    }
    const allTasks = await tasksStorage.getAll()
    setTasks(allTasks)
    setFollowUpDialogOpen(false)
    setFollowUpSourceTask(null)
  }

  const handleConfirmWithoutFollowUp = async () => {
    if (!followUpSourceTask) return
    await tasksStorage.update(followUpSourceTask.id, { status: 'done' })
    const allTasks = await tasksStorage.getAll()
    setTasks(allTasks)
    setFollowUpDialogOpen(false)
    setFollowUpSourceTask(null)
  }

  const getSiteDomain = (siteId?: string) => {
    if (!siteId) return null
    const site = sites.find(s => s.id === siteId)
    return site?.domain ?? null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-background to-background dark:from-orange-950/25 dark:via-background dark:to-background">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Taken</h1>
            <p className="text-muted-foreground">
              {todoTasks.length} te doen · {inProgressTasks.length} bezig · {reviewTasks.length} review
              {hasActiveFilters && <span className="text-[#F5911E] ml-1">(gefilterd)</span>}
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant={showDone ? "default" : "outline"}
              onClick={() => setShowDone(!showDone)}
              className={showDone ? "bg-green-600 hover:bg-green-700" : ""}
            >
              {showDone ? <EyeOff className="mr-2 h-4 w-4" /> : <Archive className="mr-2 h-4 w-4" />}
              {showDone ? "Verberg afgerond" : `Afgerond (${doneTasks.length})`}
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => {
                  setEditingTask(null)
                  resetForm()
                }}>
                  <Plus className="mr-2 h-4 w-4" />
                  Taak toevoegen
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingTask ? 'Taak bewerken' : 'Nieuwe taak'}</DialogTitle>
                  <DialogDescription>
                    {editingTask ? 'Pas de taakdetails aan' : 'Voeg een nieuwe taak toe aan de execution lane'}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="title" className="text-sm font-medium">Titel</label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Titel van de taak"
                      required
                      autoFocus
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="text-sm font-medium">Omschrijving</label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Omschrijving van de taak (optioneel)"
                      className="min-h-[80px]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="status" className="text-sm font-medium">Status</label>
                      <select
                        id="status"
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as Task['status'] })}
                        className={selectClass}
                      >
                        <option value="todo">Te doen</option>
                        <option value="in-progress">Bezig</option>
                        <option value="review">Klaar voor review</option>
                        <option value="done">Afgerond</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="priority" className="text-sm font-medium">Priority</label>
                      <select
                        id="priority"
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value as Task['priority'] })}
                        className={selectClass}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="col-span-2">
                      <label htmlFor="siteId" className="text-sm font-medium">Site / Domein</label>
                      <select
                        id="siteId"
                        value={formData.siteId}
                        onChange={(e) => setFormData({ ...formData, siteId: e.target.value })}
                        className={selectClass}
                      >
                        <option value="">Geen site</option>
                        {Object.entries(
                          sites.reduce((groups, site) => {
                            const cat = site.category || 'overig'
                            if (!groups[cat]) groups[cat] = []
                            groups[cat].push(site)
                            return groups
                          }, {} as Record<string, Site[]>)
                        ).sort(([a], [b]) => a.localeCompare(b)).map(([category, categorySites]) => (
                          <optgroup key={category} label={category.charAt(0).toUpperCase() + category.slice(1)}>
                            {categorySites.sort((a, b) => a.domain.localeCompare(b.domain)).map((site) => (
                              <option key={site.id} value={site.id}>{site.domain}</option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="assignee" className="text-sm font-medium">Toewijzen aan</label>
                      <select
                        id="assignee"
                        value={formData.assignee}
                        onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                        className={selectClass}
                      >
                        <option value="">Niet toegewezen</option>
                        {assigneeOptions.map((option) => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="dueDate" className="text-sm font-medium">Deadline</label>
                      <Input
                        id="dueDate"
                        type="date"
                        value={formData.dueDate}
                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="flex-1">
                      {editingTask ? 'Bijwerken' : 'Aanmaken'}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Annuleren
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        <div className="mt-6 space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <Input
              placeholder="Zoek taken..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="md:max-w-xs"
            />

            <select
              value={filterSite}
              onChange={(e) => setFilterSite(e.target.value)}
              className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="">Alle sites</option>
              {sites.sort((a, b) => a.domain.localeCompare(b.domain)).map((site) => (
                <option key={site.id} value={site.id}>{site.domain}</option>
              ))}
            </select>

            <select
              value={filterAssignee}
              onChange={(e) => setFilterAssignee(e.target.value)}
              className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="">Alle verantwoordelijken</option>
              {assigneeOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>

            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="">Alle prioriteiten</option>
              <option value="high">Hoog</option>
              <option value="medium">Medium</option>
              <option value="low">Laag</option>
            </select>

            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-[#F5911E] hover:text-[#F5911E] hover:bg-orange-50 dark:hover:bg-orange-950/20">
                <X className="h-3 w-3 mr-1" />
                Filters wissen
              </Button>
            )}
          </div>

          <div className={`grid gap-6 ${showDone ? 'md:grid-cols-4' : 'md:grid-cols-3'}`}>
            <KanbanColumn
              id="todo"
              label="Te doen"
              tasks={todoTasks}
              colorClass="bg-blue-50 dark:bg-blue-950/20"
              textClass="text-blue-900 dark:text-blue-200"
              emptyText="Geen taken in te doen"
              status="todo"
              isCollapsed={collapsed.todo}
              onToggleCollapse={toggleCollapse}
              getSiteDomain={getSiteDomain}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
              onDone={handleDoneClick}
            />
            <KanbanColumn
              id="in-progress"
              label="Bezig"
              tasks={inProgressTasks}
              colorClass="bg-orange-50 dark:bg-orange-950/20"
              textClass="text-orange-900 dark:text-orange-200"
              emptyText="Geen taken bezig"
              status="in-progress"
              isCollapsed={collapsed['in-progress']}
              onToggleCollapse={toggleCollapse}
              getSiteDomain={getSiteDomain}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
              onDone={handleDoneClick}
            />
            <KanbanColumn
              id="review"
              label="🔍 Review"
              tasks={reviewTasks}
              colorClass="bg-amber-50 dark:bg-amber-950/20"
              textClass="text-amber-900 dark:text-amber-200"
              emptyText="Niets te reviewen"
              status="review"
              isCollapsed={collapsed.review}
              onToggleCollapse={toggleCollapse}
              getSiteDomain={getSiteDomain}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
              onDone={handleDoneClick}
            />
            {showDone && (
              <KanbanColumn
                id="done"
                label="✅ Afgerond"
                tasks={doneTasks}
                colorClass="bg-green-50 dark:bg-green-950/20"
                textClass="text-green-900 dark:text-green-200"
                emptyText="Geen afgeronde taken"
                status="done"
                isCollapsed={collapsed.done}
                onToggleCollapse={toggleCollapse}
                getSiteDomain={getSiteDomain}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
                onDone={handleDoneClick}
              />
            )}
          </div>

          <Dialog open={followUpDialogOpen} onOpenChange={setFollowUpDialogOpen}>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Taak afronden — Follow-up?</DialogTitle>
                <DialogDescription>
                  Wil je een follow-up taak aanmaken voor &ldquo;{followUpSourceTask?.title}&rdquo;?
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Titel follow-up taak</label>
                  <Input
                    value={followUpForm.title}
                    onChange={(e) => setFollowUpForm({ ...followUpForm, title: e.target.value })}
                    placeholder="Titel van de follow-up taak"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Omschrijving</label>
                  <Textarea
                    value={followUpForm.description}
                    onChange={(e) => setFollowUpForm({ ...followUpForm, description: e.target.value })}
                    placeholder="Optionele omschrijving"
                    className="min-h-[70px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Toewijzen aan</label>
                    <select
                      value={followUpForm.assignee}
                      onChange={(e) => setFollowUpForm({ ...followUpForm, assignee: e.target.value })}
                      className={selectClass}
                    >
                      <option value="">Niet toegewezen</option>
                      {assigneeOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Prioriteit</label>
                    <select
                      value={followUpForm.priority}
                      onChange={(e) => setFollowUpForm({ ...followUpForm, priority: e.target.value as Task['priority'] })}
                      className={selectClass}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium">Site / Domein</label>
                    <select
                      value={followUpForm.siteId}
                      onChange={(e) => setFollowUpForm({ ...followUpForm, siteId: e.target.value })}
                      className={selectClass}
                    >
                      <option value="">Geen site</option>
                      {Object.entries(
                        sites.reduce((groups, site) => {
                          const cat = site.category || 'overig'
                          if (!groups[cat]) groups[cat] = []
                          groups[cat].push(site)
                          return groups
                        }, {} as Record<string, Site[]>)
                      ).sort(([a], [b]) => a.localeCompare(b)).map(([category, categorySites]) => (
                        <optgroup key={category} label={category.charAt(0).toUpperCase() + category.slice(1)}>
                          {categorySites.sort((a, b) => a.domain.localeCompare(b.domain)).map((site) => (
                            <option key={site.id} value={site.id}>{site.domain}</option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button className="flex-1" onClick={handleConfirmWithFollowUp} disabled={!followUpForm.title.trim()}>
                    Afronden + Follow-up aanmaken
                  </Button>
                  <Button variant="outline" onClick={handleConfirmWithoutFollowUp}>
                    Afronden zonder follow-up
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {tasks.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-muted-foreground">Nog geen taken</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Maak je eerste taak aan om de execution lane te starten
              </p>
              <Button
                className="mt-4"
                onClick={() => {
                  setEditingTask(null)
                  resetForm()
                  setIsDialogOpen(true)
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Maak je eerste taak
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
