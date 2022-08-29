const callAPI = async (endpoint, method, body) => {
  const options = {
    method,
    headers: {
      Accept: 'application/json',
      AppId: process.env.NEXT_PUBLIC_DOJAH_APP_ID,
      Authorization: process.env.NEXT_PUBLIC_DOJAH_SECRET_KEY,
    },
  }

  if (method === 'POST') {
    options.body = JSON.stringify(body)
  }

  const url = `${process.env.NEXT_PUBLIC_DOJAH_ENPOINT}${endpoint}${method === 'GET' ? body : ''}`
  //?bvn=23456789890&first_name=Oluwatobi&last_name=Babalola&dob=25-12-1993

  return (await (await fetch(url, options)).json()).entity
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

const dojah = {
  validateBVN: (data) => callAPI('/kyc/bvn', 'GET', jsonToQueryString(data)),
  lookupBVN: (data) => callAPI('/kyc/bvn/full', 'GET', jsonToQueryString(data)),
  sendOTP: ({ sender_id = "Credit Sense", destination, channel = "sms", length = 4, priority = true }) =>
    callAPI('/messaging/otp', 'POST', { sender_id, destination, channel, length, priority }),
  validateOTP: ({ code, reference_id }) =>
    callAPI('/messaging/otp/validate', 'GET', jsonToQueryString({ code, reference_id })),
}

export default dojah
