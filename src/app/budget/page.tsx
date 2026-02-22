"use client"

import { useState, useEffect } from "react"
import { TrendingUp, DollarSign, Target, PiggyBank, Plus, Edit, Trash2 } from "lucide-react"

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
} from "@/components/ui/table"
import { projectsStorage, costsStorage, type Project, type Cost } from "@/lib/storage"

// Default costs to seed on first load
const DEFAULT_COSTS = [
  { name: "Anthropic API (Claude)", amount: 150, category: "AI", recurring: true },
  { name: "OpenAI API", amount: 20, category: "AI", recurring: true },
  { name: "Vercel Pro", amount: 20, category: "Hosting", recurring: true },
  { name: "Neon Database", amount: 0, category: "Database", recurring: true },
  { name: "Domeinen (~88)", amount: 80, category: "Domains", recurring: true },
  { name: "VPS (planned)", amount: 20, category: "Infrastructure", recurring: true },
]

const GOAL_AMOUNT = 10000 // €10K per month goal

const statusConfig = {
  active: { label: "Actief", className: "bg-green-500/20 text-green-400 border-green-500/30" },
  planned: { label: "Gepland", className: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  paused: { label: "Gepauzeerd", className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
}

const categoryColors = {
  AI: "bg-purple-500/20 text-purple-400",
  Hosting: "bg-blue-500/20 text-blue-400", 
  Database: "bg-green-500/20 text-green-400",
  Domains: "bg-orange-500/20 text-orange-400",
  Infrastructure: "bg-gray-500/20 text-gray-400",
}

export default function BudgetPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [costs, setCosts] = useState<Cost[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCost, setEditingCost] = useState<Cost | null>(null)
  const [submitting, setSubmitting] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    category: "Tools",
    recurring: true,
    notes: "",
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [projectsData, costsData] = await Promise.all([
        projectsStorage.getAll(),
        costsStorage.getAll(),
      ])
      setProjects(projectsData)
      
      // If no costs exist, seed with default costs
      if (costsData.length === 0) {
        const seedPromises = DEFAULT_COSTS.map(cost =>
          costsStorage.create({
            name: cost.name,
            amount: cost.amount,
            category: cost.category,
            recurring: cost.recurring,
          })
        )
        const seededCosts = await Promise.all(seedPromises)
        setCosts(seededCosts)
      } else {
        setCosts(costsData)
      }
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setSubmitting(true)
      
      if (editingCost) {
        await costsStorage.update(editingCost.id, {
          name: formData.name,
          amount: parseFloat(formData.amount),
          category: formData.category,
          recurring: formData.recurring,
          notes: formData.notes || undefined,
        })
      } else {
        await costsStorage.create({
          name: formData.name,
          amount: parseFloat(formData.amount),
          category: formData.category,
          recurring: formData.recurring,
          notes: formData.notes || undefined,
        })
      }

      await loadData()
      setIsDialogOpen(false)
      setEditingCost(null)
      resetForm()
    } catch (error) {
      console.error('Failed to save cost:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      amount: "",
      category: "Tools",
      recurring: true,
      notes: "",
    })
  }

  const handleEdit = (cost: Cost) => {
    setEditingCost(cost)
    setFormData({
      name: cost.name,
      amount: cost.amount.toString(),
      category: cost.category,
      recurring: cost.recurring,
      notes: cost.notes || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (costId: string) => {
    if (confirm("Weet je zeker dat je deze kost wilt verwijderen?")) {
      try {
        await costsStorage.delete(costId)
        await loadData()
      } catch (error) {
        console.error('Failed to delete cost:', error)
      }
    }
  }

  // Calculate metrics
  const totalRevenue = projects
    .filter(p => p.revenue && p.revenue > 0)
    .reduce((sum, p) => sum + (p.revenue || 0), 0)
  
  const totalCosts = costs.reduce((sum, c) => sum + c.amount, 0)
  const netProfit = totalRevenue - totalCosts
  const goalProgress = (totalRevenue / GOAL_AMOUNT) * 100
  
  const revenueProjects = projects
    .filter(p => p.revenue && p.revenue > 0)
    .sort((a, b) => (b.revenue || 0) - (a.revenue || 0))

  const costsByCategory = costs.reduce((acc, cost) => {
    if (!acc[cost.category]) acc[cost.category] = []
    acc[cost.category].push(cost)
    return acc
  }, {} as Record<string, Cost[]>)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-background to-background dark:from-orange-950/25 dark:via-background dark:to-background">
        <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Loading budget...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-background to-background dark:from-orange-950/25 dark:via-background dark:to-background">
      <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <PiggyBank className="h-7 w-7 text-[#F5911E]" />
              Budget Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Overzicht van inkomsten, kosten en financiële doelen.
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#F5911E] hover:bg-[#e07d0a] text-white" onClick={() => {
                setEditingCost(null)
                resetForm()
              }}>
                <Plus className="mr-2 h-4 w-4" />
                Kost toevoegen
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingCost ? 'Kost bewerken' : 'Nieuwe kost'}</DialogTitle>
                <DialogDescription>
                  {editingCost ? 'Pas de kosten aan' : 'Voeg een nieuwe kost toe aan het budget'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="text-sm font-medium">Naam</label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Naam van de kost"
                    required
                    autoFocus
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="amount" className="text-sm font-medium">Bedrag (€)</label>
                    <Input
                      id="amount"
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      placeholder="0"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="category" className="text-sm font-medium">Categorie</label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
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
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="recurring"
                    checked={formData.recurring}
                    onChange={(e) => setFormData({ ...formData, recurring: e.target.checked })}
                    className="rounded border border-input"
                  />
                  <label htmlFor="recurring" className="text-sm font-medium">
                    Terugkerende maandelijkse kost
                  </label>
                </div>

                <div>
                  <label htmlFor="notes" className="text-sm font-medium">Notities (optioneel)</label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Extra info over deze kost..."
                    className="min-h-[60px]"
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1 bg-[#F5911E] hover:bg-[#e07d0a] text-white" disabled={submitting}>
                    {submitting ? 'Opslaan...' : (editingCost ? 'Bijwerken' : 'Toevoegen')}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuleren
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Maandelijks Inkomen</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <span className="text-3xl font-bold text-green-500">€{totalRevenue.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Maandelijkse Kosten</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-red-500" />
                <span className="text-3xl font-bold text-red-500">€{totalCosts.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Netto Winst</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <PiggyBank className="h-5 w-5 text-[#F5911E]" />
                <span className={`text-3xl font-bold ${netProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  €{netProfit.toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Voortgang naar €10K</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-[#F5911E]" />
                <span className="text-3xl font-bold text-[#F5911E]">
                  {Math.round(goalProgress)}%
                </span>
              </div>
              <Progress value={Math.min(goalProgress, 100)} className="h-2" />
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Revenue per project */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue per Project</CardTitle>
            </CardHeader>
            <CardContent>
              {revenueProjects.length === 0 ? (
                <div className="text-center py-8">
                  <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground/30" />
                  <p className="text-muted-foreground mt-2">Nog geen projecten met revenue</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                      <TableHead className="text-right">%</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {revenueProjects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">{project.name}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={statusConfig[project.status].className}
                          >
                            {statusConfig[project.status].label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          €{(project.revenue || 0).toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground">
                          {totalRevenue > 0 ? Math.round(((project.revenue || 0) / totalRevenue) * 100) : 0}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Costs Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Kosten Overzicht</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(costsByCategory).map(([category, categoryItems]) => (
                  <div key={category}>
                    <div className="flex items-center justify-between mb-2">
                      <Badge 
                        variant="outline" 
                        className={categoryColors[category as keyof typeof categoryColors] || "bg-gray-500/20 text-gray-400"}
                      >
                        {category}
                      </Badge>
                      <span className="font-mono text-sm">
                        €{categoryItems.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="space-y-1 pl-4">
                      {categoryItems.map((cost) => (
                        <div key={cost.id} className="flex items-center justify-between text-sm group hover:bg-gray-50 dark:hover:bg-gray-800/50 p-2 -m-2 rounded">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">{cost.name}</span>
                              {!cost.recurring && (
                                <Badge variant="outline" className="text-xs">Eenmalig</Badge>
                              )}
                            </div>
                            {cost.notes && (
                              <div className="text-xs text-muted-foreground/70 mt-1">{cost.notes}</div>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono">€{cost.amount.toLocaleString()}</span>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleEdit(cost)}
                                className="h-6 w-6 p-0"
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleDelete(cost.id)}
                                className="h-6 w-6 p-0 text-red-500 hover:text-red-600"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                {Object.keys(costsByCategory).length === 0 && (
                  <div className="text-center py-8">
                    <PiggyBank className="h-12 w-12 mx-auto text-muted-foreground/30" />
                    <p className="text-muted-foreground mt-2">Nog geen kosten toegevoegd</p>
                    <Button 
                      variant="outline" 
                      className="mt-3"
                      onClick={() => {
                        setEditingCost(null)
                        resetForm()
                        setIsDialogOpen(true)
                      }}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Eerste kost toevoegen
                    </Button>
                  </div>
                )}
                {Object.keys(costsByCategory).length > 0 && (
                  <div className="border-t pt-3 mt-4">
                    <div className="flex justify-between font-semibold">
                      <span>Totaal</span>
                      <span className="font-mono">€{totalCosts.toLocaleString()}/mnd</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Goal Tracker */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-[#F5911E]" />
              Doel Tracker - €10.000/mnd
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Huidige revenue</span>
                <span className="font-mono">€{totalRevenue.toLocaleString()}</span>
              </div>
              <Progress value={Math.min(goalProgress, 100)} className="h-4" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>€0</span>
                <span>€2.5K</span>
                <span>€5K</span>
                <span>€7.5K</span>
                <span>€10K</span>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Nog <span className="font-semibold text-[#F5911E]">€{(GOAL_AMOUNT - totalRevenue).toLocaleString()}</span> nodig om het doel te bereiken
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}