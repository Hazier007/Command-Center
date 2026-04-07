"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Search, FolderOpen, Globe, CheckSquare, FileText, Lightbulb, StickyNote, ArrowRight, Gavel } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchResult {
  id: string
  title: string
  type: 'project' | 'site' | 'task' | 'content' | 'idea' | 'note' | 'domain' | 'decision'
  subtitle?: string
  href: string
}

const TYPE_CONFIG: Record<string, { icon: typeof Search; color: string; bg: string; label: string }> = {
  project:  { icon: FolderOpen,  color: 'text-blue-400',    bg: 'bg-blue-500/10',    label: 'Project' },
  site:     { icon: Globe,       color: 'text-green-400',   bg: 'bg-green-500/10',   label: 'Site' },
  task:     { icon: CheckSquare, color: 'text-yellow-400',  bg: 'bg-yellow-500/10',  label: 'Taak' },
  content:  { icon: FileText,    color: 'text-purple-400',  bg: 'bg-purple-500/10',  label: 'Content' },
  idea:     { icon: Lightbulb,   color: 'text-amber-400',   bg: 'bg-amber-500/10',   label: 'Idee' },
  note:     { icon: StickyNote,  color: 'text-zinc-400',    bg: 'bg-zinc-500/10',    label: 'Notitie' },
  domain:   { icon: Globe,       color: 'text-emerald-400', bg: 'bg-emerald-500/10', label: 'Domein' },
  decision: { icon: Gavel,       color: 'text-orange-400',  bg: 'bg-orange-500/10',  label: 'Decision' },
}

export function CommandSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(prev => !prev)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (!query.trim()) { setResults([]); return }
    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        if (res.ok) { const data = await res.json(); setResults(data); setSelectedIndex(0) }
      } catch {} finally { setLoading(false) }
    }, 200)
    return () => clearTimeout(timer)
  }, [query])

  const handleSelect = useCallback((result: SearchResult) => {
    setOpen(false); setQuery(''); router.push(result.href)
  }, [router])

  useEffect(() => {
    if (!open) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIndex(prev => Math.min(prev + 1, results.length - 1)) }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIndex(prev => Math.max(prev - 1, 0)) }
      else if (e.key === 'Enter' && results[selectedIndex]) handleSelect(results[selectedIndex])
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, results, selectedIndex, handleSelect])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] bg-black/70 backdrop-blur-md"
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
    >
      <div className="w-full max-w-lg rounded-2xl border border-white/[0.08] bg-zinc-900/95 shadow-2xl shadow-black/50 overflow-hidden cc-animate-in">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
          <Search className="h-5 w-5 text-zinc-600 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Zoek projecten, taken, sites, content..."
            className="flex-1 bg-transparent text-white placeholder:text-zinc-600 outline-none text-sm"
            autoFocus
          />
          <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 text-[10px] text-zinc-600 bg-white/[0.04] border border-white/[0.08] rounded-md font-mono">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[40vh] overflow-y-auto">
          {loading && (
            <div className="px-5 py-10 text-center text-sm text-zinc-600">
              <div className="inline-block h-4 w-4 rounded-full border-2 border-zinc-700 border-t-[#F5911E] animate-spin" />
            </div>
          )}

          {!loading && query && results.length === 0 && (
            <div className="px-5 py-10 text-center text-sm text-zinc-600">
              Geen resultaten voor &ldquo;{query}&rdquo;
            </div>
          )}

          {!loading && results.map((result, index) => {
            const config = TYPE_CONFIG[result.type] || TYPE_CONFIG.note
            const Icon = config.icon
            return (
              <button
                key={`${result.type}-${result.id}`}
                onClick={() => handleSelect(result)}
                className={cn(
                  "w-full flex items-center gap-3 px-5 py-3 text-left transition-all",
                  index === selectedIndex ? "bg-[#F5911E]/[0.07]" : "hover:bg-white/[0.03]"
                )}
              >
                <div className={cn("rounded-lg p-1.5 shrink-0", config.bg)}>
                  <Icon className={cn("h-3.5 w-3.5", config.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white truncate">{result.title}</div>
                  {result.subtitle && (
                    <div className="text-[11px] text-zinc-600 truncate">{result.subtitle}</div>
                  )}
                </div>
                <ArrowRight className={cn(
                  "h-3 w-3 shrink-0 transition-opacity",
                  index === selectedIndex ? "text-[#F5911E] opacity-100" : "opacity-0"
                )} />
              </button>
            )
          })}

          {!query && (
            <div className="px-5 py-8 text-center text-[12px] text-zinc-700">
              Begin te typen om te zoeken...
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-4 px-5 py-2.5 border-t border-white/[0.06] text-[10px] text-zinc-700">
          <span className="flex items-center gap-1"><kbd className="rounded bg-white/[0.05] px-1 py-0.5 font-mono">↑↓</kbd> navigeren</span>
          <span className="flex items-center gap-1"><kbd className="rounded bg-white/[0.05] px-1 py-0.5 font-mono">↵</kbd> openen</span>
          <span className="flex items-center gap-1"><kbd className="rounded bg-white/[0.05] px-1 py-0.5 font-mono">esc</kbd> sluiten</span>
        </div>
      </div>
    </div>
  )
}
