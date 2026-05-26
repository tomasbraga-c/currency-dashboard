import { useState, useEffect, useContext } from 'react'
import { ThemeContext } from '../App'
import { getCurrencyHistory } from '../services/api'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const AVAILABLE_SYMBOLS = [
  { value: 'USD-BRL', label: 'Dólar (USD)', color: '#2196F3' },
  { value: 'EUR-BRL', label: 'Euro (EUR)', color: '#9C27B0' },
  { value: 'GBP-BRL', label: 'Libra (GBP)', color: '#F44336' },
  { value: 'JPY-BRL', label: 'Iene (JPY)', color: '#FF9800' },
  { value: 'ARS-BRL', label: 'Peso Arg. (ARS)', color: '#00BCD4' },
  { value: 'CAD-BRL', label: 'Dólar Can. (CAD)', color: '#E91E63' },
  { value: 'CHF-BRL', label: 'Franco Suíço (CHF)', color: '#4CAF50' },
  { value: 'AUD-BRL', label: 'Dólar Aus. (AUD)', color: '#FF5722' },
  { value: 'CNY-BRL', label: 'Yuan (CNY)', color: '#795548' },
  { value: 'BTC-BRL', label: 'Bitcoin (BTC)', color: '#F7931A' },
  { value: 'ETH-BRL', label: 'Ethereum (ETH)', color: '#627EEA' },
]

export function HistoryChart() {
  const { theme } = useContext(ThemeContext)
  const [selectedSymbols, setSelectedSymbols] = useState(['USD-BRL'])
  const [chartData, setChartData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true)
      try {
        const results = await Promise.all(
          selectedSymbols.map(symbol => getCurrencyHistory(symbol))
        )

        const dateMap = {}
        results.forEach((res, i) => {
          const symbol = selectedSymbols[i]
          res.data.reverse().forEach(item => {
            const date = new Date(parseInt(item.timestamp) * 1000)
              .toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
            if (!dateMap[date]) dateMap[date] = { date }
            dateMap[date][symbol] = parseFloat(item.bid)
          })
        })

        setChartData(Object.values(dateMap))
      } catch (error) {
        console.error('Erro ao buscar histórico:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [selectedSymbols])

  const toggleSymbol = (value) => {
    setSelectedSymbols(prev =>
      prev.includes(value)
        ? prev.length > 1 ? prev.filter(s => s !== value) : prev
        : [...prev, value]
    )
  }

  return (
    <div style={{
      backgroundColor: theme.card,
      border: `1px solid ${theme.border}`,
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '24px',
    }}>
      <h3 style={{ color: theme.accent, fontSize: '14px', margin: '0 0 12px 0' }}>
        Evolução Histórica — 30 dias
      </h3>

      {/* Seletor de moedas */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '6px',
        marginBottom: '16px',
      }}>
        {AVAILABLE_SYMBOLS.map(s => (
          <button
            key={s.value}
            onClick={() => toggleSymbol(s.value)}
            style={{
              fontSize: '11px',
              padding: '3px 10px',
              borderRadius: '10px',
              border: `1px solid ${selectedSymbols.includes(s.value) ? s.color : theme.border}`,
              backgroundColor: selectedSymbols.includes(s.value) ? s.color : 'transparent',
              color: selectedSymbols.includes(s.value) ? '#fff' : theme.textSecondary,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.textSecondary, fontSize: '13px' }}>
          Carregando...
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <XAxis
              dataKey="date"
              stroke={theme.textSecondary}
              tick={{ fontSize: 10, fill: theme.textSecondary }}
              interval={4}
            />
            <YAxis
              stroke={theme.textSecondary}
              tick={{ fontSize: 10, fill: theme.textSecondary }}
              domain={['auto', 'auto']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: theme.card,
                border: `1px solid ${theme.border}`,
                borderRadius: '6px',
                fontSize: '12px',
                color: theme.textPrimary,
              }}
              formatter={(value, name) => {
                const symbol = AVAILABLE_SYMBOLS.find(s => s.value === name)
                const num = parseFloat(value)
                const formatted = num >= 1000
                    ? num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    : num.toFixed(4)
                return [`R$ ${formatted}`, symbol?.label || name]
                }}
            />
            <Legend
              formatter={(value) => {
                const symbol = AVAILABLE_SYMBOLS.find(s => s.value === value)
                return <span style={{ fontSize: '11px', color: theme.textSecondary }}>{symbol?.label}</span>
              }}
            />
            {selectedSymbols.map(symbol => {
              const s = AVAILABLE_SYMBOLS.find(x => x.value === symbol)
              return (
                <Line
                  key={symbol}
                  type="monotone"
                  dataKey={symbol}
                  stroke={s?.color}
                  strokeWidth={2}
                  dot={false}
                  connectNulls
                />
              )
            })}
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}