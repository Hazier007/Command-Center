import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PATCH /api/alerts/[id] - update alert
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await request.json()
    
    const alert = await prisma.alert.update({
      where: { id },
      data: {
        title: data.title,
        body: data.body,
        priority: data.priority,
        resolved: data.resolved,
        snoozedUntil: data.snoozedUntil ? new Date(data.snoozedUntil) : null,
      },
    })
    
    return NextResponse.json(alert)
  } catch (error) {
    console.error('Error updating alert:', error)
    return NextResponse.json(
      { error: 'Failed to update alert' },
      { status: 500 }
    )
  }
}

// DELETE /api/alerts/[id] - delete alert
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    await prisma.alert.delete({
      where: { id },
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting alert:', error)
    return NextResponse.json(
      { error: 'Failed to delete alert' },
      { status: 500 }
    )
  }
}