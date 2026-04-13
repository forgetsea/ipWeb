import { useState } from 'react'
import SiteFooter from '../../components/layout/SiteFooter'
import SiteHeader from '../../components/layout/SiteHeader'
import { navItems } from '../../data/homeData'
import { userCenterApi, vendorApiReference } from '../../config/userCenterApi'
import {
  extractIp,
  fetchAccountInfo,
  fetchUsage,
  updateAccountStatus,
  updateDailyLimit,
  updateOrderSettings,
  updatePassword,
  updateProfile,
  updateWhitelist,
} from '../../services/userCenterService'
import '../HomePage.css'
import './UserCenterPage.css'

const initialCredentialForm = {
  username: '',
  password: '',
}

const initialProfileForm = {
  displayName: '天启用户',
  company: '',
  phone: '',
  email: '',
}

const initialPasswordForm = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
}

const initialSettingsForm = {
  outip: '0',
  lsp: '0',
  prov: '0',
  city: '0',
  endtime: '0',
  ifs: '0',
  iptype: '0',
  sessTime: '1',
}

const initialLimitForm = {
  dayfetchlimit: '10000',
}

const initialWhitelistForm = {
  ipAddress: '',
}

const initialExtractForm = {
  count: '10',
  regionCode: '',
}

const sampleAccount = {
  isLocked: '0',
  usertype: '0',
  dayfetchlimit: '10000',
  sessTime: '1',
  iptype: '0',
  whitelist: ['123.123.123.1', '123.123.123.2'],
  leftNum: 10000,
  allNum: 10000,
}

const visibilityFields = [
  { name: 'outip', label: '真实 IP' },
  { name: 'lsp', label: '运营商' },
  { name: 'prov', label: '省份' },
  { name: 'city', label: '城市' },
  { name: 'endtime', label: '有效时间' },
  { name: 'ifs', label: '当日去重' },
]

const ipTypeOptions = [
  { value: '0', label: 'JSON' },
  { value: '1', label: 'CRLF 换行' },
  { value: '2', label: 'CR 换行' },
  { value: '3', label: 'LF 换行' },
  { value: '4', label: '逗号分隔' },
]

function getMessage(result, fallback) {
  return result?.message || fallback
}

function normalizeAccountData(result, currentAccount) {
  const userData = result?.data?.user_data || {}

  return {
    ...currentAccount,
    ...userData,
    whitelist: result?.data?.whitelist || currentAccount.whitelist,
    leftNum: userData.left_num ?? currentAccount.leftNum,
    allNum: userData.all_num ?? currentAccount.allNum,
  }
}

function UserCenterPage() {
  const [credentialForm, setCredentialForm] = useState(initialCredentialForm)
  const [profileForm, setProfileForm] = useState(initialProfileForm)
  const [passwordForm, setPasswordForm] = useState(initialPasswordForm)
  const [settingsForm, setSettingsForm] = useState(initialSettingsForm)
  const [limitForm, setLimitForm] = useState(initialLimitForm)
  const [whitelistForm, setWhitelistForm] = useState(initialWhitelistForm)
  const [extractForm, setExtractForm] = useState(initialExtractForm)
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

  const handleProfileSubmit = (event) => {
    event.preventDefault()

    runAction({
      key: 'profile',
      action: () => updateProfile(profileForm),
      successMessage: '基础资料已提交。',
    })
  }

  const handlePasswordSubmit = (event) => {
    event.preventDefault()

    const credentials = requireCredentials()

    if (!credentials) return

    if (passwordForm.newPassword.length < 6) {
      setStatus({ type: 'error', message: '新密码不能低于 6 位。' })
      return
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setStatus({ type: 'error', message: '两次输入的新密码不一致。' })
      return
    }

    runAction({
      key: 'password',
      action: () =>
        updatePassword({
          ...credentials,
          password: passwordForm.currentPassword || credentials.password,
          new_password: passwordForm.newPassword,
        }),
      successMessage: '密码修改请求已提交。',
      updateAccount: true,
    })
  }

  const handleStatusToggle = () => {
    const credentials = requireCredentials()

    if (!credentials) return

    const nextStatus = account.isLocked === '0' ? '1' : '0'

    runAction({
      key: 'status',
      action: () => updateAccountStatus({ ...credentials, isLocked: nextStatus }),
      successMessage: nextStatus === '0' ? '账户已开启。' : '账户已关闭。',
      updateAccount: true,
    })

    setAccount((current) => ({ ...current, isLocked: nextStatus }))
  }

  const handleSettingsSubmit = (event) => {
    event.preventDefault()

    const credentials = requireCredentials()

    if (!credentials) return

    runAction({
      key: 'settings',
      action: () => updateOrderSettings({ ...credentials, ...settingsForm }),
      successMessage: '订单设置已提交。',
      updateAccount: true,
    })
  }

  const handleLimitSubmit = (event) => {
    event.preventDefault()

    const credentials = requireCredentials()

    if (!credentials) return

    runAction({
      key: 'limit',
      action: () => updateDailyLimit({ ...credentials, ...limitForm }),
      successMessage: '每日次数上限已提交。',
      updateAccount: true,
    })
  }

  const handleWhitelistSubmit = (op) => (event) => {
    event.preventDefault()

    const credentials = requireCredentials()

    if (!credentials) return

    if (!whitelistForm.ipAddress.trim()) {
      setStatus({ type: 'error', message: '请输入要操作的白名单 IP。' })
      return
    }

    runAction({
      key: `whitelist-${op}`,
      action: () =>
        updateWhitelist({
          ...credentials,
          op,
          ip_address: whitelistForm.ipAddress.trim(),
        }),
      successMessage: op === 'add' ? '白名单添加请求已提交。' : '白名单删除请求已提交。',
      updateAccount: true,
    })
  }

  const handleExtractSubmit = (event) => {
    event.preventDefault()

    const credentials = requireCredentials()

    if (!credentials) return

    runAction({
      key: 'extract',
      action: () =>
        extractIp({
          infoid: credentials.username,
          pw: credentials.password,
          p1: extractForm.count,
          p2: extractForm.regionCode,
        }),
      successMessage: '提取请求已提交。',
    })
  }

  const accountStatusText = account.isLocked === '0' ? '正常' : '已关闭'
  const accountTypeText = account.usertype === '0' ? '包月包天' : '次数用户'

  return (
    <div className="user-center-page">
      <SiteHeader navItems={navItems} />

      <main className="user-center-main">
        <section className="user-center-hero section-container">
          <div>
            <span className="eyebrow">User Center</span>
            <h1>管理你的代理账户</h1>
            <p>
              维护基础资料、API 调用密码、订单返回字段、每日次数上限和 IP 白名单。
            </p>
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

        <section className="user-center-grid section-container">
          <aside className="user-panel user-sidebar">
            <h2>API 凭据</h2>
            <p>用于调用订单账户相关接口。真实签名由后端代理完成。</p>

            <label className="user-field">
              <span>API 账户</span>
              <input
                name="username"
                value={credentialForm.username}
                onChange={updateForm(setCredentialForm)}
                placeholder="请输入订单账号"
              />
            </label>

            <label className="user-field">
              <span>调用密码</span>
              <input
                name="password"
                type="password"
                value={credentialForm.password}
                onChange={updateForm(setCredentialForm)}
                placeholder="请输入 API 调用密码"
              />
            </label>

            <div className="user-action-row">
              <button type="button" className="primary-button" onClick={handleRefresh}>
                {isSubmitting === 'refresh' ? '刷新中...' : '刷新账户'}
              </button>
              <button type="button" className="ghost-button" onClick={handleUsage}>
                {isSubmitting === 'usage' ? '查询中...' : '查余量'}
              </button>
            </div>

            {status.message ? (
              <div className={`user-status is-${status.type}`} role="status">
                {status.message}
              </div>
            ) : null}
          </aside>

          <div className="user-content">
            <section className="user-panel">
              <div className="user-section-title">
                <div>
                  <p>Profile</p>
                  <h2>基础资料</h2>
                </div>
                <span>预设接口：{userCenterApi.profile}</span>
              </div>

              <form className="user-form user-form-grid" onSubmit={handleProfileSubmit}>
                <label className="user-field">
                  <span>显示名称</span>
                  <input
                    name="displayName"
                    value={profileForm.displayName}
                    onChange={updateForm(setProfileForm)}
                  />
                </label>
                <label className="user-field">
                  <span>公司名称</span>
                  <input
                    name="company"
                    value={profileForm.company}
                    onChange={updateForm(setProfileForm)}
                    placeholder="选填"
                  />
                </label>
                <label className="user-field">
                  <span>手机号</span>
                  <input
                    name="phone"
                    value={profileForm.phone}
                    onChange={updateForm(setProfileForm)}
                    placeholder="选填"
                  />
                </label>
                <label className="user-field">
                  <span>邮箱</span>
                  <input
                    name="email"
                    type="email"
                    value={profileForm.email}
                    onChange={updateForm(setProfileForm)}
                    placeholder="选填"
                  />
                </label>
                <button type="submit" className="primary-button user-form-submit">
                  {isSubmitting === 'profile' ? '提交中...' : '保存资料'}
                </button>
              </form>
            </section>

            <section className="user-panel">
              <div className="user-section-title">
                <div>
                  <p>Security</p>
                  <h2>密码与账户开关</h2>
                </div>
                <button type="button" className="ghost-button" onClick={handleStatusToggle}>
                  {isSubmitting === 'status'
                    ? '处理中...'
                    : account.isLocked === '0'
                      ? '关闭账户'
                      : '开启账户'}
                </button>
              </div>

              <form className="user-form user-form-grid" onSubmit={handlePasswordSubmit}>
                <label className="user-field">
                  <span>当前密码</span>
                  <input
                    name="currentPassword"
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={updateForm(setPasswordForm)}
                    placeholder="默认使用上方调用密码"
                  />
                </label>
                <label className="user-field">
                  <span>新密码</span>
                  <input
                    name="newPassword"
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={updateForm(setPasswordForm)}
                  />
                </label>
                <label className="user-field">
                  <span>确认新密码</span>
                  <input
                    name="confirmPassword"
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={updateForm(setPasswordForm)}
                  />
                </label>
                <button type="submit" className="primary-button user-form-submit">
                  {isSubmitting === 'password' ? '提交中...' : '修改密码'}
                </button>
              </form>
            </section>

            <section className="user-panel">
              <div className="user-section-title">
                <div>
                  <p>Order</p>
                  <h2>订单返回设置</h2>
                </div>
                <span>当前上限：{account.dayfetchlimit}</span>
              </div>

              <form className="user-form" onSubmit={handleSettingsSubmit}>
                <div className="setting-switches">
                  {visibilityFields.map((field) => (
                    <label key={field.name} className="user-switch">
                      <span>{field.label}</span>
                      <select
                        name={field.name}
                        value={settingsForm[field.name]}
                        onChange={updateForm(setSettingsForm)}
                      >
                        <option value="0">不显示</option>
                        <option value="1">显示</option>
                      </select>
                    </label>
                  ))}
                </div>

                <div className="user-form-grid">
                  <label className="user-field">
                    <span>返回格式</span>
                    <select
                      name="iptype"
                      value={settingsForm.iptype}
                      onChange={updateForm(setSettingsForm)}
                    >
                      {ipTypeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="user-field">
                    <span>会话时长</span>
                    <input
                      name="sessTime"
                      type="number"
                      min="1"
                      max="5"
                      value={settingsForm.sessTime}
                      onChange={updateForm(setSettingsForm)}
                    />
                  </label>
                  <button type="submit" className="primary-button user-form-submit">
                    {isSubmitting === 'settings' ? '提交中...' : '保存订单设置'}
                  </button>
                </div>
              </form>

              <form className="user-inline-form" onSubmit={handleLimitSubmit}>
                <label className="user-field">
                  <span>每日次数上限</span>
                  <input
                    name="dayfetchlimit"
                    type="number"
                    min="1"
                    value={limitForm.dayfetchlimit}
                    onChange={updateForm(setLimitForm)}
                  />
                </label>
                <button type="submit" className="ghost-button">
                  {isSubmitting === 'limit' ? '提交中...' : '更新上限'}
                </button>
              </form>
            </section>

            <section className="user-panel user-two-column">
              <div>
                <div className="user-section-title compact">
                  <div>
                    <p>Whitelist</p>
                    <h2>IP 白名单</h2>
                  </div>
                </div>

                <form className="user-form" onSubmit={handleWhitelistSubmit('add')}>
                  <label className="user-field">
                    <span>IP 地址</span>
                    <input
                      name="ipAddress"
                      value={whitelistForm.ipAddress}
                      onChange={updateForm(setWhitelistForm)}
                      placeholder="例如 123.123.123.123"
                    />
                  </label>
                  <div className="user-action-row">
                    <button type="submit" className="primary-button">
                      {isSubmitting === 'whitelist-add' ? '添加中...' : '添加'}
                    </button>
                    <button
                      type="button"
                      className="ghost-button"
                      onClick={handleWhitelistSubmit('del')}
                    >
                      {isSubmitting === 'whitelist-del' ? '删除中...' : '删除'}
                    </button>
                  </div>
                </form>
              </div>

              <div className="whitelist-list">
                {account.whitelist.map((ip) => (
                  <span key={ip}>{ip}</span>
                ))}
              </div>
            </section>

            <section className="user-panel">
              <div className="user-section-title">
                <div>
                  <p>Extract</p>
                  <h2>提取 IP 测试</h2>
                </div>
                <span>单次 1 到 200 个</span>
              </div>

              <form className="user-form-grid user-form" onSubmit={handleExtractSubmit}>
                <label className="user-field">
                  <span>提取数量</span>
                  <input
                    name="count"
                    type="number"
                    min="1"
                    max="200"
                    value={extractForm.count}
                    onChange={updateForm(setExtractForm)}
                  />
                </label>
                <label className="user-field">
                  <span>地区编码</span>
                  <input
                    name="regionCode"
                    value={extractForm.regionCode}
                    onChange={updateForm(setExtractForm)}
                    placeholder="选填，例如 410100"
                  />
                </label>
                <button type="submit" className="primary-button user-form-submit">
                  {isSubmitting === 'extract' ? '提交中...' : '提取 IP'}
                </button>
              </form>
            </section>

            <section className="user-panel">
              <div className="user-section-title compact">
                <div>
                  <p>API</p>
                  <h2>接口对接参考</h2>
                </div>
              </div>

              <div className="api-reference-list">
                {Object.entries(vendorApiReference).map(([name, endpoint]) => (
                  <div key={name}>
                    <strong>{name}</strong>
                    <span>{endpoint}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

export default UserCenterPage
