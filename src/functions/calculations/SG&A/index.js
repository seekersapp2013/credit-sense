export const getOperatingExpenseBySubCategory = ({ operating_expenses }, subCategory) => {
  let data = []

  operating_expenses
    .filter((val) => val.subCategory === subCategory)
    .forEach(({ cost }) => {
      data.push(Array(84).fill(parseInt(cost)))
    })

  return data
}

export const getOperatingExpenseByCategory = ({ operating_expenses }, category) => {
  let data = []

  operating_expenses
    .filter((val) => val.category === category)
    .forEach(({ cost }) => {
      data.push(Array(84).fill(parseInt(cost)))
    })

  return data
}
