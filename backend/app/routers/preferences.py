from fastapi import APIRouter, HTTPException
from app.services.preferences import get_preference, upsert_preference
from app.models.schemas import PreferenceSchema

router = APIRouter()

@router.get("/preferences/{email}")
async def read_user_preference(email: str):
    try:
        data = get_preference(email)
        if not data:
            raise HTTPException(status_code=404, detail="Usuário não encontrado")
        return data
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/preferences")
async def save_preference(preference: PreferenceSchema):
    try:
        data = upsert_preference(
            preference.email,
            preference.currencies,
            preference.cryptos
        )
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))