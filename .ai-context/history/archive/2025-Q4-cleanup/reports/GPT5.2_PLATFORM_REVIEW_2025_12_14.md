# GPT-5.2 Platform Review (via Codex CLI)

**Date:** 2025-12-14
**Agent:** GPT-5.2 (Codex CLI `codex exec`)
**Scope:** Full platform architecture + all 18 lessons

---

## Executive Summary

Comprehensive review of AI Learning Platform by GPT-5.2 covering:
- Architecture & security
- Content quality & gaps
- Technical debt
- 2025 feature recommendations

**Overall Assessment:** Solid foundation with gamification working well. Critical security issues need immediate attention before production deployment.

---

## 1. Security Red Flags (CRITICAL)

| Issue | File:Line | Risk Level | Impact |
|-------|-----------|------------|--------|
| Docker socket mounted | `docker-compose.yml:40` | 🔴 CRITICAL | RCE → host takeover |
| JWT SECRET_KEY = "changeme" | `backend/app/config.py:11` | 🔴 CRITICAL | Auth bypass |
| Token in localStorage | `frontend/context/AuthContext.tsx:54` | 🟠 HIGH | XSS blast radius |
| HSTS in dev mode | `frontend/middleware.ts` | 🟡 MEDIUM | Dev friction |

### Recommended Actions:
1. **Docker socket** - Remove or use Docker-in-Docker for sandbox
2. **JWT secret** - Use environment variable with strong default validation
3. **Token storage** - Move to httpOnly cookies or sessionStorage
4. **HSTS** - Make conditional on `NODE_ENV=production`

---

## 2. Architecture Highlights

### What's Working Well ✅
- **Gamification loop** (Jedi/Sith + XP + badges) creates engagement
- **Bilingual content** (EN/CZ) with proper i18n routing
- **MDX-based lessons** allow rich interactive content
- **Docker Compose** setup is clean and reproducible
- **FastAPI + SQLAlchemy** backend is well-structured

### Areas for Improvement 🔧
| Area | Current State | Recommended |
|------|---------------|-------------|
| DB Migrations | `create_all` in seed.py | Alembic migrations only |
| Content Loading | Upsert by title | Upsert by slug (stable identifier) |
| Frontend State | Context API | Consider Zustand for complex state |
| Error Handling | Basic try/catch | Global error boundary needed |

---

## 3. Content Quality Assessment

### Lesson Scores (1-10)

| # | Lesson | Course | Score | Labs | Quiz | Notes |
|---|--------|--------|-------|------|------|-------|
| 1 | Getting Started | prompt-eng | 8 | 2 | ✅ | Solid intro |
| 2 | ChatGPT Basics | prompt-eng | 8 | 3 | ✅ | Good progression |
| 3 | Prompt Engineering | prompt-eng | 9 | 4 | ✅ | Strong labs |
| 4 | Advanced Prompting | prompt-eng | 8 | 3 | ✅ | Good depth |
| 5 | AI-Powered Dev | prompt-eng | 9 | 3 | ✅ | Excellent, timely |
| 6 | Chain-of-Thought | advanced | 8 | 2 | ✅ | Clear examples |
| 7 | Few-Shot Learning | advanced | 8 | 3 | ✅ | Practical |
| 8 | Reasoning Models | advanced | 9 | 2 | ✅ | Hot topic! |
| 9 | RAG Fundamentals | deep-dive | 8 | 2 | ✅ | Good foundation |
| 10 | Fine-Tuning | deep-dive | 3 | 0 | ❌ | STUB - Coming Soon |
| 11 | Prompt Injection | safety | 9 | 3 | ✅ | Critical topic |
| 12 | AI Safety | safety | 8 | 2 | ✅ | Important |
| 13 | History of AI | basics | 7 | 1 | ✅ | Context-setting |
| 14 | How AI Works | basics | 8 | 2 | ✅ | Clear explanations |
| 15 | Types of AI | basics | 7 | 1 | ✅ | Good overview |
| 16 | AI Glossary | basics | 7 | 0 | ✅ | Reference material |
| 17 | AI Ethics | basics | 8 | 2 | ✅ | Thoughtful |
| 18 | AI Myths | basics | 7 | 1 | ✅ | Debunking useful |

**Average Score:** 7.8/10
**Stub Count:** 1 (Fine-Tuning)

### Content Gaps Identified
1. **Fine-Tuning** - Only stub, needs full content
2. **No Capstone Projects** - Missing "ship something real" exercises
3. **No Evaluation Track** - How to measure AI output quality
4. **No Local/Privacy Track** - Ollama, local models, privacy-first AI
5. **No Agent Orchestration** - LangGraph, CrewAI, multi-agent patterns

---

## 4. 2025 Feature Recommendations

### Priority 1: Security Hardening (Before Production)
- [ ] Remove Docker socket mount
- [ ] Enforce strong JWT secret
- [ ] Move tokens to httpOnly cookies
- [ ] Add rate limiting to all endpoints
- [ ] Security audit before public launch

### Priority 2: Content Expansion
- [ ] Complete Fine-Tuning lesson
- [ ] Add capstone projects to each course
- [ ] Create "AI Evaluation" mini-course
- [ ] Add "Local AI" track (Ollama, privacy)

### Priority 3: Feature Ideas
| Feature | Description | Impact |
|---------|-------------|--------|
| **Agent Flight Simulator** | Interactive tool-calling sandbox | High engagement |
| **Adaptive Learning Path** | XP + quiz weakness → personalized | Retention boost |
| **Autograded Labs** | Sandboxed verification of exercises | Scalability |
| **Local-first Mode** | Ollama integration, offline capable | Privacy market |
| **Course Capstones** | "Ship a thing" project templates | Portfolio value |
| **Community Showcase** | Student project gallery | Social proof |

---

## 5. Technical Debt Priority

| Priority | Item | Effort | Impact |
|----------|------|--------|--------|
| 1 | Security hardening | Medium | Critical |
| 2 | Alembic migrations only | Low | Data safety |
| 3 | Content upsert by slug | Low | Stability |
| 4 | Frontend error boundary | Low | UX |
| 5 | Test coverage increase | High | Confidence |
| 6 | MDX AST compilation | Medium | Performance |

---

## 6. Action Items

### Immediate (This Week)
1. ⚠️ Fix Docker socket security issue
2. ⚠️ Enforce strong JWT secret validation
3. 📝 Complete Fine-Tuning lesson content

### Short-term (This Month)
4. 🔄 Migrate to Alembic-only DB changes
5. 🛡️ Move tokens from localStorage to httpOnly cookies
6. 📚 Add one capstone project to Course 1

### Medium-term (Q1 2025)
7. 🧪 Implement autograded labs prototype
8. 🎯 Add adaptive learning path logic
9. 🌐 Create "Local AI" course track

---

## Appendix: Files Reviewed

```
docker-compose.yml
backend/app/main.py
backend/app/config.py
backend/app/models.py
backend/seed.py
frontend/context/AuthContext.tsx
frontend/middleware.ts
content/courses/*/lessons/*/content.mdx (18 files)
content/courses/*/lessons/*/quiz.json (17 files)
```

---

*Report generated by GPT-5.2 via Codex CLI, reviewed by Claude Code*
