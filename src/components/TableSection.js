import React from 'react'
import PropTypes from 'prop-types'
import { TableDashes } from './Dashes'

export const TableSection = ({
  Comp,
  data,
  firstPageIndex,
  lastPageIndex,
  right,
  currency,
  dashes,
  year,
}) => (
  <>
    <TableDashes rows={dashes} />
    <Comp {...{ data, firstPageIndex, lastPageIndex, right, currency, dashes, year }} />
  </>
)

TableSection.propTypes = {
  Comp: PropTypes.func,
  data: PropTypes.object,
  firstPageIndex: PropTypes.number,
  lastPageIndex: PropTypes.number,
  right: PropTypes.string,
  currency: PropTypes.string.isRequired,
  dashes: PropTypes.number,
  year: PropTypes.bool,
}
