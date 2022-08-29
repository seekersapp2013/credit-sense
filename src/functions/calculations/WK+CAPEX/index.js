import { getMonthsArray, hLookUp, totalCols } from '..'
import { getCOGSCategoryTotals, getCOGSTotals } from '../COGS'
import { consolidatedRevenue } from '../Revenue/consolidatedRevenue'
import { headcount, totalHeadcount } from '../SG&A/headcount'

const operatingCashBalance = ({ operating_cash: { balance } }) => Array(84).fill(parseInt(balance))
const percentageOfRevenues = ({ operating_cash: { percentage_of_revenues } }) =>
  Array(84).fill(parseInt(percentage_of_revenues))

const pendingIncomeTotalIncome = ({ operating_cash: { pending_income_total_income } }) =>
  Array(84).fill(parseInt(pending_income_total_income))

const ARFromRevenuesBalance = (props) => {
  const pendingIncomeTotalIncomeData = pendingIncomeTotalIncome(props)
  const consolidatedRevenueTotalData = consolidatedRevenue.total(props)

  return pendingIncomeTotalIncomeData.map((data, i) => data * consolidatedRevenueTotalData[i])
}

const prepaidExpensesBalance = (props) => {
  const data = []

  const percentageOfRevenuesData = percentageOfRevenues(props).map((data) => data / 100)
  const prepaidDaysOutstandingData = prepaidDaysOutstanding(props)

  const monthsArray = getMonthsArray(props.model_start_date)

  for (let i = 0; i < 84; i++) {
    const dayDifference = prepaidDaysOutstandingData[i] + 1

    const nextMonth = new Date(monthsArray[i])

    nextMonth.setDate(nextMonth.getDate() + dayDifference)

    let out = hLookUp(
      nextMonth.getTime(),
      [
        monthsArray.slice(1, 71).map((date) => date.getTime()),
        percentageOfRevenuesData.slice(1, 71),
      ],
      1,
      true,
    )

    data.push(i === 0 ? '' : out === null ? 0 : out)
  }

  return data
}
const COGSAccounts = (props) => {
  const COGSCategoryTotalsData = getCOGSCategoryTotals(props)
  console.log(COGSCategoryTotalsData)

  const data = []

  if (COGSCategoryTotalsData['Web Services']) data.push(COGSCategoryTotalsData['Web Services'])
  if (COGSCategoryTotalsData['Other']) data.push(COGSCategoryTotalsData['Other'])

  return totalCols(data)
}

const prepaidDaysOutstanding = ({ operating_cash: { prepaid_days_outstanding } }) =>
  Array(84).fill(parseInt(prepaid_days_outstanding))

const APAsPercentageOfTotalCOGS = ({ operating_cash: { accounts_payable } }) =>
  Array(84).fill(parseInt(accounts_payable))

const accountsPayableBalance = (props) => {
  const totalCOGSData = getCOGSTotals(props)
  const APAsPercentageOfTotalCOGSData = APAsPercentageOfTotalCOGS(props)

  return APAsPercentageOfTotalCOGSData.map((data, i) => data * totalCOGSData[i])
}

const generalAssets = (capitalExpenditureData, depreciationData) => {
  const data = []

  capitalExpenditureData = capitalExpenditureData.map((data) => {
    if (data === '') {
      return 0
    } else {
      return data
    }
  })
  depreciationData = depreciationData.map((data) => {
    if (data === '') {
      return 0
    } else {
      return data
    }
  })

  for (let i = 0; i < 84; i++) {
    // const capitalExpenditureSum = capitalExpenditureData[i - 1] + capitalExpenditureData[i]
    // const depreciationSum = depreciationData[i - 1] + depreciationData[i]

    // [1,2,3,4]

    const capitalExpenditureSum = capitalExpenditureData.slice(0, i + 1).reduce((a, b) => a + b, 0)

    const depreciationSum = depreciationData.slice(0, i + 1).reduce((a, b) => a + b, 0)

    // const out = SUM($D61:CD61)-SUM($D73:CD73)

    data.push(capitalExpenditureSum - depreciationSum)
  }

  return data
}

const assetsApartmentOfficeFixings = (props) =>
  generalAssets(
    capitalExpenditureApartmentOfficeFixings(props),
    depreciationApartmentOfficeFixings(props),
  )
const assetsOfficeFurniture = (props) =>
  generalAssets(capitalExpenditureOfficeFurniture(props), depreciationOfficeFurniture(props))
const assetsComputers = (props) =>
  generalAssets(capitalExpenditureComputers(props), depreciationComputers(props))
const assetsTelecomEquipment = (props) =>
  generalAssets(capitalExpenditureTelecomEquipment(props), depreciationTelecomEquipment(props))
const assetsServersAndOtherTechInfrastructure = (props) =>
  generalAssets(
    capitalExpenditureServersAndOtherTechInfrastructure(props),
    depreciationServersAndOtherTechInfrastructure(props),
  )
const assetsOther = (props) =>
  generalAssets(capitalExpenditureOther(props), depreciationOther(props))

const assetsBalance = (props) =>
  totalCols([
    assetsApartmentOfficeFixings(props),
    assetsOfficeFurniture(props),
    assetsComputers(props),
    assetsTelecomEquipment(props),
    assetsServersAndOtherTechInfrastructure(props),
    assetsOther(props),
  ])

const assetsCAPEX = (props) => totalCAPEX(props)

const assetsDepreciation = (props) =>
  totalCols([
    depreciationApartmentOfficeFixings(props),
    depreciationOfficeFurniture(props),
    depreciationComputers(props),
    depreciationTelecomEquipment(props),
    depreciationServersAndOtherTechInfrastructure(props),
    depreciationOther(props),
  ])

const changeInOperatingCash = (props) =>
  operatingCashBalance(props).map((data, i, arr) => {
    return i === 0 ? '' : arr[i - 1] - data
  })
const changeInAccountsReceivable = (props) => {
  const data = []
  const ARFromRevenuesBalanceData = ARFromRevenuesBalance(props)
  const prepaidExpensesBalanceData = prepaidExpensesBalance(props)

  for (let i = 0; i < 84; i++) {
    const val =
      i === 0
        ? ''
        : ARFromRevenuesBalanceData[i - 1] +
          prepaidExpensesBalanceData[i - 1] -
          (ARFromRevenuesBalanceData[i] + prepaidExpensesBalanceData[i])

    data.push(val)
  }

  return data
}
const changeInAccountsPayable = (props) =>
  accountsPayableBalance(props).map((data, i, arr) => {
    return i === 0 ? '' : data - arr[i - 1]
  })

const totalWorkingCapital = (props) =>
  totalCols([
    changeInOperatingCash(props),
    changeInAccountsReceivable(props),
    changeInAccountsPayable(props),
  ])

const generalCapitalExpenditure = ({ taxes: { inflation } }, assets_depreciation_time) => {
  const data = []

  inflation = parseInt(inflation)
  assets_depreciation_time = parseInt(assets_depreciation_time)

  for (let i = 0; i < 84; i++) {
    const dataToSearchFor = i + 1 - assets_depreciation_time * 12

    const resultOfLookUp = data[dataToSearchFor - 1]

    const val =
      i + 1 >= parseInt(assets_depreciation_time) * 12 + 1
        ? resultOfLookUp * (1 + (inflation / 12) * i)
        : 0

    data.push(val)
  }
  return data
}

const capitalExpenditureApartmentOfficeFixings = (props) =>
  generalCapitalExpenditure(props, props.assets_depreciation_time.apartment_office_fixings)
const capitalExpenditureOfficeFurniture = (props) =>
  generalCapitalExpenditure(props, props.assets_depreciation_time.office_furniture)
const capitalExpenditureTelecomEquipment = (props) =>
  generalCapitalExpenditure(props, props.assets_depreciation_time.telecom_equipment)
const capitalExpenditureServersAndOtherTechInfrastructure = (props) =>
  generalCapitalExpenditure(props, props.assets_depreciation_time.tech_infrastructure)
const capitalExpenditureOther = (props) =>
  generalCapitalExpenditure(props, props.assets_depreciation_time.other)

const capitalExpenditureComputers = (props) => {
  let {
    capital_expenditures: { estimate_new_computers, price_per_computer },
    assets_depreciation_time: { computers },
    taxes: { inflation },
  } = props
  const data = []

  price_per_computer = parseInt(price_per_computer)
  computers = parseInt(computers)
  inflation = parseInt(inflation) / 100

  const headcountData = totalHeadcount(props)

  for (let i = 0; i < 84; i++) {
    const dataToSearchFor = i + 1 - computers * 12

    const resultOfLookUp = data[dataToSearchFor - 1]
    const val =
      estimate_new_computers === 'Yes'
        ? Math.max(
            (i > 0 ? headcountData[i] - headcountData[i - 1] : headcountData[0]) *
              price_per_computer,
            0,
          ) + (i + 1 >= computers * 12 + 1 ? resultOfLookUp * (1 + (inflation / 12) * i) : 0)
        : 0
    data.push(val)
  }
  return data
}

const totalCAPEX = (props) =>
  totalCols([
    capitalExpenditureApartmentOfficeFixings(props),
    capitalExpenditureOfficeFurniture(props),
    capitalExpenditureComputers(props),
    capitalExpenditureTelecomEquipment(props),
    capitalExpenditureServersAndOtherTechInfrastructure(props),
    capitalExpenditureOther(props),
  ])

const generalDepreciation = (depreciationTime, capitalEexpenditureData) => {
  const yearsToDepreciate = depreciationTime * 12

  const data = []

  for (let i = 0; i < 84; i++) {
    let val = i === 0 ? '' : 0

    for (let j = 0; j < i; j++) {
      val +=
        (j === 0 ? 1 : i - j) <= yearsToDepreciate
          ? capitalEexpenditureData[j] / yearsToDepreciate
          : 0
    }

    data.push(val)
  }
  return data
}

const depreciationApartmentOfficeFixings = (props) =>
  generalDepreciation(
    props.assets_depreciation_time.apartment_office_fixings,
    capitalExpenditureApartmentOfficeFixings(props),
  )
const depreciationOfficeFurniture = (props) =>
  generalDepreciation(
    props.assets_depreciation_time.office_furniture,
    capitalExpenditureOfficeFurniture(props),
  )
const depreciationComputers = (props) =>
  generalDepreciation(props.assets_depreciation_time.computers, capitalExpenditureComputers(props))
const depreciationTelecomEquipment = (props) =>
  generalDepreciation(
    props.assets_depreciation_time.telecom_equipment,
    capitalExpenditureTelecomEquipment(props),
  )
const depreciationServersAndOtherTechInfrastructure = (props) =>
  generalDepreciation(
    props.assets_depreciation_time.tech_infrastructure,
    capitalExpenditureServersAndOtherTechInfrastructure(props),
  )
const depreciationOther = (props) =>
  generalDepreciation(props.assets_depreciation_time.other, capitalExpenditureOther(props))

const depreciationAndAmortizationTotal = (props) =>
  totalCols([
    depreciationApartmentOfficeFixings(props),
    depreciationOfficeFurniture(props),
    depreciationComputers(props),
    depreciationTelecomEquipment(props),
    depreciationServersAndOtherTechInfrastructure(props),
    depreciationOther(props),
  ])

export const WKCAPEX = {
  balanceSheetAccounts: {
    operatingCash: {
      balance: operatingCashBalance,
      percentageOfRevenues: percentageOfRevenues,
    },
    accountsReceivable: {
      ARFromRevenues: {
        balance: ARFromRevenuesBalance,
        pendingIncomeTotalIncome: pendingIncomeTotalIncome,
      },
      prepaidExpenses: {
        balance: prepaidExpensesBalance,
        COGSAccounts: COGSAccounts,
        prepaidDaysOutstanding: prepaidDaysOutstanding,
      },
    },
    accountsPayable: {
      balance: accountsPayableBalance,
      APAsPercentageOfTotalCOGS: APAsPercentageOfTotalCOGS,
    },
    assets: {
      balance: assetsBalance,
      apartmentOfficeFixings: assetsApartmentOfficeFixings,
      officeFurniture: assetsOfficeFurniture,
      computers: assetsComputers,
      telecomEquipment: assetsTelecomEquipment,
      serversAndOtherTechInfrastructure: assetsServersAndOtherTechInfrastructure,
      other: assetsOther,
      CAPEX: assetsCAPEX,
      depreciation: assetsDepreciation,
    },
  },
  workingCapital: {
    changeInOperatingCash: changeInOperatingCash,
    changeInAccountsReceivable: changeInAccountsReceivable,
    changeInAccountsPayable: changeInAccountsPayable,
    totalWorkingCapital: totalWorkingCapital,
  },
  capitalExpenditure: {
    byTypeOfAsset: {
      apartmentOfficeFixings: capitalExpenditureApartmentOfficeFixings,
      officeFurniture: capitalExpenditureOfficeFurniture,
      computers: capitalExpenditureComputers,
      telecomEquipment: capitalExpenditureTelecomEquipment,
      serversAndOtherTechInfrastructure: capitalExpenditureServersAndOtherTechInfrastructure,
      other: capitalExpenditureOther,
    },
    totalCAPEX: totalCAPEX,
  },
  depreciationAndAmortization: {
    depreciation: {
      apartmentOfficeFixings: depreciationApartmentOfficeFixings,
      officeFurniture: depreciationOfficeFurniture,
      computers: depreciationComputers,
      telecomEquipment: depreciationTelecomEquipment,
      serversAndOtherTechInfrastructure: depreciationServersAndOtherTechInfrastructure,
      other: depreciationOther,
    },
    total: depreciationAndAmortizationTotal,
  },
}
