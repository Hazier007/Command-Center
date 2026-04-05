"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Plus, FileText, Send, CheckCircle, XCircle, Pencil, Trash2 } from "lucide-react"

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

interface Quote {
  id: string
  clientName: string
  description: string
  amount: number
  status: 'concept' | 'verstuurd' | 'goedgekeurd' | 'afgewezen'
  createdAt: string
}

const SAMPLE_QUOTES: Quote[] = [
  { id: '1', clientName: 'Bakkerij De Ster', description: 'Website redesign + SEO pakket', amount: 2500, status: 'verstuurd', createdAt: '2026-03-25' },
  { id: '2', clientName: 'Loodgieter Janssen', description: 'Nieuwe website + Google Ads', amount: 1800, status: 'goedgekeurd', createdAt: '2026-03-20' },
  { id: '3', clientName: 'Fitness Pro Gent', description: 'Maandelijks SEO retainer', amount: 750, status: 'concept', createdAt: '2026-03-28' },
  { id: '4', clientName: 'Advokaat Peters', description: 'Landing page + content', amount: 1200, status: 'afgewezen', createdAt: '2026-03-15' },
  { id: '5', clientName: 'Restaurant Bella', description: 'Website + reserveringssysteem', amount: 3200, status: 'verstuurd', createdAt: '2026-03-22' },
]

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>(SAMPLE_QUOTES)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    clientName: "",
    description: "",
    amount: "",
    status: "concept" as Quote['status'],
  })
  const [editQuote, setEditQuote] = useState<Quote | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editForm, setEditForm] = useState({
    clientName: "", description: "", amount: "", status: "concept" as Quote['status'],
  })

  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = quote.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || quote.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newQuote: Quote = {
      id: Date.now().toString(),
      clientName: formData.clientName,
      description: formData.description,
      amount: parseFloat(formData.amount),
      status: formData.status,
      createdAt: new Date().toISOString().split('T')[0],
    }
    setQuotes([newQuote, ...quotes])
    setIsDialogOpen(false)
    setFormData({ clientName: "", description: "", amount: "", status: "concept" })
  }

  const handleEdit = (quote: Quote) => {
    setEditQuote(quote)
    setEditForm({
      clientName: quote.clientName,
      description: quote.description,
      amount: quote.amount.toString(),
      status: quote.status,
    })
    setIsEditDialogOpen(true)
  }

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editQuote) return
    setQuotes(prev => prev.map(q => q.id === editQuote.id ? {
      ...q,
      clientName: editForm.clientName,
      description: editForm.description,
      amount: parseFloat(editForm.amount),
      status: editForm.status,
    } : q))
    setIsEditDialogOpen(false)
    setEditQuote(null)
  }

  const handleDelete = (quoteId: string) => {
    if (confirm('Weet je zeker dat je deze offerte wilt verwijderen?')) {
      setQuotes(prev => prev.filter(q => q.id !== quoteId))
    }
  }

  const getStatusColor = (status: Quote['status']) => {
    switch (status) {
      case 'concept': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200'
      case 'verstuurd': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200'
      case 'goedgekeurd': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
      case 'afgewezen': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200'
    }
  }

  const getStatusIcon = (status: Quote['status']) => {
    switch (status) {
      case 'concept': return <FileText className="h-4 w-4" />
      case 'verstuurd': return <Send className="h-4 w-4" />
      case 'goedgekeurd': return <CheckCircle className="h-4 w-4" />
      case 'afgewezen': return <XCircle className="h-4 w-4" />
    }
  }

  const totalValue = filteredQuotes.reduce((sum, q) => sum + q.amount, 0)
  const approvedValue = quotes.filter(q => q.status === 'goedgekeurd').reduce((sum, q) => sum + q.amount, 0)
  const pendingValue = quotes.filter(q => q.status === 'verstuurd').reduce((sum, q) => sum + q.amount, 0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-background to-background dark:from-orange-950/25 dark:via-background dark:to-background">
      <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
        <Link href="/clients">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Terug naar klanten
          </Button>
        </Link>

        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Offertes</h1>
            <p className="text-muted-foreground">
              {quotes.length} offertes · Goedgekeurd: {approvedValue.toLocaleString('nl-BE', { style: 'currency', currency: 'EUR' })} · Uitstaand: {pendingValue.toLocaleString('nl-BE', { style: 'currency', currency: 'EUR' })}
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#F5911E] hover:bg-[#e07d0a] text-white">
                <Plus className="mr-2 h-4 w-4" />
                Nieuwe offerte
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nieuwe offerte</DialogTitle>
                <DialogDescription>Maak een nieuwe offerte aan</DialogDescription>
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
                  <label htmlFor="description" className="text-sm font-medium">Beschrijving</label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Wat bied je aan?"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="amount" className="text-sm font-medium">Bedrag (EUR)</label>
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
                    <label htmlFor="status" className="text-sm font-medium">Status</label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as Quote['status'] })}
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="concept">Concept</option>
                      <option value="verstuurd">Verstuurd</option>
                      <option value="goedgekeurd">Goedgekeurd</option>
                      <option value="afgewezen">Afgewezen</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1 bg-[#F5911E] hover:bg-[#e07d0a] text-white">
                    Toevoegen
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuleren
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </header>

        {/* Filters */}
        <div className="mt-6 space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <Input
              placeholder="Zoek offertes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="md:max-w-sm"
            />
            <Tabs value={selectedStatus} onValueChange={setSelectedStatus}>
              <TabsList>
                <TabsTrigger value="all">Alle</TabsTrigger>
                <TabsTrigger value="concept">Concept</TabsTrigger>
                <TabsTrigger value="verstuurd">Verstuurd</TabsTrigger>
                <TabsTrigger value="goedgekeurd">Goedgekeurd</TabsTrigger>
                <TabsTrigger value="afgewezen">Afgewezen</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Quotes List */}
          <div className="space-y-3">
            {filteredQuotes.map(quote => (
              <Card key={quote.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="text-muted-foreground">
                        {getStatusIcon(quote.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium truncate">{quote.clientName}</p>
                          <Badge className={getStatusColor(quote.status)} style={{ fontSize: '10px' }}>
                            {quote.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{quote.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                      <div className="text-right">
                        <p className="text-sm font-bold">{quote.amount.toLocaleString('nl-BE', { style: 'currency', currency: 'EUR' })}</p>
                        <p className="text-xs text-muted-foreground">{new Date(quote.createdAt).toLocaleDateString('nl-BE')}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleEdit(quote)}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-400" onClick={() => handleDelete(quote.id)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredQuotes.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-muted-foreground">Geen offertes gevonden</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {searchTerm || selectedStatus !== "all"
                  ? "Pas je zoekopdracht of filter aan"
                  : "Maak je eerste offerte aan"
                }
              </p>
            </div>
          )}
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Offerte bewerken</DialogTitle>
              <DialogDescription>Pas de offerte aan</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label htmlFor="editClientName" className="text-sm font-medium">Klantnaam</label>
                <Input id="editClientName" value={editForm.clientName} onChange={(e) => setEditForm({ ...editForm, clientName: e.target.value })} required />
              </div>
              <div>
                <label htmlFor="editDescription" className="text-sm font-medium">Beschrijving</label>
                <Input id="editDescription" value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="editAmount" className="text-sm font-medium">Bedrag (EUR)</label>
                  <Input id="editAmount" type="number" value={editForm.amount} onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })} min="0" step="0.01" required />
                </div>
                <div>
                  <label htmlFor="editStatus" className="text-sm font-medium">Status</label>
                  <select
                    id="editStatus"
                    value={editForm.status}
                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value as Quote['status'] })}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                  >
                    <option value="concept">Concept</option>
                    <option value="verstuurd">Verstuurd</option>
                    <option value="goedgekeurd">Goedgekeurd</option>
                    <option value="afgewezen">Afgewezen</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1 bg-[#F5911E] hover:bg-[#e07d0a] text-white">Opslaan</Button>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>Annuleren</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
