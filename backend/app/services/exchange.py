import httpx
import time
import os
import asyncio

_cache = {}
CACHE_TTL = 60

API_KEY = os.getenv("AWESOME_API_KEY", "")

HEADERS = {
    "User-Agent": "Mozilla/5.0",
    "Accept": "application/json",
}

def _get_url_with_key(url: str) -> str:
    if API_KEY:
        separator = "&" if "?" in url else "?"
        return f"{url}{separator}token={API_KEY}"
    return url

async def _fetch(url: str) -> dict:
    now = time.time()
    cached_url = _get_url_with_key(url)
    
    if cached_url in _cache and now - _cache[cached_url]['time'] < CACHE_TTL:
        return _cache[cached_url]['data']

    for tentativa in range(3):
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(cached_url, timeout=10.0, headers=HEADERS)
                response.raise_for_status()
                data = response.json()
                _cache[cached_url] = {'data': data, 'time': now}
                return data
        except httpx.TimeoutException:
            print(f"TimeoutException tentativa {tentativa + 1}: {cached_url}")
            if cached_url in _cache:
                return _cache[cached_url]['data']
            if tentativa < 2:
                await asyncio.sleep(2 ** tentativa)
                continue
            raise Exception("AwesomeAPI não respondeu a tempo")
        except httpx.HTTPStatusError as e:
            print(f"HTTPStatusError: {e.response.status_code} na URL: {cached_url}")
            if cached_url in _cache:
                return _cache[cached_url]['data']
            raise Exception(f"Erro na AwesomeAPI: {e.response.status_code}")
        except Exception as e:
            print(f"Erro inesperado tentativa {tentativa + 1}: {type(e).__name__}: {e}")
            if tentativa < 2:
                await asyncio.sleep(2 ** tentativa)
                continue
            raise

    raise Exception("AwesomeAPI: limite de tentativas atingido")

async def get_currencies(currencies: list[str]) -> dict:
    symbols = ",".join(currencies)
    url = f"https://economia.awesomeapi.com.br/json/last/{symbols}"
    return await _fetch(url)

async def get_available_currencies() -> dict:
    url = "https://economia.awesomeapi.com.br/json/available"
    return await _fetch(url)

async def get_currency_history(symbol: str, days: int = 30) -> list:
    url = f"https://economia.awesomeapi.com.br/json/daily/{symbol}/{days}"
    return await _fetch(url)