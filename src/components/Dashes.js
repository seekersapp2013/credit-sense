import React from 'react'
import PropTypes from 'prop-types'
const { CTableRow, CTableDataCell } = require('@coreui/react')

export const TableDashes = ({ rows = 6 }) => {
  return (
    <CTableRow>
      {Array(rows + 2)
        .fill('-')
        .map((data, i) => (
          <CTableDataCell key={i}>{data}</CTableDataCell>
        ))}
    </CTableRow>
  )
}

TableDashes.propTypes = {
  rows: PropTypes.number,
}
