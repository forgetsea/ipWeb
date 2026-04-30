import { cn } from '../../lib/utils'

function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        'rounded-3xl border border-slate-200/70 bg-white/80 shadow-[0_14px_34px_rgba(15,23,42,0.08)] backdrop-blur-sm',
        className,
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }) {
  return <div className={cn('p-6', className)} {...props} />
}

export { Card, CardContent }
