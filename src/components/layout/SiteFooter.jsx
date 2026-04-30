const partnerLinks = ['代理导航', '跨境工具', '数据平台', '浏览器环境', '开发文档', '营销社区']
const businessItems = ['商务合作', '渠道代理', '企业采购', '媒体联络']

const companyInfo = [
  '公司名称：奇迹网络科技有限公司',
  '办公地址：上海市浦东新区示例商务园 A 栋 8 层',
  '服务热线：400-800-1234',
  '企业邮箱：business@example.com',
]

function SiteFooter() {
  return (
    <footer className="mt-14 bg-[linear-gradient(180deg,rgba(8,23,58,0.96),rgba(11,30,70,0.98))] py-10 text-slate-100">
      <div className="section-container">
        <div className="grid gap-8 border-b border-white/10 pb-8 lg:grid-cols-[1.3fr_0.8fr_1fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#0d6efd] to-[#16c2a3] text-base font-black tracking-[0.18em] text-white">
                QJ
              </div>
              <div>
                <p className="m-0 text-base font-black text-white">奇迹 IP</p>
                <p className="m-0 text-sm text-slate-300">一站式企业级 IP 代理服务平台</p>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
              致力于提供海外网络访问综合性解决方案，构建完善的全球化网络，聚焦安全稳定的
              IP 服务。
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-base font-bold text-white">商务合作</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              {businessItems.map((item) => (
                <li key={item}>
                  <a href="#!" className="hover:text-white">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-base font-bold text-white">友情链接</h3>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {partnerLinks.map((item) => (
                <li key={item} className="text-sm text-slate-300">
                  <a href="#!" className="hover:text-white">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-base font-bold text-white">扫码咨询</h3>
            <div className="mb-3 h-[120px] w-[120px] rounded-3xl bg-[linear-gradient(45deg,#000_25%,#1a1a1a_25%,#1a1a1a_50%,#000_50%,#000_75%,#1a1a1a_75%)] bg-[length:24px_24px] shadow-[inset_0_0_0_10px_rgba(255,255,255,0.06)]" />
            <p className="text-sm leading-7 text-slate-300">微信客服二维码占位</p>
            <p className="text-sm leading-7 text-slate-400">后续可替换为真实二维码图片</p>
          </div>
        </div>

        <div className="grid gap-8 pt-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <h3 className="mb-4 text-base font-bold text-white">公司信息</h3>
            <ul className="space-y-3 text-sm leading-7 text-slate-300">
              {companyInfo.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="text-left text-sm leading-7 text-slate-400 lg:text-right">
            <p>Copyright © 2026 奇迹 IP. All Rights Reserved.</p>
            <p>沪 ICP 备 2026000000 号-1 | 沪公网安备 31000000000000 号</p>
            <p>安全稳定的海外 IP 代理服务平台。</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
