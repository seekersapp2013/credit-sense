import React, { useEffect, useState } from 'react'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CChartBar, CChartLine, CChartPie } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import { appwrite, objectifySubStrings } from 'src/functions/appwrite'
import { headcount, totalHeadcount } from 'src/functions/calculations/SG&A/headcount'
import {
  getCOGSCategoryTotals,
  getCOGSInCategories,
  getCOGSTotals,
} from 'src/functions/calculations/COGS'
import { getMonthsArray } from 'src/functions/calculations'
import {
  annualTotalActiveCustomers,
  churnRate,
  costOfAcqusitionPerAccount,
  expectedConversionsFromOrganicTraffic,
  expectedNewCustomersAdded,
  getCostOfAcqusitionPerAccount,
  lostAndTotalCustomers,
  lostMRR,
  LTVSubscribedThisMonth,
  monthlyRecurringRevenue,
  newCustomers,
  newMRR,
  renewingCustomers,
  selfServiceSubscriptionsRevenue,
} from 'src/functions/calculations/Revenue/selfServiceSubscriptions'
import {
  brandAwarenessCampaignsData,
  directResponseCampaignsExpenses,
  leadGenerationBudget,
  platformsExpenses,
  selfServiceMarketingBudget,
  totalbrandAwarenessCampaigns,
  totalDirectResponseCampaignsExpenses,
  totalExperimentCampaigns,
  totalMarketingAndGrowth,
  totalPlatformsExpenses,
} from 'src/functions/calculations/SG&A/marketingAndGrowth'
import { totalAdvisoryAndProf } from 'src/functions/calculations/SG&A/advisoryAndProfServices'
import {
  officeRentExpenses,
  rentExpensesData,
  totalRentExpenses,
  totalRentExpensesData,
} from 'src/functions/calculations/SG&A/rent'
import { inboundSalesRevenue } from 'src/functions/calculations/Revenue/inboundSales'
import { outboundSalesRevenue } from 'src/functions/calculations/Revenue/outboundSales'
import {
  consolidatedRevenue,
  consolidatedRevenueTotal,
} from 'src/functions/calculations/Revenue/consolidatedRevenue'
import { keyIndicators, organicTraffic } from 'src/functions/calculations/Revenue/keyIndicators'
import { payroll, totalPayroll } from 'src/functions/calculations/SG&A/payroll'
import { WKCAPEX } from 'src/functions/calculations/WK+CAPEX'
import { incomeStatement } from 'src/functions/calculations/FSMonth/incomeStatement'
import { consolidatedSGAandA } from 'src/functions/calculations/SG&A/consolidatedSGAndA'
import { balanceSheet } from 'src/functions/calculations/FSMonth/balanceSheet'
import { cashFlow } from 'src/functions/calculations/FSMonth/cashFlow'
import { valuation } from 'src/functions/calculations/FSMonth/valuation'
import {
  getDataSetForPieChart,
  useOfFundsFirst18Months,
} from 'src/functions/calculations/Charts/useOfFundsFor18Months'
import { formatMoney } from 'src/components/Utils/formatMoney'
import { chartsAndKPIs } from 'src/functions/calculations/Charts'
import { pAndLBarChart } from 'src/functions/calculations/Charts/pAndLBarChart'
import { monthNamesArray } from '../../components/monthNamesArray'
import { useRouter } from 'next/router'

const Dashboard = () => {
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

  const router = useRouter()

  // const [account, setAccount] = useState(null)
  const [data, setData] = useState(null)

  const getAccountInfo = async () => {
    const res = await appwrite.getAccount()
    // console.log(res)
    // setAccount(res)
    // setData({ ...data, user: res.$id })

    try {
      const user = await appwrite.fetchUser(res.$id)
      console.log('User', objectifySubStrings(user))
      setData({ ...objectifySubStrings(user), user: res.$id })
    } catch (error) {
      console.log(error)
      router.push('/profile')
    }
  }

  useEffect(() => getAccountInfo(), [])

  const progressExample = [
    { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
    { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
    { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
    { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
    { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
  ]

  const progressGroupExample1 = [
    { title: 'Monday', value1: 34, value2: 78 },
    { title: 'Tuesday', value1: 56, value2: 94 },
    { title: 'Wednesday', value1: 12, value2: 67 },
    { title: 'Thursday', value1: 43, value2: 91 },
    { title: 'Friday', value1: 22, value2: 73 },
    { title: 'Saturday', value1: 53, value2: 82 },
    { title: 'Sunday', value1: 9, value2: 69 },
  ]

  const progressGroupExample2 = [
    { title: 'Male', icon: cilUser, value: 53 },
    { title: 'Female', icon: cilUserFemale, value: 43 },
  ]

  const progressGroupExample3 = [
    { title: 'Organic Search', icon: cibGoogle, percent: 56, value: '191,235' },
    { title: 'Facebook', icon: cibFacebook, percent: 15, value: '51,223' },
    { title: 'Twitter', icon: cibTwitter, percent: 11, value: '37,564' },
    { title: 'LinkedIn', icon: cibLinkedin, percent: 8, value: '27,319' },
  ]

  const tableExample = [
    {
      avatar: { src: avatar1, status: 'success' },
      user: {
        name: 'Yiorgos Avraamu',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'USA', flag: cifUs },
      usage: {
        value: 50,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Mastercard', icon: cibCcMastercard },
      activity: '10 sec ago',
    },
    {
      avatar: { src: avatar2, status: 'danger' },
      user: {
        name: 'Avram Tarasios',
        new: false,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Brazil', flag: cifBr },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'info',
      },
      payment: { name: 'Visa', icon: cibCcVisa },
      activity: '5 minutes ago',
    },
    {
      avatar: { src: avatar3, status: 'warning' },
      user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'India', flag: cifIn },
      usage: {
        value: 74,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'warning',
      },
      payment: { name: 'Stripe', icon: cibCcStripe },
      activity: '1 hour ago',
    },
    {
      avatar: { src: avatar4, status: 'secondary' },
      user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'France', flag: cifFr },
      usage: {
        value: 98,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'danger',
      },
      payment: { name: 'PayPal', icon: cibCcPaypal },
      activity: 'Last month',
    },
    {
      avatar: { src: avatar5, status: 'success' },
      user: {
        name: 'Agapetus Tadeáš',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Spain', flag: cifEs },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'primary',
      },
      payment: { name: 'Google Wallet', icon: cibCcApplePay },
      activity: 'Last week',
    },
    {
      avatar: { src: avatar6, status: 'danger' },
      user: {
        name: 'Friderik Dávid',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Poland', flag: cifPl },
      usage: {
        value: 43,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Amex', icon: cibCcAmex },
      activity: 'Last week',
    },
  ]

  return (
    <>
      {/* <div>Tests: {JSON.stringify(getMonthsArray(new Date('2022-06-01')))}</div> */}
      {/* <div>Inputs: {data !== null ? JSON.stringify(data, null, 4) : 'Loading...'}</div> */}
      {/* <div>
        Use of Funds:{' '}
        {data !== null
          ? JSON.stringify(useOfFundsFirst18Months.pieChart(data), null, 4)
          : 'Loading...'}
      </div> */}
      {/* <div>
        Results:{' '}
        {data !== null
          ? JSON.stringify(
              ((props) => ({
                EBIT: valuation.EBIT(props),
                taxes: valuation.taxes(props),
                EBIAT: valuation.EBIAT(props),
                DAndA: valuation.DAndA(props),
                grossCashFlow: valuation.grossCashFlow(props),
                changeInWC: valuation.changeInWC(props),
                CAPEX: valuation.CAPEX(props),
                freeCashFlow: valuation.freeCashFlow(props),
              }))(data),
              null,
              4,
            )
          : 'Loading...'}
      </div> */}
      {/* <div>
        Results:{' '}
        {data !== null
          ? JSON.stringify(
              ((props) => ({
                balanceSheetAccounts: {
                  operatingCash: {
                    balance: WKCAPEX.balanceSheetAccounts.operatingCash.balance(props),
                    percentageOfRevenues:
                      WKCAPEX.balanceSheetAccounts.operatingCash.percentageOfRevenues(props),
                  },
                  accountsReceivable: {
                    ARFromRevenues: {
                      balance:
                        WKCAPEX.balanceSheetAccounts.accountsReceivable.ARFromRevenues.balance(
                          props,
                        ),
                      pendingIncomeTotalIncome:
                        WKCAPEX.balanceSheetAccounts.accountsReceivable.ARFromRevenues.pendingIncomeTotalIncome(
                          props,
                        ),
                    },
                    prepaidExpenses: {
                      balance:
                        WKCAPEX.balanceSheetAccounts.accountsReceivable.prepaidExpenses.balance(
                          props,
                        ),
                      COGSAccounts:
                        WKCAPEX.balanceSheetAccounts.accountsReceivable.prepaidExpenses.COGSAccounts(
                          props,
                        ),
                      prepaidDaysOutstanding:
                        WKCAPEX.balanceSheetAccounts.accountsReceivable.prepaidExpenses.prepaidDaysOutstanding(
                          props,
                        ),
                    },
                  },
                  accountsPayable: {
                    balance: WKCAPEX.balanceSheetAccounts.accountsPayable.balance(props),
                    APAsPercentageOfTotalCOGS:
                      WKCAPEX.balanceSheetAccounts.accountsPayable.APAsPercentageOfTotalCOGS(props),
                  },
                  assets: {
                    balance: WKCAPEX.balanceSheetAccounts.assets.balance(props),
                    apartmentOfficeFixings:
                      WKCAPEX.balanceSheetAccounts.assets.apartmentOfficeFixings(props),
                    officeFurniture: WKCAPEX.balanceSheetAccounts.assets.officeFurniture(props),
                    computers: WKCAPEX.balanceSheetAccounts.assets.computers(props),
                    telecomEquipment: WKCAPEX.balanceSheetAccounts.assets.telecomEquipment(props),
                    serversAndOtherTechInfrastructure:
                      WKCAPEX.balanceSheetAccounts.assets.serversAndOtherTechInfrastructure(props),
                    other: WKCAPEX.balanceSheetAccounts.assets.other(props),
                    CAPEX: WKCAPEX.balanceSheetAccounts.assets.CAPEX(props),
                    depreciation: WKCAPEX.balanceSheetAccounts.assets.depreciation(props),
                  },
                },
                workingCapital: {
                  changeInOperatingCash: WKCAPEX.workingCapital.changeInOperatingCash(props),
                  changeInAccountsReceivable:
                    WKCAPEX.workingCapital.changeInAccountsReceivable(props),
                  changeInAccountsPayable: WKCAPEX.workingCapital.changeInAccountsPayable(props),
                  totalWorkingCapital: WKCAPEX.workingCapital.totalWorkingCapital(props),
                },
                capitalExpenditure: {
                  byTypeOfAsset: {
                    apartmentOfficeFixings:
                      WKCAPEX.capitalExpenditure.byTypeOfAsset.apartmentOfficeFixings(props),
                    officeFurniture:
                      WKCAPEX.capitalExpenditure.byTypeOfAsset.officeFurniture(props),
                    computers: WKCAPEX.capitalExpenditure.byTypeOfAsset.computers(props),
                    telecomEquipment:
                      WKCAPEX.capitalExpenditure.byTypeOfAsset.telecomEquipment(props),
                    serversAndOtherTechInfrastructure:
                      WKCAPEX.capitalExpenditure.byTypeOfAsset.serversAndOtherTechInfrastructure(
                        props,
                      ),
                    other: WKCAPEX.capitalExpenditure.byTypeOfAsset.other(props),
                  },
                  totalCAPEX: WKCAPEX.capitalExpenditure.totalCAPEX(props),
                },
                depreciationAndAmortization: {
                  depreciation: {
                    apartmentOfficeFixings:
                      WKCAPEX.depreciationAndAmortization.depreciation.apartmentOfficeFixings(
                        props,
                      ),
                    officeFurniture:
                      WKCAPEX.depreciationAndAmortization.depreciation.officeFurniture(props),
                    computers: WKCAPEX.depreciationAndAmortization.depreciation.computers(props),
                    telecomEquipment:
                      WKCAPEX.depreciationAndAmortization.depreciation.telecomEquipment(props),
                    serversAndOtherTechInfrastructure:
                      WKCAPEX.depreciationAndAmortization.depreciation.serversAndOtherTechInfrastructure(
                        props,
                      ),
                    other: WKCAPEX.depreciationAndAmortization.depreciation.other(props),
                  },
                  total: WKCAPEX.depreciationAndAmortization.total(props),
                },
              }))(data),
              null,
              2,
            )
          : 'Loading...'}
      </div> */}
      {/* <WidgetsDropdown />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Traffic
              </h4>
              <div className="small text-medium-emphasis">January - July 2021</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton>
              <CButtonGroup className="float-end me-3">
                {['Day', 'Month', 'Year'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === 'Month'}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <CChartLine
            style={{ height: '300px', marginTop: '40px' }}
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
              datasets: [
                {
                  label: 'My First dataset',
                  backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                  borderColor: getStyle('--cui-info'),
                  pointHoverBackgroundColor: getStyle('--cui-info'),
                  borderWidth: 2,
                  data: [
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                  ],
                  fill: true,
                },
                {
                  label: 'My Second dataset',
                  backgroundColor: 'transparent',
                  borderColor: getStyle('--cui-success'),
                  pointHoverBackgroundColor: getStyle('--cui-success'),
                  borderWidth: 2,
                  data: [
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                  ],
                },
                {
                  label: 'My Third dataset',
                  backgroundColor: 'transparent',
                  borderColor: getStyle('--cui-danger'),
                  pointHoverBackgroundColor: getStyle('--cui-danger'),
                  borderWidth: 1,
                  borderDash: [8, 5],
                  data: [65, 65, 65, 65, 65, 65, 65],
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    drawOnChartArea: false,
                  },
                },
                y: {
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                    max: 250,
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3,
                },
              },
            }}
          />
        </CCardBody>
        <CCardFooter>
          <CRow xs={{ cols: 1 }} md={{ cols: 5 }} className="text-center">
            {progressExample.map((item, index) => (
              <CCol className="mb-sm-2 mb-0" key={index}>
                <div className="text-medium-emphasis">{item.title}</div>
                <strong>
                  {item.value} ({item.percent}%)
                </strong>
                <CProgress thin className="mt-2" color={item.color} value={item.percent} />
              </CCol>
            ))}
          </CRow>
        </CCardFooter>
      </CCard> */}

      {data ? (
        <CRow>
          <CCol xs={4}>
            <CCard className="mb-4">
              <CCardHeader>{data.company_name}</CCardHeader>
              <CCardBody>
                <h4>Charts {'&'} KPIs</h4>
                <p>June 7, 2022</p>
                <h3>Capital</h3>

                <CTable align="middle" className="mb-0 border" responsive>
                  <CTableBody>
                    <CTableRow>
                      <CTableDataCell>Capital Required</CTableDataCell>
                      <CTableDataCell className="text-center">
                        {formatMoney(chartsAndKPIs.capitalRequired(data), false, false)}
                      </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableDataCell>Months to reach profitability</CTableDataCell>
                      <CTableDataCell className="text-center">
                        {chartsAndKPIs.monthsToProfitability(data)}
                      </CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol xs={8}>
            <CCard className="mb-4">
              <CCardHeader>Monthly Revenue vs Expenses | 5-Year Projection</CCardHeader>
              <CCardBody>
                <CChartBar
                  data={{
                    labels: getMonthsArray(data.model_start_date).map(
                      (date) => `${monthNamesArray[date.getMonth()]}-${date.getFullYear()}`,
                    ),
                    datasets: [
                      {
                        label: 'Revenue',
                        data: chartsAndKPIs.pAndLBarChart.revenue(data),
                        backgroundColor: '#64D8C2',
                      },
                      {
                        label: 'COGS',
                        data: chartsAndKPIs.pAndLBarChart.COGS(data),
                        backgroundColor: '#FF506F',
                      },
                      {
                        label: 'SG&A',
                        data: chartsAndKPIs.pAndLBarChart.SGAndA(data),
                        backgroundColor: '#00B0F0',
                      },
                      {
                        label: 'CAPEX',
                        data: chartsAndKPIs.pAndLBarChart.CAPEX(data),
                        backgroundColor: '#F9BE61',
                      },
                    ],
                  }}
                  options={{
                    scales: {
                      x: {
                        stacked: true,
                      },
                      y: {
                        stacked: true,
                      },
                    },
                  }}
                  labels="months"
                />
              </CCardBody>
            </CCard>
          </CCol>
          <CCol xs={4}>
            <CCard className="mb-4">
              <CCardHeader>Use of Funds - Months 0 - 18</CCardHeader>
              <CCardBody>
                <CChartPie
                  data={{
                    labels: chartsAndKPIs.pieChart(data).labels,
                    datasets: [
                      {
                        data: chartsAndKPIs.pieChart(data).data,
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8064A2'],
                        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8064A2'],
                      },
                    ],
                  }}
                />
              </CCardBody>
            </CCard>
          </CCol>
          <CCol xs={8}>
            <CCard className="mb-4">
              <CCardHeader>Cash in the Bank | 5-Year Projection</CCardHeader>
              <CCardBody>
                <CChartLine
                  data={{
                    labels: getMonthsArray(data.model_start_date).map(
                      (date) => `${monthNamesArray[date.getMonth()]}-${date.getFullYear()}`,
                    ),
                    datasets: [
                      {
                        label: 'My First dataset',
                        backgroundColor: '#64D8C251',
                        borderColor: '#64D8C2',
                        pointBackgroundColor: '#64D8C2',
                        pointBorderColor: '#fff',
                        data: chartsAndKPIs.cashInTheBank(data),
                      },
                    ],
                  }}
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      ) : (
        'Loading...'
      )}

      {/* <WidgetsBrand withCharts />

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Traffic {' & '} Sales</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-medium-emphasis small">New Clients</div>
                        <div className="fs-5 fw-semibold">9,123</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Recurring Clients</div>
                        <div className="fs-5 fw-semibold">22,643</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />
                  {progressGroupExample1.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-prepend">
                        <span className="text-medium-emphasis small">{item.title}</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="info" value={item.value1} />
                        <CProgress thin color="danger" value={item.value2} />
                      </div>
                    </div>
                  ))}
                </CCol>

                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Pageviews</div>
                        <div className="fs-5 fw-semibold">78,623</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Organic</div>
                        <div className="fs-5 fw-semibold">49,123</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />

                  {progressGroupExample2.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">{item.value}%</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="warning" value={item.value} />
                      </div>
                    </div>
                  ))}

                  <div className="mb-5"></div>

                  {progressGroupExample3.map((item, index) => (
                    <div className="progress-group" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">
                          {item.value}{' '}
                          <span className="text-medium-emphasis small">({item.percent}%)</span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="success" value={item.percent} />
                      </div>
                    </div>
                  ))}
                </CCol>
              </CRow>

              <br />

              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell>User</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Country</CTableHeaderCell>
                    <CTableHeaderCell>Usage</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Payment Method</CTableHeaderCell>
                    <CTableHeaderCell>Activity</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableExample.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.user.name}</div>
                        <div className="small text-medium-emphasis">
                          <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                          {item.user.registered}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.country.flag} title={item.country.name} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="clearfix">
                          <div className="float-start">
                            <strong>{item.usage.value}%</strong>
                          </div>
                          <div className="float-end">
                            <small className="text-medium-emphasis">{item.usage.period}</small>
                          </div>
                        </div>
                        <CProgress thin color={item.usage.color} value={item.usage.value} />
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.payment.icon} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="small text-medium-emphasis">Last login</div>
                        <strong>{item.activity}</strong>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow> */}
    </>
  )
}

export default Dashboard
