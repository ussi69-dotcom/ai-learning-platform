# 🤖 Subagent Strategy - When to Use Task Tool

**Purpose:** Definice kdy a jak používat Task tool (subagenty) pro efektivní workflow.

---

## 🎯 Co Jsou Subagenti?

**Task tool** spouští specializované AI agenty (subprocesy) které autonomně řeší komplexní úkoly.

**Key Difference:**
- **Direct tools** (Read, Edit, Bash): Ty řídíš každý krok
- **Subagents** (Task tool): Agent pracuje autonomně, vrátí výsledek

**Typy subagentů:**
- `Explore` - Fast codebase exploration
- `Plan` - Software architect for planning
- `general-purpose` - Multi-step autonomous tasks

---

## ✅ Kdy POUŽÍT Subagenty

### 1. **Explore Agent** - Codebase Navigation

**Kdy použít:**
```
❓ "Kde se v projektu renderují avatary?"
❓ "Jak funguje XP systém?"
❓ "Najdi všechny Rate Limiting implementace"
❓ "Které komponenty používají dark mode?"
```

**NIKDY toto neřeš ručně** - Explore agent je na to přesně!

**Proč:**
- Prozkoumá celý codebase autonomně
- Najde všechny souvislosti (nejen první match)
- Vrátí strukturovaný report

**Example:**
```javascript
Task(
  subagent_type="Explore",
  description="Find avatar rendering logic",
  prompt=`
    Find all code related to avatar rendering in this project:
    1. Which components render avatars?
    2. Where is avatar data stored?
    3. How are gradients defined for icon avatars?
    4. Are there any known issues or TODOs?

    Return: File paths, line numbers, and brief descriptions.
  `
)
```

**Thoroughness levels:**
- `"quick"` - Basic search (default, fast)
- `"medium"` - Moderate exploration
- `"very thorough"` - Comprehensive analysis (slow, thorough)

---

### 2. **Plan Agent** - Architecture Planning

**Kdy použít:**
```
🏗️ Před implementací VELKÉ feature (Gamification v2, Achievements)
🏗️ Architectural decisions (monolith → microservices)
🏗️ Breaking changes (migration Next.js 15 → 16)
🏗️ Multiple valid approaches existují
```

**Example:**
```javascript
Task(
  subagent_type="Plan",
  description="Design gamification system",
  prompt=`
    Design a comprehensive gamification system for this AI learning platform:

    Requirements:
    - Achievements (unlock-based)
    - Streaks (daily learning)
    - Leaderboards (XP-based)
    - Badges (visual rewards)

    Considerations:
    - Existing XP system (UserProgress model)
    - PostgreSQL database
    - FastAPI backend + Next.js frontend
    - Must scale to 10k users

    Deliverables:
    1. Database schema changes
    2. API endpoints needed
    3. Frontend components
    4. Implementation phases
    5. Trade-offs and risks
  `
)
```

**Output:**
- Step-by-step implementation plan
- File structure
- Critical decisions
- Trade-offs

**Kdy NEPOU​ŽÍVAT:**
- ❌ Malé features (single component)
- ❌ Bug fixes (already know the solution)
- ❌ Routine refactoring

---

### 3. **General Purpose Agent** - Autonomous Execution

**Kdy použít:**
```
🔨 Multi-step tasks bez potřeby interakce
🔨 Bulk operations (update 20 lesson files)
🔨 TypeScript error fixes (across many files)
🔨 Dependency migrations
```

**Example:**
```javascript
Task(
  subagent_type="general-purpose",
  model="haiku", // Cheaper for bulk operations
  description="Fix TypeScript errors",
  prompt=`
    Fix all TypeScript errors in frontend/:

    Steps:
    1. Run npm run build
    2. Parse errors
    3. Fix each error systematically
    4. Re-run build to verify
    5. Report summary

    Do NOT change functionality, only fix type issues.
  `
)
```

**Výhody:**
- Pracuje autonomně (nepotřebuješ iterovat)
- Může dělat desítky file changes
- Vrátí kompletní report

**Kdy NEPOU​ŽÍVAT:**
- ❌ Když potřebuješ kontrolovat každý krok
- ❌ Kreativní úkoly (design decisions)
- ❌ Tasks s high uncertainty

---

## ❌ Kdy NEPOUŽÍVAT Subagenty

### Použij Direct Tools Místo Toho:

**1. Specific File Operations**
```
❌ BAD: Task(subagent_type="Explore", prompt="Read profile page")
✅ GOOD: Read('/home/ussi/ai-learning-platform/frontend/app/[locale]/profile/page.tsx')
```

**2. Known Class/Function Search**
```
❌ BAD: Task(subagent_type="Explore", prompt="Find class User")
✅ GOOD: Grep(pattern="class User", type="py")
```

**3. Simple Single-File Edit**
```
❌ BAD: Task(subagent_type="general-purpose", prompt="Add console.log to file X")
✅ GOOD: Edit(file_path="X", old_string="...", new_string="...")
```

**4. Iterative Development**
```
❌ BAD: Task(prompt="Build entire feature and iterate based on feedback")
✅ GOOD: Build incrementally s uživatelem (Claude direct)
```

**Rule of Thumb:**
- **Known target** = Use direct tools
- **Unknown/exploration** = Use Explore agent
- **Planning needed** = Use Plan agent
- **Autonomous bulk work** = Use General Purpose agent

---

## 🎯 Decision Tree

```
Need to do something?
│
├─ Do I know EXACTLY which file(s)?
│  │
│  ├─ YES → Use Read/Edit/Grep (direct tools)
│  │
│  └─ NO → Use Explore agent
│
├─ Is this a big feature with architectural decisions?
│  │
│  ├─ YES → Use Plan agent first
│  │
│  └─ NO → Implement directly
│
├─ Is this 10+ file changes that are mechanical?
│  │
│  ├─ YES → Use General Purpose agent
│  │
│  └─ NO → Do manually with direct tools
│
└─ Need user input/iteration?
   │
   ├─ YES → Work directly (no subagent)
   │
   └─ NO → Consider General Purpose agent
```

---

## 📊 Cost vs Speed vs Quality

| Agent Type | Speed | Cost | Quality | Best For |
|------------|-------|------|---------|----------|
| **Explore (quick)** | ⚡⚡⚡ Fast | 💰 Low | ⭐⭐⭐ Good | Known codebase patterns |
| **Explore (thorough)** | ⚡ Slow | 💰💰 Medium | ⭐⭐⭐⭐⭐ Excellent | Complex architecture |
| **Plan** | ⚡⚡ Medium | 💰💰💰 High | ⭐⭐⭐⭐⭐ Excellent | Feature design |
| **General (sonnet)** | ⚡ Slow | 💰💰💰 High | ⭐⭐⭐⭐ Very Good | Complex refactors |
| **General (haiku)** | ⚡⚡⚡ Fast | 💰 Low | ⭐⭐⭐ Good | Bulk mechanical changes |
| **Direct tools** | ⚡⚡⚡⚡ Instant | 💰 Minimal | ⭐⭐⭐⭐⭐ Perfect | Known operations |

**Tip:** Použij `model="haiku"` pro bulk operations kde je logika jednoduchá.

---

## 🔄 Parallel Subagents

**Kdy spustit více subagentů najednou:**

```javascript
// Paralelní exploration různých částí codebase
Task(subagent_type="Explore", prompt="Find all XP calculation logic")
Task(subagent_type="Explore", prompt="Find all avatar rendering code")
Task(subagent_type="Explore", prompt="Find all localization patterns")

// Run v JEDNÉ zprávě = parallel execution!
```

**Benefit:**
- 3x rychlejší než sekvenční
- Nezávislé úkoly se neblokují

**Kdy NEPOUŽÍVAT parallel:**
- ❌ Když druhý agent potřebuje output prvního
- ❌ Když mění stejné soubory (conflict risk)

---

## 🎯 Real-World Examples

### Example 1: "Avatary se nezobrazují"

**❌ BAD Approach:**
```
Manually grep for "avatar"
Read 20 files one by one
Guess where the bug is
```

**✅ GOOD Approach:**
```javascript
// Step 1: Explore (understand system)
Task(
  subagent_type="Explore",
  thoroughness="medium",
  prompt="Find all avatar rendering logic. Focus on:
    - Where avatars are displayed (components)
    - How avatar data flows (props, context)
    - Any gradient/SVG definitions
    - Recent changes to avatar code"
)

// Step 2: Based on findings, fix directly
Read(specific_file_from_explore_output)
Edit(fix_the_bug)
```

---

### Example 2: "Implementuj Achievements System"

**❌ BAD Approach:**
```
Start coding backend immediately
Realize frontend needs different API structure
Refactor backend
Repeat...
```

**✅ GOOD Approach:**
```javascript
// Step 1: Plan first!
Task(
  subagent_type="Plan",
  prompt="Design achievements system. Consider:
    - Database schema (new tables? columns?)
    - API design (RESTful endpoints)
    - Frontend components needed
    - Integration with existing XP system
    - Phased rollout strategy"
)

// Step 2: Review plan with user
// Step 3: Implement phase by phase
```

---

### Example 3: "Update all lessons to new format"

**❌ BAD Approach:**
```
Edit each lesson manually (12 lessons = 24 files EN+CZ)
Copy-paste same changes
High error risk
```

**✅ GOOD Approach:**
```javascript
Task(
  subagent_type="general-purpose",
  model="haiku", // Cheap for mechanical work
  prompt="Update all lesson meta.json files:
    1. Find all meta.json in content/courses/
    2. Add new field: 'difficulty_tags' (array)
    3. Add new field: 'estimated_time_minutes' (number)
    4. Keep existing fields intact
    5. Validate JSON syntax
    6. Report summary"
)
```

---

## 📝 Prompt Engineering for Subagents

### ✅ Good Subagent Prompts

**Specific:**
```
❌ "Fix the code"
✅ "Fix TypeScript errors in frontend/components/*.tsx.
   Focus on: missing prop types, unused imports, any vs proper types."
```

**Measurable:**
```
❌ "Explore the codebase"
✅ "Find all files that implement rate limiting.
   Return: file paths, which endpoints are protected, limits used."
```

**Autonomous:**
```
❌ "Help me refactor this" (needs iteration)
✅ "Refactor all class components to functional components in frontend/components/.
   Preserve all functionality. Report any components that can't be converted."
```

### ❌ Bad Subagent Prompts

**Too vague:**
```
❌ "Make the app better"
❌ "Find bugs"
```

**Requires iteration:**
```
❌ "Design UI and show me options" (use AskUserQuestion instead)
```

**Too simple:**
```
❌ "Read file X" (use Read tool!)
```

---

## 🚀 Best Practices

### Do:
- ✅ Use Explore for "where is X?" questions
- ✅ Use Plan for big features (before coding)
- ✅ Use General Purpose for bulk mechanical tasks
- ✅ Specify `model="haiku"` for cheap bulk operations
- ✅ Run independent tasks in parallel
- ✅ Write specific, measurable prompts

### Don't:
- ❌ Use subagents for simple file reads
- ❌ Use subagents when you need to iterate with user
- ❌ Run dependent tasks in parallel
- ❌ Use expensive models (sonnet) for mechanical work
- ❌ Write vague prompts ("help me with X")

---

## 📈 Success Metrics

Track subagent effectiveness:

| Metric | Target | How to Measure |
|--------|--------|----------------|
| **Time Saved** | 50%+ | Compare manual vs subagent time |
| **Accuracy** | >90% | % of subagent outputs usable without changes |
| **Cost Efficiency** | <$1/task | Use haiku for bulk operations |
| **User Satisfaction** | High | Did it solve the problem autonomously? |

---

**Maintained by:** Senior Architect (Claude Code)
**Last Updated:** 2025-12-02
**Status:** Active
**Next Review:** When new subagent types are released
