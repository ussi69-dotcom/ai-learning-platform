#!/usr/bin/env python3
"""
🤖 AI Context Builder - Generuje kompletní kontext pro AI agenty
============================================================

Tento script vytváří soubor CONTEXT_FOR_ARCHITECT.md, který obsahuje:
1. Úvodní vysvětlení struktury a postupů projektu
2. Všechny klíčové dokumentační soubory z .ai-context/
3. Pravidla pro AI agenty z .agent/rules/rules.md
4. Aktuální strukturu projektu (file tree)

Použití:
    python scripts/context_builder.py

Output:
    CONTEXT_FOR_ARCHITECT.md (v root složce projektu)
"""

import os
from datetime import datetime

# ⚙️ KONFIGURACE
CONTEXT_DIR = ".ai-context"
OUTPUT_FILE = "CONTEXT_FOR_ARCHITECT.md"

# Soubory, které tvoří "Paměť projektu" (v tomto pořadí)
# Tyto soubory jsou načteny VŽDY a v tomto pořadí
CRITICAL_FILES = [
    (".agent/rules/rules.md", "🤖 Agent Rules & Workflow"),
    ("AGENT_PROTOCOL.md", "🧭 Agent Protocol"),
    ("INDEX.md", "🗂️ Context Index"),
    ("INIT_CARDS.md", "🧩 Agent Init Cards"),
    ("state/WORKING_CONTEXT.md", "📊 Working Context"),
    ("state/MEMORY.md", "🧠 Memory"),
    ("workflows/UNIFIED_ORCHESTRATION.md", "🤝 Unified Orchestration"),
    ("workflows/WORKFLOW_V6_MASTERPIECE.md", "🏆 MASTERPIECE Workflow"),
    ("core/CONTENT_GUIDELINES.md", "🎨 Content Guidelines"),
    ("core/ARCHITECTURE.md", "🏗️ Architecture"),
    ("core/CURRICULUM_ROADMAP.md", "🎯 Curriculum Roadmap"),
]

# Složky, které ignorujeme při výpisu struktury
IGNORE_DIRS = {
    '.git', '__pycache__', 'node_modules', '.next', 'venv',
    '_archive', '.pytest_cache', '.vscode', 'coverage', 'dist',
    '.turbo', 'build', '.cache', 'completed_cycles', '.ai-context/archive'
}

# Soubory, které ignorujeme při výpisu struktury
IGNORE_FILES = {
    '.DS_Store', 'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml',
    '.env.local', '.env.development', '.env.production', 
    'CONTEXT_FOR_ARCHITECT.md'  # Ignorujeme sám sebe
}

def read_file(filepath):
    """Bezpečně přečte soubor, pokud existuje."""
    if not os.path.exists(filepath):
        return None
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            return f.read()
    except Exception as e:
        return f"[Error reading file: {e}]"

def get_project_structure(startpath, max_depth=3):
    """Vygeneruje stromovou strukturu projektu (pro lepší orientaci AI)."""
    structure = []
    startpath = os.path.abspath(startpath)
    
    for root, dirs, files in os.walk(startpath):
        # Filtrace složek
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
        
        # Vypočítáme úroveň zanoření
        level = root.replace(startpath, '').count(os.sep)
        
        # Omezíme hloubku
        if level >= max_depth:
            dirs.clear()  # Nepokračujeme do podadresářů
            continue
        
        indent = '  ' * level
        folder_name = os.path.basename(root) or '.'
        
        if folder_name == ".":
            folder_name = "ai-learning-platform (root)"
            
        structure.append(f"{indent}📁 {folder_name}/")
        
        # Přidáme soubory
        subindent = '  ' * (level + 1)
        for f in sorted(files):
            # Ignorujeme skryté soubory a build artefakty
            if f.startswith('.') and f not in ['.cursorrules', '.env.example']:
                continue
            if f in IGNORE_FILES:
                continue
            structure.append(f"{subindent}📄 {f}")
            
    return "\n".join(structure)

def generate_intro_section():
    """Generuje úvodní sekci vysvětlující strukturu a postupy."""
    intro = """
# 🧠 AI Learning Platform - Complete Context

> **Pro AI agenty (Claude, Perplexity, Gemini):**  
> Tento dokument obsahuje kompletní kontext projektu. Načti si ho CELÝ před zahájením práce.

---

## 📋 Jak používat tento kontext

### 1. **Priorita dokumentace**
Při konfliktech informací platí následující priorita:
1. **rules.md** - Workflow pravidla, constraints, testing strategie
2. **CONTENT_GUIDELINES.md** - Design system ("Liquid Glass"), UI komponenty
3. **PROJECT_CONTEXT.md** - Tech stack, porty, základní pravidla
4. **ARCHITECTURE.md** - Detaily technologií a závislostí
5. **WORKFLOW.md** - Development proces a git standardy
6. **STRATEGY.md** - Long-term vision a curriculum

### 2. **Pracovní postup**
Při každém úkolu:
1. **Načti relevantní kontext** z níže uvedených souborů
2. **Zkontroluj rules.md** pro workflow constraints a testing requirements
3. **Ověř aktuální stav** v AGENT-STATE.md (jaký cyklus běží, co je hotovo)
4. **Navrhni řešení** v souladu s CONTENT_GUIDELINES.md a ARCHITECTURE.md
5. **Implementuj** podle WORKFLOW.md (git standardy, atomic commits)
6. **Test** podle rules.md (npm build, pytest, manual verification)
7. **Aktualizuj** AGENT-STATE.md po dokončení

### 3. **Klíčová pravidla** (viz rules.md pro detaily)

#### 🎨 Design & UI
- **Design System:** "Liquid Glass" - glassmorphism, backdrop-blur, NO solid backgrounds
- **Komponenty:** Vždy použij existující z `frontend/components/` (ConceptCard, Diagram, Callout, LabSection)
- **Barevné schema:** OKLCH colors, Star Wars inspired (Jedi/Sith themes)
- **Typography:** Inter font, heading hierarchy (h2 → h6, NO h1)

#### 🛠️ Development
- **Environment:** WSL2 - používej NATIVE Linux příkazy (ne `wsl npm install`)
- **Docker:** Preferovaný způsob spouštění (`docker compose up -d`)
- **Database:** After schema changes = `docker compose down -v && up --build`
- **Paths:** Linux paths ONLY (`/home/user/...`, ne `C:\\Users\\...`)

#### 📝 Content
- **Format:** MDX (Markdown + React komponenty)
- **Struktura lekce:** Header → Mission Goal → Sections → Quiz → Summary
- **Diagrams:** SVG-first approach, CSS diagramy preferovány
- **Star Wars theme:** All content má Star Wars analogie (Jedi, Sith, holocrons, etc.)

#### 🧪 Testing (KRITICKÉ - viz rules.md)
- **Before commit:** Run `npm run verify` (frontend) a `pytest` (backend)
- **Visual verification:** `frontend/tests/visual` (Playwright)
- **Manual:** Otestuj v prohlížeči dark mode + mobile viewport
- **NEVER commit broken code** or placeholder TODOs

---

## 📂 Struktura kontextových souborů

Následující soubory tvoří "paměť" projektu:

0. **rules.md** - AI agent pravidla (workflow, constraints, testing, commit standards)
1. **AGENT_PROTOCOL.md** - SSOT pravidla pro agenty
2. **INDEX.md** - Aktivní mapování dokumentů
3. **INIT_CARDS.md** - Always-on vs situational čtení
4. **WORKING_CONTEXT.md** - Aktuální stav práce
5. **MEMORY.md** - Lessons learned + protokoly
6. **UNIFIED_ORCHESTRATION.md** - Multi-agent orchestrace
7. **WORKFLOW_V6_MASTERPIECE.md** - MASTERPIECE content workflow
8. **CONTENT_GUIDELINES.md** - Pravidla pro tvorbu lekcí a UI
9. **ARCHITECTURE.md** - Tech stack + architektura
10. **CURRICULUM_ROADMAP.md** - Curriculum strategie

---

## 🔧 Kritické informace (Quick Reference)

### Porty & Služby
- **Frontend:** `http://localhost:3000` (Next.js 16 + Turbopack)
- **Backend:** `http://localhost:8000` (FastAPI, Swagger: `/docs`)
- **Database:** `localhost:5432` (PostgreSQL 15)
- **Default Login:** `admin@ai-platform.com` / `admin123`

### Klíčové příkazy
```bash
# Spuštění projektu
docker compose up -d

# Reset databáze (po změnách v models.py)
docker compose down -v && docker compose up -d --build

# Restart jednotlivých služeb
docker compose restart backend  # Po změně content/
docker compose restart frontend # Po změně globals.css

# Testy (BEFORE EVERY COMMIT)
cd frontend && npm run build  # TypeScript check
cd backend && pytest          # Unit testy
```

### Tech Stack (krátce)
- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind 4, Shadcn/ui
- **Backend:** FastAPI, SQLAlchemy, Pydantic v2, JWT auth
- **Database:** PostgreSQL 15, Redis (cache)
- **Content:** MDX via `next-mdx-remote`
- **Containerization:** Docker Compose

---

## 📖 Kontext Files (Kompletní obsah níže)

"""
    return intro

def generate_briefing():
    """Hlavní funkce generující kompletní context file."""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    # 1. Header
    output = f"<!-- Generated: {timestamp} -->\n"
    
    # 2. Úvodní sekce
    output += generate_intro_section()
    
    # 3. Načtení kontextových souborů
    for filepath_rel, title in CRITICAL_FILES:
        # Pro soubory mimo .ai-context použijeme přímou cestu
        if filepath_rel.startswith(".agent/"):
            filepath = filepath_rel
        else:
            filepath = os.path.join(CONTEXT_DIR, filepath_rel)
            
        content = read_file(filepath)
        
        if content:
            output += f"\n\n{'='*70}\n"
            output += f"## {title}\n"
            output += f"Path: `{filepath_rel}`\n"
            output += f"{'='*70}\n\n"
            output += content
        else:
            # Pokud soubor chybí, jen to zmíníme
            output += f"\n\n> ⚠️ **{filepath_rel}** - File not found (možná ještě není vytvořen)\n"
            
    # 4. Struktura projektu (Realita na disku)
    output += "\n\n" + "="*70 + "\n"
    output += "## 📂 PROJECT FILE STRUCTURE (Current State)\n"
    output += "="*70 + "\n\n"
    output += "```text\n"
    output += get_project_structure(".")
    output += "\n```\n"
    
    # 5. Footer s návodem
    output += "\n\n" + "="*70 + "\n"
    output += "## 🗣️ READY FOR YOUR INSTRUCTIONS\n"
    output += "="*70 + "\n\n"
    output += "Kontext byl úspěšně načten. Nyní můžeš zadat konkrétní úkol.\n\n"
    output += "**Příklady úkolů:**\n"
    output += "- \"Vytvoř novou lekci o Fine-Tuning podle CONTENT_GUIDELINES\"\n"
    output += "- \"Oprav layout na mobile v komponenty NavBar\"\n"
    output += "- \"Přidej novou gamification feature (badges system)\"\n"
    output += "- \"Debug problém s login flow\"\n\n"
    output += "> 💡 **Tip:** Vždy zkontroluj AGENT-STATE.md pro kontext aktuálního cyklu.\n"
    output += "> ⚠️ **Důležité:** Před commitem vždy spus testy podle rules.md!\n"

    return output

if __name__ == "__main__":
    print("🔄 Generuji kontextový soubor...")
    
    content = generate_briefing()
    
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write(content)
        
    file_size_kb = len(content) / 1024
    print(f"✅ HOTOVO! Soubor vytvořen: {OUTPUT_FILE}")
    print(f"📏 Velikost: {len(content):,} znaků ({file_size_kb:.1f} KB)")
    print("\n👉 Použití:")
    print("   1. Otevři CONTEXT_FOR_ARCHITECT.md")
    print("   2. Zkopíruj CELÝ obsah")
    print("   3. Vlož do nového chatu s AI Architectem (Claude/Perplexity)")
    print("   4. Požádej o konkrétní úkol\n")
    print("📋 Zahrnuté soubory:")
    for filepath, title in CRITICAL_FILES:
        status = "✅" if os.path.exists(filepath if filepath.startswith(".agent/") else os.path.join(CONTEXT_DIR, filepath)) else "❌"
        print(f"   {status} {title}")
