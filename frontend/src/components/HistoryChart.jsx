import { useState, useEffect, useContext } from 'react'
import { ThemeContext } from '../App'
import { getCurrencyHistory } from '../services/api'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

export function HistoryChart({ symbol }) {
  const { theme } = useContext(ThemeContext)
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await getCurrencyHistory(symbol)
        const formatted = res.data
          .reverse()
          .map(item => ({
            date: new Date(parseInt(item.timestamp) * 1000)
              .toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
            price: parseFloat(item.bid),
            pctChange: parseFloat(item.pctChange),
          }))
        setData(formatted)
      } catch (error) {
        console.error('Erro ao buscar histórico:', error)
      }
    }
    fetchHistory()
  }, [symbol])

  return (
    <div style={{
      backgroundColor: theme.card,
      border: `1px solid ${theme.border}`,
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '24px',
    }}>
      <h3 style={{ color: theme.accent, fontSize: '14px', margin: '0 0 16px 0' }}>
        Evolução Histórica — {symbol} (30 dias)
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
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
            formatter={(value) => [`R$ ${value.toFixed(4)}`, 'Valor']}
          />
          <Bar dataKey="price" radius={[2, 2, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.pctChange >= 0 ? theme.positive : theme.negative}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}