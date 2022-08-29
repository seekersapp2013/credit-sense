import React from 'react'
import { CPagination, CPaginationItem } from '@coreui/react'
// import styles from './Pagination.module.scss'
import usePagination from './usePagination'

// eslint-disable-next-line react/prop-types
const Pagination = ({ onPageChange, totalCount, siblingCount = 1, currentPage, pageSize }) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  let lastPage = paginationRange[paginationRange.length - 1]

  return (
    <CPagination align="end" aria-label="Page navigation example">
      <CPaginationItem onClick={onPrevious} disabled={currentPage === 1}>
        Previous
      </CPaginationItem>
      {paginationRange.map((pageNumber, i) => {
        // If the pageItem is a DOT, render the "DOTS" unicode character
        if (pageNumber === 'DOTS') {
          return <span key={`s${i}`}>&#8230;</span>
        }

        return (
          <CPaginationItem
            onClick={() => onPageChange(pageNumber)}
            key={pageNumber}
            active={pageNumber === currentPage}
          >
            {pageNumber}
          </CPaginationItem>
        )
      })}
      <CPaginationItem onClick={onNext} disabled={currentPage === lastPage}>
        Next
      </CPaginationItem>
    </CPagination>
  )
}

export default Pagination
