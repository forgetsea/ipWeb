import { Card, CardContent } from '../../components/ui/card'
import { SelectInput, Surface, SurfaceTitle, TextArea, TextInput } from '../../components/ui/surface'
import { cn } from '../../lib/utils'

function UserPanel({ children, className }) {
  return (
    <Surface className={cn('min-w-0 rounded-[32px] border-white/70 p-6 sm:p-8', className)}>
      {children}
    </Surface>
  )
}

function UserSectionHeader({ eyebrow, title, description, actions, compact = false }) {
  return (
    <SurfaceTitle
      eyebrow={eyebrow}
      title={title}
      description={description}
      actions={actions}
      className={compact ? 'pb-4' : undefined}
    />
  )
}

function UserField({ label, children, className }) {
  return (
    <label className={cn('grid gap-2.5', className)}>
      <span className="text-sm font-bold text-slate-800">{label}</span>
      {children}
    </label>
  )
}

function UserMetricGrid({ items, columns = 'xl:grid-cols-4' }) {
  return (
    <div className={cn('grid gap-4 md:grid-cols-2', columns)}>
      {items.map((item) => (
        <Card key={item.label} className="rounded-[24px] border-slate-200/70 bg-[#f4f9ff]/82 shadow-none">
          <CardContent className="grid min-h-28 gap-2 p-5">
            <span className="text-sm font-semibold text-slate-500">{item.label}</span>
            <strong className="text-2xl font-black text-slate-900">{item.value}</strong>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export {
  SelectInput,
  TextArea,
  TextInput,
  UserField,
  UserMetricGrid,
  UserPanel,
  UserSectionHeader,
}
