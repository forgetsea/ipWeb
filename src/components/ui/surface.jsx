import { cn } from '../../lib/utils'

function Surface({ className, ...props }) {
  return (
    <section
      className={cn(
        'rounded-[32px] border border-white/70 bg-white/80 shadow-[0_18px_46px_rgba(15,23,42,0.08)] backdrop-blur-sm',
        className,
      )}
      {...props}
    />
  )
}

function SurfaceTitle({ eyebrow, title, description, actions, className }) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 border-b border-slate-200/70 pb-5 lg:flex-row lg:items-start lg:justify-between',
        className,
      )}
    >
      <div className="min-w-0">
        {eyebrow ? <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">{eyebrow}</p> : null}
        <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-[2rem]">{title}</h2>
        {description ? (
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[color:var(--muted-strong)] sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </div>
  )
}

function StatusMessage({ type = 'idle', children, className, ...props }) {
  if (!children) return null

  return (
    <div
      className={cn(
        'rounded-2xl border px-4 py-3 text-sm font-semibold',
        type === 'error' && 'border-red-200 bg-red-50 text-red-700',
        type === 'success' && 'border-emerald-200 bg-emerald-50 text-emerald-700',
        type === 'idle' && 'border-slate-200 bg-slate-50 text-slate-600',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function TextInput({ className, ...props }) {
  return (
    <input
      className={cn(
        'h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-slate-900 outline-none transition focus:border-[#1677ff]/50 focus:ring-4 focus:ring-[#1677ff]/10',
        className,
      )}
      {...props}
    />
  )
}

function TextArea({ className, ...props }) {
  return (
    <textarea
      className={cn(
        'min-h-32 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#1677ff]/50 focus:ring-4 focus:ring-[#1677ff]/10',
        className,
      )}
      {...props}
    />
  )
}

function SelectInput({ className, children, ...props }) {
  return (
    <select
      className={cn(
        'h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-slate-900 outline-none transition focus:border-[#1677ff]/50 focus:ring-4 focus:ring-[#1677ff]/10',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  )
}

export { SelectInput, StatusMessage, Surface, SurfaceTitle, TextArea, TextInput }
