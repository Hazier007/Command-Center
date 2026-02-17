"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Users, DollarSign, Bell } from "lucide-react"

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

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/projects", label: "Projects" },
  { href: "/sites", label: "Sites" },
  { href: "/ideas", label: "Ideas" },
  { href: "/tasks", label: "Tasks" },
  { href: "/team", label: "Team", icon: Users },
  { href: "/alerts", label: "Alerts", icon: Bell },
  { href: "/notes", label: "Notes" },
  { href: "/adsense", label: "AdSense", icon: DollarSign },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-14 items-center justify-between">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-semibold text-lg">Command Center</span>
            <Badge variant="secondary">v0</Badge>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={pathname === item.href ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "text-sm",
                    pathname === item.href && "bg-orange-500 text-white hover:bg-orange-600 dark:bg-orange-600 dark:text-white"
                  )}
                >
                  {item.icon && <item.icon className="h-4 w-4 mr-1" />}
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px] sm:w-[240px]">
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col space-y-2">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <Button
                        variant={pathname === item.href ? "default" : "ghost"}
                        className={cn(
                          "w-full justify-start",
                          pathname === item.href && "bg-orange-500 text-white hover:bg-orange-600 dark:bg-orange-600 dark:text-white"
                        )}
                      >
                        {item.icon && <item.icon className="h-4 w-4 mr-2" />}
                        {item.label}
                      </Button>
                    </Link>
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