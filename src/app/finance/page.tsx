"use client"

import { useState, useEffect } from "react"
import {
  TrendingUp,
  DollarSign,
  Target,
  PiggyBank,
  Plus,
  Edit,
  Trash2,
  Briefcase,
  BarChart3,
  Receipt,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table"
import {
  projectsStorage,
  costsStorage,
  revenueStorage,
  type Project,
  type Cost,
  type RevenueEntry,
} from "@/lib/storage"

const GOAL_AMOUNT = 10000

const contractBadge: Record<string, string> = {
  retainer: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  eenmalig: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  mixed: "bg-purple-500/20 text-purple-400 border-purple-500/30",
}

const statusBadge: Record<string, { label: string; cls: string }> = {
  active: { label: "Actief", cls: "bg-green-500/20 text-green-400 border-green-500/30" },
  planned: { label: "Gepland", cls: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  paused: { label: "Gepauzeerd", cls: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
}

const sourceColors: Record<string, string> = {
  adsense: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  affiliate: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  domain: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  leadgen: "bg-orange-500/20 text-orange-400 border-orange-500/30",
}

const categoryColors: Record<string, string> = {
  AI: "bg-purple-500/20 text-purple-400",
  Hosting: "bg-blue-500/20 text-blue-400",
  Database: "bg-green-500/20 text-green-400",
  Domains: "bg-orange-500/20 text-orange-400",
  Infrastructure: "bg-gray-500/20 text-gray-400",
  Tools: "bg-cyan-500/20 text-cyan-400",
  Other: "bg-zinc-500/20 text-zinc-400",
}

function currentMonth() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
}

export default function FinancePage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [costs, setCosts] = useState<Cost[]>([])
  const [revenue, setRevenue] = useState<RevenueEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [revenueDialogOpen, setRevenueDialogOpen] = useState(false)
  const [costDialogOpen, setCostDialogOpen] = useState(false)
  const [editingCost, setEditingCost] = useState<Cost | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const [revenueForm, setRevenueForm] = useState({
    source: "adsense",
    description: "",
    amount: "",
    month: currentMonth(),
    siteDomain: "",
    recurring: false,
  })

  const [costForm, setCostForm] = useState({
    name: "",
    amount: "",
    category: "Tools",
    recurring: true,
    billingDay: "",
    notes: "",
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [p, c, r] = await Promise.all([
        projectsStorage.getAll(),
        costsStorage.getAll(),
        revenueStorage.getAll(),
      ])
      setProjects(p)
      setCosts(c)
      setRevenue(r)
    } catch (error) {
      console.error("Failed to load finance data:", error)
    } finally {
      setLoading(false)
    }
  }

  // --- Revenue form ---
  const handleRevenueSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setSubmitting(true)
      await revenueStorage.create({
        source: revenueForm.source,
        description: revenueForm.description,
        amount: parseFloat(revenueForm.amount),
        month: revenueForm.month,
        siteDomain: revenueForm.siteDomain || undefined,
        recurring: revenueForm.recurring,
      })
      await loadData()
      setRevenueDialogOpen(false)
      setRevenueForm({ source: "adsense", description: "", amount: "", month: currentMonth(), siteDomain: "", recurring: false })
    } catch (error) {
      console.error("Failed to save revenue:", error)
    } finally {
      setSubmitting(false)
    }
  }

  // --- Cost form ---
  const handleCostSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setSubmitting(true)
      const payload = {
        name: costForm.name,
        amount: parseFloat(costForm.amount),
        category: costForm.category,
        recurring: costForm.recurring,
        billingDay: costForm.billingDay ? parseInt(costForm.billingDay) : undefined,
        notes: costForm.notes || undefined,
      }
      if (editingCost) {
        await costsStorage.update(editingCost.id, payload)
      } else {
        await costsStorage.create(payload)
      }
      await loadData()
      setCostDialogOpen(false)
      setEditingCost(null)
      setCostForm({ name: "", amount: "", category: "Tools", recurring: true, billingDay: "", notes: "" })
    } catch (error) {
      console.error("Failed to save cost:", error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleEditCost = (cost: Cost) => {
    setEditingCost(cost)
    setCostForm({
      name: cost.name,
      amount: cost.amount.toString(),
      category: cost.category,
      recurring: cost.recurring,
      billingDay: cost.billingDay?.toString() || "",
      notes: cost.notes || "",
    })
    setCostDialogOpen(true)
  }

  const handleDeleteCost = async (id: string) => {
    if (confirm("Weet je zeker dat je deze kost wilt verwijderen?")) {
      await costsStorage.delete(id)
      await loadData()
    }
  }

  const handleDeleteRevenue = async (id: string) => {
    if (confirm("Weet je zeker dat je deze revenue entry wilt verwijderen?")) {
      await revenueStorage.delete(id)
      await loadData()
    }
  }

  // --- Calculations ---
  const clientProjects = projects.filter((p) => p.ownerType === "client" || p.category === "client")
  const agencyMRR = clientProjects.reduce((sum, p) => sum + (p.monthlyFee || 0), 0)

  const month = currentMonth()
  const currentRevenue = revenue.filter((r) => r.month === month)
  const ownRevenue = currentRevenue.reduce((sum, r) => sum + r.amount, 0)

  const totalMRR = agencyMRR + ownRevenue
  const gap = Math.max(0, GOAL_AMOUNT - totalMRR)
  const goalProgress = (totalMRR / GOAL_AMOUNT) * 100

  const totalCosts = costs.reduce((sum, c) => sum + c.amount, 0)
  const netResult = totalMRR - totalCosts

  // Group revenue by source
  const revenueBySource = currentRevenue.reduce((acc, r) => {
    if (!acc[r.source]) acc[r.source] = []
    acc[r.source].push(r)
    return acc
  }, {} as Record<string, RevenueEntry[]>)

  // Group costs by category
  const costsByCategory = costs.reduce((acc, cost) => {
    if (!acc[cost.category]) acc[cost.category] = []
    acc[cost.category].push(cost)
    return acc
  }, {} as Record<string, Cost[]>)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-background to-background dark:from-orange-950/25 dark:via-background dark:to-background">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-muted-foreground">Finance laden...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-background to-background dark:from-orange-950/25 dark:via-background dark:to-background">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <BarChart3 className="h-7 w-7 text-[#F5911E]" />
              Finance Cockpit
            </h1>
            <p className="text-muted-foreground mt-1">
              Compleet overzicht: agency + eigen projecten + kosten.
            </p>
          </div>
          <div className="flex gap-2">
            <Dialog open={revenueDialogOpen} onOpenChange={setRevenueDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#F5911E] hover:bg-[#e07d0a] text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Revenue toevoegen
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Nieuwe Revenue Entry</DialogTitle>
                  <DialogDescription>Voeg een nieuwe inkomstenbron toe</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleRevenueSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Bron</label>
                    <select
                      value={revenueForm.source}
                      onChange={(e) => setRevenueForm({ ...revenueForm, source: e.target.value })}
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                    >
                      <option value="adsense">AdSense</option>
                      <option value="affiliate">Affiliate</option>
                      <option value="domain">Domain Sales</option>
                      <option value="leadgen">Lead Generation</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Beschrijving</label>
                    <Input
                      value={revenueForm.description}
                      onChange={(e) => setRevenueForm({ ...revenueForm, description: e.target.value })}
                      placeholder="Beschrijving van de inkomst"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Bedrag (EUR)</label>
                      <Input
                        type="number"
                        value={revenueForm.amount}
                        onChange={(e) => setRevenueForm({ ...revenueForm, amount: e.target.value })}
                        placeholder="0"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Maand</label>
                      <Input
                        type="month"
                        value={revenueForm.month}
                        onChange={(e) => setRevenueForm({ ...revenueForm, month: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Site domein (optioneel)</label>
                    <Input
                      value={revenueForm.siteDomain}
                      onChange={(e) => setRevenueForm({ ...revenueForm, siteDomain: e.target.value })}
                      placeholder="example.com"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="rev-recurring"
                      checked={revenueForm.recurring}
                      onChange={(e) => setRevenueForm({ ...revenueForm, recurring: e.target.checked })}
                      className="rounded border border-input"
                    />
                    <label htmlFor="rev-recurring" className="text-sm font-medium">
                      Terugkerend
                    </label>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="flex-1 bg-[#F5911E] hover:bg-[#e07d0a] text-white" disabled={submitting}>
                      {submitting ? "Opslaan..." : "Toevoegen"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setRevenueDialogOpen(false)}>
                      Annuleren
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog open={costDialogOpen} onOpenChange={setCostDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingCost(null)
                    setCostForm({ name: "", amount: "", category: "Tools", recurring: true, billingDay: "", notes: "" })
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Kost toevoegen
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingCost ? "Kost bewerken" : "Nieuwe kost"}</DialogTitle>
                  <DialogDescription>
                    {editingCost ? "Pas de kosten aan" : "Voeg een nieuwe kost toe"}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCostSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Naam</label>
                    <Input
                      value={costForm.name}
                      onChange={(e) => setCostForm({ ...costForm, name: e.target.value })}
                      placeholder="Naam van de kost"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium">Bedrag (EUR)</label>
                      <Input
                        type="number"
                        value={costForm.amount}
                        onChange={(e) => setCostForm({ ...costForm, amount: e.target.value })}
                        placeholder="0"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Categorie</label>
                      <select
                        value={costForm.category}
                        onChange={(e) => setCostForm({ ...costForm, category: e.target.value })}
                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                      >
                        <option value="AI">AI</option>
                        <option value="Hosting">Hosting</option>
                        <option value="Database">Database</option>
                        <option value="Domains">Domains</option>
                        <option value="Infrastructure">Infrastructure</option>
                        <option value="Tools">Tools</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Factuurdatum</label>
                      <Input
                        type="number"
                        value={costForm.billingDay}
                        onChange={(e) => setCostForm({ ...costForm, billingDay: e.target.value })}
                        placeholder="Dag"
                        min="1"
                        max="31"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="cost-recurring"
                      checked={costForm.recurring}
                      onChange={(e) => setCostForm({ ...costForm, recurring: e.target.checked })}
                      className="rounded border border-input"
                    />
                    <label htmlFor="cost-recurring" className="text-sm font-medium">
                      Maandelijks terugkerend
                    </label>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Notities (optioneel)</label>
                    <Textarea
                      value={costForm.notes}
                      onChange={(e) => setCostForm({ ...costForm, notes: e.target.value })}
                      placeholder="Extra info..."
                      className="min-h-[60px]"
                    />
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="flex-1 bg-[#F5911E] hover:bg-[#e07d0a] text-white" disabled={submitting}>
                      {submitting ? "Opslaan..." : editingCost ? "Bijwerken" : "Toevoegen"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setCostDialogOpen(false)}>
                      Annuleren
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Agency MRR</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-blue-500" />
                <span className="text-2xl font-bold text-blue-500">
                  &euro;{agencyMRR.toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Eigen Projecten</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-500" />
                <span className="text-2xl font-bold text-emerald-500">
                  &euro;{ownRevenue.toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Totaal MRR</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-[#F5911E]" />
                <span className="text-2xl font-bold text-[#F5911E]">
                  &euro;{totalMRR.toLocaleString()}
                </span>
              </div>
              <Progress value={Math.min(goalProgress, 100)} className="h-1.5 mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Gap naar &euro;10K</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-red-400" />
                <span className="text-2xl font-bold text-red-400">
                  &euro;{gap.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{Math.round(goalProgress)}% bereikt</p>
            </CardContent>
          </Card>
        </div>

        {/* Agency Revenue */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-500" />
              Agency Revenue
            </CardTitle>
            <CardDescription>Klantprojecten met maandelijkse fee</CardDescription>
          </CardHeader>
          <CardContent>
            {clientProjects.length === 0 ? (
              <div className="text-center py-8">
                <Briefcase className="h-12 w-12 mx-auto text-muted-foreground/30" />
                <p className="text-muted-foreground mt-2">Nog geen klantprojecten</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Klant</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Contract</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Maandelijks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clientProjects.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.clientName || "—"}</TableCell>
                      <TableCell>{p.name}</TableCell>
                      <TableCell>
                        {p.contractType && (
                          <Badge variant="outline" className={contractBadge[p.contractType] || ""}>
                            {p.contractType}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusBadge[p.status]?.cls || ""}>
                          {statusBadge[p.status]?.label || p.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        &euro;{(p.monthlyFee || 0).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={4} className="font-semibold">
                      Subtotaal Agency
                    </TableCell>
                    <TableCell className="text-right font-mono font-semibold">
                      &euro;{agencyMRR.toLocaleString()}/mnd
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Own Projects Revenue */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              Eigen Projecten Revenue
              <Badge variant="outline" className="ml-2 text-xs">{month}</Badge>
            </CardTitle>
            <CardDescription>Revenue entries per bron voor de huidige maand</CardDescription>
          </CardHeader>
          <CardContent>
            {Object.keys(revenueBySource).length === 0 ? (
              <div className="text-center py-8">
                <DollarSign className="h-12 w-12 mx-auto text-muted-foreground/30" />
                <p className="text-muted-foreground mt-2">Nog geen revenue entries voor {month}</p>
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(revenueBySource).map(([source, entries]) => {
                  const subtotal = entries.reduce((s, e) => s + e.amount, 0)
                  return (
                    <div key={source}>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className={sourceColors[source] || "bg-zinc-500/20 text-zinc-400"}>
                          {source.charAt(0).toUpperCase() + source.slice(1)}
                        </Badge>
                        <span className="font-mono text-sm font-semibold">&euro;{subtotal.toLocaleString()}</span>
                      </div>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Beschrijving</TableHead>
                            <TableHead>Site</TableHead>
                            <TableHead className="text-right">Bedrag</TableHead>
                            <TableHead className="w-10"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {entries.map((entry) => (
                            <TableRow key={entry.id}>
                              <TableCell>
                                {entry.description}
                                {entry.recurring && (
                                  <Badge variant="outline" className="ml-2 text-xs">Terugkerend</Badge>
                                )}
                              </TableCell>
                              <TableCell className="text-muted-foreground text-sm">
                                {entry.siteDomain || "—"}
                              </TableCell>
                              <TableCell className="text-right font-mono">
                                &euro;{entry.amount.toLocaleString()}
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteRevenue(entry.id)}
                                  className="h-6 w-6 p-0 text-red-500 hover:text-red-600"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )
                })}
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold">
                    <span>Totaal Eigen Projecten</span>
                    <span className="font-mono">&euro;{ownRevenue.toLocaleString()}/mnd</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Costs Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5 text-red-400" />
              Kosten Overzicht
            </CardTitle>
            <CardDescription>Maandelijkse kosten per categorie</CardDescription>
          </CardHeader>
          <CardContent>
            {Object.keys(costsByCategory).length === 0 ? (
              <div className="text-center py-8">
                <PiggyBank className="h-12 w-12 mx-auto text-muted-foreground/30" />
                <p className="text-muted-foreground mt-2">Nog geen kosten toegevoegd</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Naam</TableHead>
                    <TableHead>Categorie</TableHead>
                    <TableHead>Factuurdatum</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Bedrag</TableHead>
                    <TableHead className="w-20"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {costs
                    .sort((a, b) => a.category.localeCompare(b.category))
                    .map((cost) => (
                      <TableRow key={cost.id}>
                        <TableCell className="font-medium">
                          {cost.name}
                          {cost.notes && (
                            <p className="text-xs text-muted-foreground mt-0.5">{cost.notes}</p>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={categoryColors[cost.category] || "bg-gray-500/20 text-gray-400"}
                          >
                            {cost.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {cost.billingDay ? `Dag ${cost.billingDay}` : "—"}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={cost.recurring ? "" : "bg-yellow-500/10 text-yellow-400"}>
                            {cost.recurring ? "Maandelijks" : "Eenmalig"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          &euro;{cost.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" onClick={() => handleEditCost(cost)} className="h-6 w-6 p-0">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteCost(cost.id)}
                              className="h-6 w-6 p-0 text-red-500 hover:text-red-600"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={4} className="font-semibold">
                      Totaal Kosten
                    </TableCell>
                    <TableCell className="text-right font-mono font-semibold">
                      &euro;{totalCosts.toLocaleString()}/mnd
                    </TableCell>
                    <TableCell />
                  </TableRow>
                </TableFooter>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* P&L Summary */}
        <Card className="border-[#F5911E]/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PiggyBank className="h-5 w-5 text-[#F5911E]" />
              P&amp;L Samenvatting
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                  Totale Revenue
                </div>
                <div className="text-3xl font-bold text-emerald-500">
                  &euro;{totalMRR.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">
                  Agency: &euro;{agencyMRR.toLocaleString()} + Eigen: &euro;{ownRevenue.toLocaleString()}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ArrowDownRight className="h-4 w-4 text-red-400" />
                  Totale Kosten
                </div>
                <div className="text-3xl font-bold text-red-400">
                  &euro;{totalCosts.toLocaleString()}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSign className="h-4 w-4 text-[#F5911E]" />
                  Netto Resultaat
                </div>
                <div className={`text-4xl font-bold ${netResult >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                  &euro;{netResult.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">
                  {netResult >= 0 ? "Winst" : "Verlies"} deze maand
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
