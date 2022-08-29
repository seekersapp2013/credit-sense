import React, { useEffect, useState } from 'react'
import { appwrite, objectifySubStrings } from 'src/functions/appwrite'
import { MonthsTable } from 'src/components/MonthsTable'
import { runSubFunctions } from 'src/components/Utils/runSubFunctions'
import { cashFlow } from 'src/functions/calculations/FSMonth/cashFlow'
import { FSMonthCashFlowContent } from 'src/components/FinancialStatement/month/cash-flow/CashFlowContent'
import GeneralSubCharts from 'src/components/GeneralSubCharts'
import { annualCashFlow } from 'src/functions/calculations/FSAnnual/cashFlow'
import Loader from 'src/components/Loader'
import { useRouter } from 'next/router'

const FSMonthCashFlow = () => {
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
  }, [])

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
          <MonthsTable
            title="Cash Flow (FS Month)"
            data={data}
            pageData={runSubFunctions(cashFlow, data)}
            dataComponents={[FSMonthCashFlowContent]}
          />
        </>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default FSMonthCashFlow
