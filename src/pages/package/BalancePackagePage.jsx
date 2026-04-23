import { balancePackagePage } from '../../data/packageData'
import './PackageShared.css'

function BalancePackagePage() {
  return (
    <div className="package-detail">
      <section className="package-summary-shell">
        <div className="package-summary-card">
          <div className="package-summary-copy">
            <span className="eyebrow">套餐简介</span>
            <h2>{balancePackagePage.summaryCard.title}</h2>
            <p>{balancePackagePage.summaryCard.description}</p>
          </div>
          <ul className="package-summary-points">
            {balancePackagePage.summaryCard.points.map((point) => (
              <li key={point} className="package-summary-point">
                <strong>{point}</strong>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="package-list-shell">
        <div className="package-section-label">
          <span className="eyebrow">选择购买套餐</span>
          <p>共 8 个套餐</p>
        </div>
        <div className="package-plan-grid">
          {balancePackagePage.plans.map((plan) => (
            <article key={plan.name} className="package-plan-card">
              <div className="package-plan-head">
                <h2>{plan.name}</h2>
                <span>{plan.badge}</span>
              </div>
              <div className="package-plan-price">
                <strong>{plan.price}</strong>
                <em>{plan.unit}</em>
              </div>
              <p>{plan.description}</p>
              <ul className="package-plan-points">
                {plan.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <button type="button" className="package-plan-button">
                立即购买
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default BalancePackagePage
