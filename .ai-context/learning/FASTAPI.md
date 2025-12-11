# ⚡ FastAPI: Moderní Python Web Framework

> **Proč používáme FastAPI?**  
> Protože potřebujeme rychlé API s automatickou dokumentací a type safety - a Django/Flask jsou pomalejší a upovídanější!

---

## Co je FastAPI?

**FastAPI** je moderní **Python web framework** pro vytváření API. Je postavený na Starlette (asynchronní server) a Pydantic (validace dat). Nabízí:
- Automatickou OpenAPI dokumentaci
- Type hints = méně bugů
- Asynchronní podporu
- Extrémní rychlost

---

## 🎯 Vysvětlení pro laika

### API = Číšník v restauraci

| Restaurace | Web aplikace |
|------------|--------------|
| Ty (zákazník) | Frontend (React/Next.js) |
| Číšník | API (FastAPI) |
| Kuchyň | Databáze |

Zákazník nechodí do kuchyně. Číšník přijme objednávku, odnese ji kuchyni, a vrátí se s jídlem.

```
Frontend: "Chci seznam kurzů"
   ↓
FastAPI: GET /api/courses
   ↓
Databáze: SELECT * FROM courses
   ↓
FastAPI: {courses: [...]}
   ↓
Frontend: Zobrazí kurzy
```

---

## 🏗️ Jak to funguje v našem projektu

### Struktura backendu

```
backend/
├── main.py              # Hlavní aplikace
├── routers/
│   ├── lessons.py       # /lessons/* endpointy
│   ├── users.py         # /users/* endpointy
│   └── feedback.py      # /feedback/* endpointy
├── models.py            # SQLAlchemy modely
├── schemas.py           # Pydantic schemas (request/response)
├── database.py          # DB connection
└── seed.py              # Inicializace dat
```

### Jednoduchý endpoint

```python
# routers/lessons.py
from fastapi import APIRouter

router = APIRouter(prefix="/lessons", tags=["lessons"])

@router.get("/")
async def get_all_lessons():
    """Vrátí seznam všech lekcí"""
    lessons = db.query(Lesson).all()
    return lessons

@router.get("/{lesson_id}")
async def get_lesson(lesson_id: int):
    """Vrátí konkrétní lekci podle ID"""
    lesson = db.query(Lesson).filter(Lesson.id == lesson_id).first()
    return lesson
```

---

## ⚡ Klíčové koncepty

### 1. HTTP Metody

| Metoda | CRUD | Příklad |
|--------|------|---------|
| `GET` | Read | Získej data |
| `POST` | Create | Vytvoř nový záznam |
| `PUT` | Update | Aktualizuj celý záznam |
| `PATCH` | Update | Aktualizuj část záznamu |
| `DELETE` | Delete | Smaž záznam |

```python
@router.get("/lessons")              # Čtení
@router.post("/lessons")             # Vytvoření
@router.patch("/lessons/{id}")       # Aktualizace
@router.delete("/lessons/{id}")      # Smazání
```

### 2. Path & Query Parameters

```python
# Path parameter - povinný, v URL
@router.get("/lessons/{lesson_id}")
async def get_lesson(lesson_id: int):
    ...

# Query parameter - volitelný, za otazníkem
@router.get("/lessons")
async def list_lessons(lang: str = "en", limit: int = 10):
    # GET /lessons?lang=cs&limit=5
    ...
```

### 3. Pydantic Schemas (Validace)

```python
# schemas.py
from pydantic import BaseModel

class LessonCreate(BaseModel):
    title: str
    content: str
    xp: int = 100

class LessonResponse(BaseModel):
    id: int
    title: str
    content: str
    xp: int
    
    class Config:
        from_attributes = True  # Pro SQLAlchemy modely

# Použití
@router.post("/lessons", response_model=LessonResponse)
async def create_lesson(lesson: LessonCreate):
    # FastAPI automaticky validuje vstup proti LessonCreate
    # A výstup proti LessonResponse
    ...
```

### 4. Dependency Injection

```python
# Znovupoužitelná závislost pro aktuálního uživatele
async def get_current_user(token: str = Depends(oauth2_scheme)):
    user = decode_token(token)
    return user

@router.get("/profile")
async def get_profile(user: User = Depends(get_current_user)):
    # FastAPI automaticky získá uživatele
    return user
```

---

## 📋 Workflow v našem projektu

### 1. Přidání nového endpointu

```python
# 1. Vytvoř schema (schemas.py)
class QuizSubmit(BaseModel):
    answers: list[int]

class QuizResult(BaseModel):
    score: int
    passed: bool
    xp_earned: int

# 2. Přidej endpoint (routers/lessons.py)
@router.post("/{lesson_id}/quiz", response_model=QuizResult)
async def submit_quiz(
    lesson_id: int,
    submission: QuizSubmit,
    user: User = Depends(get_current_user)
):
    score = calculate_score(submission.answers)
    return QuizResult(score=score, passed=score > 70, xp_earned=50)
```

### 2. Testování endpointu

```bash
# Otevři Swagger UI
http://localhost:8000/docs

# Nebo použij curl
curl -X GET http://localhost:8000/lessons
```

### 3. Spuštění dev serveru

```bash
# Přes Docker (doporučeno)
docker compose up backend

# Nebo přímo
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

---

## 🔧 Základní příkazy

### V Docker kontejneru
```bash
# Spuštění
docker compose up backend

# Logy
docker compose logs -f backend

# Shell v kontejneru
docker compose exec backend bash

# Pytest
docker compose exec backend pytest
```

### Lokálně (pokud není Docker)
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

---

## 📖 Automatická dokumentace

FastAPI automaticky generuje:

### Swagger UI (`/docs`)
- Interaktivní dokumentace
- Můžeš endpointy testovat přímo v browseru
- Vidíš typy request/response

### ReDoc (`/redoc`)
- Čistá dokumentace pro zákazníky
- Hezčí layout

```
http://localhost:8000/docs   # Swagger
http://localhost:8000/redoc  # ReDoc
```

---

## 💡 Proč FastAPI?

| Framework | Rychlost | Type Safety | Dokumentace |
|-----------|----------|-------------|-------------|
| Django REST | ⚡⚡ | ❌ | Ruční |
| Flask | ⚡⚡ | ❌ | Ruční |
| **FastAPI** | ⚡⚡⚡⚡ | ✅ Pydantic | ✅ Auto |
| Express.js | ⚡⚡⚡ | ❌ (bez TS) | Ruční |

FastAPI je:
- **Rychlý** - srovnatelný s Node.js a Go
- **Type-safe** - chyby zachytí ještě před runtime
- **Self-documenting** - Swagger UI zdarma

---

## ⚠️ Časté chyby

### 1. Zapomenutý async
```python
# ❌ Blokuje event loop
@router.get("/data")
def get_data():  # chybí async
    return slow_database_call()

# ✅ Správně
@router.get("/data")
async def get_data():
    return await async_database_call()
```

### 2. Chybějící Depends pro auth
```python
# ❌ Kdokoli může přistupovat
@router.get("/admin")
async def admin_panel():
    return {"secret": "data"}

# ✅ Vyžaduje přihlášení
@router.get("/admin")
async def admin_panel(user: User = Depends(get_current_user)):
    return {"secret": "data"}
```

---

## 📚 Další zdroje

- [FastAPI dokumentace](https://fastapi.tiangolo.com/)
- [Pydantic docs](https://docs.pydantic.dev/)
- Náš backend: `backend/` složka

---

*Vytvořeno: 2025-12-10*  
*Souvisí s: [ARCHITECTURE.md](file:///home/zimmel/ai-learning-platform/.ai-context/core/ARCHITECTURE.md), [SQLALCHEMY.md](file:///home/zimmel/ai-learning-platform/.ai-context/learning/SQLALCHEMY.md)*
