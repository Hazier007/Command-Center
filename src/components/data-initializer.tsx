"use client"

import { useEffect } from "react"
import { seedData } from "@/lib/seedData"

export function DataInitializer() {
  useEffect(() => {
    // Initialize seed data on first load
    seedData().catch(console.error)
  }, [])

  return null // This component doesn't render anything
}
