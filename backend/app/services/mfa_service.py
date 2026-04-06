import base64
import hashlib
import hmac
import os
import struct
import time
from urllib.parse import quote


def generate_totp_secret(length: int = 20) -> str:
    raw = os.urandom(length)
    return base64.b32encode(raw).decode("utf-8").rstrip("=")


def _normalize_base32(secret: str) -> bytes:
    secret = secret.strip().replace(" ", "").upper()
    padding = "=" * ((8 - len(secret) % 8) % 8)
    return base64.b32decode(secret + padding, casefold=True)


def _hotp(secret: str, counter: int, digits: int = 6) -> str:
    key = _normalize_base32(secret)
    msg = struct.pack(">Q", counter)
    digest = hmac.new(key, msg, hashlib.sha1).digest()
    offset = digest[-1] & 0x0F
    code_int = struct.unpack(">I", digest[offset:offset + 4])[0] & 0x7FFFFFFF
    return str(code_int % (10**digits)).zfill(digits)


def generate_totp_code(secret: str, period: int = 30, digits: int = 6, at_time: int | None = None) -> str:
    ts = int(time.time()) if at_time is None else at_time
    counter = ts // period
    return _hotp(secret, counter, digits=digits)


def verify_totp_code(
    secret: str,
    code: str,
    period: int = 30,
    digits: int = 6,
    window: int = 1,
    at_time: int | None = None,
) -> bool:
    if not code or not code.isdigit() or len(code) != digits:
        return False

    ts = int(time.time()) if at_time is None else at_time
    counter = ts // period

    for delta in range(-window, window + 1):
        if _hotp(secret, counter + delta, digits=digits) == code:
            return True

    return False


def build_totp_uri(secret: str, account_name: str, issuer: str = "AI Investment") -> str:
    account = quote(account_name)
    issuer_enc = quote(issuer)
    return f"otpauth://totp/{issuer_enc}:{account}?secret={secret}&issuer={issuer_enc}&algorithm=SHA1&digits=6&period=30"
