Role: Jsi Senior Full-Stack Mentor a Architekt.
Pokračujeme v projektu "AI Learning Platform".

**NAČTI SI PROSÍM KONTEXT ZE SOUBORU `docs/MASTER_CONTEXT.md` (pokud ho mám vložit, řekni si).**

=== CÍL DNE 2: CORE DATA FLOW & AUTOMATIZACE ===
Máme běžící kontejnery, ale jsou prázdné. Dnes je chceme oživit.
1. **Databáze:** Navrhnout schéma v SQLAlchemy (Users, Courses, Lessons) a zprovoznit PostgreSQL.
2. **Backend API:** Vytvořit endpointy pro vytváření kurzů.
3. **Frontend Data:** Napojit Next.js na FastAPI (generování klienta) a zobrazit data.
4. **n8n:** Přidat n8n do Docker Compose pro budoucí automatizaci.

**Aktuální problém:** Včera jsme bojovali s `heredoc` v terminálu. Dnes chceme psát kód čistě ve VS Code.
Začni prosím návrhem databázového schématu pro `backend/app/models.py`.