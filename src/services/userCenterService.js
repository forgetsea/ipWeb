import { userCenterApi } from '../config/userCenterApi'
import { deleteJson, getJson, postJson, putJson } from './request'

export function fetchDashboard() {
  return getJson(userCenterApi.dashboard)
}

export function fetchProfile() {
  return getJson(userCenterApi.profile)
}

export function updateProfile(payload) {
  return putJson(userCenterApi.profile, payload)
}

export function updatePassword(payload) {
  return putJson(userCenterApi.password, payload)
}

export function fetchOrders(params = {}) {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, value)
    }
  })

  const query = searchParams.toString()
  return getJson(query ? `${userCenterApi.orders}?${query}` : userCenterApi.orders)
}

export function fetchOrderDetail(orderNo) {
  return getJson(userCenterApi.orderDetail(orderNo))
}

export function fetchOrderStatus(orderNo) {
  return getJson(userCenterApi.orderStatus(orderNo))
}

export function fetchOrderApiInfo(orderNo) {
  return getJson(userCenterApi.orderApi(orderNo))
}

export function syncOrderApiInfo(orderNo) {
  return postJson(userCenterApi.orderApiSync(orderNo), {})
}

export function updateAccountStatus({ orderNo, isLocked }) {
  return putJson(userCenterApi.orderApiStatus(orderNo), { isLocked: Number(isLocked) })
}

export function updateOrderSettings({ orderNo, ...settings }) {
  const allowedFields = ['outip', 'lsp', 'prov', 'city', 'endtime', 'ifs', 'iptype', 'sessTime']
  const numericSettings = Object.fromEntries(
    Object.entries(settings)
      .filter(([key]) => allowedFields.includes(key))
      .map(([key, value]) => [key, Number(value)]),
  )

  return putJson(userCenterApi.orderApiSettings(orderNo), numericSettings)
}

export function updateOrderLimit({ orderNo, dayfetchlimit }) {
  return putJson(userCenterApi.orderApiLimit(orderNo), { dayfetchlimit: Number(dayfetchlimit) })
}

export function fetchUsage({ orderNo }) {
  return getJson(userCenterApi.orderApiQuota(orderNo))
}

export function fetchWhitelist({ orderNo }) {
  return getJson(userCenterApi.whitelist(orderNo))
}

export function addWhitelist({ orderNo, ips }) {
  return postJson(userCenterApi.whitelist(orderNo), { ips })
}

export function deleteWhitelist({ orderNo, ips }) {
  return deleteJson(userCenterApi.whitelist(orderNo), { ips })
}

export function fetchApiSummary() {
  return getJson(userCenterApi.apiSummary)
}

export function fetchCodeDemos() {
  return getJson(userCenterApi.codeDemos)
}
