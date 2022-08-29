// const sdk = require('node-appwrite')

import sdk from 'node-appwrite'

const client = new sdk.Client()

const databases = new sdk.Databases(client, 'default')

const users = new sdk.Users(client);

client
  .setEndpoint('http://api.startupkits.co/v1') // Your API Endpoint
  .setProject('6262d69263bdf28f15ce') // Your project ID
  .setKey(
    '2b84cabd84384cbb437c5a925ebc46472943f3c90d057d4e8c24edc021839079c3b9818cf0e655f8be0e95e9260c917badc35000736375e43a2ba185bce8e1d016efaa9064e661b6871a95c8310b7ab517e6a706a0624e4dbf90bb121ee9daf03c2520ffdb9dc987829c73851458a197effa6e1f093069fbb106be52c7fe8638',
  ) // Your secret API key
  .setSelfSigned()

export default function handler(req, res) {
  //   const promise = databases.get()

  //   promise.then(
  //     function (response) {
  //       console.log(response)
  //       res.status(200).json({ name: 'John Doe', ...response })
  //     },
  //     function (error) {
  //       console.log(error)
  //     },
  //   )

  // res.status(200).json({ name: 'John Doe' })

  databases.lists()
    .then((result) => {
      // console.log(res)
      res.json({ name: 'John Doe', result })
    })
    .catch((error) => {
      // console.log(error)
      res.json({ error })
    })
}
