from fastapi import APIRouter, HTTPException
from app.services.exchange import get_currencies, get_available_currencies, get_currency_history


router = APIRouter()


DEFAULT_CURRENCIES = [
    "USD-BRL", "EUR-BRL", "GBP-BRL", "JPY-BRL", "ARS-BRL",
    "USD-BRLT", "EUR-BRLT"
]

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
    
##############################

@router.get("/currencies/{symbol}/history")
async def get_history(symbol: str, days: int = 30):
    try:
        data = await get_currency_history(symbol, days)
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))