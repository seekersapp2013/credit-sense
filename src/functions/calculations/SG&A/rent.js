import { getOperatingExpenseByCategory } from '.'
import { totalCols } from '..'
import { totalHeadcount } from './headcount'

export const rentExpensesData = ({ operating_expenses }) => {
  return getOperatingExpenseByCategory({ operating_expenses }, 'Rent')
}

export const officeRentExpenses = (props) => {
  let {
    sga: { office_per_desk_cost },
  } = props

  const data = []

  const totalHeadcountData = totalHeadcount(props)

  office_per_desk_cost = parseInt(office_per_desk_cost)

  for (let i = 0; i < 84; i++) {
    let val = totalHeadcountData[i] * office_per_desk_cost

    data.push(val)
  }

  return data
}

export const totalRentExpensesData = ({ operating_expenses }) => {
  const data = rentExpensesData({ operating_expenses })
  return data.length ? totalCols(data) : Array(84).fill(0)
}

export const totalRentExpenses = (props) => {
  let { operating_expenses } = props
  return totalCols([totalRentExpensesData({ operating_expenses }), officeRentExpenses(props)])
}
