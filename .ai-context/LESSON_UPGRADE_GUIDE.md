# 🎬 Lesson Upgrade Guide - Edutainment Revolution

> **Účel:** Detailní plán pro upgrade KAŽDÉ lekce obou kurzů na Edutainment standard
> **Priorita:** AI Basics L01 je KRITICKÁ pro onboarding!
> **Pravidlo:** Vizuální = 60% retence, Text = 20%. SVG diagramy jsou POVINNÉ.

---

## 📊 Overview obou kurzů

| Kurz | Cílová skupina | Lekcí | Status |
|------|----------------|-------|--------|
| **AI Basics** | Manažeři, nadšenci, začátečníci | 7 | 🆕 K vytvoření |
| **Practical Prompt Engineering** | Vývojáři, inženýři | 4 (existující) + 4 (nové) | 🔧 K upgradu |

---

## 🎯 KURZ 1: AI Basics (PRIORITA #1)

> **Cíl:** Demystifikace AI pro netechnické uživatele. Každá lekce musí mít "Wow" moment.

### L01: What is AI? 🎬 **HOOK LESSON - KRITICKÁ!**

> "První lekce musí uživatele OKAMŽITĚ zaháknout vysokou produkční hodnotou. Suchá přednáška = odliv studentů."

#### Strategie
- **Filmový zážitek**, ne přednáška
- **Příběh lidí** za technologií (humanizace)
- **Bold claim** hned na začátku

#### Videa (VERIFIED)

| Lang | Type | Video ID | Title | Author | Why? |
|------|------|----------|-------|--------|------|
| EN | MAIN | `IBe2o-cZncU` | Who Invented A.I.? - The Pioneers | ColdFusion | **FILMOVÝ ZÁŽITEK.** Historie jako příběh, ne suché fakty. ✅ VERIFIED |
| EN | ALT | `5sLYAQS9sWQ` | AI, ML, Deep Learning Explained | IBM Technology | Čistá terminologie, soustředné kruhy. |
| EN | ALT2 | `KZ7BnJb30Cc` | When A.I. Becomes Creative | ColdFusion | Inspirace, kreativní AI. |
| CZ | MAIN | *(TBD - hledáme)* | - | - | - |
| CZ | ALT | `QVOy61pXdSo` | AI pro Začátečníky | David Ondrej | CZ kontext, filozofie. |

#### Požadované SVG diagramy (min. 5)

| Diagram | Popis | Existuje? |
|---------|-------|-----------|
| `ai-timeline` | Od Turinga po GPT-4 | ✅ Ano |
| `ai-ml-dl-circles` | Soustředné kruhy AI > ML > DL > GenAI | ❌ NOVÝ |
| `symbolic-vs-neural` | Symbolická AI vs Neuronové sítě | ❌ NOVÝ |
| `ai-applications` | Reálné aplikace (zdravotnictví, finance, kreativa) | ❌ NOVÝ |
| `ai-hype-vs-reality` | Mediální hype vs skutečné schopnosti | ❌ NOVÝ |

#### "Bomby" z videí (extrahovat do lekce)

1. **"AI není magie, ale matematika"** - demystifikace
2. **Alan Turing příběh** - lidský element
3. **"AI Winter"** - proč to trvalo tak dlouho
4. **Deep Learning revoluce 2012** - ImageNet moment
5. **GPT moment** - "Attention is All You Need"

#### Struktura lekce

```markdown
1. HOOK (30s) - Video ColdFusion + Bold claim
2. Timeline vizualizace - Od 1950 do 2025
3. "Soustředné kruhy" - AI > ML > DL > GenAI (DIAGRAM)
4. Dva přístupy - Symbolická vs Neuronová (DIAGRAM)
5. Reálné aplikace dnes (DIAGRAM + příklady)
6. LAB: "Vyzkoušej si AI" - jednoduchá interakce s ChatGPT
7. Holocron - Klíčové pojmy, "What a time to be alive!"
```

---

### L02: How AI Learns 🧠 **VISUALIZATION LESSON**

> "Přechod od 'magie' k 'matematice' bez bolesti. 3Blue1Brown je zlatý standard."

#### Strategie
- **Vizualizace místo abstrakcí**
- MNIST příklad (rozpoznávání číslic)
- "Černá skříňka" demystifikace

#### Videa

| Lang | Type | Video ID | Title | Author | Why? |
|------|------|----------|-------|--------|------|
| EN | MAIN | `aircAruvnKk` | But what is a neural network? | 3Blue1Brown | **ZLATÝ STANDARD.** MNIST vizualizace. ✅ VERIFIED |
| EN | ALT | `Ilg3gGewQ5U` | Backpropagation, intuitively | 3Blue1Brown | Hluboký dive do učení. |
| EN | ALT2 | `N8svLoC2eNA` | AI & ML Full Course 2025 | Edureka | Akademický styl. |
| CZ | ALT | *(TBD)* | - | - | - |

#### Požadované SVG diagramy (min. 5)

| Diagram | Popis | Existuje? |
|---------|-------|-----------|
| `neural-network` | Základní neuronová síť | ✅ Ano |
| `training-loop` | Tréninkový cyklus | ✅ Ano |
| `mnist-visualization` | Rozpoznávání číslic | ❌ NOVÝ |
| `weights-biases` | Váhy a biasy vizuálně | ❌ NOVÝ |
| `loss-function` | Minimalizace chyby | ❌ NOVÝ |

#### "Bomby" z videí

1. **"Neuron je jen číslo"** - demystifikace
2. **MNIST jako "Hello World" ML**
3. **Aktivace neuronů** - vizuální příklad
4. **Gradient descent** - "sjíždění z kopce"

---

### L03: LLMs Explained 🔤

> "Pochopení, že ChatGPT 'nepřemýšlí', ale predikuje."

#### Videa

| Lang | Type | Video ID | Title | Author | Why? |
|------|------|----------|-------|--------|------|
| EN | MAIN | `wjZofJX0v4M` | But what is a GPT? (Transformers Ch.5) | 3Blue1Brown | Visual intro to Transformers. ✅ VERIFIED |
| EN | ALT | `LPZh9BOjkQs` | Large Language Models explained briefly | 3Blue1Brown | Stručnější. |
| EN | ALT2 | `eMlx5fFnoYc` | Attention mechanism visualized | 3Blue1Brown | Deep dive do attention. |

#### Požadované SVG diagramy

| Diagram | Popis | Existuje? |
|---------|-------|-----------|
| `tokenization-viz` | Tokenizace textu | ✅ Ano |
| `llm-next-token` | Next-token prediction | ✅ Ano |
| `attention-mechanism` | Self-attention vizualizace | ❌ NOVÝ |
| `context-window` | Kontextové okno | ✅ Ano |
| `transformer-architecture` | Encoder-Decoder | ❌ NOVÝ |

---

### L04: Your First Prompt ✨ **ROI LESSON**

> "Okamžitá návratnost. 'Použij to zítra v 9 ráno.'"

#### Videa

| Lang | Type | Video ID | Title | Author | Why? |
|------|------|----------|-------|--------|------|
| EN | MAIN | `p3840QxlYzc` | The CORRECT way to use ChatGPT (2025) | Jeff Su | **Korporátní produktivita.** ✅ VERIFIED |
| EN | ALT | `jC4v5AS4RIM` | Perfect ChatGPT Prompt Formula (8 min) | Jeff Su | 6-step prompt formula. ✅ VERIFIED |
| EN | ALT2 | `CBfgQDpgiMk` | Generative AI Explained 2025 | The AI Advantage | Šablony. |
| CZ | ALT | *(AI Univerzita)* | Proměňte ChatGPT v génia | AI Univerzita | CZ tipy. |

#### Požadované SVG diagramy

| Diagram | Popis | Existuje? |
|---------|-------|-----------|
| `prompt-structure` | Context + Instruction + Format | ❌ NOVÝ |
| `few-shot-learning` | Zero/One/Few shot | ✅ Ano |
| `system-prompt-flow` | System prompt flow | ✅ Ano |
| `prompt-templates` | Šablony pro různé use cases | ❌ NOVÝ |

#### LAB: "5 promptů, které změníte svůj workflow"
- Email shrnutí
- Meeting notes
- Excel formule
- Brainstorming
- Code explanation

---

### L05: The Dark Side ⚠️

> "Vážnost bez beznaděje. Informativní, ale ne depresivní."

#### Videa

| Lang | Type | Video ID | Title | Author | Why? |
|------|------|----------|-------|--------|------|
| EN | MAIN | `QGLGq8WIMzM` | The Rise of A.I. Companions | ColdFusion | Sociologická analýza. |
| EN | ALT | `eJEvFDuU6bo` | The Dark Side of AI: Deepfakes | - | Praktická rizika. |
| EN | ALT2 | `Xx4Tpsk_fnM` | 'Forbidden' AI Technique | Computerphile | Akademický pohled. |

#### Požadované SVG diagramy

| Diagram | Popis | Existuje? |
|---------|-------|-----------|
| `hallucination-types` | Typy halucinací | ❌ NOVÝ |
| `bias-sources` | Zdroje zkreslení | ❌ NOVÝ |
| `deepfake-detection` | Jak poznat deepfake | ❌ NOVÝ |
| `ai-risks-matrix` | Risk matrix | ❌ NOVÝ |

---

### L06: AI at Work 💼 **IMMEDIATE ROI**

> "Nástroj, který použijí 'zítra v 9 ráno'."

#### Videa

| Lang | Type | Video ID | Title | Author | Why? |
|------|------|----------|-------|--------|------|
| EN | MAIN | `q0vityx5I7g` | How to use AI in Excel 2025 | Jeff Su | Excel automatizace. |
| EN | ALT | `bS9R6aCVEzw` | n8n will change your life | Fireship | Low-code automatizace. |
| EN | ALT2 | `XO9l5R-UHII` | Google Sheets Got AI?! | Jeff Su | Sheets features. |

#### LAB: "Automatizuj svůj první workflow"
- Excel formule generování
- Email šablony
- Meeting notes extraction

---

### L07: The Future 🚀 **INSPIRATION FINALE**

> "Končit na vlně inspirace a 'budoucího šoku'."

#### Videa

| Lang | Type | Video ID | Title | Author | Why? |
|------|------|----------|-------|--------|------|
| EN | MAIN | `g32Candon3A` | Impossible Creatures Come Alive! | Two Minute Papers | "What a time to be alive!" |
| EN | ALT | `tOCSyRAaFHc` | Kurzweil's Prediction: Singularity | - | Dlouhodobý rámec. |
| EN | ALT2 | `iEgDGaOIvtw` | When will AI surpass humans? | - | AGI diskuse. |

---

## 🔧 KURZ 2: Practical Prompt Engineering (UPGRADE)

> **Cíl:** Posun od "chatování" k "inženýrství". Technický fokus pro vývojáře.

### L01: Prompt Architecture ✅ EXISTS - UPGRADE

#### Aktuální stav
- ✅ Existuje content.mdx + content.cs.mdx
- ⚠️ Málo diagramů
- ⚠️ Video potřebuje upgrade

#### Nová videa

| Lang | Type | Video ID | Title | Author | Why? |
|------|------|----------|-------|--------|------|
| EN | MAIN | `n6MckKY_ZCA` | How XML tags improve your AI responses | T. Huang | XML tagy pro Claude. |
| EN | ALT | `8m80I624zEs` | JSON + XML Prompting Explained | Mike Scully | Strukturované výstupy. |
| EN | ALT2 | `EWFFaKxsz_s` | You're Not Behind (Yet) | theMITmonk | AIM/MAP frameworky. |

#### Nové SVG diagramy potřeba

| Diagram | Popis |
|---------|-------|
| `xml-tag-structure` | XML tagy vizuálně |
| `prompt-layers` | Vrstvy promptu (system, user, assistant) |
| `structured-output-flow` | JSON výstup pipeline |

---

### L02: Prompt Injection & Security ✅ EXISTS - UPGRADE

#### Aktuální stav
- ✅ Existuje
- ⚠️ Chybí Gandalf lab
- ⚠️ NetworkChuck video by bylo lepší

#### Nová videa

| Lang | Type | Video ID | Title | Author | Why? |
|------|------|----------|-------|--------|------|
| EN | MAIN | `2OPVViV-GQk` | SQL Injections are scary!! (hacking tutorial) | NetworkChuck | **Dokonalá analogie SQLi → Prompt Injection.** ✅ VERIFIED |
| EN | ALT | `gandalf.lakera.ai` | Gandalf AI Security Game | Lakera | Gamifikovaný red-teaming. |

#### Nové SVG diagramy

| Diagram | Popis |
|---------|-------|
| `sql-vs-prompt-injection` | Analogie SQLi a Prompt Injection |
| `injection-attack-flow` | Útok krok za krokem |
| `defense-layers` | Obranné vrstvy |

#### 🆕 LAB: Gandalf Challenge
- Prolomit 7 levelů AI obrany
- Leaderboard
- Defense patterns jako výstup

---

### L04: Local Intelligence ✅ EXISTS - UPGRADE

#### Nová videa

| Lang | Type | Video ID | Title | Author | Why? |
|------|------|----------|-------|--------|------|
| EN | MAIN | `Wjrdr0NU4Sk` | host ALL your AI locally | NetworkChuck | **Definitivní "Hello World" pro lokální AI.** |
| EN | ALT | `W8CObaM-gjA` | Deepseek R1 0528 Full Local Review | Matthew Berman | Benchmarky. |
| CZ | MAIN | `R_iA-S2N-iE` | ChatGPT na vašem počítači | AI s rozumem | CZ tutoriál. |

#### Nové SVG diagramy

| Diagram | Popis |
|---------|-------|
| `ollama-architecture` | Ollama architektura |
| `model-comparison-2025` | Llama 4 vs Qwen 3 vs DeepSeek R1 |
| `gpu-vs-cpu-inference` | Hardware srovnání |
| `quantization-levels` | Q4 vs Q8 vs FP16 |

---

### L05: AI-Powered Development ✅ EXISTS - UPGRADE

#### Nová videa

| Lang | Type | Video ID | Title | Author | Why? |
|------|------|----------|-------|--------|------|
| EN | MAIN | `iO1mwxPNP5A` | Masterclass: AI-driven Development | Fireship | Cursor, MCP. |
| EN | ALT | `KiNyvT02HJM` | MCP Setup Tutorial | All About AI | Model Context Protocol. |

#### Nové SVG diagramy

| Diagram | Popis |
|---------|-------|
| `ide-comparison-radar` | Cursor vs Windsurf vs Cline | ✅ Existuje |
| `mcp-architecture` | MCP protokol | ✅ Existuje |
| `agentic-workflow` | Agent-driven development |

---

## 🎨 SVG DIAGRAM BACKLOG (Celkem potřeba)

### Priorita 1 (AI Basics L01 - KRITICKÉ)

| # | Diagram | Kurz | Lekce |
|---|---------|------|-------|
| 1 | `ai-ml-dl-circles` | AI Basics | L01 |
| 2 | `symbolic-vs-neural` | AI Basics | L01 |
| 3 | `ai-applications` | AI Basics | L01 |
| 4 | `ai-hype-vs-reality` | AI Basics | L01 |

### Priorita 2 (AI Basics L02-L03)

| # | Diagram | Kurz | Lekce |
|---|---------|------|-------|
| 5 | `mnist-visualization` | AI Basics | L02 |
| 6 | `weights-biases` | AI Basics | L02 |
| 7 | `loss-function` | AI Basics | L02 |
| 8 | `attention-mechanism` | AI Basics | L03 |
| 9 | `transformer-architecture` | AI Basics | L03 |

### Priorita 3 (Practical PE)

| # | Diagram | Kurz | Lekce |
|---|---------|------|-------|
| 10 | `sql-vs-prompt-injection` | Practical PE | L02 |
| 11 | `injection-attack-flow` | Practical PE | L02 |
| 12 | `defense-layers` | Practical PE | L02 |
| 13 | `model-comparison-2025` | Practical PE | L04 |

---

## ✅ VIDEO VERIFICATION CHECKLIST

Před implementací ověřit embed všech videí:

```bash
# Test embed v prohlížeči
https://www.youtube.com/embed/{VIDEO_ID}

# Pokud X-Frame-Options blokuje → najít alternativu
```

| Video ID | Status | Kurz | Poznámka |
|----------|--------|------|----------|
| `IBe2o-cZncU` | ✅ OK | AI Basics L01 | ColdFusion - Who Invented AI (Oct 2021) |
| `5sLYAQS9sWQ` | ⚠️ TBD | AI Basics L01 | IBM - AI/ML/DL Explained |
| `aircAruvnKk` | ✅ OK | AI Basics L02 | 3B1B Neural Networks (2017, classic) |
| `wjZofJX0v4M` | ✅ OK | AI Basics L03 | 3B1B Transformers/GPT Ch.5 |
| `p3840QxlYzc` | ✅ OK | AI Basics L04 | Jeff Su - CORRECT way ChatGPT 2025 |
| `jC4v5AS4RIM` | ✅ OK | AI Basics L04 | Jeff Su - 6-step Prompt Formula |
| `q0vityx5I7g` | ⚠️ TBD | AI Basics L06 | Jeff Su - AI in Excel |
| `g32Candon3A` | ⚠️ TBD | AI Basics L07 | Two Minute Papers |
| `2OPVViV-GQk` | ✅ OK | Practical L02 | NetworkChuck - SQL Injection (Oct 2022) |
| `Wjrdr0NU4Sk` | ✅ OK | Practical L04 | NetworkChuck - Local AI |
| `iO1mwxPNP5A` | ⚠️ TBD | Practical L05 | Fireship - AI Dev |

---

## 🚀 IMPLEMENTATION ORDER

### Week 1: Foundation
1. ✅ Update VISION.md, CONTENT_GUIDELINES.md
2. 🔄 Create this LESSON_UPGRADE_GUIDE.md
3. ⏳ Verify ALL video embeds
4. ⏳ Generate SVG diagrams Priorita 1 (Gemini)

### Week 2: AI Basics Course
5. ⏳ **AI Basics L01** - HOOK LESSON (kritická!)
6. ⏳ AI Basics L02-L03 (vizualizace)
7. ⏳ AI Basics L04-L07

### Week 3: Practical PE Upgrade
8. ⏳ Practical L01 - XML tags, nové diagramy
9. ⏳ Practical L02 - Gandalf lab, NetworkChuck video
10. ⏳ Practical L04 - Model comparison 2025
11. ⏳ Practical L05 - MCP deep dive

---

*Created: 2025-12-09*
*Purpose: Comprehensive upgrade plan for Edutainment Revolution*
