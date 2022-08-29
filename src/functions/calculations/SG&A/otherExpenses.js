import { getOperatingExpenseByCategory } from '.'
import { totalCols } from '..'

export const otherExpenses = ({ operating_expenses }) => {
  return getOperatingExpenseByCategory({ operating_expenses }, 'Other Expenses')
}

export const totalOtherExpenses = ({ operating_expenses }) => {
  const data = otherExpenses({ operating_expenses })
  return data.length ? totalCols(data) : Array(84).fill(0)
}
