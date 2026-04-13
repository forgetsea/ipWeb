import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { appRoutes } from '../../router'

function SiteHeader({ navItems }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const closeMenu = () => {
      if (window.innerWidth > 900) {
        setIsMenuOpen(false)
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('resize', closeMenu)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('resize', closeMenu)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <header className="site-header-wrap">
      <div className="site-header section-container">
        <Link to={appRoutes.home} className="brand-lockup">
          <div className="brand-mark">QJ</div>
          <div className="brand-text">
            <p className="brand-name">奇迹 IP</p>
            <p className="brand-subtitle">一站式企业级 IP 代理服务平台</p>
          </div>
        </Link>

        <button
          type="button"
          className={`menu-toggle${isMenuOpen ? ' is-open' : ''}`}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? '关闭菜单' : '打开菜单'}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className="site-nav desktop-nav" aria-label="主导航">
          {navItems.map((item) => (
            <a key={item} href="#!" className="nav-link">
              {item}
            </a>
          ))}
        </nav>

        <div className="header-actions desktop-actions">
          <Link to={appRoutes.userCenter} className="ghost-button">
            用户中心
          </Link>
          <Link to={appRoutes.login} className="ghost-button">
            用户登录
          </Link>
          <Link to={appRoutes.register} className="primary-button">
            立即注册
          </Link>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={`mobile-menu section-container${isMenuOpen ? ' is-open' : ''}`}
      >
        <nav className="site-nav mobile-nav" aria-label="移动端主导航">
          {navItems.map((item) => (
            <a key={item} href="#!" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              {item}
            </a>
          ))}
        </nav>

        <div className="header-actions mobile-actions">
          <Link
            to={appRoutes.userCenter}
            className="ghost-button"
            onClick={() => setIsMenuOpen(false)}
          >
            用户中心
          </Link>
          <Link to={appRoutes.login} className="ghost-button" onClick={() => setIsMenuOpen(false)}>
            用户登录
          </Link>
          <Link
            to={appRoutes.register}
            className="primary-button"
            onClick={() => setIsMenuOpen(false)}
          >
            立即注册
          </Link>
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
