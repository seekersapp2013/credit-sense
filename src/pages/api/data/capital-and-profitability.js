import { Query } from 'node-appwrite'
import { account, databases, profileCollectionID } from 'src/backend/appwrite'
import { objectifySubStrings } from 'src/functions/appwrite'
import { capitalRequired, monthsToProfitability } from 'src/functions/calculations/Charts'

const getData = async (authorization) => {
  const jwt = authorization.split(' ')[1]
  const user = await account(jwt).get()
  // console.log(user)
  const { $id } = user

  const data = await databases.listDocuments(profileCollectionID, [Query.equal('user', $id)], 1)
  if (data.total > 0 && data.documents.length > 0) {
    const profile = objectifySubStrings(data.documents[0])
    // console.log(profile)
    return {
      capital: capitalRequired(profile),
      profitability: monthsToProfitability(profile),
    }
  } else {
    throw Error('Record Not found')
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
