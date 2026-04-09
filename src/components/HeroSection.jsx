function HeroSection({ stats }) {
  return (
    <section className="hero-section section-container">
      <div className="hero-copy">
        <span className="eyebrow">企业级全球代理服务</span>
        <h1>用开放布局复刻天启 IP 风格首页</h1>
        <p className="hero-description">
          面向跨境电商、数据采集、社媒营销与账号运营团队，提供动态住宅、静态住宅和机房代理等多种网络解决方案。
        </p>

        <div className="hero-actions">
          <a href="#plans" className="primary-button">
            查看套餐
          </a>
          <a href="#contact" className="ghost-button strong">
            企业咨询
          </a>
        </div>

        <dl className="hero-stats">
          {stats.map((item) => (
            <div key={item.label}>
              <dt>{item.value}</dt>
              <dd>{item.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="hero-visual" aria-hidden="true">
        <div className="visual-card large">
          <p>智能路由</p>
          <strong>根据国家、城市与运营商自动分配出口</strong>
        </div>
        <div className="visual-grid">
          <div className="visual-card">
            <span>动态住宅</span>
            <strong>适合注册、养号、投放</strong>
          </div>
          <div className="visual-card accent">
            <span>静态住宅</span>
            <strong>适合店铺和长期账号环境</strong>
          </div>
          <div className="visual-card dark">
            <span>API 接入</span>
            <strong>快速对接业务系统</strong>
          </div>
          <div className="visual-card">
            <span>并发友好</span>
            <strong>支持采集与批量调度</strong>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
