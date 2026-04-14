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

function UserCenterPage() {
  const [credentialForm, setCredentialForm] = useState(initialCredentialForm)
  const [account, setAccount] = useState(sampleAccount)
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [isSubmitting, setIsSubmitting] = useState('')

  const updateForm = (setter) => (event) => {
    const { name, value } = event.target

    setter((current) => ({
      ...current,
      [name]: value,
    }))
  }

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
