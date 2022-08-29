import React from 'react'
import { dataTableProps } from 'src/components/dataTableProps'
import { DataRows } from 'src/components/DataRows'
import { TableDashes } from 'src/components/Dashes'

export const FSAnnualAssets = ({ data, firstPageIndex, lastPageIndex, currency, year }) => {
  let otherProps = { currency, firstPageIndex, lastPageIndex }
  let {
    operatingCash,
    excessCash,
    accountsReceivable,
    currentAssets,
    PPAndENet,
    nonCurrentAssets,
    totalAssets,
  } = data
  return (
    <>
      <DataRows
        data={[
          { title: 'Operating cash', data: operatingCash },
          { title: 'Excess cash', data: excessCash },
          { title: 'Accounts receivable', data: accountsReceivable, color: 'warning' },
          { title: 'Inventories', data: Array(84).fill('') },
          { title: 'Prepaid expenses', data: Array(84).fill('') },
          { title: 'Current Assets', data: currentAssets, bold: true, color: 'warning' },
        ]}
        otherProps={otherProps}
        year={year}
      />
      <TableDashes rows={4} />
      <DataRows
        data={[
          { title: 'PP&E (net)', data: PPAndENet, color: 'warning' },
          { title: 'Intangible assets', data: Array(84).fill('') },
          { title: 'Investments', data: Array(84).fill('') },
          { title: 'Other assets (net)', data: Array(84).fill('') },
          { title: 'Non-Current Assets', data: nonCurrentAssets, bold: true },
        ]}
        otherProps={otherProps}
        year={year}
      />
      <TableDashes rows={4} />
      <DataRows
        data={[{ title: 'Total Assets', data: totalAssets, bold: true, color: 'warning' }]}
        otherProps={otherProps}
        year={year}
      />
    </>
  )
}

FSAnnualAssets.propTypes = dataTableProps
