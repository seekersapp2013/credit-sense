import React from 'react'
import { DataRows } from 'src/components/DataRows'
import { dataTableProps } from 'src/components/dataTableProps'

export const FSAnnualGrosses = ({ data, firstPageIndex, lastPageIndex, currency, year }) => {
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
        year={year}
      />
    </>
  )
}

FSAnnualGrosses.propTypes = dataTableProps
