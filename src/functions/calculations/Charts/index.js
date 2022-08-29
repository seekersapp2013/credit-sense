import { balanceSheet } from '../FSMonth/balanceSheet'
import { cashFlow } from '../FSMonth/cashFlow'
import { cashInTheBank } from './cashInTheBank'
import { pAndLBarChart } from './pAndLBarChart'
import { getDataSetForPieChart } from './useOfFundsFor18Months'

const pieChart = (props) => {
  let pieChartData = getDataSetForPieChart(props)
  return { labels: pieChartData.labels, data: pieChartData.data.map((value) => Math.round(value)) }
}

// const pAndLBarChartData = (props) => {
//   let barChartData = { revenue: [], COGS: [], SGAndA: [], CAPEX: [] }

//   barChartData.revenue = pAndLBarChart.revenue(props)

//   return barChartData
// }

export const capitalRequired = (props) => {
  return cashFlow.totalCapitalRequirements(props)[0] * -1
}

export const monthsToProfitability = (props) => {
  const retainedEarningsData = balanceSheet.retainedEarnings(props)
  const netIncomeData = cashFlow.netIncome(props)

  return netIncomeData[netIncomeData.length - 1] < 0
    ? 'Profitability not reached'
    : retainedEarningsData.filter((value) => value < 0).length
}

export const chartsAndKPIs = {
  pieChart,
  capitalRequired,
  monthsToProfitability,
  pAndLBarChart: {
    revenue: (props) => pAndLBarChart.revenue(props).map((value) => Math.round(value)),
    COGS: (props) => pAndLBarChart.COGS(props).map((value) => Math.round(value)),
    SGAndA: (props) => pAndLBarChart.SGAndA(props).map((value) => Math.round(value)),
    CAPEX: (props) => pAndLBarChart.CAPEX(props).map((value) => Math.round(value)),
  },
  cashInTheBank: (props) => cashInTheBank(props).map((value) => Math.round(value)),
}

export const ChartsAndKPIs = (props) => ({
  pieChart: pieChart(props),
  capitalRequired: capitalRequired(props),
  monthsToProfitability: monthsToProfitability(props),
  pAndLBarChart: {
    revenue: pAndLBarChart.revenue(props).map((value) => Math.round(value)),
    COGS: pAndLBarChart.COGS(props).map((value) => Math.round(value)),
    SGAndA: pAndLBarChart.SGAndA(props).map((value) => Math.round(value)),
    CAPEX: pAndLBarChart.CAPEX(props).map((value) => Math.round(value)),
  },
  cashInTheBank: cashInTheBank(props).map((value) => Math.round(value)),
})
