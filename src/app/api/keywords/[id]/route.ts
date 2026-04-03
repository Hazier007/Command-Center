import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// DELETE /api/keywords/[id]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.keywordHistory.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting keyword entry:', error)
    return NextResponse.json(
      { error: 'Failed to delete keyword entry' },
      { status: 500 }
    )
  }
}
