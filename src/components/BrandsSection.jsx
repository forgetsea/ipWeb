import SectionHeading from './SectionHeading'

function BrandsSection({ logos }) {
  return (
    <section className="section-block section-container">
      <SectionHeading eyebrow="合作品牌" title="品牌露出区" />

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
