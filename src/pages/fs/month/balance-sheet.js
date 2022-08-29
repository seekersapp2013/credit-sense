import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { appwrite, objectifySubStrings } from 'src/functions/appwrite'
import { MonthsTable } from 'src/components/MonthsTable'
import { runSubFunctions } from 'src/components/Utils/runSubFunctions'
import { balanceSheet } from 'src/functions/calculations/FSMonth/balanceSheet'
import { FSMonthAssets } from 'src/components/FinancialStatement/month/balance-sheet/Assets'
import { FSMonthLiabilities } from 'src/components/FinancialStatement/month/balance-sheet/Liabilities'
import GeneralSubCharts from 'src/components/GeneralSubCharts'
import { annualBalanceSheet } from 'src/functions/calculations/FSAnnual/balanceSheet'
import Loader from 'src/components/Loader'

const FSMonthBalanceSheet = () => {
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
          <MonthsTable
            title="Balance Sheet (FS Month)"
            data={data}
            pageData={runSubFunctions(balanceSheet, data)}
            dataComponents={[FSMonthAssets, FSMonthLiabilities]}
          />
        </>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default FSMonthBalanceSheet
