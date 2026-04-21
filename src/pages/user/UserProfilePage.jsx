import { useEffect, useState } from 'react'
import { userCenterApi } from '../../config/userCenterApi'
import { fetchProfile, updateProfile } from '../../services/userCenterService'
import { initialProfileForm } from './userCenterData'
import { useUserCenter } from './useUserCenter'

function UserProfilePage() {
  const { isSubmitting, runAction, updateForm } = useUserCenter()
  const [profileForm, setProfileForm] = useState(initialProfileForm)

  useEffect(() => {
    runAction({
      key: 'profile-load',
      action: fetchProfile,
      successMessage: '个人资料已加载。',
      afterSuccess: (result) => {
        setProfileForm((current) => ({
          ...current,
          nickname: result?.data?.nickname || '',
          phone: result?.data?.phone || '',
        }))
      },
    })
  }, [runAction])

  const handleProfileSubmit = (event) => {
    event.preventDefault()

    runAction({
      key: 'profile',
      action: () =>
        updateProfile({
          nickname: profileForm.nickname,
          phone: profileForm.phone,
        }),
      successMessage: '基础资料已保存。',
    })
  }

  return (
    <section className="user-panel">
      <div className="user-section-title">
        <div>
          <p>Profile</p>
          <h2>基础资料</h2>
        </div>
        <span>接口：{userCenterApi.profile}</span>
      </div>

      <form className="user-form user-form-grid" onSubmit={handleProfileSubmit}>
        <label className="user-field">
          <span>昵称</span>
          <input name="nickname" value={profileForm.nickname} onChange={updateForm(setProfileForm)} />
        </label>
        <label className="user-field">
          <span>手机号</span>
          <input name="phone" value={profileForm.phone} onChange={updateForm(setProfileForm)} placeholder="选填" />
        </label>
        <button type="submit" className="primary-button user-form-submit">
          {isSubmitting === 'profile' ? '提交中...' : '保存资料'}
        </button>
      </form>
    </section>
  )
}

export default UserProfilePage
