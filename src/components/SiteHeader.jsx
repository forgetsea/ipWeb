import { useEffect, useState } from 'react'

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
        <div className="brand-lockup">
          <div className="brand-mark">TQ</div>
          <div className="brand-text">
            <p className="brand-name">天启 IP</p>
            <p className="brand-subtitle">全球高质量代理服务</p>
          </div>
        </div>

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
          <a href="#!" className="ghost-button">
            控制台
          </a>
          <a href="#plans" className="primary-button">
            免费试用
          </a>
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
          <a href="#!" className="ghost-button" onClick={() => setIsMenuOpen(false)}>
            控制台
          </a>
          <a href="#plans" className="primary-button" onClick={() => setIsMenuOpen(false)}>
            免费试用
          </a>
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
