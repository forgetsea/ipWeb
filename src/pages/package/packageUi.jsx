import { Link, NavLink } from 'react-router-dom'
import { Card, CardContent } from '../../components/ui/card'
import { buttonVariants } from '../../components/ui/button-variants'
import { Surface } from '../../components/ui/surface'
import { cn } from '../../lib/utils'

function PackageHero({ eyebrow, title, description, sideTitle, sideItems, sideField = 'summary' }) {
  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
      <Surface className="rounded-[36px] border-white/70 bg-[radial-gradient(circle_at_8%_10%,rgba(22,119,255,0.14),transparent_26%),linear-gradient(135deg,rgba(255,255,255,0.96),rgba(243,248,255,0.94))] p-7 sm:p-8">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="mt-4 max-w-[12ch] text-4xl font-black leading-tight text-[#0f2b67] sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[color:var(--muted-strong)]">{description}</p>
      </Surface>

      <Surface className="rounded-[36px] border-white/70 p-7 sm:p-8">
        <h2 className="text-lg font-black text-slate-900">{sideTitle}</h2>
        <ul className="mt-4 space-y-3 pl-5 text-sm leading-7 text-[color:var(--muted-strong)]">
          {sideItems.map((item) => (
            <li key={item.key || item.title}>{item[sideField] || item.title}</li>
          ))}
        </ul>
      </Surface>
    </div>
  )
}

function PackageCards({ items }) {
  return (
    <section className="grid gap-5 md:grid-cols-2">
      {items.map((item) => (
        <Card key={item.key} className="rounded-[30px] border-white/70 bg-white/88">
          <CardContent className="grid gap-4 p-6 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-xl font-black text-slate-900">{item.title}</h3>
              <span className="rounded-full bg-[#1677ff]/8 px-3 py-1 text-xs font-bold text-[#1677ff]">
                {item.badge}
              </span>
            </div>
            <p className="text-sm leading-7 text-[color:var(--muted-strong)]">{item.summary}</p>
            <ul className="pl-5 text-sm leading-7 text-[color:var(--muted-strong)] marker:text-[#1677ff]">
              {item.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <Link to={item.path} className={buttonVariants({})}>
              查看详情
            </Link>
          </CardContent>
        </Card>
      ))}
    </section>
  )
}

function PackageTabs({ items }) {
  return (
    <Surface className="rounded-[30px] border-white/70 p-3">
      <nav className="grid gap-3 md:grid-cols-2 xl:grid-cols-4" aria-label="套餐切换">
        {items.map((item) => (
          <NavLink
            key={item.key}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'grid gap-1 rounded-[22px] border border-transparent bg-[#f4f8ff]/72 px-5 py-4 no-underline transition hover:-translate-y-0.5 hover:border-[#1677ff]/14',
                isActive && 'bg-gradient-to-r from-[#1677ff] to-[#0f66db] shadow-[0_18px_34px_rgba(22,119,255,0.2)]',
              )
            }
          >
            {({ isActive }) => (
              <>
                <strong className={cn('text-base font-black text-slate-900', isActive && 'text-white')}>
                  {item.title}
                </strong>
                <span className={cn('text-xs text-slate-500', isActive && 'text-white/80')}>{item.badge}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </Surface>
  )
}

function PackageSummary({ title, description, points }) {
  return (
    <Surface className="rounded-[32px] border-[#1677ff]/12 bg-[radial-gradient(circle_at_top_left,rgba(22,119,255,0.12),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.98),rgba(242,247,255,0.98))] p-6 sm:p-8">
      <div className="grid gap-5 lg:grid-cols-[minmax(220px,0.72fr)_minmax(0,1.28fr)]">
        <div className="max-w-md">
          <span className="eyebrow">套餐简介</span>
          <h2 className="mt-4 text-3xl font-black leading-tight text-slate-900">{title}</h2>
          <p className="mt-3 text-sm leading-7 text-[color:var(--muted-strong)]">{description}</p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {points.map((point) => (
            <li
              key={point}
              className="relative rounded-2xl border border-[#1677ff]/8 bg-white/82 px-4 py-4 pl-9 text-sm font-semibold leading-7 text-slate-800"
            >
              <span className="absolute left-4 top-5 h-2 w-2 rounded-full bg-gradient-to-r from-[#1677ff] to-[#16b39a] shadow-[0_0_0_4px_rgba(22,119,255,0.08)]" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </Surface>
  )
}

function PackagePlans({ countText, plans, actionLabel = '立即购买' }) {
  return (
    <section className="grid gap-4">
      <div className="flex flex-col gap-3 px-1 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="eyebrow">选择购买套餐</span>
          <p className="text-sm font-bold text-slate-500">{countText}</p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan) => (
          <Card key={plan.name} className="rounded-[28px] border-white/70 bg-white/92">
            <CardContent className="grid h-full gap-4 p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-black leading-7 text-slate-900">{plan.name}</h3>
                <span className="rounded-full bg-[#1677ff]/8 px-3 py-1 text-xs font-bold text-[#1677ff]">
                  {plan.badge}
                </span>
              </div>
              <div className="flex items-end gap-2">
                <strong className="text-4xl font-black leading-none text-[#0f2b67]">{plan.price}</strong>
                <em className="pb-1 text-sm not-italic text-slate-500">{plan.unit}</em>
              </div>
              <p className="text-sm leading-7 text-[color:var(--muted-strong)]">{plan.description}</p>
              <ul className="pl-5 text-sm leading-7 text-[color:var(--muted-strong)] marker:text-[#1677ff]">
                {plan.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <button type="button" className={buttonVariants({ fullWidth: true })}>
                {actionLabel}
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

export { PackageCards, PackageHero, PackagePlans, PackageSummary, PackageTabs }
