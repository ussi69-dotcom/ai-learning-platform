# 🚀 AI Learning Platform

Gamifikovaná platforma pro výuku AI konceptů s českou lokalizací.

## 📋 Požadavky

- **Docker** + **Docker Compose**
- **Git**

> **Poznámka:** Nepotřebuješ Node.js ani Python lokálně - vše běží v Dockeru!

---

## 🏁 Quick Start (Nový Počítač)

### 1. Naklonuj Repozitář

```bash
git clone https://github.com/ussi69-dotcom/ai-learning-platform.git
cd ai-learning-platform
```

### 2. Spusť Platformu

```bash
docker compose up -d --build
```

**To je vše!** Docker automaticky:
- Nainstaluje všechny závislosti
- Vytvoří databázi
- Naseeduje obsah lekcí
- Spustí všechny služby

### 3. Počkej ~2 minuty

Backend čeká na databázi a pak automaticky seeduje data.

### 4. Otevři v Prohlížeči

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:8000/docs](http://localhost:8000/docs)

### 5. Přihlaš Se

- **Email:** `admin@ai-platform.com`
- **Heslo:** `admin123`

---

## 🛠️ Běžné Příkazy

### Zastavit Platformu

```bash
docker compose down
```

### Restartovat Frontend (po změnách v kódu)

```bash
docker compose restart frontend
```

### Restartovat Backend (po změnách v contentu)

```bash
docker compose restart backend
```

### Nuclear Reset (smaže DB, vyresetuje vše)

⚠️ **Použij POUZE když změníš `models.py` nebo potřebuješ čistou DB!**

```bash
docker compose down -v
docker compose up -d --build
```

### Zobrazit Logy

```bash
# Všechny služby
docker compose logs -f

# Jen frontend
docker logs ai-frontend -f

# Jen backend
docker logs ai-backend -f
```

---

## 🌍 Lokalizace (EN/CZ)

Platforma podporuje **2 jazyky**: English (`/en`) a Čeština (`/cs`).

**Routing:**
- `/en` - anglická verze
- `/cs` - česká verze

**Překlady:**
- Frontend: `frontend/messages/en.json`, `frontend/messages/cs.json`
- Content: Každý lesson má `meta.json` s `title_cs` a `description_cs`

---

## 📂 Struktura Projektu

```
ai-learning-platform/
├── backend/              # FastAPI backend
│   ├── app/
│   │   ├── models.py     # DB modely
│   │   ├── main.py       # API endpoints
│   │   └── services/
│   │       └── content_loader.py  # Načítání lekcí z MDX
│   └── entrypoint.sh     # Auto-seed skript
├── frontend/             # Next.js frontend
│   ├── app/
│   │   ├── [locale]/     # Lokalizované routy
│   │   └── ...
│   ├── components/       # UI komponenty
│   ├── i18n/             # Lokalizační konfigurace
│   └── messages/         # Překlady (en.json, cs.json)
├── content/              # Markdown/MDX lekce
│   └── courses/
│       └── ai-basics-beginner/
│           └── lessons/
│               ├── 01-what-is-ai/
│               ├── 02-how-does-ai-learn/
│               └── ...
├── .ai-context/          # Dokumentace pro AI agenty
└── docker-compose.yml    # Orchestrace služeb
```

---

## 🔧 Troubleshooting

### Frontend se restartuje pořád dokola

**Problém:** Chybí závislost nebo špatná konfigurace.

**Řešení:**
```bash
docker logs ai-frontend --tail 50
```

Pokud vidíš `Cannot find module 'next-intl'`:
```bash
cd frontend
npm install next-intl
docker compose restart frontend
```

### Backend vypisuje SQL chybu o neexistujícím sloupci

**Problém:** DB schéma je staré (změny v `models.py`).

**Řešení:**
```bash
docker compose down -v
docker compose up -d --build
```

### Lekce se nezobrazují

**Problém:** Backend ještě neseedoval data.

**Řešení:**
1. Zkontroluj logy: `docker logs ai-backend`
2. Počkej na `✅ Hotovo! DB naplněna z content souborů.`
3. Refresh prohlížeč

### Port 3000 nebo 8000 je obsazený

**Problém:** Jiná aplikace používá stejný port.

**Řešení:**
- Zastavit tu aplikaci, nebo
- Změnit porty v `docker-compose.yml`:
  ```yaml
  ports:
    - "3001:3000"  # Frontend na 3001
  ```

---

## 🏗️ Vývoj

### Přidání Nové Lekce

1. Vytvoř složku: `content/courses/[course]/lessons/XX-lesson-name/`
2. Přidej `content.mdx`, `meta.json`, `quiz.json`
3. Restartuj backend: `docker compose restart backend`

📚 **Detaily:** Viz `.ai-context/CONTENT_GUIDELINES.md`

### Změna DB Schématu

1. Uprav `backend/app/models.py`
2. Nuclear reset:
   ```bash
   docker compose down -v
   docker compose up -d --build
   ```

---

## 🚢 Deployment

### Lokální Produkční Build

```bash
# Frontend
cd frontend
npm run build

# Backend (používá Uvicorn, není potřeba build)
```

### Deploy na Server

1. Nainstaluj Docker na serveru
2. Klonuj repo
3. Nastav environment variables (pokud potřebuješ)
4. Spusť: `docker compose up -d --build`

---

## 📝 Poznámky

### Default Login

- **Admin:** `admin@ai-platform.com` / `admin123`

Vytvořeno při prvním seedování (`backend/seed.py`).

### Automatické Seedování

**Backend automaticky seeduje DB při startu** pokud:
- Tabulka `courses` je prázdná
- Nebo se spouští poprvé

**Soubory:**
- `backend/entrypoint.sh` - čeká na DB, pak spustí `seed.py`
- `backend/seed.py` - vytváří uživatele a načítá lekce

---

## 🆘 Podpora

Mrkni do `.ai-context/` pro:
- `CONTENT_GUIDELINES.md` - jak psát lekce
- `ARCHITECTURE.md` - tech stack a struktura
- `AGENT-STATE.md` - aktuální stav projektu

---

**Vytvořeno s ❤️ pomocí Claude Sonnet 4.5**
