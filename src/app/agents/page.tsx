"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

// ─── Types ─────────────────────────────────────────────────────
interface AgentLog {
  id: string; agent: string; action: string; details?: string; createdAt: string
}
interface Task {
  id: string; title: string; status: string; assignee?: string; priority?: string; category?: string
}

// ─── Agent profiles ───────────────────────────────────────────
const AGENTS = [
  {
    id: "atlas", name: "ATLAS", code: "VPZI", role: "Strategist & Operator",
    emoji: "🗺️", color: "bg-blue-500", cardColor: "border-blue-500/20",
    badgeColor: "bg-blue-500/15 text-blue-300", hex: "#3B82F6",
    description: "Business partner. Dirigeert het team, stelt prioriteiten, bewaakt de grote lijnen.",
    specialties: ["Strategie", "Planning", "Sprint management", "Team coördinatie"],
  },
  {
    id: "forge", name: "FORGE", code: "JKLQ", role: "Full-Stack Developer",
    emoji: "🔨", color: "bg-red-500", cardColor: "border-red-500/20",
    badgeColor: "bg-red-500/15 text-red-400", hex: "#EF4444",
    description: "Bouwt en onderhoudt alle technische systemen. Frontend, API, database, deployment.",
    specialties: ["Next.js", "React", "Prisma", "Vercel deploy"],
  },
  {
    id: "radar", name: "RADAR", code: "JKWF", role: "SEO & Domain Intelligence",
    emoji: "📡", color: "bg-green-500", cardColor: "border-green-500/20",
    badgeColor: "bg-green-500/15 text-green-400", hex: "#10B981",
    description: "Scant de markt, vindt kansen, analyseert domeinen en zoekverkeer.",
    specialties: ["SEO analyse", "Keyword research", "GSC data", "Domein evaluatie"],
  },
  {
    id: "ink", name: "INK", code: "HWHF", role: "Content & Copywriter",
    emoji: "✒️", color: "bg-purple-500", cardColor: "border-purple-500/20",
    badgeColor: "bg-purple-500/15 text-purple-400", hex: "#8B5CF6",
    description: "Schrijft alle content. Blogposts, productreviews, landingspagina's, SEO teksten.",
    specialties: ["Copywriting", "SEO content", "Product reviews", "Klant rapportage"],
  },
  {
    id: "ledger", name: "LEDGER", code: "FXSB", role: "Finance & Analytics",
    emoji: "📊", color: "bg-yellow-500", cardColor: "border-yellow-500/20",
    badgeColor: "bg-yellow-500/15 text-yellow-400", hex: "#F59E0B",
    description: "Beheert financiën, analyseert data, maakt rapporten en forecasts.",
    specialties: ["P&L analyse", "MRR tracking", "KPI rapportage", "Forecasting"],
  },
  {
    id: "spark", name: "SPARK", code: "SJGU", role: "Growth & Acquisitions",
    emoji: "⚡", color: "bg-[#F5911E]", cardColor: "border-[#F5911E]/20",
    badgeColor: "bg-[#F5911E]/15 text-[#F5911E]", hex: "#F5911E",
    description: "Evalueert ideeën, analyseert domeinen, beoordeelt acquisities op ROI.",
    specialties: ["Idee scoring", "Domein evaluatie", "Market research", "Growth hacking"],
  },
]

// ─── Agent Detail Modal ───────────────────────────────────────
function AgentModal({ agent, tasks, logs, onClose, onDispatch }: {
  agent: typeof AGENTS[0]; tasks: Task[]; logs: AgentLog[]; onClose: () => void
  onDispatch: (agent: string, title: string, category: string) => Promise<void>
}) {
  const [dispatchTitle, setDispatchTitle] = useState("")
  const [dispatchCategory, setDispatchCategory] = useState("general")
  const [dispatching, setDispatching] = useState(false)

  const agentTasks = tasks.filter((t) => t.assignee?.toLowerCase() === agent.id)
  const agentLogs = logs.filter((l) => l.agent?.toLowerCase() === agent.id).slice(0, 8)
  const openTasks = agentTasks.filter((t) => t.status !== "done")
  const doneTasks = agentTasks.filter((t) => t.status === "done")

  const handleDispatch = async () => {
    if (!dispatchTitle.trim()) return
    setDispatching(true)
    await onDispatch(agent.id, dispatchTitle, dispatchCategory)
    setDispatchTitle("")
    setDispatching(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-white/[0.08] bg-zinc-900 shadow-2xl animate-in fade-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
        {/* Agent header */}
        <div className="p-6 border-b border-white/[0.06]" style={{ borderTopColor: agent.hex, borderTopWidth: "3px" }}>
          <div className="flex items-center gap-4">
            <span className="text-3xl">{agent.emoji}</span>
            <div className="flex-1">
              <h2 className="text-[18px] font-extrabold text-white">{agent.name} <span className="text-zinc-500 font-normal text-[13px]">({agent.code})</span></h2>
              <p className="text-[12px] text-zinc-400">{agent.role}</p>
            </div>
            <button onClick={onClose} className="rounded-lg p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors">✕</button>
          </div>
          <p className="text-[12px] text-zinc-500 mt-2">{agent.description}</p>
          <div className="flex gap-1.5 mt-3">
            {agent.specialties.map((s) => (
              <span key={s} className={cn("rounded px-2 py-0.5 text-[9px] font-bold", agent.badgeColor)}>{s}</span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 p-5">
          <div className="rounded-lg border border-white/[0.06] bg-zinc-800/30 p-3 text-center">
            <p className="text-[22px] font-extrabold text-white">{openTasks.length}</p>
            <p className="text-[9px] uppercase text-zinc-500">Open taken</p>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-zinc-800/30 p-3 text-center">
            <p className="text-[22px] font-extrabold text-white">{doneTasks.length}</p>
            <p className="text-[9px] uppercase text-zinc-500">Afgerond</p>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-zinc-800/30 p-3 text-center">
            <p className="text-[22px] font-extrabold text-white">{agentLogs.length}</p>
            <p className="text-[9px] uppercase text-zinc-500">Recente acties</p>
          </div>
        </div>

        {/* Dispatch new task */}
        <div className="mx-5 mb-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
          <p className="text-[11px] font-bold text-cyan-400 mb-2">⚡ Taak dispatchen naar {agent.name}</p>
          <div className="flex gap-2">
            <input
              value={dispatchTitle}
              onChange={(e) => setDispatchTitle(e.target.value)}
              placeholder={`Taak voor ${agent.name}...`}
              className="flex-1 rounded-lg border border-white/[0.08] bg-zinc-800/60 px-3 py-2 text-[12px] text-white placeholder-zinc-500 outline-none focus:border-cyan-500/40"
              onKeyDown={(e) => e.key === "Enter" && handleDispatch()}
            />
            <select
              value={dispatchCategory}
              onChange={(e) => setDispatchCategory(e.target.value)}
              className="rounded-lg border border-white/[0.08] bg-zinc-800/60 px-2 py-2 text-[11px] text-zinc-300 outline-none"
            >
              <option value="general">General</option>
              <option value="seo">SEO</option>
              <option value="dev">Dev</option>
              <option value="content">Content</option>
              <option value="research">Research</option>
            </select>
            <button
              onClick={handleDispatch}
              disabled={dispatching || !dispatchTitle.trim()}
              className="rounded-lg bg-cyan-500/20 px-4 py-2 text-[11px] font-bold text-cyan-400 hover:bg-cyan-500/30 disabled:opacity-50 transition-colors"
            >
              {dispatching ? "..." : "Stuur →"}
            </button>
          </div>
        </div>

        {/* Open tasks */}
        {openTasks.length > 0 && (
          <div className="mx-5 mb-4">
            <p className="text-[10px] font-bold uppercase text-zinc-500 mb-2">Open taken</p>
            <div className="space-y-1.5">
              {openTasks.slice(0, 6).map((t) => (
                <div key={t.id} className="flex items-center gap-3 rounded-lg border border-white/[0.04] bg-zinc-800/40 px-3 py-2">
                  <span className={cn("h-1.5 w-1.5 rounded-full", t.status === "in-progress" ? "bg-blue-400" : t.status === "review" ? "bg-yellow-400" : "bg-zinc-500")} />
                  <p className="text-[11px] text-white flex-1 truncate">{t.title}</p>
                  <span className="text-[9px] text-zinc-500 uppercase">{t.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent logs */}
        {agentLogs.length > 0 && (
          <div className="mx-5 mb-5">
            <p className="text-[10px] font-bold uppercase text-zinc-500 mb-2">Recente activiteit</p>
            <div className="space-y-1">
              {agentLogs.map((log) => (
                <div key={log.id} className="flex items-center gap-3 rounded-lg px-3 py-1.5 text-[10px]">
                  <span className="text-zinc-600">{new Date(log.createdAt).toLocaleDateString("nl-BE")}</span>
                  <span className="text-zinc-300">{log.action}</span>
                  {log.details && <span className="text-zinc-500 truncate flex-1">{log.details}</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────
export default function AgentsPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [logs, setLogs] = useState<AgentLog[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedAgent, setSelectedAgent] = useState<typeof AGENTS[0] | null>(null)

  useEffect(() => {
    Promise.all([
      fetch("/api/tasks").then((r) => r.json()).catch(() => []),
      fetch("/api/agent-logs?limit=50").then((r) => r.json()).catch(() => []),
    ])
      .then(([t, l]) => {
        setTasks(Array.isArray(t) ? t : [])
        setLogs(Array.isArray(l) ? l : [])
      })
      .finally(() => setLoading(false))
  }, [])

  const getAgentStats = (agentId: string) => {
    const agentTasks = tasks.filter((t) => t.assignee?.toLowerCase() === agentId)
    const open = agentTasks.filter((t) => t.status !== "done").length
    const done = agentTasks.filter((t) => t.status === "done").length
    const lastLog = logs.find((l) => l.agent?.toLowerCase() === agentId)
    return { open, done, total: agentTasks.length, lastLog }
  }

  const dispatchTask = async (agentId: string, title: string, category: string) => {
    const res = await fetch("/api/agent/task", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer COWORK-SKILL" },
      body: JSON.stringify({ source: "bart", title, category, priority: "medium", assignedTo: agentId, needsApproval: false }),
    })
    if (res.ok) {
      const newTask = await res.json()
      setTasks((prev) => [newTask, ...prev])
    }
  }

  // Total stats
  const totalOpen = tasks.filter((t) => t.status !== "done").length
  const totalDone = tasks.filter((t) => t.status === "done").length
  const totalLogs = logs.length

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Header */}
      <div>
        <h1 className="text-[26px] font-extrabold tracking-tight text-white">🤖 Agents</h1>
        <p className="text-[13px] text-zinc-500">Je AI team — status, taken, en direct dispatchen</p>
      </div>

      {/* Team stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-800/30 p-4">
          <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">Open taken (team)</p>
          <p className="text-[24px] font-extrabold text-white mt-1 tabular-nums">{loading ? "..." : totalOpen}</p>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-zinc-800/30 p-4">
          <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">Afgerond (team)</p>
          <p className="text-[24px] font-extrabold text-green-400 mt-1 tabular-nums">{loading ? "..." : totalDone}</p>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-zinc-800/30 p-4">
          <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">Recente acties</p>
          <p className="text-[24px] font-extrabold text-white mt-1 tabular-nums">{loading ? "..." : totalLogs}</p>
        </div>
      </div>

      {/* Agent cards */}
      <div className="grid grid-cols-3 gap-4">
        {AGENTS.map((agent) => {
          const stats = getAgentStats(agent.id)
          return (
            <button
              key={agent.id}
              onClick={() => setSelectedAgent(agent)}
              className={cn(
                "group relative overflow-hidden rounded-xl border bg-zinc-800/30 p-5 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]",
                agent.cardColor
              )}
            >
              {/* Top accent */}
              <div className={cn("absolute top-0 left-0 right-0 h-[3px]", agent.color)} />

              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{agent.emoji}</span>
                <div>
                  <h3 className="text-[15px] font-extrabold text-white">{agent.name}</h3>
                  <p className="text-[10px] text-zinc-500">{agent.role}</p>
                </div>
              </div>

              <p className="text-[11px] text-zinc-500 leading-relaxed mb-4">{agent.description}</p>

              {/* Stats */}
              <div className="flex gap-4 mb-3">
                <div>
                  <p className="text-[18px] font-extrabold text-white tabular-nums">{stats.open}</p>
                  <p className="text-[8px] uppercase text-zinc-500">Open</p>
                </div>
                <div>
                  <p className="text-[18px] font-extrabold text-green-400 tabular-nums">{stats.done}</p>
                  <p className="text-[8px] uppercase text-zinc-500">Done</p>
                </div>
              </div>

              {/* Last activity */}
              {stats.lastLog && (
                <div className="rounded-lg bg-zinc-800/60 px-2.5 py-1.5">
                  <p className="text-[9px] text-zinc-500 truncate">
                    Laatste: {stats.lastLog.action} — {new Date(stats.lastLog.createdAt).toLocaleDateString("nl-BE")}
                  </p>
                </div>
              )}

              {/* Hover CTA */}
              <span className="absolute bottom-4 right-4 text-[10px] font-bold text-cyan-400 opacity-0 transition-opacity group-hover:opacity-100">
                Details →
              </span>
            </button>
          )
        })}
      </div>

      {/* Agent Detail Modal */}
      {selectedAgent && (
        <AgentModal
          agent={selectedAgent}
          tasks={tasks}
          logs={logs}
          onClose={() => setSelectedAgent(null)}
          onDispatch={dispatchTask}
        />
      )}
    </div>
  )
}
