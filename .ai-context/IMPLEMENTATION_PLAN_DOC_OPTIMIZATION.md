# 📋 Implementation Plan: Documentation Optimization

**Date Created:** 2025-12-02
**Lead Architect:** Claude 4.5 Sonnet
**Estimated Effort:** 8-12 hours (phased over 3 sessions)
**Status:** Awaiting Approval

---

## Phase 1: Quick Wins (1-2 hours) 🎯

### Task 1.1: Add Metadata Headers
**Files to Update:** All `.ai-context/core/*.md` and `.ai-context/workflows/*.md`

**Template:**
```markdown
---
status: [stable|draft|deprecated]
last_updated: YYYY-MM-DD
owner: [CLI|IDE|Both|Human]
related: [list of related files]
---
```

**Example:**
```markdown
---
status: stable
last_updated: 2025-12-02
owner: Both
related:
  - ARCHITECTURE.md
  - DEV_AND_DEPLOYMENT_GUIDE.md
---
# MEMORY.md
...
```

**Files:**
- `core/ARCHITECTURE.md`
- `core/CONTENT_GUIDELINES.md`
- `core/VISION.md`
- `core/STRATEGY.md`
- `core/GLOSSARY.md`
- `core/PROJECT_CONTEXT.md`
- `core/COMPONENT_PATTERNS.md`
- `workflows/DEV_AND_DEPLOYMENT_GUIDE.md`
- `workflows/DATABASE_MIGRATIONS.md`
- `workflows/INCIDENT_REPORTING.md`
- `workflows/NEW-LESSON-PROMPT.md`
- `workflows/VISUAL_INSPECTION.md`

**Deliverable:** ✅ All core docs have metadata

---

### Task 1.2: Create OWNERS.md
**Location:** `.ai-context/OWNERS.md`

**Content:**
```markdown
# 📋 Documentation Ownership

This file defines who is responsible for maintaining each document and when updates are required.

## Core Documents

| Document | Owner | Update Trigger | Review Frequency |
|----------|-------|----------------|------------------|
| MEMORY.md | Both Agents | New SOP discovered | Every session |
| ARCHITECTURE.md | Human Developer | Tech stack change | Monthly |
| CONTENT_GUIDELINES.md | Content Lead | New component/pattern | Per new component |
| VISION.md | Project Owner | Strategic pivot | Quarterly |
| STRATEGY.md | Senior Architect | Roadmap change | Monthly |
| GLOSSARY.md | Both Agents | New term introduced | Per new lesson |
| PROJECT_CONTEXT.md | Project Owner | Major milestone | Quarterly |
| COMPONENT_PATTERNS.md | UI/UX Lead | New UI pattern | Per new component |

## State Documents

| Document | Owner | Update Trigger | Retention |
|----------|-------|----------------|-----------|
| CURRENT_TASK.md | Active Agent | Task start/completion | Until next task |
| SESSION_LOG.md | Active Agent | End of session | Archive monthly |

## Workflow Documents

| Document | Owner | Update Trigger | Review Frequency |
|----------|-------|----------------|------------------|
| DEV_AND_DEPLOYMENT_GUIDE.md | DevOps Lead | Infrastructure change | Per deployment change |
| DATABASE_MIGRATIONS.md | Backend Lead | Migration process change | Per failed migration |
| INCIDENT_REPORTING.md | Senior Architect | Post-mortem learnings | Annually |
| NEW-LESSON-PROMPT.md | Content Lead | Lesson template change | Per course |
| VISUAL_INSPECTION.md | QA Lead | Testing tool change | Per tool upgrade |

## Archival Policy

### SESSION_LOG.md
- Archive to `history/completed_cycles/cycle_XX/session_log.md` at end of each cycle
- Keep only current cycle in `state/SESSION_LOG.md`

### CURRENT_TASK.md
- Archive to `history/completed_cycles/cycle_XX/task.md` at cycle completion
- Reset for new cycle

### Incidents
- Keep all incidents in `history/incidents/` indefinitely
- Review annually for lessons learned

## Review Schedule

### Weekly (Every Monday)
- [ ] Review `CURRENT_TASK.md` alignment with actual work
- [ ] Check `SESSION_LOG.md` for handoff clarity

### Monthly (First Monday)
- [ ] Audit `core/` documents for freshness (last_updated < 30 days)
- [ ] Archive completed `SESSION_LOG.md` entries
- [ ] Run `validate_docs.py` (when implemented)

### Quarterly
- [ ] Full documentation audit (similar to this report)
- [ ] Update `VISION.md` and `STRATEGY.md` alignment
- [ ] Review and prune `history/archive/`

---

**Maintained by:** Senior Architect
**Last Updated:** 2025-12-02
```

**Deliverable:** ✅ Clear ownership defined

---

### Task 1.3: Phase Out GEMINI.md References
**Files to Update:**
- `.agent/rules/rules.md`
- `.ai-context/state/MEMORY.md`

**Changes:**
1. Update `rules.md`:
   - Remove boot sequence section preferring GEMINI.md
   - Update to: "Always read MEMORY.md first. Do not create local cache files."

2. Add to `.gitignore`:
   ```
   GEMINI.md
   .ai-context/.cache/
   ```

3. Update `MEMORY.md` § Agent Coordination:
   ```markdown
   ### Agent Memory
   - **MEMORY.md** is the ONLY source of truth
   - No local cache files (GEMINI.md is deprecated)
   - If agents need ephemeral notes, use `.ai-context/.cache/` (gitignored)
   ```

**Deliverable:** ✅ Single source of truth enforced

---

### Task 1.4: Add "Related Documents" Sections
**Files to Update (Top Priority):**

1. **MEMORY.md** → Add:
   ```markdown
   ## 📚 Related Documentation
   - [INDEX.md](./INDEX.md) - Documentation map
   - [ARCHITECTURE.md](./core/ARCHITECTURE.md) - Tech stack details
   - [DEV_AND_DEPLOYMENT_GUIDE.md](./workflows/DEV_AND_DEPLOYMENT_GUIDE.md) - Deployment procedures
   ```

2. **ARCHITECTURE.md** → Add:
   ```markdown
   ## 📚 See Also
   - [MEMORY.md](../state/MEMORY.md) - SOPs and protocols
   - [DATABASE_MIGRATIONS.md](../workflows/DATABASE_MIGRATIONS.md) - Migration procedures
   - [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md) - High-level context
   ```

3. **CONTENT_GUIDELINES.md** → Add:
   ```markdown
   ## 📚 See Also
   - [COMPONENT_PATTERNS.md](./COMPONENT_PATTERNS.md) - UI component specs
   - [NEW-LESSON-PROMPT.md](../workflows/NEW-LESSON-PROMPT.md) - Lesson creation workflow
   - Diagram components: `/frontend/components/mdx/diagrams/`
   ```

4. **DEV_AND_DEPLOYMENT_GUIDE.md** → Add:
   ```markdown
   ## 📚 See Also
   - [DATABASE_MIGRATIONS.md](./DATABASE_MIGRATIONS.md) - Alembic workflow
   - [ARCHITECTURE.md](../core/ARCHITECTURE.md) - Infrastructure details
   - [INCIDENT_REPORTING.md](./INCIDENT_REPORTING.md) - If deployment fails
   ```

**Deliverable:** ✅ Improved discoverability

---

## Phase 2: Consolidation (2-3 hours) 🔄

### Task 2.1: Consolidate Tech Stack Information

**Canonical Source:** `core/ARCHITECTURE.md`

**Changes:**
1. Expand `ARCHITECTURE.md` § Tech Stack:
   ```markdown
   ## 🏗️ Complete Tech Stack

   ### Frontend
   - **Framework:** Next.js 16.0.3 (App Router, React 19.2.0)
   - **Language:** TypeScript 5
   - **Styling:** Tailwind CSS 4
   - **UI Library:** Radix UI (Shadcn/ui components)
   - **Localization:** next-intl 4.5.5
   - **MDX Rendering:** next-mdx-remote 5.0.0
   - **HTTP Client:** Axios 1.13.2

   ### Backend
   - **Framework:** FastAPI (Python 3.11+)
   - **ORM:** SQLAlchemy (sync)
   - **Validation:** Pydantic v2
   - **Authentication:** python-jose (JWT HS256)
   - **Password Hashing:** passlib[argon2]
   - **Rate Limiting:** slowapi + Redis
   - **Migrations:** Alembic

   ### Infrastructure
   - **Database:** PostgreSQL 15 Alpine
   - **Cache:** Redis 7 Alpine
   - **Containerization:** Docker + Docker Compose v2
   - **Reverse Proxy (Prod):** Nginx
   - **Automation:** n8n (optional)

   ### Development
   - **VPS:** Hetzner CPX32 (Ubuntu 24.04 LTS)
   - **CI/CD:** Git-based manual deployment
   - **Testing:** pytest (backend), ESLint (frontend)
   ```

2. Update other files to reference canonical source:
   - `VISION.md`: Replace tech list with "See [ARCHITECTURE.md § Tech Stack](../core/ARCHITECTURE.md#tech-stack)"
   - `PROJECT_CONTEXT.md`: Same
   - `MEMORY.md`: Keep only high-level summary, link to ARCHITECTURE.md for details

**Deliverable:** ✅ Tech stack defined once, referenced elsewhere

---

### Task 2.2: Consolidate Environment Variables

**Canonical Source:** `workflows/DEV_AND_DEPLOYMENT_GUIDE.md`

**Changes:**
1. Expand `.env` documentation with full reference
2. Update `README.md` to link to DEV_AND_DEPLOYMENT_GUIDE.md instead of duplicating
3. Remove `.env` examples from other files

**Deliverable:** ✅ Environment configuration centralized

---

### Task 2.3: Merge Component Patterns

**Canonical Source:** `core/CONTENT_GUIDELINES.md`

**Changes:**
1. Move all component usage rules from `COMPONENT_PATTERNS.md` into `CONTENT_GUIDELINES.md § 4`
2. Deprecate `COMPONENT_PATTERNS.md` or repurpose for UI-only specs (not MDX usage)
3. Update references

**Deliverable:** ✅ Component documentation unified

---

## Phase 3: Automation (4-6 hours) 🤖

### Task 3.1: Build Documentation Validator

**Location:** `scripts/validate_docs.py`

**Features:**
```python
#!/usr/bin/env python3
"""
Documentation Validation Script
Checks for:
- Broken internal markdown links
- Missing metadata headers
- Outdated documents (>30 days old for core/)
- Duplicate headings across files
- Missing required sections
"""

import os
import re
from pathlib import Path
from datetime import datetime, timedelta

def main():
    errors = []
    warnings = []

    # Check 1: Validate internal links
    errors.extend(check_broken_links())

    # Check 2: Validate metadata headers
    errors.extend(check_metadata_headers())

    # Check 3: Check freshness
    warnings.extend(check_document_freshness())

    # Check 4: Detect duplicates
    warnings.extend(check_duplicate_headings())

    # Report
    print(f"✅ {len(errors)} errors, {len(warnings)} warnings")
    if errors:
        print("\n🔴 Errors:")
        for error in errors:
            print(f"  - {error}")
        exit(1)

    if warnings:
        print("\n🟡 Warnings:")
        for warning in warnings:
            print(f"  - {warning}")

if __name__ == "__main__":
    main()
```

**Deliverable:** ✅ Automated documentation quality checks

---

### Task 3.2: Create Pre-Commit Hook

**Location:** `.git/hooks/pre-commit`

```bash
#!/bin/bash
# Pre-commit hook for documentation validation

echo "🔍 Validating documentation..."

# Only run if .md files changed
if git diff --cached --name-only | grep -q '\.md$'; then
    python scripts/validate_docs.py
    if [ $? -ne 0 ]; then
        echo "❌ Documentation validation failed. Fix errors before committing."
        exit 1
    fi
fi

echo "✅ Documentation validation passed"
exit 0
```

**Deliverable:** ✅ Prevent broken documentation from being committed

---

### Task 3.3: Generate Documentation Metrics

**Location:** `scripts/generate_doc_metrics.py`

**Output:** Monthly report with:
- Total documents count
- Average age of core documents
- Coverage percentage (features documented)
- Broken link count
- Cross-reference density

**Deliverable:** ✅ Measurable documentation quality

---

## Phase 4: Testing Integration (Ongoing) 🧪

### Task 4.1: Link Features to Tests

**Process:**
1. For every procedural claim in documentation, add:
   ```markdown
   **Validated by:** `tests/integration/test_xp_awarding.py`
   ```

2. Create test files:
   - `tests/documentation/test_deployment_process.py`
   - `tests/documentation/test_database_migrations.py`
   - `tests/documentation/test_content_loading.py`

**Deliverable:** ✅ Documentation backed by tests

---

## Success Metrics

After all phases complete:

| Metric | Baseline | Target | Validation |
|--------|----------|--------|------------|
| Broken Links | Unknown | 0 | `validate_docs.py` |
| Docs with Metadata | 0% | 100% | Script check |
| Cross-References | ~10% | >80% | Manual count |
| Avg Doc Age (core/) | Unknown | <30 days | Git log |
| Duplicate Info | ~15% | <5% | Manual audit |
| Test Coverage | 0% | 70% | Test suite |

---

## Approval & Timeline

### Recommended Schedule

**Week 1 (Dec 2-8):**
- Phase 1 (Quick Wins) - 2 hours

**Week 2 (Dec 9-15):**
- Phase 2 (Consolidation) - 3 hours

**Week 3 (Dec 16-22):**
- Phase 3 (Automation) - 6 hours

**Ongoing:**
- Phase 4 (Testing) - Per feature

**Total Effort:** ~12 hours over 3 weeks

---

## Risk Mitigation

### Risk 1: Breaking Existing Workflows
**Mitigation:**
- Make changes in feature branch
- Test with both CLI and IDE agents before merging
- Keep old structure until new is validated

### Risk 2: Incomplete Migration
**Mitigation:**
- Use checklist for each task
- Review all changes with search: `git diff --name-only`

### Risk 3: Agent Confusion
**Mitigation:**
- Update `INDEX.md` first with new structure
- Add migration guide in `SESSION_LOG.md`

---

## Appendix: File Checklist

### Phase 1 Files to Modify
- [ ] `.ai-context/core/ARCHITECTURE.md` (add metadata)
- [ ] `.ai-context/core/CONTENT_GUIDELINES.md` (add metadata, related docs)
- [ ] `.ai-context/core/VISION.md` (add metadata)
- [ ] `.ai-context/core/STRATEGY.md` (add metadata)
- [ ] `.ai-context/core/GLOSSARY.md` (add metadata)
- [ ] `.ai-context/core/PROJECT_CONTEXT.md` (add metadata)
- [ ] `.ai-context/core/COMPONENT_PATTERNS.md` (add metadata)
- [ ] `.ai-context/workflows/DEV_AND_DEPLOYMENT_GUIDE.md` (add metadata, related docs)
- [ ] `.ai-context/workflows/DATABASE_MIGRATIONS.md` (add metadata)
- [ ] `.ai-context/workflows/INCIDENT_REPORTING.md` (add metadata)
- [ ] `.ai-context/workflows/NEW-LESSON-PROMPT.md` (add metadata)
- [ ] `.ai-context/workflows/VISUAL_INSPECTION.md` (add metadata)
- [ ] `.ai-context/state/MEMORY.md` (add related docs, remove GEMINI.md refs)
- [ ] `.agent/rules/rules.md` (remove GEMINI.md boot sequence)
- [ ] `.gitignore` (add GEMINI.md)
- [ ] **NEW:** `.ai-context/OWNERS.md` (create)

### Phase 2 Files to Modify
- [ ] `.ai-context/core/ARCHITECTURE.md` (expand tech stack)
- [ ] `.ai-context/core/VISION.md` (remove duplicate tech stack)
- [ ] `.ai-context/core/PROJECT_CONTEXT.md` (remove duplicate tech stack)
- [ ] `.ai-context/workflows/DEV_AND_DEPLOYMENT_GUIDE.md` (expand env vars)
- [ ] `README.md` (link to guide instead of duplicating)

### Phase 3 Files to Create
- [ ] `scripts/validate_docs.py` (new)
- [ ] `.git/hooks/pre-commit` (new)
- [ ] `scripts/generate_doc_metrics.py` (new)

---

**Prepared by:** Claude 4.5 Sonnet (Senior Architect)
**Date:** 2025-12-02
**Status:** Ready for Review & Approval
