import { usePrices } from "@/hooks/usePrices"

const coins = ["ethereum", "arbitrum", "optimism"]

const PriceComponent = () => {
  const { prices, loading, error } = usePrices(coins)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  console.log("prices", prices)

  return (
    <ul>
      {prices.map(({ coin, price }) => (
        <li key={coin}>
          {coin}: ${price}
        </li>
      ))}
    </ul>
  )
}

export default PriceComponent
