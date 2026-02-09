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
        status: data.status,
        techStack: data.techStack || [],
        revenue: data.revenue,
        listings: data.listings,
        pages: data.pages,
        notes: data.notes,
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