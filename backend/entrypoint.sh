#!/bin/bash
set -e

# Počkáme na Postgres
echo "⏳ Waiting for database connection..."
# Jednoduchý check: zkoušíme python skriptem, jestli se lze připojit
python -c "
import sys
import time
import psycopg2
import os

# Get config from env
db_user = os.getenv('POSTGRES_USER', 'postgres')
db_password = os.getenv('POSTGRES_PASSWORD', 'postgres')
db_name = os.getenv('POSTGRES_DB', 'ai_learning')
db_host = os.getenv('DB_HOST', 'db')

# Zkusíme 30x po 1 sekundě
for _ in range(30):
    try:
        conn = psycopg2.connect(
            dbname=db_name,
            user=db_user,
            password=db_password,
            host=db_host,
            port='5432'
        )
        conn.close()
        sys.exit(0)
    except psycopg2.OperationalError as e:
        # print(f'Waiting for DB... {e}') # Uncomment for debug
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
