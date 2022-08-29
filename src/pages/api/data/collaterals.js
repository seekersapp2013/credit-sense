import { Query } from 'node-appwrite'
import {
  account,
  collateralsCollectionID,
  databases,
  profileCollectionID,
} from 'src/backend/appwrite'
import { objectifySubStrings } from 'src/functions/appwrite'
import { ChartsAndKPIs } from 'src/functions/calculations/Charts'

const getData = async (authorization) => {
  const jwt = authorization.split(' ')[1]
  const user = await account(jwt).get()
//   console.log(user)
  const { $id } = user

  const data = await databases.listDocuments(collateralsCollectionID)
  if (data.total > 0 && data.documents.length > 0) {
    const collaterals = data.documents.map((data) => {
      const collateral = objectifySubStrings(data)
      let allocated = 0
      if (collateral.allocation.length) {
        allocated =
          collateral.allocation.map((string) => string.percentage).reduce((a, b) => a + b) / 100
      }

      return {
        $id: collateral.$id,
        investor: collateral.investor,
        value: collateral.value,
        available: 1 - allocated,
        interest: collateral.interest / 100,
        type: collateral.type,
        duration: collateral.duration,
        end_date: collateral.end_date,
      }
    })
    // console.log(collaterals)
    return collaterals
  } else {
    throw Error('Nothing found')
  }
}

export default function handler(req, res) {
  getData(req.headers.authorization)
    .then((data) => {
      res.json({ success: true, data })
    })
    .catch((error) => {
      res.json({ success: false, error })
    })
}
