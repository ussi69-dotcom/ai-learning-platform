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

security-check: ## Spustí bezpečnostní audit (jen pro VPS)
	@echo "Toto by se mělo spouštět jen na serveru."
	./scripts/setup_security.sh

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
