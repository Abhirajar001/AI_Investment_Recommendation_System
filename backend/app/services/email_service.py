import smtplib
from email.message import EmailMessage
import logging

from app.config import settings


logger = logging.getLogger(__name__)


def send_email(to_email: str, subject: str, body: str) -> bool:
    if not settings.SMTP_HOST:
        # No SMTP configured; caller may use debug fallback behavior.
        return False

    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = settings.EMAIL_FROM
    msg["To"] = to_email
    msg.set_content(body)

    try:
        with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT, timeout=20) as smtp:
            if settings.SMTP_USE_TLS:
                smtp.starttls()
            if settings.SMTP_USERNAME and settings.SMTP_PASSWORD:
                smtp.login(settings.SMTP_USERNAME, settings.SMTP_PASSWORD)
            smtp.send_message(msg)
        return True
    except Exception:
        logger.exception("Failed to send email to %s", to_email)
        return False


def build_verification_email(token: str) -> tuple[str, str]:
    subject = "Verify your account"
    link = f"{settings.APP_BASE_URL}/verify-email?token={token}"
    body = (
        "Welcome! Please verify your account by opening this link:\n\n"
        f"{link}\n\n"
        "If you did not request this, you can ignore this message."
    )
    return subject, body


def build_password_reset_email(token: str) -> tuple[str, str]:
    subject = "Reset your password"
    link = f"{settings.APP_BASE_URL}/reset-password?token={token}"
    body = (
        "We received a request to reset your password.\n\n"
        f"{link}\n\n"
        "If you did not request this, you can ignore this message."
    )
    return subject, body
