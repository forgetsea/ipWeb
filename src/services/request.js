const TOKEN_STORAGE_KEY = 'ipweb_auth_token'
const USER_STORAGE_KEY = 'ipweb_auth_user'

async function parseResponse(response) {
  const contentType = response.headers.get('content-type') || ''

  if (contentType.includes('application/json')) {
    return response.json()
  }

  const text = await response.text()
  return text ? { message: text } : null
}

function getStoredToken() {
  return window.localStorage.getItem(TOKEN_STORAGE_KEY)
}

function buildHeaders(hasBody) {
  const token = getStoredToken()
  const headers = {}

  if (hasBody) {
    headers['Content-Type'] = 'application/json'
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  return headers
}

export function saveAuthSession(result) {
  const token = result?.data?.token

  if (token) {
    window.localStorage.setItem(TOKEN_STORAGE_KEY, token)
  }

  if (result?.data?.user) {
    window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(result.data.user))
  }
}

export function clearAuthSession() {
  window.localStorage.removeItem(TOKEN_STORAGE_KEY)
  window.localStorage.removeItem(USER_STORAGE_KEY)
}

export async function requestJson(url, { method = 'GET', body } = {}) {
  const hasBody = body !== undefined
  const response = await fetch(url, {
    method,
    headers: buildHeaders(hasBody),
    body: hasBody ? JSON.stringify(body) : undefined,
  })

  const data = await parseResponse(response)

  if (!response.ok || (data?.code !== undefined && data.code !== 0)) {
    if (data?.code === 40002) {
      clearAuthSession()
    }

    throw new Error(data?.message || '接口暂未返回成功结果，请稍后再试。')
  }

  return data
}

export function getJson(url) {
  return requestJson(url)
}

export function postJson(url, body) {
  return requestJson(url, { method: 'POST', body })
}

export function putJson(url, body) {
  return requestJson(url, { method: 'PUT', body })
}

export function deleteJson(url, body) {
  return requestJson(url, { method: 'DELETE', body })
}
