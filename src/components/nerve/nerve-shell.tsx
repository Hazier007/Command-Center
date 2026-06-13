"use client"

import { createContext, useContext, useState } from "react"
import { NerveTopNav } from "./nerve-topnav"
import { ThemeProvider } from "./theme-context"

export type BusinessId = "all" | "locallead" | "hazier" | "calqo" | "events"

export interface Business {
  id: BusinessId
  name: string
  type: string
  letter: string
  color: string
  textColor: string
  status: string
  emoji: string
  focus: string
}

export const BUSINESSES: Business[] = [
  { id: "all", name: "Alle businessen", type: "Portfolio overview", letter: "CC", color: "bg-white/10", textColor: "text-white", status: "Overzicht", emoji: "🎛️", focus: "Eén cockpit voor alles" },
  { id: "locallead", name: "LocalLead", type: "Rank & Rent / leadgen", letter: "LL", color: "bg-[#F5911E]/15", textColor: "text-[#F5911E]", status: "Prioriteit", emoji: "🟠", focus: "€10k MRR via verhuurde leadsites" },
  { id: "hazier", name: "Hazier", type: "Webdesign & SEO", letter: "HZ", color: "bg-violet-500/15", textColor: "text-violet-300", status: "Actief", emoji: "🟣", focus: "Cashflow, klanten en uitvoering" },
  { id: "calqo", name: "Calqo", type: "Calculator/media assets", letter: "CQ", color: "bg-sky-500/15", textColor: "text-sky-300", status: "Opbouwen", emoji: "🔷", focus: "Tools, SEO en AdSense assets" },
  { id: "events", name: "Infinite Events", type: "Events / VZW", letter: "IE", color: "bg-emerald-500/15", textColor: "text-emerald-300", status: "Parked", emoji: "🟢", focus: "Alleen opvolgen wat aandacht vraagt" },
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

export function NerveShell({ children }: { children: React.ReactNode }) {
  const [activeBusiness, setActiveBiz] = useState<Business>(BUSINESSES[0])

  const setActiveBusiness = (id: BusinessId) => {
    const biz = BUSINESSES.find((b) => b.id === id) || BUSINESSES[0]
    setActiveBiz(biz)
  }

  return (
    <ThemeProvider>
      <BusinessContext.Provider value={{ activeBusiness, setActiveBusiness }}>
        <div className="flex h-screen flex-col overflow-hidden bg-[#07070A] text-white">
          <NerveTopNav />
          <main className="flex-1 min-h-0 overflow-y-auto bg-[radial-gradient(circle_at_top_left,_rgba(245,145,30,0.10),_transparent_34rem),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.10),_transparent_32rem)] p-4 md:p-6 scrollbar-thin">
            {children}
          </main>
        </div>
      </BusinessContext.Provider>
    </ThemeProvider>
  )
}
