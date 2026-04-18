// 文件用途：用户中心基础资料页，维护用户展示信息和联系方式。
import { useState } from 'react'
import { userCenterApi } from '../../config/userCenterApi'
import { updateProfile } from '../../services/userCenterService'
import { initialProfileForm } from './userCenterData'
import { useUserCenter } from './useUserCenter'

// 模块功能：提交基础资料到后端预留接口。
function UserProfilePage() {
  const { isSubmitting, runAction, updateForm } = useUserCenter()
  const [profileForm, setProfileForm] = useState(initialProfileForm)

  const handleProfileSubmit = (event) => {
    event.preventDefault()

    runAction({
      key: 'profile',
      action: () => updateProfile(profileForm),
      successMessage: '基础资料已提交。',
    })
  }

  return (
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
          <input name="displayName" value={profileForm.displayName} onChange={updateForm(setProfileForm)} />
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
          <input name="phone" value={profileForm.phone} onChange={updateForm(setProfileForm)} placeholder="选填" />
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
  )
}

export default UserProfilePage
