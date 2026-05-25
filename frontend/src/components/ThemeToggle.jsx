import { useContext } from 'react'
import { ThemeContext } from '../App'


export function ThemeToggle() {
  const { isDark, toggleTheme, theme } = useContext(ThemeContext)

  return (
    <button
      onClick={toggleTheme}
      style={{ 
        backgroundColor: theme.card,
        border: `1px solid ${theme.border}`,
        color: theme.accent,
        padding: '8px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, color 0.3s ease'
        }}
    >
        {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>

  )
}