import httpx
import time
import os

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
    
    async with httpx.AsyncClient() as client:
        response = await client.get(cached_url, timeout=10.0, headers=HEADERS)
        response.raise_for_status()
        data = response.json()
        _cache[cached_url] = {'data': data, 'time': now}
        return data

async def get_currencies(currencies: list[str]) -> dict:
    symbols = ",".join(currencies)
    url = f"https://economia.awesomeapi.com.br/json/last/{symbols}"
    try:
        return await _fetch(url)
    except httpx.TimeoutException:
        raise Exception("AwesomeAPI não respondeu a tempo")
    except httpx.HTTPStatusError as e:
        raise Exception(f"Erro na AwesomeAPI: {e.response.status_code}")

async def get_available_currencies() -> dict:
    url = "https://economia.awesomeapi.com.br/json/available"
    try:
        return await _fetch(url)
    except httpx.TimeoutException:
        raise Exception("AwesomeAPI não respondeu a tempo")
    except httpx.HTTPStatusError as e:
        raise Exception(f"Erro na AwesomeAPI: {e.response.status_code}")

async def get_currency_history(symbol: str, days: int = 30) -> list:
    url = f"https://economia.awesomeapi.com.br/json/daily/{symbol}/{days}"
    try:
        return await _fetch(url)
    except httpx.TimeoutException:
        raise Exception("AwesomeAPI não respondeu a tempo")
    except httpx.HTTPStatusError as e:
        raise Exception(f"Erro na AwesomeAPI: {e.response.status_code}")