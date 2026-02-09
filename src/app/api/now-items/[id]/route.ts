import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PATCH /api/now-items/[id] - update now item
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await request.json()
    
    const nowItem = await prisma.nowItem.update({
      where: { id },
      data: {
        title: data.title,
        meta: data.meta,
        tag: data.tag,
        description: data.description,
        projectId: data.projectId,
      },
      include: {
        project: true,
      },
    })
    
    return NextResponse.json(nowItem)
  } catch (error) {
    console.error('Error updating now item:', error)
    return NextResponse.json(
      { error: 'Failed to update now item' },
      { status: 500 }
    )
  }
}

// DELETE /api/now-items/[id] - delete now item
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    await prisma.nowItem.delete({
      where: { id },
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting now item:', error)
    return NextResponse.json(
      { error: 'Failed to delete now item' },
      { status: 500 }
    )
  }
}