import SiteHeader from '../components/SiteHeader'
import HeroSection from '../components/HeroSection'
import SceneStrip from '../components/SceneStrip'
import FeaturesSection from '../components/FeaturesSection'
import PlansSection from '../components/PlansSection'
import EnterpriseSection from '../components/EnterpriseSection'
import BrandsSection from '../components/BrandsSection'
import NewsSection from '../components/NewsSection'
import SiteFooter from '../components/SiteFooter'
import {
  articleItems,
  enterpriseMetrics,
  featureItems,
  heroStats,
  logoItems,
  navItems,
  planItems,
  sceneItems,
} from '../data/homeData'
import './HomePage.css'

function HomePage() {
  return (
    <div className="home-page">
      <SiteHeader navItems={navItems} />
      <main className="home-main">
        <HeroSection stats={heroStats} />
        <SceneStrip scenes={sceneItems} />
        <FeaturesSection items={featureItems} />
        <PlansSection plans={planItems} />
        <EnterpriseSection metrics={enterpriseMetrics} />
        <BrandsSection logos={logoItems} />
        <NewsSection articles={articleItems} />
      </main>
      <SiteFooter />
    </div>
  )
}

export default HomePage
