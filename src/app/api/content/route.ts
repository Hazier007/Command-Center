import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/content - list all content (supports ?author=ink&status=draft&targetSite=x filters)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const author = searchParams.get('author')
    const status = searchParams.get('status')
    const targetSite = searchParams.get('targetSite')
    const type = searchParams.get('type')

    const linkedSiteId = searchParams.get('linkedSiteId')
    const language = searchParams.get('language')
    const handoffStatus = searchParams.get('handoffStatus')
    const search = searchParams.get('search')

    const where: Record<string, unknown> = {}
    if (author) where.author = author
    if (status) where.status = status
    if (targetSite) where.targetSite = targetSite
    if (type) where.type = type
    if (linkedSiteId) where.linkedSiteId = linkedSiteId
    if (language) where.language = language
    if (handoffStatus) where.handoffStatus = handoffStatus
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { body: { contains: search, mode: 'insensitive' } },
        { summary: { contains: search, mode: 'insensitive' } },
      ]
    }

    const content = await prisma.content.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        project: { select: { id: true, name: true } },
        task: { select: { id: true, title: true, status: true } },
      },
    })

    return NextResponse.json(content)
  } catch (error) {
    console.error('Error fetching content:', error)
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    )
  }
}

// POST /api/content - create new content
export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Auto-calculate word count
    const wordCount = data.body ? data.body.trim().split(/\s+/).length : 0

    const content = await prisma.content.create({
      data: {
        title: data.title,
        body: data.body,
        type: data.type,
        status: data.status || 'draft',
        author: data.author,
        targetSite: data.targetSite,
        targetPath: data.targetPath,
        projectId: data.projectId,
        feedback: data.feedback,
        needsApproval: data.needsApproval ?? true,
        approvalSource: data.approvalSource,
        linkedKeyword: data.linkedKeyword,
        linkedTaskId: data.linkedTaskId,
        wordCount,
        linkedSiteId: data.linkedSiteId,
        linkedDomainId: data.linkedDomainId,
        linkedContentId: data.linkedContentId,
        metadata: data.metadata,
        language: data.language,
        handoffStatus: data.handoffStatus,
        version: data.version || 1,
        parentId: data.parentId,
        summary: data.summary,
      },
      include: {
        project: { select: { id: true, name: true } },
        task: { select: { id: true, title: true, status: true } },
      },
    })
    
    return NextResponse.json(content)
  } catch (error) {
    console.error('Error creating content:', error)
    return NextResponse.json(
      { error: 'Failed to create content' },
      { status: 500 }
    )
  }
}