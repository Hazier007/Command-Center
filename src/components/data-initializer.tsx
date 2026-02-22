"use client"

import { useEffect } from "react"
import { seedData } from "@/lib/seedData"
import { projectsStorage, sitesStorage } from "@/lib/storage"

async function cleanupMigration() {
  const MIGRATION_KEY = 'cc_migration_cleanup_ideas_v1'
  if (typeof window !== 'undefined' && localStorage.getItem(MIGRATION_KEY)) return

  try {
    const projects = await projectsStorage.getAll()
    
    // Remove 💡 idea-projects (they belong in Ideas, not Projects)
    const ideaProjects = projects.filter(p => p.name.startsWith('💡'))
    for (const p of ideaProjects) {
      // Unlink any sites from this project first
      const sites = await sitesStorage.getAll()
      for (const s of sites) {
        if (s.projectId === p.id) {
          await sitesStorage.update(s.id, { projectId: undefined })
        }
      }
      await projectsStorage.delete(p.id)
    }

    if (ideaProjects.length > 0) {
      console.log(`✅ Cleanup: removed ${ideaProjects.length} idea-projects`)
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(MIGRATION_KEY, new Date().toISOString())
    }
  } catch (e) {
    console.error('Cleanup migration failed:', e)
  }
}

export function DataInitializer() {
  useEffect(() => {
    seedData().then(() => cleanupMigration()).catch(console.error)
  }, [])

  return null
}
