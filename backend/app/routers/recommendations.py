from fastapi import APIRouter, Depends
from app.models.user import User
from app.routers.user import get_current_user
from app.services.ai_engine import get_recommendations

router = APIRouter()

@router.get("/stocks")
def get_stock_recommendations(current_user: User = Depends(get_current_user)):
    risk_level = current_user.risk_level or "Medium"
    return get_recommendations(risk_level, "stocks")

@router.get("/mutual-funds")
def get_mutual_fund_recommendations(current_user: User = Depends(get_current_user)):
    risk_level = current_user.risk_level or "Medium"
    return get_recommendations(risk_level, "mutual_funds")

@router.get("/all")
def get_all_recommendations(current_user: User = Depends(get_current_user)):
    risk_level = current_user.risk_level or "Medium"
    stocks = get_recommendations(risk_level, "stocks")
    mutual_funds = get_recommendations(risk_level, "mutual_funds")
    return {
        "risk_level": risk_level,
        "stocks": stocks,
        "mutual_funds": mutual_funds
    }
