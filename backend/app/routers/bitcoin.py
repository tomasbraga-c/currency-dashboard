from fastapi import APIRouter, HTTPException
from app.services.crypto import get_multiple_cryptos

router = APIRouter()

DEFAULT_CRYPTOS = ["bitcoin", "ethereum"]

ALL_CRYPTOS = [
    "bitcoin", "ethereum", "solana", "binancecoin",
    "ripple", "dogecoin", "litecoin"
]

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
        # busca todas de uma vez para popular o cache
        data = await get_multiple_cryptos(ALL_CRYPTOS)
        if crypto in data:
            return {crypto: data[crypto]}
        # se não encontrou na lista, busca individualmente
        from app.services.crypto import get_crypto_price
        result = await get_crypto_price(crypto)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))