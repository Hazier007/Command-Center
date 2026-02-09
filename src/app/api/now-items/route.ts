import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/now-items - list all now items
export async function GET() {
  try {
    const nowItems = await prisma.nowItem.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        project: true,
      },
    })
    
    return NextResponse.json(nowItems)
  } catch (error) {
    console.error('Error fetching now items:', error)
    return NextResponse.json(
      { error: 'Failed to fetch now items' },
      { status: 500 }
    )
  }
}

// POST /api/now-items - create new now item
export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    const nowItem = await prisma.nowItem.create({
      data: {
        title: data.title,
        meta: data.meta,
        tag: data.tag,
        description: data.description,
        projectId: data.projectId,
      },
      include: {
        project: true,
      },
    })
    
    return NextResponse.json(nowItem)
  } catch (error) {
    console.error('Error creating now item:', error)
    return NextResponse.json(
      { error: 'Failed to create now item' },
      { status: 500 }
    )
  }
}