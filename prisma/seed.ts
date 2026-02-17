import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Check if already seeded
  const existingProjects = await prisma.project.count();
  if (existingProjects >= 26) {
    console.log(`⏭️ Already fully seeded (${existingProjects} projects found). Skipping.`);
    return;
  }

  // Clear existing data (idempotent)
  await prisma.nowItem.deleteMany();
  await prisma.alert.deleteMany();
  await prisma.task.deleteMany();
  await prisma.idea.deleteMany();
  await prisma.note.deleteMany();
  await prisma.site.deleteMany();
  await prisma.project.deleteMany();
  console.log('🗑️ Cleared existing data');

  // === PROJECTS ===
  const collectPro = await prisma.project.create({ data: { name: 'CollectPro', status: 'active', category: 'business', description: 'B2B incasso platform - co-founder', revenue: 2500 } });
  const hazier = await prisma.project.create({ data: { name: 'Hazier', status: 'active', category: 'business', description: 'Webdesign/SEO bureau', revenue: 3200 } });
  const kinderopvang = await prisma.project.create({ data: { name: 'Kinderopvang Vlaanderen', status: 'active', category: 'directory', description: 'Directory for childcare centers in Flanders', revenue: 180 } });
  const poxy = await prisma.project.create({ data: { name: 'Poxy.be', status: 'active', category: 'leadgen', description: 'Rank & rent epoxy floors directory', revenue: 420 } });
  const mosk = await prisma.project.create({ data: { name: 'Mosk.be', status: 'planned', category: 'directory', description: 'Mosques directory for Belgium' } });
  const kluisverhuur = await prisma.project.create({ data: { name: 'Kluisverhuur.be', status: 'active', category: 'leadgen', description: 'Safe rental lead generation', revenue: 120 } });
  const huizenopkoper = await prisma.project.create({ data: { name: 'Huizenopkoper.be', status: 'active', category: 'leadgen', description: 'House buying lead generation', revenue: 85 } });
  const instapklare = await prisma.project.create({ data: { name: 'Instapklare Woning', status: 'planned', category: 'leadgen', description: 'Turnkey house concept' } });
  const zwangerschapscalculator = await prisma.project.create({ data: { name: 'Zwangerschapscalculator.be', status: 'active', category: 'tool', description: 'Pregnancy calculator tool - pending AdSense' } });
  const elektrik = await prisma.project.create({ data: { name: 'Elektrik.Ink', status: 'active', category: 'event', description: 'Tattoo convention May 17-18 2025', revenue: 850 } });
  const zorgApp = await prisma.project.create({ data: { name: 'Zorg-app', status: 'active', category: 'client', description: 'Healthcare internal tool', revenue: 1200 } });
  const kristofClient = await prisma.project.create({ data: { name: 'Kristof (Slotenmakerij)', status: 'active', category: 'client', description: 'Locksmith client website', revenue: 150 } });
  const filipClient = await prisma.project.create({ data: { name: 'Filip Luwaert', status: 'active', category: 'client', description: 'luwaert.be client website', revenue: 180 } });

  // Lisa's project proposals
  const zolderramen = await prisma.project.create({ data: { name: '💡 Zolderramen.be', status: 'planned', category: 'leadgen', description: 'Rank & rent voor dakramen/zolderramen installateurs. Hoge CPC (€3-5), weinig concurrentie. Programmatic SEO: type × locatie paginas.' } });
  const schietclub = await prisma.project.create({ data: { name: '💡 Schietclub.be', status: 'planned', category: 'directory', description: 'Directory van schietclubs/schietstanden in België. Niche met weinig goede sites. AdSense + affiliate (uitrusting). ~50-100 listings.' } });
  const busstop = await prisma.project.create({ data: { name: '💡 Busstop.be', status: 'planned', category: 'tool', description: 'Bushalte-finder tool met real-time De Lijn/NMBS data. High traffic potentieel, AdSense monetisatie. API-driven, lage onderhoudslast.' } });
  const interesten = await prisma.project.create({ data: { name: '💡 Interesten.be', status: 'planned', category: 'tool', description: 'Rente/interest calculator suite: spaarrente, lening, samengestelde interest. Hoge AdSense RPM (finance niche €15-30 RPM). Evergreen content.' } });
  const veiligInfo = await prisma.project.create({ data: { name: '💡 Veilig.info', status: 'planned', category: 'leadgen', description: 'Vergelijkingssite alarmsystemen & beveiligingscameras. Hoge commissies (€50-150/lead). Programmatic: product × type × locatie paginas.' } });
  const waarheidInfo = await prisma.project.create({ data: { name: '💡 Waarheid.info', status: 'planned', category: 'tool', description: 'Fact-checking/bronverificatie tool. Viral potentieel, AdSense. Kan AI-driven zijn. Unieke .info domein = authority vibe.' } });
  const teaPlanet = await prisma.project.create({ data: { name: '💡 Tea-planet.com', status: 'planned', category: 'leadgen', description: 'Internationale thee niche site. Affiliate (thee shops), AdSense. Programmatic: theetype × herkomst × benefit paginas. Engelstalig = groter bereik.' } });
  const cordbracelet = await prisma.project.create({ data: { name: '💡 Cordbracelet.com', status: 'planned', category: 'leadgen', description: 'Niche e-commerce/affiliate voor cord bracelets. Etsy/Amazon affiliate. Tutorial content + shop links. Lage concurrentie.' } });
  const amateurfotograaf = await prisma.project.create({ data: { name: '💡 Amateurfotograaf.net', status: 'planned', category: 'directory', description: 'Directory + community voor amateur fotografen in Vlaanderen. Workshops, equipment reviews, fotowedstrijden. AdSense + affiliate (camera gear).' } });
  const elbowTendonitis = await prisma.project.create({ data: { name: '💡 Elbowtendonitis.com', status: 'planned', category: 'tool', description: 'Medische niche site: tenniselleboog info + oefeningen. Extreem hoge AdSense RPM (health €20-50). Affiliate: braces, tools. Engelstalig evergreen.' } });
  const goedkoopStroom = await prisma.project.create({ data: { name: '💡 Goedkoopstroom (uitbreiden)', status: 'planned', category: 'tool', description: 'Energievergelijker tool uitbreiden: zonnepanelen calculator, warmtepomp vergelijker. Hoge affiliate commissies (€30-80/lead). Bestaande repo.' } });
  const slotenmakerDir = await prisma.project.create({ data: { name: '💡 Slotenmaker Directory', status: 'planned', category: 'directory', description: 'Nationale slotenmaker directory (je hebt al ervaring via Kristof). Rank & rent per regio. Emergency niche = hoge CPC (€5-10).' } });

  const projectCount = 26;
  console.log(`✅ ${projectCount} projects created`);

  // === SITES ===
  const sites = await Promise.all([
    // Project-linked sites
    prisma.site.create({ data: { domain: 'hazier.be', projectId: hazier.id, status: 'live', techStack: ['WordPress', 'PHP'], revenue: 0, notes: 'Main agency website' } }),
    prisma.site.create({ data: { domain: 'hazier.eu', projectId: hazier.id, status: 'live', techStack: ['WordPress', 'PHP'], revenue: 0, notes: 'European extension' } }),
    prisma.site.create({ data: { domain: 'kinderopvangvlaanderen.be', projectId: kinderopvang.id, status: 'live', techStack: ['WordPress', 'PHP'], revenue: 180, listings: 312, notes: 'Directory with 312 listings' } }),
    prisma.site.create({ data: { domain: 'poxy.be', projectId: poxy.id, status: 'live', techStack: ['WordPress', 'PHP'], revenue: 420, pages: 1094, notes: 'Rank & rent with 1094 pages' } }),
    prisma.site.create({ data: { domain: 'mosk.be', projectId: mosk.id, status: 'planned', techStack: ['Next.js', 'TypeScript'], notes: 'Mosques directory - planned' } }),
    prisma.site.create({ data: { domain: 'kluisverhuur.be', projectId: kluisverhuur.id, status: 'live', techStack: ['Next.js', 'TypeScript'], revenue: 120, notes: 'Safe rental leads' } }),
    prisma.site.create({ data: { domain: 'huizenopkoper.be', projectId: huizenopkoper.id, status: 'live', techStack: ['WordPress', 'PHP'], revenue: 85, notes: 'House buying leads' } }),
    prisma.site.create({ data: { domain: 'instapklarewoning.be', projectId: instapklare.id, status: 'planned', techStack: ['Next.js', 'TypeScript'], notes: 'Turnkey house concept - planned' } }),
    prisma.site.create({ data: { domain: 'zwangerschapscalculator.be', projectId: zwangerschapscalculator.id, status: 'live', techStack: ['Next.js', 'TypeScript'], notes: 'Pregnancy calculator - pending AdSense approval' } }),
    prisma.site.create({ data: { domain: 'luwaert.be', projectId: filipClient.id, status: 'live', techStack: ['WordPress', 'PHP'], revenue: 180, notes: 'Filip Luwaert client site' } }),
    // Lisa's project sites
    prisma.site.create({ data: { domain: 'cordbracelet.com', projectId: cordbracelet.id, status: 'planned', techStack: ['Next.js'], notes: '💡 Niche affiliate — cord bracelets, Etsy/Amazon links' } }),
    prisma.site.create({ data: { domain: 'tea-planet.com', projectId: teaPlanet.id, status: 'planned', techStack: ['Next.js'], notes: '💡 Internationale thee niche — affiliate + AdSense' } }),
    prisma.site.create({ data: { domain: 'interesten.be', projectId: interesten.id, status: 'planned', techStack: ['Next.js', 'TypeScript'], notes: '💡 Finance calculator suite — hoge AdSense RPM' } }),
    prisma.site.create({ data: { domain: 'busstop.be', projectId: busstop.id, status: 'live', techStack: ['Next.js', 'TypeScript'], pages: 593, notes: '🚏 Bushalte review platform — 593 paginas, 549 haltes, 34 steden' } }),
    prisma.site.create({ data: { domain: 'zolderramen.be', projectId: zolderramen.id, status: 'planned', techStack: ['Next.js', 'TypeScript'], notes: '💡 Rank & rent dakramen — hoge CPC, programmatic SEO' } }),
    prisma.site.create({ data: { domain: 'schietclub.be', projectId: schietclub.id, status: 'planned', techStack: ['WordPress', 'Directorist'], notes: '💡 Schietclub directory — niche met weinig concurrentie' } }),
    prisma.site.create({ data: { domain: 'veilig.info', projectId: veiligInfo.id, status: 'planned', techStack: ['Next.js', 'TypeScript'], notes: '💡 Alarmsystemen vergelijker — hoge lead commissies' } }),
    prisma.site.create({ data: { domain: 'waarheid.info', projectId: waarheidInfo.id, status: 'planned', techStack: ['Next.js', 'TypeScript'], notes: '💡 Fact-checking tool — viral potentieel' } }),
    prisma.site.create({ data: { domain: 'amateurfotograaf.net', projectId: amateurfotograaf.id, status: 'planned', techStack: ['WordPress', 'Directorist'], notes: '💡 Fotografen directory + community — affiliate camera gear' } }),
    prisma.site.create({ data: { domain: 'elbowtendonitis.com', projectId: elbowTendonitis.id, status: 'planned', techStack: ['Next.js', 'TypeScript'], notes: '💡 Health niche — extreem hoge AdSense RPM, evergreen' } }),
    // Standalone domain portfolio
    prisma.site.create({ data: { domain: 'ai-automatisering.be', status: 'planned', techStack: ['Next.js'], notes: '🏷️ AI/automation niche — leadgen voor AI-consultants, hoge waarde markt' } }),
    prisma.site.create({ data: { domain: 'belgiangolf.com', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Golf directory/community België — club listings, affiliate golf gear' } }),
    prisma.site.create({ data: { domain: 'betover.org', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Creatief domein — events, goochelaars directory, of storytelling platform' } }),
    prisma.site.create({ data: { domain: 'btw-calculator.be', status: 'live', techStack: ['Next.js', 'TypeScript'], notes: '🔧 BTW calculator tool — hoge zoekvolume, AdSense monetisatie' } }),
    prisma.site.create({ data: { domain: 'budprofiles.com', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Cannabis/CBD profielen — internationaal, affiliate potentieel' } }),
    prisma.site.create({ data: { domain: 'buitendrogen.be', status: 'live', techStack: ['Next.js', 'TypeScript'], notes: '🔧 Weer/droog tool — seizoensgebonden traffic, AdSense' } }),
    prisma.site.create({ data: { domain: 'collectpro.be', projectId: collectPro.id, status: 'live', techStack: ['Next.js'], notes: '🏢 CollectPro hoofdsite — B2B incasso platform' } }),
    prisma.site.create({ data: { domain: 'datumberekenen.be', status: 'live', techStack: ['Next.js', 'TypeScript'], notes: '🔧 Datum calculator tool — evergreen, AdSense' } }),
    prisma.site.create({ data: { domain: 'elektrik.ink', projectId: elektrik.id, status: 'live', techStack: ['Next.js'], notes: '🎪 Tattoo convention website — mei 2025 event' } }),
    prisma.site.create({ data: { domain: 'factuurfinanciering.be', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Factoring/invoice financing — hoge CPC finance niche, leadgen voor factoring bedrijven' } }),
    prisma.site.create({ data: { domain: 'festival-finder.com', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Festival directory internationaal — affiliate tickets, AdSense, seizoenspieken' } }),
    prisma.site.create({ data: { domain: 'goedkoopstroom.be', projectId: goedkoopStroom.id, status: 'live', techStack: ['Next.js', 'TypeScript'], notes: '🔧 Energievergelijker — hoge affiliate commissies (€30-80/lead)' } }),
    prisma.site.create({ data: { domain: 'hondenpups.be', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Puppies/honden directory — fokkers, adoptiepunten. Affiliate dierenvoeding, hoog emotioneel traffic' } }),
    prisma.site.create({ data: { domain: 'huurrendementcalculator.be', status: 'live', techStack: ['Next.js', 'TypeScript'], notes: '🔧 Vastgoed calculator — AdSense finance RPM, evergreen' } }),
    prisma.site.create({ data: { domain: 'ibanvalidator.be', status: 'live', techStack: ['Next.js', 'TypeScript'], notes: '🔧 IBAN validatie tool — steady traffic, AdSense' } }),
    prisma.site.create({ data: { domain: 'infinite-events.be', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Event planning/directory — leadgen voor eventlocaties en -planners' } }),
    prisma.site.create({ data: { domain: 'kleurcodes.be', status: 'live', techStack: ['Next.js', 'TypeScript'], notes: '🔧 Kleurcode tool — designer traffic, AdSense' } }),
    prisma.site.create({ data: { domain: 'kmvergoeding.be', status: 'live', techStack: ['Next.js', 'TypeScript'], notes: '🔧 KM vergoeding calculator — jaarlijkse updates, AdSense' } }),
    prisma.site.create({ data: { domain: 'loonberekening.be', status: 'planned', techStack: ['Next.js', 'TypeScript'], notes: '🏷️ Netto loon calculator — EXTREEM hoog zoekvolume, finance AdSense RPM €20+' } }),
    prisma.site.create({ data: { domain: 'miner.company', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Crypto mining niche — calculator, hardware reviews, affiliate' } }),
    prisma.site.create({ data: { domain: 'prep-shop.be', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Prepper/survival shop affiliate — niche e-commerce, groeiende markt' } }),
    prisma.site.create({ data: { domain: 'schijnwerper.be', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Evenementenverlichting/spotlight — leadgen voor licht-verhuur' } }),
    prisma.site.create({ data: { domain: 'schuifzeilen.be', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Schuifzeilen/zonwering — rank & rent, lokale installateurs. Niche met weinig concurrentie' } }),
    prisma.site.create({ data: { domain: 'tankkosten.be', status: 'planned', techStack: ['Next.js', 'TypeScript'], notes: '🏷️ Brandstof calculator + goedkoopste tanken — hoog zoekvolume, AdSense + affiliate tankkaarten' } }),
    prisma.site.create({ data: { domain: 'timmerwerkvlaanderen.be', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Rank & rent timmerwerk — programmatic SEO type × locatie, leadgen voor schrijnwerkers' } }),
    prisma.site.create({ data: { domain: 'veganisch.be', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Vegan directory/recepten — restaurants, winkels, recepten. Groeiende niche, AdSense + affiliate' } }),
    prisma.site.create({ data: { domain: 'virtualrealityguides.com', status: 'planned', techStack: ['Next.js'], notes: '🏷️ VR reviews & guides internationaal — affiliate headsets (€20-50 commissie), tech AdSense RPM' } }),
    prisma.site.create({ data: { domain: 'vloerverwarmingoffertes.be', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Vloerverwarming leadgen — hoge CPC (€5-8), offerte-aanvragen voor installateurs' } }),
    prisma.site.create({ data: { domain: 'vrouwenpeloton.be', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Vrouwenwielrennen community — groeiende niche, affiliate fietskleding/gear' } }),
    prisma.site.create({ data: { domain: 'wietwar.nl', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Cannabis info/nieuws NL — hoog traffic potentieel, AdSense + CBD affiliate' } }),
    prisma.site.create({ data: { domain: 'wimmel.be', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Creatief domein — kinderactiviteiten, zoekboeken, of lokale events voor kids' } }),
    prisma.site.create({ data: { domain: 'wptest.be', status: 'dev', techStack: ['WordPress'], notes: '🛠️ WordPress test/staging omgeving' } }),
    prisma.site.create({ data: { domain: 'dbuild4tech.be', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Tech/development agency — IT diensten leadgen' } }),
    prisma.site.create({ data: { domain: 'sleu.tel', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Slotenmaker domein (sleu.tel = sleutel!) — rank & rent, hoge CPC emergency niche' } }),
    prisma.site.create({ data: { domain: 'thedrone.be', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Drone services/reviews — affiliate drones, diensten directory (fotografie, inspectie)' } }),
    // Deel 3
    prisma.site.create({ data: { domain: 'advancedradiology.org', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Radiologie niche — medisch, hoge AdSense RPM, Engelstalig' } }),
    prisma.site.create({ data: { domain: 'audiosysteem.be', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Audio/HiFi reviews & vergelijker — affiliate (€20-80 commissie)' } }),
    prisma.site.create({ data: { domain: 'besef.be', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Creatief domein — bewustwording, blog, of mental health platform' } }),
    prisma.site.create({ data: { domain: 'bodytattoodesign.com', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Tattoo designs gallery — AdSense + affiliate (tattoo supplies), hoog visueel traffic' } }),
    prisma.site.create({ data: { domain: 'bow-hunt.com', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Bowhunting niche — gear reviews, tutorials, affiliate (hoge commissies)' } }),
    prisma.site.create({ data: { domain: 'cakedecorationshop.com', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Taartdecoratie affiliate shop — tutorials + Amazon/Bol affiliate' } }),
    prisma.site.create({ data: { domain: 'campingpremium.com', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Premium camping/glamping directory — Europees, affiliate boekingen' } }),
    prisma.site.create({ data: { domain: 'cartonrecycle.com', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Karton recycling info — B2B leadgen voor recyclingbedrijven' } }),
    prisma.site.create({ data: { domain: 'coinplace.nl', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Crypto platform NL — exchange vergelijker, affiliate, hoge commissies' } }),
    prisma.site.create({ data: { domain: 'deblock.asia', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Persoonlijk/family domein — portfolio of travel blog' } }),
    prisma.site.create({ data: { domain: 'doba.org', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Kort domein — dropshipping, business directory, of tool' } }),
    prisma.site.create({ data: { domain: 'domaining.company', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Domeinhandel platform — tips, tools, marketplace voor domeinkopers' } }),
    prisma.site.create({ data: { domain: 'domeinnaamdeals.be', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Belgische domein marketplace — koop/verkoop domeinen' } }),
    prisma.site.create({ data: { domain: 'fabuloo.com', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Fashion/lifestyle brand — affiliate, catchy naam' } }),
    prisma.site.create({ data: { domain: 'farmfunds.eu', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Agri-investment platform — crowdfunding/investeren in landbouw, finance niche' } }),
    prisma.site.create({ data: { domain: 'gaarp.com', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Kort 5-letter domein — SaaS, tool, of brand' } }),
    prisma.site.create({ data: { domain: 'gliz.nl', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Kort NL domein — cleaning, beauty, of tech brand' } }),
    prisma.site.create({ data: { domain: 'goon.be', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Kort BE domein — gaming, streetwear, of community' } }),
    prisma.site.create({ data: { domain: 'hondenvlooien.be', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Hondenvlooien info + producten — affiliate dierenapotheek, hoog zoekvolume' } }),
    prisma.site.create({ data: { domain: 'juwelendoosje.be', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Juwelendoos affiliate — Bol/Amazon, cadeau-niche' } }),
    prisma.site.create({ data: { domain: 'kaarts.com', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Kaarten platform — wenskaarten, uitnodigingen, print-on-demand' } }),
    prisma.site.create({ data: { domain: 'krekelberg.be', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Lokaal/familienaam domein — portfolio of lokaal bedrijf' } }),
    prisma.site.create({ data: { domain: 'landrada.be', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Uniek domein — vastgoed, B&B, of historisch project' } }),
    prisma.site.create({ data: { domain: 'locallead.info', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Lokale leadgen tool/platform — meta: leadgen voor leadgen!' } }),
    prisma.site.create({ data: { domain: 'nycafes.com', status: 'planned', techStack: ['Next.js'], notes: '🏷️ New York cafés directory — hoog traffic potentieel, AdSense + affiliate' } }),
    prisma.site.create({ data: { domain: 'opblaasbareboot.be', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Opblaasbare boten affiliate — seizoensgebonden, Bol/Amazon' } }),
    prisma.site.create({ data: { domain: 'pizzeriabellaitalia.be', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Pizzeria website — rank & rent voor Italiaans restaurant' } }),
    prisma.site.create({ data: { domain: 'preppedia.com', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Prepper encyclopedie — survival guides, affiliate gear, AdSense' } }),
    prisma.site.create({ data: { domain: 'proc.es', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Proces/workflow tool — SaaS potentieel, premium kort domein' } }),
    prisma.site.create({ data: { domain: 'propertiestokyo.com', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Tokyo vastgoed niche — expats, investeerders, hoge waarde markt' } }),
    prisma.site.create({ data: { domain: 'rubberdresses.com', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Rubber/latex fashion niche — affiliate, specifiek publiek' } }),
    prisma.site.create({ data: { domain: 'running-sneakers.com', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Hardloopschoenen reviews — affiliate (€5-15/sale), groot zoekvolume' } }),
    prisma.site.create({ data: { domain: 'spaarinteresten.be', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Spaarrente vergelijker — finance niche, hoge RPM, affiliate banken' } }),
    prisma.site.create({ data: { domain: 'sportfood.org', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Sportvoeding reviews — affiliate (hoge marges), fitness niche' } }),
    prisma.site.create({ data: { domain: 'takenlijst.be', status: 'planned', techStack: ['Next.js'], notes: '🏷️ To-do/taken tool — freemium SaaS, of productiviteit blog' } }),
    prisma.site.create({ data: { domain: 'technocity.org', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Tech nieuws/reviews — AdSense + affiliate tech producten' } }),
    prisma.site.create({ data: { domain: 'testsites.be', status: 'planned', techStack: ['Next.js'], notes: '🛠️ Test/staging omgeving voor klanten' } }),
    prisma.site.create({ data: { domain: 'toodd.com', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Kort domein — brand, tool, of persoonlijk project' } }),
    prisma.site.create({ data: { domain: 'travelsecrets.be', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Reistips België/Europa — affiliate boekingen, AdSense' } }),
    prisma.site.create({ data: { domain: 'voorzichtig.be', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Veiligheid/preventie — verzekeringen vergelijker, leadgen' } }),
    // Deel 4
    prisma.site.create({ data: { domain: 'proformas.eu', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Proforma factuur generator tool — finance niche, hoge RPM, SaaS potentieel' } }),
    prisma.site.create({ data: { domain: 'provenzano.ae', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Premium UAE domein — vastgoed/luxury brand in Dubai markt' } }),
    prisma.site.create({ data: { domain: 'openluchtzwembaden.be', status: 'planned', techStack: ['Next.js'], notes: '🏷️ Openluchtzwembaden directory België — seizoensverkeer, AdSense, locatie-paginas per stad' } }),
  ]);
  console.log(`✅ ${sites.length} sites created`);

  // === NOW ITEMS ===
  await prisma.nowItem.createMany({ data: [
    { title: '🔥 Fase 1: Loonberekening.be bouwen', meta: 'loonberekening.be — hoogste ROI potentieel', tag: 'BUILD', description: 'Netto loon calculator + 10 content paginas. Finance niche = €20+ RPM. Potentieel: €500-1500/mnd' },
    { title: '🔥 Poxy.be + Busstop.be deployen & indexeren', meta: 'Beide live, Omega Indexer actief', tag: 'LAUNCH', description: 'GSC sitemaps ingediend, Omega Indexer draait. Wachten op indexatie + eerste traffic.' },
    { title: '🔥 AdSense aanvragen voor tool-sites', meta: 'huurrendement, zwangerschap, btw, iban', tag: 'MONETIZE', description: 'Content uitgebreid, klaar voor AdSense review. Per site aanvragen.' },
  ]});
  console.log('✅ 3 now items created');

  // === ALERTS ===
  await prisma.alert.createMany({ data: [
    { title: '💰 Revenue target: €6.000/mnd', body: 'Roadmap: 10 sites actief, mix van AdSense (€2K), leadgen (€2K), rank&rent (€1K), affiliate (€1K). Tijdlijn: 12-18 maanden.', priority: 'high', resolved: false },
    { title: '📊 Busstop.be: 587 paginas in GSC', body: 'Sitemap succesvol ingediend. GA4: G-CWQ88Y9BG0. Omega Indexer: 29 URLs in drip feed. Monitor indexatie over 1-2 weken.', priority: 'medium', resolved: false },
    { title: '🏗️ Huurrendement: 13 paginas klaar', body: 'Van 3 → 13 paginas met Kennisbank. Klaar voor AdSense hernieuwde aanvraag.', priority: 'low', resolved: false },
  ]});
  console.log('✅ 3 alerts created');

  // === TASKS ===
  await prisma.task.createMany({ data: [
    { title: '🟢 F1: Loonberekening.be bouwen', description: 'HOOGSTE PRIORITEIT. Netto loon calculator voor België. Programmatic SEO: berekening per sector, regio, statuut. Finance AdSense RPM €20+. Target: €500-1500/mnd. Stack: Next.js + TypeScript.', status: 'todo', priority: 'high', dueDate: new Date('2026-02-28') },
    { title: '🟢 F1: Poxy.be Vercel deploy + domein', description: '1094 paginas gebouwd. Deploy naar Vercel, domein koppelen, GSC + GA4 instellen, Omega Indexer.', status: 'todo', projectId: poxy.id, priority: 'high', dueDate: new Date('2026-02-15') },
    { title: '🟢 F1: AdSense aanvragen — huurrendementcalculator.be', description: '13 paginas klaar met Kennisbank. Opnieuw indienen bij AdSense.', status: 'todo', priority: 'high', dueDate: new Date('2026-02-10') },
    { title: '🟢 F1: AdSense aanvragen — zwangerschapscalculator.be', description: '8 content paginas + uitgebreide FAQ. PR mergen, dan AdSense aanvragen.', status: 'todo', priority: 'high', dueDate: new Date('2026-02-10') },
    { title: '🟢 F1: Spaarinteresten.be bouwen', description: 'Spaarrente vergelijker + calculator. Combineer met interesten.be. Finance niche, affiliate banken. Target: €400-1000/mnd.', status: 'todo', priority: 'high', dueDate: new Date('2026-03-15') },
    { title: '🟢 F1: Tankkosten.be bouwen', description: 'Brandstof calculator + goedkoopste tankstations. Hoog zoekvolume, AdSense. Target: €200-500/mnd.', status: 'todo', priority: 'medium', dueDate: new Date('2026-03-15') },
    { title: '🟢 F1: Busstop.be viraal maken', description: 'Reddit/Facebook posts, journalisten contacteren (HLN, VRT), "slechtste haltes" content pushen. Gratis PR = gratis backlinks.', status: 'in-progress', priority: 'high', dueDate: new Date('2026-02-28') },
    { title: '🟡 F2: Vloerverwarmingoffertes.be bouwen', description: 'Leadgen site voor vloerverwarming installateurs. Offerte-formulier, programmatic SEO (type × locatie). Hoge CPC €5-8. Target: €500-1500/mnd.', status: 'todo', priority: 'high', dueDate: new Date('2026-04-15') },
    { title: '🟡 F2: Sleu.tel bouwen', description: 'Slotenmaker rank & rent. Emergency niche = hoge CPC €5-10. Programmatic: dienst × locatie. Ervaring via Kristof. Target: €300-800/mnd.', status: 'todo', priority: 'high', dueDate: new Date('2026-04-30') },
    { title: '🟡 F2: Zolderramen.be bouwen', description: 'Rank & rent dakramen/zolderramen. Programmatic SEO. Hoge CPC €3-5. Target: €200-600/mnd.', status: 'todo', priority: 'medium', dueDate: new Date('2026-05-15') },
    { title: '🟡 F2: Kinderopvangvlaanderen.be live', description: 'Domein koppelen, purple border fixen, AdSense aanvragen. 312 listings klaar. Target: €100-400/mnd.', status: 'todo', priority: 'medium', dueDate: new Date('2026-04-15') },
    { title: '🟡 F2: Mosk.be bouwen', description: 'Moskeeën directory België. CSV data klaar, zelfde Directorist setup als kinderopvang. Target: €100-300/mnd.', status: 'todo', priority: 'medium', dueDate: new Date('2026-05-30') },
    { title: '🔵 F3: Interesten.be finance suite', description: 'Samengestelde interest, leningrente, spaarrente calculators. Combineer met spaarinteresten.be ecosystem. Target: €300-800/mnd.', status: 'todo', priority: 'medium', dueDate: new Date('2026-07-15') },
    { title: '🔵 F3: Factuurfinanciering.be', description: 'Factoring vergelijker + leadgen. Finance niche, dure leads (€50-100/lead). Target: €500-1500/mnd.', status: 'todo', priority: 'medium', dueDate: new Date('2026-08-15') },
    { title: '🔵 F3: Bestaande tool-sites optimaliseren', description: 'Content uitbreiden op btw-calculator, datumberekenen, kleurcodes, kmvergoeding, ibanvalidator. Meer paginas = meer AdSense inkomsten.', status: 'todo', priority: 'medium', dueDate: new Date('2026-09-30') },
    { title: '🔵 F3: Proformas.eu bouwen', description: 'Proforma factuur generator tool. Finance niche, SaaS potentieel. Freemium model. Target: €200-500/mnd.', status: 'todo', priority: 'low', dueDate: new Date('2026-09-15') },
    { title: '🟣 F4: Affiliate partnerships sluiten', description: 'Directe deals met: energieleveranciers (goedkoopstroom), banken (spaarinteresten), verzekeraars (veilig.info). Hogere commissies dan netwerken.', status: 'todo', priority: 'medium', dueDate: new Date('2026-10-31') },
    { title: '🟣 F4: Rank & rent verhuren', description: 'Poxy.be, sleu.tel, zolderramen.be, vloerverwarmingoffertes.be — lokale bedrijven benaderen voor maandelijkse huur van leads/paginas.', status: 'todo', priority: 'high', dueDate: new Date('2026-11-30') },
    { title: '🟣 F4: Revenue review & next year planning', description: 'Evalueer alle sites: welke presteren, welke niet. Slecht presterende sites pivoteren of verkopen. Planning 2027 met target €10K/mnd.', status: 'todo', priority: 'medium', dueDate: new Date('2026-12-15') },
    { title: 'Client feedback review', description: 'Incorporate Luwaert.be revamp feedback', status: 'in-progress', projectId: filipClient.id, priority: 'high' },
  ]});
  console.log('✅ 20 tasks created');

  // === IDEAS ===
  await prisma.idea.createMany({ data: [
    { title: '🏊 Openluchtzwembaden.be', description: 'Directory van openluchtzwembaden in België. Seizoensverkeer (mei-sep). Reviews, openingsuren, prijzen per zwembad. Zelfde setup als busstop.be.', category: 'directory', priority: 'medium' },
    { title: '🐕 Hondenpups.be', description: 'Puppies/fokkers directory. Emotioneel traffic (mensen zoeken puppies!). Affiliate dierenvoeding. Hoog engagement.', category: 'directory', priority: 'medium' },
    { title: '🏕️ Campingpremium.com', description: 'Glamping/premium camping directory Europa. Affiliate boekingen (€10-30/boeking). Seizoensgebonden maar hoog volume.', category: 'directory', priority: 'low' },
    { title: '🎯 Hazier Client Portal', description: 'React dashboard voor Hazier klanten: project status, facturen, rapportages, WordPress koppelingen. Productiseert het bureau.', category: 'feature', priority: 'high' },
    { title: '🪙 Coinplace.nl — Crypto vergelijker', description: 'Exchange vergelijker voor NL/BE markt. Affiliate commissies €50-200/signup. Past bij HODL strategie.', category: 'tool', priority: 'medium' },
    { title: '🏃 Running-sneakers.com', description: 'Hardloopschoenen reviews & vergelijker. Internationaal (Engels). Amazon/Bol affiliate. Groot zoekvolume.', category: 'leadgen', priority: 'low' },
    { title: '📋 Takenlijst.be als SaaS', description: 'Simpele to-do app. Freemium model: gratis basis, €3/mnd pro. Kan viral gaan in Vlaanderen. Recurring revenue.', category: 'tool', priority: 'low' },
  ]});
  console.log('✅ 7 ideas created');

  // === NOTES ===
  await prisma.note.createMany({ data: [
    {
      title: "🎯 Roadmap naar €6K/mnd — Lisa's Plan",
      content: `## Revenue Target Breakdown\n\n### Best Case (12-18 maanden, ~10 sites)\n| Site | Type | Target/mnd |\n|------|------|-----------|\n| loonberekening.be | Tool/AdSense | €500-1500 |\n| spaarinteresten.be | Finance/Affiliate | €400-1000 |\n| vloerverwarmingoffertes.be | Leadgen | €500-1500 |\n| poxy.be | Rank & Rent | €300-800 |\n| sleu.tel | Rank & Rent | €300-800 |\n| busstop.be | AdSense/Traffic | €200-600 |\n| huurrendementcalculator.be | Tool/AdSense | €200-500 |\n| zolderramen.be | Rank & Rent | €200-600 |\n| tankkosten.be | Tool/AdSense | €200-500 |\n| kinderopvangvlaanderen.be | Directory | €100-400 |\n| **TOTAAL** | | **€2.900-8.200** |\n\n### Worst Case (24+ maanden, ~15-20 sites)\n- Gemiddeld €300-400/site\n- 20% van sites floppt\n- Meer spreiding nodig\n\n### Strategie\n1. **Finance eerst** — hoogste RPM (€20-50)\n2. **Leadgen/rank&rent** — recurring, verhuurbaar\n3. **Tool sites** — AdSense, set-and-forget\n4. **Directories** — langzamer maar steady\n5. **Affiliate** — bonus inkomsten\n\n### Key Metrics om te tracken\n- Organisch traffic per site (GSC)\n- AdSense RPM per niche\n- Leads per maand (leadgen sites)\n- Indexatie snelheid (GSC)`,
      tags: ['roadmap', 'revenue', 'strategie'],
    },
    {
      title: '📊 Portfolio Status — 8 Feb 2026',
      content: `## Vandaag gebouwd/gelanceerd\n- ✅ Busstop.be LIVE — 600 paginas, GSC 587 URLs, GA4 actief\n- ✅ Poxy.be — 1094 paginas gebouwd, GitHub klaar, Vercel TODO\n- ✅ Huurrendementcalculator.be — 13 paginas (was 3), klaar voor AdSense\n- ✅ Command Center — live op Vercel met 88+ domeinen\n\n## Actieve sites met traffic\n- btw-calculator.be ✅\n- buitendrogen.be ✅\n- datumberekenen.be ✅\n- kleurcodes.be ✅\n- kmvergoeding.be ✅\n- ibanvalidator.be ✅\n- huurrendementcalculator.be ✅\n- zwangerschapscalculator.be ✅\n- goedkoopstroom.be ✅\n- collectpro.be ✅\n\n## Domeinportfolio\n88+ domeinen in bezit. Top 10 prioriteit geselecteerd voor uitbouw.\nFocus: finance tools + leadgen/rank&rent = snelste weg naar €6K/mnd.`,
      tags: ['status', 'portfolio', 'februari'],
    },
    {
      title: '🔑 Build Volgorde — Prioriteit',
      content: `## Volgorde van bouwen (ROI-gerankt)\n\n### 🔥 NU (Feb 2026)\n1. Loonberekening.be — #1 prioriteit, hoogste potentieel\n2. Spaarinteresten.be — finance combo met interesten.be\n3. Tankkosten.be — quick win, hoog zoekvolume\n\n### ⚡ DAARNA (Mrt-Apr 2026)\n4. Vloerverwarmingoffertes.be — leadgen, hoge CPC\n5. Sleu.tel — rank & rent, emergency niche\n6. Zolderramen.be — rank & rent, weinig concurrentie\n\n### 📦 Q2-Q3 2026\n7. Interesten.be — finance calculator suite\n8. Factuurfinanciering.be — dure leads\n9. Mosk.be — directory (CSV klaar)\n10. Kinderopvangvlaanderen.be — live deployment\n\n### Regels\n- Max 2-3 sites tegelijk bouwen\n- Elke site: GSC + GA4 + Omega Indexer dag 1\n- AdSense aanvragen zodra 10+ paginas\n- Content > design (ranken eerst, stylen later)`,
      tags: ['planning', 'volgorde', 'prioriteit'],
    },
  ]});
  console.log('✅ 3 notes created');

  console.log('\n🎉 Seed complete! Summary:');
  console.log(`   Projects: ${projectCount}`);
  console.log(`   Sites: ${sites.length}`);
  console.log(`   Now Items: 3`);
  console.log(`   Alerts: 3`);
  console.log(`   Tasks: 20`);
  console.log(`   Ideas: 7`);
  console.log(`   Notes: 3`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
