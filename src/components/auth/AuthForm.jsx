function AuthForm({
  fields,
  isFieldActionBusy,
  isSubmitting,
  onChange,
  onFieldAction,
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
          <div className={field.actionLabel ? 'auth-input-row' : undefined}>
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={values[field.name] || ''}
              onChange={onChange}
            />
            {field.actionLabel ? (
              <button type="button" className="ghost-button" onClick={() => onFieldAction(field.name)}>
                {isFieldActionBusy === field.name ? '发送中...' : field.actionLabel}
              </button>
            ) : null}
          </div>
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
