from datetime import datetime, timezone

from jose import jwt

from app.config import settings
from app.services.auth_service import create_access_token


def test_create_access_token_uses_timezone_aware_expiry() -> None:
    token = create_access_token({"sub": "user@example.com"})
    payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])

    assert payload["sub"] == "user@example.com"
    exp = datetime.fromtimestamp(payload["exp"], tz=timezone.utc)
    assert exp.tzinfo is timezone.utc