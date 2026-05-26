import { useState, useContext } from 'react'
import { ThemeContext } from '../App'
import { savePreferences } from '../services/api'
import { currencyToName } from '../utils/currencies'

const extractCode = (key) => {
  return key.replace('-BRL', '').replace('BRL', '')
}

const cryptoOptions = [
  { id: 'bitcoin', label: '₿ Bitcoin' },
  { id: 'ethereum', label: null, name: 'Ethereum' },
  { id: 'solana', label: '◎ Solana' },
  { id: 'binancecoin', label: '⧫ BNB' },
  { id: 'ripple', label: 'X XRP' },
  { id: 'dogecoin', label: 'Ð Dogecoin' },
  { id: 'litecoin', label: 'Ł Litecoin' },
]

export function EmailModal({ isOpen, onClose, availableCurrencies }) {
  const { theme } = useContext(ThemeContext)
  const [email, setEmail] = useState('')
  const [selected, setSelected] = useState([])
  const [selectedCryptos, setSelectedCryptos] = useState(['bitcoin'])
  const [saved, setSaved] = useState(false)

  const toggleSelection = (currency) => {
    setSelected(prev =>
      prev.includes(currency)
        ? prev.filter(c => c !== currency)
        : [...prev, currency]
    )
  }

  const toggleCrypto = (crypto) => {
    setSelectedCryptos(prev =>
      prev.includes(crypto)
        ? prev.filter(c => c !== crypto)
        : [...prev, crypto]
    )
  }

  const handleSave = async () => {
    if (!email) return
    try {
      await savePreferences(email, selected, selectedCryptos)
      setSaved(true)
      setTimeout(() => {
        setSaved(false)
        onClose()
      }, 1500)
    } catch (error) {
      console.error('Erro ao salvar preferências:', error)
    }
  }

  const getDisplayName = (key) => {
    const code = extractCode(key)
    return currencyToName[code] || null
  }

  const cryptoList = ['BTC', 'ETH', 'LTC', 'XRP', 'DOGE', 'BNB', 'SOL', 'BRETT']

  const filteredCurrencies = availableCurrencies.filter(key => {
    if (!key.includes('-BRL') && !key.endsWith('BRL')) return false
    if (key.includes('BRLT') || key.includes('BRLPTAX')) return false
    const code = extractCode(key)
    if (cryptoList.includes(code)) return false
    if (!currencyToName[code]) return false
    return true
  })

  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
    }}>
      <div style={{
        backgroundColor: theme.card,
        border: `1px solid ${theme.border}`,
        padding: '24px',
        borderRadius: '12px',
        width: '340px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        maxHeight: '90vh',
        overflowY: 'auto',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '16px', color: theme.accent }}>
            📧 Relatório Diário
          </h2>
          <button onClick={onClose} style={{
            background: 'none', border: 'none',
            cursor: 'pointer', fontSize: '18px',
            color: theme.textSecondary,
          }}>✕</button>
        </div>

        <p style={{ margin: 0, fontSize: '12px', color: theme.textSecondary }}>
          Receba um resumo diário das cotações no seu e-mail toda manhã.
        </p>

        <input
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '6px',
            border: `1px solid ${theme.border}`,
            backgroundColor: theme.bg,
            color: theme.textPrimary,
            fontSize: '13px',
            outline: 'none',
          }}
        />

        <div>
          <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: theme.textSecondary }}>
            Moedas para acompanhar:
          </p>
          <div style={{
            maxHeight: '180px', overflowY: 'auto',
            border: `1px solid ${theme.border}`,
            borderRadius: '6px',
          }}>
            {filteredCurrencies.map(currency => (
              <div key={currency} style={{
                display: 'flex', alignItems: 'center',
                padding: '8px 12px',
                borderBottom: `1px solid ${theme.border}`,
                cursor: 'pointer',
              }} onClick={() => toggleSelection(currency)}>
                <input
                  type="checkbox"
                  checked={selected.includes(currency)}
                  onChange={() => toggleSelection(currency)}
                  style={{ marginRight: '8px' }}
                />
                <span style={{ fontSize: '13px', color: theme.textPrimary }}>
                  {getDisplayName(currency)}
                </span>
                <span style={{ fontSize: '11px', color: theme.textSecondary, marginLeft: '4px' }}>
                  ({extractCode(currency)})
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: theme.textSecondary }}>
            Criptomoedas:
          </p>
          <div style={{
            border: `1px solid ${theme.border}`,
            borderRadius: '6px',
          }}>
            {cryptoOptions.map((crypto, index) => (
              <div key={crypto.id} style={{
                display: 'flex', alignItems: 'center',
                padding: '8px 12px',
                borderBottom: index < cryptoOptions.length - 1 ? `1px solid ${theme.border}` : 'none',
                cursor: 'pointer',
              }} onClick={() => toggleCrypto(crypto.id)}>
                <input
                  type="checkbox"
                  checked={selectedCryptos.includes(crypto.id)}
                  onChange={() => toggleCrypto(crypto.id)}
                  style={{ marginRight: '8px' }}
                />
                <span style={{ fontSize: '13px', color: theme.textPrimary }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {crypto.id === 'ethereum' ? (
                            <img src="/icone-ethereum.png" alt="ethereum" style={{ width: '14px', height: '14px', objectFit: 'contain' }} />
                        ) : (
                            <span>{cryptoOptions.find(c => c.id === crypto.id)?.label}</span>
                        )}
                        {crypto.id === 'ethereum' ? 'Ethereum' : ''}
                    </span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleSave}
          style={{
            padding: '10px',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: saved ? theme.positive : theme.accent,
            color: '#fff',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            fontWeight: '500',
          }}
        >
          {saved ? '✅ Salvo!' : 'Salvar preferências'}
        </button>
      </div>
    </div>
  )
}