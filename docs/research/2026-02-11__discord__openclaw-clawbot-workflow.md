# Deep research — Discord optimaal gebruiken met OpenClaw/Clawbot (doel: autonoom samenwerken)

Context: Bart wil dat de bots/agents (Wout/JC/Lisa) **vrij kunnen praten in Discord**, taken oppakken, status geven, en elkaar kunnen ping-pongen **zonder** dat Bart telkens moet taggen of modereren.

> **TL;DR**: maak een paar **"bot-werk" kanalen** waar `requireMention=false` en `allowBots=true` geldt, en hou publieke/ruis-kanalen op `requireMention=true`. Combineer dit met een **strakke taak-flow** (✅ ontvangst → ETA → deliverable) + **thread discipline**.

---

## 1) Probleemanalyse (waarom het stroef voelt)

**A. Mention-only policy**
- Als `requireMention=true`, dan ziet de bot je bericht wel, maar **mag hij niet antwoorden** tenzij hij een mention detecteert.

**B. Bot-messages worden vaak gefilterd**
- Veel integraties filteren bot/webhook messages standaard om loops te vermijden.
- In OpenClaw heet de relevante setting **`channels.discord.allowBots`** (equivalent van “ignoreBots:false”).

**C. Geen duidelijke “werkruimte” voor agents**
- Als alles in #algemeen gebeurt, is er te veel ruis en is mention-only logisch.
- Gevolg: je moet manueel escaleren (“je bent getagged”), wat frustratie geeft.

---

## 2) Aanbevolen Discord kanaal-architectuur (simpel, maar effectief)

### 2.1. 3 soorten kanalen

1) **Publiek / mens-kanaal** (ruis)
- Voor: losse chat
- Config: `requireMention=true`
- Voorbeeld: `#algemeen`

2) **Werk-kanalen per discipline/project**
- Voor: SEO/builds/project threads
- Config: `requireMention=false` **maar alleen als het team klein is**
- Voorbeelden: `#seo`, `#builds`, `#preppedia`, `#opblaasbareboot`

3) **Bot-to-bot / “ops” kanaal**
- Voor: agents die elkaar ping’en, check-ins, status, debug
- Config: `requireMention=false` + `allowBots=true`
- Voorbeeld: `#ops` (aanrader om nieuw te maken)

### 2.2. Thread discipline
- **Elke opdracht** = één thread (of 1 message + thread)
- Alle updates in dezelfde thread:
  - ✅ ontvangst
  - 1–2 status updates (als >2u duurt)
  - deliverable links/attachments

---

## 3) Werkwijze / proces (zodat jij niet moet babysitten)

### 3.1. “Taak-contract” (micro-protocol)
Wanneer er een taak gepost wordt in #taken of #seo:
1) Agent reageert binnen **5 min** met: `✅ Ontvangen — ETA: ... — Blockers: ...`
2) Indien blocker: expliciet vragen wat nodig is
3) Bij oplevering: `✅ Klaar` + attachments/links + korte changelog

### 3.2. Check-ins automatisch
- 2 vaste momenten (bv. 11:00 en 16:00) in `#ops`:
  - “Waar ben je mee bezig / ETA / blockers”
- Dit kan later via OpenClaw cron jobs, maar je krijgt al 80% winst door het ritueel.

---

## 4) OpenClaw config best practices (Discord)

### 4.1. Vereisten in Discord Developer Portal
- **Message Content Intent**: **aan**
- (optioneel) **Server Members Intent**: aan als je user allowlists wil beheren

### 4.2. Aanbevolen policy (hybride)
- `#algemeen`: mention required
- Werkkanalen: mention **niet** required
- Bot-to-bot: bots toegelaten

**Voorbeeld (conceptueel):**
```json
{
  "channels": {
    "discord": {
      "groupPolicy": "allowlist",
      "allowBots": true,
      "guilds": {
        "1470813583427239938": {
          "requireMention": true,
          "channels": {
            "algemeen": { "allow": true, "requireMention": true },

            "seo": { "allow": true, "requireMention": false },
            "builds": { "allow": true, "requireMention": false },
            "taken": { "allow": true, "requireMention": false },

            "preppedia": { "allow": true, "requireMention": false },
            "opblaasbareboot": { "allow": true, "requireMention": false }

            // aanrader: "ops": { "allow": true, "requireMention": false }
          }
        }
      }
    }
  }
}
```

> Let op: `allowBots:true` is krachtig. Gebruik het vooral in werk/ops kanalen, zodat je geen bot-loop krijgt in #algemeen.

### 4.3. Guardrails tegen bot-loops
- Hou **1–2 kanalen** waar bots “vrij praten” (bv. #ops, #builds), niet overal.
- Spreek af dat agents geen “ping-pong” doen op elke status message.
- Als er webhooks zijn die elke deploy loggen: filter op keywords of gebruik threads.

---

## 5) Concrete aanbeveling voor jullie setup (Hazier)

### Nu meteen (max 10 min)
1) Maak kanaal **#ops** (of hergebruik #builds als ops)
2) Zet:
   - `#algemeen` → `requireMention=true`
   - `#seo/#builds/#taken/#preppedia/#opblaasbareboot` → `requireMention=false`
   - `allowBots=true` op guild-level
3) Spreek het micro-protocol af: **✅ ontvangst + ETA** altijd.

### Volgende stap (later)
- Cron check-in posten in #ops (2x/dag)
- “Definition of Done” templates per type taak (SEO report / build / data)

---

## Bronnen / notes
- OpenClaw Discord config concepten: `requireMention`, `allowBots`, `groupPolicy` (allowlist).
- Discord Developer Portal: Message Content Intent vereist om message body te lezen.

