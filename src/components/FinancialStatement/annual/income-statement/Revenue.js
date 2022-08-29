import React from 'react'
import { dataTableProps } from 'src/components/dataTableProps'
import { DataRows } from 'src/components/DataRows'

export const FSAnnualRevenue = ({ data, firstPageIndex, lastPageIndex, currency, year }) => {
  let otherProps = { currency, firstPageIndex, lastPageIndex }
  let {
    consolidatedRevenue: { selfServiceSubscriptions, inboundSales, outboundSales, total },
  } = data
  return (
    <>
      <DataRows
        data={[
          { title: 'Revenue', data: total, bold: true },
          {
            title: 'SOURCE #1: Self-Service Subscriptions',
            data: selfServiceSubscriptions,
          },
          {
            title: 'SOURCE #2: Inbound Sales',
            data: inboundSales,
          },
          {
            title: 'SOURCE #3: Outbound Sales',
            data: outboundSales,
          },
        ]}
        otherProps={otherProps}
        color="success"
        year={year}
      />
    </>
  )
}

FSAnnualRevenue.propTypes = dataTableProps
