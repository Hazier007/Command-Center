"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

// ─── Types ─────────────────────────────────────────────────────
interface Position {
  id: string; coin: string; market: string
  totalAmount: number; avgBuyPrice: number; highestPrice: number
  currentPrice: number; currentValue: number
  pnlEur: number; pnlPct: number
  status: string; dcaStep: number
  soldAt?: number; soldAmount?: number
  lastTickAt?: string
}

interface BotConfig {
  id: string; coin: string; market: string; active: boolean
  trailingPct: number; dcaSteps: number; dcaStepPct: number
  dcaStepWeight: number; coreHoldPct: number; tradePct: number
  targetAlloc?: number
}

interface Trade {
  id: string; coin: string; side: string; type: string
  amount: number; price: number; totalEur: number
  reason?: string; status: string; createdAt: string
}

interface Snapshot {
  id: string; totalValue: number; totalPnlEur: number; totalPnlPct: number
  cashBalance: number; fearGreed?: number; btcDominance?: number
  createdAt: string
}

// ─── Coin colors ───────────────────────────────────────────────
const coinColors: Record<string, { bg: string; text: string; icon: string }> = {
  BTC: { bg: "bg-orange-500/15", text: "text-orange-400", icon: "₿" },
  ETH: { bg: "bg-blue-500/15", text: "text-blue-400", icon: "Ξ" },
  SOL: { bg: "bg-purple-500/15", text: "text-purple-400", icon: "◎" },
  XRP: { bg: "bg-cyan-500/15", text: "text-cyan-400", icon: "✕" },
  ADA: { bg: "bg-blue-400/15", text: "text-blue-300", icon: "₳" },
  TAO: { bg: "bg-green-500/15", text: "text-green-400", icon: "τ" },
  RENDER: { bg: "bg-pink-500/15", text: "text-pink-400", icon: "◆" },
}
const defaultCoin = { bg: "bg-zinc-500/15", text: "text-zinc-400", icon: "●" }

// ─── Status badges ─────────────────────────────────────────────
const statusConfig: Record<string, { label: string; color: string }> = {
  holding: { label: "Holding", color: "bg-green-500/15 text-green-400" },
  trailing: { label: "Trailing", color: "bg-yellow-500/15 text-yellow-400" },
  sold: { label: "Verkocht", color: "bg-red-500/15 text-red-400" },
  dca_rebuy: { label: "DCA Herinkoop", color: "bg-cyan-500/15 text-cyan-400" },
  profit_take: { label: "Profit Take", color: "bg-emerald-500/15 text-emerald-400" },
  rebalance: { label: "Rebalance", color: "bg-purple-500/15 text-purple-400" },
}

// ─── Page ──────────────────────────────────────────────────────
export default function CryptoPage() {
  const [positions, setPositions] = useState<Position[]>([])
  const [configs, setConfigs] = useState<BotConfig[]>([])
  const [trades, setTrades] = useState<Trade[]>([])
  const [snapshots, setSnapshots] = useState<Snapshot[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<"portfolio" | "trades" | "config">("portfolio")
  const [ticking, setTicking] = useState(false)
  const [tickResult, setTickResult] = useState<string | null>(null)
  const [selectedCoin, setSelectedCoin] = useState<string | null>(null)
  const [buyModal, setBuyModal] = useState<{ coin: string; market: string } | null>(null)
  const [buyAmount, setBuyAmount] = useState("")
  const [buying, setBuying] = useState(false)
  const [buyResult, setBuyResult] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  function loadData() {
    Promise.all([
      fetch("/api/bot/positions").then((r) => r.json()).catch(() => []),
      fetch("/api/bot/config").then((r) => r.json()).catch(() => []),
      fetch("/api/bot/trades?limit=30").then((r) => r.json()).catch(() => []),
      fetch("/api/bot/snapshots?limit=48").then((r) => r.json()).catch(() => []),
    ]).then(([p, c, t, s]) => {
      setPositions(Array.isArray(p) ? p : [])
      setConfigs(Array.isArray(c) ? c : [])
      setTrades(Array.isArray(t) ? t : [])
      setSnapshots(Array.isArray(s) ? s : [])
    }).finally(() => setLoading(false))
  }

  // Totals
  const totalValue = positions.reduce((s, p) => s + p.currentValue, 0)
  const totalCost = positions.reduce((s, p) => s + p.avgBuyPrice * p.totalAmount, 0)
  const totalPnlEur = totalValue - totalCost
  const totalPnlPct = totalCost > 0 ? (totalPnlEur / totalCost) * 100 : 0

  // Manual tick
  async function runTick() {
    setTicking(true)
    setTickResult(null)
    try {
      const res = await fetch("/api/bot/tick", { method: "POST" })
      const data = await res.json()
      setTickResult(data.results?.map((r: { coin: string; action: string; detail?: string; layers?: string[] }) =>
        `${r.coin}: ${r.action}${r.detail ? ` — ${r.detail}` : ""}${r.layers?.length ? `\n  └ ${r.layers.join(" | ")}` : ""}`
      ).join("\n") || "Geen resultaten")
      loadData()
    } catch { setTickResult("Error bij tick") }
    setTicking(false)
  }

  // Sync met Bitvavo
  const [syncing, setSyncing] = useState(false)
  async function syncPositions() {
    setSyncing(true)
    setTickResult(null)
    try {
      const res = await fetch("/api/bot/sync", { method: "POST" })
      const data = await res.json()
      if (data.success) {
        setTickResult(data.results?.map((r: { coin: string; detail: string }) => `${r.coin}: ${r.detail}`).join("\n") || "Sync voltooid")
        loadData()
      } else {
        setTickResult(`❌ ${data.error}`)
      }
    } catch { setTickResult("❌ Sync fout") }
    setSyncing(false)
  }

  // Initial buy
  async function handleBuy() {
    if (!buyModal || !buyAmount) return
    const eur = parseFloat(buyAmount)
    if (isNaN(eur) || eur < 5) { setBuyResult("Minimum €5"); return }
    setBuying(true)
    setBuyResult(null)
    try {
      const res = await fetch("/api/bot/buy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coin: buyModal.coin, amountEur: eur }),
      })
      const data = await res.json()
      if (data.success) {
        setBuyResult(`✅ ${data.filled.toFixed(6)} ${buyModal.coin} gekocht @ €${data.price.toFixed(2)}`)
        loadData()
        setTimeout(() => { setBuyModal(null); setBuyResult(null); setBuyAmount("") }, 3000)
      } else {
        setBuyResult(`❌ ${data.error}`)
      }
    } catch { setBuyResult("❌ Fout bij aankoop") }
    setBuying(false)
  }

  // Rebalance
  const [rebalancing, setRebalancing] = useState(false)
  async function runRebalance() {
    setRebalancing(true)
    setTickResult(null)
    try {
      const res = await fetch("/api/bot/rebalance", { method: "POST" })
      const data = await res.json()
      if (data.success) {
        setTickResult(data.results?.map((r: { coin: string; action: string; detail?: string }) =>
          `${r.coin}: ${r.action}${r.detail ? ` — ${r.detail}` : ""}`
        ).join("\n") || "Rebalance voltooid — geen aanpassingen nodig")
        loadData()
      } else {
        setTickResult(`❌ ${data.error}`)
      }
    } catch { setTickResult("❌ Rebalance fout") }
    setRebalancing(false)
  }

  // Config helpers
  const configForCoin = (coin: string) => configs.find((c) => c.coin === coin)

  // Fear & Greed uit laatste snapshot
  const latestFg = snapshots.length > 0 ? (snapshots[0] as Snapshot & { fearGreed?: number }).fearGreed : null
  const fgColor = latestFg !== null && latestFg !== undefined
    ? latestFg > 75 ? "text-green-400" : latestFg > 55 ? "text-lime-400" : latestFg > 40 ? "text-yellow-400" : latestFg > 20 ? "text-orange-400" : "text-red-400"
    : "text-zinc-500"
  const fgLabel = latestFg !== null && latestFg !== undefined
    ? latestFg > 75 ? "Extreme Greed" : latestFg > 55 ? "Greed" : latestFg > 40 ? "Neutral" : latestFg > 20 ? "Fear" : "Extreme Fear"
    : "—"

  const tabs = [
    { id: "portfolio" as const, label: "💰 Portfolio", count: positions.length },
    { id: "trades" as const, label: "📊 Trades", count: trades.length },
    { id: "config" as const, label: "⚙️ Config", count: configs.length },
  ]

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[26px] font-extrabold tracking-tight text-white">₿ Crypto Bot</h1>
          <p className="text-[13px] text-zinc-500">
            Trailing stop + DCA herinkoop · Bitvavo
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={syncPositions}
            disabled={syncing}
            className="rounded-lg bg-blue-500/15 px-4 py-2 text-[11px] font-bold text-blue-400 hover:bg-blue-500/25 transition-colors disabled:opacity-40"
          >
            {syncing ? "⏳ Syncing..." : "🔄 Sync"}
          </button>
          <button
            onClick={runRebalance}
            disabled={rebalancing}
            className="rounded-lg bg-purple-500/15 px-4 py-2 text-[11px] font-bold text-purple-400 hover:bg-purple-500/25 transition-colors disabled:opacity-40"
          >
            {rebalancing ? "⏳ ..." : "⚖️ Rebalance"}
          </button>
          <button
            onClick={runTick}
            disabled={ticking}
            className="rounded-lg bg-[#F5911E]/15 px-4 py-2 text-[11px] font-bold text-[#F5911E] hover:bg-[#F5911E]/25 transition-colors disabled:opacity-40"
          >
            {ticking ? "⏳ Bezig..." : "▶ Run Tick"}
          </button>
        </div>
      </div>

      {/* Tick result toast */}
      {tickResult && (
        <div className="rounded-lg border border-[#F5911E]/20 bg-[#F5911E]/5 p-3">
          <pre className="text-[11px] text-[#F5911E] whitespace-pre-wrap">{tickResult}</pre>
          <button onClick={() => setTickResult(null)} className="text-[10px] text-zinc-500 mt-1 hover:text-white">Sluiten</button>
        </div>
      )}

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-3">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-800/30 p-4">
          <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">Portfolio waarde</p>
          <p className="text-[26px] font-extrabold tracking-tight text-white mt-1 tabular-nums">
            {loading ? "..." : `€${totalValue.toLocaleString("nl-BE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          </p>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-zinc-800/30 p-4">
          <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">P&L</p>
          <p className={cn("text-[26px] font-extrabold tracking-tight mt-1 tabular-nums", totalPnlEur >= 0 ? "text-green-400" : "text-red-400")}>
            {loading ? "..." : `${totalPnlEur >= 0 ? "+" : ""}€${totalPnlEur.toLocaleString("nl-BE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          </p>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-zinc-800/30 p-4">
          <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">P&L %</p>
          <p className={cn("text-[26px] font-extrabold tracking-tight mt-1 tabular-nums", totalPnlPct >= 0 ? "text-green-400" : "text-red-400")}>
            {loading ? "..." : `${totalPnlPct >= 0 ? "+" : ""}${totalPnlPct.toFixed(1)}%`}
          </p>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-zinc-800/30 p-4">
          <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">Fear & Greed</p>
          <p className={cn("text-[26px] font-extrabold tracking-tight mt-1 tabular-nums", fgColor)}>
            {loading ? "..." : latestFg ?? "—"}
          </p>
          <p className={cn("text-[10px] font-semibold mt-0.5", fgColor)}>{fgLabel}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-0.5 rounded-lg border border-white/[0.06] bg-zinc-800/30 p-1 w-fit">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "rounded-md px-4 py-1.5 text-[11px] font-medium transition-colors flex items-center gap-2",
              tab === t.id ? "bg-zinc-700 text-white" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            {t.label}
            {t.count > 0 && (
              <span className={cn("rounded-full px-1.5 py-0.5 text-[8px] font-bold", tab === t.id ? "bg-zinc-600 text-zinc-200" : "bg-zinc-700/50 text-zinc-500")}>
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ───── PORTFOLIO TAB ───── */}
      {tab === "portfolio" && (
        <div className="space-y-3">
          {positions.length > 0 ? positions.map((pos) => {
            const cc = coinColors[pos.coin] || defaultCoin
            const cfg = configForCoin(pos.coin)
            const st = statusConfig[pos.status] || statusConfig.holding
            const alloc = totalValue > 0 ? (pos.currentValue / totalValue) * 100 : 0
            const stopPrice = pos.highestPrice * (1 - (cfg?.trailingPct || 0.15))
            const distToStop = pos.currentPrice > 0 ? ((pos.currentPrice - stopPrice) / pos.currentPrice) * 100 : 0

            return (
              <div
                key={pos.id}
                onClick={() => setSelectedCoin(selectedCoin === pos.coin ? null : pos.coin)}
                className={cn(
                  "rounded-xl border bg-zinc-800/30 p-4 cursor-pointer transition-all",
                  selectedCoin === pos.coin ? "border-[#F5911E]/30" : "border-white/[0.06] hover:border-white/[0.1]"
                )}
              >
                {/* Main row */}
                <div className="flex items-center gap-4">
                  <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[18px] font-bold", cc.bg, cc.text)}>
                    {cc.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-bold text-white">{pos.coin}</span>
                      <span className={cn("rounded px-1.5 py-0.5 text-[8px] font-bold uppercase", st.color)}>{st.label}</span>
                      {cfg?.active && <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />}
                    </div>
                    <p className="text-[10px] text-zinc-500">{pos.totalAmount.toFixed(6)} · gem. €{pos.avgBuyPrice.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[14px] font-bold text-white tabular-nums">€{pos.currentValue.toLocaleString("nl-BE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    <p className={cn("text-[11px] font-semibold tabular-nums", pos.pnlPct >= 0 ? "text-green-400" : "text-red-400")}>
                      {pos.pnlPct >= 0 ? "+" : ""}{pos.pnlPct.toFixed(1)}% · {pos.pnlEur >= 0 ? "+" : ""}€{pos.pnlEur.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right w-16">
                    <p className="text-[11px] font-bold text-zinc-300 tabular-nums">{alloc.toFixed(1)}%</p>
                    <div className="h-1.5 w-full rounded-full bg-zinc-700 mt-1 overflow-hidden">
                      <div className={cn("h-full rounded-full", cc.bg.replace("/15", ""))} style={{ width: `${Math.min(alloc, 100)}%` }} />
                    </div>
                  </div>
                </div>

                {/* Expanded detail */}
                {selectedCoin === pos.coin && (
                  <div className="mt-4 pt-4 border-t border-white/[0.06] grid grid-cols-4 gap-3">
                    <div className="rounded-lg bg-zinc-800/50 p-2.5">
                      <p className="text-[9px] uppercase text-zinc-500">Huidige prijs</p>
                      <p className="text-[12px] font-bold text-white tabular-nums">€{pos.currentPrice.toLocaleString("nl-BE", { minimumFractionDigits: 2 })}</p>
                    </div>
                    <div className="rounded-lg bg-zinc-800/50 p-2.5">
                      <p className="text-[9px] uppercase text-zinc-500">Hoogste prijs</p>
                      <p className="text-[12px] font-bold text-white tabular-nums">€{pos.highestPrice.toLocaleString("nl-BE", { minimumFractionDigits: 2 })}</p>
                    </div>
                    <div className="rounded-lg bg-zinc-800/50 p-2.5">
                      <p className="text-[9px] uppercase text-zinc-500">Stop prijs</p>
                      <p className="text-[12px] font-bold text-yellow-400 tabular-nums">€{stopPrice.toLocaleString("nl-BE", { minimumFractionDigits: 2 })}</p>
                    </div>
                    <div className="rounded-lg bg-zinc-800/50 p-2.5">
                      <p className="text-[9px] uppercase text-zinc-500">Afstand tot stop</p>
                      <p className={cn("text-[12px] font-bold tabular-nums", distToStop > 10 ? "text-green-400" : distToStop > 5 ? "text-yellow-400" : "text-red-400")}>
                        {distToStop.toFixed(1)}%
                      </p>
                    </div>
                    {cfg && (
                      <>
                        <div className="rounded-lg bg-zinc-800/50 p-2.5">
                          <p className="text-[9px] uppercase text-zinc-500">Trailing %</p>
                          <p className="text-[12px] font-bold text-white">{(cfg.trailingPct * 100).toFixed(0)}%</p>
                        </div>
                        <div className="rounded-lg bg-zinc-800/50 p-2.5">
                          <p className="text-[9px] uppercase text-zinc-500">Core / Trade</p>
                          <p className="text-[12px] font-bold text-white">{(cfg.coreHoldPct * 100).toFixed(0)}% / {(cfg.tradePct * 100).toFixed(0)}%</p>
                        </div>
                        <div className="rounded-lg bg-zinc-800/50 p-2.5">
                          <p className="text-[9px] uppercase text-zinc-500">DCA stappen</p>
                          <p className="text-[12px] font-bold text-white">{pos.dcaStep}/{cfg.dcaSteps}</p>
                        </div>
                        <div className="rounded-lg bg-zinc-800/50 p-2.5">
                          <p className="text-[9px] uppercase text-zinc-500">Laatste tick</p>
                          <p className="text-[12px] font-bold text-white">{pos.lastTickAt ? new Date(pos.lastTickAt).toLocaleTimeString("nl-BE") : "—"}</p>
                        </div>
                      </>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); setBuyModal({ coin: pos.coin, market: pos.market }); setBuyAmount(""); setBuyResult(null) }}
                      className="col-span-4 rounded-lg bg-green-500/15 px-3 py-2 text-[11px] font-bold text-green-400 hover:bg-green-500/25 transition-colors"
                    >
                      + Bijkopen {pos.coin}
                    </button>
                  </div>
                )}
              </div>
            )
          }) : (
            <div className="rounded-xl border border-white/[0.06] bg-zinc-800/20 p-8 text-center">
              <p className="text-[14px] text-zinc-400 mb-2">Geen posities gevonden</p>
              <p className="text-[11px] text-zinc-600 mb-4">Voeg je Bitvavo API key toe als environment variable en configureer je coins onder Config.</p>
              <button onClick={() => setTab("config")} className="rounded-lg bg-[#F5911E]/15 px-4 py-2 text-[11px] font-bold text-[#F5911E]">
                → Ga naar Config
              </button>
            </div>
          )}
        </div>
      )}

      {/* ───── TRADES TAB ───── */}
      {tab === "trades" && (
        <div className="rounded-xl border border-white/[0.06] bg-zinc-800/20 overflow-hidden">
          <div className="grid grid-cols-[80px_60px_100px_1fr_90px_80px] gap-3 px-4 py-2.5 border-b border-white/[0.06] text-[9px] font-bold uppercase tracking-wider text-zinc-500">
            <span>Tijd</span><span>Coin</span><span>Type</span><span>Reden</span><span>Bedrag</span><span>Prijs</span>
          </div>
          <div className="divide-y divide-white/[0.04] max-h-[60vh] overflow-y-auto">
            {trades.length > 0 ? trades.map((trade) => {
              const cc = coinColors[trade.coin] || defaultCoin
              return (
                <div key={trade.id} className="grid grid-cols-[80px_60px_100px_1fr_90px_80px] gap-3 px-4 py-3 items-center hover:bg-zinc-800/40">
                  <span className="text-[10px] text-zinc-500">{new Date(trade.createdAt).toLocaleString("nl-BE", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}</span>
                  <span className={cn("rounded px-1.5 py-0.5 text-[9px] font-bold text-center", cc.bg, cc.text)}>{trade.coin}</span>
                  <div className="flex items-center gap-1">
                    <span className={cn("rounded px-1.5 py-0.5 text-[8px] font-bold uppercase", trade.side === "buy" ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-400")}>{trade.side}</span>
                    <span className="text-[9px] text-zinc-500">{trade.type.replace("_", " ")}</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 truncate">{trade.reason || "—"}</p>
                  <span className="text-[11px] font-bold text-white tabular-nums text-right">€{trade.totalEur.toFixed(2)}</span>
                  <span className="text-[10px] text-zinc-400 tabular-nums text-right">€{trade.price.toFixed(2)}</span>
                </div>
              )
            }) : (
              <p className="text-center text-[11px] text-zinc-600 py-8">Nog geen trades uitgevoerd</p>
            )}
          </div>
        </div>
      )}

      {/* ───── BUY MODAL ───── */}
      {buyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setBuyModal(null)}>
          <div className="w-full max-w-sm rounded-2xl border border-white/[0.08] bg-zinc-900 p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-[16px] font-bold text-white mb-1">
              {(() => { const cc = coinColors[buyModal.coin] || defaultCoin; return <span className={cc.text}>{cc.icon}</span> })()}
              {" "}Koop {buyModal.coin}
            </h3>
            <p className="text-[11px] text-zinc-500 mb-4">Market order via Bitvavo · {buyModal.market}</p>

            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1 block">Bedrag in EUR</label>
            <div className="flex gap-2 mb-3">
              <input
                type="number"
                min={5}
                step={5}
                value={buyAmount}
                onChange={(e) => setBuyAmount(e.target.value)}
                placeholder="bijv. 100"
                className="flex-1 rounded-lg border border-white/[0.1] bg-zinc-800 px-3 py-2 text-[14px] font-bold text-white placeholder-zinc-600 focus:border-green-500/50 focus:outline-none"
                autoFocus
              />
              <span className="flex items-center text-[14px] font-bold text-zinc-500">EUR</span>
            </div>

            <div className="flex gap-2 mb-4">
              {[25, 50, 100, 250, 500].map((v) => (
                <button
                  key={v}
                  onClick={() => setBuyAmount(String(v))}
                  className={cn("rounded-md px-2.5 py-1 text-[10px] font-bold transition-colors",
                    buyAmount === String(v) ? "bg-green-500/20 text-green-400" : "bg-zinc-800 text-zinc-500 hover:text-white"
                  )}
                >
                  €{v}
                </button>
              ))}
            </div>

            {buyResult && (
              <p className={cn("text-[11px] font-semibold mb-3 p-2 rounded-lg",
                buyResult.startsWith("✅") ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
              )}>{buyResult}</p>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => setBuyModal(null)}
                className="flex-1 rounded-lg bg-zinc-800 px-4 py-2.5 text-[11px] font-bold text-zinc-400 hover:text-white transition-colors"
              >
                Annuleren
              </button>
              <button
                onClick={handleBuy}
                disabled={buying || !buyAmount}
                className="flex-1 rounded-lg bg-green-500/20 px-4 py-2.5 text-[11px] font-bold text-green-400 hover:bg-green-500/30 transition-colors disabled:opacity-40"
              >
                {buying ? "⏳ Kopen..." : `Koop ${buyModal.coin}`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ───── CONFIG TAB ───── */}
      {tab === "config" && (
        <div className="space-y-4">
          <div className="rounded-xl border border-[#F5911E]/20 bg-[#F5911E]/5 p-4">
            <p className="text-[12px] text-[#F5911E] font-semibold mb-1">⚠️ Setup vereist</p>
            <p className="text-[11px] text-zinc-400">
              Voeg <code className="text-white bg-zinc-800 px-1 rounded">BITVAVO_API_KEY</code> en <code className="text-white bg-zinc-800 px-1 rounded">BITVAVO_API_SECRET</code> toe als environment variables in Vercel.
              Maak een API key aan op <span className="text-white">bitvavo.com → Instellingen → API</span>.
            </p>
          </div>

          {/* Config cards */}
          <div className="grid grid-cols-2 gap-3">
            {configs.length > 0 ? configs.map((cfg) => {
              const cc = coinColors[cfg.coin] || defaultCoin
              return (
                <div key={cfg.id} className={cn("rounded-xl border bg-zinc-800/30 p-4", cfg.active ? "border-green-500/20" : "border-white/[0.06] opacity-50")}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className={cn("flex h-8 w-8 items-center justify-center rounded-lg text-[14px] font-bold", cc.bg, cc.text)}>{cc.icon}</span>
                      <span className="text-[14px] font-bold text-white">{cfg.coin}</span>
                    </div>
                    <span className={cn("rounded px-2 py-0.5 text-[9px] font-bold", cfg.active ? "bg-green-500/15 text-green-400" : "bg-zinc-700 text-zinc-500")}>
                      {cfg.active ? "Actief" : "Uit"}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-[10px]">
                    <div><span className="text-zinc-500">Trailing:</span> <span className="text-white font-semibold">{(cfg.trailingPct * 100).toFixed(0)}%</span></div>
                    <div><span className="text-zinc-500">DCA stappen:</span> <span className="text-white font-semibold">{cfg.dcaSteps}</span></div>
                    <div><span className="text-zinc-500">DCA stap %:</span> <span className="text-white font-semibold">{(cfg.dcaStepPct * 100).toFixed(0)}%</span></div>
                    <div><span className="text-zinc-500">Core:</span> <span className="text-white font-semibold">{(cfg.coreHoldPct * 100).toFixed(0)}%</span></div>
                    <div><span className="text-zinc-500">Trade:</span> <span className="text-white font-semibold">{(cfg.tradePct * 100).toFixed(0)}%</span></div>
                    <div><span className="text-zinc-500">Doel alloc:</span> <span className="text-white font-semibold">{cfg.targetAlloc ? `${cfg.targetAlloc}%` : "—"}</span></div>
                  </div>
                  <button
                    onClick={() => { setBuyModal({ coin: cfg.coin, market: cfg.market }); setBuyAmount(""); setBuyResult(null) }}
                    className="mt-3 w-full rounded-lg bg-green-500/10 px-3 py-1.5 text-[10px] font-bold text-green-400 hover:bg-green-500/20 transition-colors"
                  >
                    + Koop {cfg.coin}
                  </button>
                </div>
              )
            }) : (
              <div className="col-span-2 rounded-xl border border-white/[0.06] bg-zinc-800/20 p-8 text-center">
                <p className="text-[12px] text-zinc-400 mb-2">Geen coins geconfigureerd</p>
                <p className="text-[11px] text-zinc-600">Na het toevoegen van je API key, configureer je coins via de API of vanuit Cowork.</p>
              </div>
            )}
          </div>

          {/* Suggested config from chat */}
          <div className="rounded-xl border border-white/[0.06] bg-zinc-800/20 p-4">
            <h3 className="text-[12px] font-bold text-white mb-3">📋 Aanbevolen configuratie</h3>
            <div className="grid grid-cols-5 gap-2 text-[10px]">
              <div className="font-bold text-zinc-500 uppercase">Coin</div>
              <div className="font-bold text-zinc-500 uppercase">Trailing %</div>
              <div className="font-bold text-zinc-500 uppercase">DCA stappen</div>
              <div className="font-bold text-zinc-500 uppercase">Alloc %</div>
              <div className="font-bold text-zinc-500 uppercase">Status</div>
              {[
                { coin: "BTC", trailing: "12%", dca: "4 (elke -4%)", alloc: "29%" },
                { coin: "ETH", trailing: "15%", dca: "4 (elke -5%)", alloc: "13%" },
                { coin: "SOL", trailing: "20%", dca: "4 (elke -6%)", alloc: "15%" },
                { coin: "XRP", trailing: "15%", dca: "4 (elke -5%)", alloc: "28%" },
                { coin: "ADA", trailing: "20%", dca: "4 (elke -6%)", alloc: "9%" },
                { coin: "TAO", trailing: "25%", dca: "4 (elke -8%)", alloc: "4%" },
                { coin: "RENDER", trailing: "25%", dca: "4 (elke -8%)", alloc: "2%" },
              ].map((r) => {
                const active = configs.some((c) => c.coin === r.coin && c.active)
                return [
                  <div key={`${r.coin}-c`} className="text-white font-semibold">{r.coin}</div>,
                  <div key={`${r.coin}-t`} className="text-zinc-400">{r.trailing}</div>,
                  <div key={`${r.coin}-d`} className="text-zinc-400">{r.dca}</div>,
                  <div key={`${r.coin}-a`} className="text-zinc-400">{r.alloc}</div>,
                  <div key={`${r.coin}-s`} className={active ? "text-green-400" : "text-zinc-600"}>{active ? "✓ Actief" : "Niet geconfigureerd"}</div>,
                ]
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
