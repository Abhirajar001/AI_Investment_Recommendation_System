import smtplib

from app.services.email_service import send_email


def test_send_email_returns_false_when_smtp_raises(monkeypatch) -> None:
    class BrokenSMTP:
        def __init__(self, *args, **kwargs):
            raise TimeoutError("smtp timed out")

    monkeypatch.setattr(smtplib, "SMTP", BrokenSMTP)

    assert send_email("user@example.com", "Subject", "Body") is False