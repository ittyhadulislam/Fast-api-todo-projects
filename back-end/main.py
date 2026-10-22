from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.authenticationRoute import router as api_router

app = FastAPI(title="TO DO Application", version="0.1")

app.include_router(api_router, prefix="/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    # allow_credentials=[],
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
async def root():
    return {"message": "Run TO DO List"}