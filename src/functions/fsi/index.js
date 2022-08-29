const callAPI = async (endpoint, method, body) => {
  const options = {
    method,
    headers: {
      requestId: '{{timestamp}}',
      'api-secret': 'vb_ls_bfac75fe54a952841971b6918d06aeb2659523dc92d6',
      'sandbox-key': 'KWqsC71uBboUzJXpm3S8g6b0z0qEjWnP1658413110',
      'Content-Type': 'application/json',
    },
  }

  if (method === 'POST' && typeof body === 'object') {
    options.body = JSON.stringify(body)
  }

  return (
    await (
      await fetch(`https://fsi.ng/api${endpoint}${typeof body === 'string' ? body : ''}`, options)
    ).json()
  )
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

const fsi = {
  africastalking: {
    sendSMS: (data) => callAPI('/v1/africastalking/version1/messaging', 'POST', data),
  },
  woven: {
    recurringMandate: (data) => callAPI('/woven/directdebits/mandates', 'POST', data),
    validateMandate: (ref, data) => callAPI(`/woven/directdebits/mandates/${ref}`, 'POST', data),
  },
}

export default fsi
