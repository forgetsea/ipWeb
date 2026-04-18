// 文件用途：注册页入口，复用认证页面的 register 模式。
import AuthPage from './AuthPage'

// 模块功能：为路由提供注册页面组件。
function RegisterPage() {
  return <AuthPage mode="register" />
}

export default RegisterPage
