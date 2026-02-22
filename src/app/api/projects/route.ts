import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/projects - list all projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        sites: true,
        tasks: true,
        nowItems: true,
      },
    })
    
    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

// POST /api/projects - create new project
export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    const project = await prisma.project.create({
      data: {
        name: data.name,
        status: data.status,
        phase: data.phase,
        category: data.category,
        description: data.description,
        revenue: data.revenue,
      },
      include: {
        sites: true,
        tasks: true,
        nowItems: true,
      },
    })
    
    return NextResponse.json(project)
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}