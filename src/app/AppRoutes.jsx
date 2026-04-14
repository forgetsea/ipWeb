import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
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

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/user-center" element={<UserCenterPage />}>
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
