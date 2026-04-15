"use client"

import { useEffect, useState, useCallback } from "react"
import { useBusinessContext } from "@/components/nerve"
import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// ─── Types ─────────────────────────────────────────────────────
interface ClientSiteRef {
  id: string
  domain: string
  status: string
  monthlyRevenue: number | null
  monthlyFee: number | null
  hoursPerMonth: number | null
  monthlyTraffic: number | null
  seoScore: number | null
  topKeyword: string | null
  topPosition: number | null
}

interface ClientProjectRef {
  id: string
  name: string
  status: string
  monthlyFee: number | null
}

interface ClientAgg {
  // v2: id kan "real" cuid zijn OF "legacy:<key>" voor niet-gemigreerde records
  id?: string
  isLegacy?: boolean
  name: string
  email: string | null
  phone?: string | null
  company?: string | null
  vatNumber?: string | null
  address?: string | null
  notes?: string | null
  businessUnit?: string | null
  status?: string
  contractType: string | null
  monthlyFee: number
  hoursPerMonth: number
  contractStart: string | null
  contractEnd: string | null
  paymentStatus: string | null
  nextInvoiceDate: string | null
  lastInvoiceDate: string | null
  autoRenew: boolean
  sites: ClientSiteRef[]
  projects: ClientProjectRef[]
  openTasksCount: number
}

interface Task {
  id: string
  title: string
  status: string
  priority?: string
  assignee?: string
  siteId?: string
  category?: string
  createdAt?: string
}

// ─── Config ────────────────────────────────────────────────────
const contractTypeLabels: Record<string, string> = {
  retainer: "Retainer (recurring)",
  eenmalig: "Eenmalig",
  mixed: "Mixed (retainer + extra)",
}

const paymentStatusConfig: Record<
  string,
  { label: string; dot: string; text: string }
> = {
  current: { label: "Up-to-date", dot: "bg-emerald-400", text: "text-emerald-400" },
  late: { label: "Laat", dot: "bg-yellow-400", text: "text-yellow-400" },
  overdue: { label: "Vervallen", dot: "bg-red-400", text: "text-red-400" },
}

// ─── Component ────────────────────────────────────────────────
export default function KlantenPage() {
  useBusinessContext() // future: filter by business

  const [clients, setClients] = useState<ClientAgg[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState("")

  const [selected, setSelected] = useState<ClientAgg | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  const [editOpen, setEditOpen] = useState(false)
  const [newOpen, setNewOpen] = useState(false)
  const [backfillRunning, setBackfillRunning] = useState(false)
  const [backfillResult, setBackfillResult] = useState<string | null>(null)

  // ─── Data ────────────────────────────────────────────────
  const fetchAll = useCallback(async () => {
    setLoading(true)
    try {
      const [clientsRes, tasksRes] = await Promise.all([
        fetch("/api/clients").then((r) => r.json()).catch(() => []),
        fetch("/api/tasks").then((r) => r.json()).catch(() => []),
      ])
      setClients(Array.isArray(clientsRes) ? clientsRes : [])
      setTasks(Array.isArray(tasksRes) ? tasksRes : [])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  // ─── Backfill: legacy clientName-sites omzetten naar echte Client records ──
  const runBackfill = useCallback(async () => {
    if (backfillRunning) return
    const legacyCount = clients.filter((c) => c.isLegacy).length
    if (legacyCount === 0) {
      setBackfillResult("Alles is al gemigreerd — geen legacy records.")
      setTimeout(() => setBackfillResult(null), 4000)
      return
    }
    if (
      !confirm(
        `${legacyCount} legacy klant-aggregaat${legacyCount === 1 ? "" : "en"} omzetten naar echte Client records?`
      )
    )
      return

    setBackfillRunning(true)
    setBackfillResult(null)
    try {
      const res = await fetch("/api/clients/backfill", { method: "POST" })
      const json = await res.json()
      if (!res.ok) {
        setBackfillResult("Fout: " + (json.error || "onbekend"))
      } else {
        setBackfillResult(
          `✓ ${json.created} aangemaakt, ${json.linked} sites gelinkt.`
        )
        await fetchAll()
      }
    } catch (err) {
      setBackfillResult(
        "Netwerkfout: " + (err instanceof Error ? err.message : "onbekend")
      )
    } finally {
      setBackfillRunning(false)
      setTimeout(() => setBackfillResult(null), 6000)
    }
  }, [backfillRunning, clients, fetchAll])

  // ─── Stats ───────────────────────────────────────────────
  const filtered =
    query.trim().length > 0
      ? clients.filter(
          (c) =>
            c.name.toLowerCase().includes(query.toLowerCase()) ||
            (c.email || "").toLowerCase().includes(query.toLowerCase())
        )
      : clients

  const totalMrr = clients.reduce((s, c) => s + c.monthlyFee, 0)
  const totalSites = clients.reduce((s, c) => s + c.sites.length, 0)
  const totalOpenTasks = clients.reduce((s, c) => s + c.openTasksCount, 0)
  const totalHours = clients.reduce((s, c) => s + c.hoursPerMonth, 0)

  // Open tasks grouped per site, for the selected client's detail panel
  const selectedTasksBySite = (() => {
    if (!selected) return new Map<string, Task[]>()
    const map = new Map<string, Task[]>()
    for (const site of selected.sites) {
      const list = tasks.filter((t) => t.siteId === site.id && t.status !== "done")
      if (list.length > 0) map.set(site.id, list)
    }
    return map
  })()

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-extrabold tracking-tight text-white">
            Klanten
          </h1>
          <p className="text-[13px] text-zinc-500">
            Hazier-klanten met sites onder beheer — recurring &amp; eenmalig
          </p>
        </div>
        <div className="flex items-center gap-2">
          {clients.some((c) => c.isLegacy) && (
            <Button
              onClick={runBackfill}
              disabled={backfillRunning}
              variant="outline"
              className="border-white/[0.08] bg-transparent text-zinc-400 hover:bg-white/[0.04] hover:text-white"
              title="Zet bestaande klant-sites om naar echte Client-records (v2 migratie)"
            >
              {backfillRunning ? "Backfillen…" : "Backfill legacy klanten"}
            </Button>
          )}
          <Button
            onClick={() => setNewOpen(true)}
            className="bg-[#F5911E] hover:bg-[#F5911E]/90 text-black font-semibold"
          >
            + Nieuwe klant
          </Button>
        </div>
      </div>
      {backfillResult && (
        <div className="rounded-lg border border-[#F5911E]/30 bg-[#F5911E]/10 px-4 py-2 text-[12px] text-[#F5911E]">
          {backfillResult}
        </div>
      )}

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Klanten", value: String(clients.length), sub: "Actief in portfolio" },
          {
            label: "MRR klanten",
            value: `€${totalMrr.toLocaleString("nl-BE")}`,
            sub: "Som maandfees",
          },
          {
            label: "Uren / maand",
            value: String(totalHours),
            sub: `${totalSites} sites beheerd`,
          },
          {
            label: "Open tasks",
            value: String(totalOpenTasks),
            sub: "Klant-gelinkt",
          },
        ].map((m) => (
          <div
            key={m.label}
            className="rounded-xl border border-white/[0.06] bg-zinc-800/30 p-4"
          >
            <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
              {m.label}
            </p>
            <p className="text-[24px] font-extrabold tracking-tight text-white mt-1 tabular-nums">
              {loading ? "…" : m.value}
            </p>
            <p className="text-[10px] text-zinc-600 mt-0.5">{m.sub}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-3">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Zoek klant op naam of email…"
          className="max-w-sm bg-zinc-800/50 border-white/[0.08] text-white placeholder:text-zinc-600"
        />
        {query && (
          <span className="text-[11px] text-zinc-500">
            {filtered.length} resultaten
          </span>
        )}
      </div>

      {/* Clients table */}
      <div className="rounded-xl border border-white/[0.06] bg-zinc-800/20 overflow-hidden">
        <div className="grid grid-cols-[1fr_120px_90px_100px_120px_100px] gap-3 px-4 py-2.5 border-b border-white/[0.06] text-[9px] font-bold uppercase tracking-wider text-zinc-500">
          <span>Klant</span>
          <span>Contract</span>
          <span className="text-right">Sites</span>
          <span className="text-right">MRR</span>
          <span className="text-right">Uren / m</span>
          <span className="text-right">Open tasks</span>
        </div>
        <div className="divide-y divide-white/[0.04]">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-[1fr_120px_90px_100px_120px_100px] gap-3 px-4 py-3"
              >
                <div className="h-4 w-2/3 rounded bg-zinc-800/60 animate-pulse" />
                <div className="h-4 w-20 rounded bg-zinc-800/60 animate-pulse" />
                <div className="h-4 w-8 rounded bg-zinc-800/60 animate-pulse ml-auto" />
                <div className="h-4 w-14 rounded bg-zinc-800/60 animate-pulse ml-auto" />
                <div className="h-4 w-12 rounded bg-zinc-800/60 animate-pulse ml-auto" />
                <div className="h-4 w-8 rounded bg-zinc-800/60 animate-pulse ml-auto" />
              </div>
            ))
          ) : filtered.length > 0 ? (
            filtered.map((c) => {
              const pay = c.paymentStatus
                ? paymentStatusConfig[c.paymentStatus]
                : null
              return (
                <div
                  key={c.name}
                  onClick={() => {
                    setSelected(c)
                    setDetailOpen(true)
                  }}
                  className="grid grid-cols-[1fr_120px_90px_100px_120px_100px] gap-3 px-4 py-3 items-center transition-colors hover:bg-zinc-800/40 cursor-pointer"
                >
                  <div className="min-w-0">
                    <p className="text-[12px] font-semibold text-white truncate">
                      {c.name}
                    </p>
                    <p className="text-[10px] text-zinc-500 truncate">
                      {c.email || "—"}
                    </p>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-zinc-400 truncate">
                      {c.contractType ? contractTypeLabels[c.contractType] || c.contractType : "—"}
                    </span>
                    {pay && (
                      <div className="flex items-center gap-1">
                        <span className={cn("h-1.5 w-1.5 rounded-full", pay.dot)} />
                        <span className={cn("text-[9px]", pay.text)}>{pay.label}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-[11px] font-bold text-white tabular-nums text-right">
                    {c.sites.length}
                  </p>
                  <p className="text-[11px] font-bold text-white tabular-nums text-right">
                    €{c.monthlyFee.toLocaleString("nl-BE")}
                  </p>
                  <p className="text-[11px] text-zinc-400 tabular-nums text-right">
                    {c.hoursPerMonth || "—"}
                  </p>
                  <p className="text-[11px] font-bold text-white tabular-nums text-right">
                    {c.openTasksCount > 0 ? c.openTasksCount : "—"}
                  </p>
                </div>
              )
            })
          ) : (
            <div className="py-10 text-center">
              <p className="text-[12px] text-zinc-500">
                {clients.length === 0
                  ? "Nog geen klanten"
                  : "Geen klanten matchen de zoekopdracht"}
              </p>
              {clients.length === 0 && (
                <Button
                  onClick={() => setNewOpen(true)}
                  className="mt-3 bg-[#F5911E] hover:bg-[#F5911E]/90 text-black font-semibold"
                >
                  + Eerste klant toevoegen
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ─── Detail panel (slide-in) ──────────────────── */}
      <Sheet open={detailOpen} onOpenChange={setDetailOpen}>
        <SheetContent className="bg-zinc-900 border-l border-white/[0.06] text-white w-full sm:max-w-lg overflow-y-auto">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle className="text-white text-[20px]">
                  {selected.name}
                </SheetTitle>
                <SheetDescription className="text-zinc-500 text-[12px]">
                  {selected.email || "Geen email"}
                </SheetDescription>
              </SheetHeader>

              {/* Actions */}
              <div className="mt-4 flex gap-2">
                <Button
                  onClick={() => setEditOpen(true)}
                  variant="outline"
                  className="border-white/[0.08] bg-transparent text-zinc-300 hover:bg-white/[0.04] hover:text-white"
                >
                  Bewerken
                </Button>
                <Button
                  onClick={() => setDetailOpen(false)}
                  variant="outline"
                  className="border-white/[0.08] bg-transparent text-zinc-500 hover:bg-white/[0.04] hover:text-white"
                >
                  Sluiten
                </Button>
              </div>

              {/* Contract */}
              <div className="mt-5 space-y-3 border-y border-white/[0.06] py-4">
                <p className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">
                  Contract
                </p>
                <DetailRow
                  label="Type"
                  value={
                    selected.contractType
                      ? contractTypeLabels[selected.contractType] || selected.contractType
                      : "—"
                  }
                />
                <DetailRow
                  label="Maandfee"
                  value={`€${selected.monthlyFee.toLocaleString("nl-BE")}`}
                />
                <DetailRow
                  label="Uren / maand"
                  value={selected.hoursPerMonth ? String(selected.hoursPerMonth) : "—"}
                />
                <DetailRow
                  label="Uurprijs effectief"
                  value={
                    selected.hoursPerMonth && selected.hoursPerMonth > 0
                      ? `€${(selected.monthlyFee / selected.hoursPerMonth).toFixed(0)}/u`
                      : "—"
                  }
                />
                <DetailRow
                  label="Start / eind"
                  value={
                    selected.contractStart
                      ? `${new Date(selected.contractStart).toLocaleDateString("nl-BE")}${
                          selected.contractEnd
                            ? ` → ${new Date(selected.contractEnd).toLocaleDateString("nl-BE")}`
                            : " (doorlopend)"
                        }`
                      : "—"
                  }
                />
                <DetailRow
                  label="Volgende factuur"
                  value={
                    selected.nextInvoiceDate
                      ? new Date(selected.nextInvoiceDate).toLocaleDateString("nl-BE")
                      : "—"
                  }
                />
              </div>

              {/* Sites */}
              <div className="mt-5">
                <p className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider mb-3">
                  Sites onder beheer ({selected.sites.length})
                </p>
                {selected.sites.length === 0 ? (
                  <p className="text-[11px] text-zinc-600 italic">Geen sites gelinkt</p>
                ) : (
                  <div className="space-y-2">
                    {selected.sites.map((site) => {
                      const siteTasks = selectedTasksBySite.get(site.id) || []
                      return (
                        <div
                          key={site.id}
                          className="rounded-lg border border-white/[0.06] bg-zinc-800/30 p-3"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <a
                                href={`/portfolio?site=${site.id}`}
                                className="text-[12px] font-semibold text-white hover:text-[#F5911E] truncate block"
                              >
                                {site.domain}
                              </a>
                              <div className="flex items-center gap-2 mt-1 text-[10px] text-zinc-500">
                                <span
                                  className={cn(
                                    "h-1.5 w-1.5 rounded-full",
                                    site.status === "live"
                                      ? "bg-emerald-400"
                                      : "bg-zinc-500"
                                  )}
                                />
                                <span>{site.status}</span>
                                {site.monthlyFee != null && (
                                  <span className="ml-2">
                                    €{site.monthlyFee.toLocaleString("nl-BE")}/m
                                  </span>
                                )}
                                {site.hoursPerMonth != null && (
                                  <span>· {site.hoursPerMonth}u/m</span>
                                )}
                              </div>
                              {/* Mini GA/GSC slot */}
                              <div className="mt-2 flex items-center gap-3 text-[10px]">
                                {site.monthlyTraffic != null ? (
                                  <span className="text-zinc-400">
                                    {site.monthlyTraffic.toLocaleString("nl-BE")} sessies/m
                                  </span>
                                ) : null}
                                {site.seoScore != null ? (
                                  <span className="text-zinc-400">
                                    SEO {site.seoScore}/100
                                  </span>
                                ) : null}
                                {site.topKeyword ? (
                                  <span className="text-zinc-400 truncate">
                                    #{site.topPosition || "?"} {site.topKeyword}
                                  </span>
                                ) : null}
                                {site.monthlyTraffic == null &&
                                  site.seoScore == null &&
                                  !site.topKeyword && (
                                    <span className="text-zinc-600 italic">
                                      GA/GSC: wacht op FORGE koppeling
                                    </span>
                                  )}
                              </div>
                            </div>
                          </div>
                          {siteTasks.length > 0 && (
                            <div className="mt-3 pt-2 border-t border-white/[0.04]">
                              <p className="text-[9px] uppercase text-zinc-500 font-semibold tracking-wider mb-1.5">
                                Open tasks ({siteTasks.length})
                              </p>
                              <ul className="space-y-1">
                                {siteTasks.slice(0, 5).map((t) => (
                                  <li
                                    key={t.id}
                                    className="text-[11px] text-zinc-300 flex items-center gap-2"
                                  >
                                    <span
                                      className={cn(
                                        "h-1 w-1 rounded-full shrink-0",
                                        t.status === "in-progress"
                                          ? "bg-[#F5911E]"
                                          : "bg-zinc-500"
                                      )}
                                    />
                                    <span className="truncate">{t.title}</span>
                                    {t.assignee && (
                                      <span className="text-[9px] text-zinc-500 uppercase ml-auto shrink-0">
                                        {t.assignee}
                                      </span>
                                    )}
                                  </li>
                                ))}
                                {siteTasks.length > 5 && (
                                  <li className="text-[10px] text-zinc-600 italic">
                                    +{siteTasks.length - 5} meer
                                  </li>
                                )}
                              </ul>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Linked projects */}
              {selected.projects.length > 0 && (
                <div className="mt-5">
                  <p className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider mb-3">
                    Projecten ({selected.projects.length})
                  </p>
                  <div className="space-y-1">
                    {selected.projects.map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center justify-between text-[11px] rounded-md bg-zinc-800/30 px-2 py-1.5"
                      >
                        <span className="text-zinc-300">{p.name}</span>
                        {p.monthlyFee != null && (
                          <span className="text-zinc-500">
                            €{p.monthlyFee.toLocaleString("nl-BE")}/m
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reporting / billing placeholder */}
              <div className="mt-5 pt-4 border-t border-white/[0.06]">
                <p className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider mb-2">
                  Rapportage
                </p>
                <p className="text-[11px] text-zinc-500">
                  Uren × uurprijs registratie komt in v2 wanneer Task een{" "}
                  <code className="text-[10px] bg-zinc-800 px-1 py-0.5 rounded">hoursSpent</code>{" "}
                  veld heeft. Nu toont elke site het contract-uren quotum.
                </p>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* ─── Edit modal ──────────────────── */}
      <EditClientModal
        open={editOpen}
        onOpenChange={setEditOpen}
        client={selected}
        onSaved={() => {
          setEditOpen(false)
          fetchAll()
        }}
      />

      {/* ─── New client modal ──────────────────── */}
      <NewClientModal
        open={newOpen}
        onOpenChange={setNewOpen}
        onCreated={() => {
          setNewOpen(false)
          fetchAll()
        }}
      />
    </div>
  )
}

// ─── DetailRow helper ─────────────────────────────────────────
function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <p className="text-[10px] uppercase text-zinc-500 font-semibold tracking-wider">
        {label}
      </p>
      <p className="text-[12px] text-zinc-300 text-right">{value}</p>
    </div>
  )
}

// ─── EditClientModal ────────────────────────────────────────
interface EditClientModalProps {
  open: boolean
  onOpenChange: (v: boolean) => void
  client: ClientAgg | null
  onSaved: () => void
}

function EditClientModal({ open, onOpenChange, client, onSaved }: EditClientModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [contractType, setContractType] = useState("retainer")
  const [monthlyFee, setMonthlyFee] = useState("")
  const [hoursPerMonth, setHoursPerMonth] = useState("")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (open && client) {
      setName(client.name)
      setEmail(client.email || "")
      setContractType(client.contractType || "retainer")
      setMonthlyFee(String(client.monthlyFee || ""))
      setHoursPerMonth(String(client.hoursPerMonth || ""))
    }
  }, [open, client])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!client) return
    setSubmitting(true)
    try {
      // Bulk update all sites belonging to this client
      // Split the client's monthlyFee and hoursPerMonth evenly over sites
      const siteCount = client.sites.length
      if (siteCount === 0) {
        alert("Klant heeft geen sites. Voeg eerst een site toe via /portfolio.")
        return
      }
      const feePerSite = monthlyFee ? Number(monthlyFee) / siteCount : 0
      const hoursPerSite = hoursPerMonth
        ? Math.round(Number(hoursPerMonth) / siteCount)
        : 0

      await Promise.all(
        client.sites.map((s) =>
          fetch(`/api/sites/${s.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              clientName: name,
              clientEmail: email || null,
              contractType,
              monthlyFee: feePerSite,
              hoursPerMonth: hoursPerSite,
              ownerType: "client",
            }),
          })
        )
      )
      onSaved()
    } catch (err) {
      alert("Fout: " + (err instanceof Error ? err.message : "onbekend"))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 border border-white/[0.08] text-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-white">Klant bewerken</DialogTitle>
          <DialogDescription className="text-zinc-500">
            Wijzigingen worden toegepast op alle {client?.sites.length || 0} sites van deze klant.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <label className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">
              Naam
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 bg-zinc-800/50 border-white/[0.08] text-white"
              required
            />
          </div>
          <div>
            <label className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 bg-zinc-800/50 border-white/[0.08] text-white"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">
                Contract
              </label>
              <Select value={contractType} onValueChange={setContractType}>
                <SelectTrigger className="mt-1 bg-zinc-800/50 border-white/[0.08] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-white/[0.08] text-white">
                  <SelectItem value="retainer">Retainer</SelectItem>
                  <SelectItem value="eenmalig">Eenmalig</SelectItem>
                  <SelectItem value="mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">
                Maandfee (totaal)
              </label>
              <Input
                type="number"
                value={monthlyFee}
                onChange={(e) => setMonthlyFee(e.target.value)}
                placeholder="€"
                className="mt-1 bg-zinc-800/50 border-white/[0.08] text-white"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">
                Uren/m (totaal)
              </label>
              <Input
                type="number"
                value={hoursPerMonth}
                onChange={(e) => setHoursPerMonth(e.target.value)}
                className="mt-1 bg-zinc-800/50 border-white/[0.08] text-white"
              />
            </div>
          </div>
          <p className="text-[10px] text-zinc-500 italic">
            Fee en uren worden gelijk verdeeld over de {client?.sites.length || 0} sites van deze klant.
          </p>

          <DialogFooter className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-white/[0.08] bg-transparent text-zinc-400 hover:bg-white/[0.04] hover:text-white"
            >
              Annuleren
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="bg-[#F5911E] hover:bg-[#F5911E]/90 text-black font-semibold"
            >
              {submitting ? "Opslaan…" : "Opslaan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// ─── NewClientModal ────────────────────────────────────────
interface NewClientModalProps {
  open: boolean
  onOpenChange: (v: boolean) => void
  onCreated: () => void
}

function NewClientModal({ open, onOpenChange, onCreated }: NewClientModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [firstDomain, setFirstDomain] = useState("")
  const [contractType, setContractType] = useState("retainer")
  const [monthlyFee, setMonthlyFee] = useState("")
  const [hoursPerMonth, setHoursPerMonth] = useState("")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (open) {
      setName("")
      setEmail("")
      setFirstDomain("")
      setContractType("retainer")
      setMonthlyFee("")
      setHoursPerMonth("")
    }
  }, [open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !firstDomain.trim()) return
    setSubmitting(true)
    try {
      // v2 flow: eerst Client record proberen aan te maken, dan de site koppelen
      // via clientId. Als de Client endpoint nog niet beschikbaar is (db:push
      // niet gerund), val stil terug op v1 (enkel site met clientName).
      let clientId: string | null = null
      try {
        const cRes = await fetch("/api/clients", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            email: email || null,
            contractType,
            status: "active",
          }),
        })
        if (cRes.ok) {
          const c = await cRes.json()
          if (c && c.id) clientId = c.id
        }
      } catch {
        // stil — fallback naar v1
      }

      const res = await fetch("/api/sites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          domain: firstDomain.trim(),
          status: "planned",
          category: "klant",
          techStack: [],
          ownerType: "client",
          clientName: name.trim(),
          clientEmail: email || null,
          contractType,
          monthlyFee: monthlyFee ? Number(monthlyFee) : 0,
          hoursPerMonth: hoursPerMonth ? Number(hoursPerMonth) : 0,
          ...(clientId ? { clientId } : {}),
        }),
      })
      if (!res.ok) throw new Error("Kon klant niet aanmaken")
      onCreated()
    } catch (err) {
      alert("Fout: " + (err instanceof Error ? err.message : "onbekend"))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 border border-white/[0.08] text-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-white">Nieuwe klant</DialogTitle>
          <DialogDescription className="text-zinc-500">
            We maken direct een eerste site aan voor deze klant. Meer sites kan je later toevoegen via /portfolio.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">
                Klantnaam
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Bv. Kristof Ponnet"
                className="mt-1 bg-zinc-800/50 border-white/[0.08] text-white"
                required
                autoFocus
              />
            </div>
            <div>
              <label className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 bg-zinc-800/50 border-white/[0.08] text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">
              Eerste site (domein)
            </label>
            <Input
              value={firstDomain}
              onChange={(e) => setFirstDomain(e.target.value)}
              placeholder="bv. kristofponnet.be"
              className="mt-1 bg-zinc-800/50 border-white/[0.08] text-white"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">
                Contract
              </label>
              <Select value={contractType} onValueChange={setContractType}>
                <SelectTrigger className="mt-1 bg-zinc-800/50 border-white/[0.08] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-white/[0.08] text-white">
                  <SelectItem value="retainer">Retainer</SelectItem>
                  <SelectItem value="eenmalig">Eenmalig</SelectItem>
                  <SelectItem value="mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">
                Maandfee
              </label>
              <Input
                type="number"
                value={monthlyFee}
                onChange={(e) => setMonthlyFee(e.target.value)}
                placeholder="€"
                className="mt-1 bg-zinc-800/50 border-white/[0.08] text-white"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">
                Uren / maand
              </label>
              <Input
                type="number"
                value={hoursPerMonth}
                onChange={(e) => setHoursPerMonth(e.target.value)}
                className="mt-1 bg-zinc-800/50 border-white/[0.08] text-white"
              />
            </div>
          </div>

          <DialogFooter className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-white/[0.08] bg-transparent text-zinc-400 hover:bg-white/[0.04] hover:text-white"
            >
              Annuleren
            </Button>
            <Button
              type="submit"
              disabled={submitting || !name.trim() || !firstDomain.trim()}
              className="bg-[#F5911E] hover:bg-[#F5911E]/90 text-black font-semibold"
            >
              {submitting ? "Aanmaken…" : "Aanmaken"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
