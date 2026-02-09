import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PATCH /api/ideas/[id] - update idea
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await request.json()
    
    const idea = await prisma.idea.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        category: data.category,
        priority: data.priority,
      },
    })
    
    return NextResponse.json(idea)
  } catch (error) {
    console.error('Error updating idea:', error)
    return NextResponse.json(
      { error: 'Failed to update idea' },
      { status: 500 }
    )
  }
}

// DELETE /api/ideas/[id] - delete idea
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    await prisma.idea.delete({
      where: { id },
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting idea:', error)
    return NextResponse.json(
      { error: 'Failed to delete idea' },
      { status: 500 }
    )
  }
}