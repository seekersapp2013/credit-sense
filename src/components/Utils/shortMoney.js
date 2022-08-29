import { formatMoney } from './formatMoney'

export const shortMoney = (val, withCurrency) => {
  let valLength = val.toString().length

  const valSuffix =
    valLength > 12 ? 'T' : valLength > 9 ? 'B' : valLength > 6 ? 'M' : valLength > 3 ? 'K' : ''

  const divisor =
    valLength > 12
      ? 1000000000000
      : valLength > 9
      ? 1000000000
      : valLength > 6
      ? 1000000
      : valLength > 3
      ? 1000
      : 1

  return formatMoney(val / divisor, true, !withCurrency) + valSuffix
}
