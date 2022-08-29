export const getMonthlySalary = ({ salary }) => parseInt(salary) / 12

export const getMonthlyCostToCompany = ({ salary, taxes_and_benefits }) => {
  taxes_and_benefits = parseInt(taxes_and_benefits) / 100
  let monthlySalary = getMonthlySalary({ salary })

  return monthlySalary * (1 + taxes_and_benefits)
}
