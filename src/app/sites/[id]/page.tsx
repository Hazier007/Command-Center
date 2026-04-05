"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft, Globe, ExternalLink, CheckSquare, FileText, StickyNote,
  TrendingUp, Server, Plus, Clock, Send, Search, Activity, Wrench,
  BarChart3, Calendar, DollarSign, AlertTriangle, X, Edit, ChevronDown, ChevronUp,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"

interface SiteData {
  id: string; domain: string; status: string; category?: string; projectId?: string;
  techStack: string[]; revenue?: number; monthlyRevenue?: number;
  listings?: number; pages?: number; notes?: string; hosting?: string;
  seoStatus?: string; nextAction?: string; lastContentDate?: string;
  seoScore?: number; lastSeoAudit?: string; topKeyword?: string;
  topPosition?: number; monthlyTraffic?: number; indexedPages?: number;
  domainAuthority?: number; expirationDate?: string; registrar?: string;
  deployStatus?: string; buildStatus?: string; devPhase?: string;
  lastDeployAt?: string; githubRepo?: string; lighthouse?: Record<string, number>;
  project?: { id: string; name: string; clientName?: string; ownerType?: string };
  createdAt: string; updatedAt: string;
}

interface TaskData {
  id: string; title: string; description?: string; status: string;
  priority?: string; assignee?: string; dueDate?: string;
  createdAt: string; updatedAt: string;
}

interface ContentData {
  id: string; title: string; body?: string; status: string; type?: string;
  author?: string; wordCount?: number; linkedKeyword?: string;
  summary?: string; createdAt: string;
}

interface NoteData {
  id: string; title: string; body?: string; agentId?: string;
  noteType?: string; createdAt: string;
}

const assigneeEmojis: Record<string, string> = {
  bart: '👤', atlas: '🗺️', forge: '🔨', radar: '📡',
  ink: '✒️', ledger: '📊', spark: '⚡', cowork: '🖥️',
}

const assigneeOptions = [
  { value: 'bart', label: 'Bart' }, { value: 'atlas', label: 'Atlas' },
  { value: 'forge', label: 'Forge' }, { value: 'radar', label: 'Radar' },
  { value: 'ink', label: 'Ink' }, { value: 'ledger', label: 'Ledger' },
  { value: 'spark', label: 'Spark' }, { value: 'cowork', label: 'Cowork' },
]

export default function SiteDetailPage() {
  const params = useParams()
  const router = useRouter()
  const siteId = params.id as string

  const [site, setSite] = useState<SiteData | null>(null)
  const [tasks, setTasks] = useState<TaskData[]>([])
  const [content, setContent] = useState<ContentData[]>([])
  const [notes, setNotes] = useState<NoteData[]>([])
  const [loading, setLoading] = useState(true)
  const [showTaskDialog, setShowTaskDialog] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [taskForm, setTaskForm] = useState({
    title: "", description: "", priority: "medium", assignee: "",
  })
  const [editingTech, setEditingTech] = useState(false)
  const [techForm, setTechForm] = useState({
    hosting: "", devPhase: "", deployStatus: "", buildStatus: "", githubRepo: "", techStack: "",
  })
  const [expandedNote, setExpandedNote] = useState<string | null>(null)
  const [expandedContent, setExpandedContent] = useState<string | null>(null)

  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      const [siteRes, tasksRes, contentRes, notesRes] = await Promise.all([
        fetch(`/api/sites/${siteId}`).then(r => r.ok ? r.json() : null),
        fetch(`/api/tasks?siteId=${siteId}`).then(r => r.ok ? r.json() : []),
        fetch(`/api/content`).then(r => r.ok ? r.json() : []),
        fetch(`/api/notes?linkedSiteId=${siteId}`).then(r => r.ok ? r.json() : []),
      ])

      if (!siteRes) { router.push('/sites'); return }
      setSite(siteRes)
      setTasks(Array.isArray(tasksRes) ? tasksRes : [])
      // Filter content by site domain
      const allContent = Array.isArray(contentRes) ? contentRes : []
      setContent(allContent.filter((c: ContentData & { targetSite?: string }) =>
        c.targetSite === siteRes.domain
      ))
      setNotes(Array.isArray(notesRes) ? notesRes : [])
    } catch (error) {
      console.error('Failed to load site data:', error)
    } finally {
      setLoading(false)
    }
  }, [siteId, router])

  useEffect(() => { loadData() }, [loadData])

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setSubmitting(true)
      await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: taskForm.title,
          description: taskForm.description || undefined,
          priority: taskForm.priority,
          assignee: taskForm.assignee || undefined,
          siteId,
          projectId: site?.projectId || undefined,
          status: 'todo',
        }),
      })
      await loadData()
      setShowTaskDialog(false)
      setTaskForm({ title: "", description: "", priority: "medium", assignee: "" })
    } catch (error) {
      console.error('Failed to create task:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleUpdateTaskStatus = async (taskId: string, status: string) => {
    await fetch(`/api/tasks/${taskId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    await loadData()
  }

  const startEditTech = () => {
    if (!site) return
    setTechForm({
      hosting: site.hosting || "",
      devPhase: site.devPhase || "",
      deployStatus: site.deployStatus || "",
      buildStatus: site.buildStatus || "",
      githubRepo: site.githubRepo || "",
      techStack: site.techStack?.join(", ") || "",
    })
    setEditingTech(true)
  }

  const saveTech = async () => {
    try {
      setSubmitting(true)
      await fetch(`/api/sites/${siteId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hosting: techForm.hosting || null,
          devPhase: techForm.devPhase || null,
          deployStatus: techForm.deployStatus || null,
          buildStatus: techForm.buildStatus || null,
          githubRepo: techForm.githubRepo || null,
          techStack: techForm.techStack ? techForm.techStack.split(",").map(s => s.trim()).filter(Boolean) : [],
        }),
      })
      setEditingTech(false)
      await loadData()
    } catch (error) {
      console.error('Failed to save tech:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': case 'done': case 'approved': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'dev': case 'in-progress': case 'review': return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      case 'planned': case 'todo': case 'draft': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'paused': case 'blocked': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      default: return 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30'
    }
  }

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return 'text-red-400'
      case 'medium': return 'text-yellow-400'
      default: return 'text-zinc-500'
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-muted-foreground">Site laden...</div>
        </div>
      </div>
    )
  }

  if (!site) return null

  const rev = site.monthlyRevenue || site.revenue || 0
  const activeTasks = tasks.filter(t => t.status !== 'done')
  const doneTasks = tasks.filter(t => t.status === 'done')

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 space-y-6">
      {/* Header */}
      <div>
        <Link href="/sites">
          <Button variant="ghost" size="sm" className="mb-3">
            <ArrowLeft className="mr-2 h-4 w-4" /> Terug naar sites
          </Button>
        </Link>
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Globe className="h-6 w-6 text-[#F5911E]" />
              <h1 className="text-3xl font-bold">{site.domain}</h1>
              <Badge variant="outline" className={getStatusColor(site.status)}>{site.status}</Badge>
              {site.category && (
                <Badge variant="outline" className="bg-[#F5911E]/10 text-[#F5911E] border-[#F5911E]/30">{site.category}</Badge>
              )}
            </div>
            {site.project?.clientName && (
              <p className="text-sm text-muted-foreground mt-1">
                Klant: {site.project.clientName}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            {site.status === 'live' && (
              <a href={`https://${site.domain}`} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm">
                  <ExternalLink className="mr-2 h-4 w-4" /> Bezoek site
                </Button>
              </a>
            )}
            <Button size="sm" className="bg-[#F5911E] hover:bg-[#e07d0a] text-white" onClick={() => setShowTaskDialog(true)}>
              <Plus className="mr-2 h-4 w-4" /> Nieuwe taak
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        <Card>
          <CardContent className="pt-4 pb-4">
            <p className="text-xs text-muted-foreground">Revenue</p>
            <p className="text-lg font-bold text-green-500">{rev > 0 ? `€${rev}/mo` : '-'}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <p className="text-xs text-muted-foreground">Open taken</p>
            <p className="text-lg font-bold">{activeTasks.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <p className="text-xs text-muted-foreground">SEO Score</p>
            <p className="text-lg font-bold">{site.seoScore ? `${site.seoScore}/100` : '-'}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <p className="text-xs text-muted-foreground">Traffic</p>
            <p className="text-lg font-bold">{site.monthlyTraffic ? `${site.monthlyTraffic.toLocaleString()}/mo` : '-'}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <p className="text-xs text-muted-foreground">Hosting</p>
            <p className="text-lg font-bold capitalize">{site.hosting || '-'}</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2">

        {/* === TAKEN === */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <CheckSquare className="h-5 w-5" /> Taken
                </CardTitle>
                <CardDescription>{activeTasks.length} open, {doneTasks.length} afgerond</CardDescription>
              </div>
              <Button size="sm" variant="outline" onClick={() => setShowTaskDialog(true)}>
                <Plus className="mr-1 h-3 w-3" /> Taak
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {activeTasks.length === 0 && doneTasks.length === 0 ? (
              <p className="text-sm text-muted-foreground">Geen taken voor deze site.</p>
            ) : (
              <div className="space-y-2">
                {activeTasks.map(task => (
                  <div key={task.id} className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <button
                        onClick={() => handleUpdateTaskStatus(task.id, task.status === 'in-progress' ? 'done' : 'in-progress')}
                        className={`h-5 w-5 rounded border flex-shrink-0 flex items-center justify-center text-xs transition-colors ${
                          task.status === 'in-progress' ? 'border-orange-400 bg-orange-400/20 text-orange-400' : 'border-zinc-600 hover:border-[#F5911E]'
                        }`}
                      >
                        {task.status === 'in-progress' && '●'}
                      </button>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{task.title}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Badge variant="outline" className={`text-[10px] ${getStatusColor(task.status)}`}>{task.status}</Badge>
                          {task.priority && <span className={`text-[10px] font-medium ${getPriorityColor(task.priority)}`}>{task.priority}</span>}
                          {task.assignee && <span className="text-[10px]">{assigneeEmojis[task.assignee] || ''} {task.assignee}</span>}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleUpdateTaskStatus(task.id, 'done')}
                      className="text-xs text-zinc-500 hover:text-green-400 transition-colors px-2"
                      title="Markeer als klaar"
                    >
                      ✓
                    </button>
                  </div>
                ))}
                {doneTasks.length > 0 && (
                  <details className="mt-3">
                    <summary className="text-xs text-muted-foreground cursor-pointer hover:text-white">
                      {doneTasks.length} afgeronde taken
                    </summary>
                    <div className="mt-2 space-y-1">
                      {doneTasks.slice(0, 10).map(task => (
                        <div key={task.id} className="flex items-center gap-2 p-2 rounded text-sm text-muted-foreground line-through">
                          <span className="text-green-500 text-xs">✓</span>
                          <span className="truncate">{task.title}</span>
                        </div>
                      ))}
                    </div>
                  </details>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* === SEO & TRAFFIC === */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" /> SEO & Traffic
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-muted-foreground">Top keyword</p>
                <p className="text-sm font-medium">{site.topKeyword || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Positie</p>
                <p className="text-sm font-medium">{site.topPosition ? `#${site.topPosition}` : '-'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Domain Authority</p>
                <p className="text-sm font-medium">{site.domainAuthority || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Indexed pages</p>
                <p className="text-sm font-medium">{site.indexedPages || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">SEO status</p>
                <p className="text-sm font-medium capitalize">{site.seoStatus || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Laatste audit</p>
                <p className="text-sm font-medium">{site.lastSeoAudit ? new Date(site.lastSeoAudit).toLocaleDateString('nl-BE') : '-'}</p>
              </div>
            </div>
            {site.nextAction && (
              <div className="p-2 rounded bg-[#F5911E]/10 border border-[#F5911E]/20">
                <p className="text-xs text-[#F5911E]">Volgende actie: {site.nextAction}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* === TECHNISCH === */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5" /> Technisch
              </CardTitle>
              {!editingTech ? (
                <Button size="sm" variant="outline" onClick={startEditTech}>
                  <Edit className="mr-1 h-3 w-3" /> Edit
                </Button>
              ) : (
                <div className="flex gap-1">
                  <Button size="sm" className="bg-[#F5911E] hover:bg-[#e07d0a] text-white" onClick={saveTech} disabled={submitting}>
                    {submitting ? '...' : 'Opslaan'}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setEditingTech(false)}>
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {editingTech ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground">Hosting</label>
                    <select value={techForm.hosting} onChange={(e) => setTechForm({ ...techForm, hosting: e.target.value })} className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm">
                      <option value="">-</option>
                      <option value="vercel">Vercel</option>
                      <option value="cloudflare">Cloudflare</option>
                      <option value="hostinger">Hostinger</option>
                      <option value="combell">Combell</option>
                      <option value="netlify">Netlify</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Dev fase</label>
                    <select value={techForm.devPhase} onChange={(e) => setTechForm({ ...techForm, devPhase: e.target.value })} className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm">
                      <option value="">-</option>
                      <option value="design">Design</option>
                      <option value="build">Build</option>
                      <option value="testing">Testing</option>
                      <option value="deploy">Deploy</option>
                      <option value="live">Live</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Deploy status</label>
                    <select value={techForm.deployStatus} onChange={(e) => setTechForm({ ...techForm, deployStatus: e.target.value })} className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm">
                      <option value="">-</option>
                      <option value="success">Success</option>
                      <option value="failed">Failed</option>
                      <option value="building">Building</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Build status</label>
                    <select value={techForm.buildStatus} onChange={(e) => setTechForm({ ...techForm, buildStatus: e.target.value })} className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm">
                      <option value="">-</option>
                      <option value="passing">Passing</option>
                      <option value="failing">Failing</option>
                      <option value="unknown">Unknown</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">GitHub repo</label>
                  <Input value={techForm.githubRepo} onChange={(e) => setTechForm({ ...techForm, githubRepo: e.target.value })} placeholder="owner/repo" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Tech stack (komma-gescheiden)</label>
                  <Input value={techForm.techStack} onChange={(e) => setTechForm({ ...techForm, techStack: e.target.value })} placeholder="Next.js, Tailwind, Prisma" />
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Hosting</p>
                    <p className="text-sm font-medium capitalize">{site.hosting || '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Dev fase</p>
                    <p className="text-sm font-medium capitalize">{site.devPhase || '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Deploy status</p>
                    <p className="text-sm font-medium capitalize">{site.deployStatus || '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Build status</p>
                    <p className="text-sm font-medium capitalize">{site.buildStatus || '-'}</p>
                  </div>
                </div>
                {site.techStack && site.techStack.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Tech stack</p>
                    <div className="flex flex-wrap gap-1">
                      {site.techStack.map(tech => (
                        <Badge key={tech} variant="outline" className="text-[10px]">{tech}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {site.githubRepo && (
                  <div>
                    <p className="text-xs text-muted-foreground">GitHub</p>
                    <a href={`https://github.com/${site.githubRepo}`} target="_blank" className="text-sm text-[#F5911E] hover:underline">{site.githubRepo}</a>
                  </div>
                )}
                {site.lighthouse && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Lighthouse</p>
                    <div className="flex gap-3">
                      {Object.entries(site.lighthouse).map(([key, val]) => (
                        <div key={key} className="text-center">
                          <div className={`text-sm font-bold ${(val as number) >= 90 ? 'text-green-400' : (val as number) >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>{val as number}</div>
                          <div className="text-[10px] text-muted-foreground capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {site.lastDeployAt && (
                  <p className="text-xs text-muted-foreground">
                    Laatste deploy: {new Date(site.lastDeployAt).toLocaleDateString('nl-BE')}
                  </p>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* === CONTENT === */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" /> Content
            </CardTitle>
            <CardDescription>{content.length} items</CardDescription>
          </CardHeader>
          <CardContent>
            {content.length === 0 ? (
              <p className="text-sm text-muted-foreground">Geen content voor deze site.</p>
            ) : (
              <div className="space-y-2">
                {content.slice(0, 8).map(item => (
                  <div key={item.id}>
                    <button
                      onClick={() => setExpandedContent(expandedContent === item.id ? null : item.id)}
                      className="w-full text-left flex items-center justify-between p-2 rounded bg-white/[0.02] hover:bg-white/[0.05] transition-colors cursor-pointer"
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-medium truncate">{item.title}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] text-muted-foreground capitalize">{item.type}</span>
                          {item.wordCount && <span className="text-[10px] text-muted-foreground">{item.wordCount}w</span>}
                          {item.linkedKeyword && <span className="text-[10px] text-[#F5911E]">{item.linkedKeyword}</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Badge variant="outline" className={`text-[10px] ${getStatusColor(item.status)}`}>{item.status}</Badge>
                        {expandedContent === item.id ? <ChevronUp className="h-3 w-3 text-muted-foreground" /> : <ChevronDown className="h-3 w-3 text-muted-foreground" />}
                      </div>
                    </button>
                    {expandedContent === item.id && (
                      <div className="mt-1 p-3 rounded bg-white/[0.03] border border-white/[0.06] text-sm text-muted-foreground">
                        {item.summary && <p className="text-xs text-[#F5911E] mb-2">{item.summary}</p>}
                        {item.body ? (
                          <div className="whitespace-pre-wrap max-h-[300px] overflow-y-auto text-xs">{item.body}</div>
                        ) : (
                          <p className="text-xs italic">Geen body content</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* === NOTITIES === */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <StickyNote className="h-5 w-5" /> Notities
            </CardTitle>
            <CardDescription>{notes.length} notities</CardDescription>
          </CardHeader>
          <CardContent>
            {notes.length === 0 ? (
              <p className="text-sm text-muted-foreground">Geen notities voor deze site.</p>
            ) : (
              <div className="space-y-2">
                {notes.slice(0, 6).map(note => (
                  <div key={note.id}>
                    <button
                      onClick={() => setExpandedNote(expandedNote === note.id ? null : note.id)}
                      className="w-full text-left p-2 rounded bg-white/[0.02] hover:bg-white/[0.05] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-medium truncate">{note.title}</p>
                        <div className="flex items-center gap-1">
                          {note.agentId && <span className="text-[10px]">{assigneeEmojis[note.agentId] || ''}</span>}
                          {expandedNote === note.id ? <ChevronUp className="h-3 w-3 text-muted-foreground" /> : <ChevronDown className="h-3 w-3 text-muted-foreground" />}
                        </div>
                      </div>
                      {note.body && expandedNote !== note.id && <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-2">{note.body}</p>}
                      <p className="text-[10px] text-muted-foreground mt-1">{new Date(note.createdAt).toLocaleDateString('nl-BE')}</p>
                    </button>
                    {expandedNote === note.id && note.body && (
                      <div className="mt-1 p-3 rounded bg-white/[0.03] border border-white/[0.06]">
                        <div className="whitespace-pre-wrap text-xs text-muted-foreground max-h-[300px] overflow-y-auto">{note.body}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* === DOMEIN INFO === */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" /> Domein info
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-muted-foreground">Registrar</p>
                <p className="text-sm font-medium">{site.registrar || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Vervaldatum</p>
                <p className={`text-sm font-medium ${site.expirationDate && new Date(site.expirationDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) ? 'text-red-400' : ''}`}>
                  {site.expirationDate ? new Date(site.expirationDate).toLocaleDateString('nl-BE') : '-'}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Listings</p>
                <p className="text-sm font-medium">{site.listings?.toLocaleString() || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Pagina&apos;s</p>
                <p className="text-sm font-medium">{site.pages?.toLocaleString() || '-'}</p>
              </div>
            </div>
            {site.notes && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">Notities</p>
                <p className="text-sm text-muted-foreground">{site.notes}</p>
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              Aangemaakt {new Date(site.createdAt).toLocaleDateString('nl-BE')} · Bijgewerkt {new Date(site.updatedAt).toLocaleDateString('nl-BE')}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* === NEW TASK DIALOG === */}
      <Dialog open={showTaskDialog} onOpenChange={setShowTaskDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nieuwe taak voor {site.domain}</DialogTitle>
            <DialogDescription>Taak wordt direct gekoppeld aan deze site.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateTask} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Titel</label>
              <Input
                value={taskForm.title}
                onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                placeholder="Wat moet er gebeuren?"
                required autoFocus
              />
            </div>
            <div>
              <label className="text-sm font-medium">Beschrijving</label>
              <Textarea
                value={taskForm.description}
                onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                placeholder="Details..."
                className="min-h-[80px]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Prioriteit</label>
                <select
                  value={taskForm.priority}
                  onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                >
                  <option value="low">Laag</option>
                  <option value="medium">Medium</option>
                  <option value="high">Hoog</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Toewijzen aan</label>
                <select
                  value={taskForm.assignee}
                  onChange={(e) => setTaskForm({ ...taskForm, assignee: e.target.value })}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                >
                  <option value="">Niet toegewezen</option>
                  {assigneeOptions.map(o => (
                    <option key={o.value} value={o.value}>{assigneeEmojis[o.value]} {o.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1 bg-[#F5911E] hover:bg-[#e07d0a] text-white" disabled={submitting}>
                {submitting ? 'Aanmaken...' : 'Taak aanmaken'}
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowTaskDialog(false)}>Annuleren</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
