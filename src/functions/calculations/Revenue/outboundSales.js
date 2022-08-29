import { headcount } from '../SG&A/headcount'
import { leadGenerationBudget } from '../SG&A/marketingAndGrowth'
import { organicTraffic } from './keyIndicators'

const { getMonthsArray, totalCols } = require('..')

const agentsDoingOutboundSales = (props) => {
  let { model_start_date, team, sga, outbound_sales } = props

  const data = []

  const outboundSalesAgentsHeadcount = headcount({
    ...props,
    model_start_date,
    team: team.filter(({ role }) => role === 'Outbound Sales Agent'),
    sga,
  })[0]

  for (let i = 0; i < 84; i++) {
    const val = outbound_sales ? outboundSalesAgentsHeadcount[i] : 0

    data.push(val)
  }

  return data
}

const dealsClosed = (props) => {
  let {
    outbound_sales_reachout: { sales_cycle_time, deals_closed_per_month },
  } = props
  const data = []

  const agentsDoingOutboundSalesData = agentsDoingOutboundSales(props)

  sales_cycle_time = parseInt(sales_cycle_time)
  deals_closed_per_month = parseInt(deals_closed_per_month)

  for (let i = 0; i < 84; i++) {
    const val =
      sales_cycle_time === 1
        ? Math.round(agentsDoingOutboundSalesData[i] * deals_closed_per_month)
        : sales_cycle_time === 2
        ? i - 1 >= 0
          ? Math.round(agentsDoingOutboundSalesData[i - 1] * deals_closed_per_month)
          : 0
        : sales_cycle_time === 3
        ? i - 2 >= 0
          ? Math.round(agentsDoingOutboundSalesData[i - 2] * deals_closed_per_month)
          : 0
        : sales_cycle_time === 6
        ? i - 5 >= 0
          ? Math.round(agentsDoingOutboundSalesData[i - 5] * deals_closed_per_month)
          : 0
        : 0

    data.push(val)
  }

  return data
}

const costOfAcqusitionPerLead = ({
  model_start_date,
  outbound_sales,
  outbound_sales_business_model: { launch_date },
  outbound_sales_paid_traffic: { expected_CAC, monthly_CAC_change, minimum_CAC_possible },
}) => {
  let data = []

  launch_date = new Date(launch_date)

  expected_CAC = parseInt(expected_CAC)
  monthly_CAC_change = parseInt(monthly_CAC_change)
  minimum_CAC_possible = parseInt(minimum_CAC_possible)

  let monthsArray = getMonthsArray(model_start_date)

  for (let i = 0; i < 84; i++) {
    let previous = i > 0 ? data[i - 1] : 0

    const val = outbound_sales
      ? monthsArray[i].getTime() === launch_date.getTime()
        ? expected_CAC
        : monthsArray[i].getTime() > launch_date.getTime()
        ? Math.max(monthly_CAC_change + previous, minimum_CAC_possible)
        : 0
      : 0

    data.push(val)
  }

  return data
}

const expectedLeadsAddedViaAds = ({
  model_start_date,
  outbound_sales,
  outbound_sales_business_model: { launch_date },
  outbound_sales_paid_traffic: {
    starting_marketing_budget,
    marketing_budget_increase,
    maximum_paid_ads_budget,
    expected_CAC,
    monthly_CAC_change,
    minimum_CAC_possible,
  },
}) => {
  const data = []

  const leadGenerationBudgetData = leadGenerationBudget({
    model_start_date,
    outbound_sales,
    outbound_sales_business_model: { launch_date },
    outbound_sales_paid_traffic: {
      starting_marketing_budget,
      marketing_budget_increase,
      maximum_paid_ads_budget,
    },
  })

  const costOfAcqusitionPerLeadData = costOfAcqusitionPerLead({
    model_start_date,
    outbound_sales,
    outbound_sales_business_model: { launch_date },
    outbound_sales_paid_traffic: { expected_CAC, monthly_CAC_change, minimum_CAC_possible },
  })

  for (let i = 0; i < 84; i++) {
    const val = leadGenerationBudgetData[i] / costOfAcqusitionPerLeadData[i]
    data.push(val ? parseFloat(val) : 0)
  }

  return data
}

const expectedConversionsFromOrganicTraffic = ({
  model_start_date,
  website_traffic,
  outbound_sales,
  outbound_sales_business_model: { launch_date },
  outbound_sales_conversion_to_paid,
}) => {
  const data = []

  let monthsArray = getMonthsArray(model_start_date)

  launch_date = new Date(launch_date)

  outbound_sales_conversion_to_paid = parseInt(outbound_sales_conversion_to_paid)

  let organicTrafficData = organicTraffic({
    model_start_date,
    website_traffic,
  })

  for (let i = 0; i < 84; i++) {
    const val =
      outbound_sales && monthsArray[i].getTime() >= launch_date.getTime()
        ? organicTrafficData[i] * (outbound_sales_conversion_to_paid / 100)
        : 0

    data.push(parseFloat(val))
  }

  return data
}

const totalLeadsGenerated = ({
  model_start_date,
  website_traffic,
  outbound_sales,
  outbound_sales_business_model: { launch_date },
  outbound_sales_conversion_to_paid,
  outbound_sales_paid_traffic: {
    starting_marketing_budget,
    marketing_budget_increase,
    maximum_paid_ads_budget,
    expected_CAC,
    monthly_CAC_change,
    minimum_CAC_possible,
  },
}) => {
  const data = []

  const expectedConversionsFromOrganicTrafficData = expectedConversionsFromOrganicTraffic({
    model_start_date,
    website_traffic,
    outbound_sales,
    outbound_sales_business_model: { launch_date },
    outbound_sales_conversion_to_paid,
  })

  const expectedLeadsAddedViaAdsData = expectedLeadsAddedViaAds({
    model_start_date,
    outbound_sales,
    outbound_sales_business_model: { launch_date },
    outbound_sales_paid_traffic: {
      starting_marketing_budget,
      marketing_budget_increase,
      maximum_paid_ads_budget,
      expected_CAC,
      monthly_CAC_change,
      minimum_CAC_possible,
    },
  })

  for (let i = 0; i < 84; i++) {
    const val = expectedConversionsFromOrganicTrafficData[i] + expectedLeadsAddedViaAdsData[i]

    data.push(parseFloat(val))
  }

  return data
}

const agentsNeededToHandleLeads = ({
  model_start_date,
  website_traffic,
  outbound_sales,
  outbound_sales_business_model: { launch_date },
  outbound_sales_conversion_to_paid,
  outbound_sales_paid_traffic: {
    starting_marketing_budget,
    marketing_budget_increase,
    maximum_paid_ads_budget,
    expected_CAC,
    monthly_CAC_change,
    minimum_CAC_possible,
  },
  outbound_sales_agent_lead_nurturing: { leads_per_agent },
}) => {
  const data = []

  leads_per_agent = parseInt(leads_per_agent)

  const totalLeadsGeneratedData = totalLeadsGenerated({
    model_start_date,
    website_traffic,
    outbound_sales,
    outbound_sales_business_model: { launch_date },
    outbound_sales_conversion_to_paid,
    outbound_sales_paid_traffic: {
      starting_marketing_budget,
      marketing_budget_increase,
      maximum_paid_ads_budget,
      expected_CAC,
      monthly_CAC_change,
      minimum_CAC_possible,
    },
  })

  for (let i = 0; i < 84; i++) {
    const val = totalLeadsGeneratedData[i] / leads_per_agent
    // const val = expectedConversionsFromOrganicTrafficData[i] + expectedLeadsAddedViaAdsData[i]
    data.push(parseFloat(val))
  }

  return data
}

const churnRate = ({ outbound_sales_business_model: { churn_rate } }) => {
  return Array(84).fill(parseInt(churn_rate))
}

const newCustomers = (
  {
    outbound_sales_business_model: { billing_term },
    model_start_date,
    team,
    sga,
    outbound_sales,
    outbound_sales_reachout: { sales_cycle_time, deals_closed_per_month },
  },
  term,
) => {
  const data = []

  const dealsClosedData = dealsClosed({
    model_start_date,
    team,
    sga,
    outbound_sales,
    outbound_sales_reachout: { sales_cycle_time, deals_closed_per_month },
  })

  for (let i = 0; i < 84; i++) {
    const val = billing_term === term ? dealsClosedData[i] : 0

    data.push(val)
  }

  return data
}

export const outboundSalesLostAndTotalCustomers = ({
  model_start_date,
  outbound_sales,
  outbound_sales_business_model: { billing_term, launch_date, churn_rate },
  outbound_sales_business_model,
  team,
  sga,
  outbound_sales_reachout,
}) => {
  const newCustomersData = newCustomers(
    {
      outbound_sales_business_model,
      model_start_date,
      team,
      sga,
      outbound_sales,
      outbound_sales_reachout,
    },
    'Monthly',
  )

  const churnRateData = churnRate({ outbound_sales_business_model: { churn_rate } })

  const lostCustomers = []

  const totalCustomers = []

  for (let i = 0; i < 84; i++) {
    const previousTotalCustomers = i > 0 ? totalCustomers[i - 1] : 0

    const lostCustomersVal = Math.round(previousTotalCustomers * (churnRateData[i] / 100))
    lostCustomers.push(lostCustomersVal ? lostCustomersVal : 0)

    const totalCustomersVal = newCustomersData[i] - lostCustomers[i] + previousTotalCustomers
    totalCustomers.push(totalCustomersVal ? totalCustomersVal : newCustomersData[i])
  }

  return [lostCustomers, totalCustomers]
}

const cohortsRenewingCustomers = ({
  model_start_date,
  team,
  sga,
  outbound_sales,
  outbound_sales_business_model,
  outbound_sales_reachout,
}) => {
  const data = {}

  const monthsArray = getMonthsArray(model_start_date)
  const years = []

  let i = 0

  while (i < 84) {
    years.push(monthsArray[i].getFullYear())
    i += 12
  }

  const newCustomersData = newCustomers(
    {
      outbound_sales_business_model,
      model_start_date,
      team,
      sga,
      outbound_sales,
      outbound_sales_reachout,
    },
    'Yearly',
  )

  const churnRateData = churnRate({ outbound_sales_business_model })

  years.forEach((year) => {
    data[year] = []
    for (let i = 0; i < 84; i++) {
      const val =
        monthsArray[i].getFullYear() === year
          ? ''
          : monthsArray[i].getFullYear() === year + 1
          ? Math.round(i - 12 > 0 ? newCustomersData[i - 12] : 0 * (1 - churnRateData[i] / 100))
          : Math.round(i - 12 > 0 ? data[year][i - 12] : 0 * (1 - churnRateData[i] / 100))

      data[year].push(val)
    }
  })

  return data
}

const renewingCustomers = (props) => {
  const cohortsRenewingCustomersData = Object.values(cohortsRenewingCustomers(props))
  cohortsRenewingCustomersData.map((arr) => arr.map((val) => (val === '' ? 0 : val)))
  return totalCols(
    cohortsRenewingCustomersData.map((arr) => arr.map((val) => (val === '' ? 0 : val))),
  )
}

export const outboundSalesAnnualTotalActiveCustomers = (props) => {
  const data = []

  const newCustomersData = newCustomers(props, 'Yearly')
  const renewingCustomersData = renewingCustomers(props)

  for (let i = 0; i < 84; i++) {
    const val =
      i + 1 <= 12
        ? newCustomersData.filter((value, j) => j === i).reduce((a, b) => a + b, 0)
        : totalCols([newCustomersData, renewingCustomersData])
            .filter((value, j) => {
              return j > i - 12 && j <= i
            })
            .reduce((a, b) => a + b, 0)
    data.push(val)
  }

  return data
}

const newMRR = (
  {
    model_start_date,
    outbound_sales,
    outbound_sales_business_model: { billing_term, ARPU },
    team,
    sga,
    outbound_sales_reachout: { sales_cycle_time, deals_closed_per_month },
  },
  term,
) => {
  const data = []

  const newCustomersData = newCustomers(
    {
      outbound_sales_business_model: { billing_term },
      model_start_date,
      team,
      sga,
      outbound_sales,
      outbound_sales_reachout: { sales_cycle_time, deals_closed_per_month },
    },
    term,
  )

  ARPU = parseInt(ARPU)

  for (let i = 0; i < 84; i++) {
    const val = newCustomersData[i] * ARPU
    data.push(val)
  }

  return data
}

const lostMRR = (
  {
    model_start_date,
    outbound_sales,
    outbound_sales_business_model: { billing_term, launch_date, ARPU, churn_rate },
    outbound_sales_business_model,
    team,
    sga,
    outbound_sales_reachout,
  },
  term,
) => {
  const data = []

  const lostCustomersData =
    term === 'Monthly'
      ? outboundSalesLostAndTotalCustomers({
          model_start_date,
          outbound_sales,
          outbound_sales_business_model,
          team,
          sga,
          outbound_sales_reachout,
        })[0]
      : term === 'Yearly'
      ? renewingCustomers({
          model_start_date,
          team,
          sga,
          outbound_sales,
          outbound_sales_business_model,
          outbound_sales_reachout,
        })
      : Array(84).fill(0)

  ARPU = parseInt(ARPU)

  for (let i = 0; i < 84; i++) {
    const val = lostCustomersData[i] * ARPU
    data.push(val)
  }

  return data
}

const monthlyRecurringRevenue = (
  {
    model_start_date,
    website_traffic,
    team,
    sga,
    outbound_sales,
    outbound_sales_business_model: { billing_term, launch_date, ARPU, churn_rate },
    outbound_sales_business_model,
    outbound_sales_paid_traffic,
    outbound_sales_conversion_to_paid,
    outbound_sales_reachout,
  },
  term,
) => {
  const data = []

  const totalCustomersData =
    term === 'Monthly'
      ? outboundSalesLostAndTotalCustomers({
          model_start_date,
          outbound_sales,
          outbound_sales_business_model,
          team,
          sga,
          outbound_sales_reachout,
        })[1]
      : term === 'Yearly'
      ? outboundSalesAnnualTotalActiveCustomers({
          outbound_sales_business_model,
          model_start_date,
          team,
          sga,
          outbound_sales,
          outbound_sales_reachout,
        })
      : Array(84).fill(0)

  for (let i = 0; i < 84; i++) {
    const val =
      term === 'Yearly'
        ? totalCustomersData[i] * ARPU +
          monthlyRecurringRevenue(
            {
              model_start_date,
              website_traffic,
              team,
              sga,
              outbound_sales,
              outbound_sales_business_model,
              outbound_sales_paid_traffic,
              outbound_sales_conversion_to_paid,
              outbound_sales_reachout,
            },
            'Monthly',
          )[i]
        : billing_term === 'Monthly'
        ? totalCustomersData[i] * ARPU
        : 0

    data.push(val)
  }

  return data
}

const billedCashFlow = (props) =>
  totalCols([newMRR(props, 'Yearly'), lostMRR(props, 'Yearly')]).map((data) => data * 12)

const LTVSubscribedThisMonth = ({
  model_start_date,
  website_traffic,
  team,
  sga,
  outbound_sales,
  outbound_sales_business_model: { billing_term, ARPU, launch_date, churn_rate },
  outbound_sales_paid_traffic,
  outbound_sales_conversion_to_paid,
  outbound_sales_reachout: { sales_cycle_time, deals_closed_per_month },
}) => {
  const data = []

  const monthlyNewCustomersData = newCustomers(
    {
      outbound_sales_business_model: { billing_term },
      model_start_date,
      team,
      sga,
      outbound_sales,
      outbound_sales_reachout: { sales_cycle_time, deals_closed_per_month },
    },
    'Monthly',
  )

  const yearlyNewCustomersData = newCustomers(
    {
      outbound_sales_business_model: { billing_term },
      model_start_date,
      team,
      sga,
      outbound_sales,
      outbound_sales_reachout: { sales_cycle_time, deals_closed_per_month },
    },
    'Yearly',
  )

  const churnRateData = churnRate({ outbound_sales_business_model: { churn_rate } })

  for (let i = 0; i < 84; i++) {
    const val =
      billing_term === 'Monthly'
        ? (monthlyNewCustomersData[i] * ARPU) / (churnRateData[i] / 100)
        : billing_term === 'Yearly'
        ? (yearlyNewCustomersData[i] * ARPU) / (churnRateData[i] / 100 / 12)
        : 0

    data.push(val)
  }

  return data
}

const overallTotal = (props) =>
  totalCols([monthlyRecurringRevenue(props, 'Monthly'), billedCashFlow(props)])

export const outboundSalesRevenue = {
  conversions: {
    agentsDoingOutboundSales: agentsDoingOutboundSales,
    dealsClosed: dealsClosed,
  },
  monthlyBillingModel: {
    churnRate: churnRate,
    subscribers: {
      newCustomers: (props) => newCustomers(props, 'Monthly'),
      lostCustomers: (props) => outboundSalesLostAndTotalCustomers(props)[0],
      totalCustomers: (props) => outboundSalesLostAndTotalCustomers(props)[1],
    },
    MRR: {
      newMRR: (props) => newMRR(props, 'Monthly'),
      lostMRR: (props) => lostMRR(props, 'Monthly'),
      monthlyRecurringRevenue: (props) => monthlyRecurringRevenue(props, 'Monthly'),
    },
  },
  annualBillingModel: {
    churnRate: churnRate,
    subscribers: {
      newCustomers: (props) => newCustomers(props, 'Yearly'),
      renewingCustomers: renewingCustomers,
      totalActiveCustomers: outboundSalesAnnualTotalActiveCustomers,
    },
    cohorts: {
      renewingCustomers: cohortsRenewingCustomers,
    },
    annualBillingSummary: {
      newMRR: (props) => newMRR(props, 'Yearly'),
      renewingMRR: (props) => lostMRR(props, 'Yearly'),
      billedCashFlow: billedCashFlow,
    },
  },
  totals: {
    monthlyRecurringRevenue: (props) => monthlyRecurringRevenue(props, 'Yearly'),
    LTVSubscribedThisMonth: LTVSubscribedThisMonth,
  },
  total: overallTotal,
}
