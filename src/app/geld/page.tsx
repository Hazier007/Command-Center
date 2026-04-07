"use client"

import { useEffect, useState } from "react"
import { useBusinessContext } from "@/components/nerve"
import { cn } from "@/lib/utils"

// ─── Types ─────────────────────────────────────────────────────
interface RevenueEntry {
  id: string; source: string; amount: number; type: string; recurring: boolean
  businessId?: string; date?: string
}
interface Cost {
  id: string; name: string; amount: number; category: string
  businessId?: string; recurring: boolean
}

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

  useEffect(() => {
    Promise.all([
      fetch("/api/revenue").then((r) => r.json()).catch(() => []),
      fetch("/api/costs").then((r) => r.json()).catch(() => []),
    ])
      .then(([r, c]) => {
        setRevenue(Array.isArray(r) ? r : [])
        setCosts(Array.isArray(c) ? c : [])
      })
      .finally(() => setLoading(false))
  }, [])

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

  // Revenue per stream
  const revenueByStream = STREAMS.map((s) => ({
    ...s,
    amount: filteredRevenue
      .filter((r) => r.type === s.key)
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
              const stream = STREAMS.find((s) => s.key === r.type)
              return (
                <div
                  key={r.id}
                  className="flex items-center gap-3 rounded-lg border border-white/[0.04] bg-zinc-800/40 px-3 py-2.5"
                >
                  <span className="text-[14px]">{stream?.icon || "💰"}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium text-white truncate">
                      {r.source}
                    </p>
                    <p className="text-[9px] text-zinc-500">
                      {stream?.label || r.type}
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
    </div>
  )
}
