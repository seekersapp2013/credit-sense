import { addCAGR, sumMonthsToYears } from '..'
import { cashFlow } from '../FSMonth/cashFlow'

const investorCash = (props) => addCAGR(sumMonthsToYears(cashFlow.investorCash(props)))

const cashInfusions = (props) => addCAGR(sumMonthsToYears(cashFlow.cashInfusions(props)))

const capitalCalls = (props) => addCAGR(sumMonthsToYears(cashFlow.capitalCalls(props)))

const operatingChangeInCash = (props) =>
  addCAGR(sumMonthsToYears(cashFlow.operatingChangeInCash(props)))

const netIncome = (props) => addCAGR(sumMonthsToYears(cashFlow.netIncome(props)))

const DAndA = (props) => addCAGR(sumMonthsToYears(cashFlow.DAndA(props)))

const changeInWC = (props) => addCAGR(sumMonthsToYears(cashFlow.changeInWC(props)))

const CAPEX = (props) => addCAGR(sumMonthsToYears(cashFlow.CAPEX(props)))

const changeInDebt = (props) => addCAGR(sumMonthsToYears(cashFlow.changeInDebt(props)))

const dividends = (props) => addCAGR(sumMonthsToYears(cashFlow.dividends(props)))

const initialCashBalanceAndEndingCashBalance = (props) => {
  const data = { initialCashBalance: [], endingCashBalance: [] }

  const cashInfusionsData = cashInfusions(props)
  const operatingChangeInCashData = operatingChangeInCash(props)

  for (let i = 0; i < 7; i++) {
    if (i === 0) {
      data.initialCashBalance.push(0)
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

//

// const initialCashBalance = (props) => addCAGR(sumMonthsToYears(cashFlow.initialCashBalance(props)))

// const endingCashBalance = (props) =>
//   addCAGR(
//     totalCols([
//       sumMonthsToYears(cashFlow.initialCashBalance(props)),
//       sumMonthsToYears(cashFlow.cashInfusions(props)),
//       sumMonthsToYears(cashFlow.operatingChangeInCash(props)),
//     ]),
//   )

const totalCapitalRequirements = (props) =>
  addCAGR(sumMonthsToYears(cashFlow.totalCapitalRequirements(props)))

export const annualCashFlow = {
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
