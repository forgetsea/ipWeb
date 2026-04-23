import { Link } from 'react-router-dom'
import SiteFooter from '../../components/layout/SiteFooter'
import SiteHeader from '../../components/layout/SiteHeader'
import { navItems } from '../../data/homeData'
import { packageHomeHero, packageSections } from '../../data/packageData'
import './PackageShared.css'

function PackageHomePage() {
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
                  <li key={item.key}>{item.title}</li>
                ))}
              </ul>
            </aside>
          </div>

          <section className="package-grid-2">
            {packageSections.map((item) => (
              <article key={item.key} className="package-card">
                <div className="package-card-top">
                  <h3>{item.title}</h3>
                  <span className="package-badge">{item.badge}</span>
                </div>
                <p>{item.summary}</p>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <Link to={item.path} className="package-card-link">
                  查看详情
                </Link>
              </article>
            ))}
          </section>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

export default PackageHomePage
