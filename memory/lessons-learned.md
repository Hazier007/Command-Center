# Lessons Learned (Team) — 1-liners

Regels:
- 1 item = 1 regel (kort).
- Format: `YYYY-MM-DD | area | lesson | impact | fix | prevent_automatically | owner`
- Area tags: `seo`, `dev`, `ops`, `process`, `sales`, `infra`
- Elke entry eindigt met **hoe we dit automatisch voorkomen** (template/checklist/script).

---

2026-02-16 | process | Credits/billing errors worden pas gezien als jobs falen en spam genereren. | Blokkeert werk + noise. | Daily low-balance check + job pause toggle. | cron alert + preflight infra checklist. | JC
2026-02-16 | process | Contextverlies bij overdracht wanneer page_type/DoD/constraints niet expliciet zijn. | Rework + vertraging. | Verplicht handoff.md + DoD + scope lock. | templates/handoff.md + preflight-research.md. | Wout
