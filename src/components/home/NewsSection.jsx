import SectionHeading from '../common/SectionHeading'
import SectionShell from '../common/SectionShell'
import { Card, CardContent } from '../ui/card'
import { cn } from '../../lib/utils'

const articleDetails = [
  {
    titleLines: ['100%', '合规运营'],
    description: '资质齐全，全程可审计',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path d="M12 3 5 6v5c0 4.4 2.8 8.4 7 10 4.2-1.6 7-5.6 7-10V6l-7-3Z" fill="none" stroke="currentColor" strokeWidth="1.9" />
        <path d="m9.5 12 1.8 1.8 3.7-4" fill="none" stroke="currentColor" strokeWidth="1.9" />
      </svg>
    ),
  },
  {
    titleLines: ['24h', '安全健康'],
    description: '实时监测，稳定守护',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.9" />
        <path d="M12 8v4l2.8 1.7" fill="none" stroke="currentColor" strokeWidth="1.9" />
      </svg>
    ),
  },
  {
    titleLines: ['0 个', '安全事故'],
    description: '严控风险，可靠运行',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.9" />
        <path d="m8.5 12 2.3 2.3 4.7-5" fill="none" stroke="currentColor" strokeWidth="1.9" />
      </svg>
    ),
  },
]

function NewsSection({ articles }) {
  return (
    <SectionShell className="grid gap-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-start">
      <SectionHeading
        eyebrow="安全合规"
        title="安全合规是我们的承诺"
        description="奇迹 IP 坚守安全合规原则，提供稳定、可靠、可审计的大数据代理服务。"
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {articles.map((article, index) => {
          const detail = articleDetails[index] ?? articleDetails[0]
          const isPrimary = index === 1

          return (
            <Card
              key={article}
              className={cn(
                'rounded-[30px] border-[#1677ff]/12 shadow-[0_14px_34px_rgba(15,23,42,0.1)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(15,23,42,0.14)]',
                isPrimary && 'border-transparent bg-[#1677ff] text-white',
              )}
            >
              <CardContent className="grid min-h-[230px] grid-rows-[auto_auto_1fr_auto] gap-4 p-6">
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      'grid h-8 w-8 place-items-center rounded-full text-xs font-black',
                      isPrimary ? 'bg-white text-[#1677ff]' : 'bg-[#1677ff] text-white',
                    )}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className={cn(isPrimary ? 'text-white' : 'text-[#1677ff]')}>{detail.icon}</span>
                </div>
                <h3 className={cn('text-3xl font-black leading-none text-slate-900', isPrimary && 'text-white')}>
                  {detail.titleLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h3>
                <p className={cn('text-sm leading-7 text-slate-500', isPrimary && 'text-white/80')}>
                  {detail.description}
                </p>
                <a
                  href="#!"
                  className={cn(
                    'text-sm font-bold text-[#1677ff] no-underline',
                    isPrimary && 'text-white',
                  )}
                >
                  了解更多
                </a>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </SectionShell>
  )
}

export default NewsSection
