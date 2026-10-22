from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Any

class userRegistrationRequest(BaseModel):
    full_name: str
    email: str
    password: str
    
class userProfileResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    full_name: str
    email: str
    house_no: str | None
    street: str | None
    state: str | None
    city: str | None
    zip_code: str | None
    full_address: str | None
    birth_date: datetime | None
    created_at: datetime
    updated_at: datetime

class UserLoginRequest(BaseModel):
    email: str
    password: str

class UserLoginResponse(BaseModel):
    accessToken: str
    tokenType: str = "Bearer"
    userInfo: dict[str, Any]