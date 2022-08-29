import React from 'react'
import { dataTableProps } from 'src/components/dataTableProps'
import { DataRows } from 'src/components/DataRows'
import { TableDashes } from 'src/components/Dashes'

export const FSAnnualLiabilities = ({ data, firstPageIndex, lastPageIndex, currency, year }) => {
  let otherProps = { currency, firstPageIndex, lastPageIndex }
  let {
    financialObligations,
    accountsPayable,
    totalLiabilities,
    commonEquity,
    netEarnings,
    retainedEarnings,
    totalEquity,
    totalLiabilitiesAndEquity,
  } = data
  return (
    <>
      <DataRows
        data={[
          { title: 'Financial obligations (Debt)', data: financialObligations },
          { title: 'Accounts payable', data: accountsPayable, color: 'warning' },
          { title: 'Provisions', data: Array(84).fill('') },
          { title: 'Unearned revenues', data: Array(84).fill('') },
          { title: 'Total Liabilities', data: totalLiabilities, bold: true, color: 'warning' },
        ]}
        otherProps={otherProps}
        year={year}
      />
      <TableDashes rows={4} />
      <DataRows
        data={[
          { title: 'Common equity', data: commonEquity },
          { title: 'Net earnings', data: netEarnings },
          { title: 'Retained earnings', data: retainedEarnings },
          { title: 'Total Equity', data: totalEquity, bold: true },
        ]}
        otherProps={otherProps}
        year={year}
      />
      <TableDashes rows={4} />
      <DataRows
        data={[
          { title: 'Total Liabilities + Equity', data: totalLiabilitiesAndEquity, bold: true },
        ]}
        otherProps={otherProps}
        year={year}
      />
    </>
  )
}

FSAnnualLiabilities.propTypes = dataTableProps
