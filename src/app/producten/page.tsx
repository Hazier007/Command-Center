'use client'

import { useState, useEffect, useCallback } from 'react'
import { Plus, X, Trash2, ChevronRight, Package, ExternalLink } from 'lucide-react'

interface Product {
  id: string
  name: string
  site: string
  category: string
  affiliateUrl: string
  imageUrl: string
  price: string
  status: string
  keyword: string
  searchVolume: string
  competition: string
  suggestedTitle: string
  metaDescription: string
  seoNotes: string
  description: string
  pros: string
  cons: string
  specs: string
  buyerGuide: string
  assignedTo: string
  notes: string
  createdAt: string
  updatedAt: string
}

const SITES = ['opblaasbareboot', 'preppedia', 'hondenpups']
const STATUSES = ['nieuw', 'research', 'content', 'review', 'live'] as const
const STATUS_COLORS: Record<string, string> = {
  nieuw: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  research: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  content: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  review: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  live: 'bg-green-500/20 text-green-400 border-green-500/30',
  archived: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30',
}
const SITE_COLORS: Record<string, string> = {
  opblaasbareboot: 'bg-cyan-500/20 text-cyan-400',
  preppedia: 'bg-emerald-500/20 text-emerald-400',
  hondenpups: 'bg-amber-500/20 text-amber-400',
}

const empty: Omit<Product, 'id' | 'createdAt' | 'updatedAt'> = {
  name: '', site: SITES[0], category: '', affiliateUrl: '', imageUrl: '', price: '',
  status: 'nieuw', keyword: '', searchVolume: '', competition: '', suggestedTitle: '',
  metaDescription: '', seoNotes: '', description: '', pros: '[]', cons: '[]', specs: '[]',
  buyerGuide: '', assignedTo: '', notes: '',
}

function parseJsonArray(s: string): string[] {
  try { const r = JSON.parse(s); return Array.isArray(r) ? r : [] } catch { return [] }
}

export default function ProductenPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [siteFilter, setSiteFilter] = useState<string>('alle')
  const [editing, setEditing] = useState<Product | null>(null)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState(empty)
  const [loading, setLoading] = useState(true)

  const fetchProducts = useCallback(async () => {
    const url = siteFilter === 'alle' ? '/api/products' : `/api/products?site=${siteFilter}`
    const res = await fetch(url)
    const data = await res.json()
    setProducts(data)
    setLoading(false)
  }, [siteFilter])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  const openCreate = () => { setForm({ ...empty }); setCreating(true); setEditing(null) }
  const openEdit = (p: Product) => {
    setForm({ name: p.name, site: p.site, category: p.category, affiliateUrl: p.affiliateUrl, imageUrl: p.imageUrl, price: p.price, status: p.status, keyword: p.keyword, searchVolume: p.searchVolume, competition: p.competition, suggestedTitle: p.suggestedTitle, metaDescription: p.metaDescription, seoNotes: p.seoNotes, description: p.description, pros: p.pros || '[]', cons: p.cons || '[]', specs: p.specs || '[]', buyerGuide: p.buyerGuide, assignedTo: p.assignedTo, notes: p.notes })
    setEditing(p); setCreating(false)
  }
  const close = () => { setEditing(null); setCreating(false) }

  const save = async () => {
    if (creating) {
      await fetch('/api/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    } else if (editing) {
      await fetch(`/api/products/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    }
    close(); fetchProducts()
  }

  const del = async () => {
    if (!editing || !confirm('Product verwijderen?')) return
    await fetch(`/api/products/${editing.id}`, { method: 'DELETE' })
    close(); fetchProducts()
  }

  const trigger = async (status: string, assignedTo: string) => {
    setForm(f => ({ ...f, status, assignedTo }))
  }

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const filtered = products

  const ListEditor = ({ label, field }: { label: string; field: 'pros' | 'cons' | 'specs' }) => {
    const items = parseJsonArray(form[field])
    const add = () => set(field, JSON.stringify([...items, '']))
    const remove = (i: number) => set(field, JSON.stringify(items.filter((_, idx) => idx !== i)))
    const update = (i: number, v: string) => { const n = [...items]; n[i] = v; set(field, JSON.stringify(n)) }
    return (
      <div>
        <label className="text-xs text-zinc-400 mb-1 block">{label}</label>
        {items.map((item, i) => (
          <div key={i} className="flex gap-1 mb-1">
            <input value={item} onChange={e => update(i, e.target.value)} className="flex-1 bg-zinc-800 border border-white/10 rounded px-2 py-1 text-sm text-white" />
            <button onClick={() => remove(i)} className="text-red-400 hover:text-red-300 px-1"><X className="h-3 w-3" /></button>
          </div>
        ))}
        <button onClick={add} className="text-xs text-[#F5911E] hover:underline mt-1">+ Toevoegen</button>
      </div>
    )
  }

  const modal = creating || editing
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Package className="h-6 w-6 text-[#F5911E]" />
            <h1 className="text-2xl font-bold">Producten</h1>
          </div>
          <button onClick={openCreate} className="flex items-center gap-2 bg-[#F5911E] text-black font-semibold px-4 py-2 rounded-xl hover:bg-[#F5911E]/90 transition">
            <Plus className="h-4 w-4" /> Product Toevoegen
          </button>
        </div>

        {/* Site Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['alle', ...SITES].map(s => (
            <button key={s} onClick={() => setSiteFilter(s)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${siteFilter === s ? 'bg-[#F5911E] text-black' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'}`}>
              {s === 'alle' ? 'Alle' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>

        {/* Kanban */}
        {loading ? <p className="text-zinc-500">Laden...</p> : (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {STATUSES.map(status => {
              const col = filtered.filter(p => p.status === status)
              return (
                <div key={status} className="bg-zinc-900/50 rounded-2xl p-3 border border-white/5 min-h-[200px]">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${STATUS_COLORS[status]}`}>{status}</span>
                    <span className="text-xs text-zinc-500">{col.length}</span>
                  </div>
                  <div className="space-y-2">
                    {col.map(p => (
                      <button key={p.id} onClick={() => openEdit(p)} className="w-full text-left bg-white/5 hover:bg-white/10 rounded-xl p-3 transition border border-white/5">
                        {p.imageUrl && <img src={p.imageUrl} alt="" className="w-full h-20 object-cover rounded-lg mb-2" />}
                        <p className="font-medium text-sm text-white truncate">{p.name}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${SITE_COLORS[p.site] || 'bg-zinc-700 text-zinc-300'}`}>{p.site}</span>
                          {p.price && <span className="text-[10px] text-zinc-500">{p.price}</span>}
                        </div>
                        {p.assignedTo && <p className="text-[10px] text-zinc-500 mt-1">→ {p.assignedTo}</p>}
                      </button>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center pt-10 px-4 overflow-y-auto">
          <div className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-2xl p-6 mb-10 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">{creating ? 'Product Toevoegen' : 'Product Bewerken'}</h2>
              <button onClick={close} className="text-zinc-400 hover:text-white"><X className="h-5 w-5" /></button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <Field label="Naam" value={form.name} onChange={v => set('name', v)} />
              <div>
                <label className="text-xs text-zinc-400 mb-1 block">Site</label>
                <select value={form.site} onChange={e => set('site', e.target.value)} className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white">
                  {SITES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <Field label="Categorie" value={form.category} onChange={v => set('category', v)} />
              <Field label="Prijs" value={form.price} onChange={v => set('price', v)} />
              <Field label="Affiliate URL" value={form.affiliateUrl} onChange={v => set('affiliateUrl', v)} />
              <Field label="Afbeelding URL" value={form.imageUrl} onChange={v => set('imageUrl', v)} />
            </div>

            {form.imageUrl && <img src={form.imageUrl} alt="" className="w-full h-32 object-cover rounded-xl mb-4 border border-white/10" />}

            {/* Status + Pipeline Buttons */}
            <div className="mb-4">
              <label className="text-xs text-zinc-400 mb-1 block">Status</label>
              <select value={form.status} onChange={e => set('status', e.target.value)} className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white mb-2">
                {[...STATUSES, 'archived'].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <div className="flex flex-wrap gap-2">
                <PipeBtn label="🔬 Trigger Research" onClick={() => trigger('research', 'Wout')} />
                <PipeBtn label="✍️ Trigger Content" onClick={() => trigger('content', 'Copycat')} />
                <PipeBtn label="👀 Naar Review" onClick={() => trigger('review', '')} />
                <PipeBtn label="✅ Goedkeuren → Live" onClick={() => trigger('live', '')} />
              </div>
            </div>

            {/* SEO Section */}
            <Section title="SEO (Wout)">
              <Field label="Zoekwoord" value={form.keyword} onChange={v => set('keyword', v)} />
              <Field label="Zoekvolume" value={form.searchVolume} onChange={v => set('searchVolume', v)} />
              <Field label="Concurrentie" value={form.competition} onChange={v => set('competition', v)} />
              <Field label="Voorgestelde Titel" value={form.suggestedTitle} onChange={v => set('suggestedTitle', v)} />
              <FieldArea label="Meta Beschrijving" value={form.metaDescription} onChange={v => set('metaDescription', v)} />
              <FieldArea label="SEO Notities" value={form.seoNotes} onChange={v => set('seoNotes', v)} />
            </Section>

            {/* Content Section */}
            <Section title="Content (Copycat)">
              <FieldArea label="Beschrijving" value={form.description} onChange={v => set('description', v)} />
              <ListEditor label="Voordelen (Pros)" field="pros" />
              <ListEditor label="Nadelen (Cons)" field="cons" />
              <ListEditor label="Specificaties" field="specs" />
              <FieldArea label="Koopgids" value={form.buyerGuide} onChange={v => set('buyerGuide', v)} />
            </Section>

            {/* Meta */}
            <Section title="Meta">
              <Field label="Toegewezen aan" value={form.assignedTo} onChange={v => set('assignedTo', v)} />
              <FieldArea label="Notities" value={form.notes} onChange={v => set('notes', v)} />
            </Section>

            {/* Actions */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
              {editing && (
                <button onClick={del} className="flex items-center gap-1 text-red-400 hover:text-red-300 text-sm">
                  <Trash2 className="h-4 w-4" /> Verwijderen
                </button>
              )}
              <div className="flex gap-2 ml-auto">
                <button onClick={close} className="px-4 py-2 text-sm text-zinc-400 hover:text-white">Annuleren</button>
                <button onClick={save} className="px-4 py-2 text-sm bg-[#F5911E] text-black font-semibold rounded-xl hover:bg-[#F5911E]/90">Opslaan</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-xs text-zinc-400 mb-1 block">{label}</label>
      <input value={value} onChange={e => onChange(e.target.value)} className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
    </div>
  )
}

function FieldArea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="sm:col-span-2">
      <label className="text-xs text-zinc-400 mb-1 block">{label}</label>
      <textarea value={value} onChange={e => onChange(e.target.value)} rows={3} className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white resize-y" />
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="mb-4 group">
      <summary className="text-sm font-semibold text-[#F5911E] cursor-pointer flex items-center gap-1 mb-2">
        <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" /> {title}
      </summary>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-5">{children}</div>
    </details>
  )
}

function PipeBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="text-xs bg-zinc-800 border border-white/10 px-3 py-1.5 rounded-lg hover:bg-zinc-700 hover:border-[#F5911E]/30 transition">
      {label}
    </button>
  )
}
