import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// DELETE /api/kpis/[id]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.kPI.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting KPI:', error)
    return NextResponse.json({ error: 'Failed to delete KPI' }, { status: 500 })
  }
}
