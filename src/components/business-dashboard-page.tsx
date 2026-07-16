import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle2, CircleAlert, Database, Gauge, MapPin, ShieldCheck, Target, Users } from "lucide-react"

import type { BusinessDashboard } from "@/lib/business-dashboards"
import type { PortfolioBusiness } from "@/lib/portfolio-assets"
import { getPortfolioAssetsForBusiness } from "@/lib/portfolio-assets"
import { getReviewInboxForBusiness } from "@/lib/review-inbox"
import { BartReviewInbox } from "@/components/bart-review-inbox"
import { LocalLeadExecutionBoard } from "@/components/locallead-execution-board"
import { LocalLeadOpsGuardrails } from "@/components/locallead-ops-guardrails"
import { LocalLeadPartnerPipeline } from "@/components/locallead-partner-pipeline"
import { AssetExceptionStrip, PortfolioAssetMatrix } from "@/components/portfolio-asset-matrix"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

function healthTone(score: number) {
  if (score >= 70) return "text-emerald-300"
  if (score >= 50) return "text-amber-300"
  return "text-red-300"
}

export function BusinessDashboardPage({ dashboard }: { dashboard: BusinessDashboard }) {
  const portfolioAssets = getPortfolioAssetsForBusiness(dashboard.slug as PortfolioBusiness)
  const reviewItems = getReviewInboxForBusiness(dashboard.slug as PortfolioBusiness)

  return (
    <main className="space-y-6 text-white">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button asChild variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
          <Link href="/"><ArrowLeft className="mr-2 h-4 w-4" /> Terug naar cockpit</Link>
        </Button>
        <div className="flex flex-wrap gap-2">
          {dashboard.quickLinks.map((link) => (
            <Button key={link.href} asChild variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </div>
      </div>

      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(245,145,30,0.20),_transparent_30rem),linear-gradient(135deg,_rgba(24,24,27,0.98),_rgba(7,7,10,1))] shadow-2xl">
        <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
          <div>
            <Badge className={dashboard.statusClass}>{dashboard.status}</Badge>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[0.95] tracking-tight sm:text-6xl">
              {dashboard.name} <span style={{ color: dashboard.accent }}>dashboard</span>
            </h1>
            <p className="mt-3 text-lg font-semibold text-zinc-200">{dashboard.label}</p>
            <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-300">{dashboard.tagline}</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="text-xs uppercase tracking-wide text-zinc-500">Owner</div>
                <div className="mt-1 font-bold">{dashboard.owner}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="text-xs uppercase tracking-wide text-zinc-500">Type</div>
                <div className="mt-1 font-bold">{dashboard.type}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="text-xs uppercase tracking-wide text-zinc-500">Target</div>
                <div className="mt-1 font-bold">{dashboard.target}</div>
              </div>
            </div>
          </div>

          <Card className="border-white/10 bg-black/30 text-white shadow-none backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2"><Gauge className="h-5 w-5" style={{ color: dashboard.accent }} /> Business health</span>
                <span className={`text-3xl font-black ${healthTone(dashboard.health)}`}>{dashboard.health}</span>
              </CardTitle>
              <CardDescription className="text-zinc-400">{dashboard.current}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <div className="mb-2 flex justify-between text-xs text-zinc-500"><span>Health score</span><span>{dashboard.health}%</span></div>
                <Progress value={dashboard.health} className="h-2 bg-white/10" />
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="text-xs uppercase tracking-wide text-zinc-500">Volgende actie</div>
                <div className="mt-2 text-sm leading-6 text-zinc-200">{dashboard.nextAction}</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="text-2xl font-black">{dashboard.heroMetric}</div>
                  <div className="text-xs uppercase tracking-wide text-zinc-500">{dashboard.heroMetricLabel}</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="text-2xl font-black">{dashboard.target}</div>
                  <div className="text-xs uppercase tracking-wide text-zinc-500">einddoel</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboard.kpis.map((kpi) => (
          <Card key={kpi.label} className="border-white/10 bg-white/[0.04] text-white shadow-none">
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-2xl bg-white/10 p-3" style={{ color: dashboard.accent }}><kpi.icon className="h-5 w-5" /></div>
              <div>
                <div className="text-2xl font-black">{kpi.value}</div>
                <div className="text-xs uppercase tracking-wide text-zinc-500">{kpi.label}</div>
                <div className="text-sm text-zinc-300">{kpi.detail}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {dashboard.slug === "locallead" ? <LocalLeadExecutionBoard assets={portfolioAssets} /> : null}

      {dashboard.slug === "locallead" ? <LocalLeadOpsGuardrails /> : null}

      {dashboard.slug === "locallead" ? <LocalLeadPartnerPipeline /> : null}

      {reviewItems.length > 0 ? <BartReviewInbox items={reviewItems} /> : null}

      {portfolioAssets.length > 0 ? (
        <section className="space-y-4">
          <AssetExceptionStrip assets={portfolioAssets} />
          <PortfolioAssetMatrix
            assets={portfolioAssets}
            title={`${dashboard.name} asset matrix`}
            description="Prioriteit, leadflow, indexatie, partnerstatus en volgende veilige actie uit de operationele portfolio-data."
          />
        </section>
      ) : null}

      <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="border-white/10 bg-zinc-900/75 text-white shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Target className="h-5 w-5" style={{ color: dashboard.accent }} /> Mission control</CardTitle>
            <CardDescription className="text-zinc-400">Waarom deze business bestaat en wat het systeem moet sturen.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-zinc-300">{dashboard.mission}</p>
            <div className="space-y-2">
              {dashboard.blockers.map((blocker) => (
                <div key={blocker} className="flex gap-3 rounded-2xl border border-amber-500/15 bg-amber-500/[0.06] p-3 text-sm leading-6 text-amber-100">
                  <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" /> {blocker}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-zinc-900/75 text-white shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ShieldCheck className="h-5 w-5" style={{ color: dashboard.accent }} /> Operating loop</CardTitle>
            <CardDescription className="text-zinc-400">De herhaalbare werkwijze voor deze business.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {dashboard.operatingLoop.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <item.icon className="mb-3 h-5 w-5" style={{ color: dashboard.accent }} />
                <div className="font-bold">{item.title}</div>
                <div className="mt-2 text-sm leading-6 text-zinc-400">{item.detail}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-white/10 bg-zinc-900/75 text-white shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Database className="h-5 w-5" style={{ color: dashboard.accent }} /> Assets</CardTitle>
            <CardDescription className="text-zinc-400">Sites, kanalen, projecten of operationele onderdelen die deze business dragen.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {dashboard.assets.map((asset) => (
              <div key={asset.name} className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="font-bold">{asset.name}</div>
                  <div className="mt-1 text-sm leading-6 text-zinc-400">{asset.detail}</div>
                </div>
                <Badge variant="outline" className="w-fit border-white/10 bg-black/20 text-zinc-300">{asset.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-zinc-900/75 text-white shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" style={{ color: dashboard.accent }} /> Team lanes</CardTitle>
            <CardDescription className="text-zinc-400">Wie doet wat voor deze business.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {dashboard.agents.map((agent) => (
              <div key={agent.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-black">{agent.name}</div>
                  <Badge variant="outline" className="border-white/10 bg-black/20 text-zinc-300">{agent.role}</Badge>
                </div>
                <div className="mt-2 text-sm leading-6 text-zinc-400">{agent.next}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_0.85fr]">
        <Card className="border-white/10 bg-zinc-900/75 text-white shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5" style={{ color: dashboard.accent }} /> 90 dagen route</CardTitle>
            <CardDescription className="text-zinc-400">Geen vage roadmap: focus + bewijs per fase.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            {dashboard.ninetyDay.map((item) => (
              <div key={item.week} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-xs uppercase tracking-wide text-zinc-500">{item.week}</div>
                <div className="mt-2 font-bold">{item.focus}</div>
                <div className="mt-2 flex gap-2 text-sm leading-6 text-zinc-400"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-300" /> {item.proof}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/[0.035] text-white shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Database className="h-5 w-5" style={{ color: dashboard.accent }} /> Source paths</CardTitle>
            <CardDescription className="text-zinc-400">Waar output of operationele data hoort te landen.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {dashboard.sourcePaths.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-black/20 p-3">
                <div className="text-xs uppercase tracking-wide text-zinc-500">{item.label}</div>
                <div className="mt-1 break-words font-mono text-xs text-zinc-100">{item.path}</div>
              </div>
            ))}
            <Button asChild className="mt-2 w-full text-black hover:opacity-90" style={{ backgroundColor: dashboard.accent }}>
              <Link href="/portfolio">Portfolio data verder uitwerken <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
