"use client"

import { useState, useEffect, useCallback } from "react"
import { Plus, X, Lightbulb, CheckSquare, Globe, FileText, StickyNote, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const CAPTURE_TYPES = [
  { value: 'idea', label: 'Idee', icon: Lightbulb, color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
  { value: 'task', label: 'Taak', icon: CheckSquare, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
  { value: 'domain', label: 'Domein', icon: Globe, color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20' },
  { value: 'content', label: 'Content', icon: FileText, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
  { value: 'note', label: 'Notitie', icon: StickyNote, color: 'text-zinc-400', bg: 'bg-zinc-500/10 border-zinc-500/20' },
] as const

export function QuickCapture() {
  const [open, setOpen] = useState(false)
  const [type, setType] = useState<string>('idea')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.code === 'Space') {
        e.preventDefault()
        setOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleSave = useCallback(async () => {
    if (!title.trim()) return
    setSaving(true)
    try {
      let endpoint = ''
      let body: Record<string, unknown> = {}
      switch (type) {
        case 'idea':    endpoint = '/api/ideas';   body = { title, description, category: 'feature', priority: 'medium' }; break
        case 'task':    endpoint = '/api/tasks';   body = { title, description, status: 'todo', priority: 'medium' }; break
        case 'domain':  endpoint = '/api/domains'; body = { domain: title, notes: description, status: 'parking', priority: 'medium' }; break
        case 'content': endpoint = '/api/content'; body = { title, body: description || '', type: 'article', status: 'draft', author: 'bart' }; break
        case 'note':    endpoint = '/api/notes';   body = { title, content: description || '' }; break
      }
      await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      setSaved(true)
      setTimeout(() => { setOpen(false); setTitle(''); setDescription(''); setType('idea'); setSaved(false) }, 800)
    } catch (err) { console.error('Quick capture error:', err) }
    finally { setSaving(false) }
  }, [title, description, type])

  const activeType = CAPTURE_TYPES.find(t => t.value === type)!

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50",
          "h-12 w-12 rounded-xl",
          "bg-[#F5911E] hover:bg-[#e5820f] text-white",
          "shadow-lg shadow-[#F5911E]/20 hover:shadow-[#F5911E]/30",
          "flex items-center justify-center transition-all hover:scale-105 active:scale-95",
          open && "hidden"
        )}
      >
        <Plus className="h-5 w-5" />
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-[90] flex items-end md:items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-zinc-900/95 shadow-2xl overflow-hidden cc-animate-in">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <div className={cn("rounded-lg p-1.5 border", activeType.bg)}>
                  <activeType.icon className={cn("h-3.5 w-3.5", activeType.color)} />
                </div>
                <span className="text-sm font-semibold text-white">Quick Capture</span>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-lg p-1.5 text-zinc-600 hover:text-white hover:bg-white/[0.05] transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>

            {saved ? (
              <div className="p-10 text-center cc-animate-in">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 mb-3">
                  <Check className="h-6 w-6 text-emerald-400" />
                </div>
                <p className="text-white font-medium">Opgeslagen!</p>
              </div>
            ) : (
              <div className="p-5 space-y-4">
                {/* Type selector */}
                <div className="flex gap-1">
                  {CAPTURE_TYPES.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setType(t.value)}
                      className={cn(
                        "flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] font-medium transition-all",
                        type === t.value
                          ? cn(t.bg, "shadow-sm")
                          : "border-transparent text-zinc-600 hover:text-zinc-300 hover:bg-white/[0.04]"
                      )}
                    >
                      <t.icon className={cn("h-3 w-3", type === t.value ? t.color : "")} />
                      {t.label}
                    </button>
                  ))}
                </div>

                <Input
                  placeholder={type === 'domain' ? 'domein.be' : 'Titel...'}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-white/[0.03] border-white/[0.08] text-white placeholder:text-zinc-600 focus:border-[#F5911E]/30 focus:ring-[#F5911E]/10"
                  autoFocus
                />

                <Textarea
                  placeholder="Beschrijving (optioneel)..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-white/[0.03] border-white/[0.08] text-white placeholder:text-zinc-600 resize-none focus:border-[#F5911E]/30 focus:ring-[#F5911E]/10"
                  rows={3}
                />

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-zinc-700 font-mono">⌘⇧Space</span>
                  <Button
                    onClick={handleSave}
                    disabled={!title.trim() || saving}
                    className="bg-[#F5911E] hover:bg-[#e5820f] text-white border-0 shadow-sm"
                    size="sm"
                  >
                    {saving ? 'Opslaan...' : 'Opslaan'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
