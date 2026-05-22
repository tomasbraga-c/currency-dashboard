from app.services.exchange import get_currencies
from app.services.crypto import get_multiple_cryptos
from datetime import datetime

DEFAULT_CURRENCIES = ["USD-BRL", "EUR-BRL", "GBP-BRL", "JPY-BRL", "ARS-BRL"]
DEFAULT_CRYPTOS = ["bitcoin", "ethereum"]

async def get_summary() -> dict:
    currency_data = await get_currencies(DEFAULT_CURRENCIES)
    crypto_data = await get_multiple_cryptos(DEFAULT_CRYPTOS)

    currencies_list = list(currency_data.values())

    top_gainers = sorted(currencies_list, key=lambda x: float(x["pctChange"]), reverse=True)[:3]
    top_losers = sorted(currencies_list, key=lambda x: float(x["pctChange"]))[:3]

    return {
        "date": datetime.now().strftime("%Y-%m-%d"),
        "currencies": currency_data,
        "cryptos": crypto_data,
        "top_gainers": top_gainers,
        "top_losers": top_losers,
        "timestamp": datetime.now().isoformat()
    }