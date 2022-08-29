import React from 'react'
import { dataTableProps } from 'src/components/dataTableProps'
import { DataRows } from 'src/components/DataRows'

export const FSAnnualEBITDA = ({ data, firstPageIndex, lastPageIndex, currency, year }) => {
  let otherProps = { currency, firstPageIndex, lastPageIndex }
  let { EBITDA, EBITDAMargin } = data
  return (
    <>
      <DataRows
        data={[
          { title: 'EBITDA', data: EBITDA, bold: true },
          { title: 'EBITDA margin', data: EBITDAMargin, percent: true },
        ]}
        otherProps={otherProps}
        year={year}
      />
    </>
  )
}

FSAnnualEBITDA.propTypes = dataTableProps
