from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.kyc import KYCVerification
from app.models.user import User
from app.routers.user import get_current_user
from app.services.audit_service import create_audit_log

router = APIRouter()


class KYCSubmitRequest(BaseModel):
    full_name: str = Field(min_length=2, max_length=120)
    id_number: str = Field(min_length=6, max_length=40)
    country: str = Field(min_length=2, max_length=60)
    consent: bool


@router.post("/kyc/submit")
def submit_kyc(
    payload: KYCSubmitRequest,
    request: Request,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if not payload.consent:
        raise HTTPException(status_code=400, detail="User consent is required")

    existing = db.query(KYCVerification).filter(KYCVerification.user_id == current_user.id).first()
    if existing:
        record = existing
    else:
        record = KYCVerification(user_id=current_user.id)
        db.add(record)

    record.full_name = payload.full_name
    record.id_number_last4 = payload.id_number[-4:]
    record.country = payload.country
    record.consent_recorded = True
    record.consent_text = "User consented to KYC verification and compliance checks."
    # Placeholder: external KYC provider should set real status.
    record.status = "approved"

    db.flush()

    create_audit_log(
        db,
        event_type="compliance.kyc_submitted",
        details=f"KYC submitted with status={record.status}",
        user_id=current_user.id,
        ip_address=request.client.host if request.client else None,
    )

    db.commit()
    db.refresh(record)

    return {
        "message": "KYC processed",
        "status": record.status,
        "consent_recorded": record.consent_recorded,
    }


@router.get("/kyc/status")
def get_kyc_status(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    record = db.query(KYCVerification).filter(KYCVerification.user_id == current_user.id).first()
    if not record:
        return {"status": "not_submitted", "consent_recorded": False}

    return {
        "status": record.status,
        "consent_recorded": record.consent_recorded,
        "country": record.country,
        "updated_at": record.updated_at,
    }


@router.get("/audit-logs")
def get_audit_logs(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    # Users can view their own immutable audit trail.
    from app.models.audit import AuditLog

    logs = (
        db.query(AuditLog)
        .filter((AuditLog.user_id == current_user.id) | (AuditLog.user_id == None))
        .order_by(AuditLog.created_at.desc())
        .limit(200)
        .all()
    )

    return {
        "count": len(logs),
        "logs": [
            {
                "event_type": log.event_type,
                "details": log.details,
                "ip_address": log.ip_address,
                "created_at": log.created_at,
            }
            for log in logs
        ],
    }


@router.get("/audit-logs/all")
def get_all_audit_logs(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if (current_user.role or "user").lower() != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")

    from app.models.audit import AuditLog

    logs = db.query(AuditLog).order_by(AuditLog.created_at.desc()).limit(500).all()
    return {
        "count": len(logs),
        "logs": [
            {
                "user_id": log.user_id,
                "event_type": log.event_type,
                "details": log.details,
                "ip_address": log.ip_address,
                "created_at": log.created_at,
            }
            for log in logs
        ],
    }
