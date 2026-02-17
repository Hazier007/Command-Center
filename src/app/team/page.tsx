"use client"

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { tasksStorage, projectsStorage, type Task, type Project } from "@/lib/storage";

// Type interface already imported from storage

const assigneeOptions = [
  { value: 'bart', label: 'Bart 👑' },
  { value: 'lisa', label: 'Lisa 📋' },
  { value: 'jc', label: 'JC 🥊' },
  { value: 'wout', label: 'Wout 🔭' },
]

const assigneeEmojis = {
  bart: "👑",
  lisa: "📋", 
  jc: "🥊",
  wout: "🔭"
};

const assigneeNames = {
  bart: "Bart",
  lisa: "Lisa",
  jc: "JC", 
  wout: "Wout"
};

const statusColumns = [
  { key: "todo", title: "Todo", count: 0 },
  { key: "in-progress", title: "In Progress", count: 0 },
  { key: "done", title: "Done", count: 0 }
];

export default function TeamPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [selectedAssignee, setSelectedAssignee] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo" as Task['status'],
    projectId: "",
    priority: "medium" as Task['priority'],
    assignee: "",
    dueDate: "",
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (selectedAssignee === 'unassigned') {
      setFilteredTasks(tasks.filter(task => !task.assignee));
    } else if (selectedAssignee) {
      setFilteredTasks(tasks.filter(task => task.assignee === selectedAssignee));
    } else {
      setFilteredTasks(tasks);
    }
  }, [tasks, selectedAssignee]);

  const fetchTasks = async () => {
    try {
      const [tasksData, projectsData] = await Promise.all([
        tasksStorage.getAll(),
        projectsStorage.getAll(),
      ]);
      setTasks(tasksData);
      setFilteredTasks(tasksData);
      setProjects(projectsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateTaskStatus = async (taskId: string, newStatus: Task['status']) => {
    try {
      const updatedTask = await tasksStorage.update(taskId, { status: newStatus });
      if (updatedTask) {
        setTasks(prev => prev.map(t => t.id === taskId ? updatedTask : t));
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      
      if (editingTask) {
        const updatedTask = await tasksStorage.update(editingTask.id, {
          title: formData.title,
          description: formData.description || undefined,
          status: formData.status,
          projectId: formData.projectId || undefined,
          priority: formData.priority || undefined,
          assignee: formData.assignee || undefined,
          dueDate: formData.dueDate || undefined,
        });
        if (updatedTask) {
          setTasks(prev => prev.map(t => t.id === editingTask.id ? updatedTask : t));
        }
      } else {
        const newTask = await tasksStorage.create({
          title: formData.title,
          description: formData.description || undefined,
          status: formData.status,
          projectId: formData.projectId || undefined,
          priority: formData.priority || undefined,
          assignee: formData.assignee || undefined,
          dueDate: formData.dueDate || undefined,
        });
        setTasks(prev => [...prev, newTask]);
      }

      await fetchTasks(); // Refresh to get full data
      setIsDialogOpen(false);
      setEditingTask(null);
      resetForm();
    } catch (error) {
      console.error('Failed to save task:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      status: "todo",
      projectId: "",
      priority: "medium",
      assignee: "",
      dueDate: "",
    });
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description || "",
      status: task.status,
      projectId: task.projectId || "",
      priority: task.priority || "medium",
      assignee: task.assignee || "",
      dueDate: task.dueDate || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (taskId: string) => {
    if (confirm("Weet je zeker dat je deze taak wilt verwijderen?")) {
      try {
        const success = await tasksStorage.delete(taskId);
        if (success) {
          setTasks(prev => prev.filter(t => t.id !== taskId));
        }
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    }
  };

  const handleQuickAssign = async (taskId: string, assignee: string) => {
    try {
      const updatedTask = await tasksStorage.update(taskId, { assignee });
      if (updatedTask) {
        setTasks(prev => prev.map(t => t.id === taskId ? updatedTask : t));
      }
    } catch (error) {
      console.error("Error updating task assignee:", error);
    }
  };

  const getTasksByStatus = (status: string) => {
    return filteredTasks.filter(task => task.status === status);
  };

  const getPriorityBadgeVariant = (priority?: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "secondary"; 
      case "low": return "outline";
      default: return "outline";
    }
  };

  const assigneeFilters = Object.keys(assigneeEmojis) as Array<keyof typeof assigneeEmojis>;

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Team Tasks</h1>
              <p className="text-muted-foreground">Kanban board voor team opdrachten</p>
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#F5911E] hover:bg-[#e07d0a] text-white" onClick={() => {
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
                    {editingTask ? 'Pas de details aan' : 'Maak een nieuwe taak voor het team'}
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
                    <label htmlFor="description" className="text-sm font-medium">Beschrijving</label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Beschrijf de taak in detail..."
                      className="min-h-[100px]"
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
                        <option value="todo">Todo</option>
                        <option value="in-progress">In Progress</option>
                        <option value="done">Done</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="priority" className="text-sm font-medium">Prioriteit</label>
                      <select
                        id="priority"
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value as Task['priority'] })}
                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        <option value="low">Laag</option>
                        <option value="medium">Medium</option>
                        <option value="high">Hoog</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
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
                      <label htmlFor="projectId" className="text-sm font-medium">Project</label>
                      <select
                        id="projectId"
                        value={formData.projectId}
                        onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        <option value="">Geen project</option>
                        {projects.map((project) => (
                          <option key={project.id} value={project.id}>{project.name}</option>
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
                    <Button type="submit" className="flex-1 bg-[#F5911E] hover:bg-[#e07d0a] text-white" disabled={submitting}>
                      {submitting ? 'Opslaan...' : (editingTask ? 'Bijwerken' : 'Toevoegen')}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Annuleren
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          
          {/* Filter buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              variant={selectedAssignee === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedAssignee(null)}
              className={selectedAssignee === null ? "bg-[#F5911E] hover:bg-[#e07d0a] text-white" : ""}
            >
              All ({tasks.length})
            </Button>
            {assigneeFilters.map((assignee) => {
              const count = tasks.filter(task => task.assignee === assignee).length;
              return (
                <Button
                  key={assignee}
                  variant={selectedAssignee === assignee ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedAssignee(assignee)}
                  className={selectedAssignee === assignee ? "bg-[#F5911E] hover:bg-[#e07d0a] text-white" : ""}
                >
                  {assigneeEmojis[assignee]} {assigneeNames[assignee]} ({count})
                </Button>
              );
            })}
            <Button
              variant={selectedAssignee === 'unassigned' ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedAssignee('unassigned')}
              className={selectedAssignee === 'unassigned' ? "bg-[#F5911E] hover:bg-[#e07d0a] text-white" : ""}
            >
              🔲 Niet toegewezen ({tasks.filter(task => !task.assignee).length})
            </Button>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statusColumns.map((column) => {
            const columnTasks = getTasksByStatus(column.key);
            return (
              <div key={column.key} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">{column.title}</h2>
                  <Badge variant="secondary" className="text-xs">
                    {columnTasks.length}
                  </Badge>
                </div>

                <div className="space-y-3">
                  {columnTasks.map((task) => (
                    <Card key={task.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-sm font-medium leading-5">
                            {task.title}
                          </CardTitle>
                          {task.priority && (
                            <Badge 
                              variant={getPriorityBadgeVariant(task.priority)} 
                              className="shrink-0 text-xs"
                            >
                              {task.priority}
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        {task.description && (
                          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                            {task.description}
                          </p>
                        )}
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {task.assignee && (
                                <div className="flex items-center gap-1">
                                  <span>{assigneeEmojis[task.assignee as keyof typeof assigneeEmojis]}</span>
                                  <span className="text-xs text-muted-foreground">
                                    {assigneeNames[task.assignee as keyof typeof assigneeNames]}
                                  </span>
                                </div>
                              )}
                              {task.projectId && projects.find(p => p.id === task.projectId) && (
                                <Badge variant="outline" className="text-xs">
                                  {projects.find(p => p.id === task.projectId)?.name}
                                </Badge>
                              )}
                            </div>
                            
                            {/* Edit/Delete buttons */}
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 w-6 p-0"
                                onClick={() => handleEdit(task)}
                                title="Edit task"
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 w-6 p-0 text-red-600 hover:bg-red-100"
                                onClick={() => handleDelete(task.id)}
                                title="Delete task"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>

                          {/* Quick assign dropdown */}
                          <div className="flex items-center justify-between">
                            <select
                              value={task.assignee || ""}
                              onChange={(e) => handleQuickAssign(task.id, e.target.value)}
                              className="text-xs border rounded px-2 py-1 bg-background"
                              title="Quick assign"
                            >
                              <option value="">🔲 Niet toegewezen</option>
                              {assigneeOptions.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                              ))}
                            </select>
                            
                            {/* Quick status change buttons */}
                            <div className="flex gap-1">
                              {column.key !== "todo" && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-6 w-6 p-0 text-xs text-orange-600 hover:bg-orange-100"
                                  onClick={() => updateTaskStatus(task.id, "todo")}
                                  title="Move to Todo"
                                >
                                  ←
                                </Button>
                              )}
                              {column.key !== "in-progress" && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-6 w-6 p-0 text-xs text-orange-600 hover:bg-orange-100"
                                  onClick={() => updateTaskStatus(task.id, "in-progress")}
                                  title="Move to In Progress"
                                >
                                  ↔
                                </Button>
                              )}
                              {column.key !== "done" && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-6 w-6 p-0 text-xs text-orange-600 hover:bg-orange-100"
                                  onClick={() => updateTaskStatus(task.id, "done")}
                                  title="Move to Done"
                                >
                                  →
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {columnTasks.length === 0 && (
                    <div className="text-center py-8 text-sm text-muted-foreground border-2 border-dashed border-muted rounded-lg">
                      No tasks in {column.title.toLowerCase()}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}