import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/notes - list all notes (supports ?agentId=forge&noteType=progress&linkedTaskId=x)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const agentId = searchParams.get('agentId')
    const noteType = searchParams.get('noteType')
    const linkedTaskId = searchParams.get('linkedTaskId')
    const linkedSiteId = searchParams.get('linkedSiteId')

    const where: Record<string, string> = {}
    if (agentId) where.agentId = agentId
    if (noteType) where.noteType = noteType
    if (linkedTaskId) where.linkedTaskId = linkedTaskId
    if (linkedSiteId) where.linkedSiteId = linkedSiteId

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