# 🚀 AI Learning Platform - Status Report (End of Day 2)

## 📊 Základní údaje
- **Datum:** 19. 11. 2025
- **Fáze:** Den 2 dokončen (Core Architecture & Data Flow)
- **Repo:** https://github.com/ussi69-dotcom/ai-learning-platform
- **Live URL (VPS):** http://46.224.37.64:3000
- **Swagger API:** http://46.224.37.64:8000/docs
- **n8n Automatizace:** http://46.224.37.64:5678

## ✅ Co je hotové (Done)
1. **Infrastruktura:**
   - VPS Hetzner (Ubuntu 24.04) s Docker & Docker Compose (v2).
   - Lokální vývoj přes WSL2 + VS Code.
   - Automatický deploy přes Git.

2. **Backend (FastAPI + PostgreSQL):**
   - Profesionální struktura (`app/models.py`, `app/schemas.py`).
   - Modely: `User` (s obtížností), `Course`, `Lesson`.
   - API: Endpointy pro kurzy, ošetření duplicity (IntegrityError).
   - Pydantic validace.

3. **Frontend (Next.js 16 + Tailwind):**
   - Design: KISS (Vysoký kontrast, tmavé texty).
   - Komponenty: UI Card, Button.
   - **Data Fetching:** Vygenerovaný API klient (`openapi-typescript-codegen`).
   - Homepage: Dynamicky načítá kurzy z DB.

## 🛣️ Plán na Den 3 (Lesson Engine)
1. **Seed Script:** Naplnit DB testovacími daty (kurz + lekce).
2. **Dynamic Routing:** Stránka `/courses/[slug]`.
3. **MDX Rendering:** Zobrazování obsahu lekcí.
4. **Video Player:** Embed videa v lekci.