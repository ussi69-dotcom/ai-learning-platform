# Working Context

**Last Updated:** 2025-12-09 18:00 (Agent: Claude Code)
**Last Commit:** `4511c87` docs: Major Edutainment strategy update to references.md
**Status:** 🟢 READY - Edutainment vize definována, akční plán připraven

---

## 🎯 Current State

### Completed Lessons (Dec 2025)
| Lesson | Folder | Status |
|--------|--------|--------|
| 01 - Prompt Architecture | `01-prompt-architecture/` | ✅ Complete |
| 02 - Prompt Injection | `02-prompt-injection/` | ✅ Complete |
| 04 - Local Intelligence | `04-local-intelligence/` | ✅ Complete |
| 05 - AI-Powered Development | `05-ai-powered-development/` | ✅ Complete |

### Recent Feature: Video System (Dec 9)
| Component | Status | Notes |
|-----------|--------|-------|
| VideoPlayer PIN | ✅ Done | Sticky video during scroll |
| VideoSwitcher | ✅ Done | Alternative videos in MDX |
| Video Registry | ✅ Done | Global state for video switching |
| All lessons updated | ✅ Done | Alt videos added to all 4 lessons |

### 🆕 Edutainment Strategy (Dec 9)
| Item | Status | Notes |
|------|--------|-------|
| Video research analysis | ✅ Done | Gemini + Perplexity (97+ citations) |
| Edutainment vize | ✅ Done | 4 pilíře: Energie, Vizualizace, ROI, Gamifikace |
| Tvůrci profily | ✅ Done | NetworkChuck, 3B1B, Fireship, Jeff Su, ColdFusion |
| AI Basics kurz | 📋 Planned | 7 lekcí s Edutainment standardem |
| Akční plán 4 fází | ✅ Done | Hook → Depth → Advanced → Viral |

---

## 📋 Recent Commits (Last 10)

```
4511c87 docs: Major Edutainment strategy update to references.md
fc260e4 docs: Update WORKING_CONTEXT after references.md update
14592b2 docs: Comprehensive references.md update with STAR videos section
2a7f995 docs: Update WORKING_CONTEXT after video validation
1d77317 fix: Video validation fixes for all lessons
f0a7cc1 fix(docs): Add WORKING_CONTEXT drift prevention protocol
c9030ef docs: Update MEMORY.md and artifact with Video System details
cc924d0 fix: Video alternatives for all lessons per user request
a555309 fix: L02 video - use verified MIT Monk instead of blocked Computerphile
0f5c61b fix: L02 video ID - Computerphile Qy8M7qPj2Wk verified
```

---

## 📝 Mini Session Log (Last 5)

| Date | Agent | What |
|------|-------|------|
| 2025-12-09 | Claude | **Edutainment strategy** - Major references.md overhaul s Gemini research |
| 2025-12-09 | Claude | Comprehensive references.md update with STAR videos section |
| 2025-12-09 | Claude | Video validation: L02 main fixed, L04/L05 VideoSwitcher JSON fixed |
| 2025-12-09 | Claude | Fix outdated WORKING_CONTEXT (was 8 commits behind!) |
| 2025-12-09 | ? | Video alternatives added to all lessons |

---

## ⚠️ Known Issues

1. ~~**WORKING_CONTEXT drift**~~ ✅ FIXED - Added stricter rules to AGENT_PROTOCOL.md
2. **VideoSwitcher JSON format** - Must use single-line valid JSON, not multiline JS objects
   - Bad: `{ id: "...", title: "..." }` (JS object syntax)
   - Good: `{"id":"...","title":"..."}` (valid JSON)

---

## 🔗 Quick Reference

| Need | Location |
|------|----------|
| Video System docs | `MEMORY.md` → "Video System Architecture" |
| Video research & assignments | `.ai-context/references.md` |
| Edutainment vize | `.ai-context/references.md` → "EDUTAINMENT VIZE" |
| STAR Videos (new lessons) | `.ai-context/references.md` → "STAR VIDEOS" |
| Akční plán 4 fází | `.ai-context/references.md` → "KONKRÉTNÍ AKČNÍ PLÁN" |
| Content foundation | `.ai-context/Perplexity_assist/CONTENT_FOUNDATION_SYNTHESIS.md` |
| Lesson template | `content/courses/.../01-prompt-architecture/content.mdx` |
| VideoPlayer | `frontend/components/VideoPlayer.tsx` |
| VideoSwitcher | `frontend/components/mdx/VideoSwitcher.tsx` |

---

*This file is the SINGLE SOURCE OF TRUTH for current project state.*
*Updated by: Claude Code (2025-12-09 18:00)*
