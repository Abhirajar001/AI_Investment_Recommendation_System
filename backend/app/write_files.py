files = {
    'app/routers/user.py': '''from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.services.auth_service import verify_token
from fastapi.security import OAuth2PasswordBearer

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    email = verify_token(token)
    if not email:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.get("/me")
def get_profile(current_user: User = Depends(get_current_user)):
    return {"id": current_user.id, "full_name": current_user.full_name, "email": current_user.email, "is_active": current_user.is_active}

@router.put("/me")
def update_profile(full_name: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    current_user.full_name = full_name
    db.commit()
    db.refresh(current_user)
    return {"message": "Profile updated successfully", "full_name": current_user.full_name}
'''
}

for path, content in files.items():
    with open(path, 'w') as f:
        f.write(content)
    print(f'{path} written successfully!')