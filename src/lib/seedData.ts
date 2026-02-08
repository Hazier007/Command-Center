import {
  projectsStorage,
  sitesStorage,
  nowItemsStorage,
  alertsStorage,
  tasksStorage,
  ideasStorage,
  notesStorage,
  type Project,
  type Site,
  type NowItem,
  type Alert,
  type Task,
  type Idea,
  type Note,
} from './storage';

export function seedData() {
  // Check if already seeded
  if (projectsStorage.getAll().length > 0) {
    return; // Already has data, don't seed again
  }

  // Create Projects
  const collectPro = projectsStorage.create({
    name: 'CollectPro',
    status: 'active',
    category: 'business',
    description: 'B2B incasso platform - co-founder',
    revenue: 2500,
  });

  const hazier = projectsStorage.create({
    name: 'Hazier',
    status: 'active',
    category: 'business',
    description: 'Webdesign/SEO bureau',
    revenue: 3200,
  });

  const kinderopvang = projectsStorage.create({
    name: 'Kinderopvang Vlaanderen',
    status: 'active',
    category: 'directory',
    description: 'Directory for childcare centers in Flanders',
    revenue: 180,
  });

  const poxy = projectsStorage.create({
    name: 'Poxy.be',
    status: 'active',
    category: 'leadgen',
    description: 'Rank & rent epoxy floors directory',
    revenue: 420,
  });

  const mosk = projectsStorage.create({
    name: 'Mosk.be',
    status: 'planned',
    category: 'directory',
    description: 'Mosques directory for Belgium',
  });

  const kluisverhuur = projectsStorage.create({
    name: 'Kluisverhuur.be',
    status: 'active',
    category: 'leadgen',
    description: 'Safe rental lead generation',
    revenue: 120,
  });

  const huizenopkoper = projectsStorage.create({
    name: 'Huizenopkoper.be',
    status: 'active',
    category: 'leadgen',
    description: 'House buying lead generation',
    revenue: 85,
  });

  const instapklare = projectsStorage.create({
    name: 'Instapklare Woning',
    status: 'planned',
    category: 'leadgen',
    description: 'Turnkey house concept',
  });

  const zwangerschapscalculator = projectsStorage.create({
    name: 'Zwangerschapscalculator.be',
    status: 'active',
    category: 'tool',
    description: 'Pregnancy calculator tool - pending AdSense',
  });

  const elektrik = projectsStorage.create({
    name: 'Elektrik.Ink',
    status: 'active',
    category: 'event',
    description: 'Tattoo convention May 17-18 2025',
    revenue: 850,
  });

  const zorgApp = projectsStorage.create({
    name: 'Zorg-app',
    status: 'active',
    category: 'client',
    description: 'Healthcare internal tool',
    revenue: 1200,
  });

  const kristofClient = projectsStorage.create({
    name: 'Kristof (Slotenmakerij)',
    status: 'active',
    category: 'client',
    description: 'Locksmith client website',
    revenue: 150,
  });

  const filipClient = projectsStorage.create({
    name: 'Filip Luwaert',
    status: 'active',
    category: 'client',
    description: 'luwaert.be client website',
    revenue: 180,
  });

  // === LISA'S PROJECT VOORSTELLEN ===
  // Passieve inkomen assets — low maintenance, high SEO potential

  const zolderramen = projectsStorage.create({
    name: '💡 Zolderramen.be',
    status: 'planned',
    category: 'leadgen',
    description: 'Rank & rent voor dakramen/zolderramen installateurs. Hoge CPC (€3-5), weinig concurrentie. Programmatic SEO: type × locatie paginas.',
  });

  const schietclub = projectsStorage.create({
    name: '💡 Schietclub.be',
    status: 'planned',
    category: 'directory',
    description: 'Directory van schietclubs/schietstanden in België. Niche met weinig goede sites. AdSense + affiliate (uitrusting). ~50-100 listings.',
  });

  const busstop = projectsStorage.create({
    name: '💡 Busstop.be',
    status: 'planned',
    category: 'tool',
    description: 'Bushalte-finder tool met real-time De Lijn/NMBS data. High traffic potentieel, AdSense monetisatie. API-driven, lage onderhoudslast.',
  });

  const interesten = projectsStorage.create({
    name: '💡 Interesten.be',
    status: 'planned',
    category: 'tool',
    description: 'Rente/interest calculator suite: spaarrente, lening, samengestelde interest. Hoge AdSense RPM (finance niche €15-30 RPM). Evergreen content.',
  });

  const veiligInfo = projectsStorage.create({
    name: '💡 Veilig.info',
    status: 'planned',
    category: 'leadgen',
    description: 'Vergelijkingssite alarmsystemen & beveiligingscameras. Hoge commissies (€50-150/lead). Programmatic: product × type × locatie paginas.',
  });

  const waarheidInfo = projectsStorage.create({
    name: '💡 Waarheid.info',
    status: 'planned',
    category: 'tool',
    description: 'Fact-checking/bronverificatie tool. Viral potentieel, AdSense. Kan AI-driven zijn. Unieke .info domein = authority vibe.',
  });

  const teaPlanet = projectsStorage.create({
    name: '💡 Tea-planet.com',
    status: 'planned',
    category: 'leadgen',
    description: 'Internationale thee niche site. Affiliate (thee shops), AdSense. Programmatic: theetype × herkomst × benefit paginas. Engelstalig = groter bereik.',
  });

  const cordbracelet = projectsStorage.create({
    name: '💡 Cordbracelet.com',
    status: 'planned',
    category: 'leadgen',
    description: 'Niche e-commerce/affiliate voor cord bracelets. Etsy/Amazon affiliate. Tutorial content + shop links. Lage concurrentie.',
  });

  const amateurfotograaf = projectsStorage.create({
    name: '💡 Amateurfotograaf.net',
    status: 'planned',
    category: 'directory',
    description: 'Directory + community voor amateur fotografen in Vlaanderen. Workshops, equipment reviews, fotowedstrijden. AdSense + affiliate (camera gear).',
  });

  const elbowTendonitis = projectsStorage.create({
    name: '💡 Elbowtendonitis.com',
    status: 'planned',
    category: 'tool',
    description: 'Medische niche site: tenniselleboog info + oefeningen. Extreem hoge AdSense RPM (health €20-50). Affiliate: braces, tools. Engelstalig evergreen.',
  });

  const goedkoopStroom = projectsStorage.create({
    name: '💡 Goedkoopstroom (uitbreiden)',
    status: 'planned',
    category: 'tool',
    description: 'Energievergelijker tool uitbreiden: zonnepanelen calculator, warmtepomp vergelijker. Hoge affiliate commissies (€30-80/lead). Bestaande repo.',
  });

  const slotenmakerDir = projectsStorage.create({
    name: '💡 Slotenmaker Directory',
    status: 'planned',
    category: 'directory',
    description: 'Nationale slotenmaker directory (je hebt al ervaring via Kristof). Rank & rent per regio. Emergency niche = hoge CPC (€5-10).',
  });

  // Create Sites
  sitesStorage.create({
    domain: 'hazier.be',
    projectId: hazier.id,
    status: 'live',
    techStack: ['WordPress', 'PHP'],
    revenue: 0,
    notes: 'Main agency website',
  });

  sitesStorage.create({
    domain: 'hazier.eu',
    projectId: hazier.id,
    status: 'live',
    techStack: ['WordPress', 'PHP'],
    revenue: 0,
    notes: 'European extension',
  });

  sitesStorage.create({
    domain: 'kinderopvangvlaanderen.be',
    projectId: kinderopvang.id,
    status: 'live',
    techStack: ['WordPress', 'PHP'],
    revenue: 180,
    listings: 312,
    notes: 'Directory with 312 listings',
  });

  sitesStorage.create({
    domain: 'poxy.be',
    projectId: poxy.id,
    status: 'live',
    techStack: ['WordPress', 'PHP'],
    revenue: 420,
    pages: 1094,
    notes: 'Rank & rent with 1094 pages',
  });

  sitesStorage.create({
    domain: 'mosk.be',
    projectId: mosk.id,
    status: 'planned',
    techStack: ['Next.js', 'TypeScript'],
    notes: 'Mosques directory - planned',
  });

  sitesStorage.create({
    domain: 'kluisverhuur.be',
    projectId: kluisverhuur.id,
    status: 'live',
    techStack: ['Next.js', 'TypeScript'],
    revenue: 120,
    notes: 'Safe rental leads',
  });

  sitesStorage.create({
    domain: 'huizenopkoper.be',
    projectId: huizenopkoper.id,
    status: 'live',
    techStack: ['WordPress', 'PHP'],
    revenue: 85,
    notes: 'House buying leads',
  });

  sitesStorage.create({
    domain: 'instapklarewoning.be',
    projectId: instapklare.id,
    status: 'planned',
    techStack: ['Next.js', 'TypeScript'],
    notes: 'Turnkey house concept - planned',
  });

  sitesStorage.create({
    domain: 'zwangerschapscalculator.be',
    projectId: zwangerschapscalculator.id,
    status: 'live',
    techStack: ['Next.js', 'TypeScript'],
    notes: 'Pregnancy calculator - pending AdSense approval',
  });

  sitesStorage.create({
    domain: 'luwaert.be',
    projectId: filipClient.id,
    status: 'live',
    techStack: ['WordPress', 'PHP'],
    revenue: 180,
    notes: 'Filip Luwaert client site',
  });

  // Domain portfolio sites — linked to Lisa's project proposals
  sitesStorage.create({
    domain: 'cordbracelet.com',
    projectId: cordbracelet.id,
    status: 'planned',
    techStack: ['Next.js'],
    notes: '💡 Niche affiliate — cord bracelets, Etsy/Amazon links',
  });

  sitesStorage.create({
    domain: 'tea-planet.com',
    projectId: teaPlanet.id,
    status: 'planned',
    techStack: ['Next.js'],
    notes: '💡 Internationale thee niche — affiliate + AdSense',
  });

  sitesStorage.create({
    domain: 'interesten.be',
    projectId: interesten.id,
    status: 'planned',
    techStack: ['Next.js', 'TypeScript'],
    notes: '💡 Finance calculator suite — hoge AdSense RPM',
  });

  sitesStorage.create({
    domain: 'busstop.be',
    projectId: busstop.id,
    status: 'live',
    techStack: ['Next.js', 'TypeScript'],
    pages: 593,
    notes: '🚏 Bushalte review platform — 593 paginas, 549 haltes, 34 steden',
  });

  sitesStorage.create({
    domain: 'zolderramen.be',
    projectId: zolderramen.id,
    status: 'planned',
    techStack: ['Next.js', 'TypeScript'],
    notes: '💡 Rank & rent dakramen — hoge CPC, programmatic SEO',
  });

  sitesStorage.create({
    domain: 'schietclub.be',
    projectId: schietclub.id,
    status: 'planned',
    techStack: ['WordPress', 'Directorist'],
    notes: '💡 Schietclub directory — niche met weinig concurrentie',
  });

  sitesStorage.create({
    domain: 'veilig.info',
    projectId: veiligInfo.id,
    status: 'planned',
    techStack: ['Next.js', 'TypeScript'],
    notes: '💡 Alarmsystemen vergelijker — hoge lead commissies',
  });

  sitesStorage.create({
    domain: 'waarheid.info',
    projectId: waarheidInfo.id,
    status: 'planned',
    techStack: ['Next.js', 'TypeScript'],
    notes: '💡 Fact-checking tool — viral potentieel',
  });

  sitesStorage.create({
    domain: 'amateurfotograaf.net',
    projectId: amateurfotograaf.id,
    status: 'planned',
    techStack: ['WordPress', 'Directorist'],
    notes: '💡 Fotografen directory + community — affiliate camera gear',
  });

  sitesStorage.create({
    domain: 'elbowtendonitis.com',
    projectId: elbowTendonitis.id,
    status: 'planned',
    techStack: ['Next.js', 'TypeScript'],
    notes: '💡 Health niche — extreem hoge AdSense RPM, evergreen',
  });

  // === BART'S VOLLEDIGE DOMEINPORTFOLIO ===
  // Domeinen die nog niet hierboven staan

  sitesStorage.create({
    domain: 'ai-automatisering.be',
    status: 'planned',
    techStack: ['Next.js'],
    notes: '🏷️ AI/automation niche — leadgen voor AI-consultants, hoge waarde markt',
  });

  sitesStorage.create({
    domain: 'belgiangolf.com',
    status: 'planned',
    techStack: ['Next.js'],
    notes: '🏷️ Golf directory/community België — club listings, affiliate golf gear',
  });

  sitesStorage.create({
    domain: 'betover.org',
    status: 'planned',
    techStack: ['Next.js'],
    notes: '🏷️ Creatief domein — events, goochelaars directory, of storytelling platform',
  });

  sitesStorage.create({
    domain: 'btw-calculator.be',
    status: 'live',
    techStack: ['Next.js', 'TypeScript'],
    notes: '🔧 BTW calculator tool — hoge zoekvolume, AdSense monetisatie',
  });

  sitesStorage.create({
    domain: 'budprofiles.com',
    status: 'planned',
    techStack: ['Next.js'],
    notes: '🏷️ Cannabis/CBD profielen — internationaal, affiliate potentieel',
  });

  sitesStorage.create({
    domain: 'buitendrogen.be',
    status: 'live',
    techStack: ['Next.js', 'TypeScript'],
    notes: '🔧 Weer/droog tool — seizoensgebonden traffic, AdSense',
  });

  sitesStorage.create({
    domain: 'collectpro.be',
    projectId: collectPro.id,
    status: 'live',
    techStack: ['Next.js'],
    notes: '🏢 CollectPro hoofdsite — B2B incasso platform',
  });

  sitesStorage.create({
    domain: 'datumberekenen.be',
    status: 'live',
    techStack: ['Next.js', 'TypeScript'],
    notes: '🔧 Datum calculator tool — evergreen, AdSense',
  });

  sitesStorage.create({
    domain: 'elektrik.ink',
    projectId: elektrik.id,
    status: 'live',
    techStack: ['Next.js'],
    notes: '🎪 Tattoo convention website — mei 2025 event',
  });

  sitesStorage.create({
    domain: 'factuurfinanciering.be',
    status: 'planned',
    techStack: ['Next.js'],
    notes: '🏷️ Factoring/invoice financing — hoge CPC finance niche, leadgen voor factoring bedrijven',
  });

  sitesStorage.create({
    domain: 'festival-finder.com',
    status: 'planned',
    techStack: ['Next.js'],
    notes: '🏷️ Festival directory internationaal — affiliate tickets, AdSense, seizoenspieken',
  });

  sitesStorage.create({
    domain: 'goedkoopstroom.be',
    projectId: goedkoopStroom.id,
    status: 'live',
    techStack: ['Next.js', 'TypeScript'],
    notes: '🔧 Energievergelijker — hoge affiliate commissies (€30-80/lead)',
  });

  sitesStorage.create({
    domain: 'hondenpups.be',
    status: 'planned',
    techStack: ['Next.js'],
    notes: '🏷️ Puppies/honden directory — fokkers, adoptiepunten. Affiliate dierenvoeding, hoog emotioneel traffic',
  });

  sitesStorage.create({
    domain: 'huurrendementcalculator.be',
    status: 'live',
    techStack: ['Next.js', 'TypeScript'],
    notes: '🔧 Vastgoed calculator — AdSense finance RPM, evergreen',
  });

  sitesStorage.create({
    domain: 'ibanvalidator.be',
    status: 'live',
    techStack: ['Next.js', 'TypeScript'],
    notes: '🔧 IBAN validatie tool — steady traffic, AdSense',
  });

  sitesStorage.create({
    domain: 'infinite-events.be',
    status: 'planned',
    techStack: ['Next.js'],
    notes: '🏷️ Event planning/directory — leadgen voor eventlocaties en -planners',
  });

  sitesStorage.create({
    domain: 'kleurcodes.be',
    status: 'live',
    techStack: ['Next.js', 'TypeScript'],
    notes: '🔧 Kleurcode tool — designer traffic, AdSense',
  });

  sitesStorage.create({
    domain: 'kmvergoeding.be',
    status: 'live',
    techStack: ['Next.js', 'TypeScript'],
    notes: '🔧 KM vergoeding calculator — jaarlijkse updates, AdSense',
  });

  sitesStorage.create({
    domain: 'loonberekening.be',
    status: 'planned',
    techStack: ['Next.js', 'TypeScript'],
    notes: '🏷️ Netto loon calculator — EXTREEM hoog zoekvolume, finance AdSense RPM €20+',
  });

  sitesStorage.create({
    domain: 'miner.company',
    status: 'planned',
    techStack: ['Next.js'],
    notes: '🏷️ Crypto mining niche — calculator, hardware reviews, affiliate',
  });

  sitesStorage.create({
    domain: 'prep-shop.be',
    status: 'planned',
    techStack: ['Next.js'],
    notes: '🏷️ Prepper/survival shop affiliate — niche e-commerce, groeiende markt',
  });

  sitesStorage.create({
    domain: 'schijnwerper.be',
    status: 'planned',
    techStack: ['Next.js'],
    notes: '🏷️ Evenementenverlichting/spotlight — leadgen voor licht-verhuur',
  });

  sitesStorage.create({
    domain: 'schuifzeilen.be',
    status: 'planned',
    techStack: ['Next.js'],
    notes: '🏷️ Schuifzeilen/zonwering — rank & rent, lokale installateurs. Niche met weinig concurrentie',
  });

  sitesStorage.create({
    domain: 'tankkosten.be',
    status: 'planned',
    techStack: ['Next.js', 'TypeScript'],
    notes: '🏷️ Brandstof calculator + goedkoopste tanken — hoog zoekvolume, AdSense + affiliate tankkaarten',
  });

  sitesStorage.create({
    domain: 'timmerwerkvlaanderen.be',
    status: 'planned',
    techStack: ['Next.js'],
    notes: '🏷️ Rank & rent timmerwerk — programmatic SEO type × locatie, leadgen voor schrijnwerkers',
  });

  sitesStorage.create({
    domain: 'veganisch.be',
    status: 'planned',
    techStack: ['Next.js'],
    notes: '🏷️ Vegan directory/recepten — restaurants, winkels, recepten. Groeiende niche, AdSense + affiliate',
  });

  sitesStorage.create({
    domain: 'virtualrealityguides.com',
    status: 'planned',
    techStack: ['Next.js'],
    notes: '🏷️ VR reviews & guides internationaal — affiliate headsets (€20-50 commissie), tech AdSense RPM',
  });

  sitesStorage.create({
    domain: 'vloerverwarmingoffertes.be',
    status: 'planned',
    techStack: ['Next.js'],
    notes: '🏷️ Vloerverwarming leadgen — hoge CPC (€5-8), offerte-aanvragen voor installateurs',
  });

  sitesStorage.create({
    domain: 'vrouwenpeloton.be',
    status: 'planned',
    techStack: ['Next.js'],
    notes: '🏷️ Vrouwenwielrennen community — groeiende niche, affiliate fietskleding/gear',
  });

  sitesStorage.create({
    domain: 'wietwar.nl',
    status: 'planned',
    techStack: ['Next.js'],
    notes: '🏷️ Cannabis info/nieuws NL — hoog traffic potentieel, AdSense + CBD affiliate',
  });

  sitesStorage.create({
    domain: 'wimmel.be',
    status: 'planned',
    techStack: ['Next.js'],
    notes: '🏷️ Creatief domein — kinderactiviteiten, zoekboeken, of lokale events voor kids',
  });

  sitesStorage.create({
    domain: 'wptest.be',
    status: 'dev',
    techStack: ['WordPress'],
    notes: '🛠️ WordPress test/staging omgeving',
  });

  sitesStorage.create({
    domain: 'dbuild4tech.be',
    status: 'planned',
    techStack: ['Next.js'],
    notes: '🏷️ Tech/development agency — IT diensten leadgen',
  });

  sitesStorage.create({
    domain: 'sleu.tel',
    status: 'planned',
    techStack: ['Next.js'],
    notes: '🏷️ Slotenmaker domein (sleu.tel = sleutel!) — rank & rent, hoge CPC emergency niche',
  });

  sitesStorage.create({
    domain: 'thedrone.be',
    status: 'planned',
    techStack: ['Next.js'],
    notes: '🏷️ Drone services/reviews — affiliate drones, diensten directory (fotografie, inspectie)',
  });

  // Create NOW Items (max 3)
  nowItemsStorage.create({
    title: 'Kinderopvang live deployment',
    meta: 'kinderopvangvlaanderen.be',
    tag: 'Deploy',
    description: 'Complete final deployment and DNS setup',
    projectId: kinderopvang.id,
  });

  nowItemsStorage.create({
    title: 'Poxy.be Vercel deploy',
    meta: 'poxy.be',
    tag: 'Migration',
    description: 'Migrate from current hosting to Vercel',
    projectId: poxy.id,
  });

  nowItemsStorage.create({
    title: 'Mosk.be CSV import',
    meta: 'mosk.be',
    tag: 'Data',
    description: 'Import mosque data from CSV files',
    projectId: mosk.id,
  });

  // Create Sample Alerts
  alertsStorage.create({
    title: 'Sitemap redirect detected',
    body: 'One or more sites return 308/307 for /sitemap.xml. Set Vercel primary domain to non-www.',
    priority: 'high',
    resolved: false,
  });

  alertsStorage.create({
    title: 'Tripwire: -20% clicks (14d)',
    body: 'Investigate if drop persists: query mix, pages, indexing, cannibalization.',
    priority: 'medium',
    resolved: false,
  });

  alertsStorage.create({
    title: 'GA4 sessions coming in',
    body: 'Traction detected on tool-sites. Good for AdSense readiness.',
    priority: 'low',
    resolved: false,
  });

  alertsStorage.create({
    title: 'SSL certificate expiry warning',
    body: 'luwaert.be SSL certificate expires in 7 days. Renew immediately.',
    priority: 'high',
    resolved: false,
  });

  // Create Sample Tasks
  tasksStorage.create({
    title: 'Complete mosk.be wireframes',
    description: 'Design the main listing and detail pages',
    status: 'todo',
    projectId: mosk.id,
    priority: 'high',
  });

  tasksStorage.create({
    title: 'Set up Poxy.be analytics',
    description: 'Configure GA4 and GSC for the new deployment',
    status: 'todo',
    projectId: poxy.id,
    priority: 'medium',
  });

  tasksStorage.create({
    title: 'Write content for Elektrik.Ink',
    description: 'Create artist profiles and event information',
    status: 'in-progress',
    projectId: elektrik.id,
    priority: 'high',
  });

  tasksStorage.create({
    title: 'AdSense application for calculator',
    description: 'Submit zwangerschapscalculator.be for AdSense approval',
    status: 'todo',
    projectId: zwangerschapscalculator.id,
    priority: 'medium',
  });

  tasksStorage.create({
    title: 'Client feedback review',
    description: 'Incorporate Luwaert.be revamp feedback',
    status: 'in-progress',
    projectId: filipClient.id,
    priority: 'high',
  });

  // Create Sample Ideas
  ideasStorage.create({
    title: 'Tattoo aftercare app',
    description: 'Mobile app for tattoo aftercare instructions and reminders',
    category: 'tool',
    priority: 'medium',
  });

  ideasStorage.create({
    title: 'Belgian restaurants directory',
    description: 'Comprehensive directory of restaurants across Belgium',
    category: 'directory',
    priority: 'low',
  });

  ideasStorage.create({
    title: 'Automated SEO auditing tool',
    description: 'Tool that automatically audits website SEO and provides recommendations',
    category: 'tool',
    priority: 'high',
  });

  ideasStorage.create({
    title: 'Local business lead generation',
    description: 'Expand lead generation to more Belgian cities',
    category: 'leadgen',
    priority: 'medium',
  });

  ideasStorage.create({
    title: 'Client portal for Hazier',
    description: 'Dashboard where clients can track project progress',
    category: 'feature',
    priority: 'high',
  });

  // Create Sample Notes
  notesStorage.create({
    title: 'Project Review - Q1 2026',
    content: `## Revenue Overview
- CollectPro: €2,500/month (stable)
- Hazier: €3,200/month (growing)
- Directories: €300/month combined
- Lead generation: €625/month combined

## Key Insights
- Tool sites are gaining traction
- Need to focus on AdSense applications
- Client work is steady but time-intensive

## Next Quarter Goals
- Launch mosk.be directory
- Get 2 tool sites approved for AdSense
- Expand lead generation to new verticals`,
    tags: ['review', 'revenue', 'planning'],
  });

  notesStorage.create({
    title: 'SEO Strategy Notes',
    content: `## Current Focus Areas
1. Technical SEO cleanup across all sites
2. Content optimization for local keywords
3. Building topic clusters for directories

## Tools Used
- GSC for performance monitoring
- Screaming Frog for crawl analysis
- Ahrefs for keyword research

## Recent Wins
- Fixed sitemap issues on 3 sites
- Improved page speed scores
- Added structured data to directories`,
    tags: ['seo', 'strategy', 'technical'],
  });

  notesStorage.create({
    title: 'Client Meeting - Filip Luwaert',
    content: `## Meeting Notes - Feb 7, 2026

**Discussed:**
- Website redesign feedback
- Mobile responsiveness issues
- Contact form optimization
- Local SEO improvements

**Action Items:**
- Update color scheme per brand guidelines
- Fix mobile menu navigation
- Add Google Business Profile integration
- Implement schema markup for local business

**Next Meeting:** Feb 14, 2026`,
    tags: ['client', 'meeting', 'luwaert'],
  });

  console.log('✅ Seed data created successfully!');
}