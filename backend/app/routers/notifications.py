from typing import Literal

from fastapi import APIRouter, Depends, Request
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.notification import NotificationAlert
from app.models.user import User
from app.routers.user import get_current_user
from app.services.ai_engine import get_stock_data
from app.services.audit_service import create_audit_log

router = APIRouter()


class AlertCreate(BaseModel):
    symbol: str = Field(min_length=1, max_length=15)
    alert_price: float = Field(gt=0)
    alert_type: Literal["above", "below"]
    channel: Literal["in_app", "email"] = "in_app"


@router.post("/add")
def add_alert(
    payload: AlertCreate,
    request: Request,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    alert = NotificationAlert(
        user_id=current_user.id,
        symbol=payload.symbol.upper(),
        alert_price=payload.alert_price,
        alert_type=payload.alert_type,
        channel=payload.channel,
    )
    db.add(alert)
    db.commit()
    db.refresh(alert)

    create_audit_log(
        db,
        event_type="notification.alert_created",
        details=f"Alert created for {alert.symbol} ({alert.alert_type} {alert.alert_price}).",
        user_id=current_user.id,
        ip_address=request.client.host if request.client else None,
    )

    return {"message": "Alert added", "alert_id": alert.id}


@router.get("/check")
def check_alerts(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    alerts = (
        db.query(NotificationAlert)
        .filter(NotificationAlert.user_id == current_user.id, NotificationAlert.is_triggered == False)
        .all()
    )

    triggered = []
    for alert in alerts:
        stock = get_stock_data(alert.symbol)
        if not stock or stock.get("error"):
            continue

        current_price = stock.get("current_price", 0)
        is_hit = (alert.alert_type == "above" and current_price >= alert.alert_price) or (
            alert.alert_type == "below" and current_price <= alert.alert_price
        )

        if is_hit:
            alert.is_triggered = True
            triggered.append(
                {
                    "id": alert.id,
                    "symbol": alert.symbol,
                    "alert_price": alert.alert_price,
                    "current_price": current_price,
                    "channel": alert.channel,
                    "message": f"{alert.symbol} crossed {alert.alert_type} {alert.alert_price}",
                }
            )

    db.commit()
    return {"total_alerts": len(alerts), "triggered": triggered, "triggered_count": len(triggered)}


@router.get("/")
def get_alerts(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    alerts = db.query(NotificationAlert).filter(NotificationAlert.user_id == current_user.id).all()
    return {
        "alerts": [
            {
                "id": a.id,
                "symbol": a.symbol,
                "alert_price": a.alert_price,
                "alert_type": a.alert_type,
                "channel": a.channel,
                "is_triggered": a.is_triggered,
            }
            for a in alerts
        ]
    }
