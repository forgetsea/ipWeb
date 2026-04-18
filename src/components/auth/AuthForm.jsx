// 文件用途：登录注册通用表单组件，按字段配置渲染输入项和提交按钮。

// 模块功能：接收外部状态和事件处理器，保持表单本身无业务判断。
function AuthForm({
  fields,
  isSubmitting,
  onChange,
  onSubmit,
  status,
  submitLabel,
  values,
}) {
  return (
    <form className="auth-form" onSubmit={onSubmit}>
      {fields.map((field) => (
        <label key={field.name} className="auth-field">
          <span>{field.label}</span>
          <input
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            value={values[field.name]}
            onChange={onChange}
          />
        </label>
      ))}

      {status.message ? (
        <div className={`auth-status is-${status.type}`} role="status">
          {status.message}
        </div>
      ) : null}

      <button type="submit" className="primary-button auth-submit" disabled={isSubmitting}>
        {isSubmitting ? '提交中...' : submitLabel}
      </button>
    </form>
  )
}

export default AuthForm
