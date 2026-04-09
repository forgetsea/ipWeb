function SiteHeader({ navItems }) {
  return (
    <header className="site-header section-container">
      <div className="brand-lockup">
        <div className="brand-mark">TQ</div>
        <div>
          <p className="brand-name">天启 IP</p>
          <p className="brand-subtitle">全球高质量代理服务</p>
        </div>
      </div>

      <nav className="site-nav" aria-label="主导航">
        {navItems.map((item) => (
          <a key={item} href="#!" className="nav-link">
            {item}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <a href="#!" className="ghost-button">
          控制台
        </a>
        <a href="#plans" className="primary-button">
          免费试用
        </a>
      </div>
    </header>
  )
}

export default SiteHeader
