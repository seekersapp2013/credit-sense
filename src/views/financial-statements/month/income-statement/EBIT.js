import React from 'react'
import { dataTableProps } from 'src/components/dataTableProps'
import { DataRows } from 'src/components/DataRows'

export const FSMonthEBIT = ({ data, firstPageIndex, lastPageIndex, currency }) => {
  let otherProps = { currency, firstPageIndex, lastPageIndex }
  let { DAndA, EBIT, EBITMargin } = data
  return (
    <>
      <DataRows
        data={[
          { title: 'D&A', data: DAndA },
          { title: 'EBIT', data: EBIT, bold: true },
          { title: 'EBIT margin', data: EBITMargin, percent: true },
        ]}
        otherProps={otherProps}
      />
    </>
  )
}

FSMonthEBIT.propTypes = dataTableProps
