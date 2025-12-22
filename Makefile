# 🛠️ AI Learning Platform - Developer Commands

.PHONY: help up down restart logs reset shell-backend shell-frontend test-backend

help: ## Zobrazí tento seznam příkazů
	help: ## Zobrazí tento seznam příkazů
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%%-20s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST) 

up: ## Spustí platformu (build + detach)
	docker compose up -d --build

down: ## Zastaví platformu
	docker compose down

stop: ## Zastaví platformu (alias pro down)
	docker compose down

restart: ## Restartuje všechny kontejnery
	docker compose restart

logs: ## Zobrazí logy všech služeb (follow)
	docker compose logs -f

logs-backend: ## Zobrazí logy backendu
	docker logs ai-backend -f

logs-frontend: ## Zobrazí logy frontendu
	docker logs ai-frontend -f

reset: ## ⚠️ NUCLEAR RESET: Smaže DB a volumes, pak znovu postaví
	@echo "⚠️  VAROVÁNÍ: Toto smaže celou databázi!"
	@read -p "Jsi si jistý? [y/N] " ans && [ $${ans:-N} = y ]
	docker compose down -v
	docker compose up -d --build

shell-backend: ## Otevře bash v běžícím backend kontejneru
	docker compose exec backend bash

shell-frontend: ## Otevře sh v běžícím frontend kontejneru
	docker compose exec frontend sh

test-backend: ## Spustí testy v backendu
	docker compose exec backend pytest

check-docs: ## Zkontroluje dokumentaci na drift (stale paths, missing files)
	./scripts/check-doc-drift.sh

macp: ## Spustí MACP blind ballot (GPT-5.2 + Gemini paralelně)
	@read -p "MACP prompt: " prompt && ./scripts/macp.sh "$$prompt"

verify: ## Spustí všechny kontroly (frontend + backend + docs)
	cd frontend && npm run verify
	docker compose exec backend pytest
	./scripts/check-doc-drift.sh

security-check: ## Spustí bezpečnostní audit (jen pro VPS)
	@echo "Toto by se mělo spouštět jen na serveru."
	./scripts/setup_security.sh

commit: ## Git commit s auto-update WORKING_CONTEXT
	./scripts/update-working-context.sh
	git add .ai-context/state/WORKING_CONTEXT.md
	git commit

# -----------------------------------------------------------------------------
# 🚀 PRODUCTION COMMANDS (Používejte na serveru)
# -----------------------------------------------------------------------------

deploy-prod: ## 🚀 BEZPEČNÝ DEPLOY NA PRODUKCI (Stopne dev, spustí prod, restartuje nginx)
	@echo "🛑 Stopping any potentially running DEV containers..."
	docker compose down --remove-orphans || true
	@echo "🏗️  Building and starting PRODUCTION stack..."
	env -u NEXT_PUBLIC_API_URL docker compose -f docker-compose.prod.yml up -d --build
	@echo "🔄 Reloading Nginx..."
	docker compose -f docker-compose.prod.yml restart nginx
	@echo "✅ Deployment complete! Check logs with 'make logs-prod'"

down-prod: ## Zastaví produkční stack
	docker compose -f docker-compose.prod.yml down

logs-prod: ## Zobrazí logy produkčního stacku
	docker compose -f docker-compose.prod.yml logs -f

# -----------------------------------------------------------------------------
# 🧪 TEST COMMANDS
# -----------------------------------------------------------------------------

smoke-test: ## Spustí rychlý smoke test proti produkci
	@echo "🧪 Running smoke tests against $(URL)..."
	./tests/smoke/smoke_test.sh $(URL)

smoke-test-prod: ## Spustí smoke test proti ai-teaching.eu
	./tests/smoke/smoke_test.sh https://ai-teaching.eu

smoke-test-local: ## Spustí smoke test proti localhost
	./tests/smoke/smoke_test.sh http://localhost

test-visual: ## Spustí Playwright visual testy
	cd frontend && npx playwright test

test-visual-update: ## Aktualizuje Playwright snapshoty
	cd frontend && npx playwright test --update-snapshots

test-smoke-playwright: ## Spustí Playwright production smoke testy
	cd frontend && npx playwright test production-smoke.spec.ts

test-registration: ## Spustí testy registračního flow (vyžaduje TEST_API_KEY)
	@if [ -z "$(TEST_API_KEY)" ]; then \
		echo "❌ TEST_API_KEY is required. Usage: make test-registration TEST_API_KEY=your-key"; \
		exit 1; \
	fi
	cd frontend && TEST_API_KEY=$(TEST_API_KEY) npx playwright test registration-flow.spec.ts

test-all-e2e: ## Spustí všechny E2E testy (vyžaduje TEST_API_KEY)
	@if [ -z "$(TEST_API_KEY)" ]; then \
		echo "❌ TEST_API_KEY is required. Usage: make test-all-e2e TEST_API_KEY=your-key"; \
		exit 1; \
	fi
	./tests/smoke/smoke_test.sh http://localhost
	cd frontend && TEST_API_KEY=$(TEST_API_KEY) npx playwright test

test-prod-full: ## Kompletní test produkce (smoke + visual + registration)
	@if [ -z "$(TEST_API_KEY)" ]; then \
		echo "❌ TEST_API_KEY is required. Usage: make test-prod-full TEST_API_KEY=your-key URL=https://ai-teaching.eu"; \
		exit 1; \
	fi
	@echo "🧪 Running full production test suite..."
	./tests/smoke/smoke_test.sh $(URL)
	cd frontend && PLAYWRIGHT_BASE_URL=$(URL) npx playwright test production-smoke.spec.ts
	cd frontend && PLAYWRIGHT_BASE_URL=$(URL) TEST_API_KEY=$(TEST_API_KEY) npx playwright test registration-flow.spec.ts
	@echo "✅ All production tests passed!"
