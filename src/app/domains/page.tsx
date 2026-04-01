"use client"

import { useState, useEffect } from "react"
import { Plus, Search, Globe, Edit, Trash2, LayoutGrid, List, DollarSign, Tag, Star } from "lucide-react"

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
import { domainsStorage, type DomainOpportunity } from "@/lib/storage"

export default function DomainsPage() {
  const [domains, setDomains] = useState<DomainOpportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingDomain, setEditingDomain] = useState<DomainOpportunity | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    domain: "",
    status: "parking",
    estimatedValue: "",
    niche: "",
    priority: "medium",
    notes: "",
    radarNotes: "",
  })

  useEffect(() => {
    loadDomains()
  }, [])

  const loadDomains = async () => {
    try {
      setLoading(true)
      const data = await domainsStorage.getAll()
      setDomains(data)
    } catch (error) {
      console.error('Failed to load domains:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredDomains = domains.filter(domain => {
    const matchesSearch = domain.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         domain.niche?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         domain.notes?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || domain.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setSubmitting(true)
      const payload = {
        domain: formData.domain,
        status: formData.status,
        estimatedValue: formData.estimatedValue ? parseFloat(formData.estimatedValue) : undefined,
        niche: formData.niche || undefined,
        priority: formData.priority,
        notes: formData.notes || undefined,
        radarNotes: formData.radarNotes || undefined,
      }

      if (editingDomain) {
        await domainsStorage.update(editingDomain.id, payload)
      } else {
        await domainsStorage.create(payload as Omit<DomainOpportunity, 'id' | 'createdAt' | 'updatedAt'>)
      }

      await loadDomains()
      setIsDialogOpen(false)
      setEditingDomain(null)
      resetForm()
    } catch (error) {
      console.error('Failed to save domain:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({ domain: "", status: "parking", estimatedValue: "", niche: "", priority: "medium", notes: "", radarNotes: "" })
  }

  const handleEdit = (domain: DomainOpportunity) => {
    setEditingDomain(domain)
    setFormData({
      domain: domain.domain,
      status: domain.status,
      estimatedValue: domain.estimatedValue?.toString() || "",
      niche: domain.niche || "",
      priority: domain.priority || "medium",
      notes: domain.notes || "",
      radarNotes: domain.radarNotes || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (domainId: string) => {
    if (confirm("Weet je zeker dat je dit domein wilt verwijderen?")) {
      try {
        await domainsStorage.delete(domainId)
        await loadDomains()
      } catch (error) {
        console.error('Failed to delete domain:', error)
      }
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'parking': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200'
      case 'developing': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-200'
      case 'forsale': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
      case 'expired-watching': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200'
      case 'acquired': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200'
    }
  }

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return 'text-red-600'
      case 'medium': return 'text-yellow-600'
      case 'low': return 'text-gray-400'
      default: return 'text-gray-400'
    }
  }

  const statusCounts = {
    parking: domains.filter(d => d.status === 'parking').length,
    developing: domains.filter(d => d.status === 'developing').length,
    forsale: domains.filter(d => d.status === 'forsale').length,
    'expired-watching': domains.filter(d => d.status === 'expired-watching').length,
    acquired: domains.filter(d => d.status === 'acquired').length,
  }
  const totalValue = domains.reduce((sum, d) => sum + (d.estimatedValue || 0), 0)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-background to-background dark:from-orange-950/25 dark:via-background dark:to-background">
        <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Loading domeinen...</div>
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
            <h1 className="text-3xl font-bold tracking-tight">Domein Portfolio</h1>
            <p className="text-muted-foreground">
              {domains.length} domeinen · Geschatte waarde: {totalValue.toLocaleString('nl-BE', { style: 'currency', currency: 'EUR' })}
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#F5911E] hover:bg-[#e07d0a] text-white" onClick={() => {
                setEditingDomain(null)
                resetForm()
              }}>
                <Plus className="mr-2 h-4 w-4" />
                Nieuw domein
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingDomain ? 'Domein bewerken' : 'Nieuw domein'}</DialogTitle>
                <DialogDescription>
                  {editingDomain ? 'Pas de domeingegevens aan' : 'Voeg een nieuw domein toe aan de portfolio'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="domain" className="text-sm font-medium">Domein</label>
                  <Input
                    id="domain"
                    value={formData.domain}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    placeholder="voorbeeld.be"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="status" className="text-sm font-medium">Status</label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="parking">Parking</option>
                      <option value="developing">In ontwikkeling</option>
                      <option value="forsale">Te koop</option>
                      <option value="expired-watching">Expired - watching</option>
                      <option value="acquired">Gekocht</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="priority" className="text-sm font-medium">Prioriteit</label>
                    <select
                      id="priority"
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="low">Laag</option>
                      <option value="medium">Medium</option>
                      <option value="high">Hoog</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="estimatedValue" className="text-sm font-medium">Geschatte waarde (EUR)</label>
                    <Input
                      id="estimatedValue"
                      type="number"
                      value={formData.estimatedValue}
                      onChange={(e) => setFormData({ ...formData, estimatedValue: e.target.value })}
                      placeholder="0"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label htmlFor="niche" className="text-sm font-medium">Niche</label>
                    <Input
                      id="niche"
                      value={formData.niche}
                      onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                      placeholder="bijv. vastgoed, gezondheid"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="notes" className="text-sm font-medium">Notities</label>
                  <Input
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Extra informatie"
                  />
                </div>
                <div>
                  <label htmlFor="radarNotes" className="text-sm font-medium">RADAR notities</label>
                  <Input
                    id="radarNotes"
                    value={formData.radarNotes}
                    onChange={(e) => setFormData({ ...formData, radarNotes: e.target.value })}
                    placeholder="Notities van RADAR agent"
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1 bg-[#F5911E] hover:bg-[#e07d0a] text-white" disabled={submitting}>
                    {submitting ? 'Opslaan...' : (editingDomain ? 'Bijwerken' : 'Toevoegen')}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuleren
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </header>

        {/* Stats Row */}
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5">
          <Card>
            <CardContent className="pt-4 pb-4">
              <p className="text-xs text-muted-foreground">Totaal</p>
              <p className="text-xl font-bold">{domains.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4">
              <p className="text-xs text-muted-foreground">Parking</p>
              <p className="text-xl font-bold">{statusCounts.parking}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4">
              <p className="text-xs text-muted-foreground">In ontwikkeling</p>
              <p className="text-xl font-bold text-orange-600">{statusCounts.developing}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4">
              <p className="text-xs text-muted-foreground">Te koop</p>
              <p className="text-xl font-bold text-green-600">{statusCounts.forsale}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4">
              <p className="text-xs text-muted-foreground">Watching</p>
              <p className="text-xl font-bold text-red-600">{statusCounts['expired-watching']}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters & View Toggle */}
        <div className="mt-6 space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-4 md:flex-row md:items-center flex-1">
              <Input
                placeholder="Zoek domeinen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="md:max-w-sm"
              />
              <Tabs value={selectedStatus} onValueChange={setSelectedStatus}>
                <TabsList>
                  <TabsTrigger value="all">Alle</TabsTrigger>
                  <TabsTrigger value="parking">Parking</TabsTrigger>
                  <TabsTrigger value="developing">Dev</TabsTrigger>
                  <TabsTrigger value="forsale">Te koop</TabsTrigger>
                  <TabsTrigger value="expired-watching">Watching</TabsTrigger>
                  <TabsTrigger value="acquired">Gekocht</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="flex gap-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('table')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Grid View */}
          {viewMode === 'grid' && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredDomains.map(domain => (
                <Card key={domain.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <Globe className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <CardTitle className="text-base truncate">{domain.domain}</CardTitle>
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(domain)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(domain.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(domain.status)}>{domain.status}</Badge>
                        <Star className={`h-3 w-3 ${getPriorityColor(domain.priority)}`} />
                      </div>
                      {domain.niche && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Tag className="h-3 w-3" />
                          <span>{domain.niche}</span>
                        </div>
                      )}
                      {domain.estimatedValue && (
                        <div className="flex items-center gap-1 text-sm">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="font-medium">{domain.estimatedValue.toLocaleString('nl-BE', { style: 'currency', currency: 'EUR' })}</span>
                        </div>
                      )}
                      {domain.notes && (
                        <p className="text-xs text-muted-foreground line-clamp-2">{domain.notes}</p>
                      )}
                      {domain.radarNotes && (
                        <p className="text-xs text-[#F5911E] line-clamp-2">RADAR: {domain.radarNotes}</p>
                      )}
                      <div className="text-xs text-muted-foreground">
                        Bijgewerkt {new Date(domain.updatedAt).toLocaleDateString('nl-BE')}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Table View */}
          {viewMode === 'table' && (
            <div className="rounded-md border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800/50">
                    <th className="text-left p-3 font-medium">Domein</th>
                    <th className="text-left p-3 font-medium">Status</th>
                    <th className="text-left p-3 font-medium">Niche</th>
                    <th className="text-right p-3 font-medium">Waarde</th>
                    <th className="text-center p-3 font-medium">Prioriteit</th>
                    <th className="text-left p-3 font-medium">RADAR</th>
                    <th className="text-right p-3 font-medium">Acties</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDomains.map(domain => (
                    <tr key={domain.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800/30">
                      <td className="p-3 font-medium">{domain.domain}</td>
                      <td className="p-3">
                        <Badge className={getStatusColor(domain.status)} style={{ fontSize: '10px' }}>{domain.status}</Badge>
                      </td>
                      <td className="p-3 text-muted-foreground">{domain.niche || '-'}</td>
                      <td className="p-3 text-right">
                        {domain.estimatedValue
                          ? domain.estimatedValue.toLocaleString('nl-BE', { style: 'currency', currency: 'EUR' })
                          : '-'}
                      </td>
                      <td className="p-3 text-center">
                        <Star className={`h-3 w-3 mx-auto ${getPriorityColor(domain.priority)}`} />
                      </td>
                      <td className="p-3 text-xs text-muted-foreground max-w-[200px] truncate">{domain.radarNotes || '-'}</td>
                      <td className="p-3 text-right">
                        <div className="flex gap-1 justify-end">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(domain)}>
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(domain.id)}>
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {filteredDomains.length === 0 && !loading && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-muted-foreground">Geen domeinen gevonden</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {searchTerm || selectedStatus !== "all"
                  ? "Pas je zoekopdracht of filter aan"
                  : "Voeg je eerste domein toe om te beginnen"
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
