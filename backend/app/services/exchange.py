import httpx
import time

_cache = {}
CACHE_TTL = 60  # segundos

async def _fetch(url: str) -> dict:
    now = time.time()
    if url in _cache and now - _cache[url]['time'] < CACHE_TTL:
        return _cache[url]['data']
    
    async with httpx.AsyncClient() as client:
        response = await client.get(url, timeout=10.0)
        response.raise_for_status()
        data = response.json()
        _cache[url] = {'data': data, 'time': now}
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