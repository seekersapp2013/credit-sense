import React, { useEffect, useState } from 'react'
import { appwrite, objectifySubStrings } from 'src/functions/appwrite'
import { FSAnnualCOGS } from './income-statement/COGS'
import { FSAnnualRevenue } from './income-statement/Revenue'
import { FSAnnualGrosses } from './income-statement/Grosses'
import { FSAnnualSGAndA } from './income-statement/SGAndA'
import { FSAnnualEBITDA } from './income-statement/EBITDA'
import { FSAnnualEBIT } from './income-statement/EBIT'
import { FSAnnualIncomes } from './income-statement/Incomes'
import { annualIncomeStatement } from 'src/functions/calculations/FSAnnual/incomeStatement'
import { runSubFunctions } from 'src/components/Utils/runSubFunctions'
import { YearsTable } from 'src/components/YearsTable'
import GeneralSubCharts from 'src/components/GeneralSubCharts'
import Loader from 'src/components/Loader'

const FSAnnualIncomeStatement = () => {

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
                color: 'primary',
                data: runSubFunctions(annualIncomeStatement, data).netIncome,
              },
            ]}
            props={data}
          />
          <YearsTable
            title="Income Statement (FS Annual)"
            data={data}
            pageData={runSubFunctions(annualIncomeStatement, data)}
            dataComponents={[
              FSAnnualRevenue,
              FSAnnualCOGS,
              FSAnnualGrosses,
              FSAnnualSGAndA,
              FSAnnualEBITDA,
              FSAnnualEBIT,
              FSAnnualIncomes,
            ]}
          />
        </>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default FSAnnualIncomeStatement
