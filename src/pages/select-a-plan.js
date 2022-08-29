import { CCol, CContainer, CRow } from '@coreui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { AppFooter, AppHeader } from 'src/components'
import { appwrite, objectifySubStrings, stringifySubObjects } from 'src/functions/appwrite'
import planProfiles from 'src/components/Plans/planProfiles'
import Plans from 'src/components/Plans/Plans'
import { debitWallet } from 'src/components/WalletCards'

const SelectPlan = () => {
  const router = useRouter()

  const [currentPlan, setCurrentPlan] = useState(null)

  const getPlanInfo = async () => {
    try {
      const plan = await appwrite.fetchPlan()
      if (typeof plan.index === 'number') {
        setCurrentPlan(plan.index)
      } else {
        setCurrentPlan(-1)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => getPlanInfo(), [])

  const updatePlan = async ({ index }) => {
    try {
      const debit = await debitWallet('USD', planProfiles[index].price.USD)

      if (debit === true) {
        try {
          const plan = await appwrite.createPlan(
            stringifySubObjects({
              user: JSON.parse(localStorage.getItem('user')).$id,
              index,
              plan_id: '',
              subscription_date: Date.now(),
              status: 'PAID',
            }),
          )

          console.log('New Plan: ', objectifySubStrings(plan))

          router.push('/dashboard')
        } catch (error) {
          console.log(error)
        }
      } else {
        alert(debit)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div>
        {/* <AppSidebar /> */}
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3">
            <CContainer>
              <CRow>
                <CCol xl={12}>
                  <Plans action={updatePlan} current={currentPlan < 0 ? false : currentPlan} />
                </CCol>
              </CRow>
            </CContainer>
          </div>
          <AppFooter />
        </div>
      </div>
    </>
  )
}

SelectPlan.noLayout = true

export default SelectPlan
