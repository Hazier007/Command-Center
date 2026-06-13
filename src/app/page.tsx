import Link from "next/link"
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardList,
  Database,
  FileText,
  Globe2,
  Mail,
  PhoneCall,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const businesses = [
  {
    name: "LocalLead",
    type: "Rank & Rent / leadgen",
    status: "Prioriteit deze week",
    goal: "€10k/maand recurring via verhuurde leadsites",
    focus: ["Resend op kernsites", "Twilio calltracking", "partnerpipeline klein starten"],
    href: "/locallead",
    accent: "#F5911E",
    badge: "bg-[#F5911E]/15 text-[#F5911E] border-[#F5911E]/25",
  },
  {
    name: "Hazier",
    type: "Webdesign & SEO",
    status: "Cashflow bewaken",
    goal: "Klantwerk en SEO als stabiele basis onder LocalLead",
    focus: ["lopende klanten", "facturatie", "nieuwe aanvragen"],
    href: "/klanten",
    accent: "#A78BFA",
    badge: "bg-violet-500/15 text-violet-300 border-violet-500/25",
  },
  {
    name: "Calqo",
    type: "Calculator/tools & media assets",
    status: "Opbouwen zonder afleiding",
    goal: "Utility sites, SEO en later AdSense/affiliate kansen",
    focus: ["asset-inventaris", "SEO backlog", "monetisatie beslissen"],
    href: "/portfolio",
    accent: "#38BDF8",
    badge: "bg-sky-500/15 text-sky-300 border-sky-500/25",
  },
  {
    name: "Infinite Events",
    type: "Events / VZW",
    status: "Alleen opvolgen wat moet",
    goal: "Geen ruis in de sprint, wel zicht op deadlines en verplichtingen",
    focus: ["deadlines", "budget", "administratie"],
    href: "/tasks",
    accent: "#34D399",
    badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
  },
]

const operatingTiles = [
  { label: "Database", value: "Clean", sub: "oude operationele records gewist", icon: Database },
  { label: "Prioriteit", value: "LocalLead", sub: "maar homepage blijft multi-business", icon: Target },
  { label: "Kanalen", value: "Resend + Twilio", sub: "mail + calls als bewijs", icon: PhoneCall },
  { label: "Doel", value: "€10k MRR", sub: "stap voor stap recurring", icon: Rocket },
]

const commandLoops = [
  {
    title: "1. Portfolio overzicht",
    text: "Alle businessen zichtbaar, maar met één duidelijke topprioriteit per week.",
    href: "/portfolio",
    cta: "Portfolio openen",
    icon: BriefcaseBusiness,
  },
  {
    title: "2. Taken als execution lane",
    text: "Geen oude backlog. Alleen taken die geld, bewijs of systemen dichterbij brengen.",
    href: "/tasks",
    cta: "Taken openen",
    icon: ClipboardList,
  },
  {
    title: "3. Research als geheugen",
    text: "Audits, agentoutput en beslissingen centraal bewaren in Command Center paths.",
    href: "/research",
    cta: "Research openen",
    icon: FileText,
  },
]

const sourceOfTruth = [
  { label: "Root", value: "C:\\Users\\Bart\\Projects\\Command-Center" },
  { label: "Research", value: "research/" },
  { label: "Operaties", value: "docs/operations/" },
  { label: "Team", value: "team/ en team/agents/" },
  { label: "Content", value: "content/<domein>/" },
]

const expansionIdeas = [
  "Business health scores per business: omzet, taken, blockers, volgende actie.",
  "Weekly CEO briefing: wat moet Bart vandaag beslissen, doen of negeren?",
  "Lead cockpit: Resend-formulieren + Twilio-calls + partnerstatus in één funnel.",
  "Agent lanes: Lisa/Wout/Jean-Cloud/Copycat/BeeldMaker met echte output en bewijslinks.",
  "Asset inventory: domeinen, sites, mailboxen, tracking, analytics en status per business.",
]

export default function CommandCenterHome() {
  return (
    <main className="space-y-6 text-white">
      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(245,145,30,0.25),_transparent_32rem),linear-gradient(135deg,_rgba(24,24,27,0.96),_rgba(7,7,10,1))] shadow-2xl">
        <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-[1.25fr_0.75fr] lg:p-10">
          <div>
            <Badge className="mb-5 border-white/10 bg-white/10 text-white">
              <Sparkles className="mr-1 h-3.5 w-3.5 text-[#F5911E]" /> Nieuw Command Center · clean business cockpit
            </Badge>
            <h1 className="max-w-4xl text-4xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              Eén cockpit voor <span className="text-[#F5911E]">alle businessen</span>. Geen oude rommel. Alleen uitvoering.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-300">
              Dit dashboard start opnieuw van nul: LocalLead krijgt de sprint-focus, maar Hazier, Calqo en Infinite Events blijven zichtbaar als business-units. Elke kaart moet uiteindelijk tonen: status, omzet, taken, blockers en volgende actie.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild className="bg-[#F5911E] text-black hover:bg-[#ffae45]">
                <Link href="/tasks">Execution lane openen <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
                <Link href="/portfolio">Portfolio bekijken</Link>
              </Button>
            </div>
          </div>

          <Card className="border-white/10 bg-black/25 text-white shadow-none backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-green-400" /> Clean-start regels</CardTitle>
              <CardDescription className="text-zinc-400">Dit voorkomt dat de oude Command Center-rotzooi terugkomt.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-zinc-300">
              <div className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4"><CheckCircle2 className="mt-0.5 h-4 w-4 text-green-400" /> Geen oude seed/demo-data terugzetten.</div>
              <div className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4"><CheckCircle2 className="mt-0.5 h-4 w-4 text-green-400" /> Nieuwe data moet bewust via UI/import of agent-output binnenkomen.</div>
              <div className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4"><CheckCircle2 className="mt-0.5 h-4 w-4 text-green-400" /> Elke business krijgt een eigenaar, volgende actie en meetbaar doel.</div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {operatingTiles.map((tile) => (
          <Card key={tile.label} className="border-white/10 bg-white/[0.04] text-white shadow-none">
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-2xl bg-white/10 p-3 text-[#F5911E]"><tile.icon className="h-5 w-5" /></div>
              <div>
                <div className="text-2xl font-black">{tile.value}</div>
                <div className="text-xs uppercase tracking-wide text-zinc-500">{tile.label}</div>
                <div className="text-sm text-zinc-300">{tile.sub}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-4">
        {businesses.map((biz) => (
          <Card key={biz.name} className="group relative overflow-hidden border-white/10 bg-zinc-900/75 text-white shadow-none transition hover:-translate-y-1 hover:border-white/20">
            <div className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: biz.accent }} />
            <CardHeader>
              <Badge className={biz.badge}>{biz.status}</Badge>
              <CardTitle className="mt-3 text-2xl">{biz.name}</CardTitle>
              <CardDescription className="text-zinc-400">{biz.type}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="min-h-[54px] text-sm leading-6 text-zinc-300">{biz.goal}</p>
              <div className="space-y-2">
                {biz.focus.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-zinc-300">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: biz.accent }} /> {item}
                  </div>
                ))}
              </div>
              <Button asChild variant="outline" className="w-full border-white/15 bg-white/5 text-white hover:bg-white/10">
                <Link href={biz.href}>Open {biz.name}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_0.85fr]">
        <Card className="border-white/10 bg-zinc-900/75 text-white shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ClipboardList className="h-5 w-5 text-[#F5911E]" /> Command loops</CardTitle>
            <CardDescription className="text-zinc-400">De drie schermen die de cockpit dagelijks bruikbaar maken.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-3">
            {commandLoops.map((loop) => (
              <div key={loop.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <loop.icon className="mb-3 h-5 w-5 text-[#F5911E]" />
                <div className="font-bold">{loop.title}</div>
                <p className="mt-2 min-h-[72px] text-sm leading-6 text-zinc-400">{loop.text}</p>
                <Link href={loop.href} className="mt-3 inline-flex items-center text-sm font-bold text-[#F5911E]">
                  {loop.cta} <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-[#F5911E]/25 bg-[#F5911E]/[0.06] text-white shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-[#F5911E]" /> Centrale source of truth</CardTitle>
            <CardDescription className="text-zinc-300">Blijvende output hoort in Command Center. Paperclip workdirs zijn tijdelijk.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {sourceOfTruth.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-black/20 p-3">
                <div className="text-xs uppercase tracking-wide text-zinc-500">{item.label}</div>
                <div className="mt-1 break-words font-mono text-xs text-zinc-100">{item.value}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-black">Uitbreidingen die ik hierna wil doen</h2>
            <p className="mt-1 text-sm text-zinc-400">Dit is hoe ik het echt omver wil blazen, niet gewoon een nieuwe homepage.</p>
          </div>
          <Badge className="w-fit border-[#F5911E]/25 bg-[#F5911E]/15 text-[#F5911E]">Roadmap</Badge>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          {expansionIdeas.map((idea, index) => (
            <div key={idea} className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-black text-black">{index + 1}</div>
              <p className="text-sm leading-6 text-zinc-300">{idea}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
