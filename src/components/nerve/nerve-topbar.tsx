"use client"

import { useState, useRef, useEffect } from "react"
import { Search, Inbox, Plus, ChevronDown } from "lucide-react"
import { useBusinessContext, BUSINESSES, type BusinessId } from "./nerve-shell"
import { cn } from "@/lib/utils"

export function NerveTopbar() {
  const { activeBusiness, setActiveBusiness } = useBusinessContext()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-white/[0.06] bg-zinc-900/60 px-4">
      {/* Business Switcher */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 transition-colors hover:border-[#F5911E]/30 min-w-[180px]"
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
          <div className="flex-1 text-left min-w-0">
            <div className="text-[13px] font-semibold text-white truncate">
              {activeBusiness.name}
            </div>
            <div className="text-[10px] text-zinc-500 truncate">
              {activeBusiness.type}
            </div>
          </div>
          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 text-zinc-500 transition-transform",
              dropdownOpen && "rotate-180"
            )}
          />
        </button>

        {/* Dropdown */}
        {dropdownOpen && (
          <div className="absolute left-0 top-[calc(100%+6px)] z-50 w-64 rounded-xl border border-white/[0.08] bg-zinc-900 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
            {BUSINESSES.map((biz) => (
              <button
                key={biz.id}
                onClick={() => {
                  setActiveBusiness(biz.id)
                  setDropdownOpen(false)
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
                    "flex h-7 w-7 items-center justify-center rounded-md text-xs font-extrabold shrink-0",
                    biz.color,
                    biz.textColor
                  )}
                >
                  {biz.letter}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold text-white truncate">
                    {biz.name}
                  </div>
                  <div className="text-[10px] text-zinc-500 truncate">
                    {biz.type}
                  </div>
                </div>
                <span className="text-[11px] text-zinc-500 tabular-nums shrink-0">
                  {biz.mrr}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Command Bar */}
      <div className="relative flex-1 max-w-lg">
        <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-600" />
        <input
          type="text"
          placeholder="Zoek projecten, taken, sites, ideeën..."
          className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] py-2 pl-9 pr-14 text-[13px] text-white placeholder-zinc-600 outline-none transition-colors focus:border-[#F5911E]/40 focus:ring-1 focus:ring-[#F5911E]/20"
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-white/[0.08] bg-white/[0.03] px-1.5 py-0.5 text-[10px] text-zinc-600 font-mono">
          ⌘K
        </kbd>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 ml-auto">
        <button className="flex items-center gap-1.5 rounded-lg bg-[#F5911E] px-3 py-1.5 text-[12px] font-semibold text-black transition-all hover:brightness-110 active:scale-[0.98]">
          <Plus className="h-3.5 w-3.5" />
          Capture
        </button>

        <button className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[12px] text-zinc-400 transition-colors hover:border-[#F5911E]/30 hover:text-white">
          <Inbox className="h-3.5 w-3.5" />
          Inbox
          <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
            4
          </span>
        </button>

        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#F5911E]/40 bg-[#F5911E]/10 text-[12px] font-bold text-[#F5911E] cursor-pointer">
          BD
        </div>
      </div>
    </header>
  )
}
