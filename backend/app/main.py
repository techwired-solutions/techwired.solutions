from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import engine, Base
from app.routers import inquiry, auth
from app.models import inquiry as inquiry_model, admin as admin_model

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Techwired Solutions API",
    description="Backend API for Techwired Solutions website",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL, "http://localhost:3000", "https://*.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(inquiry.router, tags=["Inquiries"])
app.include_router(auth.router, tags=["Authentication"])

@app.get("/")
async def root():
    return {
        "message": "Techwired Solutions API",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
