from fastapi import APIRouter, HTTPException
from app.services.summary import get_summary

router = APIRouter()

@router.get("/summary")
async def get_summary_data():
    try:
        data = await get_summary()
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


