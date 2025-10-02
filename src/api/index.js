/* Simple API client for the frontend to communicate with the backend.
   Uses Vite environment variable VITE_API_URL for the base URL.
   Exports: apiFetch, login, setToken, getToken, clearToken
*/

const API_URL = import.meta.env.VITE_API_URL || ''

const TOKEN_KEY = 'authToken'

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token)
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}

async function apiFetch(path, options = {}) {
  const url = API_URL ? `${API_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}` : path

  const headers = new Headers(options.headers || {})
  headers.set('Content-Type', 'application/json')

  const token = getToken()
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const res = await fetch(url, { ...options, headers })

  const text = await res.text()
  let data
  try {
    data = text ? JSON.parse(text) : null
  } catch (err) {
    data = text
  }

  if (!res.ok) {
    const error = new Error(data?.message || res.statusText || 'Request failed')
    error.status = res.status
    error.data = data
    throw error
  }

  return data
}

export async function login(email, password) {
  return apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export default {
  apiFetch,
  login,
  setToken,
  getToken,
  clearToken,
}
