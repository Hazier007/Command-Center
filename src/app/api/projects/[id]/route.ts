import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PATCH /api/projects/[id] - update project
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await request.json()
    
    const project = await prisma.project.update({
      where: { id },
      data: {
        name: data.name,
        status: data.status,
        phase: data.phase,
        category: data.category,
        description: data.description,
        revenue: data.revenue,
      },
      include: {
        sites: true,
        tasks: true,
        nowItems: true,
      },
    })
    
    return NextResponse.json(project)
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    )
  }
}

// DELETE /api/projects/[id] - delete project
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    await prisma.project.delete({
      where: { id },
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}