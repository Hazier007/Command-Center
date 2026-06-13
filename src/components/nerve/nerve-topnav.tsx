"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  BriefcaseBusiness,
  ClipboardList,
  Compass,
  Database,
  Globe2,
  LayoutDashboard,
  Menu,
  Moon,
  Search,
  Settings,
  Sun,
  Users,
  X,
  ChevronDown,
} from "lucide-react"
import { useBusinessContext, BUSINESSES } from "./nerve-shell"
import { useTheme } from "./theme-context"
import { cn } from "@/lib/utils"

const primaryNav = [
  { href: "/", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/portfolio", icon: BriefcaseBusiness, label: "Portfolio" },
  { href: "/tasks", icon: ClipboardList, label: "Taken" },
  { href: "/research", icon: Search, label: "Research" },
  { href: "/agents", icon: Users, label: "Team" },
]

const moreNav = [
  { href: "/locallead", icon: Compass, label: "LocalLead sprint" },
  { href: "/sites", icon: Globe2, label: "Sites" },
  { href: "/klanten", icon: Users, label: "Partners/klanten" },
  { href: "/geld", icon: BarChart3, label: "Financieel" },
  { href: "/docs", icon: Database, label: "Source of truth" },
]

export function NerveTopNav() {
  const pathname = usePathname()
  const { activeBusiness, setActiveBusiness } = useBusinessContext()
  const { theme, toggleTheme } = useTheme()
  const [bizOpen, setBizOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const bizRef = useRef<HTMLDivElement>(null)
  const moreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (bizRef.current && !bizRef.current.contains(e.target as Node)) setBizOpen(false)
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href)

  const navLinkClass = (active: boolean) => cn(
    "group flex items-center gap-2 rounded-xl px-3 py-2 text-[13px] font-semibold transition-all",
    active
      ? "bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.08)]"
      : "text-zinc-400 hover:bg-white/[0.06] hover:text-white"
  )

  return (
    <header className="shrink-0 border-b border-white/[0.08] bg-[#08080B]/92 backdrop-blur-xl relative z-40">
      <div className="flex h-18 items-center gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="group flex items-center gap-3 shrink-0">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-black shadow-[0_0_35px_rgba(245,145,30,0.22)]">
            <LayoutDashboard className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-[#F5911E] ring-2 ring-[#08080B]" />
          </div>
          <div className="hidden md:block">
            <div className="text-[15px] font-black uppercase tracking-[0.18em] text-white leading-none">
              Command Center
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.26em] text-zinc-500">
              Bart OS · Business cockpit
            </div>
          </div>
        </Link>

        <div className="hidden md:block h-8 w-px bg-white/[0.08]" />

        <nav className="hidden lg:flex items-center gap-1">
          {primaryNav.map((item) => (
            <Link key={item.href} href={item.href} className={navLinkClass(isActive(item.href))}>
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          ))}

          <div className="relative" ref={moreRef}>
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className={cn(
                "flex items-center gap-1.5 rounded-xl px-3 py-2 text-[13px] font-semibold transition-all",
                moreNav.some((n) => isActive(n.href))
                  ? "bg-white text-black"
                  : "text-zinc-400 hover:bg-white/[0.06] hover:text-white"
              )}
            >
              Meer
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", moreOpen && "rotate-180")} />
            </button>
            {moreOpen && (
              <div className="absolute left-0 top-[calc(100%+8px)] z-50 w-64 overflow-hidden rounded-2xl border border-white/[0.10] bg-[#101014] shadow-2xl">
                {moreNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMoreOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 text-[13px] font-semibold transition-colors",
                      isActive(item.href) ? "bg-white text-black" : "text-zinc-400 hover:bg-white/[0.06] hover:text-white"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="flex-1" />

        <div className="relative" ref={bizRef}>
          <button
            onClick={() => setBizOpen(!bizOpen)}
            className="flex items-center gap-2.5 rounded-2xl border border-white/[0.10] bg-white/[0.04] px-3 py-2 transition-colors hover:border-[#F5911E]/40 hover:bg-white/[0.06]"
          >
            <div className={cn("flex h-8 w-8 items-center justify-center rounded-xl text-[11px] font-black", activeBusiness.color, activeBusiness.textColor)}>
              {activeBusiness.letter}
            </div>
            <div className="hidden sm:block text-left min-w-0">
              <div className="max-w-[150px] truncate text-[13px] font-bold text-white leading-tight">{activeBusiness.name}</div>
              <div className="max-w-[170px] truncate text-[10px] text-zinc-500 leading-tight">{activeBusiness.status}</div>
            </div>
            <ChevronDown className={cn("h-3.5 w-3.5 text-zinc-500 transition-transform", bizOpen && "rotate-180")} />
          </button>

          {bizOpen && (
            <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-80 overflow-hidden rounded-2xl border border-white/[0.10] bg-[#101014] shadow-2xl">
              {BUSINESSES.map((biz) => (
                <button
                  key={biz.id}
                  onClick={() => { setActiveBusiness(biz.id); setBizOpen(false) }}
                  className={cn(
                    "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors",
                    activeBusiness.id === biz.id ? "bg-white/[0.08]" : "hover:bg-white/[0.05]"
                  )}
                >
                  <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl text-xs font-black", biz.color, biz.textColor)}>
                    {biz.letter}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[14px] font-bold text-white">{biz.name}</div>
                    <div className="truncate text-[11px] text-zinc-500">{biz.focus}</div>
                  </div>
                  <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] font-bold text-zinc-400">
                    {biz.status}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={toggleTheme}
          title={theme === "dark" ? "Switch to light" : "Switch to dark"}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/[0.10] bg-white/[0.04] text-zinc-400 transition-colors hover:border-[#F5911E]/40 hover:text-white"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        <button className="hidden md:flex h-10 w-10 items-center justify-center rounded-2xl border border-white/[0.10] bg-white/[0.04] text-zinc-400 transition-colors hover:border-[#F5911E]/40 hover:text-white" title="Settings">
          <Settings className="h-4 w-4" />
        </button>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden flex h-10 w-10 items-center justify-center rounded-2xl border border-white/[0.10] bg-white/[0.04] text-zinc-300">
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="lg:hidden border-t border-white/[0.08] bg-[#08080B]/98 px-4 py-3 space-y-1">
          {[...primaryNav, ...moreNav].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={navLinkClass(isActive(item.href))}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
