# Portfolio-update voorstel — Command Center

Datum: 2026-06-13
Scope: LocalLead / Hazier / Calqo / CollectPro / Infinite Events assets in `C:\Users\Bart\Projects\Command-Center`
Doel: geen app-code wijzigen; wel concrete data/proposal voor portfolio-update.

## 1. Executive summary

De huidige Command Center-data is verdeeld over:

- `ops/assets/sites.md` — compacte assetlijst, laatst handmatig bijgewerkt 2026-03-27 + boomontwortelen update 2026-06-13.
- `src/lib/business-dashboards.ts` — cockpit-kaarten voor LocalLead, Hazier, Calqo en Infinite Events, maar hardcoded en deels op hoofdlijnen.
- `src/lib/seedData.ts` en `prisma/seed.ts` — oude seeded portfolio-data; bruikbaar als inventaris, niet als actuele waarheid.
- `research/` en `content/` — recente SEO-/content-output voor Rank & Rent assets.

Belangrijkste portfolio-conclusie: LocalLead heeft nu meerdere live Rank & Rent-assets, maar de recurring omzetstatus, leadflow-bewijs en partnerstatus ontbreken nog als gestructureerde velden in het Command Center. Voor omzet richting €10k/mnd is de veiligste update niet “meer sites bouwen”, maar portfolio normaliseren rond deze kolommen: live-status, indexatie, leadflow, partner, volgende actie, MRR-potentieel.

## 2. Bewijs uit repo en live-check

### Repo-bronnen

- `C:\Users\Bart\Projects\Command-Center\ops\assets\sites.md`
  - Bevat o.a. Poxy.be, Hazier, CollectPro, Infinite Events en boomontwortelen-sites.
  - Gaps expliciet vermeld: owner per site, traffic/revenue, tech stack, next action, priority tier.
- `C:\Users\Bart\Projects\Command-Center\src\lib\business-dashboards.ts`
  - LocalLead cockpit meldt: target €10k MRR, current “€0 MRR zichtbaar in cockpit”, 9+ leadgen assets, partners 0 actief, blockers Resend/Twilio/data verdeeld.
  - Hazier cockpit is cashflowbasis, maar klant/facturatie-pipeline nog te structureren.
  - Calqo cockpit is inventarisfase voor tools/calculators.
  - Infinite Events cockpit is watch mode.
- `C:\Users\Bart\Projects\Command-Center\research\poxy\indexatiestrategie-1080-locatiepaginas-LOC84.md`
  - Poxy: 1.080 locatiepagina’s, maar slechts 5-7 geïndexeerd; fase-1 met 56 money pages aanbevolen.
- `C:\Users\Bart\Projects\Command-Center\research\seo-audit-gevelwerkengent-LOC8-2026-06-13.md`
  - GevelwerkenGent: live, technisch crawlbaar, 39 sitemap URLs, maar site: 0 resultaten en leadbackend niet bewezen.
- `C:\Users\Bart\Projects\Command-Center\research\2026-06-08-seo-audit-rank-rent-portfolio.md`
  - Daklekkages, AlsaceRenovation, Poxy, GevelwerkenGent geprioriteerd op verhuurwaarde.
- `C:\Users\Bart\Projects\Command-Center\research\seo-audit-extra-domeinen-LOC1.md`
  - Funderingsproblemen live/sterk, Vogeloverlast parking/redirect, TenerifeRenovations DNS-probleem volgens oude audit.
- `C:\Users\Bart\Projects\Command-Center\docs\operations\locallead-gdpr-baseline.md`
  - GDPR/positionering voor Poxy, Daklekkages, funderingsproblemen, gevelwerkengent, locallead.info.

### Live HTTP-check uitgevoerd

Commando samenvatting:

```bash
for d in poxy.be daklekkages.be funderingsproblemen.be gevelwerkengent.be boomontwortelengent.be boomontwortelenleuven.be boomontwortelenantwerpen.be boomontwortelenbrugge.be alsacerenovation.fr renovationstenerife.com hazier.be hazier.eu collectpro.be infinite-events.be calqo.be; do
  curl -L -s -o /dev/null -w '%{http_code} %{url_effective}' --max-time 12 "https://$d"
done
```

Resultaat samengevat:

| Asset | Live-check 2026-06-13 | Opmerking |
|---|---:|---|
| poxy.be | 200 | Live |
| daklekkages.be | 200 | Live |
| funderingsproblemen.be | 200 | Live |
| gevelwerkengent.be | 200 | Live |
| boomontwortelengent.be | 200 | Live |
| boomontwortelenleuven.be | 200 | Live via www |
| boomontwortelenantwerpen.be | 200 | Live via www |
| boomontwortelenbrugge.be | 200 | Live via www |
| alsacerenovation.fr | 404 | Domein/site niet bruikbaar als live asset zonder fix |
| renovationstenerife.com | 200 | Live via www |
| hazier.be | 200 | Live |
| hazier.eu | 301 daarna curl timeout/fail op :8443 | Check nodig; redirect/config lijkt verdacht |
| collectpro.be | 200 | Live |
| infinite-events.be | 200 | Live |
| calqo.be | curl_failed / 000 | Geen live asset bevestigd |

## 3. Voorgestelde portfolio-dataset

Deze tabel kan later veilig naar DB/API of app-state vertaald worden. Nu bewust als voorstel, geen codewijziging.

| Business | Asset | Type | Status voorstel | Omzetmodel | Huidige bewijsstatus | Belangrijkste blocker | Veilige volgende actie | Prioriteit |
|---|---|---|---|---|---|---|---|---|
| LocalLead | poxy.be | Rank & Rent / leadgen | live, SEO-probleem | vaste huur of lead fee | live 200; repo meldt 1.080 locatiepagina’s; GSC gekoppeld volgens memory; formulier via Resend naar info@hazier.be | slechts 5-7 pagina’s geïndexeerd; doorway/thin-content risico; partner 0 actief | fase-1 money pages + noindex overige locaties; testlead bewijzen; partnerprofiel epoxy/gietvloer definiëren | P1 |
| LocalLead | funderingsproblemen.be | Rank & Rent / high-ticket leadgen | live, sterk asset | vaste huur premium of qualified lead fee | live 200; audit: goed gestructureerd, leadform, 27+ regio’s, high-ticket | partnernetwerk/lead-routing niet bewezen in Command Center; claims/trust moeten juridisch voorzichtig blijven | leadflow end-to-end testen; top-10 funderingsspecialisten shortlist intern voorbereiden | P1 |
| LocalLead | daklekkages.be | Rank & Rent / spoed leadgen | live, indexatie-blocker | vaste huur per regio of call/lead fee | live 200; audit: 20+ pagina’s, blogs, regionale intent | oude audit: slechts 1 Google-pagina gevonden; spoedlead vraagt callrouting; Twilio KBO nog blocker | robots/sitemap/GSC coverage check; formulier/callpad testen; pas daarna partnergesprekken | P1 |
| LocalLead | gevelwerkengent.be | Rank & Rent lokaal | live, nog niet geïndexeerd | vaste huur Gent/regio | live 200; audit 2026-06-13: Googlebot OK, sitemap 39 URLs | site: 0 resultaten; leadbackend niet bewezen; copy bevat mogelijk “eigen ploegen” claims | copy compliance fix + leadbackend test + GSC URL-inspectie/sitemap | P2 |
| LocalLead | boomontwortelengent.be | Rank & Rent lokaal | live, niet lead-ready | vaste huur per stad | live 200; `ops/assets/sites.md` bevat Vercel ID | geen indexatie, geen form backend, geen partner | één shared leadform/backend voor boomontwortelen-cluster; dan indexatie per stad | P2 |
| LocalLead | boomontwortelenleuven.be | Rank & Rent lokaal | live, niet lead-ready | vaste huur per stad | live 200 via www; Vercel ID in `ops/assets/sites.md` | geen indexatie, geen form backend, geen partner | cluster-aanpak met Gent/Antwerpen/Brugge | P2 |
| LocalLead | boomontwortelenantwerpen.be | Rank & Rent lokaal | live, niet lead-ready | vaste huur per stad | live 200 via www; Vercel ID in `ops/assets/sites.md` | geen indexatie, geen form backend, geen partner | cluster-aanpak met shared schema/leadflow | P2 |
| LocalLead | boomontwortelenbrugge.be | Rank & Rent lokaal | live, niet lead-ready | vaste huur per stad | live 200 via www; Vercel ID in `ops/assets/sites.md` | geen indexatie, geen form backend, geen partner | cluster-aanpak met shared schema/leadflow | P2 |
| LocalLead | renovationstenerife.com | Rank & Rent / renovatie buitenland | live | huur/leadgen voor renovatiepartners | live 200; research content-briefs bestaan | status/leadflow/partnerfit niet zichtbaar in ops dataset | afzonderlijke audit: taal, regio, formulier, partnerprofiel | P3 |
| LocalLead | alsacerenovation.fr | Rank & Rent / renovatie FR | niet live bruikbaar | huur/leadgen | live-check 404; oude audit zegt niet live/404 | technische setup ontbreekt of route 404 | pas prioriteit geven na DNS/site fix; anders niet in actieve portfolio tonen | P3 / blocked |
| LocalLead | vogeloverlast.be | Rank & Rent kans | onbekend / parking volgens oude audit | leadgen | alleen oude audit in repo: redirect/lander, geen echte content | niet live geverifieerd in deze run; geen lead capture | aparte live check + buildbeslissing; niet boven Poxy/Dak/Fundering zetten | P3 |
| LocalLead | zolderramen.be | geplande leadgen | planned | leadgen/rank-rent | seedData + research-map aanwezig | geen live-status in deze run | bewaren als backlog, niet sprintfocus | Backlog |
| LocalLead | vloerverwarmingoffertes.be | geplande leadgen | planned | leadgen | seedData + research-map aanwezig | geen live-status in deze run | backlog tot P1 leadflows bewezen zijn | Backlog |
| LocalLead | timmerwerkvlaanderen.be | geplande Rank & Rent | planned | rank-rent | seedData + research-map aanwezig | geen live-status in deze run | backlog | Backlog |
| LocalLead | schuifzeilen.be | geplande Rank & Rent | planned | rank-rent | seedData noemt niche met weinig concurrentie | geen live-status in deze run | backlog | Backlog |
| LocalLead | sleu.tel | geplande Rank & Rent | planned | rank-rent slotenmaker | seedData noemt hoge CPC emergency niche | geen live-status in deze run | backlog; pas na calltracking readiness | Backlog |
| Hazier | hazier.be | bedrijfssite | live | agency / cashflowbasis | live 200; `ops/assets/sites.md` live | klantpipeline/facturatie niet als portfolio-data zichtbaar | Hazier-pipeline apart structureren, niet mengen met R&R MRR | Core |
| Hazier | hazier.eu | brand extension | redirect/config check | agency / brand | `ops/assets/sites.md` live, maar curl eindigt op :8443 fail | redirect/SSL/poortconfig verdacht | technische check zonder deploy: DNS/redirect/hosting controleren | P2 |
| Hazier | luwaert.be | klantsite | live volgens ops | klantomzet | `ops/assets/sites.md` vermeldt €/client context in seedData | niet live gecheckt in deze run | opnemen in Hazier-klantportfolio met contractstatus | Core |
| CollectPro | collectpro.be | business | live | B2B incasso | live 200; `ops/assets/sites.md` active context | hoort niet in LocalLead R&R MRR | aparte businesskaart behouden | Watch/Core |
| Infinite Events | infinite-events.be | event/org asset | live | event/organisatie | live 200; cockpit staat op watch mode | budget/deadlines niet gekoppeld | alleen kritieke deadlines/budgetpunten toevoegen | Watch |
| Infinite Events | elektrik.ink | event/brand | actief volgens ops/seed | event/brand | `ops/assets/sites.md` active event | niet live gecheckt in deze run | bij Infinite Events groeperen, low-noise | Watch |
| Calqo | btw-calculator.be | tool/calculator | live volgens seed | AdSense/tool | seedData/prisma seed: live | Calqo niet volledig geïnventariseerd | top-3 tools kiezen op traffic/intent | Calqo P1 |
| Calqo | datumberekenen.be | tool/calculator | live volgens seed | AdSense/tool | seedData/prisma seed: live | geen actuele metrics in repo | Calqo inventory + GSC/GA4 later | Calqo P1 |
| Calqo | kmvergoeding.be | tool/calculator | live volgens seed | AdSense/tool | seedData/prisma seed: live; docs/seo longtails | geen actuele metrics in repo | opnemen in Calqo dataset | Calqo P1 |
| Calqo | huurrendementcalculator.be | tool/calculator | live volgens seed | AdSense/finance | seedData/prisma seed: live; roadmap noemt AdSense | geen actuele metrics in repo | koppelen als vastgoedbrug naar LocalLead | Calqo P1 |
| Calqo | ibanvalidator.be | tool/calculator | live volgens seed | AdSense/tool | seedData/prisma seed: live | geen actuele metrics in repo | opnemen in Calqo dataset | Calqo P2 |
| Calqo | kleurcodes.be | tool/calculator | live volgens seed | AdSense/tool | seedData/prisma seed: live; docs/seo longtails | geen actuele metrics in repo | opnemen in Calqo dataset | Calqo P2 |
| Calqo | goedkoopstroom.be | tool/vergelijker | live volgens seed | affiliate/leadgen | seedData/prisma seed: live | geen actuele metrics in repo | apart monetisatiepad affiliate | Calqo P2 |
| Calqo | zwangerschapscalculator.be | tool/calculator | live volgens ops/seed | AdSense/tool | `ops/assets/sites.md` live/pending AdSense | AdSense/status onduidelijk | status actualiseren na metrics check | Calqo P2 |
| Calqo | loonberekening.be | planned finance tool | planned | AdSense/affiliate | seedData: hoge ROI potentieel | niet live-status in deze run | niet boven LocalLead P1 zetten tenzij Bart kiest | Backlog |
| Calqo | interesten.be / spaarinteresten.be | planned finance suite | planned | AdSense/affiliate | seedData/roadmap | niet live-status in deze run | backlog | Backlog |

## 4. Concrete Command Center update-aanpak

### A. Nieuwe velden voor portfolio-assets

Voorstel voor velden in portfolio/site-data:

```json
{
  "business": "locallead|hazier|calqo|collectpro|infinite-events",
  "domain": "poxy.be",
  "assetType": "rank-rent|leadgen|tool|agency|client|event|business",
  "status": "live|planned|blocked|watch|archive",
  "priority": "P1|P2|P3|Backlog|Watch|Core",
  "monetization": "fixed-rent|lead-fee|call-fee|adsense|affiliate|agency|event|none",
  "mrrCurrent": null,
  "mrrPotentialRange": "€300-€800",
  "leadflowStatus": "proven|unproven|missing|not-needed",
  "indexationStatus": "healthy|limited|zero|unknown",
  "partnerStatus": "none|shortlist|talking|signed|not-needed",
  "nextSafeAction": "...",
  "evidencePaths": ["research/...", "ops/assets/sites.md"],
  "lastVerifiedAt": "2026-06-13"
}
```

### B. Eerst te tonen in LocalLead cockpit

1. P1 assets: Poxy.be, funderingsproblemen.be, daklekkages.be.
2. P2 assets: gevelwerkengent.be + boomontwortelen cluster.
3. P3/backlog: renovationstenerife.com, alsacerenovation.fr, vogeloverlast.be, zolderramen, vloerverwarming, timmerwerk, schuifzeilen, sleu.tel.

Waarom: dit maximaliseert kans op recurring omzet zonder te veel nieuwe bouwtaken. P1 heeft live assets en commercieel sterke intent; P2 heeft technische/leadflow blokkades; P3/backlog mag niet afleiden tot P1 lead-ready is.

## 5. Blockers

- Database/API-inventaris kon niet live uit Prisma gehaald worden: lokale `.env` / `DATABASE_URL` ontbreekt in deze checkout. Prisma-query gaf: `Environment variable not found: DATABASE_URL`.
- Git working tree had al bestaande wijzigingen/untracked files vóór deze taak. Ik heb geen app-code gewijzigd; alleen dit voorstelbestand toegevoegd.
- Live-check bewijst HTTP-status, niet formulierwerking, indexatie of omzet.
- Geen credentials bekeken of getoond.
- Geen deploy/publicatie gedaan.
- Geen partner/client outreach gedaan.

## 6. Veilige volgende stap

Laat Jean-Cloud of Hermes dit voorstel omzetten naar één datafile of migratie, maar pas na Bart’s akkoord over het datamodel. Praktisch veiligste stap:

1. Maak `docs/operations/portfolio-assets.schema.json` of `data/portfolio-assets.json` met bovenstaande velden.
2. Vul alleen P1/P2 LocalLead assets eerst in.
3. Toon in de app per asset: status, leadflow, indexatie, partner, next action, evidence path.
4. Pas daarna app-code/API aanpassen en lokaal verifiëren — geen deploy zonder Bart’s expliciete toestemming.

## 7. Aanbevolen sprintprioriteit voor omzet

1. Poxy.be: indexatie saneren + testlead bewijzen.
2. Daklekkages.be: GSC/robots/sitemap/indexatie + spoedlead routing.
3. Funderingsproblemen.be: leadflow bewijs + partner shortlist.
4. GevelwerkenGent.be: copy compliance + leadbackend test + GSC inspectie.
5. Boomontwortelen cluster: shared leadbackend en indexatiebasis.
