from fastapi import APIRouter, HTTPException

from app.services.ai_engine import get_stock_data, get_stock_history

router = APIRouter()


@router.get("/{symbol}/quote")
def market_quote(symbol: str):
    data = get_stock_data(symbol.upper())
    if not data or data.get("error"):
        raise HTTPException(status_code=502, detail=f"Failed to fetch market data for {symbol.upper()}")
    return data


@router.get("/{symbol}/history")
def market_history(symbol: str, period: str = "6mo"):
    data = get_stock_history(symbol.upper(), period=period)
    if data.get("error"):
        raise HTTPException(status_code=502, detail=data["error"])
    return data
