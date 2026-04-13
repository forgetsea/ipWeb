import SectionHeading from '../common/SectionHeading'

function PlansSection({ plans }) {
  return (
    <section className="section-block section-container" id="plans">
      <SectionHeading
        eyebrow="热门套餐"
        title="常见首页套餐展示"
        description="采用三列价格卡结构，便于后续你继续替换为真实套餐、折扣与购买链接。"
      />

      <div className="plans-grid">
        {plans.map((plan) => (
          <article key={plan.name} className="plan-card">
            <p className="plan-name">{plan.name}</p>
            <div className="plan-price">
              <strong>{plan.price}</strong>
              <span>{plan.unit}</span>
            </div>
            <ul>
              {plan.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <a href="#contact" className="primary-button full">
              立即咨询
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}

export default PlansSection
