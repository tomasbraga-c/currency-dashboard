export const countryToCurrency = {
  // Américas
  "Estados Unidos": "USD",
  "Canadá": "CAD",
  "Argentina": "ARS",
  "Brasil": "BRL",
  "México": "MXN",
  "Chile": "CLP",
  "Colômbia": "COP",
  "Peru": "PEN",
  "Bolívia": "BOB",
  "Paraguai": "PYG",
  "Uruguai": "UYU",
  "Nicarágua": "NIO",
  "Costa Rica": "CRC",
  "República Dominicana": "DOP",
  "Cuba": "CUP",
  "Jamaica": "JMD",
  "Panamá": "PAB",
  "Trinidad e Tobago": "TTD",

  // Europa
  "Euro / Europa": "EUR",
  "Reino Unido": "GBP",
  "Suíça": "CHF",
  "Noruega": "NOK",
  "Suécia": "SEK",
  "Dinamarca": "DKK",
  "Polônia": "PLN",
  "República Tcheca": "CZK",
  "Hungria": "HUF",
  "Romênia": "RON",
  "Rússia": "RUB",
  "Ucrânia": "UAH",
  "Turquia": "TRY",
  "Islândia": "ISK",

  // Ásia
  "Japão": "JPY",
  "China": "CNY",
  "Hong Kong": "HKD",
  "Singapura": "SGD",
  "Coreia do Sul": "KRW",
  "Índia": "INR",
  "Indonésia": "IDR",
  "Malásia": "MYR",
  "Tailândia": "THB",
  "Filipinas": "PHP",
  "Vietnã": "VND",
  "Taiwan": "TWD",
  "Emirados Árabes": "AED",
  "Arábia Saudita": "SAR",
  "Qatar": "QAR",
  "Kuwait": "KWD",
  "Israel": "ILS",

  // Oceania
  "Austrália": "AUD",
  "Nova Zelândia": "NZD",

  // África
  "África do Sul": "ZAR",
  "Nigéria": "NGN",
  "Egito": "EGP",
  "Gana": "GHS",
  "Quênia": "KES",
  "Marrocos": "MAD",

  // Criptomoedas
  "Bitcoin": "BTC",
  "Ethereum": "ETH",
  "Litecoin": "LTC",
  "Ripple": "XRP",
  "Dogecoin": "DOGE",
  "Binance Coin": "BNB",
  "Solana": "SOL",
}

// inverso — para mostrar o nome quando tiver só a sigla
export const currencyToName = Object.fromEntries(
  Object.entries(countryToCurrency).map(([name, code]) => [code, name])
)