from fastapi import APIRouter
from pydantic import BaseModel
import psycopg2
import redis
import os

router = APIRouter()

class ServiceStatus(BaseModel):
    name: str
    status: str  # "healthy", "degraded", "down"
    message: str = ""

class HealthResponse(BaseModel):
    status: str
    services: list[ServiceStatus]
    version: str = "1.0.0"

@router.get("/health", response_model=HealthResponse)
async def health_check():
    """
    System health check endpoint.
    Returns status of all critical services (DB, Redis).
    """
    services = []
    overall_status = "healthy"
    
    # Check Database
    try:
        db_url = os.getenv("DATABASE_URL")
        conn = psycopg2.connect(db_url)
        conn.close()
        services.append(ServiceStatus(
            name="PostgreSQL",
            status="healthy",
            message="Connected"
        ))
    except Exception as e:
        services.append(ServiceStatus(
            name="PostgreSQL",
            status="down",
            message=str(e)
        ))
        overall_status = "degraded"
    
    # Check Redis
    try:
        redis_url = os.getenv("REDIS_URL", "redis://redis:6379/0")
        r = redis.from_url(redis_url)
        r.ping()
        services.append(ServiceStatus(
            name="Redis",
            status="healthy",
            message="Connected"
        ))
    except Exception as e:
        services.append(ServiceStatus(
            name="Redis",
            status="down",
            message=str(e)
        ))
        overall_status = "degraded"
    
    return HealthResponse(
        status=overall_status,
        services=services
    )
