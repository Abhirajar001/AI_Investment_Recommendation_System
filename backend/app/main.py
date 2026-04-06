from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.models.audit import AuditLog
from app.models.goal import Goal
from app.models.kyc import KYCVerification
from app.models.notification import NotificationAlert
from app.models.portfolio import Portfolio
from app.models.user import User
from app.routers import auth, compliance, goals, market, notifications, portfolio, recommendations, risk, user

Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Investment API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(user.router, prefix="/api/user", tags=["User"])
app.include_router(risk.router, prefix="/api/risk", tags=["Risk Assessment"])
app.include_router(recommendations.router, prefix="/api/recommendations", tags=["Recommendations"])
app.include_router(portfolio.router, prefix="/api/portfolio", tags=["Portfolio"])
app.include_router(goals.router, prefix="/api/goals", tags=["Goals"])
app.include_router(notifications.router, prefix="/api/notifications", tags=["Notifications"])
app.include_router(market.router, prefix="/api/market", tags=["Market Data"])
app.include_router(compliance.router, prefix="/api/compliance", tags=["Compliance"])


@app.get("/")
def root():
    return {"message": "AI Investment Backend is running"}
