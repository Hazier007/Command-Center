import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')?.trim()

  if (!q || q.length < 2) {
    return NextResponse.json([])
  }

  const searchTerm = q.toLowerCase()

  // Search all models in parallel
  const [projects, sites, tasks, content, ideas, notes, domains] = await Promise.all([
    prisma.project.findMany({
      where: { name: { contains: searchTerm, mode: 'insensitive' } },
      take: 5,
      select: { id: true, name: true, status: true },
    }),
    prisma.site.findMany({
      where: { domain: { contains: searchTerm, mode: 'insensitive' } },
      take: 5,
      select: { id: true, domain: true, status: true },
    }),
    prisma.task.findMany({
      where: { title: { contains: searchTerm, mode: 'insensitive' } },
      take: 5,
      select: { id: true, title: true, status: true },
    }),
    prisma.content.findMany({
      where: { title: { contains: searchTerm, mode: 'insensitive' } },
      take: 5,
      select: { id: true, title: true, status: true },
    }),
    prisma.idea.findMany({
      where: { title: { contains: searchTerm, mode: 'insensitive' } },
      take: 5,
      select: { id: true, title: true, priority: true },
    }),
    prisma.note.findMany({
      where: { title: { contains: searchTerm, mode: 'insensitive' } },
      take: 5,
      select: { id: true, title: true },
    }),
    prisma.domainOpportunity.findMany({
      where: { domain: { contains: searchTerm, mode: 'insensitive' } },
      take: 5,
      select: { id: true, domain: true, status: true },
    }),
  ])

  const results = [
    ...projects.map(p => ({ id: p.id, title: p.name, type: 'project' as const, subtitle: p.status, href: `/projects` })),
    ...sites.map(s => ({ id: s.id, title: s.domain, type: 'site' as const, subtitle: s.status, href: `/sites` })),
    ...tasks.map(t => ({ id: t.id, title: t.title, type: 'task' as const, subtitle: t.status, href: `/tasks` })),
    ...content.map(c => ({ id: c.id, title: c.title, type: 'content' as const, subtitle: c.status, href: `/content` })),
    ...ideas.map(i => ({ id: i.id, title: i.title, type: 'idea' as const, subtitle: i.priority, href: `/oracle` })),
    ...notes.map(n => ({ id: n.id, title: n.title, type: 'note' as const, href: `/notes` })),
    ...domains.map(d => ({ id: d.id, title: d.domain, type: 'domain' as const, subtitle: d.status, href: `/domains` })),
  ]

  return NextResponse.json(results.slice(0, 20))
}
