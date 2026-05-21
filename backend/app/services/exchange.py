import httpx

async def get_currencies(currencies: list[str]) -> dict:
    symbols = ",".join(currencies)

    url = f"https://economia.awesomeapi.com.br/json/last/{symbols}"

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url, timeout=10.0)
            response.raise_for_status()
            return response.json()
    except httpx.TimeoutException:
        raise Exception("AwesomeAPI não respondeu a tempo")
    except httpx.HTTPStatusError as e:
        raise Exception(f"Erro na AwesomeAPI: {e.response.status_code}")