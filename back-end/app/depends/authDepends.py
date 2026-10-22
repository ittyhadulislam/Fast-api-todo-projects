from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from app.config.config import *
security = HTTPBearer()

async def required_user_id(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = decode_token(credentials.credentials)
        print("payload", payload)
        return int(payload["user_id"])
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))