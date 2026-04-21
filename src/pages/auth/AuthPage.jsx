import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthForm from '../../components/auth/AuthForm'
import SiteFooter from '../../components/layout/SiteFooter'
import SiteHeader from '../../components/layout/SiteHeader'
import { authApi } from '../../config/authApi'
import { navItems } from '../../data/homeData'
import { appRoutes } from '../../router'
import { loginUser, registerUser, sendEmailCode } from '../../services/authService'
import '../../pages/HomePage.css'
import '../AuthPage.css'

const pageContent = {
  login: {
    eyebrow: 'User Access',
    title: '登录用户中心',
    description: '使用平台账号登录后，用户中心请求会自动携带 Bearer token。',
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
      {
        name: 'confirmPassword',
        label: '确认密码',
        type: 'password',
        placeholder: '请再次输入密码',
      },
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

    setFormValues((current) => ({
      ...current,
      [name]: value,
    }))
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
      const result = await sendEmailCode({
        email: formValues.email.trim(),
        scene: 'register',
      })

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
        : {
            account: formValues.account.trim(),
            password: formValues.password,
          }

    try {
      const result = await content.submitAction(payload)

      setStatus({
        type: 'success',
        message: result?.message || content.successMessage,
      })

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
    <div className="auth-page-shell">
      <SiteHeader navItems={navItems} />

      <main className="auth-page">
        <section className="auth-hero section-container">
          <div className="auth-panel auth-copy">
            <span className="eyebrow">{content.eyebrow}</span>
            <h1>{content.title}</h1>
            <p>{content.description}</p>

            <div className="auth-highlights" aria-hidden="true">
              <div>
                <strong>接口</strong>
                <span>{content.endpoint}</span>
              </div>
              <div>
                <strong>字段</strong>
                <span>{mode === 'register' ? 'email / verifyCode / password' : 'account / password'}</span>
              </div>
              <div>
                <strong>认证</strong>
                <span>成功后保存 token，后续请求自动携带 Authorization</span>
              </div>
            </div>
          </div>

          <div className="auth-panel auth-form-card">
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

            <p className="auth-switch">
              {content.switchLabel} <Link to={content.switchHref}>{content.switchText}</Link>
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

export default AuthPage
