from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.models.portfolio import Portfolio
from app.routers.user import get_current_user
from app.services.ai_engine import get_stock_data
from pydantic import BaseModel
router = APIRouter()
class AddInvestment(BaseModel):
    symbol: str
    quantity: float
    buy_price: float
@router.post('/add')
def add_investment(data: AddInvestment, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    stock = get_stock_data(data.symbol.upper())
    name = stock.get('name', data.symbol) if stock else data.symbol
    investment = Portfolio(user_id=current_user.id, symbol=data.symbol.upper(), name=name, quantity=data.quantity, buy_price=data.buy_price)
    db.add(investment)
    db.commit()
    db.refresh(investment)
    return {'message': 'Investment added!', 'symbol': investment.symbol, 'quantity': investment.quantity}
@router.get('/')
def get_portfolio(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    investments = db.query(Portfolio).filter(Portfolio.user_id == current_user.id).all()
    if not investments:
        return {'message': 'Portfolio is empty', 'investments': []}
    portfolio = []
    total_invested = 0
    total_current = 0
    for inv in investments:
        stock = get_stock_data(inv.symbol)
        current_price = stock.get('current_price', inv.buy_price) if stock else inv.buy_price
        invested = inv.quantity * inv.buy_price
        current_value = inv.quantity * current_price
        profit_loss = current_value - invested
        total_invested += invested
        total_current += current_value
        portfolio.append({'symbol': inv.symbol, 'quantity': inv.quantity, 'buy_price': inv.buy_price, 'current_price': current_price, 'profit_loss': round(profit_loss, 2)})
    return {'total_invested': round(total_invested, 2), 'total_current_value': round(total_current, 2), 'total_profit_loss': round(total_current - total_invested, 2), 'investments': portfolio}
