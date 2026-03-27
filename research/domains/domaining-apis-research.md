# Domaining.company — API Research

**Project:** Geautomatiseerd domain flipping platform  
**Datum:** 2026-02-21  
**Deadline:** 20:00

---

## 1. Dropping Domains Monitoren

### ExpiredDomains.net
- **URL:** https://www.expireddomains.net
- **API:** ❌ **Geen publieke API**
- **Scraping:** Expliciet verboden in terms (scripts/bots/crawlers → account closure)
- **Rate limits:** N/A (geen API)
- **Features:** Filters voor dropping/expired domains, maar alleen via web interface
- **Alternatief:** Third-party scrapers (Apify) bestaan maar riskant; CatchDoms.com heeft wel een REST API voor auction data
- **Pricing:** Membership ~$19-39/maand (alleen web access)
- **Verdict:** ❌ **Niet gebruiken** (te risicovol, geen officiële API, ban-risk)

---

### DNS Belgium (.be domains)
- **URL:** https://www.dnsbelgium.be
- **API:** ✅ **EPP API** (XML over TCP)
- **Docs:** https://docs.dnsbelgium.be/be/epp/
- **Release process:** 
  - Na scheduled delete → 40 dagen quarantaine
  - Release 24x/dag (elk uur, random tijd binnen dat uur)
  - **Geen publieke drop list**; timing is unpredictable (anti drop-catching)
- **Rate limits:** IP whitelisting vereist, geen specifieke public limits
- **Features:** 
  - `<delete>` met `<dnsbe:deleteDate>`
  - `<reactivate>` tijdens quarantaine (alleen door deleting registrar)
  - `<create>` na release (standard registration flow)
- **Pricing:** Vereist accredited registrar status (€2500 prepayment + 250 domain/jaar quota)
- **Verdict:** ⚠️ **Mogelijk maar complex** (requires registrar accreditation; geen dedicated drop-catching API)

---

### SIDN (.nl domains)
- **URL:** https://www.sidn.nl
- **API:** ✅ **RDAP API** (was overloaded door drop-catchers, nu rate-limited)
- **Status:** 90% traffic reductie door strikte rate limiting (Aug 2025)
- **Migration:** Hello Registry (2026) krijgt dedicated drop-catch environment
- **Rate limits:** Zeer strikt sinds 2025 (was 100-150M queries/dag → DDoS-level load)
- **Features:** 
  - RDAP profile 2024 voor quarantine checks
  - Quarantine heeft geen fixed end date
- **Pricing:** Vereist registrar tools/access
- **Verdict:** ⚠️ **Wachten op Hello Registry (2026)** (huidige RDAP niet geschikt voor high-volume drop-catching; dedicated env komt)

---

### NameJet
- **URL:** https://www.namejet.com
- **API:** ✅ **REST API** (voor configured customers/partners)
- **Docs:** Beschikbaar na partner approval
- **Rate limits:** Onbekend (partner-only)
- **Features:**
  - Get Backorder, Place Backorder, Delete Backorder
  - Download Backorder List
  - Get Auction Details
  - Response: domain, backorder type (Pre Release/Pending Delete/Wish List), bids, bidders
- **Pricing:** Partner-only (contact sales voor pricing)
- **Verdict:** ✅ **Ja, maar requires partnership** (goede API als je approved wordt; multi-TLD support)

---

### DropCatch
- **URL:** https://www.dropcatch.com
- **API:** ✅ **REST API** met interactive docs
- **Docs:** https://www.dropcatch.com/api (interactive docs available)
- **Rate limits:** Onbekend
- **Features:**
  - Backorder placing
  - Auction bidding (als meerdere backorders op zelfde domain)
  - Focus: Europese TLDs (.eu, .es, .pt, .be, .nl)
- **Pricing:** No-subscription (pay per successful catch); pricing per domain varies
- **Verdict:** ✅ **Ja** (goede API, Europese focus past bij .be/.nl strategie)

---

### GoDaddy Auctions
- **URL:** https://auctions.godaddy.com
- **API:** ✅ **REST API** (requires authorization via email)
- **Docs:** https://api.godaddy.com (base URLs: api.ote-godaddy.com / api.godaddy.com)
- **Access:** Email auctions@godaddy.com voor authorization
- **Rate limits:** Onbekend (waarschijnlijk tiered)
- **Features:**
  - PlaceBackorder (legacy SOAP had dit; check REST equiv)
  - GetAuctionList
  - Auction management
  - Multi-TLD support
- **Pricing:** Onbekend (request via email)
- **Legacy:** GdAuctionsBiddingWS_v2 SOAP API bestaat nog maar REST is nu aanbevolen
- **Verdict:** ✅ **Ja, als approved** (grote coverage, maar approval nodig)

---

## 2. Domain Valuatie

### EstiBot
- **URL:** https://www.estibot.com
- **API:** ✅ **JSON API** (alleen voor Expert subscribers)
- **Docs:** https://www.estibot.com/api
- **Rate limits:** Shared met web interface; reset 12 AM USC
  - Novice: 150/dag
  - Advanced: 5,000/dag
  - Expert: customizable (mogelijk tot 5000+)
- **Features:**
  - **Appraise:** ~100 data points (value, search vol, CPC, WHOIS, backlinks) in auto/cache/live modes
  - **Lead:** End-user buyer leads
  - **Bid Tool:** Keyword search vol + CPC
  - **Site Info:** Crawl data (status, title, emails)
  - **Drops/Zone Diff:** CSV/ZIP downloads
- **Pricing:** 
  - Basic: ~$29/maand (geen API)
  - Expert: ~$99-150/maand (API access)
- **Nauwkeurigheid:** ⚠️ Kritiek op hoge inaccuracy (~99.9% vs real sales); beter voor data intel dan prijsbepaling
- **Format:** `https://www.estibot.com/api?k=KEY&a=appraise&d=domain.com`
- **Verdict:** ⚠️ **Ja voor data, nee voor accurate pricing** (goede data points maar niet reliable voor final price decisions)

---

### GoDaddy Domain Appraisal (GoValue)
- **URL:** https://www.godaddy.com/domain-value-appraisal
- **API:** ✅ **GoValue API**
- **Docs:** https://developer.godaddy.com (help article: making API calls)
- **Endpoint:** `GET https://api.godaddy.com/v1/domains/govalues?domainName=example.com`
- **Auth:** `Authorization: sso-key [API_KEY]:[SECRET]` (keys via developer.godaddy.com/keys)
- **Rate limits:**
  - Basic: 100,000 calls/month (1,000 valuations/day)
  - Professional: 250,000 calls/month (5,000 valuations/day)
- **Features:**
  - goValue (market value estimate)
  - listPrice (suggested sell price)
  - goValueWholesale
  - salesProbability
  - minPrice / maxPrice
  - Based on 65M+ historical sales data
- **Pricing:**
  - Basic: $99.99/maand ($1,199.88/jaar upfront)
  - Professional: $499.99/maand ($5,999.88/jaar upfront)
  - Free web tool voor single appraisals (geen API)
- **Verdict:** ✅ **Ja** (reliable data, ML-based, good for automated valuation pipeline; Professional plan voor scale)

---

### Majestic (backlinks / Trust Flow)
- **URL:** https://majestic.com
- **API:** ✅ **Full API access**
- **Docs:** https://majestic.com/reports/api-documentation
- **Rate limits:** 300 requests/second (Lite/Pro/API plans)
- **Features:**
  - Trust Flow / Citation Flow metrics
  - Backlink database
  - Monthly credits (API plan: 500K)
- **Pricing:**
  - 100M units: $399.99/maand
  - 1B units: $1,599.99/maand (annual)
  - Custom allowances + 5 users
- **Unit system:** Monthly units/credits
- **Verdict:** ✅ **Ja** (goede backlink data voor domain quality checks; combine met Ahrefs voor DR)

---

### Ahrefs (Domain Rating / DR)
- **URL:** https://ahrefs.com
- **API:** ✅ **API v3** via Ahrefs Connect (v2 deprecated Nov 2025)
- **Docs:** https://ahrefs.com/api (v3 via Connect)
- **Rate limits:** 300 requests/second (legacy v2)
- **Features:**
  - Domain Rating (DR 0-100) based on backlink quality/quantity
  - Backlink profile strength
  - Ignores traffic/spam (purely link-based)
- **Pricing (legacy v2):**
  - Standard: $500/maand (500K rows)
  - Plus: $2,000/maand (5M rows)
  - Premium: $10,000/maand (30M rows)
  - Overage: per 1,000 rows
- **Credits:** Domain requests = 3 credits; URL requests = 4 credits
- **Verdict:** ✅ **Ja** (DR is industry standard; expensive maar onmisbaar voor quality scoring)

---

### Keyword CPC Data (Google Keyword Planner alternatives)
**Google Keyword Planner API:** ❌ **Geen directe API** (requires Google Ads account + active campaigns voor nauwkeurige data)

**Alternatieven:**

#### DataForSEO
- **URL:** https://dataforseo.com
- **API:** ✅ **Keyword Data API**
- **Features:** Search volume + CPC data via programmatic access
- **Pricing:** Credit-based (varies per API call type)
- **Verdict:** ✅ **Ja** (best API alternative voor CPC data; al in gebruik bij Hazier)

#### SEMrush
- **URL:** https://www.semrush.com
- **API:** ✅ **Keyword Magic Tool API**
- **Features:** CPC estimates, competitor analysis, advertiser density, paid traffic insights
- **Pricing:** Subscription-based (Pro: $139.95/maand; scales up)
- **Verdict:** ⚠️ **Optioneel** (duur maar comprehensive; overbodig als DataForSEO voldoet)

#### Ahrefs (reeds behandeld)
- CPC filtering, keyword difficulty, CTR estimates
- **Verdict:** ✅ **Ja** (already planning to use for DR; bonus CPC data)

#### Keywords Everywhere
- **URL:** https://keywordseverywhere.com
- **API:** ❌ **Browser extension only** (geen API)
- **Verdict:** ❌ **Niet bruikbaar** (geen automation mogelijk)

#### Mangools KWFinder
- **URL:** https://mangools.com/kwfinder
- **API:** ⚠️ **Beperkte API** (niet primair focus)
- **Features:** Exact search volumes, CPC data, PPC competition (0-100)
- **Pricing:** Mangools Basic: $29.90/maand
- **Verdict:** ⚠️ **Backup optie** (als DataForSEO te duur wordt)

---

## 3. Verkoop Platforms

### Sedo
- **URL:** https://sedo.com
- **API:** ✅ **SOAP / HTTP GET API v1**
- **Docs:** https://api.sedo.com/api/v1/
- **Rate limits:** Max 50 domains per call (DomainInsert/DomainEdit)
- **Features:**
  - **DomainInsert:** Voeg domains toe voor sale/parking (auto-parking enabled)
  - **DomainEdit:** Update bestaande listings
  - Pricing params: `price` (asking/Buy Now), `minprice` (min offer), `fixedprice` (1=Buy Now, 0=Make Offer), `currency`
  - Domain review required before live
- **Auth:** `partnerid`, `signkey`, `username`, `password` (Basic or ServiceProvider API)
- **Pricing:**
  - **Listing:** Gratis
  - **Commission:** 10-20% van gross sale price (15% standard, 20% via SedoMLS)
- **Format:** SOAP of HTTP GET requests
- **Verdict:** ✅ **Ja** (mature API, auto-parking, breed netwerk; commissie acceptabel)

---

### Dan.com
- **URL:** https://dan.com
- **API:** ✅ **REST API** (Open Domain Distribution Network)
- **Docs:** https://github.com/Undeveloped/api (officiële repo)
- **Access:** Partnership application required (paused in 2023, approval needed as of 2026)
- **Rate limits:** Onbekend (partnership tier-dependent)
- **Features:**
  - Domain Pool API, Domain API, Domain Transaction Engine API V1
  - Bulk operations: price updates (increase/decrease %), add/delete, CSV import/sync
  - PUT requests: `https://api.dan.com/domains/{domain}`
  - Payment options: buy-now, offers, installments (up to 60 months)
  - UI customization, full control
- **Commission:** 10% fee
- **Tools:** Third-party tools (DAN API Console) voor bulk listing edits
- **Pricing:** Free to list; 10% commission on sales
- **Verdict:** ✅ **Ja, indien approved** (modern API, goede bulk tools, lage commissie; requires partnership)

---

### Afternic
- **URL:** https://www.afternic.com
- **API:** ⚠️ **Beperkte API** (partner-only Fast Transfer APIs; sellers gebruiken CSV upload)
- **Docs:** Available for Fast Transfer partners
- **Rate limits:** Onbekend
- **Features (Sellers):**
  - Bulk CSV uploads (optimized voor snelheid + partial updates)
  - Template download via "Add Domains" page
  - Fields: domain names, Buy Now prices, floor prices, Lease to Own
  - Syndicatie naar 100+ registrars (opt-in)
- **Features (Partners/Registrars):**
  - Full-Sync API (GET XML voor inventory sync)
  - Search API
  - Sales Notification API
  - Real-Time Check / Losing Registrar APIs
- **Pricing:** Free to list; commission varies (typically 20% for Fast Transfer network)
- **Syndication:** GoDaddy connection via Investor Central (portfolio auto-sync)
- **Verdict:** ⚠️ **Ja voor GoDaddy syndication, maar geen full API voor sellers** (CSV upload werkt; goede syndication reach; partner API niet nodig voor MVP)

---

## 4. Domain Registratie

### Registrar API Vergelijking (.be / .nl / .com)

| Registrar | API Type | .com | .nl | .be | Bulk Support | Docs Quality | Best For |
|-----------|----------|------|-----|-----|--------------|--------------|----------|
| **Cloudflare** | REST | ✅ | ✅ | ❌ | Good | Excellent | Infrastructure/DevOps automation |
| **Dynadot** | REST/XML | ✅ | ✅ | ✅ | Excellent | Very Good | Domain investors & aftermarket |
| **Namecheap** | XML | ✅ | ✅ | ✅ | Excellent | Good | SaaS platforms & resellers |
| **Porkbun** | REST | ✅ | ✅ | ✅ | Excellent | Good | Cost-conscious developers |
| **GoDaddy** | REST | ✅ | ✅ | ✅ | Excellent | Good | Enterprise portfolios (tiered) |
| **Gandi** | REST | ✅ | ✅ | ✅ | Good | Excellent | Security & compliance |

---

### Pricing Vergelijking (indicatief, bulk vaak lager)

| TLD | Low Range | Mid Range | High Range |
|-----|-----------|-----------|------------|
| **.com** | $9.99 | $12-15 | $16+ |
| **.nl** | $5.69 | $11-16 | $105 (outliers) |
| **.be** | €4.99 | $8-10 | $21+ |

**Opmerkingen:**
- Cloudflare: geen .be support (limited gTLD)
- Dynadot: beste voor bulk + aftermarket integration (backordering, auction bidding API)
- Namecheap: mature reseller platform, white-label mogelijk
- Porkbun: competitive pricing, geen hidden fees, modern REST
- GoDaddy: enterprise-level, tiered pricing voor volume

---

### Aanbevolen Stack voor Domaining.company

**Primair:**
- **Dynadot** (bulk registration + aftermarket API) — REST/XML API, excellent bulk support, marketplace integration
- **Namecheap** (reseller fallback) — XML API, white-label capability, volume discounts

**Backup:**
- **Porkbun** (cost optimization) — REST API, competitive pricing

**Features prioriteit:**
- Bulk domain search/checkout
- Programmatic DNS management (A, CNAME, MX, TXT)
- Automated renewal/transfer
- Webhook support (async ops)
- Clear error handling

---

### DNS Belgium Accredited Registrar Worden

**URL:** https://www.dnsbelgium.be  
**Docs:** https://www.dnsbelgium.be/en/registrar (registrar agreement + terms)

**Vereisten (.be registrar):**
- Bedrijf/organisatie met technische kennis
- **Jaarlijkse quota:** 250 domeinnamen minimum
- **Prepayment:** €2,500 (excl. BTW)
- Review registrar agreement + .be terms

**Vereisten (.vlaanderen / .brussels registrar):**
- **ICANN accreditation** vereist (RRA2013 of later + IANA ID)
- **Prepayment:** €5,000 per extensie (excl. BTW) — tenzij al .be registrar
- Voor non-ICANN: resell via partners

**Application Process (6 stappen):**
1. **Sign up:** Email support@dnsbelgium.be met org details (naam, adres, contacten, VAT, website, prepayment bedrag, gewenste extensies)
2. **Sign contract:** Ontvang + elektronisch sign via Adobe Sign
3. **Pay prepayment:** Betaal factuur (€2,500+ voor .be; €5,000+ per gTLD)
4. **Activate account:** Security codes via email/SMS; create technical users voor EPP
5. **Create profile:** Voeg billing/technical contacts + product URLs toe (appear in registrar lists)
6. **Register domains:** Gebruik web/EPP interface

**Verdict:** ⚠️ **Mogelijk maar hoge drempel** (€2,500 + 250 domain/jaar quota is OK voor scale-up, maar niet voor MVP; start met Dynadot/Namecheap .be registrations, apply als volume 250+ haalt)

---

## Samenvatting & Aanbevelingen

### ✅ Gebruiken (MVP-ready)

**Dropping domains:**
- DropCatch (Europese focus, goede API)
- NameJet (als partnership lukt)
- GoDaddy Auctions (als approved)

**Valuatie:**
- GoDaddy GoValue (ML-based, reliable)
- Ahrefs (DR + CPC data)
- Majestic (Trust Flow)
- DataForSEO (CPC data — already in use)

**Verkoop:**
- Sedo (mature API, breed netwerk)
- Dan.com (als partnership lukt; anders wachtlijst)
- Afternic (CSV upload + GoDaddy syndication)

**Registratie:**
- Dynadot (primair: bulk + aftermarket)
- Namecheap (reseller backup)
- Porkbun (cost optimization)

---

### ⚠️ Mogelijk maar complex

**Dropping domains:**
- DNS Belgium .be direct (requires registrar accreditation; €2,500 + 250 domain/jaar)
- SIDN .nl (wachten op Hello Registry 2026 voor dedicated drop-catch env)

**Valuatie:**
- EstiBot (data OK, pricing niet reliable — gebruik alleen voor extra data points)

---

### ❌ Niet gebruiken

**Dropping domains:**
- ExpiredDomains.net (geen API, scraping banned)

**Valuatie:**
- Google Keyword Planner direct (geen API zonder active Ads campaigns)
- Keywords Everywhere (browser extension, geen API)

---

## Roadmap Suggestie

**MVP (maand 1-3):**
1. DropCatch API integration (Europese drops)
2. GoDaddy GoValue API (domain valuatie)
3. Dynadot API (bulk registration .be/.nl/.com)
4. Sedo API (auto-listing)
5. DataForSEO (CPC data — already operational)

**Scale-up (maand 4-6):**
1. NameJet + GoDaddy Auctions partnerships (bredere drop coverage)
2. Ahrefs API (DR checks)
3. Majestic API (Trust Flow)
4. Dan.com partnership (modern marketplace)
5. Afternic CSV automation (GoDaddy syndication)

**Advanced (maand 7+):**
1. DNS Belgium registrar accreditation (direct .be drops als volume 250+ haalt)
2. SIDN Hello Registry integration (dedicated .nl drop-catch 2026)
3. Namecheap reseller white-label (als eigen brand scaling)

---

## Cost Estimate (maandelijks, MVP)

| Service | Plan | Cost |
|---------|------|------|
| GoDaddy GoValue API | Basic | $99.99 |
| Ahrefs API | Standard (legacy v2) | $500 |
| Majestic API | 100M units | $399.99 |
| DataForSEO | Credit-based | ~$200-500 (depends on usage) |
| DropCatch | Pay-per-catch | Variable (only on success) |
| Dynadot | Registration costs | ~$10-15/domain (bulk) |
| Sedo | Listing | Free (10-20% commission on sales) |
| **Total (fixed)** | | **~$1,200-1,500/maand** |
| **+ Variable** | | Domain reg costs + drop-catch fees |

**Opmerking:** Ahrefs is duur maar kan delayed worden tot scale-up; GoDaddy GoValue + Majestic zijn voldoende voor MVP valuatie.

---

**Einde rapport.**
