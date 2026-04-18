// 文件用途：首页热门套餐区，展示套餐价格和卖点。
import SectionHeading from '../common/SectionHeading'
import SectionShell from '../common/SectionShell'

// 模块功能：把套餐数据渲染为可咨询的价格卡片。
function PlansSection({ plans }) {
  return (
    <SectionShell id="plans">
      <SectionHeading
        eyebrow="热门套餐"
        title="精选服务套餐，省心更划算"
        description="灵活的计费方式，为多场景适配设计，满足多元业务需求。"
      />

      <div className="plans-grid">
        {plans.map((plan) => (
          <article key={plan.name} className="home-card plan-card">
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
    </SectionShell>
  )
}

export default PlansSection
