import httpx

async def get_crypto_price(crypto: str) -> dict:
    url = f"https://api.coingecko.com/api/v3/simple/price?ids={crypto}&vs_currencies=brl,usd&include_24hr_change=true"

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url, timeout=10.0)
            response.raise_for_status()
            return response.json()
    except httpx.TimeoutException:
        raise Exception("CoinGecko API não respondeu a tempo")
    except httpx.HTTPStatusError as e:
        raise Exception(f"Erro na CoinGecko API: {e.response.status_code}")
    
    async def get_multiple_cryptos(cryptos: list[str]) -> dict:
        ids = ",".join(cryptos)
        url = f"https://api.coingecko.com/api/v3/simple/price?ids={ids}&vs_currencies=brl,usd&include_24hr_change=true"

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url, timeout=10.0)
            response.raise_for_status()
            return response.json()
    except httpx.TimeoutException:
        raise Exception("CoinGecko API não respondeu a tempo")
    except httpx.HTTPStatusError as e:
        raise Exception(f"Erro na CoinGecko API: {e.response.status_code}")