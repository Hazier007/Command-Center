# Poxy.be: Indexatiestrategie voor 1.080 Locatiepagina's

**Datum:** 2026-06-13 | **Update:** 2026-06-19
**Door:** Wout de Scout
**Issue:** LOC-84 (vervolg op LOC-77 thin content audit)
**Definitief pad:** `C:\Users\Bart\Projects\Command-Center\research\poxy\indexatiestrategie-1080-locatiepaginas-LOC84.md`

---

## UPDATE 2026-06-19 — Beslissing Bart

Bart heeft gekozen voor **Optie C**: alle locatiepagina's blijven indexeerbaar (geen noindex), sitemap opdelen in prioriteitslagen. Betonlook en polyurethaan worden als **unieke pagina's** behandeld (geen canonical clustering).

**Wat verandert:**
- ~~Fase 3 noindex~~ → Alle pagina's blijven `index, follow`
- ~~Polyurethaan canonical → betonlook~~ → Beide pagina's uniek houden, content differentiëren
- ~~Marmertapijt canonical → steentapijt~~ → Beide pagina's uniek houden
- Sitemap-strategie blijft: opdelen in prioriteitslagen voor crawl-efficiëntie
- Content-verrijking prioriteit: topsteden eerst, dan rest geleidelijk

**Implicaties:**
- Geen noindex tags nodig → minder technisch werk voor Jean-Cloud
- Wel: sitemap splitsen in 3 lagen (prioriteit hoog/midden/laag)
- Wel: content-differentiatie betonlook vs polyurethaan + marmertapijt vs steentapijt (PRIORITEIT)
- Google zal zelf bepalen welke pagina's het opneemt → monitoren via GSC coverage

---

## Samenvatting (origineel voorstel — deels herzien, zie update hierboven)

- **1.080 locatiepagina's** (8 producttypes × 135 locaties) met ~75% template-overlap vormen een doorway pages risico.
- **Slechts 5-7 pagina's geïndexeerd** (0.3%) — Google weigert thin duplicates op te nemen.
- ~~**Strategie: gefaseerde indexatie** — begin met 48 money pages, rest tijdelijk `noindex`.~~ → **Update: alles indexeerbaar, sitemap in prioriteitslagen.**
- ~~**Betonlook vs polyurethaan**: canonical clustering~~ → **Update: unieke pagina's, content differentiëren.**
- **Sitemap opsplitsen** in 3 segmenten: core, prioriteit-hoog, prioriteit-laag.

---

## 1. Huidige Situatie

| Metriek | Waarde |
|---|---|
| Totaal sitemap URLs | ~1.102 |
| Locatiepagina's | 1.080 (8 types × 135 locaties) |
| Producthoofdpagina's | 8 |
| Overige pagina's | ~14 (homepage, prijzen, over ons, etc.) |
| Geïndexeerd (site: search) | 5-7 |
| Indexatie-ratio | ~0.3% |
| Template-overlap | 75-80% per pagina |
| Betonlook↔Polyurethaan similariteit | ~0.991 per stad |

### Kernprobleem
Google classificeert de locatiepagina's als **doorway pages** of **thin content**. Met ~20-25% unieke content per pagina (stadsnaam, inwoners, woningprijs, renovatiegraad) en identieke dienstbeschrijvingen, FAQ's en CTA's is de meerwaarde voor de gebruiker per individuele pagina minimaal.

---

## 2. Faseplan Indexatie

### Fase 1: Money Pages (direct indexable) — 56 pagina's

**Rationale:** Begin met pagina's die het meeste commerciële potentieel hebben en waar unieke content het makkelijkst toe te voegen is.

#### 2a. Producthoofdpagina's (8 pagina's) — `index, follow`

| URL | Status |
|---|---|
| `/epoxy-vloer` | index |
| `/gietvloer` | index |
| `/steentapijt` | index |
| `/marmertapijt` | index |
| `/betonlook-vloer` | index |
| `/garage-vloer` | index |
| `/industriele-vloer` | index |
| `/polyurethaan-vloer` | index |

**Actie:** Deze pagina's versterken met unieke content (prijsgids, voor/nadelen, toepassingen). Geen noindex.

#### 2b. Topsteden × Kerndiensten (48 pagina's) — `index, follow`

**4 topsteden** (hoogste populatie, zoekvolume en renovatiegraad):

| Stad | Populatie | Woningprijs | Reno-graad | Rationale |
|---|---|---|---|---|
| **Antwerpen** | 556.138 | €477k | 8.5 | Grootste markt, meeste zoekvolume |
| **Gent** | 272.389 | €512k | 9.2 | Hoogste renovatiegraad, esthetiek-focus |
| **Leuven** | 104.009 | €550k | 9.5 | Hoogste prijzen, studentenmarkt |
| **Mechelen** | 89.313 | €450k | 8.2 | Groeimarkt, centraal gelegen |

**4 kerndiensten** (breedste commerciële appeal):

| Dienst | Rationale |
|---|---|
| `epoxy-vloer` | Kernproduct, hoogste zoekvolume |
| `gietvloer` | Tweede kernproduct |
| `garage-vloer` | Specifieke use-case, onderscheidend |
| `steentapijt` | Prijstoegankelijkste optie |

**Fase 1 locatie-URLs (48 stuks):**

```
/epoxy-vloer/antwerpen        /gietvloer/antwerpen
/epoxy-vloer/gent             /gietvloer/gent
/epoxy-vloer/leuven           /gietvloer/leuven
/epoxy-vloer/mechelen         /gietvloer/mechelen
/garage-vloer/antwerpen       /steentapijt/antwerpen
/garage-vloer/gent            /steentapijt/gent
/garage-vloer/leuven          /steentapijt/leuven
/garage-vloer/mechelen        /steentapijt/mechelen
```

Plus dezelfde 4 steden voor:
- `/betonlook-vloer/{stad}` — mits gedifferentieerd van polyurethaan (zie sectie 4)
- `/polyurethaan-vloer/{stad}` — canonical naar betonlook indien niet gedifferentieerd

**Voorwaarde voor indexatie fase 1:**
- Minimaal 500 woorden unieke content per pagina (lokale case study, specifieke referenties)
- Stadsdataset (inwoners, woningprijs, renovatiegraad) al aanwezig — uitbreiden met lokale context
- FAQ's per pagina uniek maken (niet copy-paste)

---

### Fase 2: Middelgrote steden (na 4-8 weken) — ~64 pagina's

**Trigger:** Fase 1 pagina's worden geïndexeerd en tonen positieve signalen in GSC.

**8 volgende steden:**

| Stad | Populatie | Rationale |
|---|---|---|
| Brugge | 119.869 | Toerisme, luxe renovaties |
| Hasselt | 80.215 | Limburg-hub |
| Kortrijk | 78.351 | West-Vlaanderen-hub |
| Aalst | 87.976 | Centraal Oost-Vlaanderen |
| Sint-Niklaas | 79.839 | Waasland-hub |
| Oostende | 73.076 | Kust, vastgoedmarkt |
| Genk | 67.908 | Limburg-oost |
| Roeselare | 65.681 | West-Vlaanderen-binnenland |

**Diensten:** Dezelfde 4 kerndiensten (epoxy, gietvloer, garage, steentapijt) = 32 pagina's.
Optioneel +4 extra diensten voor de 8 steden indien betonlook/polyurethaan/marmertapijt/industrieel voldoende gedifferentieerd = tot 64 pagina's.

---

### Fase 3 / Later: Long-tail locaties — `noindex, follow`

**Alle overige ~970 locatiepagina's** krijgen tijdelijk:

```html
<meta name="robots" content="noindex, follow">
```

**Waarom `follow` behouden:**
- Interne links blijven werken voor crawling
- Pagina's blijven bereikbaar voor gebruikers (offerte-formulier werkt gewoon)
- Linkjuice van eventuele backlinks stroomt door

**Wanneer van noindex naar index:**
- Pas wanneer de pagina voldoende unieke content heeft (min. 500 woorden)
- Pas wanneer fase 1+2 aantoonbaar geïndexeerd en rankend zijn
- Geleidelijk, max. 20-30 pagina's per maand toevoegen

---

## 3. Sitemap-strategie

### Huidige situatie
Eén grote sitemap.xml met alle ~1.102 URLs, allemaal priority 0.9.

### Nieuwe structuur — 3 sitemaps

```xml
<!-- sitemap-index.xml -->
<sitemapindex>
  <sitemap><loc>https://poxy.be/sitemap-core.xml</loc></sitemap>
  <sitemap><loc>https://poxy.be/sitemap-locaties-fase1.xml</loc></sitemap>
  <sitemap><loc>https://poxy.be/sitemap-locaties-fase2.xml</loc></sitemap>
</sitemapindex>
```

| Sitemap | Inhoud | Priority | Changefreq |
|---|---|---|---|
| `sitemap-core.xml` | Homepage, 8 producthoofdpagina's, prijzen, over ons | 1.0 / 0.8 | weekly |
| `sitemap-locaties-fase1.xml` | 48 fase-1 locatiepagina's | 0.7 | monthly |
| `sitemap-locaties-fase2.xml` | 64 fase-2 locatiepagina's | 0.6 | monthly |

**Belangrijk:** `noindex`-pagina's (fase 3) NIET opnemen in sitemaps. Google beschouwt URL in sitemap + noindex als tegenstrijdig signaal.

---

## 4. Betonlook-vloer vs Polyurethaan-vloer (~0.991 similariteit)

### Probleem
LOC-77 vond een cosine-similariteit van ~0.991 tussen `betonlook-vloer/{stad}` en `polyurethaan-vloer/{stad}` per stad. Dit is praktisch identieke content.

### Oorzaak
Beide producttypes:
- Hebben vergelijkbare prijsranges (betonlook €90-130, PU €90-140)
- Worden in dezelfde ruimtes toegepast
- Delen 90%+ van de template-tekst

### Oplossing: Canonical Clustering + Content Differentiatie

#### Stap 1: Canonical (direct implementeren)
Voor alle steden waar GEEN gedifferentieerde content is:

```html
<!-- Op /polyurethaan-vloer/bornem -->
<link rel="canonical" href="https://poxy.be/betonlook-vloer/bornem">
```

**Betonlook wordt de canonical** omdat:
- "Betonlook vloer" meer zoekvolume heeft dan "polyurethaan vloer" in België
- Het visueel aantrekkelijker is als landing page concept

#### Stap 2: Content differentiatie (voor fase 1+2 steden)
Maak polyurethaan-vloer pagina's inhoudelijk onderscheidend op:

| Betonlook-vloer (focus) | Polyurethaan-vloer (focus) |
|---|---|
| Esthetiek, design, kleuropties | UV-bestendigheid, buitengebruik |
| Woonkamer, keuken, loft | Garage, terras, balkon |
| Industriële look, trends | Chemische resistentie, slijtvastheid |
| Architecten, interieurdesign | Praktisch, onderhoud, levensduur |

Wanneer voldoende gedifferentieerd (>40% unieke content): canonical verwijderen, beide indexeren.

#### Stap 3: Dezelfde aanpak voor marmertapijt ↔ steentapijt
Similariteit hier ook hoog. `steentapijt` als canonical (breder zoekvolume), `marmertapijt` canonical naar steentapijt tenzij voldoende gedifferentieerd.

---

## 5. Eerste URLs voor GSC Inspectie

Na GSC-koppeling (BLOCKER — zie LOC-74), deze URLs prioritair indienen via "URL-inspectie > Indexering aanvragen":

### Batch 1 (dag 1) — Core pages
```
https://poxy.be/
https://poxy.be/epoxy-vloer
https://poxy.be/gietvloer
https://poxy.be/steentapijt
https://poxy.be/garage-vloer
https://poxy.be/betonlook-vloer
https://poxy.be/polyurethaan-vloer
https://poxy.be/marmertapijt
https://poxy.be/industriele-vloer
```

### Batch 2 (dag 2-3) — Topstad Antwerpen
```
https://poxy.be/epoxy-vloer/antwerpen
https://poxy.be/gietvloer/antwerpen
https://poxy.be/garage-vloer/antwerpen
https://poxy.be/steentapijt/antwerpen
```

### Batch 3 (dag 4-5) — Topstad Gent
```
https://poxy.be/epoxy-vloer/gent
https://poxy.be/gietvloer/gent
https://poxy.be/garage-vloer/gent
https://poxy.be/steentapijt/gent
```

### Batch 4-5 (dag 6-10) — Leuven + Mechelen
Zelfde 4 diensten per stad.

**Maximaal 10-15 URLs per dag** indienen via GSC URL-inspectie om niet als spam-indexering over te komen.

---

## 6. Instructies voor Jean-Cloud / Developer (HERZIEN 2026-06-19)

### ~~6a. Meta robots tag~~ — VERVALLEN
Alle pagina's blijven `index, follow`. Geen noindex tags nodig.

### ~~6b. Canonical tags~~ — VERVALLEN
Betonlook en polyurethaan worden als unieke pagina's behandeld. Geen canonical clustering.
Marmertapijt en steentapijt idem.

### 6a. Sitemap opsplitsen in prioriteitslagen (PRIORITEIT 1)

Vervang de huidige `sitemap.xml` door een sitemap-index met 3 sub-sitemaps:

```xml
<!-- sitemap-index.xml -->
<sitemapindex>
  <sitemap><loc>https://poxy.be/sitemap-core.xml</loc></sitemap>
  <sitemap><loc>https://poxy.be/sitemap-locaties-prioriteit.xml</loc></sitemap>
  <sitemap><loc>https://poxy.be/sitemap-locaties-overig.xml</loc></sitemap>
</sitemapindex>
```

| Sitemap | Inhoud | Priority | Changefreq |
|---|---|---|---|
| `sitemap-core.xml` | Homepage, 8 producthoofdpagina's, prijzen, over ons | 1.0 / 0.8 | weekly |
| `sitemap-locaties-prioriteit.xml` | Top-12 steden × 8 diensten (96 URLs) | 0.7 | monthly |
| `sitemap-locaties-overig.xml` | Alle overige locatiepagina's (~984 URLs) | 0.5 | monthly |

Alle pagina's worden opgenomen in sitemaps (geen noindex meer).

### 6b. Content-differentiatie betonlook vs polyurethaan (PRIORITEIT 1)

Maak polyurethaan-vloer pagina's inhoudelijk onderscheidend:

| Betonlook-vloer (focus) | Polyurethaan-vloer (focus) |
|---|---|
| Esthetiek, design, kleuropties | UV-bestendigheid, buitengebruik |
| Woonkamer, keuken, loft | Garage, terras, balkon |
| Industriële look, trends | Chemische resistentie, slijtvastheid |
| Architecten, interieurdesign | Praktisch, onderhoud, levensduur |

Zelfde aanpak voor marmertapijt vs steentapijt.

### 6c. Content-verrijking locatiepagina's (PRIORITEIT 2)

Begin met top-12 steden, daarna geleidelijk uitbreiden:
- FAQ-antwoorden uniek maken per stad (niet copy-paste)
- Lokale context uit `poxy-city-dataset-2026.json` al beschikbaar — beter integreren
- Minimaal 500 woorden unieke content per pagina voor prioriteitssteden

---

## 7. Risico-analyse

| Risico | Impact | Mitigatie |
|---|---|---|
| Google ziet mass-noindex als negatief signaal | Laag | Geleidelijk doen; `follow` behouden; pagina's blijven live |
| Fase-1 pagina's worden ook niet geïndexeerd | Medium | GSC koppeling is BLOCKER; zonder GSC werkt geen strategie |
| Canonical tags worden genegeerd | Laag | Google behandelt canonical als hint; goed content differentiëren lost dit structureel op |
| Traffic-verlies op long-tail locaties | Zeer laag | Deze pagina's trekken nu 0 traffic (niet geïndexeerd) |
| Te snel te veel pagina's toevoegen in fase 2 | Medium | Strikte trigger: pas fase 2 starten als fase 1 bewezen geïndexeerd |

---

## 8. Beslissingen (te bevestigen door Lisa/Bart)

1. **Akkoord met 4 topsteden** (Antwerpen, Gent, Leuven, Mechelen) als fase 1? Of andere voorkeur?
2. **Akkoord met 4 kerndiensten** (epoxy, gietvloer, garage, steentapijt) als fase 1? Of alle 8?
3. **Canonical betonlook→polyurethaan:** akkoord dat betonlook de canonical wordt?
4. **Canonical steentapijt→marmertapijt:** akkoord?
5. **GSC koppeling:** wie en wanneer? Dit is de absolute blocker.

---

## 9. Volgende Stappen (HERZIEN 2026-06-19)

- [ ] Jean-Cloud: sitemap opsplitsen in 3 prioriteitslagen (geen noindex meer nodig)
- [ ] Jean-Cloud: content differentiëren betonlook vs polyurethaan + marmertapijt vs steentapijt
- [ ] Jean-Cloud: content-verrijking top-12 steden locatiepagina's
- [ ] Wout: GSC coverage monitoren — welke pagina's pikt Google op?
- [ ] Wout: SERP-tracking opzetten voor prioriteitssteden
- [ ] Content team: FAQ's en lokale content uniek maken, topsteden eerst
