"use client"

import { useState, useEffect, useCallback } from "react"
import { Inbox as InboxIcon, Check, X, MessageSquare, Clock, Bot, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface InboxTask {
  id: string
  title: string
  description?: string | null
  status: string
  priority?: string | null
  assignee?: string | null
  needsApproval: boolean
  approvalSource?: string | null
  createdAt: string
  itemType: 'task'
}

interface InboxContent {
  id: string
  title: string
  body: string
  type: string
  status: string
  author: string
  targetSite?: string | null
  needsApproval: boolean
  approvalSource?: string | null
  createdAt: string
  itemType: 'content'
}

type InboxItem = InboxTask | InboxContent

type FilterTab = 'alle' | 'taken' | 'content'

const AGENT_COLORS: Record<string, string> = {
  atlas: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  forge: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  radar: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  ink: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  ledger: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  spark: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  cowork: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
  bart: 'bg-zinc-500/20 text-zinc-300 border-zinc-500/30',
  system: 'bg-zinc-500/20 text-zinc-300 border-zinc-500/30',
}

const AGENT_EMOJIS: Record<string, string> = {
  atlas: '🗺️',
  forge: '🔨',
  radar: '📡',
  ink: '✍️',
  ledger: '📊',
  spark: '⚡',
  cowork: '🤝',
  bart: '👑',
}

function timeAgo(dateStr: string): string {
  const now = new Date()
  const date = new Date(dateStr)
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'zojuist'
  if (minutes < 60) return `${minutes}m geleden`
  if (hours < 24) return `${hours}u geleden`
  if (days < 7) return `${days}d geleden`
  return date.toLocaleDateString('nl-BE', { day: 'numeric', month: 'short' })
}

export default function InboxPage() {
  const [items, setItems] = useState<InboxItem[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<FilterTab>('alle')
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [feedbackId, setFeedbackId] = useState<string | null>(null)
  const [feedbackText, setFeedbackText] = useState('')

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch('/api/inbox')
      if (res.ok) {
        const data = await res.json()
        setItems(data)
      }
    } catch (err) {
      console.error('Failed to fetch inbox:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  const filteredItems = items.filter((item) => {
    if (filter === 'alle') return true
    if (filter === 'taken') return item.itemType === 'task'
    if (filter === 'content') return item.itemType === 'content'
    return true
  })

  const handleApprove = async (item: InboxItem) => {
    setActionLoading(item.id)
    try {
      if (item.itemType === 'task') {
        await fetch(`/api/tasks/${item.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'done', needsApproval: false }),
        })
      } else {
        await fetch(`/api/content/${item.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'approved', needsApproval: false }),
        })
      }
      setItems(prev => prev.filter(i => i.id !== item.id))
    } catch (err) {
      console.error('Approve error:', err)
    } finally {
      setActionLoading(null)
    }
  }

  const handleReject = async (item: InboxItem) => {
    setActionLoading(item.id)
    try {
      if (item.itemType === 'task') {
        await fetch(`/api/tasks/${item.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'done', needsApproval: false, description: (item.description || '') + '\n[Afgewezen]' }),
        })
      } else {
        await fetch(`/api/content/${item.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'rejected', needsApproval: false }),
        })
      }
      setItems(prev => prev.filter(i => i.id !== item.id))
    } catch (err) {
      console.error('Reject error:', err)
    } finally {
      setActionLoading(null)
    }
  }

  const handleFeedback = async (item: InboxItem) => {
    if (!feedbackText.trim()) return
    setActionLoading(item.id)
    try {
      if (item.itemType === 'task') {
        await fetch(`/api/tasks/${item.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ description: (item.description || '') + `\n[Feedback]: ${feedbackText}` }),
        })
      } else {
        await fetch(`/api/content/${item.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ feedback: feedbackText }),
        })
      }
      setFeedbackId(null)
      setFeedbackText('')
      fetchItems()
    } catch (err) {
      console.error('Feedback error:', err)
    } finally {
      setActionLoading(null)
    }
  }

  const handleSnooze = async (item: InboxItem) => {
    setActionLoading(item.id)
    try {
      const snoozeDate = new Date()
      snoozeDate.setDate(snoozeDate.getDate() + 3)

      if (item.itemType === 'task') {
        await fetch(`/api/tasks/${item.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dueDate: snoozeDate.toISOString() }),
        })
      }
      // Remove from view temporarily
      setItems(prev => prev.filter(i => i.id !== item.id))
    } catch (err) {
      console.error('Snooze error:', err)
    } finally {
      setActionLoading(null)
    }
  }

  const getItemAgent = (item: InboxItem): string => {
    if (item.itemType === 'task') {
      return (item as InboxTask).approvalSource || (item as InboxTask).assignee || 'system'
    }
    return (item as InboxContent).approvalSource || (item as InboxContent).author || 'system'
  }

  const getItemDescription = (item: InboxItem): string => {
    if (item.itemType === 'task') {
      return (item as InboxTask).description || ''
    }
    const content = item as InboxContent
    return content.body ? content.body.substring(0, 200) + (content.body.length > 200 ? '...' : '') : ''
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[#F5911E]/10 rounded-lg">
            <InboxIcon className="h-6 w-6 text-[#F5911E]" />
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">Inbox</h1>
            {items.length > 0 && (
              <Badge className="bg-[#F5911E] text-white text-xs px-2 py-0.5">
                {items.length}
              </Badge>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1 mb-6 bg-zinc-900 rounded-lg p-1 w-fit">
          {(['alle', 'taken', 'content'] as FilterTab[]).map((tab) => {
            const count = tab === 'alle'
              ? items.length
              : items.filter(i => tab === 'taken' ? i.itemType === 'task' : i.itemType === 'content').length
            return (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={cn(
                  "px-4 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2",
                  filter === tab
                    ? "bg-zinc-700 text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {count > 0 && (
                  <span className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded-full",
                    filter === tab ? "bg-zinc-600 text-zinc-200" : "bg-zinc-800 text-zinc-500"
                  )}>
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-zinc-500">Laden...</div>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="p-4 bg-zinc-900 rounded-full mb-4">
              <InboxIcon className="h-10 w-10 text-zinc-600" />
            </div>
            <h3 className="text-lg font-medium text-zinc-400 mb-1">Inbox is leeg</h3>
            <p className="text-sm text-zinc-600 max-w-sm">
              Geen items die goedkeuring nodig hebben. Agents zullen hier items plaatsen wanneer ze review nodig hebben.
            </p>
          </div>
        )}

        {/* Items */}
        <div className="space-y-3">
          {filteredItems.map((item) => {
            const agent = getItemAgent(item)
            const desc = getItemDescription(item)
            const isLoading = actionLoading === item.id
            const showFeedback = feedbackId === item.id

            return (
              <Card key={item.id} className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    {/* Left: Content */}
                    <div className="flex-1 min-w-0">
                      {/* Badges Row */}
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        {/* Type Badge */}
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-[10px] font-medium",
                            item.itemType === 'task'
                              ? "border-blue-500/30 text-blue-400"
                              : "border-purple-500/30 text-purple-400"
                          )}
                        >
                          {item.itemType === 'task' ? 'Taak' : 'Content'}
                        </Badge>

                        {/* Agent Badge */}
                        <Badge
                          variant="outline"
                          className={cn("text-[10px] font-medium", AGENT_COLORS[agent] || AGENT_COLORS.system)}
                        >
                          <Bot className="h-3 w-3 mr-1" />
                          {AGENT_EMOJIS[agent] || ''} {agent.charAt(0).toUpperCase() + agent.slice(1)}
                        </Badge>

                        {/* Priority */}
                        {item.itemType === 'task' && (item as InboxTask).priority && (
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-[10px]",
                              (item as InboxTask).priority === 'high'
                                ? "border-red-500/30 text-red-400"
                                : (item as InboxTask).priority === 'medium'
                                  ? "border-yellow-500/30 text-yellow-400"
                                  : "border-zinc-600 text-zinc-500"
                            )}
                          >
                            {(item as InboxTask).priority}
                          </Badge>
                        )}

                        {/* Content type */}
                        {item.itemType === 'content' && (item as InboxContent).targetSite && (
                          <Badge variant="outline" className="text-[10px] border-zinc-700 text-zinc-500">
                            {(item as InboxContent).targetSite}
                          </Badge>
                        )}
                      </div>

                      {/* Title */}
                      <h4 className="text-sm font-medium text-white mb-1 truncate">{item.title}</h4>

                      {/* Description Preview */}
                      {desc && (
                        <p className="text-xs text-zinc-500 line-clamp-2 mb-2">{desc}</p>
                      )}

                      {/* Time */}
                      <span className="text-[10px] text-zinc-600">
                        {timeAgo(item.createdAt)}
                      </span>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex flex-col gap-1.5 shrink-0">
                      <Button
                        size="sm"
                        onClick={() => handleApprove(item)}
                        disabled={isLoading}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-7 px-2.5"
                      >
                        <Check className="h-3 w-3 mr-1" />
                        Goedkeuren
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReject(item)}
                        disabled={isLoading}
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs h-7 px-2.5"
                      >
                        <X className="h-3 w-3 mr-1" />
                        Afwijzen
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setFeedbackId(showFeedback ? null : item.id)}
                        disabled={isLoading}
                        className="border-[#F5911E]/30 text-[#F5911E] hover:bg-[#F5911E]/10 text-xs h-7 px-2.5"
                      >
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Feedback
                      </Button>
                      {item.itemType === 'task' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleSnooze(item)}
                          disabled={isLoading}
                          className="border-zinc-700 text-zinc-400 hover:bg-zinc-800 text-xs h-7 px-2.5"
                        >
                          <Clock className="h-3 w-3 mr-1" />
                          Snooze 3d
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Feedback Input */}
                  {showFeedback && (
                    <div className="mt-3 pt-3 border-t border-zinc-800 flex gap-2">
                      <input
                        type="text"
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        placeholder="Schrijf feedback..."
                        className="flex-1 bg-zinc-800 border border-zinc-700 rounded-md px-3 py-1.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#F5911E]"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleFeedback(item)
                          if (e.key === 'Escape') {
                            setFeedbackId(null)
                            setFeedbackText('')
                          }
                        }}
                      />
                      <Button
                        size="sm"
                        onClick={() => handleFeedback(item)}
                        disabled={!feedbackText.trim() || isLoading}
                        className="bg-[#F5911E] hover:bg-[#F5911E]/90 text-white text-xs h-8"
                      >
                        Verstuur
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </main>
  )
}
