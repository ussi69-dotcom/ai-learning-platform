FROM python:3.11-slim

WORKDIR /app

# Instalace systémových závislostí (pro PostgreSQL)
RUN apt-get update && apt-get install -y gcc libpq-dev && rm -rf /var/lib/apt/lists/*

# Instalace Python balíčků
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Kopírování kódu
COPY . .

# Nastavení entrypointu
RUN chmod +x entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]