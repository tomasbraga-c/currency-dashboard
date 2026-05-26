import { useContext } from 'react'
import { ThemeContext } from '../App'

export function ThemeToggle() {
  const { isDark, toggleTheme } = useContext(ThemeContext)

  return (
    <div
      onClick={toggleTheme}
      style={{
        width: '52px',
        height: '26px',
        borderRadius: '13px',
        backgroundColor: isDark ? '#2A5045' : '#C0DDD1',
        border: `1px solid ${isDark ? '#4A9E82' : '#0F6E56'}`,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        padding: '3px',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: isDark ? '#4A9E82' : '#0F6E56',
        transform: isDark ? 'translateX(26px)' : 'translateX(0)',
        transition: 'transform 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      }}>
        {isDark ? (
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#191E1C" strokeWidth="2.5">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        ) : (
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#F4F7F5" strokeWidth="2.5">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        )}
      </div>
    </div>
  )
}