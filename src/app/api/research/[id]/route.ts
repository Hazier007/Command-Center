import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/research/[id] - get single research item
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const research = await prisma.research.findUnique({
      where: { id },
      include: {
        project: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
    
    if (!research) {
      return NextResponse.json(
        { error: 'Research not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(research)
  } catch (error) {
    console.error('Error fetching research:', error)
    return NextResponse.json(
      { error: 'Failed to fetch research' },
      { status: 500 }
    )
  }
}

// PATCH /api/research/[id] - update research item
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await request.json()
    
    const research = await prisma.research.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.body !== undefined && { body: data.body }),
        ...(data.type !== undefined && { type: data.type }),
        ...(data.author !== undefined && { author: data.author }),
        ...(data.projectId !== undefined && { projectId: data.projectId }),
        ...(data.tags !== undefined && { tags: data.tags }),
        ...(data.status !== undefined && { status: data.status }),
        ...(data.summary !== undefined && { summary: data.summary }),
        ...(data.linkedSiteId !== undefined && { linkedSiteId: data.linkedSiteId }),
        ...(data.linkedDomainId !== undefined && { linkedDomainId: data.linkedDomainId }),
        ...(data.linkedIdeaId !== undefined && { linkedIdeaId: data.linkedIdeaId }),
        ...(data.linkedTaskId !== undefined && { linkedTaskId: data.linkedTaskId }),
      },
      include: {
        project: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
    
    return NextResponse.json(research)
  } catch (error) {
    console.error('Error updating research:', error)
    return NextResponse.json(
      { error: 'Failed to update research' },
      { status: 500 }
    )
  }
}

// DELETE /api/research/[id] - delete research item
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    await prisma.research.delete({
      where: { id },
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting research:', error)
    return NextResponse.json(
      { error: 'Failed to delete research' },
      { status: 500 }
    )
  }
}