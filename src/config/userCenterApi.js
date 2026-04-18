// 文件用途：用户中心业务接口和供应商原始接口参考配置。

const API_BASE_URL = 'URL'

const VENDOR_ACCOUNT_API_BASE = 'http://dlf.ppfly.work/interface/apicom/api'
const VENDOR_EXTRACT_API_BASE = 'http://ip.ppfly.top:6071'

// 前端提交到自有后端代理，避免把第三方接口参数和跨域细节散落到页面里。
export const userCenterApi = {
  profile: `${API_BASE_URL}/api/user/profile`,
  accountInfo: `${API_BASE_URL}/api/proxy/account-info`,
  updatePassword: `${API_BASE_URL}/api/proxy/update-password`,
  updateAccountStatus: `${API_BASE_URL}/api/proxy/update-account-status`,
  updateOrderSettings: `${API_BASE_URL}/api/proxy/update-order-settings`,
  updateDailyLimit: `${API_BASE_URL}/api/proxy/update-daily-limit`,
  whitelist: `${API_BASE_URL}/api/proxy/whitelist`,
  usage: `${API_BASE_URL}/api/proxy/usage`,
  extractIp: `${API_BASE_URL}/api/proxy/extract-ip`,
}

// 展示给对接人员看的原始供应商地址，不直接作为页面表单提交目标。
export const vendorApiReference = {
  accountInfo: `${VENDOR_ACCOUNT_API_BASE}/getinfo.act`,
  updatePassword: `${VENDOR_ACCOUNT_API_BASE}/update_password.act`,
  updateAccountStatus: `${VENDOR_ACCOUNT_API_BASE}/update_password.act`,
  updateOrderSettings: `${VENDOR_ACCOUNT_API_BASE}/create_user.act`,
  updateDailyLimit: `${VENDOR_ACCOUNT_API_BASE}/update_setlimit.act`,
  whitelist: `${VENDOR_ACCOUNT_API_BASE}/white_op.act`,
  usage: `${VENDOR_ACCOUNT_API_BASE}/getUserLeftNum.act`,
  extractIp: `${VENDOR_EXTRACT_API_BASE}/getApiIp`,
}
