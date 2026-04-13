import SectionHeading from '../common/SectionHeading'

function PlansSection({ plans }) {
  return (
    <section className="section-block section-container" id="plans">
      <SectionHeading
        eyebrow="热门套餐"
        title="精选服务套餐，省心更划算"
        description="灵活的计费方式，为多场景适配设计，满足多元业务需求。"
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
