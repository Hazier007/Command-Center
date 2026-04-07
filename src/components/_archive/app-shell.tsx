"use client"

import { useState, useEffect, createContext, useContext } from "react"

interface SidebarContextType {
  collapsed: boolean
  setCollapsed: (v: boolean) => void
}

const SidebarContext = createContext<SidebarContextType>({
  collapsed: false,
  setCollapsed: () => {},
})

export function useSidebar() {
  return useContext(SidebarContext)
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("cc-sidebar-collapsed")
    if (stored === "true") setCollapsed(true)
  }, [])

  const handleSetCollapsed = (v: boolean) => {
    setCollapsed(v)
    localStorage.setItem("cc-sidebar-collapsed", String(v))
  }

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed: handleSetCollapsed }}>
      <div className={`min-h-screen pt-14 pb-16 md:pt-0 md:pb-0 transition-all duration-300 ${
        collapsed ? "md:pl-[56px]" : "md:pl-[220px]"
      }`}>
        {children}
      </div>
    </SidebarContext.Provider>
  )
}
