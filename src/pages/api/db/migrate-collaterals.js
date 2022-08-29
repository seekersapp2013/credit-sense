import { Query } from 'node-appwrite'
import { account, collateralsCollectionID, databases } from 'src/backend/appwrite'
import { objectifySubStrings, stringifySubObjects } from 'src/functions/appwrite'

// $id: '62f1d41e76ca8f418ee9',
// 16.63
// 7.39
// 3.05

const collaterals = [
  {
    investor: 'Berkshire Hathaway, Inc.',
    type: 'Real Estate',
    value: 5558000,
    interest: 8,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'JP Morgan Chase & Co',
    type: 'Equipment',
    value: 4335000,
    interest: 11,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'Bank of America',
    type: 'Inventory',
    value: 3067000,
    interest: 4.5,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'Industrial and Commercial Bank of China (ICBC)',
    type: 'Invoice',
    value: 2909000,
    interest: 12,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'China Construction Bank',
    type: 'Blanket Lien',
    value: 2184000,
    interest: 14,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'Wells Fargo & Co',
    type: 'Cash',
    value: 2034000,
    interest: 16.5,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'Agricultural Bank of China',
    type: 'Investment',
    value: 1788000,
    interest: 7.5,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'Citigroup Inc.',
    type: 'Consumer Goods',
    value: 1715000,
    interest: 6.5,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'HSBC Holdings',
    type: 'Property',
    value: 1575000,
    interest: 9.5,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'Bank of China',
    type: 'Farm Products',
    value: 1466000,
    interest: 13,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'China Merchants Bank',
    type: 'Vehicle',
    value: 1377000,
    interest: 15,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'Royal Bank of Canada',
    type: 'Other',
    value: 1166000,
    interest: 10.5,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'HDFC Bank Limited',
    type: 'Real Estate',
    value: 5558000,
    interest: 14.5,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'American Express',
    type: 'Equipment',
    value: 1060800,
    interest: 3.5,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'Toronto-Dominion Bank',
    type: 'Inventory',
    value: 1033000,
    interest: 6.5,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'Commonwealth Bank of Australia',
    type: 'Invoice',
    value: 1016000,
    interest: 6,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'Morgan Stanley',
    type: 'Blanket Lien',
    value: 930900,
    interest: 9,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'Sberbank of Russia',
    type: 'Cash',
    value: 928200,
    interest: 13.5,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'Goldman Sachs Group',
    type: 'Investment',
    value: 919700,
    interest: 16.5,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'BlackRock',
    type: 'Consumer Goods',
    value: 863000,
    interest: 8.6,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'US Bancorp',
    type: 'Property',
    value: 853000,
    interest: 11.8,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'Itaú Unibanco Holding',
    type: 'Farm Products',
    value: 762900,
    interest: 4.2,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'Truist Financial',
    type: 'Vehicle',
    value: 755000,
    interest: 12.75,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'Mitsubishi UFJ Financial Group (MUFG)',
    type: 'Other',
    value: 723900,
    interest: 7.4,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'BNP Paribas',
    type: 'Real Estate',
    value: 698300,
    interest: 10.6,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'Postal Savings Bank of China Co., Ltd.',
    type: 'Equipment',
    value: 682900,
    interest: 3.29,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'Banco Santander',
    type: 'Inventory',
    value: 678000,
    interest: 6.78,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'PNC Financial Services Group, Inc.',
    type: 'Invoice',
    value: 664100,
    interest: 16.63,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'Westpac Banking Corporation',
    type: 'Blanket Lien',
    value: 622700,
    interest: 11.8,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'Charles Schwab Corporation',
    type: 'Cash',
    value: 621000,
    interest: 15.7,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'Bank Central Asia Tbk',
    type: 'Real Estate',
    value: 5558000,
    interest: 8,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'Industrial Bank Co',
    type: 'Equipment',
    value: 4335000,
    interest: 11,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'Bank of Communications Limited (BoCom or BoComm)',
    type: 'Inventory',
    value: 3067000,
    interest: 4.5,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'Lloyds Banking Group',
    type: 'Invoice',
    value: 2909000,
    interest: 12,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'Qatar National Bank',
    type: 'Blanket Lien',
    value: 2184000,
    interest: 14,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'Shanghai Pudong Development Bank',
    type: 'Cash',
    value: 2034000,
    interest: 16.5,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'National Australia Bank',
    type: 'Investment',
    value: 1788000,
    interest: 7.5,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'Bank of Montreal (BMO)',
    type: 'Consumer Goods',
    value: 1715000,
    interest: 6.5,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'UBS Group AG',
    type: 'Property',
    value: 1575000,
    interest: 9.5,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'DBS Group',
    type: 'Farm Products',
    value: 1466000,
    interest: 13,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'Australia & New Zealand Banking Group',
    type: 'Vehicle',
    value: 1377000,
    interest: 15,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'Sumitomo Mitsui Banking Corporation',
    type: 'Other',
    value: 1166000,
    interest: 10.5,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'Capital One',
    type: 'Real Estate',
    value: 5558000,
    interest: 14.5,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'ICICI Bank Limited',
    type: 'Equipment',
    value: 1060800,
    interest: 3.5,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'ING Group Netherlands',
    type: 'Inventory',
    value: 1033000,
    interest: 6.5,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'Intesa Sanpaolo',
    type: 'Invoice',
    value: 1016000,
    interest: 6,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'Ping An Bank Co Ltd',
    type: 'Blanket Lien',
    value: 930900,
    interest: 9,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'Al Rajhi Bank',
    type: 'Cash',
    value: 928200,
    interest: 13.5,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'Hang Seng Bank',
    type: 'Investment',
    value: 919700,
    interest: 16.5,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
  {
    investor: 'Japan Post Bank',
    type: 'Consumer Goods',
    value: 863000,
    interest: 8.6,
    filters: [],
    duration: 31536000000,
    end_date: '2022-09-12',
    created_at: 1659704038477,
  },
]

const getData = async () => {
  const res = await Promise.all(
    collaterals.map(async (data) => {
      return await databases.createDocument(
        collateralsCollectionID,
        'unique()',
        stringifySubObjects(data),
      )
    }),
  )

  return res
}

export default async function handler(req, res) {
  try {
    const data = await getData()
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Cache-Control', 'max-age=180000')

    if (data) {
      res.end(JSON.stringify({ success: true, data }))
    }
  } catch (error) {
    res.json(error)
    res.status(405).end(JSON.stringify({ success: false, error }))
  }

  return
}