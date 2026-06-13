# Command Center — LocalLead Agent Instructions

Dit project is de centrale operationele bron voor Bart's LocalLead / Rank & Rent operatie.

## Source of truth

Gebruik `C:\Users\Bart\Projects\Command-Center` als centrale opslagplaats voor LocalLead-werk.

Paperclip workdirs onder `C:\Users\Bart\.paperclip\instances\...` zijn tijdelijke uitvoer-/sandboxlocaties. Belangrijke output mag daar niet blijven hangen.

## Waar bewaar je wat?

- Research, audits, concurrentieanalyse, keywordonderzoek: `research/`
- Operationele procedures, governance, GDPR, setupnotities: `docs/operations/`
- Teamrollen en agentinstructies: `team/`
- Agent-specifieke werkinstructies: `team/agents/<agent>/AGENTS.md`
- Herbruikbare snippets/templates: `team/snippets/`
- Logs van Hermes-wrapper runs: `logs/hermes-runs/`
- Site/content-output voor specifieke domeinen: duidelijke submap per domein, bv. `content/poxy.be/` of `content/funderingsproblemen.be/`

## Bestandsnamen

Gebruik duidelijke, stabiele bestandsnamen:

```text
YYYY-MM-DD-onderwerp-domein.md
onderwerp-LOCxx.md
```

Voor Paperclip issue-output mag de LOC-code in de naam blijven, bv.:

```text
seo-monitoring-dashboard-LOC28.md
citatie-backlink-plan-poxy-LOC74.md
```

## Regel voor Paperclip agents

Als een Paperclip-agent research, planning, code, templates of rapporten maakt, moet de eindoutput ook naar de relevante Command Center-map worden gekopieerd of daar rechtstreeks worden aangemaakt.

Rapporteer altijd het definitieve pad, bijvoorbeeld:

```text
C:\Users\Bart\Projects\Command-Center\research\seo-monitoring-dashboard-LOC28.md
```

## Wat niet opslaan

- Geen API keys, tokens, wachtwoorden of secrets.
- Geen ruwe privégegevens van leads tenzij strikt nodig en toegestaan.
- Geen tijdelijke tool-output dumps zonder samenvatting of doel.
- Geen dubbele kopieën zonder duidelijke reden.

## Externe acties

Geen externe outreach, klantcontact, betalingen, productie-deploys of irreversible changes zonder expliciete toestemming van Bart.

## Taal

Communiceer met Bart standaard in Nederlands/Vlaams, concreet en operationeel.
