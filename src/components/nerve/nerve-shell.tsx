"use client"

import { createContext, useContext, useState } from "react"
import { NerveTopNav } from "./nerve-topnav"
import { ThemeProvider } from "./theme-context"

// ─── Business Context ──────────────────────────────────────────
export type BusinessId = "locallead" | "calqo" | "hazier" | "events" | "all"

export interface Business {
  id: BusinessId
  name: string
  type: string
  letter: string
  color: string // tailwind bg class
  textColor: string // tailwind text class
  status: string
  emoji: string
}

export const BUSINESSES: Business[] = [
  { id: "locallead", name: "LocalLead", type: "Rank & Rent leadmachines", letter: "LL", color: "bg-[#F5911E]/15", textColor: "text-[#F5911E]", status: "Sprint", emoji: "🟠" },
  { id: "calqo", name: "Calqo", type: "Calculator/utility assets", letter: "CQ", color: "bg-sky-500/15", textColor: "text-sky-400", status: "Later", emoji: "🔷" },
  { id: "hazier", name: "Hazier", type: "Webdesign & SEO", letter: "HZ", color: "bg-violet-500/15", textColor: "text-violet-400", status: "Later", emoji: "🟣" },
  { id: "events", name: "Infinite Events", type: "VZW/events", letter: "IE", color: "bg-emerald-500/15", textColor: "text-emerald-400", status: "Later", emoji: "🟢" },
  { id: "all", name: "Clean sheet", type: "Geen oude demo-data", letter: "✓", color: "bg-zinc-700/30", textColor: "text-zinc-200", status: "Nieuw", emoji: "✅" },
]

interface BusinessContextType {
  activeBusiness: Business
  setActiveBusiness: (id: BusinessId) => void
}

const BusinessContext = createContext<BusinessContextType>({
  activeBusiness: BUSINESSES[0],
  setActiveBusiness: () => {},
})

export function useBusinessContext() {
  return useContext(BusinessContext)
}

// ─── Shell ─────────────────────────────────────────────────────
export function NerveShell({ children }: { children: React.ReactNode }) {
  const [activeBusiness, setActiveBiz] = useState<Business>(BUSINESSES[0])

  const setActiveBusiness = (id: BusinessId) => {
    const biz = BUSINESSES.find((b) => b.id === id) || BUSINESSES[0]
    setActiveBiz(biz)
  }

  return (
    <ThemeProvider>
      <BusinessContext.Provider value={{ activeBusiness, setActiveBusiness }}>
        <div className="flex h-screen flex-col overflow-hidden bg-zinc-950">
          <NerveTopNav />
          <main className="flex-1 min-h-0 overflow-y-auto p-4 md:p-6 scrollbar-thin">
            {children}
          </main>
        </div>
      </BusinessContext.Provider>
    </ThemeProvider>
  )
}
