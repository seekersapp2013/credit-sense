import React from 'react'
import { dataTableProps } from 'src/components/dataTableProps'
import { DataRows } from 'src/components/DataRows'
import { TableDashes } from 'src/components/Dashes'

export const FSMonthValuationContent = ({
  data,
  firstPageIndex,
  lastPageIndex,
  currency,
  right,
}) => {
  let otherProps = { currency, firstPageIndex, lastPageIndex }
  let { EBIT, taxes, EBIAT, DAndA, grossCashFlow, changeInWC, CAPEX, freeCashFlow } = data
  return (
    <>
      <DataRows
        data={[
          { title: 'EBIT', data: EBIT },
          { title: '(-) Taxes', data: taxes },
        ]}
        otherProps={otherProps}
      />
      <TableDashes />
      <DataRows
        data={[
          { title: 'EBIAT', data: EBIAT },
          { title: '(+) D&A', data: DAndA },
        ]}
        otherProps={otherProps}
      />
      <TableDashes />
      <DataRows
        data={[
          { title: 'Gross cash flow', data: grossCashFlow, bold: true },
          { title: '(-) Change in WC', data: changeInWC },
          { title: '(-) CAPEX', data: CAPEX },
        ]}
        otherProps={otherProps}
      />
      <TableDashes />
      <DataRows
        data={[{ title: 'Free cash flow', data: freeCashFlow, bold: true }]}
        otherProps={otherProps}
      />
    </>
  )
}

FSMonthValuationContent.propTypes = dataTableProps
