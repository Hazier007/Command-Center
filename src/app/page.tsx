import Link from "next/link"
import {
  ArrowRight,
  BarChart3,
  Clock3,
  Euro,
  Globe2,
  Inbox,
  Megaphone,
  PhoneCall,
  Rocket,
  Search,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const portfolio = [
  {
    domain: "Poxy.be",
    niche: "Epoxyvloeren Vlaanderen",
    status: "Leadmachine bouwen",
    next: "Resend-flow en Twilio call-routing klaarzetten",
    value: "€750-€1.500/mnd",
    priority: "Nu",
  },
  {
    domain: "Daklekkages.be",
    niche: "Spoed daklekken",
    status: "Commercialiseren",
    next: "Landingspagina's per provincie + call tracking",
    value: "€1.000-€2.500/mnd",
    priority: "Hoog",
  },
  {
    domain: "funderingsproblemen.be",
    niche: "Funderingsherstel",
    status: "Autoriteit uitbouwen",
    next: "SEO clusters + offerte-intake verbeteren",
    value: "€1.500-€3.000/mnd",
    priority: "Hoog",
  },
  {
    domain: "gevelwerkengent.be",
    niche: "Gevelwerken Gent",
    status: "Lokale winnaar maken",
    next: "Google Business/SEO proof + partnerlijst",
    value: "€500-€1.250/mnd",
    priority: "Sprint",
  },
  {
    domain: "vogeloverlast.be",
    niche: "Vogelwering",
    status: "Kans valideren",
    next: "SERP-check + eerste servicepagina's",
    value: "€750-€1.500/mnd",
    priority: "Sprint",
  },
  {
    domain: "asbestgigant.be",
    niche: "Asbestattesten/sanering",
    status: "Vooronderzoek",
    next: "Compliance + partnerprofiel bepalen",
    value: "€1.000-€2.000/mnd",
    priority: "Later",
  },
]

const today = [
  "Maak Poxy.be leadmail definitief: naar info@hazier.be + duidelijke offertevelden.",
  "Zet per kernsite één verhuurpitch klaar: probleem, regio, leadwaarde, huurprijs.",
  "Kies 3 niches voor deze week: Poxy, Daklekkages, Funderingsproblemen.",
  "Maak belscript voor eerste aannemers/outreach in Vlaanderen.",
]

const weekSprint = [
  { label: "Lead capture", detail: "Formulieren, Resend, bedankpagina, spamfilter", progress: 45 },
  { label: "Call routing", detail: "Twilio zodra KBO-document rond is", progress: 20 },
  { label: "SEO productie", detail: "Lokale servicepagina's + bewijsblokken", progress: 55 },
  { label: "Verhuur sales", detail: "Partnerlijst, pitch, follow-up cadence", progress: 30 },
]

const agents = [
  { name: "Lisa", role: "LocalLead operator", focus: "zet taken om naar uitvoerbare issues en checklists", status: "Actief" },
  { name: "SEO Agent", role: "Ranking machine", focus: "keywords, pagina's, interne links, GSC-acties", status: "Sprint" },
  { name: "Sales Agent", role: "Verhuurmachine", focus: "aannemerslijsten, pitches, opvolging", status: "Volgende" },
  { name: "BeeldMaker", role: "Visual assets", focus: "OpenAI visuals voor hero/OG/social", status: "Gepland" },
]

const kpis = [
  { label: "MRR doel", value: "€10k", sub: "eerste mijlpaal", icon: Euro },
  { label: "Focus-sites", value: "3", sub: "deze week", icon: Target },
  { label: "Leadkanalen", value: "2", sub: "mail + telefoon", icon: PhoneCall },
  { label: "Portfolio", value: "8+", sub: "rank & rent assets", icon: Globe2 },
]

const pipeline = [
  { step: "1. Rank", text: "Pagina's publiceren, lokale intentie pakken, GSC monitoren." },
  { step: "2. Capture", text: "Elke site krijgt formulier, mailflow, call tracking en leadlog." },
  { step: "3. Prove", text: "Bewijs verzamelen: posities, clicks, calls, voorbeeldleads." },
  { step: "4. Rent", text: "Vaste maandhuur pitchen aan lokale uitvoerders." },
]

export default function LocalLeadCommandCenter() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(245,145,30,0.22),_transparent_32rem),linear-gradient(135deg,_rgba(24,24,27,0.92),_rgba(9,9,11,1))]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <Badge className="mb-4 border-[#F5911E]/30 bg-[#F5911E]/15 text-[#F5911E]">
                <Zap className="mr-1 h-3.5 w-3.5" /> LocalLead Command Center
              </Badge>
              <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
                Van losse domeinen naar een voorspelbare
                <span className="text-[#F5911E]"> €10k/mnd rank & rent machine</span>.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-300 sm:text-base">
                Dit is nu het hoofdscherm van het Command Center: geen generieke oude cockpit meer,
                maar één werkbord voor leads, SEO, agents, verhuur en cashflow voor Bart&apos;s LocalLead portfolio.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="bg-[#F5911E] text-black hover:bg-[#ffae45]">
                <Link href="/tasks">
                  Taken openen <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
                <Link href="/sites">Portfolio beheren</Link>
              </Button>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {kpis.map((kpi) => (
              <Card key={kpi.label} className="border-white/10 bg-white/[0.04] text-white shadow-none">
                <CardContent className="flex items-center gap-4 pt-6">
                  <div className="rounded-xl bg-[#F5911E]/15 p-3 text-[#F5911E]">
                    <kpi.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-black">{kpi.value}</div>
                    <div className="text-xs uppercase tracking-wide text-zinc-500">{kpi.label}</div>
                    <div className="text-sm text-zinc-300">{kpi.sub}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <Card className="border-white/10 bg-zinc-900/70 text-white shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock3 className="h-5 w-5 text-[#F5911E]" /> Vandaag uitvoeren
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Alleen acties die dichter bij verhuurbare leads en recurring revenue brengen.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {today.map((item, index) => (
              <div key={item} className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F5911E] text-sm font-black text-black">
                  {index + 1}
                </div>
                <p className="text-sm text-zinc-200">{item}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-zinc-900/70 text-white shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-400" /> Revenue sprint
            </CardTitle>
            <CardDescription className="text-zinc-400">
              De week draait niet rond drukte, maar rond bewijs en verkoopbaarheid.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {weekSprint.map((item) => (
              <div key={item.label}>
                <div className="mb-1 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold">{item.label}</div>
                    <div className="text-xs text-zinc-500">{item.detail}</div>
                  </div>
                  <div className="text-sm font-bold text-[#F5911E]">{item.progress}%</div>
                </div>
                <Progress value={item.progress} className="h-2 bg-white/10" />
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
        <Card className="border-white/10 bg-zinc-900/70 text-white shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe2 className="h-5 w-5 text-[#F5911E]" /> LocalLead portfolio
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Geen oude demo-data: dit bord toont de domeinen die naar leads, calls en maandhuur moeten.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {portfolio.map((site) => (
                <div key={site.domain} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-black">{site.domain}</h3>
                      <p className="text-sm text-zinc-400">{site.niche}</p>
                    </div>
                    <Badge className="border-white/10 bg-white/10 text-zinc-200">{site.priority}</Badge>
                  </div>
                  <div className="mt-4 space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-zinc-200">
                      <ShieldCheck className="h-4 w-4 text-green-400" /> {site.status}
                    </div>
                    <div className="flex items-start gap-2 text-zinc-400">
                      <Rocket className="mt-0.5 h-4 w-4 text-[#F5911E]" /> <span>{site.next}</span>
                    </div>
                    <div className="rounded-xl bg-black/30 px-3 py-2 font-bold text-[#F5911E]">{site.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-10 sm:px-6 lg:grid-cols-3 lg:px-8">
        <Card className="border-white/10 bg-zinc-900/70 text-white shadow-none lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-[#F5911E]" /> Rank → Capture → Prove → Rent
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Het Command Center is ingericht rond de enige flow die telt: vindbaarheid omzetten in recurring huur.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {pipeline.map((item) => (
              <div key={item.step} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="mb-2 text-sm font-black text-[#F5911E]">{item.step}</div>
                <p className="text-sm text-zinc-300">{item.text}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-zinc-900/70 text-white shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-[#F5911E]" /> Agent team
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Agents zijn alleen nuttig als ze LocalLead-output leveren.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {agents.map((agent) => (
              <div key={agent.name} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-bold">{agent.name}</div>
                  <Badge className="border-[#F5911E]/30 bg-[#F5911E]/15 text-[#F5911E]">{agent.status}</Badge>
                </div>
                <div className="text-xs uppercase tracking-wide text-zinc-500">{agent.role}</div>
                <p className="mt-2 text-sm text-zinc-300">{agent.focus}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="border-t border-white/10 bg-black/25">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:px-6 md:grid-cols-3 lg:px-8">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <Inbox className="h-5 w-5 text-[#F5911E]" />
            <div>
              <div className="font-bold">Leads eerst</div>
              <div className="text-sm text-zinc-400">Elke site moet mail/call capture krijgen.</div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <Search className="h-5 w-5 text-[#F5911E]" />
            <div>
              <div className="font-bold">SEO met intentie</div>
              <div className="text-sm text-zinc-400">Geen content om content, alleen verhuurbare zoekvragen.</div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <Megaphone className="h-5 w-5 text-[#F5911E]" />
            <div>
              <div className="font-bold">Sales bewijs</div>
              <div className="text-sm text-zinc-400">Elke partnerpitch toont niche, regio, leads en huurprijs.</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
