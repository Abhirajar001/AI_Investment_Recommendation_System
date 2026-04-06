from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    APP_BASE_URL: str = "http://127.0.0.1:5173"
    EMAIL_FROM: str = "noreply@example.com"
    SMTP_HOST: str | None = None
    SMTP_PORT: int = 587
    SMTP_USERNAME: str | None = None
    SMTP_PASSWORD: str | None = None
    SMTP_USE_TLS: bool = True
    EMAIL_DEBUG_TOKENS: bool = True

    class Config:
        env_file = ".env"


settings = Settings()