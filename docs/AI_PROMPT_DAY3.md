Role: Jsi Senior Full-Stack Mentor a Architekt (Next.js + FastAPI).
Pokračujeme v projektu "AI Learning Platform". Tady je detailní kontext, aby ses nemusel znovu ptát.

=== 📜 HISTORIE PROJEKTU & ROZHODNUTÍ (Context Memory) ===
Začali jsme čistě ve WSL2 terminálu, ale přešli jsme na **VS Code**, což nám zefektivnilo práci.
Projekt běží v Dockeru, orchestrace přes Docker Compose.

**Co nás potrápilo (Lessons Learned - NEOPAKOVAT CHYBY):**
1. **Docker verze:** Na VPS i lokálně používáme moderní `docker compose` (bez pomlčky, v2 plugin), ale lokálně jsme museli doinstalovat plugin.
2. **Backend Struktura:** Původně jsme měli `main.py` v rootu backendu. Přešli jsme na `backend/app/main.py` s `__init__.py`, aby fungovaly importy.
3. **DB Persistence:** Měli jsme problém, že Docker Volumes si pamatovaly staré heslo k DB. Museli jsme použít `docker compose down -v` pro tvrdý reset.
4. **Next.js 16:** Vyžaduje Node.js 20+. V Dockerfile jsme museli upgradovat z `node:18-alpine` na `node:20-alpine`.
5. **Pydantic v2:** Narazili jsme na chybějící `email-validator` a nutnost používat `ConfigDict(from_attributes=True)` místo starého `orm_mode`.
6. **Frontend/Backend Komunikace:** Nejsme fanoušci ručního psaní fetchů. Používáme `openapi-typescript-codegen` pro generování klienta z běžícího FastAPI.
7. **Heredoc v terminálu:** Selhávalo nám formátování při kopírování dlouhých souborů. Píšeme kód přímo ve VS Code.

=== 📊 TECHNICKÝ STACK (Strict) ===
- **Frontend:** Next.js 16 (App Router), TypeScript, Tailwind CSS, Shadcn/ui (ručně tvořené komponenty Button/Card).
- **Backend:** FastAPI, Python 3.11, SQLAlchemy (Sync), Pydantic v2.
- **Database:** PostgreSQL 15, Redis 7.
- **Automation:** n8n (běží v kontejneru, propojené s DB).
- **Design:** KISS principy. Vysoký kontrast (slate-900 texty), žádné šedé na šedém.

=== 📍 AKTUÁLNÍ STAV KÓDU (Konec Dne 2) ===
- Databáze má tabulky: `users` (s obtížnostmi 'Duke Nukem' stylu), `courses`, `lessons`.
- Backend má endpoint `POST /courses/` (ošetřená duplicita slugu) a `GET /courses/`.
- Frontend Homepage dynamicky stahuje a zobrazuje karty kurzů.
- Máme funkční Docker Compose soubor se službami: `frontend`, `backend`, `db`, `n8n`.

=== 🎯 CÍL PRO DNEŠEK (DEN 3): "LESSON ENGINE" ===
Chceme přejít z "prohlížení seznamu" na "studium".
1. **SEED SCRIPT:** Potřebujeme Python skript (`backend/seed.py`), který smaže DB a naplní ji kurzem "Build this Platform" a 3-5 lekcemi s MDX obsahem. (Už nás nebaví to klikat ve Swaggeru).
2. **DYNAMIC ROUTING:** Po kliknutí na kartu kurzu (slug) otevřít detail kurzu.
3. **MDX RENDERING:** Zobrazit obsah lekce (Markdown) hezky nastylovaný.
4. **VIDEO:** Pokud má lekce video_url, zobrazit přehrávač.

Prosím, začni prvním bodem: **SEED SCRIPT**.
Navrhni `backend/seed.py`, který využije naše existující SQLAlchemy modely a naplní databázi.