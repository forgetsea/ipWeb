import BrandsSection from '../components/home/BrandsSection'
import EnterpriseSection from '../components/home/EnterpriseSection'
import FeaturesSection from '../components/home/FeaturesSection'
import HeroSection from '../components/home/HeroSection'
import NewsSection from '../components/home/NewsSection'
import PlansSection from '../components/home/PlansSection'
import SceneStrip from '../components/home/SceneStrip'
import SiteFooter from '../components/layout/SiteFooter'
import SiteHeader from '../components/layout/SiteHeader'
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
