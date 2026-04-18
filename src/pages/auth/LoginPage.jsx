// 文件用途：登录页入口，复用认证页面的 login 模式。
import AuthPage from './AuthPage'

// 模块功能：为路由提供登录页面组件。
function LoginPage() {
  return <AuthPage mode="login" />
}

export default LoginPage
