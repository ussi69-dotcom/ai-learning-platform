# Incident Report: System Status & API Connectivity Mismatch

**Datum:** 3. prosince 2025
**Status:** Vyřešeno
**Severita:** High (Frontend nebyl schopen komunikovat s Backendem)
**Dotčené komponenty:** Frontend (SystemStatus), Docker konfigurace, Networking

## Popis incidentu
Uživatel nahlásil chybu "System issues detected" a verzi "vunknown" v komponentě `SystemStatus` na frontendu. Indikátory služeb (PostgreSQL, Redis) byly nefunkční.

## Root Cause Analysis (RCA)

### 1. Příčina (Root Cause)
Hlavní příčinou byla kombinace dvou faktorů:
1.  **Hardcoded API URL v buildu:** Docker image pro frontend byl sestaven s environment proměnnou `NEXT_PUBLIC_API_URL` směřující na produkční doménu (`https://ai-teach.me/api`), pravděpodobně z předchozího cacheovaného buildu nebo nesprávně načteného `.env` souboru při buildu.
2.  **Chybějící Rewrite pravidla:** V `next.config.ts` chyběla konfigurace `rewrites`. Next.js aplikace v Docker kontejneru se pokoušela volat `/api` endpointy. Bez rewrite pravidla se tyto požadavky nevyřizovaly interně v rámci Docker sítě (směr `backend:8000`), ale končily chybou spojení nebo se snažily jít ven na nesprávnou URL.

### 2. Průběh vyšetřování
*   Logs z kontejneru `ai-frontend` ukázaly, že aplikace startuje správně.
*   `curl` zevnitř kontejneru na backend fungoval (`curl http://backend:8000/health`), což vyloučilo chybu backendu.
*   Inspekce environment proměnných v běžícím kontejneru (`docker exec ai-frontend env`) odhalila nesprávnou hodnotu `NEXT_PUBLIC_API_URL`.
*   Pokus o volání `/api/health` na localhostu selhával, protože Next.js nevěděl, kam má `/api` směrovat.

### 3. Řešení (Fix)
1.  **Update `next.config.ts`:** Přidána sekce `rewrites`, která explicitně mapuje `/api/:path*` na `http://backend:8000/:path*`. To zajišťuje, že SSR (Server Side Rendering) a API routes fungují správně uvnitř Docker sítě.
2.  **Rebuild kontejneru:** Proveden rebuild frontend kontejneru s flagem `--no-cache` pro vynucení načtení správných proměnných z lokálního `.env` souboru (`NEXT_PUBLIC_API_URL=/api`).

## Preventivní opatření (Action Items)

Abychom se podobným incidentům v budoucnu vyvarovali, navrhuji následující kroky:

1.  **Validace ENV při startu:** Přidat do `next.config.ts` nebo do entrypoint skriptu validaci, zda `NEXT_PUBLIC_API_URL` odpovídá očekávanému prostředí (dev vs prod).
2.  **Docker Build Args:** V `docker-compose.yml` explicitně předávat `args` pro build fázi, aby se nespoléhalo jen na `.env` soubor v kontextu, který může být nejednoznačný.
3.  **Health Check v CI:** Přidat do CI/CD pipeline krok, který po startu kontejnerů ověří dostupnost `/api/health` endpointu přes frontend proxy (tzv. smoke test).
4.  **Dokumentace:** Aktualizovat `GEMINI.md` nebo `README.md` s informací o nutnosti rebuildovat frontend při změně `.env` proměnných, které se zapékají do buildu (jako `NEXT_PUBLIC_`).

## Související změny
*   `frontend/next.config.ts`: Přidána proxy konfigurace.
*   `backend/requirements.txt`: Fix verze `bcrypt` (řešeno v rámci téže session, souviselo s nemožností se přihlásit).
*   `backend/tests/test_auth.py`: Oprava testů autentizace.
