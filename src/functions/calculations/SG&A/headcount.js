import { getMonthsArray, totalCols } from '..'
import { keyIndicators, staffNeededToSupportUserBase } from '../Revenue/keyIndicators'

const headcountPerRole = (
  { role, period_of_new_hires, date_hired, number_of_new_hires, maximum_number },
  props,
) => {
  // console.log(props)

  let {
    model_start_date,
    sga: { tech_support_role },
  } = props

  let data = []

  model_start_date = new Date(model_start_date)
  date_hired = new Date(date_hired)

  number_of_new_hires = parseInt(number_of_new_hires)
  maximum_number = parseInt(maximum_number)

  let monthsArray = getMonthsArray(model_start_date)

  for (let i = 0; i < 84; i++) {
    const lastMonthlyCount = i - 1 >= 0 ? data[i - 1] : 0
    const lastQuarterCount = i - 3 >= 0 ? data[i - 3] : 0
    const lastAnnualCount = i - 12 >= 0 ? data[i - 12] : 0

    const count =
      period_of_new_hires === 'Never'
        ? monthsArray[i].getTime() >= date_hired.getTime()
          ? Math.min(number_of_new_hires, maximum_number)
          : 0
        : period_of_new_hires === 'Monthly'
        ? monthsArray[i].getTime() === date_hired.getTime()
          ? Math.min(number_of_new_hires, maximum_number)
          : monthsArray[i].getTime() > date_hired.getTime()
          ? Math.min(maximum_number, lastMonthlyCount + number_of_new_hires)
          : 0
        : period_of_new_hires === 'Quarterly'
        ? monthsArray[i].getTime() === date_hired.getTime()
          ? Math.min(number_of_new_hires, maximum_number)
          : monthsArray[i].getTime() > date_hired.getTime()
          ? Math.min(maximum_number, lastQuarterCount + number_of_new_hires)
          : 0
        : period_of_new_hires === 'Annually'
        ? monthsArray[i].getTime() === date_hired.getTime()
          ? Math.min(number_of_new_hires, maximum_number)
          : monthsArray[i].getTime() > date_hired.getTime()
          ? Math.min(maximum_number, lastAnnualCount + number_of_new_hires)
          : 0
        : 0

    // console.log('role comparision', tech_support_role, role, tech_support_role === role)

    if (tech_support_role === role) {
      data.push(count + staffNeededToSupportUserBase(props)[i])
    } else {
      data.push(count)
    }
  }

  return data
}

export const headcount = (props) => {
  let { team } = props
  return team.map((data) => headcountPerRole(data, props))
}

export const totalHeadcount = (props) => {
  return totalCols(headcount(props))
}
