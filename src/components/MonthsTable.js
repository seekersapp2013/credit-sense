import React, { useEffect, useState } from 'react'

import styles from './styles.module.scss'

import PropTypes from 'prop-types'

import {
  CCard,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { getMonthsArray } from 'src/functions/calculations'
import { Pagination } from 'src/components/Pagination'
import { monthNamesArray } from './monthNamesArray'
import { TableSection } from './TableSection'
import Loader from './Loader'

export const MonthsTable = ({ title, data, pageData, dataComponents }) => {
  const [currentPage, setCurrentPage] = useState(1)

  const [firstPageIndex, setFirstPageIndex] = useState(0)

  const [lastPageIndex, setLastPageIndex] = useState(0)

  let PageSize = 6

  const [currentMonths, setCurrentMonths] = useState([])

  useEffect(() => {
    setFirstPageIndex((currentPage - 1) * PageSize)
    setLastPageIndex(firstPageIndex + PageSize)
  }, [PageSize, currentPage, firstPageIndex])

  useEffect(() => {
    setCurrentMonths(getMonthsArray(data.model_start_date).slice(firstPageIndex, lastPageIndex))
  }, [data, firstPageIndex, lastPageIndex])

  return (
    <>
      {pageData ? (
        <>
          <CCard className="mb-4">
            <CCardHeader>
              <CRow>
                <CCol sm={12} md={5}>
                  <h4 id="traffic" className="card-title mb-0">
                    {title}
                  </h4>
                  {currentMonths.length ? (
                    <div className="small text-medium-emphasis">
                      {monthNamesArray[currentMonths[0].getMonth()]} -{' '}
                      {monthNamesArray[currentMonths[5].getMonth()]}{' '}
                      {currentMonths[0].getFullYear()}
                    </div>
                  ) : (
                    ''
                  )}
                </CCol>
                <CCol
                  sm={12}
                  md={7}
                  style={{
                    display: 'inline-grid',
                    overflow: 'auto',
                  }}
                  className="pt-3"
                >
                  <Pagination
                    currentPage={currentPage}
                    totalCount={84}
                    pageSize={PageSize}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                </CCol>
              </CRow>
            </CCardHeader>
            <CTable responsive striped className={styles.monthstable}>
              <CTableHead color="dark">
                <CTableRow>
                  <CTableHeaderCell scope="col" rowSpan={2} colSpan={2}></CTableHeaderCell>
                  {getMonthsArray(data.model_start_date)
                    .slice(firstPageIndex, lastPageIndex)
                    .map((date, i) => {
                      return (
                        <CTableHeaderCell scope="col" key={i}>
                          {monthNamesArray[date.getMonth()]}-{date.getFullYear()}
                        </CTableHeaderCell>
                      )
                    })}
                </CTableRow>
                <CTableRow>
                  {Array(84)
                    .fill(0)
                    .slice(firstPageIndex, lastPageIndex)
                    .map((data, i) => (
                      <CTableHeaderCell scope="col" key={i}>
                        Month {firstPageIndex + i + 1}
                      </CTableHeaderCell>
                    ))}
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {dataComponents.map((Comp, i) => (
                  <TableSection
                    key={i}
                    Comp={Comp}
                    data={pageData}
                    firstPageIndex={firstPageIndex}
                    lastPageIndex={lastPageIndex}
                    right={styles.right}
                    currency={data.currency}
                  />
                ))}
              </CTableBody>
            </CTable>
            <CCardFooter>
              <CRow>
                <CCol
                  sm={12}
                  style={{
                    display: 'inline-grid',
                    overflow: 'auto',
                  }}
                  className="pt-2"
                >
                  <Pagination
                    currentPage={currentPage}
                    totalCount={84}
                    pageSize={PageSize}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                </CCol>
              </CRow>
            </CCardFooter>
          </CCard>
        </>
      ) : (
        <Loader />
      )}
    </>
  )
}

MonthsTable.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.object,
  pageData: PropTypes.object,
  dataComponents: PropTypes.array,
}
