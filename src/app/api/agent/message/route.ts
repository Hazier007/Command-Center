import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateAgentToken, unauthorizedResponse } from '@/lib/agent-auth'

// GET /api/agent/message?to=radar&unread=true
export async function GET(request: NextRequest) {
  const auth = validateAgentToken(request)
  if (!auth.valid) return unauthorizedResponse(auth.error!)

  const { searchParams } = new URL(request.url)
  const to = searchParams.get('to')
  const from = searchParams.get('from')
  const unread = searchParams.get('unread')
  const taskId = searchParams.get('taskId')
  const limit = parseInt(searchParams.get('limit') || '50')

  const where: Record<string, unknown> = {}
  if (to) where.toAgent = to
  if (from) where.fromAgent = from
  if (unread === 'true') where.read = false
  if (taskId) where.taskId = taskId

  try {
    const messages = await prisma.agentMessage.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
    })

    return NextResponse.json(messages)
  } catch (error) {
    console.error('Error fetching agent messages:', error)
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
  }
}

// POST /api/agent/message — send a message between agents
export async function POST(request: NextRequest) {
  const auth = validateAgentToken(request)
  if (!auth.valid) return unauthorizedResponse(auth.error!)

  try {
    const data = await request.json()

    if (!data.fromAgent || !data.toAgent || !data.message) {
      return NextResponse.json(
        { error: 'Missing required fields: fromAgent, toAgent, message' },
        { status: 400 }
      )
    }

    const message = await prisma.agentMessage.create({
      data: {
        fromAgent: data.fromAgent,
        toAgent: data.toAgent,
        message: data.message,
        taskId: data.taskId || undefined,
      },
    })

    return NextResponse.json({ success: true, data: message }, { status: 201 })
  } catch (error) {
    console.error('Error creating agent message:', error)
    return NextResponse.json({ error: 'Failed to create message' }, { status: 500 })
  }
}

// PATCH /api/agent/message — mark messages as read
export async function PATCH(request: NextRequest) {
  const auth = validateAgentToken(request)
  if (!auth.valid) return unauthorizedResponse(auth.error!)

  try {
    const data = await request.json()

    // Mark specific message(s) as read
    if (data.id) {
      const message = await prisma.agentMessage.update({
        where: { id: data.id },
        data: { read: true },
      })
      return NextResponse.json({ success: true, data: message })
    }

    // Mark all unread messages for an agent as read
    if (data.toAgent) {
      const result = await prisma.agentMessage.updateMany({
        where: { toAgent: data.toAgent, read: false },
        data: { read: true },
      })
      return NextResponse.json({ success: true, marked: result.count })
    }

    return NextResponse.json({ error: 'Provide id or toAgent' }, { status: 400 })
  } catch (error) {
    console.error('Error updating agent messages:', error)
    return NextResponse.json({ error: 'Failed to update messages' }, { status: 500 })
  }
}
