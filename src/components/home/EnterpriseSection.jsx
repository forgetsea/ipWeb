import { buttonVariants } from '../ui/button-variants'
import { Card, CardContent } from '../ui/card'
import { cn } from '../../lib/utils'

const metricIcons = [
  <svg key="database" viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
    <ellipse cx="12" cy="5" rx="7" ry="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" fill="none" stroke="currentColor" strokeWidth="1.8" />
  </svg>,
  <svg key="clock" viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
    <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <path d="M12 7v5l3.5 2" fill="none" stroke="currentColor" strokeWidth="1.8" />
  </svg>,
  <svg key="support" viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
    <path d="M5 13v-1a7 7 0 0 1 14 0v1" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <path d="M5 13h3v5H5z" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <path d="M16 13h3v5h-3z" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <path d="M16 18c0 1.5-1.5 2.5-4 2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <path d="M10 20.5h2" fill="none" stroke="currentColor" strokeWidth="1.8" />
  </svg>,
]

function EnterpriseSection({ metrics }) {
  return (
    <section id="contact" className="section-container pt-10 sm:pt-12 lg:pt-14">
      <div className="grid gap-6 rounded-[36px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.88),rgba(244,248,255,0.92))] p-6 shadow-[0_16px_42px_rgba(15,23,42,0.08)] sm:p-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:p-10">
        <div className="lg:pr-6">
          <span className="inline-flex items-center rounded-full bg-gradient-to-r from-[#1677ff] to-[#0f66db] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white shadow-[0_12px_24px_rgba(22,119,255,0.22)]">
            企业定制
          </span>
          <h2 className="mt-4 max-w-[14ch] text-3xl font-black leading-tight text-slate-900 sm:text-4xl lg:text-[2.6rem]">
            企业级 IP 代理解决方案
            <br />
            为业务增长保驾护航
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-[color:var(--muted-strong)]">
            专为企业量身定制的 IP 代理服务，提供全球化网络访问解决方案，助力企业数字化转型。
          </p>
          <a href="#!" className={`${buttonVariants({ size: 'lg' })} mt-7`}>
            联系商务
          </a>
        </div>

        <div>
          <p className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-slate-500">核心优势</p>
          <div className="grid gap-4">
            {metrics.map((metric, index) => (
              <Card
                key={metric.label}
                className={cn(
                  'rounded-[28px] border transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)]',
                  index === 0
                    ? 'border-transparent bg-gradient-to-r from-[#1677ff] to-[#0f66db] text-white'
                    : 'border-[#1677ff]/10 bg-white',
                )}
              >
                <CardContent className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-2 p-6">
                  <span
                    className={cn(
                      'grid h-11 w-11 place-items-center rounded-2xl',
                      index === 0 ? 'bg-white/16 text-white' : 'bg-[#1677ff]/10 text-[#1677ff]',
                    )}
                  >
                    {metricIcons[index]}
                  </span>
                  <strong className={cn('text-3xl font-black leading-none', index === 0 ? 'text-white' : 'text-[#12376b]')}>
                    {metric.value}
                  </strong>
                  <span className={cn('col-start-2 text-sm leading-7', index === 0 ? 'text-white/80' : 'text-[#47678f]')}>
                    {metric.label}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default EnterpriseSection
