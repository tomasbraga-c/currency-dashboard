import axios from 'axios';

const api = axios.create({ 
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'
});

export default api;

export const getCurrencies = () => api.get('/currencies')

export const getCurrencyBySymbol = (symbol) => api.get(`/currencies/${symbol}`)

export const getCryptos = () => api.get('/cryptos')

export const getCryptoPrice = async (id, tentativas = 3) => {
  for (let i = 0; i < tentativas; i++) {
    try {
      return await api.get(`/cryptos/${id}`)
    } catch (err) {
      if (i < tentativas - 1) {
        await new Promise(res => setTimeout(res, 2000)) // espera 2s e tenta de novo
      } else {
        throw err
      }
    }
  }
}

export const getSummary = () => api.get('/summary')

export const getAvailableCurrencies = () => api.get('/currencies/available')

export const savePreferences = (email, currencies, cryptos) =>
  api.post('/preferences', { email, currencies, cryptos })

export const getPreferences = (email) =>
  api.get(`/preferences/${email}`)

export const getCurrencyHistory = (symbol, days = 30) => 
  api.get(`/currencies/${symbol}/history?days=${days}`)

