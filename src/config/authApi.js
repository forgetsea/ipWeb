const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export const authApi = {
  sendEmailCode: `${API_BASE_URL}/api/v1/auth/email/send-code`,
  register: `${API_BASE_URL}/api/v1/auth/register`,
  login: `${API_BASE_URL}/api/v1/auth/login`,
  me: `${API_BASE_URL}/api/v1/auth/me`,
  logout: `${API_BASE_URL}/api/v1/auth/logout`,
}
