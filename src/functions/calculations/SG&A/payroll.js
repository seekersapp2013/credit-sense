import { totalCols } from '..'
import { getMonthlyCostToCompany } from '../TeamsAndSalaries'
import { headcount } from './headcount'

export const payroll2 = (props) => {
  let { team } = props

  const headcountData = headcount(props)

  return headcountData.map((headcountPerTeamMember, i) => {
    let teamMemberData = team[i]
    let monthlyCostToCompany = getMonthlyCostToCompany(teamMemberData)

    let data = []

    headcountPerTeamMember.forEach((count, j) => {
      let initialMonthlyCost = monthlyCostToCompany * count
      let numberOfIncreases = data.filter((value) => value > 0).length
      let annualIncrease = parseInt(teamMemberData.annual_increase)
      let incrementalFactor = (1 + annualIncrease) ** parseInt(numberOfIncreases / 12)

      data.push(i === 0 ? initialMonthlyCost : initialMonthlyCost * incrementalFactor)
    })

    return data
  })
}

export const payroll = (props) => {
  let { team } = props

  const headcountData = headcount(props)

  // console.log(headcountData)

  return headcountData.map((singleHeadcountData, j) => {
    const data = []

    let monthlyCostToCompany = getMonthlyCostToCompany(team[j])
    // (parseInt(team[j].salary) / 12) * (1 + parseInt(team[j].taxes_and_benefits) / 100)

    for (let i = 0; i < 84; i++) {
      const val =
        i === 0
          ? monthlyCostToCompany * singleHeadcountData[i]
          : monthlyCostToCompany *
            singleHeadcountData[i] *
            (1 + parseInt(team[j].annual_increase) / 100) **
              Math.floor(data.filter((cell) => cell > 0).length / 12)
      // const val =
      //   monthlyCostToCompany *
      //   singleHeadcountData[i] *
      //   (1 + parseInt(team[j].annual_increase) / 100) **
      //     Math.floor(((data[i - 1] > 0 ? 1 : 0) + (data[i - 2] > 0 ? 1 : 0)) / 12, 0)

      data.push(val)
    }

    return data
  })
}

export const totalPayroll = (props) => totalCols(payroll(props))
