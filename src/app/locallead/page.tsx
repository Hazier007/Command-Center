import Link from "next/link"
import {
  ArrowRight,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Globe2,
  Mail,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const portfolio = [
  {
    domain: "poxy.be",
    niche: "Epoxyvloeren",
    region: "Vlaanderen",
    phase: "Monetize first",
    priority: "P0",
    monthlyTarget: "€1.500–€3.000",
    leadCapture: "Formulier actief",
    resend: "Naar info@hazier.be",
    twilio: "Wacht op KBO",
    seo: "Live site, lead-ready cleanup",
    owner: "Lisa + JC",
    nextAction: "Partneraanbod maken en eerste 20 epoxybedrijven contacteren.",
  },
  {
    domain: "daklekkages.be",
    niche: "Daklekkage spoed/offertes",
    region: "Vlaanderen",
    phase: "Build lead routing",
    priority: "P0",
    monthlyTarget: "€1.000–€2.500",
    leadCapture: "Te verifiëren",
    resend: "Nog koppelen",
    twilio: "Wacht op KBO",
    seo: "High-intent domein",
    owner: "JC + Wout",
    nextAction: "Form endpoint, conversie-event en trustpagina's controleren.",
  },
  {
    domain: "funderingsproblemen.be",
    niche: "Funderingsherstel",
    region: "Vlaanderen/Nederlandstalig BE",
    phase: "SEO + trust cleanup",
    priority: "P0",
    monthlyTarget: "€2.000–€5.000",
    leadCapture: "Nog harden",
    resend: "Nog koppelen",
    twilio: "Later",
    seo: "High-ticket, audit aanwezig",
    owner: "Wout + Copycat",
    nextAction: "Trust routes, sitemap en partnerpositionering afronden.",
  },
  {
    domain: "gevelwerkengent.be",
    niche: "Gevelwerken",
    region: "Gent",
    phase: "Validate demand",
    priority: "P1",
    monthlyTarget: "€750–€1.500",
    leadCapture: "Site bestaat",
    resend: "Nog koppelen",
    twilio: "Later",
    seo: "Lokale niche-site",
    owner: "Wout",
    nextAction: "SERP/leadpad check en lokale aannemerslijst maken.",
  },
  {
    domain: "boomontwortelen.be/cities",
    niche: "Boom ontwortelen",
    region: "Gent, Leuven, Antwerpen, Brugge",
    phase: "City expansion",
    priority: "P1",
    monthlyTarget: "€500–€1.500",
    leadCapture: "Nog standaardiseren",
    resend: "Nog koppelen",
    twilio: "Later",
    seo: "City landing pages",
    owner: "Copycat + Wout",
    nextAction: "Per stad één sterke offertepagina + lokale partnerlijst.",
  },
  {
    domain: "renovationstenerife.com",
    niche: "Renovatie Tenerife",
    region: "Tenerife",
    phase: "International test",
    priority: "P2",
    monthlyTarget: "€750–€2.000",
    leadCapture: "Te verifiëren",
    resend: "Nog koppelen",
    twilio: "Niet prioritair",
    seo: "Engelstalige niche",
    owner: "Lisa",
    nextAction: "Pas oppakken na eerste Vlaamse recurring deal.",
  },
  {
    domain: "alsacerenovation.fr",
    niche: "Renovatie Elzas",
    region: "Alsace",
    phase: "Existing site",
    priority: "P2",
    monthlyTarget: "€500–€1.500",
    leadCapture: "Site bestaat",
    resend: "Nog koppelen",
    twilio: "Niet prioritair",
    seo: "Franstalige long-tail",
    owner: "Lisa",
    nextAction: "Later bundelen met internationale renovatie-aanpak.",
  },
] as const

const agents = [
  { name: "Lisa", role: "Prioriteiten, planning en partnerstrategie", status: "Actief", focus: "Poxy dealflow" },
  { name: "JC", role: "Bouwt routes, forms, dashboards en fixes", status: "Actief", focus: "Lead capture hardening" },
  { name: "Wout", role: "SEO, SERP research en prospectlijsten", status: "Actief", focus: "High-ticket niches" },
  { name: "Copycat", role: "Content briefs, city pages en trustcopy", status: "Actief", focus: "Conversion copy" },
  { name: "BeeldMaker", role: "OpenAI image generation voor LocalLead assets", status: "Gepland", focus: "Hero/OG visuals" },
] as const

const operatingChecklist = [
  "Elke site heeft een server-side lead endpoint en testbare success response.",
  "Resend stuurt operator-notificatie naar Hazier en later naar actieve partner.",
  "Twilio krijgt pas prioriteit zodra KBO-verificatie rond is.",
  "GA/GSC meten formulier-success, call-clicks en partnerwaarde.",
  "Elke site krijgt privacy/contact/trustcopy die duidelijk maakt dat aanvragen naar lokale partners kunnen gaan.",
] as const

const nextActions = [
  { title: "Poxy launch partner aanbod", owner: "Lisa", due: "Deze week", impact: "Eerste recurring deal" },
  { title: "Lead endpoint audit voor Poxy/Daklekkages/Funderingsproblemen", owner: "JC", due: "Vandaag/morgen", impact: "Geen leads verliezen" },
  { title: "20 epoxybedrijven + 20 funderingsbedrijven prospectlijst", owner: "Wout", due: "Deze week", impact: "Sales pipeline" },
  { title: "Trustpagina templates voor R&R-sites", owner: "Copycat", due: "Deze week", impact: "Conversie + compliance" },
] as const

function priorityClass(priority: string) {
  if (priority === "P0") return "border-red-500/40 bg-red-500/10 text-red-300"
  if (priority === "P1") return "border-amber-500/40 bg-amber-500/10 text-amber-300"
  return "border-zinc-600 bg-zinc-800 text-zinc-300"
}

function statusClass(status: string) {
  if (status === "Actief") return "border-green-500/40 bg-green-500/10 text-green-300"
  return "border-blue-500/40 bg-blue-500/10 text-blue-300"
}

export default function LocalLeadPage() {
  const p0Sites = portfolio.filter((site) => site.priority === "P0")
  const targetLow = 8000
  const targetHigh = 19000
  const resendReady = portfolio.filter((site) => site.resend.includes("info@hazier.be")).length
  const twilioBlocked = portfolio.filter((site) => site.twilio.includes("KBO")).length

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#F5911E]/30 bg-[#F5911E]/10 px-3 py-1 text-xs font-medium text-[#F5911E]">
              <Target className="h-3.5 w-3.5" /> LocalLead operating cockpit
            </div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Van portfolio naar €10k/maand recurring</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
              Eén scherm voor Bart om te zien welke Rank & Rent-assets eerst geld moeten opleveren,
              welke lead-routing nog ontbreekt en welke agent de volgende actie draagt.
            </p>
          </div>
          <Link
            href="/tasks"
            className="inline-flex items-center gap-2 rounded-xl bg-[#F5911E] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#F5911E]/90"
          >
            Naar taken <ArrowRight className="h-4 w-4" />
          </Link>
        </header>

        <section className="mb-8 grid gap-4 md:grid-cols-4">
          <Card className="border-zinc-800 bg-zinc-900/70">
            <CardContent className="p-5">
              <Globe2 className="mb-3 h-5 w-5 text-[#F5911E]" />
              <div className="text-3xl font-bold">{portfolio.length}</div>
              <p className="text-sm text-zinc-400">Portfolio assets in cockpit</p>
            </CardContent>
          </Card>
          <Card className="border-red-500/30 bg-red-500/10">
            <CardContent className="p-5">
              <Sparkles className="mb-3 h-5 w-5 text-red-300" />
              <div className="text-3xl font-bold">{p0Sites.length}</div>
              <p className="text-sm text-red-200/80">P0-sites: eerst monetiseren</p>
            </CardContent>
          </Card>
          <Card className="border-green-500/30 bg-green-500/10">
            <CardContent className="p-5">
              <Mail className="mb-3 h-5 w-5 text-green-300" />
              <div className="text-3xl font-bold">{resendReady}/{portfolio.length}</div>
              <p className="text-sm text-green-200/80">Resend bekend/ready</p>
            </CardContent>
          </Card>
          <Card className="border-blue-500/30 bg-blue-500/10">
            <CardContent className="p-5">
              <PhoneCall className="mb-3 h-5 w-5 text-blue-300" />
              <div className="text-3xl font-bold">{twilioBlocked}</div>
              <p className="text-sm text-blue-200/80">Twilio wacht op KBO</p>
            </CardContent>
          </Card>
        </section>

        <section className="mb-8 grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
          <Card className="border-zinc-800 bg-zinc-900/70">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <CircleDollarSign className="h-5 w-5 text-[#F5911E]" /> Revenue runway
              </CardTitle>
              <CardDescription>
                Indicatieve range op basis van de huidige portfolio. Niet als belofte, wel als sturingsdoel.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-5">
                <div className="text-4xl font-bold text-[#F5911E]">
                  €{targetLow.toLocaleString("nl-BE")}–€{targetHigh.toLocaleString("nl-BE")}
                </div>
                <p className="mt-2 text-sm text-zinc-400">
                  Maandelijkse huurpotentie zodra de P0-assets meetbare leads en actieve partners hebben.
                </p>
                <div className="mt-4 h-3 overflow-hidden rounded-full bg-zinc-800">
                  <div className="h-full w-[52%] rounded-full bg-[#F5911E]" />
                </div>
                <p className="mt-2 text-xs text-zinc-500">Focus: eerst één betalende partner, daarna systeem herhalen.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-zinc-800 bg-zinc-900/70">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <ShieldCheck className="h-5 w-5 text-green-400" /> Minimum viable lead stack
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {operatingChecklist.map((item) => (
                <div key={item} className="flex gap-3 text-sm text-zinc-300">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
                  <span>{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold">Portfolio board</h2>
              <p className="text-sm text-zinc-500">Rij per asset, met focus op lead capture, routing en eerstvolgende actie.</p>
            </div>
            <Badge className="border-[#F5911E]/30 bg-[#F5911E]/10 text-[#F5911E]">P0 eerst</Badge>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {portfolio.map((site) => (
              <Card key={site.domain} className="border-zinc-800 bg-zinc-900/70">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle className="text-lg text-white">{site.domain}</CardTitle>
                      <CardDescription>{site.niche} · {site.region}</CardDescription>
                    </div>
                    <Badge className={priorityClass(site.priority)}>{site.priority}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2 text-sm sm:grid-cols-2">
                    <div className="rounded-lg bg-zinc-950/70 p-3">
                      <p className="text-xs uppercase tracking-wide text-zinc-500">Fase</p>
                      <p className="font-medium text-zinc-100">{site.phase}</p>
                    </div>
                    <div className="rounded-lg bg-zinc-950/70 p-3">
                      <p className="text-xs uppercase tracking-wide text-zinc-500">Target</p>
                      <p className="font-medium text-zinc-100">{site.monthlyTarget}/m</p>
                    </div>
                    <div className="rounded-lg bg-zinc-950/70 p-3">
                      <p className="text-xs uppercase tracking-wide text-zinc-500">Lead capture</p>
                      <p className="font-medium text-zinc-100">{site.leadCapture}</p>
                    </div>
                    <div className="rounded-lg bg-zinc-950/70 p-3">
                      <p className="text-xs uppercase tracking-wide text-zinc-500">Owner</p>
                      <p className="font-medium text-zinc-100">{site.owner}</p>
                    </div>
                  </div>
                  <div className="grid gap-2 text-xs text-zinc-400 sm:grid-cols-3">
                    <span className="rounded-full border border-white/10 px-2.5 py-1">Resend: {site.resend}</span>
                    <span className="rounded-full border border-white/10 px-2.5 py-1">Twilio: {site.twilio}</span>
                    <span className="rounded-full border border-white/10 px-2.5 py-1">SEO: {site.seo}</span>
                  </div>
                  <div className="rounded-xl border border-[#F5911E]/20 bg-[#F5911E]/5 p-3 text-sm text-zinc-200">
                    <span className="font-semibold text-[#F5911E]">Volgende actie: </span>{site.nextAction}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <Card className="border-zinc-800 bg-zinc-900/70">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Users className="h-5 w-5 text-[#F5911E]" /> Agent roster
              </CardTitle>
              <CardDescription>Wie draagt welk stuk van de LocalLead-machine?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {agents.map((agent) => (
                <div key={agent.name} className="rounded-xl border border-white/10 bg-zinc-950/70 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-semibold text-white">{agent.name}</div>
                    <Badge className={statusClass(agent.status)}>{agent.status}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-zinc-400">{agent.role}</p>
                  <p className="mt-2 text-xs text-zinc-500">Focus: {agent.focus}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-zinc-800 bg-zinc-900/70">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Clock3 className="h-5 w-5 text-[#F5911E]" /> Eerstvolgende acties
              </CardTitle>
              <CardDescription>Acties die direct richting recurring revenue duwen.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {nextActions.map((action) => (
                <div key={action.title} className="rounded-xl border border-white/10 bg-zinc-950/70 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-white">{action.title}</p>
                      <p className="mt-1 text-sm text-zinc-400">{action.impact}</p>
                    </div>
                    <Badge className="border-zinc-600 bg-zinc-800 text-zinc-300">{action.owner}</Badge>
                  </div>
                  <p className="mt-3 text-xs text-zinc-500">Deadline: {action.due}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  )
}
