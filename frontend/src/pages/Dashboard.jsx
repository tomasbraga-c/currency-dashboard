import { useContext } from 'react'
import { ThemeContext } from '../App'
import { useCurrencies } from '../hooks/useCurrencies'
import { CurrencyCard } from '../components/CurrencyCard'
import { ThemeToggle } from '../components/ThemeToggle'
import { BitcoinCard } from '../components/BitcoinCard'
import { DailyPerformance  } from '../components/RankingList'


export default function Dashboard() {
  const { theme } = useContext(ThemeContext)
  const { currencies, touristRates, cryptos, loading, error } = useCurrencies()
  const sorted = Object.values(currencies)
  .sort((a, b) => parseFloat(b.pctChange) - parseFloat(a.pctChange))
  const topGainers = sorted.slice(0, 3)
  const topLosers = [...sorted].reverse().slice(0, 3)
  const allNegative = topGainers.every(i => parseFloat(i.pctChange) < 0)

  if (loading) return <p style={{ padding: '20px' }}>Carregando...</p>// tela de loading
  
  return (
    <div style={{ padding: '20px', color: theme.textPrimary }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
        }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img
            src="/icon.png"
            alt="Currency.Dash"
            style={{ height: '50px', width: 'auto' }}
            />
            <div>
            <div style={{
                fontSize: '22px',
                fontWeight: '600',
                color: theme.accent,
                lineHeight: 1
            }}>
                Currency.Dash
            </div>
            <div style={{
                fontSize: '11px',
                color: theme.textSecondary,
                letterSpacing: '0.1em'
            }}>
                TRAVEL · INVEST · TRACK
            </div>
            </div>
        </div>
        <ThemeToggle />
        </div>
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: '12px',
            marginBottom: '24px'
        }}>
        {Object.values(currencies).map(curr => (
            <CurrencyCard
              key={curr.code}
              code={curr.code}
              name={curr.name}
              bid={curr.bid}
              pctChange={curr.pctChange}
              high={curr.high}
              low={curr.low}
              touristRate={touristRates[curr.code]}
            />
        ))}
        </div>
      {cryptos.bitcoin && (
        <BitcoinCard
          name="Bitcoin"
          brl={cryptos.bitcoin.brl}
          usd={cryptos.bitcoin.usd}
          brl24h={cryptos.bitcoin.brl_24h_change}
          usd24h={cryptos.bitcoin.usd_24h_change}
        />
      )}

      <DailyPerformance items={sorted} />
    </div>
  )
}