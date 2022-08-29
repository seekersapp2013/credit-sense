export const formatMoney = (amount = '', withDecimal = false, withoutCurrency = true) => {
  return amount < 0
    ? `(${format(amount * -1, withDecimal, withoutCurrency)})`
    : amount === ''
    ? ''
    : format(amount, withDecimal, withoutCurrency)
}

const format = (amount, withDecimal, withoutCurrency) => {
  const currency = withoutCurrency ? '' : '₦'
  if (withDecimal) {
    return currency + String(Number(amount).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
  return currency + String(Math.round(Number(amount))).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
