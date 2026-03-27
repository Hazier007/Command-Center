# Content Template: Hondenverzekering [RAS]

**Voor:** Programmatic SEO - Ras-specifieke pagina's  
**URL Structuur:** `/hondenverzekering-[ras-slug]`  
**Voorbeeld:** `/hondenverzekering-labrador-retriever`

---

## 🔧 Variabelen (Data Layer)

```json
{
  "ras_naam": "Labrador Retriever",
  "ras_slug": "labrador-retriever",
  "ras_kort": "Labrador",
  "gemiddelde_premie_min": 20,
  "gemiddelde_premie_max": 45,
  "typische_aandoeningen": [
    "Heupdysplasie",
    "Elleboogdysplasie",
    "Oogproblemen (PRA)"
  ],
  "levensverwachting": "10-12 jaar",
  "gewicht": "25-36 kg",
  "populariteit_rank": 1,
  "risico_score": "Middel-Hoog"
}
```

---

## 📄 HTML/Markdown Template

```html
<!DOCTYPE html>
<html lang="nl-BE">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- SEO Meta Tags -->
    <title>Hondenverzekering {{ras_naam}}: Vergelijk Prijzen vanaf €{{gemiddelde_premie_min}}/mnd (2026)</title>
    <meta name="description" content="Beste hondenverzekering voor {{ras_naam}} vanaf €{{gemiddelde_premie_min}}/maand. Vergelijk dekking voor {{typische_aandoeningen[0]}}, {{typische_aandoeningen[1]}} en meer. ✓ Figo ✓ SantéVet ✓ Belfius Direct.">
    
    <!-- Open Graph -->
    <meta property="og:title" content="Hondenverzekering {{ras_naam}} - Prijzen & Dekking 2026">
    <meta property="og:description" content="Vergelijk hondenverzekeringen voor {{ras_naam}}. Vanaf €{{gemiddelde_premie_min}}/mnd.">
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://[jouw-domain].be/hondenverzekering-{{ras_slug}}">
    
    <!-- Schema.org Markup -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Hoeveel kost een hondenverzekering voor een {{ras_naam}}?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Een hondenverzekering voor een {{ras_naam}} kost gemiddeld tussen €{{gemiddelde_premie_min}} en €{{gemiddelde_premie_max}} per maand, afhankelijk van leeftijd, dekking en aanbieder."
          }
        },
        {
          "@type": "Question",
          "name": "Welke aandoeningen worden gedekt bij een {{ras_naam}}?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "De meeste hondenverzekeringen dekken erfelijke aandoeningen zoals {{typische_aandoeningen[0]}}, {{typische_aandoeningen[1]}} en {{typische_aandoeningen[2]}} bij {{ras_kort}}s, mits afgesloten voor diagnose."
          }
        },
        {
          "@type": "Question",
          "name": "Wat is de beste hondenverzekering voor een {{ras_naam}}?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Figo en SantéVet scoren het beste voor {{ras_kort}}s dankzij brede dekking van erfelijke aandoeningen en hoge vergoedingspercentages (tot 90%). Belfius Direct is de goedkoopste optie."
          }
        }
      ]
    }
    </script>
</head>
<body>

<!-- HEADER -->
<header>
    <h1>Hondenverzekering {{ras_naam}}: Beste Opties & Prijzen (2026)</h1>
    <p class="lead">Vergelijk verzekeringen voor {{ras_kort}}s vanaf €{{gemiddelde_premie_min}}/maand. Inclusief dekking voor {{typische_aandoeningen[0]}}, {{typische_aandoeningen[1]}} en meer.</p>
</header>

<!-- BREADCRUMBS -->
<nav aria-label="breadcrumb">
    <ol class="breadcrumb">
        <li><a href="/">Home</a></li>
        <li><a href="/hondenverzekering">Hondenverzekering</a></li>
        <li class="active">{{ras_naam}}</li>
    </ol>
</nav>

<!-- MAIN CONTENT -->
<main>
    
    <!-- SECTION 1: Intro -->
    <section id="intro">
        <h2>Waarom een Verzekering voor je {{ras_naam}}?</h2>
        <p>
            {{ras_naam}}s zijn geliefd om hun [typische karaktereigenschap - dynamisch invoegen], 
            maar zijn helaas gevoelig voor erfelijke aandoeningen zoals <strong>{{typische_aandoeningen[0]}}</strong> 
            en <strong>{{typische_aandoeningen[1]}}</strong>. Een operatie voor heupdysplasie kan al snel €2.000 tot €4.000 kosten.
        </p>
        <p>
            Met een hondenverzekering ben je verzekerd van terugbetaling (tot 90% bij sommige aanbieders) en voorkom je 
            onverwachte kosten. Gemiddeld betaal je <strong>€{{gemiddelde_premie_min}} tot €{{gemiddelde_premie_max}} per maand</strong> 
            voor een {{ras_kort}}.
        </p>
        
        <!-- CTA Button -->
        <a href="#vergelijk" class="btn btn-primary">Direct Vergelijken →</a>
    </section>

    <!-- SECTION 2: Prijstabel -->
    <section id="prijzen">
        <h2>Gemiddelde Premie voor {{ras_naam}} (2026)</h2>
        <p>Prijzen voor een 1-jarige, gecastreerde {{ras_kort}} reu met basisformule:</p>
        
        <table class="table table-comparison">
            <thead>
                <tr>
                    <th>Aanbieder</th>
                    <th>Prijs/Maand</th>
                    <th>Max. Vergoeding/Jaar</th>
                    <th>Vergoeding %</th>
                    <th>Wachttijd</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Belfius Direct</strong></td>
                    <td>€21/mnd (€254/jr)</td>
                    <td>Tot 80% per geval</td>
                    <td>80%</td>
                    <td>15 dagen</td>
                    <td><a href="[affiliate-link]" class="btn-small">Bekijk →</a></td>
                </tr>
                <tr class="highlight">
                    <td><strong>Figo</strong> <span class="badge">Aanrader</span></td>
                    <td>€{{gemiddelde_premie_max}}/mnd</td>
                    <td>€3.000+</td>
                    <td>90%</td>
                    <td>30 dagen</td>
                    <td><a href="[affiliate-link]" class="btn-small">Bekijk →</a></td>
                </tr>
                <tr>
                    <td><strong>SantéVet</strong></td>
                    <td>€{{gemiddelde_premie_max - 5}}/mnd</td>
                    <td>€2.500</td>
                    <td>80%</td>
                    <td>30 dagen</td>
                    <td><a href="[affiliate-link]" class="btn-small">Bekijk →</a></td>
                </tr>
                <tr>
                    <td><strong>OHRA</strong></td>
                    <td>€{{gemiddelde_premie_min + 3}}/mnd</td>
                    <td>€2.000</td>
                    <td>80%</td>
                    <td>30 dagen</td>
                    <td><a href="[affiliate-link]" class="btn-small">Bekijk →</a></td>
                </tr>
            </tbody>
        </table>
        
        <p class="note">💡 <strong>Let op:</strong> Premies variëren per leeftijd en postcode. Gebruik onze <a href="#calculator">calculator</a> voor een exact bedrag.</p>
    </section>

    <!-- SECTION 3: Top 3 Aanbieders -->
    <section id="beste">
        <h2>Top 3 Hondenverzekeringen voor {{ras_naam}}</h2>
        
        <!-- #1 -->
        <div class="provider-card">
            <h3>🥇 1. Figo – Beste Allround</h3>
            <ul>
                <li>✅ <strong>90% vergoeding</strong> van dierenartskosten</li>
                <li>✅ Dekking erfelijke aandoeningen ({{typische_aandoeningen[0]}}, {{typische_aandoeningen[1]}})</li>
                <li>✅ <strong>Geen leeftijdsgrens</strong> bij afsluiten</li>
                <li>✅ Preventiebudget voor vaccinaties & controles</li>
                <li>✅ Claim via app binnen 48 uur</li>
            </ul>
            <p><strong>Prijs:</strong> €{{gemiddelde_premie_max}}/mnd | <strong>Max. vergoeding:</strong> €3.000+/jaar</p>
            <a href="[affiliate-link-figo]" class="btn btn-primary">Bekijk Figo →</a>
        </div>
        
        <!-- #2 -->
        <div class="provider-card">
            <h3>🥈 2. Belfius Direct – Goedkoopste</h3>
            <ul>
                <li>✅ Vanaf <strong>€21/maand</strong> (€254/jaar)</li>
                <li>✅ Tot <strong>80% vergoeding</strong> per geval</li>
                <li>✅ Dekking diefstal & overlijden</li>
                <li>⚠️ Franchise €150 per geval</li>
            </ul>
            <p><strong>Prijs:</strong> €21/mnd | <strong>Ideaal voor:</strong> Budget-bewuste eigenaren</p>
            <a href="[affiliate-link-belfius]" class="btn btn-secondary">Bekijk Belfius →</a>
        </div>
        
        <!-- #3 -->
        <div class="provider-card">
            <h3>🥉 3. SantéVet – Beste Service</h3>
            <ul>
                <li>✅ Dekking in binnen- en buitenland</li>
                <li>✅ App-based claims (snel terugbetaald)</li>
                <li>✅ Preventiebudget €50-100/jaar</li>
                <li>✅ 24/7 dierenartsadvies</li>
            </ul>
            <p><strong>Prijs:</strong> €{{gemiddelde_premie_max - 5}}/mnd | <strong>Max. vergoeding:</strong> €2.500/jaar</p>
            <a href="[affiliate-link-santevet]" class="btn btn-secondary">Bekijk SantéVet →</a>
        </div>
    </section>

    <!-- SECTION 4: Erfelijke Aandoeningen -->
    <section id="aandoeningen">
        <h2>Erfelijke Aandoeningen bij {{ras_naam}}s: Wat wordt Gedekt?</h2>
        <p>{{ras_kort}}s zijn helaas vatbaar voor specifieke erfelijke aandoeningen. Gelukkig dekken de meeste verzekeringen deze, <strong>mits afgesloten voordat de aandoening wordt vastgesteld</strong>.</p>
        
        <h3>Meest Voorkomende Aandoeningen:</h3>
        <ul>
            {{#each typische_aandoeningen}}
            <li>
                <strong>{{this}}</strong> – Symptomen, behandeling, kosten (€X.XXX - €X.XXX)
                <br><small>Gedekt door: Figo ✅ | SantéVet ✅ | Belfius Direct ✅ | OHRA ✅</small>
            </li>
            {{/each}}
        </ul>
        
        <div class="callout warning">
            ⚠️ <strong>Let op:</strong> Sluit je verzekering af <em>vóór</em> diagnose. Bestaande aandoeningen worden meestal uitgesloten.
        </div>
    </section>

    <!-- SECTION 5: Waar op Letten -->
    <section id="checklist">
        <h2>Waar op Letten bij het Kiezen van een Verzekering?</h2>
        <p>Voor een {{ras_naam}} zijn dit de belangrijkste factoren:</p>
        
        <ol>
            <li>
                <strong>Dekking erfelijke aandoeningen</strong>  
                <br>Vraag expliciet of {{typische_aandoeningen[0]}} en {{typische_aandoeningen[1]}} gedekt zijn.
            </li>
            <li>
                <strong>Vergoedingspercentage</strong>  
                <br>50% vs. 90% maakt enorm verschil bij dure operaties (€2.000+).
            </li>
            <li>
                <strong>Maximum vergoeding per jaar</strong>  
                <br>Kies minimaal €2.500-€3.000 voor {{ras_kort}}s (risico op meerdere behandelingen).
            </li>
            <li>
                <strong>Wachttijd</strong>  
                <br>Meestal 15-30 dagen voor ziekte. Petsecure heeft <strong>geen wachttijd</strong> (alleen kruisbanden/skelet eerste 2 maanden).
            </li>
            <li>
                <strong>Leeftijdsgrens bij afsluiten</strong>  
                <br>Figo heeft <strong>geen leeftijdsgrens</strong> – ideaal voor oudere {{ras_kort}}s.
            </li>
            <li>
                <strong>Eigen risico & eigen bijdrage</strong>  
                <br>Lager eigen risico = hogere premie. Check wat bij jouw budget past.
            </li>
        </ol>
    </section>

    <!-- SECTION 6: FAQ -->
    <section id="faq">
        <h2>Veelgestelde Vragen</h2>
        
        <div class="faq-item">
            <h3>Hoeveel kost een hondenverzekering voor een {{ras_naam}}?</h3>
            <p>Gemiddeld tussen <strong>€{{gemiddelde_premie_min}} en €{{gemiddelde_premie_max}} per maand</strong>, afhankelijk van leeftijd, dekking en aanbieder. Een pup is goedkoper dan een oudere hond.</p>
        </div>
        
        <div class="faq-item">
            <h3>Worden erfelijke aandoeningen gedekt?</h3>
            <p>Ja, bij de meeste aanbieders (Figo, SantéVet, Belfius, OHRA) worden {{typische_aandoeningen[0]}} en {{typische_aandoeningen[1]}} gedekt, <strong>mits de verzekering is afgesloten vóór de diagnose</strong>.</p>
        </div>
        
        <div class="faq-item">
            <h3>Vanaf welke leeftijd kan ik mijn {{ras_kort}} verzekeren?</h3>
            <p>De meeste verzekeraars accepteren honden vanaf 8 weken. Figo heeft <strong>geen leeftijdsgrens</strong>, dus ook oudere {{ras_kort}}s zijn verzekerd.</p>
        </div>
        
        <div class="faq-item">
            <h3>Is er een wachttijd?</h3>
            <p>Ja, meestal 15-30 dagen voor ziekte. Ongevallen zijn direct gedekt (na 48 uur). <strong>Petsecure heeft geen wachttijd</strong> (behalve kruisbanden/skelet eerste 2 maanden).</p>
        </div>
        
        <div class="faq-item">
            <h3>Wat is de beste verzekering voor een {{ras_naam}}?</h3>
            <p><strong>Figo</strong> voor uitgebreide dekking (90%, geen leeftijdsgrens), <strong>Belfius Direct</strong> voor de laagste prijs (€21/mnd), <strong>SantéVet</strong> voor beste service (app + buitenland).</p>
        </div>
        
        <div class="faq-item">
            <h3>Kan ik ook een oudere {{ras_kort}} verzekeren?</h3>
            <p>Ja! <strong>Figo is de enige zonder leeftijdsgrens</strong>. Andere aanbieders stoppen vaak bij 7-10 jaar bij afsluiten (bestaande polissen lopen door).</p>
        </div>
    </section>

    <!-- SECTION 7: CTA -->
    <section id="vergelijk" class="cta-section">
        <h2>Vergelijk Nu de Beste Hondenverzekeringen voor {{ras_naam}}</h2>
        <p>Krijg binnen 30 seconden een persoonlijk overzicht van prijzen en dekking.</p>
        
        <!-- Calculator Form (optioneel) -->
        <form class="calculator">
            <label>Leeftijd je {{ras_kort}}:</label>
            <select name="leeftijd">
                <option>Pup (0-1 jaar)</option>
                <option selected>Jong (1-3 jaar)</option>
                <option>Volwassen (3-7 jaar)</option>
                <option>Ouder (7+ jaar)</option>
            </select>
            
            <label>Postcode:</label>
            <input type="text" name="postcode" placeholder="1000">
            
            <button type="submit" class="btn btn-primary btn-large">Bereken Mijn Premie →</button>
        </form>
        
        <p class="small">Gratis & vrijblijvend. Geen persoonlijke gegevens vereist.</p>
    </section>

    <!-- SECTION 8: Gerelateerde Pagina's -->
    <section id="gerelateerd">
        <h2>Andere Rassen</h2>
        <ul class="related-links">
            <li><a href="/hondenverzekering-golden-retriever">Hondenverzekering Golden Retriever</a></li>
            <li><a href="/hondenverzekering-duitse-herder">Hondenverzekering Duitse Herder</a></li>
            <li><a href="/hondenverzekering-franse-bulldog">Hondenverzekering Franse Bulldog</a></li>
            <li><a href="/hondenverzekering-chihuahua">Hondenverzekering Chihuahua</a></li>
        </ul>
    </section>

</main>

<!-- FOOTER -->
<footer>
    <p>Laatst geüpdatet: {{current_date}} | Bronnen: Figo, SantéVet, Belfius Direct, OHRA, Petsecure</p>
</footer>

</body>
</html>
```

---

## 📊 Ras-Specifieke Data (Starter Set)

```json
[
  {
    "ras_naam": "Labrador Retriever",
    "ras_slug": "labrador-retriever",
    "ras_kort": "Labrador",
    "gemiddelde_premie_min": 20,
    "gemiddelde_premie_max": 45,
    "typische_aandoeningen": ["Heupdysplasie", "Elleboogdysplasie", "Oogproblemen (PRA)"],
    "levensverwachting": "10-12 jaar",
    "gewicht": "25-36 kg",
    "populariteit_rank": 1,
    "risico_score": "Middel-Hoog"
  },
  {
    "ras_naam": "Golden Retriever",
    "ras_slug": "golden-retriever",
    "ras_kort": "Golden",
    "gemiddelde_premie_min": 22,
    "gemiddelde_premie_max": 45,
    "typische_aandoeningen": ["Heupdysplasie", "Kanker (hemangiosarcoom)", "Hartproblemen"],
    "levensverwachting": "10-12 jaar",
    "gewicht": "25-34 kg",
    "populariteit_rank": 2,
    "risico_score": "Hoog"
  },
  {
    "ras_naam": "Duitse Herder",
    "ras_slug": "duitse-herder",
    "ras_kort": "Duitse Herder",
    "gemiddelde_premie_min": 26,
    "gemiddelde_premie_max": 45,
    "typische_aandoeningen": ["Heupdysplasie", "Elleboogdysplasie", "Degeneratieve myelopathie"],
    "levensverwachting": "9-13 jaar",
    "gewicht": "22-40 kg",
    "populariteit_rank": 3,
    "risico_score": "Hoog"
  },
  {
    "ras_naam": "Franse Bulldog",
    "ras_slug": "franse-bulldog",
    "ras_kort": "Frenchie",
    "gemiddelde_premie_min": 20,
    "gemiddelde_premie_max": 43,
    "typische_aandoeningen": ["Brachycefaal syndroom (ademhaling)", "Rugproblemen (IVDD)", "Huidproblemen"],
    "levensverwachting": "10-12 jaar",
    "gewicht": "8-14 kg",
    "populariteit_rank": 4,
    "risico_score": "Zeer Hoog"
  },
  {
    "ras_naam": "Chihuahua",
    "ras_slug": "chihuahua",
    "ras_kort": "Chihuahua",
    "gemiddelde_premie_min": 15,
    "gemiddelde_premie_max": 22,
    "typische_aandoeningen": ["Patella luxatie", "Hartproblemen (mitralisklep)", "Tandziekten"],
    "levensverwachting": "12-18 jaar",
    "gewicht": "1-3 kg",
    "populariteit_rank": 5,
    "risico_score": "Middel"
  },
  {
    "ras_naam": "Jack Russell Terrier",
    "ras_slug": "jack-russell-terrier",
    "ras_kort": "Jack Russell",
    "gemiddelde_premie_min": 20,
    "gemiddelde_premie_max": 35,
    "typische_aandoeningen": ["Patella luxatie", "Legg-Calvé-Perthes", "Doofheid"],
    "levensverwachting": "13-16 jaar",
    "gewicht": "5-8 kg",
    "populariteit_rank": 6,
    "risico_score": "Laag-Middel"
  },
  {
    "ras_naam": "Border Collie",
    "ras_slug": "border-collie",
    "ras_kort": "Border Collie",
    "gemiddelde_premie_min": 22,
    "gemiddelde_premie_max": 38,
    "typische_aandoeningen": ["Collie Eye Anomaly (CEA)", "Epilepsie", "Heupdysplasie"],
    "levensverwachting": "12-15 jaar",
    "gewicht": "12-20 kg",
    "populariteit_rank": 7,
    "risico_score": "Middel"
  },
  {
    "ras_naam": "Mechelse Herder",
    "ras_slug": "mechelse-herder",
    "ras_kort": "Mechelse Herder",
    "gemiddelde_premie_min": 24,
    "gemiddelde_premie_max": 42,
    "typische_aandoeningen": ["Heupdysplasie", "Elleboogdysplasie", "Oogproblemen"],
    "levensverwachting": "12-14 jaar",
    "gewicht": "20-30 kg",
    "populariteit_rank": 8,
    "risico_score": "Middel"
  },
  {
    "ras_naam": "Beagle",
    "ras_slug": "beagle",
    "ras_kort": "Beagle",
    "gemiddelde_premie_min": 18,
    "gemiddelde_premie_max": 32,
    "typische_aandoeningen": ["Epilepsie", "Hypothyreoïdie", "Oogproblemen (glaucoom)"],
    "levensverwachting": "12-15 jaar",
    "gewicht": "9-11 kg",
    "populariteit_rank": 9,
    "risico_score": "Laag-Middel"
  },
  {
    "ras_naam": "Yorkshire Terrier",
    "ras_slug": "yorkshire-terrier",
    "ras_kort": "Yorkie",
    "gemiddelde_premie_min": 17,
    "gemiddelde_premie_max": 28,
    "typische_aandoeningen": ["Patella luxatie", "Trachea collaps", "Legg-Calvé-Perthes"],
    "levensverwachting": "13-16 jaar",
    "gewicht": "2-3 kg",
    "populariteit_rank": 10,
    "risico_score": "Middel"
  }
]
```

---

## 🎯 SEO Checklist per Pagina

- [ ] Title tag: max 60 karakters, keyword vooraan
- [ ] Meta description: 150-160 karakters, CTA erin
- [ ] H1: Exact match hoofdkeyword
- [ ] H2-H6: Semantische variaties (LSI keywords)
- [ ] Schema markup: FAQPage + mogelijk Review schema
- [ ] Internal links naar andere ras-pagina's
- [ ] Alt tags op afbeeldingen (optioneel: ras-foto's)
- [ ] Mobile-friendly design
- [ ] Page speed < 2s
- [ ] Canonical URL correct ingesteld

---

## 🚀 Implementatie voor Jean-Cloud

**Stap 1:** Database/JSON met ras-data  
**Stap 2:** Template engine (Handlebars/Jinja/Blade)  
**Stap 3:** Genereer HTML per ras  
**Stap 4:** Deploy naar `/hondenverzekering-[ras-slug]`  
**Stap 5:** Submit sitemap naar Google

**Quick wins:** Start met top 10 rassen (zie data hierboven) → 10 pagina's in één dag live!
