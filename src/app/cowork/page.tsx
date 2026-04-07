"use client"

import { useEffect, useState } from "react"
import { useBusinessContext } from "@/components/nerve"
import { cn } from "@/lib/utils"

// ─── Types ─────────────────────────────────────────────────────
interface Skill {
  id: string; name: string; description: string; emoji: string
  needsSite?: boolean
  needsNicheInput?: boolean // For lead hunting: niche + stad input
  agents: { name: string; color: string }[]
  tasks: { agent: string; title: string; category: string; priority?: string; description?: string }[]
}
interface SkillCategory { title: string; emoji: string; skills: Skill[] }
interface Site { id: string; domain: string; status?: string; category?: string }

// ─── Skill definitions with task blueprints ───────────────────
const categories: SkillCategory[] = [
  {
    title: "SEO & Traffic", emoji: "📡",
    skills: [
      {
        id: "seo-audit", name: "SEO Audit", emoji: "🔍", needsSite: true,
        description: "Volledige audit: GSC data, keyword kansen, technische checks, content gaps",
        agents: [
          { name: "RADAR", color: "bg-blue-500/15 text-blue-400" },
          { name: "INK", color: "bg-purple-500/15 text-purple-400" },
          { name: "FORGE", color: "bg-green-500/15 text-green-400" },
        ],
        tasks: [
          { agent: "RADAR", title: "SEO audit uitvoeren: GSC data ophalen, keyword kansen identificeren", category: "seo", priority: "high", description: "Haal Windsor GSC data op. Analyseer top queries, CTR opportunities, en quick wins (positie 4-30 met hoge impressies). Maak een research rapport." },
          { agent: "INK", title: "Content gap analyse schrijven op basis van SEO audit", category: "content", description: "Analyseer de huidige content vs. keyword gaps gevonden door RADAR. Identificeer ontbrekende pagina's en content optimalisaties." },
          { agent: "FORGE", title: "Technische SEO checks: Core Web Vitals, indexering, structured data", category: "dev", description: "Check Lighthouse scores, robots.txt, sitemap, structured data markup, en pagina snelheid. Rapport met fixes." },
        ],
      },
      {
        id: "keyword-research", name: "Keyword Research", emoji: "📊", needsSite: true,
        description: "Keyword cluster analyse voor een niche of site. Zoekvolume, concurrentie, kansen.",
        agents: [{ name: "RADAR", color: "bg-blue-500/15 text-blue-400" }],
        tasks: [
          { agent: "RADAR", title: "Keyword research: cluster analyse en opportunity mapping", category: "seo", priority: "high", description: "Voer een uitgebreide keyword research uit. Groepeer in clusters, analyseer zoekvolume en concurrentie. Lever top-20 opportunities." },
        ],
      },
      {
        id: "traffic-rapport", name: "Traffic & Revenue Rapport", emoji: "📈", needsSite: true,
        description: "GA4 + GSC + AdSense gecombineerd rapport. Trends, kansen, aanbevelingen.",
        agents: [
          { name: "RADAR", color: "bg-blue-500/15 text-blue-400" },
          { name: "LEDGER", color: "bg-yellow-500/15 text-yellow-400" },
        ],
        tasks: [
          { agent: "RADAR", title: "Traffic rapport: GA4 + GSC data analyse en trends", category: "seo", description: "Combineer GA4 sessie data met GSC search performance. Identificeer groeiende en dalende pagina's, seizoenstrends." },
          { agent: "LEDGER", title: "Revenue rapport: AdSense + affiliate inkomsten analyse", category: "general", description: "Analyseer de revenue data per pagina/bron. Bereken RPM trends en identificeer top-earning pagina's." },
        ],
      },
    ],
  },
  {
    title: "Content & Copy", emoji: "✒️",
    skills: [
      {
        id: "content-batch", name: "Content Batch", emoji: "📝", needsSite: true,
        description: "Genereer een batch van artikelen voor een site. RADAR research → INK schrijft.",
        agents: [
          { name: "RADAR", color: "bg-blue-500/15 text-blue-400" },
          { name: "INK", color: "bg-purple-500/15 text-purple-400" },
        ],
        tasks: [
          { agent: "RADAR", title: "Content research: top-10 onderwerpen identificeren voor content batch", category: "seo", priority: "high", description: "Onderzoek de beste content opportunities. Lever titels, target keywords, zoekintentie, en concurrentieanalyse per artikel." },
          { agent: "INK", title: "Content batch schrijven: artikelen op basis van RADAR research", category: "content", priority: "high", description: "Schrijf SEO-geoptimaliseerde artikelen in het Nederlands (Belgisch). Volg de research briefing van RADAR. Status: draft, needsApproval: true." },
        ],
      },
      {
        id: "pseo-pages", name: "pSEO Pagina's", emoji: "🏙️", needsSite: true,
        description: "Programmatic SEO: genereer stad/regio pagina's voor een lead gen site.",
        agents: [
          { name: "INK", color: "bg-purple-500/15 text-purple-400" },
          { name: "FORGE", color: "bg-green-500/15 text-green-400" },
        ],
        tasks: [
          { agent: "INK", title: "pSEO content templates schrijven per stad/regio", category: "content", priority: "high", description: "Maak content templates voor stad-specifieke pagina's. Variabelen: [stad], [provincie], [bevolking]. Unieke intro per regio." },
          { agent: "FORGE", title: "pSEO pagina generator bouwen en deployen", category: "dev", priority: "high", description: "Bouw een Next.js dynamic route die stad-pagina's genereert op basis van INK templates. Implementeer generateStaticParams." },
        ],
      },
      {
        id: "klant-rapportage", name: "Klant Rapportage", emoji: "📧", needsSite: true,
        description: "Maandelijks SEO rapport genereren voor een klant. Data + copy + export.",
        agents: [
          { name: "RADAR", color: "bg-blue-500/15 text-blue-400" },
          { name: "INK", color: "bg-purple-500/15 text-purple-400" },
        ],
        tasks: [
          { agent: "RADAR", title: "Klant rapport data: GSC + rankings + traffic samenvatten", category: "seo", description: "Verzamel alle relevante data voor het maandelijkse klantrapport. Highlights, groei metrics, keyword bewegingen." },
          { agent: "INK", title: "Klant rapport schrijven: professionele samenvatting + aanbevelingen", category: "content", description: "Schrijf een helder maandrapport voor de klant op basis van RADAR data. Inclusief highlights, actiepunten, en next steps." },
        ],
      },
    ],
  },
  {
    title: "Business & Growth", emoji: "🚀",
    skills: [
      {
        id: "nieuwe-niche", name: "Nieuwe Niche Site", emoji: "🌐",
        description: "Van niche-idee → domein check → site bouwen → content plan → deploy op Vercel.",
        agents: [
          { name: "SPARK", color: "bg-[#F5911E]/15 text-[#F5911E]" },
          { name: "RADAR", color: "bg-blue-500/15 text-blue-400" },
          { name: "FORGE", color: "bg-green-500/15 text-green-400" },
          { name: "INK", color: "bg-purple-500/15 text-purple-400" },
        ],
        tasks: [
          { agent: "SPARK", title: "Niche evaluatie: haalbaarheid, concurrentie, revenue potentieel", category: "research", priority: "high", description: "Evalueer de niche op 6 SPARK dimensies. Schat maandelijkse revenue, concurrentie niveau, en time-to-revenue." },
          { agent: "RADAR", title: "Keyword research voor nieuwe niche site", category: "seo", description: "Identificeer de top-20 keywords, zoekvolumes, en content clusters voor de nieuwe niche." },
          { agent: "FORGE", title: "Niche site bouwen en deployen op Vercel", category: "dev", description: "Bouw Next.js site met lead form, regionale pagina's, SEO content, FAQ. Deploy op Vercel." },
          { agent: "INK", title: "Launch content schrijven voor nieuwe niche site", category: "content", description: "Schrijf homepage, 5 kernpagina's, en FAQ content voor de nieuwe niche site." },
        ],
      },
      {
        id: "idee-eval", name: "Idee Evaluatie", emoji: "🎯",
        description: "SPARK scoort een business idee op 6 dimensies. ROI, haalbaarheid, fit.",
        agents: [
          { name: "SPARK", color: "bg-[#F5911E]/15 text-[#F5911E]" },
          { name: "LEDGER", color: "bg-yellow-500/15 text-yellow-400" },
        ],
        tasks: [
          { agent: "SPARK", title: "Business idee evaluatie: SPARK scorecard", category: "research", priority: "high", description: "Evalueer het idee op: feasibility, revenue potential, time-to-revenue, competition, strategic fit, scalability. Geef aanbeveling: build/investigate/skip." },
          { agent: "LEDGER", title: "Financiële analyse: verwachte kosten en ROI berekening", category: "general", description: "Bereken de verwachte opstartkosten, maandelijkse kosten, en break-even punt voor het idee." },
        ],
      },
      {
        id: "lead-gen", name: "Lead Gen Campagne", emoji: "🏢",
        description: "Offerte, outreach, en sales assets voor klant acquisitie bij Hazier.",
        agents: [
          { name: "INK", color: "bg-purple-500/15 text-purple-400" },
          { name: "SPARK", color: "bg-[#F5911E]/15 text-[#F5911E]" },
        ],
        tasks: [
          { agent: "INK", title: "Sales assets schrijven: offerte template, cold email, case study", category: "content", priority: "high", description: "Maak professionele sales assets voor Hazier klant acquisitie. Dutch, zakelijke toon." },
          { agent: "SPARK", title: "Target markt analyse voor lead gen campagne", category: "research", description: "Identificeer de beste doelgroepen, kanalen, en boodschappen voor de lead gen campagne." },
        ],
      },
    ],
  },
  {
    title: "Hazier Sales", emoji: "🔶",
    skills: [
      {
        id: "lead-hunting", name: "Lead Hunting", emoji: "🎯", needsNicheInput: true,
        description: "Niche + stad → prospects zoeken met slechte websites → demo site bouwen → rapport + outreach mail genereren.",
        agents: [
          { name: "RADAR", color: "bg-blue-500/15 text-blue-400" },
          { name: "SPARK", color: "bg-[#F5911E]/15 text-[#F5911E]" },
          { name: "FORGE", color: "bg-green-500/15 text-green-400" },
          { name: "INK", color: "bg-purple-500/15 text-purple-400" },
        ],
        tasks: [
          { agent: "RADAR", title: "Lead prospecting: bedrijven zoeken met slechte/geen website", category: "research", priority: "high", description: "Zoek 10-15 bedrijven in de opgegeven niche + stad die geen website hebben, een verouderde site, of niet vindbaar zijn op Google. Beoordeel elke prospect op: website kwaliteit (1-10), Google zichtbaarheid, en geschatte waarde. Lever een gerankt rapport." },
          { agent: "SPARK", title: "Lead kwalificatie: potentieel en ROI inschatting per prospect", category: "research", description: "Evalueer de top-5 prospects op: omzetpotentieel, bereidheid tot investering, concurrentiepositie. Schat de waarde van een website voor elk bedrijf. Lever een lead scorecard." },
          { agent: "FORGE", title: "Demo website bouwen voor top prospect als voorbeeld", category: "dev", priority: "high", description: "Bouw een professionele Next.js demo site voor de #1 prospect. Gebruik de dropservice-site-builder structuur: lead form, regio paginas, SEO content, FAQ, kosten tabel. Deploy op Vercel als demo link." },
          { agent: "INK", title: "Outreach pakket: rapport + gepersonaliseerde mail + offerte", category: "content", priority: "high", description: "Schrijf per top-3 prospect: (1) een website analyse rapport met verbeterpunten, (2) een gepersonaliseerde outreach email die de demo site toont, (3) een Hazier offerte template met prijzen. Toon ROI: wat kost geen website hen per maand aan gemiste klanten." },
        ],
      },
      {
        id: "klant-onboarding", name: "Klant Onboarding", emoji: "🤝",
        description: "Nieuwe klant → project setup, intake rapport, eerste maand planning, welkomstmail.",
        agents: [
          { name: "ATLAS", color: "bg-blue-500/15 text-blue-300" },
          { name: "FORGE", color: "bg-green-500/15 text-green-400" },
          { name: "INK", color: "bg-purple-500/15 text-purple-400" },
        ],
        tasks: [
          { agent: "ATLAS", title: "Klant onboarding: project setup + eerste maand planning", category: "general", priority: "high", description: "Maak een project plan voor de nieuwe klant. Definieer milestones voor maand 1-3, wijs taken toe aan het team, en stel KPIs in." },
          { agent: "FORGE", title: "Technische setup: repo, Vercel project, DNS, analytics", category: "dev", description: "Maak GitHub repo, Vercel project, configureer custom domein, installeer GA4 + GSC. Documenteer de technische setup." },
          { agent: "INK", title: "Welkomstmail + intake rapport schrijven voor klant", category: "content", description: "Schrijf een professionele welkomstmail en een intake rapport met: huidige situatie, doelstellingen, aanpak, en timeline." },
        ],
      },
      {
        id: "portfolio-showcase", name: "Portfolio Showcase", emoji: "🏆",
        description: "Verzamel resultaten van alle klanten → case studies + portfolio pagina voor hazier.be.",
        agents: [
          { name: "RADAR", color: "bg-blue-500/15 text-blue-400" },
          { name: "INK", color: "bg-purple-500/15 text-purple-400" },
        ],
        tasks: [
          { agent: "RADAR", title: "Klant resultaten verzamelen: traffic, rankings, leads per site", category: "seo", description: "Haal voor elke actieve klant de resultaten op: traffic groei, keyword rankings, leads gegenereerd. Maak een data rapport per klant." },
          { agent: "INK", title: "Case studies schrijven + portfolio pagina content", category: "content", priority: "high", description: "Schrijf 3 case studies op basis van RADAR data. Format: uitdaging → aanpak → resultaat. Plus portfolio pagina content voor hazier.be." },
        ],
      },
    ],
  },
  {
    title: "Technisch & Ops", emoji: "🔧",
    skills: [
      {
        id: "site-deploy", name: "Site Deploy", emoji: "🏗️", needsSite: true,
        description: "Build, test, en deploy een site naar Vercel. Inclusief Lighthouse check.",
        agents: [{ name: "FORGE", color: "bg-green-500/15 text-green-400" }],
        tasks: [
          { agent: "FORGE", title: "Site deployen: build, Lighthouse check, Vercel deploy", category: "dev", priority: "high", description: "Run next build, check voor errors. Voer Lighthouse audit uit (performance, accessibility, SEO). Deploy naar Vercel production." },
        ],
      },
      {
        id: "financieel-rapport", name: "Financieel Rapport", emoji: "💰",
        description: "P&L per business unit. Revenue vs kosten. Gap naar €100K analyse.",
        agents: [{ name: "LEDGER", color: "bg-yellow-500/15 text-yellow-400" }],
        tasks: [
          { agent: "LEDGER", title: "Maandelijks financieel rapport: P&L + gap analyse", category: "general", priority: "high", description: "Maak een volledig P&L overzicht. MRR breakdown per stream, kosten overzicht, netto winst. Gap naar €100K met aanbevelingen." },
        ],
      },
      {
        id: "weekplanning", name: "Weekplanning", emoji: "📋",
        description: "ATLAS maakt weekplan: prioriteiten, taken verdelen, blockers identificeren.",
        agents: [{ name: "ATLAS", color: "bg-blue-500/15 text-blue-300" }],
        tasks: [
          { agent: "ATLAS", title: "Weekplanning: prioriteiten, taak verdeling, blocker check", category: "general", priority: "high", description: "Review alle open taken. Prioriteer op impact en urgentie. Verdeel over agents. Identificeer blockers en dependencies. Maak sprint plan." },
        ],
      },
    ],
  },
]

// ─── Site Picker Modal ────────────────────────────────────────
function SitePicker({ sites, onSelect, onCancel }: { sites: Site[]; onSelect: (site: Site) => void; onCancel: () => void }) {
  const [search, setSearch] = useState("")
  const filtered = sites.filter((s) => s.domain.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onCancel}>
      <div className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-zinc-900 p-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-[14px] font-bold text-white mb-1">🌐 Kies een site</h3>
        <p className="text-[11px] text-zinc-500 mb-3">Voor welke site wil je deze skill uitvoeren?</p>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Zoek site..."
          className="w-full rounded-lg border border-white/[0.08] bg-zinc-800/60 px-3 py-2 text-[12px] text-white placeholder-zinc-500 outline-none focus:border-cyan-500/40 mb-3"
          autoFocus
        />
        <div className="max-h-64 overflow-y-auto space-y-1">
          {filtered.map((site) => (
            <button
              key={site.id}
              onClick={() => onSelect(site)}
              className="w-full rounded-lg border border-white/[0.04] bg-zinc-800/40 px-3 py-2.5 text-left transition-all hover:border-cyan-500/30 hover:bg-zinc-800/60 flex items-center justify-between"
            >
              <div>
                <p className="text-[12px] font-semibold text-white">{site.domain}</p>
                <p className="text-[9px] text-zinc-500 uppercase">{site.category || site.status || ""}</p>
              </div>
              <span className="text-[10px] text-cyan-400 font-semibold">Selecteer →</span>
            </button>
          ))}
          {filtered.length === 0 && <p className="text-center text-[11px] text-zinc-600 py-4">Geen sites gevonden</p>}
        </div>
        <button onClick={onCancel} className="mt-3 w-full rounded-lg bg-zinc-800 py-2 text-[11px] font-bold text-zinc-400 hover:text-white transition-colors">Annuleren</button>
      </div>
    </div>
  )
}

// ─── Niche Input Modal (Lead Hunting) ─────────────────────────
function NicheInputModal({ onSubmit, onCancel }: { onSubmit: (niche: string, stad: string) => void; onCancel: () => void }) {
  const [niche, setNiche] = useState("")
  const [stad, setStad] = useState("")

  const suggestedNiches = ["Slotenmaker", "Dakdekker", "Loodgieter", "Elektricien", "Tuinaanleg", "Schilder", "Schoorsteenveger", "Glazenwasser", "Airco installatie", "Zonnepanelen"]
  const suggestedSteden = ["Gent", "Antwerpen", "Brugge", "Mechelen", "Leuven", "Brussel", "Hasselt", "Kortrijk", "Aalst", "Oostende"]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onCancel}>
      <div className="w-full max-w-md rounded-2xl border border-[#F5911E]/20 bg-zinc-900 p-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🎯</span>
          <div>
            <h3 className="text-[14px] font-bold text-white">Lead Hunting</h3>
            <p className="text-[11px] text-zinc-500">Welke niche en stad wil je targeten?</p>
          </div>
        </div>

        {/* Niche */}
        <div className="mb-3">
          <label className="text-[10px] font-bold uppercase text-zinc-500 mb-1.5 block">Niche / Service</label>
          <input
            type="text"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="bv. Slotenmaker, Dakdekker, Loodgieter..."
            className="w-full rounded-lg border border-white/[0.08] bg-zinc-800/60 px-3 py-2.5 text-[12px] text-white placeholder-zinc-500 outline-none focus:border-[#F5911E]/40"
            autoFocus
          />
          <div className="flex flex-wrap gap-1.5 mt-2">
            {suggestedNiches.map((n) => (
              <button key={n} onClick={() => setNiche(n)} className={cn("rounded-md px-2 py-1 text-[9px] font-medium transition-colors", niche === n ? "bg-[#F5911E]/20 text-[#F5911E]" : "bg-zinc-800 text-zinc-500 hover:text-zinc-300")}>{n}</button>
            ))}
          </div>
        </div>

        {/* Stad */}
        <div className="mb-4">
          <label className="text-[10px] font-bold uppercase text-zinc-500 mb-1.5 block">Stad / Regio</label>
          <input
            type="text"
            value={stad}
            onChange={(e) => setStad(e.target.value)}
            placeholder="bv. Gent, Antwerpen, Brugge..."
            className="w-full rounded-lg border border-white/[0.08] bg-zinc-800/60 px-3 py-2.5 text-[12px] text-white placeholder-zinc-500 outline-none focus:border-[#F5911E]/40"
          />
          <div className="flex flex-wrap gap-1.5 mt-2">
            {suggestedSteden.map((s) => (
              <button key={s} onClick={() => setStad(s)} className={cn("rounded-md px-2 py-1 text-[9px] font-medium transition-colors", stad === s ? "bg-[#F5911E]/20 text-[#F5911E]" : "bg-zinc-800 text-zinc-500 hover:text-zinc-300")}>{s}</button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => { if (niche.trim() && stad.trim()) onSubmit(niche.trim(), stad.trim()) }}
            disabled={!niche.trim() || !stad.trim()}
            className="flex-1 rounded-lg bg-[#F5911E]/20 py-2.5 text-[12px] font-bold text-[#F5911E] hover:bg-[#F5911E]/30 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            🎯 Start Lead Hunting →
          </button>
          <button onClick={onCancel} className="rounded-lg bg-zinc-800 px-4 py-2.5 text-[11px] font-bold text-zinc-400 hover:text-white transition-colors">Annuleren</button>
        </div>
      </div>
    </div>
  )
}

// ─── Success Toast ────────────────────────────────────────────
function SuccessToast({ skill, taskCount, onClose }: { skill: string; taskCount: number; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 4000); return () => clearTimeout(t) }, [onClose])
  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="rounded-xl border border-cyan-500/30 bg-zinc-900/95 backdrop-blur-sm px-5 py-3.5 shadow-2xl flex items-center gap-3">
        <span className="text-xl">✅</span>
        <div>
          <p className="text-[12px] font-bold text-white">{skill} gestart!</p>
          <p className="text-[10px] text-zinc-400">{taskCount} taken aangemaakt in Werk</p>
        </div>
        <button onClick={onClose} className="ml-3 text-zinc-500 hover:text-white">✕</button>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────
export default function CoworkPage() {
  const { activeBusiness } = useBusinessContext()
  const [sites, setSites] = useState<Site[]>([])
  const [pendingSkill, setPendingSkill] = useState<Skill | null>(null)
  const [nicheSkill, setNicheSkill] = useState<Skill | null>(null)
  const [toast, setToast] = useState<{ skill: string; count: number } | null>(null)
  const [executing, setExecuting] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/sites").then((r) => r.json()).then((d) => { if (Array.isArray(d)) setSites(d) }).catch(() => {})
  }, [])

  const executeSkill = async (skill: Skill, site?: Site, context?: { niche?: string; stad?: string }) => {
    setExecuting(skill.id)
    const prefix = site ? `[${site.domain}]` : context?.niche ? `[${context.niche} · ${context.stad}]` : ""
    try {
      const results = await Promise.all(
        skill.tasks.map((task) => {
          let desc = task.description || ""
          if (context?.niche) desc = `Niche: ${context.niche}\nStad: ${context.stad}\n\n${desc}`
          return fetch("/api/agent/task", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer COWORK-SKILL",
            },
            body: JSON.stringify({
              source: "cowork",
              title: prefix ? `${prefix} ${task.title}` : task.title,
              description: desc,
              category: task.category,
              priority: task.priority || "medium",
              assignedTo: task.agent.toLowerCase(),
              siteId: site?.id || undefined,
              needsApproval: true,
            }),
          }).then((r) => r.json()).catch((e) => ({ error: e.message }))
        })
      )
      const successCount = results.filter((r) => r.id).length
      setToast({ skill: skill.name, count: successCount })
    } catch {
      setToast({ skill: skill.name, count: 0 })
    }
    setExecuting(null)
  }

  const handleSkillClick = (skill: Skill) => {
    if (skill.needsNicheInput) {
      setNicheSkill(skill)
    } else if (skill.needsSite) {
      setPendingSkill(skill)
    } else {
      executeSkill(skill)
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-2xl">🧠</div>
        <div>
          <h1 className="text-[26px] font-extrabold tracking-tight text-white">
            Cowork <span className="text-cyan-400">Skills</span>
          </h1>
          <p className="text-[13px] text-zinc-500">
            Klik op een skill → taken worden aangemaakt → agents voeren uit
            {activeBusiness.id !== "all" && <span className="ml-2 text-[#F5911E]">· {activeBusiness.name}</span>}
          </p>
        </div>
      </div>

      {/* Skill Categories */}
      {categories.map((cat) => (
        <div key={cat.title}>
          <h3 className="mb-3 flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-zinc-500">
            {cat.emoji} {cat.title}
            <span className="flex-1 h-px bg-white/[0.06]" />
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {cat.skills.map((skill) => (
              <button
                key={skill.id}
                onClick={() => handleSkillClick(skill)}
                disabled={executing === skill.id}
                className={cn(
                  "group relative overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-800/30 p-4 text-left transition-all duration-200 hover:border-cyan-500/30 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(6,182,212,0.08)]",
                  executing === skill.id && "opacity-60 pointer-events-none"
                )}
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-cyan-400 opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xl">{executing === skill.id ? "⏳" : skill.emoji}</span>
                  <div className="flex gap-1">
                    {skill.agents.map((a) => (
                      <span key={a.name} className={cn("rounded px-1.5 py-0.5 text-[8px] font-bold uppercase", a.color)}>
                        {a.name}
                      </span>
                    ))}
                  </div>
                </div>

                <h4 className="text-[13px] font-bold text-white mb-1">{skill.name}</h4>
                <p className="text-[11px] text-zinc-500 leading-relaxed mb-3">{skill.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-[9px] text-zinc-600">
                    {skill.tasks.length} {skill.tasks.length === 1 ? "taak" : "taken"}
                    {skill.needsSite && " · site vereist"}
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold text-cyan-400 opacity-0 transition-opacity group-hover:opacity-100">
                    {executing === skill.id ? "Bezig..." : "▶ Start →"}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Site Picker Modal */}
      {pendingSkill && (
        <SitePicker
          sites={sites}
          onSelect={(site) => { executeSkill(pendingSkill, site); setPendingSkill(null) }}
          onCancel={() => setPendingSkill(null)}
        />
      )}

      {/* Niche Input Modal (Lead Hunting) */}
      {nicheSkill && (
        <NicheInputModal
          onSubmit={(niche, stad) => { executeSkill(nicheSkill, undefined, { niche, stad }); setNicheSkill(null) }}
          onCancel={() => setNicheSkill(null)}
        />
      )}

      {/* Success Toast */}
      {toast && <SuccessToast skill={toast.skill} taskCount={toast.count} onClose={() => setToast(null)} />}
    </div>
  )
}
