# Pre-flight — Build (JC) ✅

**Rule:** geen pre-flight = geen review.

## Basics
- [ ] Build/deploy instructions aanwezig (kort)
- [ ] Env vars gedocumenteerd (zonder secrets)
- [ ] Smoke test uitgevoerd

## SEO / pages
- [ ] Canonical/index/noindex regels kloppen
- [ ] Sitemap/robots (indien van toepassing) correct
- [ ] Schema aanwezig waar relevant (FAQPage/Service/etc.)
- [ ] Internal links volgens spec

## Performance
- [ ] Mobiel getest (layout shift/CLS ok)
- [ ] Images optimized (sizes/lazy)

## Tracking / logs
- [ ] Events: `click_to_call` / `form_submit` / belangrijke CTA’s
- [ ] Error logging zichtbaar (form errors, API errors)

## Output & export
- [ ] Export schema snake_case + vaste volgorde
- [ ] `status` veld aanwezig (NEW|REVIEWED|EXPORTED)

## Scope lock
- [ ] “Niet in scope” gerespecteerd (geen creep)

## DoD
- [ ] Acceptance criteria (DoD) gehaald (link naar `ops/DoD.md`)
