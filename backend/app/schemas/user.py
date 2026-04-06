import re

from pydantic import BaseModel, Field, field_validator


EMAIL_REGEX = re.compile(r"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$")

class UserRegister(BaseModel):
    full_name: str = Field(min_length=2, max_length=100)
    email: str
    password: str = Field(min_length=8, max_length=128)

    @field_validator("email")
    @classmethod
    def validate_email(cls, value: str) -> str:
        email = value.strip().lower()
        if not EMAIL_REGEX.fullmatch(email):
            raise ValueError("Invalid email format")
        return email

    @field_validator("full_name")
    @classmethod
    def validate_full_name(cls, value: str) -> str:
        normalized = value.strip()
        if len(normalized) < 2:
            raise ValueError("Full name must be at least 2 characters")
        return normalized

class UserLogin(BaseModel):
    email: str
    password: str = Field(min_length=1, max_length=128)
    mfa_code: str | None = Field(default=None, min_length=6, max_length=6)

    @field_validator("email")
    @classmethod
    def validate_email(cls, value: str) -> str:
        email = value.strip().lower()
        if not EMAIL_REGEX.fullmatch(email):
            raise ValueError("Invalid email format")
        return email

class UserResponse(BaseModel):
    id: int
    full_name: str
    email: str
    is_active: bool
    role: str | None = None
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str


class VerifyEmailRequest(BaseModel):
    token: str = Field(min_length=8)


class PasswordResetRequest(BaseModel):
    email: str

    @field_validator("email")
    @classmethod
    def validate_email(cls, value: str) -> str:
        email = value.strip().lower()
        if not EMAIL_REGEX.fullmatch(email):
            raise ValueError("Invalid email format")
        return email


class PasswordResetConfirm(BaseModel):
    token: str = Field(min_length=8)
    new_password: str = Field(min_length=8, max_length=128)


class MFAEnableRequest(BaseModel):
    enable: bool


class UserProfileUpdate(BaseModel):
    full_name: str = Field(min_length=2, max_length=100)
    age: int | None = Field(default=None, ge=18, le=120)
    income: float | None = Field(default=None, ge=0)
    investment_experience: str | None = Field(default=None, min_length=1, max_length=40)

    @field_validator("full_name")
    @classmethod
    def validate_full_name(cls, value: str) -> str:
        normalized = value.strip()
        if len(normalized) < 2:
            raise ValueError("Full name must be at least 2 characters")
        return normalized
