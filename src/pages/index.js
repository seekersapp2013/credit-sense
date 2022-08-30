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
import { getMonthsArray } from 'src/functions/calculations'
import { formatMoney } from 'src/components/Utils/formatMoney'
import { monthNamesArray } from 'src/components/monthNamesArray'
import Loader from 'src/components/Loader'
import WalletCards from 'src/components/WalletCards'
import { useRouter } from 'next/router'
import { api } from 'src/functions/api'

const Dashboard = () => {
  const router = useRouter()

  // const [loading, setLoading] = useState(true)

  // const [profile, setProfile] = useState(null)
  // const [data, setData] = useState(null)

  router.replace("/dashboard");

  return <div>Loading...</div>

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    api
      .get('/data/charts-and-kpis')
      .then((result) => {
        if (result.success) {
          const {
            data: { data, profile },
          } = result

          console.log('profile ', profile)
          console.log('data ', data)

          setProfile(profile)
          setData(data)
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <WalletCards />
      {/* <div>{JSON.stringify(data.team.filter(({ category }) => category === 'Growth'))}</div> */}
      {loading ? (
        <Loader />
      ) : data && profile ? (
        <CRow>
          <CCol sm={12} xl={4}>
            <CCard className="mb-4">
              <CCardHeader>{profile.company_name}</CCardHeader>
              <CCardBody>
                <h4>Charts {'&'} KPIs</h4>
                <p>June 7, 2022</p>
                <h3>Capital</h3>

                <CTable align="middle" className="mb-0 border" responsive>
                  <CTableBody>
                    <CTableRow>
                      <CTableDataCell>Capital Required</CTableDataCell>
                      <CTableDataCell className="text-center">
                        {formatMoney(data.capitalRequired, false, false)}
                      </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableDataCell>Months to reach profitability</CTableDataCell>
                      <CTableDataCell className="text-center">
                        {data.monthsToProfitability}
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
                    labels: getMonthsArray(profile.model_start_date).map(
                      (date) => `${monthNamesArray[date.getMonth()]}-${date.getFullYear()}`,
                    ),
                    datasets: [
                      {
                        label: 'Revenue',
                        data: data.pAndLBarChart.revenue,
                        backgroundColor: '#64D8C2',
                      },
                      {
                        label: 'COGS',
                        data: data.pAndLBarChart.COGS,
                        backgroundColor: '#FF506F',
                      },
                      {
                        label: 'SG&A',
                        data: data.pAndLBarChart.SGAndA,
                        backgroundColor: '#00B0F0',
                      },
                      {
                        label: 'CAPEX',
                        data: data.pAndLBarChart.CAPEX,
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
                    labels: data.pieChart.labels,
                    datasets: [
                      {
                        data: data.pieChart.data,
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
                    labels: getMonthsArray(profile.model_start_date).map(
                      (date) => `${monthNamesArray[date.getMonth()]}-${date.getFullYear()}`,
                    ),
                    datasets: [
                      {
                        label: 'Cash in the Bank',
                        backgroundColor: '#64D8C251',
                        borderColor: '#64D8C2',
                        pointBackgroundColor: '#64D8C2',
                        pointBorderColor: '#fff',
                        data: data.cashInTheBank,
                      },
                    ],
                  }}
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      ) : (
       
        <div>An Error Occured</div>

      )}
    </>
  )
}

export default Dashboard
