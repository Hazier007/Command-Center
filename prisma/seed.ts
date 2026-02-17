import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Check if already seeded
  const existing = await prisma.project.count()
  if (existing > 0) {
    console.log('Database already has data, skipping seed')
    return
  }

  console.log('Seeding database...')

  // Projects
  const collectPro = await prisma.project.create({ data: { name: 'CollectPro', status: 'active', category: 'business', description: 'B2B incasso platform - co-founder', revenue: 2500 }})
  const hazier = await prisma.project.create({ data: { name: 'Hazier', status: 'active', category: 'business', description: 'Webdesign/SEO bureau', revenue: 3200 }})
  const kinderopvang = await prisma.project.create({ data: { name: 'Kinderopvang Vlaanderen', status: 'active', category: 'directory', description: 'Directory for childcare centers in Flanders', revenue: 180 }})
  const poxy = await prisma.project.create({ data: { name: 'Poxy.be', status: 'active', category: 'leadgen', description: 'Rank & rent epoxy floors', revenue: 420 }})
  const elektrik = await prisma.project.create({ data: { name: 'Elektrik.ink', status: 'active', category: 'event', description: 'VZW tattoobeurs - co-founder met David Malfroy', revenue: 850 }})
  const zorgApp = await prisma.project.create({ data: { name: 'Zorg-app', status: 'active', category: 'client', description: 'Zorg applicatie (klant)', revenue: 1200 }})
  const preppedia = await prisma.project.create({ data: { name: 'Preppedia', status: 'active', category: 'tool', description: 'Prepper/survival affiliate site (Amazon)', revenue: 0 }})
  const opblaasbareboot = await prisma.project.create({ data: { name: 'Opblaasbareboot.be', status: 'active', category: 'tool', description: 'Opblaasbare boot affiliate site (Amazon)', revenue: 0 }})
  const ovlSlotenmaker = await prisma.project.create({ data: { name: 'OVL-Slotenmaker', status: 'active', category: 'leadgen', description: 'Slotenmaker site (Next.js 14, 534 paginas)', revenue: 0 }})
  const toolSites = await prisma.project.create({ data: { name: 'Tool Sites', status: 'active', category: 'tool', description: 'btw-calculator, loonberekening, ibanvalidator, etc.', revenue: 500 }})
  const commandCenter = await prisma.project.create({ data: { name: 'Command Center', status: 'active', category: 'tool', description: 'Centraal dashboard voor alle projecten', revenue: 0 }})

  console.log('Projects created:', 11)

  // Sites (88+ domeinen)
  const sites = [
    { domain: 'hazier.be', projectId: hazier.id, status: 'live', techStack: ['Next.js 16', 'Tailwind v4'], revenue: 3200, notes: 'Bureau + Belgische markt' },
    { domain: 'hazier.eu', projectId: hazier.id, status: 'live', techStack: ['GoDaddy'], notes: 'White label reseller' },
    { domain: 'hazier.com', projectId: hazier.id, status: 'planned', techStack: ['Next.js'], notes: 'Internationaal portfolio (toekomst)' },
    { domain: 'collectpro.be', projectId: collectPro.id, status: 'live', techStack: ['Next.js', 'Case Control'], revenue: 2500, notes: 'B2B incasso platform' },
    { domain: 'poxy.be', projectId: poxy.id, status: 'live', techStack: ['Next.js 14'], revenue: 420, pages: 1100, notes: 'Rank & rent epoxyvloer, 1100+ paginas' },
    { domain: 'ovl-slotenmaker.be', projectId: ovlSlotenmaker.id, status: 'live', techStack: ['Next.js 14'], pages: 534, notes: 'Slotenmaker, 534 paginas - herwerking nodig' },
    { domain: 'elektrik.ink', projectId: elektrik.id, status: 'live', techStack: ['WordPress'], revenue: 850, notes: 'Tattoobeurs VZW' },
    { domain: 'kinderopvangvlaanderen.be', projectId: kinderopvang.id, status: 'live', techStack: ['Next.js'], revenue: 180, listings: 312, notes: 'Directory, 312 listings' },
    { domain: 'btw-calculator.be', projectId: toolSites.id, status: 'live', techStack: ['Next.js'], revenue: 150, notes: 'BTW calculator - hoge zoekvolume, AdSense. Toekomstige BTW API host.' },
    { domain: 'loonberekening.be', projectId: toolSites.id, status: 'live', techStack: ['Next.js'], revenue: 100, notes: 'Netto loon calculator - EXTREEM hoog zoekvolume' },
    { domain: 'ibanvalidator.be', projectId: toolSites.id, status: 'live', techStack: ['Next.js'], revenue: 50, notes: 'IBAN validator tool' },
    { domain: 'datumberekenen.be', projectId: toolSites.id, status: 'live', techStack: ['Next.js'], revenue: 40, notes: 'Datumcalculator' },
    { domain: 'kleurcodes.be', projectId: toolSites.id, status: 'live', techStack: ['Next.js'], revenue: 30, notes: 'Kleurcodes tool' },
    { domain: 'kmvergoeding.be', projectId: toolSites.id, status: 'live', techStack: ['Next.js'], revenue: 60, notes: 'KM vergoeding calculator' },
    { domain: 'huurrendementcalculator.be', projectId: toolSites.id, status: 'live', techStack: ['Next.js'], revenue: 20, notes: 'Huurrendement calculator' },
    { domain: 'zwangerschapscalculator.be', projectId: toolSites.id, status: 'live', techStack: ['Next.js'], revenue: 30, notes: 'Zwangerschapscalculator' },
    { domain: 'goedkoopstroom.be', projectId: toolSites.id, status: 'live', techStack: ['Next.js'], revenue: 20, notes: 'Goedkoopste stroom vergelijker' },
    { domain: 'buitendrogen.be', projectId: toolSites.id, status: 'live', techStack: ['Next.js'], revenue: 15, notes: 'Buitendrogen info' },
    { domain: 'preppedia.com', projectId: preppedia.id, status: 'dev', techStack: ['Next.js 16'], notes: 'MVP in development - affiliate Amazon (tag: preppedia-20)' },
    { domain: 'opblaasbareboot.be', projectId: opblaasbareboot.id, status: 'dev', techStack: ['Next.js 14'], notes: 'Affiliate Amazon (tag: bootjes-21) - wacht op keywords' },
    { domain: 'techno-preventie.be', status: 'live', techStack: ['WordPress'], notes: 'Security site - dark mode update' },
    // Planned domains
    { domain: 'zolderramen.be', status: 'planned', techStack: ['Next.js'], notes: 'Lisa idee - rank & rent' },
    { domain: 'schietclub.be', status: 'planned', techStack: ['Next.js'], notes: 'Lisa idee' },
    { domain: 'busstop.be', status: 'planned', techStack: ['Next.js'], notes: 'Lisa idee' },
    { domain: 'interesten.be', status: 'planned', techStack: ['Next.js'], notes: 'Lisa idee - finance tool' },
    { domain: 'veilig.info', status: 'planned', techStack: ['Next.js'], notes: 'Lisa idee' },
    { domain: 'waarheid.info', status: 'planned', techStack: ['Next.js'], notes: 'Lisa idee' },
    { domain: 'tea-planet.com', status: 'planned', techStack: ['Next.js'], notes: 'Lisa idee - internationaal' },
    { domain: 'cordbracelet.com', status: 'planned', techStack: ['Next.js'], notes: 'Lisa idee - internationaal' },
    { domain: 'amateurfotograaf.net', status: 'planned', techStack: ['Next.js'], notes: 'Lisa idee' },
    { domain: 'elbowtendonitis.com', status: 'planned', techStack: ['Next.js'], notes: 'Lisa idee - health niche' },
    { domain: 'proformas.eu', status: 'planned', techStack: ['Next.js'], notes: 'Proforma facturen tool' },
    { domain: 'provenzano.ae', status: 'planned', techStack: ['Next.js'], notes: 'Charlanri project' },
    { domain: 'openluchtzwembaden.be', status: 'planned', techStack: ['Next.js'], notes: 'Directory' },
    { domain: 'tankkosten.be', status: 'planned', techStack: ['Next.js'], notes: 'Quick win - hoog zoekvolume' },
    { domain: 'hondenvlooien.be', status: 'planned', techStack: ['Next.js'], notes: 'Niche info site' },
    { domain: 'running-sneakers.com', status: 'planned', techStack: ['Next.js'], notes: 'Internationaal affiliate' },
    { domain: 'timmerwerkvlaanderen.be', status: 'planned', techStack: ['Next.js'], notes: 'Rank & rent' },
    { domain: 'vloerverwarmingoffertes.be', status: 'planned', techStack: ['Next.js'], notes: 'Fase 2 roadmap' },
    { domain: 'sleu.tel', status: 'planned', techStack: ['Next.js'], notes: 'Fase 2 roadmap - slotenmaker' },
    { domain: 'factuurfinanciering.be', status: 'planned', techStack: ['Next.js'], notes: 'Fase 3 roadmap - finance' },
  ]

  for (const site of sites) {
    await prisma.site.create({ data: site as any })
  }
  console.log('Sites created:', sites.length)

  // Tasks (huidige taken)
  const tasks = [
    { title: 'Preppedia MVP bouwen', status: 'in-progress', assignee: 'jc', priority: 'high', projectId: preppedia.id, description: 'Homepage + categorieën + echte content op Vercel' },
    { title: 'Command Center uitbouwen', status: 'in-progress', assignee: 'lisa', priority: 'high', projectId: commandCenter.id, description: 'Dark mode + team board + database koppeling' },
    { title: 'BTW API bouwen', status: 'todo', assignee: 'jc', priority: 'medium', projectId: toolSites.id, description: 'REST API: /vat/rate + /vat/validate op btw-calculator.be' },
    { title: 'White-label Calculator Widget', status: 'todo', assignee: 'jc', priority: 'medium', projectId: toolSites.id, description: 'BTW-calc als embeddable iframe + API key (€29/mnd)' },
    { title: 'Opblaasbareboot keywords + productdata', status: 'in-progress', assignee: 'wout', priority: 'medium', projectId: opblaasbareboot.id, description: 'Low hanging fruit keywords + productpagina template' },
    { title: 'Domein-audit 88 domeinen', status: 'todo', assignee: 'lisa', priority: 'medium', description: 'Alle domeinen categoriseren: houden / verkopen / droppen' },
    { title: 'Hazier.be Stripe koppeling', status: 'todo', assignee: 'jc', priority: 'low', projectId: hazier.id, description: 'Stripe payments + cases pagina' },
    { title: 'OVL-Slotenmaker herwerken', status: 'todo', assignee: 'jc', priority: 'low', projectId: ovlSlotenmaker.id, description: 'Herwerking van de slotenmaker site' },
    { title: 'CollectPro Template Marketplace', status: 'todo', assignee: 'wout', priority: 'low', projectId: collectPro.id, description: 'Gratis templates → email capture → upsell abo' },
    { title: 'Elektrik.ink locatie 2026 bevestigen', status: 'in-progress', assignee: 'bart', priority: 'high', projectId: elektrik.id, description: 'Chinastraat Gent bezoek 17/02 om 11u' },
    { title: 'VPS specs doorgeven', status: 'todo', assignee: 'bart', priority: 'low', description: 'Voor content writer LLM' },
    { title: 'Neon DB opzetten voor CC', status: 'done', assignee: 'lisa', priority: 'high', projectId: commandCenter.id, description: 'DATABASE_URL op Vercel + Prisma migratie' },
  ]

  for (const task of tasks) {
    await prisma.task.create({ data: task as any })
  }
  console.log('Tasks created:', tasks.length)

  // Ideas
  const ideas = [
    { title: 'AI-Powered Lead Qualification Service', description: 'Micro-SaaS: automatisch leads scoren en kwalificeren. White-label voor makelaars, installateurs, advocaten.', category: 'business', priority: 'high' },
    { title: 'Niche Data APIs', description: 'IBAN validator API, feestdagen/werkdagen API, BTW tarieven API. Usage-based pricing.', category: 'tool', priority: 'high' },
    { title: 'Seizoens-arbitrage affiliate', description: 'Trending producten detecteren + instant landingspaginas. Airco mobiel, wespenval, terrasverwarmer etc.', category: 'business', priority: 'medium' },
    { title: 'Missed Call Recovery SaaS', description: 'Widget + sms fallback + logging voor lokale bedrijven. €29-€99/mnd MRR.', category: 'business', priority: 'medium' },
    { title: 'Related Tools Network', description: '88 domeinen cross-links. 1 component, shared JSON config, start op 10 sites met traffic.', category: 'feature', priority: 'high' },
  ]

  for (const idea of ideas) {
    await prisma.idea.create({ data: idea })
  }
  console.log('Ideas created:', ideas.length)

  // Now Items
  await prisma.nowItem.create({ data: { title: 'Preppedia MVP', meta: 'JC 🥊 — deadline vrijdag 21/02', tag: 'BUILD', projectId: preppedia.id }})
  await prisma.nowItem.create({ data: { title: 'Command Center', meta: 'Lisa 📋 — database + UI', tag: 'BUILD', projectId: commandCenter.id }})
  await prisma.nowItem.create({ data: { title: 'Elektrik.ink locatie', meta: 'Bart 👑 — Chinastraat 17/02', tag: 'DECIDE', projectId: elektrik.id }})
  console.log('NowItems created: 3')

  // Alerts
  await prisma.alert.create({ data: { title: 'Geen zichtbaar resultaat', body: 'Bart wil elke dag iets NIEUWS op Vercel zien. Ship-or-explain om 18u.', priority: 'high' }})
  await prisma.alert.create({ data: { title: 'VPS specs nog open', body: 'Bart moet VPS specs doorgeven voor content writer LLM.', priority: 'low' }})
  console.log('Alerts created: 2')

  // Notes
  await prisma.note.create({ data: { title: 'Werkafspraken 16/02', content: '- Elke dag iets NIEUWS zichtbaar op Vercel\n- Ship-or-explain om 18u\n- Escaleer blockers om 12u\n- Minder process docs, meer bouwen\n- Prioriteit: 1) Preppedia 2) CC 3) BTW API', tags: ['werkafspraken', 'regels'] }})
  await prisma.note.create({ data: { title: 'Revenue Roadmap', content: 'Fase 1 (Feb-Mrt): Preppedia, BTW API, AdSense aanvragen\nFase 2 (Apr-Jun): Vloerverwarmingoffertes, Sleu.tel, Zolderramen\nFase 3 (Jul-Sep): Interesten.be, Factuurfinanciering\nFase 4 (Okt-Dec): Affiliate partnerships, rank & rent verhuren\n\nDoel: €10K/mnd wederkerend inkomen', tags: ['roadmap', 'revenue', 'strategie'] }})
  console.log('Notes created: 2')

  console.log('✅ Seed complete!')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
