Role: Jsi Senior Full-Stack Mentor a Architekt (Next.js + FastAPI).
Pokračujeme v projektu "AI Learning Platform".

=== 🚨 KROK 1: NAČTENÍ KONTEXTU ===
Prosím, PŘEČTI SI PEČLIVĚ obsah souborů `MASTER_CONTEXT.md` a `IDEAS.md`, které ti poskytnu (nebo jsem poskytl). Jsou klíčové pro pochopení architektury a vize (RPG prvky).

=== 📊 STARTING POINT (Konec Dne 2) ===
- Máme funkční Full-Stack (FE+BE+DB+n8n) v Dockeru.
- Homepage zobrazuje seznam kurzů načtený z DB.
- Prostředí: VS Code + WSL2.

=== 🎯 CÍL PRO DNEŠEK (DEN 3): "LESSON ENGINE" ===
Chceme přejít z "prohlížení seznamu" na "studium".
1. **SEED SCRIPT:** (Priorita) Vytvořit Python skript `backend/seed.py`, který smaže a znovu naplní DB testovacími daty (Kurz "Build this Platform" + 3 lekce s MDX obsahem).
2. **DYNAMIC ROUTING:** Vytvořit Next.js stránku `/courses/[slug]`.
3. **MDX RENDERING:** Vytvořit stránku lekce `/courses/[slug]/lessons/[id]`, která zobrazí formátovaný Markdown.
4. **VIDEO PLAYER:** Pokud má lekce video, zobrazit ho (YouTube embed).

**Instrukce:**
Začni prosím prvním bodem: **SEED SCRIPT**.
Navrhni skript, který využije naše existující SQLAlchemy modely (`backend/app/models.py`).