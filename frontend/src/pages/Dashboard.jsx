import { useState, useEffect, useContext } from 'react'
import { ThemeContext } from '../App'
import { useCurrencies } from '../hooks/useCurrencies'
import { useIsMobile } from '../hooks/useIsMobile'
import { CurrencyCard } from '../components/CurrencyCard'
import { ThemeToggle } from '../components/ThemeToggle'
import { BitcoinCard } from '../components/BitcoinCard'
import { DailyPerformance } from '../components/RankingList'
import { SearchBar } from '../components/SearchBar'
import { getCurrencyBySymbol, getAvailableCurrencies } from '../services/api'
import { HistoryChart } from '../components/HistoryChart'
import { EmailModal } from '../components/EmailModal'

const MAX_EXTRA_CURRENCIES = 5

export default function Dashboard() {
  const { theme, isDark } = useContext(ThemeContext)
  const { currencies, touristRates, cryptos, loading } = useCurrencies()
  const [extraCurrencies, setExtraCurrencies] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [allCurrencies, setAllCurrencies] = useState([])
  const isMobile = useIsMobile()

  const SectionTitle = ({ icon, title }) => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '16px',
      marginTop: '32px',
      paddingBottom: '8px',
      borderBottom: `1px solid ${theme.border}`,
    }}>
      <img
        src={`/${icon}`}
        alt={title}
        style={{
          width: '24px',
          height: '24px',
          objectFit: 'contain',
          filter: isDark ? 'brightness(0) invert(1)' : 'brightness(0) opacity(0.6)',
        }}
      />
      <h2 style={{
        margin: 0,
        fontSize: '14px',
        fontWeight: '600',
        color: theme.textSecondary,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
      }}>
        {title}
      </h2>
    </div>
  )

  useEffect(() => {
    getAvailableCurrencies().then(res => {
      setAllCurrencies(Object.keys(res.data))
    }).catch(err => console.error('Erro ao buscar moedas disponíveis:', err))
  }, [])

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

  const sorted = [
    ...Object.values(currencies),
    ...Object.values(extraCurrencies)
  ].sort((a, b) => parseFloat(b.pctChange) - parseFloat(a.pctChange))

  if (loading) return <p style={{ padding: '20px' }}>Carregando...</p>

  return (
    <div style={{ padding: isMobile ? '12px' : '20px', color: theme.textPrimary }}>

      {/* HEADER */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              fontSize: '12px',
              padding: '6px 12px',
              borderRadius: '8px',
              gap: '6px',
              display: 'flex',
              alignItems: 'center',
              border: `1px solid ${theme.border}`,
              backgroundColor: 'transparent',
              color: theme.textSecondary,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            <img
              src="/iconemail.png"
              alt="email"
              style={{
                width: '24px',
                height: '24px',
                filter: isDark ? 'brightness(0) invert(1)' : 'brightness(0) opacity(0.6)',
                objectFit: 'contain',
                verticalAlign: 'middle',
              }}
            />
            {!isMobile && 'Relatório'}
          </button>
          <ThemeToggle />
        </div>
      </div>


      {/* SEÇÃO: COTAÇÕES */}
      <SectionTitle icon="icone-cotacoes.png" title="Cotações do Dia" />
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

      {/* SEÇÃO: CRIPTOMOEDAS */}
      <SectionTitle icon="icone-crypto.png" title="Criptomoedas" />
      {cryptos.bitcoin && (
        <BitcoinCard
          name="Bitcoin"
          brl={cryptos.bitcoin.brl}
          usd={cryptos.bitcoin.usd}
          brl24h={cryptos.bitcoin.brl_24h_change}
          usd24h={cryptos.bitcoin.usd_24h_change}
        />
      )}

      {/* SEÇÃO: EVOLUÇÃO HISTÓRICA */}
      <SectionTitle icon="icone-grafico.png" title="Evolução Histórica" />
      <HistoryChart symbol="USD-BRL" />

      {/* SEÇÃO: DESEMPENHO DO DIA */}
      <SectionTitle icon="icone-ranking.png" title="Desempenho do Dia" />
      <DailyPerformance items={sorted} />

      <EmailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        availableCurrencies={allCurrencies.length > 0 ? allCurrencies : Object.keys(currencies)}
      />

      {/* RODAPÉ */}
      <div style={{
        marginTop: '32px',
        paddingTop: '16px',
        borderTop: `1px solid ${theme.border}`,
        fontSize: '11px',
        color: theme.textSecondary,
        textAlign: 'center',
        lineHeight: 1.6,
      }}>
        <p style={{ margin: 0 }}>
          Valores de <strong>câmbio comercial</strong> — referência para investimentos e análise de mercado.
        </p>
        <p style={{ margin: '4px 0 0 0' }}>
          Para câmbio turístico (USD/EUR), os valores exibidos são taxa de venda ao consumidor.
        </p>
        <p style={{ margin: '4px 0 0 0' }}>
          Dados fornecidos por <strong>AwesomeAPI</strong> e <strong>CoinGecko</strong> · Atualização a cada 60s
        </p>
      </div>
    </div>
  )
}