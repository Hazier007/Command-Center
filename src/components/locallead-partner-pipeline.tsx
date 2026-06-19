import Link from "next/link"
import { ArrowRight, CalendarClock, CircleDollarSign, Handshake, Mail, MapPin, MessageSquareText, PhoneCall, ShieldCheck, UserRoundSearch } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type PartnerStage = "shortlist" | "research" | "ready" | "contacted" | "blocked"

type PartnerPipelineItem = {
  asset: string
  niche: string
  targetProfile: string
  stage: PartnerStage
  nextMove: string
  offer: string
  expectedMrr: string
  followUp: string
  proofNeeded: string
  owner: string
}

const stageClass: Record<PartnerStage, string> = {
  shortlist: "border-sky-500/30 bg-sky-500/15 text-sky-300",
  research: "border-violet-500/30 bg-violet-500/15 text-violet-300",
  ready: "border-emerald-500/30 bg-emerald-500/15 text-emerald-300",
  contacted: "border-[#F5911E]/30 bg-[#F5911E]/15 text-[#F5911E]",
  blocked: "border-red-500/30 bg-red-500/15 text-red-300",
}

const pipeline: PartnerPipelineItem[] = [
  {
    asset: "poxy.be",
    niche: "Epoxyvloeren / gietvloeren",
    targetProfile: "Zaakvoerder met Vlaamse regio-capaciteit, actief in particuliere en B2B vloerprojecten.",
    stage: "ready",
    nextMove: "Bart keurt kleine shortlist + persoonlijke intro-mail goed zodra testlead bewijs genoteerd is.",
    offer: "Exclusieve aanvraagstroom per regio, eerste maand proef aan vaste huur of qualified lead fee.",
    expectedMrr: "€300-€800",
    followUp: "Na leadflow-proof",
    proofNeeded: "Testlead + ontvangende mailbox + partnerprofiel",
    owner: "Bart + Lisa",
  },
  {
    asset: "daklekkages.be",
    niche: "Daklekkage spoedinterventie",
    targetProfile: "Dakwerker met snelle interventie, duidelijke regio en capaciteit voor spoedaanvragen.",
    stage: "blocked",
    nextMove: "Formulier-first fallback bepalen zolang Twilio/KBO nog niet rond is.",
    offer: "Spoedleads per regio; calltracking later toevoegen wanneer Twilio vrij is.",
    expectedMrr: "€400-€1.200",
    followUp: "Na formulier/callpad keuze",
    proofNeeded: "GSC/indexatie + urgentieformulier + fallback routing",
    owner: "Bart + Hermes",
  },
  {
    asset: "funderingsproblemen.be",
    niche: "Funderingsherstel / stabiliteit",
    targetProfile: "Specialist in fundering, stabiliteit of betonherstel met hoge ticketwaarde en consultatieve sales.",
    stage: "shortlist",
    nextMove: "Top-10 shortlist maken en aanbod voorzichtig formuleren zonder harde claims.",
    offer: "Premium qualified leads met exclusiviteit per regio of specialisatie.",
    expectedMrr: "€500-€1.500",
    followUp: "Na trust/copy review",
    proofNeeded: "Leadflow bewijs + claim-safe copy + shortlist",
    owner: "Bart + Jean-Cloud",
  },
  {
    asset: "gevelwerkengent.be",
    niche: "Gevelwerken regio Gent",
    targetProfile: "Lokale gevelspecialist met Gent/regio focus en bewezen uitvoering.",
    stage: "research",
    nextMove: "Niet contacteren tot copy compliance, leadbackend en indexatie-check klaar zijn.",
    offer: "Lokale exclusiviteit zodra Google/leadflow basis bewezen is.",
    expectedMrr: "€250-€700",
    followUp: "Na GSC URL-inspectie",
    proofNeeded: "Zero-indexation oplossen + leadbackend test",
    owner: "Hermes",
  },
]

const stageOrder: PartnerStage[] = ["shortlist", "research", "ready", "contacted", "blocked"]

function stageLabel(stage: PartnerStage) {
  return {
    shortlist: "shortlist",
    research: "research",
    ready: "ready",
    contacted: "contacted",
    blocked: "blocked",
  }[stage]
}

export function LocalLeadPartnerPipeline() {
  const totalPotential = "€1.450-€4.200"
  const readyCount = pipeline.filter((item) => item.stage === "ready").length
  const blockedCount = pipeline.filter((item) => item.stage === "blocked").length

  return (
    <section className="space-y-4">
      <Card className="border-emerald-500/20 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.15),_transparent_24rem),rgba(24,24,27,0.88)] text-white shadow-none">
        <CardHeader>
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <Badge className="border-emerald-500/30 bg-emerald-500/15 text-emerald-300">Partner pipeline</Badge>
              <CardTitle className="mt-4 flex items-center gap-2 text-3xl font-black md:text-4xl">
                <Handshake className="h-8 w-8 text-emerald-300" /> Van asset naar eerste huurgesprek
              </CardTitle>
              <CardDescription className="mt-3 max-w-3xl text-base leading-7 text-zinc-300">
                Deze laag vertaalt P1/P2-assets naar concrete partnergesprekken: wie past, welk aanbod, welke MRR-kans en welk bewijs moet eerst klaar zijn.
              </CardDescription>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center xl:min-w-[480px]">
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4"><div className="text-2xl font-black">{pipeline.length}</div><div className="text-[10px] uppercase text-zinc-500">kansen</div></div>
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4"><div className="text-2xl font-black text-emerald-300">{readyCount}</div><div className="text-[10px] uppercase text-zinc-500">ready</div></div>
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4"><div className="text-2xl font-black text-red-300">{blockedCount}</div><div className="text-[10px] uppercase text-zinc-500">blocked</div></div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <CircleDollarSign className="mb-3 h-5 w-5 text-emerald-300" />
            <div className="font-black">MRR potentieel</div>
            <div className="mt-1 text-2xl font-black">{totalPotential}/mnd</div>
            <p className="mt-2 text-sm leading-6 text-zinc-400">Niet gegarandeerd; dit is de target range zodra bewijs + partnerfit klopt.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <ShieldCheck className="mb-3 h-5 w-5 text-sky-300" />
            <div className="font-black">Outreach guardrail</div>
            <p className="mt-2 text-sm leading-6 text-zinc-400">Geen koude massamail. Bart keurt kleine batches goed; Resend blijft transactioneel/controlled.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <UserRoundSearch className="mb-3 h-5 w-5 text-[#F5911E]" />
            <div className="font-black">Partnerfit boven volume</div>
            <p className="mt-2 text-sm leading-6 text-zinc-400">Elke kans moet regio, capaciteit, nichefit en contactpad hebben vóór outreach.</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-3 xl:grid-cols-5">
        {stageOrder.map((stage) => {
          const items = pipeline.filter((item) => item.stage === stage)
          return (
            <Card key={stage} className="border-white/10 bg-zinc-900/75 text-white shadow-none">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between gap-2 text-base">
                  <span>{stageLabel(stage)}</span>
                  <Badge className={stageClass[stage]}>{items.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {items.length === 0 ? <div className="rounded-2xl border border-dashed border-white/10 p-4 text-sm text-zinc-500">Geen items</div> : null}
                {items.map((item) => (
                  <div key={item.asset} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="font-black">{item.asset}</div>
                    <div className="mt-1 text-xs uppercase tracking-wide text-zinc-500">{item.niche}</div>
                    <div className="mt-3 text-sm leading-6 text-zinc-300">{item.nextMove}</div>
                    <div className="mt-3 flex items-center justify-between gap-2 text-xs text-zinc-500">
                      <span><CircleDollarSign className="mr-1 inline h-3.5 w-3.5" /> {item.expectedMrr}</span>
                      <span><CalendarClock className="mr-1 inline h-3.5 w-3.5" /> {item.followUp}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="border-white/10 bg-zinc-900/75 text-white shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><MessageSquareText className="h-5 w-5 text-emerald-300" /> Partner deal cards</CardTitle>
          <CardDescription className="text-zinc-400">Wat Bart nodig heeft om van shortlist naar gesprek te gaan.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 xl:grid-cols-2">
          {pipeline.map((item) => (
            <div key={item.asset} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-xl font-black">{item.asset}</div>
                  <div className="mt-1 flex items-center gap-2 text-sm text-zinc-400"><MapPin className="h-4 w-4" /> {item.niche}</div>
                </div>
                <Badge className={stageClass[item.stage]}>{item.stage}</Badge>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-xl bg-black/20 p-3">
                  <div className="text-xs uppercase text-zinc-500">Target partner</div>
                  <div className="mt-1 text-sm leading-6 text-zinc-200">{item.targetProfile}</div>
                </div>
                <div className="rounded-xl bg-black/20 p-3">
                  <div className="text-xs uppercase text-zinc-500">Aanbod</div>
                  <div className="mt-1 text-sm leading-6 text-zinc-200">{item.offer}</div>
                </div>
                <div className="rounded-xl bg-black/20 p-3">
                  <div className="text-xs uppercase text-zinc-500">Bewijs nodig</div>
                  <div className="mt-1 text-sm leading-6 text-zinc-200">{item.proofNeeded}</div>
                </div>
                <div className="rounded-xl bg-black/20 p-3">
                  <div className="text-xs uppercase text-zinc-500">Owner / follow-up</div>
                  <div className="mt-1 text-sm leading-6 text-zinc-200">{item.owner} · {item.followUp}</div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-3">
        <Button asChild className="bg-emerald-500 text-black hover:bg-emerald-400"><Link href="/portfolio">Bekijk asset context <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
        <Button asChild variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10"><Link href="/inbox"><Mail className="mr-2 h-4 w-4" /> Inbox/leadflow bekijken</Link></Button>
        <Button asChild variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10"><Link href="/pipeline"><PhoneCall className="mr-2 h-4 w-4" /> Algemene pipeline</Link></Button>
      </div>
    </section>
  )
}
