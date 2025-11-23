import os
from datetime import datetime
# ⚙️ KONFIGURACE
CONTEXT_DIR = ".ai-context"
OUTPUT_FILE = "CONTEXT_FOR_ARCHITECT.md"

# Soubory, které tvoří "Paměť projektu" (v tomto pořadí)
CRITICAL_FILES = [
    "PROJECT_CONTEXT.md",      # 1. Vize a kontext
    "STRATEGY.md",             # 2. Strategie a curriculum
    "CONTENT_GUIDELINES.md",   # 3. Pravidla obsahu
    "AGENT-STATE.md",          # 4. Stav agenta
    "ARCHITECTURE.md",         # 5. Tech stack
    "WORKFLOW.md",             # 6. Workflow
    "IDEAS.md",                # 7. Backlog
    "implementation_plan.md",  # 8. Aktuální plán
    "task.md"                  # 9. Checklist
]

# Složky, které ignorujeme při výpisu struktury
IGNORE_DIRS = {
    '.git', '__pycache__', 'node_modules', '.next', 'venv', 
    '_archive', '.pytest_cache', '.vscode', 'coverage'
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

def get_project_structure(startpath):
    """Vygeneruje stromovou strukturu projektu (pro lepší orientaci AI)."""
    structure = []
    for root, dirs, files in os.walk(startpath):
        # Filtrace složek
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
        
        level = root.replace(startpath, '').count(os.sep)
        indent = '  ' * level
        folder_name = os.path.basename(root)
        
        if folder_name == ".":
            continue
            
        structure.append(f"{indent}📁 {folder_name}/")
        
        subindent = '  ' * (level + 1)
        for f in files:
            # Ignorujeme skryté soubory a build artefakty
            if f.startswith('.') and f not in ['.cursorrules', '.env.example']:
                continue
            structure.append(f"{subindent}📄 {f}")
            
    return "\n".join(structure)

def generate_briefing():
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    # 1. Hlavička promptu
    output = f"# 🚀 SYSTEM BRIEFING - {timestamp}\n\n"
    output += "**INSTRUCTION:** This is a context dump for the AI Architect.\n"
    output += "Please load the following context and await instructions.\n"
    output += "-" * 40 + "\n"
    
    # 2. Načtení kontextových souborů
    for filename in CRITICAL_FILES:
        filepath = os.path.join(CONTEXT_DIR, filename)
        content = read_file(filepath)
        
        if content:
            output += f"\n\n## 📄 FILE: {filename}\n"
            output += "```markdown\n"
            output += content
            output += "\n```\n"
        else:
            # Pokud soubor chybí (např. implementation_plan na začátku cyklu), jen to zmíníme
            pass
            
    # 3. Struktura projektu (Realita na disku)
    output += "\n\n## 📂 PROJECT FILE STRUCTURE (Current State)\n"
    output += "```text\n"
    output += get_project_structure(".")
    output += "\n```\n"
    
    # 4. User Prompt Placeholder
    output += "\n\n" + "-" * 40 + "\n"
    output += "## 🗣️ USER MESSAGE:\n"
    output += "(Write your specific request for this session here...)\n"

    return output

if __name__ == "__main__":
    print("🔄 Generuji kontextový soubor...")
    
    content = generate_briefing()
    
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write(content)
        
    print(f"✅ HOTOVO! Soubor vytvořen: {OUTPUT_FILE}")
    print("👉 Otevři ho, zkopíruj celý obsah a vlož do nového chatu s AI Architectem.")