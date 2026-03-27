import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

type ImportProject = {
  id: string
  name: string
  status: string
  category: string
  description?: string | null
  revenue?: number | null
  createdAt: string
  updatedAt: string
}

type ImportSite = {
  id: string
  domain: string
  projectId?: string | null
  status: string
  techStack?: string[]
  revenue?: number | null
  listings?: number | null
  pages?: number | null
  notes?: string | null
  createdAt: string
  updatedAt: string
}

type ImportIdea = {
  id: string
  title: string
  description: string
  category: string
  priority: string
  createdAt: string
  updatedAt: string
}

type ImportTask = {
  id: string
  title: string
  description?: string | null
  status: string
  projectId?: string | null
  priority?: string | null
  dueDate?: string | null
  createdAt: string
  updatedAt: string
}

type ImportNote = {
  id: string
  title: string
  content: string
  tags?: string[]
  createdAt: string
  updatedAt: string
}

type ImportNowItem = {
  id: string
  title: string
  meta?: string | null
  tag?: string | null
  description?: string | null
  projectId?: string | null
  createdAt: string
  updatedAt: string
}

type ImportAlert = {
  id: string
  title: string
  body: string
  priority: string
  resolved?: boolean
  snoozedUntil?: string | null
  createdAt: string
  updatedAt: string
}

interface ImportData {
  projects?: ImportProject[]
  sites?: ImportSite[]
  ideas?: ImportIdea[]
  tasks?: ImportTask[]
  notes?: ImportNote[]
  nowItems?: ImportNowItem[]
  alerts?: ImportAlert[]
}

export async function POST(request: Request) {
  try {
    const data: ImportData = await request.json()
    const results = {
      projects: 0,
      sites: 0,
      ideas: 0,
      tasks: 0,
      notes: 0,
      nowItems: 0,
      alerts: 0,
    }

    if (data.projects && data.projects.length > 0) {
      for (const project of data.projects) {
        await prisma.project.create({
          data: {
            id: project.id,
            name: project.name,
            status: project.status,
            category: project.category,
            description: project.description,
            revenue: project.revenue,
            createdAt: new Date(project.createdAt),
            updatedAt: new Date(project.updatedAt),
          },
        })
        results.projects++
      }
    }

    if (data.sites && data.sites.length > 0) {
      for (const site of data.sites) {
        await prisma.site.create({
          data: {
            id: site.id,
            domain: site.domain,
            projectId: site.projectId,
            status: site.status,
            techStack: site.techStack || [],
            revenue: site.revenue,
            listings: site.listings,
            pages: site.pages,
            notes: site.notes,
            createdAt: new Date(site.createdAt),
            updatedAt: new Date(site.updatedAt),
          },
        })
        results.sites++
      }
    }

    if (data.ideas && data.ideas.length > 0) {
      for (const idea of data.ideas) {
        await prisma.idea.create({
          data: {
            id: idea.id,
            title: idea.title,
            description: idea.description,
            category: idea.category,
            priority: idea.priority,
            createdAt: new Date(idea.createdAt),
            updatedAt: new Date(idea.updatedAt),
          },
        })
        results.ideas++
      }
    }

    if (data.tasks && data.tasks.length > 0) {
      for (const task of data.tasks) {
        await prisma.task.create({
          data: {
            id: task.id,
            title: task.title,
            description: task.description,
            status: task.status,
            projectId: task.projectId,
            priority: task.priority,
            dueDate: task.dueDate ? new Date(task.dueDate) : null,
            createdAt: new Date(task.createdAt),
            updatedAt: new Date(task.updatedAt),
          },
        })
        results.tasks++
      }
    }

    if (data.notes && data.notes.length > 0) {
      for (const note of data.notes) {
        await prisma.note.create({
          data: {
            id: note.id,
            title: note.title,
            content: note.content,
            tags: note.tags || [],
            createdAt: new Date(note.createdAt),
            updatedAt: new Date(note.updatedAt),
          },
        })
        results.notes++
      }
    }

    if (data.nowItems && data.nowItems.length > 0) {
      for (const nowItem of data.nowItems) {
        await prisma.nowItem.create({
          data: {
            id: nowItem.id,
            title: nowItem.title,
            meta: nowItem.meta,
            tag: nowItem.tag,
            description: nowItem.description,
            projectId: nowItem.projectId,
            createdAt: new Date(nowItem.createdAt),
            updatedAt: new Date(nowItem.updatedAt),
          },
        })
        results.nowItems++
      }
    }

    if (data.alerts && data.alerts.length > 0) {
      for (const alert of data.alerts) {
        await prisma.alert.create({
          data: {
            id: alert.id,
            title: alert.title,
            body: alert.body,
            priority: alert.priority,
            resolved: alert.resolved,
            snoozedUntil: alert.snoozedUntil ? new Date(alert.snoozedUntil) : null,
            createdAt: new Date(alert.createdAt),
            updatedAt: new Date(alert.updatedAt),
          },
        })
        results.alerts++
      }
    }

    return NextResponse.json({
      success: true,
      imported: results,
      total: Object.values(results).reduce((sum, count) => sum + count, 0),
    })
  } catch (error) {
    console.error('Error importing data:', error)
    return NextResponse.json(
      {
        error: 'Failed to import data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
