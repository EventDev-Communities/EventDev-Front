.PHONY: help \
    clean reset-dev reset-prod \
    install test lint format \
    dev-up dev-down dev-logs dev-shell \
    setup-dev setup-prod create-networks \
    check-env status health \
    prod-up prod-down prod-logs prod-shell



# Default target

help:
	@echo "    EventDev Frontend - Makefile Commands"
	@echo "    ====================================="
	@echo ""
	@awk 'BEGIN {FS = ":.*##"} /^[a-zA-Z_-]+:.*##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)
	@echo ""
	@echo "    Examples:"
	@echo ""
	@echo "    make dev-up     # Start development environment"
	@echo "    make prod-up    # Start production environment"
	@echo "    make dev-logs   # Show development logs"
	@echo "    make clean      # Clean all containers and volumes"

# ------------------------------------------------------------



# Development commands

dev-up: check-env create-networks ## Start development environment
	@echo " ✦  Starting development environment..."
	@docker compose -f docker-compose.dev.yml up --build -d
	@echo " ✓  Development environment started!"
	@echo "    Frontend: http://localhost:5173"

dev-down: ## Stop development environment
	@echo " ✦  Stopping development environment..."
	@docker compose -f docker-compose.dev.yml down -v --remove-orphans
	@echo " ✓  Development environment stopped!"

dev-logs: ## Show development logs
	@echo " ✦  Showing development logs (Press Ctrl+C to exit)..."
	@docker compose -f docker-compose.dev.yml logs -f frontend-dev

dev-shell: ## Access development container shell
	@docker compose -f docker-compose.dev.yml exec frontend-dev sh

# ------------------------------------------------------------



# Production commands

prod-up: check-env create-networks ## Start production environment
	@echo " ✦  Starting production environment..."
	@docker compose -f docker-compose.prod.yml up --build -d --remove-orphans
	@echo " ✓  Production environment started!"
	@echo "    Frontend: http://localhost:5173"

prod-down: ## Stop production environment
	@echo " ✦  Stopping production environment..."
	@docker compose -f docker-compose.prod.yml down --remove-orphans 2>/dev/null || true
	@echo " ✓  Production environment stopped!"

prod-logs: ## Show production logs
	@echo " ✦  Showing production logs (Press Ctrl+C to exit)..."
	@docker compose -f docker-compose.prod.yml logs -f frontend

prod-shell: ## Access production container shell
	@docker compose -f docker-compose.prod.yml exec frontend sh

# ------------------------------------------------------------



# Utility commands

create-networks: ## Create required networks
	@echo " ✦  Checking and creating networks if needed..."
	@if ! docker network ls | grep -q eventdev-dev-network; then \
		echo "    Creating eventdev-dev-network..."; \
		docker network create eventdev-dev-network; \
	else \
		echo "    eventdev-dev-network already exists"; \
	fi
	@if ! docker network ls | grep -q eventdev-prod-network; then \
		echo "    Creating eventdev-prod-network..."; \
		docker network create eventdev-prod-network; \
	else \
		echo "    eventdev-prod-network already exists"; \
	fi

clean: ## Clean all containers, images and volumes
	@echo " ✦  Cleaning containers and volumes..."
	@docker compose -f docker-compose.dev.yml down -v --remove-orphans 2>/dev/null || true
	@docker compose -f docker-compose.prod.yml down -v --remove-orphans 2>/dev/null || true
	@docker system prune -af
	@docker volume prune -f
	@echo " ✓  Cleanup completed!"

reset-dev: dev-down clean dev-up ## Reset development environment
reset-prod: prod-down clean prod-up ## Reset production environment

# ------------------------------------------------------------



# Development utilities

install: ## Install dependencies
	@echo " ✦  Installing dependencies..."
	@docker compose -f docker-compose.dev.yml exec frontend-dev pnpm install

lint: ## Run linter
	@echo " ✦  Running linter..."
	@docker compose -f docker-compose.dev.yml exec frontend-dev pnpm lint

format: ## Format code
	@echo " ✦  Formatting code..."
	@docker compose -f docker-compose.dev.yml exec frontend-dev pnpm format

# ------------------------------------------------------------



# Environment setup

setup-dev: ## Setup development environment
	@echo " ✦  Setting up development environment..."
	@cp .env.dev.example .env
	@echo " ✓  .env file created from .env.dev.example"
	@echo "    Please review and update .env file before running 'make dev-up'"

setup-prod: ## Setup production environment
	@echo " ✦  Setting up production environment..."
	@cp .env.prod.example .env
	@echo " ✓  .env file created from .env.prod.example"
	@echo "    IMPORTANT: Update API URL and settings in .env before running 'make prod-up'"

check-env: ## Check if .env file exists
	@if [ ! -f .env ]; then \
		echo " ⚠  .env file not found!"; \
		echo "    Run 'make setup-dev' or 'make setup-prod' to create it"; \
		exit 1; \
	fi

# ------------------------------------------------------------



# Monitoring

status: ## Show containers status
	@echo " ✦  Development containers:"
	@docker compose -f docker-compose.dev.yml ps 2>/dev/null || echo "Development environment not running"
	@echo ""
	@echo " ✦  Production containers:"
	@docker compose -f docker-compose.prod.yml ps 2>/dev/null || echo "Production environment not running"

health: ## Check frontend health
	@echo " ✦  Checking frontend health..."
	@curl -f http://localhost:5173 && echo "✓  Frontend is healthy!" || echo "⚠  Frontend is not responding"
