import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthForm from '../../components/auth/AuthForm'
import SiteFooter from '../../components/layout/SiteFooter'
import SiteHeader from '../../components/layout/SiteHeader'
import { Card, CardContent } from '../../components/ui/card'
import { authApi } from '../../config/authApi'
import { navItems } from '../../data/homeData'
import { appRoutes } from '../../router'
import { loginUser, registerUser, sendEmailCode } from '../../services/authService'

const pageContent = {
  login: {
    eyebrow: 'User Access',
    title: '登录用户中心',
    description: '使用平台账号登录，继续管理订单、提取 API 与账户设置。',
    submitLabel: '立即登录',
    switchLabel: '还没有账号？',
    switchHref: appRoutes.register,
    switchText: '去注册',
    endpoint: authApi.login,
    fields: [
      { name: 'account', label: '登录账号', type: 'text', placeholder: '当前使用邮箱登录' },
      { name: 'password', label: '密码', type: 'password', placeholder: '请输入平台登录密码' },
    ],
    submitAction: loginUser,
    successMessage: '登录成功。',
  },
  register: {
    eyebrow: 'Create Account',
    title: '创建平台账号',
    description: '先发送邮箱验证码，再使用邮箱、验证码和密码完成注册。',
    submitLabel: '创建账号',
    switchLabel: '已经有账号？',
    switchHref: appRoutes.login,
    switchText: '去登录',
    endpoint: authApi.register,
    fields: [
      { name: 'email', label: '邮箱', type: 'email', placeholder: '请输入常用邮箱', actionLabel: '发送验证码' },
      { name: 'verifyCode', label: '验证码', type: 'text', placeholder: '请输入邮箱验证码' },
      { name: 'nickname', label: '昵称', type: 'text', placeholder: '选填' },
      { name: 'password', label: '密码', type: 'password', placeholder: '请输入平台登录密码' },
      { name: 'confirmPassword', label: '确认密码', type: 'password', placeholder: '请再次输入密码' },
    ],
    submitAction: registerUser,
    successMessage: '注册成功。',
  },
}

const initialValues = {
  account: '',
  email: '',
  verifyCode: '',
  nickname: '',
  password: '',
  confirmPassword: '',
}

function AuthPage({ mode }) {
  const content = pageContent[mode] ?? pageContent.login
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState(initialValues)
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFieldActionBusy, setIsFieldActionBusy] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValues((current) => ({ ...current, [name]: value }))
  }

  const handleFieldAction = async (fieldName) => {
    if (fieldName !== 'email') return

    if (!formValues.email.trim()) {
      setStatus({ type: 'error', message: '请先输入邮箱。' })
      return
    }

    setIsFieldActionBusy(fieldName)
    setStatus({ type: 'idle', message: '' })

    try {
      const result = await sendEmailCode({ email: formValues.email.trim(), scene: 'register' })
      setStatus({ type: 'success', message: result?.message || '验证码已发送。' })
    } catch (error) {
      setStatus({ type: 'error', message: error instanceof Error ? error.message : '验证码发送失败。' })
    } finally {
      setIsFieldActionBusy('')
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (mode === 'register') {
      if (!formValues.email.trim() || !formValues.verifyCode.trim() || !formValues.password.trim()) {
        setStatus({ type: 'error', message: '请输入邮箱、验证码和密码。' })
        return
      }

      if (formValues.password !== formValues.confirmPassword) {
        setStatus({ type: 'error', message: '两次输入的密码不一致，请重新确认。' })
        return
      }
    } else if (!formValues.account.trim() || !formValues.password.trim()) {
      setStatus({ type: 'error', message: '请输入登录账号和密码。' })
      return
    }

    setIsSubmitting(true)
    setStatus({ type: 'idle', message: '' })

    const payload =
      mode === 'register'
        ? {
            email: formValues.email.trim(),
            password: formValues.password,
            confirmPassword: formValues.confirmPassword,
            verifyCode: formValues.verifyCode.trim(),
            nickname: formValues.nickname.trim(),
          }
        : { account: formValues.account.trim(), password: formValues.password }

    try {
      const result = await content.submitAction(payload)
      setStatus({ type: 'success', message: result?.message || content.successMessage })
      navigate(appRoutes.userCenter, { replace: true })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : '接口暂未联通，请稍后再试。',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <SiteHeader navItems={navItems} />

      <main className="section-container grid gap-6 pb-12 pt-28 sm:pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <Card className="overflow-hidden rounded-[36px] border-white/70 bg-white/78">
          <CardContent className="relative p-7 sm:p-9">
            <div className="pointer-events-none absolute -bottom-20 right-[-8%] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(13,110,253,0.22),rgba(13,110,253,0))]" />
            <span className="eyebrow">{content.eyebrow}</span>
            <h1 className="mt-5 max-w-[11ch] text-4xl font-black leading-tight text-slate-900 sm:text-5xl lg:text-[4rem]">
              {content.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[color:var(--muted-strong)]">
              {content.description}
            </p>

            <div className="mt-8 grid gap-4">
              {[
                ['安全', '登录、注册与账户操作走统一流程'],
                ['合规', mode === 'register' ? '完成注册即可进入平台使用服务' : '继续管理你的代理服务与订单'],
                ['优质', '统一的界面语言与移动端体验'],
              ].map(([title, text]) => (
                <div
                  key={title}
                  className="rounded-[24px] border border-[#0d6efd]/8 bg-[#f4f9ff]/78 px-5 py-4"
                >
                  <strong className="block text-base font-black text-slate-900">{title}</strong>
                  <span className="mt-1 block text-sm leading-7 text-slate-500">{text}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[36px] border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(243,249,255,0.92))]">
          <CardContent className="p-7 sm:p-8">
            <AuthForm
              fields={content.fields}
              isFieldActionBusy={isFieldActionBusy}
              isSubmitting={isSubmitting}
              onChange={handleChange}
              onFieldAction={handleFieldAction}
              onSubmit={handleSubmit}
              status={status}
              submitLabel={content.submitLabel}
              values={formValues}
            />

            <p className="mt-5 text-center text-sm text-[color:var(--muted-strong)]">
              {content.switchLabel}{' '}
              <Link to={content.switchHref} className="font-bold text-[#0d6efd] no-underline">
                {content.switchText}
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>

      <SiteFooter />
    </div>
  )
}

export default AuthPage
