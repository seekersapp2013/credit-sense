import React from 'react'
import { dataTableProps } from 'src/components/dataTableProps'
import { DataRows } from 'src/components/DataRows'
import { TableDashes } from 'src/components/Dashes'

export const FSAnnualValuationContent = ({
  data,
  firstPageIndex,
  lastPageIndex,
  currency,
  year,
}) => {
  let otherProps = { currency, firstPageIndex, lastPageIndex }
  let {
    EBIT,
    taxes,
    EBIAT,
    DAndA,
    grossCashFlow,
    changeInWC,
    CAPEX,
    freeCashFlow,
    exitValue,
    discountedCashFlow,
  } = data
  return (
    <>
      <DataRows
        data={[
          { title: 'EBIT', data: EBIT },
          { title: '(-) Taxes', data: taxes },
        ]}
        otherProps={otherProps}
        year={year}
      />
      <TableDashes rows={4} />
      <DataRows
        data={[
          { title: 'EBIAT', data: EBIAT },
          { title: '(+) D&A', data: DAndA },
        ]}
        otherProps={otherProps}
        year={year}
      />
      <TableDashes rows={4} />
      <DataRows
        data={[
          { title: 'Gross cash flow', data: grossCashFlow, bold: true },
          { title: '(-) Change in WC', data: changeInWC },
          { title: '(-) CAPEX', data: CAPEX },
        ]}
        otherProps={otherProps}
        year={year}
      />
      <TableDashes rows={4} />
      <DataRows
        data={[
          { title: 'Free cash flow', data: freeCashFlow, bold: true },
          { title: 'Exit value', data: exitValue },
        ]}
        otherProps={otherProps}
        year={year}
      />
      <TableDashes rows={4} />
      <DataRows
        data={[{ title: 'Discounted cash flow', data: discountedCashFlow, bold: true }]}
        otherProps={otherProps}
        year={year}
      />
    </>
  )
}

FSAnnualValuationContent.propTypes = dataTableProps
