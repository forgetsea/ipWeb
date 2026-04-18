// 文件用途：首页合作品牌区，展示平台服务覆盖的品牌生态。
import SectionHeading from '../common/SectionHeading'
import SectionShell from '../common/SectionShell'

// 模块功能：把品牌名称渲染为横向徽章列表。
function BrandsSection({ logos }) {
  return (
    <SectionShell className="section-shell--compact">
      <SectionHeading eyebrow="合作品牌" title="服务全球客户，期待您的加入" />

      <div className="logo-row">
        {logos.map((logo) => (
          <div key={logo} className="home-card logo-pill">
            {logo}
          </div>
        ))}
      </div>
    </SectionShell>
  )
}

export default BrandsSection
