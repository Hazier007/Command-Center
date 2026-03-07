"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { CheckCircle, RotateCcw, Lightbulb, Send } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { DataInitializer } from "@/components/data-initializer"
import { LoadingState } from "@/components/ui/loading-spinner"
import { ErrorState } from "@/components/ui/error-state"
import {
  tasksStorage,
  ideasStorage,
  sitesStorage,
  projectsStorage,
  type Task,
  type Idea,
  type Site,
} from "@/lib/storage"

// ── helpers ────────────────────────────────────────────────────────────────

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60_000)
  if (m < 1) return "zonet"
  if (m < 60) return `${m}m geleden`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}u geleden`
  const d = Math.floor(h / 24)
  return `${d}d geleden`
}

const PRIORITY_LABEL: Record<string, string> = { high: "Hoog", medium: "Medium", low: "Laag" }
const PRIORITY_CLASS: Record<string, string> = {
  high: "bg-red-500/15 text-red-400 border-red-500/30",
  medium: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  low: "bg-zinc-700 text-zinc-300 border-zinc-600",
}

const AGENTS: { key: string; label: string; emoji: string }[] = [
  { key: "lisa", label: "Lisa", emoji: "📋" },
  { key: "jc", label: "JC", emoji: "🥊" },
  { key: "wout", label: "Wout", emoji: "🔭" },
  { key: "copycat", label: "Copycat", emoji: "✍️" },
]

// ── stat card ──────────────────────────────────────────────────────────────

function StatCard({
  label,
  count,
  href,
  accent,
}: {
  label: string
  count: number
  href: string
  accent?: boolean
}) {
  return (
    <Link href={href} className="block">
      <Card
        className={`cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg border ${
          accent
            ? "border-[#F5911E]/40 bg-[#F5911E]/5 hover:bg-[#F5911E]/10"
            : "border-zinc-800 hover:border-zinc-700 bg-zinc-900/60"
        }`}
      >
        <CardContent className="p-5">
          <div
            className={`text-3xl font-bold tabular-nums ${accent ? "text-[#F5911E]" : "text-white"}`}
          >
            {count}
          </div>
          <div className="mt-1 text-sm text-zinc-400">{label}</div>
        </CardContent>
      </Card>
    </Link>
  )
}

// ── main component ─────────────────────────────────────────────────────────

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [sites, setSites] = useState<Site[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // idea form
  const [ideaTitle, setIdeaTitle] = useState("")
  const [ideaDescription, setIdeaDescription] = useState("")
  const [ideaSubmitting, setIdeaSubmitting] = useState(false)
  const [ideaSuccess, setIdeaSuccess] = useState(false)

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      const [tasksData, ideasData, sitesData] = await Promise.all([
        tasksStorage.getAll(),
        ideasStorage.getAll(),
        sitesStorage.getAll(),
      ])
      setTasks(tasksData)
      setIdeas(ideasData)
      setSites(sitesData)
    } catch (err) {
      console.error("Failed to load dashboard:", err)
      setError("Kon dashboard niet laden. Controleer de database.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  // derived counts
  const reviewQueue = tasks.filter((t) => t.assignee === "bart" && t.status === "review")
  const openTasks = tasks.filter((t) => t.status === "todo" || t.status === "in-progress")
  const liveSites = sites.filter((s) => s.status === "live")
  const doneTasks = tasks
    .filter((t) => t.status === "done")
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5)

  // site lookup for task cards
  const siteMap = Object.fromEntries(sites.map((s) => [s.id, s.domain]))

  const handleApprove = async (task: Task) => {
    await tasksStorage.update(task.id, { status: "done" })
    await loadData()
  }

  const handleReturn = async (task: Task) => {
    await tasksStorage.update(task.id, { status: "todo" })
    await loadData()
  }

  const handleIdeaSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!ideaTitle.trim()) return
    setIdeaSubmitting(true)
    try {
      await ideasStorage.create({
        title: ideaTitle.trim(),
        description: ideaDescription.trim(),
        category: "feature",
        priority: "medium",
      })
      setIdeaTitle("")
      setIdeaDescription("")
      setIdeas(await ideasStorage.getAll())
      setIdeaSuccess(true)
      setTimeout(() => setIdeaSuccess(false), 3000)
    } catch (err) {
      console.error("Failed to create idea:", err)
    } finally {
      setIdeaSubmitting(false)
    }
  }

  if (loading) return <LoadingState message="Command Center laden..." fullScreen />
  if (error) return <ErrorState message={error} onRetry={loadData} fullScreen />

  const today = new Date().toLocaleDateString("nl-BE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <>
      <DataInitializer />
      <div className="min-h-screen bg-zinc-950 text-white">
        <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-10 flex flex-col gap-8">

          {/* header */}
          <header className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Command Center{" "}
                <span className="text-[#F5911E]">·</span> Bart
              </h1>
              <p className="mt-0.5 text-sm text-zinc-500 capitalize">{today}</p>
            </div>
          </header>

          {/* TOP ROW — stat cards */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <StatCard
              label="Wacht op mij"
              count={reviewQueue.length}
              href="/tasks?status=review&assignee=bart"
              accent
            />
            <StatCard label="Open taken" count={openTasks.length} href="/tasks" />
            <StatCard label="Nieuwe ideeën" count={ideas.length} href="/ideas" />
            <StatCard label="Sites live" count={liveSites.length} href="/sites" />
          </div>

          {/* SECOND ROW */}
          <div className="grid gap-6 md:grid-cols-2">

            {/* Review queue */}
            <Card className="border-zinc-800 bg-zinc-900/60">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold text-white">
                    Mijn review queue
                  </CardTitle>
                  {reviewQueue.length > 0 && (
                    <Badge className="bg-[#F5911E]/15 text-[#F5911E] border border-[#F5911E]/30 text-xs">
                      {reviewQueue.length}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {reviewQueue.length === 0 ? (
                  <p className="py-6 text-center text-sm text-zinc-500">
                    ✅ Niks te reviewen — alles loopt!
                  </p>
                ) : (
                  <>
                    {reviewQueue.slice(0, 5).map((task) => (
                      <div
                        key={task.id}
                        className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-3 space-y-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-sm font-medium leading-5 text-white">
                            {task.title}
                          </span>
                          {task.priority && (
                            <span
                              className={`shrink-0 rounded-full border px-2 py-0.5 text-xs ${
                                PRIORITY_CLASS[task.priority] ?? PRIORITY_CLASS.low
                              }`}
                            >
                              {PRIORITY_LABEL[task.priority] ?? task.priority}
                            </span>
                          )}
                        </div>
                        {task.siteId && siteMap[task.siteId] && (
                          <p className="text-xs text-zinc-500">{siteMap[task.siteId]}</p>
                        )}
                        <div className="flex gap-2 pt-1">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-500 text-white border-0 h-7 text-xs"
                            onClick={() => handleApprove(task)}
                          >
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Goedkeuren
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 h-7 text-xs"
                            onClick={() => handleReturn(task)}
                          >
                            <RotateCcw className="mr-1 h-3 w-3" />
                            Terugsturen
                          </Button>
                        </div>
                      </div>
                    ))}
                    {reviewQueue.length > 5 && (
                      <Link
                        href="/tasks?status=review&assignee=bart"
                        className="block pt-1 text-xs text-[#F5911E] hover:underline"
                      >
                        Bekijk alle {reviewQueue.length} →
                      </Link>
                    )}
                  </>
                )}
              </CardContent>
            </Card>

            {/* Quick idea drop */}
            <Card className="border-zinc-800 bg-zinc-900/60">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-[#F5911E]" />
                  Snel idee droppen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleIdeaSubmit} className="space-y-3">
                  <Input
                    placeholder="Titel van het idee..."
                    value={ideaTitle}
                    onChange={(e) => setIdeaTitle(e.target.value)}
                    className="bg-zinc-950 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#F5911E]/60"
                    required
                  />
                  <Textarea
                    placeholder="Beschrijving (optioneel)..."
                    value={ideaDescription}
                    onChange={(e) => setIdeaDescription(e.target.value)}
                    className="bg-zinc-950 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#F5911E]/60 resize-none"
                    rows={3}
                  />
                  <div className="flex items-center gap-3">
                    <Button
                      type="submit"
                      disabled={ideaSubmitting || !ideaTitle.trim()}
                      className="bg-[#F5911E] hover:bg-[#e07d10] text-white border-0"
                      size="sm"
                    >
                      <Send className="mr-1.5 h-3.5 w-3.5" />
                      {ideaSubmitting ? "Opslaan..." : "Opslaan"}
                    </Button>
                    {ideaSuccess && (
                      <span className="text-xs text-green-400">Idee opgeslagen!</span>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* THIRD ROW */}
          <div className="grid gap-6 md:grid-cols-2">

            {/* Team bezig met... */}
            <Card className="border-zinc-800 bg-zinc-900/60">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-white">
                  Team bezig met...
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {AGENTS.map((agent) => {
                  const activeTasks = tasks.filter(
                    (t) => t.assignee === agent.key && t.status === "in-progress"
                  )
                  return (
                    <div key={agent.key} className="flex items-start gap-3">
                      <span className="text-xl leading-none mt-0.5">{agent.emoji}</span>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-zinc-300">{agent.label}</div>
                        {activeTasks.length === 0 ? (
                          <div className="text-xs text-zinc-600">Geen actieve taak</div>
                        ) : (
                          <div className="space-y-0.5">
                            {activeTasks.map((t) => (
                              <div key={t.id} className="text-xs text-zinc-400 truncate">
                                {t.title}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Recent afgerond */}
            <Card className="border-zinc-800 bg-zinc-900/60">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-white">
                  Recent afgerond
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {doneTasks.length === 0 ? (
                  <p className="py-4 text-center text-sm text-zinc-500">
                    Nog niets afgerond.
                  </p>
                ) : (
                  doneTasks.map((task) => (
                    <Link
                      key={task.id}
                      href="/tasks"
                      className="flex items-center justify-between rounded-lg border border-zinc-800 px-3 py-2 hover:bg-zinc-800/60 transition-colors"
                    >
                      <div className="min-w-0">
                        <div className="text-sm text-white truncate">{task.title}</div>
                        <div className="text-xs text-zinc-500">
                          {task.assignee ?? "onbekend"} · {relativeTime(task.updatedAt)}
                        </div>
                      </div>
                      <span className="ml-3 shrink-0 text-xs text-green-500">✓</span>
                    </Link>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* FOOTER */}
          <footer className="border-t border-zinc-800 pt-4 text-xs text-zinc-600">
            Command Center · {today} · {tasks.length} taken · {sites.length} sites
          </footer>
        </div>
      </div>
    </>
  )
}
