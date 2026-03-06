# AdSense content plan (urgent) — datumberekenen.be & btw-calculator.be

Doel: meer **“helpful content”** zodat AdSense niet meer afkeurt op *“content van weinig waarde / te simpel”*.

**Data:** search volumes via DataForSEO (Google Ads) — **location_code 2056, language nl** (BE/NL-achtig). Volumes zijn richtinggevend.

---

## 1) datumberekenen.be

### Top 20 long-tail keywords (met volume)

| Keyword | Volume |
|---|---:|
| datum berekenen | 1600 |
| datums berekenen | 1600 |
| dagen tussen twee datums | 170 |
| werkdagen berekenen | 90 |
| kalenderdagen berekenen | 90 |
| aantal werkdagen berekenen | 70 |
| leeftijd berekenen op datum | 50 |
| datum aftrekken | 30 |
| aantal dagen tot | 30 |
| datum verschil berekenen | 20 |
| datum plus dagen | 20 |
| weeknummer berekenen | 10 |
| aantal dagen tussen twee datums | 10 |
| btw — | 0 |
| datum min dagen | 0 |
| datum toevoegen | 0 |
| weken tussen twee datums | 0 |
| maanden tussen twee datums | 0 |
| jaren tussen twee datums | 0 |
| deadline berekenen | 0 |

> Note: de “0 volume” keywords zijn niet waardeloos—soms is dit te niche of te weinig data. Je kan die pagina’s toch bouwen als ze **use-case gedreven** zijn (en intern linken).

### 10–15 FAQ’s (met uitgebreide antwoorden)

1) **Hoe bereken ik het aantal dagen tussen twee datums?**  
Je telt het verschil tussen start- en einddatum. Let op of je **de startdag en/of einddag** wil meetellen. Voor veel berekeningen is het logisch om *exclusief startdatum* en *inclusief einddatum* te werken, maar bij verlof/contracten kan het anders zijn.

2) **Wat is het verschil tussen kalenderdagen en werkdagen?**  
Kalenderdagen zijn **alle dagen** (ma–zo). Werkdagen zijn meestal **ma–vr**, en vaak moet je ook **feestdagen** uitsluiten. Voor deadlines in business-context is “werkdagen” meestal nuttiger.

3) **Telt een einddatum mee in de berekening?**  
Dat hangt af van de situatie:
- “Hoeveel dagen zijn er *tussen* 1/1 en 10/1?” → vaak exclusief start, inclusief eind.
- “Van 1/1 t.e.m. 10/1” → expliciet inclusief beide.
Voor AdSense/UX: voeg een toggle toe: *startdag meetellen* / *einddag meetellen*.

4) **Hoe bereken ik een datum + X dagen (of - X dagen)?**  
Je neemt de startdatum en telt X kalenderdagen op (of trekt af). Voor werkdagen moet je dagen overslaan (weekend + eventueel feestdagen).

5) **Hoe bereken ik het weeknummer van een datum?**  
Meestal gebruik je ISO-weeknummers: week 1 is de week met de **eerste donderdag** van het jaar. Daardoor kan 1 januari soms nog bij week 52/53 van het vorige jaar horen.

6) **Hoe bereken ik mijn leeftijd op een specifieke datum?**  
Leeftijd = aantal volledige jaren tussen geboortedatum en referentiedatum. Als je verjaardag in dat jaar nog niet geweest is, trek je 1 jaar af.

7) **Waarom krijg ik een ander resultaat dan in Excel/Google Sheets?**  
Excel rekent soms anders met inclusiviteit. Ook het datumformaat (dd/mm vs mm/dd) kan fout interpreteren. Bied op de site een “Excel-formule” voorbeeld aan en leg inclusiviteit uit.

8) **Hoe bereken ik het aantal weken tussen twee datums?**  
Je kan dit doen als:
- exacte dagen / 7 (met decimalen)
- of “volle weken” (afronden naar beneden)
- of “kalenderweken” (weeknummers).  
Voor duidelijkheid: laat gebruikers kiezen.

9) **Hoe bereken ik het aantal maanden tussen twee datums?**  
Maanden zijn tricky (28–31 dagen). Je kan:
- ‘maandverschil’ op kalender (1 feb → 1 mrt = 1 maand)
- of dagenverschil omzetten naar gemiddelde maand.  
Voor contracten is kalendermaand meestal relevant.

10) **Hoe bereken ik een deadline in werkdagen?**  
Start + X werkdagen, waarbij je weekends overslaat. Als je ook Belgische feestdagen wil, moet je die lijst toevoegen (kan zelfs statisch in de browser als dataset).

11) **Hoe bereken ik schooldagen (zonder weekends en vakanties)?**  
Schoolvakanties verschillen per gemeenschap/land. Maak een pagina die uitlegt dat je enkel weekends uitsluit tenzij je ook een vakantiekalender kiest.

12) **Hoe tel ik 30 dagen op vanaf vandaag?**  
Kalenderdagen: vandaag + 30. Werkdagen: vandaag + 30 werkdagen. Dit is een klassiek use-case voor planners en deadlines.

13) **Hoeveel dagen tot een bepaalde datum?**  
Je berekent (targetdate - vandaag). Handig voor events, contractverval, factuurverval.

14) **Hoe ga ik om met schrikkeljaren (29 februari)?**  
Een schrikkeljaar heeft 29 februari. Bij leeftijd/jaardata kan dit edge-cases geven (geboren op 29/2). Leg de regels uit (meestal “verjaardag” op 28/2 of 1/3 afhankelijk van context).

15) **Hoe bereken ik het aantal dagen tussen datums inclusief beide datums?**  
Neem het normale verschil en tel 1 dag bij als je zowel start als eind meetelt.

### 3–5 extra pagina-ideeën (hoog “value” voor AdSense)

1) **“Kalenderdagen vs werkdagen vs feestdagen”** — uitleg + voorbeelden + toggle demo.
2) **“Weeknummer uitleg (ISO) + waarom week 1 soms in december start”**.
3) **“Excel / Google Sheets formules voor datumverschillen”** (met copy/paste snippets).
4) **“Veelgemaakte fouten bij datum rekenen”** (dd/mm vs mm/dd, inclusiviteit, tijdzones).
5) **“Feestdagen België (statische lijst) + werkdagen calculator”** (geen API nodig).

---

## 2) btw-calculator.be

### Top 20 long-tail keywords (met volume)

| Keyword | Volume |
|---|---:|
| btw berekenen | 8100 |
| btw omrekenen | 8100 |
| btw calculator | 720 |
| btw verlegd | 1000 |
| btw verleggen | 1000 |
| btw nummer controleren | 1600 |
| btw tarief belgie | 390 |
| btw aangifte kwartaal | 260 |
| btw berekenen formule | 140 |
| btw 21 berekenen | 110 |
| btw inclusief naar exclusief | 90 |
| btw op factuur | 90 |
| intracommunautaire levering btw | 90 |
| btw terugrekenen | 70 |
| btw berekenen excel | 50 |
| btw 9 berekenen | 10 |
| btw aangifte berekenen | 10 |
| marge regeling btw | 10 |
| btw exclusief naar inclusief | 0 |
| btw nummer validator | 0 |

### 10–15 FAQ’s (met uitgebreide antwoorden)

1) **Hoe bereken ik BTW van exclusief naar inclusief?**  
Formule: **incl = excl × (1 + BTW%)**. Voor 21%: incl = excl × 1,21. Voor 6%/9%: incl = excl × 1,06 / 1,09.

2) **Hoe reken ik BTW terug van inclusief naar exclusief?**  
Formule: **excl = incl ÷ (1 + BTW%)**. Voor 21%: excl = incl ÷ 1,21.

3) **Hoeveel BTW is 21% op €X?**  
BTW-bedrag = excl × 0,21. Toon 3 voorbeelden (klein/medium/groot bedrag) op de pagina.

4) **Wat zijn de BTW-tarieven in België?**  
België heeft verschillende tarieven (0%, 6%, 12%, 21%) afhankelijk van product/dienst. Maak een tabel + voorbeelden per tarief (AdSense loves “helpful tables”).

5) **Wat betekent ‘BTW verlegd’?**  
Bij verlegging van heffing betaalt de afnemer de BTW i.p.v. de leverancier. Dit komt vaak voor in B2B (bv. bouwsector) of intracommunautaire leveringen. Leg uit dat je factuur dan specifieke vermeldingen nodig heeft.

6) **Wanneer mag/ moet ik BTW verleggen?**  
Afhankelijk van sector en situatie. Maak een eenvoudige beslisboom: B2B? sector? land? → verlegd ja/nee.

7) **Wat moet er op een factuur staan qua BTW?**  
BTW-nummer, tarief, BTW-bedrag, totaal, en bij verlegging: de vermelding. Dit is typische “useful content” die AdSense wil zien.

8) **Hoe controleer ik een BTW-nummer (BE / NL)?**  
Leg uit dat je een check kan doen via VIES (EU) en dat formats verschillen (BE0xxxxxxxxx). Een simpele format-validator kan in-browser.

9) **Wat is het verschil tussen BTW en ‘incl./excl.’ prijzen?**  
B2C prijzen zijn vaak incl. BTW; B2B vaak excl. BTW. Leg uit waarom en hoe je dat communiceert.

10) **Hoe werkt BTW bij intracommunautaire leveringen?**  
Bij B2B binnen EU vaak 0% met verlegging (als voorwaarden kloppen) + listing/IC-aangifte. (Hou het algemeen; verwijs naar officiële info.)

11) **Hoe bereken ik BTW in Excel?**  
Geef formules:
- incl: `=A1*1,21`
- excl: `=A1/1,21`
- btw: `=A1*0,21`

12) **Wat is de marge-regeling (tweedehands) in het kort?**  
BTW wordt berekend op de marge, niet op de volledige verkoopprijs. Leg basis uit + wanneer van toepassing.

13) **Hoe werkt BTW-aangifte per kwartaal?**  
Leg uit: kwartaalperiodiciteit + deadlines + wat je nodig hebt (omzet, betaalde btw, aftrek). Hou het “high level”.

14) **Welke BTW kies ik: 6%, 12% of 21%?**  
Maak een pagina met ‘meest voorkomende’ categorieën (renovatie, horeca, …) + disclaimer.

15) **Waarom verschillen BTW-tarieven tussen België en Nederland?**  
Korte uitleg + tip: voor grensoverschrijdende verkoop gelden regels per land/afnemer.

### 3–5 extra pagina-ideeën (hoog “value” + in-browser)

1) **BTW-tarieven België (6/12/21) + voorbeelden per sector** (tabel + FAQ).
2) **BTW verlegd uitgelegd + factuurtekst generator** (in-browser; copy/paste).
3) **BTW-nummer format checker (BE/NL) + uitleg VIES**.
4) **“Incl ↔ excl calculator” per tarief + Excel formules** (mini tool + uitleg).
5) **BTW-aangifte deadlines (kalender) + checklist** (statisch, geen API).

---

## Extra (heel belangrijk voor AdSense, quick wins)

Ook al vroeg Lisa het niet expliciet: AdSense afkeuring is vaak combinatie van “thin content” + ontbrekende trust pagina’s. Zet op beide sites minimaal:
- **Over ons** (wat is de tool, waarom gratis, hoe werkt het)
- **Contact** (mail)
- **Privacy policy** + cookies
- **Disclaimer** (geen boekhoud/fiscaal advies)

Dat verhoogt “site quality” score.
