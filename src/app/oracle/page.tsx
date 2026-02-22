"use client"

import { useState } from "react"
import { Brain, TrendingUp, Globe, Zap, Target, DollarSign, Search, ChevronDown, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

/* ── Oracle Data ── */

const TOP_IDEAS = [
  {
    rank: 1,
    name: "BelgieTender.ai",
    description: "AI agents monitoren alle Belgische overheidstenders 24/7, kwalificeren automatisch en verkopen leads aan aannemers/consultants voor €199/mnd.",
    unique: "Digitalisering arbitrage — overheid gaat online maar aannemers checken nog manueel. AI agents verwerken duizenden tenders terwijl concurrenten slapen.",
    revenue: "€4,000 - €8,000/mnd",
    timeToRevenue: "6-8 weken",
    investment: "€300",
    risk: 2,
    priority: "high",
    category: "saas",
  },
  {
    rank: 2,
    name: "GDPR.tools",
    description: "Simpele, betaalbare GDPR compliance tools voor Belgische/Nederlandse KMO's. Cookie consent, privacy policy generator, data request automatie à €19.99/mnd.",
    unique: "Bestaande GDPR tools zijn complex/duur (€200+/mnd). EU-regulering creëert verplichte vraag, maar betaalbare oplossingen bestaan niet voor KMO's.",
    revenue: "€6,000 - €12,000/mnd",
    timeToRevenue: "8-12 weken",
    investment: "€400",
    risk: 2,
    priority: "high",
    category: "saas",
  },
  {
    rank: 3,
    name: "LeadMachine.be",
    description: "AI agents scrapen Belgische bedrijfsdatabases, social media, vacatures om bedrijven te vinden die diensten nodig hebben. Qualified leads verkopen à €25-50/stuk.",
    unique: "Traditionele leadgen is manueel/duur. 24/7 AI team genereert leads op 10x schaal terwijl concurrenten slapen.",
    revenue: "€5,000 - €10,000/mnd",
    timeToRevenue: "6-8 weken",
    investment: "€300",
    risk: 3,
    priority: "high",
    category: "leadgen",
  },
  {
    rank: 4,
    name: "DutchGoldRush — Domain Flipping",
    description: "AI agents monitoren domain drops in Nederlandse/Belgische markten, analyseren traffic, CPC en backlinks. Automatisch bieden op domeinen met 10x+ flip potentieel.",
    unique: "Nederlandse markt is onderbenut door Engelstalige flippers. Lokale kennis + AI-predictie = oneerlijk voordeel.",
    revenue: "€2,000 - €5,000/mnd",
    timeToRevenue: "2-4 weken",
    investment: "€500",
    risk: 3,
    priority: "high",
    category: "domains",
  },
  {
    rank: 5,
    name: "ContentArbitrage.nl",
    description: "AI agents identificeren virale Engelse content in hoge-CPC niches, vertalen/lokaliseren voor Nederlandse markt, publiceren op 88 domeinen met programmatic SEO.",
    unique: "Content arbitrage — bewezen Engelse content heeft nul concurrentie in het Nederlands. Domeinportfolio geeft instant autoriteit.",
    revenue: "€3,000 - €7,000/mnd",
    timeToRevenue: "4-6 weken",
    investment: "€200",
    risk: 2,
    priority: "medium",
    category: "content",
  },
  {
    rank: 6,
    name: "EnergieBesparing.app",
    description: "Belgische zonnepanelen calculator + energievergelijker. Monetize via installer partnerships (€100-300 per qualified lead) en switch commissies.",
    unique: "Post-energiecrisis: elke Belg denkt aan solar/besparing. Bestaande tools zijn slecht. Energietransitie wave.",
    revenue: "€4,000 - €8,000/mnd",
    timeToRevenue: "8-10 weken",
    investment: "€400",
    risk: 2,
    priority: "medium",
    category: "affiliate",
  },
  {
    rank: 7,
    name: "TattooTech.store",
    description: "Digitale producten voor tattoo-artiesten: flash sheet marketplace, boekingssysteem, portfolio builder, klantbeheer. SaaS à €29-99/mnd.",
    unique: "Tattoo-industrie is massaal underserved qua tech — nog steeds Instagram DMs voor boekingen. Elektrik.ink netwerk geeft distributie.",
    revenue: "€3,000 - €6,000/mnd",
    timeToRevenue: "10-12 weken",
    investment: "€300",
    risk: 3,
    priority: "medium",
    category: "saas",
  },
  {
    rank: 8,
    name: "ZilverSurfen.be",
    description: "Simpele digitale tools voor 65+: medicatie reminders, familiefoto's delen, videobel-hulp, overheidsformulieren. €9.99/mnd, target: kinderen die betalen voor ouders.",
    unique: "Vergrijzing arbitrage — massale underserved markt. Bestaande tools te complex. Generatiekloof als business opportunity.",
    revenue: "€5,000 - €10,000/mnd",
    timeToRevenue: "12-16 weken",
    investment: "€400",
    risk: 4,
    priority: "low",
    category: "saas",
  },
  {
    rank: 9,
    name: "APIArbitrage.eu",
    description: "Platform dat diensten goedkoper sourct in Oost-Europa/Azië maar verkoopt aan Belgische prijzen. AI agents matchen en managen projecten.",
    unique: "Geografische arbitrage op schaal. AI agents automatiseren wat normaal manueel agentschap-werk is.",
    revenue: "€6,000 - €12,000/mnd",
    timeToRevenue: "8-12 weken",
    investment: "€500",
    risk: 4,
    priority: "low",
    category: "platform",
  },
  {
    rank: 10,
    name: "MicroSaaS.farm",
    description: "Koop falende micro-SaaS producten (€1-5K), fix met dev skills + AI agents, flip voor €20-50K. Focus op SaaS met bestaande users maar slechte uitvoering.",
    unique: "SaaS acquisitie-markt is hot maar meeste kopers hebben geen dev skills. Jij koopt goedkoop en fixt wat anderen niet kunnen.",
    revenue: "€10,000 - €30,000/mnd",
    timeToRevenue: "16-24 weken",
    investment: "€5,000",
    risk: 5,
    priority: "low",
    category: "acquisition",
  },
]

const LOOPHOLES = [
  {
    title: "Auteursrechten Regime 2026",
    description: "Terug sinds januari 2026 — software developers krijgen fiscaal voordeel tot €75.360. Besparing: €15-25K/jaar.",
    action: "Ruling aanvragen bij FOD Financiën",
    impact: "€15,000 - €25,000/jaar besparing",
    icon: "💰",
  },
  {
    title: "VLAIO Subsidies",
    description: "Innovatie vouchers tot €10K voor testing/assessment. AI agents = innovatie.",
    action: "Aanvraag via vlaio.be/en/subsidies",
    impact: "Tot €10,000 subsidie",
    icon: "🏛️",
  },
  {
    title: "e-Procurement.be",
    description: "Alle Belgische overheidscontracten publiek. Kleine IT contracten (€5-50K) vaak zonder concurrentie.",
    action: "Account aanmaken + alerts instellen",
    impact: "€5,000 - €50,000 per contract",
    icon: "📋",
  },
  {
    title: "Crypto = Belastingvrij",
    description: "België: geen capital gains tax voor particulieren bij koop/verkoop crypto.",
    action: "Research DeFi arbitrage mogelijkheden",
    impact: "Variabel",
    icon: "₿",
  },
  {
    title: "EU AI Funding (Horizon Europe)",
    description: "€307M+ beschikbaar voor AI & Digital Tech. GenAI4EU initiative.",
    action: "Partner zoeken (IMEC, VUB, KUL) voor consortiumaanvraag",
    impact: "€50,000 - €500,000",
    icon: "🇪🇺",
  },
]

const DOMAIN_STATS = {
  avgBuyPrice: "€5 - €25",
  avgFlipKeyword: "3-5x",
  avgFlipAuthority: "10-20x",
  soldIn12Months: "30-40%",
  soldIn24Months: "60-70%",
  bestNiches: ["Verzekeringen (€400)", "Finance (€350)", "Energie (€300)", "Vastgoed (€250)", "Gezondheid (€200)"],
  platforms: ["DropCatch ✅", "NameJet ✅", "GoDaddy Auctions ✅", "Sedo ✅", "Dan.com ✅"],
}

/* ── Components ── */

function RiskBadge({ level }: { level: number }) {
  const config = [
    { color: "bg-green-500/20 text-green-400 border-green-500/30", label: "Zeer laag" },
    { color: "bg-green-500/20 text-green-400 border-green-500/30", label: "Laag" },
    { color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", label: "Gemiddeld" },
    { color: "bg-orange-500/20 text-orange-400 border-orange-500/30", label: "Hoog" },
    { color: "bg-red-500/20 text-red-400 border-red-500/30", label: "Zeer hoog" },
  ]
  const c = config[level - 1] || config[2]
  return <Badge variant="outline" className={c.color}>{c.label} ({level}/5)</Badge>
}

function PriorityBadge({ priority }: { priority: string }) {
  const config: Record<string, string> = {
    high: "bg-red-500/20 text-red-400 border-red-500/30",
    medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    low: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30",
  }
  return <Badge variant="outline" className={config[priority] || config.medium}>{priority === "high" ? "🚀 Prioriteit" : priority === "medium" ? "🎯 Medium" : "🔮 Moonshot"}</Badge>
}

function IdeaCard({ idea }: { idea: typeof TOP_IDEAS[0] }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <Card className="border-white/10 bg-white/5 hover:bg-white/[0.07] transition-colors cursor-pointer" onClick={() => setExpanded(!expanded)}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F5911E]/20 text-[#F5911E] font-bold text-sm">
              {idea.rank}
            </span>
            <CardTitle className="text-base">{idea.name}</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <PriorityBadge priority={idea.priority} />
            {expanded ? <ChevronDown className="h-4 w-4 text-zinc-500" /> : <ChevronRight className="h-4 w-4 text-zinc-500" />}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-zinc-400 mb-3">{idea.description}</p>
        <div className="flex flex-wrap gap-2 mb-2">
          <Badge variant="outline" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
            <DollarSign className="h-3 w-3 mr-1" />{idea.revenue}
          </Badge>
          <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            <Zap className="h-3 w-3 mr-1" />{idea.timeToRevenue}
          </Badge>
          <RiskBadge level={idea.risk} />
        </div>
        {expanded && (
          <div className="mt-4 space-y-3 border-t border-white/10 pt-3">
            <div>
              <span className="text-xs font-semibold text-zinc-500 uppercase">Waarom uniek</span>
              <p className="text-sm text-zinc-300 mt-1">{idea.unique}</p>
            </div>
            <div className="flex gap-4 text-sm">
              <div>
                <span className="text-zinc-500">Investering:</span>
                <span className="text-white ml-1">{idea.investment}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

/* ── Main Page ── */

export default function OraclePage() {
  const totalPotential = "€8K - €15K/mnd"
  const highPriorityCount = TOP_IDEAS.filter(i => i.priority === "high").length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Brain className="h-8 w-8 text-[#F5911E]" />
          <h1 className="text-3xl font-bold">The Oracle 🔮</h1>
        </div>
        <p className="text-zinc-400">AI-powered opportunity scanner — patronen die mensen missen</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-white/10 bg-white/5">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-[#F5911E]">10</div>
            <p className="text-xs text-zinc-400">Kansen geïdentificeerd</p>
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-white/5">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-emerald-400">{totalPotential}</div>
            <p className="text-xs text-zinc-400">Potentieel (top 3)</p>
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-white/5">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-400">{highPriorityCount}</div>
            <p className="text-xs text-zinc-400">Hoge prioriteit</p>
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-white/5">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-400">{LOOPHOLES.length}</div>
            <p className="text-xs text-zinc-400">Loopholes & voordelen</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="ideas" className="w-full">
        <TabsList className="bg-white/5 border border-white/10">
          <TabsTrigger value="ideas"><Target className="h-4 w-4 mr-2" />Top 10 Kansen</TabsTrigger>
          <TabsTrigger value="domains"><Globe className="h-4 w-4 mr-2" />Domain Flipping</TabsTrigger>
          <TabsTrigger value="loopholes"><Zap className="h-4 w-4 mr-2" />Loopholes</TabsTrigger>
        </TabsList>

        {/* Tab: Ideas */}
        <TabsContent value="ideas" className="space-y-4 mt-4">
          <div className="grid gap-4">
            {TOP_IDEAS.map(idea => (
              <IdeaCard key={idea.rank} idea={idea} />
            ))}
          </div>
          <Card className="border-[#F5911E]/30 bg-[#F5911E]/5">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-[#F5911E] mb-2">🎯 Oracle&apos;s Aanbeveling</h3>
              <p className="text-sm text-zinc-300">
                <strong>Fase 1 (Week 1-8):</strong> BelgieTender.ai + GDPR.tools simultaan starten<br/>
                <strong>Fase 2 (Week 8-16):</strong> LeadMachine.be voor recurring revenue stack<br/>
                <strong>Fase 3 (Week 16-24):</strong> ContentArbitrage.nl over domeinportfolio schalen
              </p>
              <p className="text-sm text-zinc-400 mt-2">Verwachte 6-maanden revenue: {totalPotential} uit top 3 alleen.</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Domain Flipping */}
        <TabsContent value="domains" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-white/10 bg-white/5">
              <CardHeader><CardTitle className="text-base">📊 .be Domain Stats</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-zinc-400">Gem. aankoopprijs (drops)</span><span className="text-white">{DOMAIN_STATS.avgBuyPrice}</span></div>
                <div className="flex justify-between"><span className="text-zinc-400">Flip multiple (keyword)</span><span className="text-emerald-400">{DOMAIN_STATS.avgFlipKeyword}</span></div>
                <div className="flex justify-between"><span className="text-zinc-400">Flip multiple (authority)</span><span className="text-emerald-400">{DOMAIN_STATS.avgFlipAuthority}</span></div>
                <div className="flex justify-between"><span className="text-zinc-400">Verkocht binnen 12 mnd</span><span className="text-white">{DOMAIN_STATS.soldIn12Months}</span></div>
                <div className="flex justify-between"><span className="text-zinc-400">Verkocht binnen 24 mnd</span><span className="text-white">{DOMAIN_STATS.soldIn24Months}</span></div>
              </CardContent>
            </Card>
            <Card className="border-white/10 bg-white/5">
              <CardHeader><CardTitle className="text-base">🏆 Best Performing Niches (BE)</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {DOMAIN_STATS.bestNiches.map((niche, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <span className="text-[#F5911E] font-bold">{i + 1}.</span>
                      <span className="text-zinc-300">{niche}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <Card className="border-white/10 bg-white/5">
            <CardHeader><CardTitle className="text-base">🤖 AI Agent Pipeline</CardTitle></CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-4 text-sm">
                <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-center">
                  <Search className="h-5 w-5 mx-auto mb-1 text-blue-400" />
                  <div className="font-semibold">Scanner</div>
                  <div className="text-xs text-zinc-500">24/7 monitoring drops</div>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-center">
                  <TrendingUp className="h-5 w-5 mx-auto mb-1 text-emerald-400" />
                  <div className="font-semibold">Valuator</div>
                  <div className="text-xs text-zinc-500">3+ tools cross-check</div>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-center">
                  <Zap className="h-5 w-5 mx-auto mb-1 text-yellow-400" />
                  <div className="font-semibold">Trend Detector</div>
                  <div className="text-xs text-zinc-500">Keywords vóór de piek</div>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-center">
                  <DollarSign className="h-5 w-5 mx-auto mb-1 text-[#F5911E]" />
                  <div className="font-semibold">Sales Bot</div>
                  <div className="text-xs text-zinc-500">Auto-list + outreach</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-white/10 bg-white/5">
            <CardHeader><CardTitle className="text-base">✅ Bruikbare Platforms & API&apos;s</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {DOMAIN_STATS.platforms.map((p, i) => (
                  <Badge key={i} variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">{p}</Badge>
                ))}
              </div>
              <p className="text-xs text-zinc-500 mt-2">MVP stack: ~$1200-1500/mnd | Bron: Wout&apos;s API research (21/02)</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Loopholes */}
        <TabsContent value="loopholes" className="space-y-4 mt-4">
          {LOOPHOLES.map((l, i) => (
            <Card key={i} className="border-white/10 bg-white/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <span className="text-xl">{l.icon}</span> {l.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-400 mb-3">{l.description}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                    Impact: {l.impact}
                  </Badge>
                  <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                    Actie: {l.action}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
