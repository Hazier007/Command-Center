"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import {
  Menu, Users, Bell, FileText, Brain,
  LayoutDashboard, Globe, CheckSquare, StickyNote,
  ChevronDown, Zap, Activity, Search, Rocket,
  Inbox, FolderKanban, Receipt, UserPlus,
  GlobeLock, Wrench, Link2, Layers,
  PenTool, BookOpen, Settings, Bot, DollarSign,
  Landmark, PartyPopper, TrendingUp, BarChart3, CircleDollarSign, Gavel,
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
      { href: "/inbox", label: "Inbox", icon: Inbox },
    ],
  },
  {
    label: "Klanten",
    items: [
      { href: "/clients", label: "Overzicht", icon: Users },
      { href: "/clients/leads", label: "Leads", icon: UserPlus },
      { href: "/clients/pipeline", label: "Pipeline", icon: FolderKanban },
      { href: "/clients/quotes", label: "Offertes", icon: Receipt },
    ],
  },
  {
    label: "Eigen",
    items: [
      { href: "/sites", label: "Sites", icon: Globe },
      { href: "/domains", label: "Domeinen", icon: Layers },
      { href: "/projects/collectpro", label: "CollectPro", icon: Landmark },
      { href: "/projects/infinite-events", label: "Infinite Events", icon: PartyPopper },
    ],
  },
  {
    label: "Werk",
    items: [
      { href: "/tasks", label: "Taken", icon: CheckSquare },
      { href: "/content", label: "Content", icon: PenTool },
      { href: "/research", label: "Research", icon: BookOpen },
      { href: "/seo", label: "SEO", icon: TrendingUp },
      { href: "/oracle", label: "Oracle", icon: Brain },
      { href: "/notes", label: "Notes", icon: StickyNote },
      { href: "/decisions", label: "Decisions", icon: Gavel },
    ],
  },
  {
    label: "Business",
    items: [
      { href: "/finance", label: "Finance", icon: DollarSign },
      { href: "/adsense", label: "AdSense", icon: CircleDollarSign },
      { href: "/analytics", label: "Analytics", icon: BarChart3 },
      { href: "/agents", label: "Agents", icon: Bot },
      { href: "/settings", label: "Instellingen", icon: Settings },
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
