# Last Session Handover

**Aktualizuj průběžně během práce. Toto je krátkodobá, hutná paměť.**

---

## Session Info
- **Datum:** 2025-12-04
- **Agent:** Gemini CLI
- **Cycle:** 40
- **Stroj:** Linux (deploy VPS)

---

## Co jsme dělali

1.  **Deployment Fix (Email Verification):**
    -   Opravena generace URL pro verifikaci emailů (`backend/app/config.py`).
    -   Nyní backend správně detekuje produkční doménu `ai-teaching.eu` i když `NEXT_PUBLIC_API_URL` ukazuje na `localhost` (Docker network).
    -   Aktualizován `docker-compose.prod.yml` s explicitními ENV vars (`DOMAIN_NAME`, `FRONTEND_URL`).
    -   **Incident:** RCA report vytvořen v `.ai-context/history/incidents/RCA_2025_12_04_email_verification_localhost.md`.

2.  **Domain Change Guide:**
    -   Vytvořen `.ai-context/workflows/DOMAIN_CHANGE_GUIDE.md` pro budoucí změny domén.
    -   Přidán do `INDEX.md`.

3.  **User Management:**
    -   Vytvořen skript `backend/manage_users.py` pro správu uživatelů (list/delete) přímo v kontejneru.
    -   Smazán uživatel `hornova.ve@seznam.cz` na žádost uživatele.

---

## Aktuální stav

```
✅ Email Verification → Odkazuje správně na https://ai-teaching.eu/api/...
✅ Production Config  → Aktualizováno pro ai-teaching.eu
✅ User Management    → Skript manage_users.py dostupný v backendu
```

---

## Rozdělaná práce

**ŽÁDNÁ** - Hotfix nasazen, změny commitnuty.

---

## Další krok

Dle původního plánu (posunuto kvůli hotfixu):
1. **Vytvořit slash commands** (`/new-lesson`, `/validate-lesson`)
2. **Vytvořit lesson skeletons** pro Prompt Engineering kurz
3. **Gemini CLI** začne generovat content

---

## Quick Commands

```bash
# Spustit platformu (prod)
docker compose -f docker-compose.prod.yml up -d --build

# Správa uživatelů (v kontejneru)
docker compose -f docker-compose.prod.yml exec backend python manage_users.py list
docker compose -f docker-compose.prod.yml exec backend python manage_users.py delete <email>
```

---

## Důležité soubory této session

| Soubor | Co tam je |
|--------|-----------|
| `backend/app/config.py` | Oprava URL assembly |
| `docker-compose.prod.yml` | Env vars pro doménu |
| `.ai-context/workflows/DOMAIN_CHANGE_GUIDE.md` | Průvodce změnou domény |
| `backend/manage_users.py` | Skript na mazání uživatelů |

---

## User kontext

- **Doména:** ai-teaching.eu (NE ai-learning.eu!)
- **Role:** Sysadmin/Product Owner
- **Styl:** Chce věci rychle hotové, opravené a zdokumentované ("zadokumentuj, pushni, zavirame").

---

*Poslední update: 2025-12-04, Hotfix nasazen*