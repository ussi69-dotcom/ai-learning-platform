## Documentation Stack Audit Report

### Zombie Rules (obsolete or unused)
- Perplexity as a required research tool despite being disabled in the active protocol: `.ai-context/core/CONTENT_GUIDELINES.md:169`, `.ai-context/workflows/WORKFLOW_V6_MASTERPIECE.md:29`, `.ai-context/workflows/WORKFLOW_V6_MASTERPIECE.md:120`, `.ai-context/workflows/WORKFLOW_V6_MASTERPIECE.md:555`, `.ai-context/workflows/WORKFLOW_V6_CLAUDE_FIRST.md:32`, `.ai-context/workflows/WORKFLOW_V6_CLAUDE_FIRST.md:200`, `.ai-context/core/CURRICULUM_ROADMAP.md:172`.
- Stale dependency versions documented in `CLAUDE.md` that no longer match `frontend/package.json` (e.g., next/react): `CLAUDE.md:755`, `CLAUDE.md:756` vs `frontend/package.json:30`, `frontend/package.json:34`.

### Conflicts (contradictory rules)
- Orchestrator selection conflict: `.ai-context/AGENT_PROTOCOL.md` declares v5.1 orchestrator = GPT-5.2 and v6.0 orchestrator = Claude (`.ai-context/AGENT_PROTOCOL.md:9-12`), while `.ai-context/workflows/UNIFIED_ORCHESTRATION.md` says the active console is orchestrator by default (`.ai-context/workflows/UNIFIED_ORCHESTRATION.md:7`).
- Production deploy commands conflict inside `CLAUDE.md`: strict rule to use `make deploy-prod` and never `docker compose up` (`CLAUDE.md:41`, `CLAUDE.md:108-116`) vs Production Deployment section that instructs `docker compose -f docker-compose.prod.yml up -d --build` (`CLAUDE.md:740`).
- Visual asset rules conflict or need explicit scoping: "NO Raster Images" (`.ai-context/core/CONTENT_GUIDELINES.md:558`) vs "UI Screenshot Rule" requiring real screenshots (`.ai-context/core/CONTENT_GUIDELINES.md:153`).

### Redundancy (duplicated guidance)
- Thin Protocol repeats across `.ai-context/AGENT_PROTOCOL.md`, `CLAUDE.md`, `GEMINI.md`, and `.ai-context/workflows/WORKFLOW_V6_MASTERPIECE.md`. Consider centralizing to reduce drift.
- Model-selection rules (Gemini 3 Pro, banned models) repeated across `.ai-context/AGENT_PROTOCOL.md`, `CLAUDE.md`, and `GEMINI.md`.
- Verification rules (verify before commit, tests) repeated across `.ai-context/AGENT_PROTOCOL.md` and `CLAUDE.md`.

### Missing Links
- `.ai-context/core/CONTENT_GUIDELINES.md` links to `.ai-context/workflows/MULTI_AGENT_WORKFLOW.md`, which is archived and superseded: `.ai-context/core/CONTENT_GUIDELINES.md:443`, `.ai-context/core/CONTENT_GUIDELINES.md:450`, `.ai-context/core/CONTENT_GUIDELINES.md:452` (see `.ai-context/archive/README.md:12`).
- `.ai-context/INDEX.md` does not list `.ai-context/workflows/WORKFLOW_V6_CLAUDE_FIRST.md` even though it is referenced as the v6.0 detail doc: `.ai-context/AGENT_PROTOCOL.md:14` vs `.ai-context/INDEX.md:10-20`.
- "Inquisitor Protocol" and "Pixel Defense" are referenced but not defined in a dedicated doc: `.ai-context/workflows/UNIFIED_ORCHESTRATION.md:242-256`.

### Consistency Check
- [ ] Orchestration rules are consistent (conflict between .ai-context/AGENT_PROTOCOL.md and .ai-context/workflows/UNIFIED_ORCHESTRATION.md).
- [~] Superpowers integration is correctly connected (mapping exists, but CLAUDE.md does not reference it; no dedicated protocol docs).
- [x] MACP triggers are current (aligned between .ai-context/AGENT_PROTOCOL.md and CLAUDE.md).
- [x] Codex profiles match descriptions (aligned between AGENT_PROTOCOL and CLAUDE.md).

### Specific Questions
1. Orchestrator confusion: Yes, there is ambiguity. Recommend clarifying that the active console is default orchestrator, but Codex is required as final gate for explicit triggers (security, migrations, release) and when user says "pouzij codex/kamose".
2. Superpowers adoption: Mapped in AGENT_PROTOCOL and UNIFIED_ORCHESTRATION, but not surfaced in CLAUDE.md; add a short "when to invoke" section and link to the mapping.
3. MACP vs Superpowers: MACP is cross-agent consensus; Superpowers are Claude execution aids. MACP triggers should override, with skills used inside the MACP workflow (e.g., /systematic-debugging for root-cause, not in lieu of MACP).
4. Context saving rules: Thin Protocol is consistent across docs; minor drift only in phrasing.
5. Gemini protocols: "Inquisitor" and "Pixel Defense" are minimally defined; add concrete checklists or link to VISUAL_INSPECTION and content review templates.

### Recommendations
1. Remove or rewrite the conflicting Production Deployment section in `CLAUDE.md` to only use `make deploy-prod` and explain it wraps the prod compose file.
2. Replace Perplexity references in active docs with Gemini Deep Research / Context7 / YouTube MCP, and update the MASTERPIECE workflow accordingly.
3. Replace `MULTI_AGENT_WORKFLOW.md` links with `UNIFIED_ORCHESTRATION.md` and add a brief note about the deprecation.
4. Clarify the raster rule: scope "NO Raster Images" to diagrams, and explicitly mark UI screenshots as the only allowed exception.
5. Add a short "Protocols" appendix defining Inquisitor Protocol and Pixel Defense, or link to existing detailed docs.
6. Either update dependency versions in `CLAUDE.md` to match `frontend/package.json` or replace versions with "see package.json" to avoid drift.
7. Fix WORKFLOW_V6_MASTERPIECE phase numbering (duplicate Phase 4) to reduce workflow confusion.

### Friend Review Notes (Claude + Gemini)
- Both reviewers independently flagged the prod deploy conflict, Perplexity zombie references, and the missing MULTI_AGENT_WORKFLOW link as top issues.
- Gemini additionally called out missing definitions for Inquisitor Protocol and Pixel Defense and suggested a dedicated protocol section.
