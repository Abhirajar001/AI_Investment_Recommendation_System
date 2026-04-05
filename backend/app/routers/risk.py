from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.routers.user import get_current_user
from pydantic import BaseModel

router = APIRouter()

class RiskAssessment(BaseModel):
    age: int
    income: float
    investment_experience: str  # "none", "beginner", "intermediate", "expert"
    investment_horizon: str     # "short", "medium", "long"
    risk_tolerance: str         # "low", "medium", "high"
    monthly_savings: float

def calculate_risk_score(data: RiskAssessment) -> float:
    score = 0

    # Age scoring
    if data.age < 30:
        score += 30
    elif data.age < 45:
        score += 20
    elif data.age < 60:
        score += 10
    else:
        score += 5

    # Income scoring
    if data.income > 100000:
        score += 25
    elif data.income > 50000:
        score += 15
    else:
        score += 5

    # Experience scoring
    experience_scores = {"none": 0, "beginner": 5, "intermediate": 15, "expert": 25}
    score += experience_scores.get(data.investment_experience, 0)

    # Horizon scoring
    horizon_scores = {"short": 5, "medium": 10, "long": 20}
    score += horizon_scores.get(data.investment_horizon, 0)

    # Risk tolerance scoring
    tolerance_scores = {"low": 0, "medium": 10, "high": 20}
    score += tolerance_scores.get(data.risk_tolerance, 0)

    return score

def get_risk_level(score: float) -> str:
    if score >= 80:
        return "High"
    elif score >= 50:
        return "Medium"
    else:
        return "Low"

@router.post("/assess")
def assess_risk(data: RiskAssessment, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    score = calculate_risk_score(data)
    level = get_risk_level(score)

    current_user.age = data.age
    current_user.income = data.income
    current_user.investment_experience = data.investment_experience
    current_user.risk_score = score
    current_user.risk_level = level

    db.commit()
    db.refresh(current_user)

    return {
        "risk_score": score,
        "risk_level": level,
        "message": f"Your risk level is {level} with a score of {score}",
        "recommendations_type": level
    }

@router.get("/profile")
def get_risk_profile(current_user: User = Depends(get_current_user)):
    return {
        "age": current_user.age,
        "income": current_user.income,
        "investment_experience": current_user.investment_experience,
        "risk_score": current_user.risk_score,
        "risk_level": current_user.risk_level
    }