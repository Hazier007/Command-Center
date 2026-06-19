"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { AlertTriangle, ArrowRight, Building2, CheckCircle2, CircleDollarSign, Database, Filter, RadioTower, Search, ShieldAlert, Target, Users } from "lucide-react"

import type { PortfolioAsset, PortfolioBusiness, PortfolioPriority, PortfolioStatus } from "@/lib/portfolio-assets"
import { portfolioAssets, summarizeAssets } from "@/lib/portfolio-assets"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const businessLabels: Record<PortfolioBusiness | "all", string> = {
  all: "Alle businessen",
  locallead: "LocalLead",
  hazier: "Hazier",
  calqo: "Calqo",
  collectpro: "CollectPro",
  "infinite-events": "Infinite Events",
}

const businessRoutes: Partial<Record<PortfolioBusiness, string>> = {
  locallead: "/locallead",
  hazier: "/hazier",
  calqo: "/calqo",
  "infinite-events": "/infinite-events",
}

const priorityRank: Record<PortfolioPriority, number> = {
  P1: 0,
  P2: 1,
  Core: 2,
  P3: 3,
  Watch: 4,
  Blocked: 5,
  Backlog: 6,
}

const priorityClass: Record<PortfolioPriority, string> = {
  P1: "border-[#F5911E]/30 bg-[#F5911E]/15 text-[#F5911E]",
  P2: "border-sky-500/30 bg-sky-500/15 text-sky-300",
  P3: "border-violet-500/30 bg-violet-500/15 text-violet-300",
  Core: "border-emerald-500/30 bg-emerald-500/15 text-emerald-300",
  Watch: "border-zinc-500/30 bg-zinc-500/15 text-zinc-300",
  Backlog: "border-zinc-600/30 bg-zinc-600/15 text-zinc-400",
  Blocked: "border-red-500/30 bg-red-500/15 text-red-300",
}

const statusClass: Record<PortfolioStatus, string> = {
  live: "text-emerald-300",
  planned: "text-zinc-400",
  blocked: "text-red-300",
  watch: "text-zinc-300",
  "needs-check": "text-amber-300",
}

const signalClass: Record<string, string> = {
  proven: "text-emerald-300",
  healthy: "text-emerald-300",
  signed: "text-emerald-300",
  shortlist: "text-sky-300",
  talking: "text-sky-300",
  limited: "text-amber-300",
  unproven: "text-amber-300",
  unknown: "text-zinc-400",
  missing: "text-red-300",
  zero: "text-red-300",
  none: "text-red-300",
  "not-needed": "text-zinc-500",
}

function normalizeSignal(value: string) {
  return value.replace("not-needed", "n.v.t.").replace("unproven", "onbewezen")
}

function hasException(asset: PortfolioAsset) {
  return asset.status === "blocked" || asset.status === "needs-check" || asset.leadflowStatus === "missing" || asset.indexationStatus === "zero" || asset.partnerStatus === "none"
}

function getBusinessSummary(assets: PortfolioAsset[]) {
  return (Object.keys(businessLabels).filter((key) => key !== "all") as PortfolioBusiness[])
    .map((business) => {
      const scoped = assets.filter((asset) => asset.business === business)
      const summary = summarizeAssets(scoped)
      return { business, scoped, summary }
    })
    .filter((item) => item.scoped.length > 0)
}

export function PortfolioCommandRoom() {
  const [business, setBusiness] = useState<PortfolioBusiness | "all">("all")
  const [priority, setPriority] = useState<PortfolioPriority | "all">("all")
  const [status, setStatus] = useState<PortfolioStatus | "all">("all")
  const [query, setQuery] = useState("")

  const filteredAssets = useMemo(() => {
    const q = query.trim().toLowerCase()
    return portfolioAssets
      .filter((asset) => business === "all" || asset.business === business)
      .filter((asset) => priority === "all" || asset.priority === priority)
      .filter((asset) => status === "all" || asset.status === status)
      .filter((asset) => {
        if (!q) return true
        return [asset.domain, asset.assetType, asset.monetization, asset.nextSafeAction, asset.business, asset.priority, asset.status]
          .join(" ")
          .toLowerCase()
          .includes(q)
      })
      .sort((a, b) => priorityRank[a.priority] - priorityRank[b.priority] || a.business.localeCompare(b.business) || a.domain.localeCompare(b.domain))
  }, [business, priority, query, status])

  const allSummary = summarizeAssets(portfolioAssets)
  const filteredSummary = summarizeAssets(filteredAssets)
  const exceptions = filteredAssets.filter(hasException)
  const businessSummary = getBusinessSummary(portfolioAssets)
  const p1Assets = portfolioAssets.filter((asset) => asset.priority === "P1")

  return (
    <main className="space-y-6 text-white">
      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(245,145,30,0.25),_transparent_30rem),linear-gradient(135deg,_rgba(24,24,27,0.98),_rgba(7,7,10,1))] p-6 shadow-2xl lg:p-8">
        <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Badge className="border-[#F5911E]/25 bg-[#F5911E]/15 text-[#F5911E]">Portfolio command room</Badge>
            <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight md:text-6xl">Alle assets, prioriteiten en geldblokkades in één scherm.</h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-300 md:text-lg">
              Dit is de centrale assetkamer voor Command Center: welke sites/tools/business-assets leven, wat kan geld opleveren, waar ontbreekt leadflow of partnerbewijs, en wat is de eerstvolgende veilige actie.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="bg-[#F5911E] text-white hover:bg-[#d97809]"><Link href="/locallead">Open LocalLead uitvoering</Link></Button>
              <Button asChild variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10"><Link href="/">Terug naar cockpit</Link></Button>
            </div>
          </div>

          <Card className="border-white/10 bg-black/25 text-white shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Database className="h-5 w-5 text-[#F5911E]" /> Portfolio snapshot</CardTitle>
              <CardDescription className="text-zinc-400">Gestructureerde CC assetdata, klaar om later naar DB/API te verhuizen.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              {[
                ["Assets", allSummary.total],
                ["Live", allSummary.live],
                ["P1", allSummary.p1],
                ["Blocked", allSummary.blocked],
                ["Leadflow gap", allSummary.unprovenLeadflow],
                ["Geen partner", allSummary.noPartner],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="text-3xl font-black">{value}</div>
                  <div className="text-xs uppercase tracking-wide text-zinc-500">{label}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-4">
        {businessSummary.map(({ business: unit, summary }) => (
          <Card key={unit} className="border-white/10 bg-zinc-900/75 text-white shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center justify-between gap-2 text-lg">
                {businessLabels[unit]}
                {businessRoutes[unit] ? <Link href={businessRoutes[unit]} className="text-xs text-[#F5911E]">Open</Link> : null}
              </CardTitle>
              <CardDescription className="text-zinc-400">{summary.total} assets · {summary.live} live</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-2 text-center text-sm">
              <div className="rounded-xl bg-white/[0.04] p-3"><div className="font-black text-[#F5911E]">{summary.p1}</div><div className="text-[10px] text-zinc-500">P1</div></div>
              <div className="rounded-xl bg-white/[0.04] p-3"><div className="font-black text-amber-300">{summary.unprovenLeadflow}</div><div className="text-[10px] text-zinc-500">leadflow</div></div>
              <div className="rounded-xl bg-white/[0.04] p-3"><div className="font-black text-red-300">{summary.blocked}</div><div className="text-[10px] text-zinc-500">blocked</div></div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
        <Card className="border-amber-500/20 bg-amber-500/[0.06] text-white shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ShieldAlert className="h-5 w-5 text-amber-300" /> Vandaag bewaken</CardTitle>
            <CardDescription className="text-amber-100/80">De korte command-lijst: niet alles doen, wel de geldblokkades zichtbaar houden.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {p1Assets.slice(0, 4).map((asset) => (
              <div key={asset.domain} className="rounded-2xl border border-amber-500/20 bg-black/20 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="font-black">{asset.domain}</div>
                  <Badge className={priorityClass[asset.priority]}>{asset.priority}</Badge>
                </div>
                <p className="mt-2 text-sm leading-6 text-amber-50/90">{asset.nextSafeAction}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-zinc-900/75 text-white shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-red-300" /> Exceptions</CardTitle>
            <CardDescription className="text-zinc-400">Assets met technische blokkade, ontbrekende leadflow, nul-indexatie of geen partner.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            {exceptions.slice(0, 6).map((asset) => (
              <div key={`${asset.business}-${asset.domain}`} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="font-black">{asset.domain}</div>
                    <div className="text-xs text-zinc-500">{businessLabels[asset.business]} · {asset.status}</div>
                  </div>
                  <Badge className={priorityClass[asset.priority]}>{asset.priority}</Badge>
                </div>
                <p className="mt-2 text-sm leading-6 text-zinc-300">{asset.nextSafeAction}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <Card className="border-white/10 bg-zinc-900/75 text-white shadow-none">
        <CardHeader>
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <CardTitle className="flex items-center gap-2"><Filter className="h-5 w-5 text-[#F5911E]" /> Asset matrix</CardTitle>
              <CardDescription className="mt-1 text-zinc-400">Filterbaar overzicht per business, prioriteit, status en zoekterm.</CardDescription>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4 xl:min-w-[760px]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Zoek asset, actie, type..." className="border-white/10 bg-black/20 pl-9 text-white placeholder:text-zinc-600" />
              </div>
              <Select value={business} onValueChange={(value) => setBusiness(value as PortfolioBusiness | "all")}>
                <SelectTrigger className="border-white/10 bg-black/20 text-white"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(businessLabels).map(([value, label]) => <SelectItem key={value} value={value}>{label}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={priority} onValueChange={(value) => setPriority(value as PortfolioPriority | "all")}>
                <SelectTrigger className="border-white/10 bg-black/20 text-white"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {(["all", "P1", "P2", "P3", "Core", "Watch", "Blocked", "Backlog"] as const).map((value) => <SelectItem key={value} value={value}>{value === "all" ? "Alle prioriteiten" : value}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={status} onValueChange={(value) => setStatus(value as PortfolioStatus | "all")}>
                <SelectTrigger className="border-white/10 bg-black/20 text-white"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {(["all", "live", "planned", "blocked", "watch", "needs-check"] as const).map((value) => <SelectItem key={value} value={value}>{value === "all" ? "Alle statussen" : value}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-2 text-center sm:grid-cols-6">
            {[
              ["Resultaten", filteredSummary.total],
              ["Live", filteredSummary.live],
              ["P1", filteredSummary.p1],
              ["Blocked", filteredSummary.blocked],
              ["Leadflow gap", filteredSummary.unprovenLeadflow],
              ["Geen partner", filteredSummary.noPartner],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                <div className="text-xl font-black">{value}</div>
                <div className="text-[10px] uppercase tracking-wide text-zinc-500">{label}</div>
              </div>
            ))}
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10">
            <div className="hidden grid-cols-[1.2fr_0.8fr_0.5fr_0.55fr_0.7fr_0.7fr_0.7fr_1.6fr] gap-3 border-b border-white/10 bg-black/30 px-4 py-3 text-[10px] font-bold uppercase tracking-wide text-zinc-500 xl:grid">
              <span>Asset</span><span>Business</span><span>Prio</span><span>Status</span><span>Leadflow</span><span>Indexatie</span><span>Partner</span><span>Volgende actie</span>
            </div>
            <div className="divide-y divide-white/10">
              {filteredAssets.map((asset) => (
                <div key={`${asset.business}-${asset.domain}`} className="grid gap-3 px-4 py-4 xl:grid-cols-[1.2fr_0.8fr_0.5fr_0.55fr_0.7fr_0.7fr_0.7fr_1.6fr] xl:items-center">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="font-black">{asset.domain}</div>
                      {asset.label ? <span className="text-xs text-zinc-500">{asset.label}</span> : null}
                    </div>
                    <div className="mt-1 text-xs text-zinc-500">{asset.assetType}</div>
                    <div className="mt-2 flex flex-wrap gap-2 xl:hidden">
                      <Badge className={priorityClass[asset.priority]}>{asset.priority}</Badge>
                      <Badge variant="outline" className={`border-white/10 bg-black/20 ${statusClass[asset.status]}`}>{asset.status}</Badge>
                    </div>
                  </div>
                  <div className="text-sm text-zinc-300"><Building2 className="mr-1 inline h-3.5 w-3.5 text-zinc-500" /> {businessLabels[asset.business]}</div>
                  <div className="hidden xl:block"><Badge className={priorityClass[asset.priority]}>{asset.priority}</Badge></div>
                  <div className={`hidden text-sm font-bold xl:block ${statusClass[asset.status]}`}>{asset.status}</div>
                  <div className={`text-sm font-bold ${signalClass[asset.leadflowStatus]}`}><RadioTower className="mr-1 inline h-3.5 w-3.5" /> {normalizeSignal(asset.leadflowStatus)}</div>
                  <div className={`text-sm font-bold ${signalClass[asset.indexationStatus]}`}><CheckCircle2 className="mr-1 inline h-3.5 w-3.5" /> {normalizeSignal(asset.indexationStatus)}</div>
                  <div className={`text-sm font-bold ${signalClass[asset.partnerStatus]}`}><Users className="mr-1 inline h-3.5 w-3.5" /> {normalizeSignal(asset.partnerStatus)}</div>
                  <div>
                    <div className="text-sm leading-6 text-zinc-300">{asset.nextSafeAction}</div>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                      <span><CircleDollarSign className="mr-1 inline h-3.5 w-3.5" /> {asset.mrrPotential}</span>
                      <span><Target className="mr-1 inline h-3.5 w-3.5" /> {asset.monetization}</span>
                      {businessRoutes[asset.business] ? <Link href={businessRoutes[asset.business]!} className="font-bold text-[#F5911E]">Open dashboard <ArrowRight className="inline h-3 w-3" /></Link> : null}
                    </div>
                  </div>
                </div>
              ))}
              {filteredAssets.length === 0 ? <div className="px-4 py-12 text-center text-sm text-zinc-500">Geen assets gevonden voor deze filters.</div> : null}
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
