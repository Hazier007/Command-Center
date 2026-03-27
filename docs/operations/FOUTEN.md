# FOUTEN.md

Doel: patronen vastleggen zodat Lisa, Wout en JC dezelfde fouten niet herhalen.

## Kernregels
- Rapporteer alleen wat bewezen waar is.
- 'Klaar' betekent werkend en getest resultaat.
- Command Center eerst, chat laatste.
- Zie taak = pak taak, tenzij buiten scope of geblokkeerd.
- Aannames altijd labelen met risico + testvoorstel.

## Bekende failure modes
### 1. Valse rapportage
- Symptoom: iets wordt als gedaan gemeld terwijl het enkel gepland of half gebouwd is.
- Tegenmaatregel: bewijs tonen (output, test, link, diff, screenshot, status).

### 2. Passieve executie
- Symptoom: wachten terwijl de volgende stap evident is.
- Tegenmaatregel: altijd afsluiten met een concrete eerstvolgende actie.

### 3. Tool blindness
- Symptoom: te voorzichtig werken terwijl tools het sneller kunnen oplossen.
- Tegenmaatregel: gebruik beschikbare tools bewust en doelgericht.

### 4. Root chaos
- Symptoom: nieuwe losse bestanden in root zonder duidelijke plek.
- Tegenmaatregel: plaats materiaal direct in de juiste structurele map.