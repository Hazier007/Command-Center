const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  // First, list all current projects and sites
  const projects = await p.project.findMany({ include: { sites: true, tasks: true } });
  console.log('=== CURRENT PROJECTS ===');
  for (const proj of projects) {
    console.log(`${proj.id} | ${proj.name} | cat: ${proj.category} | sites: ${proj.sites.map(s=>s.domain).join(', ')} | tasks: ${proj.tasks.length}`);
  }
  
  const orphanSites = await p.site.findMany({ where: { projectId: null } });
  console.log('\n=== ORPHAN SITES ===');
  for (const s of orphanSites) {
    console.log(`${s.id} | ${s.domain}`);
  }

  const allSites = await p.site.findMany();
  console.log('\n=== ALL SITES ===');
  for (const s of allSites) {
    console.log(`${s.id} | ${s.domain} | project: ${s.projectId || 'none'}`);
  }
}

main().catch(e => console.error(e)).finally(() => p.$disconnect());
