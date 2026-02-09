import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/notes - list all notes
export async function GET() {
  try {
    const notes = await prisma.note.findMany({
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