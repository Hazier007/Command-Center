"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

// ─── Types ─────────────────────────────────────────────────────
interface NowItem {
  id: string
  title: string
  meta: string
}

interface PulseItem {
  agent: string
  emoji: string
  color: string
  text: string
  time: string
}

interface RevenueStream {
  name: string
  amount: number
  color: string
}

// ─── Revenue Tracker ───────────────────────────────────────────
function RevenueTracker() {
  const [totalMRR, setTotalMRR] = useState(0)
  const [streams, setStreams] = useState<RevenueStream[]>([])
  const target = 100000

  useEffect(() => {
    // Fetch sites to calculate MRR from actual data
    Promise.all([
      fetch("/api/sites").then((r) => r.json()).catch(() => []),
      fetch("/api/revenue").then((r) => r.json()).catch(() => []),
    ]).then(([sites, revenue]) => {
      const siteArr = Array.isArray(sites) ? sites : []
      const revArr = Array.isArray(revenue) ? revenue : []

      // Calculate MRR from sites
      const siteMRR = siteArr.reduce((sum: number, s: { monthlyRevenue?: number }) => sum + (s.monthlyRevenue || 0), 0)

      // Group revenue by stream/category
      const streamMap: Record<string, number> = { Agency: 0, AdSense: 0, "Lead Gen": 0, Affiliate: 0 }
      for (const s of siteArr) {
        const cat = (s as { category?: string }).category?.toLowerCase() || ""
        const rev = (s as { monthlyRevenue?: number }).monthlyRevenue || 0
        if (cat.includes("client") || cat.includes("agency")) streamMap.Agency += rev
        else if (cat.includes("adsense") || cat.includes("tool")) streamMap.AdSense += rev
        else if (cat.includes("lead")) streamMap["Lead Gen"] += rev
        else if (cat.includes("affiliate")) streamMap.Affiliate += rev
        else streamMap.AdSense += rev // default to AdSense for tool sites
      }

      // If no site data, try revenue API
      const finalMRR = siteMRR > 0 ? siteMRR : revArr.reduce((sum: number, r: { amount?: number }) => sum + (r.amount || 0), 0)
      setTotalMRR(finalMRR)

      const colors: Record<string, string> = { Agency: "bg-blue-400", AdSense: "bg-green-400", "Lead Gen": "bg-purple-400", Affiliate: "bg-yellow-400" }
      setStreams(Object.entries(streamMap).filter(([, v]) => v > 0).map(([name, amount]) => ({ name, amount, color: colors[name] || "bg-zinc-400" })))
    })
  }, [])

  const pct = (totalMRR / target) * 100
  const gap = target - totalMRR

  return (
    <div className="rounded-xl border border-white/[0.06] bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 p-5">
      <div className="flex items-baseline justify-between mb-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            Recurring Revenue
          </p>
          <p className="text-[28px] font-extrabold tracking-tight text-white">
            €{totalMRR.toLocaleString("nl-BE")}
          </p>
        </div>
        <span className="text-[12px] text-zinc-500">/ €100K</span>
      </div>

      {/* Progress bar */}
      <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden mb-2">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#F5911E] to-amber-400 transition-all duration-1000 relative"
          style={{ width: `${Math.max(pct, 2)}%` }}
        >
          <div className="absolute right-0 top-0 bottom-0 w-5 bg-gradient-to-r from-transparent to-white/30 animate-pulse" />
        </div>
      </div>

      <div className="flex justify-between text-[10px] text-zinc-500 mb-4">
        <span>{pct.toFixed(1)}%</span>
        <span>
          Gap: <span className="text-[#F5911E] font-semibold">€{gap.toLocaleString("nl-BE")}</span>
        </span>
      </div>

      {/* Streams */}
      <div className="space-y-1.5">
        {streams.map((s) => (
          <div key={s.name} className="flex items-center justify-between py-1">
            <span className="flex items-center gap-2 text-[11px] text-zinc-400">
              <span className={cn("h-[7px] w-[7px] rounded-full", s.color)} />
              {s.name}
            </span>
            <span className="text-[12px] font-semibold text-white tabular-nums">
              €{s.amount.toLocaleString("nl-BE")}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── NOW Section ───────────────────────────────────────────────
function NowSection() {
  const [items, setItems] = useState<NowItem[]>([])

  useEffect(() => {
    fetch("/api/now-items")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setItems(data.slice(0, 3))
      })
      .catch(() => {
        // Fallback data
        setItems([
          { id: "1", title: "Review 3 content items van INK", meta: "~20 min · INK wacht" },
          { id: "2", title: "Offerte tandarts Gent SEO pakket", meta: "Pipeline · €449/m" },
          { id: "3", title: "Beslissing: schoorsteenveger.be", meta: "RADAR + SPARK → build" },
        ])
      })
  }, [])

  return (
    <div className="rounded-xl border border-white/[0.06] bg-zinc-800/30 p-4">
      <h3 className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
        🎯 NOW — Focus vandaag
      </h3>
      <div className="space-y-0.5">
        {items.map((item, i) => (
          <div
            key={item.id}
            className="flex items-start gap-2.5 rounded-lg py-2 px-1 cursor-pointer transition-colors hover:bg-white/[0.03]"
          >
            <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md bg-[#F5911E]/15 text-[11px] font-bold text-[#F5911E]">
              {i + 1}
            </span>
            <div className="min-w-0">
              <p className="text-[12px] font-medium text-white leading-snug">
                {item.title}
              </p>
              <p className="text-[10px] text-zinc-500 mt-0.5">{item.meta}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Agent Pulse ───────────────────────────────────────────────
function AgentPulse() {
  const [pulseItems, setPulseItems] = useState<PulseItem[]>([])

  useEffect(() => {
    fetch("/api/agent-logs?limit=5")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setPulseItems(
            data.slice(0, 5).map((log: { source: string; action: string; payload: string; createdAt: string }) => ({
              agent: log.source?.toUpperCase() || "SYSTEM",
              emoji: agentEmoji(log.source),
              color: agentColor(log.source),
              text: typeof log.payload === "string" ? tryParseTitle(log.payload) : log.action,
              time: timeAgo(log.createdAt),
            }))
          )
        } else {
          setFallback()
        }
      })
      .catch(() => setFallback())

    function setFallback() {
      setPulseItems([
        { agent: "FORGE", emoji: "🔨", color: "bg-green-500/15", text: "deploy klaar: collectpro v2.3", time: "45 min" },
        { agent: "INK", emoji: "✒️", color: "bg-purple-500/15", text: "content klaar: airfryer tips", time: "2u" },
        { agent: "RADAR", emoji: "📡", color: "bg-blue-500/15", text: "domeinkans: schoorsteenveger.be", time: "3u" },
        { agent: "SPARK", emoji: "⚡", color: "bg-[#F5911E]/15", text: "idee gescoord: SEO SaaS (8.2)", time: "5u" },
      ])
    }
  }, [])

  return (
    <div className="rounded-xl border border-white/[0.06] bg-zinc-800/30 p-4">
      <h3 className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
        <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
        Agent Pulse
      </h3>
      <div className="space-y-0.5">
        {pulseItems.map((item, i) => (
          <div key={i} className="flex gap-2.5 py-1.5">
            <span
              className={cn(
                "flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-md text-[11px]",
                item.color
              )}
            >
              {item.emoji}
            </span>
            <div className="min-w-0">
              <p className="text-[11px] text-zinc-400 leading-snug">
                <strong className="text-white font-semibold">{item.agent}</strong>{" "}
                {item.text}
              </p>
              <p className="text-[10px] text-zinc-600 mt-0.5">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Helpers ───────────────────────────────────────────────────
function agentEmoji(name: string) {
  const map: Record<string, string> = {
    atlas: "🗺️", forge: "🔨", radar: "📡", ink: "✒️", ledger: "📊", spark: "⚡", cowork: "🧠", system: "⚙️",
  }
  return map[name?.toLowerCase()] || "🤖"
}

function agentColor(name: string) {
  const map: Record<string, string> = {
    atlas: "bg-blue-500/15", forge: "bg-green-500/15", radar: "bg-blue-500/15",
    ink: "bg-purple-500/15", ledger: "bg-yellow-500/15", spark: "bg-[#F5911E]/15",
  }
  return map[name?.toLowerCase()] || "bg-zinc-500/15"
}

function tryParseTitle(payload: string) {
  try {
    const obj = JSON.parse(payload)
    return obj.title || obj.message || obj.action || payload.slice(0, 60)
  } catch {
    return payload.slice(0, 60)
  }
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins} min`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}u`
  return `${Math.floor(hours / 24)}d`
}

// ─── Export ────────────────────────────────────────────────────
export function NerveRightPanel() {
  return (
    <aside className="hidden xl:flex w-[340px] shrink-0 flex-col gap-5 overflow-y-auto border-l border-white/[0.06] bg-zinc-900/60 p-5 scrollbar-thin">
      <RevenueTracker />
      <AgentPulse />
    </aside>
  )
}
