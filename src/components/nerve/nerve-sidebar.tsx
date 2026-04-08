"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Zap, DollarSign, ClipboardList, Globe, Bot, Brain, Settings, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", icon: Zap, label: "Cockpit", accent: false },
  { href: "/geld", icon: DollarSign, label: "Geld", accent: false },
  { href: "/werk", icon: ClipboardList, label: "Werk", accent: false },
  { href: "/portfolio", icon: Globe, label: "Portfolio", accent: false },
  { href: "/agents", icon: Bot, label: "Agents", accent: false },
  { href: "/crypto", icon: TrendingUp, label: "Crypto", accent: false },
]

const coworkItem = { href: "/cowork", icon: Brain, label: "Cowork", accent: true }

export function NerveSidebar() {
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <aside className="flex w-16 flex-col items-center border-r border-white/[0.06] bg-zinc-900/80 py-3 gap-1">
      {/* Logo */}
      <Link
        href="/"
        className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#F5911E]/15 ring-1 ring-[#F5911E]/20"
      >
        <Zap className="h-4 w-4 text-[#F5911E]" />
      </Link>

      {/* Main nav */}
      {navItems.map((item) => {
        const active = isActive(item.href)
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "group relative flex h-11 w-11 flex-col items-center justify-center rounded-lg transition-all duration-150",
              active
                ? "bg-[#F5911E]/10 text-[#F5911E]"
                : "text-zinc-600 hover:bg-white/[0.04] hover:text-zinc-400"
            )}
          >
            {active && (
              <div className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r bg-[#F5911E]" />
            )}
            <item.icon className="h-[18px] w-[18px]" />
            <span className="mt-0.5 text-[8px] font-medium tracking-wide">
              {item.label}
            </span>
          </Link>
        )
      })}

      {/* Divider */}
      <div className="my-2 h-px w-8 bg-white/[0.06]" />

      {/* Cowork */}
      <Link
        href={coworkItem.href}
        className={cn(
          "group relative flex h-11 w-11 flex-col items-center justify-center rounded-lg transition-all duration-150",
          isActive(coworkItem.href)
            ? "bg-cyan-500/10 text-cyan-400"
            : "text-cyan-700 hover:bg-cyan-500/[0.06] hover:text-cyan-500"
        )}
      >
        {isActive(coworkItem.href) && (
          <div className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r bg-cyan-400" />
        )}
        <coworkItem.icon className="h-[18px] w-[18px]" />
        <span className="mt-0.5 text-[8px] font-medium tracking-wide">
          {coworkItem.label}
        </span>
      </Link>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Settings */}
      <button className="flex h-11 w-11 items-center justify-center rounded-lg text-zinc-600 transition-colors hover:bg-white/[0.04] hover:text-zinc-400">
        <Settings className="h-4 w-4" />
      </button>
    </aside>
  )
}
