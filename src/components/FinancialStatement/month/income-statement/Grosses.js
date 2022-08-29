import React from 'react'
import { DataRows } from 'src/components/DataRows'
import { dataTableProps } from 'src/components/dataTableProps'

export const FSMonthGrosses = ({ data, firstPageIndex, lastPageIndex, currency }) => {
  let otherProps = { currency, firstPageIndex, lastPageIndex }
  let { grossProfit, grossMargin } = data
  return (
    <>
      <DataRows
        data={[
          { title: 'Gross Profit', data: grossProfit, bold: true },
          { title: 'Gross margin', data: grossMargin, percent: true },
        ]}
        otherProps={otherProps}
      />
    </>
  )
}

FSMonthGrosses.propTypes = dataTableProps
