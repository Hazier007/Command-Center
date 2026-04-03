"use client"

import { useState, useEffect } from "react"
import {
  Brain,
  Plus,
  Zap,
  ChevronDown,
  ChevronRight,
  Filter,
  Sparkles,
  Archive,
  Lightbulb,
  Search,
  Target,
  Rocket,
  Eye,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { ideasStorage, type Idea } from "@/lib/storage"

type IdeaStatus = "raw" | "evaluating" | "promising" | "active" | "archived"

const COLUMNS: { key: IdeaStatus; label: string; icon: React.ReactNode; color: string }[] = [
  { key: "raw", label: "Raw", icon: <Lightbulb className="h-4 w-4" />, color: "text-zinc-400" },
  { key: "evaluating", label: "Evaluating", icon: <Search className="h-4 w-4" />, color: "text-blue-400" },
  { key: "promising", label: "Promising", icon: <Target className="h-4 w-4" />, color: "text-yellow-400" },
  { key: "active", label: "Active", icon: <Rocket className="h-4 w-4" />, color: "text-emerald-400" },
  { key: "archived", label: "Archived", icon: <Archive className="h-4 w-4" />, color: "text-zinc-500" },
]

const priorityConfig: Record<string, { label: string; cls: string }> = {
  high: { label: "Hoog", cls: "bg-red-500/20 text-red-400 border-red-500/30" },
  medium: { label: "Medium", cls: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  low: { label: "Laag", cls: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30" },
}

const priorityCardBorder: Record<string, string> = {
  high: "border-l-red-500",
  medium: "border-l-yellow-500",
  low: "border-l-zinc-500",
}

const categoryBadge: Record<string, string> = {
  directory: "bg-blue-500/20 text-blue-400",
  leadgen: "bg-orange-500/20 text-orange-400",
  tool: "bg-purple-500/20 text-purple-400",
  client: "bg-green-500/20 text-green-400",
  business: "bg-cyan-500/20 text-cyan-400",
  feature: "bg-pink-500/20 text-pink-400",
}

function IdeaCard({
  idea,
  onStatusChange,
  onExpand,
  expanded,
}: {
  idea: Idea
  onStatusChange: (id: string, status: IdeaStatus) => void
  onExpand: (id: string) => void
  expanded: boolean
}) {
  const currentIdx = COLUMNS.findIndex((c) => c.key === idea.status)

  return (
    <div
      className={`rounded-lg border border-l-4 ${priorityCardBorder[idea.priority] || "border-l-zinc-500"} border-white/10 bg-white/5 hover:bg-white/[0.07] transition-colors cursor-pointer p-3 space-y-2`}
      onClick={() => onExpand(idea.id)}
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-semibold leading-tight">{idea.title}</h4>
        {expanded ? (
          <ChevronDown className="h-3.5 w-3.5 text-zinc-500 flex-shrink-0 mt-0.5" />
        ) : (
          <ChevronRight className="h-3.5 w-3.5 text-zinc-500 flex-shrink-0 mt-0.5" />
        )}
      </div>

      {!expanded && (
        <p className="text-xs text-zinc-400 line-clamp-2">{idea.description}</p>
      )}

      <div className="flex flex-wrap gap-1">
        <Badge variant="outline" className={`text-[10px] ${priorityConfig[idea.priority]?.cls || ""}`}>
          {priorityConfig[idea.priority]?.label || idea.priority}
        </Badge>
        {idea.businessUnit && (
          <Badge variant="outline" className="text-[10px] bg-cyan-500/10 text-cyan-400 border-cyan-500/30">
            {idea.businessUnit}
          </Badge>
        )}
        <Badge variant="outline" className={`text-[10px] ${categoryBadge[idea.category] || ""}`}>
          {idea.category}
        </Badge>
      </div>

      {(idea.revenueEstimate || idea.assignedTo) && (
        <div className="flex items-center gap-2 text-[11px] text-zinc-500">
          {idea.revenueEstimate && (
            <span className="text-emerald-400 font-mono">
              &euro;{idea.revenueEstimate.toLocaleString()}/mnd
            </span>
          )}
          {idea.assignedTo && (
            <Badge variant="outline" className="text-[10px]">
              {idea.assignedTo}
            </Badge>
          )}
        </div>
      )}

      {expanded && (
        <div className="space-y-3 border-t border-white/10 pt-3 mt-2">
          <p className="text-xs text-zinc-300 whitespace-pre-wrap">{idea.description}</p>

          {/* Move buttons */}
          <div className="flex gap-1 flex-wrap">
            {COLUMNS.filter((_, i) => i !== currentIdx).map((col) => (
              <Button
                key={col.key}
                variant="outline"
                size="sm"
                className="h-6 text-[10px] px-2"
                onClick={(e) => {
                  e.stopPropagation()
                  onStatusChange(idea.id, col.key)
                }}
              >
                {col.icon}
                <span className="ml-1">{col.label}</span>
              </Button>
            ))}
          </div>

          {idea.status === "raw" && (
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs border-[#F5911E]/30 text-[#F5911E] hover:bg-[#F5911E]/10"
              onClick={(e) => {
                e.stopPropagation()
                onStatusChange(idea.id, "evaluating")
              }}
            >
              <Sparkles className="h-3 w-3 mr-1" />
              Evaluate met SPARK
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

export default function OraclePage() {
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [filterBU, setFilterBU] = useState<string>("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "business" as Idea["category"],
    priority: "medium" as Idea["priority"],
    businessUnit: "",
    revenueEstimate: "",
    assignedTo: "",
  })

  useEffect(() => {
    loadIdeas()
  }, [])

  const loadIdeas = async () => {
    try {
      setLoading(true)
      const data = await ideasStorage.getAll()
      setIdeas(data)
    } catch (error) {
      console.error("Failed to load ideas:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (id: string, status: IdeaStatus) => {
    try {
      await ideasStorage.update(id, { status } as Partial<Idea>)
      setIdeas((prev) =>
        prev.map((idea) => (idea.id === id ? { ...idea, status } : idea))
      )
    } catch (error) {
      console.error("Failed to update idea status:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setSubmitting(true)
      await ideasStorage.create({
        title: form.title,
        description: form.description,
        category: form.category,
        priority: form.priority,
        status: "raw",
        businessUnit: form.businessUnit || undefined,
        revenueEstimate: form.revenueEstimate ? parseFloat(form.revenueEstimate) : undefined,
        assignedTo: form.assignedTo || undefined,
      } as Omit<Idea, "id" | "createdAt" | "updatedAt">)
      await loadIdeas()
      setIsDialogOpen(false)
      setForm({
        title: "",
        description: "",
        category: "business",
        priority: "medium",
        businessUnit: "",
        revenueEstimate: "",
        assignedTo: "",
      })
    } catch (error) {
      console.error("Failed to create idea:", error)
    } finally {
      setSubmitting(false)
    }
  }

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  // Business units for filter
  const allBUs = [...new Set(ideas.filter((i) => i.businessUnit).map((i) => i.businessUnit!))]

  // Filter ideas
  const filtered = filterBU === "all" ? ideas : ideas.filter((i) => i.businessUnit === filterBU)

  // Group by status
  const byStatus = COLUMNS.reduce((acc, col) => {
    acc[col.key] = filtered.filter((i) => (i.status || "raw") === col.key)
    return acc
  }, {} as Record<IdeaStatus, Idea[]>)

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-muted-foreground">Oracle laden...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Brain className="h-8 w-8 text-[#F5911E]" />
            <h1 className="text-3xl font-bold">The Oracle</h1>
          </div>
          <p className="text-zinc-400">Kanban voor idee&euml;n — van raw tot actief</p>
        </div>

        <div className="flex gap-2 items-center">
          {/* BU Filter */}
          {allBUs.length > 0 && (
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-zinc-500" />
              <select
                value={filterBU}
                onChange={(e) => setFilterBU(e.target.value)}
                className="h-9 rounded-md border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-300"
              >
                <option value="all">Alle units</option>
                {allBUs.map((bu) => (
                  <option key={bu} value={bu}>
                    {bu}
                  </option>
                ))}
              </select>
            </div>
          )}

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#F5911E] hover:bg-[#e07d0a] text-white">
                <Plus className="mr-2 h-4 w-4" />
                Nieuw idee
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nieuw Idee</DialogTitle>
                <DialogDescription>Voeg een nieuw idee toe aan de Oracle pipeline</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Titel</label>
                  <Input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Naam van het idee"
                    required
                    autoFocus
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Beschrijving</label>
                  <Textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Wat is het idee? Waarom is het waardevol?"
                    className="min-h-[80px]"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Categorie</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value as Idea["category"] })}
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                    >
                      <option value="directory">Directory</option>
                      <option value="leadgen">Lead Generation</option>
                      <option value="tool">Tool / SaaS</option>
                      <option value="client">Client</option>
                      <option value="business">Business</option>
                      <option value="feature">Feature</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Prioriteit</label>
                    <select
                      value={form.priority}
                      onChange={(e) => setForm({ ...form, priority: e.target.value as Idea["priority"] })}
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                    >
                      <option value="high">Hoog</option>
                      <option value="medium">Medium</option>
                      <option value="low">Laag</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Business Unit (optioneel)</label>
                    <Input
                      value={form.businessUnit}
                      onChange={(e) => setForm({ ...form, businessUnit: e.target.value })}
                      placeholder="bv. Hazier, Domains, SaaS"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Revenue schatting (EUR/mnd)</label>
                    <Input
                      type="number"
                      value={form.revenueEstimate}
                      onChange={(e) => setForm({ ...form, revenueEstimate: e.target.value })}
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Toegewezen aan (optioneel)</label>
                  <select
                    value={form.assignedTo}
                    onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                  >
                    <option value="">Geen</option>
                    <option value="bart">Bart</option>
                    <option value="atlas">Atlas</option>
                    <option value="forge">Forge</option>
                    <option value="radar">Radar</option>
                    <option value="ink">Ink</option>
                    <option value="ledger">Ledger</option>
                    <option value="spark">SPARK</option>
                    <option value="cowork">Co-Work</option>
                  </select>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1 bg-[#F5911E] hover:bg-[#e07d0a] text-white" disabled={submitting}>
                    {submitting ? "Opslaan..." : "Toevoegen"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuleren
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-5">
        {COLUMNS.map((col) => (
          <Card key={col.key} className="border-white/10 bg-white/5">
            <CardContent className="pt-5 pb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className={col.color}>{col.icon}</span>
                <span className="text-xs font-medium text-zinc-400">{col.label}</span>
              </div>
              <div className="text-2xl font-bold">{byStatus[col.key]?.length || 0}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {COLUMNS.map((col) => (
          <div key={col.key} className="space-y-3">
            {/* Column header */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className={col.color}>{col.icon}</span>
                <h3 className="text-sm font-semibold">{col.label}</h3>
              </div>
              <Badge variant="outline" className="text-xs">
                {byStatus[col.key]?.length || 0}
              </Badge>
            </div>

            {/* Column body */}
            <div className="space-y-2 min-h-[200px] rounded-lg border border-white/5 bg-white/[0.02] p-2">
              {(byStatus[col.key] || []).length === 0 ? (
                <div className="flex items-center justify-center h-24 text-xs text-zinc-600">
                  Geen idee&euml;n
                </div>
              ) : (
                (byStatus[col.key] || []).map((idea) => (
                  <IdeaCard
                    key={idea.id}
                    idea={idea}
                    onStatusChange={handleStatusChange}
                    onExpand={toggleExpand}
                    expanded={expandedId === idea.id}
                  />
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
