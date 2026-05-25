export const currencyToCountry = {
  // Américas
  USD: 'US', CAD: 'CA', ARS: 'AR', BRL: 'BR',
  MXN: 'MX', CLP: 'CL', COP: 'CO', PEN: 'PE',
  BOB: 'BO', PYG: 'PY', UYU: 'UY', NIO: 'NI',
  CRC: 'CR', DOP: 'DO', CUP: 'CU', JMD: 'JM',
  BSD: 'BS', BBD: 'BB', BZD: 'BZ', HTG: 'HT',
  PAB: 'PA', TTD: 'TT', KYD: 'KY', XCD: 'LC',

  // Europa
  EUR: 'EU', GBP: 'GB', CHF: 'CH', NOK: 'NO',
  SEK: 'SE', DKK: 'DK', PLN: 'PL', CZK: 'CZ',
  HUF: 'HU', RON: 'RO', BGN: 'BG', HRK: 'HR',
  RSD: 'RS', ISK: 'IS', RUB: 'RU', UAH: 'UA',
  BYN: 'BY', GEL: 'GE', AMD: 'AM', AZN: 'AZ',
  TJS: 'TJ', KGS: 'KG', UZS: 'UZ', KZT: 'KZ',
  MDL: 'MD', MKD: 'MK', ALL: 'AL', BAM: 'BA',
  TRY: 'TR',

  // Ásia
  JPY: 'JP', CNY: 'CN', HKD: 'HK', SGD: 'SG',
  KRW: 'KR', INR: 'IN', IDR: 'ID', MYR: 'MY',
  THB: 'TH', PHP: 'PH', VND: 'VN', PKR: 'PK',
  BDT: 'BD', NPR: 'NP', LKR: 'LK', MMK: 'MM',
  KHR: 'KH', LAK: 'LA', BND: 'BN', MOP: 'MO',
  TWD: 'TW', AED: 'AE', SAR: 'SA', QAR: 'QA',
  KWD: 'KW', BHD: 'BH', OMR: 'OM', JOD: 'JO',
  ILS: 'IL', LBP: 'LB', IQD: 'IQ', IRR: 'IR',
  AFN: 'AF', SYP: 'SY',

  // Oceania
  AUD: 'AU', NZD: 'NZ', FJD: 'FJ', PGK: 'PG',
  VUV: 'VU', XPF: 'PF',

  // África
  ZAR: 'ZA', NGN: 'NG', EGP: 'EG', GHS: 'GH',
  KES: 'KE', ETB: 'ET', TZS: 'TZ', UGX: 'UG',
  MAD: 'MA', DZD: 'DZ', TND: 'TN', LYD: 'LY',
  SDG: 'SD', MUR: 'MU', SCR: 'SC', BWP: 'BW',
  NAD: 'NA', LSL: 'LS', SZL: 'SZ', ZMK: 'ZM',
  MWK: 'MW', MGA: 'MG', MOZ: 'MZ', AOA: 'AO',
  XAF: 'CM', XOF: 'SN', RWF: 'RW', BIF: 'BI',
  DJF: 'DJ', GMD: 'GM', GNF: 'GN', STD: 'ST',
  SOS: 'SO', SDG: 'SD',

  // Criptomoedas
  BTC: null, ETH: null, LTC: null, XRP: null,
  DOGE: null, BNB: null, SOL: null, BRETT: null,
}

export const cryptoSymbols = {
  BTC: '₿', ETH: 'Ξ', LTC: 'Ł', XRP: '✕',
  DOGE: 'Ð', BNB: 'BNB', SOL: '◎', BRETT: 'B',
}

export function getFlag(code) {
  if (cryptoSymbols[code]) return null
  const country = currencyToCountry[code]
  return country || null
}