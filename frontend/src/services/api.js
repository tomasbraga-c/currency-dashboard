import axios from 'axios';

const api = axios.create({ 
    baseURL: 'http://localhost:8000/api/v1'
});

export default api;

export const getCurrencies = () => api.get('/currencies')

export const getCryptos = () => api.get('/cryptos')

export const getSummary = () => api.get('/summary')

export const getAvailableCurrencies = () => api.get('/currencies/available')

export const savePreferences = (email, currencies, cryptos) =>
  api.post('/preferences', { email, currencies, cryptos })