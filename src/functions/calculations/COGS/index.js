const { totalCols } = require('..')

export const getCOGSInCategories = ({ cogs }) => {
  let data = {}

  cogs.forEach(({ name, category, cost }) => {
    if (!Array.isArray(data[category])) {
      data[category] = []
    }

    data[category].push({ name, data: Array(84).fill(parseInt(cost)) })
  })

  return data
}

export const getCOGSCategoryTotals = ({ cogs }) => {
  const COGSInCategories = getCOGSInCategories({ cogs })
  const categories = Object.keys(COGSInCategories)
  const values = Object.values(COGSInCategories)

  let data = {}

  categories.map((category, i) => {
    data[category] = totalCols(values[i].map((value) => value.data))
  })

  return data
}

export const getCOGSTotals = ({ cogs }) => {
  const COGSCategoryTotals = getCOGSCategoryTotals({ cogs })
  const values = Object.values(COGSCategoryTotals)

  return totalCols(values)
}
