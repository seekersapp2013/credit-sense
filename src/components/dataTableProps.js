import PropTypes from 'prop-types'

export const dataTableProps = {
  data: PropTypes.object,
  firstPageIndex: PropTypes.number,
  lastPageIndex: PropTypes.number,
  currency: PropTypes.string.isRequired,
}
