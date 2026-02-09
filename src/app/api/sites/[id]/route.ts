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