# Working Context

**Last Updated:** 2025-12-09 16:30 (Agent: Claude Code)
**Last Commit:** `1d77317` fix: Video validation fixes for all lessons
**Status:** 🟢 READY - All video validations passed

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

---

## 📋 Recent Commits (Last 10)

```
1d77317 fix: Video validation fixes for all lessons
f0a7cc1 fix(docs): Add WORKING_CONTEXT drift prevention protocol
c9030ef docs: Update MEMORY.md and artifact with Video System details
cc924d0 fix: Video alternatives for all lessons per user request
a555309 fix: L02 video - use verified MIT Monk instead of blocked Computerphile
0f5c61b fix: L02 video ID - Computerphile Qy8M7qPj2Wk verified
6e6a947 fix: Correct video assignments per lesson
79140bb fix: VideoSwitcher single-line JSON + comprehensive references.md
84cd380 feat: Update videos for L01 & L02 based on research
d195e5c fix: VideoRegistry stacking bug when navigating between lessons
```

---

## 📝 Mini Session Log (Last 5)

| Date | Agent | What |
|------|-------|------|
| 2025-12-09 | Claude | Video validation: L02 main fixed, L04/L05 VideoSwitcher JSON fixed |
| 2025-12-09 | Claude | Fix outdated WORKING_CONTEXT (was 8 commits behind!) |
| 2025-12-09 | ? | Video alternatives added to all lessons |
| 2025-12-09 | ? | MEMORY.md updated with Video System docs |
| 2025-12-08 | Antigravity | Documentation system optimization |

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
| Content foundation | `.ai-context/Perplexity_assist/CONTENT_FOUNDATION_SYNTHESIS.md` |
| Lesson template | `content/courses/.../01-prompt-architecture/content.mdx` |
| VideoPlayer | `frontend/components/VideoPlayer.tsx` |
| VideoSwitcher | `frontend/components/mdx/VideoSwitcher.tsx` |

---

*This file is the SINGLE SOURCE OF TRUTH for current project state.*
*Updated by: Claude Code (2025-12-09 15:30)*
