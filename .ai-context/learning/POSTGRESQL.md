# 🐘 PostgreSQL: Relační databáze

> **Proč používáme PostgreSQL?**  
> Protože data uživatelů, kurzy a pokrok musí někde přetrvat - i když server restartujeme!

---

## Co je PostgreSQL?

**PostgreSQL** (zkráceně "Postgres") je **relační databáze** - systém pro ukládání strukturovaných dat. Je to jako super-výkonný Excel, který zvládne miliony řádků a nikdy neztratí data.

---

## 🎯 Vysvětlení pro laika

### Představ si kartotéku

V kanceláři máš šanony s kartami klientů. Každý šanon = **tabulka** (table). Každá karta = **řádek** (row). Údaje na kartě = **sloupce** (columns).

| id | email | password_hash | xp |
|----|-------|---------------|-----|
| 1 | petr@email.cz | abc123... | 450 |
| 2 | jana@email.cz | xyz789... | 1200 |

### Proč ne jen soubor?

| JSON soubor | PostgreSQL |
|-------------|------------|
| Celý soubor se načítá do paměti | Čte jen co potřebuje |
| Jeden uživatel = celý soubor locked | Tisíce uživatelů současně |
| Není garantovaná konzistence | ACID transakce (všechno nebo nic) |
| "Doufám že se to nesmaže" | Backup, recovery, replication |

---

## 🏗️ Jak to funguje v našem projektu

### Hlavní tabulky

```
users           - Uživatelské účty + XP
├── id, email, display_name, xp, avatar

courses         - Kurzy (např. "Prompt Engineering")
├── id, slug, title_en, title_cs, order

lessons         - Lekce v kurzech
├── id, course_id, slug, title_en, title_cs, xp

user_progress   - Sledování pokroku
├── user_id, lesson_id, current_page, completed_labs, quiz_score
```

### Vztahy mezi tabulkami

```
User ─────────┬────────── UserProgress
              │
Course ───────┴── Lesson
```

**Jeden uživatel** může mít **mnoho progress záznamů** (jeden pro každou lekci).

---

## 🔧 Základní SQL příkazy

### Čtení dat (SELECT)
```sql
-- Všichni uživatelé
SELECT * FROM users;

-- Jen email a XP
SELECT email, xp FROM users WHERE xp > 500;

-- Seřazeno podle XP (leaderboard!)
SELECT display_name, xp FROM users ORDER BY xp DESC LIMIT 10;
```

### Vkládání dat (INSERT)
```sql
INSERT INTO users (email, password_hash, display_name)
VALUES ('novak@email.cz', 'hashed...', 'Petr Novák');
```

### Aktualizace (UPDATE)
```sql
-- Přidej 50 XP uživateli #1
UPDATE users SET xp = xp + 50 WHERE id = 1;
```

### Mazání (DELETE)
```sql
-- ⚠️ Opatrně!
DELETE FROM users WHERE id = 99;
```

---

## 📋 Workflow v našem projektu

### 1. Přístup k databázi přes Docker
```bash
# Spusť PostgreSQL shell
docker compose exec db psql -U postgres -d ai_learning

# Nebo pomocí adminer/pgadmin přes browser
```

### 2. Kontrola dat
```sql
-- Kolik máme uživatelů?
SELECT COUNT(*) FROM users;

-- Nejaktivnější uživatelé
SELECT display_name, xp FROM users ORDER BY xp DESC LIMIT 5;
```

### 3. Změny schématu (struktura tabulek)

**Lokálně (dev):**
```bash
# Nuclear reset - smaž vše a vytvoř znovu
docker compose down -v
docker compose up
```

**Produkce:**
```bash
# VŽDY přes Alembic migrace!
docker compose exec backend alembic upgrade head
```

Viz: [ALEMBIC_DATABASE_MIGRATIONS.md](file:///home/zimmel/ai-learning-platform/.ai-context/learning/ALEMBIC_DATABASE_MIGRATIONS.md)

---

## ⚡ Klíčové koncepty

### Primary Key (Primární klíč)
Unikátní identifikátor každého řádku. U nás typicky `id` (auto-increment).

```sql
id SERIAL PRIMARY KEY  -- 1, 2, 3, 4...
```

### Foreign Key (Cizí klíč)
Odkaz na jiný řádek v jiné tabulce. Zajišťuje konzistenci.

```sql
-- UserProgress odkazuje na User
user_id INTEGER REFERENCES users(id)
```

### Index
Urychluje vyhledávání. Jako rejstřík v knize.

```sql
-- Rychle najít uživatele podle emailu
CREATE INDEX idx_users_email ON users(email);
```

### ACID Transakce
- **A**tomicity: Všechno nebo nic
- **C**onsistency: Data jsou vždy validní
- **I**solation: Transakce se neovlivňují
- **D**urability: Uloženo = uloženo navždy

---

## 🔐 Bezpečnost v produkci

### Co NIKDY nedělat
```bash
# ❌ NIKDY na produkci!
docker compose down -v  # Smaže databázi!
```

### Co VŽDY dělat
1. **Pravidelný backup** (automaticky na Hetzner)
2. **Silná hesla** (v environment variables, ne v kódu)
3. **Přístup jen lokálně** (db port není vystaven do internetu)

---

## 💡 Proč PostgreSQL a ne jiné?

| Databáze | Použití |
|----------|---------|
| **PostgreSQL** ✅ | Komplexní aplikace, ACID, JSON podpora |
| MySQL | Jednodušší, web hosting |
| SQLite | Lokální soubor, malé aplikace |
| MongoDB | Dokumentová (NoSQL), bez schématu |

PostgreSQL má nejlepší:
- JSON podpora (můžeme ukládat `completed_labs` jako JSON)
- Rozšíření (full-text search, geo data)
- Komunita a stabilita

---

## 📊 Naše konfigurace

```yaml
# docker-compose.yml
db:
  image: postgres:15
  environment:
    POSTGRES_USER: postgres
    POSTGRES_PASSWORD: ${DB_PASSWORD}
    POSTGRES_DB: ai_learning
  volumes:
    - postgres_data:/var/lib/postgresql/data
```

- **Port:** 5432 (interně v Docker network)
- **Volume:** `postgres_data` - data přežijí restart
- **Verze:** PostgreSQL 15

---

*Vytvořeno: 2025-12-10*  
*Souvisí s: [ALEMBIC_DATABASE_MIGRATIONS.md](file:///home/zimmel/ai-learning-platform/.ai-context/learning/ALEMBIC_DATABASE_MIGRATIONS.md), [ARCHITECTURE.md](file:///home/zimmel/ai-learning-platform/.ai-context/core/ARCHITECTURE.md)*
