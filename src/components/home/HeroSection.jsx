import { Link } from 'react-router-dom'
import { appRoutes } from '../../router'
import rocket from '../../assets/rocket.png'
import { buttonVariants } from '../ui/button-variants'
import { Card, CardContent } from '../ui/card'
import { cn } from '../../lib/utils'

const serviceCards = [
  {
    icon: '全',
    title: '全球化网络',
    description: '构建完善的海外访问网络，覆盖多业务场景。',
    tone: 'light',
  },
  {
    icon: '静',
    title: '静态住宅',
    description: '真实 IP 地址，长效固定，适合长期稳定业务。',
    tone: 'light',
  },
  {
    icon: '动',
    title: '动态住宅',
    description: '自动切换 IP，资源池充足，调用灵活便捷。',
    tone: 'primary',
  },
  {
    icon: 'IDC',
    title: '动态 IDC',
    description: '高速传输，多协议支持，适合高并发调用。',
    tone: 'dark',
  },
]

const statIcons = ['稳', '源', '护']

function HeroSection({ stats }) {
  return (
    <section className="section-container relative grid gap-6 pt-4 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-start">
      <div className="absolute inset-x-0 top-0 -z-10 h-full rounded-[36px] bg-[radial-gradient(circle_at_8%_14%,rgba(13,110,253,0.12),transparent_28%),radial-gradient(circle_at_92%_20%,rgba(22,194,163,0.12),transparent_22%)]" />

      <div className="rounded-[36px] border border-white/70 bg-white/55 p-6 shadow-[0_18px_46px_rgba(15,23,42,0.06)] backdrop-blur-sm sm:p-8 lg:p-10">
        <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#1677ff] to-[#16b39a] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white shadow-[0_12px_24px_rgba(22,119,255,0.22)]">
          <img src={rocket} alt="" className="h-4 w-4 object-contain" />
          赋能未来 链接世界
        </span>

        <h1 className="mt-5 max-w-[13ch] text-4xl font-black leading-tight text-[#0f2b67] sm:text-5xl lg:text-[3.25rem]">
          一站式企业级
          <br />
          IP代理服务平台
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-8 text-[color:var(--muted-strong)]">
          致力于提供海外网络访问综合性解决方案，构建完善的全球化网络，聚焦安全稳定的 IP
          服务。
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link to={appRoutes.buy} className={buttonVariants({ size: 'lg' })}>
            查看套餐
          </Link>
          <Link to={appRoutes.ask} className={buttonVariants({ variant: 'outline', size: 'lg' })}>
            企业咨询
          </Link>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="flex items-center gap-2 px-1 text-sm font-bold uppercase tracking-[0.18em] text-[#1677ff]">
          <span className="h-px w-10 bg-[#1677ff]/35" />
          核心服务
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {serviceCards.map((service) => (
            <Card
              key={service.title}
              className={cn(
                'min-h-44 overflow-hidden rounded-[28px] border-0 shadow-[0_18px_40px_rgba(15,23,42,0.08)] transition duration-200 hover:-translate-y-1',
                service.tone === 'light' && 'bg-white/82',
                service.tone === 'primary' && 'bg-[#1677ff] text-white',
                service.tone === 'dark' && 'bg-[#0f2b67] text-white',
              )}
            >
              <CardContent className="flex h-full flex-col items-start gap-5 p-6">
                <span
                  className={cn(
                    'grid h-11 w-11 place-items-center rounded-2xl text-sm font-black',
                    service.tone === 'light' && 'bg-[#1677ff]/10 text-[#1677ff]',
                    service.tone !== 'light' && 'bg-white/16 text-white',
                  )}
                >
                  {service.icon}
                </span>
                <div className="space-y-2">
                  <h2 className={cn('text-lg font-black', service.tone !== 'light' && 'text-white')}>
                    {service.title}
                  </h2>
                  <p
                    className={cn(
                      'text-sm leading-7 text-[color:var(--muted-strong)]',
                      service.tone !== 'light' && 'text-white/80',
                    )}
                  >
                    {service.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <dl className="grid gap-4 lg:col-span-2 lg:grid-cols-3">
        {stats.map((item, index) => (
          <Card
            key={item.label}
            className={cn(
              'rounded-[28px] border-0 transition duration-200 hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(15,23,42,0.12)]',
              index === 0 ? 'bg-[#1677ff] text-white' : 'bg-white/80',
            )}
          >
            <CardContent className="grid gap-3 p-6">
              <span
                className={cn(
                  'grid h-10 w-10 place-items-center rounded-xl text-sm font-black',
                  index === 0 ? 'bg-white/16 text-white' : 'bg-[#1677ff]/10 text-[#1677ff]',
                )}
              >
                {statIcons[index]}
              </span>
              <dt className={cn('text-3xl font-black', index === 0 ? 'text-white' : 'text-slate-900')}>
                {item.value}
              </dt>
              <dd className={cn('m-0 text-sm', index === 0 ? 'text-white/80' : 'text-slate-500')}>
                {item.label}
              </dd>
            </CardContent>
          </Card>
        ))}
      </dl>
    </section>
  )
}

export default HeroSection
