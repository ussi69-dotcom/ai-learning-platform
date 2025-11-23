# 🤖 AI Agent Selection Guide

## Purpose
This document helps you choose the right AI agent for different tasks in the AI Learning Platform project.

---

## 🎯 Agent Profiles

### 1. Claude Sonnet 4.5 (Thinking) - Primary Production Agent

**Strengths:**
- ✅ Excellent at following complex instructions
- ✅ Strong context awareness (200K tokens)
- ✅ Superior code review and debugging
- ✅ Precise MDX/React/TypeScript work
- ✅ "Thinking" mode for complex reasoning
- ✅ Reliable documentation writing

**Best For:**
- Content changes (lessons, MDX files)
- Component development
- Following .ai-context/ rules strictly
- Multi-step workflows
- Code refactoring
- Architecture decisions

**Use When:**
- Task requires precision + context awareness
- Multiple files need coordination
- Following detailed specifications
- Quality over speed

**Avoid When:**
- Simple one-liner fixes
- Rapid prototyping (use Gemini)

---

### 2. Gemini 3 Pro (High) - Speed & Creativity

**Strengths:**
- ✅ Extremely fast responses
- ✅ Great at research & summarization
- ✅ Creative content generation
- ✅ Long context window (1M+ tokens)
- ✅ Good at brainstorming

**Best For:**
- Quick research tasks
- Content ideation (lesson topics, analogies)
- Rapid prototyping
- Summarizing documents
- Creative writing (blog posts, examples)

**Use When:**
- Speed is priority
- Exploring multiple approaches
- Need fresh ideas
- Less strict requirements

**Avoid When:**
- Precise code implementation required
- Strict rules must be followed
- Production-critical changes

**⚠️ Warning:**
- Sometimes "improvises" instead of following rules exactly
- May skip steps in detailed workflows
- Better for creative tasks than precision work

---

### 3. Claude Sonnet 4.5 (Standard) - Balanced Option

**Strengths:**
- ✅ Faster than Thinking mode
- ✅ Still reliable and precise
- ✅ Good context handling
- ✅ Solid coding capabilities

**Best For:**
- Standard coding tasks
- Bug fixes
- Simple feature additions
- Quick iterations
- Documentation updates

**Use When:**
- Task is straightforward
- Don't need deep reasoning
- Want Claude quality without Thinking overhead

**Avoid When:**
- Complex multi-step workflows
- Heavy context needed
- Architecture decisions

---

### 4. GPT-OSS 1208 (Medium) - Experimental

**Strengths:**
- ✅ Open source model
- ✅ Good for learning/testing
- ✅ Cost-effective

**Limitations:**
- ❌ Smaller context window
- ❌ Less reliable with complex instructions
- ❌ May struggle with large codebases
- ❌ Not recommended for production

**Best For:**
- Testing open-source models
- Learning experiments
- Simple scripts
- Cost-sensitive prototyping

**Use When:**
- Experimenting with alternatives
- Educational purposes
- Budget constraints

**Avoid When:**
- Production work
- Complex projects
- Following detailed specifications

---

## 📋 Task-Specific Recommendations

### Content Work (Lessons, MDX)
**Primary:** Claude Sonnet 4.5 (Thinking)
**Backup:** Gemini 3 Pro (High) - for initial drafts

**Why:** Content must follow CONTENT_GUIDELINES.md precisely, use correct components, maintain tone.

---

### Component Development (React/TypeScript)
**Primary:** Claude Sonnet 4.5 (Thinking)
**Backup:** Claude Sonnet 4.5 (Standard) - for simple components

**Why:** Type safety, proper hooks usage, accessibility, following design system.

---

### Bug Fixes
**Primary:** Claude Sonnet 4.5 (Standard)
**Upgrade to:** Claude Sonnet 4.5 (Thinking) - if bug is complex

**Why:** Most bugs are straightforward, don't need deep reasoning.

---

### Research & Planning
**Primary:** Gemini 3 Pro (High)
**Backup:** Claude Sonnet 4.5 (Thinking) - for detailed analysis

**Why:** Gemini excels at rapid research, summarization, finding patterns.

---

### Documentation
**Primary:** Claude Sonnet 4.5 (Thinking)
**Alternative:** Claude Sonnet 4.5 (Standard) - for simple updates

**Why:** Documentation must be precise, well-structured, comprehensive.

---

### Rapid Prototyping
**Primary:** Gemini 3 Pro (High)
**Refine with:** Claude Sonnet 4.5 (Thinking)

**Why:** Gemini is fast, generates many ideas. Sonnet refines to production quality.

---

### Code Review
**Primary:** Claude Sonnet 4.5 (Thinking)
**Never:** GPT-OSS (not reliable enough)

**Why:** Code review requires deep understanding, context awareness, spotting edge cases.

---

## 🚀 Recommended Workflow

### For New Features:
1. **Research:** Gemini 3 Pro (High) - gather info, explore options
2. **Planning:** Claude Sonnet 4.5 (Thinking) - write implementation plan
3. **Implementation:** Claude Sonnet 4.5 (Thinking) - code the feature
4. **Testing:** Claude Sonnet 4.5 (Standard) - write tests
5. **Documentation:** Claude Sonnet 4.5 (Thinking) - document the feature

### For Content Creation:
1. **Brainstorm:** Gemini 3 Pro (High) - generate ideas, analogies
2. **Outline:** Claude Sonnet 4.5 (Thinking) - structure content
3. **Write:** Claude Sonnet 4.5 (Thinking) - follow guidelines
4. **Review:** Claude Sonnet 4.5 (Standard) - quick edits

### For Bug Fixes:
1. **Diagnose:** Claude Sonnet 4.5 (Standard) - identify issue
2. **Fix:** Claude Sonnet 4.5 (Standard) - implement fix
3. **Test:** Claude Sonnet 4.5 (Standard) - verify fix
4. **Document:** Claude Sonnet 4.5 (Standard) - update comments

---

## 💰 Cost Optimization

### High-Value Tasks (Use Premium):
- Production code changes
- Architecture decisions
- Content that students see
- Complex debugging
- Security-related work

### Lower-Value Tasks (Use Standard):
- Simple bug fixes
- Documentation updates
- Routine refactoring
- Test writing

### Experimental Tasks (Use OSS):
- Learning new approaches
- Prototyping throwaway code
- Testing ideas

---

## ⚠️ Common Mistakes

### ❌ Don't Use Gemini For:
- Production code that must follow strict rules
- Complex multi-file changes
- Tasks requiring precise component usage
- Anything touching .ai-context/ rules

### ❌ Don't Use GPT-OSS For:
- Production work
- Complex projects
- Tasks with many dependencies
- Anything requiring deep context

### ❌ Don't Use Sonnet Thinking For:
- Simple one-line changes
- Quick iterations during prototyping
- Tasks where speed > precision

---

## 🎯 Current Project Assignments

### Primary Developer (80% of work):
**Claude Sonnet 4.5 (Thinking)**
- All content changes
- Component development
- Following .ai-context/ system
- Implementation plans
- Code review

### Research & Ideation (15% of work):
**Gemini 3 Pro (High)**
- Topic research
- Content brainstorming
- Best practices discovery
- Quick prototypes

### Quick Fixes (5% of work):
**Claude Sonnet 4.5 (Standard)**
- Simple bugs
- Typo fixes
- Minor updates

### Experimental (0% of production):
**GPT-OSS 1208**
- Testing only
- Learning exercises
- Not for commits

---

## 📊 Performance Tracking

Track which agent works best for your use cases:

```markdown
| Task Type | Agent Used | Success? | Notes |
|-----------|------------|----------|-------|
| Lesson 1 redesign | Sonnet Thinking | ✅ | Perfect adherence to guidelines |
| Quick typo fix | Sonnet Standard | ✅ | Fast, accurate |
| Research best practices | Gemini High | ✅ | Found great examples |
```

---

## 🔄 When to Switch Agents

### Escalate to Sonnet Thinking when:
- Standard agent struggles with context
- Task complexity increases
- Multiple attempts needed
- Precision is critical

### Downgrade to Standard when:
- Thinking mode is overkill
- Simple, straightforward task
- Speed is priority
- Budget constraints

### Try Gemini when:
- Need fresh perspective
- Brainstorming phase
- Research task
- Speed over precision

---

**Last Updated:** Cycle 16 (Perplexity Era)
**Review:** Update after every major project phase
