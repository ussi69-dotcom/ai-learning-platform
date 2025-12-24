# Working Context

**Last Updated:** 2025-12-24 01:08 (Agent: Codex GPT-5.2)

## 🚦 Current Status: Doc stack cleanup + mentor follow-ups
- **Boot sync:** Updated to match `git log -1` at `682d93c`.
- **Latest commits:** `682d93c` (refresh research references/ideas), `fb22333` (archive one-off prompts), `9ac5172` (mentor feature), `09bad03` (orchestration/verdict alignment).
- **Active task:** Continue cleanup of remaining uncommitted changes (tests, local configs, artifacts).
- **Note:** Audit report saved: `.ai-context/reports/DOC_STACK_AUDIT_2025_12_23.md`.
- **Note:** Executed T1-T5 for Gemini lesson gaps: added /api backend prefix, mobile fallback for local LLM diagram, updated pricing/model references, Copilot GA notes, archived old PPE structure, added diagram gallery + mobile render test, and documented deprecation/decay audit policy.
- **Note:** Ran `npm run verify`: ESLint warnings only; TypeScript/build succeeded after fixing `frontend/components/AIMentor.tsx`. Moved local visual debug scripts out of `frontend/` to `scripts/visual/` to avoid lint errors.
- **Note:** Ran full `npm run test:visual`: 108 passed, 9 skipped.
- **Note:** Perplexity re-enabled for manual quick research + daily digest; use sparingly to conserve API calls.
- **Note:** Gemini Deep Research attempt failed: CLI model returned "Requested entity was not found"; python script requires GOOGLE_API_KEY/GEMINI_API_KEY (not in `.env`). Created `.venv` and installed `google-genai` to enable script once key is provided.
- **Note:** Ran Gemini 3 Pro (non-deep) research for CPU-only RAG mentor stack. Output saved to `/tmp/gemini-research-local-rag.txt`.
- **Note:** Ran Gemini Deep Research via `backend/scripts/gemini_deep_research.py`. Report saved to `.ai-context/Perplexity_assist/gemini_research_20251222_205643.md`.
- **Note:** Ran updated Gemini Deep Research for latest 7–9B models. Report saved to `.ai-context/Perplexity_assist/gemini_research_20251222_212627.md`.
- **Note:** Ran Gemini Deep Research for Apriel-1.6-15B-Thinker. Report saved to `.ai-context/Perplexity_assist/gemini_research_20251222_215737.md`.
- **Note:** Built `llama.cpp` in `/home/deploy/llama.cpp`, downloaded GGUF models to `/home/deploy/models`, and added helper scripts in `scripts/llm/`.
- **Note:** Bench results (512 prompt / 128 gen, Q4_K_M): Qwen2.5 7B ~120.8 pp t/s, ~11.7 gen t/s; DeepSeek R1 Distill Qwen 7B ~120.6 pp t/s, ~11.7 gen t/s; Apriel 15B ~61.9 pp t/s, ~6.1 gen t/s. Raw JSON in `/tmp/bench-*.json`.
- **Note:** Logged multi-agent brainstorm ideas in `.ai-context/IDEAS.md`.
- **Note:** Built custom llama.cpp OpenBLAS image and fixed missing libmtmd/libcurl; mentor containers running and `/mentor/health` returns healthy.
- **Note:** Playwright visual suite passes (`PLAYWRIGHT_BASE_URL=http://localhost:3001 npm run test:visual`).
- **Note:** Incident report created: `.ai-context/history/incidents/2025-12-23-mentor-openblas-libmtmd.md`.
- **Note:** Swapped mentor-fast model to `Qwen3-4B-Instruct-2507-Q4_K_M.gguf`.
- **Note:** Removed other mentor modes/services; Qwen3 fast is the only model with UI info label.
- **Note:** Qwen3 4B Q4_K_M bench (llama-bench, 512 prompt / 128 gen): ~202 prompt tok/s, ~20 gen tok/s. Results saved to `/tmp/bench-qwen3-4b-q4.json`.
- **Note:** A/B bench threads: t16 prompt ~202 tok/s, gen ~20 tok/s; t12 prompt ~189 tok/s, gen ~20.7 tok/s → kept 16 threads. Results in `/tmp/bench-qwen3-4b-q4-t12.json`.
- **Note:** Increased mentor max tokens to 320 and server n-predict to 320; added auto-continue on length to prevent truncated answers.
- **Note:** Mentor UI expanded to near top bar, themed scrollbar, and suggestions now adapt to conversation context.
- **Note:** Suggestion engine dedupes acronyms and adds follow-up prompts; mentor timeout raised to 60s to reduce offline 503s.
- **Note:** Recreated backend container to pick up mentor timeout/tokens from `.env`; mentor chat now stable in repeated calls.
- **Note:** AuthContext now provides safe defaults to avoid QA render 500s when provider is missing; Playwright visual suite passes again.
- **Note:** Added single silent retry for mentor chat/suggestions on frontend; removed unused Phi/Deep/Apriel/Qwen2.5 models from `/home/deploy/models`.

## 🎯 Current Task: MASTERPIECE Upgrade - Beginner + Intermediate Complete
**Started:** 2025-12-21 (Session 8)
**Status:** ✅ Completed - all beginner + intermediate lessons upgraded and visual QA captured

### Context Sync (Dec 21, 2025)
- **Detected drift:** WORKING_CONTEXT hash outdated vs `git log -1`.
- **Latest commits:** `10cbfc1` (fix L04 MASTERPIECE), `39abe63` (UI contrast), `09e5ca7` (workflow v7).

### Key Focus (Session 8)
- **Beginner:** L06 "AI at Work" + L07 "Course Summary" upgraded to MASTERPIECE
- **Intermediate:** Practical Prompt Engineering (all lessons) upgraded to MASTERPIECE
- **Workflow:** MASTERPIECE workflow updated to Codex-operator + Claude opposition/visual QA
- **Visual QA:** Playwright screenshots captured for all updated lessons

### MASTERPIECE Progress (ai-basics-beginner)

| Lesson | Status | Score | Notes |
|--------|--------|-------|-------|
| L01 What is AI | ✅ MASTERPIECE | 59/60 | Model verification rules, mobile SVG |
| L02 How Does AI Learn | ✅ MASTERPIECE | 59/60 | 5 new diagrams, RLHF Lab |
| L03 LLMs Explained | ✅ MASTERPIECE | 59/60 | 4 videos, 6 diagrams |
| L04 Your First Prompt | ✅ MASTERPIECE | 59/60 | Advanced prompting labs |
| L05 The Dark Side | ✅ MASTERPIECE | 59/60 | Dual gate: Gemini + Codex |
| L06 AI at Work | ✅ MASTERPIECE | 59/60 | Work Trend Index stats, 4 videos |
| L07 Course Summary | ✅ MASTERPIECE | 59/60 | New toolkit + next mission path |

### MASTERPIECE Progress (practical-prompt-engineering)

| Lesson | Status | Score | Notes |
|--------|--------|-------|-------|
| L01 Prompt Architecture | ✅ MASTERPIECE | 59/60 | New videos + model table refresh |
| L02 Prompt Injection | ✅ MASTERPIECE | 59/60 | OWASP/DeepMind updates, safer CoT |
| L04 Local Intelligence | ✅ MASTERPIECE | 59/60 | Llama 3/Qwen2/DeepSeek updates |
| L05 AI-Powered Development | ✅ MASTERPIECE | 59/60 | MCP + context files refreshed |
| L06 Claude Code Mastery | ✅ MASTERPIECE | 59/60 | v2.0 retained, visuals verified |
| L07 Antigravity Mastery | ✅ MASTERPIECE | 59/60 | Visuals swapped to MDXImage |

### Visual QA (Session 8)
- **Playwright output:** `/tmp/playwright-mcp-output/1766360199498/masterpiece-visual/`

---

## 🎯 Previous Task: Platform-wide Visual QA
**Started:** 2025-12-21 (Session 6)
**Status:** ✅ COMPLETED

### Visual QA Workflow (KONTEXT-SAVING!)
```
1. Claude: Playwright screenshot → uloží do visual_tests/
2. Claude: Spawn Task subagent s obrázkem → "Evaluate this screenshot"
3. Subagent: Analyzuje, vrátí findings
4. Claude: Dokumentuje návrhy změn
```
**Důvod:** Playwright snapshoty žerou 14k+ tokenů. Delegace na subagenty šetří hlavní context.

### Visual QA Results (Dec 21, 2025)

| Page | Verdict | Score | Key Notes |
|------|---------|-------|-----------|
| Homepage (`/`) | ✅ PASS | 8.5/10 | Clean layout, dark mode works |
| Login | ✅ PASS | 9/10 | Solid auth UI, good contrast |
| Register | ✅ PASS | 9/10 | Password validation visible |
| Profile | ✅ PASS | 8.5/10 | Minor contrast issues (helper text) |
| Course listing | ✅ CONDITIONAL | - | Metadata badge contrast could improve |
| Lesson 01 (L01) | ✅ PASS | - | All components working |
| Lesson 02 (L02) | ✅ PASS | - | VideoSwitcher OK, navigation works |
| Lesson 03 (L03) | ✅ PASS | - | Ready for release |

**Screenshots saved:** `.playwright-mcp/visual_tests/`

### Proposed UX Improvements (Nice-to-Have)

#### P1 - Profile Page
| Issue | Current | Proposed Fix |
|-------|---------|--------------|
| XP helper text low contrast | `text-slate-400` | `text-slate-300 dark:text-slate-400` |
| Avatar gear icon subtle | No hover effect | Add `hover:scale-110 transition` |
| Achievement icons inconsistent | Varying visual weight | Normalize to 24px with consistent stroke |

#### P2 - Course Listing
| Issue | Current | Proposed Fix |
|-------|---------|--------------|
| Time/Labs badges low contrast | Light gray on dark | `bg-slate-700 text-slate-200` |

#### P3 - General (No Action Needed)
- All lesson pages render correctly
- VideoSwitcher works across all lessons
- Dark mode (Sith) theme consistent
- Navigation flows smoothly
- No broken images or layouts

### Technical Issues Found
| Issue | Severity | Status |
|-------|----------|--------|
| Session hydration delay | Low | Known - 2-3s wait needed after nav |
| Cookie persistence on refresh | Low | Works after hydration |

**Conclusion:** Platform is production-ready. P1/P2 improvements are cosmetic enhancements, not blockers.

---

## 🎯 Previous Task: MASTERPIECE Upgrade - ai-basics L03 ✅
**Started:** 2025-12-21 (Session 5)
**Status:** ✅ COMPLETED

### Session 5 Progress - MASTERPIECE L03 Upgrade

| Task | Status | Notes |
|------|--------|-------|
| PHASE 1 Research | ✅ Done | YouTube MCP (Andrej Karpathy, IBM, CZ native) |
| PHASE 2 Content Enrichment | ✅ Done | Gemini 54→59/60 |
| PHASE 3 Visual Anchors | ✅ Done | All 6 diagrams already implemented |
| PHASE 4 Multi-Agent QA | ✅ Done | Gemini scored 59/60 MASTERPIECE |
| PHASE 5 Visual QA | ✅ Done | Verified transformer diagram + quiz |

### Key Changes (L03)

- **VideoSwitcher EN:** 2→4 videos (added Andrej Karpathy, IBM)
- **VideoSwitcher CS:** 2→4 videos (added Andrej Karpathy, CZ native "Co je LLM?")
- **Model refs:** GPT-5.1 → GPT-5 (timeless)
- **Diagrams:** All 6 already implemented (llm-next-token, transformer-architecture-simplified, tokenization-viz, context-window, temperature-scale, training-pipeline)

### Commits This Session

| Hash | Message |
|------|---------|
| `5589bf0` | feat(lesson-03): MASTERPIECE upgrade for LLMs Explained |

### Previous Session (Session 4) - MASTERPIECE L02 ✅

| Task | Status | Notes |
|------|--------|-------|
| PHASE 1-5 | ✅ Done | 5 new diagrams, Lab 3 rewritten, 59/60 MASTERPIECE |

| Hash | Message |
|------|---------|
| `14ede31` | feat(content): upgrade ai-basics L02 to MASTERPIECE |

### Previous Session (Session 3) - MASTERPIECE L01 ✅

| Hash | Message |
|------|---------|
| `7ef6a6c` | feat(content): upgrade ai-basics L01 to MASTERPIECE |
| `3d0e841` | fix(content): update AI models to current versions + add verification rules |
| `7d00133` | fix(content): add Czech prompts to CZ labs + update labs policy |

### Previous: VideoSwitcher Debug (Session 2)

### Previous: Beginner Lessons → Golden Standard ✅
**Completed:** 2025-12-21

| Course | Beginner Lessons | Status |
|--------|------------------|--------|
| microsoft-copilot-mastery | 1 (L01 only) | ✅ Done |
| ai-basics-beginner | 7 | ✅ Done |

**Note:** copilot/02-workflows-agent is `intermediate`, copilot/03-copilot-studio is `advanced` - skipped.

### Lesson Progress Tracker

| # | Lesson | Review | Fixes | Multi-Agent | Visual QA | Done |
|---|--------|--------|-------|-------------|-----------|------|
| 1 | copilot/01-ai-powered-workday | ✅ | ✅ | ✅ (Gemini+Codex) | ✅ Desktop | ✅ |
| 2 | basics/01-what-is-ai | ✅ | N/A | ✅ (Gemini) | N/A | ✅ |
| 3 | basics/02-how-does-ai-learn | ✅ | N/A | ✅ (Gemini) | N/A | ✅ |
| 4 | basics/03-llms-explained | ✅ | N/A | ✅ (Gemini) | N/A | ✅ |
| 5 | basics/04-your-first-prompt | ✅ | N/A | ✅ (Gemini) | N/A | ✅ |
| 6 | basics/05-the-dark-side | ✅ | N/A | ✅ (Gemini) | N/A | ✅ |
| 7 | basics/06-ai-at-work | ✅ | N/A | ✅ (Gemini) | N/A | ✅ |
| 8 | basics/07-course-summary | ✅ | N/A | ✅ (Gemini) | N/A | ✅ |

### Gemini Review Summary (AI Basics Course)
**Verdict:** 🟢 Excellent / Ready for Release

**Strengths:**
- Logical progression for absolute beginners
- Star Wars theme (Padawan→Jedi) engaging and consistent
- Czech translation natural with appropriate terminology

**Nice-to-have improvements (not blockers):**
- L04: Add Czech cultural reference (Švejk/Cimrman)
- L06: Ensure Excel lab explains formulas
- L07: Mention mobile apps explicitly

---
**Last Commit:** `2738afb` chore: remove visual_tests artifacts
**Status:** 🟢 Global readability boost (nav, footer, progress, callouts, video metadata) applied; Lesson 01 visuals verified; `npm run verify` passes (lint warnings only).

---

## 🚨 SURVIVAL RULES (Po komprimaci kontextu - VŽDY zkontroluj!)

| # | Pravidlo | Kontrola |
|---|----------|----------|
| 1 | **THIN PROTOCOL** - žádné dumps do chatu | □ |
| 2 | **Content → Gemini Pro** (`gemini -m gemini-3-pro-preview`) | □ |
| 3 | **Hard bugs → GPT-5.2** (`codex exec -p deep`) | □ |
| 4 | **VERIFY před commit** (`npm run verify`) | □ |
| 5 | **Velké změny → zeptej se uživatele** | □ |

> ⚠️ Po resumption VŽDY přečti celý CLAUDE.md!

---

## ⛔ GEMINI CALL CHECKLIST (POVINNÉ PŘED KAŽDÝM VOLÁNÍM!)

```
┌─────────────────────────────────────────────────────────────┐
│  🛑 STOP! Před voláním Gemini MUSÍŠ zkontrolovat:           │
│                                                             │
│  1. □ JE TO CONTENT TASK?                                   │
│      ANO → gemini -m gemini-3-pro-preview                   │
│      NE  → gemini (bez flagu = Flash)                       │
│                                                             │
│  2. □ SPRÁVNÝ PŘÍKAZ:                                       │
│      Content/Research/QA: gemini -m gemini-3-pro-preview    │
│      Quick tasks:         gemini                            │
│                                                             │
│  3. □ NIKDY NEVOLEJ:                                        │
│      ❌ gemini-2.5-pro                                      │
│      ❌ gemini-2.5-flash                                    │
│      ❌ gemini-exp-*                                        │
│      ❌ jakýkoliv jiný model než výše                       │
│                                                             │
│  POKUD SI NEJSI JISTÝ → ZEPTEJ SE UŽIVATELE                 │
└─────────────────────────────────────────────────────────────┘
```

**Selhání:** 2025-12-18 - Volán špatný model Gemini místo gemini-3-pro-preview

---

## 🖥️ Environment: Hetzner Dedicated Server (NEW!)

| Property | Value |
|----------|-------|
| **Hardware** | AMD EPYC 7401P (24 Cores), NVMe Storage |
| **OS** | Ubuntu 24.04 LTS (bare metal) |
| **User** | `deploy` |
| **Working Dir** | `/home/deploy/ai-learning-platform` |
| **Network** | Zero Trust (UFW + Cloudflare Tunnel) |

### Installed Toolchain

| Tool | Version | Status |
|------|---------|--------|
| Node.js | v20.19.6 (via NVM) | ✅ |
| npm | 10.8.2 | ✅ |
| Docker | 29.1.3 | ✅ |
| Python | 3.11 | ✅ | (Docker + CI aligned)
| Gemini CLI | 0.20.2 | ✅ |
| Codex CLI | 0.72.0 | ✅ |

### MCP Servers

| Server | Package | Status |
|--------|---------|--------|
| Playwright | `@playwright/mcp` | ✅ Connected |
| Context7 | `@upstash/context7-mcp` | ✅ Connected |
| Perplexity | `@modelcontextprotocol/server-perplexity-ask` | ⚠️ Manual only (API budget) |
| YouTube Data | `dannySubsense/youtube-mcp-server` | ✅ Installed (14 funkcí) |

**YouTube MCP capabilities:** playlist items, video details, search, transcripts, channel videos, engagement analysis

### Docker Services

| Container | Port | Status |
|-----------|------|--------|
| ai-frontend | 3000 | ✅ Running |
| ai-backend | 8000 | ✅ Running |
| ai-db | 5432 | ✅ Running |
| ai-redis | 6379 | ✅ Running |
| ai-n8n | 5678 | ✅ Running |

---

## 🎯 Current State

### Latest Session (Dec 21, 2025 - Copilot Lesson 01 Golden Upgrade)

| Task | Status | Notes |
|------|--------|-------|
| Copilot Pages flow diagram | ✅ Done | Added `copilot-pages-flow` diagram + routing in Diagram components. |
| L01 EN/CS parity + numbering | ✅ Done | New Copilot Pages section + Lab 2, renumbered sections/labs; reading time 40 min / 4 labs. |
| Prompt language callout | ✅ Done | Added EN/CS note about prompts staying in English. |
| Visual QA (local) | ✅ Done | Playwright screenshots: `/tmp/lesson-01-visual/lesson-01-en.png`, `/tmp/lesson-01-visual/lesson-01-cs.png`; Codex review flagged small/low-contrast secondary text (global UI). |
| MDX validation | ⚠️ Warnings | `node scripts/validate_mdx.js` reports existing warnings + archive errors (known). |
| Frontend verify | ✅ Done | `npm run verify` (lint warnings only, build ok). |
| Backend tests | ✅ Done | `make test-backend` (3 passed, 6 skipped, warnings only). |

### Latest Session (Dec 21, 2025 - UI Contrast Pass)

| Task | Status | Notes |
|------|--------|-------|
| Lesson UI contrast | ✅ Done | Boosted contrast/size for nav buttons, footer text, progress bar, callouts, and video metadata. |
| Visual QA refresh | ✅ Done | Screenshot refreshed: `/tmp/lesson-01-visual/lesson-01-en.png`. |
| Frontend verify | ✅ Done | `npm run verify` (lint warnings only, build ok). |

### Previous Session (Dec 21, 2025 - L02/L03 Visual Scaling + Auth QA)

| Task | Status | Notes |
|------|--------|-------|
| Full-bleed diagrams on mobile | ✅ Done | Switched key L02/L03 diagram wrappers to `w-screen` full-bleed for mobile readability. |
| Enterprise agent triad visual | ✅ Done | Added `enterprise-agent-triad` diagram and inserted into L03 (EN/CS). |
| Tradeoff radar overlap | ✅ Done | Adjusted label offsets for readability. |
| AI security layers spacing | ✅ Done | Added vertical padding and moved AI/HITL down to avoid border collision. |
| L02 governance list format | ✅ Done | Replaced H4 blocks with numbered list for denser scan. |
| L02 impact visual | ✅ Done | Added `workflow-impact-cards` diagram before success stories (EN/CS). |
| Visual QA loop doc | ✅ Done | Added explicit login + capture + Gemini review loop to MEMORY. |
| Frontend verify | ✅ Done | `npm run verify` (lint warnings only, build ok). |

### Commits This Session

| Hash | Message |
|------|---------|
| `fa3bb78` | fix(ui): enhance copilot lesson visuals |
| `7f5dc09` | docs: add lesson upgrade golden path |

### Latest Session (Dec 20, 2025 - L02/L03 UI Polish + Visual QA)

| Task | Status | Notes |
|------|--------|-------|
| Radar overlap visual check | ✅ Done | Logged in locally, captured `visual_tests/lesson-03-quality-tradeoff-radar.png` |
| Tradeoff radar title overlap | ✅ Done | Moved chart center down to clear top labels |
| L03 governance visual swap | ✅ Done | Replaced ai-security-layers with security-attack-chain; added tradeoff-radar in analytics |
| AI security diagram readability | ✅ Done | Moved AI agent/HITL markers below Audit Log text |
| L02/L03 extra visual anchors | ✅ Done | Added agentic-vs-assistive + MCP architecture + regression matrix diagrams; prompt language callouts |
| L02 governance list format | ✅ Done | Replaced Steps headings with numbered list + inline icons |
| L02/L03 video alternatives + deltas | ✅ Done | Added admin inventory + App Builder storage + MCP preview; added BRK313/Reza/Shane Young videos |
| Camoufox transcript SOP | ✅ Done | Added always-on workflow to MEMORY |
| L02/L03 content clarifications | ✅ Done | Workflows Agent re-prompt edits + inventory visibility + App Builder preview; Copilot Studio graduation triggers + model choice + Agent 365 example |
| FeedbackFAB auto-hide all screens + lower position | ✅ Done | `frontend/components/FeedbackFAB.tsx` |
| Sith last-page “Další strana” button color | ✅ Done | `frontend/app/[locale]/courses/[courseId]/lessons/[lessonId]/page.tsx` |
| MDX images full-width on mobile | ✅ Done | `frontend/components/MDXImage.tsx` |
| Mobile diagram HTML fallbacks | ✅ Done | `DiagramArchitecture.tsx`, `DiagramConcepts.tsx` |
| Table scroll hint + gradient | ✅ Done | `frontend/components/MarkdownRenderer.tsx` |
| Video fallback timer cleanup | ✅ Done | `frontend/components/VideoPlayer.tsx` |
| Mobile table cards + inline icon mapping | ✅ Done | `frontend/components/MarkdownRenderer.tsx` |
| ConceptCard emoji → Lucide mapping | ✅ Done | `frontend/components/mdx/ConceptCard.tsx` |
| Video thumbnail background | ✅ Done | `frontend/components/VideoPlayer.tsx` |
| Visual QA artifacts | ✅ Done | `visual_tests/lesson-02/03-*` |
| Gemini content review | ✅ Done | Suggested: App Builder note, model choice, graduation path, evals/analytics emphasis |
| Claude content review | ✅ Done | Suggested: re-prompt editing UX, inventory location, model choice, Agent 365 example |
| Frontend verify | ✅ Done | `npm run verify` (lint warnings only) |

### Latest Session (Dec 19, 2025 - VideoSwitcher Debugging)

| Task | Status | Notes |
|------|--------|-------|
| VideoSwitcher intermittent missing | 🔄 Investigating | Sometimes absent until manual refresh |
| Registry race handling in VideoSwitcher | ✅ Done | `821e137` |
| Subscription instead of polling | ✅ Done | `8b3363b` |
| VideoPlayer wait for registry | ✅ Done | `679e6f6` |
| Memoize MarkdownRenderer parse | ✅ Done | `9d09329` |
| Harden VideoSwitcher JSON parsing | ✅ Done | Unified parser + non-greedy array capture + trailing comma cleanup |
| Frontend verify | ✅ Done | `npm run verify` (lint warnings only, no errors) |

### Commits This Session

| Hash | Message |
|------|---------|
| `f2cad57` | fix(ui): separate tradeoff radar title from labels |
| `6cdb925` | docs(content): vary copilot studio governance visuals |
| `0b240be` | fix(ui): improve ai security diagram readability |
| `dcf905f` | docs(ui): add visual anchors for copilot lessons |
| `2763bb0` | docs(content): simplify governance rules list |
| `4c45ef1` | docs(content): add copilot updates and videos |
| `db1d79f` | docs: update working context |
| `cb51aa9` | docs: add camoufox transcript SOP |
| `a63a0a2` | docs(content): expand copilot lesson clarifications |
| `e6c2a69` | docs: update working context |
| `94d9007` | fix(ui): polish copilot lesson visuals |
| `6a1b58e` | docs: document VideoSwitcher parsing + Opus CLI |
| `abf8bd3` | fix(VideoSwitcher): unify registration and parsing |
| `9d09329` | fix(MarkdownRenderer): memoize parsed content to prevent VideoSwitcher remounts |
| `679e6f6` | fix(VideoPlayer): wait 300ms for VideoSwitcher before giving up |
| `8b3363b` | fix(VideoSwitcher): use subscription instead of interval |
| `821e137` | fix(VideoSwitcher): handle race condition with registry reset |

### Previous Session (Dec 19, 2025 - UX Polish + Security)

| Task | Status | Notes |
|------|--------|-------|
| **P0-P3 RECOMMENDATIONS** | | |
| Rate limiter IP detection | ✅ Done | `get_real_ip()` for Cloudflare/nginx proxy |
| Admin password block | ✅ Done | Rejects "admin123" in production |
| Sandbox security hardening | ✅ Done | read_only, no-new-privileges, cap_drop |
| Content sync dry-run | ✅ Done | `dry_run=True` parameter |
| Remove auto-create tables | ✅ Done | Rely on Alembic only |
| Slug-based identity | ✅ Done | Upsert by slug, not title |
| i18n hardcoded strings | ✅ Done | AIGlossary, CourseCarousel → next-intl |
| AIGlossary physics opt | ✅ Done | rAF stops when cubes sleeping |
| JediSithToggle a11y | ✅ Done | ARIA role/aria-checked/aria-label |
| Error boundary | ✅ Done | `frontend/app/error.tsx` |
| TypeScript any types | ✅ Done | `i18n/request.ts` proper interfaces |
| **FeedbackFAB Mobile UX** | | |
| Reduce touch target | ✅ Done | pointer-events-none on container |
| Simple Bug icon | ✅ Done | Replaced SplitBugEyeIcon with lucide Bug |
| Larger icon on mobile | ✅ Done | 36×36px icon in 44×44px button |
| Auto-hide after 2s | ✅ Done | Shows on scroll/touch, fades after inactivity |
| **Course Sections Split** | | |
| AI Learning Path section | ✅ Done | 4 core difficulty-based courses |
| MS 365 Productivity section | ✅ Done | Copilot course with special badge |
| MS365 badge styling | ✅ Done | Orange text, dark bg, works in Sith mode |
| Remove fade on single course | ✅ Done | No left/right fades for 1-course carousel |

### Commits This Session

| Hash | Message |
|------|---------|
| `3c9bbde` | feat: implement P0 + P1 security and architecture improvements |
| `0e0adcd` | feat: implement P2 + P3 performance and quality improvements |
| `e8310c6` | fix(FeedbackFAB): reduce touch target on mobile |
| `9d4d02c` | fix(FeedbackFAB): use simple Bug icon for clarity |
| `1fb27e3` | fix(FeedbackFAB): larger icon + lower position on mobile |
| `27fe11d` | fix(FeedbackFAB): much larger button and icon on mobile |
| `425e2d3` | fix(FeedbackFAB): tighter button around icon on mobile |
| `3cb86c7` | feat(FeedbackFAB): auto-hide on mobile after 2s inactivity |
| `3c81620` | feat: separate AI Learning Path from MS 365 Productivity courses |
| `beb9de8` | fix(CourseCarousel): improve MS365 badge + fix left edge |

### Previous Session (Dec 15, 2025 - Hetzner Migration)

| Task | Status | Notes |
|------|--------|-------|
| **Environment Setup** | | |
| Node.js upgrade (v18→v20) | ✅ Done | Via NVM |
| Gemini CLI install | ✅ Done | `@google/gemini-cli` v0.20.2 |
| Codex CLI install | ✅ Done | `@openai/codex` v0.72.0 |
| MCP servers config | ✅ Done | Playwright, Context7, Perplexity |
| Docker stack start | ✅ Done | All 5 containers healthy |
| .env creation | ✅ Done | Secure keys generated |

### Previous Session (Dec 14, 2025 - Star Wars Ship Images)

| Task                              | Status  | Notes                                         |
| --------------------------------- | ------- | --------------------------------------------- |
| **Sith (Dark) Theme Ships**       |         |                                               |
| AI Basics → TIE Fighter           | ✅ Done | `ai-basics-course-cover_dark.png`             |
| Prompt Eng → Slave I              | ✅ Done | `practical-prompt-engineering_dark.png`       |
| Advanced AI → Star Destroyer      | ✅ Done | `advanced-ai-techniques_dark.png`             |
| AI Engineering → Death Star       | ✅ Done | `ai-engineering-deep-dive_dark.png`           |
| **Jedi (Light) Theme Ships**      |         |                                               |
| AI Basics → X-Wing                | ✅ Done | `ai-basics-course-cover_light.png`            |
| Prompt Eng → Y-Wing               | ✅ Done | `practical-prompt-engineering_light.png`      |
| Advanced AI → Falcon              | ✅ Done | `advanced-ai-techniques_light.png`            |
| AI Engineering → Venator          | ✅ Done | `ai-engineering-deep-dive_light.png`          |
| **Technical**                     |         |                                               |
| CourseIcon.tsx theme switching    | ✅ Done | `_dark.png` / `_light.png` suffix logic       |
| Source ships preserved            | ✅ Done | `frontend/public/images/ships/` folder        |
| Visual QA via Playwright          | ✅ Done | Screenshot verified correct mapping           |

### Ship → Difficulty Mapping (by visual order)

| Position | Course             | Difficulty     | Jedi Ship   | Sith Ship      |
|----------|--------------------|----------------|-------------|----------------|
| 1st      | AI Basics          | Piece of Cake  | X-Wing      | TIE Fighter    |
| 2nd      | Prompt Engineering | Let's Rock     | Y-Wing      | Slave I        |
| 3rd      | Advanced AI        | Come Get Some  | Falcon      | Star Destroyer |
| 4th      | AI Engineering     | Damn I'm Good  | Venator     | Death Star     |

### Previous Session (Dec 14, 2025 - Security Hardening + GPT-5.2 Review)

| Task                              | Status  | Notes                                         |
| --------------------------------- | ------- | --------------------------------------------- |
| **GPT-5.2 Platform Review**       |         |                                               |
| Codex CLI debugging               | ✅ Done | `codex exec` for non-interactive mode         |
| Fine-Tuning Coming Soon banner    | ✅ Done | EN + CS content with preview                  |
| Comprehensive platform review     | ✅ Done | Architecture, content, security, debt         |
| All lessons review                | ✅ Done | 18 lessons scored, hooks + labs + quizzes     |
| Save findings to reports          | ✅ Done | `.ai-context/reports/GPT5.2_PLATFORM_REVIEW_2025_12_14.md` |
| **Security Hardening**            |         |                                               |
| Docker socket warning             | ✅ Done | Comment explaining dev-only risk              |
| JWT SECRET_KEY validation         | ✅ Done | Rejects 'changeme' in production              |
| .env.prod.example update          | ✅ Done | Added ENVIRONMENT=production                  |
| **Commits**                       |         |                                               |
| `c114ac7` Fine-Tuning banner      | ✅ Push | + Codex lesson learned                        |
| `2d2931b` CLAUDE.md Codex update  | ✅ Push | `codex exec` instructions                     |
| `27677d9` Security hardening      | ✅ Push | JWT validation + Docker warning               |

### GPT-5.2 Key Findings (Dec 14, 2025)

**Security Red Flags Fixed:**
- ✅ Docker socket → Added warning comment (prod doesn't have it)
- ✅ JWT secret → Added validation (rejects 'changeme' in prod)
- ⏳ localStorage tokens → Future (move to httpOnly cookies)

**Content Gaps Identified:**
- Fine-Tuning lesson (stub) - needs full content
- No capstone projects
- No evaluation track

**2025 Feature Ideas:**
- Agent Flight Simulator
- Adaptive Learning Path
- Autograded Labs

### Previous Session (Dec 13, 2025 - Boot Checklist v4.0)

| Task                              | Status  | Notes                                         |
| --------------------------------- | ------- | --------------------------------------------- |
| **CLAUDE.md Redesign**            |         |                                               |
| Consult Gemini on design          | ✅ Done | Sebe-verifikace, Boot Checklist               |
| Consult GPT-5.2 on design         | ✅ Done | Instrukční kolize, robustní struktura         |
| Implement Boot Checklist v4.0     | ✅ Done | 5-step checklist, inline CRITICAL_RULES       |
| Podmíněné Loading table           | ✅ Done | Context-specific file loading                 |
| **Chrome DevTools MCP**           |         |                                               |
| Add chrome-devtools MCP           | ✅ Done | `claude mcp add chrome-devtools`              |
| Test Chrome DevTools              | ❌ Fail | `Target closed` error v WSL                   |
| Remove Chrome DevTools            | ✅ Done | Puppeteer nemůže spustit Chrome v WSL         |
| Keep Playwright                   | ✅ Done | Funguje, kompaktní output když správně použit |
| **Commits**                       |         |                                               |
| `78af17a` Boot Checklist v4.0     | ✅ Push | -90 lines, inline critical rules              |

### Previous Session (Dec 13, 2025 - YouTube & Digest Fixes)

| Task                              | Status  | Notes                                         |
| --------------------------------- | ------- | --------------------------------------------- |
| YouTube channels fix              | ✅ Done | Matt Wolfe, Wes Roth, TheAIGRID added         |
| CZ translation fix                | ✅ Done | translate_to_czech() in daily_digest_cron.py  |
| ACTION CHECKPOINT docs            | ✅ Done | CLAUDE.md + MEMORY.md                         |

### Previous Session (Dec 13, 2025 - MACP v1.0)

| Task                              | Status  | Notes                                         |
| --------------------------------- | ------- | --------------------------------------------- |
| **Multi-Agent Consensus Protocol**|         |                                               |
| Consult GPT-5.2 on MACP design    | ✅ Done | Resolution ladder, domain-weighted, 0-1 conf  |
| Consult Gemini on MACP design     | ✅ Done | Blind Ballot, Weighted Authority, echo-chamber|
| Synthesize into final protocol    | ✅ Done | Combined best of both approaches              |
| Update AGENT_PROTOCOL.md          | ✅ Done | New "MACP v1.0" section with full spec        |
| Update MEMORY.md                  | ✅ Done | Lessons learned + domain weights table        |
| Update CLAUDE.md                  | ✅ Done | MACP triggers checklist for orchestrator      |

### Previous Session (Dec 13, 2025 - Multi-Agent Workflow v5.1)

| Task                              | Status  | Notes                                         |
| --------------------------------- | ------- | --------------------------------------------- |
| **Workflow v5.1 Documentation**   |         |                                               |
| Multi-agent consultation          | ✅ Done | GPT-5.2 + Gemini provided economic analysis   |
| Update AGENT_PROTOCOL.md          | ✅ Done | New v5.1 "Asymmetric Context Segregation"     |
| Update MEMORY.md                  | ✅ Done | Tool matrix, lessons learned                  |
| Update WORKING_CONTEXT.md         | ✅ Done | Current session status                        |
| **GPT-5.2 Onboarding**            |         |                                               |
| Boot Codex with new role          | ✅ Done | GPT-5.2 reviewed workflow, gave feedback      |
| Create CODEX.md                   | ✅ Done | Entry point + Debug Packet templates          |
| Fix inconsistencies               | ✅ Done | >30 min (not >2h), removed "NE orchestrátor"  |
| Update INDEX.md                   | ✅ Done | Added GPT-5.2/Codex row                       |
| Configure Codex profiles + MCP    | ✅ Done | `~/.codex/config.toml`: profiles `fast`/`orchestrator`, MCP: filesystem/git/context7 |

### Previous Session (Dec 13, 2025 - Hash Navigation Fix)

| Task                              | Status  | Notes                                         |
| --------------------------------- | ------- | --------------------------------------------- |
| **Hash Navigation Fix**           |         |                                               |
| Debug teaser → about#cycle-XX     | ✅ Done | GPT-5.2 identified ScrollToTop as culprit     |
| Fix ScrollToTop.tsx race condition| ✅ Done | 50ms delay allows hash to be set first        |
| Verify #cycle-35 navigation       | ✅ Done | ABTestTeaser → About page works               |
| Verify #cycle-49 navigation       | ✅ Done | PhysicsOptTeaser → About page works           |

### Previous Session (Dec 13, 2025 - PhysicsOptShowcase)

| Task                              | Status  | Notes                                         |
| --------------------------------- | ------- | --------------------------------------------- |
| **PhysicsOptShowcase**            |         |                                               |
| Create showcase component         | ✅ Done | 4-phase animation: Report→Consult→Impl→Results|
| Add 4 agent avatars               | ✅ Done | Claude, Gemini, Perplexity, GPT-5.2           |
| Create homepage teaser            | ✅ Done | PhysicsOptTeaser.tsx with orange/amber theme  |
| EN/CS translations                | ✅ Done | cycle49_*, teaser2_* keys                     |
| Fix .ts → .tsx                    | ✅ Done | JSX syntax requires .tsx extension            |

### Previous Session (Dec 12, 2025 - Multi-Agent v4.0 + PROD Fixes)

| Task                              | Status  | Notes                                         |
| --------------------------------- | ------- | --------------------------------------------- |
| **PROD Deployment Fixes**         |         |                                               |
| Trailing Slash 307 Fix            | ✅ Done | `news.py`, `digest.py`: `"/"` → `""`          |
| YouTube RSS Migration             | ✅ Done | No more API quota! 70+ videos via RSS         |
| Perplexity Hallucination Fix      | ✅ Done | Real URLs from citations (TIME, CNBC, etc.)   |
| Frontend API Calls Fix            | ✅ Done | Removed trailing slashes from fetch URLs      |
| CZ Filter Working                 | ✅ Done | `/news?lang=cs` returns 29 Czech articles     |
| **Multi-Agent v4.0 Integration**  |         |                                               |
| GPT-5.2 Research & Analysis       | ✅ Done | Benchmarks srovnány, role definována          |
| GPT-5.2 Added to AGENT_PROTOCOL   | ✅ Done | Reasoning specialist, NE orchestrátor         |
| Gemini Deep Research Added        | ✅ Done | 60-min autonomous research agent              |
| Agent Routing Matrix Updated      | ✅ Done | Decision tree v MEMORY.md                     |
| gemini_deep_research.py Created   | ✅ Done | `backend/scripts/gemini_deep_research.py`     |

### Multi-Agent Workflow v5.1 (Dec 2025) - "Asymmetric Context Segregation"

```
┌─────────────────────────────────────────────────────────────────┐
│  GPT-5.2 (Situational Orchestrátor) ←→ Claude (Implementer)     │
│  OpenAI Pro (~$20/mo)                   Claude Code (~$20/mo)   │
│         ↓                                      ↓                │
│  Gemini 3 Pro (Visual QA + Content)    Playwright (local files) │
│  Google AI Plus (2M context!)          Thin output only!        │
│         ↓                                                       │
│  Perplexity MCP        Gemini Deep Research                     │
│  (Quick <5min)         (60-min autonomous)                      │
└─────────────────────────────────────────────────────────────────┘
```

**Situational Orchestration:**
| Situace | Orchestrátor | Implementer |
|---------|--------------|-------------|
| Záhadný bug (>30 min) | **GPT-5.2** | Claude |
| Clear implementation | Claude | Claude |
| Visual QA | Claude | **Gemini** (2M ctx!) |
| Architecture decision | **GPT-5.2** | Claude |

**Context Segregation (KRITICKÉ!):**
- ❌ NIKDY: Playwright snapshoty do chatu (14k+ tokenů!)
- ✅ VŽDY: Cesty k souborům + stručné summary

### Previous Session (Dec 12, 2025 - Perplexity Integration)

| Task                          | Status  | Notes                                         |
| ----------------------------- | ------- | --------------------------------------------- |
| Daily Digest Cron Script      | ✅ Done | `backend/scripts/daily_digest_cron.py`        |
| Citation Marker Fix           | ✅ Done | Removed `[1]`, `[2]` from displayed text      |
| Perplexity MCP Server         | ✅ Fixed | `server-perplexity-ask` (official MCP)        |
| Deep Research Workflow Docs   | ✅ Done | Added to AGENT_PROTOCOL.md                    |
| DailySummary Inline Links     | ✅ Done | Simplified component, hover effects           |

### Perplexity Integration Summary

**1. Daily Digest (Automated):**
- Script: `backend/scripts/daily_digest_cron.py`
- Runs via cron at 08:00 CET daily
- Uses Perplexity `sonar` model for AI news aggregation
- Posts to webhook → displays on homepage

**2. Deep Research (Interactive):**
- MCP Server: `perplexity-ask` in `~/.claude.json`
- Tool: `perplexity_ask` (messages-based API)
- Uses official `server-perplexity-ask` from modelcontextprotocol
- **Requires Claude Code restart to activate!**

**3. Shared API Key:**
- Stored in `.env` as `PERPLEXITY_API_KEY`
- Same key used by cron script and MCP server

---

## 🎨 Theme Colors

### Jedi (Light Mode)
- Primary: `violet-600` / `indigo-600` gradient
- Text: `text-violet-600`
- Borders: `border-violet-500/30`

### Sith (Dark Mode)
- Primary: `red-600` / `red-700` gradient
- Text: `dark:text-red-400`
- Borders: `dark:border-red-500/30`

---

## 📡 News Sources

### English
- YouTube: 15 channels (Fireship, 3B1B, Yannic Kilcher, Matt Wolfe, Wes Roth, TheAIGRID, etc.)
- RSS: OpenAI, HuggingFace, Google AI, TechCrunch, MIT Tech Review
- Hacker News: AI/GPT/LLM tagged stories
- Papers: arXiv cs.AI, cs.LG, cs.CL

### Czech
- YouTube: Tomáš AI, David Strejc
- RSS: AI Novinky, AI Crunch CZ, Kapler o AI, Lupa.cz

---

## 📋 Next Actions (Low Priority)

1. **Test Gemini Deep Research** - `python backend/scripts/gemini_deep_research.py "Test"`
2. **News title translation** - Consider auto-translating EN titles to CS via API
3. **Create content for courses 3 & 4** when ready

---

## 📝 Mini Session Log (Last 5)

| Date       | Agent       | What                                                                                        |
| ---------- | ----------- | ------------------------------------------------------------------------------------------- |
| 2025-12-23 | Codex GPT-5.2 | Mentor UI retry + cleaned unused models (Phi/Deep/Apriel) from disk |
| 2025-12-23 | Codex GPT-5.2 | Hotfix: recreated backend to load mentor env vars; added AuthContext fallback; Playwright visual tests pass |
| 2025-12-23 | Codex GPT-5.2 | Raised mentor timeout and improved suggestion generation (dedupe acronyms + follow-up prompts) |
| 2025-12-23 | Codex GPT-5.2 | Expanded mentor UI height + themed scrollbar; suggestions now follow conversation; auto-continue prevents truncation |
| 2025-12-23 | Codex GPT-5.2 | Benchmarked Qwen3 threads + increased max tokens/n-predict to avoid truncated answers |
| 2025-12-23 | Codex GPT-5.2 | Simplified mentor to Qwen3-only fast mode, removed other services, and ran Qwen3 bench |
| 2025-12-23 | Codex GPT-5.2 | Added Phi-3.5 mini fast mode + mentor-fast-phi service and UI toggle for side-by-side comparison |
| 2025-12-23 | Codex GPT-5.2 | Switched mentor-fast to Qwen3 4B Q4_K_M model and verified health + fast chat endpoint |
| 2025-12-23 | Codex GPT-5.2 | Built OpenBLAS llama.cpp image, fixed libmtmd/libcurl missing, mentor containers healthy; Playwright visual tests pass |
| 2025-12-23 | Codex GPT-5.2 | Swapped fast mentor to 3B model + trimmed context/history budgets for faster CPU responses |
| 2025-12-22 | Codex GPT-5.2 | Tuned llama.cpp server settings (ctx/batch/predict) for CPU responsiveness; recreated mentor services |
| 2025-12-22 | Codex GPT-5.2 | Fixed nginx upstream DNS (dynamic resolver) to stop 502 after backend restarts |
| 2025-12-22 | Codex GPT-5.2 | Added mentor health endpoint + release checklist smoke step + env var for cache size |
| 2025-12-22 | Codex GPT-5.2 | Mentor hotfix: added retry + safer parsing, bounded RAG cache, fixed lesson ID handling, Playwright visual tests pass |
| 2025-12-21 | Claude      | **MASTERPIECE ai-basics L05** - Dual gate (Gemini+Codex 59/60), Mata v. Avianca hook, Stochastic Parrots + RAG citations, model table GPT-5/o3, RAG warning fix |
| 2025-12-21 | Claude      | **MASTERPIECE ai-basics L03** - VideoSwitcher 2→4 videos (Andrej Karpathy, IBM, CZ native), GPT-5.1→GPT-5, all 6 diagrams verified, Gemini 59/60 |
| 2025-12-21 | Claude      | **MASTERPIECE ai-basics L02** - 5 new diagrams (neural-network, learning-types, supervised-flow, clustering, RL-loop), Lab 3 rewritten as RLHF Simulator, VideoSwitcher 4 videos, Gemini 59/60 |
| 2025-12-21 | Claude      | **MASTERPIECE ai-basics L01** - Full WORKFLOW_V6 upgrade, model verification rules (GPT-5/o3), mobile-first SVG rules, Czech labs policy (CZ prompts), 3 commits |
| 2025-12-21 | Claude      | **Beginner Lessons Golden Standard** - Reviewed 8 beginner lessons (1 copilot + 7 ai-basics), fixed cosmetic tone L01, multi-agent verified with Gemini (Excellent rating), Visual QA desktop L01, skipped L02/L03 copilot (intermediate/advanced) |
| 2025-12-20 | Claude      | **Copilot L02/L03 Visual Polish** - inline emoji→Lucide in lesson/course headers, fixed inline parser, human-in-the-loop full-bleed mobile, added backend pytest.ini; Playwright screenshots + tests run |
| 2025-12-20 | Codex GPT-5.2 | **L02/L03 QA Fixes** - softened claims, added availability caveats, fixed CZ “Laby”, added video fallback + origin param, localized hidden “Next” |
| 2025-12-20 | Codex GPT-5.2 | **Copilot L02/L03 QA** - frontend verify OK (warnings), backend pytest fails (ModuleNotFoundError), Playwright visual blocked by Alpine deps; captured lesson screenshots via Playwright MCP |
| 2025-12-19 | Codex GPT-5.2 | **VideoSwitcher Parsing** - unified parser + non-greedy regex + trailing comma cleanup; verify run |
| 2025-12-19 | Codex GPT-5.2 | **VideoSwitcher Debugging** - registry race, subscription swap, wait state, memoized MDX parse; issue still intermittent |
| 2025-12-19 | Claude      | **UX Polish** - FeedbackFAB mobile (auto-hide, bigger icon), Course sections (AI Path + MS365), P0-P3 RECOMMENDATIONS implemented |
| 2025-12-19 | Claude+MACP | **L05 Restructure + L07 Creation** - 35min/2labs foundations, L07 Antigravity 25min/2labs, 6 new diagrams, MACP P0 improvements |
| 2025-12-18 | Claude      | **Claude Code Mastery v2.0** - EN+CS beginner-friendly, WSL+terminal, Lab 0, 60min/4labs, GEMINI CHECKLIST added |

---

## 🔗 Quick Reference

| Need                 | Location                                  |
| -------------------- | ----------------------------------------- |
| Lesson upgrade plans | `.ai-context/LESSON_UPGRADE_GUIDE.md`     |
| Edutainment vision   | `.ai-context/core/VISION.md`              |
| Content guidelines   | `.ai-context/core/CONTENT_GUIDELINES.md`  |
| Video System docs    | `MEMORY.md` → "Video System Architecture" |
| **Perplexity Setup** | `backend/scripts/README.md`               |
| **Research Workflow**| `AGENT_PROTOCOL.md` → "Research Tools"    |

---

_This file is the SINGLE SOURCE OF TRUTH for current project state._
_Updated by: Claude Opus 4.5 (2025-12-12 22:00)_
