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

export async function seedData() {
  // Check if already seeded
  const existing = await projectsStorage.getAll();
  if (existing.length > 3) {
    return; // Already seeded with full data
  }

  // Create Projects
  const collectPro = await projectsStorage.create({
    name: 'CollectPro',
    status: 'active',
    category: 'business',
    description: 'B2B incasso platform - co-founder',
    revenue: 2500,
  });

  const hazier = await projectsStorage.create({
    name: 'Hazier',
    status: 'active',
    category: 'business',
    description: 'Webdesign/SEO bureau',
    revenue: 3200,
  });

  const kinderopvang = await projectsStorage.create({
    name: 'Kinderopvang Vlaanderen',
    status: 'active',
    category: 'directory',
    description: 'Directory for childcare centers in Flanders',
    revenue: 180,
  });

  const poxy = await projectsStorage.create({
    name: 'Poxy.be',
    status: 'active',
    category: 'leadgen',
    description: 'Rank & rent epoxy floors directory',
    revenue: 420,
  });

  const mosk = await projectsStorage.create({
    name: 'Mosk.be',
    status: 'planned',
    category: 'directory',
    description: 'Mosques directory for Belgium',
  });

  const kluisverhuur = await projectsStorage.create({
    name: 'Kluisverhuur.be',
    status: 'active',
    category: 'leadgen',
    description: 'Safe rental lead generation',
    revenue: 120,
  });

  const huizenopkoper = await projectsStorage.create({
    name: 'Huizenopkoper.be',
    status: 'active',
    category: 'leadgen',
    description: 'House buying lead generation',
    revenue: 85,
  });

  const instapklare = await projectsStorage.create({
    name: 'Instapklare Woning',
    status: 'planned',
    category: 'leadgen',
    description: 'Turnkey house concept',
  });

  const zwangerschapscalculator = await projectsStorage.create({
    name: 'Zwangerschapscalculator.be',
    status: 'active',
    category: 'tool',
    description: 'Pregnancy calculator tool - pending AdSense',
  });

  const elektrik = await projectsStorage.create({
    name: 'Elektrik.Ink',
    status: 'active',
    category: 'event',
    description: 'Tattoo convention May 17-18 2025',
    revenue: 850,
  });

  const zorgApp = await projectsStorage.create({
    name: 'Zorg-app',
    status: 'active',
    category: 'client',
    description: 'Healthcare internal tool',
    revenue: 1200,
  });

  const kristofClient = await projectsStorage.create({
    name: 'Kristof (Slotenmakerij)',
    status: 'active',
    category: 'client',
    description: 'Locksmith client website',
    revenue: 150,
  });

  const filipClient = await projectsStorage.create({
    name: 'Filip Luwaert',
    status: 'active',
    category: 'client',
    description: 'luwaert.be client website',
    revenue: 180,
  });

  // === LISA'S PROJECT VOORSTELLEN ===
  // Passieve inkomen assets — low maintenance, high SEO potential

  const zolderramen = await projectsStorage.create({
    name: '💡 Zolderramen.be',
    status: 'planned',
    category: 'leadgen',
    description: 'Rank & rent voor dakramen/zolderramen installateurs. Hoge CPC (€3-5), weinig concurrentie. Programmatic SEO: type × locatie paginas.',
  });

  const schietclub = await projectsStorage.create({
    name: '💡 Schietclub.be',
    status: 'planned',
    category: 'directory',
    description: 'Directory van schietclubs/schietstanden in België. Niche met weinig goede sites. AdSense + affiliate (uitrusting). ~50-100 listings.',
  });

  const busstop = await projectsStorage.create({
    name: '💡 Busstop.be',
    status: 'planned',
    category: 'tool',
    description: 'Bushalte-finder tool met real-time De Lijn/NMBS data. High traffic potentieel, AdSense monetisatie. API-driven, lage onderhoudslast.',
  });

  const interesten = await projectsStorage.create({
    name: '💡 Interesten.be',
    status: 'planned',
    category: 'tool',
    description: 'Rente/interest calculator suite: spaarrente, lening, samengestelde interest. Hoge AdSense RPM (finance niche €15-30 RPM). Evergreen content.',
  });

  const veiligInfo = await projectsStorage.create({
    name: '💡 Veilig.info',
    status: 'planned',
    category: 'leadgen',
    description: 'Vergelijkingssite alarmsystemen & beveiligingscameras. Hoge commissies (€50-150/lead). Programmatic: product × type × locatie paginas.',
  });

  const waarheidInfo = await projectsStorage.create({
    name: '💡 Waarheid.info',
    status: 'planned',
    category: 'tool',
    description: 'Fact-checking/bronverificatie tool. Viral potentieel, AdSense. Kan AI-driven zijn. Unieke .info domein = authority vibe.',
  });

  const teaPlanet = await projectsStorage.create({
    name: '💡 Tea-planet.com',
    status: 'planned',
    category: 'leadgen',
    description: 'Internationale thee niche site. Affiliate (thee shops), AdSense. Programmatic: theetype × herkomst × benefit paginas. Engelstalig = groter bereik.',
  });

  const cordbracelet = await projectsStorage.create({
    name: '💡 Cordbracelet.com',
    status: 'planned',
    category: 'leadgen',
    description: 'Niche e-commerce/affiliate voor cord bracelets. Etsy/Amazon affiliate. Tutorial content + shop links. Lage concurrentie.',
  });

  const amateurfotograaf = await projectsStorage.create({
    name: '💡 Amateurfotograaf.net',
    status: 'planned',
    category: 'directory',
    description: 'Directory + community voor amateur fotografen in Vlaanderen. Workshops, equipment reviews, fotowedstrijden. AdSense + affiliate (camera gear).',
  });

  const elbowTendonitis = await projectsStorage.create({
    name: '💡 Elbowtendonitis.com',
    status: 'planned',
    category: 'tool',
    description: 'Medische niche site: tenniselleboog info + oefeningen. Extreem hoge AdSense RPM (health €20-50). Affiliate: braces, tools. Engelstalig evergreen.',
  });

  const goedkoopStroom = await projectsStorage.create({
    name: '💡 Goedkoopstroom (uitbreiden)',
    status: 'planned',
    category: 'tool',
    description: 'Energievergelijker tool uitbreiden: zonnepanelen calculator, warmtepomp vergelijker. Hoge affiliate commissies (€30-80/lead). Bestaande repo.',
  });

  const slotenmakerDir = await projectsStorage.create({
    name: '💡 Slotenmaker Directory',
    status: 'planned',
    category: 'directory',
    description: 'Nationale slotenmaker directory (je hebt al ervaring via Kristof). Rank & rent per regio. Emergency niche = hoge CPC (€5-10).',
  });

  // Create Sites
  await sitesStorage.create({
    domain: 'hazier.be',
    projectId: hazier.id,
    status: 'live',
    techStack: ['WordPress', 'PHP'],
    revenue: 0,
    notes: 'Main agency website',
  });

  await sitesStorage.create({
    domain: 'hazier.eu',
    projectId: hazier.id,
    status: 'live',
    techStack: ['WordPress', 'PHP'],
    revenue: 0,
    notes: 'European extension',
  });

  await sitesStorage.create({
    domain: 'kinderopvangvlaanderen.be',
    projectId: kinderopvang.id,
    status: 'live',
    techStack: ['WordPress', 'PHP'],
    revenue: 180,
    listings: 312,
    notes: 'Directory with 312 listings',
  });

  await sitesStorage.create({
    domain: 'poxy.be',
    projectId: poxy.id,
    status: 'live',
    techStack: ['WordPress', 'PHP'],
    revenue: 420,
    pages: 1094,
    notes: 'Rank & rent with 1094 pages',
  });

  await sitesStorage.create({
    domain: 'mosk.be',
    projectId: mosk.id,
    status: 'planned',
    techStack: ['Next.js', 'TypeScript'],
    notes: 'Mosques directory - planned',
  });

  await sitesStorage.create({
    domain: 'kluisverhuur.be',
    projectId: kluisverhuur.id,
    status: 'live',
    techStack: ['Next.js', 'TypeScript'],
    revenue: 120,
    notes: 'Safe rental leads',
  });

  await sitesStorage.create({
    domain: 'huizenopkoper.be',
    projectId: huizenopkoper.id,
    status: 'live',
    techStack: ['WordPress', 'PHP'],
    revenue: 85,
    notes: 'House buying leads',
  });

  await sitesStorage.create({
    domain: 'instapklarewoning.be',
    projectId: instapklare.id,
    status: 'planned',
    techStack: ['Next.js', 'TypeScript'],
    notes: 'Turnkey house concept - planned',
  });

  await sitesStorage.create({
    domain: 'zwangerschapscalculator.be',
    projectId: zwangerschapscalculator.id,
    status: 'live',
    techStack: ['Next.js', 'TypeScript'],
    notes: 'Pregnancy calculator - pending AdSense approval',
  });

  await sitesStorage.create({
    domain: 'luwaert.be',
    projectId: filipClient.id,
    status: 'live',
    techStack: ['WordPress', 'PHP'],
    revenue: 180,
    notes: 'Filip Luwaert client site',
  });

  // Domain portfolio sites — linked to Lisa's project proposals
  await sitesStorage.create({
    domain: 'cordbracelet.com',
    projectId: cordbracelet.id,
    status: 'planned',
    techStack: ['Next.js'],
    notes: '💡 Niche affiliate — cord bracelets, Etsy/Amazon links',
  });

  await sitesStorage.create({
    domain: 'tea-planet.com',
    projectId: teaPlanet.id,
    status: 'planned',
    techStack: ['Next.js'],
    notes: '💡 Internationale thee niche — affiliate + AdSense',
  });

  await sitesStorage.create({
    domain: 'interesten.be',
    projectId: interesten.id,
    status: 'planned',
    techStack: ['Next.js', 'TypeScript'],
    notes: '💡 Finance calculator suite — hoge AdSense RPM',
  });

  await sitesStorage.create({
    domain: 'busstop.be',
    projectId: busstop.id,
    status: 'live',
    techStack: ['Next.js', 'TypeScript'],
    pages: 593,
    notes: '🚏 Bushalte review platform — 593 paginas, 549 haltes, 34 steden',
  });

  await sitesStorage.create({
    domain: 'zolderramen.be',
    projectId: zolderramen.id,
    status: 'planned',
    techStack: ['Next.js', 'TypeScript'],
    notes: '💡 Rank & rent dakramen — hoge CPC, programmatic SEO',
  });

  await sitesStorage.create({
    domain: 'schietclub.be',
    projectId: schietclub.id,
    status: 'planned',
    techStack: ['WordPress', 'Directorist'],
    notes: '💡 Schietclub directory — niche met weinig concurrentie',
  });

  await sitesStorage.create({
    domain: 'veilig.info',
    projectId: veiligInfo.id,
    status: 'planned',
    techStack: ['Next.js', 'TypeScript'],
    notes: '💡 Alarmsystemen vergelijker — hoge lead commissies',
  });

  await sitesStorage.create({
    domain: 'waarheid.info',
    projectId: waarheidInfo.id,
    status: 'planned',
    techStack: ['Next.js', 'TypeScript'],
    notes: '💡 Fact-checking tool — viral potentieel',
  });

  await sitesStorage.create({
    domain: 'amateurfotograaf.net',
    projectId: amateurfotograaf.id,
    status: 'planned',
    techStack: ['WordPress', 'Directorist'],
    notes: '💡 Fotografen directory + community — affiliate camera gear',
  });

  await sitesStorage.create({
    domain: 'elbowtendonitis.com',
    projectId: elbowTendonitis.id,
    status: 'planned',
    techStack: ['Next.js', 'TypeScript'],
    notes: '💡 Health niche — extreem hoge AdSense RPM, evergreen',
  });

  // === BART'S VOLLEDIGE DOMEINPORTFOLIO ===
  // Domeinen die nog niet hierboven staan

  await sitesStorage.create({
    domain: 'ai-automatisering.be',
    status: 'planned',
    techStack: ['Next.js'],
    notes: '🏷️ AI/automation niche — leadgen voor AI-consultants, hoge waarde markt',
  });

  await sitesStorage.create({
    domain: 'belgiangolf.com',
    status: 'planned',
    techStack: ['Next.js'],
    notes: '🏷️ Golf directory/community België — club listings, affiliate golf gear',
  });

  await sitesStorage.create({
    domain: 'betover.org',
    status: 'planned',
    techStack: ['Next.js'],
    notes: '🏷️ Creatief domein — events, goochelaars directory, of storytelling platform',
  });

  await sitesStorage.create({
    domain: 'btw-calculator.be',
    status: 'live',
    techStack: ['Next.js', 'TypeScript'],
    notes: '🔧 BTW calculator tool — hoge zoekvolume, AdSense monetisatie',
  });

  await sitesStorage.create({
    domain: 'budprofiles.com',
    status: 'planned',
    techStack: ['Next.js'],
    notes: '🏷️ Cannabis/CBD profielen — internationaal, affiliate potentieel',
  });

  await sitesStorage.create({
    domain: 'buitendrogen.be',
    status: 'live',
    techStack: ['Next.js', 'TypeScript'],
    notes: '🔧 Weer/droog tool — seizoensgebonden traffic, AdSense',
  });

  await sitesStorage.create({
    domain: 'collectpro.be',
    projectId: collectPro.id,
    status: 'live',
    techStack: ['Next.js'],
    notes: '🏢 CollectPro hoofdsite — B2B incasso platform',
  });

  await sitesStorage.create({
    domain: 'datumberekenen.be',
    status: 'live',
    techStack: ['Next.js', 'TypeScript'],
    notes: '🔧 Datum calculator tool — evergreen, AdSense',
  });

  await sitesStorage.create({
    domain: 'elektrik.ink',
    projectId: elektrik.id,
    status: 'live',
    techStack: ['Next.js'],
    notes: '🎪 Tattoo convention website — mei 2025 event',
  });

  await sitesStorage.create({
    domain: 'factuurfinanciering.be',
    status: 'planned',
    techStack: ['Next.js'],
    notes: '🏷️ Factoring/invoice financing — hoge CPC finance niche, leadgen voor factoring bedrijven',
  });

  await sitesStorage.create({
    domain: 'festival-finder.com',
    status: 'planned',
    techStack: ['Next.js'],
    notes: '🏷️ Festival directory internationaal — affiliate tickets, AdSense, seizoenspieken',
  });

  await sitesStorage.create({
    domain: 'goedkoopstroom.be',
    projectId: goedkoopStroom.id,
    status: 'live',
    techStack: ['Next.js', 'TypeScript'],
    notes: '🔧 Energievergelijker — hoge affiliate commissies (€30-80/lead)',
  });

  await sitesStorage.create({
    domain: 'hondenpups.be',
    status: 'planned',
    techStack: ['Next.js'],
    notes: '🏷️ Puppies/honden directory — fokkers, adoptiepunten. Affiliate dierenvoeding, hoog emotioneel traffic',
  });

  await sitesStorage.create({
    domain: 'huurrendementcalculator.be',
    status: 'live',
    techStack: ['Next.js', 'TypeScript'],
    notes: '🔧 Vastgoed calculator — AdSense finance RPM, evergreen',
  });

  await sitesStorage.create({
    domain: 'ibanvalidator.be',
    status: 'live',
    techStack: ['Next.js', 'TypeScript'],
    notes: '🔧 IBAN validatie tool — steady traffic, AdSense',
  });

  await sitesStorage.create({
    domain: 'infinite-events.be',
    status: 'planned',
    techStack: ['Next.js'],
    notes: '🏷️ Event planning/directory — leadgen voor eventlocaties en -planners',
  });

  await sitesStorage.create({
    domain: 'kleurcodes.be',
    status: 'live',
    techStack: ['Next.js', 'TypeScript'],
    notes: '🔧 Kleurcode tool — designer traffic, AdSense',
  });

  await sitesStorage.create({
    domain: 'kmvergoeding.be',
    status: 'live',
    techStack: ['Next.js', 'TypeScript'],
    notes: '🔧 KM vergoeding calculator — jaarlijkse updates, AdSense',
  });

  await sitesStorage.create({
    domain: 'loonberekening.be',
    status: 'planned',
    techStack: ['Next.js', 'TypeScript'],
    notes: '🏷️ Netto loon calculator — EXTREEM hoog zoekvolume, finance AdSense RPM €20+',
  });

  await sitesStorage.create({
    domain: 'miner.company',
    status: 'planned',
    techStack: ['Next.js'],
    notes: '🏷️ Crypto mining niche — calculator, hardware reviews, affiliate',
  });

  await sitesStorage.create({
    domain: 'prep-shop.be',
    status: 'planned',
    techStack: ['Next.js'],
    notes: '🏷️ Prepper/survival shop affiliate — niche e-commerce, groeiende markt',
  });

  await sitesStorage.create({
    domain: 'schijnwerper.be',
    status: 'planned',
    techStack: ['Next.js'],
    notes: '🏷️ Evenementenverlichting/spotlight — leadgen voor licht-verhuur',
  });

  await sitesStorage.create({
    domain: 'schuifzeilen.be',
    status: 'planned',
    techStack: ['Next.js'],
    notes: '🏷️ Schuifzeilen/zonwering — rank & rent, lokale installateurs. Niche met weinig concurrentie',
  });

  await sitesStorage.create({
    domain: 'tankkosten.be',
    status: 'planned',
    techStack: ['Next.js', 'TypeScript'],
    notes: '🏷️ Brandstof calculator + goedkoopste tanken — hoog zoekvolume, AdSense + affiliate tankkaarten',
  });

  await sitesStorage.create({
    domain: 'timmerwerkvlaanderen.be',
    status: 'planned',
    techStack: ['Next.js'],
    notes: '🏷️ Rank & rent timmerwerk — programmatic SEO type × locatie, leadgen voor schrijnwerkers',
  });

  await sitesStorage.create({
    domain: 'veganisch.be',
    status: 'planned',
    techStack: ['Next.js'],
    notes: '🏷️ Vegan directory/recepten — restaurants, winkels, recepten. Groeiende niche, AdSense + affiliate',
  });

  await sitesStorage.create({
    domain: 'virtualrealityguides.com',
    status: 'planned',
    techStack: ['Next.js'],
    notes: '🏷️ VR reviews & guides internationaal — affiliate headsets (€20-50 commissie), tech AdSense RPM',
  });

  await sitesStorage.create({
    domain: 'vloerverwarmingoffertes.be',
    status: 'planned',
    techStack: ['Next.js'],
    notes: '🏷️ Vloerverwarming leadgen — hoge CPC (€5-8), offerte-aanvragen voor installateurs',
  });

  await sitesStorage.create({
    domain: 'vrouwenpeloton.be',
    status: 'planned',
    techStack: ['Next.js'],
    notes: '🏷️ Vrouwenwielrennen community — groeiende niche, affiliate fietskleding/gear',
  });

  await sitesStorage.create({
    domain: 'wietwar.nl',
    status: 'planned',
    techStack: ['Next.js'],
    notes: '🏷️ Cannabis info/nieuws NL — hoog traffic potentieel, AdSense + CBD affiliate',
  });

  await sitesStorage.create({
    domain: 'wimmel.be',
    status: 'planned',
    techStack: ['Next.js'],
    notes: '🏷️ Creatief domein — kinderactiviteiten, zoekboeken, of lokale events voor kids',
  });

  await sitesStorage.create({
    domain: 'wptest.be',
    status: 'dev',
    techStack: ['WordPress'],
    notes: '🛠️ WordPress test/staging omgeving',
  });

  await sitesStorage.create({
    domain: 'dbuild4tech.be',
    status: 'planned',
    techStack: ['Next.js'],
    notes: '🏷️ Tech/development agency — IT diensten leadgen',
  });

  await sitesStorage.create({
    domain: 'sleu.tel',
    status: 'planned',
    techStack: ['Next.js'],
    notes: '🏷️ Slotenmaker domein (sleu.tel = sleutel!) — rank & rent, hoge CPC emergency niche',
  });

  await sitesStorage.create({
    domain: 'thedrone.be',
    status: 'planned',
    techStack: ['Next.js'],
    notes: '🏷️ Drone services/reviews — affiliate drones, diensten directory (fotografie, inspectie)',
  });

  // === DEEL 3 DOMEINEN ===
  await sitesStorage.create({ domain: 'advancedradiology.org', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Radiologie niche — medisch, hoge AdSense RPM, Engelstalig' });
  await sitesStorage.create({ domain: 'audiosysteem.be', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Audio/HiFi reviews & vergelijker — affiliate (€20-80 commissie)' });
  await sitesStorage.create({ domain: 'besef.be', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Creatief domein — bewustwording, blog, of mental health platform' });
  await sitesStorage.create({ domain: 'bodytattoodesign.com', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Tattoo designs gallery — AdSense + affiliate (tattoo supplies), hoog visueel traffic' });
  await sitesStorage.create({ domain: 'bow-hunt.com', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Bowhunting niche — gear reviews, tutorials, affiliate (hoge commissies)' });
  await sitesStorage.create({ domain: 'cakedecorationshop.com', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Taartdecoratie affiliate shop — tutorials + Amazon/Bol affiliate' });
  await sitesStorage.create({ domain: 'campingpremium.com', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Premium camping/glamping directory — Europees, affiliate boekingen' });
  await sitesStorage.create({ domain: 'cartonrecycle.com', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Karton recycling info — B2B leadgen voor recyclingbedrijven' });
  await sitesStorage.create({ domain: 'coinplace.nl', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Crypto platform NL — exchange vergelijker, affiliate, hoge commissies' });
  await sitesStorage.create({ domain: 'deblock.asia', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Persoonlijk/family domein — portfolio of travel blog' });
  await sitesStorage.create({ domain: 'doba.org', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Kort domein — dropshipping, business directory, of tool' });
  await sitesStorage.create({ domain: 'domaining.company', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Domeinhandel platform — tips, tools, marketplace voor domeinkopers' });
  await sitesStorage.create({ domain: 'domeinnaamdeals.be', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Belgische domein marketplace — koop/verkoop domeinen' });
  await sitesStorage.create({ domain: 'fabuloo.com', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Fashion/lifestyle brand — affiliate, catchy naam' });
  await sitesStorage.create({ domain: 'farmfunds.eu', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Agri-investment platform — crowdfunding/investeren in landbouw, finance niche' });
  await sitesStorage.create({ domain: 'gaarp.com', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Kort 5-letter domein — SaaS, tool, of brand' });
  await sitesStorage.create({ domain: 'gliz.nl', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Kort NL domein — cleaning, beauty, of tech brand' });
  await sitesStorage.create({ domain: 'goon.be', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Kort BE domein — gaming, streetwear, of community' });
  await sitesStorage.create({ domain: 'hondenvlooien.be', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Hondenvlooien info + producten — affiliate dierenapotheek, hoog zoekvolume' });
  await sitesStorage.create({ domain: 'juwelendoosje.be', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Juwelendoos affiliate — Bol/Amazon, cadeau-niche' });
  await sitesStorage.create({ domain: 'kaarts.com', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Kaarten platform — wenskaarten, uitnodigingen, print-on-demand' });
  await sitesStorage.create({ domain: 'krekelberg.be', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Lokaal/familienaam domein — portfolio of lokaal bedrijf' });
  await sitesStorage.create({ domain: 'landrada.be', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Uniek domein — vastgoed, B&B, of historisch project' });
  await sitesStorage.create({ domain: 'locallead.info', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Lokale leadgen tool/platform — meta: leadgen voor leadgen!' });
  await sitesStorage.create({ domain: 'nycafes.com', status: 'planned', techStack: ['Next.js'], notes: '🏷️ New York cafés directory — hoog traffic potentieel, AdSense + affiliate' });
  await sitesStorage.create({ domain: 'opblaasbareboot.be', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Opblaasbare boten affiliate — seizoensgebonden, Bol/Amazon' });
  await sitesStorage.create({ domain: 'pizzeriabellaitalia.be', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Pizzeria website — rank & rent voor Italiaans restaurant' });
  await sitesStorage.create({ domain: 'preppedia.com', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Prepper encyclopedie — survival guides, affiliate gear, AdSense' });
  await sitesStorage.create({ domain: 'proc.es', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Proces/workflow tool — SaaS potentieel, premium kort domein' });
  await sitesStorage.create({ domain: 'propertiestokyo.com', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Tokyo vastgoed niche — expats, investeerders, hoge waarde markt' });
  await sitesStorage.create({ domain: 'rubberdresses.com', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Rubber/latex fashion niche — affiliate, specifiek publiek' });
  await sitesStorage.create({ domain: 'running-sneakers.com', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Hardloopschoenen reviews — affiliate (€5-15/sale), groot zoekvolume' });
  await sitesStorage.create({ domain: 'spaarinteresten.be', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Spaarrente vergelijker — finance niche, hoge RPM, affiliate banken' });
  await sitesStorage.create({ domain: 'sportfood.org', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Sportvoeding reviews — affiliate (hoge marges), fitness niche' });
  await sitesStorage.create({ domain: 'takenlijst.be', status: 'planned', techStack: ['Next.js'], notes: '🏷️ To-do/taken tool — freemium SaaS, of productiviteit blog' });
  await sitesStorage.create({ domain: 'technocity.org', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Tech nieuws/reviews — AdSense + affiliate tech producten' });
  await sitesStorage.create({ domain: 'testsites.be', status: 'planned', techStack: ['Next.js'], notes: '🛠️ Test/staging omgeving voor klanten' });
  await sitesStorage.create({ domain: 'toodd.com', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Kort domein — brand, tool, of persoonlijk project' });
  await sitesStorage.create({ domain: 'travelsecrets.be', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Reistips België/Europa — affiliate boekingen, AdSense' });
  await sitesStorage.create({ domain: 'voorzichtig.be', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Veiligheid/preventie — verzekeringen vergelijker, leadgen' });

  // === DEEL 4 ===
  await sitesStorage.create({ domain: 'proformas.eu', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Proforma factuur generator tool — finance niche, hoge RPM, SaaS potentieel' });
  await sitesStorage.create({ domain: 'provenzano.ae', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Premium UAE domein — vastgoed/luxury brand in Dubai markt' });
  await sitesStorage.create({ domain: 'openluchtzwembaden.be', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Openluchtzwembaden directory België — seizoensverkeer, AdSense, locatie-paginas per stad' });

  // ============================================================
  // 🎯 ROADMAP NAAR €6K/MAAND PASSIEF INKOMEN
  // ============================================================
  // Fase 1 (Feb-Mrt): Quick wins — sites die al (bijna) klaar zijn
  // Fase 2 (Apr-Jun): High-value builds — finance & leadgen
  // Fase 3 (Jul-Sep): Scale & optimize — meer sites, AdSense, affiliate
  // Fase 4 (Okt-Dec): Harvest — optimaliseren, nieuwe inkomstenbronnen
  // Target: €6.000/maand passief inkomen binnen 18 maanden
  // ============================================================

  // Create NOW Items (max 3)
  await nowItemsStorage.create({
    title: '🔥 Fase 1: Loonberekening.be bouwen',
    meta: 'loonberekening.be — hoogste ROI potentieel',
    tag: 'BUILD',
    description: 'Netto loon calculator + 10 content paginas. Finance niche = €20+ RPM. Potentieel: €500-1500/mnd',
  });

  await nowItemsStorage.create({
    title: '🔥 Poxy.be + Busstop.be deployen & indexeren',
    meta: 'Beide live, Omega Indexer actief',
    tag: 'LAUNCH',
    description: 'GSC sitemaps ingediend, Omega Indexer draait. Wachten op indexatie + eerste traffic.',
  });

  await nowItemsStorage.create({
    title: '🔥 AdSense aanvragen voor tool-sites',
    meta: 'huurrendement, zwangerschap, btw, iban',
    tag: 'MONETIZE',
    description: 'Content uitgebreid, klaar voor AdSense review. Per site aanvragen.',
  });

  // Create Alerts
  await alertsStorage.create({
    title: '💰 Revenue target: €6.000/mnd',
    body: 'Roadmap: 10 sites actief, mix van AdSense (€2K), leadgen (€2K), rank&rent (€1K), affiliate (€1K). Tijdlijn: 12-18 maanden.',
    priority: 'high',
    resolved: false,
  });

  await alertsStorage.create({
    title: '📊 Busstop.be: 587 paginas in GSC',
    body: 'Sitemap succesvol ingediend. GA4: G-CWQ88Y9BG0. Omega Indexer: 29 URLs in drip feed. Monitor indexatie over 1-2 weken.',
    priority: 'medium',
    resolved: false,
  });

  await alertsStorage.create({
    title: '🏗️ Huurrendement: 13 paginas klaar',
    body: 'Van 3 → 13 paginas met Kennisbank. Klaar voor AdSense hernieuwde aanvraag.',
    priority: 'low',
    resolved: false,
  });

  // ============================================================
  // FASE 1 — QUICK WINS (Feb-Mrt 2026)
  // Sites die al klaar of bijna klaar zijn → live krijgen + monetiseren
  // ============================================================

  await tasksStorage.create({
    title: '🟢 F1: Loonberekening.be bouwen',
    description: 'HOOGSTE PRIORITEIT. Netto loon calculator voor België. Programmatic SEO: berekening per sector, regio, statuut. Finance AdSense RPM €20+. Target: €500-1500/mnd. Stack: Next.js + TypeScript.',
    status: 'todo',
    priority: 'high',
    dueDate: '2026-02-28',
  });

  await tasksStorage.create({
    title: '🟢 F1: Poxy.be Vercel deploy + domein',
    description: '1094 paginas gebouwd. Deploy naar Vercel, domein koppelen, GSC + GA4 instellen, Omega Indexer.',
    status: 'todo',
    projectId: poxy.id,
    priority: 'high',
    dueDate: '2026-02-15',
  });

  await tasksStorage.create({
    title: '🟢 F1: AdSense aanvragen — huurrendementcalculator.be',
    description: '13 paginas klaar met Kennisbank. Opnieuw indienen bij AdSense.',
    status: 'todo',
    priority: 'high',
    dueDate: '2026-02-10',
  });

  await tasksStorage.create({
    title: '🟢 F1: AdSense aanvragen — zwangerschapscalculator.be',
    description: '8 content paginas + uitgebreide FAQ. PR mergen, dan AdSense aanvragen.',
    status: 'todo',
    priority: 'high',
    dueDate: '2026-02-10',
  });

  await tasksStorage.create({
    title: '🟢 F1: Spaarinteresten.be bouwen',
    description: 'Spaarrente vergelijker + calculator. Combineer met interesten.be. Finance niche, affiliate banken. Target: €400-1000/mnd.',
    status: 'todo',
    priority: 'high',
    dueDate: '2026-03-15',
  });

  await tasksStorage.create({
    title: '🟢 F1: Tankkosten.be bouwen',
    description: 'Brandstof calculator + goedkoopste tankstations. Hoog zoekvolume, AdSense. Target: €200-500/mnd.',
    status: 'todo',
    priority: 'medium',
    dueDate: '2026-03-15',
  });

  await tasksStorage.create({
    title: '🟢 F1: Busstop.be viraal maken',
    description: 'Reddit/Facebook posts, journalisten contacteren (HLN, VRT), "slechtste haltes" content pushen. Gratis PR = gratis backlinks.',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2026-02-28',
  });

  // ============================================================
  // FASE 2 — HIGH-VALUE BUILDS (Apr-Jun 2026)
  // Finance tools & leadgen = hoogste €/site
  // ============================================================

  await tasksStorage.create({
    title: '🟡 F2: Vloerverwarmingoffertes.be bouwen',
    description: 'Leadgen site voor vloerverwarming installateurs. Offerte-formulier, programmatic SEO (type × locatie). Hoge CPC €5-8. Target: €500-1500/mnd.',
    status: 'todo',
    priority: 'high',
    dueDate: '2026-04-15',
  });

  await tasksStorage.create({
    title: '🟡 F2: Sleu.tel bouwen',
    description: 'Slotenmaker rank & rent. Emergency niche = hoge CPC €5-10. Programmatic: dienst × locatie. Ervaring via Kristof. Target: €300-800/mnd.',
    status: 'todo',
    priority: 'high',
    dueDate: '2026-04-30',
  });

  await tasksStorage.create({
    title: '🟡 F2: Zolderramen.be bouwen',
    description: 'Rank & rent dakramen/zolderramen. Programmatic SEO. Hoge CPC €3-5. Target: €200-600/mnd.',
    status: 'todo',
    priority: 'medium',
    dueDate: '2026-05-15',
  });

  await tasksStorage.create({
    title: '🟡 F2: Kinderopvangvlaanderen.be live',
    description: 'Domein koppelen, purple border fixen, AdSense aanvragen. 312 listings klaar. Target: €100-400/mnd.',
    status: 'todo',
    priority: 'medium',
    dueDate: '2026-04-15',
  });

  await tasksStorage.create({
    title: '🟡 F2: Mosk.be bouwen',
    description: 'Moskeeën directory België. CSV data klaar, zelfde Directorist setup als kinderopvang. Target: €100-300/mnd.',
    status: 'todo',
    priority: 'medium',
    dueDate: '2026-05-30',
  });

  // ============================================================
  // FASE 3 — SCALE & OPTIMIZE (Jul-Sep 2026)
  // Meer sites + bestaande optimaliseren
  // ============================================================

  await tasksStorage.create({
    title: '🔵 F3: Interesten.be finance suite',
    description: 'Samengestelde interest, leningrente, spaarrente calculators. Combineer met spaarinteresten.be ecosystem. Target: €300-800/mnd.',
    status: 'todo',
    priority: 'medium',
    dueDate: '2026-07-15',
  });

  await tasksStorage.create({
    title: '🔵 F3: Factuurfinanciering.be',
    description: 'Factoring vergelijker + leadgen. Finance niche, dure leads (€50-100/lead). Target: €500-1500/mnd.',
    status: 'todo',
    priority: 'medium',
    dueDate: '2026-08-15',
  });

  await tasksStorage.create({
    title: '🔵 F3: Bestaande tool-sites optimaliseren',
    description: 'Content uitbreiden op btw-calculator, datumberekenen, kleurcodes, kmvergoeding, ibanvalidator. Meer paginas = meer AdSense inkomsten.',
    status: 'todo',
    priority: 'medium',
    dueDate: '2026-09-30',
  });

  await tasksStorage.create({
    title: '🔵 F3: Proformas.eu bouwen',
    description: 'Proforma factuur generator tool. Finance niche, SaaS potentieel. Freemium model. Target: €200-500/mnd.',
    status: 'todo',
    priority: 'low',
    dueDate: '2026-09-15',
  });

  // ============================================================
  // FASE 4 — HARVEST (Okt-Dec 2026)
  // Optimaliseren, affiliate deals, schaal
  // ============================================================

  await tasksStorage.create({
    title: '🟣 F4: Affiliate partnerships sluiten',
    description: 'Directe deals met: energieleveranciers (goedkoopstroom), banken (spaarinteresten), verzekeraars (veilig.info). Hogere commissies dan netwerken.',
    status: 'todo',
    priority: 'medium',
    dueDate: '2026-10-31',
  });

  await tasksStorage.create({
    title: '🟣 F4: Rank & rent verhuren',
    description: 'Poxy.be, sleu.tel, zolderramen.be, vloerverwarmingoffertes.be — lokale bedrijven benaderen voor maandelijkse huur van leads/paginas.',
    status: 'todo',
    priority: 'high',
    dueDate: '2026-11-30',
  });

  await tasksStorage.create({
    title: '🟣 F4: Revenue review & next year planning',
    description: 'Evalueer alle sites: welke presteren, welke niet. Slecht presterende sites pivoteren of verkopen. Planning 2027 met target €10K/mnd.',
    status: 'todo',
    priority: 'medium',
    dueDate: '2026-12-15',
  });

  await tasksStorage.create({
    title: 'Client feedback review',
    description: 'Incorporate Luwaert.be revamp feedback',
    status: 'in-progress',
    projectId: filipClient.id,
    priority: 'high',
  });

  // Create Ideas — future projects
  await ideasStorage.create({
    title: '🏊 Openluchtzwembaden.be',
    description: 'Directory van openluchtzwembaden in België. Seizoensverkeer (mei-sep). Reviews, openingsuren, prijzen per zwembad. Zelfde setup als busstop.be.',
    category: 'directory',
    priority: 'medium',
  });

  await ideasStorage.create({
    title: '🐕 Hondenpups.be',
    description: 'Puppies/fokkers directory. Emotioneel traffic (mensen zoeken puppies!). Affiliate dierenvoeding. Hoog engagement.',
    category: 'directory',
    priority: 'medium',
  });

  await ideasStorage.create({
    title: '🏕️ Campingpremium.com',
    description: 'Glamping/premium camping directory Europa. Affiliate boekingen (€10-30/boeking). Seizoensgebonden maar hoog volume.',
    category: 'directory',
    priority: 'low',
  });

  await ideasStorage.create({
    title: '🎯 Hazier Client Portal',
    description: 'React dashboard voor Hazier klanten: project status, facturen, rapportages, WordPress koppelingen. Productiseert het bureau.',
    category: 'feature',
    priority: 'high',
  });

  await ideasStorage.create({
    title: '🪙 Coinplace.nl — Crypto vergelijker',
    description: 'Exchange vergelijker voor NL/BE markt. Affiliate commissies €50-200/signup. Past bij HODL strategie.',
    category: 'tool',
    priority: 'medium',
  });

  await ideasStorage.create({
    title: '🏃 Running-sneakers.com',
    description: 'Hardloopschoenen reviews & vergelijker. Internationaal (Engels). Amazon/Bol affiliate. Groot zoekvolume.',
    category: 'leadgen',
    priority: 'low',
  });

  await ideasStorage.create({
    title: '📋 Takenlijst.be als SaaS',
    description: 'Simpele to-do app. Freemium model: gratis basis, €3/mnd pro. Kan viral gaan in Vlaanderen. Recurring revenue.',
    category: 'tool',
    priority: 'low',
  });

  // Create Notes — roadmap & strategie
  await notesStorage.create({
    title: '🎯 Roadmap naar €6K/mnd — Lisa\'s Plan',
    content: `## Revenue Target Breakdown

### Best Case (12-18 maanden, ~10 sites)
| Site | Type | Target/mnd |
|------|------|-----------|
| loonberekening.be | Tool/AdSense | €500-1500 |
| spaarinteresten.be | Finance/Affiliate | €400-1000 |
| vloerverwarmingoffertes.be | Leadgen | €500-1500 |
| poxy.be | Rank & Rent | €300-800 |
| sleu.tel | Rank & Rent | €300-800 |
| busstop.be | AdSense/Traffic | €200-600 |
| huurrendementcalculator.be | Tool/AdSense | €200-500 |
| zolderramen.be | Rank & Rent | €200-600 |
| tankkosten.be | Tool/AdSense | €200-500 |
| kinderopvangvlaanderen.be | Directory | €100-400 |
| **TOTAAL** | | **€2.900-8.200** |

### Worst Case (24+ maanden, ~15-20 sites)
- Gemiddeld €300-400/site
- 20% van sites floppt
- Meer spreiding nodig

### Strategie
1. **Finance eerst** — hoogste RPM (€20-50)
2. **Leadgen/rank&rent** — recurring, verhuurbaar
3. **Tool sites** — AdSense, set-and-forget
4. **Directories** — langzamer maar steady
5. **Affiliate** — bonus inkomsten

### Key Metrics om te tracken
- Organisch traffic per site (GSC)
- AdSense RPM per niche
- Leads per maand (leadgen sites)
- Indexatie snelheid (GSC)`,
    tags: ['roadmap', 'revenue', 'strategie'],
  });

  await notesStorage.create({
    title: '📊 Portfolio Status — 8 Feb 2026',
    content: `## Vandaag gebouwd/gelanceerd
- ✅ Busstop.be LIVE — 600 paginas, GSC 587 URLs, GA4 actief
- ✅ Poxy.be — 1094 paginas gebouwd, GitHub klaar, Vercel TODO
- ✅ Huurrendementcalculator.be — 13 paginas (was 3), klaar voor AdSense
- ✅ Command Center — live op Vercel met 88+ domeinen

## Actieve sites met traffic
- btw-calculator.be ✅
- buitendrogen.be ✅
- datumberekenen.be ✅
- kleurcodes.be ✅
- kmvergoeding.be ✅
- ibanvalidator.be ✅
- huurrendementcalculator.be ✅
- zwangerschapscalculator.be ✅
- goedkoopstroom.be ✅
- collectpro.be ✅

## Domeinportfolio
88+ domeinen in bezit. Top 10 prioriteit geselecteerd voor uitbouw.
Focus: finance tools + leadgen/rank&rent = snelste weg naar €6K/mnd.`,
    tags: ['status', 'portfolio', 'februari'],
  });

  await notesStorage.create({
    title: '🔑 Build Volgorde — Prioriteit',
    content: `## Volgorde van bouwen (ROI-gerankt)

### 🔥 NU (Feb 2026)
1. Loonberekening.be — #1 prioriteit, hoogste potentieel
2. Spaarinteresten.be — finance combo met interesten.be
3. Tankkosten.be — quick win, hoog zoekvolume

### ⚡ DAARNA (Mrt-Apr 2026)
4. Vloerverwarmingoffertes.be — leadgen, hoge CPC
5. Sleu.tel — rank & rent, emergency niche
6. Zolderramen.be — rank & rent, weinig concurrentie

### 📦 Q2-Q3 2026
7. Interesten.be — finance calculator suite
8. Factuurfinanciering.be — dure leads
9. Mosk.be — directory (CSV klaar)
10. Kinderopvangvlaanderen.be — live deployment

### Regels
- Max 2-3 sites tegelijk bouwen
- Elke site: GSC + GA4 + Omega Indexer dag 1
- AdSense aanvragen zodra 10+ paginas
- Content > design (ranken eerst, stylen later)`,
    tags: ['planning', 'volgorde', 'prioriteit'],
  });

  console.log('✅ Seed data created successfully!');
}

