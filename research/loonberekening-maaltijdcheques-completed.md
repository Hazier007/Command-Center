# Loonberekening: Maaltijdcheques Feature ✅

**Datum:** 25 februari 2026  
**Uitgevoerd door:** Jean-Cloud van Damme 🥊  
**Status:** COMPLETED

## Wat is gebouwd

### 1. Backend Logic (lib/belgianTax.ts)
- `calculateMealVoucherBenefit()` - berekent het voordeel van maaltijdcheques
- `calculateNetWithMealVouchers()` - berekent netto loon inclusief maaltijdcheques
- Constanten:
  - Waarde: €8/dag
  - Werkgeversdeel: €5.91 (belastingvrij)
  - Werknemersdeel: €2.09
  - ~220 werkdagen/jaar

### 2. Nieuwe Pagina: /maaltijdcheques
- **URL:** https://loonberekening.be/maaltijdcheques
- **Features:**
  - Calculator met bruto → netto + maaltijdcheques
  - Vergelijking: zonder vs mét maaltijdcheques
  - Uitleg hoe maaltijdcheques werken
  - FAQ sectie (3 vragen)
  - Dark mode support
  - Responsive design

### 3. Checkboxes in Bestaande Calculators
Updated pages:
- ✅ `/bruto-netto` - checkbox "Inclusief maaltijdcheques"
- ✅ `/netto-bruto` - checkbox "Inclusief maaltijdcheques"

Features:
- Toon/verberg maaltijdcheques breakdown dynamisch
- Link naar /maaltijdcheques voor meer info
- Consistent gedrag in beide calculators

## Tech Details
- TypeScript strict typing
- Next.js 14 app directory
- Tailwind CSS (dark mode)
- Build succesvol (9/9 pages)
- No linting errors

## Commit
```
commit 4b31652
Add meal vouchers feature: /maaltijdcheques page + checkboxes in calculators
```

## Volgende Stappen (WACHT OP BART)
Zie roadmap voor resterende 9 taken:
1. Bediende Calculator (/bediende) - HIGH
2. Arbeider Calculator (/arbeider) - HIGH
3. Homepage Update CTAs - MEDIUM
4. Kinderen Feature - MEDIUM
5. Zelfstandige Calculator - MEDIUM
6. Loonstrook Generator - MEDIUM
7. Meta + Internal Linking + Sitemap - MEDIUM
8. Schema Markup - MEDIUM
9. Vergelijk Tool - LOW

---
**KD Target bereikt:** Maaltijdcheques = KD 15 (laagste difficulty) 🎯
