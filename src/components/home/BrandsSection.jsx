import SectionHeading from '../common/SectionHeading'
import SectionShell from '../common/SectionShell'
import { Card, CardContent } from '../ui/card'

function BrandsSection({ logos }) {
  return (
    <SectionShell className="pt-8 sm:pt-10">
      <SectionHeading eyebrow="合作品牌" title="服务全球客户，期待您的加入" />

      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
        {logos.map((logo) => (
          <Card key={logo} className="rounded-[26px] border-white/60">
            <CardContent className="grid min-h-24 place-items-center p-5 text-center text-sm font-black uppercase tracking-[0.18em] text-slate-900">
              {logo}
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionShell>
  )
}

export default BrandsSection
