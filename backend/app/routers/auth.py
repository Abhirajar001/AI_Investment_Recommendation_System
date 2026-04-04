from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.schemas.user import UserRegister, UserLogin, UserResponse, Token
from app.services.auth_service import hash_password, verify_password, create_access_token

router = APIRouter()

@router.post(chr(47)+chr(114)+chr(101)+chr(103)+chr(105)+chr(115)+chr(116)+chr(101)+chr(114), response_model=UserResponse)
def register(user_data: UserRegister, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail=chr(69)+chr(109)+chr(97)+chr(105)+chr(108)+chr(32)+chr(97)+chr(108)+chr(114)+chr(101)+chr(97)+chr(100)+chr(121)+chr(32)+chr(114)+chr(101)+chr(103)+chr(105)+chr(115)+chr(116)+chr(101)+chr(114)+chr(101)+chr(100))
    new_user = User(full_name=user_data.full_name, email=user_data.email, hashed_password=hash_password(user_data.password))
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post(chr(47)+chr(108)+chr(111)+chr(103)+chr(105)+chr(110), response_model=Token)
def login(user_data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_data.email).first()
    if not user or not verify_password(user_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail=chr(73)+chr(110)+chr(118)+chr(97)+chr(108)+chr(105)+chr(100)+chr(32)+chr(101)+chr(109)+chr(97)+chr(105)+chr(108)+chr(32)+chr(111)+chr(114)+chr(32)+chr(112)+chr(97)+chr(115)+chr(115)+chr(119)+chr(111)+chr(114)+chr(100))
    token = create_access_token({chr(115)+chr(117)+chr(98): user.email})
    return {chr(97)+chr(99)+chr(99)+chr(101)+chr(115)+chr(115)+chr(95)+chr(116)+chr(111)+chr(107)+chr(101)+chr(110): token, chr(116)+chr(111)+chr(107)+chr(101)+chr(110)+chr(95)+chr(116)+chr(121)+chr(112)+chr(101): chr(98)+chr(101)+chr(97)+chr(114)+chr(101)+chr(114)}
