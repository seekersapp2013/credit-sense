import { getOperatingExpenseByCategory } from '.'
import { totalCols } from '..'

export const utilitiesExpenses = ({ operating_expenses }) => {
  return getOperatingExpenseByCategory({ operating_expenses }, 'Utilities')
}

export const totalUtilitiesExpenses = ({ operating_expenses }) => {
  const data = utilitiesExpenses({ operating_expenses })
  return data.length ? totalCols(data) : Array(84).fill(0)
}
