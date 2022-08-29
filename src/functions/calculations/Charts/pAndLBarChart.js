import { getCOGSTotals } from '../COGS'
import { cashFlow } from '../FSMonth/cashFlow'
import { consolidatedRevenue } from '../Revenue/consolidatedRevenue'
import { consolidatedSGAandA } from '../SG&A/consolidatedSGAndA'

const revenue = (props) => {
  return consolidatedRevenue.total(props)
}

const COGS = (props) => {
  return getCOGSTotals(props).map((val) => val * -1)
}

const SGAndA = (props) => {
  return consolidatedSGAandA.total(props).map((val) => val * -1)
}

const CAPEX = (props) => {
  return cashFlow.CAPEX(props).map((val) => val * -1)
}

export const pAndLBarChart = { revenue, COGS, SGAndA, CAPEX }
