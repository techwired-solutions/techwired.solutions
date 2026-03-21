from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.inquiry import Inquiry
from app.schemas.inquiry import InquiryCreate, InquiryResponse, InquiryUpdate
from app.services.email import EmailService
from app.services.auth import get_current_admin

router = APIRouter()

@router.post("/api/inquiry", response_model=InquiryResponse, status_code=status.HTTP_201_CREATED)
async def create_inquiry(
    inquiry: InquiryCreate,
    db: Session = Depends(get_db)
):
    """
    Create a new inquiry (public endpoint)
    Sends notification emails to admin and confirmation to client
    """
    try:
        # Create inquiry in database
        db_inquiry = Inquiry(**inquiry.dict())
        db.add(db_inquiry)
        db.commit()
        db.refresh(db_inquiry)
        
        # Send emails
        inquiry_data = {
            "name": inquiry.name,
            "email": inquiry.email,
            "phone": inquiry.phone,
            "service_type": inquiry.service_type,
            "budget": inquiry.budget,
            "requirements": inquiry.requirements
        }
        
        # Send admin notification
        EmailService.send_admin_notification(inquiry_data)
        
        # Send client confirmation
        EmailService.send_client_confirmation(inquiry.email, inquiry.name)
        
        return db_inquiry
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create inquiry: {str(e)}"
        )

@router.get("/api/admin/inquiries", response_model=List[InquiryResponse])
async def get_all_inquiries(
    skip: int = 0,
    limit: int = 100,
    status_filter: str = None,
    db: Session = Depends(get_db),
    current_admin = Depends(get_current_admin)
):
    """
    Get all inquiries (admin only)
    Supports pagination and status filtering
    """
    query = db.query(Inquiry)
    
    if status_filter:
        query = query.filter(Inquiry.status == status_filter)
    
    inquiries = query.order_by(Inquiry.created_at.desc()).offset(skip).limit(limit).all()
    return inquiries

@router.get("/api/admin/inquiries/{inquiry_id}", response_model=InquiryResponse)
async def get_inquiry(
    inquiry_id: int,
    db: Session = Depends(get_db),
    current_admin = Depends(get_current_admin)
):
    """Get single inquiry by ID (admin only)"""
    inquiry = db.query(Inquiry).filter(Inquiry.id == inquiry_id).first()
    if not inquiry:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Inquiry not found"
        )
    return inquiry

@router.patch("/api/admin/inquiries/{inquiry_id}", response_model=InquiryResponse)
async def update_inquiry(
    inquiry_id: int,
    inquiry_update: InquiryUpdate,
    db: Session = Depends(get_db),
    current_admin = Depends(get_current_admin)
):
    """Update inquiry status and notes (admin only)"""
    inquiry = db.query(Inquiry).filter(Inquiry.id == inquiry_id).first()
    if not inquiry:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Inquiry not found"
        )
    
    # Update fields
    if inquiry_update.status:
        inquiry.status = inquiry_update.status
    if inquiry_update.admin_notes is not None:
        inquiry.admin_notes = inquiry_update.admin_notes
    
    db.commit()
    db.refresh(inquiry)
    return inquiry
