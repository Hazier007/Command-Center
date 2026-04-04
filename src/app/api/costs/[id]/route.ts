import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PATCH /api/costs/[id] - update cost
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await request.json()
    
    const cost = await prisma.cost.update({
      where: { id },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.amount !== undefined && { amount: data.amount }),
        ...(data.category !== undefined && { category: data.category }),
        ...(data.recurring !== undefined && { recurring: data.recurring }),
        ...(data.notes !== undefined && { notes: data.notes }),
        ...(data.billingCycle !== undefined && { billingCycle: data.billingCycle }),
        ...(data.projectId !== undefined && { projectId: data.projectId }),
        ...(data.billingDay !== undefined && { billingDay: data.billingDay }),
        ...(data.billingDate !== undefined && { billingDate: data.billingDate ? new Date(data.billingDate) : null }),
      },
    })
    
    return NextResponse.json(cost)
  } catch (error) {
    console.error('Error updating cost:', error)
    return NextResponse.json(
      { error: 'Failed to update cost' },
      { status: 500 }
    )
  }
}

// DELETE /api/costs/[id] - delete cost
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    await prisma.cost.delete({
      where: { id },
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting cost:', error)
    return NextResponse.json(
      { error: 'Failed to delete cost' },
      { status: 500 }
    )
  }
}