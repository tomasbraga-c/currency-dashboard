import { useState, useContext } from 'react'
import { ThemeContext } from '../App'
import { countryToCurrency } from '../utils/currencies'

export function SearchBar({ onAdd }) {
  const { theme } = useContext(ThemeContext)
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)
    if (value.length > 1) {
      const matches = Object.entries(countryToCurrency)
        .filter(([country, code]) =>
          country.toLowerCase().includes(value.toLowerCase()) ||
          code.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 5)
      setSuggestions(matches)
    } else {
      setSuggestions([])
    }
  }

  const handleSelect = (symbol) => {
    onAdd(symbol)
    setQuery('')
    setSuggestions([])
  }

  return (
    <div style={{ position: 'relative', marginBottom: '24px' }}>
      <input
        type="text"
        placeholder="Buscar moeda ou país... ex: Japão, CHF"
        value={query}
        onChange={handleChange}
        style={{
          width: '100%',
          backgroundColor: theme.card,
          color: theme.textPrimary,
          border: `1px solid ${theme.border}`,
          padding: '10px 14px',
          borderRadius: '8px',
          fontSize: '14px',
          outline: 'none',
          boxSizing: 'border-box',
        }}
      />
      {suggestions.length > 0 && (
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          backgroundColor: theme.card,
          border: `1px solid ${theme.border}`,
          borderRadius: '8px',
          position: 'absolute',
          top: 'calc(100% + 4px)',
          left: 0,
          right: 0,
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}>
          {suggestions.map(([country, code], index) => (
            <li
              key={code}
              onClick={() => handleSelect(`${code}-BRL`)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                padding: '10px 14px',
                cursor: 'pointer',
                fontSize: '13px',
                color: theme.textPrimary,
                backgroundColor: hoveredIndex === index ? theme.border : 'transparent',
                borderBottom: index < suggestions.length - 1 ? `1px solid ${theme.border}` : 'none',
                transition: 'background-color 0.15s ease',
              }}
            >
              <strong style={{ color: theme.accent }}>{code}</strong> · {country}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}