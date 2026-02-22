import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/content - list all content
export async function GET() {
  try {
    const content = await prisma.content.findMany({
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
    
    const content = await prisma.content.create({
      data: {
        title: data.title,
        body: data.body,
        type: data.type,
        status: data.status,
        author: data.author,
        targetSite: data.targetSite,
        targetPath: data.targetPath,
        projectId: data.projectId,
        feedback: data.feedback,
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
    
    return NextResponse.json(content)
  } catch (error) {
    console.error('Error creating content:', error)
    return NextResponse.json(
      { error: 'Failed to create content' },
      { status: 500 }
    )
  }
}