import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/ideas - list all ideas
export async function GET() {
  try {
    const ideas = await prisma.idea.findMany({
      orderBy: { createdAt: 'desc' },
    })
    
    return NextResponse.json(ideas)
  } catch (error) {
    console.error('Error fetching ideas:', error)
    return NextResponse.json(
      { error: 'Failed to fetch ideas' },
      { status: 500 }
    )
  }
}

// POST /api/ideas - create new idea
export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    const idea = await prisma.idea.create({
      data: {
        title: data.title,
        description: data.description,
        category: data.category,
        priority: data.priority,
      },
    })
    
    return NextResponse.json(idea)
  } catch (error) {
    console.error('Error creating idea:', error)
    return NextResponse.json(
      { error: 'Failed to create idea' },
      { status: 500 }
    )
  }
}