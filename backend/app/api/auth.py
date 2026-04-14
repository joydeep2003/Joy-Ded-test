from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.user import User
from app.core.security import hash_password, verify_password, create_token

router = APIRouter()  # prefix handled in main.py

@router.post("/register")
def register(data: dict, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == data["email"]).first():
        raise HTTPException(status_code=400, detail={"error": "validation failed"})

    user = User(
        name=data["name"],
        email=data["email"],
        password=hash_password(data["password"])
    )
    db.add(user)
    db.commit()
    db.refresh(user)  # ✅ IMPORTANT

    token = create_token({"user_id": str(user.id), "email": user.email})

    return {
        "access_token": token,  # ✅ FIXED (was "token")
        "token_type": "bearer",
        "user": {"id": str(user.id), "email": user.email}
    }


@router.post("/login")
def login(data: dict, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data["email"]).first()

    if not user or not verify_password(data["password"], user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_token({
        "user_id": str(user.id),
        "email": user.email
    })

    return {
        "access_token": token,
        "token_type": "bearer"
    }