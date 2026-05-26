import httpx
import time

HEADERS = {"User-Agent": "CurrencyDash/1.0"}

_cache = {}
CACHE_TTL = 60  
async def _fetch_crypto(url: str) -> dict:
    now = time.time()
    if url in _cache and now - _cache[url]['time'] < CACHE_TTL:
        return _cache[url]['data']
    
    async with httpx.AsyncClient() as client:
        response = await client.get(url, timeout=10.0, headers=HEADERS)
        response.raise_for_status()
        data = response.json()
        _cache[url] = {'data': data, 'time': now}
        return data

async def get_crypto_price(crypto: str) -> dict:
    url = f"https://api.coingecko.com/api/v3/simple/price?ids={crypto}&vs_currencies=brl,usd&include_24hr_change=true"
    try:
        return await _fetch_crypto(url)
    except httpx.TimeoutException:
        raise Exception("CoinGecko API não respondeu a tempo")
    except httpx.HTTPStatusError as e:
        raise Exception(f"Erro na CoinGecko API: {e.response.status_code}")

async def get_multiple_cryptos(cryptos: list[str]) -> dict:
    ids = ",".join(cryptos)
    url = f"https://api.coingecko.com/api/v3/simple/price?ids={ids}&vs_currencies=brl,usd&include_24hr_change=true"
    try:
        return await _fetch_crypto(url)
    except httpx.TimeoutException:
        raise Exception("CoinGecko API não respondeu a tempo")
    except httpx.HTTPStatusError as e:
        raise Exception(f"Erro na CoinGecko API: {e.response.status_code}")