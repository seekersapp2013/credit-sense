import { CContainer, CSpinner } from '@coreui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Suspense } from 'react'
import { appwrite, objectifySubStrings, stringifySubObjects } from 'src/functions/appwrite'
import planProfiles from 'src/components/Plans/planProfiles'
import { debitWallet } from 'src/components/WalletCards'
import { AppSidebar, AppFooter, AppHeader } from 'src/components/index'

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          {/* <AppContent account={account} plan={plan} /> */}
          <CContainer lg>
            <Suspense fallback={<CSpinner color="primary" />}>
              {children}
              {/* <Routes>
                {routes.map((route, idx) => {
                  return (
                    route.element && (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        element={<route.element />}
                      />
                    )
                  )
                })}
                <Route path="/" element={<Navigate to="dashboard" replace />} />
              </Routes> */}
            </Suspense>
          </CContainer>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
