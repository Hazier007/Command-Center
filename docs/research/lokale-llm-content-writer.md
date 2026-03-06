# Lokale LLM als content writer op VPS (gratis/unlimited) — research

Context: Bart wil een **dedicated content writer** op een VPS die met een **lokale open-source LLM** lange Engelstalige SEO-artikels kan schrijven ("gratis" = geen per-token kosten; wél infra/compute).

> TL;DR (advies): start pragmatisch met **Ollama** + een **8B–14B instruct model** (quantized) voor throughput en eenvoud. Kwaliteit voor echte money-pages blijft doorgaans onder GPT/Claude, maar voor **programmatic SEO / supporting content / drafts** kan dit wél rendabel zijn. Als je later GPU hebt: stap over naar **vLLM**.

---

## Samenvatting

- **Beste ‘sweet spot’ modellen** voor lange EN content op VPS zonder GPU: **Llama 3.1 8B Instruct** (Q4/Q5) of **Qwen2.5 7B/14B Instruct** (als je betere instruct-following wil). 70B-class is meestal onrealistisch zonder zware GPU/RAM.
- **Ollama** is het makkelijkst om te draaien en biedt een **OpenAI-compatibele API** (`/v1/chat/completions`) waardoor integratie met OpenClaw vrij straight-forward is.
- **llama.cpp** is top voor CPU-only + quantization (GGUF), maar vraagt meer handwerk als server; Ollama gebruikt onder de motorkap vaak llama.cpp.
- **vLLM** is het best performant bij GPU’s (batching/throughput) en expose’t ook OpenAI-compatible endpoints, maar is zwaarder om op te zetten.
- **Kwaliteit**: lokale 8B/14B modellen zijn oké voor “first draft” en ondersteunende teksten, maar blijven achter op Claude/GPT voor **structuur, nuance, factuality en anti-hallucination**. Human edit/QA blijft nodig.

---

## 1) Beste open-source LLM’s voor lange Engelstalige SEO content

### Aanbevolen shortlist (realistisch op VPS)

| Model | Waarom goed voor SEO content | Context | Opmerkingen |
|---|---|---:|---|
| **Llama 3.1 8B Instruct** | Sterke algemene writing + coherence voor long-form; breed supported tooling | **128k** (spec) | Zeer haalbaar CPU-only met quantization; kwaliteit oké maar kan “generic” worden |
| **Qwen2.5 7B/14B Instruct** | Vaak beter in instruct-following en “format discipline” (TOC, headings, schema blocks) | afhankelijk van variant | 14B kan zware CPU/RAM zijn maar nog haalbaar met Q4 |
| **Mistral 7B Instruct (v0.x)** | Snelle, goede baseline writer | 8k/32k varianten | Iets minder long-context comfort dan Llama 3.1 8B (afhankelijk van build) |

### “Nice but meestal te zwaar” op standaard VPS

| Model | Waarom interessant | Waarom lastig op VPS |
|---|---|---|
| Llama 3.1 70B Instruct | Kwaliteitsboost t.o.v. 8B | GPU/RAM requirements hoog; CPU-only te traag |
| Mixtral 8x7B / 8x22B | Goede writing + reasoning | MoE is zwaar en complex; RAM + compute |

**Belangrijke nuance:**
- Voor SEO content wil je vooral: **structuur + consistentie + prompt adherence**. 8B/14B modellen kunnen dat, maar je moet prompts “hard” maken (outline → section-by-section → style constraints).

---

## 2) Ollama vs vLLM vs llama.cpp — wat is het makkelijkst + performant?

### Kort overzicht

| Stack | Best voor | Setup gemak | Performance | Hardware focus |
|---|---|---:|---:|---|
| **Ollama** | Snel starten, “just works”, OpenAI-compat API | ★★★★★ | ★★☆ (CPU) / ★★★ (GPU beperkt) | CPU-first, simpele deploy |
| **llama.cpp** | Max controle + CPU efficiënt + GGUF quant | ★★★☆☆ | ★★★ (CPU) | CPU, eventueel GPU offload |
| **vLLM** | High-throughput serving (OpenAI-compatible server) | ★★☆☆☆ | ★★★★★ (GPU) | GPU (A10/A100/H100/MI300 etc.) |

**Aanbevolen keuze per scenario**
- **CPU-only VPS** → **Ollama** (simpel) of **llama.cpp server** (meer controle)
- **GPU VPS** (of dedicated GPU machine) → **vLLM**

---

## 3) Minimale VPS specs per model (RAM/CPU/GPU)

### Spec van onze VPS (Hazier)
- **CPU:** 4 cores
- **RAM:** 16 GB
- **Disk:** 200 GB
- **Bandbreedte:** 16 TB
- **GPU:** (niet vermeld → ga uit van **geen GPU**)

**Conclusie voor deze box:**
- Mik op **7B–8B instruct modellen in Q4/Q5**.
- **14B kan**, maar wordt meestal te traag op 4 cores en zit krapper op RAM zodra je langere context neemt.
- Hou context per call beperkt (bv. 4k–16k) en werk **outline → section-by-section**.

### CPU-only (meest realistisch bij “gratis/unlimited”)
Ruwe richtlijnen voor GGUF/Q4 quant (orde van grootte):

| Model class | Disk (model file) | RAM “comfort” | CPU | Verwachting |
|---|---:|---:|---|---|
| 7B–8B (Q4/Q5) | ~4–6 GB | **8–16 GB** | 4–8 vCPU | haalbaar; goede throughput |
| 13B–14B (Q4) | ~8–12 GB | **16–32 GB** | 8–16 vCPU | trager, maar bruikbaar |
| 30B+ | 20GB+ | 64GB+ | 16+ vCPU | meestal te traag/duur |

### GPU (indien later)
- 8B model: kan op **8–12 GB VRAM** (afhankelijk van dtype/kv-cache/context)
- 14B: vaak **16–24 GB VRAM**
- 70B: typisch **80GB** of multi-GPU (of agressieve quant)

> Realiteit: lange context (bv. 16k–32k tokens) vreet VRAM/RAM door KV-cache. Voor “lange SEO articles” is **context management** (RAG/outline) belangrijker dan “alles in 1 prompt”.

---

## 4) Hoe koppel je een lokaal model aan OpenClaw?

### Route A (aanbevolen): OpenAI-compatible API → OpenClaw custom provider

Zowel **Ollama** als **vLLM** kunnen een OpenAI-compatibele endpoint aanbieden.

**Ollama** (default):
- API: `http://localhost:11434/v1/chat/completions` (OpenAI-compatible)

**Concept: OpenClaw config**
OpenClaw ondersteunt custom providers onder `models.providers` met een `baseUrl`.

Voorbeeld (conceptueel):
```json
{
  "models": {
    "mode": "merge",
    "providers": {
      "ollama": {
        "baseUrl": "http://127.0.0.1:11434/v1",
        "auth": "api-key",
        "apiKey": "ollama",
        "models": [
          { "id": "llama3.1:8b-instruct", "name": "Llama 3.1 8B (Ollama)" }
        ]
      }
    }
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "ollama/llama3.1:8b-instruct"
      },
      "models": {
        "ollama/llama3.1:8b-instruct": { "alias": "Local Writer (Llama 8B)" }
      }
    }
  }
}
```

**Notities**
- `apiKey` is bij Ollama meestal verplicht door client libs, maar wordt genegeerd.
- Als OpenClaw strict is over `api` type (`openai-completions` vs `openai-responses`), kies wat matcht met je endpoint.

### Route B: CLI / script wrapper
- Laat OpenClaw `exec` een lokaal script aanroepen dat:
  - prompt + parameters pakt
  - Ollama/vLLM aanroept
  - output teruggeeft

Dit is robuuster qua “guardrails” (je kan sanitizen, templates afdwingen, logging), maar minder elegant dan provider-integratie.

---

## 5) Geschatte output: artikels/uur per model

Dit hangt extreem af van:
- CPU/GPU,
- quantization,
- context length,
- temperatuur/top_p,
- hoeveel outline/iteraties.

### CPU-only grove schatting
- Llama 3.1 8B Q4 op een moderne CPU: vaak **~10–20 tokens/sec** generation (sterk afhankelijk van threads/hardware).
- Stel: 1 artikel = 1.500 woorden ≈ 2.000–2.500 tokens.
- Dan puur genereren: 2.500 tokens / (10–20 tok/s) = **2–4 minuten**.
- Met planning/outline/section prompts + retries: eerder **10–20 min/artikel**.

**Realistische throughput (CPU-only):**
- **3–6 artikels/uur** als je agressief automatiseert en weinig QA doet.
- **1–3 artikels/uur** als je strikter bent (outline → section-by-section → fact checks → internal links).

> Belangrijk: de bottleneck is vaak niet “tok/s”, maar **kwaliteit/validatie** (hallucinaties, SEO intent, structuur, on-page).

---

## 6) Kwaliteitsvergelijking: lokaal model vs Claude/GPT voor SEO

### Waar lokale modellen vaak goed genoeg zijn
- Supporting content, glossary pages, “how-to basics”, definities.
- Programmatic varianten waar de structuur primeert.
- First drafts die je later redigeert.

### Waar Claude/GPT nog duidelijk beter zijn
- Originaliteit (niet generiek), betere argumentatie, nuance.
- Fact discipline en bronvermelding (nog steeds niet perfect, maar beter).
- Consistente tone-of-voice + minder repetitie.
- Complexe SEO briefs met constraints (entity coverage, search intent subtiel, SERP mimicry).

### Praktische hybrid aanpak (aanrader)
- Lokaal model = **draft machine** (outline + sections + meta + FAQs).
- Cloud model (Claude/GPT) = **editor/QA** voor money pages (optioneel).
- Of: lokale model + strikte templates + human editor (Lisa).

---

## 7) Aanbevolen aanpak voor Hazier (stapsgewijs)

### Fase 1 — Proof of concept (1–2 dagen)
1. Installeer **Ollama** op de VPS.
2. Pull 1 model: **Llama 3.1 8B Instruct** (quant) of Qwen2.5 7B.
3. Bouw 1 “SEO article pipeline” prompt:
   - Input: keyword + intent + outline + internal link targets + constraints
   - Output: markdown met H2/H3, TL;DR, FAQ, meta title/desc.
4. Meet: kwaliteit (human score) + tijd/artikel.

### Fase 2 — Production workflow (1 week)
- Cron queue:
  - genereer outlines in batch
  - genereer per outline sections
  - post drafts naar Discord voor review
- Voeg “guardrails” toe:
  - verboden claims, verplicht bronnenblock (of “needs verification” labels)
  - anti-repetition (n-gram penalty / post-processing)

### Fase 3 — Performance upgrade
- Als CPU bottleneck:
  - hogere vCPU/RAM,
  - of GPU instance + vLLM.

---

## 8) Open vragen (om dit in productie strak te krijgen)

1) Bevestig: **geen GPU**? (en CPU type/kloksnelheid als je die hebt)
2) Welke output-lengte mikken we per artikel (800/1500/2500+ woorden)?
3) Hoeveel “human review” wil Bart/Lisa? (none / light / strict)
4) Moet dit ook programmatic internal links doen (site crawl / sitemap input)?

---

## Bronnen (indicatief)

- Ollama OpenAI-compatible endpoints (`/v1/chat/completions`): web search (Ollama docs)
- Llama 3.1 8B context 128k: web search (Meta/Llama release notes)
- llama.cpp CPU tok/s benchmarks (orde van grootte): web search (llama-bench community posts)
- vLLM OpenAI-compatible server + throughput benchmarks: web search (vLLM docs/benchmarks)
