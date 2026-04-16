const API_BASE_URL = 'URL'

const VENDOR_ACCOUNT_API_BASE = 'http://dlf.ppfly.work/interface/apicom/api'
const VENDOR_EXTRACT_API_BASE = 'http://ip.ppfly.top:6071'

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
