import { useState, useEffect } from 'react'
import { getCurrencies, getCryptos } from '../services/api'

export function useCurrencies() {
  const [currencies, setCurrencies] = useState({})
  const [cryptos, setCryptos] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      const [currenciesResponse, cryptosResponse] = await Promise.all([
        getCurrencies(),
        getCryptos()
      ]);

      setCurrencies(currenciesResponse.data);
      setCryptos(cryptosResponse.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); 
    return () => clearInterval(interval);
  }, []);

  return { currencies, cryptos, loading, error }
}