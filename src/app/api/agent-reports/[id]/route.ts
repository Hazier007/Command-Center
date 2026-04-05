import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/agent-reports/[id]
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const report = await prisma.agentReport.findUnique({ where: { id } })

    if (!report) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 })
    }

    return NextResponse.json(report)
  } catch (error) {
    console.error('Error fetching report:', error)
    return NextResponse.json({ error: 'Failed to fetch report' }, { status: 500 })
  }
}

// PATCH /api/agent-reports/[id]
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await request.json()

    const report = await prisma.agentReport.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.summary !== undefined && { summary: data.summary }),
        ...(data.body !== undefined && { body: data.body }),
        ...(data.status !== undefined && { status: data.status }),
        ...(data.outcome !== undefined && { outcome: data.outcome }),
        ...(data.priority !== undefined && { priority: data.priority }),
        ...(data.category !== undefined && { category: data.category }),
        ...(data.needsApproval !== undefined && { needsApproval: data.needsApproval }),
        ...(data.approvalReason !== undefined && { approvalReason: data.approvalReason }),
        ...(data.metadata !== undefined && { metadata: data.metadata }),
        ...(data.environment !== undefined && { environment: data.environment }),
        ...(data.repo !== undefined && { repo: data.repo }),
        ...(data.branch !== undefined && { branch: data.branch }),
        ...(data.linkedTaskId !== undefined && { linkedTaskId: data.linkedTaskId }),
        ...(data.linkedSiteId !== undefined && { linkedSiteId: data.linkedSiteId }),
        ...(data.linkedSprintId !== undefined && { linkedSprintId: data.linkedSprintId }),
        ...(data.completedAt !== undefined && { completedAt: data.completedAt ? new Date(data.completedAt) : null }),
      },
    })

    return NextResponse.json(report)
  } catch (error) {
    console.error('Error updating report:', error)
    return NextResponse.json({ error: 'Failed to update report' }, { status: 500 })
  }
}

// DELETE /api/agent-reports/[id]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.agentReport.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting report:', error)
    return NextResponse.json({ error: 'Failed to delete report' }, { status: 500 })
  }
}
