# Implementation Plan: .ai-context Optimization (Cycle 17)

> **🔔 KEYNOTE:**  
> Tento plán byl vytvořen podle Cycle 17, řídí se architekt **Perplexity**.  
> **Klíčové role:** Architect (Perplexity), Executor (Antigravity/Claude Sonnet 4.5 Thinking).  
> **Staré workflow a role (Gemini, OSS) ignoruj.**

---

## 🎯 Objective
Optimize `.ai-context/` and `.agent/rules/` to establish single source of truth for Antigravity (Claude Sonnet 4.5 Thinking) as primary executor and Perplexity as architect. Eliminate all outdated references to Gemini, OSS, and contradictory workflows.

## 🔍 Current State Analysis

### Files Requiring Updates:
1. **GEMINI_PROMPT.md** - ❌ References Gemini as architect, needs update/archive
2. **FALLBACK-CLAUDE.md** - ⚠️ Outdated agent reference, needs clarification
3. **agent-selection-guide.md** - ⚠️ Still references Gemini 3 Pro, GPT-OSS as active agents
4. **WORKFLOW.md** - ❌ References "User → Gemini → Antigravity" pattern, needs complete rewrite
5. **PROJECT_CORE.md** - ✅ Mostly good, needs status footer
6. **CONTENT_GUIDELINES.md** - ⚠️ Need to verify, add status footer
7. **ARCHITECTURE.md** - ⚠️ Need to verify, add status footer
8. **CURRICULUM_STRATEGY.md** - ⚠️ Need to verify, add status footer
9. **implementation-plan.md** - ⚠️ Current cycle file, needs to be archived after completion
10. **AGENT-STATE.md** - ✅ Already updated (Cycle 16)

### Outdated Files to Archive:
- `GEMINI_PROMPT.md` → Move to `archive/gemini-era/`
- Old Gemini-based workflow sections

---

## 📋 Changes Overview

### Phase 1: Archive Outdated Files
Move Gemini-specific files to archive with clear disclaimer

### Phase 2: Update Agent Selection Guide
Rewrite to reflect Perplexity + Antigravity pattern only

### Phase 3: Rewrite Workflow
Update WORKFLOW.md to reflect current Perplexity (architect) → Antigravity (executor) pattern

### Phase 4: Update Core Guidelines
Add "Status: Aktualizováno listopad 2025" to all active files

### Phase 5: Create Templates
Create clean templates for future cycles

---

## 🛠️ Detailed Changes

### 1. Archive Outdated Files

#### [NEW] `.ai-context/archive/gemini-era/README.md`
```markdown
# Archiv: Gemini Era Files

**⚠️ NEPOUŽÍVAT PRO AKTUÁLNÍ EXEKUCI**

Tyto soubory jsou archivovány pro historický kontext. 
Reprezentují workflow z období říjen 2024 - listopad 2025, kdy byl použit Gemini jako architect.

**Aktuální workflow:** Perplexity (Architect) → Antigravity (Executor)
**Aktuální soubory:** Viz `.ai-context/` (root level)
```

#### Move Files:
- `GEMINI_PROMPT.md` → `archive/gemini-era/GEMINI_PROMPT.md`

---

### 2. Rewrite Agent Selection Guide

#### [MODIFY] `.ai-context/agent-selection-guide.md`

**Current:** References Gemini, GPT-OSS as active agents  
**New:** Single clear workflow

Summary of changes:
- Remove all Gemini/GPT-OSS references as active agents
- Define Perplexity + Antigravity as only current architecture
- Add clear decision tree for when to use each
- Add "Status: Aktualizováno listopad 2025" footer

---

### 3. Rewrite Workflow

#### [MODIFY] `.ai-context/WORKFLOW.md`

**Current:** References "User → Gemini → Antigravity" pattern  
**New:** "User → Perplexity → Antigravity" pattern

Summary of changes:
- Update all role descriptions
- Remove context_builder.py references
- Define autonomous cycle completion
- Add "Status: Aktualizováno listopad 2025" footer

---

### 4. Update Core Guidelines

#### [MODIFY] All core files - Add status footer

Add to end of each file:

```markdown
---

**Status:** Aktualizováno listopad 2025  
**Agent Architecture:** Perplexity (Architect) + Antigravity (Executor)  
**OSS/Gemini/ostatní agenti se NEpoužívají pro tento projekt**
```

Files to update:
- `PROJECT_CORE.md`
- `CONTENT_GUIDELINES.md`
- `ARCHITECTURE.md`
- `CURRICULUM_STRATEGY.md`

---

## ✅ Verification Plan

### Pre-Commit Checks:
- [ ] All outdated files archived
- [ ] No contradictions between files
- [ ] All active files have "listopad 2025" status
- [ ] Agent roles clearly defined in all files

### Cross-Reference Check:
- [ ] WORKFLOW.md matches agent-selection-guide.md
- [ ] Agent roles consistent across all files
- [ ] No references to Gemini as active agent
- [ ] No references to OSS as production agent

---

## 🚀 Deployment

### Atomic Commits:

1. **Archive outdated files:**
   ```bash
   git add .ai-context/archive/
   git commit -m "chore: archive gemini-era files"
   ```

2. **Update agent selection guide:**
   ```bash
   git add .ai-context/agent-selection-guide.md
   git commit -m "docs: update agent guide for perplexity era"
   ```

3. **Update workflow:**
   ```bash
   git add .ai-context/WORKFLOW.md
   git commit -m "docs: update workflow for perplexity+antigravity pattern"
   ```

4. **Update core guidelines:**
   ```bash
   git add .ai-context/PROJECT_CORE.md .ai-context/CONTENT_GUIDELINES.md .ai-context/ARCHITECTURE.md .ai-context/CURRICULUM_STRATEGY.md
   git commit -m "docs: add status footer to core guidelines"
   ```

5. **Final push:**
   ```bash
   git push origin main
   ```

---

## 📊 Success Metrics

**Immediate:**
- ✅ No conflicting agent references
- ✅ Clear single workflow defined
- ✅ All active files dated November 2025
- ✅ Outdated files properly archived

**Long-term:**
- Future AI agents can onboard from files alone
- No confusion about roles/responsibilities
- Consistent execution across cycles
- Easy to maintain/update

---

**Ready for Implementation:** Yes  
**Breaking Changes:** No (documentation only)  
**Estimated Time:** 45 minutes  
**Complexity:** Medium (many files, careful review needed)
