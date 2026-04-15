import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * POST /api/clients/backfill
 *
 * Eenmalige (maar idempotente) migratie die alle bestaande sites met
 * ownerType='client' en een clientName omzet naar échte Client records.
 *
 * Flow:
 *  1. Pak alle unieke (lowercased) clientNames van Site waar clientId = null.
 *  2. Voor elke unieke naam:
 *     a. Vind een bestaand Client record met zelfde (case-insensitive) naam.
 *     b. Maak anders een nieuw Client record aan — seed met contract-velden
 *        van de "rijkste" site (meest fee).
 *  3. Update alle sites van die naam: zet clientId op het gevonden/gemaakte id.
 *
 * Vereist: `npm run db:push` is al gerund zodat Client tabel bestaat.
 * Antwoord: { created, linked, skipped, clients: [...] }
 */
export async function POST(_request: NextRequest) {
  try {
    // Stap 1: alle client-sites die nog geen clientId hebben
    const sites = await prisma.site.findMany({
      where: {
        ownerType: 'client',
        // @ts-ignore – clientId veld (schema v2, na db:push beschikbaar)
        clientId: null,
      },
    })

    // Groepeer op lowercased clientName
    const keyFor = (n: string | null | undefined) =>
      (n || '').trim().toLowerCase()

    const groups = new Map<
      string,
      { displayName: string; sites: typeof sites }
    >()
    for (const s of sites) {
      const k = keyFor(s.clientName)
      if (!k) continue
      const g = groups.get(k)
      if (g) {
        g.sites.push(s)
      } else {
        groups.set(k, { displayName: s.clientName || '', sites: [s] })
      }
    }

    let created = 0
    let linked = 0
    let skipped = 0
    const clientSummary: Array<{
      id: string
      name: string
      sitesLinked: number
      wasCreated: boolean
    }> = []

    for (const [key, { displayName, sites: groupSites }] of groups) {
      // Heeft al een Client record met zelfde naam?
      // @ts-ignore – Client model (schema v2, na db:push beschikbaar)
      const existingList = await prisma.client.findMany({
        where: {
          name: { equals: displayName, mode: 'insensitive' },
        },
      })
      let client = existingList[0]

      // "Rijkste" site (voor seed)
      const seed = [...groupSites].sort(
        (a, b) => (b.monthlyFee || 0) - (a.monthlyFee || 0)
      )[0]

      if (!client) {
        // @ts-ignore – Client model (schema v2, na db:push beschikbaar)
        client = await prisma.client.create({
          data: {
            name: displayName || key,
            email: seed.clientEmail || null,
            contractType: seed.contractType || null,
            contractStart: seed.contractStart || null,
            contractEnd: seed.contractEnd || null,
            status: 'active',
          },
        })
        created++
      } else {
        skipped++
      }

      // Link alle sites in deze groep
      const ids = groupSites.map((s) => s.id)
      const res = await prisma.site.updateMany({
        where: { id: { in: ids } },
        // @ts-ignore – clientId veld (schema v2, na db:push beschikbaar)
        data: { clientId: client.id },
      })
      linked += res.count

      clientSummary.push({
        id: client.id,
        name: client.name,
        sitesLinked: res.count,
        wasCreated: !client.createdAt || created > 0,
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
 * GET /api/clients/backfill – preview, zonder wijzigingen.
 * Laat zien welke groepen er zouden ontstaan.
 */
export async function GET() {
  try {
    const sites = await prisma.site.findMany({
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
    })

    const keyFor = (n: string | null | undefined) =>
      (n || '').trim().toLowerCase()

    const groups = new Map<
      string,
      { name: string; sites: typeof sites; totalFee: number }
    >()
    for (const s of sites) {
      const k = keyFor(s.clientName)
      if (!k) continue
      const g = groups.get(k) ?? {
        name: s.clientName || '',
        sites: [],
        totalFee: 0,
      }
      g.sites.push(s)
      g.totalFee += s.monthlyFee || 0
      groups.set(k, g)
    }

    return NextResponse.json({
      totalUnlinkedSites: sites.length,
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
