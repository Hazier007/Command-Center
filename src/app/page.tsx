"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { AlertTriangle, ArrowRight, CheckCircle2, Lightbulb, Send, Sparkles, Target, TrendingUp } from "lucide-react"

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
  type Project,
} from "@/lib/storage"

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
  { key: "lisa", label: "Lisa", emoji: "👑" },
  { key: "jc", label: "JC", emoji: "🥊" },
  { key: "wout", label: "Wout", emoji: "🔭" },
  { key: "copycat", label: "Copycat", emoji: "✍️" },
]

const EXECUTIVE_PRIORITIES = [
  {
    title: "Digitale assets naar €10K/mnd recurring",
    owner: "Lisa",
    next: "assets overzicht en focus forceren op Priority 1 assets",
    href: "/sites",
  },
  {
    title: "CollectPro klanten uitbouwen",
    owner: "Lisa",
    next: "growth pipeline expliciet maken en blockers zichtbaar maken",
    href: "/projects",
  },
  {
    title: "Nieuwe income opportunities blijven valideren",
    owner: "Lisa",
    next: "ideeën sneller triageren naar research, task of project",
    href: "/ideas",
  },
]

const PRIORITY_ONE_ASSETS = [
  "Hazier",
  "CollectPro",
  "poxy.be",
  "kinderopvangvlaanderen.be",
  "kluisverhuur.be",
  "huizenopkoper.be",
  "zwangerschapscalculator.be",
  "btw-calculator.be",
  "loonberekening.be",
]

const PRIORITY_ONE_WORKBENCH = [
  {
    asset: "Hazier",
    type: "business",
    status: "active",
    owner: "Lisa",
    upside: "high",
    bottleneck: "geen compleet operating overzicht van services, sites en portfolio-rol",
    nextAction: "maak een scherp Hazier operating snapshot in Command Center",
  },
  {
    asset: "CollectPro",
    type: "business",
    status: "active",
    owner: "Lisa",
    upside: "high",
    bottleneck: "acquisition pipeline is nog niet expliciet zichtbaar",
    nextAction: "bouw een growth pipeline met funnel stages en blockers",
  },
  {
    asset: "poxy.be",
    type: "leadgen",
    status: "live",
    owner: "Lisa",
    upside: "high",
    bottleneck: "huidige performance en groeilevers zijn niet zichtbaar in de app",
    nextAction: "valideer huidige performance en kies de snelste groeilever",
  },
  {
    asset: "kinderopvangvlaanderen.be",
    type: "directory",
    status: "live",
    owner: "Lisa",
    upside: "medium-high",
    bottleneck: "groei- en monetisatie-opties zijn niet scherp gedocumenteerd",
    nextAction: "map huidige listings/revenue en definieer expansion options",
  },
  {
    asset: "kluisverhuur.be",
    type: "leadgen",
    status: "live",
    owner: "Lisa",
    upside: "medium",
    bottleneck: "onvoldoende zicht op huidige SEO/commerciële tractie",
    nextAction: "bepaal 1 duidelijke commerciële of SEO next move",
  },
  {
    asset: "huizenopkoper.be",
    type: "leadgen",
    status: "live",
    owner: "Lisa",
    upside: "medium-high",
    bottleneck: "bestaande research is nog niet vertaald naar actief plan",
    nextAction: "vertaal keyword research naar actieplan en tasks",
  },
  {
    asset: "zwangerschapscalculator.be",
    type: "tool",
    status: "live",
    owner: "Lisa",
    upside: "medium",
    bottleneck: "monetization path blijft onduidelijk/pending",
    nextAction: "verifieer AdSense status en kies snelste unlock path",
  },
  {
    asset: "btw-calculator.be",
    type: "tool",
    status: "known",
    owner: "Lisa",
    upside: "high",
    bottleneck: "sterke potential maar geen expliciete command view",
    nextAction: "verifieer status, traffic intent en monetization route",
  },
  {
    asset: "loonberekening.be",
    type: "tool",
    status: "known",
    owner: "Lisa",
    upside: "high",
    bottleneck: "research bestaat maar execution roadmap ontbreekt",
    nextAction: "maak SEO research operationeel in roadmap en tasks",
  },
] as const

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
        className={`group relative overflow-hidden cursor-pointer border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xl ${
          accent
            ? "border-[#F5911E]/40 bg-gradient-to-br from-[#F5911E]/12 via-zinc-900 to-zinc-950 shadow-[#F5911E]/10"
            : "border-zinc-800/80 bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-950 hover:border-zinc-700"
        }`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,145,30,0.18),transparent_35%)] opacity-80" />
        <CardContent className="relative p-5">
          <div className={`text-3xl font-bold tabular-nums ${accent ? "text-[#F5B15C]" : "text-white"}`}>{count}</div>
          <div className="mt-1 text-sm text-zinc-400">{label}</div>
          <div className="mt-4 h-px w-full bg-gradient-to-r from-[#F5911E]/30 via-zinc-700/40 to-transparent" />
        </CardContent>
      </Card>
    </Link>
  )
}

function UpsideBadge({ upside }: { upside: string }) {
  const styles: Record<string, string> = {
    high: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    "medium-high": "bg-teal-500/15 text-teal-400 border-teal-500/30",
    medium: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  }

  return (
    <span className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wider ${styles[upside] ?? styles.medium}`}>
      upside {upside}
    </span>
  )
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [sites, setSites] = useState<Site[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [ideaTitle, setIdeaTitle] = useState("")
  const [ideaDescription, setIdeaDescription] = useState("")
  const [ideaSubmitting, setIdeaSubmitting] = useState(false)
  const [ideaSuccess, setIdeaSuccess] = useState(false)

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      const [tasksData, ideasData, sitesData, projectsData] = await Promise.all([
        tasksStorage.getAll(),
        ideasStorage.getAll(),
        sitesStorage.getAll(),
        projectsStorage.getAll(),
      ])
      setTasks(tasksData)
      setIdeas(ideasData)
      setSites(sitesData)
      setProjects(projectsData)
    } catch (err) {
      console.error("Failed to load dashboard:", err)
      setError("Kon dashboard niet laden. Controleer de database.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadData()
  }, [])

  const reviewQueue = tasks.filter((t) => t.assignee === "bart" && t.status === "review")
  const openTasks = tasks.filter((t) => t.status === "todo" || t.status === "in-progress")
  const liveSites = sites.filter((s) => s.status === "live")
  const doneTasks = tasks
    .filter((t) => t.status === "done")
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5)

  const activeProjects = projects.filter((p) => p.status === "active")
  const p1AssetsLive = liveSites.filter((site) => PRIORITY_ONE_ASSETS.includes(site.domain)).length
  const urgentTasks = openTasks.filter((t) => t.priority === "high")
  const siteMap = Object.fromEntries(sites.map((s) => [s.id, s.domain]))

  const collectProProject = projects.find((p) => p.name.toLowerCase().includes("collectpro"))
  const collectProTasks = tasks.filter((t) => {
    if (collectProProject && t.projectId === collectProProject.id) return true
    const title = t.title.toLowerCase()
    const description = t.description?.toLowerCase() || ""
    return title.includes("collectpro") || description.includes("collectpro")
  })
  const collectProOpenTasks = collectProTasks.filter((t) => t.status === "todo" || t.status === "in-progress")
  const collectProReviewTasks = collectProTasks.filter((t) => t.status === "review")

  const currentBlockers = [
    "CollectPro growth pipeline is nog niet expliciet zichtbaar in de app",
    "GA / GSC access is nog niet volledig geoperationaliseerd",
    "Niet alle Priority 1 assets hebben al een actieve execution lane",
  ]

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
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-6 md:px-6 md:py-10">
          <section className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
            <Card className="overflow-hidden border-[#F5911E]/15 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 shadow-xl shadow-black/20">
              <CardContent className="grid gap-6 p-6 md:grid-cols-[1.1fr_0.9fr] md:p-7">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.24em] text-zinc-500">Control signal</div>
                  <h2 className="mt-2 text-2xl font-semibold text-white">Wat vraagt nu aandacht?</h2>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400">
                    De home moet in één blik tonen wat vastzit, waar momentum zit en wat jij als volgende moet beslissen.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1 xl:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Review queue</div>
                    <div className="mt-2 text-2xl font-semibold text-white">{reviewQueue.length}</div>
                    <div className="mt-1 text-xs text-zinc-500">Taken die op jouw beslissing wachten</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Urgent</div>
                    <div className="mt-2 text-2xl font-semibold text-white">{urgentTasks.length}</div>
                    <div className="mt-1 text-xs text-zinc-500">Open taken met hoge prioriteit</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Live assets</div>
                    <div className="mt-2 text-2xl font-semibold text-white">{liveSites.length}</div>
                    <div className="mt-1 text-xs text-zinc-500">Sites die al actief draaien</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-zinc-800/80 bg-zinc-900/60 shadow-xl shadow-black/20">
              <CardContent className="p-6">
                <div className="text-[11px] uppercase tracking-[0.24em] text-zinc-500">Focus rule</div>
                <h2 className="mt-2 text-lg font-semibold text-white">Default operating mode</h2>
                <ul className="mt-4 space-y-3 text-sm text-zinc-300">
                  <li className="rounded-xl border border-white/10 bg-zinc-950/70 px-4 py-3">Outcome first, dan execution.</li>
                  <li className="rounded-xl border border-white/10 bg-zinc-950/70 px-4 py-3">Geen unlabeled assumptions.</li>
                  <li className="rounded-xl border border-white/10 bg-zinc-950/70 px-4 py-3">Done = working en getest.</li>
                </ul>
              </CardContent>
            </Card>
          </section>
          <header className="relative overflow-hidden rounded-[28px] border border-[#F5911E]/20 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black px-5 py-6 shadow-2xl shadow-black/20 md:px-7 md:py-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,145,30,0.22),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.07),transparent_25%)]" />
            <div className="relative flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
              <div className="max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#F5911E]/25 bg-[#F5911E]/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-[#F5B15C]">
                  <Sparkles className="h-3.5 w-3.5" />
                  Executive Overview
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">Command Center · Obie</h1>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400 md:text-base">
                    Eén command view voor focus, blockers en de snelste route naar resultaat.
                  </p>
                  <p className="mt-3 text-sm text-zinc-500 capitalize">{today}</p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:w-[430px]">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">Mission</div>
                  <div className="mt-2 text-sm text-zinc-200">Reduce chaos to a plan, force focus, and make progress visible.</div>
                </div>
                <div className="rounded-2xl border border-[#F5911E]/20 bg-[#F5911E]/10 p-4 backdrop-blur-sm">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-[#F5B15C]">Today’s stance</div>
                  <div className="mt-2 text-sm font-medium text-white">Outcome first. Small batches. No floating tasks.</div>
                </div>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            <StatCard label="Wacht op mij" count={reviewQueue.length} href="/tasks?status=review&assignee=bart" accent />
            <StatCard label="Open taken" count={openTasks.length} href="/tasks" />
            <StatCard label="Actieve projecten" count={activeProjects.length} href="/projects" />
            <StatCard label="Live sites" count={liveSites.length} href="/sites" />
            <StatCard label="Nieuwe ideeën" count={ideas.length} href="/ideas" />
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
            <Card className="border-zinc-800 bg-zinc-900/60">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                  <Target className="h-4 w-4 text-[#F5911E]" />
                  Topprioriteiten
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {EXECUTIVE_PRIORITIES.map((priority, index) => (
                  <Link key={priority.title} href={priority.href} className="block rounded-xl border border-zinc-800 bg-zinc-950/70 p-4 hover:bg-zinc-900 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1.5">
                        <div className="text-xs uppercase tracking-wider text-zinc-500">Prioriteit {index + 1}</div>
                        <div className="text-sm font-semibold text-white">{priority.title}</div>
                        <div className="text-xs text-zinc-400">Owner: {priority.owner}</div>
                        <div className="text-xs text-zinc-500">Next: {priority.next}</div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-zinc-600 shrink-0 mt-1" />
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>

            <Card className="border-zinc-800 bg-zinc-900/60">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400" />
                  Current blockers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {currentBlockers.map((blocker) => (
                  <div key={blocker} className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-sm text-zinc-300">
                    {blocker}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.3fr_1fr_1fr]">
            <Card className="border-zinc-800 bg-zinc-900/60">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-[#F5911E]" />
                  Priority 1 assets
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
                    <div className="text-2xl font-bold text-[#F5911E]">{PRIORITY_ONE_ASSETS.length}</div>
                    <div className="text-xs text-zinc-500 mt-1">Assets in focus</div>
                  </div>
                  <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
                    <div className="text-2xl font-bold text-white">{p1AssetsLive}</div>
                    <div className="text-xs text-zinc-500 mt-1">Already live</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {PRIORITY_ONE_ASSETS.map((asset) => (
                    <Badge key={asset} className="border border-[#F5911E]/20 bg-[#F5911E]/10 text-[#F5B15C] hover:bg-[#F5911E]/10">
                      {asset}
                    </Badge>
                  ))}
                </div>
                <Link href="/sites" className="text-xs text-[#F5911E] hover:underline inline-flex items-center gap-1">
                  Open sites and asset layer <ArrowRight className="h-3 w-3" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-zinc-800 bg-zinc-900/60">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-white">Team focus</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {AGENTS.map((agent) => {
                  const activeTasks = tasks.filter((t) => t.assignee === agent.key && t.status === "in-progress")
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
                              <div key={t.id} className="text-xs text-zinc-400 truncate">{t.title}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            <Card className="border-zinc-800 bg-zinc-900/60">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-white">Execution pulse</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-3">
                  <div className="text-xs text-zinc-500">Urgente open taken</div>
                  <div className="text-2xl font-bold text-white mt-1">{urgentTasks.length}</div>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-3">
                  <div className="text-xs text-zinc-500">Review queue</div>
                  <div className="text-2xl font-bold text-white mt-1">{reviewQueue.length}</div>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-3">
                  <div className="text-xs text-zinc-500">Actieve projecten</div>
                  <div className="text-2xl font-bold text-white mt-1">{activeProjects.length}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-zinc-800 bg-zinc-900/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-white">Priority 1 Asset Workbench</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {PRIORITY_ONE_WORKBENCH.map((item) => (
                <div key={item.asset} className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-white">{item.asset}</div>
                      <div className="text-xs text-zinc-500">{item.type} · owner {item.owner}</div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge className="border border-zinc-700 bg-zinc-900 text-zinc-300 hover:bg-zinc-900">{item.status}</Badge>
                      <UpsideBadge upside={item.upside} />
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Bottleneck</div>
                    <p className="text-xs text-zinc-300 leading-5">{item.bottleneck}</p>
                  </div>

                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Next action</div>
                    <p className="text-xs text-[#F5B15C] leading-5">{item.nextAction}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid gap-6 xl:grid-cols-[1.15fr_1fr]">
            <Card className="border-zinc-800 bg-zinc-900/60">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-white">CollectPro Growth Lane</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-3">
                    <div className="text-xs text-zinc-500">Open tasks</div>
                    <div className="text-2xl font-bold text-white mt-1">{collectProOpenTasks.length}</div>
                  </div>
                  <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-3">
                    <div className="text-xs text-zinc-500">Review</div>
                    <div className="text-2xl font-bold text-white mt-1">{collectProReviewTasks.length}</div>
                  </div>
                  <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-3">
                    <div className="text-xs text-zinc-500">State</div>
                    <div className="text-sm font-semibold text-[#F5B15C] mt-2">active</div>
                  </div>
                </div>

                <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                  <div className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Current bottleneck</div>
                  <p className="text-sm text-zinc-200">Acquisition pipeline is nog niet expliciet genoeg zichtbaar of bestuurbaar in de app.</p>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
                    <div className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Next action</div>
                    <p className="text-sm text-[#F5B15C]">Maak funnel stages en blockers expliciet voor CollectPro growth.</p>
                  </div>
                  <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
                    <div className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Recommended focus</div>
                    <p className="text-sm text-zinc-300">Pipeline visibility → current leads → blockers → next commercial step.</p>
                  </div>
                </div>

                <Link href="/projects" className="text-xs text-[#F5911E] hover:underline inline-flex items-center gap-1">
                  Open CollectPro workstream <ArrowRight className="h-3 w-3" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-zinc-800 bg-zinc-900/60">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold text-white">Mijn review queue</CardTitle>
                  {reviewQueue.length > 0 && (
                    <Badge className="bg-[#F5911E]/15 text-[#F5911E] border border-[#F5911E]/30 text-xs">{reviewQueue.length}</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {reviewQueue.length === 0 ? (
                  <p className="py-6 text-center text-sm text-zinc-500">✅ Niks te reviewen — alles loopt.</p>
                ) : (
                  <>
                    {reviewQueue.slice(0, 5).map((task) => (
                      <div key={task.id} className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-3 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-sm font-medium leading-5 text-white">{task.title}</span>
                          {task.priority && (
                            <span className={`shrink-0 rounded-full border px-2 py-0.5 text-xs ${PRIORITY_CLASS[task.priority] ?? PRIORITY_CLASS.low}`}>
                              {PRIORITY_LABEL[task.priority] ?? task.priority}
                            </span>
                          )}
                        </div>
                        {task.siteId && siteMap[task.siteId] && <p className="text-xs text-zinc-500">{siteMap[task.siteId]}</p>}
                        <div className="flex gap-2 pt-1">
                          <Button size="sm" className="bg-green-600 hover:bg-green-500 text-white border-0 h-7 text-xs" onClick={() => handleApprove(task)}>
                            <CheckCircle2 className="mr-1 h-3 w-3" /> Goedkeuren
                          </Button>
                          <Button size="sm" variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 h-7 text-xs" onClick={() => handleReturn(task)}>
                            Terugsturen
                          </Button>
                        </div>
                      </div>
                    ))}
                    {reviewQueue.length > 5 && <Link href="/tasks?status=review&assignee=bart" className="block pt-1 text-xs text-[#F5911E] hover:underline">Bekijk alle {reviewQueue.length} →</Link>}
                  </>
                )}
              </CardContent>
            </Card>

            <Card className="border-zinc-800 bg-zinc-900/60">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-[#F5911E]" /> Snel idee droppen
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
                    <Button type="submit" disabled={ideaSubmitting || !ideaTitle.trim()} className="bg-[#F5911E] hover:bg-[#e07d10] text-white border-0" size="sm">
                      <Send className="mr-1.5 h-3.5 w-3.5" />
                      {ideaSubmitting ? "Opslaan..." : "Opslaan"}
                    </Button>
                    {ideaSuccess && <span className="text-xs text-green-400">Idee opgeslagen!</span>}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <Card className="border-zinc-800 bg-zinc-900/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-white">Recent afgerond</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
              {doneTasks.length === 0 ? (
                <p className="py-4 text-sm text-zinc-500">Nog niets afgerond.</p>
              ) : (
                doneTasks.map((task) => (
                  <Link key={task.id} href="/tasks" className="flex items-center justify-between rounded-lg border border-zinc-800 px-3 py-2 hover:bg-zinc-800/60 transition-colors">
                    <div className="min-w-0">
                      <div className="text-sm text-white truncate">{task.title}</div>
                      <div className="text-xs text-zinc-500">{task.assignee ?? "onbekend"} · {relativeTime(task.updatedAt)}</div>
                    </div>
                    <span className="ml-3 shrink-0 text-xs text-green-500">✓</span>
                  </Link>
                ))
              )}
            </CardContent>
          </Card>

          <footer className="border-t border-zinc-800 pt-4 text-xs text-zinc-600">
            Command Center · {today} · {tasks.length} taken · {sites.length} sites · {projects.length} projecten
          </footer>
        </div>
      </div>
    </>
  )
}
