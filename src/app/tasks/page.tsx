"use client"

import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, Calendar, Flag, User, Users } from "lucide-react"

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
import { tasksStorage, projectsStorage, type Task, type Project } from "@/lib/storage"

const assigneeOptions = [
  { value: 'bart', label: 'Bart 👑' },
  { value: 'lisa', label: 'Lisa 📋' },
  { value: 'jc', label: 'JC 🥊' },
  { value: 'wout', label: 'Wout 🔭' },
]

const assigneeEmojis = {
  bart: '👑',
  lisa: '📋',
  jc: '🥊',
  wout: '🔭'
}

const assigneeNames = {
  bart: 'Bart',
  lisa: 'Lisa',
  jc: 'JC',
  wout: 'Wout'
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo" as Task['status'],
    projectId: "",
    priority: "medium" as Task['priority'],
    assignee: "",
    dueDate: "",
  })

  useEffect(() => {
    const load = async () => {
      const [tasksData, projectsData] = await Promise.all([
        tasksStorage.getAll(),
        projectsStorage.getAll(),
      ])
      setTasks(tasksData)
      setProjects(projectsData)
    }
    load()
  }, [])

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const todoTasks = filteredTasks.filter(t => t.status === 'todo')
  const inProgressTasks = filteredTasks.filter(t => t.status === 'in-progress')
  const reviewTasks = filteredTasks.filter(t => t.status === 'review')
  const doneTasks = filteredTasks.filter(t => t.status === 'done')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingTask) {
      await tasksStorage.update(editingTask.id, {
        title: formData.title,
        description: formData.description || undefined,
        status: formData.status,
        projectId: formData.projectId || undefined,
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
                {assigneeEmojis[task.assignee as keyof typeof assigneeEmojis]} {assigneeNames[task.assignee as keyof typeof assigneeNames]}
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
                className="text-xs h-6 border-amber-500/50 text-amber-500 hover:bg-amber-500/10"
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-background to-background dark:from-orange-950/25 dark:via-background dark:to-background">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
            <p className="text-muted-foreground">
              {todoTasks.length} to do · {inProgressTasks.length} in progress · {reviewTasks.length} review · {doneTasks.length} done
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
                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
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
                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="projectId" className="text-sm font-medium">Project</label>
                      <select
                        id="projectId"
                        value={formData.projectId}
                        onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
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
                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
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
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="md:max-w-sm"
          />

          {/* Kanban Board */}
          <div className="grid gap-6 md:grid-cols-4">
            {/* To Do Column */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-200">
                  To Do
                </h2>
                <Badge variant="secondary">
                  {todoTasks.length}
                </Badge>
              </div>
              <div className="min-h-[400px]">
                {todoTasks.map((task) => (
                  <TaskCard key={task.id} task={task} status="todo" />
                ))}
                {todoTasks.length === 0 && (
                  <div className="text-center py-8 text-sm text-muted-foreground">
                    No tasks in To Do
                  </div>
                )}
              </div>
            </div>

            {/* In Progress Column */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-lg bg-orange-50 dark:bg-orange-950/20">
                <h2 className="text-lg font-semibold text-orange-900 dark:text-orange-200">
                  In Progress
                </h2>
                <Badge variant="secondary">
                  {inProgressTasks.length}
                </Badge>
              </div>
              <div className="min-h-[400px]">
                {inProgressTasks.map((task) => (
                  <TaskCard key={task.id} task={task} status="in-progress" />
                ))}
                {inProgressTasks.length === 0 && (
                  <div className="text-center py-8 text-sm text-muted-foreground">
                    No tasks in progress
                  </div>
                )}
              </div>
            </div>

            {/* Review Column */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20">
                <h2 className="text-lg font-semibold text-amber-900 dark:text-amber-200">
                  🔍 Review
                </h2>
                <Badge variant="secondary">
                  {reviewTasks.length}
                </Badge>
              </div>
              <div className="min-h-[400px]">
                {reviewTasks.map((task) => (
                  <TaskCard key={task.id} task={task} status="review" />
                ))}
                {reviewTasks.length === 0 && (
                  <div className="text-center py-8 text-sm text-muted-foreground">
                    Nothing to review
                  </div>
                )}
              </div>
            </div>

            {/* Done Column */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-lg bg-green-50 dark:bg-green-950/20">
                <h2 className="text-lg font-semibold text-green-900 dark:text-green-200">
                  Done
                </h2>
                <Badge variant="secondary">
                  {doneTasks.length}
                </Badge>
              </div>
              <div className="min-h-[400px]">
                {doneTasks.map((task) => (
                  <TaskCard key={task.id} task={task} status="done" />
                ))}
                {doneTasks.length === 0 && (
                  <div className="text-center py-8 text-sm text-muted-foreground">
                    No completed tasks
                  </div>
                )}
              </div>
            </div>
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