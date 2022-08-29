import React from 'react'
import { dataTableProps } from 'src/components/dataTableProps'
import { DataRows } from 'src/components/DataRows'

export const FSMonthSGAndA = ({ data, firstPageIndex, lastPageIndex, currency }) => {
  let otherProps = { currency, firstPageIndex, lastPageIndex }
  let {
    consolidatedSGAandA: {
      payroll,
      marketingAndGrowth,
      advisoryAndProfServices,
      rent,
      techSupportAndServices,
      insurance,
      utilities,
      otherExpenses,
      total,
    },
  } = data
  return (
    <>
      <DataRows
        data={[
          { title: 'SG&A', data: total, bold: true },
          { title: 'Payroll', data: payroll },
          { title: 'Marketing & Growth', data: marketingAndGrowth },
          {
            title: 'Advisory & Prof. Services',
            data: advisoryAndProfServices,
          },
          { title: 'Rent', data: rent },
          {
            title: 'Tech Support & Services',
            data: techSupportAndServices,
          },
          { title: 'Insurance', data: insurance },
          { title: 'Utilities', data: utilities },
          { title: 'Other Expenses', data: otherExpenses },
        ]}
        otherProps={otherProps}
        color="info"
      />
    </>
  )
}

FSMonthSGAndA.propTypes = dataTableProps
