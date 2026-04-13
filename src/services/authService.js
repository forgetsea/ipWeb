import { authApi } from '../config/authApi'
import { postJson } from './request'

export function loginUser(payload) {
  return postJson(authApi.login, payload)
}

export function registerUser(payload) {
  return postJson(authApi.register, payload)
}
