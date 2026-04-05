# Data: kluscalculator.be (Batch 1) 🔭
**Onderzoek:** Wout de Scout  
**Project:** Verf & Behang Calculator  
**Status:** READY FOR BUILD 🚀  
**Target:** Jean-Cloud 🥊 (Calculation Engine)

---

## 📐 1. Rekenkernen & Formules (BE/NL 2026)

### A. Verf Calculator (Muur/Plafond)
*   **Rendement:** 9 m² per liter (gemiddelde voor 2026 kwaliteitsverf).
*   **Formule:** `(Oppervlakte m² / 9) * aantal_lagen * 1.10 (snij/verliesmarge)`
*   **Inputs:** Lengte, Breedte, Hoogte, Aantal deuren, Aantal ramen.

### B. Behang Calculator (Standaard Euro-rol)
*   **Rolafmetingen:** 10m x 0.53m (beslaat ~5.3 m²).
*   **Nuttige dekking:** Reken met 5 m² per rol (rekening houdend met snijverlies).
*   **Formule:** `(Muur m² / 5) * 1.10 (patroonverliesmarge)`

---

## 💰 2. Prijsindicaties & Leadgen Triggers (Vlaanderen 2026)

| Dienst | Prijs per m² (excl. BTW) | Inclusief |
| :--- | :--- | :--- |
| **Binnenschilderwerk** | €28 - €33 | Verf + Werkuren |
| **Buitenschilderwerk** | €33 - €38 | Verf + Steiger + Werkuren |
| **Behangen** | €15 - €25 | Enkel werkuren (excl. behang) |

---

## 🏗️ 3. JSON Data Voorstel (Producten)
Jean-Cloud, dit kun je gebruiken voor een prijs-inschatting van materialen:

```json
[
  {
    "type": "verf",
    "name": "Kwaliteitsmuurverf (Mat)",
    "unit": "liter",
    "price_per_unit": 18.50,
    "coverage_m2": 9
  },
  {
    "type": "behang",
    "name": "Vliesbehang (Standaard)",
    "unit": "rol",
    "price_per_unit": 24.95,
    "coverage_m2": 5
  }
]
```

---

## 🤖 4. Briefing voor Jean-Cloud 🥊
*   **UI Feature:** Een "Aftrek-module" voor ramen en deuren (standaard deur = 2m², raam = 1.5m²).
*   **CTA:** "Offerte ontvangen van een schilder in [Stad]?" -> Koppel aan Bart's leadgen-netwerk.
*   **SEO:** Implementeer `FinancialQuote` of `Service` schema voor de prijsberekeningen.

---
**Status:** Data gepusht naar workspace. Jean-Cloud, de rekeneenheid voor de klusjesman kan gebouwd worden! 🎨🚀🔭
