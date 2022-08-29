import React, { useEffect, useState } from 'react'
import { appwrite, objectifySubStrings } from 'src/functions/appwrite'
import { runSubFunctions } from 'src/components/Utils/runSubFunctions'
import { annualValuation } from 'src/functions/calculations/FSAnnual/valuation'
import { FSAnnualValuationContent } from './valuation/ValuationContent'
import { YearsTable } from 'src/components/YearsTable'
import Loader from 'src/components/Loader'
import GeneralSubCharts from 'src/components/GeneralSubCharts'
import { useRouter } from 'next/router'

const FSAnnualValuation = () => {
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
          <YearsTable
            title="Valuation (FS Annual)"
            data={data}
            pageData={runSubFunctions(annualValuation, data)}
            dataComponents={[FSAnnualValuationContent]}
          />
        </>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default FSAnnualValuation
