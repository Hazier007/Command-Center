# Data: airfryertijden.be (Batch 1) 🔭
**Onderzoek:** Wout de Scout  
**Project:** Airfryer Baktijd Calculator  
**Status:** READY FOR BUILD 🚀  
**Target:** Jean-Cloud 🥊 (JSON Engine)

---

## 📂 1. JSON Data Structure Voorstel
Jean-Cloud, ik stel voor om de data als volgt te structureren voor je "Micro-Tool" engine. Zo kun je makkelijk filteren op categorie en status (vers/bevroren).

```json
[
  {
    "product": "Friet (Dun/Standaard)",
    "category": "aardappel",
    "status": "diepvries",
    "temp_c": 180,
    "time_min": "12-15",
    "instructions": "Halverwege schudden voor beste resultaat."
  },
  {
    "product": "Vlaamse Friet (Dik)",
    "category": "aardappel",
    "status": "diepvries",
    "temp_c": 190,
    "time_min": "14-18",
    "instructions": "Mandje niet overbeladen, vaker schudden."
  },
  {
    "product": "Verse Friet (Rauw)",
    "category": "aardappel",
    "status": "vers",
    "temp_c": 180,
    "time_min": "20-26",
    "instructions": "Minimaal 30 min weken in water, goed afdrogen en 1 el olie toevoegen."
  },
  {
    "product": "Frikandel",
    "category": "snacks",
    "status": "diepvries",
    "temp_c": 200,
    "time_min": "6-8",
    "instructions": "Direct vanuit de vriezer bereiden."
  },
  {
    "product": "Bitterballen (Oven/Airfryer)",
    "category": "snacks",
    "status": "diepvries",
    "temp_c": 200,
    "time_min": "8-10",
    "instructions": "In één laag leggen voor maximale krokantheid."
  },
  {
    "product": "Kroket (Oven/Airfryer)",
    "category": "snacks",
    "status": "diepvries",
    "temp_c": 180,
    "time_min": "8-12",
    "instructions": "Zorg voor voldoende tussenruimte."
  },
  {
    "product": "Kipfilet",
    "category": "vlees",
    "status": "vers",
    "temp_c": 180,
    "time_min": "15-18",
    "instructions": "Insmeren met olie en kruiden. Halverwege omdraaien."
  },
  {
    "product": "Kippenvleugels / Wings",
    "category": "vlees",
    "status": "vers",
    "temp_c": 180,
    "time_min": "18-22",
    "instructions": "Goed schudden voor gelijkmatige garing."
  },
  {
    "product": "Zalmfilet",
    "category": "vis",
    "status": "vers",
    "temp_c": 180,
    "time_min": "8-12",
    "instructions": "Op de huidzijde leggen indien mogelijk."
  },
  {
    "product": "Broccoli (Roosjes)",
    "category": "groenten",
    "status": "vers",
    "temp_c": 180,
    "time_min": "8-12",
    "instructions": "Licht besprenkelen met olie en een snufje zout."
  }
]
```

---

## 🏗️ 2. Conversie & Affiliate Triggers
*   **Tool Tip:** "Gebruik je een Airfryer XL of XXL? Trek er 1-2 minuten van af."
*   **Affiliate Hook 1:** "Niet meer raden? Gebruik een digitale kernthermometer [Link naar Amazon/Bol]."
*   **Affiliate Hook 2:** "Geen vieze bak meer? Gebruik deze herbruikbare siliconen bakjes [Link naar Amazon/Bol]."

---

## 🤖 3. Briefing voor Jean-Cloud 🥊
*   **Search Bar:** Maak een fuzzy search (bijv. "friet" vindt ook "Vlaamse Friet").
*   **Categories:** Quick filters op Aardappel, Snacks, Vlees, Vis, Groenten.
*   **Timer Component:** Een knop "Start Timer" (browser alert) bij de resultaten is een mooie extra feature.

---
**Status:** Eerste data-batch gepusht. Jean-Cloud, de JSON engine kan gevoed worden! 🚀🔭
