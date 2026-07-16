"use client"

import { useEffect, useMemo, useState, type ReactNode } from "react"
import { AlertTriangle, Database, GitBranch, Globe2, LockKeyhole, Save, ShieldCheck, Target } from "lucide-react"

import { getRegistrySummary, localLeadOpsRegistry, paperclipGuardrails, type AccessState, type LocalLeadOpsRegistryItem, type QueueLane, type RegistryStatus } from "@/lib/locallead-ops-registry"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const statusClass: Record<RegistryStatus, string> = {
  complete: "border-emerald-500/30 bg-emerald-500/15 text-emerald-300",
  "needs-data": "border-amber-500/30 bg-amber-500/15 text-amber-200",
  "external-blocker": "border-red-500/30 bg-red-500/15 text-red-300",
  watch: "border-zinc-500/30 bg-zinc-500/15 text-zinc-300",
}

const laneClass: Record<QueueLane, string> = {
  "revenue-now": "border-[#F5911E]/30 bg-[#F5911E]/15 text-[#F5911E]",
  unblock: "border-sky-500/30 bg-sky-500/15 text-sky-300",
  build: "border-violet-500/30 bg-violet-500/15 text-violet-300",
  watch: "border-zinc-500/30 bg-zinc-500/15 text-zinc-300",
}

const accessClass: Record<AccessState, string> = {
  ok: "bg-emerald-500/15 text-emerald-300",
  missing: "bg-red-500/15 text-red-300",
  unknown: "bg-amber-500/15 text-amber-200",
  "not-needed": "bg-zinc-500/15 text-zinc-400",
}

const inputClass = "border-white/10 bg-black/30 text-white placeholder:text-zinc-600"
const selectClass = "h-10 rounded-md border border-white/10 bg-black/30 px-3 text-sm text-white"
const accessStates: AccessState[] = ["ok", "missing", "unknown", "not-needed"]
const statuses: RegistryStatus[] = ["complete", "needs-data", "external-blocker", "watch"]
const lanes: QueueLane[] = ["revenue-now", "unblock", "build", "watch"]
const priorities: LocalLeadOpsRegistryItem["priority"][] = ["P1", "P2", "P3", "Blocked"]

function accessLabel(label: string, value: AccessState) {
  return <span className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase ${accessClass[value]}`}>{label}: {value}</span>
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="space-y-1 text-xs font-bold uppercase tracking-wide text-zinc-500">
      <span>{label}</span>
      {children}
    </label>
  )
}

function asDomains(value: string) {
  return value
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function RegistryEditor({ items, selectedDomain, onSelectDomain, onChange, onSave, saving, saveState }: {
  items: LocalLeadOpsRegistryItem[]
  selectedDomain: string
  onSelectDomain: (domain: string) => void
  onChange: (domain: string, patch: Partial<LocalLeadOpsRegistryItem>) => void
  onSave: () => void
  saving: boolean
  saveState: string
}) {
  const selected = items.find((item) => item.domain === selectedDomain) ?? items[0]

  if (!selected) return null

  return (
    <Card className="border-[#F5911E]/20 bg-[radial-gradient(circle_at_top_left,_rgba(245,145,30,0.12),_transparent_24rem),rgba(24,24,27,0.88)] text-white shadow-none">
      <CardHeader>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Badge className="border-[#F5911E]/25 bg-[#F5911E]/15 text-[#F5911E]">Bewerkbaar</Badge>
            <CardTitle className="mt-3 flex items-center gap-2 text-2xl font-black">
              <Database className="h-5 w-5 text-[#F5911E]" /> Domein registry editor
            </CardTitle>
            <CardDescription className="mt-2 text-zinc-400">
              Vul repo, hosting, GSC, DNS, leadflow en blockers hier in. Opslaan schrijft naar <span className="font-mono text-zinc-200">data/locallead-ops-registry.json</span>.
            </CardDescription>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <select value={selected.domain} onChange={(event) => onSelectDomain(event.target.value)} className={selectClass}>
              {items.map((item) => <option key={item.domain} value={item.domain}>{item.domain}</option>)}
            </select>
            <Button onClick={onSave} disabled={saving} className="bg-[#F5911E] text-black hover:bg-[#F5911E]/90">
              <Save className="mr-2 h-4 w-4" /> {saving ? "Opslaan..." : "Opslaan"}
            </Button>
          </div>
        </div>
        {saveState ? <p className="text-sm text-zinc-300">{saveState}</p> : null}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 md:grid-cols-4">
          <Field label="Prioriteit">
            <select value={selected.priority} onChange={(event) => onChange(selected.domain, { priority: event.target.value as LocalLeadOpsRegistryItem["priority"] })} className={selectClass}>
              {priorities.map((value) => <option key={value} value={value}>{value}</option>)}
            </select>
          </Field>
          <Field label="Status">
            <select value={selected.status} onChange={(event) => onChange(selected.domain, { status: event.target.value as RegistryStatus })} className={selectClass}>
              {statuses.map((value) => <option key={value} value={value}>{value}</option>)}
            </select>
          </Field>
          <Field label="Queue lane">
            <select value={selected.queueLane} onChange={(event) => onChange(selected.domain, { queueLane: event.target.value as QueueLane })} className={selectClass}>
              {lanes.map((value) => <option key={value} value={value}>{value}</option>)}
            </select>
          </Field>
          <Field label="Branch">
            <Input value={selected.productionBranch} onChange={(event) => onChange(selected.domain, { productionBranch: event.target.value })} className={inputClass} />
          </Field>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <Field label="Repo">
            <Input value={selected.repo} onChange={(event) => onChange(selected.domain, { repo: event.target.value })} className={inputClass} />
          </Field>
          <Field label="Hosting">
            <Input value={selected.hosting} onChange={(event) => onChange(selected.domain, { hosting: event.target.value })} className={inputClass} />
          </Field>
          <Field label="Project">
            <Input value={selected.project} onChange={(event) => onChange(selected.domain, { project: event.target.value })} className={inputClass} />
          </Field>
          <Field label="GSC property">
            <Input value={selected.gscProperty} onChange={(event) => onChange(selected.domain, { gscProperty: event.target.value })} className={inputClass} />
          </Field>
        </div>

        <Field label="Production domains — één per lijn of komma-gescheiden">
          <Textarea value={selected.productionDomains.join("\n")} onChange={(event) => onChange(selected.domain, { productionDomains: asDomains(event.target.value) })} className={`${inputClass} min-h-20`} />
        </Field>

        <div className="grid gap-3 md:grid-cols-4">
          {(["github", "hosting", "gsc", "dns"] as const).map((key) => (
            <Field key={key} label={`${key} toegang`}>
              <select value={selected.access[key]} onChange={(event) => onChange(selected.domain, { access: { ...selected.access, [key]: event.target.value as AccessState } })} className={selectClass}>
                {accessStates.map((value) => <option key={value} value={value}>{value}</option>)}
              </select>
            </Field>
          ))}
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <Field label="Revenue signal">
            <Textarea value={selected.revenueSignal} onChange={(event) => onChange(selected.domain, { revenueSignal: event.target.value })} className={`${inputClass} min-h-24`} />
          </Field>
          <Field label="Leadflow">
            <Textarea value={selected.leadflow} onChange={(event) => onChange(selected.domain, { leadflow: event.target.value })} className={`${inputClass} min-h-24`} />
          </Field>
          <Field label="Partnerstatus">
            <Textarea value={selected.partnerStatus} onChange={(event) => onChange(selected.domain, { partnerStatus: event.target.value })} className={`${inputClass} min-h-24`} />
          </Field>
          <Field label="Blocker">
            <Textarea value={selected.blocker ?? ""} onChange={(event) => onChange(selected.domain, { blocker: event.target.value })} className={`${inputClass} min-h-24`} />
          </Field>
        </div>

        <Field label="Volgende veilige actie">
          <Textarea value={selected.nextSafeAction} onChange={(event) => onChange(selected.domain, { nextSafeAction: event.target.value })} className={`${inputClass} min-h-20`} />
        </Field>
      </CardContent>
    </Card>
  )
}

export function LocalLeadOpsGuardrails() {
  const [items, setItems] = useState<LocalLeadOpsRegistryItem[]>(localLeadOpsRegistry)
  const [selectedDomain, setSelectedDomain] = useState(localLeadOpsRegistry[0]?.domain ?? "")
  const [saving, setSaving] = useState(false)
  const [saveState, setSaveState] = useState("")
  const summary = useMemo(() => getRegistrySummary(items), [items])

  useEffect(() => {
    let cancelled = false

    fetch("/api/locallead/ops-registry", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("Registry laden mislukt")))
      .then((data: LocalLeadOpsRegistryItem[]) => {
        if (!cancelled && Array.isArray(data) && data.length > 0) {
          setItems(data)
          setSelectedDomain((current) => current || data[0].domain)
        }
      })
      .catch((error) => setSaveState(`Registry fallback geladen: ${error.message}`))

    return () => { cancelled = true }
  }, [])

  function updateItem(domain: string, patch: Partial<LocalLeadOpsRegistryItem>) {
    setItems((current) => current.map((item) => item.domain === domain ? { ...item, ...patch } : item))
  }

  async function saveItems() {
    setSaving(true)
    setSaveState("")

    try {
      const response = await fetch("/api/locallead/ops-registry", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      })
      const result = await response.json()

      if (!response.ok) throw new Error(result.error ?? "Opslaan mislukt")

      setItems(result.items)
      setSaveState("Opgeslagen. Agents lezen nu deze registry-data i.p.v. losse aannames.")
    } catch (error) {
      setSaveState(error instanceof Error ? error.message : "Opslaan mislukt")
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="space-y-4">
      <Card className="overflow-hidden border-sky-500/20 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.14),_transparent_26rem),rgba(24,24,27,0.88)] text-white shadow-none">
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <Badge className="border-sky-500/25 bg-sky-500/15 text-sky-300">Repo/deploy registry + agent gates</Badge>
              <CardTitle className="mt-4 flex items-center gap-2 text-3xl font-black md:text-4xl">
                <ShieldCheck className="h-8 w-8 text-sky-300" /> Anti-churn cockpit
              </CardTitle>
              <CardDescription className="mt-3 max-w-3xl text-base leading-7 text-zinc-300">
                Bart vult repo, hostingproject, domeinen en GSC aan. De rest van het systeem stuurt agents weg van geblokkeerde herhalingsloops en naar revenue-first acties.
              </CardDescription>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center lg:min-w-[520px]">
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4"><div className="text-2xl font-black">{summary.total}</div><div className="text-[10px] uppercase text-zinc-500">assets</div></div>
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4"><div className="text-2xl font-black text-[#F5911E]">{summary.revenueNow}</div><div className="text-[10px] uppercase text-zinc-500">revenue now</div></div>
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4"><div className="text-2xl font-black text-amber-200">{summary.needsData}</div><div className="text-[10px] uppercase text-zinc-500">data nodig</div></div>
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4"><div className="text-2xl font-black text-red-300">{summary.externalBlockers}</div><div className="text-[10px] uppercase text-zinc-500">blocked</div></div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-4">
          {paperclipGuardrails.map((rule) => (
            <div key={rule.title} className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <LockKeyhole className="mb-3 h-5 w-5 text-sky-300" />
              <div className="font-black">{rule.title}</div>
              <p className="mt-2 text-sm leading-6 text-zinc-400">{rule.detail}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <RegistryEditor
        items={items}
        selectedDomain={selectedDomain}
        onSelectDomain={setSelectedDomain}
        onChange={updateItem}
        onSave={saveItems}
        saving={saving}
        saveState={saveState}
      />

      <div className="grid gap-4 xl:grid-cols-2">
        {items.map((item) => (
          <Card key={item.domain} className="border-white/10 bg-zinc-900/75 text-white shadow-none">
            <CardHeader>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <CardTitle className="flex items-center gap-2 text-2xl font-black"><Globe2 className="h-5 w-5 text-[#F5911E]" /> {item.domain}</CardTitle>
                  <CardDescription className="mt-2 leading-6 text-zinc-400">{item.revenueSignal}</CardDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge className={laneClass[item.queueLane]}>{item.queueLane}</Badge>
                  <Badge className={statusClass[item.status]}>{item.status}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2 text-sm md:grid-cols-2">
                <div className="rounded-xl bg-white/[0.04] p-3"><div className="mb-1 flex items-center gap-1 text-xs uppercase text-zinc-500"><GitBranch className="h-3 w-3" /> Repo</div><div className="font-mono text-xs text-zinc-100">{item.repo}</div></div>
                <div className="rounded-xl bg-white/[0.04] p-3"><div className="mb-1 text-xs uppercase text-zinc-500">Branch</div><div className="font-mono text-xs text-zinc-100">{item.productionBranch}</div></div>
                <div className="rounded-xl bg-white/[0.04] p-3"><div className="mb-1 text-xs uppercase text-zinc-500">Hosting</div><div className="text-zinc-100">{item.hosting}</div></div>
                <div className="rounded-xl bg-white/[0.04] p-3"><div className="mb-1 text-xs uppercase text-zinc-500">Project</div><div className="text-zinc-100">{item.project}</div></div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-black"><Database className="h-4 w-4 text-sky-300" /> Bart/Lisa kan dit nu hierboven aanpassen</div>
                <div className="text-xs leading-5 text-zinc-400">Domeinen: {item.productionDomains.join(", ")} · GSC: {item.gscProperty}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {accessLabel("GitHub", item.access.github)}
                  {accessLabel("Hosting", item.access.hosting)}
                  {accessLabel("GSC", item.access.gsc)}
                  {accessLabel("DNS", item.access.dns)}
                </div>
              </div>

              {item.blocker ? (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.06] p-4">
                  <div className="flex items-center gap-2 text-sm font-black text-red-200"><AlertTriangle className="h-4 w-4" /> Blocker gate</div>
                  <p className="mt-2 text-sm leading-6 text-red-50/90">{item.blocker}</p>
                </div>
              ) : null}

              <div className="rounded-2xl border border-[#F5911E]/20 bg-[#F5911E]/[0.06] p-4">
                <div className="flex items-center gap-2 text-sm font-black text-[#F5911E]"><Target className="h-4 w-4" /> Volgende veilige actie</div>
                <p className="mt-2 text-sm leading-6 text-zinc-100">{item.nextSafeAction}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
