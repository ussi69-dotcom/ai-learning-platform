# 💡 Brainstorming & Ideas Backlog

## 🛠️ Admin Console
- **User Management:** List, Edit, Delete users.
- **Content Management:** Visual editor for lessons/quizzes.
- **System Status:** Monitor server health and logs.

## 🎮 Gamifikace - RPG & "Pan Sponka"
**Koncept:** Učení jako RPG hra.
**Postava:**
- Interaktivní průvodce ("Pan Sponka" 2.0).
- Avatar se mění/vylepšuje podle levelu.
- Získává XP za kvízy a dokončené lekce.

**Boss Fights (Auto-battler):**
- Na konci každého kurzu je "Boss" (tematický, např. "The Hallucination Monster").
- **Mechanika:** Úspěšnost v kurzu určuje útok/HP hráče.
- **Loot:** Roguelike výběr ze 3 odměn po výhře (+Crit Chance, +Memory).
- **Leaderboard:** Žebříček na Homepage.

## 🧠 Smart Glossary (Slovníček)
- **Struktura:** Řazeno dle obtížnosti, ne abecedy.
- **Interaktivita:** Hover tooltips v textu lekcí.
- **Loading Screens:** Zobrazovat "Did you know?" pojmy.

## 🤖 AI Mentor (Offline/Online LLM)
- Tlačítko "Pomoc" v lekci.
- Generování promptů pro pomoc, pokud se uživatel zasekne.
- Kontextová nápověda na základě `MASTER_CONTEXT.md`.

## 🌍 Lokalizace & Security
- **Jazyk:** CZ obsah + EN terminologie.
- **Geo-blocking:** Povolit jen ČR/SR IP adresy (Cloudflare WAF).

## 📊 Analýza & Výkonnost
- **Dashboard:** Výkonnost uživatele (účet, kurzy, úspěšnost).
- **Leaderboard:** Žebříček na Homepage.
- **Analytics:** Google Analytics pro sledování výkonnosti.

## 🎓 Future Lesson Strategy: "The Reconstruction"
*   **Concept:** Instead of giving students exact prompts to recreate this platform, use a **"Milestone Build"** approach.
*   **Method:**
    *   Provide the *Context* (Architecture, Vision, Guidelines).
    *   Task: "Build the MVP based on these specs."
    *   Students find their own path (likely more direct than ours).
    *   Provide "Save Points" (Git branches) for when they get stuck.
# 🧪 Lab Modernization Report: Adapting to "Smart" AI
**Date:** 2025-11-30 | **Completed:** 2025-12-12
**Status:** ✅ IMPLEMENTED (Commit `2611dc9`)

## Implementation Summary (Dec 12, 2025)

| Lab | Fix Applied |
|-----|-------------|
| `lab-rag-reality` | FIFA 2026 → Personal/real-time knowledge boundary questions |
| `lab-hallucination-trap` | Fake Harry Potter → "Plenum wrench" niche tool hallucination |
| `lab-tokenizer-view` | AI self-reporting → Official OpenAI Tokenizer link |
| `lab-sycophancy-trap` | **NEW** Churchill/radar false premise test |

**Reports:**
- `.ai-context/reports/LAB_MODERNIZATION_ANALYSIS.md` - Full audit of 34 labs
- `.ai-context/reports/LAB_MODERNIZATION_PROPOSAL.md` - Detailed implementation plan
- `.ai-context/reports/GEMINI_LAB_RESEARCH_2025_12.md` - Gemini research on 2025 AI limitations
