import { getMonthsArray, totalCols } from '..'
import { WKCAPEX } from '../WK+CAPEX'
import { balanceSheet } from './balanceSheet'
import { incomeStatement } from './incomeStatement'

const investorCash = (props) => {
  let { model_start_date, fundraising_close_date, investment_amount } = props

  const data = []

  fundraising_close_date = new Date(fundraising_close_date).getTime()
  investment_amount = parseInt(investment_amount)

  const monthsArrayData = getMonthsArray(model_start_date)

  for (let i = 0; i < 84; i++) {
    data.push(fundraising_close_date === monthsArrayData[i].getTime() ? investment_amount : 0)
  }

  return data
}

const cashInfusions = investorCash

const capitalCalls = (props) => Array(84).fill('')

const operatingChangeInCash = (props) => {
  const data = []

  const netIncomeData = netIncome(props)
  const DAndAData = DAndA(props)
  const changeInWCData = changeInWC(props)
  const CAPEXData = CAPEX(props)
  const changeInDebtData = changeInDebt(props)
  const dividendsData = dividends(props)

  for (let i = 0; i < 84; i++) {
    data.push(
      netIncomeData[i] +
        DAndAData[i] +
        changeInWCData[i] -
        CAPEXData[i] +
        changeInDebtData[i] -
        dividendsData[i],
    )
  }

  return data
}
const netIncome = incomeStatement.netIncome

const DAndA = incomeStatement.DAndA

const changeInWC = WKCAPEX.workingCapital.totalWorkingCapital

const CAPEX = WKCAPEX.capitalExpenditure.totalCAPEX

const changeInDebt = (props) => {
  const data = []

  const financialObligationsData = balanceSheet.financialObligations(props)

  for (let i = 0; i < 84; i++) {
    if (i === 0) {
      data.push(financialObligationsData[i])
    } else {
      data.push(financialObligationsData[i] - financialObligationsData[i - 1])
    }
  }

  return data
}

const dividends = (props) => Array(84).fill('')

const initialCashBalanceAndEndingCashBalance = (props) => {
  let { initial_cash_balance } = props

  const data = { initialCashBalance: [], endingCashBalance: [] }

  initial_cash_balance = parseInt(initial_cash_balance)

  const cashInfusionsData = cashInfusions(props)
  const operatingChangeInCashData = operatingChangeInCash(props)

  for (let i = 0; i < 84; i++) {
    if (i === 0) {
      data.initialCashBalance.push(initial_cash_balance)
    } else {
      data.initialCashBalance.push(data.endingCashBalance[i - 1])
    }
    // console.log(data.initialCashBalance[i], cashInfusionsData[i], operatingChangeInCashData[i])
    data.endingCashBalance.push(
      data.initialCashBalance[i] + cashInfusionsData[i] + operatingChangeInCashData[i],
    )
  }

  return data
}

const endingCashBalance = (props) => initialCashBalanceAndEndingCashBalance(props).endingCashBalance

const initialCashBalance = (props) =>
  initialCashBalanceAndEndingCashBalance(props).initialCashBalance

const totalCapitalRequirements = (props) => {
  let { investment_amount } = props

  investment_amount = parseInt(investment_amount)

  let data = Array(84).fill('')

  data[0] = Math.min(...endingCashBalance(props)) - investment_amount

  return data
}

export const cashFlow = {
  initialCashBalance,
  cashInfusions,
  capitalCalls,
  investorCash,
  operatingChangeInCash,
  netIncome,
  DAndA,
  changeInWC,
  CAPEX,
  changeInDebt,
  dividends,
  endingCashBalance,
  totalCapitalRequirements,
}
