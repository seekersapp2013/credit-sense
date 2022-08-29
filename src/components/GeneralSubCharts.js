import React from 'react'
import PropTypes from 'prop-types'
import { CRow, CCol, CWidgetStatsA } from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop } from '@coreui/icons'
import { formatMoney } from 'src/components/Utils/formatMoney'
import { shortMoney } from 'src/components/Utils/shortMoney'

const StatsData = ({ data }) => (
  <>
    {data.stats.value}{' '}
    {data.stats.percentage ? (
      <span className="fs-6 fw-normal">
        {'('}
        {data.stats.percentage}%
        {data.stats.icon ? (
          <>
            {' '}
            <CIcon icon={data.stats.icon} />
          </>
        ) : (
          ''
        )}
        {')'}
      </span>
    ) : (
      ''
    )}
  </>
)

StatsData.propTypes = {
  data: PropTypes.object,
}

const GeneralSubCharts = ({ data, year, props: { model_start_date } }) => {
  const dataLength = 7
  const labels = Array(7)
    .fill(new Date(model_start_date).getFullYear())
    .map((year, i) => (year + i).toString())

  // const dataLength = year ? 7 : 84
  // const labels = year
  //   ? Array(7)
  //       .fill(new Date(model_start_date).getFullYear())
  //       .map((year, i) => (year + i).toString())
  //   : getMonthsArray(model_start_date).map(
  //       (date) => `${monthNamesArray[date.getMonth()]}-${date.getFullYear()}`,
  //     )

  const chartData = data.map((data) => {
    const chartData = data.data.slice(0, dataLength).map((data) => Math.round(data))

    let percentage = (
      ((chartData[chartData.length - 1] - chartData[chartData.length - 2]) /
        chartData[chartData.length - 1]) *
      100
    ).toFixed(2)

    percentage = isNaN(percentage) ? 0 : percentage

    let val = chartData[chartData.length - 1]

    const stats = {
      value: shortMoney(val),
      percentage,
      icon: percentage > 0 ? cilArrowTop : percentage < 0 ? cilArrowBottom : null,
    }

    return { data: chartData, stats }
  })

  return (
    <CRow>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color={data[0].color}
          value={<StatsData data={chartData[0]} />}
          title={data[0].name}
          // action={
          //   <CDropdown alignment="end">
          //     <CDropdownToggle color="transparent" caret={false} className="p-0">
          //       <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
          //     </CDropdownToggle>
          //     <CDropdownMenu>
          //       <CDropdownItem>Action</CDropdownItem>
          //       <CDropdownItem>Another action</CDropdownItem>
          //       <CDropdownItem>Something else here...</CDropdownItem>
          //       <CDropdownItem disabled>Disabled action</CDropdownItem>
          //     </CDropdownMenu>
          //   </CDropdown>
          // }
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels,
                datasets: [
                  {
                    label: data[0].name,
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle(`--cui-${data[0].color}`),
                    data: chartData[0].data,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    // min: 30,
                    // max: 89,
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                    tension: 0.4,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color={data[1].color}
          value={<StatsData data={chartData[1]} />}
          title={data[1].name}
          // action={
          //   <CDropdown alignment="end">
          //     <CDropdownToggle color="transparent" caret={false} className="p-0">
          //       <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
          //     </CDropdownToggle>
          //     <CDropdownMenu>
          //       <CDropdownItem>Action</CDropdownItem>
          //       <CDropdownItem>Another action</CDropdownItem>
          //       <CDropdownItem>Something else here...</CDropdownItem>
          //       <CDropdownItem disabled>Disabled action</CDropdownItem>
          //     </CDropdownMenu>
          //   </CDropdown>
          // }
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels,
                datasets: [
                  {
                    label: data[1].name,
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle(`--cui-${data[1].color}`),
                    data: data[1].data.slice(0, dataLength).map((data) => Math.round(data)),
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    // min: -9,
                    // max: 39,
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color={data[2].color}
          value={<StatsData data={chartData[2]} />}
          title={data[2].name}
          // action={
          //   <CDropdown alignment="end">
          //     <CDropdownToggle color="transparent" caret={false} className="p-0">
          //       <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
          //     </CDropdownToggle>
          //     <CDropdownMenu>
          //       <CDropdownItem>Action</CDropdownItem>
          //       <CDropdownItem>Another action</CDropdownItem>
          //       <CDropdownItem>Something else here...</CDropdownItem>
          //       <CDropdownItem disabled>Disabled action</CDropdownItem>
          //     </CDropdownMenu>
          //   </CDropdown>
          // }
          chart={
            <CChartLine
              className="mt-3"
              style={{ height: '70px' }}
              data={{
                labels,
                datasets: [
                  {
                    label: data[2].name,
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: data[2].data.slice(0, dataLength).map((data) => Math.round(data)),
                    fill: true,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    display: false,
                  },
                  y: {
                    display: false,
                  },
                },
                elements: {
                  line: {
                    borderWidth: 2,
                    tension: 0.4,
                  },
                  point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color={data[3].color}
          value={<StatsData data={chartData[3]} />}
          title={data[3].name}
          // action={
          //   <CDropdown alignment="end">
          //     <CDropdownToggle color="transparent" caret={false} className="p-0">
          //       <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
          //     </CDropdownToggle>
          //     <CDropdownMenu>
          //       <CDropdownItem>Action</CDropdownItem>
          //       <CDropdownItem>Another action</CDropdownItem>
          //       <CDropdownItem>Something else here...</CDropdownItem>
          //       <CDropdownItem disabled>Disabled action</CDropdownItem>
          //     </CDropdownMenu>
          //   </CDropdown>
          // }
          chart={
            <CChartBar
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels,
                datasets: [
                  {
                    label: data[3].name,
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: data[3].data.slice(0, dataLength).map((data) => Math.round(data)),
                    barPercentage: 0.6,
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
                      display: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    grid: {
                      display: false,
                      drawBorder: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
              }}
            />
          }
        />
      </CCol>
    </CRow>
  )
}

GeneralSubCharts.propTypes = {
  data: PropTypes.array,
  year: PropTypes.bool,
  props: PropTypes.object,
}

export default GeneralSubCharts
