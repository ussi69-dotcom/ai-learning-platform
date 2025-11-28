from slowapi import Limiter
from slowapi.util import get_remote_address
import os

# Default to memory if Redis is not configured (e.g. during build), but use Redis in prod
REDIS_URL = os.getenv("REDIS_URL", "redis://redis:6379/0")

# Initialize Limiter with Redis storage
limiter = Limiter(
    key_func=get_remote_address, 
    storage_uri=REDIS_URL,
    strategy="fixed-window" # or "moving-window"
)
