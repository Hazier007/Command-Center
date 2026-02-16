"use client"

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Task = {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority?: string;
  assignee?: string;
  project?: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
};

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
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [selectedAssignee, setSelectedAssignee] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (selectedAssignee) {
      setFilteredTasks(tasks.filter(task => task.assignee === selectedAssignee));
    } else {
      setFilteredTasks(tasks);
    }
  }, [tasks, selectedAssignee]);

  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/tasks");
      const data = await response.json();
      setTasks(data);
      setFilteredTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateTaskStatus = async (taskId: string, newStatus: string) => {
    try {
      const task = tasks.find(t => t.id === taskId);
      if (!task) return;

      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...task, status: newStatus })
      });

      if (response.ok) {
        const updatedTask = await response.json();
        setTasks(prev => prev.map(t => t.id === taskId ? updatedTask : t));
      }
    } catch (error) {
      console.error("Error updating task:", error);
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
          <h1 className="text-3xl font-bold mb-2">Team Tasks</h1>
          <p className="text-muted-foreground mb-4">Kanban board voor team opdrachten</p>
          
          {/* Filter buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              variant={selectedAssignee === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedAssignee(null)}
              className={selectedAssignee === null ? "bg-orange-500 hover:bg-orange-600 text-white" : ""}
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
                  className={selectedAssignee === assignee ? "bg-orange-500 hover:bg-orange-600 text-white" : ""}
                >
                  {assigneeEmojis[assignee]} {assigneeNames[assignee]} ({count})
                </Button>
              );
            })}
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
                            {task.project && (
                              <Badge variant="outline" className="text-xs">
                                {task.project.name}
                              </Badge>
                            )}
                          </div>
                          
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