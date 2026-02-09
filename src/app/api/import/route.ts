import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface ImportData {
  projects?: any[]
  sites?: any[]
  ideas?: any[]
  tasks?: any[]
  notes?: any[]
  nowItems?: any[]
  alerts?: any[]
}

// POST /api/import - bulk import localStorage data
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

    // Import projects first (as they might be referenced by other entities)
    if (data.projects && data.projects.length > 0) {
      for (const project of data.projects) {
        await prisma.project.create({
          data: {
            id: project.id, // Keep original IDs for references
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

    // Import sites
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

    // Import ideas
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

    // Import tasks
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

    // Import notes
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

    // Import now items
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

    // Import alerts
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