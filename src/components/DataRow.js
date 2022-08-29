import React from 'react'
import { CTableDataCell, CTableHeaderCell, CTableRow } from '@coreui/react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'
import { formatMoney } from 'src/components/Utils/formatMoney'
import { percentValue } from 'src/components/Utils/percentValue'

export const DataRow = ({
  title,
  data,
  otherProps: { currency, firstPageIndex, lastPageIndex },
  bold,
  color,
  percent,
  year,
}) => {
  return (
    <CTableRow color={color}>
      <CTableHeaderCell scope="row" className={styles.right}>
        {bold ? <strong>{title}</strong> : title}
      </CTableHeaderCell>
      <CTableDataCell>{currency}</CTableDataCell>
      {data.slice(firstPageIndex, lastPageIndex).map((data, i) => {
        const isCAGR = year && lastPageIndex === 8 && i === 3
        const cell = percent || isCAGR ? percentValue(data) : formatMoney(data)
        return (
          <CTableDataCell color={isCAGR ? 'danger' : ''} key={i}>
            {bold && !isCAGR ? <strong>{cell}</strong> : cell}
          </CTableDataCell>
        )
      })}
    </CTableRow>
  )
}

DataRow.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  otherProps: PropTypes.object.isRequired,
  bold: PropTypes.bool,
  color: PropTypes.string,
  percent: PropTypes.bool,
  year: PropTypes.bool,
}
