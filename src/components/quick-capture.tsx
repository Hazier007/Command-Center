"use client"

import { useState, useEffect, useCallback } from "react"
import { Plus, X, Lightbulb, CheckSquare, Globe, FileText, StickyNote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const CAPTURE_TYPES = [
  { value: 'idea', label: 'Idee', icon: Lightbulb, color: 'text-yellow-400' },
  { value: 'task', label: 'Taak', icon: CheckSquare, color: 'text-blue-400' },
  { value: 'domain', label: 'Domein', icon: Globe, color: 'text-green-400' },
  { value: 'content', label: 'Content', icon: FileText, color: 'text-purple-400' },
  { value: 'note', label: 'Notitie', icon: StickyNote, color: 'text-zinc-400' },
] as const

export function QuickCapture() {
  const [open, setOpen] = useState(false)
  const [type, setType] = useState<string>('idea')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  // Cmd+Shift+Space keyboard shortcut
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
        case 'idea':
          endpoint = '/api/ideas'
          body = { title, description, category: 'feature', priority: 'medium' }
          break
        case 'task':
          endpoint = '/api/tasks'
          body = { title, description, status: 'todo', priority: 'medium' }
          break
        case 'domain':
          endpoint = '/api/domains'
          body = { domain: title, notes: description, status: 'parking', priority: 'medium' }
          break
        case 'content':
          endpoint = '/api/content'
          body = { title, body: description || '', type: 'article', status: 'draft', author: 'bart' }
          break
        case 'note':
          endpoint = '/api/notes'
          body = { title, content: description || '' }
          break
      }

      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      setSaved(true)
      setTimeout(() => {
        setOpen(false)
        setTitle('')
        setDescription('')
        setType('idea')
        setSaved(false)
      }, 1000)
    } catch (err) {
      console.error('Quick capture error:', err)
    } finally {
      setSaving(false)
    }
  }, [title, description, type])

  return (
    <>
      {/* FAB Button */}
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 w-14 h-14 rounded-full",
          "bg-[#F5911E] hover:bg-[#F5911E]/90 text-white shadow-lg shadow-[#F5911E]/25",
          "flex items-center justify-center transition-all hover:scale-105",
          open && "hidden"
        )}
      >
        <Plus className="h-6 w-6" />
      </button>

      {/* Modal Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
              <h3 className="text-sm font-semibold text-white">Quick Capture</h3>
              <button onClick={() => setOpen(false)} className="text-zinc-500 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>

            {saved ? (
              <div className="p-8 text-center">
                <div className="text-3xl mb-2">&#x2705;</div>
                <p className="text-white font-medium">Opgeslagen!</p>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {/* Type Selector */}
                <div className="flex gap-1">
                  {CAPTURE_TYPES.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setType(t.value)}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                        type === t.value
                          ? "bg-zinc-700 text-white"
                          : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"
                      )}
                    >
                      <t.icon className={cn("h-3.5 w-3.5", type === t.value && t.color)} />
                      {t.label}
                    </button>
                  ))}
                </div>

                {/* Title */}
                <Input
                  placeholder={type === 'domain' ? 'domein.be' : 'Titel...'}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                  autoFocus
                />

                {/* Description */}
                <Textarea
                  placeholder="Beschrijving (optioneel)..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white resize-none"
                  rows={3}
                />

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-zinc-600">Ctrl+Shift+Space</span>
                  <Button
                    onClick={handleSave}
                    disabled={!title.trim() || saving}
                    className="bg-[#F5911E] hover:bg-[#F5911E]/90 text-white"
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
