import { Link } from 'react-router-dom'
import { appRoutes } from '../../router'
import rocket from '../../assets/rocket.png'

function HeroSection({ stats }) {
  return (
    <section className="hero-section section-container">
      <div className="hero-copy">
        <span className="eyebrow">
          <img 
          src={rocket} 
          alt="火箭图标" 
          style={{ 
            width: '16px', 
            height: '16px', 
            marginRight: '6px',
            verticalAlign: 'middle'
          }} 
        />
      赋能未来 链接世界</span>
        <h1>一站式企业级 IP 代理服务平台</h1>
        <p className="hero-description">
          致力于提供海外网络访问综合性解决方案，搭建完善的全球化网络，聚焦安全稳定的 IP 服务。
        </p>

        <div className="hero-actions">
          <Link to={appRoutes.register} className="primary-button">
            注册账号
          </Link>
          <Link to={appRoutes.login} className="ghost-button strong">
            立即登录
          </Link>
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
          <p>全球化网络</p>
          <strong>为企业业务提供稳定、安全、优质的海外 IP 代理服务</strong>
        </div>
        <div className="visual-grid">
          <div className="visual-card">
            <span>静态住宅</span>
            <strong>真实 IP 地址，长效固定</strong>
          </div>
          <div className="visual-card accent">
            <span>动态住宅</span>
            <strong>自动切换 IP，资源池充足</strong>
          </div>
          <div className="visual-card dark">
            <span>动态 IDC</span>
            <strong>高速传输，多协议支持</strong>
          </div>
          <div className="visual-card">
            <span>企业定制</span>
            <strong>专属方案支持业务增长</strong>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
