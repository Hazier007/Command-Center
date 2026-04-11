"use client"

import { useEffect, useState } from "react"
import { useBusinessContext } from "@/components/nerve"
import { cn } from "@/lib/utils"

// ─── Types ─────────────────────────────────────────────────────
interface Task {
  id: string; title: string; description?: string; status: string
  assignee?: string; priority?: string; category?: string
  source?: string; dueDate?: string; needsApproval?: boolean
  siteId?: string; linkedDomainId?: string; createdAt?: string; updatedAt?: string
  site?: { id: string; domain: string }
  subtasks?: string
}
interface SiteLite { id: string; domain: string }
interface DomainLite { id: string; domain: string }
interface ContentItem {
  id: string; title: string; status: string; type?: string
  author?: string; targetSite?: string; wordCount?: number
  body?: string; feedback?: string; linkedKeyword?: string
  needsApproval?: boolean; createdAt?: string
  linkedTaskId?: string | null
  task?: { id: string; title: string; status: string } | null
}
interface Lead {
  id: string; name: string; company?: string; email?: string
  status: string; estimatedValue?: number; service?: string
  source?: string; nextFollowUp?: string; notes?: string
  createdAt?: string
}
interface Research {
  id: string; title: string; type?: string; author?: string
  status?: string; summary?: string; body?: string
  tags?: string; createdAt?: string
  linkedSiteId?: string | null
  linkedDomainId?: string | null
}

// ─── Config ───────────────────────────────────────────────────
const TASK_COLUMNS = [
  { key: "todo", label: "To Do", icon: "○", color: "text-zinc-400" },
  { key: "in-progress", label: "In Progress", icon: "◉", color: "text-blue-400" },
  { key: "review", label: "Review", icon: "⏳", color: "text-yellow-400" },
  { key: "on-hold", label: "On-hold", icon: "⏸", color: "text-orange-400" },
  { key: "done", label: "Done", icon: "✓", color: "text-green-400" },
]

const CONTENT_STATUSES = [
  { key: "draft", label: "Draft", color: "text-zinc-400" },
  { key: "review", label: "Review", color: "text-yellow-400" },
  { key: "approved", label: "Approved", color: "text-green-400" },
  { key: "publish_requested", label: "Bij FORGE", color: "text-[#F5911E]" },
  { key: "published", label: "Published", color: "text-cyan-400" },
]

const LEAD_STATUSES = [
  { key: "nieuw", label: "Nieuw", color: "text-blue-400" },
  { key: "contact", label: "Contact", color: "text-yellow-400" },
  { key: "offerte", label: "Offerte", color: "text-purple-400" },
  { key: "klant", label: "Klant", color: "text-green-400" },
  { key: "verloren", label: "Verloren", color: "text-red-400" },
]

const agentColors: Record<string, string> = {
  radar: "bg-blue-500/15 text-blue-400", forge: "bg-green-500/15 text-green-400",
  ink: "bg-purple-500/15 text-purple-400", spark: "bg-[#F5911E]/15 text-[#F5911E]",
  ledger: "bg-yellow-500/15 text-yellow-400", atlas: "bg-blue-500/15 text-blue-300",
  bart: "bg-[#F5911E]/15 text-[#F5911E]", cowork: "bg-cyan-500/15 text-cyan-400",
}

const categoryColors: Record<string, string> = {
  seo: "bg-blue-500/15 text-blue-400", dev: "bg-green-500/15 text-green-400",
  content: "bg-purple-500/15 text-purple-400", research: "bg-cyan-500/15 text-cyan-400",
  general: "bg-zinc-600/30 text-zinc-400",
}

const priorityConfig: Record<string, { dot: string; label: string }> = {
  high: { dot: "bg-red-400", label: "Hoog" },
  medium: { dot: "bg-yellow-400", label: "Medium" },
  low: { dot: "bg-zinc-500", label: "Laag" },
}

// ─── Detail Modal ─────────────────────────────────────────────
function TaskDetailModal({ task, onClose, onUpdate }: { task: Task; onClose: () => void; onUpdate: () => void }) {
  const pr = priorityConfig[task.priority || "medium"] || priorityConfig.medium
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-lg rounded-2xl border border-white/[0.08] bg-zinc-900 p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-[16px] font-bold text-white leading-tight">{task.title}</h2>
            {task.site && (
              <p className="text-[11px] text-zinc-500 mt-1">🌐 {task.site.domain}</p>
            )}
          </div>
          <button onClick={onClose} className="ml-3 rounded-lg p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors">✕</button>
        </div>

        {/* Badges row */}
        <div className="flex flex-wrap gap-2 mb-4">
          {task.assignee && (
            <span className={cn("rounded px-2 py-1 text-[9px] font-bold uppercase", agentColors[task.assignee.toLowerCase()] || "bg-zinc-700 text-zinc-400")}>
              👤 {task.assignee}
            </span>
          )}
          {task.category && (
            <span className={cn("rounded px-2 py-1 text-[9px] font-bold uppercase", categoryColors[task.category] || categoryColors.general)}>
              {task.category}
            </span>
          )}
          <span className="flex items-center gap-1.5 rounded px-2 py-1 text-[9px] font-bold uppercase bg-zinc-700/50 text-zinc-300">
            <span className={cn("h-1.5 w-1.5 rounded-full", pr.dot)} /> {pr.label}
          </span>
          <span className={cn(
            "rounded px-2 py-1 text-[9px] font-bold uppercase",
            task.status === "done" ? "bg-green-500/15 text-green-400" :
            task.status === "review" ? "bg-yellow-500/15 text-yellow-400" :
            task.status === "in-progress" ? "bg-blue-500/15 text-blue-400" :
            "bg-zinc-700/50 text-zinc-400"
          )}>
            {task.status}
          </span>
          {task.needsApproval && (
            <span className="rounded px-2 py-1 text-[9px] font-bold uppercase bg-[#F5911E]/15 text-[#F5911E]">
              ⚠ Approval nodig
            </span>
          )}
        </div>

        {/* Description */}
        {task.description && (
          <div className="mb-4">
            <p className="text-[10px] font-bold uppercase text-zinc-500 mb-1.5">Beschrijving</p>
            <div className="rounded-lg border border-white/[0.06] bg-zinc-800/40 p-3">
              <p className="text-[12px] text-zinc-300 leading-relaxed whitespace-pre-wrap">{task.description}</p>
            </div>
          </div>
        )}

        {/* Meta grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {task.source && (
            <div className="rounded-lg border border-white/[0.06] bg-zinc-800/30 p-2.5">
              <p className="text-[9px] uppercase text-zinc-500">Bron</p>
              <p className="text-[11px] font-semibold text-white mt-0.5">{task.source}</p>
            </div>
          )}
          {task.dueDate && (
            <div className="rounded-lg border border-white/[0.06] bg-zinc-800/30 p-2.5">
              <p className="text-[9px] uppercase text-zinc-500">Deadline</p>
              <p className="text-[11px] font-semibold text-white mt-0.5">{new Date(task.dueDate).toLocaleDateString("nl-BE")}</p>
            </div>
          )}
          {task.createdAt && (
            <div className="rounded-lg border border-white/[0.06] bg-zinc-800/30 p-2.5">
              <p className="text-[9px] uppercase text-zinc-500">Aangemaakt</p>
              <p className="text-[11px] font-semibold text-white mt-0.5">{new Date(task.createdAt).toLocaleDateString("nl-BE")}</p>
            </div>
          )}
          {task.updatedAt && (
            <div className="rounded-lg border border-white/[0.06] bg-zinc-800/30 p-2.5">
              <p className="text-[9px] uppercase text-zinc-500">Laatst bijgewerkt</p>
              <p className="text-[11px] font-semibold text-white mt-0.5">{new Date(task.updatedAt).toLocaleDateString("nl-BE")}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 pt-3 border-t border-white/[0.06]">
          {task.status === "review" && (
            <>
              <button
                onClick={async () => {
                  await fetch(`/api/tasks/${task.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "done" }) })
                  onClose(); onUpdate()
                }}
                className="rounded-lg bg-green-500/15 px-4 py-2 text-[11px] font-bold text-green-400 hover:bg-green-500/25 transition-colors"
              >
                ✓ Goedkeuren
              </button>
              <button
                onClick={async () => {
                  await fetch(`/api/tasks/${task.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "todo" }) })
                  onClose(); onUpdate()
                }}
                className="rounded-lg bg-red-500/15 px-4 py-2 text-[11px] font-bold text-red-400 hover:bg-red-500/25 transition-colors"
              >
                ✕ Afwijzen
              </button>
            </>
          )}
          {task.status === "todo" && (
            <button
              onClick={async () => {
                await fetch(`/api/tasks/${task.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "in-progress" }) })
                onClose(); onUpdate()
              }}
              className="rounded-lg bg-blue-500/15 px-4 py-2 text-[11px] font-bold text-blue-400 hover:bg-blue-500/25 transition-colors"
            >
              ▶ Start
            </button>
          )}
          {task.status === "in-progress" && (
            <button
              onClick={async () => {
                await fetch(`/api/tasks/${task.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "review" }) })
                onClose(); onUpdate()
              }}
              className="rounded-lg bg-yellow-500/15 px-4 py-2 text-[11px] font-bold text-yellow-400 hover:bg-yellow-500/25 transition-colors"
            >
              ⏳ Naar Review
            </button>
          )}
          {/* On-hold */}
          {task.status !== "on-hold" && task.status !== "done" && (
            <button
              onClick={async () => {
                await fetch(`/api/tasks/${task.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "on-hold" }) })
                onClose(); onUpdate()
              }}
              className="rounded-lg bg-orange-500/15 px-4 py-2 text-[11px] font-bold text-orange-400 hover:bg-orange-500/25 transition-colors"
            >
              ⏸ On-hold
            </button>
          )}
          {task.status === "on-hold" && (
            <button
              onClick={async () => {
                await fetch(`/api/tasks/${task.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "todo" }) })
                onClose(); onUpdate()
              }}
              className="rounded-lg bg-blue-500/15 px-4 py-2 text-[11px] font-bold text-blue-400 hover:bg-blue-500/25 transition-colors"
            >
              ▶ Heractiveren
            </button>
          )}
          {/* Delete */}
          <button
            onClick={async () => {
              if (!confirm("Taak definitief verwijderen?")) return
              await fetch(`/api/tasks/${task.id}`, { method: "DELETE" })
              onClose(); onUpdate()
            }}
            className="rounded-lg bg-red-500/10 px-4 py-2 text-[11px] font-bold text-red-400/70 hover:bg-red-500/25 hover:text-red-400 transition-colors"
          >
            🗑 Verwijderen
          </button>
          <button onClick={onClose} className="ml-auto rounded-lg bg-zinc-800 px-4 py-2 text-[11px] font-bold text-zinc-400 hover:text-white transition-colors">
            Sluiten
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Content Detail Modal ─────────────────────────────────────
function ContentDetailModal({ item, onClose, onUpdate }: { item: ContentItem; onClose: () => void; onUpdate: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-lg max-h-[80vh] overflow-y-auto rounded-2xl border border-white/[0.08] bg-zinc-900 p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-[16px] font-bold text-white leading-tight">{item.title}</h2>
            {item.targetSite && <p className="text-[11px] text-zinc-500 mt-1">🌐 {item.targetSite}</p>}
          </div>
          <button onClick={onClose} className="ml-3 rounded-lg p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors">✕</button>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {item.type && <span className="rounded px-2 py-1 text-[9px] font-bold uppercase bg-purple-500/15 text-purple-400">{item.type}</span>}
          {item.author && <span className={cn("rounded px-2 py-1 text-[9px] font-bold uppercase", agentColors[item.author.toLowerCase()] || "bg-zinc-700 text-zinc-400")}>{item.author}</span>}
          <span className={cn("rounded px-2 py-1 text-[9px] font-bold uppercase",
            item.status === "published" ? "bg-cyan-500/15 text-cyan-400" :
            item.status === "publish_requested" ? "bg-[#F5911E]/15 text-[#F5911E]" :
            item.status === "approved" ? "bg-green-500/15 text-green-400" :
            item.status === "review" ? "bg-yellow-500/15 text-yellow-400" :
            "bg-zinc-700/50 text-zinc-400"
          )}>{item.status === "publish_requested" ? "Bij FORGE" : item.status}</span>
          {item.wordCount && <span className="rounded px-2 py-1 text-[9px] font-bold uppercase bg-zinc-700/50 text-zinc-400">{item.wordCount} woorden</span>}
        </div>
        {item.linkedKeyword && (
          <p className="text-[11px] text-zinc-400 mb-3">🔑 Keyword: <span className="text-white font-semibold">{item.linkedKeyword}</span></p>
        )}
        {item.body && (
          <div className="mb-4">
            <p className="text-[10px] font-bold uppercase text-zinc-500 mb-1.5">Content</p>
            <div className="rounded-lg border border-white/[0.06] bg-zinc-800/40 p-3 max-h-60 overflow-y-auto">
              <p className="text-[12px] text-zinc-300 leading-relaxed whitespace-pre-wrap">{item.body.slice(0, 2000)}{item.body.length > 2000 ? "..." : ""}</p>
            </div>
          </div>
        )}
        {item.feedback && (
          <div className="mb-4">
            <p className="text-[10px] font-bold uppercase text-zinc-500 mb-1.5">Feedback</p>
            <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-3">
              <p className="text-[12px] text-yellow-200 leading-relaxed whitespace-pre-wrap">{item.feedback}</p>
            </div>
          </div>
        )}
        <div className="flex flex-wrap gap-2 pt-3 border-t border-white/[0.06]">
          {item.status === "review" && (
            <>
              <button onClick={async () => { await fetch(`/api/content/${item.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "approved" }) }); onClose(); onUpdate() }} className="rounded-lg bg-green-500/15 px-4 py-2 text-[11px] font-bold text-green-400 hover:bg-green-500/25 transition-colors">✓ Goedkeuren</button>
              <button onClick={async () => { await fetch(`/api/content/${item.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "draft" }) }); onClose(); onUpdate() }} className="rounded-lg bg-red-500/15 px-4 py-2 text-[11px] font-bold text-red-400 hover:bg-red-500/25 transition-colors">✕ Afwijzen</button>
            </>
          )}
          {item.status === "approved" && (
            <button
              onClick={async () => {
                if (!confirm(`Publicatie-taak voor "${item.title}" aanmaken voor FORGE?\n\nDe content gaat naar "Bij FORGE" tot FORGE de taak op done zet — dan wordt ze automatisch gepubliceerd.`)) return
                // Step 1: create the FORGE publish task
                const descLines = [
                  `Publicatie van content-item "${item.title}"`,
                  "",
                  item.targetSite ? `Site: ${item.targetSite}` : null,
                  item.linkedKeyword ? `Keyword: ${item.linkedKeyword}` : null,
                  item.wordCount ? `Woordenaantal: ${item.wordCount}` : null,
                  "",
                  "⚠ Zodra deze taak op 'done' staat, wordt de gelinkte content automatisch gepubliceerd.",
                ].filter(Boolean).join("\n")
                const taskRes = await fetch(`/api/tasks`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    title: `🚀 Publiceren: ${item.title}`,
                    description: descLines,
                    status: "todo",
                    priority: "medium",
                    category: "content",
                    assignee: "forge",
                    source: "bart",
                  }),
                })
                if (!taskRes.ok) {
                  alert("Taak aanmaken mislukt — content niet doorgezet.")
                  return
                }
                const task = await taskRes.json()
                // Step 2: link content to task + move to publish_requested
                await fetch(`/api/content/${item.id}`, {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    status: "publish_requested",
                    linkedTaskId: task.id,
                  }),
                })
                onClose(); onUpdate()
              }}
              className="rounded-lg bg-[#F5911E]/15 px-4 py-2 text-[11px] font-bold text-[#F5911E] hover:bg-[#F5911E]/25 transition-colors"
            >
              🚀 Stuur naar FORGE voor publicatie
            </button>
          )}
          {item.status === "publish_requested" && (
            <>
              <span className="rounded-lg bg-[#F5911E]/10 border border-[#F5911E]/20 px-3 py-2 text-[10px] text-[#F5911E]">
                ⏳ In wachtrij bij FORGE (task #{item.task?.id?.slice(0, 6) || "—"})
              </span>
              <button
                onClick={async () => {
                  if (!confirm("Content uit de FORGE-wachtrij halen en terugzetten naar approved?")) return
                  await fetch(`/api/content/${item.id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status: "approved", linkedTaskId: null }),
                  })
                  onClose(); onUpdate()
                }}
                className="rounded-lg bg-zinc-700/50 px-4 py-2 text-[11px] font-bold text-zinc-400 hover:bg-zinc-700 transition-colors"
              >
                ↩ Intrekken
              </button>
            </>
          )}
          {item.status === "published" && (
            <button
              onClick={async () => {
                await fetch(`/api/content/${item.id}`, {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ status: "approved" }),
                })
                onClose(); onUpdate()
              }}
              className="rounded-lg bg-zinc-700/50 px-4 py-2 text-[11px] font-bold text-zinc-400 hover:bg-zinc-700 transition-colors"
            >
              ↩ Terugzetten naar approved
            </button>
          )}
          <button
            onClick={async () => {
              if (!confirm("Content definitief verwijderen?")) return
              await fetch(`/api/content/${item.id}`, { method: "DELETE" })
              onClose(); onUpdate()
            }}
            className="rounded-lg bg-red-500/10 px-4 py-2 text-[11px] font-bold text-red-400/70 hover:bg-red-500/25 hover:text-red-400 transition-colors"
          >
            🗑 Verwijderen
          </button>
          <button onClick={onClose} className="ml-auto rounded-lg bg-zinc-800 px-4 py-2 text-[11px] font-bold text-zinc-400 hover:text-white transition-colors">Sluiten</button>
        </div>
      </div>
    </div>
  )
}

// ─── Research Detail Modal ────────────────────────────────────
function ResearchDetailModal({
  item,
  sites,
  domains,
  onClose,
  onUpdate,
}: {
  item: Research
  sites: SiteLite[]
  domains: DomainLite[]
  onClose: () => void
  onUpdate: () => void
}) {
  const [linkedSiteId, setLinkedSiteId] = useState<string>(item.linkedSiteId || "")
  const [linkedDomainId, setLinkedDomainId] = useState<string>(item.linkedDomainId || "")
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [taskTitle, setTaskTitle] = useState("")
  const [taskAssignee, setTaskAssignee] = useState("bart")
  const [saving, setSaving] = useState(false)

  async function saveLinks() {
    setSaving(true)
    try {
      await fetch(`/api/research/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          linkedSiteId: linkedSiteId || null,
          linkedDomainId: linkedDomainId || null,
        }),
      })
      onClose()
      onUpdate()
    } finally {
      setSaving(false)
    }
  }

  async function createTaskFromResearch() {
    if (!taskTitle.trim()) return
    setSaving(true)
    try {
      await fetch(`/api/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: taskTitle.trim(),
          description: item.summary ? `Uit research: ${item.title}\n\n${item.summary}` : `Uit research: ${item.title}`,
          status: "todo",
          priority: "medium",
          category: "research",
          assignee: taskAssignee,
          siteId: linkedSiteId || undefined,
          linkedDomainId: linkedDomainId || undefined,
        }),
      })
      setShowTaskForm(false)
      setTaskTitle("")
      onClose()
      onUpdate()
    } finally {
      setSaving(false)
    }
  }

  async function deleteResearch() {
    if (!confirm(`Research "${item.title}" definitief verwijderen?`)) return
    setSaving(true)
    try {
      await fetch(`/api/research/${item.id}`, { method: "DELETE" })
      onClose()
      onUpdate()
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-white/[0.08] bg-zinc-900 p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-[16px] font-bold text-white leading-tight">{item.title}</h2>
            {item.createdAt && <p className="text-[10px] text-zinc-500 mt-1">{new Date(item.createdAt).toLocaleDateString("nl-BE", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>}
          </div>
          <button onClick={onClose} className="ml-3 rounded-lg p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors">✕</button>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {item.type && <span className="rounded px-2 py-1 text-[9px] font-bold uppercase bg-cyan-500/15 text-cyan-400">{item.type}</span>}
          {item.author && <span className={cn("rounded px-2 py-1 text-[9px] font-bold uppercase", agentColors[item.author.toLowerCase()] || "bg-zinc-700 text-zinc-400")}>{item.author}</span>}
          {item.status && <span className={cn("rounded px-2 py-1 text-[9px] font-bold uppercase",
            item.status === "final" ? "bg-green-500/15 text-green-400" :
            item.status === "review" ? "bg-yellow-500/15 text-yellow-400" :
            "bg-zinc-700/50 text-zinc-400"
          )}>{item.status}</span>}
        </div>

        {/* Summary */}
        {item.summary && (
          <div className="mb-4">
            <p className="text-[10px] font-bold uppercase text-zinc-500 mb-1.5">Samenvatting</p>
            <div className="rounded-lg border border-cyan-500/10 bg-cyan-500/5 p-3">
              <p className="text-[12px] text-cyan-100 leading-relaxed">{item.summary}</p>
            </div>
          </div>
        )}

        {/* Body */}
        {item.body && (
          <div className="mb-4">
            <p className="text-[10px] font-bold uppercase text-zinc-500 mb-1.5">Volledig rapport</p>
            <div className="rounded-lg border border-white/[0.06] bg-zinc-800/40 p-4 max-h-[400px] overflow-y-auto">
              <div className="text-[12px] text-zinc-300 leading-relaxed whitespace-pre-wrap">{item.body}</div>
            </div>
          </div>
        )}

        {/* Tags */}
        {item.tags && (
          <div className="mb-4">
            <p className="text-[10px] font-bold uppercase text-zinc-500 mb-1.5">Tags</p>
            <div className="flex flex-wrap gap-1.5">
              {item.tags.split(",").map((tag, i) => (
                <span key={i} className="rounded-full px-2.5 py-0.5 text-[10px] bg-zinc-800 text-zinc-400 border border-white/[0.06]">{tag.trim()}</span>
              ))}
            </div>
          </div>
        )}

        {/* Koppeling + acties */}
        <div className="mb-4 rounded-lg border border-white/[0.06] bg-zinc-800/40 p-3 space-y-2.5">
          <p className="text-[10px] font-bold uppercase text-zinc-500">Koppelingen</p>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[9px] uppercase text-zinc-500 block mb-1">Site</label>
              <select
                value={linkedSiteId}
                onChange={(e) => setLinkedSiteId(e.target.value)}
                className="w-full h-8 rounded-md border border-white/10 bg-zinc-900 px-2 text-[11px] text-white"
              >
                <option value="">— geen —</option>
                {sites.map((s) => (
                  <option key={s.id} value={s.id}>{s.domain}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[9px] uppercase text-zinc-500 block mb-1">Domein (opportunity)</label>
              <select
                value={linkedDomainId}
                onChange={(e) => setLinkedDomainId(e.target.value)}
                className="w-full h-8 rounded-md border border-white/10 bg-zinc-900 px-2 text-[11px] text-white"
              >
                <option value="">— geen —</option>
                {domains.map((d) => (
                  <option key={d.id} value={d.id}>{d.domain}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={saveLinks}
            disabled={saving}
            className="w-full rounded-md bg-[#F5911E]/15 px-3 py-1.5 text-[10px] font-bold text-[#F5911E] hover:bg-[#F5911E]/25 transition-colors disabled:opacity-50"
          >
            {saving ? "Opslaan..." : "💾 Koppeling opslaan"}
          </button>
        </div>

        {showTaskForm && (
          <div className="mb-4 rounded-lg border border-[#F5911E]/20 bg-[#F5911E]/5 p-3 space-y-2.5">
            <p className="text-[10px] font-bold uppercase text-[#F5911E]">Nieuwe taak op basis van research</p>
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="Taak titel"
              className="w-full h-8 rounded-md border border-white/10 bg-zinc-900 px-2 text-[11px] text-white"
              autoFocus
            />
            <div className="flex items-center gap-2">
              <select
                value={taskAssignee}
                onChange={(e) => setTaskAssignee(e.target.value)}
                className="h-8 rounded-md border border-white/10 bg-zinc-900 px-2 text-[11px] text-white"
              >
                <option value="bart">Bart</option>
                <option value="radar">RADAR</option>
                <option value="forge">FORGE</option>
                <option value="ink">INK</option>
                <option value="atlas">ATLAS</option>
                <option value="ledger">LEDGER</option>
                <option value="spark">SPARK</option>
              </select>
              <button
                onClick={createTaskFromResearch}
                disabled={saving || !taskTitle.trim()}
                className="rounded-md bg-[#F5911E] px-3 py-1.5 text-[10px] font-bold text-white hover:bg-[#F5911E]/90 disabled:opacity-50"
              >
                ➕ Aanmaken
              </button>
              <button
                onClick={() => setShowTaskForm(false)}
                className="rounded-md bg-zinc-800 px-3 py-1.5 text-[10px] font-bold text-zinc-400"
              >
                Annuleren
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2 pt-3 border-t border-white/[0.06]">
          {!showTaskForm && (
            <button
              onClick={() => setShowTaskForm(true)}
              className="rounded-lg bg-[#F5911E]/15 px-4 py-2 text-[11px] font-bold text-[#F5911E] hover:bg-[#F5911E]/25 transition-colors"
            >
              ➕ Taak aanmaken
            </button>
          )}
          <button
            onClick={deleteResearch}
            disabled={saving}
            className="rounded-lg bg-red-500/10 px-4 py-2 text-[11px] font-bold text-red-400/70 hover:bg-red-500/25 hover:text-red-400 transition-colors disabled:opacity-50"
          >
            🗑 Verwijderen
          </button>
          <button onClick={onClose} className="ml-auto rounded-lg bg-zinc-800 px-4 py-2 text-[11px] font-bold text-zinc-400 hover:text-white transition-colors">Sluiten</button>
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────
export default function WerkPage() {
  const { activeBusiness } = useBusinessContext()
  const [tasks, setTasks] = useState<Task[]>([])
  const [content, setContent] = useState<ContentItem[]>([])
  const [leads, setLeads] = useState<Lead[]>([])
  const [research, setResearch] = useState<Research[]>([])
  const [sites, setSites] = useState<SiteLite[]>([])
  const [domains, setDomains] = useState<DomainLite[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState("taken")
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null)
  const [selectedResearch, setSelectedResearch] = useState<Research | null>(null)

  // Filters
  // scopeFilter format: "" | "site:<id>" | "domain:<id>"
  const [scopeFilter, setScopeFilter] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    Promise.all([
      fetch("/api/tasks").then((r) => r.json()).catch(() => []),
      fetch("/api/content").then((r) => r.json()).catch(() => []),
      fetch("/api/leads").then((r) => r.json()).catch(() => []),
      fetch("/api/research").then((r) => r.json()).catch(() => []),
      fetch("/api/sites").then((r) => r.json()).catch(() => []),
      fetch("/api/domain-opportunities").then((r) => r.json()).catch(() => []),
    ])
      .then(([t, c, l, r, s, d]) => {
        setTasks(Array.isArray(t) ? t : [])
        setContent(Array.isArray(c) ? c : [])
        setLeads(Array.isArray(l) ? l : [])
        // Research may be paginated
        setResearch(Array.isArray(r) ? r : Array.isArray(r?.data) ? r.data : [])
        setSites(Array.isArray(s) ? s.map((x: { id: string; domain: string }) => ({ id: x.id, domain: x.domain })) : [])
        setDomains(Array.isArray(d) ? d.map((x: { id: string; domain: string }) => ({ id: x.id, domain: x.domain })) : [])
      })
      .finally(() => setLoading(false))
  }, [])

  // Refresh data without full page reload
  function refreshData() {
    Promise.all([
      fetch("/api/tasks").then((r) => r.json()).catch(() => []),
      fetch("/api/content").then((r) => r.json()).catch(() => []),
      fetch("/api/leads").then((r) => r.json()).catch(() => []),
      fetch("/api/research").then((r) => r.json()).catch(() => []),
    ]).then(([t, c, l, r]) => {
      setTasks(Array.isArray(t) ? t : [])
      setContent(Array.isArray(c) ? c : [])
      setLeads(Array.isArray(l) ? l : [])
      setResearch(Array.isArray(r) ? r : Array.isArray(r?.data) ? r.data : [])
    })
  }

  // Scope filter helpers
  const filterKind = scopeFilter.startsWith("site:")
    ? "site"
    : scopeFilter.startsWith("domain:")
      ? "domain"
      : null
  const filterId = scopeFilter.includes(":") ? scopeFilter.split(":")[1] : ""

  function matchesScope(t: { siteId?: string | null; linkedDomainId?: string | null }) {
    if (!filterKind) return true
    if (filterKind === "site") return t.siteId === filterId
    if (filterKind === "domain") return t.linkedDomainId === filterId
    return true
  }

  function matchesSearch(title: string) {
    if (!searchQuery.trim()) return true
    return title.toLowerCase().includes(searchQuery.trim().toLowerCase())
  }

  const filteredTasks = tasks.filter(
    (t) => matchesScope({ siteId: t.siteId, linkedDomainId: t.linkedDomainId }) && matchesSearch(t.title)
  )
  const filteredResearch = research.filter(
    (r) =>
      matchesScope({ siteId: r.linkedSiteId ?? undefined, linkedDomainId: r.linkedDomainId ?? undefined }) &&
      matchesSearch(r.title)
  )

  const tasksByStatus = (status: string) => filteredTasks.filter((t) => t.status === status)
  const contentByStatus = (status: string) => content.filter((c) => c.status === status)
  const leadsByStatus = (status: string) => leads.filter((l) => l.status === status)

  const tabs = [
    { id: "taken", label: "📋 Taken", count: filteredTasks.filter((t) => t.status !== "done").length },
    { id: "content", label: "✒️ Content", count: content.filter((c) => c.status !== "published").length },
    { id: "pipeline", label: "🏢 Pipeline", count: leads.length },
    { id: "research", label: "🔬 Research", count: filteredResearch.length },
  ]

  const scopeActive = Boolean(filterKind)

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <h1 className="text-[26px] font-extrabold tracking-tight text-white">📋 Werk</h1>
        <p className="text-[13px] text-zinc-500">
          Taken, content pipeline, leads &amp; research
          {activeBusiness.id !== "all" && <span className="ml-2 text-[#F5911E]">· {activeBusiness.name}</span>}
        </p>
      </div>

      {/* Tabs + filter bar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-0.5 rounded-lg border border-white/[0.06] bg-zinc-800/30 p-1 w-fit">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "rounded-md px-4 py-1.5 text-[11px] font-medium transition-colors flex items-center gap-2",
                tab === t.id ? "bg-zinc-700 text-white" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              {t.label}
              {t.count > 0 && (
                <span className={cn("rounded-full px-1.5 py-0.5 text-[8px] font-bold", tab === t.id ? "bg-zinc-600 text-zinc-200" : "bg-zinc-700/50 text-zinc-500")}>
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {(tab === "taken" || tab === "research") && (
          <div className="flex flex-1 flex-wrap items-center gap-2 min-w-[300px]">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase tracking-wider text-zinc-500">Scope</span>
              <select
                value={scopeFilter}
                onChange={(e) => setScopeFilter(e.target.value)}
                className="h-8 rounded-md border border-white/10 bg-zinc-800/50 px-2 text-[11px] text-white min-w-[180px]"
              >
                <option value="">Alles</option>
                {sites.length > 0 && <option disabled>── Sites ──</option>}
                {sites.map((s) => (
                  <option key={`s-${s.id}`} value={`site:${s.id}`}>
                    🌐 {s.domain}
                  </option>
                ))}
                {domains.length > 0 && <option disabled>── Domeinen ──</option>}
                {domains.map((d) => (
                  <option key={`d-${d.id}`} value={`domain:${d.id}`}>
                    📦 {d.domain}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Zoek op titel..."
              className="h-8 rounded-md border border-white/10 bg-zinc-800/50 px-2.5 text-[11px] text-white min-w-[180px]"
            />
            {(scopeActive || searchQuery) && (
              <button
                onClick={() => {
                  setScopeFilter("")
                  setSearchQuery("")
                }}
                className="h-8 rounded-md bg-zinc-800 px-2.5 text-[10px] font-bold text-zinc-400 hover:text-white"
              >
                ✕ Reset
              </button>
            )}
            {tab === "research" && (
              <span className="ml-auto text-[10px] text-zinc-500">
                {filteredResearch.length} van {research.length} getoond
              </span>
            )}
            {tab === "taken" && (
              <span className="ml-auto text-[10px] text-zinc-500">
                {filteredTasks.length} van {tasks.length} getoond
              </span>
            )}
          </div>
        )}
      </div>

      {/* ───── TAKEN TAB: Kanban ───── */}
      {tab === "taken" && (
        <div className="grid grid-cols-5 gap-3">
          {TASK_COLUMNS.map((col) => {
            const allColTasks = tasksByStatus(col.key)
            const totalCount = allColTasks.length
            const colTasks = allColTasks.slice(0, 20)
            const hasMore = totalCount > 20
            return (
              <div key={col.key} className="rounded-xl border border-white/[0.06] bg-zinc-800/20 p-3 flex flex-col max-h-[70vh]">
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/[0.06] shrink-0">
                  <span className={cn("flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide", col.color)}>
                    {col.icon} {col.label}
                  </span>
                  <span className="rounded-full bg-zinc-700/50 px-2 py-0.5 text-[9px] text-zinc-400">{totalCount}</span>
                </div>
                <div className="space-y-2 overflow-y-auto flex-1 scrollbar-thin">
                  {colTasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => setSelectedTask(task)}
                      className={cn(
                        "rounded-lg border border-white/[0.04] bg-zinc-800/40 p-3 cursor-pointer transition-all hover:border-[#F5911E]/20 hover:-translate-y-0.5",
                        col.key === "review" && "border-yellow-500/20"
                      )}
                    >
                      <p className="text-[11px] font-medium text-white leading-snug mb-2">{task.title}</p>
                      {task.site && <p className="text-[9px] text-zinc-500 mb-1.5">🌐 {task.site.domain}</p>}
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          {task.assignee && (
                            <span className={cn("rounded px-1.5 py-0.5 text-[8px] font-bold uppercase", agentColors[task.assignee?.toLowerCase()] || "bg-zinc-700 text-zinc-400")}>
                              {task.assignee}
                            </span>
                          )}
                          {task.category && (
                            <span className={cn("rounded px-1.5 py-0.5 text-[8px] font-bold uppercase", categoryColors[task.category] || categoryColors.general)}>
                              {task.category}
                            </span>
                          )}
                        </div>
                        {task.priority && <span className={cn("h-1.5 w-1.5 rounded-full", priorityConfig[task.priority]?.dot || "bg-zinc-500")} />}
                      </div>
                    </div>
                  ))}
                  {hasMore && <p className="text-center text-[10px] text-zinc-500 py-2">+ {totalCount - 20} meer</p>}
                  {totalCount === 0 && <p className="text-center text-[11px] text-zinc-600 py-4">{loading ? "Laden..." : "Geen taken"}</p>}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ───── CONTENT TAB ───── */}
      {tab === "content" && (
        <div className="grid grid-cols-5 gap-3">
          {CONTENT_STATUSES.map((st) => {
            const items = contentByStatus(st.key)
            return (
              <div key={st.key} className="rounded-xl border border-white/[0.06] bg-zinc-800/20 p-3">
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/[0.06]">
                  <span className={cn("text-[11px] font-semibold uppercase tracking-wide", st.color)}>{st.label}</span>
                  <span className="rounded-full bg-zinc-700/50 px-2 py-0.5 text-[9px] text-zinc-400">{items.length}</span>
                </div>
                <div className="space-y-2">
                  {items.slice(0, 10).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedContent(item)}
                      className={cn(
                        "rounded-lg border border-white/[0.04] bg-zinc-800/40 p-3 cursor-pointer transition-all hover:border-purple-500/20 hover:-translate-y-0.5",
                        st.key === "review" && "border-yellow-500/20",
                        st.key === "publish_requested" && "border-[#F5911E]/20"
                      )}
                    >
                      <p className="text-[11px] font-medium text-white leading-snug mb-1.5">{item.title}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          {item.type && <span className="rounded px-1.5 py-0.5 text-[8px] font-bold uppercase bg-purple-500/15 text-purple-400">{item.type}</span>}
                          {item.author && <span className={cn("rounded px-1.5 py-0.5 text-[8px] font-bold uppercase", agentColors[item.author.toLowerCase()] || "bg-zinc-700 text-zinc-400")}>{item.author}</span>}
                        </div>
                        {item.wordCount && <span className="text-[8px] text-zinc-500">{item.wordCount}w</span>}
                      </div>
                      {item.targetSite && <p className="text-[9px] text-zinc-500 mt-1">🌐 {item.targetSite}</p>}
                      {st.key === "publish_requested" && item.task && (
                        <p className="text-[9px] text-[#F5911E]/80 mt-1 truncate">
                          ⏳ FORGE: {item.task.status}
                        </p>
                      )}
                    </div>
                  ))}
                  {items.length === 0 && <p className="text-center text-[11px] text-zinc-600 py-4">Geen content</p>}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ───── PIPELINE TAB ───── */}
      {tab === "pipeline" && (
        <div className="space-y-4">
          {/* Pipeline stats */}
          <div className="grid grid-cols-5 gap-3">
            {LEAD_STATUSES.map((st) => {
              const count = leadsByStatus(st.key).length
              const value = leadsByStatus(st.key).reduce((s, l) => s + (l.estimatedValue || 0), 0)
              return (
                <div key={st.key} className="rounded-xl border border-white/[0.06] bg-zinc-800/30 p-3 text-center">
                  <p className={cn("text-[10px] font-bold uppercase", st.color)}>{st.label}</p>
                  <p className="text-[20px] font-extrabold text-white tabular-nums">{count}</p>
                  {value > 0 && <p className="text-[10px] text-zinc-500 tabular-nums">€{value.toLocaleString("nl-BE")}</p>}
                </div>
              )
            })}
          </div>
          {/* Leads list */}
          <div className="rounded-xl border border-white/[0.06] bg-zinc-800/20 overflow-hidden">
            <div className="grid grid-cols-[1fr_100px_80px_100px_90px] gap-3 px-4 py-2.5 border-b border-white/[0.06] text-[9px] font-bold uppercase tracking-wider text-zinc-500">
              <span>Lead</span><span>Service</span><span>Status</span><span>Waarde</span><span>Follow-up</span>
            </div>
            <div className="divide-y divide-white/[0.04]">
              {leads.length > 0 ? leads.map((lead) => {
                const st = LEAD_STATUSES.find((s) => s.key === lead.status) || LEAD_STATUSES[0]
                return (
                  <div key={lead.id} className="grid grid-cols-[1fr_100px_80px_100px_90px] gap-3 px-4 py-3 items-center hover:bg-zinc-800/40 transition-colors">
                    <div className="min-w-0">
                      <p className="text-[12px] font-semibold text-white truncate">{lead.name}</p>
                      {lead.company && <p className="text-[10px] text-zinc-500 truncate">{lead.company}</p>}
                    </div>
                    <span className="text-[10px] text-zinc-400">{lead.service || "—"}</span>
                    <span className={cn("text-[10px] font-bold", st.color)}>{st.label}</span>
                    <span className="text-[11px] font-bold text-white tabular-nums">{lead.estimatedValue ? `€${lead.estimatedValue.toLocaleString("nl-BE")}` : "—"}</span>
                    <span className="text-[10px] text-zinc-500">{lead.nextFollowUp ? new Date(lead.nextFollowUp).toLocaleDateString("nl-BE") : "—"}</span>
                  </div>
                )
              }) : (
                <p className="text-center text-[11px] text-zinc-600 py-8">{loading ? "Laden..." : "Geen leads gevonden"}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ───── RESEARCH TAB ───── */}
      {tab === "research" && (
        <div className="grid grid-cols-3 gap-3">
          {filteredResearch.length > 0 ? filteredResearch.map((r) => {
            const site = r.linkedSiteId ? sites.find((s) => s.id === r.linkedSiteId) : null
            const domain = r.linkedDomainId ? domains.find((d) => d.id === r.linkedDomainId) : null
            return (
              <div key={r.id} onClick={() => setSelectedResearch(r)} className="rounded-xl border border-white/[0.06] bg-zinc-800/30 p-4 transition-all hover:border-cyan-500/20 hover:-translate-y-0.5 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <span className="rounded px-2 py-0.5 text-[8px] font-bold uppercase bg-cyan-500/15 text-cyan-400">{r.type || "research"}</span>
                  {r.author && <span className={cn("rounded px-1.5 py-0.5 text-[8px] font-bold uppercase", agentColors[r.author.toLowerCase()] || "bg-zinc-700 text-zinc-400")}>{r.author}</span>}
                </div>
                <h4 className="text-[12px] font-bold text-white mb-1 leading-snug">{r.title}</h4>
                {r.summary && <p className="text-[10px] text-zinc-500 leading-relaxed line-clamp-3">{r.summary}</p>}
                {(site || domain) && (
                  <p className="text-[9px] text-cyan-400/80 mt-2 truncate">
                    {site && `🌐 ${site.domain}`}
                    {domain && `📦 ${domain.domain}`}
                  </p>
                )}
                {r.tags && <p className="text-[9px] text-zinc-600 mt-1">{r.tags}</p>}
                <p className="text-[9px] text-zinc-600 mt-2">{r.createdAt ? new Date(r.createdAt).toLocaleDateString("nl-BE") : ""}</p>
              </div>
            )
          }) : (
            <p className="col-span-3 text-center text-[11px] text-zinc-600 py-8">
              {loading ? "Laden..." : scopeActive || searchQuery ? "Geen research matcht filter" : "Geen research gevonden"}
            </p>
          )}
        </div>
      )}

      {/* Modals */}
      {selectedTask && <TaskDetailModal task={selectedTask} onClose={() => setSelectedTask(null)} onUpdate={refreshData} />}
      {selectedContent && (
        <ContentDetailModal
          item={selectedContent}
          onClose={() => setSelectedContent(null)}
          onUpdate={refreshData}
        />
      )}
      {selectedResearch && (
        <ResearchDetailModal
          item={selectedResearch}
          sites={sites}
          domains={domains}
          onClose={() => setSelectedResearch(null)}
          onUpdate={refreshData}
        />
      )}
    </div>
  )
}
