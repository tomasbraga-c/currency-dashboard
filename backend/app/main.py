from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.routers import currencies, bitcoin, preferences, summary
from app.services.crypto import get_multiple_cryptos

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Servidor acordando — pre-aquecendo cache...")
    try:
        await get_multiple_cryptos([
            "bitcoin", "ethereum", "solana", "binancecoin",
            "ripple", "dogecoin", "litecoin"
        ])
        print("Cache aquecido!")
    except Exception as e:
        print(f"Erro ao pre-aquecer cache: {e}")
    yield

app = FastAPI(
    title="Currency Dashboard API",
    description="API de cotações de moedas e criptomoedas",
    version="1.0.0",
    lifespan=lifespan
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
app.include_router(summary.router, prefix="/api/v1")

@app.get("/")
async def root():
    return {"message": "Currency Dashboard API running"}

@app.get("/health")
async def health_check():
    return {"status": "ok"}

@app.get("/debug")
async def debug():
    import httpx
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                "https://economia.awesomeapi.com.br/json/last/USD-BRL",
                timeout=10.0,
                headers={"User-Agent": "Mozilla/5.0"}
            )
            return {"status": response.status_code, "body": response.text[:200]}
    except Exception as e:
        return {"error": str(e)}