import { appwrite } from '../appwrite'

const callHomeAPI = async (endpoint = '/api', method = 'GET', headers = {}, body = null) => {
  // const jwt = localStorage.getItem('jwt')
  const jwt = await appwrite.getToken()

  console.log('Access Token: ', jwt)
  return await callAPI(
    '',
    `/api${endpoint}`,
    method,
    { ...headers, authorization: `Bearer ${jwt}` },
    body,
  )
}

const callAPI = async (base = '', endpoint = '/', method = 'GET', headers = {}, body = null) => {
  const init = { method, headers, body: null }

  if (body) {
    init.body = JSON.stringify(body)
  }

  init.headers['Content-Type'] = 'application/json'

  try {
    const res = await fetch(`${base}${endpoint}`, init)
    const result = await res.json()
    return result
  } catch (error) {
    return false
  }
}

const stringifyQuery = (data) => {
  try {
    '?' +
      Object.entries(data)
        .map(([key, val]) => [encodeURIComponent(key), encodeURIComponent(val)].join('='))
        .join('&')
  } catch (error) {
    return ''
  }
}

const parseEndpoint = (endpoint) => {
  if (Array.isArray(endpoint)) {
    const [uri, query] = endpoint
    return `${uri}${stringifyQuery(query)}`
  }

  return endpoint
}

const api = {
  get: async (endpoint, headers = {}) => await callHomeAPI(parseEndpoint(endpoint), 'GET', headers),
  post: async (endpoint, data = {}, headers = {}) =>
    await callHomeAPI(parseEndpoint(endpoint), 'POST', headers, data),
  put: async (endpoint, data = {}, headers = {}) =>
    await callHomeAPI(parseEndpoint(endpoint), 'PUT', headers, data),
  patch: async (endpoint, data = {}, headers = {}) =>
    await callHomeAPI(parseEndpoint(endpoint), 'PATCH', headers, data),
  delete: async (endpoint, headers = {}) =>
    await callHomeAPI(parseEndpoint(endpoint), 'DELETE', headers),
  ext: {
    get: async (base, endpoint, headers = {}) =>
      await callAPI(base, parseEndpoint(endpoint), 'GET', headers),
    post: async (base, endpoint, data = {}, headers = {}) =>
      await callAPI(base, parseEndpoint(endpoint), 'POST', headers, data),
    put: async (base, endpoint, data = {}, headers = {}) =>
      await callAPI(base, parseEndpoint(endpoint), 'PUT', headers, data),
    patch: async (base, endpoint, data = {}, headers = {}) =>
      await callAPI(base, parseEndpoint(endpoint), 'PATCH', headers, data),
    delete: async (base, endpoint, headers = {}) =>
      await callAPI(base, parseEndpoint(endpoint), 'DELETE', headers),
  },
}

export default api
