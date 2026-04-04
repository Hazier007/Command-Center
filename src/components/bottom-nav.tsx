"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, Globe, CheckSquare, Inbox } from "lucide-react"
import { cn } from "@/lib/utils"

const bottomNavItems = [
  { href: "/", label: "Home", icon: LayoutDashboard },
  { href: "/clients", label: "Klanten", icon: Users },
  { href: "/sites", label: "Websites", icon: Globe },
  { href: "/tasks", label: "Taken", icon: CheckSquare },
  { href: "/inbox", label: "Inbox", icon: Inbox },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-white/[0.06] bg-zinc-950/95 backdrop-blur-xl">
      <div className="flex items-center justify-around h-14">
        {bottomNavItems.map((item) => {
          const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center gap-0.5 px-3 py-1.5 text-[10px] font-medium transition-all",
                isActive ? "text-[#F5911E]" : "text-zinc-600"
              )}
            >
              {isActive && (
                <span className="absolute -top-[1px] left-1/2 -translate-x-1/2 h-[2px] w-6 rounded-full bg-[#F5911E]" />
              )}
              <item.icon className={cn("h-5 w-5 transition-transform", isActive && "scale-105")} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
