import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/research - list all research (supports filters + pagination)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const linkedSiteId = searchParams.get('linkedSiteId')
    const linkedDomainId = searchParams.get('linkedDomainId')
    const status = searchParams.get('status')
    const type = searchParams.get('type')
    const author = searchParams.get('author')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '0')
    const limit = parseInt(searchParams.get('limit') || '0')

    const where: Record<string, unknown> = {}
    if (linkedSiteId) where.linkedSiteId = linkedSiteId
    if (linkedDomainId) where.linkedDomainId = linkedDomainId
    if (status) where.status = status
    if (type) where.type = type
    if (author) where.author = author
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { body: { contains: search, mode: 'insensitive' } },
        { tags: { contains: search, mode: 'insensitive' } },
      ]
    }

    // If pagination requested
    if (page > 0 && limit > 0) {
      const [research, total] = await Promise.all([
        prisma.research.findMany({
          where,
          orderBy: { createdAt: 'desc' },
          skip: (page - 1) * limit,
          take: limit,
          include: {
            project: { select: { id: true, name: true } },
          },
        }),
        prisma.research.count({ where }),
      ])
      return NextResponse.json({ data: research, total, page, limit, totalPages: Math.ceil(total / limit) })
    }

    // No pagination — return all
    const research = await prisma.research.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        project: { select: { id: true, name: true } },
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
        linkedSiteId: data.linkedSiteId,
        linkedDomainId: data.linkedDomainId,
        tags: data.tags,
        status: data.status,
      },
      include: {
        project: { select: { id: true, name: true } },
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
