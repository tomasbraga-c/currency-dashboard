    import { useContext } from 'react'
    import { ThemeContext } from '../App'
    import { getFlag, cryptoSymbols } from '../utils/flags'
    import { currencyToName } from '../utils/currencies'

const formatPrice = (value) => {
  const num = parseFloat(value)
  if (num < 0.01) return num.toFixed(6)
  if (num < 1) return num.toFixed(4)
  return num.toFixed(2)
}

export function CurrencyCard({ code, name, bid, pctChange, high, low }) {
  const { theme } = useContext(ThemeContext)
  const isPositive = parseFloat(pctChange) >= 0
  const countryCode = getFlag(code)

  return (
    <div style={{
      backgroundColor: theme.card,
      border: `1px solid ${theme.border}`,
      borderRadius: '8px',
      padding: '16px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        {countryCode ? (
          <img
            src={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`}
            alt={code}
            style={{ width: '24px', marginRight: '8px', borderRadius: '2px' }}
          />
        ) : (
          <span style={{ marginRight: '8px', fontSize: '18px' }}>
            {cryptoSymbols[code] || '💱'}
          </span>
        )}
        <strong style={{ color: theme.accent }}>{currencyToName[code] || name}</strong>
      </div>
      <div style={{ color: theme.textPrimary, fontSize: '20px', fontWeight: '500' }}>
        R$ {formatPrice(bid)}
      </div>
      <div style={{ color: isPositive ? theme.positive : theme.negative, fontSize: '13px' }}>
        {isPositive ? '▲' : '▼'} {parseFloat(pctChange).toFixed(2)}%
      </div>
      <div style={{ color: theme.textSecondary, fontSize: '12px', marginTop: '6px' }}>
        Máx: R$ {formatPrice(high)} · Mín: R$ {formatPrice(low)}
      </div>
    </div>
  )
}