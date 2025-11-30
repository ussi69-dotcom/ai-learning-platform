from slowapi import Limiter
from slowapi.util import get_remote_address
from app.config import settings

# Default to memory if Redis is not configured (e.g. during build), but use Redis in prod
REDIS_URL = settings.REDIS_URL

# Initialize Limiter with Redis storage
limiter = Limiter(
    key_func=get_remote_address, 
    storage_uri=REDIS_URL,
    strategy="fixed-window" # or "moving-window"
)
