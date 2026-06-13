# Maandelijks SEO Monitoring Dashboard — LocalLead Portfolio

> **Template v1.0** | Wout de Scout | 11 juni 2026
> **Doel**: Elke maand invullen om rankings, indexering en traffic per site te volgen.

---

## Samenvatting

- Dit dashboard dekt alle actieve en in-ontwikkeling Rank & Rent domeinen.
- Per domein worden 3 pijlers gemonitord: **Rankings**, **Indexering**, **Traffic**.
- Onderaan staan actie-items en een maandelijkse changelog.
- Vul elke maand de tabel in met data uit GSC, GA4, en handmatige SERP-checks.

---

## 1. Portfolio Overzicht

| # | Domein | Status | Niche | Markt |
|---|--------|--------|-------|-------|
| 1 | Daklekkages.be | Live | Daklekkages | BE |
| 2 | Poxy.be | Live | Epoxy vloeren | BE |
| 3 | Funderingsproblemen.be | Live | Funderingen | BE |
| 4 | Vogeloverlast.be | Live (rebuild) | Vogelwering | BE |
| 5 | GevelwerkenGent.be | In opbouw | Gevelwerken | BE (Gent) |
| 6 | AlsaceRenovation.fr | In opbouw | Renovatie | FR (Alsace) |
| 7 | TenerifeRenovations.com | In opbouw | Renovatie | ES (Tenerife) |

---

## 2. Indexering Monitor

> **Bron**: Google Search Console > Pagina's / Coverage rapport

| Domein | Totaal pagina's | Geindexeerd | Index-ratio | Vorige maand | Trend | Opmerkingen |
|--------|----------------|-------------|-------------|--------------|-------|-------------|
| Daklekkages.be | 227 | — | — | — | — | Kritiek: www/non-www split (LOC-20) |
| Poxy.be | 1281 | — | — | — | — | Thin content probleem |
| Funderingsproblemen.be | 277 | — | — | — | — | Technisch OK, lage index |
| Vogeloverlast.be | — | — | — | — | — | JS redirect actief |
| GevelwerkenGent.be | — | — | — | — | — | Nog niet live |
| AlsaceRenovation.fr | — | — | — | — | — | Nog niet live |
| TenerifeRenovations.com | — | — | — | — | — | Nog niet live |

### Indexering checklist (maandelijks)
- [ ] GSC Coverage rapport per domein controleren
- [ ] Nieuwe crawl-errors noteren
- [ ] Sitemap status controleren (submitted vs indexed)
- [ ] robots.txt valideren per domein
- [ ] Canonical tags steekproef (5 pagina's per site)

---

## 3. Rankings Monitor

> **Bron**: GSC Performance > Queries, of handmatige SERP-check (incognito)

### 3.1 Daklekkages.be

| Keyword | Zoekvolume (maand) | Positie | Vorige maand | Trend | Doel-URL |
|---------|-------------------|---------|--------------|-------|----------|
| daklekkage herstellen | ~720 | — | — | — | /daklekkage-herstellen |
| daklekkage spoed | ~390 | — | — | — | /spoed-daklekkage |
| daklekkage kosten | ~320 | — | — | — | /kosten |
| daklekkage [stad] | varies | — | — | — | /[stad] |

### 3.2 Poxy.be

| Keyword | Zoekvolume (maand) | Positie | Vorige maand | Trend | Doel-URL |
|---------|-------------------|---------|--------------|-------|----------|
| epoxy vloer prijs | ~1300 | — | — | — | /epoxy-vloer-prijs |
| epoxy coating | ~880 | — | — | — | /epoxy-coating |
| epoxy vloer garage | ~590 | — | — | — | /epoxy-vloer-garage |
| epoxy vloer [stad] | varies | — | — | — | /[stad] |

### 3.3 Funderingsproblemen.be

| Keyword | Zoekvolume (maand) | Positie | Vorige maand | Trend | Doel-URL |
|---------|-------------------|---------|--------------|-------|----------|
| funderingsproblemen | ~480 | #1 | — | — | / |
| fundering herstellen | ~390 | — | — | — | /fundering-herstellen |
| fundering kosten | ~260 | — | — | — | /kosten |
| scheuren in muur fundering | ~210 | — | — | — | /scheuren-muur |

### 3.4 Vogeloverlast.be

| Keyword | Zoekvolume (maand) | Positie | Vorige maand | Trend | Doel-URL |
|---------|-------------------|---------|--------------|-------|----------|
| vogeloverlast | ~590 | — | — | — | / |
| duiven verjagen | ~1600 | — | — | — | /duiven-verjagen |
| vogelwering | ~480 | — | — | — | /vogelwering |
| vogelnet plaatsen | ~260 | — | — | — | /vogelnet |

### 3.5 GevelwerkenGent.be

| Keyword | Zoekvolume (maand) | Positie | Vorige maand | Trend | Doel-URL |
|---------|-------------------|---------|--------------|-------|----------|
| gevelwerken gent | ~210 | — | — | — | / |
| gevelrenovatie gent | ~170 | — | — | — | /gevelrenovatie |
| voegwerken gent | ~140 | — | — | — | /voegwerken |
| gevelschilderwerk gent | ~90 | — | — | — | /gevelschilderwerk |

### 3.6 AlsaceRenovation.fr

| Keyword | Zoekvolume (maand) | Positie | Vorige maand | Trend | Doel-URL |
|---------|-------------------|---------|--------------|-------|----------|
| renovation alsace | ~390 | — | — | — | / |
| renovation maison alsace | ~260 | — | — | — | /renovation-maison |
| artisan renovation strasbourg | ~170 | — | — | — | /strasbourg |
| renovation energetique alsace | ~140 | — | — | — | /renovation-energetique |

### 3.7 TenerifeRenovations.com

| Keyword | Zoekvolume (maand) | Positie | Vorige maand | Trend | Doel-URL |
|---------|-------------------|---------|--------------|-------|----------|
| renovation tenerife | ~210 | — | — | — | / |
| home renovation tenerife | ~170 | — | — | — | /home-renovation |
| kitchen renovation tenerife | ~90 | — | — | — | /kitchen |
| bathroom renovation tenerife | ~90 | — | — | — | /bathroom |

### Rankings checklist (maandelijks)
- [ ] Top 5 keywords per domein checken in GSC
- [ ] Handmatige SERP-check voor money keywords (incognito)
- [ ] Nieuwe keyword-kansen noteren uit GSC Queries
- [ ] Concurrenten monitoren op verschuivingen

---

## 4. Traffic Monitor

> **Bron**: Google Analytics 4 / GSC Performance > Clicks

| Domein | Sessies (maand) | Vorige maand | MoM % | Clicks (GSC) | Impressions (GSC) | CTR | Opmerkingen |
|--------|----------------|--------------|-------|-------------|-------------------|-----|-------------|
| Daklekkages.be | — | — | — | — | — | — | |
| Poxy.be | — | — | — | — | — | — | |
| Funderingsproblemen.be | — | — | — | — | — | — | |
| Vogeloverlast.be | — | — | — | — | — | — | |
| GevelwerkenGent.be | — | — | — | — | — | — | |
| AlsaceRenovation.fr | — | — | — | — | — | — | |
| TenerifeRenovations.com | — | — | — | — | — | — | |

### Traffic checklist (maandelijks)
- [ ] GA4 sessies per domein exporteren
- [ ] GSC clicks + impressions per domein noteren
- [ ] Top landing pages per domein identificeren
- [ ] Bounce rate en engagement rate vergelijken
- [ ] Traffic-bronnen checken (organic vs direct vs referral)

---

## 5. Lead & Revenue Monitor

> **Doel**: ROI per domein volgen voor Rank & Rent pricing

| Domein | Leads (maand) | Vorige maand | Lead-waarde | Maandomzet potentieel | Partner status |
|--------|--------------|--------------|-------------|----------------------|----------------|
| Daklekkages.be | — | — | EUR 50-150/lead | EUR 800-2000 | Zoekend |
| Poxy.be | — | — | EUR 80-200/lead | EUR 500-1500 | Zoekend |
| Funderingsproblemen.be | — | — | EUR 100-300/lead | EUR 600-1800 | Zoekend |
| Vogeloverlast.be | — | — | EUR 40-100/lead | EUR 400-1000 | Zoekend |
| GevelwerkenGent.be | — | — | EUR 60-150/lead | EUR 500-1200 | Zoekend |
| AlsaceRenovation.fr | — | — | EUR 100-250/lead | EUR 600-1500 | Zoekend |
| TenerifeRenovations.com | — | — | EUR 150-400/lead | EUR 800-2000 | Zoekend |

---

## 6. Technische Gezondheid

> **Bron**: GSC, PageSpeed Insights, handmatige checks

| Domein | Core Web Vitals | SSL | Mobile-friendly | Sitemap OK | Robots.txt OK | Structured Data |
|--------|----------------|-----|-----------------|------------|---------------|-----------------|
| Daklekkages.be | — | — | — | — | — | — |
| Poxy.be | — | — | — | — | — | — |
| Funderingsproblemen.be | — | — | — | — | — | — |
| Vogeloverlast.be | — | — | — | — | — | — |
| GevelwerkenGent.be | — | — | — | — | — | — |
| AlsaceRenovation.fr | — | — | — | — | — | — |
| TenerifeRenovations.com | — | — | — | — | — | — |

---

## 7. Backlink Monitor

> **Bron**: GSC Links rapport, Ahrefs/Moz (indien beschikbaar)

| Domein | Totaal backlinks | Referring domains | Nieuwe (maand) | Verloren (maand) | DR/DA |
|--------|-----------------|-------------------|----------------|------------------|-------|
| Daklekkages.be | — | — | — | — | — |
| Poxy.be | — | — | — | — | — |
| Funderingsproblemen.be | — | — | — | — | — |
| Vogeloverlast.be | — | — | — | — | — |
| GevelwerkenGent.be | — | — | — | — | — |
| AlsaceRenovation.fr | — | — | — | — | — |
| TenerifeRenovations.com | — | — | — | — | — |

---

## 8. Maandelijks Actie-overzicht

### Prioriteiten deze maand
1. —
2. —
3. —

### Afgerond vorige maand
1. —
2. —
3. —

### Geblokkeerd / Wachtend
1. —

---

## 9. Monitoring Proces

### Databronnen & Tools
| Tool | Wat monitoren | Frequentie | Verantwoordelijke |
|------|--------------|------------|-------------------|
| Google Search Console | Indexering, clicks, impressions, keywords | Maandelijks | Wout de Scout |
| Google Analytics 4 | Sessies, bounceRate, engagement, conversies | Maandelijks | Wout de Scout |
| PageSpeed Insights | Core Web Vitals, performance score | Maandelijks | Jean-Cloud (tech) |
| Handmatige SERP-check | Top 5 money keywords per domein | Maandelijks | Wout de Scout |
| GSC Links rapport | Backlink groei/verlies | Maandelijks | Wout de Scout |
| Leadformulier data | Leads per domein | Maandelijks | Lisa/Bart |

### Maandelijks Monitoring Workflow
1. **Week 1 (dag 1-3)**: Data verzamelen uit GSC + GA4 voor alle domeinen
2. **Week 1 (dag 3-5)**: Dashboard invullen, trends markeren
3. **Week 1 (dag 5)**: Rapport delen met Lisa & Bart
4. **Week 2-4**: Actie-items uitvoeren op basis van bevindingen

### Trend Legenda
| Symbool | Betekenis |
|---------|-----------|
| ↑ | Verbetering t.o.v. vorige maand |
| ↓ | Verslechtering t.o.v. vorige maand |
| → | Stabiel / geen significante wijziging |
| ★ | Nieuw / eerste meting |
| ⚠ | Aandacht nodig |

---

## 10. Changelog

| Datum | Wijziging | Door |
|-------|-----------|------|
| 2026-06-11 | Template v1.0 aangemaakt | Wout de Scout |

---

*Dit dashboard wordt maandelijks bijgewerkt. Alle data komt uit eerste-partij bronnen (GSC, GA4). Voor backlink-analyse is een Ahrefs/Moz account aanbevolen maar niet vereist.*
