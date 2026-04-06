from fastapi import APIRouter, Depends, HTTPException, Request, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.schemas.user import MFAEnableRequest, UserProfileUpdate
from app.services.audit_service import create_audit_log
from app.services.auth_service import verify_token
from app.services.mfa_service import build_totp_uri, generate_totp_secret

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")


def get_current_user(
    request: Request,
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
):
    email = verify_token(token)
    if not email:
        create_audit_log(
            db,
            event_type="security.invalid_token",
            details="Rejected request due to invalid token.",
            ip_address=request.client.host if request.client else None,
        )
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if not user.is_active:
        raise HTTPException(status_code=403, detail="User account is inactive")

    return user


@router.get("/me")
def get_profile(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "full_name": current_user.full_name,
        "email": current_user.email,
        "is_active": current_user.is_active,
        "is_verified": current_user.is_verified,
        "age": current_user.age,
        "income": current_user.income,
        "investment_experience": current_user.investment_experience,
        "mfa_enabled": current_user.mfa_enabled,
        "role": current_user.role,
    }


@router.put("/me")
def update_profile(
    payload: UserProfileUpdate,
    request: Request,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    current_user.full_name = payload.full_name
    if payload.age is not None:
        current_user.age = payload.age
    if payload.income is not None:
        current_user.income = payload.income
    if payload.investment_experience is not None:
        current_user.investment_experience = payload.investment_experience

    db.commit()
    db.refresh(current_user)

    create_audit_log(
        db,
        event_type="profile.updated",
        details="User profile updated.",
        user_id=current_user.id,
        ip_address=request.client.host if request.client else None,
    )

    return {
        "message": "Profile updated",
        "profile": {
            "full_name": current_user.full_name,
            "age": current_user.age,
            "income": current_user.income,
            "investment_experience": current_user.investment_experience,
        },
    }


@router.post("/mfa")
def configure_mfa(
    payload: MFAEnableRequest,
    request: Request,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if payload.enable:
        current_user.mfa_enabled = True
        if not current_user.mfa_secret:
            current_user.mfa_secret = generate_totp_secret()
    else:
        current_user.mfa_enabled = False
        current_user.mfa_secret = None

    db.commit()

    create_audit_log(
        db,
        event_type="security.mfa_updated",
        details=f"MFA {'enabled' if payload.enable else 'disabled'}.",
        user_id=current_user.id,
        ip_address=request.client.host if request.client else None,
    )

    response = {"message": f"MFA {'enabled' if payload.enable else 'disabled'}", "mfa_enabled": current_user.mfa_enabled}
    if payload.enable:
        response["totp_uri"] = build_totp_uri(current_user.mfa_secret, current_user.email)
        response["totp_secret"] = current_user.mfa_secret

    return response
