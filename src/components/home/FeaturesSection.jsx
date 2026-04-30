import SectionHeading from '../common/SectionHeading'
import SectionShell from '../common/SectionShell'
import { Card, CardContent } from '../ui/card'

function FeaturesSection({ items }) {
  return (
    <SectionShell>
      <SectionHeading
        eyebrow="产品介绍"
        title="专业优质的海外 IP 代理服务"
        description="覆盖静态住宅、动态住宅与动态 IDC 代理，满足跨境业务、数据业务与企业网络访问需求。"
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {items.map((feature) => (
          <Card key={feature.title} className="rounded-[30px] border-white/60 bg-white/78">
            <CardContent className="p-6 sm:p-7">
              <div className="mb-5 h-14 w-14 rounded-2xl bg-gradient-to-br from-[#0d6efd]/18 to-[#16b39a]/28" />
              <h3 className="text-xl font-black text-slate-900">{feature.title}</h3>
              <ul className="mt-5 grid gap-3 pl-5 text-sm leading-7 text-[color:var(--muted-strong)] marker:text-[#0d6efd]">
                {feature.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionShell>
  )
}

export default FeaturesSection
