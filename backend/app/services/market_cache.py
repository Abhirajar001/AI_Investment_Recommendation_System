import time
from typing import Any

# Very small in-memory TTL cache to keep market calls fast under repeated traffic.
_CACHE: dict[str, tuple[float, dict[str, Any]]] = {}
_TTL_SECONDS = 30


def get_cached(symbol: str) -> dict[str, Any] | None:
    key = symbol.upper()
    entry = _CACHE.get(key)
    if not entry:
        return None

    ts, payload = entry
    if time.time() - ts > _TTL_SECONDS:
        _CACHE.pop(key, None)
        return None

    return payload


def set_cached(symbol: str, payload: dict[str, Any]) -> None:
    _CACHE[symbol.upper()] = (time.time(), payload)
