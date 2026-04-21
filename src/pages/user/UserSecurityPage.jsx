import { useState } from 'react'
import { updateAccountStatus, updatePassword } from '../../services/userCenterService'
import { initialPasswordForm } from './userCenterData'
import { useUserCenter } from './useUserCenter'

function UserSecurityPage() {
  const { account, isSubmitting, requireOrderNo, runAction, setStatus, updateForm } = useUserCenter()
  const [passwordForm, setPasswordForm] = useState(initialPasswordForm)

  const handlePasswordSubmit = (event) => {
    event.preventDefault()

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
          oldPassword: passwordForm.oldPassword,
          newPassword: passwordForm.newPassword,
          confirmPassword: passwordForm.confirmPassword,
        }),
      successMessage: '登录密码已修改。',
    })
  }

  const handleStatusToggle = () => {
    const order = requireOrderNo()

    if (!order) return

    const nextStatus = Number(account.isLocked) === 0 ? 1 : 0

    runAction({
      key: 'status',
      action: () => updateAccountStatus({ ...order, isLocked: nextStatus }),
      successMessage: nextStatus === 0 ? '订单 API 已开启。' : '订单 API 已关闭。',
      updateAccount: true,
    })
  }

  return (
    <section className="user-panel">
      <div className="user-section-title">
        <div>
          <p>Security</p>
          <h2>安全设置</h2>
        </div>
        <button type="button" className="ghost-button" onClick={handleStatusToggle}>
          {isSubmitting === 'status' ? '处理中...' : Number(account.isLocked) === 0 ? '关闭订单 API' : '开启订单 API'}
        </button>
      </div>

      <form className="user-form user-form-grid" onSubmit={handlePasswordSubmit}>
        <label className="user-field">
          <span>原登录密码</span>
          <input
            name="oldPassword"
            type="password"
            value={passwordForm.oldPassword}
            onChange={updateForm(setPasswordForm)}
          />
        </label>
        <label className="user-field">
          <span>新登录密码</span>
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
          {isSubmitting === 'password' ? '提交中...' : '修改登录密码'}
        </button>
      </form>
    </section>
  )
}

export default UserSecurityPage
