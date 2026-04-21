import { authApi } from '../config/authApi'
import { clearAuthSession, getJson, postJson, saveAuthSession } from './request'

export function sendEmailCode(payload) {
  return postJson(authApi.sendEmailCode, payload)
}

export async function loginUser(payload) {
  const result = await postJson(authApi.login, payload)
  saveAuthSession(result)
  return result
}

export async function registerUser(payload) {
  const result = await postJson(authApi.register, payload)
  saveAuthSession(result)
  return result
}

export function fetchCurrentUser() {
  return getJson(authApi.me)
}

export async function logoutUser() {
  try {
    return await postJson(authApi.logout, {})
  } finally {
    clearAuthSession()
  }
}
