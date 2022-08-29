const callAPI = async (endpoint, method, body) => {
  const options = {
    method,
    headers: {
      // Accept: 'application/json',
      // AppId: process.env.NEXT_PUBLIC_DOJAH_APP_ID,
      'Content-Type': 'application/json',
      authorization: 'Bearer bHQevynFBhAjwx9bj8PtSHCfBNnftKtxhlINxbJ3m8U83fYpcM/fmq1uer1zR2o5',
    },
    redirect: 'follow',
  }

  if (method === 'POST') {
    options.body = JSON.stringify(body)
  }

  //?bvn=23456789890&first_name=Oluwatobi&last_name=Babalola&dob=25-12-1993

  return await (
    await fetch(
      `https://api.creditchek.africa/v1${endpoint}${method === 'GET' ? body : ''}`,
      options,
    )
  ).json()
}

const jsonToQueryString = (data) => {
  if (data) {
    return (
      '?' +
      encodeURI(
        Object.entries(data)
          .map((keyValue) => keyValue.join('='))
          .join('&'),
      )
    )
  }
  return ''
}

const creditchek = {
  getBanks: (data) => callAPI('/radar/get-banks', 'POST', data),
  // lookupBVN: (data) => callAPI('/kyc/bvn/full', 'GET', jsonToQueryString(data)),
}

export default creditchek
