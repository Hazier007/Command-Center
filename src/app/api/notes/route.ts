import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/notes - list all notes (supports filtering on all linking fields)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const agentId = searchParams.get('agentId')
    const noteType = searchParams.get('noteType')
    const linkedTaskId = searchParams.get('linkedTaskId')
    const linkedSiteId = searchParams.get('linkedSiteId')
    const linkedProjectId = searchParams.get('linkedProjectId')
    const linkedIdeaId = searchParams.get('linkedIdeaId')
    const linkedContentId = searchParams.get('linkedContentId')
    const linkedSprintId = searchParams.get('linkedSprintId')
    const actionNeeded = searchParams.get('actionNeeded')

    const where: Record<string, unknown> = {}
    if (agentId) where.agentId = agentId
    if (noteType) where.noteType = noteType
    if (linkedTaskId) where.linkedTaskId = linkedTaskId
    if (linkedSiteId) where.linkedSiteId = linkedSiteId
    if (linkedProjectId) where.linkedProjectId = linkedProjectId
    if (linkedIdeaId) where.linkedIdeaId = linkedIdeaId
    if (linkedContentId) where.linkedContentId = linkedContentId
    if (linkedSprintId) where.linkedSprintId = linkedSprintId
    if (actionNeeded === 'true') where.actionNeeded = true

    const notes = await prisma.note.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })
    
    return NextResponse.json(notes)
  } catch (error) {
    console.error('Error fetching notes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch notes' },
      { status: 500 }
    )
  }
}

// POST /api/notes - create new note
export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    const note = await prisma.note.create({
      data: {
        title: data.title,
        content: data.content,
        tags: data.tags || [],
        agentId: data.agentId,
        noteType: data.noteType,
        linkedTaskId: data.linkedTaskId,
        linkedSiteId: data.linkedSiteId,
        linkedProjectId: data.linkedProjectId,
        linkedIdeaId: data.linkedIdeaId,
        linkedContentId: data.linkedContentId,
        linkedSprintId: data.linkedSprintId,
        sentiment: data.sentiment,
        actionNeeded: data.actionNeeded || false,
      },
    })
    
    return NextResponse.json(note)
  } catch (error) {
    console.error('Error creating note:', error)
    return NextResponse.json(
      { error: 'Failed to create note' },
      { status: 500 }
    )
  }
}