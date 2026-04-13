import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthForm from '../../components/auth/AuthForm'
import SiteFooter from '../../components/layout/SiteFooter'
import SiteHeader from '../../components/layout/SiteHeader'
import { authApi } from '../../config/authApi'
import { navItems } from '../../data/homeData'
import { appRoutes } from '../../router'
import { loginUser, registerUser } from '../../services/authService'
import '../../pages/HomePage.css'
import '../AuthPage.css'

const pageContent = {
  login: {
    eyebrow: 'User Access',
    title: '登录你的用户中心',
    description:
      '继续管理代理资源、查看套餐状态并衔接后续的业务接口。页面已经预留登录 API，后端就绪后可直接联调。',
    submitLabel: '立即登录',
    switchLabel: '还没有账号？',
    switchHref: appRoutes.register,
    switchText: '去注册',
    endpoint: authApi.login,
    fields: [
      { name: 'username', label: '用户名', type: 'text', placeholder: '请输入用户名' },
      { name: 'password', label: '密码', type: 'password', placeholder: '请输入密码' },
    ],
    submitAction: loginUser,
    successMessage: '登录请求已发送，后端接口联通后会在这里返回你的账户状态。',
  },
  register: {
    eyebrow: 'Create Account',
    title: '创建新的用户账号',
    description:
      '填写基础信息后即可提交到后端创建接口。当前注册页已经预留到 `URL/api/create_user`，后续只需要对接真实返回结构。',
    submitLabel: '创建账号',
    switchLabel: '已经有账号？',
    switchHref: appRoutes.login,
    switchText: '去登录',
    endpoint: authApi.register,
    fields: [
      { name: 'username', label: '用户名', type: 'text', placeholder: '请输入用户名' },
      { name: 'email', label: '邮箱', type: 'email', placeholder: '请输入常用邮箱' },
      { name: 'password', label: '密码', type: 'password', placeholder: '请输入密码' },
      {
        name: 'confirmPassword',
        label: '确认密码',
        type: 'password',
        placeholder: '请再次输入密码',
      },
    ],
    submitAction: registerUser,
    successMessage: '注册请求已发送，等后端接口接通后，这里会展示创建结果。',
  },
}

const initialValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
}

function AuthPage({ mode }) {
  const content = pageContent[mode] ?? pageContent.login
  const [formValues, setFormValues] = useState(initialValues)
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormValues((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!formValues.username.trim() || !formValues.password.trim()) {
      setStatus({ type: 'error', message: '请输入用户名和密码。' })
      return
    }

    if (mode === 'register' && formValues.password !== formValues.confirmPassword) {
      setStatus({ type: 'error', message: '两次输入的密码不一致，请重新确认。' })
      return
    }

    setIsSubmitting(true)
    setStatus({ type: 'idle', message: '' })

    const payload =
      mode === 'register'
        ? {
            username: formValues.username.trim(),
            email: formValues.email.trim(),
            password: formValues.password,
          }
        : {
            username: formValues.username.trim(),
            password: formValues.password,
          }

    try {
      const result = await content.submitAction(payload)

      setStatus({
        type: 'success',
        message: result?.message || content.successMessage,
      })

      if (mode === 'register') {
        setFormValues(initialValues)
      }
    } catch (error) {
      const fallbackMessage =
        mode === 'register'
          ? '注册接口暂未联通，请确认后端是否已开放 URL/api/create_user。'
          : '登录接口暂未联通，请在后端提供登录地址后更新接口配置。'

      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : fallbackMessage,
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
                <strong>接口预留</strong>
                <span>{content.endpoint}</span>
              </div>
              <div>
                <strong>字段结构</strong>
                <span>{mode === 'register' ? 'username / email / password' : 'username / password'}</span>
              </div>
              <div>
                <strong>页面状态</strong>
                <span>已支持提交、错误提示和成功反馈</span>
              </div>
            </div>
          </div>

          <div className="auth-panel auth-form-card">
            <AuthForm
              fields={content.fields}
              isSubmitting={isSubmitting}
              onChange={handleChange}
              onSubmit={handleSubmit}
              status={status}
              submitLabel={content.submitLabel}
              values={formValues}
            />

            <p className="auth-switch">
              {content.switchLabel}{' '}
              <Link to={content.switchHref}>{content.switchText}</Link>
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

export default AuthPage
