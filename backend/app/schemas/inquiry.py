from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional

class InquiryCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=255)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=50)
    service_type: str = Field(..., min_length=1, max_length=255)
    budget: str = Field(..., min_length=1, max_length=100)
    requirements: str = Field(..., min_length=50)

class InquiryUpdate(BaseModel):
    status: Optional[str] = None
    admin_notes: Optional[str] = None

class InquiryResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: Optional[str]
    service_type: str
    budget: str
    requirements: str
    status: str
    admin_notes: Optional[str]
    created_at: datetime
    updated_at: Optional[datetime]
    
    class Config:
        from_attributes = True
