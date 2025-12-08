# 🗄️ Alembic: Databázové migrace pro produkci

> **Proč používáme Alembic místo `create_all()`?**  
> Protože na produkci jsou **reální uživatelé** a nesmíme jim smazat data!

---

## Co je Alembic?

**Alembic** je nástroj pro **databázové migrace** pro SQLAlchemy (Python ORM). Je to v podstatě **"version control" pro databázovou schému** - podobně jako Git sleduje změny v kódu, Alembic sleduje změny v databázi.

---

## 🎯 Vysvětlení pro laika

### Představ si databázi jako Excel tabulku

Máš tabulku `users` se sloupci: `id`, `email`, `password`.

| id | email | password |
|----|-------|----------|
| 1 | petr@email.cz | abc123 |
| 2 | jana@email.cz | xyz789 |

### Co se stane, když chceš přidat sloupec `xp`?

#### ❌ Špatný způsob: `create_all()` (pouze dev!)

```python
# V kódu přidáš: xp = Column(Integer)
# A pak spustíš create_all()
```

**Problém**: `create_all()` dělá toto:
- "Tabulka `users` už existuje? → **Nic nedělám!**"
- Nový sloupec se **nepřidá**
- Nebo horší varianta: smaže tabulku a vytvoří novou → **Petra a Janu jsi právě smazal! 💀**

#### ✅ Správný způsob: Alembic (produkce)

```python
# Alembic vytvoří "migrační skript":
def upgrade():
    op.add_column('users', Column('xp', Integer, default=0))

def downgrade():
    op.drop_column('users', 'xp')
```

**Co se stane:**
1. Alembic **opatrně přidá sloupec** `xp` k existující tabulce
2. Petra a Jana **zůstanou v databázi** ✅
3. Jejich data se neztratí ✅

---

## 🏠 Analogie: Rekonstrukce domu

| Situace | `create_all()` (dev) | Alembic (produkce) |
|---------|---------------------|-------------------|
| "Chci přidat koupelnu" | Zbourám dům a postavím nový s koupelnou | Přístavba - přidám jen koupelnu |
| Důsledek | Všichni musí vystěhovat! | Nikdo si ničeho nevšimne |

---

## 📋 Kdy co použít

| Prostředí | Nástroj | Proč |
|-----------|---------|------|
| **Lokálně (dev)** | `create_all()` v `seed.py` | Databázi můžeš smazat a vytvořit znovu (`down -v`), je to jen testovací |
| **Produkce (VPS)** | `alembic upgrade head` | Na produkci jsou **reální uživatelé** - nesmíš jim smazat účty! |

---

## 🔧 Typický workflow

### 1. Vytvoření migrace (po změně modelů)
```bash
alembic revision --autogenerate -m "Add user_xp column"
```

### 2. Aplikování migrací na databázi
```bash
alembic upgrade head
```

### 3. Kontrola aktuálního stavu
```bash
alembic current
```

### 4. Rollback (vrátit poslední migraci)
```bash
alembic downgrade -1
```

---

## ⚡ Výhody Alembic vs ruční SQL

| Ruční SQL | Alembic |
|-----------|---------|
| ❌ Nelze snadno trackovat změny | ✅ Každá změna je jako commit |
| ❌ Riziková synchronizace prostředí | ✅ Automatická konzistence dev/prod |
| ❌ Těžké rollbacky | ✅ `alembic downgrade -1` |
| ❌ Chyby při psaní ALTER TABLE | ✅ Automaticky generovaný SQL |

---

## ⚠️ Důležité pravidlo

Z `DEV_AND_DEPLOYMENT_GUIDE.md`:

> **WARNING: Do NOT use `down -v` on production!**

Protože `-v` = smaže volumes = **smaže všechna data včetně databáze!**

Na produkci použij:
```bash
docker compose -f docker-compose.prod.yml down
docker compose -f docker-compose.prod.yml up -d --build
docker compose -f docker-compose.prod.yml exec backend alembic upgrade head
```

---

*Vytvořeno: 2025-12-08*  
*Souvisí s: [DEV_AND_DEPLOYMENT_GUIDE.md](file:///home/zimmel/ai-learning-platform/.ai-context/workflows/DEV_AND_DEPLOYMENT_GUIDE.md)*
