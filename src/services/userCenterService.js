import { userCenterApi } from '../config/userCenterApi'
import { postJson } from './request'

export function updateProfile(payload) {
  return postJson(userCenterApi.profile, payload)
}

export function fetchAccountInfo(payload) {
  return postJson(userCenterApi.accountInfo, payload)
}

export function updatePassword(payload) {
  return postJson(userCenterApi.updatePassword, payload)
}

export function updateAccountStatus(payload) {
  return postJson(userCenterApi.updateAccountStatus, payload)
}

export function updateOrderSettings(payload) {
  return postJson(userCenterApi.updateOrderSettings, payload)
}

export function updateDailyLimit(payload) {
  return postJson(userCenterApi.updateDailyLimit, payload)
}

export function updateWhitelist(payload) {
  return postJson(userCenterApi.whitelist, payload)
}

export function fetchUsage(payload) {
  return postJson(userCenterApi.usage, payload)
}

export function extractIp(payload) {
  return postJson(userCenterApi.extractIp, payload)
}
