function EnterpriseSection({ metrics }) {
  return (
    <section className="enterprise-band" id="contact">
      <div className="enterprise-panel section-container">
        <div className="enterprise-copy">
          <span className="eyebrow">企业定制</span>
          <h2>企业级 IP 代理解决方案，为业务增长保驾护航</h2>
          <p>
            专为企业量身定制的 IP 代理服务，提供全球化网络访问解决方案，助力企业数字化转型。
          </p>
          <a href="#!" className="primary-button">
            联系商务
          </a>
        </div>

        <div className="enterprise-metrics">
          {metrics.map((metric) => (
            <div key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EnterpriseSection
