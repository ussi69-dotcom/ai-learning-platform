# CONTENT FOUNDATION: AI Learning Platform
## Syntéza Perplexity + Gemini Research (Prosinec 2025)

**Datum:** 6. prosince 2025
**Zdroje:** Perplexity (90+ sources) + Gemini 3 Pro Synthesis
**Účel:** Konkrétní obsahové podklady pro 11 lekcí

---

## 📊 VALIDOVANÉ TRENDY (PROSINEC 2025)

### MODELY - BENCHMARKY

| Model | SWE-bench | Best For | VRAM (Q4) |
|-------|-----------|----------|-----------|
| Claude Opus 4.5 | 80.9% | Architecture, edge cases | Cloud |
| GPT-5.1 Codex | 77.9% | Lean code, 400K context | Cloud |
| Gemini 3 Pro | 76.2% | Fast, tool use | Cloud |
| Qwen 3-Coder-480B | ~75% | Best open-source coding | 40GB+ |

### LOKÁLNÍ MODELY (Dec 2025)

| Kategorie | Model | VRAM (Q4_K_M) | Use Case |
|-----------|-------|---------------|----------|
| **Tiny** | Gemma 3 2B / Qwen 2.5 1.5B | < 2 GB | Rychlá klasifikace, CPU |
| **Standard** | **Llama 4 8B** / Mistral v0.4 | **~ 6 GB** | **Main driver** |
| **Mid** | Qwen 3 14B / Gemma 3 12B | ~ 10 GB | Lepší reasoning |
| **Large** | Llama 4 70B / Qwen 3 72B | ~ 40 GB | Production grade |
| **Reasoning** | DeepSeek-R1 (Distill) | ~ 12 GB | Math, complex logic |

### LEGACY K ODSTRANĚNÍ
- Llama 2 (všechny verze) - Obsolete
- Llama 3 (původní) - Nahrazeno 3.2 a 4
- Mistral 7B v0.1 - Nahrazeno v0.3/v0.4
- Gemini 2.0 - Nahrazeno Gemini 3

---

## 🔧 MCP (Model Context Protocol) - PRODUCTION READY

### Must-Know Servery (Dec 2025):
1. **GitHub MCP Server** - Copilot integration (Nov 29, 2025)
2. **Microsoft 365 MCP Server** - Teams integration (Dec 4, 2025)
3. **Claude Desktop MCP** - Official Anthropic
4. **YouTube MCP Server** - Real-time data (Nov 2025)

### Security Best Practices:
- OAuth scoped tokens (nikdy full permissions)
- Container sandboxing (izolace serverů)
- Audit logging (track all calls)
- Principle of least privilege

---

## 🛡️ AGENT FRAMEWORKY (Ranked Dec 2025)

1. **LangGraph** - #1 trending, structured, production-ready
2. **CrewAI** - #2, role-based, beginner-friendly
3. **AutoGen** - #3, dynamic multi-agent
4. **OpenAI Agents SDK** - emerging, newest

**Verdict:** Start CrewAI → Graduate to LangGraph for production

---

## 💻 AI IDEs COMPARISON

| IDE | Coding | Agent | Price | Best For |
|-----|--------|-------|-------|----------|
| Cursor | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | $20 | Daily coding |
| Windsurf | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | $10 | Agent tasks |
| Claude Code | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | $20 | Refactoring |
| Antigravity | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | FREE | Prototyping |

---

## 📚 CONTENT BLOCKS (11 LEKCÍ)

### Lekce 01: Prompt Architecture Masterclass
**Core Concepts:**
- System Prompt as OS (definice constraints, output format)
- Meta-Prompting (model píše lepší prompt pro sebe)
- Context Window (Token limit vs "Needle in a Haystack")

**Lab:** "Reverse Engineering" - Student dostane výstup a musí napsat System Prompt

**Tools:** Claude 4.5, Gemini 3 Pro
**Success:** Strukturovaný prompt projde unit testem na formátování

---

### Lekce 02: Advanced Reasoning & Red Teaming
**Core Concepts:**
- Reasoning Frameworks (CoT vs ToT)
- Defense in Depth (Sandwich, Delimiters, XML tagging)
- Jailbreak Mindset (Roleplay, Base64, Translation attacks)

**Lab:** "Blue Team vs Red Team" - Zabezpečit prompt, pak obejít vlastní zabezpečení

**5 Technik Obrany (2025 Standard):**
1. **Sandwich Defense** - Instrukce mezi dvěma system prompty
2. **Spotlighting/Delimiters** - XML tagy pro oddělení dat
3. **Parametric Instructions** - Separate channels
4. **In-Context Refusal** - Few-shot learning odmítnutí
5. **Output Filtering** - Druhý model jako judge

**Red Teaming Cvičení:**
- DAN (Do Anything Now) attack
- Payload Splitting (Base64)
- Context Overflow

**Tools:** OpenAI Playground, Lakera Guard
**Success:** Identifikace 3 zranitelností a oprava

---

### Lekce 03: Reliability, Testing & Cost
**Core Concepts:**
- Deterministic AI (Temperature 0 != determinismus, Seed params)
- Prompt Caching (90% úspora nákladů)
- Eval Driven Development (Exact Match, Levenshtein, LLM-as-Judge)

**Lab:** "Promptfoo Pipeline" - Setup, matrix test (3 modely x 5 promptů)

**Tools:** Promptfoo, Helicone
**Success:** CI/CD pipeline selže když se zhorší kvalita promptu

---

### Lekce 04: Local Intelligence
**Core Concepts:**
- Quantization Math (FP16 vs Q8 vs Q4_K_M)
- VRAM Calculation (7B = ~5GB, 70B = ~40GB)
- Inference Engines (Ollama vs vLLM vs Llama.cpp)

**Lab:** "Offline Chatbot" - Llama 4 8B přes Ollama + Python skript

**Tools:** Ollama, LM Studio, Llama 4, Qwen 3
**Success:** API call na localhost:11434 vrací odpověď do 2 sekund

---

### Lekce 05: Structured Data Extraction
**Core Concepts:**
- Schema Validation (Pydantic jako kontrakt)
- JSON Mode vs Function Calling
- Error Recovery (Retry parsers)

**Lab:** "Receipt Scanner" - OCR text → extrakce do striktního JSONu

**Tools:** Instructor (Python), Ollama JSON mode
**Success:** 5 "rozbitých" vstupů → validní Pydantic objekty

---

### Lekce 06: RAG & Knowledge Systems
**Core Concepts:**
- Embeddings Space (Cosine similarity vizualizace)
- Chunking Strategies (Fixed vs Semantic vs Markdown)
- Retrieval Metrics (Precision vs Recall)

**Lab:** "Build a Brain" - Indexace MD souborů do ChromaDB

**Rozšíření (GraphRAG):**
- Hybrid search (dense + sparse BM25)
- Reranking strategies
- Qdrant + Neo4j integration

**Tools:** ChromaDB, LangChain, Nomic-embed-text
**Success:** Dotaz vrátí přesný odstavec, ne halucinaci

---

### Lekce 07: AI-Powered Development (MCP Focus)
**Core Concepts:**
- MCP Architecture (Client-Host-Server)
- Augmented Coding (Autocomplete vs Agentic Edit)
- Context Management (.cursorrules, .windsurfrules)

**Lab:** "Custom MCP Server" - Python server pro čtení logů

**MCP Server Lab (Kompletní):**
```python
from mcp.server.fastmcp import FastMCP
import psutil

mcp = FastMCP("SystemMonitor")

@mcp.tool()
def get_system_stats() -> str:
    """Returns current CPU and RAM usage."""
    cpu = psutil.cpu_percent(interval=1)
    ram = psutil.virtual_memory().percent
    return f"CPU: {cpu}%\nRAM: {ram}%"

if __name__ == "__main__":
    mcp.run()
```

**IDE Comparison Lab:**
- Same task across Cursor, Windsurf, Claude Code
- Compare: speed, quality, cost

**Tools:** Cursor, Claude Desktop, FastMCP
**Success:** Claude Desktop vidí a umí zavolat custom tool

---

### Lekce 08: No-Code Automation
**Core Concepts:**
- AI in Workflows (rozhodování vs transformace)
- Trigger-Action Loops (Webhooks, Polling, Schedule)
- Human-in-the-loop (kdy zastavit a schválit)

**Lab:** "Email Triage Bot" - n8n čte email → klasifikuje → draftuje → čeká

**Tools:** n8n (self-hosted), Gmail API
**Success:** Email → Slack návrh odpovědi s tlačítkem "Odeslat"

---

### Lekce 09: Docker & Self-Hosting
**Core Concepts:**
- Containerization for AI (NVIDIA Container Toolkit)
- Stateless vs Stateful (vektorová DB vs model)
- Security (nevystavovat Ollama bez proxy)

**Lab:** "The AI Stack" - Docker Compose: Ollama + Open WebUI + ChromaDB

**Tools:** Docker, NVIDIA CUDA, Portainer
**Success:** `docker compose up -d` → kompletní chat v prohlížeči

---

### Lekce 10: Agentic Orchestration
**Core Concepts:**
- Router Pattern (LLM jako dispečer)
- Tool Calling Flow (jak model "vidí" nástroje)
- Memory (Short-term vs Long-term)

**Lab:** "Research Agent" - Téma → Tavily search → čtení → MD shrnutí

**Tools:** LangGraph, Tavily API
**Success:** Agent autonomně: Hledat → Číst → Psát

---

### Lekce 11: Capstone - Multi-Agent Swarm
**Core Concepts:**
- Handoffs (Researcher → Writer → Reviewer)
- Orchestration vs Choreography
- Cost/Latency management (paralelní běh)

**Lab:** "The Publisher" - Téma → Článek → Obrázek → Publikace

**Tools:** OpenAI Swarm / LangGraph Swarm pattern
**Success:** Autonomní blog post s obrázkem z jedné věty

---

## 🇨🇿 ČESKÉ ZDROJE

| Kanál | Focus | Rating |
|-------|-------|--------|
| AI Univerzita (ChatBuilders) | Praktické AI, automace | ⭐⭐⭐⭐⭐ |
| David Strejc | Security, deep-dive | ⭐⭐⭐⭐ |
| ČAUI | Profesionální, enterprise | ⭐⭐⭐⭐ |

---

## 📺 POVINNÁ VIDEA (Q4 2025)

| Lekce | Video | Kanál |
|-------|-------|-------|
| 02 | Red Teaming + Injection Defense | Google/Microsoft blogs |
| 04 | Llama 4 + Qwen 3 Setup | Unite.ai |
| 06 | RAG Tutorial 2025 | Harish Neel |
| 07 | Build MCP Server | FreeCodeCamp (Dec 2) |
| 07 | Best AI IDEs 2025 | Humai.blog |
| 10 | Agent Framework Comparison | NIIT (Dec 6) |

---

## 🎯 AKČNÍ PLÁN

### TÝDEN 1-2 (KRITICKÉ - 7h)
- [ ] MCP Lab (Lekce 07) - 2h
- [ ] Update Models (Lekce 04) - 3h
- [ ] Prompt Injection (Lekce 02) - 2h

### TÝDEN 3-4 (HIGH - 11h)
- [ ] GraphRAG (Lekce 06) - 4h
- [ ] IDE Comparison (Lekce 07) - 3h
- [ ] LangGraph Focus (Lekce 10) - 4h

**Celkem:** 18 hodin → State-of-art prosinec 2025

---

*Compiled from: Perplexity Deep Research + Gemini 3 Pro Synthesis*
*Sources: 90+ citations, 49 verified references*
