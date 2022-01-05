import { formatMoney } from "./format-money"
export const getVariantPrice = (variant, region) => {
  if (!variant || !variant.prices) {
    return null
  }

  const { moneyAmount } = variant.prices.reduce((acc, next) => {
    if (acc && acc.regionMatch) {
      return acc
    }

    if (next.region_id === region.id) {
      return { moneyAmount: next, regionMatch: true }
    }

    if (next.currency_code === region.currency_code) {
      return { moneyAmount: next, regionMatch: false }
    }

    return acc
  }, null)

  return moneyAmount
}

export const formatVariantPrice = (variant, region) => {
  const moneyAmount = getVariantPrice(variant, region)
  if (moneyAmount) {
    return formatMoney(moneyAmount, 2, region.tax_rate)
  }

  return null
}
