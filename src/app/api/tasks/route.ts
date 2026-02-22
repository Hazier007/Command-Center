import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/tasks - list all tasks
export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
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