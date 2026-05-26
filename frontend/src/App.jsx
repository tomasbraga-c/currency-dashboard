import { useState, createContext } from 'react'
import Dashboard from './pages/Dashboard'
import { lightTheme, darkTheme } from './styles/theme'

export const ThemeContext = createContext()

function App() {
  const [isDark, setIsDark] = useState(false)
  const toggleTheme = () => setIsDark(prev => !prev)
  const theme = isDark ? darkTheme : lightTheme

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme }}>
      <div style={{ 
        backgroundColor: theme.bg, 
        minHeight: '100vh',
        transition: 'background-color 0.3s ease'
      }}>
        <Dashboard />
      </div>
    </ThemeContext.Provider>
  )
}

export default App