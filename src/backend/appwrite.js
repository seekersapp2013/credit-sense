import sdk from 'node-appwrite'

const client = new sdk.Client()

const endpoint = 'http://api.startupkits.co/v1'
const project = '6262d69263bdf28f15ce'
const key =
'2b84cabd84384cbb437c5a925ebc46472943f3c90d057d4e8c24edc021839079c3b9818cf0e655f8be0e95e9260c917badc35000736375e43a2ba185bce8e1d016efaa9064e661b6871a95c8310b7ab517e6a706a0624e4dbf90bb121ee9daf03c2520ffdb9dc987829c73851458a197effa6e1f093069fbb106be52c7fe8638'

client
.setEndpoint(endpoint) // Your API Endpoint
.setProject(project) // Your project ID
.setKey(key) // Your secret API key
.setSelfSigned()

const users = new sdk.Users(client)

const databases = new sdk.Databases(client, 'default')

const account = (jwt) => {
  const accountClient = new sdk.Client()
  const account = new sdk.Account(accountClient)

  accountClient
    .setEndpoint(endpoint) // Your API Endpoint
    .setProject(project) // Your project ID
    .setJWT(jwt)

  return account
}


export { databases, users, account }

export const profileCollectionID = '6277ff5ed3a9aa7e2296'

export const collateralsCollectionID = '62ecf9c7baeef6981cd5'

export const collateralCollectionID = '62ee180c9601fc050670'