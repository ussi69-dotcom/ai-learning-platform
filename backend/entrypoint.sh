#!/bin/bash
set -e

# Počkáme na Postgres
echo "⏳ Waiting for database connection..."
# Jednoduchý check: zkoušíme python skriptem, jestli se lze připojit
python -c "
import sys
import time
import psycopg2
from os import getenv

# Zkusíme 30x po 1 sekundě
for _ in range(30):
    try:
        # Parse DATABASE_URL or use params
        # Zde pro jednoduchost hardcodujeme check na port 5432 host 'db'
        conn = psycopg2.connect(
            dbname='learning_platform',
            user='user',
            password='password',
            host='db',
            port='5432'
        )
        conn.close()
        sys.exit(0)
    except psycopg2.OperationalError:
        time.sleep(1)

sys.exit(1)
"

echo "✅ Database is ready!"

# Spustíme seed (ten si sám ověří, jestli už data existují, nebo je přepíše pokud je nastaven reset)
echo "🌱 Seeding database..."
python seed.py

# Spustíme server
echo "🚀 Starting Uvicorn server..."
exec uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
