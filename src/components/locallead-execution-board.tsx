import Link from "next/link"
import { ArrowRight, CheckCircle2, ClipboardCheck, FileSearch, MailCheck, PhoneCall, SearchCheck, ShieldAlert, Target, Users } from "lucide-react"

import type { PortfolioAsset } from "@/lib/portfolio-assets"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

type ExecutionStepStatus = "todo" | "active" | "blocked" | "ready"

type ExecutionStep = {
  label: string
  status: ExecutionStepStatus
  proof: string
}

type LocalLeadExecutionAsset = {
  domain: string
  sprintRole: string
  outcome: string
  owner: string
  confidence: number
  partnerTarget: string
  nextDecision: string
  steps: ExecutionStep[]
}

const statusClass: Record<ExecutionStepStatus, string> = {
  todo: "border-zinc-500/25 bg-zinc-500/10 text-zinc-300",
  active: "border-[#F5911E]/30 bg-[#F5911E]/15 text-[#F5911E]",
  blocked: "border-red-500/30 bg-red-500/15 text-red-300",
  ready: "border-emerald-500/30 bg-emerald-500/15 text-emerald-300",
}

const executionAssets: LocalLeadExecutionAsset[] = [
  {
    domain: "poxy.be",
    sprintRole: "Eerste partnerdeal kandidaat",
    outcome: "Partner-ready bewijs: werkend formulier, duidelijke epoxy/gietvloer propositie en shortlist voor outreach.",
    owner: "Bart + Lisa",
    confidence: 68,
    partnerTarget: "Epoxyvloeren / gietvloeren Vlaanderen",
    nextDecision: "Kiezen: eerst indexatie saneren of al gecontroleerde partnermail naar kleine shortlist?",
    steps: [
      { label: "Leadformulier test", status: "active", proof: "Bewijs nodig: testlead + ontvangende mailbox + tijdstip." },
      { label: "Money pages fase 1", status: "active", proof: "56 kernpagina’s prioriteren; thin locaties niet laten afleiden." },
      { label: "Partnerprofiel", status: "todo", proof: "Ideale huurder: epoxy/gietvloer specialist met regio-capaciteit." },
      { label: "Outreach batch", status: "todo", proof: "Kleine batch pas na leadflow-proof." },
    ],
  },
  {
    domain: "daklekkages.be",
    sprintRole: "Spoedlead / calltracking kandidaat",
    outcome: "Spoedlead-flow bewijzen: formulier/callpad, indexatieblokker en partnerlogica helder.",
    owner: "Bart + Hermes",
    confidence: 61,
    partnerTarget: "Dakwerkers met spoedinterventie Vlaanderen",
    nextDecision: "Twilio/KBO blocker omzeilen met formulier-first of wachten op callrouting?",
    steps: [
      { label: "Robots/sitemap/GSC", status: "active", proof: "Coverage-check en indexatieprobleem vastleggen." },
      { label: "Spoedformulier", status: "todo", proof: "Testlead moet binnenkomen met urgentieveld." },
      { label: "Calltracking", status: "blocked", proof: "Twilio wacht op KBO-document; fallback bepalen." },
      { label: "Partner shortlist", status: "todo", proof: "20 dakwerkers met spoedfit en regio." },
    ],
  },
  {
    domain: "funderingsproblemen.be",
    sprintRole: "High-ticket premium kandidaat",
    outcome: "Premium leadflow en trustproof rond hoogwaarde aanvragen zonder riskante claims.",
    owner: "Bart + Jean-Cloud",
    confidence: 74,
    partnerTarget: "Funderingsspecialisten / stabiliteitsstudies",
    nextDecision: "Eerst leadflow-proof of meteen partner shortlist laten reviewen?",
    steps: [
      { label: "Leadflow end-to-end", status: "active", proof: "Testaanvraag met bevestiging en routing." },
      { label: "Claim/trust review", status: "todo", proof: "Copy voorzichtig: geen niet-bewezen garanties." },
      { label: "Top-10 partners", status: "todo", proof: "Shortlist met regio, specialisatie en contactpad." },
      { label: "Premium aanbod", status: "todo", proof: "Huur/leadfee scenario klaar voor gesprek." },
    ],
  },
]

function getLinkedAsset(domain: string, assets: PortfolioAsset[]) {
  return assets.find((asset) => asset.domain === domain)
}

function completionScore(asset: LocalLeadExecutionAsset) {
  const done = asset.steps.filter((step) => step.status === "ready" || step.status === "active").length
  return Math.round((done / asset.steps.length) * 100)
}

export function LocalLeadExecutionBoard({ assets }: { assets: PortfolioAsset[] }) {
  const p1Assets = executionAssets.map((asset) => ({ ...asset, portfolio: getLinkedAsset(asset.domain, assets) }))
  const blockedSteps = executionAssets.flatMap((asset) => asset.steps.filter((step) => step.status === "blocked").map((step) => ({ domain: asset.domain, ...step })))
  const activeSteps = executionAssets.flatMap((asset) => asset.steps.filter((step) => step.status === "active").map((step) => ({ domain: asset.domain, ...step })))

  return (
    <section className="space-y-4">
      <Card className="overflow-hidden border-[#F5911E]/25 bg-[radial-gradient(circle_at_top_left,_rgba(245,145,30,0.18),_transparent_26rem),rgba(24,24,27,0.88)] text-white shadow-none">
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <Badge className="border-[#F5911E]/25 bg-[#F5911E]/15 text-[#F5911E]">LocalLead execution board</Badge>
              <CardTitle className="mt-4 flex items-center gap-2 text-3xl font-black md:text-4xl">
                <ClipboardCheck className="h-8 w-8 text-[#F5911E]" /> P1 assets naar eerste recurring deal
              </CardTitle>
              <CardDescription className="mt-3 max-w-3xl text-base leading-7 text-zinc-300">
                Geen algemene portfolio meer: dit bord stuurt vandaag op bewijs. Per P1 asset: leadflow, indexatie, partnerlijst, outreach en blocker.
              </CardDescription>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center lg:min-w-[420px]">
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4"><div className="text-2xl font-black">3</div><div className="text-[10px] uppercase text-zinc-500">P1 assets</div></div>
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4"><div className="text-2xl font-black text-[#F5911E]">{activeSteps.length}</div><div className="text-[10px] uppercase text-zinc-500">actief</div></div>
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4"><div className="text-2xl font-black text-red-300">{blockedSteps.length}</div><div className="text-[10px] uppercase text-zinc-500">blocked</div></div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <MailCheck className="mb-3 h-5 w-5 text-[#F5911E]" />
            <div className="font-black">Leadflow proof eerst</div>
            <p className="mt-2 text-sm leading-6 text-zinc-400">Geen partnergesprek zonder bewijs dat een aanvraag zichtbaar binnenkomt.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <SearchCheck className="mb-3 h-5 w-5 text-sky-300" />
            <div className="font-black">Indexatie als blocker</div>
            <p className="mt-2 text-sm leading-6 text-zinc-400">Poxy en Daklekkages krijgen voorrang omdat indexatie direct geldkans blokkeert.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <Users className="mb-3 h-5 w-5 text-emerald-300" />
            <div className="font-black">Partnerfit concreet</div>
            <p className="mt-2 text-sm leading-6 text-zinc-400">Elke shortlist moet niche, regio, capaciteit en contactpad bevatten.</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-3">
        {p1Assets.map((asset) => {
          const score = completionScore(asset)
          return (
            <Card key={asset.domain} className="border-white/10 bg-zinc-900/75 text-white shadow-none">
              <CardHeader>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <CardTitle className="text-2xl font-black">{asset.domain}</CardTitle>
                    <CardDescription className="mt-1 text-zinc-400">{asset.sprintRole}</CardDescription>
                  </div>
                  <Badge className="border-[#F5911E]/30 bg-[#F5911E]/15 text-[#F5911E]">P1</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                <p className="text-sm leading-6 text-zinc-300">{asset.outcome}</p>
                <div>
                  <div className="mb-2 flex justify-between text-xs text-zinc-500"><span>Execution readiness</span><span>{score}%</span></div>
                  <Progress value={score} className="h-2 bg-white/10" />
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="rounded-xl bg-white/[0.04] p-3"><div className="text-zinc-500">Owner</div><div className="font-bold">{asset.owner}</div></div>
                  <div className="rounded-xl bg-white/[0.04] p-3"><div className="text-zinc-500">Confidence</div><div className="font-bold">{asset.confidence}%</div></div>
                  <div className="col-span-2 rounded-xl bg-white/[0.04] p-3"><div className="text-zinc-500">Partner target</div><div className="font-bold">{asset.partnerTarget}</div></div>
                </div>
                <div className="space-y-2">
                  {asset.steps.map((step) => (
                    <div key={step.label} className="rounded-2xl border border-white/10 bg-black/20 p-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="font-bold">{step.label}</div>
                        <Badge className={statusClass[step.status]}>{step.status}</Badge>
                      </div>
                      <div className="mt-2 text-xs leading-5 text-zinc-400">{step.proof}</div>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.06] p-4">
                  <div className="flex items-center gap-2 text-sm font-black text-amber-200"><ShieldAlert className="h-4 w-4" /> Volgende beslissing</div>
                  <p className="mt-2 text-sm leading-6 text-amber-50/90">{asset.nextDecision}</p>
                </div>
                {asset.portfolio ? (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs leading-5 text-zinc-400">
                    <div className="mb-2 font-bold text-zinc-200"><FileSearch className="mr-1 inline h-4 w-4" /> Evidence</div>
                    {asset.portfolio.evidence.map((path) => <div key={path} className="break-words font-mono">{path}</div>)}
                  </div>
                ) : null}
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="border-white/10 bg-zinc-900/75 text-white shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Target className="h-5 w-5 text-[#F5911E]" /> Deal path</CardTitle>
          <CardDescription className="text-zinc-400">De kortste route van asset naar recurring omzet.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-5">
          {[
            ["1", "Testlead", "Bewijs dat aanvraag/call zichtbaar binnenkomt."],
            ["2", "Money proof", "Indexatie of intentpagina’s tonen waarom de asset waarde heeft."],
            ["3", "Shortlist", "20 passende partners, niet willekeurige aannemers."],
            ["4", "Small batch", "Bart keurt persoonlijke outreach goed; kleine batch eerst."],
            ["5", "Huurvoorstel", "Vaste huur of qualified lead fee met duidelijke exclusiviteit."],
          ].map(([step, title, detail]) => (
            <div key={step} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#F5911E] font-black text-black">{step}</div>
              <div className="font-black">{title}</div>
              <div className="mt-2 text-sm leading-6 text-zinc-400">{detail}</div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-3">
        <Button asChild className="bg-[#F5911E] text-white hover:bg-[#d97809]"><Link href="/portfolio">Open portfolio command room <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
        <Button asChild variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10"><Link href="/tasks"><PhoneCall className="mr-2 h-4 w-4" /> Taken bekijken</Link></Button>
      </div>
    </section>
  )
}
