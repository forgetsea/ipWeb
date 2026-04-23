import { NavLink, Navigate, Outlet, useLocation } from 'react-router-dom'
import SiteFooter from '../../components/layout/SiteFooter'
import SiteHeader from '../../components/layout/SiteHeader'
import { navItems } from '../../data/homeData'
import { packageHomeHero, packageSections } from '../../data/packageData'
import { appRoutes } from '../../router'
import './PackageShared.css'

function PackageLayoutPage() {
  const location = useLocation()

  if (location.pathname === appRoutes.package) {
    return <Navigate to={appRoutes.packageBalance} replace />
  }

  return (
    <div className="package-page">
      <SiteHeader navItems={navItems} />
      <main className="package-main section-container">
        <section className="package-shell">
          <div className="package-hero-banner">
            <div className="package-hero-copy">
              <span className="eyebrow">{packageHomeHero.eyebrow}</span>
              <h1>{packageHomeHero.title}</h1>
              <p>{packageHomeHero.description}</p>
            </div>
            <aside className="package-hero-side">
              <h2 className="package-side-title">套餐导航</h2>
              <ul className="package-hero-list">
                {packageSections.map((item) => (
                  <li key={item.key}>{item.summary}</li>
                ))}
              </ul>
            </aside>
          </div>

          <section className="package-tabs-panel">
            <nav className="package-tabs" aria-label="套餐切换">
              {packageSections.map((item) => (
                <NavLink
                  key={item.key}
                  to={item.path}
                  className={({ isActive }) =>
                    `package-tab${isActive ? ' is-active' : ''}`
                  }
                >
                  <strong>{item.title}</strong>
                  <span>{item.badge}</span>
                </NavLink>
              ))}
            </nav>
          </section>

          <section className="package-outlet-panel">
            <Outlet />
          </section>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

export default PackageLayoutPage
