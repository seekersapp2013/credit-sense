import { getOperatingExpenseByCategory } from '.'
import { totalCols } from '..'

export const insuranceExpenses = ({ operating_expenses }) => {
  return getOperatingExpenseByCategory({ operating_expenses }, 'Insurance')
}

export const totalInsuranceExpenses = ({ operating_expenses }) => {
  const data = insuranceExpenses({ operating_expenses })
  return data.length ? totalCols(data) : Array(84).fill(0)
}
