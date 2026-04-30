import SectionHeading from '../common/SectionHeading'
import SectionShell from '../common/SectionShell'
import { buttonVariants } from '../ui/button-variants'
import { Card, CardContent } from '../ui/card'

function PlansSection({ plans }) {
  return (
    <SectionShell id="plans">
      <SectionHeading
        eyebrow="热门套餐"
        title="精选服务套餐，省心更划算"
        description="灵活的计费方式，为多场景适配设计，满足多元业务需求。"
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name} className="relative overflow-hidden rounded-[30px] border-white/70">
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#0d6efd] to-[#16b39a]" />
            <CardContent className="p-6 sm:p-7">
              <p className="text-base font-black text-slate-900">{plan.name}</p>
              <div className="mt-5 flex items-end gap-2">
                <strong className="text-5xl font-black leading-none text-slate-900">{plan.price}</strong>
                <span className="pb-1 text-sm text-slate-500">{plan.unit}</span>
              </div>
              <ul className="mt-6 space-y-3 pl-5 text-sm leading-7 text-[color:var(--muted-strong)] marker:text-[#1677ff]">
                {plan.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <a href="#contact" className={`${buttonVariants({ fullWidth: true })} mt-6`}>
                立即咨询
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionShell>
  )
}

export default PlansSection
