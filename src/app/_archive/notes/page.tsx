"use client"

import { useState, useEffect, useCallback } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Hash,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  Clock,
  StickyNote,
  Filter,
  X,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// ─── Types ────────────────────────────────────────────────

interface Note {
  id: string
  title: string
  content: string
  tags: string[]
  agentId?: string | null
  noteType?: string | null
  sentiment?: string | null
  actionNeeded?: boolean
  linkedTaskId?: string | null
  linkedSiteId?: string | null
  linkedProjectId?: string | null
  linkedIdeaId?: string | null
  linkedContentId?: string | null
  linkedSprintId?: string | null
  linkedDomainId?: string | null
  createdAt: string
  updatedAt: string
}

interface SiteRef {
  id: string
  domain: string
}

// ─── Constants ────────────────────────────────────────────

const NOTE_TYPES = [
  { value: "feedback", label: "Feedback", emoji: "\uD83D\uDCAC", cls: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  { value: "analysis", label: "Analysis", emoji: "\uD83D\uDCCA", cls: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  { value: "progress", label: "Progress", emoji: "\u23F3", cls: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30" },
  { value: "blocker", label: "Blocker", emoji: "\uD83D\uDEAB", cls: "bg-red-500/20 text-red-400 border-red-500/30" },
  { value: "lesson-learned", label: "Lesson Learned", emoji: "\uD83C\uDF93", cls: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  { value: "review", label: "Review", emoji: "\uD83D\uDC41", cls: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  { value: "decision", label: "Decision", emoji: "\u2696\uFE0F", cls: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
  { value: "general", label: "General", emoji: "\uD83D\uDCDD", cls: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30" },
] as const

const AGENTS = [
  { value: "bart", label: "Bart", emoji: "\uD83D\uDC68\u200D\uD83D\uDCBB", color: "#F5911E" },
  { value: "atlas", label: "Atlas", emoji: "\uD83D\uDDFA\uFE0F", color: "#3B82F6" },
  { value: "forge", label: "Forge", emoji: "\uD83D\uDD28", color: "#EF4444" },
  { value: "radar", label: "Radar", emoji: "\uD83D\uDCE1", color: "#10B981" },
  { value: "ink", label: "Ink", emoji: "\u2712\uFE0F", color: "#8B5CF6" },
  { value: "ledger", label: "Ledger", emoji: "\uD83D\uDCCA", color: "#F59E0B" },
  { value: "spark", label: "Spark", emoji: "\u26A1", color: "#EC4899" },
] as const

const SENTIMENTS = [
  { value: "positive", label: "Positive", symbol: "\u25B2", cls: "text-emerald-400" },
  { value: "negative", label: "Negative", symbol: "\u25BC", cls: "text-red-400" },
  { value: "neutral", label: "Neutral", symbol: "\u25CF", cls: "text-zinc-400" },
  { value: "mixed", label: "Mixed", symbol: "\u25C6", cls: "text-amber-400" },
] as const

// ─── Helpers ──────────────────────────────────────────────

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60_000)
  if (m < 1) return "just now"
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.floor(h / 24)
  if (d < 7) return `${d}d ago`
  return new Date(iso).toLocaleDateString()
}

function getNoteType(value: string | null | undefined) {
  return NOTE_TYPES.find((t) => t.value === value) || NOTE_TYPES[NOTE_TYPES.length - 1]
}

function getAgent(value: string | null | undefined) {
  return AGENTS.find((a) => a.value === value) || null
}

function getSentiment(value: string | null | undefined) {
  return SENTIMENTS.find((s) => s.value === value) || null
}

// ─── Component ────────────────────────────────────────────

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [sites, setSites] = useState<SiteRef[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  // Filters
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [filterAgent, setFilterAgent] = useState<string>("all")
  const [filterAction, setFilterAction] = useState(false)

  // Dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
    noteType: "general",
    agentId: "",
    sentiment: "",
    actionNeeded: false,
    linkedSiteId: "",
  })

  // ─── Data loading ───────────────────────────────────────

  const loadNotes = useCallback(async () => {
    try {
      const res = await fetch("/api/notes")
      if (res.ok) {
        const data = await res.json()
        setNotes(Array.isArray(data) ? data : [])
      }
    } catch (err) {
      console.error("Failed to load notes:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  const loadSites = useCallback(async () => {
    try {
      const res = await fetch("/api/sites")
      if (res.ok) {
        const data = await res.json()
        setSites(
          (Array.isArray(data) ? data : []).map((s: SiteRef) => ({
            id: s.id,
            domain: s.domain,
          }))
        )
      }
    } catch {
      // Sites are optional for linked entity display
    }
  }, [])

  useEffect(() => {
    loadNotes()
    loadSites()
  }, [loadNotes, loadSites])

  // ─── Filtering ──────────────────────────────────────────

  const filteredNotes = notes.filter((note) => {
    const q = searchTerm.toLowerCase()
    const matchesSearch =
      !q ||
      note.title.toLowerCase().includes(q) ||
      note.content.toLowerCase().includes(q)
    const matchesType = filterType === "all" || note.noteType === filterType
    const matchesAgent = filterAgent === "all" || note.agentId === filterAgent
    const matchesAction = !filterAction || note.actionNeeded === true
    return matchesSearch && matchesType && matchesAgent && matchesAction
  })

  const activeFilterCount =
    (filterType !== "all" ? 1 : 0) +
    (filterAgent !== "all" ? 1 : 0) +
    (filterAction ? 1 : 0)

  // ─── CRUD ───────────────────────────────────────────────

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      tags: "",
      noteType: "general",
      agentId: "",
      sentiment: "",
      actionNeeded: false,
      linkedSiteId: "",
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    const payload = {
      title: formData.title,
      content: formData.content,
      tags: formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      noteType: formData.noteType || "general",
      agentId: formData.agentId || null,
      sentiment: formData.sentiment || null,
      actionNeeded: formData.actionNeeded,
      linkedSiteId: formData.linkedSiteId || null,
    }

    try {
      if (editingNote) {
        await fetch(`/api/notes/${editingNote.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      } else {
        await fetch("/api/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      }
      await loadNotes()
      setIsDialogOpen(false)
      setEditingNote(null)
      resetForm()
    } catch (err) {
      console.error("Failed to save note:", err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (note: Note) => {
    setEditingNote(note)
    setFormData({
      title: note.title,
      content: note.content,
      tags: note.tags?.join(", ") || "",
      noteType: note.noteType || "general",
      agentId: note.agentId || "",
      sentiment: note.sentiment || "",
      actionNeeded: note.actionNeeded || false,
      linkedSiteId: note.linkedSiteId || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (noteId: string) => {
    if (!confirm("Delete this note?")) return
    try {
      await fetch(`/api/notes/${noteId}`, { method: "DELETE" })
      await loadNotes()
      if (expandedId === noteId) setExpandedId(null)
    } catch (err) {
      console.error("Failed to delete note:", err)
    }
  }

  // ─── Resolve linked entities ────────────────────────────

  const resolveSite = (id: string | null | undefined): string | null => {
    if (!id) return null
    const site = sites.find((s) => s.id === id)
    return site ? site.domain : id.slice(0, 8)
  }

  // ─── Render ─────────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-zinc-500 text-sm">Loading notes...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="mx-auto max-w-5xl px-4 py-6 md:px-6">
        {/* ── Header ──────────────────────────────────────── */}
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between cc-animate-in">
          <div>
            <h1 className="text-2xl font-semibold text-white tracking-tight flex items-center gap-2">
              <StickyNote className="h-6 w-6 text-[#F5911E]" />
              Notes
            </h1>
            <p className="text-sm text-zinc-500 mt-0.5">
              {notes.length} notes{" "}
              {activeFilterCount > 0 && (
                <span className="text-zinc-400">
                  &middot; {filteredNotes.length} shown
                </span>
              )}
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="bg-[#F5911E] hover:bg-[#F5911E]/90 text-white"
                onClick={() => {
                  setEditingNote(null)
                  resetForm()
                }}
              >
                <Plus className="mr-1.5 h-4 w-4" />
                New Note
              </Button>
            </DialogTrigger>

            {/* ── Create / Edit Dialog ─────────────────────── */}
            <DialogContent className="max-w-2xl bg-zinc-950 border-white/[0.06]">
              <DialogHeader>
                <DialogTitle className="text-white">
                  {editingNote ? "Edit Note" : "Create Note"}
                </DialogTitle>
                <DialogDescription>
                  {editingNote
                    ? "Update note details"
                    : "Add a new note to the system"}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="text-xs font-medium text-zinc-400 mb-1 block">
                    Title
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Note title"
                    required
                    autoFocus
                    className="bg-white/[0.02] border-white/[0.06]"
                  />
                </div>

                {/* Type + Agent row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-zinc-400 mb-1 block">
                      Type
                    </label>
                    <Select
                      value={formData.noteType}
                      onValueChange={(v) =>
                        setFormData({ ...formData, noteType: v })
                      }
                    >
                      <SelectTrigger className="bg-white/[0.02] border-white/[0.06]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {NOTE_TYPES.map((t) => (
                          <SelectItem key={t.value} value={t.value}>
                            {t.emoji} {t.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-zinc-400 mb-1 block">
                      Agent
                    </label>
                    <Select
                      value={formData.agentId || "none"}
                      onValueChange={(v) =>
                        setFormData({
                          ...formData,
                          agentId: v === "none" ? "" : v,
                        })
                      }
                    >
                      <SelectTrigger className="bg-white/[0.02] border-white/[0.06]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No agent</SelectItem>
                        {AGENTS.map((a) => (
                          <SelectItem key={a.value} value={a.value}>
                            {a.emoji} {a.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Sentiment + Action row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-zinc-400 mb-1 block">
                      Sentiment
                    </label>
                    <Select
                      value={formData.sentiment || "none"}
                      onValueChange={(v) =>
                        setFormData({
                          ...formData,
                          sentiment: v === "none" ? "" : v,
                        })
                      }
                    >
                      <SelectTrigger className="bg-white/[0.02] border-white/[0.06]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No sentiment</SelectItem>
                        {SENTIMENTS.map((s) => (
                          <SelectItem key={s.value} value={s.value}>
                            <span className={s.cls}>{s.symbol}</span> {s.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-end">
                    <label className="flex items-center gap-2 cursor-pointer h-9 px-3 rounded-md border border-white/[0.06] bg-white/[0.02] w-full">
                      <input
                        type="checkbox"
                        checked={formData.actionNeeded}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            actionNeeded: e.target.checked,
                          })
                        }
                        className="rounded border-white/[0.06] accent-[#F5911E]"
                      />
                      <span className="text-sm text-zinc-300">
                        Action needed
                      </span>
                    </label>
                  </div>
                </div>

                {/* Linked site */}
                <div>
                  <label className="text-xs font-medium text-zinc-400 mb-1 block">
                    Linked Site
                  </label>
                  <Select
                    value={formData.linkedSiteId || "none"}
                    onValueChange={(v) =>
                      setFormData({
                        ...formData,
                        linkedSiteId: v === "none" ? "" : v,
                      })
                    }
                  >
                    <SelectTrigger className="bg-white/[0.02] border-white/[0.06]">
                      <SelectValue placeholder="No linked site" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No linked site</SelectItem>
                      {sites.map((s) => (
                        <SelectItem key={s.id} value={s.id}>
                          {s.domain}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Content */}
                <div>
                  <label className="text-xs font-medium text-zinc-400 mb-1 block">
                    Content (Markdown)
                  </label>
                  <Textarea
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    placeholder="Write your note content here... (supports markdown)"
                    className="min-h-[180px] bg-white/[0.02] border-white/[0.06] font-mono text-sm"
                    required
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="text-xs font-medium text-zinc-400 mb-1 block">
                    Tags
                  </label>
                  <Input
                    value={formData.tags}
                    onChange={(e) =>
                      setFormData({ ...formData, tags: e.target.value })
                    }
                    placeholder="seo, content, review (comma-separated)"
                    className="bg-white/[0.02] border-white/[0.06]"
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-[#F5911E] hover:bg-[#F5911E]/90 text-white"
                  >
                    {submitting
                      ? "Saving..."
                      : editingNote
                        ? "Update Note"
                        : "Create Note"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className="border-white/[0.06]"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </header>

        {/* ── Filters ─────────────────────────────────────── */}
        <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center cc-animate-in">
          {/* Search */}
          <div className="relative flex-1 md:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <Input
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-white/[0.02] border-white/[0.06] text-sm"
            />
          </div>

          {/* Type filter */}
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[160px] bg-white/[0.02] border-white/[0.06] text-sm">
              <Filter className="h-3.5 w-3.5 mr-1.5 text-zinc-500" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              {NOTE_TYPES.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.emoji} {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Agent filter */}
          <Select value={filterAgent} onValueChange={setFilterAgent}>
            <SelectTrigger className="w-[150px] bg-white/[0.02] border-white/[0.06] text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All agents</SelectItem>
              {AGENTS.map((a) => (
                <SelectItem key={a.value} value={a.value}>
                  {a.emoji} {a.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Action needed toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFilterAction(!filterAction)}
            className={`border-white/[0.06] text-sm ${
              filterAction
                ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                : "text-zinc-400"
            }`}
          >
            <AlertTriangle className="h-3.5 w-3.5 mr-1.5" />
            Action needed
          </Button>

          {/* Clear filters */}
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setFilterType("all")
                setFilterAgent("all")
                setFilterAction(false)
                setSearchTerm("")
              }}
              className="text-zinc-500 hover:text-zinc-300 text-sm"
            >
              <X className="h-3.5 w-3.5 mr-1" />
              Clear
            </Button>
          )}
        </div>

        {/* ── Notes list ──────────────────────────────────── */}
        <div className="mt-6 space-y-2">
          {filteredNotes.map((note, idx) => {
            const isExpanded = expandedId === note.id
            const type = getNoteType(note.noteType)
            const agent = getAgent(note.agentId)
            const sentiment = getSentiment(note.sentiment)
            const linkedSiteDomain = resolveSite(note.linkedSiteId)

            return (
              <div
                key={note.id}
                className="cc-animate-in rounded-lg border border-white/[0.06] bg-white/[0.02] transition-colors hover:bg-white/[0.03]"
                style={{ animationDelay: `${Math.min(idx * 30, 300)}ms` }}
              >
                {/* ── Row header ───────────────────────────── */}
                <button
                  type="button"
                  onClick={() =>
                    setExpandedId(isExpanded ? null : note.id)
                  }
                  className="w-full flex items-center gap-3 px-4 py-3 text-left"
                >
                  {/* Expand icon */}
                  <span className="text-zinc-500 flex-shrink-0">
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </span>

                  {/* Title */}
                  <span className="flex-1 min-w-0 text-sm font-medium text-white truncate">
                    {note.title}
                  </span>

                  {/* Badges row */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Note type badge */}
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium border ${type.cls}`}
                    >
                      {type.emoji} {type.label}
                    </span>

                    {/* Agent badge */}
                    {agent && (
                      <span
                        className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium border"
                        style={{
                          backgroundColor: `${agent.color}20`,
                          color: agent.color,
                          borderColor: `${agent.color}30`,
                        }}
                      >
                        {agent.emoji} {agent.label}
                      </span>
                    )}

                    {/* Sentiment */}
                    {sentiment && (
                      <span
                        className={`text-sm font-bold ${sentiment.cls}`}
                        title={`Sentiment: ${sentiment.label}`}
                      >
                        {sentiment.symbol}
                      </span>
                    )}

                    {/* Action needed */}
                    {note.actionNeeded && (
                      <span
                        className="text-amber-400"
                        title="Action needed"
                      >
                        <AlertTriangle className="h-3.5 w-3.5" />
                      </span>
                    )}

                    {/* Relative time */}
                    <span className="text-xs text-zinc-500 tabular-nums whitespace-nowrap hidden sm:inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {relativeTime(note.createdAt)}
                    </span>
                  </div>
                </button>

                {/* ── Expanded content ─────────────────────── */}
                {isExpanded && (
                  <div className="border-t border-white/[0.06] px-4 py-4 space-y-4">
                    {/* Linked entities breadcrumbs */}
                    {(linkedSiteDomain ||
                      note.linkedTaskId ||
                      note.linkedProjectId ||
                      note.linkedIdeaId ||
                      note.linkedContentId ||
                      note.linkedSprintId ||
                      note.linkedDomainId) && (
                      <div className="flex flex-wrap gap-2">
                        {linkedSiteDomain && (
                          <span className="inline-flex items-center gap-1 text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-md px-2 py-0.5">
                            Website: {linkedSiteDomain}
                          </span>
                        )}
                        {note.linkedTaskId && (
                          <span className="inline-flex items-center gap-1 text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md px-2 py-0.5">
                            Task: {note.linkedTaskId.slice(0, 8)}
                          </span>
                        )}
                        {note.linkedProjectId && (
                          <span className="inline-flex items-center gap-1 text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-md px-2 py-0.5">
                            Project: {note.linkedProjectId.slice(0, 8)}
                          </span>
                        )}
                        {note.linkedIdeaId && (
                          <span className="inline-flex items-center gap-1 text-xs bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded-md px-2 py-0.5">
                            Idea: {note.linkedIdeaId.slice(0, 8)}
                          </span>
                        )}
                        {note.linkedContentId && (
                          <span className="inline-flex items-center gap-1 text-xs bg-pink-500/10 text-pink-400 border border-pink-500/20 rounded-md px-2 py-0.5">
                            Content: {note.linkedContentId.slice(0, 8)}
                          </span>
                        )}
                        {note.linkedSprintId && (
                          <span className="inline-flex items-center gap-1 text-xs bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-md px-2 py-0.5">
                            Sprint: {note.linkedSprintId.slice(0, 8)}
                          </span>
                        )}
                        {note.linkedDomainId && (
                          <span className="inline-flex items-center gap-1 text-xs bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-md px-2 py-0.5">
                            Domain: {note.linkedDomainId.slice(0, 8)}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Markdown content */}
                    <div className="prose prose-invert prose-sm max-w-none prose-headings:text-white prose-p:text-zinc-300 prose-a:text-[#F5911E] prose-strong:text-white prose-code:text-[#F5911E] prose-code:bg-white/[0.06] prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-pre:bg-white/[0.04] prose-pre:border prose-pre:border-white/[0.06] prose-li:text-zinc-300 prose-th:text-zinc-400 prose-td:text-zinc-300 prose-hr:border-white/[0.06]">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {note.content}
                      </ReactMarkdown>
                    </div>

                    {/* Tags */}
                    {note.tags && note.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {note.tags.map((tag, i) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="text-xs border-white/[0.06] text-zinc-400 cursor-pointer hover:text-zinc-200"
                            onClick={() => setSearchTerm(tag)}
                          >
                            <Hash className="h-2.5 w-2.5 mr-0.5" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Footer: meta + actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
                      <span className="text-xs text-zinc-500">
                        Created{" "}
                        {new Date(note.createdAt).toLocaleDateString()}{" "}
                        {new Date(note.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        {note.updatedAt !== note.createdAt && (
                          <>
                            {" "}&middot; Updated{" "}
                            {relativeTime(note.updatedAt)}
                          </>
                        )}
                      </span>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEdit(note)
                          }}
                          className="text-zinc-400 hover:text-white h-7 px-2"
                        >
                          <Edit className="h-3.5 w-3.5 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(note.id)
                          }}
                          className="text-zinc-400 hover:text-red-400 h-7 px-2"
                        >
                          <Trash2 className="h-3.5 w-3.5 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}

          {/* ── Empty state ──────────────────────────────── */}
          {filteredNotes.length === 0 && (
            <div className="text-center py-16 cc-animate-in">
              <StickyNote className="h-10 w-10 text-zinc-700 mx-auto mb-3" />
              <h3 className="text-sm font-medium text-zinc-400">
                {notes.length === 0 ? "No notes yet" : "No notes match filters"}
              </h3>
              <p className="text-xs text-zinc-600 mt-1">
                {notes.length === 0
                  ? "Create your first note to get started"
                  : "Try adjusting your search or clearing filters"}
              </p>
              {notes.length === 0 && (
                <Button
                  size="sm"
                  className="mt-4 bg-[#F5911E] hover:bg-[#F5911E]/90 text-white"
                  onClick={() => {
                    setEditingNote(null)
                    resetForm()
                    setIsDialogOpen(true)
                  }}
                >
                  <Plus className="mr-1.5 h-4 w-4" />
                  Create First Note
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
