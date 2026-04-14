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

// ─── Team BC: De actieve kern ─────────────────────────────────
const TEAM_BC = [
  {
    id: "bart", name: "Bart", role: "Eigenaar & Operator",
    emoji: "👤", color: "bg-[#F5911E]", cardColor: "border-[#F5911E]/20",
    badgeColor: "bg-[#F5911E]/15 text-[#F5911E]", hex: "#F5911E",
    description: "Oprichter van Hazier. Beslist, keurt goed, stuurt bij. Alles begint en eindigt hier.",
    specialties: ["Strategie", "Beslissingen", "Klantrelaties", "Business Dev"],
  },
  {
    id: "claude", name: "Claude", role: "Builder & Strategist",
    emoji: "🤖", color: "bg-amber-500", cardColor: "border-amber-500/20",
    badgeColor: "bg-amber-500/15 text-amber-400", hex: "#D97706",
    description: "Rechterhand van Bart. Bouwt het CC, schrijft content, analyseert finance, evalueert groei.",
    specialties: ["Development", "Content", "Finance", "Groei", "SEO", "Strategie"],
  },
  {
    id: "radar", name: "RADAR", role: "SEO & Domain Intelligence",
    emoji: "📡", color: "bg-green-500", cardColor: "border-green-500/20",
    badgeColor: "bg-green-500/15 text-green-400", hex: "#10B981",
    description: "Autonome agent. Scant de markt, vindt kansen, analyseert domeinen en zoekverkeer.",
    specialties: ["SEO analyse", "Keyword research", "GSC data", "Domein evaluatie"],
  },
]

// ─── Legacy agents (historische data) ─────────────────────────
const LEGACY_AGENTS = [
  { id: "atlas", name: "ATLAS", emoji: "🗺️", role: "Strategist", hex: "#3B82F6" },
  { id: "forge", name: "FORGE", emoji: "🔨", role: "Developer", hex: "#EF4444" },
  { id: "ink", name: "INK", emoji: "✒️", role: "Copywriter", hex: "#8B5CF6" },
  { id: "ledger", name: "LEDGER", emoji: "📊", role: "Finance", hex: "#F59E0B" },
  { id: "spark", name: "SPARK", emoji: "⚡", role: "Growth", hex: "#EC4899" },
]

// ─── Team Member Modal ───────────────────────────────────────
function MemberModal({ member, tasks, logs, onClose, onDispatch }: {
  member: typeof TEAM_BC[0]; tasks: Task[]; logs: AgentLog[]; onClose: () => void
  onDispatch: (assignee: string, title: string, category: string) => Promise<void>
}) {
  const [dispatchTitle, setDispatchTitle] = useState("")
  const [dispatchCategory, setDispatchCategory] = useState("general")
  const [dispatching, setDispatching] = useState(false)

  const memberTasks = tasks.filter((t) => t.assignee?.toLowerCase() === member.id)
  const memberLogs = logs.filter((l) => l.agent?.toLowerCase() === member.id).slice(0, 8)
  const openTasks = memberTasks.filter((t) => t.status !== "done")
  const doneTasks = memberTasks.filter((t) => t.status === "done")

  const handleDispatch = async () => {
    if (!dispatchTitle.trim()) return
    setDispatching(true)
    await onDispatch(member.id, dispatchTitle, dispatchCategory)
    setDispatchTitle("")
    setDispatching(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-white/[0.08] bg-zinc-900 shadow-2xl animate-in fade-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="p-6 border-b border-white/[0.06]" style={{ borderTopColor: member.hex, borderTopWidth: "3px" }}>
          <div className="flex items-center gap-4">
            <span className="text-3xl">{member.emoji}</span>
            <div className="flex-1">
              <h2 className="text-[18px] font-extrabold text-white">{member.name}</h2>
              <p className="text-[12px] text-zinc-400">{member.role}</p>
            </div>
            <button onClick={onClose} className="rounded-lg p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors">✕</button>
          </div>
          <p className="text-[12px] text-zinc-500 mt-2">{member.description}</p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {member.specialties.map((s) => (
              <span key={s} className={cn("rounded px-2 py-0.5 text-[9px] font-bold", member.badgeColor)}>{s}</span>
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
            <p className="text-[22px] font-extrabold text-white">{memberLogs.length}</p>
            <p className="text-[9px] uppercase text-zinc-500">Recente acties</p>
          </div>
        </div>

        {/* Dispatch new task */}
        <div className="mx-5 mb-4 rounded-xl border border-[#F5911E]/20 bg-[#F5911E]/5 p-4">
          <p className="text-[11px] font-bold text-[#F5911E] mb-2">⚡ Taak toewijzen aan {member.name}</p>
          <div className="flex gap-2">
            <input
              value={dispatchTitle}
              onChange={(e) => setDispatchTitle(e.target.value)}
              placeholder={`Taak voor ${member.name}...`}
              className="flex-1 rounded-lg border border-white/[0.08] bg-zinc-800/60 px-3 py-2 text-[12px] text-white placeholder-zinc-500 outline-none focus:border-[#F5911E]/40"
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
              className="rounded-lg bg-[#F5911E]/20 px-4 py-2 text-[11px] font-bold text-[#F5911E] hover:bg-[#F5911E]/30 disabled:opacity-50 transition-colors"
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
              {openTasks.slice(0, 8).map((t) => (
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
        {memberLogs.length > 0 && (
          <div className="mx-5 mb-5">
            <p className="text-[10px] font-bold uppercase text-zinc-500 mb-2">Recente activiteit</p>
            <div className="space-y-1">
              {memberLogs.map((log) => (
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
  const [selectedMember, setSelectedMember] = useState<typeof TEAM_BC[0] | null>(null)
  const [showLegacy, setShowLegacy] = useState(false)

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

  const getStats = (id: string) => {
    const memberTasks = tasks.filter((t) => t.assignee?.toLowerCase() === id)
    const open = memberTasks.filter((t) => t.status !== "done").length
    const done = memberTasks.filter((t) => t.status === "done").length
    const lastLog = logs.find((l) => l.agent?.toLowerCase() === id)
    return { open, done, total: memberTasks.length, lastLog }
  }

  const dispatchTask = async (assignee: string, title: string, category: string) => {
    const res = await fetch("/api/agent/task", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer COWORK-SKILL" },
      body: JSON.stringify({ source: "bart", title, category, priority: "medium", assignedTo: assignee, needsApproval: false }),
    })
    if (res.ok) {
      const newTask = await res.json()
      setTasks((prev) => [newTask, ...prev])
    }
  }

  // Team-wide stats
  const totalOpen = tasks.filter((t) => t.status !== "done").length
  const totalDone = tasks.filter((t) => t.status === "done").length

  // Legacy stats
  const legacyTaskCount = LEGACY_AGENTS.reduce((sum, a) => {
    return sum + tasks.filter((t) => t.assignee?.toLowerCase() === a.id && t.status !== "done").length
  }, 0)

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Header */}
      <div>
        <h1 className="text-[26px] font-extrabold tracking-tight text-white">👥 Team BC</h1>
        <p className="text-[13px] text-zinc-500">Bart + Claude + RADAR — je kernteam</p>
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
          <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">Team leden</p>
          <p className="text-[24px] font-extrabold text-[#F5911E] mt-1 tabular-nums">3</p>
        </div>
      </div>

      {/* Team BC cards */}
      <div className="grid grid-cols-3 gap-4">
        {TEAM_BC.map((member) => {
          const stats = getStats(member.id)
          return (
            <button
              key={member.id}
              onClick={() => setSelectedMember(member)}
              className={cn(
                "group relative overflow-hidden rounded-xl border bg-zinc-800/30 p-5 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]",
                member.cardColor
              )}
            >
              {/* Top accent */}
              <div className={cn("absolute top-0 left-0 right-0 h-[3px]", member.color)} />

              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{member.emoji}</span>
                <div>
                  <h3 className="text-[15px] font-extrabold text-white">{member.name}</h3>
                  <p className="text-[10px] text-zinc-500">{member.role}</p>
                </div>
              </div>

              <p className="text-[11px] text-zinc-500 leading-relaxed mb-4">{member.description}</p>

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

              {/* Active indicator for RADAR */}
              {member.id === "radar" && (
                <span className="absolute top-4 right-4 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[9px] text-green-400 font-medium">Live</span>
                </span>
              )}

              {/* Hover CTA */}
              <span className="absolute bottom-4 right-4 text-[10px] font-bold text-[#F5911E] opacity-0 transition-opacity group-hover:opacity-100">
                Details →
              </span>
            </button>
          )
        })}
      </div>

      {/* Legacy agents section */}
      {legacyTaskCount > 0 && (
        <div className="rounded-xl border border-white/[0.04] bg-zinc-800/20 p-4">
          <button
            onClick={() => setShowLegacy(!showLegacy)}
            className="flex items-center gap-2 w-full text-left"
          >
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
              Legacy agents
            </span>
            <span className="text-[10px] text-zinc-600">
              — {legacyTaskCount} open taken van voormalige agents
            </span>
            <span className="ml-auto text-zinc-600 text-[11px]">{showLegacy ? "▼" : "▶"}</span>
          </button>

          {showLegacy && (
            <div className="mt-3 grid grid-cols-5 gap-2">
              {LEGACY_AGENTS.map((agent) => {
                const stats = getStats(agent.id)
                return (
                  <div
                    key={agent.id}
                    className="rounded-lg border border-white/[0.04] bg-zinc-800/30 p-3 text-center opacity-60"
                  >
                    <span className="text-lg">{agent.emoji}</span>
                    <p className="text-[11px] font-bold text-zinc-400 mt-1">{agent.name}</p>
                    <p className="text-[9px] text-zinc-600">{agent.role}</p>
                    <div className="flex justify-center gap-3 mt-2">
                      <div>
                        <p className="text-[14px] font-bold text-zinc-400 tabular-nums">{stats.open}</p>
                        <p className="text-[7px] uppercase text-zinc-600">Open</p>
                      </div>
                      <div>
                        <p className="text-[14px] font-bold text-zinc-500 tabular-nums">{stats.done}</p>
                        <p className="text-[7px] uppercase text-zinc-600">Done</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Team Member Detail Modal */}
      {selectedMember && (
        <MemberModal
          member={selectedMember}
          tasks={tasks}
          logs={logs}
          onClose={() => setSelectedMember(null)}
          onDispatch={dispatchTask}
        />
      )}
    </div>
  )
}
