import {
  inboundSalesAnnualTotalActiveCustomers,
  inboundSalesLostAndTotalCustomers,
  inboundSalesRevenue,
} from './inboundSales'
import {
  outboundSalesAnnualTotalActiveCustomers,
  outboundSalesLostAndTotalCustomers,
  outboundSalesRevenue,
} from './outboundSales'
import {
  selfServiceAnnualTotalActiveCustomers,
  selfServiceLostAndTotalCustomers,
  selfServiceSubscriptionsRevenue,
} from './selfServiceSubscriptions'

const { totalCols, getMonthsArray } = require('..')
const {
  totalMarketingAndGrowth,
  leadGenerationBudget,
  selfServiceMarketingBudget,
} = require('../SG&A/marketingAndGrowth')
const { payroll } = require('../SG&A/payroll')

const totalMarketingBudget = (props) => {
  let { model_start_date, team } = props

  const data = []

  const totalMarketingAndGrowthData = totalMarketingAndGrowth(props)

  const marketingTeam = team.filter((teamMember) => teamMember.subCategory === 'Marketing')

  const totalMarketingTeamPayroll = totalCols(
    payroll({ ...props, model_start_date, team: marketingTeam }),
  )

  for (let i = 0; i < 84; i++) {
    data.push(totalMarketingAndGrowthData[i] + totalMarketingTeamPayroll[i])
  }

  return data
}

const totalSalesTeamBudget = ({ team, model_start_date, ...props }) => {
  const data = []

  const salesTeam = team.filter((teamMember) => teamMember.subCategory === 'Sales')

  return totalCols(payroll({ ...props, model_start_date, team: salesTeam }))
}

export const organicTraffic = ({
  model_start_date,
  website_traffic: { start_date, traffic_at_launch, monthly_increase, maximum_traffic },
}) => {
  const data = []

  let monthsArray = getMonthsArray(model_start_date)

  start_date = new Date(start_date)

  traffic_at_launch = parseInt(traffic_at_launch)
  monthly_increase = parseInt(monthly_increase)
  maximum_traffic = parseInt(maximum_traffic)

  for (let i = 0; i < 84; i++) {
    let previous = i > 0 ? data[i - 1] : 0

    const val =
      monthsArray[i].getTime() === start_date.getTime()
        ? traffic_at_launch
        : monthsArray[i].getTime() > start_date.getTime()
        ? Math.min((1 + monthly_increase / 100) * previous, maximum_traffic)
        : 0

    data.push(val)
  }

  return data
}

const totalActiveCustomers = (props) => {
  return totalCols([
    selfServiceLostAndTotalCustomers(props)[1],
    inboundSalesLostAndTotalCustomers(props)[1],
    selfServiceAnnualTotalActiveCustomers(props),
    inboundSalesAnnualTotalActiveCustomers(props),
    outboundSalesLostAndTotalCustomers(props)[1],
    outboundSalesAnnualTotalActiveCustomers(props),
  ])
}

export const staffNeededToSupportUserBase = (props) => {
  let {
    sga: { tech_support_customers_per_agent },
  } = props

  tech_support_customers_per_agent = parseInt(tech_support_customers_per_agent)

  const totalActiveCustomersData = totalActiveCustomers(props)

  return totalActiveCustomersData.map((data) => Math.ceil(data / tech_support_customers_per_agent))
}

const newLeads = (props) => {
  const totalLeadsGeneratedData =
    inboundSalesRevenue.conversions.leadHandling.totalLeadsGenerated(props)

  const newCustomersData = outboundSalesRevenue.monthlyBillingModel.subscribers.newCustomers(props)

  const selfServiceNewCustomersData =
    selfServiceSubscriptionsRevenue.monthlyBillingModel.subscribers.newCustomers(props)

  return totalCols([totalLeadsGeneratedData, newCustomersData, selfServiceNewCustomersData])
}

const totalLeadsInDatabase = (props) => {
  const data = []

  const totalLeadsGeneratedData =
    inboundSalesRevenue.conversions.leadHandling.totalLeadsGenerated(props)

  const newCustomersData = outboundSalesRevenue.monthlyBillingModel.subscribers.newCustomers(props)

  const selfServiceNewCustomersData =
    selfServiceSubscriptionsRevenue.monthlyBillingModel.subscribers.newCustomers(props)

  for (let i = 0; i < 84; i++) {
    let previous = i > 0 ? data[i - 1] : 0

    let totalLeads =
      totalLeadsGeneratedData[i] + previous + newCustomersData[i] + selfServiceNewCustomersData[i]

    const val = totalLeads ? totalLeads : totalLeadsGeneratedData[i]

    data.push(val)
  }

  return data
}

const totalNewCustomers = (props) => {
  const selfServiceMonthlyNewCustomersData =
    selfServiceSubscriptionsRevenue.monthlyBillingModel.subscribers.newCustomers(props)
  const selfServiceYearlyNewCustomersData =
    selfServiceSubscriptionsRevenue.annualBillingModel.subscribers.newCustomers(props)

  const inboundSalesMonthlyNewCustomersData =
    inboundSalesRevenue.monthlyBillingModel.subscribers.newCustomers(props)
  const inboundSalesYearlyNewCustomersData =
    inboundSalesRevenue.annualBillingModel.subscribers.newCustomers(props)

  const outboundSalesMonthlyNewCustomersData =
    outboundSalesRevenue.monthlyBillingModel.subscribers.newCustomers(props)
  const outboundSalesYearlyNewCustomersData =
    outboundSalesRevenue.annualBillingModel.subscribers.newCustomers(props)

  return totalCols([
    selfServiceMonthlyNewCustomersData,
    selfServiceYearlyNewCustomersData,
    inboundSalesMonthlyNewCustomersData,
    inboundSalesYearlyNewCustomersData,
    outboundSalesMonthlyNewCustomersData,
    outboundSalesYearlyNewCustomersData,
  ])
}

const averageCAC = (props) => {
  const data = []
  const totalMarketingBudgetData = totalMarketingBudget(props)
  const totalSalesTeamBudgetData = totalSalesTeamBudget(props)
  const totalNewCustomersData = totalNewCustomers(props)

  for (let i = 0; i < 84; i++) {
    let count =
      (totalMarketingBudgetData[i] + totalSalesTeamBudgetData[i]) / totalNewCustomersData[i]

    const val = count ? count : 0

    data.push(val)
  }

  return data
}

const LTVSubscribedThisMonth = (props) => {
  const selfServiceLTVSubscribedThisMonthData =
    selfServiceSubscriptionsRevenue.totals.LTVSubscribedThisMonth(props)

  const inboundSalesLTVSubscribedThisMonthData =
    inboundSalesRevenue.totals.LTVSubscribedThisMonth(props)

  const outboundSalesLTVSubscribedThisMonthData =
    outboundSalesRevenue.totals.LTVSubscribedThisMonth(props)

  return totalCols([
    selfServiceLTVSubscribedThisMonthData,
    inboundSalesLTVSubscribedThisMonthData,
    outboundSalesLTVSubscribedThisMonthData,
  ])
}

const averageLTV = (props) => {
  const data = []

  const LTVSubscribedThisMonthData = LTVSubscribedThisMonth(props)
  const totalNewCustomersData = totalNewCustomers(props)

  for (let i = 0; i < 84; i++) {
    let count = LTVSubscribedThisMonthData[i] / totalNewCustomersData[i]

    const val = count ? count : 0

    data.push(val)
  }

  return data
}

const LTVToCACRatio = (props) => {
  const data = []

  const averageLTVData = averageLTV(props)
  const averageCACData = averageCAC(props)

  for (let i = 0; i < 84; i++) {
    let count = averageLTVData[i] / averageCACData[i]

    const val = count ? count : 0

    data.push(val)
  }

  return data
}

const SaaSQuickRatio = (props) => {
  const data = []

  let { self_service_business_model, inbound_sales_business_model, outbound_sales_business_model } =
    props

  const selfServiceARPU = self_service_business_model.ARPU
  const inboundSalesARPU = inbound_sales_business_model.ARPU
  const outboundSalesARPU = outbound_sales_business_model.ARPU

  const selfServiceMonthlyNewMRRData =
    selfServiceSubscriptionsRevenue.monthlyBillingModel.MRR.newMRR(props)
  const selfServiceMonthlyLostMRRData =
    selfServiceSubscriptionsRevenue.monthlyBillingModel.MRR.lostMRR(props)
  const selfServiceYearlyNewMRRData =
    selfServiceSubscriptionsRevenue.annualBillingModel.annualBillingSummary.newMRR(props)
  const selfServiceAnnualChurnRateData =
    selfServiceSubscriptionsRevenue.annualBillingModel.churnRate(props)
  const selfServiceTotalActiveCustomersData =
    selfServiceSubscriptionsRevenue.annualBillingModel.subscribers.totalActiveCustomers(props)

  const inboundSalesMonthlyNewMRRData = inboundSalesRevenue.monthlyBillingModel.MRR.newMRR(props)
  const inboundSalesMonthlyLostMRRData = inboundSalesRevenue.monthlyBillingModel.MRR.lostMRR(props)
  const inboundSalesYearlyNewMRRData =
    inboundSalesRevenue.annualBillingModel.annualBillingSummary.newMRR(props)
  const inboundSalesAnnualChurnRateData = inboundSalesRevenue.annualBillingModel.churnRate(props)
  const inboundSalesTotalActiveCustomersData =
    inboundSalesRevenue.annualBillingModel.subscribers.totalActiveCustomers(props)

  const outboundSalesMonthlyNewMRRData = outboundSalesRevenue.monthlyBillingModel.MRR.newMRR(props)
  const outboundSalesMonthlyLostMRRData =
    outboundSalesRevenue.monthlyBillingModel.MRR.lostMRR(props)
  const outboundSalesYearlyNewMRRData =
    outboundSalesRevenue.annualBillingModel.annualBillingSummary.newMRR(props)
  const outboundSalesAnnualChurnRateData = outboundSalesRevenue.annualBillingModel.churnRate(props)
  const outboundSalesTotalActiveCustomersData =
    outboundSalesRevenue.annualBillingModel.subscribers.totalActiveCustomers(props)

  for (let i = 0; i < 84; i++) {
    let totalNewMRRs =
      selfServiceMonthlyNewMRRData[i] +
      selfServiceYearlyNewMRRData[i] +
      inboundSalesMonthlyNewMRRData[i] +
      inboundSalesYearlyNewMRRData[i] +
      outboundSalesMonthlyNewMRRData[i] +
      outboundSalesYearlyNewMRRData[i]

    let totalLostMRRs =
      selfServiceMonthlyLostMRRData[i] +
      inboundSalesMonthlyLostMRRData[i] +
      outboundSalesMonthlyLostMRRData[i]

    let selfServiceTotalActiveCustomers =
      i - 12 >= 0 ? selfServiceTotalActiveCustomersData[i - 12] : 0
    let inboundSalesTotalActiveCustomers =
      i - 12 >= 0 ? inboundSalesTotalActiveCustomersData[i - 12] : 0
    let outboundSalesTotalActiveCustomers =
      i - 12 >= 0 ? outboundSalesTotalActiveCustomersData[i - 12] : 0

    let lostMRRPlusActiveUsers =
      totalLostMRRs +
      selfServiceTotalActiveCustomers *
        (selfServiceAnnualChurnRateData[i] / 100) *
        selfServiceARPU +
      inboundSalesTotalActiveCustomers *
        (inboundSalesAnnualChurnRateData[i] / 100) *
        inboundSalesARPU +
      outboundSalesTotalActiveCustomers *
        (outboundSalesAnnualChurnRateData[i] / 100) *
        outboundSalesARPU

    const val = totalNewMRRs && lostMRRPlusActiveUsers ? totalNewMRRs / lostMRRPlusActiveUsers : 0

    data.push(val)
  }

  return data
}

const totalMRR = (props) => {
  const selfServiceMRRData = selfServiceSubscriptionsRevenue.totals.monthlyRecurringRevenue(props)
  const inboundSalesMRRData = inboundSalesRevenue.totals.monthlyRecurringRevenue(props)
  const outboundSalesMRRData = outboundSalesRevenue.totals.monthlyRecurringRevenue(props)

  return totalCols([selfServiceMRRData, inboundSalesMRRData, outboundSalesMRRData])
}

const totalARR = (props) => totalMRR(props).map((data) => data * 12)

const monthlyGrowth = (props) =>
  totalARR(props).map((data, i, arr) => {
    let previous = i - 1 >= 0 ? arr[i - 1] : 0
    let val = data && previous ? (data - previous) / previous : 0
    return val ? val * 100 : 0
  })

export const keyIndicators = (props) => {
  const data = {
    fromTheSGAndASheet: {
      leadGenerationBudget: leadGenerationBudget(props),
      selfServiceMarketingBudget: selfServiceMarketingBudget(props),
      totalMarketingBudget: totalMarketingBudget(props),
      totalSalesTeamBudget: totalSalesTeamBudget(props),
    },
    websiteTrafficAndLeads: {
      organicTraffic: organicTraffic(props),
      newLeads: newLeads(props),
      totalLeadsInDatabase: totalLeadsInDatabase(props),
    },
    CACAndLTV: {
      totalNewCustomers: totalNewCustomers(props),
      averageCAC: averageCAC(props),
      LTVSubscribedThisMonth: LTVSubscribedThisMonth(props),
      LTVToCACRatio: LTVToCACRatio(props),
      averageLTV: averageLTV(props),
      SaaSQuickRatio: SaaSQuickRatio(props),
    },
    MRRAndUserBase: {
      totalMRR: totalMRR(props),
      totalARR: totalARR(props),
      monthlyGrowth: monthlyGrowth(props),
      totalActiveCustomers: totalActiveCustomers(props),
      staffNeededToSupportUserBase: staffNeededToSupportUserBase(props),
    },
  }

  return data
}
