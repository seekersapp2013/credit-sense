import React, { useEffect, useState } from 'react'
import { appwrite, objectifySubStrings } from 'src/functions/appwrite'
import { runSubFunctions } from 'src/components/Utils/runSubFunctions'
import { annualCashFlow } from 'src/functions/calculations/FSAnnual/cashFlow'
import { FSAnnualCashFlowContent } from './cash-flow/CashFlowContent'
import { YearsTable } from 'src/components/YearsTable'
import Loader from 'src/components/Loader'
import GeneralSubCharts from 'src/components/GeneralSubCharts'

const FSAnnualCashFlow = () => {
  const router = useRouter()

  const [data, setData] = useState(null)

  useEffect(() => {
    const getAccountInfo = async () => {
      const res = await appwrite.getAccount()

      try {
        const user = await appwrite.fetchUser(res.$id)
        console.log('User', objectifySubStrings(user))
        setData({ ...objectifySubStrings(user), user: res.$id })
      } catch (error) {
        console.log(error)
        router.push('/profile')
      }
    }
    getAccountInfo()
  }, [navigate])

  return (
    <>
      {data ? (
        <>
          <GeneralSubCharts
            data={[
              {
                name: 'Initial cash balance',
                color: 'success',
                data: runSubFunctions(annualCashFlow, data).initialCashBalance,
              },
              {
                name: 'Operating change in cash',
                color: 'danger',
                data: runSubFunctions(annualCashFlow, data).operatingChangeInCash,
              },
              {
                name: 'Net Income',
                color: 'info',
                data: runSubFunctions(annualCashFlow, data).netIncome,
              },
              {
                name: 'Ending cash balance',
                color: 'warning',
                data: runSubFunctions(annualCashFlow, data).endingCashBalance,
              },
            ]}
            props={data}
          />
          <YearsTable
            title="Cash Flow (FS Annual)"
            data={data}
            pageData={runSubFunctions(annualCashFlow, data)}
            dataComponents={[FSAnnualCashFlowContent]}
          />
        </>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default FSAnnualCashFlow
