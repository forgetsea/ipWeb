import { useEffect, useMemo, useState } from 'react'
import { fetchProfile, updatePassword, updateProfile } from '../../services/userCenterService'
import { initialPasswordForm } from './userCenterData'
import { useUserCenter } from './useUserCenter'

const initialProfileState = {
  id: '',
  nickname: '',
  phone: '',
  email: '',
  createdAt: '',
}

function maskPhone(phone) {
  if (!phone) return '未绑定'
  if (phone.length < 7) return phone
  return `${phone.slice(0, 3)}****${phone.slice(-4)}`
}

function formatDate(value) {
  if (!value) return '暂无'

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value
  }

  return date.toLocaleDateString('zh-CN')
}

function UserProfilePage() {
  const { isSubmitting, runAction } = useUserCenter()
  const [profile, setProfile] = useState(initialProfileState)
  const [activeDialog, setActiveDialog] = useState('')
  const [nicknameDraft, setNicknameDraft] = useState('')
  const [passwordForm, setPasswordForm] = useState(initialPasswordForm)

  useEffect(() => {
    runAction({
      key: 'profile-load',
      action: fetchProfile,
      successMessage: '个人资料已加载。',
      afterSuccess: (result) => {
        const data = result?.data || {}
        const nextProfile = {
          id: data.id || '',
          nickname: data.nickname || '',
          phone: data.phone || '',
          email: data.email || '',
          createdAt: data.createdAt || '',
        }

        setProfile(nextProfile)
        setNicknameDraft(nextProfile.nickname)
      },
    })
  }, [runAction])

  const profileMeta = useMemo(
    () => [
      { label: '用户 ID', value: profile.id || '暂无' },
      { label: '昵称', value: profile.nickname || '未设置' },
      { label: '手机号', value: maskPhone(profile.phone) },
      { label: '注册时间', value: formatDate(profile.createdAt) },
    ],
    [profile],
  )

  const closeDialog = () => {
    setActiveDialog('')
    setNicknameDraft(profile.nickname)
    setPasswordForm(initialPasswordForm)
  }

  const handleNicknameSubmit = async (event) => {
    event.preventDefault()

    const result = await runAction({
      key: 'profile-nickname',
      action: () =>
        updateProfile({
          nickname: nicknameDraft.trim(),
        }),
      successMessage: '用户名已更新。',
      afterSuccess: (response) => {
        setProfile((current) => ({
          ...current,
          nickname: response?.data?.nickname ?? nicknameDraft.trim(),
          phone: response?.data?.phone ?? current.phone,
        }))
      },
    })

    if (result) {
      setActiveDialog('')
    }
  }

  const handlePasswordChange = (event) => {
    const { name, value } = event.target

    setPasswordForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handlePasswordSubmit = async (event) => {
    event.preventDefault()

    const result = await runAction({
      key: 'profile-password',
      action: () =>
        updatePassword({
          oldPassword: passwordForm.oldPassword,
          newPassword: passwordForm.newPassword,
          confirmPassword: passwordForm.confirmPassword,
        }),
      successMessage: '密码已更新。',
    })

    if (result) {
      setPasswordForm(initialPasswordForm)
      setActiveDialog('')
    }
  }

  return (
    <section className="user-panel user-profile-panel">
      <div className="user-profile-topbar">
        <div className="user-profile-name">
          <span>用户名</span>
          <strong>{profile.nickname || '未设置'}</strong>
          <button type="button" className="user-profile-icon-button" onClick={() => setActiveDialog('nickname')}>
            修改用户名
          </button>
        </div>
        <div className="user-profile-member">
          <span>会员编号</span>
          <strong>{profile.id || '--'}</strong>
        </div>
      </div>

      <div className="user-profile-card-grid">
        <article className="user-profile-card">
          <span className="user-profile-card-label">手机号</span>
          <strong className="user-profile-card-value">{maskPhone(profile.phone)}</strong>
          <p className="user-profile-card-note">手机号来自用户资料接口，当前页面默认以只读文本形式展示。</p>
        </article>

        <article className="user-profile-card user-profile-card--accent">
          <span className="user-profile-card-label">账户资料</span>
          <div className="user-profile-meta-grid">
            {profileMeta.map((item) => (
              <div key={item.label} className="user-profile-meta-item">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </article>

        <article className="user-profile-card">
          <span className="user-profile-card-label">登录密码</span>
          <strong className="user-profile-card-value">已加密保存</strong>
          <p className="user-profile-card-note">点击右侧按钮后，在弹窗中输入原密码和新密码完成修改。</p>
          <button
            type="button"
            className="ghost-button user-profile-action"
            onClick={() => setActiveDialog('password')}
          >
            修改密码
          </button>
        </article>

        <article className="user-profile-card">
          <span className="user-profile-card-label">联系邮箱</span>
          <strong className="user-profile-card-value">{profile.email || '未绑定'}</strong>
          <p className="user-profile-card-note">邮箱同样来自资料接口，当前仅用于展示，不提供当前页修改入口。</p>
        </article>
      </div>

      {activeDialog ? (
        <div className="user-profile-dialog-backdrop" role="presentation" onClick={closeDialog}>
          <div
            className="user-profile-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-dialog-title"
            onClick={(event) => event.stopPropagation()}
          >
            {activeDialog === 'nickname' ? (
              <form className="user-profile-dialog-form" onSubmit={handleNicknameSubmit}>
                <div className="user-section-title compact">
                  <div>
                    <p>Profile</p>
                    <h2 id="profile-dialog-title">修改用户名</h2>
                  </div>
                </div>

                <label className="user-field">
                  <span>新用户名</span>
                  <input value={nicknameDraft} onChange={(event) => setNicknameDraft(event.target.value)} />
                </label>

                <div className="user-profile-dialog-actions">
                  <button type="button" className="ghost-button" onClick={closeDialog}>
                    取消
                  </button>
                  <button type="submit" className="primary-button">
                    {isSubmitting === 'profile-nickname' ? '提交中...' : '确认修改'}
                  </button>
                </div>
              </form>
            ) : null}

            {activeDialog === 'password' ? (
              <form className="user-profile-dialog-form" onSubmit={handlePasswordSubmit}>
                <div className="user-section-title compact">
                  <div>
                    <p>Security</p>
                    <h2 id="profile-dialog-title">修改密码</h2>
                  </div>
                </div>

                <label className="user-field">
                  <span>原密码</span>
                  <input
                    type="password"
                    name="oldPassword"
                    value={passwordForm.oldPassword}
                    onChange={handlePasswordChange}
                  />
                </label>

                <label className="user-field">
                  <span>新密码</span>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                  />
                </label>

                <label className="user-field">
                  <span>确认新密码</span>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                  />
                </label>

                <div className="user-profile-dialog-actions">
                  <button type="button" className="ghost-button" onClick={closeDialog}>
                    取消
                  </button>
                  <button type="submit" className="primary-button">
                    {isSubmitting === 'profile-password' ? '提交中...' : '确认修改'}
                  </button>
                </div>
              </form>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default UserProfilePage
