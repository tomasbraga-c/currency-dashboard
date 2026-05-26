import { useContext } from 'react'
import { ThemeContext } from '../App'
import { useIsMobile } from '../hooks/useIsMobile'

export function BitcoinCard({ name, brl, usd, brl24h, usd24h }) {
  const { theme } = useContext(ThemeContext)
  const isMobile = useIsMobile()
  const isBrlPositive = brl24h >= 0
  const isUsdPositive = usd24h >= 0

  return (
    <div style={{
      backgroundColor: theme.card,
      border: `1px solid ${theme.border}`,
      borderRadius: '8px',
      padding: isMobile ? '16px' : '20px 24px',
      marginBottom: isMobile ? '16px' : '24px',
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: isMobile ? '0' : '24px',
      alignItems: 'center',
    }}>
      {/* Lado esquerdo — BRL */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          width: '44px', height: '44px', borderRadius: '50%',
          backgroundColor: theme.bg,
          border: `1px solid ${theme.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '20px', color: '#F7931A', fontWeight: 'bold', flexShrink: 0
        }}>
          ₿
        </div>
        <div>
          <div style={{ fontSize: '11px', color: theme.textSecondary, marginBottom: '2px', letterSpacing: '0.05em' }}>
            BITCOIN · BRL
          </div>
          <div style={{ fontSize: '24px', fontWeight: '600', color: theme.textPrimary, lineHeight: 1 }}>
            R$ {brl?.toLocaleString('pt-BR')}
          </div>
          <div style={{
            fontSize: '13px', marginTop: '4px',
            color: isBrlPositive ? theme.positive : theme.negative
          }}>
            {isBrlPositive ? '▲' : '▼'} {Math.abs(brl24h).toFixed(2)}%
            <span style={{ fontSize: '10px', color: theme.textSecondary, marginLeft: '4px' }}>24h</span>
          </div>
        </div>
      </div>

      {/* Lado direito — USD */}
      <div style={{
        borderLeft: isMobile ? 'none' : `1px solid ${theme.border}`,
        borderTop: isMobile ? `1px solid ${theme.border}` : 'none',
        paddingLeft: isMobile ? '0' : '24px',
        paddingTop: isMobile ? '16px' : '0',
        marginTop: isMobile ? '4px' : '0',
      }}>
        <div style={{ fontSize: '11px', color: theme.textSecondary, marginBottom: '2px', letterSpacing: '0.05em' }}>
          BITCOIN · USD
        </div>
        <div style={{ fontSize: '24px', fontWeight: '600', color: theme.textPrimary, lineHeight: 1 }}>
          $ {usd?.toLocaleString('en-US')}
        </div>
        <div style={{
          fontSize: '13px', marginTop: '4px',
          color: isUsdPositive ? theme.positive : theme.negative
        }}>
          {isUsdPositive ? '▲' : '▼'} {Math.abs(usd24h).toFixed(2)}%
          <span style={{ fontSize: '10px', color: theme.textSecondary, marginLeft: '4px' }}>24h</span>
        </div>
      </div>
    </div>
  )
}