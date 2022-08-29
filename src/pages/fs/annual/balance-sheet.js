import React, { useEffect, useState } from 'react'
import { appwrite, objectifySubStrings } from 'src/functions/appwrite'
import { runSubFunctions } from 'src/components/Utils/runSubFunctions'
import { annualBalanceSheet } from 'src/functions/calculations/FSAnnual/balanceSheet'
import { FSAnnualAssets } from 'src/components/FinancialStatement/annual/balance-sheet/Assets'
import { FSAnnualLiabilities } from 'src/components/FinancialStatement/annual/balance-sheet/Liabilities'
import { YearsTable } from 'src/components/YearsTable'
import Loader from 'src/components/Loader'
import GeneralSubCharts from 'src/components/GeneralSubCharts'
import { useRouter } from 'next/router'

const FSAnnualBalanceSheet = () => {
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
                name: 'Assets',
                color: 'success',
                data: runSubFunctions(annualBalanceSheet, data).totalAssets,
              },
              {
                name: 'Liabilities',
                color: 'danger',
                data: runSubFunctions(annualBalanceSheet, data).totalLiabilities,
              },
              {
                name: 'Equity',
                color: 'info',
                data: runSubFunctions(annualBalanceSheet, data).totalEquity,
              },
              {
                name: 'Liabilities and Equity',
                color: 'warning',
                data: runSubFunctions(annualBalanceSheet, data).totalLiabilitiesAndEquity,
              },
            ]}
            props={data}
          />

          <YearsTable
            title="Balance Sheet (FS Annual)"
            data={data}
            pageData={runSubFunctions(annualBalanceSheet, data)}
            dataComponents={[FSAnnualAssets, FSAnnualLiabilities]}
          />
        </>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default FSAnnualBalanceSheet
