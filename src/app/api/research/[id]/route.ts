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
        title: data.title,
        body: data.body,
        type: data.type,
        author: data.author,
        projectId: data.projectId,
        tags: data.tags,
        status: data.status,
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