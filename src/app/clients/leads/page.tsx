"use client"

import { useState, useEffect } from "react"
import {
  Plus, Search, Users, DollarSign, TrendingUp,
  Trophy, Phone, Mail, Globe, Building2,
  Calendar, ExternalLink, Trash2, Edit3,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { leadsStorage, type Lead } from "@/lib/storage"

const STATUS_OPTIONS = [
  { value: "nieuw", label: "Nieuw", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  { value: "contact", label: "Contact", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  { value: "proposal", label: "Proposal", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  { value: "onderhandeling", label: "Onderhandeling", color: "bg-[#F5911E]/20 text-[#F5911E] border-[#F5911E]/30" },
  { value: "gewonnen", label: "Gewonnen", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  { value: "verloren", label: "Verloren", color: "bg-red-500/20 text-red-400 border-red-500/30" },
]

const SOURCE_OPTIONS = [
  { value: "website", label: "Website" },
  { value: "referral", label: "Referral" },
  { value: "cold", label: "Cold outreach" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "other", label: "Anders" },
]

const SERVICE_OPTIONS = [
  { value: "website", label: "Website" },
  { value: "seo", label: "SEO" },
  { value: "both", label: "Website + SEO" },
  { value: "other", label: "Anders" },
]

function getStatusBadge(status: string) {
  const opt = STATUS_OPTIONS.find(s => s.value === status)
  if (!opt) return <Badge variant="outline">{status}</Badge>
  return <Badge className={opt.color}>{opt.label}</Badge>
}

function getServiceLabel(service?: string) {
  const opt = SERVICE_OPTIONS.find(s => s.value === service)
  return opt?.label || service || "-"
}

function getSourceLabel(source?: string) {
  const opt = SOURCE_OPTIONS.find(s => s.value === source)
  return opt?.label || source || "-"
}

const emptyForm = {
  name: "",
  company: "",
  email: "",
  phone: "",
  website: "",
  source: "",
  service: "",
  estimatedValue: "",
  notes: "",
  status: "nieuw",
  proposal: "",
  nextFollowUp: "",
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("alle")
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingLead, setEditingLead] = useState<Lead | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState(emptyForm)

  useEffect(() => {
    loadLeads()
  }, [])

  const loadLeads = async () => {
    try {
      setLoading(true)
      const data = await leadsStorage.getAll()
      setLeads(data)
    } catch (error) {
      console.error("Failed to load leads:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setSubmitting(true)
      await leadsStorage.create({
        name: formData.name,
        company: formData.company || undefined,
        email: formData.email || undefined,
        phone: formData.phone || undefined,
        website: formData.website || undefined,
        source: formData.source || undefined,
        service: formData.service || undefined,
        estimatedValue: formData.estimatedValue ? parseFloat(formData.estimatedValue) : undefined,
        notes: formData.notes || undefined,
        status: formData.status || "nieuw",
        nextFollowUp: formData.nextFollowUp || undefined,
      })
      setFormData(emptyForm)
      setIsCreateOpen(false)
      await loadLeads()
    } catch (error) {
      console.error("Failed to create lead:", error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingLead) return
    try {
      setSubmitting(true)
      await leadsStorage.update(editingLead.id, {
        name: formData.name,
        company: formData.company || undefined,
        email: formData.email || undefined,
        phone: formData.phone || undefined,
        website: formData.website || undefined,
        source: formData.source || undefined,
        service: formData.service || undefined,
        estimatedValue: formData.estimatedValue ? parseFloat(formData.estimatedValue) : undefined,
        notes: formData.notes || undefined,
        status: formData.status,
        proposal: formData.proposal || undefined,
        nextFollowUp: formData.nextFollowUp || undefined,
      })
      setEditingLead(null)
      setFormData(emptyForm)
      await loadLeads()
    } catch (error) {
      console.error("Failed to update lead:", error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Weet je zeker dat je deze lead wilt verwijderen?")) return
    try {
      await leadsStorage.delete(id)
      await loadLeads()
    } catch (error) {
      console.error("Failed to delete lead:", error)
    }
  }

  const openEdit = (lead: Lead) => {
    setFormData({
      name: lead.name,
      company: lead.company || "",
      email: lead.email || "",
      phone: lead.phone || "",
      website: lead.website || "",
      source: lead.source || "",
      service: lead.service || "",
      estimatedValue: lead.estimatedValue?.toString() || "",
      notes: lead.notes || "",
      status: lead.status,
      proposal: lead.proposal || "",
      nextFollowUp: lead.nextFollowUp ? lead.nextFollowUp.slice(0, 10) : "",
    })
    setEditingLead(lead)
  }

  // Filtered leads
  const filteredLeads = leads.filter(lead => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.company || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.email || "").toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "alle" || lead.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Stats
  const totalLeads = leads.length
  const pipelineValue = leads
    .filter(l => l.status !== "verloren")
    .reduce((sum, l) => sum + (l.estimatedValue || 0), 0)
  const now = new Date()
  const wonThisMonth = leads.filter(l => {
    if (l.status !== "gewonnen") return false
    const d = new Date(l.updatedAt)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  }).length
  const closedLeads = leads.filter(l => l.status === "gewonnen" || l.status === "verloren").length
  const conversionRate = closedLeads > 0
    ? Math.round((leads.filter(l => l.status === "gewonnen").length / closedLeads) * 100)
    : 0

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(val)

  const LeadForm = ({ onSubmit, isEdit }: { onSubmit: (e: React.FormEvent) => void; isEdit: boolean }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs text-zinc-400">Naam *</label>
          <Input
            required
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            placeholder="Contact persoon"
            className="bg-zinc-900 border-white/10"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs text-zinc-400">Bedrijf</label>
          <Input
            value={formData.company}
            onChange={e => setFormData({ ...formData, company: e.target.value })}
            placeholder="Bedrijfsnaam"
            className="bg-zinc-900 border-white/10"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs text-zinc-400">E-mail</label>
          <Input
            type="email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            placeholder="email@voorbeeld.nl"
            className="bg-zinc-900 border-white/10"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs text-zinc-400">Telefoon</label>
          <Input
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+31 6 12345678"
            className="bg-zinc-900 border-white/10"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs text-zinc-400">Website</label>
          <Input
            value={formData.website}
            onChange={e => setFormData({ ...formData, website: e.target.value })}
            placeholder="https://voorbeeld.nl"
            className="bg-zinc-900 border-white/10"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs text-zinc-400">Geschatte waarde</label>
          <Input
            type="number"
            value={formData.estimatedValue}
            onChange={e => setFormData({ ...formData, estimatedValue: e.target.value })}
            placeholder="0"
            className="bg-zinc-900 border-white/10"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs text-zinc-400">Bron</label>
          <Select value={formData.source} onValueChange={v => setFormData({ ...formData, source: v })}>
            <SelectTrigger className="bg-zinc-900 border-white/10">
              <SelectValue placeholder="Selecteer bron" />
            </SelectTrigger>
            <SelectContent>
              {SOURCE_OPTIONS.map(o => (
                <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs text-zinc-400">Dienst</label>
          <Select value={formData.service} onValueChange={v => setFormData({ ...formData, service: v })}>
            <SelectTrigger className="bg-zinc-900 border-white/10">
              <SelectValue placeholder="Selecteer dienst" />
            </SelectTrigger>
            <SelectContent>
              {SERVICE_OPTIONS.map(o => (
                <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {isEdit && (
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs text-zinc-400">Status</label>
            <Select value={formData.status} onValueChange={v => setFormData({ ...formData, status: v })}>
              <SelectTrigger className="bg-zinc-900 border-white/10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map(o => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-zinc-400">Volgende follow-up</label>
            <Input
              type="date"
              value={formData.nextFollowUp}
              onChange={e => setFormData({ ...formData, nextFollowUp: e.target.value })}
              className="bg-zinc-900 border-white/10"
            />
          </div>
        </div>
      )}

      <div className="space-y-1.5">
        <label className="text-xs text-zinc-400">Notities</label>
        <Textarea
          value={formData.notes}
          onChange={e => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Notities over deze lead..."
          className="bg-zinc-900 border-white/10 min-h-[60px]"
        />
      </div>

      {isEdit && (
        <div className="space-y-1.5">
          <label className="text-xs text-zinc-400">Offerte / Proposal</label>
          <Textarea
            value={formData.proposal}
            onChange={e => setFormData({ ...formData, proposal: e.target.value })}
            placeholder="Offerte details of link..."
            className="bg-zinc-900 border-white/10 min-h-[60px]"
          />
        </div>
      )}

      <Button
        type="submit"
        disabled={submitting}
        className="w-full bg-[#F5911E] hover:bg-[#F5911E]/90 text-black font-medium"
      >
        {submitting ? "Opslaan..." : isEdit ? "Bijwerken" : "Lead toevoegen"}
      </Button>
    </form>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-zinc-400">Laden...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-8 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Leads</h1>
            <p className="text-zinc-400 text-sm">Beheer je sales pipeline</p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={(open) => {
            setIsCreateOpen(open)
            if (!open) setFormData(emptyForm)
          }}>
            <DialogTrigger asChild>
              <Button className="bg-[#F5911E] hover:bg-[#F5911E]/90 text-black font-medium">
                <Plus className="h-4 w-4 mr-1" />
                Nieuwe Lead
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-zinc-950 border-white/10 max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Nieuwe Lead</DialogTitle>
                <DialogDescription>Voeg een nieuwe lead toe aan je pipeline</DialogDescription>
              </DialogHeader>
              <LeadForm onSubmit={handleCreate} isEdit={false} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-zinc-900/50 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1">
                <Users className="h-3.5 w-3.5" />
                Totaal leads
              </div>
              <div className="text-2xl font-bold">{totalLeads}</div>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900/50 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1">
                <DollarSign className="h-3.5 w-3.5" />
                Pipeline waarde
              </div>
              <div className="text-2xl font-bold text-[#F5911E]">{formatCurrency(pipelineValue)}</div>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900/50 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1">
                <Trophy className="h-3.5 w-3.5" />
                Gewonnen deze maand
              </div>
              <div className="text-2xl font-bold text-green-400">{wonThisMonth}</div>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900/50 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1">
                <TrendingUp className="h-3.5 w-3.5" />
                Conversie ratio
              </div>
              <div className="text-2xl font-bold">{conversionRate}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <Input
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Zoek op naam, bedrijf of e-mail..."
              className="pl-9 bg-zinc-900 border-white/10"
            />
          </div>
          <Tabs value={statusFilter} onValueChange={setStatusFilter}>
            <TabsList className="bg-zinc-900 border border-white/10">
              <TabsTrigger value="alle" className="text-xs data-[state=active]:bg-white/10">Alle</TabsTrigger>
              <TabsTrigger value="nieuw" className="text-xs data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">Nieuw</TabsTrigger>
              <TabsTrigger value="contact" className="text-xs data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-400">Contact</TabsTrigger>
              <TabsTrigger value="proposal" className="text-xs data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">Proposal</TabsTrigger>
              <TabsTrigger value="onderhandeling" className="text-xs data-[state=active]:bg-[#F5911E]/20 data-[state=active]:text-[#F5911E]">Onderh.</TabsTrigger>
              <TabsTrigger value="gewonnen" className="text-xs data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">Gewonnen</TabsTrigger>
              <TabsTrigger value="verloren" className="text-xs data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400">Verloren</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Table */}
        {filteredLeads.length === 0 ? (
          <Card className="bg-zinc-900/50 border-white/10">
            <CardContent className="p-12 text-center">
              <Users className="h-8 w-8 text-zinc-600 mx-auto mb-3" />
              <p className="text-zinc-400 text-sm">
                {searchTerm || statusFilter !== "alle"
                  ? "Geen leads gevonden met deze filters"
                  : "Nog geen leads. Voeg je eerste lead toe!"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-zinc-900/50 border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-zinc-400 text-xs">
                    <th className="text-left p-3 font-medium">Lead</th>
                    <th className="text-left p-3 font-medium hidden md:table-cell">Bedrijf</th>
                    <th className="text-left p-3 font-medium">Status</th>
                    <th className="text-left p-3 font-medium hidden md:table-cell">Dienst</th>
                    <th className="text-right p-3 font-medium hidden md:table-cell">Waarde</th>
                    <th className="text-left p-3 font-medium hidden lg:table-cell">Follow-up</th>
                    <th className="text-right p-3 font-medium">Acties</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map(lead => (
                    <tr
                      key={lead.id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                      onClick={() => openEdit(lead)}
                    >
                      <td className="p-3">
                        <div className="font-medium text-white">{lead.name}</div>
                        <div className="text-zinc-500 text-xs flex items-center gap-2 mt-0.5">
                          {lead.email && (
                            <span className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {lead.email}
                            </span>
                          )}
                          {lead.phone && (
                            <span className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {lead.phone}
                            </span>
                          )}
                        </div>
                        {/* Mobile: show company inline */}
                        {lead.company && (
                          <div className="text-zinc-500 text-xs mt-0.5 md:hidden flex items-center gap-1">
                            <Building2 className="h-3 w-3" />
                            {lead.company}
                          </div>
                        )}
                      </td>
                      <td className="p-3 text-zinc-300 hidden md:table-cell">
                        <div className="flex items-center gap-1.5">
                          {lead.company && <Building2 className="h-3.5 w-3.5 text-zinc-500" />}
                          {lead.company || "-"}
                        </div>
                      </td>
                      <td className="p-3">{getStatusBadge(lead.status)}</td>
                      <td className="p-3 text-zinc-300 hidden md:table-cell">{getServiceLabel(lead.service)}</td>
                      <td className="p-3 text-right text-zinc-300 hidden md:table-cell">
                        {lead.estimatedValue ? formatCurrency(lead.estimatedValue) : "-"}
                      </td>
                      <td className="p-3 text-zinc-400 text-xs hidden lg:table-cell">
                        {lead.nextFollowUp ? (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(lead.nextFollowUp).toLocaleDateString("nl-NL")}
                          </span>
                        ) : "-"}
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1" onClick={e => e.stopPropagation()}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 text-zinc-400 hover:text-white"
                            onClick={() => openEdit(lead)}
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 text-zinc-400 hover:text-red-400"
                            onClick={() => handleDelete(lead.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Edit Dialog */}
        <Dialog open={!!editingLead} onOpenChange={(open) => {
          if (!open) {
            setEditingLead(null)
            setFormData(emptyForm)
          }
        }}>
          <DialogContent className="bg-zinc-950 border-white/10 max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Lead bewerken</DialogTitle>
              <DialogDescription>
                {editingLead?.name}{editingLead?.company ? ` - ${editingLead.company}` : ""}
              </DialogDescription>
            </DialogHeader>
            <LeadForm onSubmit={handleUpdate} isEdit={true} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
