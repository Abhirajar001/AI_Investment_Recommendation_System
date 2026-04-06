import yfinance as yf

from app.services.market_cache import get_cached, set_cached

STOCK_UNIVERSE = {
    "Low": ["JNJ", "PG", "KO", "VZ", "T"],
    "Medium": ["AAPL", "MSFT", "GOOGL", "AMZN", "JPM"],
    "High": ["TSLA", "NVDA", "META", "NFLX", "AMD"]
}

MUTUAL_FUNDS = {
    "Low": [
        {"name": "Vanguard Total Bond Market", "symbol": "BND", "risk": "Low", "expected_return": "4-6%", "description": "Safe bond fund for conservative investors"},
        {"name": "iShares TIPS Bond ETF", "symbol": "TIP", "risk": "Low", "expected_return": "3-5%", "description": "Inflation protected securities"},
        {"name": "Vanguard Short-Term Bond", "symbol": "BSV", "risk": "Low", "expected_return": "3-4%", "description": "Short term investment grade bonds"}
    ],
    "Medium": [
        {"name": "Vanguard 500 Index Fund", "symbol": "VOO", "risk": "Medium", "expected_return": "8-10%", "description": "Tracks S&P 500 index"},
        {"name": "Fidelity Total Market", "symbol": "FSKAX", "risk": "Medium", "expected_return": "8-12%", "description": "Broad US market exposure"},
        {"name": "iShares Core S&P 500", "symbol": "IVV", "risk": "Medium", "expected_return": "8-10%", "description": "Low cost S&P 500 index fund"}
    ],
    "High": [
        {"name": "ARK Innovation ETF", "symbol": "ARKK", "risk": "High", "expected_return": "15-25%", "description": "Disruptive innovation companies"},
        {"name": "Invesco QQQ Trust", "symbol": "QQQ", "risk": "High", "expected_return": "12-20%", "description": "Top 100 NASDAQ companies"},
        {"name": "Global X Robotics ETF", "symbol": "BOTZ", "risk": "High", "expected_return": "10-20%", "description": "Robotics and AI companies"}
    ]
}

def get_stock_data(symbol: str):
    cached = get_cached(symbol)
    if cached is not None:
        return cached

    try:
        stock = yf.Ticker(symbol)
        info = stock.info
        hist = stock.history(period="1mo")
        
        if hist.empty:
            return None

        current_price = hist["Close"].iloc[-1]
        month_ago_price = hist["Close"].iloc[0]
        monthly_return = ((current_price - month_ago_price) / month_ago_price) * 100

        payload = {
            "symbol": symbol,
            "name": info.get("longName", symbol),
            "current_price": round(current_price, 2),
            "monthly_return": round(monthly_return, 2),
            "sector": info.get("sector", "N/A"),
            "market_cap": info.get("marketCap", 0),
            "risk": "High" if abs(monthly_return) > 12 else "Medium" if abs(monthly_return) > 5 else "Low",
            "expected_return": f"{round(monthly_return, 2)}% (1M momentum)",
            "recommendation": "Buy" if monthly_return > 0 else "Hold",
            "explanation": (
                f"{symbol} is suggested because its recent 1-month return is {round(monthly_return, 2)}%. "
                f"This fits users seeking {('growth' if monthly_return > 0 else 'stability')} exposure in this sector."
            ),
        }
        set_cached(symbol, payload)
        return payload
    except Exception as e:
        return {"symbol": symbol, "error": str(e)}


def get_stock_history(symbol: str, period: str = "6mo"):
    try:
        stock = yf.Ticker(symbol)
        hist = stock.history(period=period)
        if hist.empty:
            return {"symbol": symbol, "period": period, "history": [], "error": "No historical data"}

        points = []
        for idx, row in hist.iterrows():
            points.append(
                {
                    "date": idx.strftime("%Y-%m-%d"),
                    "open": round(float(row.get("Open", 0)), 2),
                    "close": round(float(row.get("Close", 0)), 2),
                    "high": round(float(row.get("High", 0)), 2),
                    "low": round(float(row.get("Low", 0)), 2),
                    "volume": int(row.get("Volume", 0)),
                }
            )

        return {"symbol": symbol, "period": period, "history": points}
    except Exception as e:
        return {"symbol": symbol, "period": period, "history": [], "error": str(e)}

def get_recommendations(risk_level: str, type: str):
    if type == "stocks":
        symbols = STOCK_UNIVERSE.get(risk_level, STOCK_UNIVERSE["Medium"])
        recommendations = []
        for symbol in symbols:
            data = get_stock_data(symbol)
            if data and not data.get("error"):
                recommendations.append(data)
        return {
            "risk_level": risk_level,
            "type": "stocks",
            "count": len(recommendations),
            "recommendations": recommendations
        }
    elif type == "mutual_funds":
        funds = MUTUAL_FUNDS.get(risk_level, MUTUAL_FUNDS["Medium"])
        return {
            "risk_level": risk_level,
            "type": "mutual_funds",
            "count": len(funds),
            "recommendations": funds
        }
    