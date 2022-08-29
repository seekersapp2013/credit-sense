import React from 'react'
import { CSpinner } from '@coreui/react'

const Loader = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '75vh',
        width: '100%',
      }}
    >
      <CSpinner color="primary" />
    </div>
  )
}

export default Loader
