from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.goal import Goal
from app.models.user import User
from app.routers.user import get_current_user
from app.services.audit_service import create_audit_log

router = APIRouter()


class GoalCreate(BaseModel):
    title: str = Field(min_length=1, max_length=100)
    target_amount: float = Field(gt=0)
    current_amount: float = Field(default=0, ge=0)
    deadline: str | None = None
    goal_type: str = Field(min_length=1, max_length=50)  # short_term | long_term


class GoalUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1, max_length=100)
    target_amount: float | None = Field(default=None, gt=0)
    current_amount: float | None = Field(default=None, ge=0)
    deadline: str | None = None
    goal_type: str | None = Field(default=None, min_length=1, max_length=50)


def compute_progress(current_amount: float, target_amount: float) -> float:
    if target_amount <= 0:
        return 0.0
    progress = (current_amount / target_amount) * 100
    return round(min(max(progress, 0.0), 100.0), 2)


@router.post("/add")
def add_goal(
    payload: GoalCreate,
    request: Request,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    goal = Goal(
        user_id=current_user.id,
        title=payload.title,
        target_amount=payload.target_amount,
        current_amount=payload.current_amount,
        deadline=payload.deadline,
        goal_type=payload.goal_type,
    )
    db.add(goal)
    db.commit()
    db.refresh(goal)

    create_audit_log(
        db,
        event_type="goal.created",
        details=f"Goal created: {goal.title}",
        user_id=current_user.id,
        ip_address=request.client.host if request.client else None,
    )

    return {
        "message": "Goal added",
        "goal": {
            "id": goal.id,
            "title": goal.title,
            "target_amount": goal.target_amount,
            "current_amount": goal.current_amount,
            "deadline": goal.deadline,
            "goal_type": goal.goal_type,
            "progress": compute_progress(goal.current_amount, goal.target_amount),
        },
    }


@router.get("/")
def get_goals(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    goals = db.query(Goal).filter(Goal.user_id == current_user.id).all()
    if not goals:
        return {"message": "No goals found", "goals": []}

    result = []
    for goal in goals:
        progress = compute_progress(goal.current_amount, goal.target_amount)
        result.append(
            {
                "id": goal.id,
                "title": goal.title,
                "target_amount": goal.target_amount,
                "current_amount": goal.current_amount,
                "deadline": goal.deadline,
                "goal_type": goal.goal_type,
                "progress": progress,
                "is_completed": goal.is_completed,
            }
        )

    return {"goals": result}


@router.put("/update/{goal_id}")
def update_goal(
    goal_id: int,
    payload: GoalUpdate,
    request: Request,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    goal = db.query(Goal).filter(Goal.id == goal_id, Goal.user_id == current_user.id).first()
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")

    if payload.title is not None:
        goal.title = payload.title
    if payload.target_amount is not None:
        goal.target_amount = payload.target_amount
    if payload.current_amount is not None:
        goal.current_amount = payload.current_amount
    if payload.deadline is not None:
        goal.deadline = payload.deadline
    if payload.goal_type is not None:
        goal.goal_type = payload.goal_type

    goal.is_completed = goal.current_amount >= goal.target_amount
    db.commit()

    create_audit_log(
        db,
        event_type="goal.updated",
        details=f"Goal updated: {goal.title}",
        user_id=current_user.id,
        ip_address=request.client.host if request.client else None,
    )

    return {
        "message": "Goal updated",
        "goal": {
            "id": goal.id,
            "progress": compute_progress(goal.current_amount, goal.target_amount),
            "is_completed": goal.is_completed,
        },
    }


@router.delete("/delete/{goal_id}")
def delete_goal(
    goal_id: int,
    request: Request,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    goal = db.query(Goal).filter(Goal.id == goal_id, Goal.user_id == current_user.id).first()
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")

    db.delete(goal)
    db.commit()

    create_audit_log(
        db,
        event_type="goal.deleted",
        details=f"Goal deleted: {goal.title}",
        user_id=current_user.id,
        ip_address=request.client.host if request.client else None,
    )

    return {"message": "Goal deleted"}
