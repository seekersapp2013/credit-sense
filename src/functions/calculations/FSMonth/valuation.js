import { totalCols } from '..'
import { cashFlow } from './cashFlow'
import { incomeStatement } from './incomeStatement'

const EBIT = incomeStatement.EBIT

const taxes = incomeStatement.incomeTaxes

const EBIAT = (props) => {
  const data = []

  const EBITData = EBIT(props)
  const taxesData = taxes(props)

  for (let i = 0; i < 84; i++) {
    data.push(EBITData[i] - taxesData[i])
  }

  return data
}

const DAndA = incomeStatement.DAndA

const grossCashFlow = (props) => totalCols([EBIAT(props), DAndA(props)])

const changeInWC = cashFlow.changeInWC

const CAPEX = cashFlow.CAPEX

const freeCashFlow = (props) => {
  const data = []

  const sumOfGrossCashFlowAndChangeInWCData = totalCols([grossCashFlow(props), changeInWC(props)])
  const CAPEXData = CAPEX(props)

  for (let i = 0; i < 84; i++) {
    data.push(sumOfGrossCashFlowAndChangeInWCData[i] - CAPEXData[i])
  }

  return data
}

export const valuation = {
  EBIT,
  taxes,
  EBIAT,
  DAndA,
  grossCashFlow,
  changeInWC,
  CAPEX,
  freeCashFlow,
}
