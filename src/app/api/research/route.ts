import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/research - list all research
export async function GET() {
  try {
    const research = await prisma.research.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        project: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
    
    return NextResponse.json(research)
  } catch (error) {
    console.error('Error fetching research:', error)
    return NextResponse.json(
      { error: 'Failed to fetch research' },
      { status: 500 }
    )
  }
}

// POST /api/research - create new research
export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    const research = await prisma.research.create({
      data: {
        title: data.title,
        body: data.body,
        type: data.type,
        author: data.author,
        projectId: data.projectId,
        tags: data.tags,
        status: data.status,
      },
      include: {
        project: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
    
    return NextResponse.json(research)
  } catch (error) {
    console.error('Error creating research:', error)
    return NextResponse.json(
      { error: 'Failed to create research' },
      { status: 500 }
    )
  }
}