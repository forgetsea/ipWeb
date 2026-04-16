import { Link } from 'react-router-dom'
import { appRoutes } from '../../router'
import rocket from '../../assets/rocket.png'

const serviceCards = [
  {
    icon: '全',
    title: '全球化网络',
    description: '搭建完善的海外访问网络，覆盖多业务场景。',
    tone: 'light',
  },
  {
    icon: '静',
    title: '静态住宅',
    description: '真实 IP 地址，长效固定，适合长期稳定业务。',
    tone: 'light',
  },
  {
    icon: '动',
    title: '动态住宅',
    description: '自动切换 IP，资源池充足，调用灵活便捷。',
    tone: 'primary',
  },
  {
    icon: 'IDC',
    title: '动态 IDC',
    description: '高速传输，多协议支持，适合高并发调用。',
    tone: 'dark',
  },
]

const statIcons = ['稳', '源', '护']

function HeroSection({ stats }) {
  return (
    <section className="hero-section emphasis-section section-container">
      <div className="hero-copy emphasis-copy">
        <span className="eyebrow hero-eyebrow">
          <img src={rocket} alt="" className="hero-eyebrow-icon" />
          赋能未来 链接世界
        </span>
        <h1>
          一站式企业级
          <br />
          IP代理服务平台
        </h1>
        <p className="hero-description">
          致力于提供海外网络访问综合性解决方案，搭建完善的全球化网络，聚焦安全稳定的 IP 服务。
        </p>

        <div className="hero-actions">
          <Link to={appRoutes.buy} className="primary-button hero-primary-button">
            查看套餐
          </Link>
          <Link to={appRoutes.ask} className="ghost-button hero-secondary-button">
            企业咨询
          </Link>
        </div>
      </div>

      <div className="hero-visual emphasis-aside">
        <p className="service-section-title">核心服务</p>
        <div className="visual-grid">
          {serviceCards.map((service) => (
            <article key={service.title} className={`home-card visual-card is-${service.tone}`}>
              <span className="service-icon" aria-hidden="true">
                {service.icon}
              </span>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </div>

      <dl className="hero-stats">
        {stats.map((item, index) => (
          <div key={item.label} className={`metric-card${index === 0 ? ' is-primary' : ''}`}>
            <span className="stat-icon" aria-hidden="true">
              {statIcons[index]}
            </span>
            <dt>{item.value}</dt>
            <dd>{item.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export default HeroSection
