"use client"

import { useEffect, useState } from "react"
import { ACTIVE_ASSIGNEES, TEAM } from "@/lib/agents"
import { cn } from "@/lib/utils"

interface AgentLog { id: string; agent: string; action: string; details?: string; createdAt: string }
interface Task { id: string; title: string; status: string; assignee?: string; priority?: string; category?: string }

const CARD_STYLES: Record<string, { ring: string; badge: string; glow: string }> = {
  bart: { ring: "border-[#F5911E]/25", badge: "bg-[#F5911E]/15 text-[#F5911E]", glow: "shadow-[#F5911E]/10" },
  hermes: { ring: "border-white/20", badge: "bg-white/10 text-white", glow: "shadow-white/10" },
  lisa: { ring: "border-sky-400/25", badge: "bg-sky-400/15 text-sky-300", glow: "shadow-sky-400/10" },
  wout: { ring: "border-emerald-400/25", badge: "bg-emerald-400/15 text-emerald-300", glow: "shadow-emerald-400/10" },
  "jean-cloud": { ring: "border-violet-400/25", badge: "bg-violet-400/15 text-violet-300", glow: "shadow-violet-400/10" },
  copycat: { ring: "border-rose-400/25", badge: "bg-rose-400/15 text-rose-300", glow: "shadow-rose-400/10" },
  beeldmaker: { ring: "border-yellow-300/25", badge: "bg-yellow-300/15 text-yellow-200", glow: "shadow-yellow-300/10" },
}

export default function AgentsPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [logs, setLogs] = useState<AgentLog[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([
      fetch("/api/tasks").then((r) => r.json()).catch(() => []),
      fetch("/api/agent-logs?limit=50").then((r) => r.json()).catch(() => []),
    ]).then(([t, l]) => {
      setTasks(Array.isArray(t) ? t : [])
      setLogs(Array.isArray(l) ? l : [])
    }).finally(() => setLoading(false))
  }, [])

  const statsFor = (id: string) => {
    const memberTasks = tasks.filter((task) => task.assignee?.toLowerCase() === id)
    return {
      open: memberTasks.filter((task) => task.status !== "done").length,
      done: memberTasks.filter((task) => task.status === "done").length,
      logs: logs.filter((log) => log.agent?.toLowerCase() === id).slice(0, 5),
    }
  }

  const selectedMember = selected ? TEAM[selected as keyof typeof TEAM] : null
  const selectedStats = selected ? statsFor(selected) : null
  const totalOpen = tasks.filter((task) => task.status !== "done").length

  return (
    <div className="space-y-6 text-white">
      <section className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(245,145,30,0.18),_transparent_30rem),linear-gradient(135deg,_rgba(24,24,27,0.96),_rgba(7,7,10,1))] p-6 md:p-8">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#F5911E]">Command crew</p>
        <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tight md:text-5xl">Nieuw team, klaar voor uitvoering.</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
              Dit zijn de actieve rollen voor Bart OS. Oude profielen zijn uit de zichtbare cockpit gehaald.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-right sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="text-2xl font-black">{ACTIVE_ASSIGNEES.length}</div>
              <div className="text-xs uppercase text-zinc-500">teamleden</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="text-2xl font-black">{loading ? "…" : totalOpen}</div>
              <div className="text-xs uppercase text-zinc-500">open taken</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="text-2xl font-black text-green-300">Clean</div>
              <div className="text-xs uppercase text-zinc-500">zichtbaar team</div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {ACTIVE_ASSIGNEES.map((id) => {
          const member = TEAM[id]
          const stats = statsFor(id)
          const style = CARD_STYLES[id]
          return (
            <button
              key={id}
              onClick={() => setSelected(id)}
              className={cn("group rounded-[1.5rem] border bg-zinc-900/75 p-5 text-left shadow-2xl transition hover:-translate-y-1", style.ring, style.glow)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="text-3xl">{member.emoji}</div>
                <span className={cn("rounded-full px-2.5 py-1 text-[10px] font-black uppercase", style.badge)}>{member.role}</span>
              </div>
              <h2 className="mt-4 text-2xl font-black">{member.displayName}</h2>
              <p className="mt-2 min-h-[72px] text-sm leading-6 text-zinc-400">{member.description}</p>
              <div className="mt-4 flex gap-4 border-t border-white/10 pt-4">
                <div><div className="text-xl font-black">{stats.open}</div><div className="text-[10px] uppercase text-zinc-500">open</div></div>
                <div><div className="text-xl font-black text-green-300">{stats.done}</div><div className="text-[10px] uppercase text-zinc-500">done</div></div>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {member.specialties.slice(0, 3).map((specialty) => <span key={specialty} className="rounded-full bg-white/[0.06] px-2 py-1 text-[10px] text-zinc-300">{specialty}</span>)}
              </div>
            </button>
          )
        })}
      </section>

      {selectedMember && selectedStats && (
        <section className="rounded-[2rem] border border-white/10 bg-zinc-900/75 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-4xl">{selectedMember.emoji}</div>
              <h2 className="mt-3 text-3xl font-black">{selectedMember.displayName}</h2>
              <p className="mt-1 text-zinc-400">{selectedMember.role}</p>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-300">{selectedMember.description}</p>
            </div>
            <button onClick={() => setSelected(null)} className="rounded-xl border border-white/10 px-3 py-2 text-sm text-zinc-400 hover:text-white">Sluiten</button>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="font-bold">Specialiteiten</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedMember.specialties.map((specialty) => <span key={specialty} className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-zinc-300">{specialty}</span>)}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="font-bold">Recente activiteit</div>
              <div className="mt-3 space-y-2">
                {selectedStats.logs.length === 0 ? <p className="text-sm text-zinc-500">Nog geen recente agentlogs.</p> : selectedStats.logs.map((log) => <p key={log.id} className="text-sm text-zinc-400">{log.action} · {new Date(log.createdAt).toLocaleDateString("nl-BE")}</p>)}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
