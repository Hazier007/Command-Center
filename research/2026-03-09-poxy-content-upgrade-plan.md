# Content Upgrade Plan Poxy.be (2026)
## Doel: Dichten van de Indexing Gap & Verhogen van de Lokale Relevantie

**Datum:** 2026-03-09  
**Status:** Research & Voorstel Fase  
**Auteur:** Wout de Scout (OpenClaw Subagent)

---

## 1. Samenvatting
Poxy.be kampt met een "indexing gap" waarbij ~82% van de pagina's (900 van de 1100) niet geïndexeerd worden door Google. Dit duidt op **thin content** of gebrek aan unieke waarde per pagina. Dit plan stelt een drastische upgrade voor van de stadspagina's door ze te verrijken met lokale data, marktanalyse en relevante long-tail zoekopdrachten.

### Key Findings:
- **Top Prioriteit:** De "Vlaamse Ruit" (Antwerpen, Gent, Brussel, Leuven, Mechelen) biedt de hoogste ROI door hoge woningprijzen en renovatiegraad.
- **Data-gedreven SEO:** Door stads-specifieke vastgoeddata te integreren, transformeren we de pagina's van "template-copy" naar "lokale expert-gidsen".
- **Indexing Fix:** Google indexeert pagina's sneller wanneer ze unieke entiteiten (zoals lokale prijzen en demografie) bevatten die nergens anders op de site staan.

---

## 2. Top 20 Prioriteitssteden
Gebaseerd op zoekvolume, renovatiepotentieel en gemiddelde woningprijzen (Data 2024-2025).

| Prioriteit | Stad | Focus Segment | Waarom? |
| :--- | :--- | :--- | :--- |
| 1 | **Antwerpen** | Lofts & Garages | Grootste volume, veel industriële panden. |
| 2 | **Gent** | Design Gietvloeren | Hoge renovatiegraad, esthetisch bewuste doelgroep. |
| 3 | **Brussel** | Appartementen | Enorme markt, tweetalige kansen, hoge woningprijzen. |
| 4 | **Leuven** | High-end Residentieel | Duurste markt, veel nieuwbouw en renovatie. |
| 5 | **Mechelen** | Gezinswoningen | Groeiende stad, centrale ligging, veel jonge kopers. |
| 6 | **Brugge** | Monumenten/Luxe | Historische panden die moderne vloeren nodig hebben. |
| 7 | **Hasselt** | Design & Winkels | Modehoofdstad, sterke focus op interieur. |
| 8 | **Kortrijk** | Industrieel Look | Designregio, veel vraag naar beton-look. |
| 9 | **Oostende** | Appartementen/Kust | Specifieke noden (zoute lucht, vochtwerend). |
| 10 | **Sint-Niklaas** | KMO/Garages | Centrale hub voor kleine ondernemingen. |
| 11-20 | Aalst, Roeselare, Genk, Beveren, Dendermonde, Turnhout, Beringen, Vilvoorde, Lokeren, Geel. |

---

## 3. Template Upgrade Voorstel (De "Unique Value" Secties)

Om de indexing gap te dichten, moet elke stadspagina de volgende **nieuwe secties** bevatten:

### A. Lokale Markt Analyse (Dynamic Content)
*In plaats van standaard tekst, gebruiken we de data uit de dataset:*
- **Woningmarkt Status:** "In [Stad] ligt de gemiddelde woningprijs rond de €[Prijs]. Gezien de hoge renovatiegraad van [Grade]/10 in deze regio, zien we een stijgende vraag naar duurzame epoxyvloeren."
- **Type Woningen:** Specifieke vermelding of het gaat om herenhuizen (Gent/Antwerpen), kust-appartementen (Oostende) of moderne villa's (Kempen).

### B. Regio FAQ (Long-tail focus)
*Beantwoord de vragen die mensen in die stad echt stellen:*
- "Wat kost een epoxyvloer in [Stad] per m2?"
- "Zijn er premies voor vloerisolatie/renovatie in [Provincie]?"
- "Hoe snel kan Poxy.be een garage coaten in de regio [Stad]?"

### C. Lokale Autoriteit & E-E-A-T
- **Referentie Projecten:** "Recent project in de buurt van [Bekende Wijk/Straatnaam]."
- **Afstand/Bereikbaarheid:** "Onze teams zijn dagelijks actief in [Stad] en omliggende gemeenten zoals [Buurgemeente 1] en [Buurgemeente 2]."

### D. Technische Specificaties per Toepassing
- Focus op **"Epoxyvloer Garage [Stad]"** (Hoge conversie).
- Focus op **"Gietvloer Woonkamer [Stad]"** (Hoog budget).

---

## 4. Dataset voor Implementatie
De volledige dataset is opgeslagen als `research/poxy-city-dataset-2026.json`. JC kan deze direct gebruiken om de variabelen in de CMS-templates te injecteren.

**Voorbeeld JSON entry:**
```json
{
  "city": "Gent",
  "population": 272389,
  "avg_house_price_2024": 512000,
  "renovation_grade": 9.2,
  "long_tail_keywords": ["design gietvloer Gent", "epoxyvloer prijs per m2 Gent"]
}
```

---

## 5. Actieplan & Volgende Stappen

1. **Fase 1 (Direct):** Update de Top 5 steden (Antwerpen, Gent, Brussel, Leuven, Mechelen) met de nieuwe template. Monitor de Google Search Console voor "Indexering aangevraagd".
2. **Fase 2 (Week 2):** Bulk-update van de resterende 15 steden uit de Top 20.
3. **Fase 3 (Lange termijn):** Automatiseer de injectie van buurt-specifieke data (postcodes/wijken) voor de overige 900 pagina's om "thin content" over de gehele breedte te elimineren.

---
*Gegenereerd door Wout de Scout | OpenClaw Subagent*
