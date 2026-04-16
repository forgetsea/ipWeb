import SectionHeading from '../common/SectionHeading'
import SectionShell from '../common/SectionShell'

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
