import Link from "next/link"
import {
  ArrowRight,
  BadgeEuro,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardList,
  Database,
  Euro,
  FileText,
  Gauge,
  Globe2,
  Inbox,
  Mail,
  PhoneCall,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const businesses = [
  {
    name: "LocalLead",
    type: "Rank & Rent / leadgen",
    status: "Sprint focus",
    owner: "Bart + Hermes",
    health: 72,
    goal: "€10k/maand recurring via verhuurde leadsites",
    nextAction: "Eerste partnerdeal forceren via Poxy.be / Daklekkages.be / funderingen.",
    revenueNow: "€0 MRR",
    target: "€10k MRR",
    blockers: ["mailreputatie warm krijgen", "Twilio nummers koppelen", "partnerpipeline starten"],
    assets: ["Poxy.be", "Daklekkages.be", "funderingsproblemen.be", "gevelwerkengent.be"],
    href: "/locallead",
    accent: "#F5911E",
    badge: "bg-[#F5911E]/15 text-[#F5911E] border-[#F5911E]/25",
  },
  {
    name: "Hazier",
    type: "Webdesign & SEO",
    status: "Cashflow basis",
    owner: "Bart",
    health: 62,
    goal: "Klantwerk en SEO als stabiele basis onder LocalLead",
    nextAction: "Lopende klanten, facturatie en nieuwe aanvragen zichtbaar maken.",
    revenueNow: "actief",
    target: "stabiele basis",
    blockers: ["pipeline niet centraal", "facturatie/klantstatus nog niet gekoppeld"],
    assets: ["hazier.be", "klanten", "SEO cases"],
    href: "/klanten",
    accent: "#A78BFA",
    badge: "bg-violet-500/15 text-violet-300 border-violet-500/25",
  },
  {
    name: "Calqo",
    type: "Calculator/tools & media assets",
    status: "Assetfase",
    owner: "Hermes",
    health: 44,
    goal: "Utility sites, SEO en later AdSense/affiliate kansen",
    nextAction: "Asset-inventaris en monetisatiepad vastleggen, nog geen afleiding maken.",
    revenueNow: "pre-revenue",
    target: "SEO assets",
    blockers: ["positionering kiezen", "eerste tool/site inventariseren"],
    assets: ["calculators", "toolcontent", "SEO backlog"],
    href: "/portfolio",
    accent: "#38BDF8",
    badge: "bg-sky-500/15 text-sky-300 border-sky-500/25",
  },
  {
    name: "Infinite Events",
    type: "Events / VZW",
    status: "Watch mode",
    owner: "Bart",
    health: 51,
    goal: "Geen ruis in de sprint, wel zicht op deadlines en verplichtingen",
    nextAction: "Alleen deadlines, budget en administratie opvolgen die risico geven.",
    revenueNow: "n.v.t.",
    target: "controle",
    blockers: ["deadlines nog niet in cockpit", "budgetstatus niet gekoppeld"],
    assets: ["events", "administratie", "budget"],
    href: "/tasks",
    accent: "#34D399",
    badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
  },
]

const ceoToday = [
  { title: "Kies één geldactie", text: "LocalLead blijft de sprint: partnerpipeline starten, niet perfectioneren.", icon: Target, tone: "text-[#F5911E]" },
  { title: "Maak delivery betrouwbaar", text: "Resend + Gmail/BCC + Twilio-calltracking moeten bewijs leveren dat leads binnenkomen.", icon: PhoneCall, tone: "text-sky-300" },
  { title: "Laat agents bewijs leveren", text: "Geen agent-output zonder link, pad, status of zichtbaar resultaat in de cockpit.", icon: ShieldCheck, tone: "text-emerald-300" },
]

const revenueFunnel = [
  { label: "Assets klaar", value: 7, detail: "domeinen/sites met potentieel", icon: Globe2 },
  { label: "Leads zichtbaar", value: 0, detail: "nog te koppelen vanuit forms/calls", icon: Inbox },
  { label: "Partners actief", value: 0, detail: "eerste recurring deal is doel", icon: Users },
  { label: "MRR", value: "€0", detail: "target €10k/maand", icon: BadgeEuro },
]

const assetInventory = [
  { group: "Leadgen domeinen", items: ["poxy.be", "daklekkages.be", "funderingsproblemen.be", "gevelwerkengent.be", "vogeloverlast.be"] },
  { group: "Kanalen", items: ["Resend", "Twilio", "Gmail fallback", "info@hazier.be"] },
  { group: "Tracking", items: ["GA4", "Search Console", "call logs", "form submissions"] },
  { group: "Werkmappen", items: ["research/", "docs/operations/", "content/<domein>/", "team/agents/"] },
]

const agentLanes = [
  { name: "Lisa", role: "planning & overdracht", output: "taken, deadlines, handoffs", emoji: "📋" },
  { name: "Wout", role: "SEO & research", output: "audits, SERP checks, kansen", emoji: "🔎" },
  { name: "Jean-Cloud", role: "cloud & automations", output: "APIs, deploys, integraties", emoji: "☁️" },
  { name: "Copycat", role: "copy & outreach", output: "mails, follow-ups, sitecopy", emoji: "✍️" },
  { name: "BeeldMaker", role: "visual assets", output: "hero's, thumbnails, beelden", emoji: "🎨" },
]

const operatingTiles = [
  { label: "Cockpit", value: "v2", sub: "multi-business OS", icon: Gauge },
  { label: "Prioriteit", value: "LocalLead", sub: "eerste recurring deal", icon: Target },
  { label: "Bewijs", value: "Forms + Calls", sub: "Resend/Twilio naar funnel", icon: PhoneCall },
  { label: "Ritme", value: "CEO Briefing", sub: "dagelijks scherp kiezen", icon: Zap },
]

const commandLoops = [
  {
    title: "1. Portfolio health",
    text: "Elke business heeft score, eigenaar, blocker en volgende actie. Geen blinde vlekken.",
    href: "/portfolio",
    cta: "Portfolio openen",
    icon: BriefcaseBusiness,
  },
  {
    title: "2. Execution lane",
    text: "Taken zijn geen backlogkerkhof maar een lane richting geld, bewijs of systemen.",
    href: "/tasks",
    cta: "Taken openen",
    icon: ClipboardList,
  },
  {
    title: "3. Research memory",
    text: "Audits, agentoutput en beslissingen landen centraal en blijven herbruikbaar.",
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

function healthTone(score: number) {
  if (score >= 70) return "text-emerald-300"
  if (score >= 50) return "text-amber-300"
  return "text-red-300"
}

export default function CommandCenterHome() {
  return (
    <main className="space-y-6 text-white">
      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(245,145,30,0.28),_transparent_31rem),radial-gradient(circle_at_80%_20%,_rgba(56,189,248,0.12),_transparent_22rem),linear-gradient(135deg,_rgba(24,24,27,0.98),_rgba(7,7,10,1))] shadow-2xl">
        <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:p-10">
          <div>
            <Badge className="mb-5 border-white/10 bg-white/10 text-white">
              <Sparkles className="mr-1 h-3.5 w-3.5 text-[#F5911E]" /> Command Center v2 · Bart OS
            </Badge>
            <h1 className="max-w-5xl text-4xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              Eén cockpit voor <span className="text-[#F5911E]">geld, focus en uitvoering</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-300">
              Dit is de nieuwe command layer boven LocalLead, Hazier, Calqo en Infinite Events: business health, CEO-beslissingen, agent lanes, assets en revenue-signalen in één scherm.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild className="bg-[#F5911E] text-black hover:bg-[#ffae45]">
                <Link href="/tasks">Start execution <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
                <Link href="/team">Open team lanes</Link>
              </Button>
            </div>
          </div>

          <Card className="border-white/10 bg-black/30 text-white shadow-none backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Rocket className="h-5 w-5 text-[#F5911E]" /> CEO Today</CardTitle>
              <CardDescription className="text-zinc-400">Wat vandaag telt — geen ruis, geen oude rommel.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {ceoToday.map((item) => (
                <div key={item.title} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <item.icon className={`mt-0.5 h-5 w-5 ${item.tone}`} />
                  <div>
                    <div className="font-bold">{item.title}</div>
                    <div className="mt-1 text-sm leading-6 text-zinc-400">{item.text}</div>
                  </div>
                </div>
              ))}
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

      <section className="grid gap-4 xl:grid-cols-4">
        {businesses.map((biz) => (
          <Card key={biz.name} className="group relative overflow-hidden border-white/10 bg-zinc-900/75 text-white shadow-none transition hover:-translate-y-1 hover:border-white/20">
            <div className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: biz.accent }} />
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <Badge className={biz.badge}>{biz.status}</Badge>
                <span className={`text-2xl font-black ${healthTone(biz.health)}`}>{biz.health}</span>
              </div>
              <CardTitle className="mt-3 text-2xl">{biz.name}</CardTitle>
              <CardDescription className="text-zinc-400">{biz.type} · {biz.owner}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="mb-2 flex justify-between text-xs text-zinc-500"><span>Health score</span><span>{biz.health}%</span></div>
                <Progress value={biz.health} className="h-2 bg-white/10" />
              </div>
              <p className="text-sm leading-6 text-zinc-300">{biz.goal}</p>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                <div className="text-xs uppercase tracking-wide text-zinc-500">Volgende actie</div>
                <div className="mt-1 text-sm leading-6 text-zinc-200">{biz.nextAction}</div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="rounded-xl bg-white/[0.04] p-3"><div className="text-zinc-500">Nu</div><div className="font-bold">{biz.revenueNow}</div></div>
                <div className="rounded-xl bg-white/[0.04] p-3"><div className="text-zinc-500">Doel</div><div className="font-bold">{biz.target}</div></div>
              </div>
              <div className="space-y-2">
                {biz.blockers.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-zinc-400">
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

      <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="border-[#F5911E]/25 bg-[#F5911E]/[0.06] text-white shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-[#F5911E]" /> Revenue cockpit</CardTitle>
            <CardDescription className="text-zinc-300">De funnel die LocalLead van asset naar recurring omzet moet brengen.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {revenueFunnel.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <item.icon className="mb-3 h-5 w-5 text-[#F5911E]" />
                <div className="text-3xl font-black">{item.value}</div>
                <div className="mt-1 text-sm font-bold">{item.label}</div>
                <div className="mt-1 text-xs leading-5 text-zinc-400">{item.detail}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-zinc-900/75 text-white shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Database className="h-5 w-5 text-sky-300" /> Asset inventory</CardTitle>
            <CardDescription className="text-zinc-400">Wat het systeem moet bewaken per business en kanaal.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            {assetInventory.map((group) => (
              <div key={group.group} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="mb-3 font-bold">{group.group}</div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Badge key={item} variant="outline" className="border-white/10 bg-black/20 text-zinc-300">{item}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_0.85fr]">
        <Card className="border-white/10 bg-zinc-900/75 text-white shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-[#F5911E]" /> Agent lanes</CardTitle>
            <CardDescription className="text-zinc-400">Elke agent moet bewijs leveren: output, pad, link of status.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-5">
            {agentLanes.map((agent) => (
              <div key={agent.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-3xl">{agent.emoji}</div>
                <div className="mt-3 font-black">{agent.name}</div>
                <div className="text-xs uppercase tracking-wide text-zinc-500">{agent.role}</div>
                <div className="mt-3 text-sm leading-6 text-zinc-400">{agent.output}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-zinc-900/75 text-white shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ClipboardList className="h-5 w-5 text-[#F5911E]" /> Command loops</CardTitle>
            <CardDescription className="text-zinc-400">Dagelijks ritme voor de cockpit.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {commandLoops.map((loop) => (
              <div key={loop.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <loop.icon className="mb-3 h-5 w-5 text-[#F5911E]" />
                <div className="font-bold">{loop.title}</div>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{loop.text}</p>
                <Link href={loop.href} className="mt-3 inline-flex items-center text-sm font-bold text-[#F5911E]">
                  {loop.cta} <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="border-white/10 bg-white/[0.035] text-white shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-green-400" /> Clean-start regels</CardTitle>
            <CardDescription className="text-zinc-400">Bescherming tegen oude rommel.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-zinc-300">
            <div className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4"><CheckCircle2 className="mt-0.5 h-4 w-4 text-green-400" /> Geen oude seed/demo-data terugzetten.</div>
            <div className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4"><CheckCircle2 className="mt-0.5 h-4 w-4 text-green-400" /> Nieuwe data komt bewust via UI, import of agent-output binnen.</div>
            <div className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4"><CheckCircle2 className="mt-0.5 h-4 w-4 text-green-400" /> Elke business krijgt eigenaar, volgende actie en meetbaar doel.</div>
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
    </main>
  )
}
