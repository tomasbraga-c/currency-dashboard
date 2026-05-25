import { useState, useContext } from 'react'
import { ThemeContext } from '../App'
import { getFlag, cryptoSymbols } from '../utils/flags'
import { currencyToName } from '../utils/currencies'

const formatPrice = (value) => {
  const num = parseFloat(value)
  if (num < 0.01) return num.toFixed(6)
  if (num < 1) return num.toFixed(4)
  return num.toFixed(2)
}

export function CurrencyCard({ code, name, bid, pctChange, high, low, touristRate }) {
  const { theme } = useContext(ThemeContext)
  const [isTourist, setIsTourist] = useState(false)
  const countryCode = getFlag(code)

  const activeData = isTourist && touristRate ? touristRate : { bid, pctChange, high, low }
  const displayPrice = isTourist && touristRate ? touristRate.ask : bid
  const isPositive = parseFloat(activeData.pctChange) >= 0

  return (
    <div style={{
      backgroundColor: theme.card,
      border: `1px solid ${theme.border}`,
      borderRadius: '8px',
      padding: '16px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
          {countryCode ? (
            <img
              src={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`}
              alt={code}
              style={{ width: '24px', borderRadius: '2px', flexShrink: 0 }}
            />
          ) : (
            <span style={{ fontSize: '18px', flexShrink: 0 }}>
              {cryptoSymbols[code] || '💱'}
            </span>
          )}
          <strong style={{
            color: theme.accent,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize: '14px',
          }}>
            {currencyToName[code] || name}
          </strong>
        </div>

        {touristRate && (
          <div
            onClick={() => setIsTourist(prev => !prev)}
            style={{
              fontSize: '10px',
              padding: '2px 8px',
              borderRadius: '10px',
              cursor: 'pointer',
              border: `1px solid ${theme.border}`,
              color: isTourist ? theme.card : theme.textSecondary,
              backgroundColor: isTourist ? theme.accent : 'transparent',
              transition: 'all 0.2s ease',
              userSelect: 'none',
              flexShrink: 0,
              marginLeft: '6px',
            }}
          >
            {isTourist ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <img 
                    src="/turismo.png" 
                    alt="turismo" 
                    style={{ 
                        width: '12px', 
                        height: '12px',
                        filter: 'brightness(0) invert(1)' 
                    }} 
                    />
                    Turismo
                </span>
                ) : (
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <img 
                    src="/comercial.png" 
                    alt="comercial" 
                    style={{ 
                        width: '12px', 
                        height: '12px',
                        filter: 'brightness(0) opacity(0.5)'
                    }} 
                    />
                    Comercial
                </span>
                )}
          </div>
        )}
      </div>

      <div style={{ color: theme.textPrimary, fontSize: '20px', fontWeight: '500' }}>
        R$ {formatPrice(displayPrice)}
      </div>
      <div style={{ color: isPositive ? theme.positive : theme.negative, fontSize: '13px' }}>
        {isPositive ? '▲' : '▼'} {parseFloat(activeData.pctChange).toFixed(2)}%
      </div>
      <div style={{ color: theme.textSecondary, fontSize: '12px', marginTop: '6px' }}>
        {isTourist && touristRate
            ? <span style={{ fontStyle: 'italic', fontSize: '11px' }}>Máx/Mín não disponível para câmbio turístico</span>
            : `Máx: R$ ${formatPrice(activeData.high)} · Mín: R$ ${formatPrice(activeData.low)}`
        }
      </div>
    </div>
  )
}