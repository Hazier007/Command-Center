import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/alerts - list all alerts
export async function GET() {
  try {
    const alerts = await prisma.alert.findMany({
      orderBy: { createdAt: 'desc' },
    })
    
    return NextResponse.json(alerts)
  } catch (error) {
    console.error('Error fetching alerts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch alerts' },
      { status: 500 }
    )
  }
}

// POST /api/alerts - create new alert
export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    const alert = await prisma.alert.create({
      data: {
        title: data.title,
        body: data.body,
        priority: data.priority,
        resolved: data.resolved || false,
        snoozedUntil: data.snoozedUntil ? new Date(data.snoozedUntil) : null,
      },
    })
    
    return NextResponse.json(alert)
  } catch (error) {
    console.error('Error creating alert:', error)
    return NextResponse.json(
      { error: 'Failed to create alert' },
      { status: 500 }
    )
  }
}