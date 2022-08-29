import { addCAGR, sumMonthsToYears, totalCols } from '..'
import { valuation } from '../FSMonth/valuation'
import { annualIncomeStatement } from './incomeStatement'

const EBIT = (props) => addCAGR(sumMonthsToYears(valuation.EBIT(props)))

const taxes = (props) => addCAGR(sumMonthsToYears(valuation.taxes(props)))

const EBIAT = (props) => addCAGR(sumMonthsToYears(valuation.EBIAT(props)))

const DAndA = (props) => addCAGR(sumMonthsToYears(valuation.DAndA(props)))

const grossCashFlow = (props) => addCAGR(sumMonthsToYears(valuation.grossCashFlow(props)))

const changeInWC = (props) => addCAGR(sumMonthsToYears(valuation.changeInWC(props)))

const CAPEX = (props) => addCAGR(sumMonthsToYears(valuation.CAPEX(props)))

const freeCashFlow = (props) => addCAGR(sumMonthsToYears(valuation.freeCashFlow(props)))

const exitValue = (props) => {
  let {
    valuation: { business_terminal_value, xEBITDA },
  } = props
  let data = Array(8).fill('')

  xEBITDA = parseFloat(xEBITDA)

  const EBITDAData = annualIncomeStatement.EBITDA(props)

  data[6] = business_terminal_value === 'xEBITDA' ? EBITDAData[6] * xEBITDA : ''

  return data
}

const discountedCashFlow = (props) =>
  addCAGR(totalCols([sumMonthsToYears(valuation.freeCashFlow(props)), exitValue(props)]))

export const annualValuation = {
  EBIT,
  taxes,
  EBIAT,
  DAndA,
  grossCashFlow,
  changeInWC,
  CAPEX,
  freeCashFlow,
  exitValue,
  discountedCashFlow,
}
