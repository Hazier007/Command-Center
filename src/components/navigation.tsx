"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import {
  Menu, Users, DollarSign, Bell, Wallet, FileText, BarChart3, Brain,
  LayoutDashboard, Globe, Lightbulb, CheckSquare, FolderOpen, StickyNote,
  ChevronDown, Zap, Workflow, Activity, Search, TrendingUp
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const navGroups = [
  {
    label: "Overzicht",
    items: [
      { href: "/", label: "Dashboard", icon: LayoutDashboard },
      { href: "/activity", label: "Activiteit", icon: Activity },
      { href: "/alerts", label: "Alerts", icon: Bell },
    ],
  },
  {
    label: "Projecten",
    items: [
      { href: "/projects", label: "Projects", icon: FolderOpen },
      { href: "/pipeline", label: "Pipeline", icon: Workflow },
      { href: "/sites", label: "Sites", icon: Globe },
      { href: "/tasks", label: "Tasks", icon: CheckSquare },
      { href: "/team", label: "Team", icon: Users },
    ],
  },
  {
    label: "Finance",
    items: [
      { href: "/budget", label: "Budget", icon: Wallet },
      { href: "/adsense", label: "AdSense", icon: DollarSign },
      { href: "/analytics", label: "Analytics", icon: BarChart3 },
      { href: "/seo", label: "SEO", icon: TrendingUp },
    ],
  },
  {
    label: "Kennis",
    items: [
      { href: "/ideas", label: "Ideas", icon: Lightbulb },
      { href: "/research", label: "Research", icon: Search },
      { href: "/content", label: "Content", icon: FileText },
      { href: "/docs", label: "Docs", icon: FileText },
      { href: "/notes", label: "Notes", icon: StickyNote },
      { href: "/oracle", label: "Oracle 🔮", icon: Brain },
    ],
  },
]

function NavDropdown({ group, pathname }: { group: typeof navGroups[0]; pathname: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isActive = group.items.some(item => pathname === item.href)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-white/10",
          isActive ? "text-[#F5911E]" : "text-zinc-400 hover:text-white"
        )}
      >
        {group.label}
        <ChevronDown className={cn("h-3 w-3 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute top-full left-0 z-50 mt-1 min-w-[180px] rounded-lg border border-white/10 bg-zinc-900 p-1 shadow-xl">
          {group.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                pathname === item.href
                  ? "bg-[#F5911E]/20 text-[#F5911E]"
                  : "text-zinc-300 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="border-b border-white/10 bg-zinc-950/95 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/80">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-[#F5911E]" />
            <span className="font-bold text-lg">Hazier</span>
            <Badge className="bg-[#F5911E]/20 text-[#F5911E] border-[#F5911E]/30 text-[10px]">CC</Badge>
          </Link>

          {/* Desktop: Grouped Dropdowns */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {navGroups.map((group) => (
              <NavDropdown key={group.label} group={group} pathname={pathname} />
            ))}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="text-zinc-400">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[260px] bg-zinc-950 border-white/10">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-[#F5911E]" />
                    Hazier CC
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  {navGroups.map((group) => (
                    <div key={group.label}>
                      <div className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                        {group.label}
                      </div>
                      <div className="space-y-1">
                        {group.items.map((item) => (
                          <Link key={item.href} href={item.href}>
                            <Button
                              variant="ghost"
                              className={cn(
                                "w-full justify-start gap-2 text-sm",
                                pathname === item.href
                                  ? "bg-[#F5911E]/20 text-[#F5911E]"
                                  : "text-zinc-400 hover:text-white hover:bg-white/5"
                              )}
                            >
                              <item.icon className="h-4 w-4" />
                              {item.label}
                            </Button>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
