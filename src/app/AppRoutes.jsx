// 文件用途：集中声明全站页面路由与用户中心嵌套路由。
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import BalancePackagePage from '../pages/package/BalancePackagePage'
import EnterprisePackagePage from '../pages/package/EnterprisePackagePage'
import FixedPackagePage from '../pages/package/FixedPackagePage'
import PackageLayoutPage from '../pages/package/PackageLayoutPage'
import TimedPackagePage from '../pages/package/TimedPackagePage'
import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
import GetIpPage from '../pages/GetIpPage'
import UserApiReferencePage from '../pages/user/UserApiReferencePage'
import UserCenterPage from '../pages/user/UserCenterPage'
import UserCenterWorkspace from '../pages/user/UserCenterWorkspace'
import UserCredentialsPage from '../pages/user/UserCredentialsPage'
import UserExtractPage from '../pages/user/UserExtractPage'
import UserOrderSettingsPage from '../pages/user/UserOrderSettingsPage'
import UserOverviewPage from '../pages/user/UserOverviewPage'
import UserProfilePage from '../pages/user/UserProfilePage'
import UserSecurityPage from '../pages/user/UserSecurityPage'
import UserWhitelistPage from '../pages/user/UserWhitelistPage'

// 模块功能：把 URL 路径映射到页面组件，并处理默认跳转与兜底重定向。
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/package" element={<PackageLayoutPage />}>
        <Route index element={<Navigate to="balance" replace />} />
        <Route path="balance" element={<BalancePackagePage />} />
        <Route path="timed" element={<TimedPackagePage />} />
        <Route path="fixed-ip" element={<FixedPackagePage />} />
        <Route path="enterprise" element={<EnterprisePackagePage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/getip" element={<GetIpPage />} />
      <Route path="/user-center" element={<UserCenterPage />}>
        {/* 用户中心共用同一份账户、凭据和提交状态，由 Workspace 再分发给子页面。 */}
        <Route element={<UserCenterWorkspace />}>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="credentials" element={<UserCredentialsPage />} />
          <Route path="overview" element={<UserOverviewPage />} />
          <Route path="profile" element={<UserProfilePage />} />
          <Route path="security" element={<UserSecurityPage />} />
          <Route path="orders" element={<UserOrderSettingsPage />} />
          <Route path="whitelist" element={<UserWhitelistPage />} />
          <Route path="extract" element={<UserExtractPage />} />
          <Route path="api-reference" element={<UserApiReferencePage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes
