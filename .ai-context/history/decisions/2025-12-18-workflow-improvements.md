# Decision: Workflow v2.0 Improvements

**Date:** 2025-12-18
**Agents consulted:** Claude (Opus 4.5), GPT-5.2 (xhigh orchestrator)

## Context

GPT-5.2 performed full workflow review with xhigh reasoning (64k tokens).
Identified 10 workflow gaps, 8 efficiency improvements, 11 automation opportunities.

## GPT-5.2 Analysis

**Findings:**
- GEMINI.md missing but referenced
- MCP paths hardcoded to wrong user
- No secrets/PII redaction rule
- Circuit breaker hop-based, not evidence-based
- Decision logging not operationalized
- CI missing Python security audit

**Confidence:** 90% - thorough codebase analysis

## Claude Assessment

**Agreement:** Full consensus with GPT-5.2 findings.
No need for Gemini oponentura.

## Domain Weights Applied

- Security (PII redaction): GPT-5.2 weighted higher
- Documentation (GEMINI.md): Equal weight
- Process (circuit breaker): GPT-5.2 weighted higher

## Final Decision

Implement all P0 items immediately:
1. Create GEMINI.md
2. Fix MCP paths (/home/ussi/ -> /home/deploy/)
3. Add secrets/PII redaction rule
4. Add pip-audit to CI
5. Create decision log structure
6. Update circuit breaker to evidence-based

## Rationale

- All findings are concrete, verifiable issues
- Fixes are low-risk, high-value
- No architectural disagreements requiring user escalation

## Verify

- [ ] GEMINI.md exists and references fixed
- [ ] MCP_SETUP.md contains /home/deploy/
- [ ] AGENT_PROTOCOL.md has secrets redaction section
- [ ] CI workflow includes pip-audit
- [ ] decisions/ directory exists with INDEX.md
- [ ] Circuit breaker mentions "new evidence"
