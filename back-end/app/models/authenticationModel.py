from app.config.database import Base
from sqlalchemy import *
from datetime import datetime


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    full_name = Column(String(100), nullable=False)
    email = Column(String(50), nullable=False)
    house_no = Column(String(50))
    street = Column(String(50))
    state = Column(String(50))
    city = Column(String(50))
    zip_code = Column(String(50))
    full_address = Column(String(255))
    birth_date = Column(DateTime)
    password = Column(String(255), nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.now)
    updated_at = Column(DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)
    