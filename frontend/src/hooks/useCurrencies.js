import { useState, useEffect } from 'react'
import { getCurrencies, getCryptos } from '../services/api'

const TOURIST_MAP = {
  USD: 'USDBRLT',
  EUR: 'EURBRLT',
}

export function useCurrencies() {
  const [currencies, setCurrencies] = useState({})
  const [touristRates, setTouristRates] = useState({})
  const [cryptos, setCryptos] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    setError(null)
    setLoading(true)
    try {
      const [currenciesRes, cryptosRes] = await Promise.all([
        getCurrencies(),
        getCryptos()
      ])

      const allData = currenciesRes.data
      const commercial = {}
      const tourist = {}

      Object.entries(allData).forEach(([key, value]) => {
        if (key.includes('BRLT') || key.includes('BRLPTAX')) {
          tourist[value.code] = value
        } else {
          commercial[key] = value
        }
      })

      setCurrencies(commercial)
      setTouristRates(tourist)
      setCryptos(cryptosRes.data)
      setLoading(false)
    } catch (err) {
      setError(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 60000)
    return () => clearInterval(interval)
  }, [])

  return { currencies, touristRates, cryptos, loading, error, retry: fetchData }
}