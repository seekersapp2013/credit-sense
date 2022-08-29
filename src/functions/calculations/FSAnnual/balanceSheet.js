import { addCAGR, select12thMonth } from '..'
import { balanceSheet } from '../FSMonth/balanceSheet'

const operatingCash = (props) => addCAGR(select12thMonth(balanceSheet.operatingCash(props)))

const excessCash = (props) => addCAGR(select12thMonth(balanceSheet.excessCash(props)))

const accountsReceivable = (props) =>
  addCAGR(select12thMonth(balanceSheet.accountsReceivable(props)))

const currentAssets = (props) => addCAGR(select12thMonth(balanceSheet.currentAssets(props)))

const PPAndENet = (props) => addCAGR(select12thMonth(balanceSheet.PPAndENet(props)))

const nonCurrentAssets = (props) => addCAGR(select12thMonth(balanceSheet.nonCurrentAssets(props)))

const totalAssets = (props) => addCAGR(select12thMonth(balanceSheet.totalAssets(props)))

const financialObligations = (props) =>
  addCAGR(select12thMonth(balanceSheet.financialObligations(props)))

const accountsPayable = (props) => addCAGR(select12thMonth(balanceSheet.accountsPayable(props)))

const totalLiabilities = (props) => addCAGR(select12thMonth(balanceSheet.totalLiabilities(props)))

const commonEquity = (props) => addCAGR(select12thMonth(balanceSheet.commonEquity(props)))

const netEarnings = (props) => addCAGR(select12thMonth(balanceSheet.netEarnings(props)))

const retainedEarnings = (props) => addCAGR(select12thMonth(balanceSheet.retainedEarnings(props)))

const totalEquity = (props) => addCAGR(select12thMonth(balanceSheet.totalEquity(props)))

const totalLiabilitiesAndEquity = (props) =>
  addCAGR(select12thMonth(balanceSheet.totalLiabilitiesAndEquity(props)))

export const annualBalanceSheet = {
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
