const metricIcons = [
  <svg key="database" viewBox="0 0 24 24" aria-hidden="true">
    <ellipse cx="12" cy="5" rx="7" ry="3" />
    <path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5" />
    <path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
  </svg>,
  <svg key="clock" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="8" />
    <path d="M12 7v5l3.5 2" />
  </svg>,
  <svg key="support" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 13v-1a7 7 0 0 1 14 0v1" />
    <path d="M5 13h3v5H5z" />
    <path d="M16 13h3v5h-3z" />
    <path d="M16 18c0 1.5-1.5 2.5-4 2.5" />
    <path d="M10 20.5h2" />
  </svg>,
]

function EnterpriseSection({ metrics }) {
  return (
    <section className="enterprise-band" id="contact">
      <div className="enterprise-panel emphasis-section section-container">
        <div className="enterprise-copy emphasis-copy">
          <span className="eyebrow">企业定制</span>
          <h2>
            企业级 IP 代理解决方案
            <br />
            为业务增长保驾护航
          </h2>
          <p>
            专为企业量身定制的 IP 代理服务，提供全球化网络访问解决方案，助力企业数字化转型。
          </p>
          <a href="#!" className="primary-button">
            联系商务
          </a>
        </div>

        <div className="enterprise-advantage emphasis-aside">
          <p className="enterprise-advantage-title">核心优势</p>
          <div className="enterprise-metrics">
            {metrics.map((metric, index) => (
              <div
                key={metric.label}
                className={`metric-card enterprise-metric-card${index === 0 ? ' is-primary' : ''}`}
              >
                <span className="enterprise-metric-icon" aria-hidden="true">
                  {metricIcons[index]}
                </span>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default EnterpriseSection
