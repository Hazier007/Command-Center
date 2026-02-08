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

  // Domain portfolio sites
  sitesStorage.create({
    domain: 'cordbracelet.com',
    status: 'planned',
    techStack: ['Next.js'],
    notes: 'Domain portfolio - cord bracelet niche',
  });

  sitesStorage.create({
    domain: 'tea-planet.com',
    status: 'planned',
    techStack: ['Next.js'],
    notes: 'Domain portfolio - tea niche',
  });

  sitesStorage.create({
    domain: 'interesten.be',
    status: 'planned',
    techStack: ['Next.js'],
    notes: 'Domain portfolio - interests/hobbies',
  });

  sitesStorage.create({
    domain: 'busstop.be',
    status: 'planned',
    techStack: ['Next.js'],
    notes: 'Domain portfolio - public transport',
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