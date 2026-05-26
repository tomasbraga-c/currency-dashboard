import { useState, useContext } from 'react'
import { ThemeContext } from '../App'
import { useCurrencies } from '../hooks/useCurrencies'
import { useIsMobile } from '../hooks/useIsMobile'
import { CurrencyCard } from '../components/CurrencyCard'
import { ThemeToggle } from '../components/ThemeToggle'
import { BitcoinCard } from '../components/BitcoinCard'
import { DailyPerformance } from '../components/RankingList'
import { SearchBar } from '../components/SearchBar'
import { getCurrencyBySymbol } from '../services/api'
import { HistoryChart } from '../components/HistoryChart'



const MAX_EXTRA_CURRENCIES = 5

export default function Dashboard() {
  const { theme, isDark } = useContext(ThemeContext)
  const { currencies, touristRates, cryptos, loading } = useCurrencies()
  const [extraCurrencies, setExtraCurrencies] = useState({})
  const isMobile = useIsMobile()

  const handleAddCurrency = async (symbol) => {
    if (Object.keys(extraCurrencies).length >= MAX_EXTRA_CURRENCIES) {
      alert(`Limite de ${MAX_EXTRA_CURRENCIES} moedas extras atingido! Remova uma para adicionar outra.`)
      return
    }

    const key = symbol.replace('-', '')
    const allKeys = [
      ...Object.keys(currencies),
      ...Object.keys(extraCurrencies)
    ]

    if (allKeys.includes(key)) {
      console.log('Moeda já existe!')
      return
    }

    try {
      const res = await getCurrencyBySymbol(symbol)
      if (!res.data || Object.keys(res.data).length === 0) {
        alert(`Moeda "${symbol}" não encontrada. Tente outro par como CHF-BRL ou CNY-BRL.`)
        return
      }
      const dataKey = Object.keys(res.data)[0]
      setExtraCurrencies(prev => ({ ...prev, [dataKey]: res.data[dataKey] }))
    } catch (err) {
      alert(`Não foi possível adicionar "${symbol}". Esta moeda pode não estar disponível.`)
      console.error('Erro ao buscar moeda:', err)
    }
  }

  const sorted = Object.values(currencies)
    .sort((a, b) => parseFloat(b.pctChange) - parseFloat(a.pctChange))

  if (loading) return <p style={{ padding: '20px' }}>Carregando...</p>

  return (
    <div style={{ padding: isMobile ? '12px' : '20px', color: theme.textPrimary }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: isMobile ? '16px' : '24px',
        gap: '8px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '12px', minWidth: 0 }}>
          <img
            src={isDark ? '/icon-white.png' : '/icon.png'}
            alt="Currency.Dash"
            style={{ height: isMobile ? '36px' : '50px', width: 'auto', flexShrink: 0 }}
          />
          <div style={{ minWidth: 0 }}>
            <div style={{
              fontSize: isMobile ? '17px' : '22px',
              fontWeight: '600',
              color: theme.textPrimary,
              lineHeight: 1,
              whiteSpace: 'nowrap',
            }}>
              Currency.Dash
            </div>
            <div style={{
              fontSize: isMobile ? '9px' : '11px',
              color: theme.textPrimary,
              letterSpacing: '0.1em',
              whiteSpace: 'nowrap',
            }}>
              TRAVEL · INVEST · TRACK
            </div>
          </div>
        </div>
        <div style={{ flexShrink: 0 }}>
          <ThemeToggle />
        </div>
      </div>

      <SearchBar onAdd={handleAddCurrency} />

      {Object.keys(extraCurrencies).length > 0 && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '11px',
          color: theme.textSecondary,
          marginBottom: '8px',
          marginTop: '-16px'
        }}>
          <span>{Object.keys(extraCurrencies).length}/{MAX_EXTRA_CURRENCIES} moedas extras adicionadas</span>
          <button
            onClick={() => setExtraCurrencies({})}
            style={{
              fontSize: '11px',
              padding: '2px 10px',
              borderRadius: '10px',
              border: `1px solid ${theme.border}`,
              backgroundColor: 'transparent',
              color: theme.negative,
              cursor: 'pointer',
            }}
          >
            Resetar
          </button>
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(230px, 1fr))',
        gap: isMobile ? '8px' : '12px',
        marginBottom: isMobile ? '16px' : '24px',
      }}>
        {[...Object.values(currencies), ...Object.values(extraCurrencies)].map((curr, index) => (
          <CurrencyCard
            key={`${index}-${curr.code}-${curr.codein}`}
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
      <HistoryChart symbol="USD-BRL" />
      <DailyPerformance items={sorted} />
    </div>
  )
}