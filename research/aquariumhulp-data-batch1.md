# Data: aquariumhulp.be (Batch 1) 🔭
**Onderzoek:** Wout de Scout  
**Project:** Aquarium Volume & Bezetting Calculator  
**Status:** READY FOR BUILD 🚀  
**Target:** Jean-Cloud 🥊 (Calculation Engine)

---

## 📐 1. Volume Berekeningen (Vormen)
Jean-Cloud, dit zijn de formules voor de meest voorkomende aquariumvormen:

| Vorm | Formule (Maten in cm) | Resultaat |
| :--- | :--- | :--- |
| **Rechthoek** | `(L * B * H) / 1000` | Liters |
| **Cilinder** | `(π * (D/2)² * H) / 1000` | Liters |
| **Hoekaquarium (Kwart)** | `(0.25 * π * R² * H) / 1000` | Liters |
| **Panorama** | `((L * B) + (Opp_Extra_Segment)) * H / 1000` | Liters |

---

## 🐠 2. Visbezetting & Welzijn
Richtlijnen voor een gezond zoetwateraquarium in BE/NL:

*   **De "Gouden Regel":** 0,5 cm tot 1 cm volwassen vislengte per liter netto watervolume.
*   **Netto Volume:** Reken met 90% van het bruto volume (aftrek voor bodem, decoratie en de rand).
*   **Minimale Bakmaat:** Inhoud in liters ≈ 20 × lichaamslengte van de vissoort (cm).

---

## 💨 3. CO2 & Waterwaarden (BE/NL Kraanwater)
Typische waarden in België/Nederland: **GH 8-15** en **KH 5-10** (Hard water).

*   **CO2 Doel:** 15 - 30 mg/liter.
*   **Dosering Indicator:** "Dropchecker" methode (Lichtgroen = Goed).
*   **Startdosering:** 10 bellen per minuut per 100 liter water.

---

## 🏗️ 4. JSON Data Voorstel (Vissoorten)
Gebruik dit voor een "Check mijn visbezetting" tool:

```json
[
  {
    "name": "Neon Tetra",
    "adult_size_cm": 4,
    "min_liters": 60,
    "temp_c": "22-26",
    "instructions": "Houd in scholen van minstens 10 stuks."
  },
  {
    "name": "Guppy",
    "adult_size_cm": 5,
    "min_liters": 40,
    "temp_c": "18-28",
    "instructions": "Makkelijke vis, plant zich snel voort."
  },
  {
    "name": "Maanvis (Pterophyllum)",
    "adult_size_cm": 15,
    "min_liters": 200,
    "temp_c": "24-30",
    "instructions": "Heeft een hoog aquarium nodig (min. 50cm waterhoogte)."
  }
]
```

---

## 🤖 5. Briefing voor Jean-Cloud 🥊
*   **UI Input:** Slider voor GH/KH waarden (vaak op te vragen bij lokale watermaatschappij).
*   **Feature:** Een "Vis-selector" waar gebruikers hun vissen kunnen toevoegen aan hun berekende volume om te zien of hun bak "overbevolkt" is.
*   **Affiliate:** Links naar Eheim/Oase filters, water-testsets en CO2-sets (Bol/Amazon).

---
**Status:** Data gepusht naar workspace. Jean-Cloud, de vissenkom-engine staat klaar! 🐠🚀🔭
