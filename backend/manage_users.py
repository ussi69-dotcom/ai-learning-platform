import sys
import os
import argparse
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Adjust path to be able to import app modules
sys.path.append(os.path.join(os.path.dirname(__file__), "app"))

from app.database import Base
from app.models import User, Course, UserProgress, FeedbackItem, FeedbackVote

# Get Database URL
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@db/ai_platform")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def list_users():
    db = SessionLocal()
    try:
        users = db.query(User).all()
        print(f"{'ID':<5} {'Email':<40} {'Verified':<10} {'Active':<10}")
        print("-" * 70)
        for user in users:
            print(f"{user.id:<5} {user.email:<40} {str(user.is_verified):<10} {str(user.is_active):<10}")
    finally:
        db.close()

def delete_user(identifier):
    db = SessionLocal()
    try:
        user = None
        # Try to parse as ID
        try:
            user_id = int(identifier)
            user = db.query(User).filter(User.id == user_id).first()
        except ValueError:
            pass
        
        # If not found by ID, try by Email
        if not user:
            user = db.query(User).filter(User.email == identifier).first()
            
        if not user:
            print(f"❌ User '{identifier}' not found.")
            return

        print(f"⚠️  Deleting user: {user.email} (ID: {user.id})")
        
        # Identify related records (Cascades usually handle this, but good to be aware)
        # SQLAlchemy models have relationships, but if cascades aren't set in DB, we might need manual deletion.
        # Checking models... UserProgress, FeedbackItem, FeedbackVote, Course (owner)
        
        # Depending on DB setup, we might need to handle related items.
        # Assuming standard cascading or manual cleanup if needed.
        # Let's try standard delete.
        
        db.delete(user)
        db.commit()
        print(f"✅ User '{user.email}' deleted successfully.")
        
    except Exception as e:
        db.rollback()
        print(f"❌ Error deleting user: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Manage Users")
    subparsers = parser.add_subparsers(dest="command", required=True)

    # List command
    subparsers.add_parser("list", help="List all users")

    # Delete command
    delete_parser = subparsers.add_parser("delete", help="Delete a user by ID or Email")
    delete_parser.add_argument("identifier", help="User ID or Email")

    args = parser.parse_args()

    if args.command == "list":
        list_users()
    elif args.command == "delete":
        delete_user(args.identifier)
