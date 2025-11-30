import os
from typing import List
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from pydantic import EmailStr, BaseModel
from pathlib import Path
from app.config import settings

# Load config from settings
SMTP_HOST = settings.SMTP_HOST
SMTP_PORT = settings.SMTP_PORT
SMTP_USER = settings.SMTP_USER
SMTP_PASSWORD = settings.SMTP_PASSWORD
EMAILS_FROM_EMAIL = settings.EMAILS_FROM_EMAIL

class EmailSchema(BaseModel):
    email: List[EmailStr]

use_ssl = True if SMTP_PORT == 465 else False
use_tls = True if SMTP_PORT != 465 else False

conf = ConnectionConfig(
    MAIL_USERNAME=SMTP_USER,
    MAIL_PASSWORD=SMTP_PASSWORD,
    MAIL_FROM=EMAILS_FROM_EMAIL,
    MAIL_PORT=SMTP_PORT,
    MAIL_SERVER=SMTP_HOST,
    MAIL_STARTTLS=use_tls,
    MAIL_SSL_TLS=use_ssl,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True
)

async def send_verification_email(email: EmailStr, token: str):
    """
    Sends a verification email to the user.
    """
    # We point to the backend verification endpoint which will redirect to frontend
    # Use central config for the backend URL
    base_url = settings.BACKEND_PUBLIC_URL
    
    # Ensure we don't double slashes if base_url ends with /
    if base_url.endswith('/'):
        base_url = base_url[:-1]
        
    verify_url = f"{base_url}/auth/verify?token={token}"
    
    html = f"""
    <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #6d28d9;">Welcome to AI Learning! 🚀</h2>
                <p>Hi there,</p>
                <p>Thanks for registering. Please verify your email address to activate your account.</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="{verify_url}" style="background-color: #6d28d9; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Verify Email</a>
                </div>
                <p>Or copy this link:</p>
                <p><a href="{verify_url}">{verify_url}</a></p>
                <p>May the Force be with you,<br>The AI Learning Team</p>
            </div>
        </body>
    </html>
    """

    message = MessageSchema(
        subject="Verify your AI Learning account",
        recipients=[email],
        body=html,
        subtype=MessageType.html
    )

    fm = FastMail(conf)
    await fm.send_message(message)