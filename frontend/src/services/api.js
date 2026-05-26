import axios from 'axios';

const api = axios.create({ 
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'
});

export default api;

export const getCurrencies = () => api.get('/currencies')

export const getCurrencyBySymbol = (symbol) => api.get(`/currencies/${symbol}`)

export const getCryptos = () => api.get('/cryptos')

export const getCryptoPrice = (id) => api.get(`/cryptos/${id}`)

export const getSummary = () => api.get('/summary')

export const getAvailableCurrencies = () => api.get('/currencies/available')

export const savePreferences = (email, currencies, cryptos) =>
  api.post('/preferences', { email, currencies, cryptos })

export const getPreferences = (email) =>
  api.get(`/preferences/${email}`)

export const getCurrencyHistory = (symbol, days = 30) => 
  api.get(`/currencies/${symbol}/history?days=${days}`)

