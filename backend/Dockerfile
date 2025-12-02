# Stage 1: Builder
FROM python:3.11-slim AS builder

WORKDIR /app

# Instalace build dependencies (gcc pro kompilaci python knihoven, libpq-dev pro postgres)
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Vytvoření virtuálního prostředí
RUN python -m venv /opt/venv
# Aktivace venv pro instalaci
ENV PATH="/opt/venv/bin:$PATH"

# Instalace Python balíčků
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Stage 2: Runtime
FROM python:3.11-slim AS runner

WORKDIR /app

# Instalace pouze runtime knihoven pro PostgreSQL (bez gcc)
RUN apt-get update && apt-get install -y \
    libpq5 \
    && rm -rf /var/lib/apt/lists/*

# Kopírování virtuálního prostředí z builderu
COPY --from=builder /opt/venv /opt/venv

# Nastavení PATH pro použití venv
ENV PATH="/opt/venv/bin:$PATH"

# Kopírování kódu aplikace
COPY . .

# Nastavení entrypointu
RUN chmod +x entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]
