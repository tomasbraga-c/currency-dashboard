from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import currencies, bitcoin, preferences

app = FastAPI(
    title="Currency Dashboard API",
    description="API de cotações de moedas e criptomoedas",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(currencies.router, prefix="/api/v1")
app.include_router(bitcoin.router, prefix="/api/v1")
app.include_router(preferences.router, prefix="/api/v1")


@app.get("/")
async def root():
    return {"message": "Currency Dashboard API running"}

