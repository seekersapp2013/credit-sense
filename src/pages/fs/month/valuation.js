import React, { useEffect, useState } from 'react'
import { appwrite, objectifySubStrings } from 'src/functions/appwrite'
import { MonthsTable } from 'src/components/MonthsTable'
import { runSubFunctions } from 'src/components/Utils/runSubFunctions'
import { valuation } from 'src/functions/calculations/FSMonth/valuation'
import { FSMonthValuationContent } from 'src/components/FinancialStatement/month/valuation/ValuationContent'
import GeneralSubCharts from 'src/components/GeneralSubCharts'
import { annualValuation } from 'src/functions/calculations/FSAnnual/valuation'
import Loader from 'src/components/Loader'
import { useRouter } from 'next/router'

const FSMonthValuation = () => {
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
                name: 'EBIT',
                color: 'success',
                data: runSubFunctions(annualValuation, data).EBIT,
              },
              {
                name: 'Gross cash flow',
                color: 'danger',
                data: runSubFunctions(annualValuation, data).grossCashFlow,
              },
              {
                name: 'Free cash flow',
                color: 'info',
                data: runSubFunctions(annualValuation, data).freeCashFlow,
              },
              {
                name: 'Discounted cash flow',
                color: 'warning',
                data: runSubFunctions(annualValuation, data).discountedCashFlow,
              },
            ]}
            props={data}
          />
          <MonthsTable
            title="Valuation (FS Month)"
            data={data}
            pageData={runSubFunctions(valuation, data)}
            dataComponents={[FSMonthValuationContent]}
          />
        </>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default FSMonthValuation
