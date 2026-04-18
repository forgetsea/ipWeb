// 文件用途：用户中心父页面，维护共享账户状态并承载子路由。
import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import SiteFooter from '../../components/layout/SiteFooter'
import SiteHeader from '../../components/layout/SiteHeader'
import { navItems } from '../../data/homeData'
import { fetchAccountInfo, fetchUsage } from '../../services/userCenterService'
import {
  getMessage,
  initialCredentialForm,
  normalizeAccountData,
  sampleAccount,
} from './userCenterData'
import '../HomePage.css'
import './UserCenterPage.css'

// 模块功能：管理用户中心的凭据、账户、提交状态，并通过 Outlet context 下发。
function UserCenterPage() {
  const [credentialForm, setCredentialForm] = useState(initialCredentialForm)
  const [account, setAccount] = useState(sampleAccount)
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [isSubmitting, setIsSubmitting] = useState('')

  // 子页面表单很多，抽出通用 change handler，保持字段名和 state key 一致即可复用。
  const updateForm = (setter) => (event) => {
    const { name, value } = event.target

    setter((current) => ({
      ...current,
      [name]: value,
    }))
  }

  // 用户中心的接口大多依赖供应商账号和调用密码，提交前统一校验。
  const requireCredentials = () => {
    if (!credentialForm.username.trim() || !credentialForm.password.trim()) {
      setStatus({ type: 'error', message: '请先填写 API 账户和调用密码。' })
      return null
    }

    return {
      username: credentialForm.username.trim(),
      password: credentialForm.password,
    }
  }

  // 集中处理按钮 loading、成功/失败提示和账户数据回写，避免每个子页面重复 try/catch。
  const runAction = async ({ key, action, successMessage, updateAccount = false }) => {
    setIsSubmitting(key)
    setStatus({ type: 'idle', message: '' })

    try {
      const result = await action()

      if (updateAccount) {
        setAccount((current) => normalizeAccountData(result, current))
      }

      setStatus({ type: 'success', message: getMessage(result, successMessage) })
    } catch (error) {
      setStatus({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : '接口暂未联通，后端代理接好后这里会返回真实结果。',
      })
    } finally {
      setIsSubmitting('')
    }
  }

  const handleRefresh = () => {
    const credentials = requireCredentials()

    if (!credentials) return

    runAction({
      key: 'refresh',
      action: () => fetchAccountInfo(credentials),
      successMessage: '账户信息已刷新。',
      updateAccount: true,
    })
  }

  const handleUsage = () => {
    const credentials = requireCredentials()

    if (!credentials) return

    runAction({
      key: 'usage',
      action: () => fetchUsage(credentials),
      successMessage: '提取余量已刷新。',
      updateAccount: true,
    })
  }

  const accountStatusText = account.isLocked === '0' ? '正常' : '已关闭'
  const accountTypeText = account.usertype === '0' ? '包月包天' : '次数用户'

  // 通过 react-router 的 Outlet context 向所有用户中心子路由共享状态和动作。
  const outletContext = {
    account,
    credentialForm,
    handleRefresh,
    handleUsage,
    isSubmitting,
    requireCredentials,
    runAction,
    setAccount,
    setCredentialForm,
    setStatus,
    status,
    updateForm,
  }

  return (
    <div className="user-center-page">
      <SiteHeader navItems={navItems} />

      <main className="user-center-main">
        <section className="user-center-hero section-container">
          <div>
            <span className="eyebrow">User Center</span>
            <h1>管理你的代理账户</h1>
            <p>按功能进入不同页面，维护资料、安全、订单返回字段、白名单和 IP 提取。</p>
          </div>

          <div className="user-center-summary" aria-label="账户摘要">
            <div>
              <span>账户状态</span>
              <strong>{accountStatusText}</strong>
            </div>
            <div>
              <span>账户类型</span>
              <strong>{accountTypeText}</strong>
            </div>
            <div>
              <span>剩余次数</span>
              <strong>{account.leftNum}</strong>
            </div>
            <div>
              <span>总次数</span>
              <strong>{account.allNum}</strong>
            </div>
          </div>
        </section>

        <Outlet context={outletContext} />
      </main>

      <SiteFooter />
    </div>
  )
}

export default UserCenterPage
