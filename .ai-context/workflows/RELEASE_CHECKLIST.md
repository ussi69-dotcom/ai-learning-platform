# Release Checklist

Use this checklist before deploying significant changes to production.

---

## Pre-Release Checklist

### Code Quality
- [ ] `npm run verify` passes (lint + typecheck + build)
- [ ] `make test-backend` passes (pytest)
- [ ] `make check-docs` passes (no doc drift)
- [ ] No HIGH+ vulnerabilities in `npm audit` / `pip-audit`

### Testing
- [ ] Manual smoke test on localhost
- [ ] Key user flows tested:
  - [ ] Login/Register
  - [ ] Course navigation
  - [ ] Lesson completion
  - [ ] Quiz submission
- [ ] Visual regression check (if UI changes)

### Database
- [ ] Migration script reviewed (`alembic revision`)
- [ ] No destructive operations (DROP/DELETE) without backup plan
- [ ] Rollback script ready (if applicable)

### Security (for auth/permissions changes)
- [ ] MACP security review completed
- [ ] No hardcoded secrets in code
- [ ] CORS/CSP headers verified
- [ ] Rate limiting tested

### Documentation
- [ ] WORKING_CONTEXT.md updated
- [ ] API changes documented (if any)
- [ ] Breaking changes noted in commit message

---

## Deployment

### Steps
```bash
# 1. Final local verification
make verify

# 2. Commit with conventional message
git add -A
git commit -m "feat/fix/chore: description"

# 3. Push to main
git push origin main

# 4. Deploy to production
make deploy-prod

# 5. Verify production
curl -s https://yourdomain.com/api/health | jq
```

### Post-Deploy Verification
- [ ] Health endpoint returns 200
- [ ] Frontend loads without console errors
- [ ] Login works
- [ ] New feature/fix verified in prod

---

## Rollback Plan

### If something goes wrong:

1. **Quick rollback (code only):**
```bash
git revert HEAD
git push origin main
make deploy-prod
```

2. **DB rollback (if migration failed):**
```bash
docker compose exec backend alembic downgrade -1
```

3. **Full nuclear rollback:**
```bash
# Stop prod
make down-prod

# Restore from backup (if available)
# ... restore DB dump ...

# Redeploy previous version
git checkout <previous-commit>
make deploy-prod
```

---

## Release Types

### Hotfix (P0 bug)
- [ ] Minimal diff
- [ ] Single focused fix
- [ ] Immediate deploy
- [ ] Post-mortem after stabilization

### Feature Release
- [ ] Full checklist above
- [ ] MACP if touching auth/DB/API
- [ ] Staging test (if available)

### Major Release
- [ ] All of the above
- [ ] Migration rehearsal on staging
- [ ] User communication (if breaking changes)
- [ ] Extended monitoring post-deploy

---

## Monitoring (Post-Deploy)

Check these for 30 minutes after deploy:

- [ ] `docker compose logs backend` - no errors
- [ ] `docker compose logs frontend` - no errors
- [ ] Response times normal
- [ ] No spike in error rates

---

*Template version: 1.0 (Dec 2025)*
