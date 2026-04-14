import { useUserCenter } from './useUserCenter'

function UserCredentialsPage() {
  const {
    credentialForm,
    handleRefresh,
    handleUsage,
    isSubmitting,
    setCredentialForm,
    updateForm,
  } = useUserCenter()

  return (
    <section className="user-panel">
      <div className="user-section-title">
        <div>
          <p>Credentials</p>
          <h2>API 凭据</h2>
        </div>
        <span>用于调用订单账户相关接口，切换功能页时会保留当前输入。</span>
      </div>

      <form className="user-form user-form-grid">
        <label className="user-field">
          <span>API 账户</span>
          <input
            name="username"
            value={credentialForm.username}
            onChange={updateForm(setCredentialForm)}
            placeholder="请输入订单账号"
          />
        </label>

        <label className="user-field">
          <span>调用密码</span>
          <input
            name="password"
            type="password"
            value={credentialForm.password}
            onChange={updateForm(setCredentialForm)}
            placeholder="请输入 API 调用密码"
          />
        </label>

        <div className="user-action-row user-form-submit">
          <button type="button" className="primary-button" onClick={handleRefresh}>
            {isSubmitting === 'refresh' ? '刷新中...' : '刷新账户'}
          </button>
          <button type="button" className="ghost-button" onClick={handleUsage}>
            {isSubmitting === 'usage' ? '查询中...' : '查余量'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default UserCredentialsPage
