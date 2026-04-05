from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.routers import auth, user, risk, recommendations, portfolio
from app.models.user import User
from app.models.portfolio import Portfolio
Base.metadata.create_all(bind=engine)
app = FastAPI(title='AI Investment API', version='1.0.0')
app.add_middleware(CORSMiddleware, allow_origins=['http://localhost:5173'], allow_credentials=True, allow_methods=['*'], allow_headers=['*'])
app.include_router(auth.router, prefix='/api/auth', tags=['Authentication'])
app.include_router(user.router, prefix='/api/user', tags=['User'])
app.include_router(risk.router, prefix='/api/risk', tags=['Risk Assessment'])
app.include_router(recommendations.router, prefix='/api/recommendations', tags=['Recommendations'])
app.include_router(portfolio.router, prefix='/api/portfolio', tags=['Portfolio'])
@app.get('/')
def root():
    return {'message': 'AI Investment Backend is running'}
