"use client"

import { createContext, useContext, useState } from "react"
import { NerveTopNav } from "./nerve-topnav"
import { NerveRightPanel } from "./nerve-right-panel"
import { ThemeProvider } from "./theme-context"

// ─── Business Context ──────────────────────────────────────────
export type BusinessId = "hazier" | "collectpro" | "events" | "all"

export interface Business {
  id: BusinessId
  name: string
  type: string
  letter: string
  color: string // tailwind bg class
  textColor: string // tailwind text class
  mrr: string
  emoji: string
}

export const BUSINESSES: Business[] = [
  { id: "hazier", name: "Hazier", type: "SEO & Webdesign Bureau", letter: "H", color: "bg-[#F5911E]/15", textColor: "text-[#F5911E]", mrr: "€4.196", emoji: "🔶" },
  { id: "collectpro", name: "CollectPro", type: "Incasso & Betalingsopvolging", letter: "C", color: "bg-blue-500/15", textColor: "text-blue-400", mrr: "€0", emoji: "🔵" },
  { id: "events", name: "Infinite Events", type: "Elektrik.ink Festival", letter: "IE", color: "bg-pink-500/15", textColor: "text-pink-400", mrr: "—", emoji: "🩷" },
  { id: "all", name: "Alle bedrijven", type: "Gecombineerd overzicht", letter: "⚡", color: "bg-zinc-700/30", textColor: "text-zinc-200", mrr: "€4.196", emoji: "⚡" },
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
          {/* Top navigation */}
          <NerveTopNav />

          {/* Content row: main + right panel */}
          <div className="flex flex-1 min-h-0 overflow-hidden">
            <main className="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-thin min-w-0">
              {children}
            </main>

            {/* Right panel — hidden below lg */}
            <div className="hidden lg:block shrink-0">
              <NerveRightPanel />
            </div>
          </div>
        </div>
      </BusinessContext.Provider>
    </ThemeProvider>
  )
}
