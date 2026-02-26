# Loonberekening.be Sprint — 26 feb 2026

**Status:** ✅ Alle taken completed  
**Repo:** Hazier007/loonberekening-be  
**Live:** loonberekening.be  
**Agent:** Jean-Cloud van Damme 🥊

---

## Taken overzicht

### ✅ Completed (7/7)

1. **Homepage Update CTAs**  
   - Grid met calculator cards  
   - Featured werkbonus card  
   - Quick links sectie  
   - Commit: `5972e40`

2. **Kinderen Feature** (/met-kinderen)  
   - Input voor kinderen ten laste  
   - Belastingvermindering €1750/kind  
   - Target KD: 18  
   - Commit: `44bb9e1`

3. **Zelfstandige Calculator** (/zelfstandige)  
   - RSZ 20,5% (hoger dan werknemers)  
   - Target KD: 35  
   - Commit: `44bb9e1`

4. **Loonstrook Generator** (/loonstrook)  
   - PDF export met breakdown  
   - Bruto/RSZ/belasting/netto details  
   - Target KD: 22  
   - Commit: `23fc9b0`

5. **Schema Markup** (alle pagina's)  
   - Calculator/FAQ/Article schema  
   - Rich Results compliant  
   - Commit: `6c96896`

6. **Meta + SEO Audit**  
   - Open Graph tags  
   - Twitter cards  
   - XML sitemap  
   - Robots.txt  
   - Commit: `75423dc` + `ccbd21a`

7. **Vergelijk Tool** (/vergelijk) — **Nieuwe build**  
   - Side-by-side comparison  
   - Bediende vs Arbeider vs Zelfstandige  
   - Interactive staafdiagram  
   - Real-time input  
   - Commit: `9e04340`

---

## Nieuwe features: /vergelijk

### Functionaliteit
- Input: bruto maandloon (slider/number)  
- Output: netto voor alle 3 statuten  
- Visuele bar chart met percentages  
- Color-coded cards (blue/orange/purple)  
- Explanation sectie met verschillen  
- CTAs naar detail calculators

### Tech
- Client-side React (useState)  
- Reused calculation logic  
- Dark mode support  
- Responsive grid (mobile: stack)  
- Tailwind v4 gradient backgrounds

### SEO Impact
- Target KD: Low (comparison/versus keywords)  
- Internal linking naar /bediende, /arbeider, /zelfstandige  
- Schema markup compatible (existing setup)

---

## Site status

**Live features:**
- ✅ Bruto → Netto calculator  
- ✅ Netto → Bruto calculator  
- ✅ Bediende calculator (KD 32)  
- ✅ Arbeider calculator (KD 30)  
- ✅ Zelfstandige calculator (KD 35)  
- ✅ Werkbonus calculator (featured)  
- ✅ Kinderen feature (KD 18)  
- ✅ Maaltijdcheques (KD 14)  
- ✅ Loonstrook PDF generator (KD 22)  
- ✅ Vergelijk tool (NEW)  
- ✅ Blog (3 artikels + FAQ)  
- ✅ Schema.org markup  
- ✅ Sitemap + robots.txt  
- ✅ Dark mode

**Tech stack:**
- Next.js 14  
- TypeScript  
- Tailwind CSS v4  
- jsPDF (loonstrook export)  
- Vercel deployment

---

## Next steps (suggestions)

### Content expansie
- Blog artikels over statuten vergelijken  
- FAQ sectie uitbreiden  
- Video tutorials (opt)

### SEO quick wins
- Google Search Console submit  
- Internal linking audit (auto-link tussen calculators)  
- Breadcrumbs implementeren  
- Lokale targeting (Vlaanderen/Brussel/Wallonië)

### Features (long-term)
- Jaarlijkse calculator (niet maandelijks)  
- Export naar Excel  
- Email opslaan (leadgen?)  
- Historische data (loon 2024 vs 2025)

---

**All tasks pushed to GitHub: Hazier007/loonberekening-be**  
**Deploy auto via Vercel**
