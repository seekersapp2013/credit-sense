import { getOperatingExpenseBySubCategory } from '.'
import { totalCols } from '..'

export const recurringExpenses = ({ operating_expenses }) => {
  return getOperatingExpenseBySubCategory({ operating_expenses }, 'Recurring')
}

export const totalRecurringExpenses = ({ operating_expenses }) => {
  const data = recurringExpenses({ operating_expenses })
  return data.length ? totalCols(data) : Array(84).fill(0)
}

export const oneTimeExpenses = ({ operating_expenses }) => {
  return getOperatingExpenseBySubCategory({ operating_expenses }, 'One-Time')
}

export const totalOneTimeExpenses = ({ operating_expenses }) => {
  const data = oneTimeExpenses({ operating_expenses })
  return data.length ? totalCols(data) : Array(84).fill(0)
}

export const totalAdvisoryAndProf = ({ operating_expenses }) => {
  return totalCols([
    totalRecurringExpenses({ operating_expenses }),
    totalOneTimeExpenses({ operating_expenses }),
  ])
}
