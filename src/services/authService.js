// 文件用途：登录注册页面的业务请求服务。
import { authApi } from '../config/authApi'
import { postJson } from './request'

// 模块功能：提交登录表单到后端登录接口。
export function loginUser(payload) {
  return postJson(authApi.login, payload)
}

// 模块功能：提交注册表单到后端创建用户接口。
export function registerUser(payload) {
  return postJson(authApi.register, payload)
}
