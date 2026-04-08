from app.routers.notifications import _as_price


def test_as_price_accepts_number_like_values() -> None:
    assert _as_price(100) == 100.0
    assert _as_price("101.25") == 101.25


def test_as_price_rejects_invalid_values() -> None:
    assert _as_price(None) is None
    assert _as_price("") is None
    assert _as_price("not-a-number") is None
    assert _as_price(float("nan")) is None
    assert _as_price(float("inf")) is None