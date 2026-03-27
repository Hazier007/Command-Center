# Content Template: Hondenverzekering [STAD]

**Voor:** Programmatic SEO - Stad-specifieke pagina's  
**URL Structuur:** `/hondenverzekering-[stad-slug]`  
**Voorbeeld:** `/hondenverzekering-brussel`

---

## 🔧 Variabelen (Data Layer)

```json
{
  "stad_naam": "Brussel",
  "stad_slug": "brussel",
  "provincie": "Brussels Hoofdstedelijk Gewest",
  "postcode_range": "1000-1299",
  "inwoners": 1218255,
  "geschat_aantal_honden": 85000,
  "dierenartsen": [
    {
      "naam": "Dierenkliniek Brussel Centrum",
      "adres": "Wetstraat 123, 1000 Brussel",
      "telefoon": "02 123 45 67"
    },
    {
      "naam": "Veterinair Centrum Elsene",
      "adres": "Louizalaan 456, 1050 Elsene",
      "telefoon": "02 234 56 78"
    }
  ],
  "nabije_steden": ["Antwerpen", "Gent", "Leuven", "Mechelen"]
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
    <title>Hondenverzekering {{stad_naam}}: Vergelijk Beste Deals vanaf €21/mnd (2026)</title>
    <meta name="description" content="Hondenverzekering in {{stad_naam}} vergelijken. ✓ Figo ✓ SantéVet ✓ Belfius Direct. Vanaf €160/jaar. Sluit direct online af. Gratis prijsvergelijking!">
    
    <!-- Open Graph -->
    <meta property="og:title" content="Hondenverzekering {{stad_naam}} - Beste Aanbieders 2026">
    <meta property="og:description" content="Vergelijk hondenverzekeringen in {{stad_naam}}. Vanaf €21/maand.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://[jouw-domain].be/hondenverzekering-{{stad_slug}}">
    
    <!-- Local Business Schema -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Hoeveel kost een hondenverzekering in {{stad_naam}}?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "In {{stad_naam}} kost een hondenverzekering gemiddeld €20 tot €50 per maand, afhankelijk van ras, leeftijd en dekking. Belfius Direct is het goedkoopst (€160/jaar), Figo biedt de meeste dekking (90%)."
          }
        },
        {
          "@type": "Question",
          "name": "Welke hondenverzekeraars zijn beschikbaar in {{stad_naam}}?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "In {{stad_naam}} kun je terecht bij Figo, SantéVet, Belfius Direct, OHRA, Petsecure en Univé. Alle aanbieders dekken heel België, inclusief {{provincie}}."
          }
        },
        {
          "@type": "Question",
          "name": "Accepteren dierenartsen in {{stad_naam}} verzekeringen?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ja, de meeste dierenartsen in {{stad_naam}} accepteren alle grote hondenverzekeraars. Je betaalt eerst zelf en declareert daarna via app of formulier."
          }
        }
      ]
    }
    </script>
</head>
<body>

<!-- HEADER -->
<header>
    <h1>Hondenverzekering in {{stad_naam}}: Vergelijk Beste Aanbieders (2026)</h1>
    <p class="lead">Vind de beste hondenverzekering in {{stad_naam}} vanaf €21/maand. Vergelijk Figo, SantéVet, Belfius Direct en meer.</p>
</header>

<!-- BREADCRUMBS -->
<nav aria-label="breadcrumb">
    <ol class="breadcrumb">
        <li><a href="/">Home</a></li>
        <li><a href="/hondenverzekering">Hondenverzekering</a></li>
        <li><a href="/steden">Steden</a></li>
        <li class="active">{{stad_naam}}</li>
    </ol>
</nav>

<!-- MAIN CONTENT -->
<main>
    
    <!-- SECTION 1: Intro -->
    <section id="intro">
        <h2>Hondenverzekering Afsluiten in {{stad_naam}}</h2>
        <p>
            Ben je op zoek naar een betrouwbare hondenverzekering in <strong>{{stad_naam}}</strong>? 
            Met naar schatting <strong>{{geschat_aantal_honden}} honden</strong> in {{stad_naam}} en omgeving is een 
            goede verzekering essentieel om jezelf te beschermen tegen hoge dierenartskosten.
        </p>
        <p>
            Een operatie voor kruisbandletsel of heupdysplasie kan al snel €2.000 tot €4.000 kosten. 
            Met een hondenverzekering krijg je <strong>tot 90% terugbetaald</strong> en betaal je gemiddeld 
            slechts <strong>€21 tot €50 per maand</strong>.
        </p>
        
        <!-- CTA Button -->
        <a href="#vergelijk" class="btn btn-primary">Direct Vergelijken →</a>
    </section>

    <!-- SECTION 2: Prijstabel Stad-Specifiek -->
    <section id="prijzen">
        <h2>Prijzen Hondenverzekering {{stad_naam}} (2026)</h2>
        <p>Indicatieve prijzen voor een 1-jarige Labrador Retriever in {{stad_naam}} (postcode {{postcode_range}}):</p>
        
        <table class="table table-comparison">
            <thead>
                <tr>
                    <th>Aanbieder</th>
                    <th>Prijs/Maand</th>
                    <th>Prijs/Jaar</th>
                    <th>Max. Vergoeding</th>
                    <th>Vergoeding %</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Belfius Direct</strong></td>
                    <td>€21</td>
                    <td>€254</td>
                    <td>80% per geval</td>
                    <td>80%</td>
                    <td><a href="[affiliate-link]" class="btn-small">Bekijk →</a></td>
                </tr>
                <tr class="highlight">
                    <td><strong>Figo</strong> <span class="badge">Aanrader</span></td>
                    <td>€45</td>
                    <td>€540</td>
                    <td>€3.000+/jaar</td>
                    <td>90%</td>
                    <td><a href="[affiliate-link]" class="btn-small">Bekijk →</a></td>
                </tr>
                <tr>
                    <td><strong>SantéVet</strong></td>
                    <td>€40</td>
                    <td>€480</td>
                    <td>€2.500/jaar</td>
                    <td>80%</td>
                    <td><a href="[affiliate-link]" class="btn-small">Bekijk →</a></td>
                </tr>
                <tr>
                    <td><strong>OHRA</strong></td>
                    <td>€24</td>
                    <td>€288</td>
                    <td>€2.000/jaar</td>
                    <td>80%</td>
                    <td><a href="[affiliate-link]" class="btn-small">Bekijk →</a></td>
                </tr>
                <tr>
                    <td><strong>Petsecure</strong></td>
                    <td>€32</td>
                    <td>€384</td>
                    <td>€3.250/jaar</td>
                    <td>50-90%</td>
                    <td><a href="[affiliate-link]" class="btn-small">Bekijk →</a></td>
                </tr>
            </tbody>
        </table>
        
        <p class="note">
            💡 <strong>Let op:</strong> Premies variëren per ras en leeftijd. Gebruik onze <a href="#calculator">calculator</a> 
            om de exacte prijs voor jouw hond in {{stad_naam}} te berekenen.
        </p>
    </section>

    <!-- SECTION 3: Top 3 Aanbieders (zelfde als ras-template) -->
    <section id="beste">
        <h2>Top 3 Hondenverzekeringen in {{stad_naam}}</h2>
        
        <!-- #1 Figo -->
        <div class="provider-card">
            <h3>🥇 1. Figo – Beste Allround voor {{stad_naam}}</h3>
            <ul>
                <li>✅ <strong>90% vergoeding</strong> van dierenartskosten</li>
                <li>✅ Geen leeftijdsgrens bij afsluiten</li>
                <li>✅ Wereldwijde dekking (handig voor reizen vanuit {{stad_naam}})</li>
                <li>✅ Preventiebudget €50-100/jaar</li>
                <li>✅ Claim via app binnen 48 uur</li>
            </ul>
            <p><strong>Prijs:</strong> €30-€70/mnd | <strong>Ideaal voor:</strong> Uitgebreide dekking, alle leeftijden</p>
            <a href="[affiliate-link-figo]" class="btn btn-primary">Bekijk Figo →</a>
        </div>
        
        <!-- #2 Belfius Direct -->
        <div class="provider-card">
            <h3>🥈 2. Belfius Direct – Goedkoopste voor {{stad_naam}}</h3>
            <ul>
                <li>✅ Vanaf <strong>€160/jaar</strong> (€13/mnd)</li>
                <li>✅ Tot 80-100% vergoeding (afhankelijk van formule)</li>
                <li>✅ Dekking diefstal & overlijden</li>
                <li>✅ Belgische verzekeraar (lokale service)</li>
                <li>⚠️ Franchise €150 per geval</li>
            </ul>
            <p><strong>Prijs:</strong> €160-€350/jaar | <strong>Ideaal voor:</strong> Budget-bewust, basisdekking</p>
            <a href="[affiliate-link-belfius]" class="btn btn-secondary">Bekijk Belfius →</a>
        </div>
        
        <!-- #3 SantéVet -->
        <div class="provider-card">
            <h3>🥉 3. SantéVet – Beste Service in {{stad_naam}}</h3>
            <ul>
                <li>✅ Dekking binnen- en buitenland</li>
                <li>✅ App-based claims (snel terugbetaald)</li>
                <li>✅ 24/7 dierenartsadvies (handig in {{stad_naam}})</li>
                <li>✅ Preventiebudget €50-100/jaar</li>
            </ul>
            <p><strong>Prijs:</strong> €30-€50/mnd | <strong>Ideaal voor:</strong> Veel reizen, snelle service</p>
            <a href="[affiliate-link-santevet]" class="btn btn-secondary">Bekijk SantéVet →</a>
        </div>
    </section>

    <!-- SECTION 4: Lokale Dierenartsen (🔥 LOKALE SEO BOOST) -->
    <section id="dierenartsen">
        <h2>Dierenartsen in {{stad_naam}} die Verzekeringen Accepteren</h2>
        <p>
            Bijna alle dierenartsen in {{stad_naam}} accepteren hondenverzekeringen. 
            Je betaalt eerst de rekening en declareert daarna bij je verzekeraar via app of online formulier.
        </p>
        
        <h3>Populaire Dierenklineken in {{stad_naam}}:</h3>
        <ul class="vet-list">
            {{#each dierenartsen}}
            <li>
                <strong>{{naam}}</strong>  
                <br>📍 {{adres}}  
                <br>📞 {{telefoon}}  
                <br><small>Accepteert: Alle grote verzekeraars (Figo, SantéVet, Belfius, OHRA, etc.)</small>
            </li>
            {{/each}}
        </ul>
        
        <p class="note">
            💡 <strong>Tip:</strong> Vraag bij je dierenarts of ze directe facturatie aanbieden. 
            Sommige klinieken regelen de declaratie rechtstreeks met de verzekeraar.
        </p>
    </section>

    <!-- SECTION 5: Waarom Verzekeren in [Stad] -->
    <section id="waarom">
        <h2>Waarom een Hondenverzekering in {{stad_naam}}?</h2>
        
        <div class="reason-card">
            <h3>💰 Hoge Dierenartskosten</h3>
            <p>
                In stedelijke gebieden zoals {{stad_naam}} liggen de dierenartskosten vaak hoger dan op het platteland. 
                Een spoedbezoek kan al snel €150-€300 kosten, operaties €1.000+.
            </p>
        </div>
        
        <div class="reason-card">
            <h3>🚗 Risico op Ongevallen</h3>
            <p>
                {{stad_naam}} is een drukke stad met veel verkeer. Honden kunnen makkelijker betrokken raken bij 
                ongevallen (auto's, fietsen) of verwondingen oplopen in parken. Een verzekering dekt deze kosten.
            </p>
        </div>
        
        <div class="reason-card">
            <h3>🏥 Toegang tot Specialisten</h3>
            <p>
                {{stad_naam}} heeft uitstekende veterinaire specialisten en klinieken. Een verzekering geeft je 
                financiële ruimte om voor de beste zorg te kiezen zonder zorgen over kosten.
            </p>
        </div>
        
        <div class="reason-card">
            <h3>😌 Gemoedsrust</h3>
            <p>
                Voor €21-€50 per maand heb je de zekerheid dat onverwachte kosten (tot €3.000+/jaar) 
                grotendeels gedekt zijn. Ideaal voor hondenbezitters in {{stad_naam}}.
            </p>
        </div>
    </section>

    <!-- SECTION 6: FAQ (Stad-Specifiek) -->
    <section id="faq">
        <h2>Veelgestelde Vragen over Hondenverzekering in {{stad_naam}}</h2>
        
        <div class="faq-item">
            <h3>Hoeveel kost een hondenverzekering in {{stad_naam}}?</h3>
            <p>
                Gemiddeld tussen <strong>€20 en €50 per maand</strong>, afhankelijk van ras, leeftijd en dekking. 
                Belfius Direct is het goedkoopst (€160/jaar), Figo biedt de meeste dekking (90%, €3.000+/jaar).
            </p>
        </div>
        
        <div class="faq-item">
            <h3>Welke hondenverzekeraars zijn beschikbaar in {{stad_naam}}?</h3>
            <p>
                Alle grote aanbieders dekken heel België, inclusief {{stad_naam}}: <strong>Figo, SantéVet, Belfius Direct, OHRA, Petsecure, Univé</strong>. 
                Je kunt online afsluiten, ongeacht je locatie in {{provincie}}.
            </p>
        </div>
        
        <div class="faq-item">
            <h3>Accepteren dierenartsen in {{stad_naam}} alle verzekeringen?</h3>
            <p>
                Ja, vrijwel alle dierenartsen in {{stad_naam}} accepteren de grote verzekeraars. 
                Je betaalt eerst zelf en declareert daarna via app (SantéVet, Figo) of online formulier.
            </p>
        </div>
        
        <div class="faq-item">
            <h3>Zijn er postcodegebonden prijsverschillen in {{stad_naam}}?</h3>
            <p>
                Minimaal. De meeste verzekeraars hanteren landelijke tarieven. Alleen leeftijd en ras beïnvloeden de premie, 
                niet je postcode binnen {{postcode_range}}.
            </p>
        </div>
        
        <div class="faq-item">
            <h3>Kan ik mijn verzekering ook gebruiken buiten {{stad_naam}}?</h3>
            <p>
                Ja! Alle verzekeringen gelden België-breed. <strong>Figo en SantéVet</strong> dekken ook wereldwijd 
                (handig als je met je hond op reis gaat vanuit {{stad_naam}}).
            </p>
        </div>
        
        <div class="faq-item">
            <h3>Hoe sluit ik een hondenverzekering af in {{stad_naam}}?</h3>
            <p>
                100% online! Vul ras, leeftijd en postcode in op de website van de aanbieder (of via onze vergelijkingstool), 
                kies je pakket en sluit direct af. Dekking start na de wachttijd (15-30 dagen).
            </p>
        </div>
    </section>

    <!-- SECTION 7: CTA Calculator -->
    <section id="vergelijk" class="cta-section">
        <h2>Bereken je Premie in {{stad_naam}}</h2>
        <p>Krijg binnen 30 seconden een persoonlijk overzicht van prijzen voor jouw hond in {{stad_naam}}.</p>
        
        <!-- Calculator Form -->
        <form class="calculator">
            <label>Ras van je hond:</label>
            <select name="ras">
                <option>Labrador Retriever</option>
                <option>Golden Retriever</option>
                <option>Duitse Herder</option>
                <option>Franse Bulldog</option>
                <option>Chihuahua</option>
                <option>Jack Russell Terrier</option>
                <option>Anders...</option>
            </select>
            
            <label>Leeftijd:</label>
            <select name="leeftijd">
                <option>Pup (0-1 jaar)</option>
                <option selected>Jong (1-3 jaar)</option>
                <option>Volwassen (3-7 jaar)</option>
                <option>Ouder (7+ jaar)</option>
            </select>
            
            <label>Postcode in {{stad_naam}}:</label>
            <input type="text" name="postcode" placeholder="{{postcode_range}}" value="{{postcode_range}}">
            
            <button type="submit" class="btn btn-primary btn-large">Bereken Mijn Premie →</button>
        </form>
        
        <p class="small">Gratis & vrijblijvend. Geen persoonlijke gegevens vereist. Resultaat direct zichtbaar.</p>
    </section>

    <!-- SECTION 8: Lokale Links (Internal Linking) -->
    <section id="lokaal">
        <h2>Hondenverzekering in Andere Steden</h2>
        <p>Zoek je informatie voor een andere stad in {{provincie}} of België?</p>
        
        <ul class="city-links">
            {{#each nabije_steden}}
            <li><a href="/hondenverzekering-{{this | lowercase}}">Hondenverzekering {{this}}</a></li>
            {{/each}}
        </ul>
        
        <p><a href="/steden">Bekijk alle steden →</a></p>
    </section>

    <!-- SECTION 9: Ras Links (Cross-Linking) -->
    <section id="rassen">
        <h2>Populaire Rassen in {{stad_naam}}</h2>
        <p>Bekijk specifieke informatie per hondenras:</p>
        
        <ul class="breed-links">
            <li><a href="/hondenverzekering-labrador-retriever">Hondenverzekering Labrador Retriever</a></li>
            <li><a href="/hondenverzekering-golden-retriever">Hondenverzekering Golden Retriever</a></li>
            <li><a href="/hondenverzekering-franse-bulldog">Hondenverzekering Franse Bulldog</a></li>
            <li><a href="/hondenverzekering-chihuahua">Hondenverzekering Chihuahua</a></li>
            <li><a href="/hondenverzekering">Alle rassen →</a></li>
        </ul>
    </section>

</main>

<!-- FOOTER -->
<footer>
    <p>
        Laatst geüpdatet: {{current_date}} | Bronnen: Figo, SantéVet, Belfius Direct, OHRA  
        <br>Hondenverzekering {{stad_naam}} | {{provincie}} | België
    </p>
</footer>

</body>
</html>
```

---

## 📊 Stad-Specifieke Data (Starter Set - Top 10 Belgische Steden)

```json
[
  {
    "stad_naam": "Brussel",
    "stad_slug": "brussel",
    "provincie": "Brussels Hoofdstedelijk Gewest",
    "postcode_range": "1000-1299",
    "inwoners": 1218255,
    "geschat_aantal_honden": 85000,
    "nabije_steden": ["Antwerpen", "Gent", "Leuven", "Mechelen"]
  },
  {
    "stad_naam": "Antwerpen",
    "stad_slug": "antwerpen",
    "provincie": "Antwerpen",
    "postcode_range": "2000-2660",
    "inwoners": 529247,
    "geschat_aantal_honden": 37000,
    "nabije_steden": ["Brussel", "Mechelen", "Gent", "Lier"]
  },
  {
    "stad_naam": "Gent",
    "stad_slug": "gent",
    "provincie": "Oost-Vlaanderen",
    "postcode_range": "9000-9052",
    "inwoners": 262219,
    "geschat_aantal_honden": 18000,
    "nabije_steden": ["Brussel", "Antwerpen", "Brugge", "Aalst"]
  },
  {
    "stad_naam": "Charleroi",
    "stad_slug": "charleroi",
    "provincie": "Henegouwen",
    "postcode_range": "6000-6061",
    "inwoners": 201816,
    "geschat_aantal_honden": 14000,
    "nabije_steden": ["Brussel", "Namen", "Bergen", "Luik"]
  },
  {
    "stad_naam": "Luik",
    "stad_slug": "luik",
    "provincie": "Luik",
    "postcode_range": "4000-4032",
    "inwoners": 195576,
    "geschat_aantal_honden": 13500,
    "nabije_steden": ["Brussel", "Namen", "Hasselt", "Verviers"]
  },
  {
    "stad_naam": "Brugge",
    "stad_slug": "brugge",
    "provincie": "West-Vlaanderen",
    "postcode_range": "8000-8380",
    "inwoners": 118509,
    "geschat_aantal_honden": 8300,
    "nabije_steden": ["Gent", "Oostende", "Kortrijk", "Roeselare"]
  },
  {
    "stad_naam": "Namen",
    "stad_slug": "namen",
    "provincie": "Namen",
    "postcode_range": "5000-5100",
    "inwoners": 111207,
    "geschat_aantal_honden": 7800,
    "nabije_steden": ["Brussel", "Charleroi", "Luik", "Dinant"]
  },
  {
    "stad_naam": "Leuven",
    "stad_slug": "leuven",
    "provincie": "Vlaams-Brabant",
    "postcode_range": "3000-3054",
    "inwoners": 101032,
    "geschat_aantal_honden": 7000,
    "nabije_steden": ["Brussel", "Mechelen", "Aarschot", "Tienen"]
  },
  {
    "stad_naam": "Mechelen",
    "stad_slug": "mechelen",
    "provincie": "Antwerpen",
    "postcode_range": "2800-2812",
    "inwoners": 86921,
    "geschat_aantal_honden": 6000,
    "nabije_steden": ["Brussel", "Antwerpen", "Leuven", "Lier"]
  },
  {
    "stad_naam": "Aalst",
    "stad_slug": "aalst",
    "provincie": "Oost-Vlaanderen",
    "postcode_range": "9300-9340",
    "inwoners": 87730,
    "geschat_aantal_honden": 6100,
    "nabije_steden": ["Brussel", "Gent", "Dendermonde", "Ninove"]
  },
  {
    "stad_naam": "Hasselt",
    "stad_slug": "hasselt",
    "provincie": "Limburg",
    "postcode_range": "3500-3545",
    "inwoners": 77651,
    "geschat_aantal_honden": 5400,
    "nabije_steden": ["Genk", "Sint-Truiden", "Tongeren", "Luik"]
  },
  {
    "stad_naam": "Kortrijk",
    "stad_slug": "kortrijk",
    "provincie": "West-Vlaanderen",
    "postcode_range": "8500-8560",
    "inwoners": 76265,
    "geschat_aantal_honden": 5300,
    "nabije_steden": ["Gent", "Brugge", "Roeselare", "Ieper"]
  }
]
```

---

## 🎯 SEO Checklist per Stad-Pagina

- [ ] Title tag: "[Stad] + hondenverzekering + jaar"
- [ ] Meta description: lokale angle + prijzen + CTA
- [ ] H1: Stad prominent
- [ ] H2-H3: Stad herhalen waar natuurlijk (niet over-optimaliseren)
- [ ] Schema: FAQPage + optioneel LocalBusiness (voor dierenartsen)
- [ ] Internal links naar:
  - Andere stad-pagina's (nabije steden)
  - Ras-pagina's
  - Hoofdpagina
- [ ] Canonical URL correct
- [ ] Mobile-friendly (stedelingen zoeken vaak op mobiel!)

---

## 🚀 Implementatie Strategie

### Stap 1: Database Setup
```sql
CREATE TABLE steden (
  id INT PRIMARY KEY,
  stad_naam VARCHAR(100),
  stad_slug VARCHAR(100),
  provincie VARCHAR(100),
  postcode_range VARCHAR(20),
  inwoners INT,
  geschat_aantal_honden INT
);

-- Insert top 12 steden (zie JSON hierboven)
```

### Stap 2: Template Engine
- **Handlebars/Mustache:** Voor simpele variabele vervanging
- **Jinja2 (Python):** Voor complexere logica
- **Blade (Laravel):** Als je PHP gebruikt
- **React/Next.js:** Voor dynamische rendering

### Stap 3: Genereer HTML
```bash
# Voorbeeld script (Node.js + Handlebars)
node generate-city-pages.js --cities=all
# Output: /public/hondenverzekering-brussel.html (etc.)
```

### Stap 4: Deploy & Sitemap
```xml
<!-- sitemap-steden.xml -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://[jouw-domain].be/hondenverzekering-brussel</loc>
    <lastmod>2026-02-23</lastmod>
    <priority>0.8</priority>
  </url>
  <!-- Herhaal voor alle 12 steden -->
</urlset>
```

### Stap 5: Google Search Console
- Submit sitemap
- Monitor indexering
- Check voor duplicate content warnings (moet geen issues zijn als content uniek genoeg is)

---

## 🔥 Pro Tips voor Programmatic SEO

### 1. **Unieke Content per Pagina**
- Varieer de intro (gebruik inwonersaantallen, provincie-specifieke info)
- Voeg lokale dierenartsen toe (uniek per stad!)
- Gebruik nabije_steden voor interne linking (uniek per stad)

### 2. **Avoid Thin Content**
- Minimaal 800-1000 woorden per pagina
- Voeg FAQ toe (uniek per stad, bijv. "postcode-specifieke prijzen")
- Eventueel lokale hondenparken/wandelroutes toevoegen (extra waarde)

### 3. **Schema Markup**
- FAQPage schema op elke pagina
- Optioneel: LocalBusiness schema voor dierenartsen
- BreadcrumbList voor navigatie

### 4. **Internal Linking Structuur**
```
Hoofdpagina (/)
  ├── /hondenverzekering (hub)
  │   ├── /hondenverzekering-labrador-retriever (ras)
  │   ├── /hondenverzekering-golden-retriever (ras)
  │   └── ...
  └── /steden (hub)
      ├── /hondenverzekering-brussel (stad)
      ├── /hondenverzekering-antwerpen (stad)
      └── ...
```

### 5. **Monitoring**
- Track rankings per stad-keyword in Google Search Console
- Monitor CTR per stad-pagina
- A/B test verschillende CTA's

---

## ✅ Quick Start Checklist voor Jean-Cloud

**Week 1:**
- [ ] Database/JSON met 12 steden opzetten
- [ ] Template engine kiezen & opzetten
- [ ] Genereer eerste 3 stad-pagina's (Brussel, Antwerpen, Gent)
- [ ] Deploy + submit sitemap
- [ ] Test indexering (search: `site:jouw-domain.be hondenverzekering brussel`)

**Week 2:**
- [ ] Genereer resterende 9 steden
- [ ] Voeg lokale dierenartsen toe (Google Maps scrape of manual)
- [ ] Internal linking tussen stad-pagina's implementeren
- [ ] Schema markup toevoegen

**Week 3+:**
- [ ] Expand naar 50+ steden (alle Belgische steden >20k inwoners)
- [ ] Monitor rankings & traffic in GSC
- [ ] Optimize based on data

---

**Klaar voor launch?** 🚀 Geef het door aan Jean-Cloud en laat me weten als je aanpassingen wilt!
