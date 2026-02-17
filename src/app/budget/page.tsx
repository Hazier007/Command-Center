"use client"

import { useState, useEffect } from "react"
import { TrendingUp, DollarSign, Target, PiggyBank } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { projectsStorage, type Project } from "@/lib/storage"

// Hardcoded costs data for now
const costs = [
  { name: "Anthropic API (Claude)", amount: 150, category: "AI" },
  { name: "OpenAI API", amount: 20, category: "AI" },
  { name: "Vercel Pro", amount: 20, category: "Hosting" },
  { name: "Neon Database", amount: 0, category: "Database" },
  { name: "Domeinen (~88)", amount: 80, category: "Domains" },
  { name: "VPS (planned)", amount: 20, category: "Infrastructure" },
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

  useEffect(() => {
    projectsStorage.getAll().then(setProjects)
  }, [])

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
  }, {} as Record<string, typeof costs>)

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-background to-background dark:from-orange-950/25 dark:via-background dark:to-background">
      <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <PiggyBank className="h-7 w-7 text-[#F5911E]" />
            Budget Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Overzicht van inkomsten, kosten en financiële doelen.
          </p>
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
                        <div key={cost.name} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{cost.name}</span>
                          <span className="font-mono">€{cost.amount.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="border-t pt-3 mt-4">
                  <div className="flex justify-between font-semibold">
                    <span>Totaal</span>
                    <span className="font-mono">€{totalCosts.toLocaleString()}/mnd</span>
                  </div>
                </div>
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