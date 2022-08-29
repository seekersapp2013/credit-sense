import { totalCols } from '..'
import { getCOGSTotals } from '../COGS'
import { totalAdvisoryAndProf } from '../SG&A/advisoryAndProfServices'
import { consolidatedSGAandA } from '../SG&A/consolidatedSGAndA'
import { totalInsuranceExpenses } from '../SG&A/insurance'
import { totalMarketingAndGrowth } from '../SG&A/marketingAndGrowth'
import { totalOtherExpenses } from '../SG&A/otherExpenses'
import { totalRentExpenses } from '../SG&A/rent'
import { totalTechSupportAndServicesExpenses } from '../SG&A/techSupportAndServices'
import { totalUtilitiesExpenses } from '../SG&A/utilities'

const { totalPayroll } = require('../SG&A/payroll')

export const SGAndA = (props) => {
  let { team } = props
  let data = { Ops: [], RAndD: [], Growth: [] }

  const opsTeam = team.filter(({ category }) => category === 'Ops')
  const rAndDTeam = team.filter(({ category }) => category === 'R&D')
  const growthTeam = team.filter(({ category }) => category === 'Growth')

  data.Ops = totalCols([
    opsTeam ? totalPayroll({ ...props, team: opsTeam }) : Array(18).fill(0),
    totalAdvisoryAndProf(props),
    totalRentExpenses(props),
    totalTechSupportAndServicesExpenses(props),
    totalInsuranceExpenses(props),
    totalUtilitiesExpenses(props),
    totalOtherExpenses(props),
  ]).slice(0, 18)

  data.RAndD = (
    rAndDTeam.length ? totalPayroll({ ...props, team: rAndDTeam }) : Array(18).fill(0)
  ).slice(0, 18)

  data.Growth = totalCols([
    totalMarketingAndGrowth(props),
    growthTeam.length ? totalPayroll({ ...props, team: growthTeam }) : Array(18).fill(0),
  ]).slice(0, 18)

  return data
}

const COGS = (props) => {
  let data = { Ops: [], RAndD: [], Growth: [] }

  data.Ops = getCOGSTotals(props).slice(0, 18)

  data.RAndD = Array(18).fill(0)

  data.Growth = Array(18).fill(0)

  return data
}

const total = (props) => {
  let data = {
    Ops: [],
    RAndD: [],
    Growth: [],
    Other: [],
    TotalExpenses: [],
  }

  const SGAndAData = SGAndA(props)
  const COGSData = COGS(props)

  data.Ops = totalCols([SGAndAData.Ops, COGSData.Ops])
  data.RAndD = totalCols([SGAndAData.RAndD, COGSData.RAndD])
  data.Growth = totalCols([SGAndAData.Growth, COGSData.Growth])
  data.TotalExpenses = totalCols([
    consolidatedSGAandA.total(props).slice(0, 18),
    getCOGSTotals(props).slice(0, 18),
  ])
  data.Other = data.TotalExpenses.map(
    (total, i) => total - data.Ops[i] - data.RAndD[i] - data.Growth[i],
  )

  return data
}

const pieChart = (props) => {
  let data = {
    Ops: { percentage: 0, total: 0 },
    'R&D': { percentage: 0, total: 0 },
    Growth: { percentage: 0, total: 0 },
    Other: { percentage: 0, total: 0 },
    TotalExpenses: { percentage: 100, total: 0 },
  }

  const totalData = total(props)

  data.Ops.total = totalData.Ops.reduce((a, b) => a + b, 0)
  data['R&D'].total = totalData.RAndD.reduce((a, b) => a + b, 0)
  data.Growth.total = totalData.Growth.reduce((a, b) => a + b, 0)
  data.Other.total = totalData.Other.reduce((a, b) => a + b, 0)
  data.TotalExpenses.total = totalData.TotalExpenses.reduce((a, b) => a + b, 0)

  data.Ops.percentage = (data.Ops.total / data.TotalExpenses.total) * 100
  data['R&D'].percentage = (data['R&D'].total / data.TotalExpenses.total) * 100
  data.Growth.percentage = (data.Growth.total / data.TotalExpenses.total) * 100
  data.Other.percentage = (data.Other.total / data.TotalExpenses.total) * 100

  return data
}

export const getDataSetForPieChart = (props) => {
  const data = pieChart(props)
  let dataset = Object.entries(data).filter(([key, value]) => key !== 'TotalExpenses')

  return {
    labels: dataset.map(([key, value]) => key),
    data: dataset.map(([key, value]) => value.total),
  }
}

// const generateCOGS = () => {}

export const useOfFundsFirst18Months = {
  SGAndA,
  COGS,
  total,
  pieChart,
}
