import SectionHeading from '../common/SectionHeading'

function FeaturesSection({ items }) {
  return (
    <section className="section-block section-container">
      <SectionHeading
        eyebrow="产品介绍"
        title="专业优质的海外 IP 代理服务"
        description="覆盖静态住宅、动态住宅与动态 IDC 代理，满足跨境业务、数据业务与企业网络访问需求。"
      />

      <div className="feature-grid">
        {items.map((feature) => (
          <article key={feature.title} className="feature-card">
            <div className="feature-icon" />
            <h3>{feature.title}</h3>
            <ul className="feature-bullets">
              {feature.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

export default FeaturesSection
