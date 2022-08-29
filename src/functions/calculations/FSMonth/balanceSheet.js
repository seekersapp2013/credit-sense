import { totalCols } from '..'
import { WKCAPEX } from '../WK+CAPEX'
import { cashFlow } from './cashFlow'
import { incomeStatement } from './incomeStatement'

const operatingCash = WKCAPEX.balanceSheetAccounts.operatingCash.balance

const excessCash = (props) => {
  const data = []

  const totalLiabilitiesAndEquityData = totalLiabilitiesAndEquity(props)
  const operatingCashData = WKCAPEX.balanceSheetAccounts.operatingCash.balance(props)
  const accountsReceivableData = accountsReceivable(props)
  const nonCurrentAssetsData = nonCurrentAssets(props)

  for (let i = 0; i < 84; i++) {
    const val =
      totalLiabilitiesAndEquityData[i] -
      (operatingCashData[i] + accountsReceivableData[i] + nonCurrentAssetsData[i])

    data.push(val)
  }

  return data
}

const accountsReceivable = WKCAPEX.balanceSheetAccounts.accountsReceivable.ARFromRevenues.balance

const currentAssets = (props) =>
  totalCols([operatingCash(props), excessCash(props), accountsReceivable(props)])

const PPAndENet = WKCAPEX.balanceSheetAccounts.assets.balance

const nonCurrentAssets = (props) => totalCols([PPAndENet(props)])

const totalAssets = (props) => totalCols([currentAssets(props), nonCurrentAssets(props)])

const financialObligations = (props) => {
  let {
    valuation: { debt_capital_ratio },
  } = props

  const data = []

  debt_capital_ratio = parseInt(debt_capital_ratio) / 100

  const cashInfusionsData = cashFlow.cashInfusions(props)

  for (let i = 0; i < 84; i++) {
    if (i === 0) {
      data.push('')
    } else {
      const val =
        data[i - 1] + cashInfusionsData[i] / (1 - debt_capital_ratio) - cashInfusionsData[i]

      data.push(val)
    }
  }

  return data
}
const accountsPayable = WKCAPEX.balanceSheetAccounts.accountsPayable.balance

const totalLiabilities = (props) => totalCols([financialObligations(props), accountsPayable(props)])

const commonEquity = (props) => {
  const data = []

  const cashInfusionsData = cashFlow.cashInfusions(props)

  for (let i = 0; i < 84; i++) {
    if (i === 0) {
      data.push(cashInfusionsData[i])
    } else {
      const val = data[i - 1] + cashInfusionsData[i]
      data.push(val)
    }
  }

  return data
}

const netEarnings = incomeStatement.netIncome

const retainedEarnings = (props) => {
  const data = []

  const netEarningsData = netEarnings(props)
  const dividendsData = cashFlow.dividends(props)

  for (let i = 0; i < 84; i++) {
    if (i === 0) {
      data.push(0)
    } else {
      const val = netEarningsData[i - 1] + data[i - 1] - dividendsData[i]
      data.push(val)
    }
  }

  return data
}

const totalEquity = (props) =>
  totalCols([commonEquity(props), netEarnings(props), retainedEarnings(props)])

const totalLiabilitiesAndEquity = (props) =>
  totalCols([totalLiabilities(props), totalEquity(props)])

export const balanceSheet = {
  operatingCash,
  excessCash,
  accountsReceivable,
  currentAssets,
  PPAndENet,
  nonCurrentAssets,
  totalAssets,
  financialObligations,
  accountsPayable,
  totalLiabilities,
  commonEquity,
  netEarnings,
  retainedEarnings,
  totalEquity,
  totalLiabilitiesAndEquity,
}
