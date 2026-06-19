import Link from "next/link"
import { AlertCircle, ArrowRight, CheckSquare, ClipboardList, FileText, FolderOpen, UserCheck } from "lucide-react"

import type { ReviewInboxItem } from "@/lib/review-inbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const statusClass: Record<ReviewInboxItem["status"], string> = {
  "needs-bart": "border-[#F5911E]/30 bg-[#F5911E]/15 text-[#F5911E]",
  approved: "border-emerald-500/30 bg-emerald-500/15 text-emerald-300",
  blocked: "border-red-500/30 bg-red-500/15 text-red-300",
  archived: "border-zinc-500/30 bg-zinc-500/15 text-zinc-300",
}

const kindLabel: Record<ReviewInboxItem["kind"], string> = {
  outreach: "outreach",
  "partner-pitch": "partner pitch",
  proposal: "voorstel",
  decision: "beslissing",
  evidence: "evidence",
}

export function BartReviewInbox({ items, title = "Bart review inbox", description = "Agent-output die expliciet op Bart wacht: controleren, beslissen, goedkeuren of parkeren." }: { items: ReviewInboxItem[]; title?: string; description?: string }) {
  if (items.length === 0) return null

  const needsBart = items.filter((item) => item.status === "needs-bart").length
  const blocked = items.filter((item) => item.status === "blocked").length

  return (
    <section className="space-y-4">
      <Card className="border-[#F5911E]/25 bg-[radial-gradient(circle_at_top_left,_rgba(245,145,30,0.16),_transparent_22rem),rgba(24,24,27,0.88)] text-white shadow-none">
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <Badge className="border-[#F5911E]/25 bg-[#F5911E]/15 text-[#F5911E]">Voor Bart</Badge>
              <CardTitle className="mt-4 flex items-center gap-2 text-3xl font-black md:text-4xl">
                <UserCheck className="h-8 w-8 text-[#F5911E]" /> {title}
              </CardTitle>
              <CardDescription className="mt-3 max-w-3xl text-base leading-7 text-zinc-300">{description}</CardDescription>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center lg:min-w-[420px]">
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4"><div className="text-2xl font-black">{items.length}</div><div className="text-[10px] uppercase text-zinc-500">items</div></div>
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4"><div className="text-2xl font-black text-[#F5911E]">{needsBart}</div><div className="text-[10px] uppercase text-zinc-500">wacht op Bart</div></div>
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4"><div className="text-2xl font-black text-red-300">{blocked}</div><div className="text-[10px] uppercase text-zinc-500">blocked</div></div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className={statusClass[item.status]}>{item.status}</Badge>
                    <Badge className="border-white/10 bg-white/5 text-zinc-300">{kindLabel[item.kind]}</Badge>
                    <Badge className="border-white/10 bg-white/5 text-zinc-300">{item.priority}</Badge>
                  </div>
                  <h3 className="mt-3 text-2xl font-black">{item.title}</h3>
                  <div className="mt-1 text-sm text-zinc-500">{item.asset} · {item.createdAt} · {item.owner}</div>
                  <p className="mt-3 max-w-4xl text-sm leading-6 text-zinc-300">{item.summary}</p>
                </div>
                <div className="rounded-2xl border border-[#F5911E]/20 bg-[#F5911E]/[0.06] p-4 xl:w-[360px]">
                  <div className="flex items-center gap-2 text-sm font-black text-[#F5911E]"><CheckSquare className="h-4 w-4" /> Actie voor Bart</div>
                  <p className="mt-2 text-sm leading-6 text-zinc-200">{item.bartAction}</p>
                </div>
              </div>

              <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="mb-1 flex items-center gap-2 text-xs uppercase tracking-wide text-zinc-500"><FileText className="h-3.5 w-3.5" /> Repo path</div>
                  <div className="break-words font-mono text-xs text-zinc-300">{item.filePath}</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="mb-1 flex items-center gap-2 text-xs uppercase tracking-wide text-zinc-500"><FolderOpen className="h-3.5 w-3.5" /> Lokale path</div>
                  <div className="break-words font-mono text-xs text-zinc-300">{item.localPath}</div>
                </div>
                <Button asChild className="bg-[#F5911E] text-white hover:bg-[#d97809]">
                  <Link href={item.routeHint}>Context openen <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.map((tag) => <Badge key={tag} variant="outline" className="border-white/10 text-zinc-400">#{tag}</Badge>)}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  )
}

export function ReviewInboxHint() {
  return (
    <div className="rounded-2xl border border-sky-500/20 bg-sky-500/[0.06] p-4 text-sm leading-6 text-sky-100">
      <AlertCircle className="mr-2 inline h-4 w-4" /> Nieuwe agent-output die Bart moet goedkeuren hoort hier terecht, met pad, asset, status en de exacte beslissing die gevraagd wordt.
    </div>
  )
}
