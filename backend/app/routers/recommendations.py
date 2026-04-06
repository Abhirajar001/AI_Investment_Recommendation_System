from datetime import datetime, timezone

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.goal import Goal
from app.models.user import User
from app.routers.user import get_current_user
from app.services.ai_engine import get_recommendations

router = APIRouter()

@router.get("/stocks")
def get_stock_recommendations(
    current_user: User = Depends(get_current_user),
):
    risk_level = current_user.risk_level or "Medium"
    return get_recommendations(risk_level, "stocks")

@router.get("/mutual-funds")
def get_mutual_fund_recommendations(
    current_user: User = Depends(get_current_user),
):
    risk_level = current_user.risk_level or "Medium"
    return get_recommendations(risk_level, "mutual_funds")

@router.get("/all")
def get_all_recommendations(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    risk_level = current_user.risk_level or "Medium"
    stocks = get_recommendations(risk_level, "stocks")
    mutual_funds = get_recommendations(risk_level, "mutual_funds")

    goals = db.query(Goal).filter(Goal.user_id == current_user.id).all()
    short_term_goals = [g.title for g in goals if (g.goal_type or "").lower().startswith("short")]
    long_term_goals = [g.title for g in goals if (g.goal_type or "").lower().startswith("long")]

    return {
        "risk_level": risk_level,
        "generated_at": datetime.now(timezone.utc),
        "goal_context": {
            "short_term_goals": short_term_goals,
            "long_term_goals": long_term_goals,
            "influence_note": "Recommendations are balanced with your selected goal horizon.",
        },
        "stocks": stocks,
        "mutual_funds": mutual_funds
    }
