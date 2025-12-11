# 🐳 Docker: Kontejnerizace aplikací

> **Proč používáme Docker?**  
> Protože nechceme řešit "u mě to funguje, proč ne u tebe?" problém!

---

## Co je Docker?

**Docker** je nástroj pro **kontejnerizaci** - balí aplikaci i s jejím celým prostředím do standardního balíčku, který poběží stejně kdekoli. Je to jako stěhování s celým domem místo jen nábytku.

---

## 🎯 Vysvětlení pro laika

### Představ si krabici na stěhování

| Bez Dockeru | S Dockerem |
|-------------|------------|
| "Potřebuješ nainstalovat Python 3.11, pak PostgreSQL 15, pak Redis..." | "Stáhni Docker, spusť `docker compose up`" |
| "Možná máš špatnou verzi Node.js" | Vždy běží přesně ta správná verze |
| "Na Windows to nefunguje" | Běží všude stejně |

### Analogie: Přepravní kontejner

Před kontejnery se náklad nakládal různě - pytle, sudy, bedny. Každý přístav je musel zpracovávat jinak.

**Standardní kontejner** (1956) změnil svět:
- Stejná velikost pro všechno
- Loď nemusí vědět co je uvnitř
- Nakládá se stejně v New Yorku i v Tokiu

Docker dělá to samé pro software!

---

## 🏗️ Jak to funguje v našem projektu

### Architektura AI Learning Platform

```
docker-compose.yml
├── frontend     (Next.js na portu 3000)
├── backend      (FastAPI na portu 8000)
├── db           (PostgreSQL na portu 5432)
└── redis        (Cache na portu 6379)
```

Každá služba běží v **izolovaném kontejneru**, ale mohou spolu komunikovat přes Docker network.

### Dockerfile = Recept

```dockerfile
# backend/Dockerfile (zjednodušeno)
FROM python:3.11-slim        # Základní obraz
WORKDIR /app                 # Pracovní adresář
COPY requirements.txt .      # Kopíruj závislosti
RUN pip install -r requirements.txt  # Instaluj
COPY . .                     # Kopíruj kód
CMD ["uvicorn", "main:app"]  # Spusť aplikaci
```

### docker-compose.yml = Orchestrace

```yaml
services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    depends_on:
      - db
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/app
      
  db:
    image: postgres:15
    volumes:
      - postgres_data:/var/lib/postgresql/data
```

---

## 🔧 Základní příkazy

### Spuštění celého projektu
```bash
# Sestaví a spustí všechny služby
docker compose up --build

# Na pozadí (detached mode)
docker compose up -d
```

### Zastavení
```bash
# Zastav kontejnery (data zůstanou)
docker compose down

# ⚠️ Nuclear reset - smaže i data!
docker compose down -v
```

### Logs a debugging
```bash
# Zobraz logy všech služeb
docker compose logs -f

# Logy konkrétní služby
docker compose logs -f backend

# Spusť příkaz v kontejneru
docker compose exec backend bash
```

### Kontrola stavu
```bash
# Co právě běží?
docker compose ps

# Kolik zabírá místa?
docker system df
```

---

## 📋 Typický dev workflow

### 1. Ráno - Spuštění prostředí
```bash
cd ~/ai-learning-platform
docker compose up -d
```

### 2. Během práce - Sledování logů
```bash
docker compose logs -f frontend backend
```

### 3. Po změně kódu
- **Frontend/Backend:** Hot reload funguje automaticky (volumes)
- **Po změně Dockerfile:** `docker compose up --build`
- **Po změně závislostí:** `docker compose up --build`

### 4. Večer - Ukončení
```bash
docker compose down
```

---

## ⚡ Docker vs Docker Compose

| Docker | Docker Compose |
|--------|----------------|
| Jeden kontejner | Více kontejnerů najednou |
| `docker run nginx` | `docker compose up` |
| Ruční networking | Automatické propojení služeb |
| Pro jednoduché use-cases | Pro multi-service aplikace ✅ |

**My používáme Docker Compose**, protože máme 4 služby (frontend, backend, db, redis) které musí spolupracovat.

---

## 🚀 Produkce vs Development

| Aspekt | Dev (lokálně) | Produkce (VPS) |
|--------|---------------|----------------|
| Compose file | `docker-compose.yml` | `docker-compose.prod.yml` |
| Build | `--build` při změnách | Přebuildit při deploy |
| Volumes | Mounted kód pro live reload | Pouze data volumes |
| Restart | Manuální | `restart: unless-stopped` |

### ⚠️ Produkční pravidlo
```bash
# DEV - OK smazat data
docker compose down -v  # ✅ OK

# PRODUKCE - NIKDY!
docker compose down -v  # ❌ SMAŽE DATABÁZI UŽIVATELŮ!
```

---

## 💡 Proč to všechno?

### Bez Dockeru (bolestivá cesta) 🚫
1. Nainstaluj Python 3.11 (možná máš 3.12?)
2. Nainstaluj PostgreSQL 15 (verze? konfigurace?)
3. Nainstaluj Redis (další setup...)
4. Nastav proměnné prostředí (kde?)
5. Doufej že to funguje... 🙏

### S Dockerem (jedna linka) ✅
```bash
docker compose up
```

Hotovo. Funguje na Linux, Mac, Windows. Každý člen týmu má identické prostředí.

---

## 📚 Další zdroje

- [Docker oficiální dokumentace](https://docs.docker.com/)
- [Docker Compose dokumentace](https://docs.docker.com/compose/)
- Náš projekt: viz `docker-compose.yml` v root adresáři

---

*Vytvořeno: 2025-12-10*  
*Souvisí s: [DEV_AND_DEPLOYMENT_GUIDE.md](file:///home/zimmel/ai-learning-platform/.ai-context/workflows/DEV_AND_DEPLOYMENT_GUIDE.md)*
