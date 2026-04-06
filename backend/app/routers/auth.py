from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.schemas.user import (
    PasswordResetConfirm,
    PasswordResetRequest,
    Token,
    UserLogin,
    UserRegister,
    UserResponse,
    VerifyEmailRequest,
)
from app.services.audit_service import create_audit_log
from app.services.auth_service import (
    create_access_token,
    generate_secure_token,
    hash_password,
    hash_token,
    utc_now,
    verify_password,
)
from app.services.email_service import (
    build_password_reset_email,
    build_verification_email,
    send_email,
)
from app.services.mfa_service import verify_totp_code
from app.config import settings

router = APIRouter()


@router.post("/register", response_model=UserResponse)
def register(user_data: UserRegister, request: Request, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    verification_token = generate_secure_token(24)
    new_user = User(
        full_name=user_data.full_name.strip(),
        email=user_data.email,
        hashed_password=hash_password(user_data.password),
        email_verification_token_hash=hash_token(verification_token),
        email_verification_expires_at=utc_now() + timedelta(hours=24),
        is_verified=False,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    create_audit_log(
        db,
        event_type="auth.register",
        details="User registered. Verification email queued.",
        user_id=new_user.id,
        ip_address=request.client.host if request.client else None,
    )

    subject, body = build_verification_email(verification_token)
    email_sent = send_email(new_user.email, subject, body)

    if not email_sent:
        create_audit_log(
            db,
            event_type="auth.verification_email_fallback",
            details="SMTP not configured or delivery failed; debug fallback used.",
            user_id=new_user.id,
            ip_address=request.client.host if request.client else None,
        )

    if settings.EMAIL_DEBUG_TOKENS:
        return {
            "id": new_user.id,
            "full_name": new_user.full_name,
            "email": new_user.email,
            "is_active": new_user.is_active,
        }

    return new_user


@router.post("/verify-email")
def verify_email(payload: VerifyEmailRequest, request: Request, db: Session = Depends(get_db)):
    token_hash = hash_token(payload.token)
    user = db.query(User).filter(User.email_verification_token_hash == token_hash).first()

    if not user:
        raise HTTPException(status_code=400, detail="Invalid verification token")

    if user.email_verification_expires_at is None or user.email_verification_expires_at < utc_now():
        raise HTTPException(status_code=400, detail="Verification token expired")

    user.is_verified = True
    user.email_verification_token_hash = None
    user.email_verification_expires_at = None
    db.commit()

    create_audit_log(
        db,
        event_type="auth.verify_email",
        details="Email verification completed.",
        user_id=user.id,
        ip_address=request.client.host if request.client else None,
    )

    return {"message": "Email verified successfully"}


@router.post("/resend-verification")
def resend_verification(payload: PasswordResetRequest, request: Request, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()

    if user and not user.is_verified:
        verification_token = generate_secure_token(24)
        user.email_verification_token_hash = hash_token(verification_token)
        user.email_verification_expires_at = utc_now() + timedelta(hours=24)
        db.commit()

        create_audit_log(
            db,
            event_type="auth.resend_verification",
            details="Verification email re-sent.",
            user_id=user.id,
            ip_address=request.client.host if request.client else None,
        )

        subject, body = build_verification_email(verification_token)
        email_sent = send_email(user.email, subject, body)

        response = {"message": "Verification email sent."}
        if settings.EMAIL_DEBUG_TOKENS and not email_sent:
            response["dev_verification_token"] = verification_token
        return response

    return {"message": "If the email exists and is unverified, a verification email was sent."}


@router.post("/login", response_model=Token)
def login(user_data: UserLogin, request: Request, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_data.email).first()

    if not user or not verify_password(user_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not user.is_verified:
        raise HTTPException(status_code=403, detail="Please verify your email before logging in")

    if user.mfa_enabled:
        secret = (user.mfa_secret or "").strip()
        if not secret or not user_data.mfa_code or not verify_totp_code(secret, user_data.mfa_code):
            raise HTTPException(status_code=401, detail="Invalid MFA code")

    user.last_login_at = utc_now()
    db.commit()

    token = create_access_token({"sub": user.email})

    create_audit_log(
        db,
        event_type="auth.login",
        details="User logged in successfully.",
        user_id=user.id,
        ip_address=request.client.host if request.client else None,
    )

    return {"access_token": token, "token_type": "bearer"}


@router.post("/request-password-reset")
def request_password_reset(payload: PasswordResetRequest, request: Request, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()

    if user:
        reset_token = generate_secure_token(24)
        user.password_reset_token_hash = hash_token(reset_token)
        user.password_reset_expires_at = utc_now() + timedelta(minutes=30)
        db.commit()

        create_audit_log(
            db,
            event_type="auth.password_reset_requested",
            details="Password reset email queued.",
            user_id=user.id,
            ip_address=request.client.host if request.client else None,
        )

        subject, body = build_password_reset_email(reset_token)
        email_sent = send_email(user.email, subject, body)

        response = {"message": "Password reset email sent."}
        if settings.EMAIL_DEBUG_TOKENS and not email_sent:
            response["dev_reset_token"] = reset_token
        return response

    return {"message": "If the email exists, a reset link has been sent."}


@router.post("/reset-password")
def reset_password(payload: PasswordResetConfirm, request: Request, db: Session = Depends(get_db)):
    token_hash = hash_token(payload.token)
    user = db.query(User).filter(User.password_reset_token_hash == token_hash).first()

    if not user:
        raise HTTPException(status_code=400, detail="Invalid reset token")

    if user.password_reset_expires_at is None or user.password_reset_expires_at < utc_now():
        raise HTTPException(status_code=400, detail="Reset token expired")

    user.hashed_password = hash_password(payload.new_password)
    user.password_reset_token_hash = None
    user.password_reset_expires_at = None
    db.commit()

    create_audit_log(
        db,
        event_type="auth.password_reset_completed",
        details="Password successfully reset.",
        user_id=user.id,
        ip_address=request.client.host if request.client else None,
    )

    return {"message": "Password reset successful"}
