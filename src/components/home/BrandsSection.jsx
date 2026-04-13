import SectionHeading from '../common/SectionHeading'

function BrandsSection({ logos }) {
  return (
    <section className="section-block section-container">
      <SectionHeading eyebrow="合作品牌" title="服务全球客户，期待您的加入" />

      <div className="logo-row">
        {logos.map((logo) => (
          <div key={logo} className="logo-pill">
            {logo}
          </div>
        ))}
      </div>
    </section>
  )
}

export default BrandsSection
