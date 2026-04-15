import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * GET /api/clients
 *
 * v2 (2026-04-15): eerste-klas Client model met graceful fallback.
 *
 * Strategie:
 *  1. Probeer echte Client records te lezen (met linked sites via Site.clientId).
 *  2. Merge met legacy-aggregatie: sites/projects met ownerType='client' + clientName
 *     maar zonder clientId, groeperen op lowercased clientName zoals v1.
 *     → Zo blijft alles werken vóór backfill en tijdens de overgang.
 *
 * Elke entry krijgt een `id` veld:
 *   - echte Client records: de cuid (string)
 *   - legacy-aggregaten: `legacy:<keyFor(name)>` prefix zodat UI ze kan herkennen
 *
 * Als de Client-tabel nog niet bestaat (db:push nog niet gerund),
 * valt de route terug op pure v1-aggregatie zonder te crashen.
 */

type ClientSite = {
  id: string
  domain: string
  status: string
  monthlyRevenue: number | null
  monthlyFee: number | null
  hoursPerMonth: number | null
  monthlyTraffic: number | null
  seoScore: number | null
  topKeyword: string | null
  topPosition: number | null
}

type ClientProject = {
  id: string
  name: string
  status: string
  monthlyFee: number | null
}

type ClientRecord = {
  id: string
  isLegacy: boolean
  name: string
  email: string | null
  phone: string | null
  company: string | null
  vatNumber: string | null
  address: string | null
  notes: string | null
  contractType: string | null
  contractStart: Date | null
  contractEnd: Date | null
  autoRenew: boolean
  paymentStatus: string | null
  businessUnit: string | null
  status: string
  monthlyFee: number
  hoursPerMonth: number
  nextInvoiceDate: Date | null
  lastInvoiceDate: Date | null
  sites: ClientSite[]
  projects: ClientProject[]
  openTasksCount: number
}

const keyFor = (name: string | null | undefined) =>
  (name || '').trim().toLowerCase()

const mapSite = (s: {
  id: string
  domain: string
  status: string
  monthlyRevenue: number | null
  monthlyFee: number | null
  hoursPerMonth: number | null
  monthlyTraffic: number | null
  seoScore: number | null
  topKeyword: string | null
  topPosition: number | null
}): ClientSite => ({
  id: s.id,
  domain: s.domain,
  status: s.status,
  monthlyRevenue: s.monthlyRevenue ?? null,
  monthlyFee: s.monthlyFee ?? null,
  hoursPerMonth: s.hoursPerMonth ?? null,
  monthlyTraffic: s.monthlyTraffic ?? null,
  seoScore: s.seoScore ?? null,
  topKeyword: s.topKeyword ?? null,
  topPosition: s.topPosition ?? null,
})

export async function GET() {
  try {
    // ── Stap 1: probeer echte Client records + hun gekoppelde sites ──
    let realClients: Array<{
      id: string
      name: string
      email: string | null
      phone: string | null
      company: string | null
      vatNumber: string | null
      address: string | null
      notes: string | null
      contractType: string | null
      contractStart: Date | null
      contractEnd: Date | null
      autoRenew: boolean
      paymentStatus: string | null
      businessUnit: string | null
      status: string
      sites: Array<Parameters<typeof mapSite>[0]>
    }> = []
    let clientModelAvailable = true
    try {
      // @ts-ignore – Client model (schema v2, na db:push beschikbaar)
      realClients = await prisma.client.findMany({
        include: {
          sites: {
            select: {
              id: true,
              domain: true,
              status: true,
              monthlyRevenue: true,
              monthlyFee: true,
              hoursPerMonth: true,
              monthlyTraffic: true,
              seoScore: true,
              topKeyword: true,
              topPosition: true,
            },
          },
        },
      })
    } catch {
      clientModelAvailable = false
    }

    // ── Stap 2: legacy aggregaten voor sites/projects zonder clientId ──
    const [legacySites, projects, tasks] = await Promise.all([
      prisma.site.findMany({
        where: {
          ownerType: 'client',
          // Alleen sites die NIET aan een Client record zijn gelinkt
          // @ts-ignore – clientId veld (schema v2, na db:push beschikbaar)
          clientId: null,
        },
      }).catch(() =>
        // Fallback als clientId-veld nog niet bestaat: alle client-sites
        prisma.site.findMany({ where: { ownerType: 'client' } })
      ),
      prisma.project.findMany({ where: { ownerType: 'client' } }),
      prisma.task.findMany({ where: { status: { not: 'done' } } }),
    ])

    const byKey = new Map<string, ClientRecord>()

    // Seed met echte Client records
    for (const c of realClients) {
      const totalMonthlyFee = c.sites.reduce(
        (sum, s) => sum + (s.monthlyFee || 0),
        0
      )
      const totalHours = c.sites.reduce(
        (sum, s) => sum + (s.hoursPerMonth || 0),
        0
      )
      const record: ClientRecord = {
        id: c.id,
        isLegacy: false,
        name: c.name,
        email: c.email,
        phone: c.phone,
        company: c.company,
        vatNumber: c.vatNumber,
        address: c.address,
        notes: c.notes,
        contractType: c.contractType,
        contractStart: c.contractStart,
        contractEnd: c.contractEnd,
        autoRenew: c.autoRenew,
        paymentStatus: c.paymentStatus,
        businessUnit: c.businessUnit,
        status: c.status,
        monthlyFee: totalMonthlyFee,
        hoursPerMonth: totalHours,
        nextInvoiceDate: null,
        lastInvoiceDate: null,
        sites: c.sites.map(mapSite),
        projects: [],
        openTasksCount: 0,
      }
      byKey.set(`real:${c.id}`, record)
      // Ook per name-key zodat project-aggregatie hieraan kan koppelen
      const nameKey = keyFor(c.name)
      if (nameKey && !byKey.has(`name:${nameKey}`)) {
        byKey.set(`name:${nameKey}`, record)
      }
    }

    // Voeg legacy sites toe (aggregatie op clientName)
    for (const s of legacySites) {
      const key = keyFor(s.clientName)
      if (!key) continue
      const nameKey = `name:${key}`
      let existing = byKey.get(nameKey)
      if (!existing) {
        existing = {
          id: `legacy:${key}`,
          isLegacy: true,
          name: s.clientName || '',
          email: s.clientEmail || null,
          phone: null,
          company: null,
          vatNumber: null,
          address: null,
          notes: null,
          contractType: s.contractType || null,
          contractStart: s.contractStart || null,
          contractEnd: s.contractEnd || null,
          autoRenew: false,
          paymentStatus: null,
          businessUnit: null,
          status: 'active',
          monthlyFee: 0,
          hoursPerMonth: 0,
          nextInvoiceDate: null,
          lastInvoiceDate: null,
          sites: [],
          projects: [],
          openTasksCount: 0,
        }
        byKey.set(nameKey, existing)
        byKey.set(existing.id, existing)
      }
      existing.monthlyFee += s.monthlyFee || 0
      existing.hoursPerMonth += s.hoursPerMonth || 0
      if (!existing.email && s.clientEmail) existing.email = s.clientEmail
      if (!existing.contractType && s.contractType)
        existing.contractType = s.contractType
      existing.sites.push(mapSite(s))
    }

    // Overlay project data (op name-key)
    for (const p of projects) {
      const key = keyFor(p.clientName)
      if (!key) continue
      const nameKey = `name:${key}`
      let existing = byKey.get(nameKey)
      if (!existing) {
        existing = {
          id: `legacy:${key}`,
          isLegacy: true,
          name: p.clientName || '',
          email: p.clientEmail || null,
          phone: null,
          company: null,
          vatNumber: null,
          address: null,
          notes: null,
          contractType: p.contractType || null,
          contractStart: p.contractStart || null,
          contractEnd: p.contractEnd || null,
          autoRenew: p.autoRenew || false,
          paymentStatus: p.paymentStatus || null,
          businessUnit: null,
          status: 'active',
          monthlyFee: 0,
          hoursPerMonth: 0,
          nextInvoiceDate: p.nextInvoiceDate || null,
          lastInvoiceDate: p.lastInvoiceDate || null,
          sites: [],
          projects: [],
          openTasksCount: 0,
        }
        byKey.set(nameKey, existing)
        byKey.set(existing.id, existing)
      }
      if (!existing.email && p.clientEmail) existing.email = p.clientEmail
      if (!existing.contractType && p.contractType)
        existing.contractType = p.contractType
      if (!existing.paymentStatus && p.paymentStatus)
        existing.paymentStatus = p.paymentStatus
      if (!existing.nextInvoiceDate && p.nextInvoiceDate)
        existing.nextInvoiceDate = p.nextInvoiceDate
      if (!existing.lastInvoiceDate && p.lastInvoiceDate)
        existing.lastInvoiceDate = p.lastInvoiceDate
      if (p.autoRenew) existing.autoRenew = true
      existing.monthlyFee += p.monthlyFee || 0
      existing.hoursPerMonth += p.hoursPerMonth || 0
      existing.projects.push({
        id: p.id,
        name: p.name,
        status: p.status,
        monthlyFee: p.monthlyFee ?? null,
      })
    }

    // Unieke records (filter dubbele keys eruit — een record kan meerdere
    // keys hebben (real:id, name:X, legacy:X))
    const seen = new Set<string>()
    const result: ClientRecord[] = []
    for (const rec of byKey.values()) {
      if (seen.has(rec.id)) continue
      seen.add(rec.id)

      // Open tasks per client (via gelinkte site ids)
      const siteIds = new Set(rec.sites.map((s) => s.id))
      rec.openTasksCount = tasks.filter(
        (t) => t.siteId && siteIds.has(t.siteId)
      ).length

      result.push(rec)
    }

    // Sorteer: echte records eerst (status active), daarna op MRR desc
    result.sort((a, b) => {
      if (a.isLegacy !== b.isLegacy) return a.isLegacy ? 1 : -1
      return b.monthlyFee - a.monthlyFee
    })

    return NextResponse.json(result, {
      headers: {
        'x-client-model-available': clientModelAvailable ? '1' : '0',
      },
    })
  } catch (error) {
    console.error('Error fetching clients:', error)
    return NextResponse.json(
      { error: 'Failed to fetch clients' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/clients
 * Maakt een nieuwe Client record aan. Vereist db:push.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      phone,
      company,
      vatNumber,
      address,
      notes,
      contractType,
      contractStart,
      contractEnd,
      autoRenew,
      paymentStatus,
      businessUnit,
      status,
    } = body

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json(
        { error: 'name is required' },
        { status: 400 }
      )
    }

    // @ts-ignore – Client model (schema v2, na db:push beschikbaar)
    const created = await prisma.client.create({
      data: {
        name: name.trim(),
        email: email || null,
        phone: phone || null,
        company: company || null,
        vatNumber: vatNumber || null,
        address: address || null,
        notes: notes || null,
        contractType: contractType || null,
        contractStart: contractStart ? new Date(contractStart) : null,
        contractEnd: contractEnd ? new Date(contractEnd) : null,
        autoRenew: autoRenew === true,
        paymentStatus: paymentStatus || null,
        businessUnit: businessUnit || null,
        status: status || 'active',
      },
    })

    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    console.error('Error creating client:', error)
    const message =
      error instanceof Error && error.message.includes('does not exist')
        ? 'Client model nog niet gemigreerd. Run `npm run db:push` eerst.'
        : 'Failed to create client'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
