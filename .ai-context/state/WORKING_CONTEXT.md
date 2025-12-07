# Working Context

**Last Updated:** 2025-12-07 (Cycle 55)
**Cycle:** 55
**Agent:** Claude Code (Opus 4.5)
**Status:** 🟢 COURSE CLEANUP COMPLETE → Ready for next lesson

---

## 🎯 Current Task

**Course Structure Cleanup & Full QA** - ✅ COMPLETE

### This Session Completed:
1. ✅ Moved `_archive_old_structure` out of lessons folder (was being loaded by backend)
2. ✅ Deleted empty placeholder folders (03, 05, 06, 07-dup, 08-11)
3. ✅ Nuclear DB reset to remove old lesson records
4. ✅ Full Visual QA - all 4 lessons render correctly with Czech titles

### Course Structure Now (Clean):
```
content/courses/practical-prompt-engineering/lessons/
├── 01-prompt-architecture/     ✅
├── 02-prompt-injection/        ✅
├── 04-local-intelligence/      ✅
└── 07-ai-powered-development/  ✅
```

### Visual QA Results (Playwright):
- ✅ Course shows exactly 4 lessons (no duplicates, no archive content)
- ✅ All Czech titles display correctly
- ✅ Lab counts: 2, 2, 2, 2 (all correct)
- ✅ Reading times: 15, 15, 30, 35 min (all correct)
- ✅ Progress: "3 z 4 lekcí dokončeno" (75%)

---

## 📋 QA Workflow (NEW in CLAUDE.md!)

**Povinné po KAŽDÉM content generation:**
```
1. docker compose restart backend
2. docker compose logs backend | grep "Processing lesson"
3. Playwright: login → course → lesson → verify rendering
4. Check: lab count, reading time, code blocks, tables
```

**Callout Format Requirement:**
```markdown
# SPRÁVNĚ (backend parsuje):
⏳ **Reading Time:** XX min | 🧪 **[N] Labs Included**

# ŠPATNĚ (backend NEPARSUJE):
**Time:** ~35 min read | **Labs:** 2 practical exercises
```

---

## ⏳ NEXT STEPS

### Priorita 1: NEXT (pick one)
| Lekce | Akce | Effort | Podklady |
|-------|------|--------|----------|
| 03 | Reliability, Testing & Cost | 3h | Promptfoo, Helicone |
| 05 | Structured Data Extraction | 2h | Instructor, Pydantic |
| 06 | GraphRAG + Hybrid Search | 4h | ChromaDB, LangChain |
| 10 | LangGraph Focus | 4h | Agent frameworks |

### Lesson Progress:
| # | Lesson | Status |
|---|--------|--------|
| 01 | Prompt Architecture Masterclass | ✅ Complete + QA ✓ |
| 02 | Advanced Reasoning & Red Teaming | ✅ Complete + QA ✓ |
| 03 | Reliability, Testing & Cost | ⏳ Pending |
| 04 | Local Intelligence | ✅ Complete + QA ✓ |
| 05 | Structured Data Extraction | ⏳ Pending |
| 06 | RAG & Knowledge Systems | ⏳ Pending |
| 07 | AI-Powered Development (MCP) | ✅ Complete + QA ✓ |
| 08 | No-Code Automation | ⏳ Pending |
| 09 | Docker & Self-Hosting | ⏳ Pending |
| 10 | Agentic Orchestration | ⏳ Pending |
| 11 | Capstone - Multi-Agent Swarm | ⏳ Pending |

---

## 📊 Technical Notes

### ContentLoader Behavior:
- **ADDS/UPDATES** lessons when files exist
- **DOES NOT DELETE** lessons when files are removed
- **Solution:** Nuclear DB reset (`docker volume rm postgres_data`) when removing lessons

### Callout Parsing Regex (content_loader.py:103):
```python
lab_match = re.search(r"🧪 \*\*\[?(\d+)\]? Labs? Included\*\*", content)
```
- Expects: `🧪 **[2] Labs Included**` or `🧪 **2 Labs Included**`
- Does NOT match: `**Labs:** 2 practical exercises`

### Quiz Format:
Backend supports both `"correct_answer"` and `"correct"` keys.

### Session Invalidation After DB Reset:
- JWT tokens become invalid after user table is recreated
- **Fix:** Logout stale session, login fresh

---

## 🔗 Quick Reference

| Need... | File |
|---------|------|
| QA Workflow | `CLAUDE.md` (lines 73-123) |
| Content blocks | `Perplexity_assist/CONTENT_FOUNDATION_SYNTHESIS.md` |
| Shared rules | `AGENT_PROTOCOL.md` |
| Content guidelines | `core/CONTENT_GUIDELINES.md` |

---

*This file replaces LAST_SESSION.md + CURRENT_TASK.md*
*Update this file continuously during work*
