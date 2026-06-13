import Link from "next/link"
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Database,
  FileText,
  Globe2,
  Inbox,
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

const cleanSlateStats = [
  { label: "Database", value: "0", sub: "oude records gewist", icon: Database },
  { label: "Focus", value: "1", sub: "LocalLead eerst", icon: Target },
  { label: "Leadkanalen", value: "2", sub: "Resend + Twilio", icon: PhoneCall },
  { label: "Doel", value: "€10k", sub: "recurring MRR", icon: Rocket },
]

const setupSteps = [
  {
    title: "Sites opnieuw toevoegen",
    text: "Voeg alleen de LocalLead-sites toe die we deze sprint echt operationeel maken.",
    href: "/portfolio",
    cta: "Sites beheren",
    icon: Globe2,
  },
  {
    title: "Takenlijst proper opbouwen",
    text: "Nieuwe taken komen vanaf nu uit Resend, Twilio, Workspace en partnerverkoop — geen oude demo-backlog.",
    href: "/tasks",
    cta: "Taken openen",
    icon: ClipboardList,
  },
  {
    title: "Research centraal bewaren",
    text: "Audits en agentoutput horen in Command Center research, niet in tijdelijke Paperclip workdirs.",
    href: "/research",
    cta: "Research openen",
    icon: FileText,
  },
]

const firstRecords = [
  "locallead.info — partner gateway / Resend-flow",
  "Poxy.be — eerste commerciële sprint",
  "Daklekkages.be — urgentie-niche met calltracking",
  "funderingsproblemen.be — high-ticket intake met disclaimer",
  "gevelwerkengent.be — lokale Rank & Rent kandidaat",
]

const operatingRules = [
  {
    title: "Geen oude data terugzetten",
    text: "Legacy seed is uitgeschakeld. Nieuwe data wordt bewust toegevoegd via UI/imports.",
    icon: ShieldCheck,
  },
  {
    title: "Resend eerst",
    text: "Alle kernsites krijgen formulier, ontvanger, BCC, testbewijs en privacytekst.",
    icon: Mail,
  },
  {
    title: "Twilio daarna",
    text: "Eerst één trackingnummer op Poxy.be, dan uitrollen per site/partner.",
    icon: PhoneCall,
  },
  {
    title: "Partnerpipeline klein starten",
    text: "Geen bulkspam: prospects kwalificeren, persoonlijke drafts maken, Bart keurt goed.",
    icon: Users,
  },
]

const sourceOfTruth = [
  { label: "Centrale map", value: "C:\\Users\\Bart\\Projects\\Command-Center" },
  { label: "Research & audits", value: "research/" },
  { label: "Procedures & GDPR", value: "docs/operations/" },
  { label: "Agent/team afspraken", value: "team/ en team/agents/" },
  { label: "Sitecontent", value: "content/<domein>/" },
]

export default function CommandCenterHome() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(245,145,30,0.22),_transparent_34rem),linear-gradient(135deg,_rgba(24,24,27,0.94),_rgba(9,9,11,1))]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <Badge className="mb-4 border-[#F5911E]/30 bg-[#F5911E]/15 text-[#F5911E]">
                <Sparkles className="mr-1 h-3.5 w-3.5" /> Clean sheet actief
              </Badge>
              <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
                LocalLead start opnieuw proper: <span className="text-[#F5911E]">geen oude demo-data</span>, alleen wat geld dichterbij brengt.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-300 sm:text-base">
                De oude Command Center-data is gewist. Vanaf nu bouwen we dit dashboard opnieuw op rond LocalLead:
                Resend-ready sites, Twilio-calltracking, partnerpipeline, bewijs en recurring verhuur.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="bg-[#F5911E] text-black hover:bg-[#ffae45]">
                <Link href="/portfolio">
                  Eerste sites toevoegen <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
                <Link href="/tasks">Nieuwe taken starten</Link>
              </Button>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cleanSlateStats.map((stat) => (
              <Card key={stat.label} className="border-white/10 bg-white/[0.04] text-white shadow-none">
                <CardContent className="flex items-center gap-4 pt-6">
                  <div className="rounded-xl bg-[#F5911E]/15 p-3 text-[#F5911E]">
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-black">{stat.value}</div>
                    <div className="text-xs uppercase tracking-wide text-zinc-500">{stat.label}</div>
                    <div className="text-sm text-zinc-300">{stat.sub}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <Card className="border-white/10 bg-zinc-900/70 text-white shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-[#F5911E]" /> Eerst opnieuw invullen
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Dit zijn geen database-records meer, maar de startlijst die we bewust opnieuw toevoegen.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {firstRecords.map((item, index) => (
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
              <Inbox className="h-5 w-5 text-green-400" /> Clean-sheet regels
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Deze regels houden het dashboard proper terwijl we LocalLead opnieuw vullen.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {operatingRules.map((rule) => (
              <div key={rule.title} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center gap-2 font-bold">
                  <rule.icon className="h-4 w-4 text-[#F5911E]" /> {rule.title}
                </div>
                <p className="mt-2 text-sm text-zinc-400">{rule.text}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-3">
          {setupSteps.map((step) => (
            <Card key={step.title} className="border-white/10 bg-zinc-900/70 text-white shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <step.icon className="h-5 w-5 text-[#F5911E]" /> {step.title}
                </CardTitle>
                <CardDescription className="text-zinc-400">{step.text}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full border-white/15 bg-white/5 text-white hover:bg-white/10">
                  <Link href={step.href}>{step.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
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
            <CheckCircle2 className="h-5 w-5 text-green-400" />
            <div>
              <div className="font-bold">Reset uitgevoerd</div>
              <div className="text-sm text-zinc-400">Operationele tabellen zijn leeg; auth blijft behouden.</div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <ShieldCheck className="h-5 w-5 text-[#F5911E]" />
            <div>
              <div className="font-bold">Legacy seed uit</div>
              <div className="text-sm text-zinc-400">Oude demo-data kan niet per ongeluk teruggezet worden.</div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <Rocket className="h-5 w-5 text-[#F5911E]" />
            <div>
              <div className="font-bold">Nu LocalLead vullen</div>
              <div className="text-sm text-zinc-400">Eerst Resend-ready sites, daarna Twilio en partnerverkoop.</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
