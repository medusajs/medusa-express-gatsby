export function formatMoney(moneyAmount, digits = 2, taxRate = 0) {
  let locale = "en-US"

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: moneyAmount.currency_code,
    minimumFractionDigits: digits,
  }).format((moneyAmount.amount / 100) * (1 + taxRate / 100))
}
