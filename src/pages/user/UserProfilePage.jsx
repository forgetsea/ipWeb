import { useEffect, useMemo, useState } from 'react'
import { Card, CardContent } from '../../components/ui/card'
import { buttonVariants } from '../../components/ui/button-variants'
import { Surface } from '../../components/ui/surface'
import { fetchProfile, updatePassword, updateProfile } from '../../services/userCenterService'
import { initialPasswordForm } from './userCenterData'
import { TextInput, UserField, UserPanel, UserSectionHeader } from './userUi'
import { useUserCenter } from './useUserCenter'

const initialProfileState = { id: '', nickname: '', phone: '', email: '', createdAt: '' }

function maskPhone(phone) {
  if (!phone) return '未绑定'
  if (phone.length < 7) return phone
  return `${phone.slice(0, 3)}****${phone.slice(-4)}`
}

function formatDate(value) {
  if (!value) return '暂无'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
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
      action: () => updateProfile({ nickname: nicknameDraft.trim() }),
      successMessage: '用户名已更新。',
      afterSuccess: (response) => {
        setProfile((current) => ({
          ...current,
          nickname: response?.data?.nickname ?? nicknameDraft.trim(),
          phone: response?.data?.phone ?? current.phone,
        }))
      },
    })
    if (result) setActiveDialog('')
  }

  const handlePasswordChange = (event) => {
    const { name, value } = event.target
    setPasswordForm((current) => ({ ...current, [name]: value }))
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
    <UserPanel>
      <div className="flex flex-col gap-4 border-b border-slate-200/70 pb-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-sm font-semibold text-slate-500">用户名</span>
          <strong className="text-3xl font-black text-[#0f2b67]">{profile.nickname || '未设置'}</strong>
          <button type="button" className={buttonVariants({ variant: 'secondary' })} onClick={() => setActiveDialog('nickname')}>
            修改用户名
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-sm font-semibold text-slate-500">会员编号</span>
          <strong className="text-3xl font-black text-[#0f2b67]">{profile.id || '--'}</strong>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <Card className="rounded-[28px] border-slate-200/70 bg-[#f4f8ff]/72 shadow-none">
          <CardContent className="grid min-h-[186px] gap-4 p-6">
            <span className="text-base text-slate-500">手机号</span>
            <strong className="text-4xl font-black leading-tight text-[#0f2b67]">{maskPhone(profile.phone)}</strong>
            <p className="text-sm leading-7 text-[color:var(--muted-strong)]">
              手机号来自用户资料接口，当前页面默认以只读文本形式展示。
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-[28px] border-slate-200/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(242,247,255,0.96))] shadow-none">
          <CardContent className="grid gap-3 p-6 sm:grid-cols-2">
            {profileMeta.map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-200/70 bg-white/92 p-4">
                <span className="text-sm text-slate-500">{item.label}</span>
                <strong className="mt-2 block text-base font-black text-slate-900">{item.value}</strong>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[28px] border-slate-200/70 bg-[#f4f8ff]/72 shadow-none">
          <CardContent className="grid min-h-[186px] gap-4 p-6">
            <span className="text-base text-slate-500">登录密码</span>
            <strong className="text-4xl font-black leading-tight text-[#0f2b67]">已加密保存</strong>
            <p className="text-sm leading-7 text-[color:var(--muted-strong)]">
              点击按钮后，在弹窗中输入原密码和新密码完成修改。
            </p>
            <button type="button" className={buttonVariants({ variant: 'outline' })} onClick={() => setActiveDialog('password')}>
              修改密码
            </button>
          </CardContent>
        </Card>

        <Card className="rounded-[28px] border-slate-200/70 bg-[#f4f8ff]/72 shadow-none">
          <CardContent className="grid min-h-[186px] gap-4 p-6">
            <span className="text-base text-slate-500">联系邮箱</span>
            <strong className="text-3xl font-black leading-tight text-[#0f2b67]">{profile.email || '未绑定'}</strong>
            <p className="text-sm leading-7 text-[color:var(--muted-strong)]">
              邮箱同样来自资料接口，当前仅用于展示，不提供本页修改入口。
            </p>
          </CardContent>
        </Card>
      </div>

      {activeDialog ? (
        <div className="fixed inset-0 z-60 grid place-items-center bg-[#0f2b67]/22 p-6 backdrop-blur-sm" role="presentation" onClick={closeDialog}>
          <Surface
            className="w-full max-w-[460px] rounded-[28px] border-white/80 bg-white/98"
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-dialog-title"
            onClick={(event) => event.stopPropagation()}
          >
            {activeDialog === 'nickname' ? (
              <form className="grid gap-5 p-6" onSubmit={handleNicknameSubmit}>
                <UserSectionHeader eyebrow="Profile" title="修改用户名" compact />
                <UserField label="新用户名">
                  <TextInput value={nicknameDraft} onChange={(event) => setNicknameDraft(event.target.value)} />
                </UserField>
                <div className="flex justify-end gap-3">
                  <button type="button" className={buttonVariants({ variant: 'secondary' })} onClick={closeDialog}>
                    取消
                  </button>
                  <button type="submit" className={buttonVariants({})}>
                    {isSubmitting === 'profile-nickname' ? '提交中...' : '确认修改'}
                  </button>
                </div>
              </form>
            ) : null}

            {activeDialog === 'password' ? (
              <form className="grid gap-5 p-6" onSubmit={handlePasswordSubmit}>
                <UserSectionHeader eyebrow="Security" title="修改密码" compact />
                <UserField label="原密码">
                  <TextInput type="password" name="oldPassword" value={passwordForm.oldPassword} onChange={handlePasswordChange} />
                </UserField>
                <UserField label="新密码">
                  <TextInput type="password" name="newPassword" value={passwordForm.newPassword} onChange={handlePasswordChange} />
                </UserField>
                <UserField label="确认新密码">
                  <TextInput type="password" name="confirmPassword" value={passwordForm.confirmPassword} onChange={handlePasswordChange} />
                </UserField>
                <div className="flex justify-end gap-3">
                  <button type="button" className={buttonVariants({ variant: 'secondary' })} onClick={closeDialog}>
                    取消
                  </button>
                  <button type="submit" className={buttonVariants({})}>
                    {isSubmitting === 'profile-password' ? '提交中...' : '确认修改'}
                  </button>
                </div>
              </form>
            ) : null}
          </Surface>
        </div>
      ) : null}
    </UserPanel>
  )
}

export default UserProfilePage
