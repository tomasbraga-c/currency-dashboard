from fastapi import APIRouter, HTTPException
from app.services.preferences import get_preference, upsert_preference, get_all_preferences, deactivate_preference
from app.models.schemas import PreferenceSchema
from fastapi.responses import HTMLResponse


router = APIRouter()

@router.get("/preferences")
async def read_all_preferences():
    try:
        data = get_all_preferences()
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


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
    
@router.get("/unsubscribe")
async def unsubscribe(email: str):
    try:
        success = deactivate_preference(email)
        if success:
            html = """
            <html>
              <body style="font-family:Arial,sans-serif; background:#f4f6f5; text-align:center; padding:60px 20px;">
                <div style="max-width:500px; margin:auto; background:white; border-radius:16px; padding:40px;">
                  <h1 style="color:#0F6E56;">Currency.Dash</h1>
                  <p style="font-size:18px; color:#111827;">Inscrição cancelada com sucesso.</p>
                  <p style="color:#6b7280;">Você não receberá mais os relatórios diários. Sentiremos sua falta!</p>
                  <a href="https://currency-dashboard-beryl.vercel.app" style="display:inline-block; margin-top:20px; background:#0F6E56; color:white; padding:12px 24px; border-radius:8px; text-decoration:none;">Voltar ao site</a>
                </div>
              </body>
            </html>
            """
            return HTMLResponse(content=html, status_code=200)
        else:
            return HTMLResponse(
                content="<h1 style='font-family:Arial; text-align:center; padding:60px;'>E-mail não encontrado.</h1>",
                status_code=404
            )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))