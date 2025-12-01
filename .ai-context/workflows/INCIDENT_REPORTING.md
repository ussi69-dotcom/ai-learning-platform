# 🚨 Incident Reporting Protocol

## Purpose
To ensure every failure is a lesson. When something breaks (e.g., database corruption, production outage, critical bug), we must document it to prevent recurrence.

## When to Report
Create an incident report when:
1.  **Data Loss:** Database reset, accidental deletion.
2.  **Downtime:** Service unavailable for > 5 minutes.
3.  **Security:** Leaked keys, unauthorized access.
4.  **Process Failure:** A workflow (like deployment) failed significantly.

## 📝 The Report Template
Create a new file in `.ai-context/history/incidents/YYYY-MM-DD-incident-name.md`.

```markdown
# Incident Report: [Name]
**Date:** YYYY-MM-DD
**Severity:** [Low/Medium/High/Critical]
**Status:** [Resolved/Monitoring]

## 💥 What Happened?
Brief description of the failure.

## 🕵️ Root Cause Analysis (5 Whys)
1.  Why?
2.  Why?
3.  ...

## 🔧 Resolution
How was it fixed?

## 🛡️ Prevention (Action Items)
- [ ] Update documentation
- [ ] Add automated test
- [ ] Change configuration
```

## 🔄 Post-Incident Workflow
1.  **Fix the Issue:** Prioritize restoring service.
2.  **Write the Report:** Be honest and blameless.
3.  **Update Workflows:** If a document was wrong, fix it immediately.
4.  **Log in Session:** Mention the incident in `SESSION_LOG.md`.
