import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/sites/[id] - get single site with relations
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const site = await prisma.site.findUnique({
      where: { id },
      include: {
        project: true,
      },
    })

    if (!site) {
      return NextResponse.json(
        { error: 'Site not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(site)
  } catch (error) {
    console.error('Error fetching site:', error)
    return NextResponse.json(
      { error: 'Failed to fetch site' },
      { status: 500 }
    )
  }
}

// PATCH /api/sites/[id] - update site
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await request.json()
    
    // Fetch current site to compare status change
    const currentSite = await prisma.site.findUnique({ where: { id } })

    const site = await prisma.site.update({
      where: { id },
      data: {
        domain: data.domain,
        projectId: data.projectId,
        category: data.category,
        status: data.status,
        techStack: data.techStack || [],
        revenue: data.revenue,
        listings: data.listings,
        pages: data.pages,
        notes: data.notes,
        ...(data.lastContentDate !== undefined && { lastContentDate: data.lastContentDate ? new Date(data.lastContentDate) : null }),
        ...(data.monthlyRevenue !== undefined && { monthlyRevenue: data.monthlyRevenue }),
        ...(data.seoStatus !== undefined && { seoStatus: data.seoStatus }),
        ...(data.nextAction !== undefined && { nextAction: data.nextAction }),
        ...(data.hosting !== undefined && { hosting: data.hosting }),
        ...(data.revenueType !== undefined && { revenueType: data.revenueType }),
        ...(data.lastRevenueUpdate !== undefined && { lastRevenueUpdate: data.lastRevenueUpdate ? new Date(data.lastRevenueUpdate) : null }),
        ...(data.deployUrl !== undefined && { deployUrl: data.deployUrl }),
        ...(data.productionUrl !== undefined && { productionUrl: data.productionUrl }),
        ...(data.lastDeployAt !== undefined && { lastDeployAt: data.lastDeployAt ? new Date(data.lastDeployAt) : null }),
        ...(data.deployStatus !== undefined && { deployStatus: data.deployStatus }),
        ...(data.vercelProjectId !== undefined && { vercelProjectId: data.vercelProjectId }),
        ...(data.githubRepo !== undefined && { githubRepo: data.githubRepo }),
        ...(data.defaultBranch !== undefined && { defaultBranch: data.defaultBranch }),
        ...(data.lastCommitAt !== undefined && { lastCommitAt: data.lastCommitAt ? new Date(data.lastCommitAt) : null }),
        ...(data.buildStatus !== undefined && { buildStatus: data.buildStatus }),
        ...(data.lastBuildAt !== undefined && { lastBuildAt: data.lastBuildAt ? new Date(data.lastBuildAt) : null }),
        ...(data.lighthouse !== undefined && { lighthouse: data.lighthouse }),
        ...(data.devPhase !== undefined && { devPhase: data.devPhase }),
        // RADAR fields
        ...(data.seoScore !== undefined && { seoScore: data.seoScore }),
        ...(data.lastSeoAudit !== undefined && { lastSeoAudit: data.lastSeoAudit ? new Date(data.lastSeoAudit) : null }),
        ...(data.topKeyword !== undefined && { topKeyword: data.topKeyword }),
        ...(data.topPosition !== undefined && { topPosition: data.topPosition }),
        ...(data.monthlyTraffic !== undefined && { monthlyTraffic: data.monthlyTraffic }),
        ...(data.indexedPages !== undefined && { indexedPages: data.indexedPages }),
        ...(data.domainAuthority !== undefined && { domainAuthority: data.domainAuthority }),
        ...(data.expirationDate !== undefined && { expirationDate: data.expirationDate ? new Date(data.expirationDate) : null }),
        ...(data.registrar !== undefined && { registrar: data.registrar }),
        // Client / contract fields
        ...(data.ownerType !== undefined && { ownerType: data.ownerType }),
        ...(data.clientName !== undefined && { clientName: data.clientName }),
        ...(data.clientEmail !== undefined && { clientEmail: data.clientEmail }),
        ...(data.contractType !== undefined && { contractType: data.contractType }),
        ...(data.monthlyFee !== undefined && { monthlyFee: data.monthlyFee }),
        ...(data.hoursPerMonth !== undefined && { hoursPerMonth: data.hoursPerMonth }),
        ...(data.contractStart !== undefined && { contractStart: data.contractStart ? new Date(data.contractStart) : null }),
        ...(data.contractEnd !== undefined && { contractEnd: data.contractEnd ? new Date(data.contractEnd) : null }),
        // v2: eerste-klas Client relatie
        // @ts-ignore – clientId veld (schema v2, na db:push beschikbaar)
        ...(data.clientId !== undefined && { clientId: data.clientId || null }),
      },
      include: {
        project: true,
      },
    })
    
    // Sync legacy client-velden vanuit gekoppelde Client record
    // @ts-ignore – clientId veld (schema v2, na db:push beschikbaar)
    if (data.clientId) {
      try {
        // @ts-ignore – Client model (schema v2, na db:push beschikbaar)
        const client = await prisma.client.findUnique({
          where: { id: data.clientId },
        })
        if (client) {
          await prisma.site.update({
            where: { id: site.id },
            data: {
              clientName: client.name,
              clientEmail: client.email,
              contractType: client.contractType,
              contractStart: client.contractStart,
              contractEnd: client.contractEnd,
            },
          })
        }
      } catch {
        // Client model nog niet beschikbaar — negeer stil
      }
    }

    // ── Site onboarding guard: alert als dev/live zonder deploy velden ──
    const activeStatuses = ['dev', 'staging', 'live']
    const newStatus = data.status || site.status
    const wasInactive = currentSite && !activeStatuses.includes(currentSite.status)
    const isNowActive = activeStatuses.includes(newStatus)

    if ((wasInactive && isNowActive) || data.status === 'live') {
      const missing: string[] = []
      if (!site.githubRepo && !data.githubRepo) missing.push('githubRepo')
      if (!site.vercelProjectId && !data.vercelProjectId) missing.push('vercelProjectId')
      if (!site.productionUrl && !data.productionUrl) missing.push('productionUrl')

      if (missing.length > 0) {
        await prisma.alert.create({
          data: {
            title: `Site onboarding incompleet: ${site.domain}`,
            body: `${site.domain} is nu "${newStatus}" maar mist: ${missing.join(', ')}. Vraag FORGE om deze velden in te vullen.`,
            priority: newStatus === 'live' ? 'high' : 'medium',
          },
        })
      }
    }

    return NextResponse.json(site)
  } catch (error) {
    console.error('Error updating site:', error)
    return NextResponse.json(
      { error: 'Failed to update site' },
      { status: 500 }
    )
  }
}

// DELETE /api/sites/[id] - delete site
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    await prisma.site.delete({
      where: { id },
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting site:', error)
    return NextResponse.json(
      { error: 'Failed to delete site' },
      { status: 500 }
    )
  }
}