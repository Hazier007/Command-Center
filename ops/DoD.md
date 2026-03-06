# Definition of Done (DoD) — Hazier Team

Doel: minder heen-en-weer, minder interpretatie. Als een deliverable “done” is, voldoet het aan de checklist hieronder.

---

## 1) Loodgieter Spoed City Page Template (programmatic)
**Done als:**
- [ ] H1/H2-structuur staat vast (hero → form → diensten → werkwijze → dekking → FAQ → trust/CTA).
- [ ] CTA’s boven de fold: primary (form) + secondary (tel: link).
- [ ] FAQ blok aanwezig (min. 8–10 vragen) + **FAQPage schema**.
- [ ] Local relevance signal: “{city} en omgeving” + `nearby_areas` (kan generiek).
- [ ] Performance: mobiel ok (geen layout shift in hero; images lazy).
- [ ] Analytics events: `click_to_call` + `form_submit`.
- [ ] Copy bevat disclaimer: “we matchen met partner in jouw regio”.

---

## 2) Lead Form + Pre-Qualify Scoring + Export (Sheets-first)
**Done als:**
- [ ] Form heeft v1 velden: `problem_type`, `urgency`, `postcode`, `phone`, `description` (minimaal).
- [ ] Validatie: telefoon vereist + duplicate check (zelfde phone+postcode binnen X uur).
- [ ] Scoring rule-based (0–10) met labels: HOT ≥7, WARM 5–6, COLD ≤4.
- [ ] Forwarding: lead gaat naar partner email (of fallback mailbox) + log naar Sheet.
- [ ] Export kolommen snake_case + vaste volgorde + `status` (NEW|REVIEWED|EXPORTED).
- [ ] Default: **no-send** buiten partner email; geen automations naar meerdere partners zonder expliciet config.

---

## 3) Pack JSON (config-driven)
**Done als:**
- [ ] JSON valide (schema / JSON parse).
- [ ] `rules`: `minProofTokensRequired`, `proofNoteRequired`, `noSendDefault` aanwezig.
- [ ] `proofTokens[]` enums matchen met code (IDs exact).
- [ ] `sequences[]` bevat timingDays + subjects + steps (cold/FU1/FU2/breakup).
- [ ] `exportColumns[]` matcht de Sheet export.

---

## 4) Deploy / Release
**Done als:**
- [ ] `README` of korte notes: hoe runnen + env vars.
- [ ] Smoke test: 1 city page load + 1 form submit → partner email + Sheet row.
- [ ] Error logging: form errors + sheet/email failure zichtbaar.

---

## 5) Research Deliverable (Wout → JC)
**Done als:**
- [ ] Handoff volgens `templates/handoff.md`.
- [ ] City list + slug pattern.
- [ ] Keyword map per stad (min. 5 varianten).
- [ ] Content model JSON velden (per stad) + defaults.
- [ ] Edge cases / exclusions opgesomd.
