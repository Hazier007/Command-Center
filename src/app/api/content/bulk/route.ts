import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PATCH /api/content/bulk — batch update content items (e.g. approve multiple)
export async function PATCH(request: NextRequest) {
  try {
    const { ids, status, feedback, needsApproval } = await request.json()

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'Missing required field: ids (array)' }, { status: 400 })
    }

    const data: Record<string, unknown> = {}
    if (status !== undefined) data.status = status
    if (feedback !== undefined) data.feedback = feedback
    if (needsApproval !== undefined) data.needsApproval = needsApproval

    const result = await prisma.content.updateMany({
      where: { id: { in: ids } },
      data,
    })

    return NextResponse.json({
      success: true,
      updated: result.count,
      message: `${result.count} content items updated`,
    })
  } catch (error) {
    console.error('Error bulk updating content:', error)
    return NextResponse.json({ error: 'Failed to bulk update content' }, { status: 500 })
  }
}
