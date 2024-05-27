import { useState, useEffect } from "react"

type PriceData = {
  coin: string
  price: number
}

export const usePrices = (coins: string[]) => {
  const [prices, setPrices] = useState<PriceData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPrices = async (retries: number = 2) => {
      try {
        const res = await Promise.all(coins.map((coin) => getPrice(coin)))

        const priceData: PriceData[] = res.map((result) => {
          const coinName = Object.keys(result)[0]
          return { coin: coinName, price: result[coinName].usd }
        })

        setPrices(priceData)
        setLoading(false)
      } catch (error: any) {
        if (retries > 0) {
          setTimeout(() => fetchPrices(retries - 1), 2000) // retry after 2 seconds
        } else {
          setError(error.message)
          setLoading(false)
        }
      }
    }

    fetchPrices()
  }, [coins])

  return {
    prices,
    loading,
    error,
  }
}

const getPrice = async (coin: string) => {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`
    )
    if (!res.ok) throw new Error("Failed to fetch")
    const data = await res.json()
    return data
  } catch (error) {
    throw error
  }
}
