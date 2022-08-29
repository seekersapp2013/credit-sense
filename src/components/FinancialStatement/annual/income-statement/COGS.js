import React from 'react'
import { dataTableProps } from 'src/components/dataTableProps'
import { DataRows } from 'src/components/DataRows'

export const FSAnnualCOGS = ({ data, firstPageIndex, lastPageIndex, currency, year }) => {
  let otherProps = { currency, firstPageIndex, lastPageIndex }
  let { consolidatedCOGS } = data

  return (
    <>
      <DataRows
        data={[
          { title: 'COGS', data: consolidatedCOGS.total, bold: true },
          ...Object.entries(data.consolidatedCOGS)
            .filter(([title]) => title !== 'total')
            .map(([title, data], i) => ({
              title,
              data,
            })),
        ]}
        otherProps={otherProps}
        color="danger"
        year={year}
      />
    </>
  )
}

FSAnnualCOGS.propTypes = dataTableProps
