"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Search, FolderOpen, Globe, CheckSquare, FileText, Lightbulb, StickyNote } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchResult {
  id: string
  title: string
  type: 'project' | 'site' | 'task' | 'content' | 'idea' | 'note' | 'domain'
  subtitle?: string
  href: string
}

const TYPE_CONFIG: Record<string, { icon: typeof Search; color: string; label: string }> = {
  project: { icon: FolderOpen, color: 'text-blue-400', label: 'Project' },
  site: { icon: Globe, color: 'text-green-400', label: 'Site' },
  task: { icon: CheckSquare, color: 'text-yellow-400', label: 'Taak' },
  content: { icon: FileText, color: 'text-purple-400', label: 'Content' },
  idea: { icon: Lightbulb, color: 'text-amber-400', label: 'Idee' },
  note: { icon: StickyNote, color: 'text-zinc-400', label: 'Notitie' },
  domain: { icon: Globe, color: 'text-emerald-400', label: 'Domein' },
}

export function CommandSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // CMD+K keyboard shortcut
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(prev => !prev)
      }
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Search when query changes (debounced)
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        if (res.ok) {
          const data = await res.json()
          setResults(data)
          setSelectedIndex(0)
        }
      } catch (err) {
        console.error('Search error:', err)
      } finally {
        setLoading(false)
      }
    }, 200)

    return () => clearTimeout(timer)
  }, [query])

  const handleSelect = useCallback((result: SearchResult) => {
    setOpen(false)
    setQuery('')
    router.push(result.href)
  }, [router])

  // Keyboard navigation
  useEffect(() => {
    if (!open) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => Math.max(prev - 1, 0))
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        handleSelect(results[selectedIndex])
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, results, selectedIndex, handleSelect])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
    >
      <div className="w-full max-w-lg bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-800">
          <Search className="h-5 w-5 text-zinc-500 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Zoek projecten, taken, sites, content..."
            className="flex-1 bg-transparent text-white placeholder:text-zinc-500 outline-none text-sm"
            autoFocus
          />
          <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] text-zinc-500 bg-zinc-800 border border-zinc-700 rounded">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[40vh] overflow-y-auto">
          {loading && (
            <div className="px-4 py-8 text-center text-sm text-zinc-500">Zoeken...</div>
          )}

          {!loading && query && results.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-zinc-500">Geen resultaten voor &ldquo;{query}&rdquo;</div>
          )}

          {!loading && results.map((result, index) => {
            const config = TYPE_CONFIG[result.type] || TYPE_CONFIG.note
            const Icon = config.icon

            return (
              <button
                key={`${result.type}-${result.id}`}
                onClick={() => handleSelect(result)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors",
                  index === selectedIndex ? "bg-[#F5911E]/10" : "hover:bg-zinc-800"
                )}
              >
                <Icon className={cn("h-4 w-4 shrink-0", config.color)} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white truncate">{result.title}</div>
                  {result.subtitle && (
                    <div className="text-xs text-zinc-500 truncate">{result.subtitle}</div>
                  )}
                </div>
                <span className="text-[10px] text-zinc-600 shrink-0">{config.label}</span>
              </button>
            )
          })}

          {!query && (
            <div className="px-4 py-6 text-center text-xs text-zinc-600">
              Begin te typen om te zoeken...
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-4 px-4 py-2 border-t border-zinc-800 text-[10px] text-zinc-600">
          <span>&#8593;&#8595; navigeren</span>
          <span>&#8629; openen</span>
          <span>esc sluiten</span>
        </div>
      </div>
    </div>
  )
}
