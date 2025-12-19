from fastapi import Request
from slowapi import Limiter
from slowapi.util import get_remote_address
from app.config import settings

# Default to memory if Redis is not configured (e.g. during build), but use Redis in prod
REDIS_URL = settings.REDIS_URL


def get_real_ip(request: Request) -> str:
    """
    Get the real client IP address, handling reverse proxies (nginx, Cloudflare).

    Priority:
    1. CF-Connecting-IP (Cloudflare)
    2. X-Real-IP (nginx)
    3. X-Forwarded-For (first IP in chain)
    4. Fallback to direct connection IP
    """
    # Cloudflare header
    cf_ip = request.headers.get("CF-Connecting-IP")
    if cf_ip:
        return cf_ip.strip()

    # Nginx real IP
    real_ip = request.headers.get("X-Real-IP")
    if real_ip:
        return real_ip.strip()

    # X-Forwarded-For (first IP is the client)
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        return forwarded.split(",")[0].strip()

    # Fallback to slowapi's default
    return get_remote_address(request)


# Initialize Limiter with Redis storage and proper IP detection
limiter = Limiter(
    key_func=get_real_ip,
    storage_uri=REDIS_URL,
    strategy="fixed-window"  # or "moving-window"
)
