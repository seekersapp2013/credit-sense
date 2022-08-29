import React, { useEffect, useState } from 'react'
import { appwrite, objectifySubStrings } from 'src/functions/appwrite'
// import { FSMonthCOGS } from 'src/components/FinancialStatement/month/income-statement/COGS'
import { FSMonthCOGS } from 'src/components/FinancialStatement/month/income-statement/COGS'
import { FSMonthRevenue } from 'src/components/FinancialStatement/month/income-statement/Revenue'
import { FSMonthGrosses } from 'src/components/FinancialStatement/month/income-statement/Grosses'
import { FSMonthSGAndA } from 'src/components/FinancialStatement/month/income-statement/SGAndA'
import { FSMonthEBITDA } from 'src/components/FinancialStatement/month/income-statement/EBITDA'
import { FSMonthEBIT } from 'src/components/FinancialStatement/month/income-statement/EBIT'
import { FSMonthIncomes } from 'src/components/FinancialStatement/month/income-statement/Incomes'
import { incomeStatement } from 'src/functions/calculations/FSMonth/incomeStatement'
import { annualIncomeStatement } from 'src/functions/calculations/FSAnnual/incomeStatement'
import { MonthsTable } from 'src/components/MonthsTable'
import { runSubFunctions } from 'src/components/Utils/runSubFunctions'
import GeneralSubCharts from 'src/components/GeneralSubCharts'
import Loader from 'src/components/Loader'
import { useRouter } from 'next/router'

const FSMonthIncomeStatement = () => {
  const router = useRouter()

  const [data, setData] = useState(null)

  useEffect(() => {
    const getAccountInfo = async () => {
      const res = await appwrite.getAccount()

      try {
        const user = await appwrite.fetchUser(res.$id)
        console.log('User', objectifySubStrings(user))
        setData({ ...objectifySubStrings(user), user: res.$id })
        console.log(
          runSubFunctions(annualIncomeStatement, { ...objectifySubStrings(user), user: res.$id })
            .consolidatedRevenue.total,
        )
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
                name: 'Revenue',
                color: 'success',
                data: runSubFunctions(annualIncomeStatement, data).consolidatedRevenue.total,
              },
              {
                name: 'COGS',
                color: 'danger',
                data: runSubFunctions(annualIncomeStatement, data).consolidatedCOGS.total,
              },
              {
                name: 'SG&A',
                color: 'info',
                data: runSubFunctions(annualIncomeStatement, data).consolidatedSGAandA.total,
              },
              {
                name: 'Net Income',
                color: 'warning',
                data: runSubFunctions(annualIncomeStatement, data).netIncome,
              },
            ]}
            props={data}
          />
          <MonthsTable
            title="Income Statement (FS Month)"
            data={data}
            pageData={runSubFunctions(incomeStatement, data)}
            dataComponents={[
              FSMonthRevenue,
              FSMonthCOGS,
              FSMonthGrosses,
              FSMonthSGAndA,
              FSMonthEBITDA,
              FSMonthEBIT,
              FSMonthIncomes,
            ]}
          />
        </>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default FSMonthIncomeStatement
