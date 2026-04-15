import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * POST /api/clients/backfill
 *
 * Eenmalige (maar idempotente) migratie die alle bestaande sites + projects
 * met ownerType='client' omzet naar échte Client records.
 *
 * Flow:
 *  1. Scan alle client-sites zonder clientId + alle client-projects.
 *  2. Groepeer per lowercased clientName.
 *  3. Per unieke naam:
 *     a. Vind bestaand Client record (case-insensitive).
 *     b. Maak anders nieuw record aan — seed uit de "rijkste" site of project.
 *  4. Link alle sites van die groep via Site.clientId.
 *     Projects hebben (nog) geen clientId FK; ze blijven via clientName
 *     matchen in /api/clients totdat we Project.clientId toevoegen.
 *
 * Vereist: `npm run db:push` is al gerund.
 * Antwoord: { created, linked, skipped, clients: [...] }
 */
export async function POST(_request: NextRequest) {
  try {
    const [sites, projects] = await Promise.all([
      prisma.site.findMany({
        where: {
          ownerType: 'client',
          // @ts-ignore – clientId veld (schema v2, na db:push beschikbaar)
          clientId: null,
        },
      }),
      prisma.project.findMany({
        where: { ownerType: 'client' },
      }),
    ])

    const keyFor = (n: string | null | undefined) =>
      (n || '').trim().toLowerCase()

    type SiteRow = (typeof sites)[number]
    type ProjectRow = (typeof projects)[number]

    const groups = new Map<
      string,
      {
        displayName: string
        sites: SiteRow[]
        projects: ProjectRow[]
      }
    >()

    for (const s of sites) {
      const k = keyFor(s.clientName)
      if (!k) continue
      const g = groups.get(k)
      if (g) g.sites.push(s)
      else
        groups.set(k, {
          displayName: s.clientName || '',
          sites: [s],
          projects: [],
        })
    }

    for (const p of projects) {
      const k = keyFor(p.clientName)
      if (!k) continue
      const g = groups.get(k)
      if (g) g.projects.push(p)
      else
        groups.set(k, {
          displayName: p.clientName || '',
          sites: [],
          projects: [p],
        })
    }

    let created = 0
    let linked = 0
    let skipped = 0
    const clientSummary: Array<{
      id: string
      name: string
      sitesLinked: number
      projectsMatched: number
      wasCreated: boolean
    }> = []

    for (const [key, { displayName, sites: groupSites, projects: groupProjects }] of groups) {
      // @ts-ignore – Client model (schema v2, na db:push beschikbaar)
      const existingList = await prisma.client.findMany({
        where: {
          name: { equals: displayName, mode: 'insensitive' },
        },
      })
      let client = existingList[0]
      let wasCreated = false

      if (!client) {
        // Seed uit "rijkste" bron — site bij voorkeur, anders project
        const seedSite = [...groupSites].sort(
          (a, b) => (b.monthlyFee || 0) - (a.monthlyFee || 0)
        )[0]
        const seedProject = [...groupProjects].sort(
          (a, b) => (b.monthlyFee || 0) - (a.monthlyFee || 0)
        )[0]
        const seedEmail = seedSite?.clientEmail || seedProject?.clientEmail || null
        const seedContractType =
          seedSite?.contractType || seedProject?.contractType || null
        const seedContractStart =
          seedSite?.contractStart || seedProject?.contractStart || null
        const seedContractEnd =
          seedSite?.contractEnd || seedProject?.contractEnd || null
        const seedPaymentStatus = seedProject?.paymentStatus || null
        const seedAutoRenew = seedProject?.autoRenew === true

        // @ts-ignore – Client model (schema v2, na db:push beschikbaar)
        client = await prisma.client.create({
          data: {
            name: displayName || key,
            email: seedEmail,
            contractType: seedContractType,
            contractStart: seedContractStart,
            contractEnd: seedContractEnd,
            paymentStatus: seedPaymentStatus,
            autoRenew: seedAutoRenew,
            status: 'active',
          },
        })
        created++
        wasCreated = true
      } else {
        skipped++
      }

      // Link sites (projects hebben nog geen clientId FK)
      let linkedCount = 0
      if (groupSites.length > 0) {
        const ids = groupSites.map((s) => s.id)
        const res = await prisma.site.updateMany({
          where: { id: { in: ids } },
          // @ts-ignore – clientId veld (schema v2, na db:push beschikbaar)
          data: { clientId: client.id },
        })
        linkedCount = res.count
        linked += res.count
      }

      clientSummary.push({
        id: client.id,
        name: client.name,
        sitesLinked: linkedCount,
        projectsMatched: groupProjects.length,
        wasCreated,
      })
    }

    return NextResponse.json({
      success: true,
      created,
      linked,
      skipped,
      clients: clientSummary,
    })
  } catch (error) {
    console.error('Backfill error:', error)
    const message =
      error instanceof Error && error.message.includes('does not exist')
        ? 'Client model nog niet gemigreerd. Run `npm run db:push` eerst.'
        : 'Backfill failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

/**
 * GET /api/clients/backfill – preview zonder wijzigingen.
 */
export async function GET() {
  try {
    const [sites, projects] = await Promise.all([
      prisma.site.findMany({
        where: {
          ownerType: 'client',
          // @ts-ignore – clientId veld (schema v2, na db:push beschikbaar)
          clientId: null,
        },
        select: {
          id: true,
          domain: true,
          clientName: true,
          monthlyFee: true,
        },
      }),
      prisma.project.findMany({
        where: { ownerType: 'client' },
        select: {
          id: true,
          name: true,
          clientName: true,
          monthlyFee: true,
        },
      }),
    ])

    const keyFor = (n: string | null | undefined) =>
      (n || '').trim().toLowerCase()

    type Group = {
      name: string
      sites: typeof sites
      projects: typeof projects
      totalFee: number
    }
    const groups = new Map<string, Group>()

    const ensure = (k: string, name: string): Group => {
      let g = groups.get(k)
      if (!g) {
        g = { name, sites: [], projects: [], totalFee: 0 }
        groups.set(k, g)
      }
      return g
    }

    for (const s of sites) {
      const k = keyFor(s.clientName)
      if (!k) continue
      const g = ensure(k, s.clientName || '')
      g.sites.push(s)
      g.totalFee += s.monthlyFee || 0
    }
    for (const p of projects) {
      const k = keyFor(p.clientName)
      if (!k) continue
      const g = ensure(k, p.clientName || '')
      g.projects.push(p)
      g.totalFee += p.monthlyFee || 0
    }

    return NextResponse.json({
      totalUnlinkedSites: sites.length,
      totalClientProjects: projects.length,
      uniqueClients: groups.size,
      groups: Array.from(groups.values()).sort(
        (a, b) => b.totalFee - a.totalFee
      ),
    })
  } catch (error) {
    console.error('Backfill preview error:', error)
    return NextResponse.json(
      { error: 'Preview failed' },
      { status: 500 }
    )
  }
}
