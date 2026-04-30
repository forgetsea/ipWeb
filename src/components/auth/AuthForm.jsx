import { buttonVariants } from '../ui/button-variants'
import { StatusMessage, TextInput } from '../ui/surface'

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
    <form className="grid gap-5" onSubmit={onSubmit}>
      {fields.map((field) => (
        <label key={field.name} className="grid gap-2.5">
          <span className="text-sm font-bold text-slate-800">{field.label}</span>
          <div className={field.actionLabel ? 'grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]' : undefined}>
            <TextInput
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={values[field.name] || ''}
              onChange={onChange}
            />
            {field.actionLabel ? (
              <button
                type="button"
                className={buttonVariants({ variant: 'secondary' })}
                onClick={() => onFieldAction(field.name)}
              >
                {isFieldActionBusy === field.name ? '发送中...' : field.actionLabel}
              </button>
            ) : null}
          </div>
        </label>
      ))}

      <StatusMessage type={status.type} role="status">
        {status.message}
      </StatusMessage>

      <button type="submit" className={buttonVariants({ fullWidth: true, size: 'lg' })} disabled={isSubmitting}>
        {isSubmitting ? '提交中...' : submitLabel}
      </button>
    </form>
  )
}

export default AuthForm
