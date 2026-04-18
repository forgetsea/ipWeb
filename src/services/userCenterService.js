// 文件用途：用户中心各功能页的业务请求服务。
import { userCenterApi } from '../config/userCenterApi'
import { postJson } from './request'

// 模块功能：更新用户基础资料。
export function updateProfile(payload) {
  return postJson(userCenterApi.profile, payload)
}

// 模块功能：查询供应商账户信息。
export function fetchAccountInfo(payload) {
  return postJson(userCenterApi.accountInfo, payload)
}

// 模块功能：修改供应商账户调用密码。
export function updatePassword(payload) {
  return postJson(userCenterApi.updatePassword, payload)
}

// 模块功能：开启或关闭供应商账户。
export function updateAccountStatus(payload) {
  return postJson(userCenterApi.updateAccountStatus, payload)
}

// 模块功能：保存订单返回字段和提取格式设置。
export function updateOrderSettings(payload) {
  return postJson(userCenterApi.updateOrderSettings, payload)
}

// 模块功能：更新每日提取次数上限。
export function updateDailyLimit(payload) {
  return postJson(userCenterApi.updateDailyLimit, payload)
}

// 模块功能：添加或删除 IP 白名单。
export function updateWhitelist(payload) {
  return postJson(userCenterApi.whitelist, payload)
}

// 模块功能：查询账户剩余提取次数。
export function fetchUsage(payload) {
  return postJson(userCenterApi.usage, payload)
}

// 模块功能：提交 IP 提取测试请求。
export function extractIp(payload) {
  return postJson(userCenterApi.extractIp, payload)
}
