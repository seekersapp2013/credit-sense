import React from 'react'
import { dataTableProps } from 'src/components/dataTableProps'
import { DataRows } from 'src/components/DataRows'

export const FSMonthEBITDA = ({ data, firstPageIndex, lastPageIndex, currency }) => {
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
      />
    </>
  )
}

FSMonthEBITDA.propTypes = dataTableProps
