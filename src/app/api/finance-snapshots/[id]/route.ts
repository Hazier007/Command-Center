import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// DELETE /api/finance-snapshots/[id]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.financeSnapshot.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting finance snapshot:', error)
    return NextResponse.json({ error: 'Failed to delete finance snapshot' }, { status: 500 })
  }
}
