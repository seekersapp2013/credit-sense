import React from 'react'
import { dataTableProps } from 'src/components/dataTableProps'
import { DataRows } from 'src/components/DataRows'
import { TableDashes } from 'src/components/Dashes'

export const FSAnnualCashFlowContent = ({
  data,
  firstPageIndex,
  lastPageIndex,
  currency,
  year,
}) => {
  let otherProps = { currency, firstPageIndex, lastPageIndex }
  let {
    initialCashBalance,
    cashInfusions,
    capitalCalls,
    investorCash,
    operatingChangeInCash,
    netIncome,
    DAndA,
    changeInWC,
    CAPEX,
    changeInDebt,
    dividends,
    endingCashBalance,
    totalCapitalRequirements,
  } = data
  return (
    <>
      <DataRows
        data={[
          { title: 'Initial cash balance', data: initialCashBalance },
          { title: 'Cash infusions', data: cashInfusions },
          {
            title: 'Operating change in cash',
            data: operatingChangeInCash,
          },
          { title: 'Net income', data: netIncome },
        ]}
        otherProps={otherProps}
        year={year}
      />
      <TableDashes rows={4} />
      <DataRows
        data={[
          { title: '(+) D&A', data: DAndA },
          { title: '(+) Change in WC', data: changeInWC },
          { title: '(-) CAPEX', data: CAPEX },
          { title: '(+) Change in debt', data: changeInDebt },
          { title: '(-) Dividends', data: dividends },
        ]}
        otherProps={otherProps}
        year={year}
      />
      <TableDashes rows={4} />
      <DataRows
        data={[
          { title: 'Ending cash balance', data: endingCashBalance, bold: true },
          { title: 'Total capital requirements ', data: totalCapitalRequirements, bold: true },
        ]}
        otherProps={otherProps}
        year={year}
      />
    </>
  )
}

FSAnnualCashFlowContent.propTypes = dataTableProps
