import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/activity - list activities with optional filters
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 50
    const actor = searchParams.get('actor')
    
    const whereClause = actor ? { actor } : {}
    
    const activities = await prisma.activity.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: {
        project: true,
      },
    })
    
    return NextResponse.json(activities)
  } catch (error) {
    console.error('Error fetching activities:', error)
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    )
  }
}

// POST /api/activity - create new activity
export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    const activity = await prisma.activity.create({
      data: {
        type: data.type,
        actor: data.actor,
        title: data.title,
        description: data.description,
        url: data.url,
        projectId: data.projectId,
        metadata: data.metadata,
      },
      include: {
        project: true,
      },
    })
    
    return NextResponse.json(activity)
  } catch (error) {
    console.error('Error creating activity:', error)
    return NextResponse.json(
      { error: 'Failed to create activity' },
      { status: 500 }
    )
  }
}