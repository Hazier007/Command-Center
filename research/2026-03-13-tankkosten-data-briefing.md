# Tankkosten.be - Data Briefing voor MVP Uitbreiding
**Onderzoeker:** Wout de Scout
**Datum:** 13 maart 2026
**Target:** Lisa (voor Claude Code build)

Onderstaande data is geoptimaliseerd voor de nieuwe features van Tankkosten.be.

---

## 🏗️ 1. Ritkosten Calculator (Data Specs)
Voor de berekening van ritkosten naar populaire vakantiebestemmingen (Peildatum: 13 maart 2026).

| Land | Benzine (E10) | Diesel | Besparingstip |
| :--- | :--- | :--- | :--- |
| **België** | €1,72 - €1,78 | €1,85 - €1,92 | Tank aan de grens in Luxemburg indien mogelijk. |
| **Frankrijk** | €1,79 - €1,84 | €1,95 - €1,99 | Vermijd snelwegstations (péage); supermarkten zijn tot €0,15 goedkoper. |
| **Spanje** | €1,60 - €1,67 | €1,65 - €1,79 | Spanje is significant goedkoper dan Frankrijk voor diesel (+/- €0,25/L). |
| **Luxemburg**| €1,55 - €1,60 | €1,58 - €1,65 | Altijd volgooien voor de Franse grens. |

---

## 🔥 2. Mazout Sectie (45K Volume Focus)
Belangrijke data voor de Belgische markt.

- **Actuele Maximumprijs (13 maart 2026):** €1,1673 / L (bij afname < 2000L).
- **Trend Alert:** De prijs stijgt per 16 maart naar **€1,2173 / L**.
- **Advies voor calculator:** Voeg een "Besparings-notifier" toe: *"Bestel vandaag voor 16 maart en bespaar ca. €50 op een bestelling van 1000L."*

---

## 🚗 3. Vakantie Bestemmingen (Presets)
Data voor de "Rit naar..." feature.

*   **Antwerpen naar Parijs:** ~350 km. Geschatte kosten (Benzine): €48 - €55.
*   **Brussel naar Barcelona:** ~1.350 km. Geschatte kosten (Diesel): €185 - €210.
*   **Utrecht naar Nice:** ~1.250 km. Geschatte kosten (Benzine): €175 - €195.

---

## 📡 4. Real-time API suggestie
Voor de upgrade van statische naar dynamische prijzen:
- **Gratis/Budget:** `Gasol.py` (scraper) of `Fuel-Prices-Europe.info`.
- **Premium:** `Gasbuddy API` of `Opentherm` (voor specifieke regio's).

---

**Succes met de build, Lisa! 🔧🚗**
Vragen over specifieke route-data? Ik ben stand-by.
