import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://landing.grader.ng/" target="_blank" rel="noopener noreferrer">
          Credit Sense
        </a>
        <span className="ms-1">&copy; 2022 Grader Technologies.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://grader.ng/" target="_blank" rel="noopener noreferrer">
          Grader Technologies
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
