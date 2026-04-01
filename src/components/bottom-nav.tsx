"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, Rocket, CheckSquare, Inbox } from "lucide-react"
import { cn } from "@/lib/utils"

const bottomNavItems = [
  { href: "/", label: "Home", icon: LayoutDashboard },
  { href: "/clients", label: "Klanten", icon: Users },
  { href: "/projects", label: "Eigen", icon: Rocket },
  { href: "/tasks", label: "Taken", icon: CheckSquare },
  { href: "/inbox", label: "Inbox", icon: Inbox },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-white/10 bg-zinc-950/95 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/80">
      <div className="flex items-center justify-around h-14">
        {bottomNavItems.map((item) => {
          const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] font-medium transition-colors",
                isActive ? "text-[#F5911E]" : "text-zinc-500"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive && "text-[#F5911E]")} />
              {item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
