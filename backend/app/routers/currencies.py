from fastapi import APIRouter, HTTPException
from app.services.exchange import get_crypto_price, get_available_currencies


router = APIRouter()


DEFAULT_CURRENCIES = ["USD-BRL", "EUR-BRL", "GBP-BRL", "JPY-BRL", "ARS-BRL"]


@router.get("/currencies")
async def list_currencies():
    try:
        data = await get_currencies(DEFAULT_CURRENCIES)
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


#######################################
@router.get("/currencies/available")
async def list_available_currencies():
    try:
        data = await get_available_currencies()
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

   

#######################################


@router.get("/currencies/{symbol}")
async def get_currency_by_symbol(symbol: str):
    try:
        data = await get_currencies([symbol])
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))