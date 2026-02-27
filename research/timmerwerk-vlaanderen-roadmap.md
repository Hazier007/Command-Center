# Timmerwerk Vlaanderen Roadmap 🗺️
**Gebaseerd op:** Wout de Scout keyword research (27/02/2026)  
**Strategie:** Programmatic stad × dienst model (zoals daklekkages.be)  
**Builder:** Jean-Cloud van Damme 🥊

---

## 🎯 Doel
Leadgen site voor timmermannen in Vlaanderen via programmatic content (stad × dienst combos).

**Model:** daklekkages.be-stijl  
**USP:** Lokale vakmannen, gratis offerte, geen voorrijkosten, ervaren  
**Conversie:** Offerte-formulier per pagina

---

## FASE 1: MVP Build (Week 1) 🚀
**Doel:** Live site met core functionaliteit + top 5 steden × 6 diensten  
**Pages:** ~40 totaal (home, 6 dienst-landingspagina's, 5 stad-landingspagina's, 30 stad×dienst combos)  
**Impact:** ⭐⭐⭐⭐⭐

### Todo's

#### 1.1 Project Setup
- [ ] Nieuw Next.js 14 project init
- [ ] TypeScript + Tailwind CSS v4
- [ ] Git repo: `Hazier007/timmerwerk-vlaanderen`
- [ ] Vercel project aanmaken + koppelen
- [ ] Domain: `timmerwerkVlaanderen.be` (of variant)

#### 1.2 Data Structuur
- [ ] Maak `/data/diensten.ts` met:
  - Gyproc (wanden/plafonds/zolder)
  - Houten terrassen
  - Carports
  - Veranda's
  - Dakkapellen
  - Renovatie algemeen
- [ ] Maak `/data/steden.ts` met top 5:
  - Antwerpen (Antwerpen, 560k)
  - Gent (Oost-Vlaanderen, 270k)
  - Brugge (West-Vlaanderen, 120k)
  - Leuven (Vlaams-Brabant, 105k)
  - Mechelen (Antwerpen, 90k)
- [ ] Prijs-ranges per dienst (uit Wout research)

#### 1.3 Homepage
- [ ] Hero: "Timmerman in Vlaanderen nodig?"
- [ ] USP's:
  - ✅ Gratis offerte binnen 24u
  - ✅ Lokale vakmannen (5 steden)
  - ✅ Geen voorrijkosten binnen provincie
  - ✅ 15+ jaar ervaring
- [ ] Diensten grid (6 cards met emoji + prijs-indicatie)
- [ ] Steden selector (5 top steden)
- [ ] CTA: "Vraag gratis offerte aan"
- [ ] Trust signals: ervaring, garantie, snelle reactie

#### 1.4 Dienst-Landingspagina's (6 totaal)
**Template per dienst:**
- [ ] H1: "[Dienst] in Vlaanderen"
- [ ] Uitleg wat dienst inhoudt (200 woorden)
- [ ] Prijsindicatie (range + BTW-voordeel vermelding)
- [ ] Wat te verwachten (proces uitleg)
- [ ] Steden waar beschikbaar (5 links)
- [ ] FAQ (3-5 vragen per dienst)
- [ ] CTA: Offerte-formulier
- [ ] Schema: Service markup

**Specifieke diensten:**
- [ ] `/gyproc` — Gyproc Plaatsen Vlaanderen
- [ ] `/houten-terrassen` — Houten Terras Aanleggen
- [ ] `/carports` — Carport Bouwen
- [ ] `/verandas` — Veranda Bouwen
- [ ] `/dakkapellen` — Dakkapel Plaatsen
- [ ] `/renovatie` — Renovatie Timmerman

#### 1.5 Stad-Landingspagina's (5 totaal)
**Template per stad:**
- [ ] H1: "Timmerman [Stad]"
- [ ] Intro: Waarom lokale timmerman (voorrijkosten, snelheid)
- [ ] Diensten grid (6 cards → link naar stad×dienst combos)
- [ ] Provincie-info (bijv. Antwerpen = Antwerpen)
- [ ] Trust: "15+ jaar actief in [stad]"
- [ ] CTA: Offerte-formulier
- [ ] Schema: LocalBusiness markup (per stad)

**Specifieke steden:**
- [ ] `/antwerpen` — Timmerman Antwerpen
- [ ] `/gent` — Timmerman Gent
- [ ] `/brugge` — Timmerman Brugge
- [ ] `/leuven` — Timmerman Leuven
- [ ] `/mechelen` — Timmerman Mechelen

#### 1.6 Stad × Dienst Combos (30 pagina's)
**Programmatic template:**
- [ ] H1: "[Dienst] [Stad]"
- [ ] Intro: Lokaal voordeel + dienst-specifiek (150 woorden)
- [ ] Prijs-indicatie (range + BTW-voordeel)
- [ ] Wat doen we:
  - Plaatsen/aanleggen
  - Afwerking
  - Garantie
- [ ] Geen voorrijkosten in [provincie]
- [ ] CTA: Offerte-formulier
- [ ] Schema: Service + LocalBusiness

**Voorbeeld URLs:**
- `/antwerpen/gyproc` — Gyproc Plaatsen Antwerpen
- `/gent/houten-terrassen` — Houten Terras Gent
- `/brugge/carports` — Carport Bouwen Brugge
- etc. (5 steden × 6 diensten = 30)

#### 1.7 Offerte-Formulier (Component)
- [ ] Inputs:
  - Naam
  - Email
  - Telefoon
  - Postcode (auto-validatie stad)
  - Dienst (dropdown, pre-selected op dienst-pagina)
  - Bericht (textarea)
- [ ] Submit → emailjs of Mailgun
- [ ] Bevestiging: "We nemen binnen 24u contact op"
- [ ] Privacy: GDPR-compliant disclaimer

#### 1.8 SEO Foundation
- [ ] Sitemap.xml (40 pagina's)
- [ ] Robots.txt
- [ ] Meta tags per pagina (title, description)
- [ ] Open Graph tags
- [ ] Schema markup:
  - LocalBusiness (per stad)
  - Service (per dienst)
  - FAQPage (op dienst-landingspagina's)
- [ ] Breadcrumbs (alle pagina's)

---

## FASE 2: Content Expansie (Week 2) 📝
**Doel:** Scale naar 20 steden + extra diensten  
**Impact:** ⭐⭐⭐⭐

### Todo's

#### 2.1 Stad-Expansie (15 extra)
**Top 6-20 steden Vlaanderen:**
- [ ] Aalst (88k)
- [ ] Kortrijk (78k)
- [ ] Hasselt (78k)
- [ ] Sint-Niklaas (78k)
- [ ] Oostende (72k)
- [ ] Genk (67k)
- [ ] Roeselare (64k)
- [ ] Vilvoorde (47k)
- [ ] Turnhout (46k)
- [ ] Brasschaat (40k)
- [ ] Zaventem (39k)
- [ ] Maasmechelen (39k)
- [ ] Heist-op-den-Berg (44k)
- [ ] Waregem (39k)
- [ ] Ieper (35k)

**Output:** 15 stad-landingspagina's + 90 stad×dienst combos (15×6)

#### 2.2 Extra Diensten
- [ ] `/pergolas` — Pergola Bouwen
- [ ] `/inbouwkasten` — Inbouwkasten Op Maat
- [ ] `/dakconstructie` — Dakconstructie/Herstelling
- [ ] `/ramen-deuren` — Ramen en Deuren Plaatsen (overlap schrijnwerker)

**Output:** 4 dienst-landingspagina's + 20 stad×dienst combos (4 diensten × top 5 steden)

#### 2.3 Prijspagina's (SEO long-tail)
- [ ] `/prijzen` — Timmerman Prijzen Vlaanderen
  - Uurloon ranges
  - Prijs per dienst (tabel)
  - BTW-voordelen (6%/9% renovaties >10 jaar)
  - Voorrijkosten uitleg
- [ ] `/prijzen/gyproc` — Gyproc Plaatsen Prijs
- [ ] `/prijzen/houten-terrassen` — Houten Terras Kosten
- [ ] (etc. per dienst)

#### 2.4 FAQ Sectie
- [ ] `/veelgestelde-vragen` — centrale FAQ
  - Wat kost een timmerman per uur?
  - Is BTW 6% of 21%?
  - Hoe lang duurt [dienst]?
  - Kan ik zelf materialen aanbrengen?
  - Wanneer is vergunning nodig?
- [ ] Schema: FAQPage markup

---

## FASE 3: Technical SEO & UX (Week 3) 🔧
**Doel:** Optimize voor rankings + conversie  
**Impact:** ⭐⭐⭐⭐

### Todo's

#### 3.1 Performance
- [ ] Lighthouse score > 90 (mobile & desktop)
- [ ] Image optimization (next/image)
- [ ] Server-side rendering check (SSG voor static pages)
- [ ] Lazy loading components

#### 3.2 Internal Linking
- [ ] Homepage → alle dienst-landingspagina's
- [ ] Homepage → top 5 stad-landingspagina's
- [ ] Dienst-landingspagina's → alle stad×dienst combos
- [ ] Stad-landingspagina's → alle stad×dienst combos
- [ ] Footer: sitemap links (diensten, steden, prijzen, FAQ)
- [ ] Breadcrumbs: correct hierarchy

#### 3.3 Local SEO
- [ ] Google Business Profile per stad (optioneel, als fysieke locaties)
- [ ] Schema LocalBusiness met NAP (naam, adres, telefoon)
- [ ] Embedden Google Maps per stad (optioneel)

#### 3.4 Conversie-Optimalisatie
- [ ] A/B test CTA's:
  - "Vraag offerte aan" vs "Ontvang gratis offerte"
  - Button colors (teal vs oranje)
- [ ] Trust badges: "15+ jaar ervaring", "100+ tevreden klanten"
- [ ] Testimonials (als beschikbaar, anders mock-ups voor MVP)

---

## FASE 4: Scale & Monitor (Week 4+) 📊
**Doel:** Track rankings, uitbreiden obv data  
**Impact:** ⭐⭐⭐

### Todo's

#### 4.1 Tracking Setup
- [ ] Google Analytics 4
- [ ] Google Search Console
- [ ] Track conversies: offerte-formulier submits
- [ ] Heatmaps (Hotjar/Clarity) — optioneel

#### 4.2 Rank Monitoring
- [ ] Top 30 keywords monitoren (uit Wout research)
- [ ] Weekly check: welke stad×dienst combos stijgen
- [ ] Adjust content op basis van stagnerende keywords

#### 4.3 Content Uitbreiding
- [ ] Blog: "Hoeveel kost een houten terras in 2026?"
- [ ] Gidsen: "Vergunning nodig voor carport?"
- [ ] Seizoensgebonden content: "Terras klaar voor de zomer"
- [ ] Long-tail keywords: "gyproc zolder isoleren prijs"

#### 4.4 Backlink Strategy
- [ ] Hazier.be → timmerwerk-vlaanderen.be link
- [ ] Submit naar België directories (Goudengids, etc.)
- [ ] Outreach naar bouw-blogs/sites
- [ ] Link van Command Center (hazier.be) projecten-pagina

---

## Prioriteiten Matrix

| Fase | Effort | Impact | Priority Score |
|------|--------|--------|----------------|
| **FASE 1: MVP Build** | High | ⭐⭐⭐⭐⭐ | **DO FIRST** |
| **FASE 2: Content Expansie** | High | ⭐⭐⭐⭐ | **DO SECOND** |
| **FASE 3: Technical SEO** | Medium | ⭐⭐⭐⭐ | **DO PARALLEL** |
| **FASE 4: Scale & Monitor** | Low | ⭐⭐⭐ | **ONGOING** |

---

## Sprint Planning (4-week MVP → Scale)

### Week 1: Core Build (MVP)
- ✅ Project setup + repo
- ✅ Data structuur (6 diensten, 5 steden)
- ✅ Homepage + offerte-formulier
- ✅ 6 dienst-landingspagina's
- ✅ 5 stad-landingspagina's
- ✅ 30 stad×dienst combos (programmatic)
- ✅ SEO foundation (sitemap, schema, meta)

### Week 2: Content Scale
- ✅ 15 extra steden (6-20)
- ✅ 90 extra stad×dienst combos
- ✅ 4 extra diensten (pergola, inbouwkasten, etc.)
- ✅ Prijspagina's
- ✅ FAQ sectie

### Week 3: SEO & UX
- ✅ Performance optimization (Lighthouse >90)
- ✅ Internal linking audit
- ✅ Local SEO (schema, maps)
- ✅ Conversie-optimalisatie (A/B tests)

### Week 4: Launch & Monitor
- ✅ Google Search Console setup
- ✅ Analytics tracking
- ✅ Deploy to production
- ✅ Domain koppelen
- ✅ Monitor rankings week 1
- ✅ Iterate obv data

---

## Success Metrics

**Week 4 (MVP Launch):**
- ✅ 40+ pagina's live (home, 6 diensten, 5 steden, 30 stad×dienst)
- ✅ Offerte-formulier werkend
- ✅ Google Search Console verified
- ✅ Lighthouse score > 90

**Maand 3:**
- 🎯 Top 10 ranking voor 5+ long-tail keywords ("timmerman [stad] [dienst]")
- 🎯 1.000+ organic sessions/maand
- 🎯 50+ offerte-aanvragen (conversie 5%)

**Maand 6:**
- 🎯 Top 3 ranking voor 10+ keywords
- 🎯 150+ pagina's live (20 steden × 10 diensten)
- 🎯 5.000+ organic sessions/maand
- 🎯 250+ offerte-aanvragen (conversie 5%)

---

## Tech Stack

### Core
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Hosting:** Vercel (auto-deploy via GitHub)
- **Forms:** Emailjs of Mailgun API

### SEO
- **Sitemap:** next-sitemap
- **Schema:** JSON-LD inline (per page)
- **Analytics:** Google Analytics 4
- **Search Console:** Google Search Console

### Optional (Fase 3+)
- **Heatmaps:** Hotjar of Microsoft Clarity
- **A/B Testing:** Vercel Edge Middleware
- **CRM:** Als leads toenemen (Pipedrive, HubSpot)

---

## Domain & Deployment

**Domain opties:**
1. `timmerwerkVlaanderen.be` (exact match)
2. `timmerwerk-vlaanderen.be` (kebab-case)
3. `timmermanVlaanderen.be` (alternatief)

**Vercel project:**
- Repo: `Hazier007/timmerwerk-vlaanderen`
- Branch: `main` (auto-deploy)
- Custom domain koppelen via Vercel DNS

---

## Notes

- **Deployment:** Vercel auto-deploy via GitHub (push naar main = live)
- **Content updates:** Seizoensgebonden content = recurring traffic boost (terrassen voorjaar/zomer)
- **Concurrentie edge:** Stad×dienst long-tail waar offerteplatforms niet op focussen
- **Domain voordeel:** Exact match = SEO boost voor core terms
- **Wout research:** Exacte volumes te bevestigen via Semrush/Ahrefs (vervolgstap)

---

## ⚠️ WACHT OP BART VOOR TAAKTOEWIJZING

**Protocol:**
- Dit roadmap is klaar en gepusht naar GitHub
- **Bart wijst taken toe** — ik start NIET automatisch
- Als taak toegewezen: bouw, test, commit, push, meld resultaat

---

**Built by:** Jean-Cloud van Damme 🥊  
**Research by:** Wout de Scout 🔭  
**For:** Bart @ Hazier  
**Last updated:** 27/02/2026
