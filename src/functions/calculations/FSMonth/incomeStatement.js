import { getCOGSCategoryTotals, getCOGSTotals } from '../COGS'
import { consolidatedRevenue } from '../Revenue/consolidatedRevenue'
import { consolidatedSGAandA } from '../SG&A/consolidatedSGAndA'
import { WKCAPEX } from '../WK+CAPEX'

const grossProfit = (props) => {
  const totalRevenueData = consolidatedRevenue.total(props)
  const totalCOGSData = getCOGSTotals(props)

  return totalRevenueData.map((data, i) => data - totalCOGSData[i])
}

const grossMargin = (props) => {
  const grossProfitData = grossProfit(props)
  const totalRevenueData = consolidatedRevenue.total(props)

  return grossProfitData.map((data, i) => {
    const val = (data / totalRevenueData[i]) * 100

    return val ? val : '-'
  })
}

const EBITDA = (props) => {
  const totalSGAData = consolidatedSGAandA.total(props)
  return grossProfit(props).map((data, i) => data - totalSGAData[i])
}

const EBITDAMargin = (props) => {
  const data = []

  const EBITDAData = EBITDA(props)
  const totalRevenueData = consolidatedRevenue.total(props)

  for (let i = 0; i < 84; i++) {
    const val = Math.max(EBITDAData[i] / totalRevenueData[i], 0)
    data.push(!val && val !== 0 ? '-' : val * 100)
  }

  return data
}

const EBIT = (props) => {
  const DAndAData = WKCAPEX.depreciationAndAmortization.total(props)

  return EBITDA(props).map((data, i) => data - DAndAData[i])
}

const EBITMargin = (props) => {
  const data = []

  const EBITData = EBIT(props)
  const totalRevenueData = consolidatedRevenue.total(props)

  for (let i = 0; i < 84; i++) {
    const val = Math.max(EBITData[i] / totalRevenueData[i], 0)
    data.push(!val && val !== 0 ? '-' : val * 100)
  }

  return data
}

const interestExpense = (props) => {
  return Array(84).fill(0)
}

const incomeTaxes = (props) => {
  const data = []

  const EBITData = EBIT(props)
  const interestExpenseData = interestExpense(props)

  const sliceAndSumArr = (arr, i) =>
    arr.slice(Math.max(i - 15, 0), i - 3).reduce((a, b) => a + b, 0)

  for (let i = 0; i < 84; i++) {
    if (i + 1 >= 15 && (i - 3) % 12 === 0) {
      const sumOfEBIT = sliceAndSumArr(EBITData, i)
      const sumOfinterestExpense = sliceAndSumArr(interestExpenseData, i)

      data.push(
        Math.max(
          0,
          (sumOfEBIT - sumOfinterestExpense) * (parseInt(props.taxes.income_tax_rate) / 100),
        ),
      )
    } else {
      data.push('')
    }
  }
  return data
}

const netIncome = (props) => {
  const data = []

  const EBITData = EBIT(props)
  const interestExpenseData = interestExpense(props)
  const incomeTaxesData = incomeTaxes(props)

  for (let i = 0; i < 84; i++) {
    data.push(EBITData[i] - interestExpenseData[i] - incomeTaxesData[i])
  }

  return data
}

const netMargin = (props) => {
  const data = []

  const consolidatedRevenueTotalData = consolidatedRevenue.total(props)
  const netIncomeData = netIncome(props)

  for (let i = 0; i < 84; i++) {
    const val = Math.max(netIncomeData[i] / consolidatedRevenueTotalData[i], 0)

    data.push(isNaN(val) ? '-' : val * 100)
  }

  return data
}

export const incomeStatement = {
  consolidatedRevenue: (props) => ({
    selfServiceSubscriptions: consolidatedRevenue.selfServiceSubscriptions(props),
    inboundSales: consolidatedRevenue.inboundSales(props),
    outboundSales: consolidatedRevenue.outboundSales(props),
    total: consolidatedRevenue.total(props),
  }),
  consolidatedCOGS: (props) => ({ ...getCOGSCategoryTotals(props), total: getCOGSTotals(props) }),
  consolidatedSGAandA: (props) => ({
    payroll: consolidatedSGAandA.payroll(props),
    marketingAndGrowth: consolidatedSGAandA.marketingAndGrowth(props),
    advisoryAndProfServices: consolidatedSGAandA.advisoryAndProfServices(props),
    rent: consolidatedSGAandA.rent(props),
    techSupportAndServices: consolidatedSGAandA.techSupportAndServices(props),
    insurance: consolidatedSGAandA.insurance(props),
    utilities: consolidatedSGAandA.utilities(props),
    otherExpenses: consolidatedSGAandA.otherExpenses(props),
    total: consolidatedSGAandA.total(props),
  }),
  grossProfit: grossProfit,
  grossMargin: grossMargin,
  EBITDA: EBITDA,
  EBITDAMargin: EBITDAMargin,
  DAndA: WKCAPEX.depreciationAndAmortization.total,
  EBIT: EBIT,
  EBITMargin: EBITMargin,
  interestExpense: interestExpense,
  incomeTaxes: incomeTaxes,
  netIncome: netIncome,
  netMargin: netMargin,
}
