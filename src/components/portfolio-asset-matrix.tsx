import { AlertTriangle, ArrowRight, CheckCircle2, CircleDollarSign, Database, RadioTower, Users } from "lucide-react"
import Link from "next/link"

import type { PortfolioAsset } from "@/lib/portfolio-assets"
import { summarizeAssets } from "@/lib/portfolio-assets"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const priorityClass: Record<string, string> = {
  P1: "border-[#F5911E]/30 bg-[#F5911E]/15 text-[#F5911E]",
  P2: "border-sky-500/30 bg-sky-500/15 text-sky-300",
  P3: "border-violet-500/30 bg-violet-500/15 text-violet-300",
  Core: "border-emerald-500/30 bg-emerald-500/15 text-emerald-300",
  Watch: "border-zinc-500/30 bg-zinc-500/15 text-zinc-300",
  Backlog: "border-zinc-600/30 bg-zinc-600/15 text-zinc-400",
  Blocked: "border-red-500/30 bg-red-500/15 text-red-300",
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

function formatSignal(value: string) {
  return value.replace("not-needed", "n.v.t.").replace("unproven", "onbewezen")
}

export function PortfolioAssetMatrix({
  assets,
  title = "Portfolio asset matrix",
  description = "De operationele waarheid per asset: prioriteit, signalen, blocker en volgende veilige actie.",
  compact = false,
}: {
  assets: PortfolioAsset[]
  title?: string
  description?: string
  compact?: boolean
}) {
  const summary = summarizeAssets(assets)

  return (
    <Card className="border-white/10 bg-zinc-900/75 text-white shadow-none">
      <CardHeader>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-[#F5911E]" /> {title}
            </CardTitle>
            <CardDescription className="mt-1 text-zinc-400">{description}</CardDescription>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center sm:grid-cols-6 lg:min-w-[520px]">
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-2"><div className="font-black">{summary.total}</div><div className="text-[10px] uppercase text-zinc-500">assets</div></div>
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-2"><div className="font-black text-emerald-300">{summary.live}</div><div className="text-[10px] uppercase text-zinc-500">live</div></div>
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-2"><div className="font-black text-[#F5911E]">{summary.p1}</div><div className="text-[10px] uppercase text-zinc-500">P1</div></div>
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-2"><div className="font-black text-red-300">{summary.blocked}</div><div className="text-[10px] uppercase text-zinc-500">blocked</div></div>
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-2"><div className="font-black text-amber-300">{summary.unprovenLeadflow}</div><div className="text-[10px] uppercase text-zinc-500">leadflow</div></div>
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-2"><div className="font-black text-amber-300">{summary.noPartner}</div><div className="text-[10px] uppercase text-zinc-500">partner</div></div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {assets.map((asset) => (
          <div key={`${asset.business}-${asset.domain}`} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-black">{asset.domain}</h3>
                  {asset.label ? <span className="text-xs text-zinc-500">{asset.label}</span> : null}
                  <Badge className={priorityClass[asset.priority] ?? priorityClass.Backlog}>{asset.priority}</Badge>
                  <Badge variant="outline" className="border-white/10 bg-black/20 text-zinc-300">{asset.status}</Badge>
                </div>
                <p className="mt-1 text-sm text-zinc-400">{asset.assetType} · {asset.monetization}</p>
                <p className="mt-3 text-sm leading-6 text-zinc-200">{asset.nextSafeAction}</p>
              </div>

              <div className="grid gap-2 text-sm sm:grid-cols-2 xl:w-[520px]">
                <div className="rounded-xl bg-black/20 p-3">
                  <div className="flex items-center gap-2 text-zinc-500"><CircleDollarSign className="h-3.5 w-3.5" /> Potentieel</div>
                  <div className="mt-1 font-bold">{asset.mrrPotential}</div>
                </div>
                <div className="rounded-xl bg-black/20 p-3">
                  <div className="flex items-center gap-2 text-zinc-500"><RadioTower className="h-3.5 w-3.5" /> Leadflow</div>
                  <div className={`mt-1 font-bold ${signalClass[asset.leadflowStatus]}`}>{formatSignal(asset.leadflowStatus)}</div>
                </div>
                <div className="rounded-xl bg-black/20 p-3">
                  <div className="flex items-center gap-2 text-zinc-500"><CheckCircle2 className="h-3.5 w-3.5" /> Indexatie</div>
                  <div className={`mt-1 font-bold ${signalClass[asset.indexationStatus]}`}>{formatSignal(asset.indexationStatus)}</div>
                </div>
                <div className="rounded-xl bg-black/20 p-3">
                  <div className="flex items-center gap-2 text-zinc-500"><Users className="h-3.5 w-3.5" /> Partner</div>
                  <div className={`mt-1 font-bold ${signalClass[asset.partnerStatus]}`}>{formatSignal(asset.partnerStatus)}</div>
                </div>
              </div>
            </div>

            {!compact ? (
              <div className="mt-3 flex flex-wrap gap-2 border-t border-white/10 pt-3">
                {asset.evidence.map((path) => (
                  <Badge key={path} variant="outline" className="border-white/10 bg-black/20 font-mono text-[11px] text-zinc-400">
                    {path}
                  </Badge>
                ))}
              </div>
            ) : null}
          </div>
        ))}
        {compact ? (
          <Link href="/portfolio" className="inline-flex items-center text-sm font-bold text-[#F5911E]">
            Volledige portfolio verder beheren <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Link>
        ) : null}
      </CardContent>
    </Card>
  )
}

export function AssetExceptionStrip({ assets }: { assets: PortfolioAsset[] }) {
  const exceptions = assets.filter((asset) => asset.status === "blocked" || asset.status === "needs-check" || asset.leadflowStatus === "missing" || asset.indexationStatus === "zero")

  if (exceptions.length === 0) return null

  return (
    <Card className="border-amber-500/20 bg-amber-500/[0.06] text-white shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-amber-300" /> Exceptions die geld blokkeren</CardTitle>
        <CardDescription className="text-amber-100/80">Deze assets mogen niet wegvallen in een gewone takenlijst.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {exceptions.map((asset) => (
          <div key={asset.domain} className="rounded-2xl border border-amber-500/20 bg-black/20 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="font-black">{asset.domain}</div>
              <Badge className={priorityClass[asset.priority] ?? priorityClass.Backlog}>{asset.priority}</Badge>
            </div>
            <div className="mt-2 text-sm leading-6 text-amber-50/90">{asset.nextSafeAction}</div>
            <div className="mt-3 text-xs text-amber-100/60">Verified: {asset.lastVerifiedAt}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
