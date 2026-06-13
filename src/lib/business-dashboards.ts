import type { LucideIcon } from "lucide-react"
import {
  BadgeEuro,
  BriefcaseBusiness,
  Building2,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Euro,
  FileText,
  Gauge,
  Globe2,
  Inbox,
  Mail,
  Megaphone,
  PhoneCall,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Wrench,
  Zap,
} from "lucide-react"

export type BusinessDashboard = {
  slug: string
  name: string
  label: string
  tagline: string
  status: string
  statusClass: string
  accent: string
  owner: string
  type: string
  health: number
  target: string
  current: string
  heroMetric: string
  heroMetricLabel: string
  nextAction: string
  mission: string
  quickLinks: Array<{ label: string; href: string }>
  kpis: Array<{ label: string; value: string; detail: string; icon: LucideIcon }>
  operatingLoop: Array<{ title: string; detail: string; icon: LucideIcon }>
  assets: Array<{ name: string; status: string; detail: string; href?: string }>
  agents: Array<{ name: string; role: string; next: string }>
  blockers: string[]
  ninetyDay: Array<{ week: string; focus: string; proof: string }>
  sourcePaths: Array<{ label: string; path: string }>
}

export const businessDashboards: Record<string, BusinessDashboard> = {
  locallead: {
    slug: "locallead",
    name: "LocalLead",
    label: "Rank & Rent execution cockpit",
    tagline: "Van losse leadgen-sites naar verhuurde assets met meetbare leads, calls en recurring omzet.",
    status: "Sprint focus",
    statusClass: "border-[#F5911E]/25 bg-[#F5911E]/15 text-[#F5911E]",
    accent: "#F5911E",
    owner: "Bart + Hermes + Lisa",
    type: "Rank & Rent / lokale leadgeneratie",
    health: 72,
    target: "€10k MRR",
    current: "€0 MRR zichtbaar in cockpit",
    heroMetric: "1e deal",
    heroMetricLabel: "eerstvolgende mijlpaal",
    nextAction: "Kies één niche-site, bewijs leadcapture, maak een shortlist van 20 aannemers en start gecontroleerde partnergesprekken.",
    mission: "LocalLead moet de cashflow-machine worden: betrouwbare sites, bewijsbare aanvragen, exclusieve partners en vaste huur per regio/niche.",
    quickLinks: [
      { label: "Portfolio", href: "/portfolio" },
      { label: "Taken", href: "/tasks" },
      { label: "Research", href: "/research" },
      { label: "Team", href: "/team" },
    ],
    kpis: [
      { label: "Assets", value: "9+", detail: "leadgen domeinen in portfolio", icon: Globe2 },
      { label: "Tracking", value: "Resend → Twilio", detail: "mail eerst, calls daarna", icon: PhoneCall },
      { label: "Partners", value: "0 actief", detail: "eerste huurder vinden", icon: Users },
      { label: "Runway", value: "€10k", detail: "monthly recurring target", icon: BadgeEuro },
    ],
    operatingLoop: [
      { title: "1. Asset bewijzen", detail: "Elke site moet status, leadpad, tracking en SEO-blocker tonen.", icon: ShieldCheck },
      { title: "2. Prospectlijst maken", detail: "Wout/Copycat bouwen kleine kwalitatieve batch, geen massablast.", icon: Search },
      { title: "3. Partner sluiten", detail: "Bart keurt outreach en prijsmodel goed voor gecontroleerde gesprekken.", icon: Euro },
      { title: "4. Rapporteren", detail: "Lisa koppelt leads, calls, partnerstatus en volgende actie terug.", icon: ClipboardList },
    ],
    assets: [
      { name: "Poxy.be", status: "prioriteit", detail: "epoxy leads; mailflow naar info@hazier.be; huurmodel voorbereiden" },
      { name: "Daklekkages.be", status: "hoog intent", detail: "spoed/service intent; Twilio-kandidaat zodra mailpad stabiel is" },
      { name: "funderingsproblemen.be", status: "hoog ticket", detail: "trust, leadrouting en partnerfit bewaken" },
      { name: "gevelwerkengent.be", status: "lokaal", detail: "Gent-positionering zonder te doen alsof LocalLead aannemer is" },
      { name: "vogeloverlast.be", status: "kans", detail: "niche-expansie; eerst SERP/partner-fit bevestigen" },
    ],
    agents: [
      { name: "Lisa", role: "ops lead", next: "portfolio-update coördineren en prioriteiten scherp houden" },
      { name: "Wout", role: "SEO scout", next: "SERP/partner shortlist per prioriteitsniche" },
      { name: "Jean-Cloud", role: "builder", next: "leadforms, tracking en dashboards koppelen" },
      { name: "Copycat", role: "copy/outreach", next: "persoonlijke mails en follow-ups voorbereiden" },
      { name: "BeeldMaker", role: "visuals", next: "sitebeelden maken met OpenAI image generation" },
    ],
    blockers: [
      "Resend is transactional; koude outreach moet via named mailbox/kleine batches.",
      "Twilio wacht nog op KBO/documentatie voor volledige calltracking.",
      "Portfolio-data staat deels in research/docs en moet naar één operationele dataset.",
    ],
    ninetyDay: [
      { week: "Nu", focus: "Poxy.be + één tweede high-intent asset lead-ready krijgen", proof: "testlead, mailbewijs, privacy/GDPR baseline" },
      { week: "30 dagen", focus: "20-50 beste partners selecteren en eerste gesprekken voeren", proof: "prospectlijst met status + opvolgdata" },
      { week: "60 dagen", focus: "eerste launch partner of pay-per-lead afspraak", proof: "partnerstatus + rapportage in cockpit" },
      { week: "90 dagen", focus: "repeatable niche playbook", proof: "template voor site → leads → partner → huur" },
    ],
    sourcePaths: [
      { label: "Source of truth", path: "C:\\Users\\Bart\\Projects\\Command-Center" },
      { label: "Operations", path: "docs/operations/" },
      { label: "Research", path: "research/" },
      { label: "Agents", path: "team/agents/" },
      { label: "Content", path: "content/<domein>/" },
    ],
  },
  hazier: {
    slug: "hazier",
    name: "Hazier",
    label: "Webdesign & SEO cashflow cockpit",
    tagline: "De stabiele basis onder LocalLead: klanten, websites, SEO, facturatie en nieuwe aanvragen.",
    status: "Cashflow basis",
    statusClass: "border-violet-500/25 bg-violet-500/15 text-violet-300",
    accent: "#A78BFA",
    owner: "Bart",
    type: "Webdesign / SEO / klantwerk",
    health: 62,
    target: "stabiele maandbasis",
    current: "actief klantwerk",
    heroMetric: "basis",
    heroMetricLabel: "cashflowfunctie",
    nextAction: "Maak actieve klanten, open offertes, facturatie en supportvragen zichtbaar als pipeline in de cockpit.",
    mission: "Hazier moet rust en basisinkomen leveren terwijl LocalLead schaalbaar recurring wordt.",
    quickLinks: [
      { label: "Klanten", href: "/klanten" },
      { label: "Pipeline", href: "/pipeline" },
      { label: "Finance", href: "/finance" },
      { label: "Inbox", href: "/inbox" },
    ],
    kpis: [
      { label: "Klantwerk", value: "actief", detail: "lopende websites/SEO", icon: BriefcaseBusiness },
      { label: "Aanvragen", value: "inbox", detail: "info@hazier.be + formulieren", icon: Inbox },
      { label: "Facturatie", value: "zichtbaar maken", detail: "cashflow bewaken", icon: Euro },
      { label: "Delivery", value: "kwaliteit", detail: "geen scope creep", icon: CheckCircle2 },
    ],
    operatingLoop: [
      { title: "1. Pipeline", detail: "Nieuwe aanvragen en offertes centraal opvolgen.", icon: TrendingUp },
      { title: "2. Delivery", detail: "Open klanttaken en deadlines zichtbaar maken.", icon: Wrench },
      { title: "3. Facturatie", detail: "Te factureren werk en openstaande betalingen opvolgen.", icon: Euro },
      { title: "4. Upsell", detail: "SEO/onderhoudskansen detecteren zonder LocalLead-focus te verliezen.", icon: Megaphone },
    ],
    assets: [
      { name: "hazier.be", status: "bedrijfssite", detail: "vertrouwen, portfolio en contactkanaal" },
      { name: "info@hazier.be", status: "lead-inbox", detail: "ontvangt ook Poxy.be leadmails" },
      { name: "Klantportfolio", status: "te structureren", detail: "status per klant: lead, offerte, actief, support, retainer" },
      { name: "SEO cases", status: "asset", detail: "bewijs voor nieuwe klanten en LocalLead-partners" },
    ],
    agents: [
      { name: "Bart", role: "relatie/eindbeslissing", next: "prijzen, klanten en prioriteiten kiezen" },
      { name: "Lisa", role: "ops", next: "klantpipeline en deadlines bewaken" },
      { name: "Jean-Cloud", role: "delivery", next: "technische taken en fixes structureren" },
      { name: "Copycat", role: "copy", next: "offertes, mails en casecopy voorbereiden" },
    ],
    blockers: [
      "Hazier-data is nog niet in één dashboardmodel gegoten.",
      "Klantstatus/facturatie moeten gekoppeld worden zonder oude demo-data terug te halen.",
      "Poxy.be leadmails lopen naar info@hazier.be, dus inboxsegmentatie is belangrijk.",
    ],
    ninetyDay: [
      { week: "Nu", focus: "Actieve klanten en open geldacties oplijsten", proof: "pipelinekaart met eigenaar/status" },
      { week: "30 dagen", focus: "Facturatie en supporttaken zichtbaar maken", proof: "finance/support cockpit" },
      { week: "60 dagen", focus: "SEO/onderhoud upsells selecteren", proof: "kleine upsell-lijst" },
      { week: "90 dagen", focus: "Hazier als stabiele retainerbasis", proof: "maandelijkse forecast" },
    ],
    sourcePaths: [
      { label: "Klanten", path: "/klanten" },
      { label: "Pipeline", path: "/pipeline" },
      { label: "Finance", path: "/finance" },
      { label: "Inbox", path: "/inbox" },
    ],
  },
  calqo: {
    slug: "calqo",
    name: "Calqo",
    label: "Calculator & utility asset cockpit",
    tagline: "Tools, calculators en utility-sites als SEO assets met later AdSense, affiliate of leadgen routes.",
    status: "Assetfase",
    statusClass: "border-sky-500/25 bg-sky-500/15 text-sky-300",
    accent: "#38BDF8",
    owner: "Hermes + Bart",
    type: "Tools / calculators / utility SEO",
    health: 44,
    target: "SEO asset network",
    current: "pre-revenue",
    heroMetric: "inventaris",
    heroMetricLabel: "eerste noodzakelijke stap",
    nextAction: "Maak een lijst van calculator/utility sites, kies monetisatiepad per asset en fix trust/tracking eerst.",
    mission: "Calqo mag groeien als ondersteunend asset-netwerk, maar zonder de LocalLead sprint te verstoren.",
    quickLinks: [
      { label: "Portfolio", href: "/portfolio" },
      { label: "SEO", href: "/seo" },
      { label: "Ideas", href: "/ideas" },
      { label: "AdSense", href: "/adsense" },
    ],
    kpis: [
      { label: "Tools", value: "te inventariseren", detail: "calculator/site lijst", icon: Gauge },
      { label: "Monetisatie", value: "keuze nodig", detail: "AdSense/affiliate/leadgen", icon: Euro },
      { label: "Trust", value: "privacy/contact", detail: "basis voor indexatie", icon: ShieldCheck },
      { label: "SEO", value: "backlog", detail: "content + tracking", icon: Search },
    ],
    operatingLoop: [
      { title: "1. Inventaris", detail: "Elke tool/site: status, eigenaar, hosting, tracking, monetisatie.", icon: ClipboardList },
      { title: "2. Trust fix", detail: "Privacy, contact, disclosure en disclaimers voor YMYL/affiliate.", icon: ShieldCheck },
      { title: "3. Tracking", detail: "Calculator completion, CTA clicks en affiliate clicks meten.", icon: Gauge },
      { title: "4. Bridge", detail: "Contextuele links naar Hazier/LocalLead waar relevant.", icon: Sparkles },
    ],
    assets: [
      { name: "BTW/datum calculators", status: "utility", detail: "AdSense of affiliate alleen na trust/content fix" },
      { name: "real-estate calculators", status: "high intent", detail: "brug naar renovatie/fundering/gevelwerken" },
      { name: "affiliate funnels", status: "compliance nodig", detail: "disclosure + sponsored nofollow + first-party redirects" },
      { name: "SEO backlog", status: "te prioriteren", detail: "hoogste intent eerst, niet breed uitwaaieren" },
    ],
    agents: [
      { name: "Wout", role: "audit", next: "commercial intent en indexing blockers scoren" },
      { name: "Jean-Cloud", role: "tracking", next: "redirects/events/privacy routes bouwen" },
      { name: "Copycat", role: "content", next: "trustcopy en tool-uitleg schrijven" },
      { name: "Lisa", role: "prioriteit", next: "voorkomen dat Calqo LocalLead overschaduwt" },
    ],
    blockers: [
      "Calqo assets zijn nog niet volledig geïnventariseerd.",
      "Monetisatie per site moet gekozen worden vóór contentproductie.",
      "Affiliate/trust pages ontbreken mogelijk op meerdere assets.",
    ],
    ninetyDay: [
      { week: "Nu", focus: "Inventory spreadsheet/data-model", proof: "één rij per site/tool" },
      { week: "30 dagen", focus: "Top 3 commercial-intent tools kiezen", proof: "prioriteitenlijst" },
      { week: "60 dagen", focus: "tracking + trust fixes live", proof: "events en routes gecontroleerd" },
      { week: "90 dagen", focus: "eerste monetisatietest", proof: "AdSense/affiliate/leadmetric" },
    ],
    sourcePaths: [
      { label: "Portfolio", path: "/portfolio" },
      { label: "SEO", path: "/seo" },
      { label: "AdSense", path: "/adsense" },
      { label: "Research", path: "research/" },
    ],
  },
  "infinite-events": {
    slug: "infinite-events",
    name: "Infinite Events",
    label: "Events & VZW watch cockpit",
    tagline: "Alleen opvolgen wat risico, deadline of geldimpact heeft — geen afleiding van LocalLead.",
    status: "Watch mode",
    statusClass: "border-emerald-500/25 bg-emerald-500/15 text-emerald-300",
    accent: "#34D399",
    owner: "Bart",
    type: "Events / VZW / administratie",
    health: 51,
    target: "controle zonder ruis",
    current: "watch mode",
    heroMetric: "deadlines",
    heroMetricLabel: "belangrijkste signaal",
    nextAction: "Leg alleen kritieke deadlines, budgetpunten en administratieve verplichtingen vast.",
    mission: "Infinite Events blijft zichtbaar zodat niets ontspoort, maar krijgt geen sprintcapaciteit tenzij er risico is.",
    quickLinks: [
      { label: "Taken", href: "/tasks" },
      { label: "Budget", href: "/budget" },
      { label: "Project", href: "/projects/infinite-events" },
      { label: "Docs", href: "/docs" },
    ],
    kpis: [
      { label: "Mode", value: "watch", detail: "alleen risico's", icon: Gauge },
      { label: "Deadline", value: "te koppelen", detail: "kalender/administratie", icon: CalendarClock },
      { label: "Budget", value: "bewaken", detail: "geen verrassingen", icon: Euro },
      { label: "Taken", value: "minimum", detail: "kritiek of niets", icon: ClipboardList },
    ],
    operatingLoop: [
      { title: "1. Deadline scan", detail: "Wat moet wettelijk/operationeel op tijd gebeuren?", icon: CalendarClock },
      { title: "2. Budget check", detail: "Welke kosten of inkomsten moeten bewaakt worden?", icon: Euro },
      { title: "3. Documenten", detail: "Belangrijke documenten en beslissingen op één plek.", icon: FileText },
      { title: "4. Escalatie", detail: "Alleen bij risico naar Bart brengen.", icon: Zap },
    ],
    assets: [
      { name: "Events", status: "watch", detail: "planning alleen als er deadlines zijn" },
      { name: "VZW administratie", status: "kritiek", detail: "wettelijke/financiële verplichtingen" },
      { name: "Budget", status: "monitor", detail: "kosten, inkomsten en verplichtingen" },
      { name: "Projectpagina", status: "bestaand", detail: "/projects/infinite-events als detailroute" },
    ],
    agents: [
      { name: "Lisa", role: "triage", next: "alleen kritieke taken escaleren" },
      { name: "Bart", role: "beslisser", next: "deadlines en budget bevestigen" },
      { name: "Hermes", role: "admin support", next: "docs en taken structureren" },
    ],
    blockers: [
      "Deadline- en budgetdata is nog niet gekoppeld aan de businesskaart.",
      "Moet bewust low-noise blijven zodat LocalLead sprintcapaciteit beschermd blijft.",
      "Projectdetail bestaat, maar moet later dezelfde cockpit-data gebruiken.",
    ],
    ninetyDay: [
      { week: "Nu", focus: "kritieke deadlines verzamelen", proof: "taken met datum en eigenaar" },
      { week: "30 dagen", focus: "budgetstatus zichtbaar", proof: "budgetkaart met risico's" },
      { week: "60 dagen", focus: "documenten centraliseren", proof: "docs/ projectstructuur" },
      { week: "90 dagen", focus: "alleen alerts bij risico", proof: "watch-mode zonder ruis" },
    ],
    sourcePaths: [
      { label: "Taken", path: "/tasks" },
      { label: "Budget", path: "/budget" },
      { label: "Project", path: "/projects/infinite-events" },
      { label: "Docs", path: "/docs" },
    ],
  },
}

export const businessDashboardList = Object.values(businessDashboards)
