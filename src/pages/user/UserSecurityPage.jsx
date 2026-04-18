// 文件用途：用户中心安全设置页，处理密码修改和账户开关。
import { useState } from 'react'
import { updateAccountStatus, updatePassword } from '../../services/userCenterService'
import { initialPasswordForm } from './userCenterData'
import { useUserCenter } from './useUserCenter'

// 模块功能：校验新密码、提交密码修改，并同步账户启停状态。
function UserSecurityPage() {
  const { account, setAccount, isSubmitting, requireCredentials, runAction, setStatus, updateForm } =
    useUserCenter()
  const [passwordForm, setPasswordForm] = useState(initialPasswordForm)

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

  return (
    <section className="user-panel">
      <div className="user-section-title">
        <div>
          <p>Security</p>
          <h2>密码与账户开关</h2>
        </div>
        <button type="button" className="ghost-button" onClick={handleStatusToggle}>
          {isSubmitting === 'status' ? '处理中...' : account.isLocked === '0' ? '关闭账户' : '开启账户'}
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
  )
}

export default UserSecurityPage
