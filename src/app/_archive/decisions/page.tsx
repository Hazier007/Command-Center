"use client"

import { useState, useEffect } from "react"
import { Plus, Search, Gavel, CheckCircle, XCircle, Clock, ArrowRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
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
import { decisionsStorage, type Decision } from "@/lib/storage"

const outcomeConfig: Record<string, { label: string; color: string; icon: typeof CheckCircle }> = {
  approved: { label: "Goedgekeurd", color: "bg-green-500/10 text-green-400 border-green-500/20", icon: CheckCircle },
  rejected: { label: "Afgewezen", color: "bg-red-500/10 text-red-400 border-red-500/20", icon: XCircle },
  deferred: { label: "Uitgesteld", color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20", icon: Clock },
  adjusted: { label: "Aangepast", color: "bg-blue-500/10 text-blue-400 border-blue-500/20", icon: ArrowRight },
}

const categoryLabels: Record<string, string> = {
  "idea-eval": "Idea Evaluatie",
  "project-direction": "Projectrichting",
  resource: "Resource",
  technical: "Technisch",
  financial: "Financieel",
  general: "Algemeen",
}

const resultStatusLabels: Record<string, string> = {
  pending: "In afwachting",
  implemented: "Geïmplementeerd",
  superseded: "Vervangen",
  reversed: "Teruggedraaid",
}

export default function DecisionsPage() {
  const [decisions, setDecisions] = useState<Decision[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [filterOutcome, setFilterOutcome] = useState<string>("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    context: "",
    outcome: "approved",
    rationale: "",
    decidedBy: "bart",
    category: "general",
    tags: "",
  })

  useEffect(() => {
    loadDecisions()
  }, [])

  const loadDecisions = async () => {
    const all = await decisionsStorage.getAll()
    setDecisions(all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
  }

  const filteredDecisions = decisions.filter((d) => {
    const matchesSearch =
      d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.rationale.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.context.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || d.category === filterCategory
    const matchesOutcome = filterOutcome === "all" || d.outcome === filterOutcome
    return matchesSearch && matchesCategory && matchesOutcome
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await decisionsStorage.create({
      title: formData.title,
      context: formData.context,
      outcome: formData.outcome,
      rationale: formData.rationale,
      decidedBy: formData.decidedBy,
      category: formData.category,
      tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
      resultStatus: "pending",
    } as Omit<Decision, "id" | "createdAt" | "updatedAt">)
    await loadDecisions()
    setIsDialogOpen(false)
    setFormData({ title: "", context: "", outcome: "approved", rationale: "", decidedBy: "bart", category: "general", tags: "" })
  }

  const handleDelete = async (id: string) => {
    if (confirm("Weet je zeker dat je deze beslissing wilt verwijderen?")) {
      await decisionsStorage.delete(id)
      await loadDecisions()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Decision Log</h1>
          <p className="text-muted-foreground">Alle beslissingen met context en rationale</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Nieuwe Beslissing</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Nieuwe Beslissing Vastleggen</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Titel (bijv. 'CollectPro: build MVP')"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <Textarea
                placeholder="Context — wat lag er op tafel?"
                value={formData.context}
                onChange={(e) => setFormData({ ...formData, context: e.target.value })}
                rows={3}
                required
              />
              <div className="grid grid-cols-3 gap-4">
                <Select value={formData.outcome} onValueChange={(v) => setFormData({ ...formData, outcome: v })}>
                  <SelectTrigger><SelectValue placeholder="Uitkomst" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approved">Goedgekeurd</SelectItem>
                    <SelectItem value="rejected">Afgewezen</SelectItem>
                    <SelectItem value="deferred">Uitgesteld</SelectItem>
                    <SelectItem value="adjusted">Aangepast</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                  <SelectTrigger><SelectValue placeholder="Categorie" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="idea-eval">Idea Evaluatie</SelectItem>
                    <SelectItem value="project-direction">Projectrichting</SelectItem>
                    <SelectItem value="resource">Resource</SelectItem>
                    <SelectItem value="technical">Technisch</SelectItem>
                    <SelectItem value="financial">Financieel</SelectItem>
                    <SelectItem value="general">Algemeen</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={formData.decidedBy} onValueChange={(v) => setFormData({ ...formData, decidedBy: v })}>
                  <SelectTrigger><SelectValue placeholder="Beslist door" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bart">Bart</SelectItem>
                    <SelectItem value="atlas">ATLAS</SelectItem>
                    <SelectItem value="forge">FORGE</SelectItem>
                    <SelectItem value="radar">RADAR</SelectItem>
                    <SelectItem value="ink">INK</SelectItem>
                    <SelectItem value="ledger">LEDGER</SelectItem>
                    <SelectItem value="spark">SPARK</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Textarea
                placeholder="Rationale — WAAROM is dit beslist? Dit is het belangrijkste veld."
                value={formData.rationale}
                onChange={(e) => setFormData({ ...formData, rationale: e.target.value })}
                rows={4}
                required
              />
              <Input
                placeholder="Tags (komma-gescheiden, bijv. collectpro, mvp, saas)"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
              <Button type="submit" className="w-full">Beslissing Vastleggen</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Zoek in beslissingen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle categorieën</SelectItem>
            <SelectItem value="idea-eval">Idea Evaluatie</SelectItem>
            <SelectItem value="project-direction">Projectrichting</SelectItem>
            <SelectItem value="resource">Resource</SelectItem>
            <SelectItem value="technical">Technisch</SelectItem>
            <SelectItem value="financial">Financieel</SelectItem>
            <SelectItem value="general">Algemeen</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterOutcome} onValueChange={setFilterOutcome}>
          <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle uitkomsten</SelectItem>
            <SelectItem value="approved">Goedgekeurd</SelectItem>
            <SelectItem value="rejected">Afgewezen</SelectItem>
            <SelectItem value="deferred">Uitgesteld</SelectItem>
            <SelectItem value="adjusted">Aangepast</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {(["approved", "rejected", "deferred", "adjusted"] as const).map((outcome) => {
          const config = outcomeConfig[outcome]
          const count = decisions.filter((d) => d.outcome === outcome).length
          return (
            <Card key={outcome} className="cursor-pointer hover:border-[#F5911E]/30" onClick={() => setFilterOutcome(outcome === filterOutcome ? "all" : outcome)}>
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{config.label}</span>
                  <span className="text-2xl font-bold">{count}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Decision Cards */}
      <div className="space-y-4">
        {filteredDecisions.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              <Gavel className="mx-auto h-12 w-12 mb-4 opacity-20" />
              <p>Nog geen beslissingen vastgelegd.</p>
            </CardContent>
          </Card>
        ) : (
          filteredDecisions.map((d) => {
            const config = outcomeConfig[d.outcome] || outcomeConfig.approved
            const Icon = config.icon
            return (
              <Card key={d.id} className="hover:border-[#F5911E]/20 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        <CardTitle className="text-lg">{d.title}</CardTitle>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Door {d.decidedBy}</span>
                        <span>&middot;</span>
                        <span>{new Date(d.createdAt).toLocaleDateString("nl-BE")}</span>
                        {d.resultStatus && (
                          <>
                            <span>&middot;</span>
                            <span>{resultStatusLabels[d.resultStatus] || d.resultStatus}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={config.color}>{config.label}</Badge>
                      <Badge variant="outline">{categoryLabels[d.category] || d.category}</Badge>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(d.id)}>
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Context</p>
                    <p className="text-sm">{d.context}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Rationale</p>
                    <p className="text-sm">{d.rationale}</p>
                  </div>
                  {d.tags && d.tags.length > 0 && (
                    <div className="flex gap-1">
                      {d.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
