"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Zap,
  DollarSign,
  ClipboardList,
  Globe,
  Bot,
  Brain,
  Settings,
  TrendingUp,
  Users,
  ChevronDown,
  Moon,
  Sun,
  Menu,
  X,
} from "lucide-react"
import { useBusinessContext, BUSINESSES } from "./nerve-shell"
import { useTheme } from "./theme-context"
import { cn } from "@/lib/utils"

// ─── Nav config ────────────────────────────────────────────────
const primaryNav = [
  { href: "/", icon: Zap, label: "Cockpit" },
  { href: "/geld", icon: DollarSign, label: "Geld" },
  { href: "/werk", icon: ClipboardList, label: "Werk" },
  { href: "/portfolio", icon: Globe, label: "Portfolio" },
  { href: "/klanten", icon: Users, label: "Klanten" },
  { href: "/agents", icon: Bot, label: "Agents" },
]

const moreNav = [
  { href: "/crypto", icon: TrendingUp, label: "Crypto" },
  { href: "/cowork", icon: Brain, label: "Cowork", accent: true },
]

// ─── TopNav ────────────────────────────────────────────────────
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
      if (bizRef.current && !bizRef.current.contains(e.target as Node)) {
        setBizOpen(false)
      }
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <header className="shrink-0 border-b border-white/[0.06] bg-zinc-900/80 backdrop-blur-md relative z-40">
      <div className="flex h-16 items-center gap-4 px-4 md:px-6">
        {/* Logo + Title */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F5911E]/15 ring-1 ring-[#F5911E]/20">
            <Zap className="h-5 w-5 text-[#F5911E]" />
          </div>
          <div className="hidden md:block">
            <div className="text-[15px] font-bold text-white leading-none">
              NERVE
            </div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider">
              Command
            </div>
          </div>
        </Link>

        {/* Divider */}
        <div className="hidden md:block h-8 w-px bg-white/[0.08]" />

        {/* Primary nav — desktop */}
        <nav className="hidden md:flex items-center gap-1">
          {primaryNav.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-2 rounded-lg px-3 py-2 text-[14px] font-medium transition-all",
                  active
                    ? "bg-[#F5911E]/10 text-[#F5911E]"
                    : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            )
          })}

          {/* More dropdown */}
          <div className="relative" ref={moreRef}>
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-2 text-[14px] font-medium transition-all",
                moreNav.some((n) => isActive(n.href))
                  ? "bg-[#F5911E]/10 text-[#F5911E]"
                  : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
              )}
            >
              Meer
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform",
                  moreOpen && "rotate-180"
                )}
              />
            </button>
            {moreOpen && (
              <div className="absolute left-0 top-[calc(100%+6px)] z-50 w-56 rounded-xl border border-white/[0.08] bg-zinc-900 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
                {moreNav.map((item) => {
                  const active = isActive(item.href)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMoreOpen(false)}
                      className={cn(
                        "flex items-center gap-2.5 px-3 py-2.5 text-[13px] font-medium transition-colors",
                        active
                          ? item.accent
                            ? "bg-cyan-500/10 text-cyan-400"
                            : "bg-[#F5911E]/10 text-[#F5911E]"
                          : item.accent
                          ? "text-cyan-500 hover:bg-cyan-500/[0.06] hover:text-cyan-400"
                          : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Business Switcher */}
        <div className="relative" ref={bizRef}>
          <button
            onClick={() => setBizOpen(!bizOpen)}
            className="flex items-center gap-2.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 transition-colors hover:border-[#F5911E]/30"
          >
            <div
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-md text-xs font-extrabold",
                activeBusiness.color,
                activeBusiness.textColor
              )}
            >
              {activeBusiness.letter}
            </div>
            <div className="hidden sm:block text-left min-w-0">
              <div className="text-[13px] font-semibold text-white leading-tight truncate max-w-[120px]">
                {activeBusiness.name}
              </div>
              <div className="text-[10px] text-zinc-500 leading-tight">
                {activeBusiness.mrr} MRR
              </div>
            </div>
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 text-zinc-500 transition-transform",
                bizOpen && "rotate-180"
              )}
            />
          </button>

          {bizOpen && (
            <div className="absolute right-0 top-[calc(100%+6px)] z-50 w-72 rounded-xl border border-white/[0.08] bg-zinc-900 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
              {BUSINESSES.map((biz) => (
                <button
                  key={biz.id}
                  onClick={() => {
                    setActiveBusiness(biz.id)
                    setBizOpen(false)
                  }}
                  className={cn(
                    "flex w-full items-center gap-2.5 px-3 py-2.5 text-left transition-colors",
                    activeBusiness.id === biz.id
                      ? "bg-[#F5911E]/10"
                      : "hover:bg-white/[0.04]"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-md text-sm font-extrabold shrink-0",
                      biz.color,
                      biz.textColor
                    )}
                  >
                    {biz.letter}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-semibold text-white truncate">
                      {biz.name}
                    </div>
                    <div className="text-[11px] text-zinc-500 truncate">
                      {biz.type}
                    </div>
                  </div>
                  <span className="text-[12px] text-zinc-400 tabular-nums shrink-0">
                    {biz.mrr}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          title={theme === "dark" ? "Switch to light" : "Switch to dark"}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-zinc-400 transition-colors hover:border-[#F5911E]/30 hover:text-white"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </button>

        {/* Settings — desktop */}
        <button
          className="hidden md:flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-zinc-400 transition-colors hover:border-[#F5911E]/30 hover:text-white"
          title="Settings"
        >
          <Settings className="h-4 w-4" />
        </button>

        {/* Avatar */}
        <div className="hidden md:flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#F5911E]/40 bg-[#F5911E]/10 text-[12px] font-bold text-[#F5911E] cursor-pointer">
          BD
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-zinc-300"
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-white/[0.06] bg-zinc-900/95 px-4 py-3 space-y-1">
          {[...primaryNav, ...moreNav].map((item) => {
            const active = isActive(item.href)
            const isAccent = "accent" in item && item.accent
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] font-medium transition-colors",
                  active
                    ? isAccent
                      ? "bg-cyan-500/10 text-cyan-400"
                      : "bg-[#F5911E]/10 text-[#F5911E]"
                    : "text-zinc-300 hover:bg-white/[0.04]"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      )}
    </header>
  )
}
