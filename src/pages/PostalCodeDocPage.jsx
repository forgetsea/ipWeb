import SiteFooter from '../components/layout/SiteFooter'
import SiteHeader from '../components/layout/SiteHeader'
import { Card, CardContent } from '../components/ui/card'
import { Surface, SurfaceTitle } from '../components/ui/surface'
import { navItems } from '../data/homeData'
import { postalCodeEntries } from '../data/postalCodes'

function PostalCodeDocPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader navItems={navItems} />

      <main className="section-container grid gap-6 pb-12 pt-28 sm:pt-32">
        <Surface className="rounded-[36px] border-white/70 bg-[radial-gradient(circle_at_top_left,rgba(22,119,255,0.12),transparent_28%),rgba(255,255,255,0.94)]">
          <CardContent className="grid gap-4 p-7 sm:p-9">
            <span className="eyebrow">Postal Codes</span>
            <h1 className="text-4xl font-black leading-tight text-slate-900 sm:text-5xl">
              中国省市编码文档
            </h1>
            <p className="max-w-4xl text-base leading-8 text-[color:var(--muted-strong)]">
              当前表格用于 `Get IP` 页面地区编码选择。数据来源以你提供的接口说明文件为准，
              并参考了你给出的文档地址结构：`https://doc.xiaoxiongip.com/#/guides/100101`。
            </p>
          </CardContent>
        </Surface>

        <Surface className="rounded-[32px] border-white/70 p-6 sm:p-8">
          <SurfaceTitle
            eyebrow="Reference"
            title="邮政编码 / 地区编码表"
            description={`当前共整理 ${postalCodeEntries.length} 条编码记录，包含省级与地市级区域。`}
          />

          <div className="mt-6 overflow-x-auto rounded-[24px] border border-slate-200/70 bg-[#f8fbff]">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-[#e8f1ff]/96 text-left text-sm font-black text-slate-900">
                  <th className="border-b border-slate-200/70 px-4 py-4">编码</th>
                  <th className="border-b border-slate-200/70 px-4 py-4">地区</th>
                  <th className="border-b border-slate-200/70 px-4 py-4">层级</th>
                </tr>
              </thead>
              <tbody>
                {postalCodeEntries.map((item) => (
                  <tr key={item.code} className="border-b border-slate-200/70 text-sm text-slate-700 last:border-b-0">
                    <td className="px-4 py-3 font-mono text-slate-900">{item.code}</td>
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3">{item.level}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Surface>
      </main>

      <SiteFooter />
    </div>
  )
}

export default PostalCodeDocPage
