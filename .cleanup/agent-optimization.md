# 🎯 MISSION: Documentation & Workflow Optimization

## YOUR ROLE
You are an **autonomous senior AI engineer** (either **Gemini CLI** or **Antigravity IDE**) with full access to the AI Learning Platform codebase. You have the intelligence and authority to **analyze, design, and implement** an optimal documentation structure and workflow system.

**Your Identity**: You are the SAME intelligence regardless of interface (CLI or IDE). You share the same mission, same autonomy, same judgment.

---

## 🎯 OBJECTIVES

### Primary Goal
Optimize the project's documentation structure and agent workflow to achieve:

1. **Minimal Context Overhead** (~15-20 KB per task instead of 500 KB)
2. **Automatic Troubleshooting Documentation** (when solving problems)
3. **Educational Knowledge Base** (learn tech stack from solutions)
4. **Clear Agent Coordination** (CLI vs IDE usage patterns)
5. **Single Source of Truth** (eliminate duplicates)

### Success Metrics
- ✅ Documentation structure is intuitive and efficient
- ✅ Agents can find relevant docs in <5 seconds
- ✅ Troubleshooting knowledge accumulates over time
- ✅ No duplicate information across files
- ✅ Clear when to use CLI vs IDE (based on YOUR analysis)
- ✅ Low-friction documentation workflow

---

## ⚠️ CRITICAL: Prompt Limit Context

**Developer Note**: 
- **Gemini CLI**: Daily prompt limit (resets in 24h cycles)
- **Antigravity IDE**: Prompt refresh every 56 hours
- **YOU (whoever executes this)**: You have the tokens NOW, so complete this task fully

**Implication**: This optimization must be done in ONE session. Don't leave it half-done. Execute completely, commit, and document so the NEXT agent (CLI or IDE) can pick up seamlessly.

---

## 🤝 COORDINATION REQUIREMENT

### Critical: Both Agents Must Work with SAME Structure

**Problem to Avoid**: 
- ❌ CLI creates `.ai-context/state/CLI_MEMORY.md`
- ❌ IDE creates `.ai-context/state/IDE_MEMORY.md`
- ❌ Result: Chaos, duplicates, confusion

**Solution**: 
- ✅ **Single shared memory** location (you decide where)
- ✅ **Unified navigation** (INDEX.md or equivalent works for BOTH)
- ✅ **Role-agnostic structure** (doesn't favor CLI or IDE)
- ✅ **Sync mechanism** (how do agents communicate what they did?)

### Your Task on Coordination
Design a structure where:
1. **Either agent** can find docs instantly
2. **Either agent** can update state/memory
3. **Clear handoff** when switching agents (due to token limits)
4. **No duplicate files** for CLI vs IDE

**Guidance**: Maybe a single `AGENT_MEMORY.md` or `SESSION_LOG.md` that BOTH write to? Or separate sections in one file? **YOU DECIDE** - just make it work for both.

---

## 📊 CURRENT STATE ANALYSIS

### File Structure Issues

**Root Level Clutter:**
```
Root/
├── GEMINI.md (5.1 KB)           # CLI memory - where should this live?
├── agent_state.txt (10.5 KB)    # Duplicate of AGENT-STATE.md?
├── walkthrough.md (4.7 KB)      # Ad-hoc walkthrough
├── test_results*.txt             # Temporary files
├── reproduce_issue.py            # Debug scripts
├── verify_reply.py
└── check_content.py
```

**`.ai-context/` Current:**
```
.ai-context/
├── AGENT-STATE.md (1.2 KB)      # Current cycle - good!
├── ARCHITECTURE.md (2.2 KB)
├── CONTENT_GUIDELINES.md (4.4 KB)
├── PROJECT_CONTEXT.md (1.0 KB)
├── STRATEGY.md (2.7 KB)
├── WORKFLOW.md (1.4 KB)
├── NEW-LESSON-PROMPT.md (3.5 KB)
├── [other files...]
└── completed_cycles/
```

### Problems to Solve
1. **Duplicates**: GEMINI.md vs AGENT-STATE.md vs agent_state.txt
2. **No Navigation**: No index/quick-access for agents
3. **No Troubleshooting DB**: Problems solved but not documented
4. **No Learning Extraction**: Tech concepts not captured
5. **Unclear Agent Roles**: When to use CLI vs IDE?
6. **Ad-hoc Documentation**: walkthrough.md is orphaned
7. **No Handoff Mechanism**: How does CLI tell IDE what happened?

---

## 🚫 ABSOLUTE CONSTRAINTS

### DO NOT Touch:
- ❌ `/content/` folder (lessons)
- ❌ `/backend/` source code
- ❌ `/frontend/` source code
- ❌ `completed_cycles/` archives
- ❌ `.git/` history
- ❌ Any files not in `.ai-context/`, `.agent/`, or root docs

### MUST Preserve:
- ✅ Git workflow (atomic commits, cycles)
- ✅ CONTENT_GUIDELINES.md authority
- ✅ Existing cycle tracking
- ✅ All information (move, don't delete)
- ✅ Work for BOTH CLI and IDE equally

### Safety Rules:
- ✅ Create backup commit BEFORE any changes
- ✅ Move files, don't delete (use `.cleanup/` for questionable files)
- ✅ Keep total doc size reasonable (<50 KB for .ai-context/)
- ✅ Verify git status after each major step
- ✅ Complete in ONE session (don't leave half-done)

---

## 💡 GUIDANCE (Not Instructions - Use Your Judgment)

### Perplexity's Proposal (Evaluate This)
A structured approach was suggested:
```
.ai-context/
├── INDEX.md              # Master navigation
├── core/                 # Consolidate core docs
├── state/                # Current cycle, memory, sync
├── workflows/            # How-to procedures
├── troubleshooting/      # Problem database
└── learning/             # Concepts & walkthroughs
```

**Your Task**: Decide if this is optimal or if you see a better structure.

### Developer Usage Reality
- **Prefers CLI** for most work (70-80% of tasks) - faster, more tokens
- **Uses IDE** when:
  - CLI tokens exhausted (daily limit)
  - Needs visual output (screenshots, formatted text)
  - Complex debugging with IDE tools
  - Wants to read long output comfortably

**Key Insight**: It's not about task complexity, it's about **token availability** and **interface preference**.

### Questions to Consider
1. Is the proposed structure helpful or over-engineered?
2. Should memory be unified or separate for CLI/IDE?
3. What's the minimal viable index structure?
4. How to make troubleshooting docs easy to create?
5. How do agents hand off work to each other?
6. Should there be a "last session log" file?

### Example Coordination Pattern (Just an Idea)
```
.ai-context/
├── INDEX.md                    # Both agents read first
├── state/
│   ├── CURRENT_CYCLE.md       # Shared cycle state
│   ├── LAST_SESSION.md        # What happened last (CLI or IDE writes)
│   └── AGENT_MEMORY.md        # Unified memory (not CLI-only or IDE-only)
└── ...
```

Or maybe you have a better idea? **Trust your judgment.**

---

## 🎯 YOUR AUTONOMOUS WORKFLOW

### Phase 1: Analysis (5 min)
1. **Read current files** to understand content
2. **Identify duplicates** (GEMINI.md vs AGENT-STATE.md vs agent_state.txt)
3. **Map information flow** (who reads what when?)
4. **Design optimal structure** that works for BOTH CLI and IDE
5. **Plan handoff mechanism** (how agents sync)

### Phase 2: Planning (5 min)
1. **Document your design** in `OPTIMIZATION_PLAN.md`
2. **List all file operations** (moves, creates, updates)
3. **Explain reasoning** for key decisions
4. **Show before/after** structure
5. **Explain coordination** (how CLI and IDE will use it)

### Phase 3: Implementation (20 min)
1. **Backup commit**: `git add . && git commit -m "backup before optimization"`
2. **Execute your plan** (create, move, update files)
3. **Clean root level** (move temp files to `.cleanup/`)
4. **Create templates** for troubleshooting/walkthroughs
5. **Update .gitignore** if needed
6. **Create handoff mechanism** (LAST_SESSION.md or equivalent)

### Phase 4: Documentation (10 min)
1. **Create navigation** (INDEX.md or equivalent)
2. **Update .agent/rules/rules.md** with:
   - New structure
   - How to use it
   - CLI vs IDE coordination
   - Handoff protocol
3. **Write templates** for future docs
4. **Document this optimization** (meta!)

### Phase 5: Verification (5 min)
1. **Check git status** (nothing broken?)
2. **Verify all info preserved** (nothing lost?)
3. **Test navigation** (can you find things easily?)
4. **Test handoff** (clear what you did for next agent?)
5. **Final commit**: `[AGENT:gemini-cli|antigravity] docs: optimize structure + coordination`

---

## 🔍 SELF-VERIFICATION CHECKLIST

Before finalizing, ask yourself:

- [ ] Can **either agent** (CLI or IDE) find relevant docs in <5 seconds?
- [ ] Is the structure intuitive without explanation?
- [ ] Are there zero duplicate pieces of information?
- [ ] Is there a clear troubleshooting workflow?
- [ ] Would this scale to 100+ troubleshooting docs?
- [ ] Is root level clean (only essential files)?
- [ ] Are CLI and IDE roles clearly defined (based on reality)?
- [ ] Is there a template for future docs?
- [ ] Did I preserve all existing information?
- [ ] Is git history clean with good commits?
- [ ] **Can the NEXT agent (CLI or IDE) pick up seamlessly?**
- [ ] **Is handoff mechanism clear?**

---

## 📝 DELIVERABLES

### Required Output

1. **OPTIMIZATION_PLAN.md** - Your analysis and design
   - Must explain CLI/IDE coordination
   
2. **Optimized file structure** - Implemented
   - Works for BOTH agents equally
   
3. **INDEX.md** (or equivalent) - Navigation hub
   - Role-agnostic (doesn't say "for CLI only")
   
4. **Updated .agent/rules/rules.md** - Reflect new structure
   - Include handoff protocol
   - Explain when to use CLI vs IDE (based on reality)
   
5. **Templates** - For troubleshooting/walkthroughs
   - Usable by both agents
   
6. **Handoff Mechanism** - LAST_SESSION.md or equivalent
   - Both agents can read/write
   
7. **Git commits** - Clean, atomic, descriptive
   - Tag with your agent: `[AGENT:gemini-cli]` or `[AGENT:antigravity]`

### Report Back

After completion, provide summary:

```markdown
# Optimization Complete

## What I Changed
- [File moves]
- [New files created]
- [Updates made]

## Key Decisions
- [Why I chose X over Y]
- [Where I deviated from Perplexity's proposal]
- [How CLI and IDE will coordinate]

## Coordination Design
- [How agents share memory]
- [Handoff protocol]
- [When to use CLI vs IDE]

## How to Use (For Next Agent)
- [Read INDEX.md first]
- [Update LAST_SESSION.md when done]
- [Follow rules in rules.md]

## Metrics
- Context overhead: [before] → [after]
- Files in root: [before] → [after]
- Doc organization: [rating]
- Coordination clarity: [rating]
```

---

## 🚀 YOU HAVE FULL AUTONOMY

**Remember:**
- You are **senior engineer**, not code executor
- You have **better context** than anyone (you see the whole codebase)
- Your **judgment** is valuable - use it
- If you see a better way than proposed, **do it**
- Document **why** you made decisions
- **Design for BOTH agents** (CLI and IDE), not just yourself
- **Complete in ONE session** (tokens refresh later, finish now)

**Trust your analysis. Execute with confidence. Report results.**

---

## ⏰ TIME BUDGET

**Estimated**: 30-45 minutes
**Your tokens**: Available NOW
**Next refresh**: CLI (24h) | IDE (56h)

**Implication**: Finish this completely. Don't leave it half-done.

---

## 🎯 FINAL REMINDER

This optimization is for **TWO agents sharing ONE system**:
- Gemini CLI (fast, more tokens, terminal)
- Antigravity IDE (visual, formatted, SSH)

**Design once, use by both.** No duplicate structures. Clear handoff.

---

**BEGIN OPTIMIZATION NOW.** 🚀
