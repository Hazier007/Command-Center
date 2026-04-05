"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  Menu, Users, Bell,
  LayoutDashboard, Globe, CheckSquare, StickyNote,
  ChevronRight, Zap, Search,
  Inbox, FolderKanban, Receipt, UserPlus,
  Layers, PenTool, BookOpen, Bot, DollarSign,
  BarChart3, CircleDollarSign, Gavel, ClipboardList,
  PanelLeftClose, PanelLeft, Radar, Briefcase, Music,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useSidebar } from "@/components/app-shell"

const navGroups = [
  {
    label: "Overzicht",
    items: [
      { href: "/", label: "Dashboard", icon: LayoutDashboard },
      { href: "/inbox", label: "Inbox", icon: Inbox },
      { href: "/alerts", label: "Alerts", icon: Bell },
    ],
  },
  {
    label: "Hazier",
    items: [
      { href: "/sites", label: "Websites", icon: Globe },
      { href: "/adsense", label: "AdSense", icon: CircleDollarSign },
      { href: "/domains", label: "Domeinen", icon: Layers },
      { href: "/clients", label: "Klanten", icon: Users },
      { href: "/clients/leads", label: "Leads", icon: UserPlus },
      { href: "/clients/pipeline", label: "Pipeline", icon: FolderKanban },
      { href: "/clients/quotes", label: "Offertes", icon: Receipt },
    ],
  },
  {
    label: "CollectPro",
    items: [
      { href: "/projects/collectpro", label: "CollectPro", icon: Briefcase },
    ],
  },
  {
    label: "Infinite Events",
    items: [
      { href: "/projects/infinite-events", label: "Infinite Events", icon: Music },
    ],
  },
  {
    label: "Werk",
    items: [
      { href: "/tasks", label: "Taken", icon: CheckSquare },
      { href: "/content", label: "Content", icon: PenTool },
      { href: "/research", label: "Research", icon: BookOpen },
      { href: "/notes", label: "Notes", icon: StickyNote },
      { href: "/decisions", label: "Decisions", icon: Gavel },
      { href: "/reports", label: "Reports", icon: ClipboardList },
      { href: "/seo-reports", label: "SEO Reports", icon: Radar },
    ],
  },
  {
    label: "Business",
    items: [
      { href: "/finance", label: "Finance", icon: DollarSign },
      { href: "/analytics", label: "Analytics", icon: BarChart3 },
      { href: "/agents", label: "Agents", icon: Bot },
    ],
  },
]

function SidebarContent({ pathname, collapsed, onNavigate }: {
  pathname: string; collapsed: boolean; onNavigate?: () => void
}) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(navGroups.map(g => g.label)))

  const toggleGroup = (label: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev)
      if (next.has(label)) next.delete(label); else next.add(label)
      return next
    })
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto py-2 space-y-1 scrollbar-none">
        {navGroups.map((group) => {
          const isExpanded = expandedGroups.has(group.label)
          const isActive = group.items.some(item =>
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
          )

          return (
            <div key={group.label}>
              {!collapsed && (
                <button
                  onClick={() => toggleGroup(group.label)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] transition-colors",
                    isActive ? "text-[#F5911E]/70" : "text-zinc-600 hover:text-zinc-400"
                  )}
                >
                  {group.label}
                  <ChevronRight className={cn("h-3 w-3 transition-transform", isExpanded && "rotate-90")} />
                </button>
              )}

              {(collapsed || isExpanded) && (
                <div className={cn("space-y-0.5", !collapsed && "mb-2")}>
                  {group.items.map((item) => {
                    const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onNavigate}
                        title={collapsed ? item.label : undefined}
                        className={cn(
                          "flex items-center gap-2.5 rounded-lg transition-all duration-150",
                          collapsed ? "justify-center px-2 py-2.5 mx-1" : "px-3 py-2 mx-1",
                          active
                            ? "bg-[#F5911E]/10 text-[#F5911E] shadow-[inset_2px_0_0_0_#F5911E]"
                            : "text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.04]"
                        )}
                      >
                        <item.icon className={cn("shrink-0", collapsed ? "h-4.5 w-4.5" : "h-4 w-4")} />
                        {!collapsed && (
                          <span className="text-[13px] font-medium truncate">{item.label}</span>
                        )}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Bottom: keyboard hints */}
      {!collapsed && (
        <div className="border-t border-white/[0.06] px-3 py-3 space-y-1">
          <div className="flex items-center gap-2 text-[10px] text-zinc-700">
            <kbd className="rounded bg-white/[0.05] px-1.5 py-0.5 font-mono text-zinc-500">⌘K</kbd>
            <span>Zoeken</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-zinc-700">
            <kbd className="rounded bg-white/[0.05] px-1.5 py-0.5 font-mono text-zinc-500">⌘⇧Space</kbd>
            <span>Quick Capture</span>
          </div>
        </div>
      )}
    </div>
  )
}

export function Navigation() {
  const pathname = usePathname()
  const { collapsed, setCollapsed } = useSidebar()

  const toggleCollapse = () => {
    setCollapsed(!collapsed)
  }

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <aside className={cn(
        "hidden md:flex flex-col fixed left-0 top-0 bottom-0 z-40 border-r border-white/[0.06] bg-zinc-950/95 backdrop-blur-xl transition-all duration-300",
        collapsed ? "w-[56px]" : "w-[220px]"
      )}>
        {/* Logo header */}
        <div className={cn(
          "flex items-center border-b border-white/[0.06] h-14 shrink-0",
          collapsed ? "justify-center px-2" : "justify-between px-3"
        )}>
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F5911E]/15 ring-1 ring-[#F5911E]/25">
              <Zap className="h-4 w-4 text-[#F5911E]" />
            </div>
            {!collapsed && (
              <div className="flex items-baseline gap-1.5">
                <span className="font-bold text-sm text-white tracking-tight">Hazier</span>
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#F5911E]/50">CC</span>
              </div>
            )}
          </Link>
          {!collapsed && (
            <button onClick={toggleCollapse} className="text-zinc-600 hover:text-zinc-400 transition-colors p-1 rounded-md hover:bg-white/[0.04]">
              <PanelLeftClose className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Expand button when collapsed */}
        {collapsed && (
          <button onClick={toggleCollapse} className="flex justify-center py-2 text-zinc-600 hover:text-zinc-400 transition-colors">
            <PanelLeft className="h-4 w-4" />
          </button>
        )}

        <SidebarContent pathname={pathname} collapsed={collapsed} />
      </aside>

      {/* ── Mobile Top Bar ── */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-zinc-950/95 backdrop-blur-xl">
        <div className="flex h-14 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F5911E]/15">
              <Zap className="h-3.5 w-3.5 text-[#F5911E]" />
            </div>
            <span className="font-bold text-sm text-white">Hazier</span>
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#F5911E]/50">CC</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const event = new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true })
                window.dispatchEvent(event)
              }}
              className="rounded-lg bg-white/[0.04] p-2 text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <Search className="h-4 w-4" />
            </button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-white">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[260px] bg-zinc-950 border-white/[0.06] p-0">
                <SheetHeader className="px-4 py-4 border-b border-white/[0.06]">
                  <SheetTitle className="flex items-center gap-2 text-sm">
                    <Zap className="h-4 w-4 text-[#F5911E]" />
                    Command Center
                  </SheetTitle>
                </SheetHeader>
                <SidebarContent pathname={pathname} collapsed={false} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  )
}
