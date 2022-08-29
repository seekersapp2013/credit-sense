import { addCAGR, addCAGRToAll, applyToObjectEntries, sumMonthsToYears } from '..'
import { incomeStatement } from '../FSMonth/incomeStatement'

const consolidatedRevenue = (props) =>
  addCAGRToAll(applyToObjectEntries(incomeStatement.consolidatedRevenue(props), sumMonthsToYears))

const consolidatedCOGS = (props) =>
  addCAGRToAll(applyToObjectEntries(incomeStatement.consolidatedCOGS(props), sumMonthsToYears))

const consolidatedSGAandA = (props) =>
  addCAGRToAll(applyToObjectEntries(incomeStatement.consolidatedSGAandA(props), sumMonthsToYears))

const grossProfit = (props) => addCAGR(sumMonthsToYears(incomeStatement.grossProfit(props)))

const grossMargin = (props) => {
  const grossProfitData = grossProfit(props)
  const totalRevenueData = consolidatedRevenue(props).total

  return addCAGR(
    grossProfitData.map((data, i) => {
      const val = (data / totalRevenueData[i]) * 100

      return val ? val : '-'
    }),
  )
}

const EBITDA = (props) => addCAGR(sumMonthsToYears(incomeStatement.EBITDA(props)))

const EBITDAMargin = (props) => {
  const data = []

  const EBITDAData = EBITDA(props)
  const totalRevenueData = consolidatedRevenue(props).total

  for (let i = 0; i < 7; i++) {
    const val = Math.max(EBITDAData[i] / totalRevenueData[i], 0)
    data.push(!val && val !== 0 ? '-' : val * 100)
  }

  return addCAGR(data)
}

const DAndA = (props) => addCAGR(sumMonthsToYears(incomeStatement.DAndA(props)))

const EBIT = (props) => addCAGR(sumMonthsToYears(incomeStatement.EBIT(props)))

const EBITMargin = (props) => {
  const data = []

  const EBITData = EBIT(props)
  const totalRevenueData = consolidatedRevenue(props).total

  for (let i = 0; i < 7; i++) {
    const val = Math.max(EBITData[i] / totalRevenueData[i], 0)
    data.push(!val && val !== 0 ? '-' : val * 100)
  }

  return addCAGR(data)
}

const interestExpense = (props) => addCAGR(sumMonthsToYears(incomeStatement.interestExpense(props)))
const incomeTaxes = (props) => addCAGR(sumMonthsToYears(incomeStatement.incomeTaxes(props)))
const netIncome = (props) => addCAGR(sumMonthsToYears(incomeStatement.netIncome(props)))
const netMargin = (props) => {
  const data = []

  const consolidatedRevenueTotalData = consolidatedRevenue(props).total
  const netIncomeData = netIncome(props)

  for (let i = 0; i < 7; i++) {
    const val = Math.max(netIncomeData[i] / consolidatedRevenueTotalData[i], 0)

    data.push(isNaN(val) ? '-' : val * 100)
  }

  return addCAGR(data)
}

export const annualIncomeStatement = {
  consolidatedRevenue,
  consolidatedCOGS,
  consolidatedSGAandA,
  grossProfit,
  grossMargin,
  EBITDA,
  EBITDAMargin,
  DAndA,
  EBIT,
  EBITMargin,
  interestExpense,
  incomeTaxes,
  netIncome,
  netMargin,
}
