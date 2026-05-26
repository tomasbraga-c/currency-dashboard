import httpx
import time

HEADERS = {"User-Agent": "CurrencyDash/1.0"}

_cache = {}
CACHE_TTL = 300  # 5 minutos

async def _fetch_crypto(url: str) -> dict:
    now = time.time()
    
    # retorna cache se válido
    if url in _cache and now - _cache[url]['time'] < CACHE_TTL:
        return _cache[url]['data']
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url, timeout=10.0, headers=HEADERS)
            response.raise_for_status()
            data = response.json()
            _cache[url] = {'data': data, 'time': now}
            return data
    except httpx.HTTPStatusError as e:
        # se der 429 e tiver cache expirado, retorna o cache mesmo assim
        if e.response.status_code == 429 and url in _cache:
            return _cache[url]['data']
        raise Exception(f"Erro na CoinGecko API: {e.response.status_code}")
    except httpx.TimeoutException:
        if url in _cache:
            return _cache[url]['data']
        raise Exception("CoinGecko API não respondeu a tempo")

async def get_crypto_price(crypto: str) -> dict:
    url = f"https://api.coingecko.com/api/v3/simple/price?ids={crypto}&vs_currencies=brl,usd&include_24hr_change=true"
    return await _fetch_crypto(url)

async def get_multiple_cryptos(cryptos: list[str]) -> dict:
    ids = ",".join(cryptos)
    url = f"https://api.coingecko.com/api/v3/simple/price?ids={ids}&vs_currencies=brl,usd&include_24hr_change=true"
    return await _fetch_crypto(url)