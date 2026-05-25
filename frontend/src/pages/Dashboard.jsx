import { useContext } from 'react'
import { ThemeContext } from '../App'
import { useCurrencies } from '../hooks/useCurrencies'

export default function Dashboard() {
  const { theme } = useContext(ThemeContext)
  const { currencies, cryptos, loading, error } = useCurrencies()

  if (loading) return <p style={{ padding: '20px' }}>Carregando...</p>// tela de loading
  
  return (
    <div style={{ padding: '20px', color: theme.textPrimary }}>
      <h1 style={{ color: theme.accent }}>Currency.Dash</h1>

      <h2>Moedas</h2>
      {Object.values(currencies).map(curr => (
        <div key={curr.code}>
          <strong>{curr.name}</strong>: R$ {curr.bid} ({curr.pctChange}%)
        </div>
      ))}

      <h2>Crypto</h2>
      {Object.entries(cryptos).map(([name, data]) => (
        <div key={name}>
          <strong>{name}</strong>: R$ {data.brl}
        </div>
      ))}
    </div>
  )
}