# 🔴 Red Team Analysis: Documentation Review

**Role**: Fresh Developer with Docker/Git knowledge but zero project context.
**Goal**: Find every place where documentation is unclear, contradictory, or wrong.

---

## ✅ What Works (The Good)

### 1. Initial Setup (README.md)
- **Entry Point**: Clear. `git clone` → `docker compose up` → wait → login. This works.
- **Credentials**: Admin credentials are provided upfront. Good.
- **Structure**: The file structure diagram is helpful.

### 2. Agent Onboarding (INDEX.md)
- **Boot Sequence**: The "Start of Session" protocol is clear and sequential.
- **Hierarchy**: Core/State/Workflows/Learning/History is logical.

---

## ⚠️ Issues Found (The Bad)

### Issue 1: **Database Change Instructions Are Contradictory**
**Location**: `README.md` vs `MEMORY.md` vs `DEV_AND_DEPLOYMENT_GUIDE.md`

- **README.md** (Line 204-211): Says "Nuclear Reset" for schema changes.
- **MEMORY.md** (Line 25-27): Says you CAN use Nuclear Reset OR Alembic in dev.
- **DEV_AND_DEPLOYMENT_GUIDE.md** (Line 3): References a file that doesn't exist: `DEPLOYMENT_STRATEGY.md` (we deleted it!).

**Problem**: A new developer doesn't know which to follow. README implies Nuclear Reset is the ONLY way. MEMORY says there are two options. The guide references a ghost file.

**Fix Needed**:
1. Update `DEV_AND_DEPLOYMENT_GUIDE.md` line 3 to remove reference to `DEPLOYMENT_STRATEGY.md`.
2. Add a note in README.md: "For advanced users: See `.ai-context/workflows/DATABASE_MIGRATIONS.md` for migration-based workflow."

---

### Issue 2: **Missing `.env` File Creation Step**
**Location**: `README.md` Quick Start

The Quick Start says:
1. Clone repo
2. Run `docker compose up`

But `DEV_AND_DEPLOYMENT_GUIDE.md` (Line 22-44) shows you need a `.env` file with specific variables.

**Problem**: Does `docker compose up` work WITHOUT `.env`? 
- Looking at `docker-compose.yml`, it has `env_file: .env`.
- If `.env` doesn't exist, Docker Compose will fail or use defaults.

**Reality Check**: We created `.env` during this session. But a truly fresh clone won't have it (it's in `.gitignore`).

**Fix Needed**: Add a step in README.md Quick Start:
```markdown
### 2. Create Environment File
```bash
cp .env.prod.example .env
# Edit .env if needed, or use defaults for local dev
```
```

---

### Issue 3: **Alembic Workflow Not Linked from README**
**Location**: `README.md` line 202

README says: "Detaily: Viz `.ai-context/CONTENT_GUIDELINES.md`"

But there's NO mention of `DATABASE_MIGRATIONS.md` anywhere in README.

**Problem**: A new developer who wants to learn about migrations won't find the guide unless they browse `.ai-context/workflows/`.

**Fix Needed**: Add to README.md under "Změna DB Schématu":
```markdown
📚 **Pro produkční nasazení**: Viz `.ai-context/workflows/DATABASE_MIGRATIONS.md` (Alembic workflow).
```

---

### Issue 4: **Port Conflicts Not Tested**
**Location**: `README.md` Troubleshooting (Line 180-190)

The troubleshooting section says to change ports in `docker-compose.yml`, but doesn't mention that:
1. You need to rebuild: `docker compose up -d --build`
2. Frontend also has `NEXT_PUBLIC_API_URL` in `.env` which might need updating.

**Problem**: Incomplete instruction could leave developer confused why frontend can't reach backend after port change.

**Fix Needed**: Expand that section with the rebuild step and env var note.

---

### Issue 5: **"AGENT-STATE.md" Reference is Dead**
**Location**: `README.md` line 261

```markdown
- `AGENT-STATE.md` - aktuální stav projektu
```

**Problem**: This file doesn't exist. We have `CURRENT_TASK.md` and `SESSION_LOG.md` in `state/`, but no `AGENT-STATE.md`.

**Fix Needed**: Replace with:
```markdown
- `state/CURRENT_TASK.md` - aktuální cíle
- `state/SESSION_LOG.md` - historie změn
```

---

### Issue 6: **DEV_AND_DEPLOYMENT_GUIDE References Ghost File**
**Location**: `DEV_AND_DEPLOYMENT_GUIDE.md` line 3

```markdown
It assumes you have read and understood the `.ai-context/workflows/DEPLOYMENT_STRATEGY.md` file.
```

**Problem**: We deleted `DEPLOYMENT_STRATEGY.md`. This reference is broken.

**Fix Needed**: Remove that line or replace with: "This guide assumes you understand the 12-Factor App principles and environment-based configuration."

---

## 🔍 Missing Information (The Gaps)

### Gap 1: **No Rollback Instructions**
If Alembic migration fails in production, what do you do? There's no `alembic downgrade` example in `DATABASE_MIGRATIONS.md`.

### Gap 2: **No Testing Instructions**
README mentions "Nuclear Reset" and "Restarts" but doesn't say HOW to test if things work. Should I run `pytest`? Check logs? Hit an endpoint?

### Gap 3: **No Explanation of n8n**
`docker-compose.yml` includes an `n8n` service, but it's never mentioned in README or docs. What is it for? Why does it share the DB?

---

## 🎯 Summary

**Critical Issues**: 3 (Dead references, missing .env step, contradictory DB instructions)
**Minor Issues**: 3 (Missing links, incomplete troubleshooting, no rollback guide)
**Missing Info**: 3 (n8n, testing, advanced scenarios)

**Recommendation**: Fix the critical issues immediately. The minor ones can be addressed iteratively.
