import React, { useEffect, useState } from 'react'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableRow,
} from '@coreui/react'
import { CChartBar, CChartLine, CChartPie } from '@coreui/react-chartjs'
import { appwrite, objectifySubStrings } from 'src/functions/appwrite'
import { getMonthsArray, totalCols } from 'src/functions/calculations'
import { formatMoney } from 'src/components/Utils/formatMoney'
import { chartsAndKPIs } from 'src/functions/calculations/Charts'
import { monthNamesArray } from '../../components/monthNamesArray'
import Loader from '../../components/Loader'
import WalletCards from '../../components/WalletCards'
import { payroll, totalPayroll } from 'src/functions/calculations/SG&A/payroll'
import {
  getDataSetForPieChart,
  pieChart,
  SGAndA,
  total,
} from 'src/functions/calculations/Charts/useOfFundsFor18Months'
import { getCOGSTotals } from 'src/functions/calculations/COGS'
import { totalAdvisoryAndProf } from 'src/functions/calculations/SG&A/advisoryAndProfServices'
import { totalRentExpenses } from 'src/functions/calculations/SG&A/rent'
import { totalTechSupportAndServicesExpenses } from 'src/functions/calculations/SG&A/techSupportAndServices'
import { totalInsuranceExpenses } from 'src/functions/calculations/SG&A/insurance'
import { totalUtilitiesExpenses } from 'src/functions/calculations/SG&A/utilities'
import { totalOtherExpenses } from 'src/functions/calculations/SG&A/otherExpenses'
import { totalMarketingAndGrowth } from 'src/functions/calculations/SG&A/marketingAndGrowth'

const Dashboard = () => {
  const router = useRouter()

  const [account, setAccount] = useState(null)
  const [plan, setPlan] = useState(null)
  const [data, setData] = useState(null)

  const getAccountInfo = async () => {
    const res = await appwrite.getAccount()

    setAccount(res)

    console.log('Account: ', res)

    try {
      const user = await appwrite.fetchUser(res.$id)
      console.log('User', objectifySubStrings(user))
      setData({ ...objectifySubStrings(user), user: res.$id })
    } catch (error) {
      console.log(error)
      router.push('/profile')
    }

    try {
      const plan = await appwrite.fetchPlan()
      console.log('Plan', objectifySubStrings(plan))
      setPlan(objectifySubStrings(plan))
    } catch (error) {
      console.log(error)
      router.push('/select-a-plan')
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getAccountInfo(), [])

  if (!account || !plan || !data) {
    return <Loader />
  }

  return (
    <>
      <WalletCards account={account} plan={plan} />
      {/* <div>{JSON.stringify(data.team.filter(({ category }) => category === 'Growth'))}</div> */}
      {data ? (
        <CRow>
          <CCol sm={12} xl={4}>
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
          <CCol sm={12} xl={8}>
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
          <CCol sm={12} xl={4}>
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
          <CCol sm={12} xl={8}>
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
                        label: 'Cash in the Bank',
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
        <Loader />
      )}
    </>
  )
}

export default Dashboard
