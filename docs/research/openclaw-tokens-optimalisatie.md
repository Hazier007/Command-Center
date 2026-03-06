# OpenClaw — optimaal gebruik van tokens + fix voor “API billing error”

Context: JC ziet errors zoals **“API provider returned a billing error — your API key has run out of credits / insufficient balance”**. Daarnaast willen jullie **token-kost** (en dus €) zo laag mogelijk houden.

---

## 1) Eerst: dit probleem is géén token-optimalisatie maar billing

Die melding betekent vrijwel altijd één van deze dingen:

1) **API key / account heeft 0 credits** (of zelfs negatieve balans) bij de provider (bv. OpenRouter, Anthropic, OpenAI, …)
2) **Per-key limit** bereikt (provider-side limiet op die key)
3) Jullie model/provider-keuze is restricted en de enige toegelaten provider heeft geen credits

### Actie (kort)
- Check billing dashboard van de provider en **top-up** of **switch API key**.
- Als jullie OpenRouter gebruiken: check key status via `GET /api/v1/key` in OpenRouter (dashboard geeft hetzelfde).

> Pas als billing terug OK is, heeft “tokens optimaliseren” effect.

---

## 2) Token-kost omlaag: de 80/20

### A) Werk met “staged prompts” i.p.v. één mega prompt
Voor long-form content/coding:
1) **Outline** (kort)
2) **Section-by-section** generatie
3) **Final polish** (kort)

Voordeel: je stuurt niet telkens 20k context opnieuw mee.

### B) Trim tool outputs / logs (die zijn de #1 token slurper)
- Vermijd dat grote JSON/HTML dumps telkens opnieuw in context komen.
- Laat tools **samenvatten** of schrijf outputs naar file en verwijs ernaar.

### C) Gebruik een “goedkope draft writer” + “duurdere editor”
- Lokaal/open-source model of goedkoop model voor **draft**
- Claude/GPT alleen voor **QA/polish/money pages**

### D) Hou responses kort waar het kan
- Gebruik duidelijke instructies: “antwoord in bullets”, “max 200 woorden”, “geen herhaling”.

---

## 3) OpenClaw knobs die écht helpen (config & workflow)

### 3.1 Compaction (samenvatten van oude chat) — grootste winst
- Gebruik **/compact** in lange threads.
- Zet auto-compaction agressiever als jullie veel lange sessies doen.

**Concept config (richtinggevend):**
```json
{
  "agents": {
    "defaults": {
      "compaction": {
        "mode": "safeguard",
        "reserveTokensFloor": 25000,
        "keepRecentTokens": 20000
      }
    }
  }
}
```
Effect: oude context wordt samengevat → minder tokens per call.

### 3.2 Context pruning (tool dumps uit context houden)
Als je merkt dat er veel tool-output in context blijft hangen:
- zet context pruning aan op “cache-ttl” manier, zodat na idle of na TTL tool-outputs niet opnieuw meegestuurd worden.

**Concept:**
```json
{
  "agents": {
    "defaults": {
      "contextPruning": {
        "mode": "cache-ttl",
        "ttl": "5m",
        "keepLastAssistants": 3
      }
    }
  }
}
```

### 3.3 Beperk “verbosity” + vermijd lange chain-of-thought
- Hou de agent op **bondig** (geen essay output tenzij nodig).
- Vraag expliciet om:
  - “geen uitleg, enkel stappen”
  - “max 10 bullets”

### 3.4 Reset sessies per taak
- Maak taken atomair.
- Gebruik nieuwe thread/sessie voor nieuw project.

---

## 4) Concrete checklist voor jullie (Hazier)

### Fix billing error (vandaag)
- Identificeer welke provider/key gebruikt wordt voor JC.
- Top-up of vervang key.
- Test met 1 simpele prompt.

### Token-optimalisatie (structureel)
1) Default workflow: outline → sections → polish.
2) Tool outputs: schrijf naar file, laat LLM enkel **samenvatting** zien.
3) Regel: money pages = Claude/GPT; bulk drafts = lokaal/goedkoop.
4) In lange threads: `/compact`.

---

## 5) Quick benchmark (om te zien of het werkt)

Run 3 identieke taken:
- A) 1 mega prompt met alle context
- B) outline + 5 secties (kleine prompts)
- C) outline+secties met “tool outputs to file only”

Meet:
- time-to-finish
- tokens per call / cost
- kwaliteit (human score)

---

## Bronnen (high-level)

- OpenRouter billing/402 guidance: provider docs/dashboard
- OpenClaw: compaction/context pruning (conceptuele config patterns; exacte keys moeten matchen met jullie OpenClaw versie/schema)
