from fastapi import APIRouter, Depends, HTTPException
from app.schemas.authenticationSchema import *
from sqlalchemy.ext.asyncio import AsyncSession
from app.config.database import getDB
from app.config.config import *
from app.models.authenticationModel import User
from sqlalchemy import select
from typing import Annotated
from app.depends.authDepends import *

router = APIRouter()


@router.post("/registration")
async def registration(
    request: userRegistrationRequest, db: AsyncSession = Depends(getDB)
):

    email = request.email.strip()

    result = await db.execute(select(User).where(User.email == email))

    exist_user = result.scalars().first()

    if exist_user:
        raise HTTPException(
            status_code=409, detail={"status": "409", "message": "Email Already Exists"}
        )

    newUser = User(
        full_name=request.full_name.strip(),
        email=email,
        password=hash_password(request.password.strip()),
    )

    try:
        db.add(newUser)
        db.flush()
        response = {"status": 200, "message": "You are successfully registered"}
        await db.commit()
        await db.refresh(newUser)

        return response
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/login", response_model=UserLoginResponse)
async def login(request: UserLoginRequest, db: AsyncSession = Depends(getDB)):
    email = request.email.strip()
    password = request.password.strip()

    result = await db.execute(select(User).where(User.email == email))
    exist_user = result.scalar_one_or_none()

    if exist_user is None:
        raise HTTPException(status_code=401, detail="Incorrect Email or Password")

    if not verify_password(password, exist_user.password):
        raise HTTPException(status_code=401, detail="Incorrect Email or Password")

    try:
        user_info = {
            column.name: getattr(exist_user, column.name)
            for column in User.__table__.columns
            if column.name != "password"
        }

        return UserLoginResponse(
            accessToken=encode_token(exist_user.id, exist_user.email),
            userInfo=user_info,
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/profile", response_model=userProfileResponse)
async def userProfile(
    user_id: Annotated[int, Depends(required_user_id)],
    db: AsyncSession = Depends(getDB),
):
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    try:
        if user is not None:
            return userProfileResponse.model_validate(user)
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))
