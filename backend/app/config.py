import os
from typing import List, Union
from pydantic import AnyHttpUrl, EmailStr, field_validator
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "AI Learning Platform"
    
    # SECURITY
    SECRET_KEY: str = os.getenv("SECRET_KEY", "changeme")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # DATABASE
    # Defaulting to localhost for local dev convenience, but should be set via env
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@db/ai_platform")
    
    # REDIS
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://redis:6379/0")

    # CORS
    # Pydantic will parse a JSON string list (e.g. '["http://localhost:3000"]') 
    # or a comma-separated string if we handle it manually, but JSON is standard for pydantic-settings
    BACKEND_CORS_ORIGINS: List[Union[str, AnyHttpUrl]] = []

    @field_validator("BACKEND_CORS_ORIGINS", mode="before")
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> Union[List[str], str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)

    # EMAIL
    SMTP_HOST: str = os.getenv("SMTP_HOST", "")
    SMTP_PORT: int = int(os.getenv("SMTP_PORT", "587"))
    SMTP_USER: str = os.getenv("SMTP_USER", "")
    SMTP_PASSWORD: str = os.getenv("SMTP_PASSWORD", "")
    EMAILS_FROM_EMAIL: EmailStr = os.getenv("EMAILS_FROM_EMAIL", "info@example.com")

    # FRONTEND
    # Used for generating links in emails
    FRONTEND_URL: str = os.getenv("FRONTEND_URL", "http://localhost:3000")
    
    # DOMAIN NAME (for constructing absolute URLs if needed)
    DOMAIN_NAME: str = os.getenv("DOMAIN_NAME", "localhost")

    # BACKEND PUBLIC URL (for email links)
    # We use a property or validator to ensure this is absolute
    BACKEND_PUBLIC_URL: str = os.getenv("NEXT_PUBLIC_API_URL", "http://localhost:8000")

    @field_validator("BACKEND_PUBLIC_URL", mode="after")
    def assemble_backend_public_url(cls, v: str, info) -> str:
        # If the URL is relative (starts with /), prepend the domain
        if v.startswith("/"):
            domain = info.data.get("DOMAIN_NAME", "localhost")
            # Determine protocol - default to https for non-localhost unless specified
            protocol = "http" if "localhost" in domain else "https"
            return f"{protocol}://{domain}{v}"
        return v

    class Config:
        case_sensitive = True
        # .env file is prioritized, but system env vars (Docker) override it if set
        env_file = ".env"

settings = Settings()
