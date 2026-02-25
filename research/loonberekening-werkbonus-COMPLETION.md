# Werkbonus Calculator - Task Completion Report

**Taak ID:** cmm0iytsj0000l104pshwifa8  
**Datum:** 25 februari 2026, 00:31  
**Status:** ⚠️ GEBOUWD - CIJFERS VERIFICATIE NODIG

## Wat is gebouwd

✅ Werkbonus calculator pagina `/werkbonus`
- Side-by-side vergelijking met/zonder werkbonus
- Visual highlighting van voordeel (groen)
- Automatische berekening verschil netto
- Uitleg sectie over werking werkbonus
- Responsive design, dark mode support

✅ Calculatie logica in `lib/belgianTax.ts`
- `calculateWerkbonus()` functie
- `calculateNetWithWerkbonus()` voor volledige berekening
- Lineaire afbouw tussen schijven

✅ Build test: **SLAAGT**
- Next.js build succesvol
- Pagina size: 2.98 kB (optimaal)
- First Load JS: 98.9 kB

## ⚠️ Cijfer discrepantie gedetecteerd

**Huidige implementatie:**
```typescript
// Max bonus: €660/month
// Reference salary: €1,842.18
// Upper limit: €2,750
```

**Wout's research (loonberekening-werkbonus-belgie-2026.md):**
- Bedienden: max **€277,83/mnd** (bovengrens €2.961,27)
- Arbeiders: max **€300,06/mnd** (bovengrens €3.198,17)
- GGMMI referentie: **€1.945,38**
- Fiscale werkbonus: +33,14% = totaal €369,88

## Vraag voor Bart

De €660 in de huidige code vs €277,83 in Wout's research:
- Is €660 een totaalbedrag (sociale + fiscale werkbonus)?
- Of moeten we de cijfers updaten naar de nieuwste 2025-2026 bedragen?
- Moet ik onderscheid maken tussen bedienden/arbeiders?

## Next Steps

1. **Bart's input** over welke cijfers correct zijn
2. **Indien update nodig:** 
   - Pas `calculateWerkbonus()` aan naar nieuwe formule
   - Voeg arbeider/bediende onderscheid toe indien nodig
   - Update teksten op /werkbonus pagina
   - Test en re-deploy
3. **Content aanvulling:**
   - Wout's research artikel als `/blog/werkbonus-belgie-2026`
   - Internal link naar calculator

## Files

- `/app/werkbonus/page.tsx` — Calculator UI
- `/lib/belgianTax.ts` — Calculatie logica
- Research: `loonberekening-werkbonus-belgie-2026.md`

---

**JC 🥊**
