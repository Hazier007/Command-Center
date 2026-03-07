"use client"

import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, Calendar, Flag, User, Users, ChevronDown, ChevronRight, X } from "lucide-react"

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
import { tasksStorage, projectsStorage, sitesStorage, type Task, type Project, type Site } from "@/lib/storage"

const assigneeOptions = [
  { value: 'bart', label: 'Bart 👑' },
  { value: 'lisa', label: 'Lisa 📋' },
  { value: 'jc', label: 'JC 🥊' },
  { value: 'wout', label: 'Wout 🔭' },
  { value: 'copycat', label: 'Copycat ✍️' },
]

const assigneeEmojis: Record<string, string> = {
  bart: '👑',
  lisa: '📋',
  jc: '🥊',
  wout: '🔭',
  copycat: '✍️',
}

const assigneeNames: Record<string, string> = {
  bart: 'Bart',
  lisa: 'Lisa',
  jc: 'JC',
  wout: 'Wout',
  copycat: 'Copycat',
}

const selectClass = "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [sites, setSites] = useState<Site[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  // Filter state
  const [filterSite, setFilterSite] = useState("")
  const [filterAssignee, setFilterAssignee] = useState("")
  const [filterPriority, setFilterPriority] = useState("")

  // Collapsible columns (done collapsed by default)
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({
    todo: false,
    'in-progress': false,
    review: false,
    done: true,
  })

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo" as Task['status'],
    projectId: "",
    siteId: "",
    priority: "medium" as Task['priority'],
    assignee: "",
    dueDate: "",
  })

  useEffect(() => {
    const load = async () => {
      const [tasksData, projectsData, sitesData] = await Promise.all([
        tasksStorage.getAll(),
        projectsStorage.getAll(),
        sitesStorage.getAll(),
      ])
      setTasks(tasksData)
      setProjects(projectsData)
      setSites(sitesData)
    }
    load()
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (editingTask) {
      await tasksStorage.update(editingTask.id, {
        title: formData.title,
        description: formData.description || undefined,
        status: formData.status,
        projectId: formData.projectId || undefined,
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
        projectId: formData.projectId || undefined,
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

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      status: "todo",
      projectId: "",
      siteId: "",
      priority: "medium",
      assignee: "",
      dueDate: "",
    })
  }

  const handleEdit = (task: Task) => {
    setEditingTask(task)
    setFormData({
      title: task.title,
      description: task.description || "",
      status: task.status,
      projectId: task.projectId || "",
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
    await tasksStorage.update(taskId, { status: newStatus })
    const allTasks = await tasksStorage.getAll()
    setTasks(allTasks)
  }

  const getPriorityColor = (priority?: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200'
      case 'medium': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-200'
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200'
    }
  }

  const getProjectName = (projectId?: string) => {
    if (!projectId) return null
    const project = projects.find(p => p.id === projectId)
    return project?.name
  }

  const isOverdue = (dueDate?: string) => {
    if (!dueDate) return false
    return new Date(dueDate) < new Date()
  }

  const TaskCard = ({ task, status }: { task: Task; status: Task['status'] }) => (
    <Card className="mb-3 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-sm leading-tight">{task.title}</CardTitle>
            {getProjectName(task.projectId) && (
              <CardDescription className="text-xs truncate">
                {getProjectName(task.projectId)}
              </CardDescription>
            )}
          </div>
          <div className="flex gap-1 flex-shrink-0">
            <Button variant="ghost" size="sm" onClick={() => handleEdit(task)}>
              <Edit className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleDelete(task.id)}>
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

          {/* Status change buttons */}
          <div className="flex gap-1">
            {status !== 'todo' && (
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-6"
                onClick={() => handleStatusChange(task.id, 'todo')}
              >
                To Do
              </Button>
            )}
            {status !== 'in-progress' && (
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-6"
                onClick={() => handleStatusChange(task.id, 'in-progress')}
              >
                In Progress
              </Button>
            )}
            {status !== 'review' && (
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-6"
                onClick={() => handleStatusChange(task.id, 'review')}
              >
                Review
              </Button>
            )}
            {status !== 'done' && (
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-6"
                onClick={() => handleStatusChange(task.id, 'done')}
              >
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

  const KanbanColumn = ({
    id,
    label,
    tasks: colTasks,
    colorClass,
    textClass,
    emptyText,
    status,
  }: {
    id: string
    label: string
    tasks: Task[]
    colorClass: string
    textClass: string
    emptyText: string
    status: Task['status']
  }) => {
    const isCollapsed = collapsed[id]
    return (
      <div className="space-y-3">
        <button
          onClick={() => toggleCollapse(id)}
          className={`w-full flex items-center justify-between p-4 rounded-lg ${colorClass} hover:opacity-90 transition-opacity`}
        >
          <h2 className={`text-lg font-semibold ${textClass} flex items-center gap-2`}>
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            {label}
          </h2>
          <Badge variant="secondary">{colTasks.length}</Badge>
        </button>
        {!isCollapsed && (
          <div className="min-h-[400px]">
            {colTasks.map((task) => (
              <TaskCard key={task.id} task={task} status={status} />
            ))}
            {colTasks.length === 0 && (
              <div className="text-center py-8 text-sm text-muted-foreground">
                {emptyText}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-background to-background dark:from-orange-950/25 dark:via-background dark:to-background">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
            <p className="text-muted-foreground">
              {todoTasks.length} to do · {inProgressTasks.length} in progress · {reviewTasks.length} review · {doneTasks.length} done
              {hasActiveFilters && <span className="text-[#F5911E] ml-1">(filtered)</span>}
            </p>
          </div>

          <div className="flex gap-2">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => {
                  setEditingTask(null)
                  resetForm()
                }}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Task
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingTask ? 'Edit Task' : 'Create New Task'}</DialogTitle>
                  <DialogDescription>
                    {editingTask ? 'Update task details' : 'Add a new task to track'}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="title" className="text-sm font-medium">Title</label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Task title"
                      required
                      autoFocus
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="text-sm font-medium">Description</label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Task description (optional)"
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
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="review">Ready for Review</option>
                        <option value="done">Done</option>
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
                    <div>
                      <label htmlFor="siteId" className="text-sm font-medium">Site</label>
                      <select
                        id="siteId"
                        value={formData.siteId}
                        onChange={(e) => setFormData({ ...formData, siteId: e.target.value })}
                        className={selectClass}
                      >
                        <option value="">Geen site</option>
                        {sites.sort((a, b) => a.domain.localeCompare(b.domain)).map((site) => (
                          <option key={site.id} value={site.id}>{site.domain}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="projectId" className="text-sm font-medium">Project</label>
                      <select
                        id="projectId"
                        value={formData.projectId}
                        onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                        className={selectClass}
                      >
                        <option value="">No project</option>
                        {projects.map((project) => (
                          <option key={project.id} value={project.id}>{project.name}</option>
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
                      <label htmlFor="dueDate" className="text-sm font-medium">Due Date</label>
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
                      {editingTask ? 'Update' : 'Create'} Task
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        <div className="mt-6 space-y-4">
          {/* Search + Filter Bar */}
          <div className="flex flex-wrap gap-2 items-center">
            <Input
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="md:max-w-xs"
            />

            <select
              value={filterSite}
              onChange={(e) => setFilterSite(e.target.value)}
              className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="">All sites</option>
              {sites.sort((a, b) => a.domain.localeCompare(b.domain)).map((site) => (
                <option key={site.id} value={site.id}>{site.domain}</option>
              ))}
            </select>

            <select
              value={filterAssignee}
              onChange={(e) => setFilterAssignee(e.target.value)}
              className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="">All assignees</option>
              {assigneeOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>

            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="">All priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-[#F5911E] hover:text-[#F5911E] hover:bg-orange-50 dark:hover:bg-orange-950/20">
                <X className="h-3 w-3 mr-1" />
                Clear filters
              </Button>
            )}
          </div>

          {/* Kanban Board */}
          <div className="grid gap-6 md:grid-cols-4">
            <KanbanColumn
              id="todo"
              label="To Do"
              tasks={todoTasks}
              colorClass="bg-blue-50 dark:bg-blue-950/20"
              textClass="text-blue-900 dark:text-blue-200"
              emptyText="No tasks in To Do"
              status="todo"
            />
            <KanbanColumn
              id="in-progress"
              label="In Progress"
              tasks={inProgressTasks}
              colorClass="bg-orange-50 dark:bg-orange-950/20"
              textClass="text-orange-900 dark:text-orange-200"
              emptyText="No tasks in progress"
              status="in-progress"
            />
            <KanbanColumn
              id="review"
              label="🔍 Review"
              tasks={reviewTasks}
              colorClass="bg-amber-50 dark:bg-amber-950/20"
              textClass="text-amber-900 dark:text-amber-200"
              emptyText="Nothing to review"
              status="review"
            />
            <KanbanColumn
              id="done"
              label="Done"
              tasks={doneTasks}
              colorClass="bg-green-50 dark:bg-green-950/20"
              textClass="text-green-900 dark:text-green-200"
              emptyText="No completed tasks"
              status="done"
            />
          </div>

          {tasks.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-muted-foreground">No tasks yet</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Create your first task to get organized
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
                Create Your First Task
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
