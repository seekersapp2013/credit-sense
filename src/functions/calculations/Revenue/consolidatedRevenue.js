import { totalCols } from '..'
import { inboundSalesRevenue } from './inboundSales'
import { outboundSalesRevenue } from './outboundSales'
import { selfServiceSubscriptionsRevenue } from './selfServiceSubscriptions'

const consolidatedRevenueTotal = (props) => {
  return totalCols([
    selfServiceSubscriptionsRevenue.total(props),
    inboundSalesRevenue.total(props),
    outboundSalesRevenue.total(props),
  ])
}

export const consolidatedRevenue = {
  selfServiceSubscriptions: selfServiceSubscriptionsRevenue.total,
  inboundSales: inboundSalesRevenue.total,
  outboundSales: outboundSalesRevenue.total,
  total: consolidatedRevenueTotal,
}
