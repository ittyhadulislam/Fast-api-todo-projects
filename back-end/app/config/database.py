from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from app.config.config import DATABASE_CONNECTION_URL
from sqlalchemy.orm import DeclarativeBase

engine = create_async_engine(DATABASE_CONNECTION_URL)

asyncLocalSession = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

class Base(DeclarativeBase):
    pass


async def getDB():
    async with asyncLocalSession() as session:
        yield session