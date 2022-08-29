import { getOperatingExpenseByCategory } from '.'
import { totalCols } from '..'

export const techSupportAndServicesExpenses = ({ operating_expenses }) => {
  return getOperatingExpenseByCategory({ operating_expenses }, 'Tech Support & Services')
}

export const totalTechSupportAndServicesExpenses = ({ operating_expenses }) => {
  const data = techSupportAndServicesExpenses({ operating_expenses })
  return data.length ? totalCols(data) : Array(84).fill(0)
}
