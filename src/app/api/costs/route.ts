import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/costs - list all costs
export async function GET() {
  try {
    const costs = await prisma.cost.findMany({
      orderBy: { createdAt: 'desc' },
    })
    
    return NextResponse.json(costs)
  } catch (error) {
    console.error('Error fetching costs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch costs' },
      { status: 500 }
    )
  }
}

// POST /api/costs - create new cost
export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    const cost = await prisma.cost.create({
      data: {
        name: data.name,
        amount: data.amount,
        category: data.category,
        recurring: data.recurring,
        notes: data.notes,
      },
    })
    
    return NextResponse.json(cost)
  } catch (error) {
    console.error('Error creating cost:', error)
    return NextResponse.json(
      { error: 'Failed to create cost' },
      { status: 500 }
    )
  }
}