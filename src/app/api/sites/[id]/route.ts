import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PATCH /api/sites/[id] - update site
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await request.json()
    
    const site = await prisma.site.update({
      where: { id },
      data: {
        domain: data.domain,
        projectId: data.projectId,
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
      },
      include: {
        project: true,
      },
    })
    
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