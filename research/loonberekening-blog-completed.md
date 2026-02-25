# Loonberekening: Blog Sectie - COMPLETED ✅

**Completion Date:** 2026-02-25 21:35 GMT  
**Assigned to:** Jean-Cloud van Damme 🥊  
**Priority:** HIGH  
**Task ID:** cmm2domzd0002jo04nl2fpdjc

---

## What Was Built

### Routes Created

1. **`/blog`** — Blog overview page
   - Grid layout met alle artikels
   - Title, description, read time, date per artikel
   - CTA naar calculator
   - Clean, scannable design

2. **`/blog/[slug]`** — Dynamic article pages
   - 3 artikels: `hoe-bereken-je-nettoloon`, `verschil-bruto-netto`, `faq`
   - Full content rendering (markdown → HTML)
   - Schema.org markup (FAQPage + Article)
   - Related posts sectie
   - CTA naar calculator

### Content

#### 1. Hoe Bereken Je Je Nettoloon in België?
- **Slug:** `hoe-bereken-je-nettoloon`
- **Target KD:** 20
- **Read time:** 8 min
- **Content:** Stap-voor-stap guide (RSZ → beroepskosten → belastingen → werkbonus)
- **Highlights:** Rekenvoorbeelden, belastingschijven tabel, veelgemaakte fouten

#### 2. Verschil Bruto en Netto Loon
- **Slug:** `verschil-bruto-netto`
- **Target KD:** 25
- **Read time:** 6 min
- **Content:** Wat is bruto/netto, 3 voorbeelden (laag/modaal/hoog loon), infographic
- **Highlights:** Percentage overzicht per loonniveau, waarom België duur is

#### 3. FAQ - Veelgestelde Vragen
- **Slug:** `faq`
- **Target KD:** 18-30 (diverse keywords)
- **Read time:** 7 min
- **Content:** 8 FAQ items (bruto-netto, RSZ, belastingen, werkbonus, eindejaarspremie, etc.)
- **Schema.org:** FAQPage markup voor rich snippets

---

## Schema.org Markup

### FAQPage Schema (on /blog/faq)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Hoe bereken ik mijn nettoloon vanuit mijn brutoloon?",
      "acceptedAnswer": { ... }
    },
    // 8 questions total
  ]
}
```

**Goal:** Rich snippets in Google SERP (FAQ accordions).

### Article Schema (on blog posts)
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "...",
  "description": "...",
  "datePublished": "...",
  "author": { "@type": "Organization", "name": "Loonberekening.be" }
}
```

---

## SEO Metadata

| Page | Meta Title | Meta Description |
|---|---|---|
| `/blog` | Blog – Loonberekening.be | Alles over bruto en netto loon in België. Artikels, FAQ en uitleg... |
| `/blog/hoe-bereken-je-nettoloon` | Nettoloon Berekenen België – Stap voor Stap | Leer hoe je je nettoloon berekent in België. Van bruto naar netto in 4 stappen... |
| `/blog/verschil-bruto-netto` | Verschil Bruto en Netto Loon – Uitgelegd | Wat is het verschil tussen bruto en netto loon in België? Ontdek waar je geld naartoe gaat... |
| `/blog/faq` | Loonberekening FAQ – 8 Veelgestelde Vragen | Antwoorden op de 8 meest gestelde vragen over loonberekening in België... |

---

## Technical Implementation

### Data Structure
- **`lib/blogData.ts`** — Centralized blog post data
  - Interface: `BlogPost` (slug, title, description, metaTitle, metaDescription, date, readTime, content)
  - Functions: `getBlogPost(slug)`, `getAllBlogPosts()`
  - Easy to extend: add new posts = add object to array

### Static Generation
- All blog pages are **statically generated** at build time (SSG)
- `generateStaticParams()` generates paths for all blog post slugs
- Fast loading, no runtime data fetching

### Content Rendering
- Basic markdown-to-HTML conversion in-browser
- Supports: `## headers`, `**bold**`, `[links](url)`, `- lists`, tables
- Future: can swap for proper markdown library (remark/rehype) if needed

### Dark Mode
- All blog pages support dark theme
- `prose` classes from Tailwind Typography plugin
- Custom dark variants: `dark:prose-invert`, `dark:prose-headings:text-white`

---

## Build Status

✅ **Build Successful**
- **Pages built:** 14/14
- **New routes:** `/blog` (181 B) + 3 dynamic pages (181 B each)
- **Total pages now:** 10 → 14

### Build Output
```
Route (app)                              Size     First Load JS
├ ○ /blog                                181 B          96.1 kB
├ ● /blog/[slug]                         181 B          96.1 kB
├   ├ /blog/hoe-bereken-je-nettoloon
├   ├ /blog/verschil-bruto-netto
├   └ /blog/faq
```

**Bundle size:** Minimal (181 B per page = static text).

---

## Git Commit

**Commit:** `dda4e58`  
**Message:** "feat: Blog sectie met 3 artikels + FAQ + Schema.org markup"  
**Repository:** `Hazier007/loonberekening-be`  
**Branch:** `main`

**Files changed:**
- `app/blog/page.tsx` (new)
- `app/blog/[slug]/page.tsx` (new)
- `lib/blogData.ts` (new)

---

## SEO Strategy

### Target Keywords

| Article | Primary Keyword | KD | Volume |
|---|---|---|---|
| Hoe bereken je nettoloon | nettoloon berekenen belgië | 20 | 1.2k-2k |
| Verschil bruto netto | verschil bruto netto | 25 | 2k-3.5k |
| FAQ | diverse (RSZ, belastingen, werkbonus) | 18-30 | 800-1.5k |

### Content Optimization
- **Internal linking:** All articles link to calculator + related posts
- **CTA placements:** End of each article = calculator CTA
- **Schema markup:** FAQ + Article structured data for rich snippets
- **Read time:** Displayed on overview + article pages (trust signal)

### Expected Results
- **Week 1:** Pages indexed, internal traffic from homepage (once nav added)
- **Month 1:** Rank #20-30 for target keywords
- **Month 3:** Rank #10-15, featured snippets for FAQ items

---

## Next Steps

### Immediate (HIGH Priority)
1. **Header/Navigation** — Add "Blog" link to nav (currently no way to discover blog from homepage)
2. **Homepage Update** — Add "Lees meer" / "Blog" section linking to /blog
3. **Footer** — Add blog link in footer

### Medium Priority
4. **More Articles** — Add 2 more from research:
   - `werkbonus-belgie-2026.md` (already researched)
   - `loonindexatie-2026.md` (seasonal content)
5. **Internal Linking Audit** — Link from calculator pages to relevant blog posts
6. **Markdown Library** — Upgrade to proper parser (remark + rehype) for advanced formatting

---

## User Experience

### Navigation Flow
1. **Homepage** → (future: "Blog" nav link) → **Blog overview**
2. **Blog overview** → Click article → **Article page**
3. **Article page** → Click CTA → **Calculator**
4. **Article page** → Click related post → **Another article**

### Reading Experience
- Clean typography (Geist Sans font)
- Readable line length (max-w-3xl = 48rem)
- Dark mode friendly
- Scannable (headers, lists, tables)
- CTA placement: end of article (after value delivered)

---

## Testing Notes

### Manual Testing Checklist
- [x] Blog overview page renders all 3 posts
- [x] Dynamic routes work (`/blog/faq`, `/blog/hoe-bereken-je-nettoloon`, `/blog/verschil-bruto-netto`)
- [x] Metadata correct per page (title, description)
- [x] Schema.org JSON-LD renders in `<script>` tags
- [x] Related posts show (2 per article, excluding current)
- [x] CTA buttons link to homepage (calculator)
- [x] Dark mode renders correctly
- [x] Markdown formatting works (headers, bold, links, lists)

### Schema Validation
- [ ] Test FAQ page via [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Verify Article schema on blog posts

---

## Success Metrics (Expected)

### Week 1
- 🎯 4 blog pages indexed by Google
- 🎯 FAQ rich snippets eligible (pending Google crawl)

### Month 1
- 🎯 Rank #20-30 for 3 target keywords
- 🎯 100+ blog sessions/month (from organic + internal links)

### Month 3
- 🎯 Rank #10-15 for target keywords
- 🎯 Featured snippets for 2+ FAQ items
- 🎯 500+ blog sessions/month
- 🎯 10%+ conversion rate (blog → calculator usage)

---

## Notes

- **Content source:** All articles written by Wout de Scout 🔭, stored in `Command-Center/research/`
- **Markdown rendering:** Basic implementation (no external lib). Works for current content. Can upgrade later if needed.
- **Schema.org:** Implemented for SEO advantage. Google may take 2-4 weeks to start showing rich snippets.
- **No images:** MVP has text-only articles. Future: add infographics, screenshots of calculator.
- **Deployment:** Auto-deployed via Vercel (push to main = live).

---

**Status:** ✅ DONE  
**Deployed:** Live on `loonberekening.be/blog`  
**URLs:**
- https://loonberekening.be/blog
- https://loonberekening.be/blog/hoe-bereken-je-nettoloon
- https://loonberekening.be/blog/verschil-bruto-netto
- https://loonberekening.be/blog/faq

---

Built by Jean-Cloud van Damme 🥊  
For: Bart @ Hazier  
Project: loonberekening.be
