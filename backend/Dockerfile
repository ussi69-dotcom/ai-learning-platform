FROM python:3.11-slim

WORKDIR /app

# Instalace systémových závislostí (pro PostgreSQL)
RUN apt-get update && apt-get install -y gcc libpq-dev && rm -rf /var/lib/apt/lists/*

# Instalace Python balíčků
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Kopírování kódu
COPY . .

# Změna: teď spouštíme 'app.main:app' místo 'main:app'
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]