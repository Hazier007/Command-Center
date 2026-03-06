# Opblaasbareboot.be — Productpagina template (affiliate)

Doel: een template dat (1) **converteert**, (2) **SEO-proof** is, (3) schaalbaar is naar veel producten.

## 1) SEO basis (bovenaan definiëren)
- **Title tag (formule)**: `{{Productnaam}} review (2026) + prijs & beste deal | Opblaasbareboot.be`
  - Variant: `Beste prijs {{Productnaam}} + voor- en nadelen (2026)`
- **Meta description (formule)**: `{{Productnaam}}: {{1 USP}}. Bekijk specs, voor/nadelen en de beste prijs bij Amazon. Inclusief alternatieven in dezelfde categorie.`
- **URL slug**: `/{{categorie}}/{{productnaam-kebab}}/`
- **H1**: `{{Productnaam}} review`
- **Breadcrumbs**: Home > Categorie > Product

## 2) Above the fold (conversieblok)
**Blok A — Hero + CTA**
- Productnaam + korte 1-liner (USP)
- Rating (Amazon stars + aantal reviews) *(als beschikbaar)*
- “Prijs indicatie” + “Check prijs op Amazon” knop
- 3–5 quick bullets (USPs)
- 1 hoofdafbeelding + 3 thumbnails

**CTA copy voorbeelden**
- “Bekijk prijs & beschikbaarheid op Amazon”
- “Check de beste deal”

## 3) Inhoudsstructuur (H2’s)

### H2: Voor wie is dit product?
- 3 persona’s (bv. beginners / gezinnen / touring)
- 1 “niet voor jou als …” (kwalificatie)

### H2: Belangrijkste specs (tabel)
**Specs velden (aanpasbaar per categorie)**
- Categorie-specifiek (kayak/SUP/zwembad/…)
- Altijd: merk, model, type, capaciteit, materiaal, gewicht, afmetingen, max belasting, accessoires inbegrepen, garantie

**Voorbeeld (SUP)**
- Lengte / breedte / dikte
- Max PSI
- Max draaggewicht
- Aantal vinnen
- Inclusief: pomp, peddel, leash, tas, repair kit

### H2: Pluspunten en minpunten
- 4–6 bullets elk
- Minpunten eerlijk (vertrouwen)

### H2: Ervaring / prestaties (praktijk)
- Stabiliteit, comfort, opbouwtijd (met pomp), transport
- Gebruik cases: meer / rivier / strand

### H2: Vergelijking met alternatieven
- 3–5 alternatieven in dezelfde prijsklasse
- Tabel met kernverschillen
- Link intern naar alternatieve productpagina’s

### H2: Prijs & value for money
- Prijsrange (indicatief)
- Wanneer koop je best (seasonality / deals)
- “Goedkoper alternatief” + “premium alternatief”

### H2: FAQ
Voorbeelden:
- “Hoe lang duurt opblazen?”
- “Kan dit op zee?”
- “Wat is het verschil tussen dropstitch en PVC?”
- “Welke accessoires heb ik nodig?”

## 4) Interne linking (cruciaal)
- Op productpagina:
  - Link naar **categorie**
  - Link naar **beste-lijst** (bv. “Beste opblaasbare SUP’s”)
  - Link naar 3–8 **gerelateerde producten** (zelfde categorie)
  - Link naar 3–5 **accessoires** (pomp, leash, peddel, zwemvest, drybag)

## 5) Structured data (JSON-LD)
Minimaal:
- `Product` schema
  - name, image, brand
  - aggregateRating (als je het hebt)
  - offers (price, priceCurrency, availability, url) *(kan “indicatief” met Update policy of enkel ‘Check prijs’ zonder price)*
Aanvullend:
- `FAQPage` schema voor FAQ
- `BreadcrumbList`

## 6) Copy guidelines (affiliate / E-E-A-T)
- Begin met **samenvatting**: “Wat is het + voor wie + waarom wel/niet”
- Vermijd vage claims; liever meetbaar (“max 150kg”, “opbouw ~10 min met elektrische pomp”).
- Vermeld **bron** voor specs (Amazon listing / fabrikant) indien mogelijk.

## 7) Content hergebruik per categorie (snelle scaling)
- Bouw **categorie-snippets** die je per product hergebruikt:
  - “Hoe kies je een SUP?”
  - “Wat is dropstitch bij kayaks?”
  - “Filterpomp: wanneer nodig bij zwembaden?”
- Houd 20–30% uniek per product (USPs, specs, alternatieven, FAQ).

