import SectionHeading from '../common/SectionHeading'

function FeaturesSection({ items }) {
  return (
    <section className="section-block section-container">
      <SectionHeading
        eyebrow="核心优势"
        title="还原原站首页常见的能力展示区块"
        description="通过大色块、轻玻璃卡片和密集信息分层，复刻营销型代理服务网站的首页表达方式。"
      />

      <div className="feature-grid">
        {items.map((feature) => (
          <article key={feature.title} className="feature-card">
            <div className="feature-icon" />
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default FeaturesSection
