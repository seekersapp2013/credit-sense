import { Query } from 'node-appwrite'
import { account, collateralCollectionID, databases } from 'src/backend/appwrite'
import { objectifySubStrings } from 'src/functions/appwrite'
import { ChartsAndKPIs } from 'src/functions/calculations/Charts'

const getData = async (authorization) => {
  const jwt = authorization.split(' ')[1]
  const user = await account(jwt).get()
  // console.log(user)
  const { $id } = user

  const data = await databases.listDocuments(collateralCollectionID, [Query.equal('user', $id)], 1)
  if (data.total > 0 && data.documents.length > 0) {
    const collateral = data.documents[0]
    // console.log(collateral)
    return collateral
  } else {
    return Error('Record Not found')
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
