from fastapi import APIRouter, HTTPException
from app.services.crypto import get_crypto_price, get_multiple_cryptos

router = APIRouter()

DEFAULT_CRYPTOS = ["bitcoin", "ethereum"]

@router.get("/cryptos")
async def list_cryptos():
    try:
        data = await get_multiple_cryptos(DEFAULT_CRYPTOS)
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/cryptos/{crypto}")
async def get_crypto(crypto: str):
    try:
        data = await get_crypto_price(crypto)
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))