export const totalCols = (data) => {
  const totals = Array(data[0].length).fill(0)

  for (let i = 0; i < data[0].length; i++) {
    data.forEach((role) => (totals[i] += role[i] === '' ? 0 : role[i]))
  }

  return totals
}

export const addMonths = (date, months) => {
  date.setMonth(date.getMonth() + months)
}

export const getMonthsArray = (startMonth) => {
  let data = []

  startMonth = new Date(startMonth)

  for (let i = 0; i < 84; i++) {
    data.push(new Date(startMonth))
    addMonths(startMonth, 1)
  }

  return data
}

export const arrOfFloatsToFixed = (numbers, position = 0) => {
  return numbers.map((number) => parseFloat(number.toFixed(position)))
}

export const hLookUp = (value, data, index = 1, approx = false) => {
  let i = -1
  if (approx) {
    data[0].forEach((cell, ind) => {
      // eslint-disable-next-line eqeqeq
      if (cell == value && i === -1) {
        i = ind
      } else if (cell > value && ind > 0 && i === -1) {
        i = ind - 1
      }
    })
  } else {
    i = data[0].indexOf(value)
  }

  if (i >= 0) {
    return data[index][i]
  } else {
    return null
  }
}

export const sumMonthsToYears = (data) => {
  let out = Array(data.length / 12).fill(0)
  data.forEach((value, i) => {
    let j = Math.floor(i / 12)
    out[j] += typeof value === 'string' && isNaN(parseFloat(value)) ? 0 : parseFloat(value)
  })
  return out
}

export const select12thMonth = (data) => {
  let out = Array(data.length / 12).fill(0)
  return out.map((val, i) => {
    return data[(i + 1) * 12 - 1]
  })
}

export const applyToObjectEntries = (data, func) => {
  const keys = Object.keys(data)
  keys.forEach((key) => {
    data[key] = func(data[key])
  })
  return data
}

// export const applyToAllObjectEntries = (data, func) => {
//   const keys = Object.keys(data)
//   keys.forEach((key) => {
//     data[key] = func(data[key])
//   })
//   return data
// }

export const CAGR = (data) => {
  let val = ((data[6] / data[2]) ** (1 / 5) - 1) * 100
  val = val ? val : '-'
  val = isNaN(val) ? '-' : val
  val = val === Infinity ? '-' : val
  data.push(typeof val === 'string' || val < 0 ? '-' : val)
  return data
}

export const addCAGR = (data) => {
  data.push(CAGR(data))
  return data
}

export const addCAGRToAll = (data) => {
  Object.entries(data).forEach(([key, value], i) => {
    data[key].push(CAGR(value))
  })

  return data
}
