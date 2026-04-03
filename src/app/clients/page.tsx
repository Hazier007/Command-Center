"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Plus, Search, Users, Globe, DollarSign, TrendingUp, Clock, Building2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { projectsStorage, sitesStorage, type Project, type Site } from "@/lib/storage"

export default function ClientsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [sites, setSites] = useState<Site[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedContract, setSelectedContract] = useState<string>("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    contractType: "retainer",
    monthlyFee: "",
    description: "",
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [projectsData, sitesData] = await Promise.all([
        projectsStorage.getAll(),
        sitesStorage.getAll(),
      ])
      setProjects(projectsData.filter(p => p.ownerType === 'client'))
      setSites(sitesData)
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProjects = projects.filter(project => {
    const matchesSearch = (project.clientName || project.name).toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.clientEmail?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesContract = selectedContract === "all" || project.contractType === selectedContract
    return matchesSearch && matchesContract
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setSubmitting(true)
      await projectsStorage.create({
        name: formData.clientName,
        status: 'active',
        category: 'client',
        description: formData.description || undefined,
        revenue: formData.monthlyFee ? parseFloat(formData.monthlyFee) : undefined,
        ownerType: 'client',
        clientName: formData.clientName,
        clientEmail: formData.clientEmail || undefined,
        contractType: formData.contractType,
        monthlyFee: formData.monthlyFee ? parseFloat(formData.monthlyFee) : undefined,
      })
      await loadData()
      setIsDialogOpen(false)
      setFormData({ clientName: "", clientEmail: "", contractType: "retainer", monthlyFee: "", description: "" })
    } catch (error) {
      console.error('Failed to create client:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const getContractColor = (type?: string) => {
    switch (type) {
      case 'retainer': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
      case 'eenmalig': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200'
      case 'mixed': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200'
    }
  }

  const getClientSites = (projectId: string) => {
    return sites.filter(s => s.projectId === projectId)
  }

  const totalMRR = filteredProjects
    .filter(p => p.contractType !== 'eenmalig')
    .reduce((sum, p) => sum + (p.monthlyFee || p.revenue || 0), 0)
  const totalOneOff = filteredProjects
    .filter(p => p.contractType === 'eenmalig')
    .reduce((sum, p) => sum + (p.monthlyFee || p.revenue || 0), 0)
  const activeSites = sites.filter(s => s.status === 'live' && projects.some(p => p.id === s.projectId))
  const pipelineValue = filteredProjects
    .filter(p => p.status === 'planned')
    .reduce((sum, p) => sum + (p.monthlyFee || p.revenue || 0), 0)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-background to-background dark:from-orange-950/25 dark:via-background dark:to-background">
        <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Loading klanten...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-background to-background dark:from-orange-950/25 dark:via-background dark:to-background">
      <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Klanten</h1>
            <p className="text-muted-foreground">
              {filteredProjects.length} klanten · {activeSites.length} actieve sites · MRR: {totalMRR.toLocaleString('nl-BE', { style: 'currency', currency: 'EUR' })}
              {totalOneOff > 0 && ` · Eenmalig: ${totalOneOff.toLocaleString('nl-BE', { style: 'currency', currency: 'EUR' })}`}
            </p>
          </div>

          <div className="flex gap-2">
            <Link href="/clients/pipeline">
              <Button variant="outline">
                <TrendingUp className="mr-2 h-4 w-4" />
                Pipeline
              </Button>
            </Link>
            <Link href="/clients/quotes">
              <Button variant="outline">
                <DollarSign className="mr-2 h-4 w-4" />
                Offertes
              </Button>
            </Link>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#F5911E] hover:bg-[#e07d0a] text-white" onClick={() => {
                  setFormData({ clientName: "", clientEmail: "", contractType: "retainer", monthlyFee: "", description: "" })
                }}>
                  <Plus className="mr-2 h-4 w-4" />
                  Nieuwe klant
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Nieuwe klant</DialogTitle>
                  <DialogDescription>Voeg een nieuwe klant toe aan het overzicht</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="clientName" className="text-sm font-medium">Klantnaam</label>
                    <Input
                      id="clientName"
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      placeholder="Bedrijfsnaam"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="clientEmail" className="text-sm font-medium">E-mail</label>
                    <Input
                      id="clientEmail"
                      type="email"
                      value={formData.clientEmail}
                      onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                      placeholder="info@bedrijf.be"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contractType" className="text-sm font-medium">Contract</label>
                      <select
                        id="contractType"
                        value={formData.contractType}
                        onChange={(e) => setFormData({ ...formData, contractType: e.target.value })}
                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        <option value="retainer">Retainer</option>
                        <option value="eenmalig">Eenmalig</option>
                        <option value="mixed">Mixed</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="monthlyFee" className="text-sm font-medium">Maandelijks (EUR)</label>
                      <Input
                        id="monthlyFee"
                        type="number"
                        value={formData.monthlyFee}
                        onChange={(e) => setFormData({ ...formData, monthlyFee: e.target.value })}
                        placeholder="0"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="description" className="text-sm font-medium">Beschrijving</label>
                    <Input
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Korte beschrijving van het project"
                    />
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="flex-1 bg-[#F5911E] hover:bg-[#e07d0a] text-white" disabled={submitting}>
                      {submitting ? 'Opslaan...' : 'Toevoegen'}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Annuleren
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        {/* Stats Row */}
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Totaal klanten</span>
              </div>
              <p className="text-2xl font-bold mt-1">{projects.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Actieve sites</span>
              </div>
              <p className="text-2xl font-bold mt-1">{activeSites.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="text-sm text-muted-foreground">Maandelijkse MRR</span>
              </div>
              <p className="text-2xl font-bold mt-1 text-green-600">{totalMRR.toLocaleString('nl-BE', { style: 'currency', currency: 'EUR' })}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-[#F5911E]" />
                <span className="text-sm text-muted-foreground">Pipeline waarde</span>
              </div>
              <p className="text-2xl font-bold mt-1 text-[#F5911E]">{pipelineValue.toLocaleString('nl-BE', { style: 'currency', currency: 'EUR' })}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="mt-6 space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <Input
              placeholder="Zoek klanten..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="md:max-w-sm"
            />
            <Tabs value={selectedContract} onValueChange={setSelectedContract}>
              <TabsList>
                <TabsTrigger value="all">Alle</TabsTrigger>
                <TabsTrigger value="retainer">Retainer</TabsTrigger>
                <TabsTrigger value="eenmalig">Eenmalig</TabsTrigger>
                <TabsTrigger value="mixed">Mixed</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Client Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => {
              const clientSites = getClientSites(project.id)
              return (
                <Link key={project.id} href={`/clients/${project.id}`}>
                  <Card className="hover:border-[#F5911E]/50 transition-colors cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <CardTitle className="text-base">{project.clientName || project.name}</CardTitle>
                            {project.clientEmail && (
                              <CardDescription className="truncate">{project.clientEmail}</CardDescription>
                            )}
                          </div>
                        </div>
                        <Badge className={getContractColor(project.contractType)}>
                          {project.contractType || 'n/a'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        {project.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {project.description}
                          </p>
                        )}

                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div className="text-center">
                            <div className="font-medium">{clientSites.length}</div>
                            <div className="text-muted-foreground">sites</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium text-green-600">
                              {(project.monthlyFee || project.revenue || 0).toLocaleString('nl-BE', { style: 'currency', currency: 'EUR' })}
                            </div>
                            <div className="text-muted-foreground">{project.contractType === 'eenmalig' ? 'eenmalig' : '/maand'}</div>
                          </div>
                          <div className="text-center">
                            <Badge className={`text-xs ${project.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200'}`}>
                              {project.status}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>Laatst bijgewerkt {new Date(project.updatedAt).toLocaleDateString('nl-BE')}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>

          {filteredProjects.length === 0 && !loading && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-muted-foreground">Geen klanten gevonden</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {searchTerm || selectedContract !== "all"
                  ? "Pas je zoekopdracht of filter aan"
                  : "Voeg je eerste klant toe om te beginnen"
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
