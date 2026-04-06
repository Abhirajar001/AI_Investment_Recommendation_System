from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.sql import func

from app.database import Base


class KYCVerification(Base):
    __tablename__ = "kyc_verifications"
    __table_args__ = {"extend_existing": True}

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    full_name = Column(String, nullable=False)
    id_number_last4 = Column(String, nullable=False)
    country = Column(String, nullable=False)
    status = Column(String, nullable=False, default="pending")  # pending | approved | rejected
    consent_recorded = Column(Boolean, nullable=False, default=False)
    consent_text = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
