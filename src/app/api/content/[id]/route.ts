import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/content/[id] - get single content
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const content = await prisma.content.findUnique({
      where: { id },
      include: {
        project: { select: { id: true, name: true } },
        task: { select: { id: true, title: true, status: true } },
      },
    })
    
    if (!content) {
      return NextResponse.json(
        { error: 'Content not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(content)
  } catch (error) {
    console.error('Error fetching content:', error)
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    )
  }
}

// PATCH /api/content/[id] - update content
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await request.json()
    
    // Auto-calculate word count if body is updated
    const wordCount = data.body ? data.body.trim().split(/\s+/).length : undefined

    const content = await prisma.content.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.body !== undefined && { body: data.body }),
        ...(data.type !== undefined && { type: data.type }),
        ...(data.status !== undefined && { status: data.status }),
        ...(data.author !== undefined && { author: data.author }),
        ...(data.targetSite !== undefined && { targetSite: data.targetSite }),
        ...(data.targetPath !== undefined && { targetPath: data.targetPath }),
        ...(data.projectId !== undefined && { projectId: data.projectId }),
        ...(data.feedback !== undefined && { feedback: data.feedback }),
        ...(data.needsApproval !== undefined && { needsApproval: data.needsApproval }),
        ...(data.approvalSource !== undefined && { approvalSource: data.approvalSource }),
        ...(data.linkedKeyword !== undefined && { linkedKeyword: data.linkedKeyword }),
        ...(data.linkedTaskId !== undefined && { linkedTaskId: data.linkedTaskId }),
        ...(wordCount !== undefined && { wordCount }),
      },
      include: {
        project: { select: { id: true, name: true } },
        task: { select: { id: true, title: true, status: true } },
      },
    })
    
    return NextResponse.json(content)
  } catch (error) {
    console.error('Error updating content:', error)
    return NextResponse.json(
      { error: 'Failed to update content' },
      { status: 500 }
    )
  }
}

// DELETE /api/content/[id] - delete content
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    await prisma.content.delete({
      where: { id },
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting content:', error)
    return NextResponse.json(
      { error: 'Failed to delete content' },
      { status: 500 }
    )
  }
}