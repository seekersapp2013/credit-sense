import { getOperatingExpenseBySubCategory } from '.'

const { addMonths, getMonthsArray, totalCols } = require('..')

export const platformsExpenses = ({ operating_expenses }) => {
  return getOperatingExpenseBySubCategory({ operating_expenses }, 'Platforms')
}

export const totalPlatformsExpenses = ({ operating_expenses }) => {
  const data = platformsExpenses({ operating_expenses })
  return data.length ? totalCols(data) : Array(84).fill(0)
}

export const leadGenerationBudget = ({
  model_start_date,
  inbound_sales,
  inbound_sales_business_model: { launch_date },
  inbound_sales_paid_traffic: {
    starting_marketing_budget,
    marketing_budget_increase,
    maximum_paid_ads_budget,
  },
}) => {
  let data = []

  launch_date = new Date(launch_date)

  let monthsArray = getMonthsArray(model_start_date)

  for (let i = 0; i < 84; i++) {
    let previous = i > 0 ? data[i - 1] : 0

    let val = inbound_sales
      ? monthsArray[i].getTime() === launch_date.getTime()
        ? starting_marketing_budget
        : monthsArray[i].getTime() > launch_date.getTime()
        ? Math.min(maximum_paid_ads_budget, marketing_budget_increase + previous)
        : 0
      : 0

    data.push(val)
  }

  return data
}

export const selfServiceMarketingBudget = ({
  model_start_date,
  self_service_subscriptions,
  self_service_business_model: { launch_date },
  self_service_paid_traffic: {
    starting_marketing_budget,
    marketing_budget_increase,
    maximum_paid_ads_budget,
  },
}) => {
  let data = []

  launch_date = new Date(launch_date)
  starting_marketing_budget = parseInt(starting_marketing_budget)
  marketing_budget_increase = parseInt(marketing_budget_increase)
  maximum_paid_ads_budget = parseInt(maximum_paid_ads_budget)

  let monthsArray = getMonthsArray(model_start_date)

  for (let i = 0; i < 84; i++) {
    let previous = i > 0 ? data[i - 1] : 0

    let val = self_service_subscriptions
      ? monthsArray[i].getTime() === launch_date.getTime()
        ? starting_marketing_budget
        : monthsArray[i].getTime() > launch_date.getTime()
        ? Math.min(maximum_paid_ads_budget, marketing_budget_increase + previous)
        : 0
      : 0

    data.push(val)
  }

  return data
}

export const directResponseCampaignsExpenses = ({
  operating_expenses,
  model_start_date,
  inbound_sales,
  inbound_sales_business_model,
  inbound_sales_paid_traffic,
  self_service_subscriptions,
  self_service_business_model,
  self_service_paid_traffic,
}) => {
  const data = getOperatingExpenseBySubCategory({ operating_expenses }, 'Direct Response Campaigns')
  data.push(
    leadGenerationBudget({
      model_start_date,
      inbound_sales,
      inbound_sales_business_model,
      inbound_sales_paid_traffic,
    }),
    selfServiceMarketingBudget({
      model_start_date,
      self_service_subscriptions,
      self_service_business_model,
      self_service_paid_traffic,
    }),
  )
  return data
}

export const totalDirectResponseCampaignsExpenses = ({
  operating_expenses,
  model_start_date,
  inbound_sales,
  inbound_sales_business_model,
  inbound_sales_paid_traffic,
  self_service_subscriptions,
  self_service_business_model,
  self_service_paid_traffic,
}) => {
  const data = directResponseCampaignsExpenses({
    operating_expenses,
    model_start_date,
    inbound_sales,
    inbound_sales_business_model,
    inbound_sales_paid_traffic,
    self_service_subscriptions,
    self_service_business_model,
    self_service_paid_traffic,
  })

  return data.length ? totalCols(data) : Array(84).fill(0)
}

export const brandAwarenessCampaignsData = ({
  model_start_date,
  website_traffic: { start_date },
  brand_awareness_budget: {
    starting_budget,
    monthly_marketing_budget_increase,
    maximum_marketing_budget,
  },
}) => {
  let data = []

  start_date = new Date(start_date)

  starting_budget = parseInt(starting_budget)

  let monthsArray = getMonthsArray(model_start_date)

  for (let i = 0; i < 84; i++) {
    let previous = i > 0 ? data[i - 1] : 0

    let val =
      monthsArray[i].getTime() === start_date.getTime()
        ? starting_budget
        : monthsArray[i].getTime() > start_date.getTime()
        ? Math.min(maximum_marketing_budget, monthly_marketing_budget_increase + previous)
        : 0

    data.push(val)
  }

  return data
}

export const brandAwarenessCampaigns = ({
  model_start_date,
  website_traffic: { start_date },
  brand_awareness_budget: {
    starting_budget,
    monthly_marketing_budget_increase,
    maximum_marketing_budget,
  },
  operating_expenses,
}) => {
  const data = getOperatingExpenseBySubCategory({ operating_expenses }, 'Brand Awareness Campaigns')
  data.push(
    brandAwarenessCampaignsData({
      model_start_date,
      website_traffic: { start_date },
      brand_awareness_budget: {
        starting_budget,
        monthly_marketing_budget_increase,
        maximum_marketing_budget,
      },
    }),
  )
  return data
}

export const totalbrandAwarenessCampaigns = ({
  model_start_date,
  website_traffic: { start_date },
  brand_awareness_budget: {
    starting_budget,
    monthly_marketing_budget_increase,
    maximum_marketing_budget,
  },
  operating_expenses,
}) => {
  const data = brandAwarenessCampaigns({
    model_start_date,
    website_traffic: { start_date },
    brand_awareness_budget: {
      starting_budget,
      monthly_marketing_budget_increase,
      maximum_marketing_budget,
    },
    operating_expenses,
  })
  return data.length ? totalCols(data) : Array(84).fill(0)
}

export const experimentCampaigns = ({ operating_expenses }) => {
  return getOperatingExpenseBySubCategory({ operating_expenses }, 'Experiment Campaigns')
}

export const totalExperimentCampaigns = ({ operating_expenses }) => {
  const data = experimentCampaigns({ operating_expenses })
  return data.length ? totalCols(data) : Array(84).fill(0)
}

export const totalMarketingAndGrowth = ({
  operating_expenses,
  model_start_date,
  inbound_sales,
  inbound_sales_business_model,
  inbound_sales_paid_traffic,
  self_service_subscriptions,
  self_service_business_model,
  self_service_paid_traffic,
  website_traffic,
  brand_awareness_budget,
}) => {
  return totalCols([
    totalPlatformsExpenses({ operating_expenses }),
    totalDirectResponseCampaignsExpenses({
      operating_expenses,
      model_start_date,
      inbound_sales,
      inbound_sales_business_model,
      inbound_sales_paid_traffic,
      self_service_subscriptions,
      self_service_business_model,
      self_service_paid_traffic,
    }),
    totalbrandAwarenessCampaigns({
      model_start_date,
      website_traffic,
      brand_awareness_budget,
      operating_expenses,
    }),
    totalExperimentCampaigns({ operating_expenses }),
  ])
}
