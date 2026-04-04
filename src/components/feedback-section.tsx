"use client"

import { useState, useEffect } from "react"
import { MessageSquare, Plus, ThumbsUp, ThumbsDown, Minus, AlertCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface FeedbackNote {
  id: string
  title: string
  content: string
  agentId?: string
  noteType?: string
  sentiment?: string
  actionNeeded: boolean
  tags: string[]
  createdAt: string
}

interface FeedbackSectionProps {
  // Which entity this feedback is for
  linkedField: "linkedProjectId" | "linkedIdeaId" | "linkedTaskId" | "linkedSiteId" | "linkedContentId" | "linkedSprintId"
  linkedId: string
  // Optional: also show analysis and lesson-learned notes
  showAllTypes?: boolean
}

const sentimentConfig: Record<string, { icon: typeof ThumbsUp; color: string; label: string }> = {
  positive: { icon: ThumbsUp, color: "text-green-400", label: "Positief" },
  negative: { icon: ThumbsDown, color: "text-red-400", label: "Negatief" },
  neutral: { icon: Minus, color: "text-gray-400", label: "Neutraal" },
  mixed: { icon: AlertCircle, color: "text-yellow-400", label: "Gemengd" },
}

export function FeedbackSection({ linkedField, linkedId, showAllTypes = false }: FeedbackSectionProps) {
  const [notes, setNotes] = useState<FeedbackNote[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    sentiment: "neutral",
    actionNeeded: false,
    noteType: "feedback",
    agentId: "bart",
    tags: "",
  })

  useEffect(() => {
    loadNotes()
  }, [linkedId])

  const loadNotes = async () => {
    const noteTypes = showAllTypes ? "" : "feedback"
    const params = new URLSearchParams()
    params.set(linkedField, linkedId)
    if (noteTypes) params.set("noteType", noteTypes)

    const res = await fetch(`/api/notes?${params.toString()}`)
    if (res.ok) {
      const data = await res.json()
      setNotes(data)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formData.title,
        content: formData.content,
        noteType: formData.noteType,
        agentId: formData.agentId,
        sentiment: formData.sentiment,
        actionNeeded: formData.actionNeeded,
        tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
        [linkedField]: linkedId,
      }),
    })

    await loadNotes()
    setShowForm(false)
    setFormData({ title: "", content: "", sentiment: "neutral", actionNeeded: false, noteType: "feedback", agentId: "bart", tags: "" })
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Feedback & Notes ({notes.length})
          </CardTitle>
          <Button variant="outline" size="sm" onClick={() => setShowForm(!showForm)}>
            <Plus className="mr-1 h-3 w-3" /> Feedback
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {showForm && (
          <form onSubmit={handleSubmit} className="space-y-3 p-3 border rounded-lg bg-muted/30">
            <Input
              placeholder="Titel"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <Textarea
              placeholder="Feedback, analyse of observatie..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={3}
              required
            />
            <div className="grid grid-cols-4 gap-2">
              <Select value={formData.noteType} onValueChange={(v) => setFormData({ ...formData, noteType: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="feedback">Feedback</SelectItem>
                  <SelectItem value="analysis">Analyse</SelectItem>
                  <SelectItem value="lesson-learned">Lesson Learned</SelectItem>
                  <SelectItem value="blocker">Blocker</SelectItem>
                  <SelectItem value="general">Notitie</SelectItem>
                </SelectContent>
              </Select>
              <Select value={formData.sentiment} onValueChange={(v) => setFormData({ ...formData, sentiment: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="positive">Positief</SelectItem>
                  <SelectItem value="negative">Negatief</SelectItem>
                  <SelectItem value="neutral">Neutraal</SelectItem>
                  <SelectItem value="mixed">Gemengd</SelectItem>
                </SelectContent>
              </Select>
              <Select value={formData.agentId} onValueChange={(v) => setFormData({ ...formData, agentId: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="bart">Bart</SelectItem>
                  <SelectItem value="atlas">ATLAS</SelectItem>
                  <SelectItem value="forge">FORGE</SelectItem>
                  <SelectItem value="radar">RADAR</SelectItem>
                  <SelectItem value="ink">INK</SelectItem>
                  <SelectItem value="ledger">LEDGER</SelectItem>
                  <SelectItem value="spark">SPARK</SelectItem>
                </SelectContent>
              </Select>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.actionNeeded}
                  onChange={(e) => setFormData({ ...formData, actionNeeded: e.target.checked })}
                  className="rounded"
                />
                Actie nodig
              </label>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Tags (komma-gescheiden)"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="flex-1"
              />
              <Button type="submit" size="sm">Opslaan</Button>
              <Button type="button" variant="ghost" size="sm" onClick={() => setShowForm(false)}>Annuleer</Button>
            </div>
          </form>
        )}

        {notes.length === 0 && !showForm ? (
          <p className="text-sm text-muted-foreground text-center py-4">Nog geen feedback of notities.</p>
        ) : (
          notes.map((note) => {
            const sentConf = note.sentiment ? sentimentConfig[note.sentiment] : null
            const SentIcon = sentConf?.icon
            return (
              <div key={note.id} className="p-3 border rounded-lg space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {SentIcon && <SentIcon className={`h-3 w-3 ${sentConf.color}`} />}
                    <span className="text-sm font-medium">{note.title}</span>
                    {note.actionNeeded && (
                      <Badge variant="destructive" className="text-[10px] px-1 py-0">Actie</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {note.noteType && <Badge variant="outline" className="text-[10px]">{note.noteType}</Badge>}
                    {note.agentId && <span>{note.agentId}</span>}
                    <span>{new Date(note.createdAt).toLocaleDateString("nl-BE")}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{note.content}</p>
                {note.tags && note.tags.length > 0 && (
                  <div className="flex gap-1">
                    {note.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
                    ))}
                  </div>
                )}
              </div>
            )
          })
        )}
      </CardContent>
    </Card>
  )
}
