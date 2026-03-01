# Notaris Calculator Research — 1 maart 2026

## Executive Summary

**Kans:** ✅ **GOUD** — Hoog zoekvolume, evergreen content, beperkte programmatic concurrentie.

**Concurrentie:** Officiële tools (notaris.be, immolytics.be) maar geen dedicated programmatic sites zoals onze tool-sites (btw-calculator.be, loonberekening.be).

**Build timeline:** 1-2 dagen (Jean-Cloud)

**Revenue model:** AdSense + affiliate (hypotheekvergelijkers, verzekeringen)

---

## Keywords & Volume

### Primary Keywords
| Keyword | Intent | Volume Estimate | Difficulty |
|---------|--------|----------------|------------|
| registratierechten berekenen | High (huis kopen) | 🔥 Hoog | Medium |
| notariskosten berekenen | High (huis kopen) | 🔥 Hoog | Medium |
| schenkbelasting berekenen | Medium (estate planning) | Medium | Low |
| erfbelasting berekenen | Medium (estate planning) | Medium | Low |
| aankoopkosten huis berekenen | High | 🔥 Hoog | Medium |

**Opmerking:** Volume data niet exact (geen API access), maar deze termen worden massaal gezocht door huizenkopers in België.

### Long-tail Opportunities
- "registratierechten vlaanderen 2026"
- "notariskosten nieuwbouw vs bestaand"
- "schenkbelasting roerend onroerend verschil"
- "erfbelasting broers zussen tarieven"

---

## Concurrentie Analyse

### Top 3 Ranking Sites

**1. notaris.be/rekenmodules**
- ✅ Officiële bron, betrouwbaar
- ❌ Complexe interface, niet SEO-geoptimaliseerd
- ❌ Veel juridisch jargon, intimiderend voor gewone mensen

**2. immolytics.be**
- ✅ Gratis calculator
- ❌ Niet specifiek per tool (deel van grotere site)
- ❌ Matige UX

**3. finday.be**
- ✅ Simulator
- ❌ Gefocust op hypotheken, niet op pure notariskosten

### Market Gap
**Niemand heeft een dedicated, simpele, SEO-friendly tool-site** zoals:
- btw-calculator.be
- loonberekening.be
- kmvergoeding.be

→ **We kunnen hier makkelijk top 3 rankings pakken** met:
- Clean design
- Simpele inputs (prijs, regio, enige/tweede woning)
- Direct resultaat zonder rommel
- Programmatic content (per gemeente/stad)

---

## Officiële Tarieven Data (voor Jean-Cloud's logica)

### 1. Registratierechten (Vlaanderen 2026)

**Officiële bronnen:**
- https://www.notaris.be/rekenmodules
- https://www.vlaanderen.be (info, geen calculator)

**Tarieven:**
| Type | Tarief | Voorwaarden |
|------|--------|-------------|
| Enige eigen woning | **2%** | - Geen ander onroerend goed bezitten<br>- Domicilie vestigen binnen 2 jaar<br>- Minstens 1 jaar onafgebroken bewonen |
| Tweede woning | **12%** | Standaard tarief |
| Bouwgrond | **12%** | Standaard tarief |
| Bedrijfsvastgoed | **12%** | Standaard tarief |

**Berekening:**
```
Registratierechten = Aankoopprijs × Tarief (%)
```

**Voorbeeld:**
- €300.000 (enige eigen woning): €300.000 × 2% = **€6.000**
- €300.000 (tweede woning): €300.000 × 12% = **€36.000**

---

### 2. Notaris Erelonen

**Tariefstructuur:** Degressief (hogere prijs = lager %)

**Basis schatting:**
- ~1% van aankoopprijs + 21% BTW
- Wettelijk vastgelegd, niet onderhandelbaar

**Andere kosten:**
- Administratie & opzoekingen: €500-1.200 + BTW
- Diverse (inschrijvingen, hypotheek): €300-750 + BTW

**Totaal voorbeeld (€300.000):**
| Component | Bedrag |
|-----------|--------|
| Registratierechten (2%) | €6.000 |
| Ereloon notaris | ~€3.000 |
| Administratie | €850 |
| Diversen | €500 |
| **TOTAAL** | **~€11.300** |

---

### 3. Schenkbelasting (Vlaanderen 2026)

**Roerende goederen (geld, aandelen):**
| Verwantschap | Tarief |
|--------------|--------|
| Partner/kinderen | **3%** (vlak) |
| Broers/zussen | **7%** (vlak) |
| Anderen | **7%** (vlak) |

**Onroerende goederen (vastgoed) — Partner/Kinderen:**
| Schijf | Tarief |
|--------|--------|
| €0 - €150.000 | **3%** |
| €150.001 - €250.000 | **9%** |
| €250.001 - €450.000 | **18%** |
| Boven €450.000 | **27%** |

**Anderen (niet-familie):**
Hogere tarieven tot **40%** (progressief)

**Berekening:** Progressief per schijf (zoals inkomstenbelasting)

---

### 4. Erfbelasting (Vlaanderen 2026)

**Rechte lijn & Partners:**
| Schijf | Tarief |
|--------|--------|
| €0 - €50.000 | **3%** |
| €50.001 - €250.000 | **9%** |
| Boven €250.000 | **27%** |

**Broers/Zussen:**
| Schijf | Tarief |
|--------|--------|
| €0 - €35.000 | **25%** |
| €35.001 - €75.000 | **30%** |
| Boven €75.000 | **55%** |

**Andere erfgenamen:**
| Schijf | Tarief |
|--------|--------|
| €0 - €35.000 | **25%** |
| €35.001 - €75.000 | **45%** |
| Boven €75.000 | **55%** |

**Vrijstellingen 2026:**
- Partner: Gezinswoning volledig vrijgesteld
- Partner roerend: Abattement €75.000
- Single vermindering: Tot €100.000 verlaagde tarieven (kinderloze alleenstaanden)

---

## Build Specificaties voor Jean-Cloud

### MVP Features (Week 1)

**1. Registratierechten Calculator**
Inputs:
- Aankoopprijs (€)
- Regio (dropdown: Vlaanderen / Brussel / Wallonië)
- Type: Enige eigen woning / Tweede woning
- Radio: Nieuwbouw (BTW) / Bestaand (registratierechten)

Output:
- Registratierechten (€)
- Geschatte notariskosten (€)
- Totaal aankoopkosten (€)

**2. Schenkbelasting Calculator**
Inputs:
- Bedrag (€)
- Type: Roerend / Onroerend
- Verwantschap: Partner/Kind / Broer/Zus / Ander

Output:
- Schenkbelasting (€)
- Effectief tarief (%)

**3. Erfbelasting Calculator**
Inputs:
- Bedrag erfenis (€)
- Verwantschap: Partner / Kind / Broer/Zus / Ander
- Type: Roerend / Onroerend

Output:
- Erfbelasting (€)
- Netto ontvangen (€)

### Tech Stack
- Same als btw-calculator.be (HTML/CSS/JS)
- Static site (Astro/Next.js?)
- AdSense integratie
- Affiliate links (hypotheekvergelijkers)

### Content Strategy
- Landingspagina per calculator
- SEO content: "Hoe worden registratierechten berekend?"
- FAQ per calculator
- Crosslinks naar huizenopkoper.be (Bart's bestaande site)

---

## Revenue Potential

**Traffic schatting:** 5.000-15.000 bezoekers/maand (na 6-12 maanden SEO)

**Revenue streams:**
1. **AdSense:** €2-5 RPM (vastgoed niche) → €300-900/maand
2. **Affiliate (hypotheekvergelijkers):** €10-30/lead → €200-600/maand (20-30 conversies)
3. **Affiliate (verzekeringen):** €5-15/lead → €100-300/maand

**Total:** €600-1.800/maand (conservatief)

---

## Domain Suggesties

**Optie 1:** registratierechten.be (exact match keyword)
**Optie 2:** notariskosten.be (breder, meer traffic potential)
**Optie 3:** aankoopkosten.be (nog breder)

**Aanbeveling:** **notariskosten.be** (beste balans tussen volume & conversie)

---

## Next Steps

1. ✅ **Wout:** Research klaar
2. ⏳ **Jean-Cloud:** Domein check/registratie
3. ⏳ **Jean-Cloud:** Calculator logica bouwen (1-2 dagen)
4. ⏳ **Lisa:** GO geven voor launch
5. ⏳ **Bart:** Crosslinks vanaf huizenopkoper.be opzetten

**ETA live:** 3-5 dagen na GO

---

## Conclusie

✅ **Market gap:** Officiële tools zijn er, maar geen SEO-focused tool-sites  
✅ **Proven model:** Zelfde playbook als btw-calculator.be  
✅ **Low maintenance:** Tarieven wijzigen max 1x/jaar  
✅ **High intent:** Mensen die dit zoeken = huizenkopers (€€€ affiliate potential)  

**GO/NO-GO:** 🟢 **GO** — dit is laaghangende vrucht.
