import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/sites - list all sites
export async function GET() {
  try {
    const sites = await prisma.site.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        project: true,
      },
    })
    
    return NextResponse.json(sites)
  } catch (error) {
    console.error('Error fetching sites:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sites' },
      { status: 500 }
    )
  }
}

// POST /api/sites - create new site
export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    const site = await prisma.site.create({
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
        lastContentDate: data.lastContentDate ? new Date(data.lastContentDate) : undefined,
        monthlyRevenue: data.monthlyRevenue,
        revenueType: data.revenueType,
        seoStatus: data.seoStatus,
        nextAction: data.nextAction,
        hosting: data.hosting,
        // RADAR fields
        seoScore: data.seoScore,
        lastSeoAudit: data.lastSeoAudit ? new Date(data.lastSeoAudit) : undefined,
        topKeyword: data.topKeyword,
        topPosition: data.topPosition,
        monthlyTraffic: data.monthlyTraffic,
        indexedPages: data.indexedPages,
        domainAuthority: data.domainAuthority,
        expirationDate: data.expirationDate ? new Date(data.expirationDate) : undefined,
        registrar: data.registrar,
        // FORGE fields
        deployUrl: data.deployUrl,
        productionUrl: data.productionUrl,
        lastDeployAt: data.lastDeployAt ? new Date(data.lastDeployAt) : undefined,
        deployStatus: data.deployStatus,
        vercelProjectId: data.vercelProjectId,
        githubRepo: data.githubRepo,
        defaultBranch: data.defaultBranch,
        lastCommitAt: data.lastCommitAt ? new Date(data.lastCommitAt) : undefined,
        buildStatus: data.buildStatus,
        lastBuildAt: data.lastBuildAt ? new Date(data.lastBuildAt) : undefined,
        lighthouse: data.lighthouse,
        devPhase: data.devPhase,
      },
      include: {
        project: true,
      },
    })
    
    return NextResponse.json(site)
  } catch (error) {
    console.error('Error creating site:', error)
    return NextResponse.json(
      { error: 'Failed to create site' },
      { status: 500 }
    )
  }
}