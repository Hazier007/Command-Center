import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/tasks - list all tasks (supports ?assignee=wout&status=todo filters)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const assignee = searchParams.get('assignee')
    const status = searchParams.get('status')

    const where: Record<string, string> = {}
    if (assignee) where.assignee = assignee
    if (status) where.status = status

    const tasks = await prisma.task.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        project: true,
        site: true,
      },
    })
    
    return NextResponse.json(tasks)
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    )
  }
}

// POST /api/tasks - create new task
export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    const task = await prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        projectId: data.projectId,
        siteId: data.siteId,
        priority: data.priority,
        assignee: data.assignee,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
      },
      include: {
        project: true,
        site: true,
      },
    })
    
    return NextResponse.json(task)
  } catch (error) {
    console.error('Error creating task:', error)
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    )
  }
}