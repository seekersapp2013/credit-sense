import React from 'react'
import { dataTableProps } from 'src/components/dataTableProps'
import { DataRows } from 'src/components/DataRows'

export const FSAnnualIncomes = ({ data, firstPageIndex, lastPageIndex, currency, year }) => {
  let otherProps = { currency, firstPageIndex, lastPageIndex }
  let { interestExpense, incomeTaxes, netIncome, netMargin } = data
  return (
    <>
      <DataRows
        data={[
          { title: 'Interest expense', data: interestExpense },
          { title: 'Income taxes', data: incomeTaxes },
          { title: 'Net income', data: netIncome, bold: true },
          { title: 'Net margin', data: netMargin, percent: true },
        ]}
        otherProps={otherProps}
        year={year}
      />
    </>
  )
}

FSAnnualIncomes.propTypes = dataTableProps
