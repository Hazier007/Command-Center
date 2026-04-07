"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface Task {
  id: string; title: string; status: string; assignee?: string; priority?: string; category?: string
}

const COLUMNS = [
  { key: "todo", label: "To Do", icon: "○", color: "text-zinc-400" },
  { key: "in-progress", label: "In Progress", icon: "◉", color: "text-blue-400" },
  { key: "review", label: "Review", icon: "⏳", color: "text-yellow-400" },
  { key: "done", label: "Done", icon: "✓", color: "text-green-400" },
]

const agentColors: Record<string, string> = {
  radar: "bg-blue-500/15 text-blue-400", forge: "bg-green-500/15 text-green-400",
  ink: "bg-purple-500/15 text-purple-400", spark: "bg-[#F5911E]/15 text-[#F5911E]",
  ledger: "bg-yellow-500/15 text-yellow-400", atlas: "bg-blue-500/15 text-blue-300",
  bart: "bg-[#F5911E]/15 text-[#F5911E]", cowork: "bg-cyan-500/15 text-cyan-400",
}

export default function WerkPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [tab, setTab] = useState("taken")

  useEffect(() => {
    fetch("/api/tasks").then((r) => r.json()).then((d) => { if (Array.isArray(d)) setTasks(d) }).catch(() => {})
  }, [])

  const tasksByStatus = (status: string) =>
    tasks.filter((t) => t.status === status).slice(0, 8)

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <h1 className="text-[26px] font-extrabold tracking-tight text-white">📋 Werk</h1>
        <p className="text-[13px] text-zinc-500">Taken, content pipeline, projecten</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-0.5 rounded-lg border border-white/[0.06] bg-zinc-800/30 p-1 w-fit">
        {["taken", "content", "pipeline", "research"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "rounded-md px-4 py-1.5 text-[11px] font-medium capitalize transition-colors",
              tab === t ? "bg-zinc-700 text-white" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Kanban */}
      <div className="grid grid-cols-4 gap-3">
        {COLUMNS.map((col) => {
          const colTasks = tasksByStatus(col.key)
          return (
            <div key={col.key} className="rounded-xl border border-white/[0.06] bg-zinc-800/20 p-3">
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/[0.06]">
                <span className={cn("flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide", col.color)}>
                  {col.icon} {col.label}
                </span>
                <span className="rounded-full bg-zinc-700/50 px-2 py-0.5 text-[9px] text-zinc-400">
                  {colTasks.length}
                </span>
              </div>
              <div className="space-y-2">
                {colTasks.map((task) => (
                  <div
                    key={task.id}
                    className={cn(
                      "rounded-lg border border-white/[0.04] bg-zinc-800/40 p-3 cursor-pointer transition-all hover:border-[#F5911E]/20",
                      col.key === "review" && "border-yellow-500/20"
                    )}
                  >
                    <p className="text-[11px] font-medium text-white leading-snug mb-2">
                      {task.title}
                    </p>
                    <div className="flex items-center justify-between">
                      {task.assignee && (
                        <span className={cn("rounded px-1.5 py-0.5 text-[8px] font-bold uppercase", agentColors[task.assignee?.toLowerCase()] || "bg-zinc-700 text-zinc-400")}>
                          {task.assignee}
                        </span>
                      )}
                      {task.priority && (
                        <span className={cn("h-1.5 w-1.5 rounded-full", task.priority === "high" ? "bg-red-400" : task.priority === "medium" ? "bg-yellow-400" : "bg-zinc-500")} />
                      )}
                    </div>
                  </div>
                ))}
                {colTasks.length === 0 && (
                  <p className="text-center text-[11px] text-zinc-600 py-4">Geen taken</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
