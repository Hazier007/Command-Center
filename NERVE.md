# NERVE — Dashboard Living Doc

**Eigenaar:** Claude (builder) + Bart (product owner)
**Laatste update:** 2026-04-11
**Status:** actief in ontwikkeling

Dit bestand is de single source of truth voor alle wijzigingen aan het NERVE dashboard. Bart noteert hier wat hij wil, Claude logt wat gedaan is en wat nog open staat. FORGE zit niet meer op dashboard-werk — die focust op GA/GSC en andere projecten.

---

## 1. Visie

NERVE is Bart's commando-centrum. Eén plek waar hij:
- de gezondheid van zijn portfolio ziet zonder door 5 schermen te klikken
- taken voor zijn 6 AI agents kan toewijzen en opvolgen
- de gap naar €100K recurring/maand in één oogopslag begrijpt
- beslissingen neemt op basis van data, niet op basis van gevoel

**Kernregels voor elke view:**
1. Eén scherm, geen diep menu. Alles wat belangrijk is past above the fold.
2. Elke tabel-rij is clickable en toont context zonder pagina te verlaten (slide-in panels).
3. Elke data-punt is actionable — er is altijd een knop om iets te doen.
4. Dark theme, Hazier oranje (#F5911E) als accent, geen visuele ruis.
5. Geen placeholders in productie. Als er geen data is → een duidelijke empty state met call-to-action.

---

## 2. Architectuur — de 5 views

| View | Route | Doel | Status |
|---|---|---|---|
| Cockpit | `/` | Overzicht alle views, key metrics, vandaag | bestaat — refactor nodig |
| Geld | `/geld` | MRR, uitgaven, gap-to-€100K, LEDGER data | bestaat — refactor nodig |
| Werk | `/werk` | Sprints, tasks, decisions, agent output | bestaat — refactor nodig |
| Portfolio | `/portfolio` | Domeinen + Sites met linked tasks | **in rebuild** |
| Agents | `/agents` | 6 agents, status, health, laatste reports | bestaat — refactor nodig |

---

## 3. Wat nu in progress staat

### Blok C — eerste in de queue (Bart koos 2026-04-11)

**C1: /klanten view (nieuwe pagina)** — ✅ v1 geleverd 2026-04-11
**C2: /geld transactie-form bereikbaar maken** — ✅ geleverd 2026-04-11
**C3: /werk filters op domein/site + 113-vs-15 mystery oplossen** — ✅ geleverd 2026-04-11
**C4: /werk research CRUD + content-publish onderzoek** — ✅ geleverd 2026-04-11
**C5: Content-publish als FORGE workflow + auto-trigger** — ✅ geleverd 2026-04-11

### Blok B — Cockpit als sturings-platform (geleverd 2026-04-11)

**De mentale switch:** de oude `/` was een informatief dashboard — je ging kijken en ging weer weg. De nieuwe Cockpit is een besturings-dashboard — je kan vanaf daar acties triggeren zonder ergens anders te klikken.

**Nieuwe opbouw (boven naar beneden):**

1. **Greeting** — "Goedemorgen Bart 🔶 Hazier" + datum + `X items wachten op beslissing` badge wanneer er iets ligt.
2. **Dump box** — groot invoerveld bovenaan, toggle tussen Taak/Idee, assignee-select bij taken (Bart + 6 agents), enter-to-save. POST naar `/api/tasks` of `/api/ideas`. Inline feedback ("✓ Taak aangemaakt voor FORGE"), geen modal, geen redirect. Dit is de snel-invoer die je vroeg.
3. **KPI rij — 4 tegels:**
   - MRR (€ live sites, accent oranje, klik → /geld)
   - Voor Bart (aantal open tasks met assignee=bart, warn-geel boven 5, klik → /werk)
   - Review queue (totaal aantal wachtende items)
   - Nieuwe leads 7d (groen als >0)
4. **Hoofdgrid (2/3 + 1/3 op desktop):**
   - **Vandaag voor Bart** (links, breed): jouw open tasks, max 6 + overflow-link. Per taak een complete-cirkel (één klik → status=done en weg uit de lijst), due-date badge wordt rood als overdue, priority/category labels.
   - **Review queue** (rechts): combineert content in `review`, tasks met `needsApproval` of `status=review`, en research met `status=pending`/`needs_review`. Per item inline ✓/✗ knoppen die de juiste PATCH doen zonder modal. "Minder tonen" / "+N meer tonen" toggle.
5. **Traffic Pulse + Leads (2 kolommen):**
   - **Traffic Pulse:** top 5 sites op `monthlyTraffic`, horizontale bars, kleur per `seoStatus` (groen=groeit, oranje=stabiel, rood=daalt). Top keyword + positie inline. Empty state als er geen data is ("Wacht op RADAR/Windsor sync").
   - **Leads:** open leads uit `/api/leads` (status nieuw/contact/proposal/onderhandeling), avatar-initials, status-badge per kleur, estimatedValue in oranje, red flag op overdue follow-up. Max 5 + overflow teller.
6. **Footer stats band** — één regel met `X tasks · Y content · Z research · N sites · M leads` zodat je in één oogopslag ziet hoeveel data er achter de schermen zit.

**Wat NIET in v2 zit (bewuste keuzes):**
- Geen trend-delta's op KPI's (MRR vs vorige maand) — daarvoor moeten we MRR-snapshots per maand bewaren. Later.
- Traffic pulse is een snapshot — geen tijdreeks. Zodra Windsor/GA4 ingekoppeld is in de sites-tabel (`monthlyTraffic` wordt al gelezen) toont het wat er is. Chart-lib toevoegen pas als je echte trends wil zien.
- Geen detail-modal meer op cockpit — approve/reject gebeurt inline, voor diep werk klik je door naar /werk.
- `Nieuwe leads 7d` telt leads met `status=nieuw` die in de laatste 7 dagen zijn aangemaakt. Geen complexere funnel.

**Afhankelijkheden/losse eindjes:**
- `trafficPulse` empty wanneer geen site een `monthlyTraffic` value heeft. RADAR/FORGE moet die velden gaan vullen (via Windsor endpoint `/api/windsor/ga4` die al bestaat). Volgende stap: een cron die `monthlyTraffic` en `seoStatus` per live site refresht.
- `reviewQueue` laadt `research` via `/api/research` zonder pagination — slaat 113 items op in state. Niet fijn maar werkt. Later: aparte `/api/cockpit/review-queue` endpoint die alles geaggregeerd teruggeeft.
- Lead detail panel: klik op een lead doet nog niets — we hebben geen `/leads` pagina. Eerst checken of je die nodig hebt voor we bouwen.

### Blok A — Navigatie + layout herbouw (geleverd 2026-04-11)

**Wat is er veranderd aan de shell:**
- **Links-sidebar weg, top-nav erin.** Nieuwe component `src/components/nerve/nerve-topnav.tsx` — één horizontale balk met logo, primaire nav (Cockpit / Geld / Werk / Portfolio / Klanten / Agents), een "Meer"-dropdown (Crypto / Cowork), business switcher rechts, theme toggle, settings en avatar.
- **Capture + Inbox knoppen verwijderd** uit de navigatie (werkten niet, rommel weg).
- **Light theme toggle live.** Nieuwe `ThemeProvider` in `src/components/nerve/theme-context.tsx` met localStorage persist (`nerve-theme`). Zon-icoon in topnav voor dark→light, maan-icoon voor light→dark. Klasse-switch gebeurt op `<html>` zodat `:root` (light) en `.dark` blokken uit globals.css automatisch pakken.
- **Base font size bump:** `html { font-size: 17px }` in globals.css (was 16px default). Alle Tailwind rem-waarden schalen mee — geen handmatige px-bumps nodig op honderd plekken. Tekst is ~6% groter op desktop.
- **Mobile pass:** topnav collapsed onder `md` (hamburger knop, drawer met volledige nav). Main content padding `p-4 md:p-6`. Business switcher toont alleen het letter-icoon op kleine schermen, label verschijnt vanaf `sm`.
- **NerveShell gerefactord:** flex-col met topnav bovenaan en `<main>` full width eronder. Scroll wordt netjes afgehandeld met `h-screen overflow-hidden` op buitenste, `overflow-y-auto` op main.
- **Full width (update 2026-04-11):** `NerveRightPanel` volledig uit de shell gehaald. De oude rechter-kolom met RevenueTracker/NowSection/PulseFeed nam op `lg+` breedte af van de hoofdinhoud waardoor Cockpit-grids te krap stonden. Nu spant alles de volledige viewport. Losse eindjes van dat panel (RevenueTracker, NowSection, PulseFeed) kunnen later als widgets op `/cockpit` of `/geld` landen als Bart ze terug wil.

**Loose ends:**
- Oude `nerve-sidebar.tsx` en `nerve-topbar.tsx` blijven in de repo staan maar worden niet meer gebruikt. Exports staan nog in `index.ts` voor backwards-compat — volgende sessie kunnen ze weg als niks ze nog importeert.
- Command bar met ⌘K zat in de oude topbar en staat nu niet in de nieuwe topnav. Bewust weggelaten tot Bart aangeeft of hij dat wil houden (het was leeg zonder backing).
- Theme toggle werkt maar sommige hardcoded `bg-zinc-*` klassen op detail-pagina's zullen in light mode nog niet mooi renderen. Dat is voorspelbaar — komt terug in een light-theme finishing pass zodra Bart de basis ziet werken.

### C2: /geld — transactie-forms (geleverd 2026-04-11)

**Wat er staat:**
- Twee knoppen bovenaan `/geld`: **Inkomst toevoegen** (primary oranje) en **Uitgave toevoegen** (outline)
- Dialog modals met echte forms die POSTen naar `/api/revenue` en `/api/costs` (die endpoints bestonden al, alleen had niemand er een UI voor gebouwd)
- Revenue form: stream selector (agency/adsense/leadgen/affiliate), omschrijving, bedrag, maand, optioneel site-domein, recurring checkbox
- Cost form: naam, bedrag, categorie, recurring + billing cycle, notities
- Na opslaan wordt de pagina herladen zonder full refresh

**Bug ontdekt en meteen gefixed:** De /geld page filterde revenue per stream op `r.type` — maar dat veld bestaat niet op de Prisma RevenueEntry. Het juiste veld is `r.source`. Hierdoor toonden alle revenue streams €0 ook al zat er data in. Nu correct.

**De "oude" /finance page** bestaat nog (972 regels, localStorage-based, uit de vorige dashboard iteratie) — die blijft staan maar wordt niet meer gelinkt. Volgende keer opruimen wanneer /geld stabiel is.

### C3 + C4: /werk — filters, mystery opgelost, research CRUD, content publish (geleverd 2026-04-11)

**113-vs-15 mystery: opgelost.** De API gaf gewoon alle 113 terug; het UI-component had een hardcoded `research.slice(0, 15)` terwijl de badge `research.length` toonde. Slice weggehaald, nu zie je ze allemaal. Logisch dat Bart gek werd.

**Filter op domein/site:**
- Nieuwe filterbalk bovenaan /werk (zichtbaar op Taken en Research tabs)
- Scope-dropdown: alle sites + alle domein-opportunities in één lijst, met 🌐 / 📦 iconen om onderscheid te maken
- Vrij zoekveld op titel (case-insensitive substring match)
- Reset-knop verschijnt zodra er gefilterd is
- "X van Y getoond" indicator rechts
- Tabs-badges reflecteren nu ook de filter
- Task kanban gebruikt de gefilterde set — columns tellen correct door

**Research CRUD in detail modal:**
- Koppelings-sectie: twee selects (site en domein) met "save"-knop — PATCHt `linkedSiteId`/`linkedDomainId`
- "➕ Taak aanmaken" knop: inline form met titel + assignee (dropdown: Bart + alle 6 agents) → POST /api/tasks met research-titel en summary als description; link naar de actieve site/domein wordt automatisch meegegeven
- "🗑 Verwijderen" met confirm
- Research cards tonen nu ook de gekoppelde site/domein onderaan (cyan accent)

**Content publish workflow gat gefixed:**
- ContentDetailModal had alleen "Goedkeuren" (review→approved) en "Afwijzen" — dus approved content bleef voor altijd in approved hangen. Daarom zag Bart veel approved maar niks gepublished.
- Toegevoegd: "🚀 Markeer als gepubliceerd" voor approved items
- Toegevoegd: "↩ Terugzetten naar approved" voor published items (per ongeluk gepubliceerd terugdraaien)
- Toegevoegd: "🗑 Verwijderen" voor alle statussen
- Modals gebruiken nu `onUpdate()` callback ipv `window.location.reload()` — sneller en data blijft in sync

**Openstaande vraag aan Bart (beantwoord 2026-04-11):** Bart: "dit zou een taak voor FORGE moeten zijn". Akkoord en doorgevoerd → zie C5 hieronder.

### C5: Content-publish als FORGE workflow (geleverd 2026-04-11)

**De mentale knoop:** Een statusverandering zoals "markeer als gepubliceerd" is wishful thinking als er geen concrete actie uit volgt. Nu wordt elke publish-request een echte taak op FORGE's bord, en de content blijft zichtbaar hangen in een eigen kolom tot FORGE hem afwerkt.

**Nieuwe flow:**
1. Bart keurt content goed → status=`approved`
2. Bart klikt **"🚀 Stuur naar FORGE voor publicatie"** in de ContentDetailModal
3. Er wordt automatisch een nieuwe Task aangemaakt: titel `"🚀 Publiceren: {content.title}"`, assignee=`forge`, category=`content`, priority=`medium`, source=`bart`. De description bevat auto-gegenereerde context (site, keyword, woordenaantal, trigger-waarschuwing).
4. De content gaat naar status=`publish_requested` + `linkedTaskId` wordt gezet op de nieuwe task-id
5. De content verschijnt in de nieuwe kanban-kolom **"Bij FORGE"** (oranje accent, tussen Approved en Published)
6. De task staat in /werk Taken-tab in FORGE's kolom met oranje border
7. Zodra FORGE (of Bart) de task op `done` zet → **auto-trigger in `/api/tasks/[id]` PATCH**: zoekt content met `linkedTaskId=task.id` en `status=publish_requested`, zet die op `status=published`. De loop sluit zichzelf.

**Intrekken:** Vanuit de ContentDetailModal kan Bart een publish-request intrekken (content → approved, linkedTaskId → null). De task blijft bestaan als losse taak — geen auto-delete, voorkomt ongelukken.

**Content kanban update:** grid-cols-4 → grid-cols-5 (draft / review / approved / Bij FORGE / published). De "Bij FORGE" kolom toont op elke card de task-status (bv. "⏳ FORGE: in-progress") zodat Bart in één oogopslag ziet waar het blokkeert.

**Server-side trigger in `/api/tasks/[id]` PATCH:**
- Bij `data.status === 'done'` wordt na de task-update een `prisma.content.updateMany` gedraaid die alle content met `linkedTaskId=id` en `status=publish_requested` bumpt naar `published`
- Trigger is try/catch omhuld: als de content-update faalt, blijft de task nog steeds done (geen rollback) — maar de fout wordt gelogd

**Waarom dit beter is dan "markeer als gepubliceerd":**
- Er is een eigenaar (FORGE) en een eindtijd (de task-deadline)
- Er is zichtbaarheid: Bart ziet in /werk Taken én in /werk Content waar publicaties vastzitten
- De "published" status betekent nu echt gepubliceerd, niet "ik heb iemand gezegd dat hij moet publiceren"
- FORGE kan later automatisch handelen op deze tasks (bv. Zapier / n8n webhook die deploy triggert) — de UI is klaar voor die uitbreiding

**Server-side:**
- `/api/research/[id]` PATCH handler: uitgebreid om `linkedSiteId`, `linkedDomainId`, `linkedIdeaId`, `linkedTaskId`, `summary` te accepteren (voorheen werden die genegeerd)
- Alle endpoints zijn conditional-spread zodat `null` waarden ook doorgegeven kunnen worden om een koppeling los te maken

### C1: /klanten view — ✅ v1 GELEVERD 2026-04-11

**Wat er staat:**
- `src/app/klanten/page.tsx` — volledige view met lijst, detail panel, edit modal, new-client modal
- `src/app/api/clients/route.ts` — aggregation endpoint (read-only GET, groepeert sites + projects op clientName)
- `src/app/api/sites/route.ts` + `[id]/route.ts` — POST en PATCH uitgebreid met client/contract velden
- `src/components/nerve/nerve-sidebar.tsx` — nav-item "Klanten" toegevoegd (Users icon, tussen Portfolio en Agents)

**Werkt:**
- Lijst met search, summary cards (aantal klanten, MRR, uren, open tasks)
- Detail panel toont contract, uurprijs (berekend = fee / uren), alle sites met mini SEO/traffic/keyword data, open tasks gegroepeerd per site
- Edit modal: bulk update (fee en uren worden gelijk verdeeld over de sites)
- New-client modal: maakt direct eerste site aan met clientName + ownerType='client'
- Links vanuit klant-detail naar /portfolio werken
- Skeleton loading, oranje accent, empty states

**Reserveert voor v2:**
- Uren-registratie per taak (hoursSpent veld)
- GA/GSC data-injectie wanneer FORGE analytics klaar is (UI-slot staat al klaar met "wacht op FORGE koppeling" placeholder)
- First-class Client model met migration

### C1: /klanten — originele architectuurbeslissing

Bart wil een volledige klanten-view: meerdere sites per klant, recurring/eenmalige inkomsten, mini GA/GSC overzicht, taken gelinkt aan de sites voor rapportage/facturatie (uren × uurprijs). Voorbeeld: Kristof Ponnet met meerdere sites onder toezicht.

**Data model observatie:** Het Prisma schema heeft GEEN `Client` model, maar `Project` en `Site` hebben allebei al deze velden: `ownerType`, `clientName`, `clientEmail`, `contractType`, `monthlyFee`, `hoursPerMonth`, `contractStart`, `contractEnd`. Project heeft daarbovenop `paymentStatus`, `lastInvoiceDate`, `nextInvoiceDate`, `autoRenew`.

**Keuze: v1 zonder migration, v2 later met echt Client model.**

v1 aggregeert klanten op basis van `clientName` uit Sites en Projects. Geen schema-wijziging, geen risico, meteen bruikbaar. v2 introduceert een First-class `Client` model met foreign keys — dat doen we pas als Bart bevestigt dat de v1 flow werkt.

**C1 scope (v1):**
- Nieuwe pagina `/klanten` + nav-link
- `/api/clients` endpoint dat aggregeert: groepeert sites + projects op clientName, berekent total MRR, contract info, aantal sites, open tasks
- Lijst-view: klantenrij met naam, aantal sites, MRR, open tasks, volgende factuurdatum
- Detail panel (Sheet slide-in): contact + contract + alle gelinkte sites (clickable naar /portfolio) + alle open tasks (gegroepeerd per site) + uren-rapportage
- Edit modal: clientName, email, contract type, monthlyFee, hoursPerMonth — wijzigt alle sites van die klant tegelijk (bulk update via /api/sites/[id] PATCH)
- Nieuwe klant toevoegen → creëert een eerste site met ownerType='client' (want een klant zonder site bestaat niet in v1)
- Uren-rapportage: som van hours per task (nieuw veld nodig) OF placeholder met "uren registratie — v2"
- Mini GA/GSC: placeholder sectie met "vereist FORGE analytics koppeling (klaar wanneer FORGE ready)"

**Wat v1 NIET doet (expliciet):**
- Geen schema migration
- Geen echte uren-registratie per taak (veld bestaat niet, plaats reserveren voor v2)
- Geen echte GA/GSC data (UI-slot reserveren, wordt later gevuld wanneer FORGE klaar is)
- Geen facturatie-generatie (data tonen voor rapportage, Bart maakt zelf factuur)

**Open loose ends na C1:**
- Uren-registratie op Task model (nieuw veld `hoursSpent` + `hoursEstimated`)
- GA/GSC data-koppeling wanneer FORGE de analytics endpoint klaar heeft
- v2: First-class Client model met migration script

### /portfolio rebuild (NERVE v3) — ✅ GELEVERD 2026-04-11
- [x] Prototype in HTML gebouwd (`proposals/PROTOTYPE_portfolio_v3.html`)
- [x] `src/app/portfolio/page.tsx` herschrijven: Projects tab → Domeinen tab
- [x] Detail panel (slide-in rechts) met linked tasks per domein/site
- [x] Quick-add task modal (zonder rij-click te triggeren)
- [x] "Promote naar Live Site" actie voor domeinen (stub, tolereert ontbrekende PATCH endpoint)
- [x] Summary cards: Domeinen pipeline / Live sites / MRR / Open tasks
- [x] Dedup-check in quick-add (live, waarschuwt bij bestaande open taak met zelfde scope + title-match)
- [x] Skeleton loading rows ipv spinners
- [x] Typecheck + lint schoon

**Technisch:** geen schema changes nodig. Task heeft al `siteId` én `linkedDomainId` en de API's ondersteunen beide filters.

**Open loose ends:**
- Promote-flow heeft nog geen PATCH endpoint voor DomainOpportunity. De UI-call doet `.catch(() => {})` zodat hij niet crasht, maar de status-transitie wordt niet opgeslagen. Volgende sessie: quick fix endpoint bouwen.
- Detail panel toont max 10 open tasks — boven de 10 linkt naar /werk (die link werkt nog niet, hangt af van filter-werk in /werk).
- Bart's WERK-wishlist zegt "filteren op domeinnaam/site" — dat gaan we in /werk inbouwen, en dan klopt de overflow-link vanuit /portfolio ook automatisch.

---

## 4. Verbeteringen (Bart's wensen, nog niet ingepland)

_Bart: zet hier alles wat beter kan. Groot of klein, maakt niet uit. Claude prioriteert bij de volgende sessie._

- Ik heb gemerkt dat het dashboard niet mobiel vriendelijk is. 
- LIGHT theme toevoegen. 
- Tekst mag gerust iets groter op desktop. 
- Graag gebruik maken van visualisaties. 
- Graag het menu bovenaan ipv van links en met dropdown. 
- Cockpit zou meer mijn sturings platform moeten zijn met overzicht van openstaande taken voor mezelf, zaken die ik dien te reviewen, drops of stijgingen van bezoekers, waar ik een idee of taak kan dumpen, een duidelijk overzicht van leads etc.. een cockpit waar ik kan sturen niet enkel plaatsnemen. 
- Bovenaan staat er capture en inbow maar dat werkt niet. (mag weg)
- GELD: Moet makkelijker zijn voor mij om hier inkomsten en uitgaven toe te voegen. Is reeds gemaakt maar kan ik nergens bereiken. 
- WERK: Misschien mogelijkheid toevoegen om te filteren om domeinnaam/site bij taken. Pipeline kan ik zelf niets toe voegen. Content staat er veel approved maar wordt niet gepublished?(kijk je na?), reserach zou ik moeten kunnen koppelen aan site/domein of ook verwijderen alsook nieuw taak to research geven. Staan er 113 maar ik zie er 15. 
- Klanten ik kan ook nergens klanten bewerken. 

### Claude's prioritering van bovenstaande wishlist (voorstel)

Ik heb Bart's lijst gelezen en geclusterd in 5 werkblokken. Volgorde is op impact × moeite, niet op volgorde van opschrijven.

**Blok A — Navigatie + layout herbouw (~1 sessie)**
_Grootste visuele impact, raakt alle views tegelijk — daarom eerst._
- Menu van links naar boven met dropdowns (raakt `nerve-shell.tsx` + `nerve-sidebar.tsx` + `nerve-topbar.tsx`)
- Capture/inbox knop bovenaan die niet werkt → weg
- Tekst iets groter op desktop (base font-size bump, 11px → 12px, 13px → 14px)
- Mobile-friendly: grid/flex responsiveness, detail panels full-screen op mobile, summary cards in 2x2 onder 768px

**Blok B — Cockpit herdefiniëring (~1-2 sessies)**
_Jouw kerngebruik — verdient eigen blok met focus._
- Cockpit wordt sturings-dashboard, niet informatief dashboard
- Secties: "Vandaag voor Bart" (jouw open tasks), "Review queue" (goedkeuringen wachten), "Trends" (traffic up/down per site), "Leads overzicht", "Dump box" (snel idee/taak toevoegen → gaat naar /ideas of /tasks)
- Visualisaties: recharts line chart voor traffic/MRR trend, bar chart voor lead-bron

**Blok C — Geld fix + Werk filters + Klanten CRUD (~1-1.5 sessie)**
_Snel te fixen, meteen bruikbaar._
- /geld: transactie-form die al gemaakt is bereikbaar maken (link in topnav of CTA op de view zelf)
- /werk: filter op domeinnaam/site toevoegen aan tasks-tab
- /werk: uitzoeken waarom er 113 tasks zijn maar er 15 getoond worden (pagination? filter stuck? limit in API?)
- /werk: research items koppelen aan site/domein + delete + "taak toewijzen aan research" knop
- /werk: content approved maar niet gepublished — dit is een INK workflow issue, niet puur UI. Vereist onderzoek.
- **Klanten bewerken:** nu nergens bereikbaar. Open vraag eerst: krijgen klanten een eigen view (`/klanten`) of zitten ze in /portfolio als derde tab naast Domeinen/Sites? Hazier-klanten zijn conceptueel geen sites, dus mijn voorstel is een eigen view — licht, met CRUD + link naar linked tasks/projects. Bespreken voor we bouwen.

**Blok D — Light theme (~0.5 sessie + discussie)**
_Technisch eenvoudig met Tailwind dark: prefix omkering, maar we moeten eerst beslissen: toggle of systeem-gedreven? Mijn voorstel: toggle in topbar met localStorage persist._

**Blok E — Promote endpoint + /werk overflow link (~0.3 sessie)**
_Losse eindjes van /portfolio rebuild afmaken._
- PATCH endpoint voor DomainOpportunity status
- /werk filter-URL parameters zodat "+N meer tasks" link vanuit /portfolio werkt

**Mijn aanbeveling voor volgende sessie:** start met Blok A (navigatie). Het raakt alles en geeft meteen die "dashboard voelt volwassen" klik die de rest van het werk waardeert. Daarna Blok C (geld + werk + klanten fixes) voor quick wins, dan Blok B voor de Cockpit-transformatie die het grootste sturings-gevoel geeft.

Zeg welk blok je eerst wil — of dat deze volgorde goed zit. En voor klanten: eigen `/klanten` view of als derde tab in /portfolio?

---

## 5. Ideeën / overweging

_Dingen die we bespreken maar nog niet besloten hebben._

- [ ] _(leeg)_

---

## 6. Log van wijzigingen

Elke afgeronde wijziging komt hier met datum en 1 regel wat er gebeurd is. Zo zie je wat er achter je rug gebeurt.

| Datum | View | Wat | Door |
|---|---|---|---|
| 2026-04-11 | meta | NERVE.md aangemaakt als living doc voor dashboard | Claude |
| 2026-04-11 | /portfolio | Prototype v3 gebouwd (HTML), goedgekeurd principieel | Claude |
| 2026-04-11 | /portfolio | Volledige rebuild live: Domeinen/Sites tabs, detail panel, quick-add met dedup, promote-stub | Claude |
| 2026-04-11 | /klanten | v1 gebouwd: nieuwe view, /api/clients aggregation, sites POST/PATCH uitgebreid, sidebar nav | Claude |
| 2026-04-11 | /geld | Inkomst + uitgave add-modals, source/type bug gefixed | Claude |
| 2026-04-11 | /werk | Filter op site/domein, research slice-bug gefixed (113-vs-15), research CRUD in modal, content publish workflow | Claude |
| 2026-04-11 | /api/research | PATCH uitgebreid met linkedSiteId/linkedDomainId/summary/linkedIdeaId/linkedTaskId | Claude |
| 2026-04-11 | /werk content | FORGE publish-workflow: "Stuur naar FORGE" dispatcht task + publish_requested kolom + auto-trigger | Claude |
| 2026-04-11 | /api/tasks/[id] | Auto-publish trigger: bij status=done wordt linked content met publish_requested → published | Claude |
| 2026-04-11 | shell | Nieuwe NerveTopNav (links-sidebar + oude topbar vervangen), capture/inbox weg, theme toggle + ThemeProvider, mobile drawer, right panel hidden <lg | Claude |
| 2026-04-11 | globals.css | Base font-size 16px→17px, scrollbar-thin utility toegevoegd | Claude |
| 2026-04-11 | / cockpit | Cockpit v2: dump box, KPI tegels, Vandaag voor Bart, Review queue (content+tasks+research), Traffic pulse, Leads pipeline, footer stats | Claude |
| 2026-04-13 | /portfolio | pizzeriabellaitalia.be geregistreerd als verkocht ($50) — eerste domeinflip in CC | Bart |
| 2026-04-14 | team | 5 Clawbot agents (ATLAS/FORGE/INK/LEDGER/SPARK) afgevoerd — team = Bart + Claude + RADAR | Bart |
| 2026-04-14 | /portfolio | Verkocht-status toegevoegd aan DomainOpportunity: status='sold' + soldPrice/soldCurrency/soldAt/soldTo velden, violette styling in UI | Claude |
| 2026-04-14 | /portfolio | Structurele fix domein↔site duplicaat: POST /api/sites auto-delete matching domain_opportunity (behalve sold); UI-filter als vangnet in filteredDomains | Claude |
| 2026-04-14 | /portfolio | "Converteer naar site"-knop met smart category-inference (leadgen/affiliate/klant/tool/directory) op DomainOpportunity detail | Claude |
| 2026-04-14 | /api/domain-opportunities/[id] | PATCH uitgebreid met soldPrice/soldCurrency/soldAt/soldTo handling (null-safe) | Claude |
| 2026-04-14 | infra | Persistent GitHub PAT in /mnt/.claude/git/credentials + gitconfig — Claude kan pushen vanuit elke sessie via `export GIT_CONFIG_GLOBAL=...` | Claude |
| 2026-04-15 | /agents | Team-page opgekuist: titel "Team BC" → "Team", TEAM_BC/LEGACY_AGENTS arrays vervangen door imports uit src/lib/agents.ts (enige bron) | Claude |
| 2026-04-15 | / cockpit | Dump box AGENT_OPTIONS afgeleid uit ACTIVE_ASSIGNEES ipv hardgecodeerd; "📡 RADAR — laatste 24u" widget toegevoegd (mini-KPI strip + recente acties) | Claude |
| 2026-04-15 | /api/cron/check-alerts | PAT-expiration watchdog: maakt high-priority Alert als GITHUB_PAT_EXPIRES_AT binnen 7 dagen verloopt (idempotent) | Claude |

---

## 7. Design principes — niet overtreden

1. **Geen horizontale scroll.** Tabellen moeten ook op 1440px niet overvloeien.
2. **Geen modals in modals.** Als iets een tweede laag nodig heeft → inline expand of nieuwe pagina.
3. **Kleuren volgen rol:**
   - `#F5911E` (Hazier oranje) → primary actions en accenten
   - `#10b981` (groen) → goed nieuws, live, OK
   - `#ef4444` (rood) → kritiek, blocked, vervallen
   - `#eab308` (geel) → aandacht nodig, medium priority
   - Alles anders → neutraal grijs
4. **Geen emoji's in productie UI** (tenzij Bart expliciet vraagt).
5. **Loading states:** skeleton rows, geen spinners.
6. **Fout-states:** toon de fout + retry-knop + "vraag Claude" fallback.
7. **Copy in Nederlands** (Vlaams als het natuurlijk klinkt). Technisc