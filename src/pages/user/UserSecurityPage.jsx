import { useState } from 'react'
import { buttonVariants } from '../../components/ui/button-variants'
import { updateAccountStatus, updatePassword } from '../../services/userCenterService'
import { initialPasswordForm } from './userCenterData'
import { TextInput, UserField, UserPanel, UserSectionHeader } from './userUi'
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
    <UserPanel>
      <UserSectionHeader
        eyebrow="Security"
        title="安全设置"
        actions={
          <button type="button" className={buttonVariants({ variant: 'secondary' })} onClick={handleStatusToggle}>
            {isSubmitting === 'status'
              ? '处理中...'
              : Number(account.isLocked) === 0
                ? '关闭订单 API'
                : '开启订单 API'}
          </button>
        }
      />

      <form className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4" onSubmit={handlePasswordSubmit}>
        <UserField label="原登录密码">
          <TextInput
            name="oldPassword"
            type="password"
            value={passwordForm.oldPassword}
            onChange={updateForm(setPasswordForm)}
          />
        </UserField>
        <UserField label="新登录密码">
          <TextInput
            name="newPassword"
            type="password"
            value={passwordForm.newPassword}
            onChange={updateForm(setPasswordForm)}
          />
        </UserField>
        <UserField label="确认新密码">
          <TextInput
            name="confirmPassword"
            type="password"
            value={passwordForm.confirmPassword}
            onChange={updateForm(setPasswordForm)}
          />
        </UserField>
        <div className="flex items-end">
          <button type="submit" className={buttonVariants({ fullWidth: true })}>
            {isSubmitting === 'password' ? '提交中...' : '修改登录密码'}
          </button>
        </div>
      </form>
    </UserPanel>
  )
}

export default UserSecurityPage
