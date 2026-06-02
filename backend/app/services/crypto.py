import httpx
import time
import asyncio
import os

HEADERS = {
    "User-Agent": "CurrencyDash/1.0",
    "x-cg-demo-api-key": os.getenv("COINGECKO_API_KEY", "")
}

_cache = {}
CACHE_TTL = 1800

async def _fetch_crypto(url: str) -> dict:
    now = time.time()

    if url in _cache and now - _cache[url]['time'] < CACHE_TTL:
        return _cache[url]['data']

    for tentativa in range(3):
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(url, timeout=10.0, headers=HEADERS)
                response.raise_for_status()
                data = response.json()
                _cache[url] = {'data': data, 'time': now}
                return data
        except httpx.HTTPStatusError as e:
            if e.response.status_code == 429:
                if url in _cache:
                    return _cache[url]['data']
                await asyncio.sleep(2 ** tentativa)  # 1s, 2s, 4s
                continue
            raise Exception(f"Erro na CoinGecko API: {e.response.status_code}")
        except httpx.TimeoutException:
            if url in _cache:
                return _cache[url]['data']
            raise Exception("CoinGecko API não respondeu a tempo")

    raise Exception("CoinGecko API: limite de tentativas atingido")


async def get_crypto_price(crypto: str) -> dict:
    url = f"https://api.coingecko.com/api/v3/simple/price?ids={crypto}&vs_currencies=brl,usd&include_24hr_change=true"
    return await _fetch_crypto(url)


async def get_multiple_cryptos(cryptos: list[str]) -> dict:
    ids = ",".join(cryptos)
    url = f"https://api.coingecko.com/api/v3/simple/price?ids={ids}&vs_currencies=brl,usd&include_24hr_change=true"
    return await _fetch_crypto(url)