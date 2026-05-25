import { useContext } from 'react'
import { ThemeContext } from '../App'
import { getFlag } from '../utils/flags'
import { currencyToName } from '../utils/currencies'

const formatPrice = (value) => {
  const num = parseFloat(value)
  if (num < 0.01) return num.toFixed(6)
  if (num < 1) return num.toFixed(4)
  return num.toFixed(2)
}

export function DailyPerformance({ items }) {
  const { theme } = useContext(ThemeContext)

  return (
    <div style={{
      backgroundColor: theme.card,
      border: `1px solid ${theme.border}`,
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '24px',
    }}>
      <h3 style={{ color: theme.accent, fontSize: '14px', margin: '0 0 12px 0' }}>
        Desempenho do Dia
      </h3>
      {items.map((item, index) => {
        const countryCode = getFlag(item.code)
        const pct = parseFloat(item.pctChange)
        const isPositive = pct >= 0

        return (
          <div key={item.code} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 0',
            borderTop: index === 0 ? 'none' : `1px solid ${theme.border}`
          }}>
            <span style={{ fontSize: '12px', color: theme.textSecondary, width: '16px' }}>
              {index + 1}
            </span>
            {countryCode && (
              <img
                src={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`}
                alt={item.code}
                style={{ width: '22px', borderRadius: '2px' }}
              />
            )}
            <span style={{ fontSize: '13px', color: theme.textPrimary, flex: 1 }}>
              {currencyToName[item.code] || item.name}
            </span>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span style={{ fontSize: '12px', color: theme.textSecondary }}>
                R$ {formatPrice(item.bid)}
              </span>
              <span style={{
                fontSize: '13px',
                fontWeight: '500',
                color: isPositive ? theme.positive : theme.negative,
                minWidth: '60px',
                textAlign: 'right',
              }}>
                {isPositive ? '▲' : '▼'} {Math.abs(pct).toFixed(2)}%
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}