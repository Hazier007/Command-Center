'use client'

import Image from 'next/image'
import { useState, useEffect, useCallback, useRef, useMemo, useTransition } from 'react'
import { Plus, X, Trash2, ChevronRight, Package, Search } from 'lucide-react'

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
  contentType: string
  compareItems: string
  targetKeyword: string
  wordCount: string
  createdAt: string
  updatedAt: string
}

type ListField = 'pros' | 'cons' | 'specs'

const KNOWN_SITES = [
  'hazier.be', 'poxy.be', 'ovl-slotenmaker.be', 'hondenpups.be', 'preppedia.com',
  'opblaasbareboot.be', 'travelsecrets.be', 'kinderopvangvlaanderen.be',
  'btw-calculator.be', 'loonberekening.be', 'buitendrogen.be', 'kleurcodes.be',
  'datumberekenen.be', 'goedkoopstroom.be', 'kmvergoeding.be', 'ibanvalidator.be',
  'huurrendementcalculator.be', 'zwangerschapscalculator.be', 'busstop.be',
  'collectpro.be', 'sleu.tel', 'huizenopkoper.be', 'interesten.be',
  'factuurfinanciering.be', 'domaining.company', 'elektrik.ink',
]

function siteColor(site: string): string {
  const colors = [
    'bg-cyan-500/20 text-cyan-400', 'bg-emerald-500/20 text-emerald-400',
    'bg-amber-500/20 text-amber-400', 'bg-pink-500/20 text-pink-400',
    'bg-violet-500/20 text-violet-400', 'bg-teal-500/20 text-teal-400',
    'bg-rose-500/20 text-rose-400', 'bg-lime-500/20 text-lime-400',
    'bg-sky-500/20 text-sky-400', 'bg-fuchsia-500/20 text-fuchsia-400',
  ]
  let hash = 0
  for (let i = 0; i < site.length; i++) hash = ((hash << 5) - hash + site.charCodeAt(i)) | 0
  return colors[Math.abs(hash) % colors.length]
}

const STATUSES = ['nieuw', 'research', 'content', 'review', 'live'] as const
const STATUS_COLORS: Record<string, string> = {
  nieuw: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  research: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  content: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  review: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  live: 'bg-green-500/20 text-green-400 border-green-500/30',
  archived: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30',
}

const CONTENT_TYPES = [
  { value: 'product', label: '📦 Product', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
  { value: 'review', label: '⭐ Review', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  { value: 'comparison', label: '⚔️ Vergelijking', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
  { value: 'buyerguide', label: '🛒 Buyer\'s Guide', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
  { value: 'article', label: '📝 Artikel', color: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30' },
  { value: 'listicle', label: '📊 Listicle', color: 'bg-pink-500/20 text-pink-400 border-pink-500/30' },
] as const

const CONTENT_TYPE_MAP: Record<string, typeof CONTENT_TYPES[number]> = Object.fromEntries(
  CONTENT_TYPES.map(ct => [ct.value, ct])
)

const empty: Omit<Product, 'id' | 'createdAt' | 'updatedAt'> = {
  name: '', site: KNOWN_SITES[0], category: '', affiliateUrl: '', imageUrl: '', price: '',
  status: 'nieuw', keyword: '', searchVolume: '', competition: '', suggestedTitle: '',
  metaDescription: '', seoNotes: '', description: '', pros: '[]', cons: '[]', specs: '[]',
  buyerGuide: '', assignedTo: '', notes: '', contentType: 'product', compareItems: '',
  targetKeyword: '', wordCount: '',
}

function parseJsonArray(s: string): string[] {
  try { const r = JSON.parse(s); return Array.isArray(r) ? r : [] } catch { return [] }
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

function SiteCombobox({ value, onChange, sites }: { value: string; onChange: (v: string) => void; sites: string[] }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const filtered = query ? sites.filter(s => s.toLowerCase().includes(query.toLowerCase())) : sites
  const showCustom = query && !sites.includes(query.toLowerCase()) && !filtered.length

  return (
    <div ref={ref} className="relative">
      <label className="text-xs text-zinc-400 mb-1 block">Site</label>
      <div className="flex items-center gap-1">
        <span className={`w-2 h-2 rounded-full shrink-0 ${siteColor(value).split(' ')[0]}`} />
        <input
          value={open ? query : value}
          onFocus={() => { setOpen(true); setQuery(value) }}
          onChange={e => { setQuery(e.target.value); setOpen(true) }}
          onKeyDown={e => { if (e.key === 'Enter' && query) { onChange(query); setOpen(false) } }}
          className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
          placeholder="Typ of kies site..."
        />
      </div>
      {open && (
        <div className="absolute z-50 mt-1 w-full max-h-48 overflow-y-auto bg-zinc-800 border border-white/10 rounded-lg shadow-xl">
          {filtered.map(s => (
            <button key={s} onClick={() => { onChange(s); setOpen(false) }}
              className={`w-full text-left px-3 py-1.5 text-sm hover:bg-zinc-700 flex items-center gap-2 ${s === value ? 'text-[#F5911E]' : 'text-white'}`}>
              <span className={`w-2 h-2 rounded-full shrink-0 ${siteColor(s).split(' ')[0]}`} />
              {s}
            </button>
          ))}
          {showCustom && (
            <button onClick={() => { onChange(query); setOpen(false) }}
              className="w-full text-left px-3 py-1.5 text-sm text-[#F5911E] hover:bg-zinc-700">
              + &quot;{query}&quot; toevoegen
            </button>
          )}
          {!filtered.length && !showCustom && <p className="px-3 py-2 text-xs text-zinc-500">Geen resultaten</p>}
        </div>
      )}
    </div>
  )
}

function PipeBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="text-xs bg-zinc-800 border border-white/10 px-3 py-1.5 rounded-lg hover:bg-zinc-700 hover:border-[#F5911E]/30 transition">
      {label}
    </button>
  )
}

function ProductCard({ product, onOpen }: { product: Product; onOpen: (product: Product) => void }) {
  const ct = CONTENT_TYPE_MAP[product.contentType] || CONTENT_TYPE_MAP.product

  return (
    <button onClick={() => onOpen(product)} className="w-full text-left bg-white/5 hover:bg-white/10 rounded-xl p-3 transition border border-white/5">
      {product.imageUrl && (
        <div className="relative w-full h-20 mb-2 rounded-lg overflow-hidden">
          <Image src={product.imageUrl} alt="" fill className="object-cover" unoptimized />
        </div>
      )}
      <div className="flex items-center gap-2 mb-1">
        <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${ct.color}`}>{ct.label}</span>
      </div>
      <p className="font-medium text-sm text-white truncate">{product.name}</p>
      <div className="flex items-center gap-2 mt-1.5">
        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${siteColor(product.site)}`}>{product.site}</span>
        {product.price && <span className="text-[10px] text-zinc-500">{product.price}</span>}
      </div>
      {product.assignedTo && <p className="text-[10px] text-zinc-500 mt-1">→ {product.assignedTo}</p>}
    </button>
  )
}

function ListEditor({
  label,
  items,
  onAdd,
  onRemove,
  onUpdate,
}: {
  label: string
  items: string[]
  onAdd: () => void
  onRemove: (index: number) => void
  onUpdate: (index: number, value: string) => void
}) {
  return (
    <div>
      <label className="text-xs text-zinc-400 mb-1 block">{label}</label>
      {items.map((item, i) => (
        <div key={i} className="flex gap-1 mb-1">
          <input value={item} onChange={e => onUpdate(i, e.target.value)} className="flex-1 bg-zinc-800 border border-white/10 rounded px-2 py-1 text-sm text-white" />
          <button onClick={() => onRemove(i)} className="text-red-400 hover:text-red-300 px-1"><X className="h-3 w-3" /></button>
        </div>
      ))}
      <button onClick={onAdd} className="text-xs text-[#F5911E] hover:underline mt-1">+ Toevoegen</button>
    </div>
  )
}

export default function ProductenPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [siteFilter, setSiteFilter] = useState<string>('alle')
  const [siteSearch, setSiteSearch] = useState('')
  const [contentTypeFilter, setContentTypeFilter] = useState<string>('alle')
  const [editing, setEditing] = useState<Product | null>(null)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState(empty)
  const [loading, setLoading] = useState(true)
  const [, startTransition] = useTransition()

  const allSites = useMemo(() => {
    const set = new Set(KNOWN_SITES)
    products.forEach(p => { if (p.site) set.add(p.site) })
    return [...set].sort((a, b) => a.localeCompare(b))
  }, [products])

  const filteredSites = useMemo(() => {
    if (!siteSearch) return allSites
    const q = siteSearch.toLowerCase()
    return allSites.filter(s => s.toLowerCase().includes(q))
  }, [allSites, siteSearch])

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (siteFilter !== 'alle') params.set('site', siteFilter)
    if (contentTypeFilter !== 'alle') params.set('contentType', contentTypeFilter)
    const qs = params.toString()
    const url = `/api/products${qs ? `?${qs}` : ''}`
    const res = await fetch(url)
    const data = await res.json()
    setProducts(data)
    setLoading(false)
  }, [siteFilter, contentTypeFilter])

  useEffect(() => {
    startTransition(() => {
      void fetchProducts()
    })
  }, [fetchProducts, startTransition])

  const openCreate = () => { setForm({ ...empty }); setCreating(true); setEditing(null) }
  const openEdit = (p: Product) => {
    setForm({
      name: p.name, site: p.site, category: p.category, affiliateUrl: p.affiliateUrl,
      imageUrl: p.imageUrl, price: p.price, status: p.status, keyword: p.keyword,
      searchVolume: p.searchVolume, competition: p.competition, suggestedTitle: p.suggestedTitle,
      metaDescription: p.metaDescription, seoNotes: p.seoNotes, description: p.description,
      pros: p.pros || '[]', cons: p.cons || '[]', specs: p.specs || '[]', buyerGuide: p.buyerGuide,
      assignedTo: p.assignedTo, notes: p.notes, contentType: p.contentType || 'product',
      compareItems: p.compareItems || '', targetKeyword: p.targetKeyword || '',
      wordCount: p.wordCount || '',
    })
    setEditing(p)
    setCreating(false)
  }
  const close = () => { setEditing(null); setCreating(false) }

  const save = async () => {
    if (creating) {
      await fetch('/api/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    } else if (editing) {
      await fetch(`/api/products/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    }
    close()
    await fetchProducts()
  }

  const del = async () => {
    if (!editing || !confirm('Item verwijderen?')) return
    await fetch(`/api/products/${editing.id}`, { method: 'DELETE' })
    close()
    await fetchProducts()
  }

  const trigger = async (status: string, assignedTo: string) => {
    setForm(f => ({ ...f, status, assignedTo }))
  }

  const setFormValue = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const filtered = products
  const listItems = useMemo(() => ({
    pros: parseJsonArray(form.pros),
    cons: parseJsonArray(form.cons),
    specs: parseJsonArray(form.specs),
  }), [form.pros, form.cons, form.specs])

  const updateListField = useCallback((field: ListField, items: string[]) => {
    setFormValue(field, JSON.stringify(items))
  }, [])

  const addListItem = useCallback((field: ListField) => {
    updateListField(field, [...listItems[field], ''])
  }, [listItems, updateListField])

  const removeListItem = useCallback((field: ListField, index: number) => {
    updateListField(field, listItems[field].filter((_, idx) => idx !== index))
  }, [listItems, updateListField])

  const changeListItem = useCallback((field: ListField, index: number, value: string) => {
    const next = [...listItems[field]]
    next[index] = value
    updateListField(field, next)
  }, [listItems, updateListField])

  const modal = creating || editing
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Package className="h-6 w-6 text-[#F5911E]" />
            <h1 className="text-2xl font-bold">Content Engine</h1>
          </div>
          <button onClick={openCreate} className="flex items-center gap-2 bg-[#F5911E] text-black font-semibold px-4 py-2 rounded-xl hover:bg-[#F5911E]/90 transition">
            <Plus className="h-4 w-4" /> Toevoegen
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <button onClick={() => setContentTypeFilter('alle')}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${contentTypeFilter === 'alle' ? 'bg-[#F5911E] text-black' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'}`}>
            Alle
          </button>
          {CONTENT_TYPES.map(ct => (
            <button key={ct.value} onClick={() => setContentTypeFilter(ct.value)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${contentTypeFilter === ct.value ? 'bg-[#F5911E] text-black' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'}`}>
              {ct.label}
            </button>
          ))}
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
              <input
                value={siteSearch}
                onChange={e => setSiteSearch(e.target.value)}
                placeholder="Zoek site..."
                className="w-full bg-zinc-800 border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-sm text-white placeholder:text-zinc-500"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
            <button onClick={() => setSiteFilter('alle')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition ${siteFilter === 'alle' ? 'bg-[#F5911E] text-black' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'}`}>
              Alle Sites ({allSites.length})
            </button>
            {filteredSites.map(s => (
              <button key={s} onClick={() => setSiteFilter(s)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition ${siteFilter === s ? 'bg-[#F5911E] text-black' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

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
                    {col.map(p => <ProductCard key={p.id} product={p} onOpen={openEdit} />)}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center pt-10 px-4 overflow-y-auto">
          <div className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-2xl p-6 mb-10 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">{creating ? 'Content Toevoegen' : 'Content Bewerken'}</h2>
              <button onClick={close} className="text-zinc-400 hover:text-white"><X className="h-5 w-5" /></button>
            </div>

            <div className="mb-4">
              <label className="text-xs text-zinc-400 mb-1 block">Content Type</label>
              <select value={form.contentType} onChange={e => setFormValue('contentType', e.target.value)}
                className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white">
                {CONTENT_TYPES.map(ct => <option key={ct.value} value={ct.value}>{ct.label}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <Field label="Naam / Titel" value={form.name} onChange={v => setFormValue('name', v)} />
              <SiteCombobox value={form.site} onChange={v => setFormValue('site', v)} sites={allSites} />
              <Field label="Categorie" value={form.category} onChange={v => setFormValue('category', v)} />

              {(form.contentType === 'product' || form.contentType === 'review') && (
                <Field label="Prijs" value={form.price} onChange={v => setFormValue('price', v)} />
              )}
              {(form.contentType === 'product' || form.contentType === 'review') && (
                <Field label="Affiliate URL" value={form.affiliateUrl} onChange={v => setFormValue('affiliateUrl', v)} />
              )}
              <Field label="Afbeelding URL" value={form.imageUrl} onChange={v => setFormValue('imageUrl', v)} />

              {(form.contentType === 'article' || form.contentType === 'listicle') && (
                <div className="sm:col-span-2">
                  <label className="text-xs text-[#F5911E] mb-1 block font-semibold">🎯 Target Keyword</label>
                  <input value={form.targetKeyword} onChange={e => setFormValue('targetKeyword', e.target.value)}
                    className="w-full bg-zinc-800 border border-[#F5911E]/30 rounded-lg px-3 py-2 text-sm text-white" />
                </div>
              )}

              {form.contentType === 'comparison' && (
                <div className="sm:col-span-2">
                  <label className="text-xs text-purple-400 mb-1 block font-semibold">⚔️ Items vergelijken (komma-gescheiden)</label>
                  <input value={form.compareItems} onChange={e => setFormValue('compareItems', e.target.value)}
                    placeholder="Item A, Item B, Item C"
                    className="w-full bg-zinc-800 border border-purple-500/30 rounded-lg px-3 py-2 text-sm text-white" />
                </div>
              )}

              {form.contentType === 'buyerguide' && (
                <div className="sm:col-span-2">
                  <label className="text-xs text-green-400 mb-1 block font-semibold">🛒 Product Links (één per regel)</label>
                  <textarea value={form.buyerGuide} onChange={e => setFormValue('buyerGuide', e.target.value)} rows={3}
                    placeholder="https://example.com/product-1&#10;https://example.com/product-2"
                    className="w-full bg-zinc-800 border border-green-500/30 rounded-lg px-3 py-2 text-sm text-white resize-y" />
                </div>
              )}

              <Field label="Gewenst aantal woorden" value={form.wordCount} onChange={v => setFormValue('wordCount', v)} />
            </div>

            {form.imageUrl && (
              <div className="relative w-full h-32 mb-4 rounded-xl overflow-hidden border border-white/10">
                <Image src={form.imageUrl} alt="" fill className="object-cover" unoptimized />
              </div>
            )}

            <div className="mb-4">
              <label className="text-xs text-zinc-400 mb-1 block">Status</label>
              <select value={form.status} onChange={e => setFormValue('status', e.target.value)} className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white mb-2">
                {[...STATUSES, 'archived'].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <div className="flex flex-wrap gap-2">
                <PipeBtn label="🔬 Trigger Research" onClick={() => trigger('research', 'Wout')} />
                <PipeBtn label="✍️ Trigger Content" onClick={() => trigger('content', 'Copycat')} />
                <PipeBtn label="👀 Naar Review" onClick={() => trigger('review', '')} />
                <PipeBtn label="✅ Goedkeuren → Live" onClick={() => trigger('live', '')} />
              </div>
            </div>

            <Section title="SEO (Wout)">
              <Field label="Zoekwoord" value={form.keyword} onChange={v => setFormValue('keyword', v)} />
              <Field label="Zoekvolume" value={form.searchVolume} onChange={v => setFormValue('searchVolume', v)} />
              <Field label="Concurrentie" value={form.competition} onChange={v => setFormValue('competition', v)} />
              <Field label="Voorgestelde Titel" value={form.suggestedTitle} onChange={v => setFormValue('suggestedTitle', v)} />
              <FieldArea label="Meta Beschrijving" value={form.metaDescription} onChange={v => setFormValue('metaDescription', v)} />
              <FieldArea label="SEO Notities" value={form.seoNotes} onChange={v => setFormValue('seoNotes', v)} />
            </Section>

            {(form.contentType === 'product' || form.contentType === 'review') && (
              <Section title="Content (Copycat)">
                <FieldArea label="Beschrijving" value={form.description} onChange={v => setFormValue('description', v)} />
                <ListEditor label="Voordelen (Pros)" items={listItems.pros} onAdd={() => addListItem('pros')} onRemove={i => removeListItem('pros', i)} onUpdate={(i, v) => changeListItem('pros', i, v)} />
                <ListEditor label="Nadelen (Cons)" items={listItems.cons} onAdd={() => addListItem('cons')} onRemove={i => removeListItem('cons', i)} onUpdate={(i, v) => changeListItem('cons', i, v)} />
                <ListEditor label="Specificaties" items={listItems.specs} onAdd={() => addListItem('specs')} onRemove={i => removeListItem('specs', i)} onUpdate={(i, v) => changeListItem('specs', i, v)} />
              </Section>
            )}

            {(form.contentType !== 'product' && form.contentType !== 'review') && (
              <Section title="Content">
                <FieldArea label="Beschrijving / Briefing" value={form.description} onChange={v => setFormValue('description', v)} />
              </Section>
            )}

            <Section title="Meta">
              <Field label="Toegewezen aan" value={form.assignedTo} onChange={v => setFormValue('assignedTo', v)} />
              <FieldArea label="Notities" value={form.notes} onChange={v => setFormValue('notes', v)} />
            </Section>

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
