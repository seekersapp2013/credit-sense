import React from 'react'
import { DataRow } from './DataRow'

export const DataRows = ({ data, otherProps, bold: defaultBold, color: defaultColor, year }) => {
  return data.map(({ title, data, bold, color, percent }, i) => (
    <DataRow
      key={i}
      title={title}
      data={data}
      otherProps={otherProps}
      bold={bold ? true : defaultBold ? true : false}
      color={color ? color : defaultColor}
      percent={percent}
      year={year}
    />
  ))
}
