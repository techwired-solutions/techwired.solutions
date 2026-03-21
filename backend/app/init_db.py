"""
Database initialization script
Creates admin user and sets up initial data
"""
from sqlalchemy.orm import Session
from app.database import SessionLocal, engine, Base
from app.models.admin import Admin
from app.config import settings

def init_db():
    """Initialize database with tables and admin user"""
    # Create all tables
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        # Check if admin already exists
        existing_admin = db.query(Admin).filter(Admin.username == settings.ADMIN_USERNAME).first()
        
        if not existing_admin:
            # Create admin user
            admin = Admin(
                username=settings.ADMIN_USERNAME,
                hashed_password=Admin.hash_password(settings.ADMIN_PASSWORD)
            )
            db.add(admin)
            db.commit()
            print(f"✅ Admin user created: {settings.ADMIN_USERNAME}")
        else:
            print(f"ℹ️  Admin user already exists: {settings.ADMIN_USERNAME}")
            
    except Exception as e:
        print(f"❌ Error initializing database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("🚀 Initializing database...")
    init_db()
    print("✅ Database initialization complete!")
