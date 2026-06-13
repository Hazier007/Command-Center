import Link from "next/link"
import {
  ArrowRight,
  BarChart3,
  Bot,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Euro,
  FileText,
  Globe2,
  Inbox,
  Landmark,
  Layers3,
  Megaphone,
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

const businessUnits = [
  {
    name: "LocalLead",
    label: "Rank & Rent / leadmachines",
    status: "Actieve sprint",
    goal: "€10k/mnd recurring via lokale aanvraagkanalen",
    focus: "Resend-ready sites, partner pipeline, Twilio calltracking zodra sites stabiel staan",
    route: "/locallead",
    accent: "#F5911E",
    icon: Target,
  },
  {
    name: "Calqo",
    label: "Calculator- en utility-sites",
    status: "Voorbereiden",
    goal: "SEO-traffic omzetten in affiliate, adsense, leads en interne links",
    focus: "Portfolio-inventaris, tracking, monetisatieblokken en compliance per calculator",
    route: "/portfolio",
    accent: "#38BDF8",
    icon: BarChart3,
  },
  {
    name: "Hazier",
    label: "Webdesign/SEO klanten",
    status: "Uitbouwen",
    goal: "Klantwerk, retainers, offertes, opleveringen en support centraal sturen",
    focus: "Klanten, taken, offertes, status, facturatie en opvolging samenbrengen",
    route: "/klanten",
    accent: "#A78BFA",
    icon: BriefcaseBusiness,
  },
  {
    name: "Infinite Events",
    label: "VZW / events",
    status: "Later verdiepen",
    goal: "Events, vrijwilligers, sponsors, planning en budgetten beheren",
    focus: "Eventkalender, draaiboeken, sponsorrelaties en operationele checklists",
    route: "/projects/infinite-events",
    accent: "#22C55E",
    icon: CalendarDays,
  },
]

const operatingLayers = [
  {
    title: "Command Inbox",
    text: "Eén plek voor inkomende ideeën, leads, agentrapporten, approvals en blokkades.",
    icon: Inbox,
    status: "Toevoegen",
  },
  {
    title: "CRM & pipeline",
    text: "Prospects, klanten, partners, sponsors en opvolging per businesslijn.",
    icon: Users,
    status: "Belangrijk",
  },
  {
    title: "Asset register",
    text: "Domeinen, sites, mailboxes, Vercel, Resend, Twilio, GA/GSC en eigenaarschap.",
    icon: Globe2,
    status: "Nodig",
  },
  {
    title: "Compliance vault",
    text: "Privacy, GDPR, cookies, contracten, VZW-documenten en disclaimers per project.",
    icon: ShieldCheck,
    status: "Gestart",
  },
  {
    title: "Automation health",
    text: "Resend, Twilio, cronjobs, Paperclip/Hermes en deploys met status en laatste test.",
    icon: Bot,
    status: "Later",
  },
  {
    title: "CEO weekrapport",
    text: "Elke week: cash, leads, taken, risico’s, beslissingen en eerstvolgende actie.",
    icon: FileText,
    status: "Aanrader",
  },
]

const localLeadReadiness = [
  { label: "Resend formulieren", detail: "locallead.info live; kernsites volgen", progress: 55 },
  { label: "GDPR/privacy", detail: "Baseline doorgegeven aan LocalLead-Hermes", progress: 35 },
  { label: "Partner outreach", detail: "Mailbox/Workspace eerst stabiel maken", progress: 25 },
  { label: "Twilio calls", detail: "Na Resend-ready sites starten met Poxy.be", progress: 15 },
]

const today = [
  "LocalLead-sites Resend-ready maken: formulier, ontvanger, BCC, testbewijs.",
  "Per site privacy/contact/voorwaarden en korte GDPR-formuliertekst toevoegen.",
  "Google Workspace/mailbox voorbereiden voor bart@locallead.info en aliases.",
  "Command Center verbreden van LocalLead-cockpit naar multi-business cockpit.",
]

const kpis = [
  { label: "Businesslijnen", value: "4", sub: "LocalLead, Calqo, Hazier, Infinite Events", icon: Layers3 },
  { label: "MRR doel", value: "€10k", sub: "eerste LocalLead mijlpaal", icon: Euro },
  { label: "Leadkanalen", value: "2", sub: "Resend + Twilio", icon: PhoneCall },
  { label: "Beslisfocus", value: "1", sub: "volgende actie per lijn", icon: Zap },
]

const localLeadSites = [
  { domain: "locallead.info", status: "Live partner gateway", next: "Mailbox + BCC-flow finaliseren", risk: "Gmail spam/reputatie monitoren" },
  { domain: "Poxy.be", status: "Eerste commerciële sprint", next: "Resend, GDPR, partnerlijst", risk: "Bewijs verzamelen vóór huurpitch" },
  { domain: "Daklekkages.be", status: "Urgente leadgen-niche", next: "Leadformulier + duidelijke partnerdoorsturing", risk: "Geen 24/7 claim zonder dekking" },
  { domain: "funderingsproblemen.be", status: "High-ticket SEO asset", next: "Disclaimer + offerte-intake", risk: "Geen technisch advies/garantie suggereren" },
  { domain: "gevelwerkengent.be", status: "Lokale Rank & Rent kandidaat", next: "Gent partnerproof + contactflow", risk: "Niet doen alsof LocalLead uitvoerder is" },
]

const sourceOfTruth = [
  { label: "Centrale map", value: "C:\\Users\\Bart\\Projects\\Command-Center" },
  { label: "Research & audits", value: "research/" },
  { label: "Procedures & GDPR", value: "docs/operations/" },
  { label: "Agent/team afspraken", value: "team/ en team/agents/" },
  { label: "Sitecontent", value: "content/<domein>/" },
]

const roadmap = [
  {
    phase: "Nu",
    title: "LocalLead operationeel krijgen",
    bullets: ["Resend per site", "GDPR-baseline", "mailbox/Workspace", "eerste partnerpipeline"],
  },
  {
    phase: "Daarna",
    title: "Calqo als assetgroep toevoegen",
    bullets: ["calculator inventory", "monetisatiepad", "affiliate/cookie compliance", "SEO quick wins"],
  },
  {
    phase: "Parallel",
    title: "Hazier klanten centraliseren",
    bullets: ["klantenstatus", "offertes", "supporttaken", "retainer/urenbewaking"],
  },
  {
    phase: "Later",
    title: "Infinite Events module",
    bullets: ["eventkalender", "sponsors", "vrijwilligers", "budget/draaiboek"],
  },
]

export default function CommandCenterHome() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(245,145,30,0.20),_transparent_32rem),radial-gradient(circle_at_top_right,_rgba(56,189,248,0.12),_transparent_28rem),linear-gradient(135deg,_rgba(24,24,27,0.94),_rgba(9,9,11,1))]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <Badge className="mb-4 border-[#F5911E]/30 bg-[#F5911E]/15 text-[#F5911E]">
                <Sparkles className="mr-1 h-3.5 w-3.5" /> Bart Command Center
              </Badge>
              <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
                Eén cockpit voor <span className="text-[#F5911E]">LocalLead</span>, Calqo, Hazier en Infinite Events.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-300 sm:text-base">
                De homepage wordt de strategische laag boven je bedrijven: elke businesslijn krijgt doelen,
                assets, taken, pipeline, compliance en eerstvolgende acties — geen verborgen oude demo-cockpit.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="bg-[#F5911E] text-black hover:bg-[#ffae45]">
                <Link href="/tasks">
                  Taken openen <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
                <Link href="/portfolio">Portfolio bekijken</Link>
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

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-4">
          {businessUnits.map((unit) => (
            <Card key={unit.name} className="border-white/10 bg-zinc-900/70 text-white shadow-none">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div className="rounded-xl p-3" style={{ backgroundColor: `${unit.accent}22`, color: unit.accent }}>
                    <unit.icon className="h-5 w-5" />
                  </div>
                  <Badge className="border-white/10 bg-white/10 text-zinc-200">{unit.status}</Badge>
                </div>
                <CardTitle>{unit.name}</CardTitle>
                <CardDescription className="text-zinc-400">{unit.label}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-xs uppercase tracking-wide text-zinc-500">Doel</div>
                  <p className="mt-1 text-sm text-zinc-200">{unit.goal}</p>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-zinc-500">Focus</div>
                  <p className="mt-1 text-sm text-zinc-400">{unit.focus}</p>
                </div>
                <Button asChild variant="outline" className="w-full border-white/15 bg-white/5 text-white hover:bg-white/10">
                  <Link href={unit.route}>Openen</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-6 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
        <Card className="border-white/10 bg-zinc-900/70 text-white shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-[#F5911E]" /> Vandaag uitvoeren
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Alleen acties die de cockpit betrouwbaarder maken of geld dichterbij brengen.
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
              <TrendingUp className="h-5 w-5 text-green-400" /> LocalLead readiness
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Eerst sites op punt, dan Twilio en partnerverkoop.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {localLeadReadiness.map((item) => (
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
              <Globe2 className="h-5 w-5 text-[#F5911E]" /> LocalLead site readiness
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Deze sites worden nu eerst Resend/GDPR-ready; Twilio komt daarna als calltrackinglaag.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
              {localLeadSites.map((site) => (
                <div key={site.domain} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <h3 className="font-black">{site.domain}</h3>
                  <p className="mt-2 text-sm text-zinc-300">{site.status}</p>
                  <div className="mt-4 space-y-3 text-sm">
                    <div className="flex items-start gap-2 text-zinc-300">
                      <Rocket className="mt-0.5 h-4 w-4 shrink-0 text-[#F5911E]" /> <span>{site.next}</span>
                    </div>
                    <div className="flex items-start gap-2 text-zinc-400">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-green-400" /> <span>{site.risk}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-6 sm:px-6 lg:grid-cols-3 lg:px-8">
        <Card className="border-white/10 bg-zinc-900/70 text-white shadow-none lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Landmark className="h-5 w-5 text-[#F5911E]" /> Toevoegingen die ik zelf zou voorzien
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Dit maakt het Command Center bruikbaar als dagelijkse centrale cockpit, niet enkel als dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {operatingLayers.map((layer) => (
              <div key={layer.title} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <layer.icon className="h-5 w-5 text-[#F5911E]" />
                  <Badge className="border-white/10 bg-white/10 text-zinc-300">{layer.status}</Badge>
                </div>
                <div className="font-bold">{layer.title}</div>
                <p className="mt-2 text-sm text-zinc-400">{layer.text}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-zinc-900/70 text-white shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400" /> Roadmap
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Volgorde zodat we niet alles tegelijk half bouwen.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {roadmap.map((item) => (
              <div key={item.title} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <Badge className="mb-2 border-[#F5911E]/30 bg-[#F5911E]/15 text-[#F5911E]">{item.phase}</Badge>
                <div className="font-bold">{item.title}</div>
                <ul className="mt-2 space-y-1 text-sm text-zinc-400">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>• {bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
        <Card className="border-[#F5911E]/25 bg-[#F5911E]/[0.06] text-white shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#F5911E]" /> Centrale source of truth
            </CardTitle>
            <CardDescription className="text-zinc-300">
              LocalLead, Hermes en Paperclip-agents bewaren blijvende output hier — Paperclip workdirs zijn tijdelijk.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
            {sourceOfTruth.map((item) => (
              <div key={item.label} className="rounded-xl border border-white/10 bg-black/20 p-3">
                <div className="text-xs uppercase tracking-wide text-zinc-500">{item.label}</div>
                <div className="mt-1 break-words font-mono text-xs text-zinc-100">{item.value}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="border-t border-white/10 bg-black/25">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:px-6 md:grid-cols-3 lg:px-8">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <Megaphone className="h-5 w-5 text-[#F5911E]" />
            <div>
              <div className="font-bold">Geen bulkdrukte</div>
              <div className="text-sm text-zinc-400">Elke businesslijn krijgt duidelijke next actions en bewijs.</div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <ShieldCheck className="h-5 w-5 text-[#F5911E]" />
            <div>
              <div className="font-bold">Compliance mee ingebouwd</div>
              <div className="text-sm text-zinc-400">GDPR, cookies, contracten en claims niet achteraf oplappen.</div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <Rocket className="h-5 w-5 text-[#F5911E]" />
            <div>
              <div className="font-bold">Eerst geld, dan schaal</div>
              <div className="text-sm text-zinc-400">LocalLead krijgt prioriteit tot de eerste recurring partner draait.</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
