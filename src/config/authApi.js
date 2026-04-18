// 文件用途：登录注册相关接口地址配置。

const API_BASE_URL = 'URL'

// 后端网关地址集中在这里替换，页面层只关心 login/register 两个业务动作。
export const authApi = {
  login: `${API_BASE_URL}/api/login`,
  register: `${API_BASE_URL}/api/create_user`,
}
