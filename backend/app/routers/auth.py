from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.admin import Admin
from app.schemas.auth import LoginRequest, Token
from app.services.auth import create_access_token

router = APIRouter()

@router.post("/api/auth/login", response_model=Token)
async def login(
    login_data: LoginRequest,
    db: Session = Depends(get_db)
):
    """
    Admin login endpoint
    Returns JWT access token
    """
    # Find admin by username
    admin = db.query(Admin).filter(Admin.username == login_data.username).first()
    
    if not admin or not admin.verify_password(login_data.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token
    access_token = create_access_token(data={"sub": admin.username})
    
    return {"access_token": access_token, "token_type": "bearer"}
