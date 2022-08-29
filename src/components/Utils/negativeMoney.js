import { formatMoney } from './formatMoney'

export const negativeMoney = (amount) =>
  amount < 0 ? `(${formatMoney(amount * -1)})` : formatMoney(amount)
