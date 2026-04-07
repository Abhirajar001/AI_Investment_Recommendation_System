from sqlalchemy.orm import Session

from app.models.audit import AuditLog


def create_audit_log(
    db: Session,
    event_type: str,
    details: str,
    user_id: int | None = None,
    ip_address: str | None = None,
) -> None:
    log = AuditLog(
        user_id=user_id,
        event_type=event_type,
        details=details,
        ip_address=ip_address,
    )
    db.add(log)
