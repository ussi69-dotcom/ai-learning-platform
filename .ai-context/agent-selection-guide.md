# 🤖 AI Agent Selection Guide

> **Status:** Aktualizováno listopad 2025  
> **Current Architecture:** Perplexity (Architect) + Antigravity (Executor)  
> **Gemini a OSS agenti se NEpoužívají pro tento projekt.**

---

## 🎯 Current Agent Architecture

### Default Workflow Pattern

**Perplexity (AI Architect)**
- **Role:** Strategic planning, architecture decisions, research
- **When to use:**
  - Need strategic direction for new feature
  - Architecture decisions required
  - Research complex topics or best practices
  - Content strategy planning
  - Creating implementation plans
- **Output:**
  - `implementation_plan.md` (technical design)
  - `task.md` (step-by-step checklist for Antigravity)
  - Research documents
  - Strategic recommendations

**Antigravity (AI Executor) - Claude Sonnet 4.5 Thinking**
- **Role:** All implementation, testing, commits, deployment
- **When to use:**
  - Implementing features from plan
  - Writing/modifying code
  - Testing and debugging
  - Following `task.md` checklist
  - Routine development work
  - **DEFAULT for all execution tasks**
- **Output:**
  - Working code
  - Tests
  - Git commits
  - Updated `AGENT-STATE.md`

---

## 🔄 Typical Workflow

### 1. Planning Phase (Perplexity)
```
User requests feature
↓
Perplexity analyzes requirements
↓
Perplexity creates implementation_plan.md + task.md
↓
User reviews and approves
```

### 2. Execution Phase (Antigravity)
```
Antigravity reads implementation_plan.md
↓
Follows task.md step-by-step
↓
Implements → Tests → Commits (after each task)
↓
Updates AGENT-STATE.md
↓
Marks tasks complete [x]
```

### 3. Completion Phase (Antigravity)
```
All tasks marked [x]
↓
Archives cycle files to completed_cycles/
↓
Updates AGENT-STATE.md with cycle summary
↓
Pushes to GitHub
↓
Reports completion to user
```

---

## 📋 Decision Tree

### When to Use Perplexity:
- ✅ Strategic planning needed
- ✅ Architecture design decisions
- ✅ Research best practices or technologies
- ✅ Content strategy (curriculum planning)
- ✅ Complex problem analysis
- ✅ Creating implementation roadmaps

### When to Use Antigravity:
- ✅ **DEFAULT** - Any execution task
- ✅ Implementing from existing plan
- ✅ Writing/editing code
- ✅ Testing and debugging
- ✅ Following task checklist
- ✅ Git operations (commit, push)
- ✅ Updating documentation
- ✅ Component development
- ✅ Content creation (lessons, MDX)
- ✅ Bug fixes
- ✅ Refactoring

---

## 💡 When Role is Unclear

**Antigravity determines role based on:**
1. `implementation_plan.md` (primary reference)
2. `CONTENT_GUIDELINES.md` (design decisions)
3. `PROJECT_CORE.md` (strategic direction)

**Default assumption:**  
If task involves **code execution, testing, or implementation** → Antigravity executes.

**Escalation rule:**  
If Antigravity encounters unclear requirements or architectural ambiguity during execution → Request clarification from user, who may consult Perplexity.

---

## 🎯 Task-Specific Guidelines

### Content Work (Lessons, MDX)
**Agent:** Antigravity  
**References:** `CONTENT_GUIDELINES.md`, `implementation_plan.md`  
**Why:** Must follow design system precisely, use correct components, maintain tone

### Component Development (React/TypeScript)
**Agent:** Antigravity  
**References:** `ARCHITECTURE.md`, design system docs  
**Why:** Type safety, proper hooks, accessibility, following established patterns

### Bug Fixes
**Agent:** Antigravity  
**Approach:** Diagnose → Fix → Test → Commit  
**Why:** Straightforward execution task

### Research & Planning
**Agent:** Perplexity  
**Output:** Documents, recommendations, implementation plans  
**Why:** Strategic thinking, exploring options, gathering information

### Architecture Decisions
**Agent:** Perplexity (with user approval)  
**Examples:** Choosing libraries, database schema, API design  
**Why:** Long-term impact requires strategic analysis

### Rapid Prototyping
**Phase 1:** Perplexity (explore options, create plan)  
**Phase 2:** Antigravity (implement prototype)  
**Why:** Research first, then execute

### Code Review
**Agent:** Antigravity  
**Approach:** Review changes, verify alignment with guidelines  
**Why:** Context-aware validation against project standards

---

## 🚀 Best Practices

### For Users:
- **Clear requests:** Specify if you want planning (Perplexity) or execution (Antigravity)
- **Approve plans:** Review `implementation_plan.md` before execution
- **Monitor progress:** Check `AGENT-STATE.md` and `task.md` for status

### For Antigravity:
- **Always read context first:**
  - `PROJECT_CORE.md` (vision, MVP)
  - `CONTENT_GUIDELINES.md` (design system)
  - `ARCHITECTURE.md` (tech stack)
  - `implementation_plan.md` (current task)
  - `task.md` (checklist)
- **Test before commit:** Every change must be verified
- **Atomic commits:** One task = one commit
- **Update progress:** Mark tasks `[x]` in `task.md`
- **Autonomous completion:** Close cycles automatically when done

### For Perplexity:
- **Clear plans:** Write detailed `implementation_plan.md`
- **Actionable tasks:** Create specific `task.md` checklist
- **Consider constraints:** Reference `ARCHITECTURE.md` for tech limitations
- **User-friendly:** Plans should be reviewable by user

---

## 🚫 Archived Agents (Historical Reference Only)

### Gemini 3 Pro
- **Status:** ❌ No longer used for this project
- **Era:** October 2024 - November 2025
- **Archive:** See `.ai-context/archive/gemini-era/`
- **Reason for change:** Moved to Perplexity for clearer architecture and better long-term planning

### GPT-OSS 1208
- **Status:** ❌ Never used in production
- **Purpose:** Experimental testing only
- **Reason:** Insufficient context window and reliability for production work

### Claude Sonnet 4.5 (Standard Mode)
- **Status:** ❌ Not currently used
- **Note:** Antigravity uses Thinking mode for all tasks
- **Reason:** Thinking mode provides superior context awareness and reasoning

---

## 📂 Key Reference Files

### Must Read Before Every Task:
1. **`PROJECT_CORE.md`** - Vision, MVP, curriculum philosophy
2. **`CONTENT_GUIDELINES.md`** - Design system, component usage
3. **`ARCHITECTURE.md`** - Tech stack, dependencies, ports
4. **`AGENT-STATE.md`** - Current cycle status, history

### Task-Specific:
5. **`implementation_plan.md`** - Current cycle technical plan
6. **`task.md`** - Step-by-step checklist

### Reference as Needed:
7. **`CURRICULUM_STRATEGY.md`** - Long-term learning path
8. **`WORKFLOW.md`** - Collaboration patterns

### Priority Order (If Conflicts):
```
implementation_plan.md > CONTENT_GUIDELINES.md > PROJECT_CORE.md > Other files
```

---

## 🔄 Workflow Evolution

### Old Pattern (Gemini Era - Deprecated):
```
User → Gemini (architect) → User (copy-paste) → Antigravity (executor)
- Required context_builder.py
- Manual handoff between agents
- More steps, more friction
```

### Current Pattern (Perplexity Era):
```
User → Perplexity (architect) → Antigravity (executor)
- File-based context
- Direct execution from plans
- Autonomous cycle completion
- Less manual overhead
```

---

## 📊 Success Indicators

### Antigravity Working Well:
- ✅ Follows plans precisely
- ✅ Tests before committing
- ✅ Atomic commits with clear messages
- ✅ Updates task.md progress
- ✅ Autonomous cycle completion
- ✅ No deviation from guidelines

### Perplexity Working Well:
- ✅ Clear, actionable implementation plans
- ✅ Comprehensive task breakdowns
- ✅ Considers constraints and dependencies
- ✅ User can make informed decisions

### System Working Well:
- ✅ No confusion about roles
- ✅ Smooth handoff between planning and execution
- ✅ Consistent quality across cycles
- ✅ Easy onboarding for new contexts

---

## 🆘 When Things Go Wrong

### Antigravity Encounters Issues:
1. **Unclear requirements** → Ask user for clarification
2. **Technical blockers** → Document in commit, ask user
3. **Guideline conflicts** → Follow priority order, ask if unclear

### User Needs Help:
1. **Strategic decision** → Consult Perplexity
2. **Quick execution** → Use Antigravity directly
3. **Research needed** → Ask Perplexity first, then execute with Antigravity

---

**Last Updated:** Listopad 2025 (Cycle 17)  
**Agent Architecture:** Perplexity (Architect) + Antigravity (Executor)  
**OSS/Gemini/ostatní agenti se NEpoužívají pro tento projekt**
