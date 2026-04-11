"use client"

import { useCallback, useEffect, useState } from "react"
import { TrendingUp, Receipt } from "lucide-react"
import { useBusinessContext } from "@/components/nerve"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// ─── Types ─────────────────────────────────────────────────────
// NOTE: The API (Prisma) returns RevenueEntry with `source` + `description` + `month`.
// Older display code referenced `r.type` which doesn't exist, so stream filters
// never matched. Fixed below to use `source`.
interface RevenueEntry {
  id: string
  source: string // stream key: agency|adsense|leadgen|affiliate|domain
  description: string
  amount: number
  month: string
  siteDomain?: string | null
  recurring: boolean
  businessId?: string
  createdAt?: string
}
interface Cost {
  id: string
  name: string
  amount: number
  category: string
  businessId?: string
  recurring: boolean
  billingCycle?: string | null
  notes?: string | null
}

function currentMonth() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
}

const COST_CATEGORIES = [
  "AI",
  "Hosting",
  "Database",
  "Domains",
  "Infrastructure",
  "Tools",
  "Other",
]

// ─── Revenue stream config ────────────────────────────────────
const STREAMS = [
  { key: "agency",   label: "Agency MRR",  icon: "🏢", color: "bg-blue-400",   textColor: "text-blue-400" },
  { key: "adsense",  label: "AdSense",     icon: "📊", color: "bg-green-400",  textColor: "text-green-400" },
  { key: "leadgen",  label: "Lead Gen",    icon: "🏠", color: "bg-purple-400", textColor: "text-purple-400" },
  { key: "affiliate",label: "Affiliate",   icon: "🔗", color: "bg-pink-400",   textColor: "text-pink-400" },
]

// ─── Component ────────────────────────────────────────────────
export default function GeldPage() {
  const { activeBusiness } = useBusinessContext()
  const [revenue, setRevenue] = useState<RevenueEntry[]>([])
  const [costs, setCosts] = useState<Cost[]>([])
  const [loading, setLoading] = useState(true)

  // ─── Dialog state ─────────────────────────────────────────
  const [revenueOpen, setRevenueOpen] = useState(false)
  const [costOpen, setCostOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const [revenueForm, setRevenueForm] = useState({
    source: "agency",
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
    billingCycle: "monthly",
    notes: "",
  })

  const refetch = useCallback(() => {
    return Promise.all([
      fetch("/api/revenue").then((r) => r.json()).catch(() => []),
      fetch("/api/costs").then((r) => r.json()).catch(() => []),
    ]).then(([r, c]) => {
      setRevenue(Array.isArray(r) ? r : [])
      setCosts(Array.isArray(c) ? c : [])
    })
  }, [])

  useEffect(() => {
    refetch().finally(() => setLoading(false))
  }, [refetch])

  const resetRevenueForm = () =>
    setRevenueForm({
      source: "agency",
      description: "",
      amount: "",
      month: currentMonth(),
      siteDomain: "",
      recurring: false,
    })
  const resetCostForm = () =>
    setCostForm({
      name: "",
      amount: "",
      category: "Tools",
      recurring: true,
      billingCycle: "monthly",
      notes: "",
    })

  async function submitRevenue(e: React.FormEvent) {
    e.preventDefault()
    setFormError(null)
    const amount = parseFloat(revenueForm.amount)
    if (!revenueForm.description.trim() || isNaN(amount) || amount <= 0) {
      setFormError("Beschrijving en geldig bedrag zijn vereist.")
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch("/api/revenue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: revenueForm.source,
          description: revenueForm.description.trim(),
          amount,
          month: revenueForm.month || currentMonth(),
          siteDomain: revenueForm.siteDomain.trim() || undefined,
          recurring: revenueForm.recurring,
        }),
      })
      if (!res.ok) throw new Error("POST faalde")
      await refetch()
      resetRevenueForm()
      setRevenueOpen(false)
    } catch (err) {
      console.error(err)
      setFormError("Opslaan mislukt. Probeer opnieuw.")
    } finally {
      setSubmitting(false)
    }
  }

  async function submitCost(e: React.FormEvent) {
    e.preventDefault()
    setFormError(null)
    const amount = parseFloat(costForm.amount)
    if (!costForm.name.trim() || isNaN(amount) || amount <= 0) {
      setFormError("Naam en geldig bedrag zijn vereist.")
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch("/api/costs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: costForm.name.trim(),
          amount,
          category: costForm.category,
          recurring: costForm.recurring,
          billingCycle: costForm.recurring ? costForm.billingCycle : "one_time",
          notes: costForm.notes.trim() || undefined,
        }),
      })
      if (!res.ok) throw new Error("POST faalde")
      await refetch()
      resetCostForm()
      setCostOpen(false)
    } catch (err) {
      console.error(err)
      setFormError("Opslaan mislukt. Probeer opnieuw.")
    } finally {
      setSubmitting(false)
    }
  }

  // Filter by business if not "all"
  const filteredRevenue = activeBusiness.id === "all"
    ? revenue
    : revenue.filter((r) => r.businessId === activeBusiness.id || !r.businessId)
  const filteredCosts = activeBusiness.id === "all"
    ? costs
    : costs.filter((c) => c.businessId === activeBusiness.id || !c.businessId)

  const totalRevenue = filteredRevenue.reduce((s, r) => s + r.amount, 0)
  const totalCosts = filteredCosts.reduce((s, c) => s + c.amount, 0)
  const profit = totalRevenue - totalCosts
  const target = 100000
  const progress = Math.min((totalRevenue / target) * 100, 100)

  // Revenue per stream — filter on `source` (prev. `type`, which doesn't exist on schema)
  const revenueByStream = STREAMS.map((s) => ({
    ...s,
    amount: filteredRevenue
      .filter((r) => r.source === s.key)
      .reduce((sum, r) => sum + r.amount, 0),
  }))

  // Top costs
  const topCosts = [...filteredCosts]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 8)

  // Monthly recurring
  const mrr = filteredRevenue
    .filter((r) => r.recurring)
    .reduce((s, r) => s + r.amount, 0)

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-extrabold tracking-tight text-white">
            💰 Geld
          </h1>
          <p className="text-[13px] text-zinc-500">
            Revenue, kosten &amp; gap naar €100K
            {activeBusiness.id !== "all" && (
              <span className="ml-2 text-[#F5911E]">· {activeBusiness.name}</span>
            )}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => {
              setFormError(null)
              setRevenueOpen(true)
            }}
            className="bg-[#F5911E] text-white hover:bg-[#F5911E]/90"
          >
            <TrendingUp className="h-3.5 w-3.5 mr-1.5" />
            Inkomst toevoegen
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setFormError(null)
              setCostOpen(true)
            }}
            className="border-white/10 bg-zinc-800/50 text-white hover:bg-zinc-800"
          >
            <Receipt className="h-3.5 w-3.5 mr-1.5" />
            Uitgave toevoegen
          </Button>
        </div>
      </div>

      {/* Top metrics */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "MRR", value: `€${mrr.toLocaleString("nl-BE")}`, sub: "Recurring" },
          { label: "Totaal revenue", value: `€${totalRevenue.toLocaleString("nl-BE")}`, sub: "Deze maand" },
          { label: "Kosten", value: `€${totalCosts.toLocaleString("nl-BE")}`, sub: "Deze maand" },
          { label: "Winst", value: `€${profit.toLocaleString("nl-BE")}`, sub: profit >= 0 ? "Positief" : "Negatief" },
        ].map((m) => (
          <div
            key={m.label}
            className="rounded-xl border border-white/[0.06] bg-zinc-800/30 p-4"
          >
            <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
              {m.label}
            </p>
            <p className="text-[24px] font-extrabold tracking-tight text-white mt-1 tabular-nums">
              {loading ? "..." : m.value}
            </p>
            <p className="text-[10px] text-zinc-600 mt-0.5">{m.sub}</p>
          </div>
        ))}
      </div>

      {/* Gap to €100K */}
      <div className="rounded-xl border border-white/[0.06] bg-zinc-800/30 p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[14px] font-bold text-white">🎯 Gap naar €100K/maand</h2>
          <span className="text-[12px] font-bold tabular-nums text-[#F5911E]">
            {loading ? "..." : `€${totalRevenue.toLocaleString("nl-BE")} / €100.000`}
          </span>
        </div>
        <div className="h-3 rounded-full bg-zinc-700/50 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#F5911E] to-[#F5911E]/60 transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-[10px] text-zinc-500">
            {progress.toFixed(1)}% bereikt
          </span>
          <span className="text-[10px] text-zinc-500">
            Nog €{(target - totalRevenue).toLocaleString("nl-BE")} te gaan
          </span>
        </div>
      </div>

      {/* Revenue streams + Costs side by side */}
      <div className="grid grid-cols-2 gap-4">
        {/* Revenue per stream */}
        <div className="rounded-xl border border-white/[0.06] bg-zinc-800/30 p-4">
          <h3 className="text-[13px] font-bold text-white mb-4">📊 Revenue per stream</h3>
          <div className="space-y-3">
            {revenueByStream.map((s) => {
              const pct = totalRevenue > 0 ? (s.amount / totalRevenue) * 100 : 0
              return (
                <div key={s.key}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="flex items-center gap-2 text-[11px] text-zinc-300">
                      {s.icon} {s.label}
                    </span>
                    <span className="text-[11px] font-bold text-white tabular-nums">
                      €{s.amount.toLocaleString("nl-BE")}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-zinc-700/50 overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all duration-700", s.color)}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Top costs */}
        <div className="rounded-xl border border-white/[0.06] bg-zinc-800/30 p-4">
          <h3 className="text-[13px] font-bold text-white mb-4">🧾 Top kosten</h3>
          <div className="space-y-2">
            {topCosts.length > 0 ? (
              topCosts.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between rounded-lg border border-white/[0.04] bg-zinc-800/40 px-3 py-2"
                >
                  <div>
                    <p className="text-[11px] font-medium text-white">{c.name}</p>
                    <p className="text-[9px] text-zinc-500 uppercase">{c.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] font-bold text-red-400 tabular-nums">
                      -€{c.amount.toLocaleString("nl-BE")}
                    </p>
                    {c.recurring && (
                      <span className="text-[8px] text-zinc-500">recurring</span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-[11px] text-zinc-600 py-4">
                Geen kosten gevonden
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Recent revenue entries */}
      <div className="rounded-xl border border-white/[0.06] bg-zinc-800/30 p-4">
        <h3 className="text-[13px] font-bold text-white mb-3">💸 Recente inkomsten</h3>
        <div className="space-y-1.5">
          {filteredRevenue.length > 0 ? (
            filteredRevenue.slice(0, 10).map((r) => {
              const stream = STREAMS.find((s) => s.key === r.source)
              return (
                <div
                  key={r.id}
                  className="flex items-center gap-3 rounded-lg border border-white/[0.04] bg-zinc-800/40 px-3 py-2.5"
                >
                  <span className="text-[14px]">{stream?.icon || "💰"}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium text-white truncate">
                      {r.description || r.source}
                    </p>
                    <p className="text-[9px] text-zinc-500">
                      {stream?.label || r.source}
                      {r.siteDomain && ` · ${r.siteDomain}`}
                      {r.recurring && " · recurring"}
                    </p>
                  </div>
                  <span className="text-[12px] font-bold text-green-400 tabular-nums">
                    +€{r.amount.toLocaleString("nl-BE")}
                  </span>
                </div>
              )
            })
          ) : (
            <p className="text-center text-[11px] text-zinc-600 py-4">
              {loading ? "Laden..." : "Geen revenue data gevonden"}
            </p>
          )}
        </div>
      </div>

      {/* ── Inkomst toevoegen dialog ─────────────────────── */}
      <Dialog open={revenueOpen} onOpenChange={setRevenueOpen}>
        <DialogContent className="bg-zinc-900 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Inkomst toevoegen</DialogTitle>
            <DialogDescription className="text-zinc-500">
              Nieuwe revenue entry. Gaat direct in de database.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={submitRevenue} className="space-y-4">
            <div>
              <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider block mb-1.5">
                Stream
              </label>
              <div className="grid grid-cols-4 gap-2">
                {STREAMS.map((s) => (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setRevenueForm((f) => ({ ...f, source: s.key }))}
                    className={cn(
                      "rounded-lg border px-2 py-2 text-[11px] font-medium transition-colors",
                      revenueForm.source === s.key
                        ? "border-[#F5911E] bg-[#F5911E]/10 text-[#F5911E]"
                        : "border-white/10 bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800"
                    )}
                  >
                    {s.icon} {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider block mb-1.5">
                Omschrijving *
              </label>
              <Input
                value={revenueForm.description}
                onChange={(e) =>
                  setRevenueForm((f) => ({ ...f, description: e.target.value }))
                }
                placeholder="bv. Hazier retainer Kristof Ponnet"
                className="bg-zinc-800/50 border-white/10 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider block mb-1.5">
                  Bedrag (€) *
                </label>
                <Input
                  type="number"
                  step="0.01"
                  value={revenueForm.amount}
                  onChange={(e) =>
                    setRevenueForm((f) => ({ ...f, amount: e.target.value }))
                  }
                  placeholder="450"
                  className="bg-zinc-800/50 border-white/10 text-white"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider block mb-1.5">
                  Maand
                </label>
                <Input
                  type="month"
                  value={revenueForm.month}
                  onChange={(e) =>
                    setRevenueForm((f) => ({ ...f, month: e.target.value }))
                  }
                  className="bg-zinc-800/50 border-white/10 text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider block mb-1.5">
                Site / domein (optioneel)
              </label>
              <Input
                value={revenueForm.siteDomain}
                onChange={(e) =>
                  setRevenueForm((f) => ({ ...f, siteDomain: e.target.value }))
                }
                placeholder="bv. loonberekening.be"
                className="bg-zinc-800/50 border-white/10 text-white"
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={revenueForm.recurring}
                onChange={(e) =>
                  setRevenueForm((f) => ({ ...f, recurring: e.target.checked }))
                }
                className="h-4 w-4 rounded border-white/20 bg-zinc-800 accent-[#F5911E]"
              />
              <span className="text-[12px] text-zinc-300">
                Recurring (telt mee in MRR)
              </span>
            </label>

            {formError && (
              <p className="text-[11px] text-red-400">{formError}</p>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setRevenueOpen(false)}
                disabled={submitting}
                className="border-white/10 bg-zinc-800/50 text-white hover:bg-zinc-800"
              >
                Annuleren
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="bg-[#F5911E] text-white hover:bg-[#F5911E]/90"
              >
                {submitting ? "Opslaan..." : "Opslaan"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ── Uitgave toevoegen dialog ─────────────────────── */}
      <Dialog open={costOpen} onOpenChange={setCostOpen}>
        <DialogContent className="bg-zinc-900 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Uitgave toevoegen</DialogTitle>
            <DialogDescription className="text-zinc-500">
              Nieuwe kost. Recurring kosten tellen elke maand mee.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={submitCost} className="space-y-4">
            <div>
              <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider block mb-1.5">
                Naam *
              </label>
              <Input
                value={costForm.name}
                onChange={(e) =>
                  setCostForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="bv. Vercel Pro"
                className="bg-zinc-800/50 border-white/10 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider block mb-1.5">
                  Bedrag (€) *
                </label>
                <Input
                  type="number"
                  step="0.01"
                  value={costForm.amount}
                  onChange={(e) =>
                    setCostForm((f) => ({ ...f, amount: e.target.value }))
                  }
                  placeholder="20"
                  className="bg-zinc-800/50 border-white/10 text-white"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider block mb-1.5">
                  Categorie
                </label>
                <select
                  value={costForm.category}
                  onChange={(e) =>
                    setCostForm((f) => ({ ...f, category: e.target.value }))
                  }
                  className="w-full h-9 rounded-md border border-white/10 bg-zinc-800/50 px-3 text-[13px] text-white"
                >
                  {COST_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={costForm.recurring}
                  onChange={(e) =>
                    setCostForm((f) => ({ ...f, recurring: e.target.checked }))
                  }
                  className="h-4 w-4 rounded border-white/20 bg-zinc-800 accent-[#F5911E]"
                />
                <span className="text-[12px] text-zinc-300">Recurring</span>
              </label>
              {costForm.recurring && (
                <select
                  value={costForm.billingCycle}
                  onChange={(e) =>
                    setCostForm((f) => ({ ...f, billingCycle: e.target.value }))
                  }
                  className="h-8 rounded-md border border-white/10 bg-zinc-800/50 px-3 text-[12px] text-white"
                >
                  <option value="monthly">Per maand</option>
                  <option value="yearly">Per jaar</option>
                </select>
              )}
            </div>

            <div>
              <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider block mb-1.5">
                Notities
              </label>
              <Textarea
                value={costForm.notes}
                onChange={(e) =>
                  setCostForm((f) => ({ ...f, notes: e.target.value }))
                }
                rows={2}
                className="bg-zinc-800/50 border-white/10 text-white text-[13px]"
              />
            </div>

            {formError && (
              <p className="text-[11px] text-red-400">{formError}</p>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setCostOpen(false)}
                disabled={submitting}
                className="border-white/10 bg-zinc-800/50 text-white hover:bg-zinc-800"
              >
                Annuleren
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="bg-[#F5911E] text-white hover:bg-[#F5911E]/90"
              >
                {submitting ? "Opslaan..." : "Opslaan"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
