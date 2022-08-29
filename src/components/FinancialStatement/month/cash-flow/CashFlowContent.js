import React from 'react'
import { dataTableProps } from 'src/components/dataTableProps'
import { DataRows } from 'src/components/DataRows'
import { TableDashes } from 'src/components/Dashes'

export const FSMonthCashFlowContent = ({
  data,
  firstPageIndex,
  lastPageIndex,
  currency,
  right,
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
          { title: 'Capital calls (share of commitment)', data: capitalCalls },
          { title: 'Investor Cash', data: investorCash },
          {
            title: 'Operating change in cash',
            data: operatingChangeInCash,
          },
          { title: 'Net income', data: netIncome },
          { title: '(+) D&A', data: DAndA },
          { title: '(+) Change in WC', data: changeInWC },
          { title: '(-) CAPEX', data: CAPEX },
          { title: '(+) Change in debt', data: changeInDebt },
          { title: '(-) Dividends', data: dividends },
        ]}
        otherProps={otherProps}
      />
      <TableDashes />
      <DataRows
        data={[
          { title: 'Ending cash balance', data: endingCashBalance, bold: true },
          { title: 'Total capital requirements ', data: totalCapitalRequirements, bold: true },
        ]}
        otherProps={otherProps}
      />
    </>
  )
}

FSMonthCashFlowContent.propTypes = dataTableProps
