import re

from pydantic import BaseModel, field_validator


EMAIL_REGEX = re.compile(r"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$")

class UserRegister(BaseModel):
    full_name: str
    email: str
    password: str

    @field_validator("email")
    @classmethod
    def validate_email(cls, value: str) -> str:
        email = value.strip()
        if not EMAIL_REGEX.fullmatch(email):
            raise ValueError("Invalid email format")
        return email

class UserLogin(BaseModel):
    email: str
    password: str

    @field_validator("email")
    @classmethod
    def validate_email(cls, value: str) -> str:
        email = value.strip()
        if not EMAIL_REGEX.fullmatch(email):
            raise ValueError("Invalid email format")
        return email

class UserResponse(BaseModel):
    id: int
    full_name: str
    email: str
    is_active: bool
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
