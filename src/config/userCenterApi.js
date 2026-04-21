const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export const userCenterApi = {
  dashboard: `${API_BASE_URL}/api/v1/dashboard`,
  profile: `${API_BASE_URL}/api/v1/user/profile`,
  password: `${API_BASE_URL}/api/v1/user/password`,
  orders: `${API_BASE_URL}/api/v1/orders`,
  orderDetail: (orderNo) => `${API_BASE_URL}/api/v1/orders/${encodeURIComponent(orderNo)}`,
  orderStatus: (orderNo) => `${API_BASE_URL}/api/v1/orders/${encodeURIComponent(orderNo)}/status`,
  orderApi: (orderNo) => `${API_BASE_URL}/api/v1/order-api/${encodeURIComponent(orderNo)}`,
  orderApiSync: (orderNo) => `${API_BASE_URL}/api/v1/order-api/${encodeURIComponent(orderNo)}/sync`,
  orderApiStatus: (orderNo) => `${API_BASE_URL}/api/v1/order-api/${encodeURIComponent(orderNo)}/status`,
  orderApiSettings: (orderNo) => `${API_BASE_URL}/api/v1/order-api/${encodeURIComponent(orderNo)}/settings`,
  orderApiLimit: (orderNo) => `${API_BASE_URL}/api/v1/order-api/${encodeURIComponent(orderNo)}/limit`,
  orderApiQuota: (orderNo) => `${API_BASE_URL}/api/v1/order-api/${encodeURIComponent(orderNo)}/quota`,
  whitelist: (orderNo) => `${API_BASE_URL}/api/v1/order-api/${encodeURIComponent(orderNo)}/whitelist`,
  apiSummary: `${API_BASE_URL}/api/v1/docs/api-summary`,
  codeDemos: `${API_BASE_URL}/api/v1/docs/code-demos`,
}

export const platformApiReference = {
  dashboard: userCenterApi.dashboard,
  profile: userCenterApi.profile,
  password: userCenterApi.password,
  orders: userCenterApi.orders,
  orderDetail: '/api/v1/orders/{orderNo}',
  orderStatus: '/api/v1/orders/{orderNo}/status',
  orderApi: '/api/v1/order-api/{orderNo}',
  orderApiSync: '/api/v1/order-api/{orderNo}/sync',
  orderApiStatus: '/api/v1/order-api/{orderNo}/status',
  orderApiSettings: '/api/v1/order-api/{orderNo}/settings',
  orderApiLimit: '/api/v1/order-api/{orderNo}/limit',
  orderApiQuota: '/api/v1/order-api/{orderNo}/quota',
  whitelist: '/api/v1/order-api/{orderNo}/whitelist',
  apiSummary: userCenterApi.apiSummary,
  codeDemos: userCenterApi.codeDemos,
}
