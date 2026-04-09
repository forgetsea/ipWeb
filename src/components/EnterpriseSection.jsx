function EnterpriseSection({ metrics }) {
  return (
    <section className="enterprise-panel section-container" id="contact">
      <div className="enterprise-copy">
        <span className="eyebrow">企业定制</span>
        <h2>如果你想继续提高还原度，这一块最适合接入真实品牌素材</h2>
        <p>
          当前版本先用可维护的 React 结构完成整体页面骨架。后续你只要补上官网原图、图标和真实文案，就能继续往 1:1 靠近。
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
    </section>
  )
}

export default EnterpriseSection
