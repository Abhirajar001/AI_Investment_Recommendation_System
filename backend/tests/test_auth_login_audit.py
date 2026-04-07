from starlette.requests import Request
from fastapi import HTTPException
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.models.audit import AuditLog
from app.models.user import User
from app.routers.auth import login
from app.schemas.user import UserLogin
from app.services.auth_service import hash_password
from app.services.mfa_service import generate_totp_secret


def _build_request(ip: str = "127.0.0.1") -> Request:
    scope = {
        "type": "http",
        "method": "POST",
        "path": "/api/auth/login",
        "headers": [],
        "client": (ip, 12345),
    }
    return Request(scope)


def _make_session() -> Session:
    engine = create_engine(
        "sqlite+pysqlite:///:memory:",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    User.__table__.create(bind=engine)
    AuditLog.__table__.create(bind=engine)
    local_session = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    return local_session()


def test_login_invalid_credentials_creates_audit_row() -> None:
    db = _make_session()
    try:
        payload = UserLogin(email="missing@example.com", password="wrong-password")
        request = _build_request("10.0.0.1")

        try:
            login(payload, request, db)
            assert False, "Expected HTTPException for invalid credentials"
        except HTTPException as exc:
            assert exc.status_code == 401

        audit = db.query(AuditLog).filter(AuditLog.event_type == "auth.login_failed").first()
        assert audit is not None
        assert audit.user_id is None
        assert "missing@example.com" in (audit.details or "")
        assert audit.ip_address == "10.0.0.1"
    finally:
        db.close()


def test_login_unverified_user_creates_audit_row() -> None:
    db = _make_session()
    try:
        user = User(
            full_name="Unverified User",
            email="unverified@example.com",
            hashed_password=hash_password("StrongPass123"),
            is_active=True,
            is_verified=False,
            role="user",
        )
        db.add(user)
        db.commit()

        payload = UserLogin(email="unverified@example.com", password="StrongPass123")
        request = _build_request("10.0.0.2")

        try:
            login(payload, request, db)
            assert False, "Expected HTTPException for unverified email"
        except HTTPException as exc:
            assert exc.status_code == 403

        audit = (
            db.query(AuditLog)
            .filter(AuditLog.event_type == "auth.login_failed", AuditLog.user_id == user.id)
            .first()
        )
        assert audit is not None
        assert "not verified" in (audit.details or "")
        assert audit.ip_address == "10.0.0.2"
    finally:
        db.close()


def test_login_invalid_mfa_creates_audit_row() -> None:
    db = _make_session()
    try:
        user = User(
            full_name="MFA User",
            email="mfa@example.com",
            hashed_password=hash_password("StrongPass123"),
            is_active=True,
            is_verified=True,
            mfa_enabled=True,
            mfa_secret=generate_totp_secret(),
            role="user",
        )
        db.add(user)
        db.commit()

        payload = UserLogin(email="mfa@example.com", password="StrongPass123", mfa_code="aaaaaa")
        request = _build_request("10.0.0.3")

        try:
            login(payload, request, db)
            assert False, "Expected HTTPException for invalid MFA"
        except HTTPException as exc:
            assert exc.status_code == 401

        audit = (
            db.query(AuditLog)
            .filter(AuditLog.event_type == "auth.login_failed", AuditLog.user_id == user.id)
            .first()
        )
        assert audit is not None
        assert "invalid MFA code" in (audit.details or "")
        assert audit.ip_address == "10.0.0.3"
    finally:
        db.close()